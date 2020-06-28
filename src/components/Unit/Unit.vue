<template>
  <div class="outest" id="dataImport">
    <div class="sContainer">
      <span>选择分组 :</span>
      <el-select size="mini" style="width:300px" placeholder="请选择分组" v-model="it" @change="group_id()" clearable>
        <el-option
          v-for="(gl,index) in this.groupList"
          :key="index"  
          :value="gl.id"
          :label="gl.group_name">
          {{gl.group_name}}
        </el-option>
      </el-select>
    </div>
    <!--搜索 -->
    <div class="entry">
      <div class="search">
        <div class="up">
          <div class="left">
            <span>原单位诊断信息 :</span>
            <el-select size="mini" style="width:100px;margin-left:10px" placeholder="全部" v-model="attached_id" @change="getInfo">
              <el-option v-for="(item,index) in this.attachedList" :key="index" :value="item">
                {{item}}
              </el-option>
            </el-select>
          </div>
          <div class="right">
            <span>精准搜索 :</span>
            <el-input
              size="mini"
              placeholder="请输入病理号"
              prefix-icon="el-icon-search"
              style="width:180px"
              v-model.trim="test_id" @keyup.enter.native="getTable()"
            ></el-input>
            <el-input
              size="mini"
              placeholder="请输入病人ID"
              prefix-icon="el-icon-search"
              style="width:180px"
              v-model.trim="patient_id" @keyup.enter.native="getTable()"
            ></el-input>
            <el-input
              size="mini"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              style="width:180px"
              v-model.trim="name" @keyup.enter.native="getTable()"
            ></el-input>
            <el-button type="primary" size="mini" @click="getTable">确定</el-button>
          </div>
        </div>
        <div class="down">
          <el-table
            ref="multipleTable"
            :data="tablelist"
            tooltip-effect="dark"
            style="width: 100%"
            border
            stripe
            :header-cell-style="{color:'#333333'}" 
          >
            <el-table-column prop="patient_id" label="病人ID"  sortable></el-table-column>
            <el-table-column prop="test_id" label="病理号"  sortable></el-table-column>
            <el-table-column prop="name" label="姓名"  sortable></el-table-column>
            <el-table-column prop="diagnosis_type" label="就诊类型"  sortable></el-table-column>
            <el-table-column prop="sex" label="性别"  sortable></el-table-column>
            <el-table-column prop="age" label="年龄" wsortable></el-table-column>
            <el-table-column
              prop="diagnosis_origin"
              label="原单位诊断"
              show-overflow-tooltip           
              sortable
            ></el-table-column>
            <el-table-column fixed="right" label="操作" >
              <template slot-scope="scope" >
                <el-button
                  type="text"
                  size="small"
                  @click="tianjia(scope.row)"
                  v-if="scope.row.attached == 0"
                >添加</el-button>
                <div v-else>
                <el-button
                  type="text"
                  size="small"
                  @click="bianji(scope.row)"           
                ><span style="margin-left:5px">编辑</span></el-button>
                <el-button type="text" size="small" @click="del(scope.row)"><span style="margin-left:5px">删除</span></el-button>
                </div>
              </template>

            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.page"
            :page-sizes="[10]"
            :page-size="queryInfo.pagerows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryInfo.count"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--遮罩 -->
    <div class="YCon" v-if="zhezhao" :model="editForm">
      <div class="out" v-loading="loading"  element-loading-text="正在识别中，请稍后"
          element-loading-spinner="el-icon-loading">
        <div class="header">
          <span>填写病理信息</span>
          <span>
            <i class="iconfont iconx" @click="zhezhao =!zhezhao"></i>
          </span>
        </div>
        <!-- 原医疗机构-->
        <el-collapse class="origin" v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
              <i class="iconfont icontubiaozhizuo-"></i>
              {{diagnosis_1_info.name}}
            </template>
            <div class="origindown">
              <!--报告信息 -->
              <div class="sickIH">
                <div class="title">
                  <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                  {{reportMessage.name}}:
                </div>
                <div class="sickItem">
                  <span>{{fMInstitution.organization.field_title}}:</span>
                  <el-input
                    type="text"
                    v-model="editForm.organization"
                    placeholder="请输入机构名称"
                    size="mini"
                    style="width:180px"
                  ></el-input>
                </div>
                <div class="sickItem">
                  <span>{{fMInstitution.test_id.field_title}}:</span>
                  <el-input
                    type="text"
                    v-model="editForm.test_id"
                    placeholder="请输入病理号"
                    size="mini"
                    style="width:180px"
                  ></el-input>
                </div>
                <div class="sickItem">
                  <span>{{fMInstitution.application_date.field_title}}:</span>
                  <el-date-picker
                    name="application_date"
                    v-model="editForm.application_date"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                    style="width:180px"
                  ></el-date-picker>
                </div>
                <div class="sickItem">
                  <span>{{fMInstitution.report_date.field_title}}:</span>
                  <el-date-picker
                    name="report_date"
                    v-model="editForm.report_date"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                    style="width:180px"
                  ></el-date-picker>
                </div>
              </div>
              <!--诊断结论 -->
              <div class="sickIH">
                <div class="title">
                  <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                  {{reportResult.name}}:
                </div>
                <div class="sickItem">
                    <span>
                      病理类型：
                    </span>
                    <el-select
                      v-model="editForm.diagnosis1"
                      size="mini"
                      style="width:300px"
                      clearable
                      @change="getJilian1"
                      filterable>
                      <el-option
                        v-for="(item,index) in  this.onechoose"
                        :key="index"
                        :value="item.name">
                        <span>{{item.name}}</span>
                      </el-option>
                    </el-select>

                    <el-select
                      v-model="editForm.diagnosis2"
                      size="mini"
                      style="width:300px"
                      clearable
                      @change="getJilian2"
                      filterable>
                      <el-option
                        v-for="(item,index) in  this.twochoose"
                        :key="index"
                        :value="item.name">
                        <span>{{item.name}}</span>
                      </el-option>
                    </el-select>
                  </div>
                  <div class="sickItem" v-if="this.editForm.diagnosis2 === '其他'">
                    其他类型 :
                    <el-input size='mini' placeholder="请输入其他类型" style="width:300px"   v-model="editForm.other"></el-input>
                  </div>
                  <div class="sickItem" v-if="this.editForm.diagnosis2 != ''">
                    <span>病理亚型：</span>
                    <el-select
                      
                      v-model="editForm.diagnosis3"
                      size="mini"
                      style="width:300px"
                      clearable
                      @change="no()"
                      filterable>
                      <el-option
                        v-for="(item,index) in  this.threechoose"
                        :key="index"
                        :value="item.name">
                        <span>{{item.name}}</span>
                      </el-option>
                    </el-select>

                    
                  </div>

                  <div class="sickItem">
                    级别：
                    <el-select v-model="editForm.grade" size="mini" style="width:300px" clearable filterable
                      >
                      <el-option v-for="(item,index) in  this.levelList" :key="index" :value="item">
                        <span>{{item}}</span>
                      </el-option>
                    </el-select>
                  </div>
              </div>

              <!--报告质量  可折叠-->
              <el-collapse-item  name="2">
                <template slot="title" style="background-color:rgba(172,172,172,0.19)">
                  <div class="title" >
                  <i class="iconfont icontubiaozhizuo-"></i>
                      <!-- <i class="iconfont icontubiaozhizuo-"></i>  {{reportMass.name}}:  style="margin-left:50px"-->                      
                      <span                       
                      >{{fMInstitution.report_quality.field_title}} :</span>
                      <el-select
                        placeholder="请选择"
                        name="report_quality"
                        v-model="editForm.report_quality"
                        size="mini"
                      >
                        <el-option
                          v-for="(item,index) in fMInstitution.report_quality.field_values"
                          :key="index"
                          :value="item"
                        >
                          <span>{{item}}</span>
                        </el-option>
                      </el-select>
                    </div>
                </template>
                   
                <div class="sickIH">
                  <div class="kuai">
                    <div class="p-one">
                      <span class="titles">病理检材质量</span>
                      <div class="sickItems">
                        <span class="one">{{fMInstitution.he_number.field_title}}:</span>
                        <el-input
                          type="text"
                          v-model="editForm.he_number"
                          size="mini"
                          style="width:100px"
                        ></el-input>
                        {{fMInstitution.he_number.field_tail}}
                      </div>
                      <div class="sickItems">
                        <span class="two">{{fMInstitution.he_quality.field_title}}:</span>
                        <el-select
                          name="he_quality"
                          v-model="editForm.he_quality"
                          size="mini"
                          style="width:90px"
                        >
                          <el-option
                            v-for="(item,index) in fMInstitution.he_quality.field_values"
                            :key="index"
                            :value="item"
                          >
                            <span>{{item}}</span>
                          </el-option>
                        </el-select>
                      </div>
                      <div class="sickItems">
                        <span class="three">{{fMInstitution.ihc_number.field_title}}:</span>
                        <el-input
                          type="text"
                          v-model="editForm.ihc_number"
                          size="mini"
                          style="width:100px"
                        ></el-input>
                        {{fMInstitution.he_number.field_tail}}
                      </div>
                      <div class="sickItems">
                        <span class="four">{{fMInstitution.ihc_quality.field_title}}:</span>
                        <el-select
                          name="ihc_quality"
                          v-model="editForm.ihc_quality"
                          size="mini"
                          style="width:90px"
                        >
                          <el-option
                            v-for="(item,index) in fMInstitution.ihc_quality.field_values"
                            :key="index"
                            :value="item"
                          >
                            <span>{{item}}</span>
                          </el-option>
                        </el-select>
                      </div>
                      <div class="sickItems">
                        <span class="five">{{fMInstitution.problem_slice.field_title}}</span>
                        <el-select
                          name="problem_slice"
                          v-model="editForm.problem_slice"
                          size="mini"
                          style="width:90px"
                        >
                          <el-option
                            v-for="(item,index) in fMInstitution.problem_slice.field_values"
                            :key="index"
                            :value="item"
                          >
                            <span>{{item}}</span>
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="p-two">
                      <span class="titles">病理会诊申请单质量：</span>
                      <div class="sickItems">
                        <span class="h">{{fMInstitution.patient_info.field_title}}:</span>
                        <el-select
                          name="patient_info"
                          v-model="editForm.patient_info"
                          size="mini"
                          style="width:90px"
                        >
                          <el-option
                            v-for="(item,index) in fMInstitution.patient_info.field_values"
                            :key="index"
                            :value="item"
                          >
                            <span>{{item}}</span>
                          </el-option>
                        </el-select>
                      </div>
                      <div class="sickItems">
                        <span class="h">{{fMInstitution.history_info.field_title}}:</span>
                        <el-select
                          name="history_info"
                          v-model="editForm.history_info"
                          size="mini"
                          style="width:90px"
                        >
                          <el-option
                            v-for="(item,index) in fMInstitution.history_info.field_values"
                            :key="index"
                            :value="item"
                          >
                            <span>{{item}}</span>
                          </el-option>
                        </el-select>
                      </div>
                      <div class="sickItems">
                        <span class="h">{{fMInstitution.sample_info.field_title}}:</span>
                        <el-select
                          name="sample_info"
                          v-model="editForm.sample_info"
                          size="mini"
                          style="width:90px"
                        >
                          <el-option
                            v-for="(item,index) in fMInstitution.sample_info.field_values"
                            :key="index"
                            :value="item"
                          >
                            <span>{{item}}</span>
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="p-three">
                      <span class="titles">其他临床资料提交情况：</span>
                      <div class="sickItems">
                        <span>{{fMInstitution.record.field_title}}:</span>
                        <el-select
                          name="record"
                          v-model="editForm.record"
                          size="mini"
                          style="width:90px"
                        >
                          <el-option
                            v-for="(item,index) in fMInstitution.record.field_values"
                            :key="index"
                            :value="item"
                          >
                            <span>{{item}}</span>
                          </el-option>
                        </el-select>
                      </div>
                      <div class="sickItems">
                        <span>{{fMInstitution.helper_report.field_title}}:</span>
                        <el-select
                          name="helper_report"
                          v-model="editForm.helper_report"
                          size="mini"
                          style="width:90px"
                        >
                          <el-option
                            v-for="(item,index) in fMInstitution.helper_report.field_values"
                            :key="index"
                            :value="item"
                          >{{item}}</el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
              
            </div>
          </el-collapse-item>
          <!--上传图片 -->
          
        <!--<el-upload   
      
          :on-preview="handlePreview"
          :on-remove="handleRemovefile"
          :file-list="fileList"
           list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>-->

        <el-upload   v-model="editForm.img"
          :action="actionURL"                
          :accept="'image/*'"        
          list-type="picture-card" 
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="handleBeforeUpload"
          :on-progress="handleProgress">    
          <img  :src="this.src" v-show="this.src != ''" width="900px">               
          <i  v-show="this.src  == ''" class="el-icon-plus"></i>

        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="OCR(file)">
              <i class="iconfont iconOCRshibieyichangjilu"></i>
            </span>
            <span      
              class="el-upload-list__item-delete"
              @click="handleRemovefile(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>

        </el-upload>     
          <el-dialog :visible.sync="dialogVisible">     
            <img  :src="img" width="1000px">      
          </el-dialog>  
        </el-collapse>                
         <!--<img  :src="this.src" v-show="this.editForm.pics != ''">   -->     
        <div class="foot">     
          <el-button style="margin-right:10px" @click="handleRemove()">清空</el-button>
          <el-button @click="baocun(editForm)">保存</el-button>
        </div>
      </div>
    </div>
    <!--分组 -->
    <div class="out" v-if="!group" :data="data">
      <div class="nei">
        <div class="title">
          <span>请选择分组</span>
          <span @click="group =! group">
            <i class="iconfont iconx"></i>
          </span>
        </div>
        <div class="mian">
          <div class="ming">
            <span>数据集名称：</span>
            <el-input style="width:400px" size="small" v-model="data.file_name"></el-input>
          </div>
          <div class="cun">
            <span>存储位置：</span>
            <el-input style="width:400px" size="small" v-model="item"></el-input>
          </div>
          <div class="sousuo">
            <el-input placeholder="请输入分组关键词..." style="width:500px">
              <el-button slot="append">搜索</el-button>
            </el-input>
          </div>
          <div class="groupList">
            <el-button
              style="width:300px"
              @click="addGroup(item)"
              v-model="data.location"
              v-for="(item, index) in groupLists"
              :key="index"
              :value="item"
            >{{item}}</el-button>
          </div>
          <div class="name">
            <span>新建分组名称 ：</span>
            <el-input placeholder="请输入分组名称..." style="width:380px">
              <el-button slot="append">保存</el-button>
            </el-input>
          </div>
          <div class="button">
            <el-button plain size="small" @click="group =! group">取消</el-button>
            <el-button plain size="small" @click="sure(id)">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import uuid from "uuid";
import allMessage from "../../staic/allMessage.json";
export default {
  created() {  
    this.getTableList();
    this.getgroupList();
    this.getJilian();
  },
  methods: {
    // 病理类型
    getJilian() {
      // console.log(this.editForm.diagnosis1_normal);
      const res = this.axios.get("report/jilian.php").then(res => {
        console.log(res);
        
        this.onechoose = res.data.option
        console.log(this.onechoose)
      });
    },
    getJilian1() {
      // console.log(this.editForm.diagnosis1_normal);
      const res = this.axios
        .get("report/jilian.php", {
          params: { name: this.editForm.diagnosis1 }
        })
        .then(res => {
          console.log(res);
          this.twochoose = res.data.option;
        });
      this.editForm.diagnosis2 = "";
      this.editForm.diagnosis3 = "";
    },
    getJilian2() {
      console.log(this.editForm.diagnosis2);
      const res = this.axios
        .get("report/jilian.php", {
          params: { name: this.editForm.diagnosis2 }
        })
        .then(res => {
          console.log(res);
          this.threechoose = res.data.option;
        });
      this.editForm.diagnosis3 = "";
      this.$forceUpdate()
    },
    no(){
      // 强制刷新值
      this.$forceUpdate()
    },
    // 上传图片
    handleSuccess(response, file, fileList) {
      this.$message("上传成功");
      // console.log(this.editForm.imageUrl)
      console.log(file.raw)
      console.log(file) 
      console.log(file.response.id)
      this.pic_id = file.response.id
      console.log(this)
      this.pics = file.response.id   
      // this.img = file.url
      // console.log(this.img)
      console.log(this.pics)      
    },
    handleError() {
      this.$error("上传失败,请重新上传图片!");
    },
    handleBeforeUpload(file) {
      const isImage = file.type.includes("image");
      if (!isImage) {
        this.$message.error("上传文件类型必须是图片!");
      }
      return isImage ;
    },
    handleProgress(event, file, fileList) {
      // this.loading = true;  //  上传时执行loading事件
    },
    // 点击加号查看图片
    handlePictureCardPreview(file) {
      this.img = file.url;
      this.dialogVisible = true;     
    },
    // OCR识别
    OCR(file){
        let id 
        this.loading = true;
        const res = this.axios.get('diagnosis_origin/ocr.php?id=' + file.response.id).then( res=>{
          if(res.statusText = 'ok'){
             this.$alert('识别成功', '标题名称', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.loading = false;
                var jsonstr = JSON.stringify(res);
                console.log('json文本',jsonstr)
                // this.response = res
                this.dataLists = []
                this.dataLists = res.data
                // this.dataLists = JSON.stringify(this.dataLists)
                console.log('this.dataLists',this.dataLists)
                this.dataLists.map( (item,index) =>{
                  console.log(item)
                  this.editForm = {}
                  this.editForm.application_date = item.basic.application_date
                  this.editForm.test_id = item.basic.test_id
                  this.editForm.report_date = item.basic.report_date                  
                  this.diagnosis_current = item.diagnosis_current
                  this.diagnosis_current.conclusion.map( (item,index) =>{
                    console.log(item)
                    this.editForm.diagnosis1 = item.diagnosis1_normal
                    this.editForm.diagnosis2 = item.diagnosis2_normal
                  })
                  console.log(this.editForm)
                  this.diagnosis_txt = item.diagnosis_txt
                  console.log(this.diagnosis_current)
                  console.log(this.diagnosis_txt)         
                })
              }
            });
           
          }else{
             this.$alert('识别失败', '标题名称', {
              confirmButtonText: '确定',
              type: 'error',             
            });
          }
         
        })
      },
    // 获取分组
    getgroupList() {
      const { data: res } = this.axios.get("group/list.php").then(res => {
        console.log(res);
        this.groupList = res.data.data
        console.log(res.data.data);
      });
    },
    // 点击选择分组
    group_id() {       
      console.log(this.it)
      this.getTableList()
    },
    // 获取诊断信getTableList息
    getInfo(){
      console.log(this.attached)
      this.getTableList2()
    },
    // 解析
    jiexi() {
      this.$alert("解析错误，请校验文字格式！", "解析错误", {
        confirmButtonText: "知道了",
        type: "warning",
        center: true
      });
    },
    // 点击删除
    async del(row) {
      console.log(row)
      console.log(row.id)
      let report_id= ''
      const  res  = await this.axios("diagnosis_origin/del.php", {
        params: {report_id:row.id }
      }).then(res => {
        this.$confirm("确定删除该数据？是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {                      
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            console.log(res)
            this.tablelist = []
            this.getTableList()
            // this.editForm = {}
            // console.log(this.editForm)
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });  

    },
    // 点击添加
    async tianjia(row) {   
      console.log(row);
      this.rowAdd = row
      this.zhezhao = true;
      this.id = this.rowAdd.id;
      this.attached = this.rowAdd.attached;
      // this.getTableList()
      this.editForm = {}
      this.src = ''   
      this.img = []  
    },
    // 点击原单位编辑
    async bianji(row){
      this.zhezhao = true;
      console.log(row);
      this.rowAdd = row
      const { data: res } = await this.axios.get("diagnosis_origin/one.php",{params:{id:row.id }
      });
      console.log(row.id);
      console.log(res);
      this.editForm = res;
      console.log(this.editForm);    
      if(res != null){
        this.img = ''
        this.editForm = res;
        if(this.editForm.report_date === '0000-00-00'){
          this.editForm.report_date = ''
        } 
        if(this.editForm.application_date === '0000-00-00'){
          this.editForm.application_date = ''
        }  
        if(this.editForm.img){     
          this.img = this.editForm.img   
          // console.log(this.img[0])
        }
       console.log(this.axios.defaults.geturl)
        if(this.img){
          this.src = this.axios.defaults.geturl + this.img
          console.log(this.src)
        }else{
          this.src = ''
          console.log(this.src)
        }       
      }  else{
        this.editForm = {};
        return
      }    
    },
    handleRemovefile(file, fileList) {
        console.log(file, fileList);
      },
    // 清空
    handleRemove() {
      const res = this.axios.get('upload_file/del.php',{params:{id:this.editForm.pics}}).then( res=>{
        console.log(res)
      })
      this.src = ''
      this.editForm = {}
      this.pics = ''
      this.img = ''
      this.editForm.pics = ''
      console.log(this.src)
      console.log(this.editForm)  
    },
    // 保存
    baocun(editForm) {
      // console.log(this)
      this.editForm.pics = this.pics 
      // console.log(this.editForm.uid)
      this.zhezhao = !this.zhezhao;      
      console.log(this.rowAdd)
      console.log(this.rowAdd.attached)
      // this.jilian = this.editForm.jilian;
      this.editForm.detail_type = "淋巴瘤";
      console.log(this.editForm);
        this.axios.post("diagnosis_origin/add.php",{params:{id:this.rowAdd.id,data:this.editForm}}).then(res => {
          console.log("res:", res);
          // console.log(res.data)
          var result = res.data; //JSON.parse(res.body);
          if (result.result == "done") {
            this.$alert("提交成功", "提交结果", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {  
                this.rowAdd.attached = this.rowAdd.id 
                this.getTableList();                              
              }
            });
          } else {
            this.$alert("提交失败", "提交结果", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
          }
        });
    }, 
    // 获取病理号
    async getTableList() {
      // alert(1)
      // console.log(it)
      // console.log(it.group_name)
      let group_id = "";
      if(this.it == ''){
        const { data: res } = await this.axios.get("diagnosis_origin/list.php", {
          params: { page: this.queryInfo.page}
        });
        console.log("getTableList",res);
        this.tablelist = res.data;
        console.log(res.data);
        this.queryInfo.page = parseInt(res.page);
        this.queryInfo.count = parseInt(res.count); //总条数
        this.queryInfo.pagerows = res.pagerows; //每页显示多少条
      }else{
        const { data: res } = await this.axios.get("diagnosis_origin/list.php", {
          params: { page: this.queryInfo.page, group_id:this.it}
        });
        console.log("getTableList",res);
        this.tablelist = res.data;
        console.log(res.data);
        this.queryInfo.page = parseInt(res.page);
        this.queryInfo.count = parseInt(res.count); //总条数
        this.queryInfo.pagerows = res.pagerows; //每页显示多少条
      }
      
    },
    // 筛选病理号
    async getTableList2() {
      // alert(1)
      // console.log(it)
      // console.log(it.group_name)
      let group_id = "";
      let attached = "";
      const { data: res } = await this.axios.get("diagnosis_origin/list.php", {
        params: { page: this.queryInfo.page, group_id:this.it,attached:this.attached_id}
      });
      console.log("getTableList",res);
      this.tablelist = res.data;
      console.log(res.data);
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
      this.queryInfo.pagerows = res.pagerows; //每页显示多少条
    },
    // 搜索
    async getTable() {
      // console.log(row.id)
      let group_id = "";
      const { data: res } = await this.axios.get("diagnosis_origin/list.php", {
        params:{name: this.name, test_id: this.test_id,group_id :this.it,patient_id:this.patient_id}
      });
      // console.log(this.test_id)
      // console.log(this.name)
      this.tablelist = res.data;
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
    },
    // 切换每页显示多少条
    handleSizeChange(newSize) {
      this.queryInfo.pagerows = newSize;
      this.getTableList();
    },
    // 点击页数
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getTableList();
    },   
  },
  data() {
    return {
      loading : false,
      pic_id:'',
      levelList: ["1", "2", "3A", "3B", "1-2", "3"],
      // actionURL:this.baseURLStr + 'upload_file/add.php',
      actionURL:this.axios.defaults.baseURL + 'upload_file/add2.php',
      diagnosis1: "",    
      grade:'',    //级别
      other:'',   //其他
      diagnosis2: "",
      diagnosis3: "",
      onechoose: [],
      twochoose: [],
      threechoose: [],
      attached_id:'',         //下拉选择
      src:'',    //获取图片路径
      img:'',    //图片
      // dialogImageUrl: '',
      dialogVisible: false,
      pics:'',    //  上传图片的数组
      imageUrl: '',
      pic:'',
      rowAdd:'',   //点击添加获取的row
      row:'',
      yuanlist:'',
      attachedList:['有','无','全部'],   //原单位下拉
      it:'',
      groupList:[],
      item: "",
      // 折叠面板默认打开
      activeNames: ["1"],
      // 分组
      group: false,
      groupLists: [
        "肝癌多中心项目-复旦肿瘤医院",
        "肺癌多中心项目",
        "淋巴瘤的流行病学研究",
        "左半肝胆管腺癌病理分析",
        "未分组"
      ], //分组列表
      // 数据集列表
      data: [],
      attached: "",
      // 上传图片
      // dialogImageUrl: "",
      dialogVisible: false,
      // 弹窗
      zhezhao: false,
      tablelist: [], //病理号数组
      datalist: [], //数据集数组
      group: true,
      // 分页器
      queryInfo: {
        page: 1, //页数
        pagerows: 10, //每页显示的条数
        count: 0 //数据总数
      },
      // 搜索参数
      test_id: "",
      name: "",
      patient_id: "",

      // 遮罩信息
      // 查询到的用户信息对象
      editForm: {},
      origin: {
        organization: "", //机构名称
        test_id: "", //病理号
        application_date: "", //申请日期
        report_date: "", //报告日期
        diagnosis: "", //诊断结论
        type: "", //淋巴瘤细胞来源
        report_quality: "", //原病理报告质量
        he_number: "", //HE切片
        he_quality: "", //质量
        ihc_number: "", //免疫组化切片
        ihc_quality: "", //质量
        problem_slice: "", //是否有制作问题
        patient_info: "", //患者信息是否完整
        history_info: "", //病史是否详细、
        sample_info: "", //取材部位是否清晰
        record: "", //病历资料
        helper_report: "" //重要辅助检查报告
      },
      // 以下是原诊断机构信息
      fMInstitution: {
        organization: {}, //机构名称
        test_id: {}, //病理号
        application_date: {}, //申请日期
        report_date: {}, //报告日期
        diagnosis: {}, //诊断结论
        type: {}, //"淋巴瘤细胞来源"
        report_quality: {}, //"原病理报告质量"
        he_number: {}, //"HE切片"
        he_quality: {}, //"质量"
        ihc_number: {}, //"免疫组化切片"
        ihc_quality: {}, //"质量"
        problem_slice: {}, //"是否有严重制作问题（如卷曲、褶皱等）的切片"
        patient_info: {}, //"患者基本信息是否完整"
        history_info: {}, //"病史摘要是否详细"
        sample_info: {}, //"取材部位是否描述清晰"
        record: {}, //"病历资料"
        helper_report: {} //"重要辅助检查报告"
      },
      diagnosis_1_info: [], //原医疗机构
      diagnosis_1_infoAll: {}, //原医疗机构信息对象
      reportMessage: {}, //报告信息
      reportResult: {}, //报告结论
      reportMass: {}, //报告质量
    };
  },
  mounted() {
    // this.getTableList();
  
    // 原医疗机构诊断
    allMessage.formdata.map((sickItems, index) => {
      if (sickItems.field_index == 1) {
        this.diagnosis_1_info = sickItems;
      }
    });
    this.diagnosis_1_info.items.map((item, index) => {
      if (item.name == "报告信息") {
        this.reportMessage = item;
      } else if (item.name == "诊断结论") {
        this.reportResult = item;
      } else {
        this.reportMass = item;
      }
    });
    // 报告信息内数据
    this.reportMessage.fields.map((item, index) => {
      switch (item.english_name) {
        case "organization":
          this.fMInstitution.organization = item;
          break;
        case "test_id":
          this.fMInstitution.test_id = item;
          break;
        case "application_date":
          this.fMInstitution.application_date = item;
          break;
        case "report_date":
          this.fMInstitution.report_date = item;
          break;
        default:
          break;
      }
      // console.log(this.fMInstitution.organization);
    });

    // 报告结论信息
    this.reportResult.fields.map((item, index) => {
      switch (item.english_name) {
        case "diagnosis":
          this.fMInstitution.diagnosis = item;
          break;
        case "type":
          this.fMInstitution.type = item;
          break;
        default:
          break;
      }
    });

    // 报告质量
    this.reportMass.fields.map((item, index) => {
      switch (item.english_name) {
        case "report_quality":
          this.fMInstitution.report_quality = item;
          break;
        case "he_number":
          this.fMInstitution.he_number = item;
          break;
        case "he_quality":
          this.fMInstitution.he_quality = item;
          break;
        case "ihc_number":
          this.fMInstitution.ihc_number = item;
          break;
        case "ihc_quality":
          this.fMInstitution.ihc_quality = item;
          break;
        case "problem_slice":
          this.fMInstitution.problem_slice = item;
          break;
        case "patient_info":
          this.fMInstitution.patient_info = item;
          break;
        case "history_info":
          this.fMInstitution.history_info = item;
          break;
        case "sample_info":
          this.fMInstitution.sample_info = item;
          break;
        case "record":
          this.fMInstitution.record = item;
          break;
        case "helper_report":
          this.fMInstitution.helper_report = item;
          break;
        default:
          break;
      }
    });
  }
};
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import 'unit.styl'

</style>
