<template>
  <div class="outest">
    <div class="sContainer">
      <span>选择分组 :</span>
      <el-select size="mini" style="width:250px" placeholder="请选择分组" v-model="it" @change="group_id">
        <el-option
          v-for="(it, index) in this.groupList"
          :key="index"
          :label="it.group_name" :value="it" selected="selected"  
        >
          {{it.group_name}}
        </el-option>
      </el-select>
    </div>
    <!--搜索 -->
    <div class="entry">
      <div class="search">
        <div class="up">
          <div class="left">
            <span>原单位诊断信息 :</span>
            <el-select size="mini" style="width:100px;margin-left:10px" placeholder="全部" v-model="yuanlist">
              <el-option v-for="(item,index) in yuanList" :key="index" :value="item">
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
              v-model="test_id"
            ></el-input>
            <el-input
              size="mini"
              placeholder="请输入住院号"
              prefix-icon="el-icon-search"
              style="width:180px"
              v-model="patient_id"
            ></el-input>
            <el-input
              size="mini"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              style="width:180px"
              v-model="name"
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
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="patient_id" label="病人ID" width="200" sortable></el-table-column>
            <el-table-column prop="test_id" label="病理号" width="200" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" width="180" sortable></el-table-column>
            <el-table-column prop="diagnosis_type" label="就诊类型" width="200" sortable></el-table-column>
            <el-table-column prop="sex" label="性别" width="160" sortable></el-table-column>
            <el-table-column prop="age" label="年龄" width="160" sortable></el-table-column>
            <el-table-column
              prop="diagnosis_origin"
              label="原单位诊断"
              show-overflow-tooltip
              width="200"
              sortable
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
              <template slot-scope="scope" >
                <el-button
                  type="text"
                  size="small"
                  @click="tianjia(scope.row)"
                  v-if="scope.row.attached == !0"
                >添加</el-button>
                <div v-else>
                  <el-button
                  type="text"
                  size="small"
                  @click="look(scope.row)"
            
                ><span style="margin-left:5px">查看</span></el-button>
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
          <!--    :current-page="count"                      当前显示的页数
                :page-sizes="[10]"                        切换每页显示的条数
                :page-size="pagerows"                     当前每页显示的条数
                @size-change="handleSizeChange"           点击切换每页显示多少条
                @current-change="handleCurrentChange"     页码值发生了切换
                :total="count"                            共多少条           
                layout="total, sizes, prev, pager, next, jumper"
          -->
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
      <div class="out">
        <div class="header">
          <span>编辑</span>
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
                <!-- 
                <div class="sickItem">
                  <span>{{fMInstitution.diagnosis.field_title}} :</span>
                  <el-select placeholder="请选择" name="diagnosis" v-model="editForm.diagnosis" size="mini" style="width:180px">
                    <el-option
                      v-for="(item,index) in fMInstitution.diagnosis.field_values"
                      :key="index"
                      :value="item"
                    >
                      <span>{{item}}</span>
                    </el-option>
                  </el-select>
                </div>
                <div class="sickItem">
                  <span>{{fMInstitution.type.field_title}} ：</span>
                  <el-select placeholder="请选择" name="type" v-model="editForm.type" size="mini" style="width:180px"> 
                    <el-option
                      :value="fMInstitution.type.field_values"
                    >{{fMInstitution.type.field_values == ""? "无数据" : fMInstitution.type.field_values}}</el-option>
                  </el-select>
                </div>-->
                <div class="sickItem">
                  <span>病理类型:</span>
                  <el-cascader
                    v-model="editForm.jilian"
                    size="mini"
                    :options="options"
                    :props="{ checkStrictly: true }"
                    clearable
                  ></el-cascader>
                </div>
              </div>

              <!--报告质量  可折叠-->
              <div class="sickIH">
                <div class="title">
                  <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                  {{reportMass.name}}:
                  <span
                    style="margin-left:50px"
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
            </div>
          </el-collapse-item>
          <!--上传图片 -->
          <el-upload
            v-model="photo"
            :action="upLoadUrl"
            multiple
            list-type="picture-card"
            ref="imgUpload"
            :on-success="imgSuccess"
            :on-remove="imgRemove"
            accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
            :headers="headerMsg"
            :on-preview="handlePictureCardPreview"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-collapse>
        <div class="foot">
          <el-button @click="qingkong()">清空</el-button>
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
    // this.getTableList();
    this.getgroupList();
  },
  methods: {
    // 上传图片成功
    imgSuccess(res, file, fileList) {
      console.log(res);
      console.log(file);
      console.log(fileList); // 这里可以获得上传成功的相关信息
    },
    // 选择分组
    getgroupList() {
      const { data: res } = this.axios.get("group/list.php").then(res => {
        console.log(res);
        this.groupList = res.data.data;
        // this.groupList.map( ( items ,index ) => {
        //   console.log(items)
        // })
        console.log(res.data.data);
      });
    },
    // 点击选择分组
    group_id(it) {      
      this.it = it
      console.log(this.it)
      this.getTableList(this.it)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
      this.dialogVisible = dialogImageUrl.map(item => {
        return {
          name: item,
          url: item
        };
      });
    },
    // 选择分组假弹窗
    choose() {
      this.$confirm("确定选择该分组？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "选择成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消选择"
          });
        });
    },
    // 解析
    jiexi() {
      this.$alert("解析错误，请校验文字格式！", "解析错误", {
        confirmButtonText: "知道了",
        type: "warning",
        center: true
      });
    },
    // 点击查看--显示某个信息
    async look(row) {
      this.zhezhao = true;
      console.log(row);
      const { data: res } = await this.axios.get("diagnosis_origin/one.php", {
        params: { id: row.id }
      });
      console.log(row.id);
      console.log(res);
      this.editForm = res;
      console.log(this.editForm);
    },
    // 点击删除
    async del(row) {
      console.log(row.id)
      const { data: res } = await this.axios("diagnosis_origin/del.php", {
        params: { id: row.id }
      }).then(res => {
        this.$confirm("确定删除该数据？, 是否继续?", "提示", {
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
            this.getTableList(this.it)
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
      console.log(res);
    },
    // 点击添加
    async tianjia(row) {
      console.log(row);
      this.zhezhao = !this.zhezhao;
      this.id = row.id;
      this.attached = row.attached;
      this.getTableList()
    },
    // 清空
    qingkong() {
      this.zhezhao = !this.zhezhao;
    },
    // 保存
    baocun(id, editForm, attached) {
      this.zhezhao = !this.zhezhao;
      this.id = this.id;
      this.editForm = this.editForm;
      this.jilian = this.editForm.jilian;
      this.photo = this.editForm.photo;
      // console.log(this.jilian);
      this.editForm.detail_type = "淋巴瘤";
      // console.log(this.atstached)
      let data = {
        id: this.id,
        data: this.editForm
      };
      console.log(this.editForm);
      console.log(this.id);

      if (data) {
        console.log(data);
        this.axios.post("diagnosis_origin/add.php", data).then(res => {
          console.log("res:", res);
          // console.log(res.data)
          var result = res.data; //JSON.parse(res.body);
          if (result.result == "done") {
            this.$alert("提交成功", "提交结果", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.attached = 1;
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
      } else {
        console.log("error submit!!");
        return false;
      }
    },
  
    // 获取病理号
    async getTableList(it) {
      // alert(1)
      // console.log(it)
      // console.log(it.group_name)
      let group_id = "";
      const { data: res } = await this.axios.get("diagnosis_origin/list.php", {
        params: { page: this.queryInfo.page, group_id:this.it.id}
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
      const { data: res } = await this.axios.get("diagnosis_origin/list.php", {
        params:{name: this.name, test_id: this.test_id }
      });
      // console.log(this.test_id)
      // console.log(this.name)
      this.tablelist = res.data;
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
      // console.log(res.data)
      // console.log("getTableList",res);
      // this.queryInfo.page = res.page
      // this.count = res.count  //总条数
      // this.queryInfo.pagerows = res.pagerows  //每页显示多少条
      // console.log(this.queryInfo.page);console.log(this.queryInfo.count);console.log(this.queryInfo.pagerows);
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
    // 点击原单位编辑
    async bianji(row){
      this.zhezhao = true;
      console.log(row);
      const { data: res } = await this.axios.get("diagnosis_origin/one.php", {
        params: { id: row.id }
      });
      console.log(row.id);
      console.log(res);
      this.editForm = res;
      console.log(this.editForm);
    }
  },
  data() {
    return {
      yuanlist:'',
      yuanList:['有','无','全部'],   //原单位下拉
      it:'',
     groupList:[],
      photo: "",
      upLoadUrl: "http://106.13.49.232/cedar/api/diagnosis_origin/add.php",
      // 级联选择器
      options: [
        {
          value: "成熟T和NK细胞淋巴瘤",
          label: "成熟T和NK细胞淋巴瘤",
          children: [
            {
              value: "T细胞淋巴瘤（亚型无法确定）",
              label: "T细胞淋巴瘤（亚型无法确定）"
            },
            {
              value: "T幼淋巴细胞白血病",
              label: "T幼淋巴细胞白血病"
            },
            {
              value: "T大颗粒淋巴细胞白血病",
              label: "T大颗粒淋巴细胞白血病"
            },
            {
              value: "NK细胞慢性淋巴增殖性疾病",
              label: "NK细胞慢性淋巴增殖性疾病"
            },
            {
              value: "侵袭性NK细胞白血病",
              label: "侵袭性NK细胞白血病"
            },
            {
              value: "儿童系统性EBV阳性T细胞淋巴瘤",
              label: "儿童系统性EBV阳性T细胞淋巴瘤"
            },
            {
              value: "慢性活动性EBV感染（T细胞和NK细胞型），系统性",
              label: "慢性活动性EBV感染（T细胞和NK细胞型），系统性"
            },
            {
              value: "种痘水疱病样淋巴组织增殖性疾病",
              label: "种痘水疱病样淋巴组织增殖性疾病"
            },
            {
              value: "严重蚊虫叮咬过敏症",
              label: "严重蚊虫叮咬过敏症"
            },
            {
              value: "成人T细胞白血病/淋巴瘤",
              label: "成人T细胞白血病/淋巴瘤"
            },
            {
              value: "结外NK/T细胞淋巴瘤，鼻型",
              label: "结外NK/T细胞淋巴瘤，鼻型"
            },
            {
              value: "肠病相关T细胞淋巴瘤",
              label: "肠病相关T细胞淋巴瘤"
            },
            {
              value: "单形性嗜上皮性肠道T细胞淋巴瘤",
              label: "单形性嗜上皮性肠道T细胞淋巴瘤"
            },
            {
              value: "肠道T细胞淋巴瘤，非特指型",
              label: "肠道T细胞淋巴瘤，非特指型"
            },
            {
              value: "胃肠道惰性T细胞增殖性疾病",
              label: "胃肠道惰性T细胞增殖性疾病"
            },
            {
              value: "肝脾T细胞淋巴瘤",
              label: "肝脾T细胞淋巴瘤"
            },
            {
              value: "皮下脂膜炎样T细胞淋巴瘤",
              label: "皮下脂膜炎样T细胞淋巴瘤"
            },
            {
              value: "蕈样肉芽肿",
              label: "蕈样肉芽肿"
            },
            {
              value: "Sezary综合征",
              label: "Sezary综合征"
            },
            {
              value: "淋巴瘤样丘疹病",
              label: "淋巴瘤样丘疹病"
            },
            {
              value: "原发性皮肤间变性大细胞淋巴瘤",
              label: "原发性皮肤间变性大细胞淋巴瘤"
            },
            {
              value: "原发性皮肤γδT细胞淋巴瘤",
              label: "原发性皮肤γδT细胞淋巴瘤"
            },
            {
              value: "原发性皮肤CD8阳性侵袭性嗜表皮性细胞毒性T细胞淋巴瘤",
              label: "原发性皮肤CD8阳性侵袭性嗜表皮性细胞毒性T细胞淋巴瘤"
            },
            {
              value: "原发性皮肤肢端CD8阳性T细胞淋巴瘤",
              label: "原发性皮肤肢端CD8阳性T细胞淋巴瘤"
            },
            {
              value: "原发性皮肤CD4阳性小/中等大小T细胞增殖性疾病",
              label: "原发性皮肤CD4阳性小/中等大小T细胞增殖性疾病"
            },
            {
              value: "外周T细胞淋巴瘤，非特指型",
              label: "外周T细胞淋巴瘤，非特指型"
            },
            {
              value: "血管免疫母细胞T细胞淋巴瘤",
              label: "血管免疫母细胞T细胞淋巴瘤"
            },
            {
              value: "滤泡T细胞淋巴瘤",
              label: "滤泡T细胞淋巴瘤"
            },
            {
              value: "伴滤泡辅助T细胞表型的结内外周T细胞淋巴瘤",
              label: "伴滤泡辅助T细胞表型的结内外周T细胞淋巴瘤"
            },
            {
              value: "间变性大细胞淋巴瘤，ALK阳性",
              label: "间变性大细胞淋巴瘤，ALK阳性"
            },
            {
              value: "间变性大细胞淋巴瘤，ALK阴性",
              label: "间变性大细胞淋巴瘤，ALK阴性"
            },
            {
              value: "乳房植入物相关的间变性大细胞淋巴瘤",
              label: "乳房植入物相关的间变性大细胞淋巴瘤"
            },
            {
              value: "其他T细胞淋巴瘤",
              label: "其他T细胞淋巴瘤"
            }
          ]
        },
        {
          value: "前驱淋巴性肿瘤",
          label: "前驱淋巴性肿瘤",
          children: [
            {
              value: "B淋巴母细胞白血病/淋巴瘤，非特殊类型",
              label: "B淋巴母细胞白血病/淋巴瘤，非特殊类型"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（9；22）（q34.1；q11.2）；BCR-ABL1",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（9；22）（q34.1；q11.2）；BCR-ABL1"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴t（v；11q23.3）；KMT2A重排",
              label: "B淋巴母细胞白血病/淋巴瘤伴t（v；11q23.3）；KMT2A重排"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（12；21）（p13.2；q22.1）；ETV6-RUNX1",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（12；21）（p13.2；q22.1）；ETV6-RUNX1"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴超二倍体",
              label: "B淋巴母细胞白血病/淋巴瘤伴超二倍体"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴低二倍体",
              label: "B淋巴母细胞白血病/淋巴瘤伴低二倍体"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（5；14）（q31.1；q32.3）；IL3-IGH",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（5；14）（q31.1；q32.3）；IL3-IGH"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（1；19）（q23；p13.3）；TCF3-PBX1",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（1；19）（q23；p13.3）；TCF3-PBX1"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤，BCR-ABL1样",
              label: "B淋巴母细胞白血病/淋巴瘤，BCR-ABL1样"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴iAMP21",
              label: "B淋巴母细胞白血病/淋巴瘤伴iAMP21"
            },
            {
              value: "T淋巴母细胞白血病/淋巴瘤",
              label: "T淋巴母细胞白血病/淋巴瘤"
            },
            {
              value: "早期T前驱淋巴母细胞白血病",
              label: "早期T前驱淋巴母细胞白血病"
            },
            {
              value: "自然杀伤（NK）淋巴母细胞白血病/淋巴瘤",
              label: "自然杀伤（NK）淋巴母细胞白血病/淋巴瘤"
            }
          ]
        },
        {
          value: "成熟B细胞淋巴瘤",
          label: "成熟B细胞淋巴瘤",
          children: [
            {
              value: "B细胞淋巴瘤（亚型无法确定）",
              label: "B细胞淋巴瘤（亚型无法确定）"
            },
            {
              value: "慢性淋巴细胞白血病（CLL）/小淋巴细胞淋巴瘤（SLL）",
              label: "慢性淋巴细胞白血病（CLL）/小淋巴细胞淋巴瘤（SLL）"
            },
            {
              value: "单克隆B淋巴细胞增多症（MBL）",
              label: "单克隆B淋巴细胞增多症（MBL）"
            },
            {
              value: "B幼淋巴细胞白血病",
              label: "B幼淋巴细胞白血病"
            },
            {
              value: "脾边缘区细胞淋巴瘤",
              label: "脾边缘区细胞淋巴瘤"
            },
            {
              value: "毛细胞白血病",
              label: "毛细胞白血病"
            },
            {
              value: "脾B细胞淋巴瘤/白血病，不能分类",
              label: "脾B细胞淋巴瘤/白血病，不能分类"
            },
            {
              value: "脾弥漫性红髓小B细胞淋巴瘤",
              label: "脾弥漫性红髓小B细胞淋巴瘤"
            },
            {
              value: "毛细胞白血病变异型",
              label: "毛细胞白血病变异型"
            },
            {
              value: "淋巴浆细胞淋巴瘤",
              label: "淋巴浆细胞淋巴瘤"
            },
            {
              value: "意义不明的单克隆丙种球蛋白病（MGUS），IgM型",
              label: "意义不明的单克隆丙种球蛋白病（MGUS），IgM型"
            },
            {
              value: "Mu重链病",
              label: "Mu重链病"
            },
            {
              value: "Gamma重链病",
              label: "Gamma重链病"
            },
            {
              value: "Alpha重链病",
              label: "Alpha重链病"
            },
            {
              value: "意义不明的单克隆丙种球蛋白病（MGUS），非IgM型",
              label: "意义不明的单克隆丙种球蛋白病（MGUS），非IgM型"
            },
            {
              value: "浆细胞骨髓瘤",
              label: "浆细胞骨髓瘤"
            },
            {
              value: "骨孤立性浆细胞瘤",
              label: "骨孤立性浆细胞瘤"
            },
            {
              value: "骨外浆细胞瘤",
              label: "骨外浆细胞瘤"
            },
            {
              value: "单克隆免疫球蛋白沉积病",
              label: "单克隆免疫球蛋白沉积病"
            },
            {
              value: "结外黏膜相关淋巴组织边缘区淋巴瘤（MALT淋巴瘤）",
              label: "结外黏膜相关淋巴组织边缘区淋巴瘤（MALT淋巴瘤）"
            },
            {
              value: "结内边缘区淋巴瘤",
              label: "结内边缘区淋巴瘤"
            },
            {
              value: "滤泡性淋巴瘤",
              label: "滤泡性淋巴瘤",
              children: [
                {
                  value: "1",
                  label: "1"
                },
                {
                  value: "2",
                  label: "2"
                },
                {
                  value: "3a",
                  label: "3a"
                },
                {
                  value: "3b",
                  label: "3b"
                }
              ]
            },
            {
              value: "儿童型滤泡性淋巴瘤",
              label: "儿童型滤泡性淋巴瘤"
            },
            {
              value: "伴IRF4重排大B细胞淋巴瘤",
              label: "伴IRF4重排大B细胞淋巴瘤"
            },
            {
              value: "原发皮肤滤泡中心细胞淋巴瘤",
              label: "原发皮肤滤泡中心细胞淋巴瘤"
            },
            {
              value: "套细胞淋巴瘤",
              label: "套细胞淋巴瘤"
            },
            {
              value: "弥漫性大B细胞淋巴瘤（DLBCL），非特指型",
              label: "弥漫性大B细胞淋巴瘤（DLBCL），非特指型",
              children: [
                {
                  value: "生发中心亚型",
                  label: "生发中心亚型"
                },
                {
                  value: "活化B细胞亚型",
                  label: "活化B细胞亚型"
                }
              ]
            },
            {
              value: "富于T细胞/组织细胞大B细胞淋巴瘤",
              label: "富于T细胞/组织细胞大B细胞淋巴瘤"
            },
            {
              value: "原发中枢神经系统弥漫性大B细胞淋巴瘤",
              label: "原发中枢神经系统弥漫性大B细胞淋巴瘤"
            },
            {
              value: "原发皮肤弥漫性大B细胞淋巴瘤，腿型",
              label: "原发皮肤弥漫性大B细胞淋巴瘤，腿型"
            },
            {
              value: "EBV+弥漫性大B细胞淋巴瘤，非特指型",
              label: "EBV+弥漫性大B细胞淋巴瘤，非特指型"
            },
            {
              value: "EBV+黏膜皮肤溃疡",
              label: "EBV+黏膜皮肤溃疡"
            },
            {
              value: "慢性炎症相关弥漫性大B细胞淋巴瘤",
              label: "慢性炎症相关弥漫性大B细胞淋巴瘤"
            },
            {
              value: "淋巴瘤样肉芽肿",
              label: "淋巴瘤样肉芽肿"
            },
            {
              value: "原发性纵隔（胸腺）大B细胞淋巴瘤",
              label: "原发性纵隔（胸腺）大B细胞淋巴瘤"
            },
            {
              value: "血管内大B细胞淋巴瘤",
              label: "血管内大B细胞淋巴瘤"
            },
            {
              value: "ALK阳性大B细胞淋巴瘤",
              label: "ALK阳性大B细胞淋巴瘤"
            },
            {
              value: "浆母细胞性淋巴瘤",
              label: "浆母细胞性淋巴瘤"
            },
            {
              value: "原发渗出性淋巴瘤",
              label: "原发渗出性淋巴瘤"
            },
            {
              value: "多中心Castleman病",
              label: "多中心Castleman病"
            },
            {
              value: "HHV8阳性弥漫性大B细胞淋巴瘤，非特指型",
              label: "HHV8阳性弥漫性大B细胞淋巴瘤，非特指型"
            },
            {
              value: "HHV8阳性亲生发中心淋巴组织增殖性疾病",
              label: "HHV8阳性亲生发中心淋巴组织增殖性疾病"
            },
            {
              value: "Burkitt淋巴瘤",
              label: "Burkitt淋巴瘤"
            },
            {
              value: "伴11q异常的Burkitt样淋巴瘤",
              label: "伴11q异常的Burkitt样淋巴瘤"
            },
            {
              value: "高级别B细胞淋巴瘤，伴MYC和BCL2和（或）BCL6重排",
              label: "高级别B细胞淋巴瘤，伴MYC和BCL2和（或）BCL6重排"
            },
            {
              value: "高级别B细胞淋巴瘤，非特指型",
              label: "高级别B细胞淋巴瘤，非特指型"
            },
            {
              value: "介于DLBCL和经典霍奇金淋巴瘤之间的不能分类的B细胞淋巴瘤",
              label: "介于DLBCL和经典霍奇金淋巴瘤之间的不能分类的B细胞淋巴瘤"
            },
            {
              value: "其他B细胞淋巴瘤",
              label: "其他B细胞淋巴瘤"
            }
          ]
        },
        {
          value: "霍奇金淋巴瘤",
          label: "霍奇金淋巴瘤",
          children: [
            {
              value: "霍奇金淋巴瘤（亚型无法确定）",
              label: "霍奇金淋巴瘤（亚型无法确定）"
            },
            {
              value: "结节性淋巴细胞为主型霍奇金淋巴瘤",
              label: "结节性淋巴细胞为主型霍奇金淋巴瘤"
            },
            {
              value: "经典型霍奇金淋巴瘤",
              label: "经典型霍奇金淋巴瘤",
              children: [
                {
                  value: "结节硬化型（NS）",
                  label: "结节硬化型（NS）"
                },
                {
                  value: "富于淋巴细胞型（LP）",
                  label: "富于淋巴细胞型（LP）"
                },
                {
                  value: "混合细胞型（MC）",
                  label: "混合细胞型（MC）"
                },
                {
                  value: "淋巴细胞消减型（LD）",
                  label: "淋巴细胞消减型（LD）"
                }
              ]
            }
          ]
        }
      ],
      jilian: "",
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
      dialogImageUrl: "",
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
      options: [
        {
          value: "成熟T和NK细胞淋巴瘤",
          label: "成熟T和NK细胞淋巴瘤",
          children: [
            {
              value: "T细胞淋巴瘤（亚型无法确定）",
              label: "T细胞淋巴瘤（亚型无法确定）"
            },
            {
              value: "T幼淋巴细胞白血病",
              label: "T幼淋巴细胞白血病"
            },
            {
              value: "T大颗粒淋巴细胞白血病",
              label: "T大颗粒淋巴细胞白血病"
            },
            {
              value: "NK细胞慢性淋巴增殖性疾病",
              label: "NK细胞慢性淋巴增殖性疾病"
            },
            {
              value: "侵袭性NK细胞白血病",
              label: "侵袭性NK细胞白血病"
            },
            {
              value: "儿童系统性EBV阳性T细胞淋巴瘤",
              label: "儿童系统性EBV阳性T细胞淋巴瘤"
            },
            {
              value: "慢性活动性EBV感染（T细胞和NK细胞型），系统性",
              label: "慢性活动性EBV感染（T细胞和NK细胞型），系统性"
            },
            {
              value: "种痘水疱病样淋巴组织增殖性疾病",
              label: "种痘水疱病样淋巴组织增殖性疾病"
            },
            {
              value: "严重蚊虫叮咬过敏症",
              label: "严重蚊虫叮咬过敏症"
            },
            {
              value: "成人T细胞白血病/淋巴瘤",
              label: "成人T细胞白血病/淋巴瘤"
            },
            {
              value: "结外NK/T细胞淋巴瘤，鼻型",
              label: "结外NK/T细胞淋巴瘤，鼻型"
            },
            {
              value: "肠病相关T细胞淋巴瘤",
              label: "肠病相关T细胞淋巴瘤"
            },
            {
              value: "单形性嗜上皮性肠道T细胞淋巴瘤",
              label: "单形性嗜上皮性肠道T细胞淋巴瘤"
            },
            {
              value: "肠道T细胞淋巴瘤，非特指型",
              label: "肠道T细胞淋巴瘤，非特指型"
            },
            {
              value: "胃肠道惰性T细胞增殖性疾病",
              label: "胃肠道惰性T细胞增殖性疾病"
            },
            {
              value: "肝脾T细胞淋巴瘤",
              label: "肝脾T细胞淋巴瘤"
            },
            {
              value: "皮下脂膜炎样T细胞淋巴瘤",
              label: "皮下脂膜炎样T细胞淋巴瘤"
            },
            {
              value: "蕈样肉芽肿",
              label: "蕈样肉芽肿"
            },
            {
              value: "Sezary综合征",
              label: "Sezary综合征"
            },
            {
              value: "淋巴瘤样丘疹病",
              label: "淋巴瘤样丘疹病"
            },
            {
              value: "原发性皮肤间变性大细胞淋巴瘤",
              label: "原发性皮肤间变性大细胞淋巴瘤"
            },
            {
              value: "原发性皮肤γδT细胞淋巴瘤",
              label: "原发性皮肤γδT细胞淋巴瘤"
            },
            {
              value: "原发性皮肤CD8阳性侵袭性嗜表皮性细胞毒性T细胞淋巴瘤",
              label: "原发性皮肤CD8阳性侵袭性嗜表皮性细胞毒性T细胞淋巴瘤"
            },
            {
              value: "原发性皮肤肢端CD8阳性T细胞淋巴瘤",
              label: "原发性皮肤肢端CD8阳性T细胞淋巴瘤"
            },
            {
              value: "原发性皮肤CD4阳性小/中等大小T细胞增殖性疾病",
              label: "原发性皮肤CD4阳性小/中等大小T细胞增殖性疾病"
            },
            {
              value: "外周T细胞淋巴瘤，非特指型",
              label: "外周T细胞淋巴瘤，非特指型"
            },
            {
              value: "血管免疫母细胞T细胞淋巴瘤",
              label: "血管免疫母细胞T细胞淋巴瘤"
            },
            {
              value: "滤泡T细胞淋巴瘤",
              label: "滤泡T细胞淋巴瘤"
            },
            {
              value: "伴滤泡辅助T细胞表型的结内外周T细胞淋巴瘤",
              label: "伴滤泡辅助T细胞表型的结内外周T细胞淋巴瘤"
            },
            {
              value: "间变性大细胞淋巴瘤，ALK阳性",
              label: "间变性大细胞淋巴瘤，ALK阳性"
            },
            {
              value: "间变性大细胞淋巴瘤，ALK阴性",
              label: "间变性大细胞淋巴瘤，ALK阴性"
            },
            {
              value: "乳房植入物相关的间变性大细胞淋巴瘤",
              label: "乳房植入物相关的间变性大细胞淋巴瘤"
            },
            {
              value: "其他T细胞淋巴瘤",
              label: "其他T细胞淋巴瘤"
            }
          ]
        },
        {
          value: "前驱淋巴性肿瘤",
          label: "前驱淋巴性肿瘤",
          children: [
            {
              value: "B淋巴母细胞白血病/淋巴瘤，非特殊类型",
              label: "B淋巴母细胞白血病/淋巴瘤，非特殊类型"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（9；22）（q34.1；q11.2）；BCR-ABL1",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（9；22）（q34.1；q11.2）；BCR-ABL1"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴t（v；11q23.3）；KMT2A重排",
              label: "B淋巴母细胞白血病/淋巴瘤伴t（v；11q23.3）；KMT2A重排"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（12；21）（p13.2；q22.1）；ETV6-RUNX1",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（12；21）（p13.2；q22.1）；ETV6-RUNX1"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴超二倍体",
              label: "B淋巴母细胞白血病/淋巴瘤伴超二倍体"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴低二倍体",
              label: "B淋巴母细胞白血病/淋巴瘤伴低二倍体"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（5；14）（q31.1；q32.3）；IL3-IGH",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（5；14）（q31.1；q32.3）；IL3-IGH"
            },
            {
              value:
                "B淋巴母细胞白血病/淋巴瘤伴t（1；19）（q23；p13.3）；TCF3-PBX1",
              label:
                "B淋巴母细胞白血病/淋巴瘤伴t（1；19）（q23；p13.3）；TCF3-PBX1"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤，BCR-ABL1样",
              label: "B淋巴母细胞白血病/淋巴瘤，BCR-ABL1样"
            },
            {
              value: "B淋巴母细胞白血病/淋巴瘤伴iAMP21",
              label: "B淋巴母细胞白血病/淋巴瘤伴iAMP21"
            },
            {
              value: "T淋巴母细胞白血病/淋巴瘤",
              label: "T淋巴母细胞白血病/淋巴瘤"
            },
            {
              value: "早期T前驱淋巴母细胞白血病",
              label: "早期T前驱淋巴母细胞白血病"
            },
            {
              value: "自然杀伤（NK）淋巴母细胞白血病/淋巴瘤",
              label: "自然杀伤（NK）淋巴母细胞白血病/淋巴瘤"
            }
          ]
        },
        {
          value: "成熟B细胞淋巴瘤",
          label: "成熟B细胞淋巴瘤",
          children: [
            {
              value: "B细胞淋巴瘤（亚型无法确定）",
              label: "B细胞淋巴瘤（亚型无法确定）"
            },
            {
              value: "慢性淋巴细胞白血病（CLL）/小淋巴细胞淋巴瘤（SLL）",
              label: "慢性淋巴细胞白血病（CLL）/小淋巴细胞淋巴瘤（SLL）"
            },
            {
              value: "单克隆B淋巴细胞增多症（MBL）",
              label: "单克隆B淋巴细胞增多症（MBL）"
            },
            {
              value: "B幼淋巴细胞白血病",
              label: "B幼淋巴细胞白血病"
            },
            {
              value: "脾边缘区细胞淋巴瘤",
              label: "脾边缘区细胞淋巴瘤"
            },
            {
              value: "毛细胞白血病",
              label: "毛细胞白血病"
            },
            {
              value: "脾B细胞淋巴瘤/白血病，不能分类",
              label: "脾B细胞淋巴瘤/白血病，不能分类"
            },
            {
              value: "脾弥漫性红髓小B细胞淋巴瘤",
              label: "脾弥漫性红髓小B细胞淋巴瘤"
            },
            {
              value: "毛细胞白血病变异型",
              label: "毛细胞白血病变异型"
            },
            {
              value: "淋巴浆细胞淋巴瘤",
              label: "淋巴浆细胞淋巴瘤"
            },
            {
              value: "意义不明的单克隆丙种球蛋白病（MGUS），IgM型",
              label: "意义不明的单克隆丙种球蛋白病（MGUS），IgM型"
            },
            {
              value: "Mu重链病",
              label: "Mu重链病"
            },
            {
              value: "Gamma重链病",
              label: "Gamma重链病"
            },
            {
              value: "Alpha重链病",
              label: "Alpha重链病"
            },
            {
              value: "意义不明的单克隆丙种球蛋白病（MGUS），非IgM型",
              label: "意义不明的单克隆丙种球蛋白病（MGUS），非IgM型"
            },
            {
              value: "浆细胞骨髓瘤",
              label: "浆细胞骨髓瘤"
            },
            {
              value: "骨孤立性浆细胞瘤",
              label: "骨孤立性浆细胞瘤"
            },
            {
              value: "骨外浆细胞瘤",
              label: "骨外浆细胞瘤"
            },
            {
              value: "单克隆免疫球蛋白沉积病",
              label: "单克隆免疫球蛋白沉积病"
            },
            {
              value: "结外黏膜相关淋巴组织边缘区淋巴瘤（MALT淋巴瘤）",
              label: "结外黏膜相关淋巴组织边缘区淋巴瘤（MALT淋巴瘤）"
            },
            {
              value: "结内边缘区淋巴瘤",
              label: "结内边缘区淋巴瘤"
            },
            {
              value: "滤泡性淋巴瘤",
              label: "滤泡性淋巴瘤",
              children: [
                {
                  value: "1",
                  label: "1"
                },
                {
                  value: "2",
                  label: "2"
                },
                {
                  value: "3a",
                  label: "3a"
                },
                {
                  value: "3b",
                  label: "3b"
                }
              ]
            },
            {
              value: "儿童型滤泡性淋巴瘤",
              label: "儿童型滤泡性淋巴瘤"
            },
            {
              value: "伴IRF4重排大B细胞淋巴瘤",
              label: "伴IRF4重排大B细胞淋巴瘤"
            },
            {
              value: "原发皮肤滤泡中心细胞淋巴瘤",
              label: "原发皮肤滤泡中心细胞淋巴瘤"
            },
            {
              value: "套细胞淋巴瘤",
              label: "套细胞淋巴瘤"
            },
            {
              value: "弥漫性大B细胞淋巴瘤（DLBCL），非特指型",
              label: "弥漫性大B细胞淋巴瘤（DLBCL），非特指型",
              children: [
                {
                  value: "生发中心亚型",
                  label: "生发中心亚型"
                },
                {
                  value: "活化B细胞亚型",
                  label: "活化B细胞亚型"
                }
              ]
            },
            {
              value: "富于T细胞/组织细胞大B细胞淋巴瘤",
              label: "富于T细胞/组织细胞大B细胞淋巴瘤"
            },
            {
              value: "原发中枢神经系统弥漫性大B细胞淋巴瘤",
              label: "原发中枢神经系统弥漫性大B细胞淋巴瘤"
            },
            {
              value: "原发皮肤弥漫性大B细胞淋巴瘤，腿型",
              label: "原发皮肤弥漫性大B细胞淋巴瘤，腿型"
            },
            {
              value: "EBV+弥漫性大B细胞淋巴瘤，非特指型",
              label: "EBV+弥漫性大B细胞淋巴瘤，非特指型"
            },
            {
              value: "EBV+黏膜皮肤溃疡",
              label: "EBV+黏膜皮肤溃疡"
            },
            {
              value: "慢性炎症相关弥漫性大B细胞淋巴瘤",
              label: "慢性炎症相关弥漫性大B细胞淋巴瘤"
            },
            {
              value: "淋巴瘤样肉芽肿",
              label: "淋巴瘤样肉芽肿"
            },
            {
              value: "原发性纵隔（胸腺）大B细胞淋巴瘤",
              label: "原发性纵隔（胸腺）大B细胞淋巴瘤"
            },
            {
              value: "血管内大B细胞淋巴瘤",
              label: "血管内大B细胞淋巴瘤"
            },
            {
              value: "ALK阳性大B细胞淋巴瘤",
              label: "ALK阳性大B细胞淋巴瘤"
            },
            {
              value: "浆母细胞性淋巴瘤",
              label: "浆母细胞性淋巴瘤"
            },
            {
              value: "原发渗出性淋巴瘤",
              label: "原发渗出性淋巴瘤"
            },
            {
              value: "多中心Castleman病",
              label: "多中心Castleman病"
            },
            {
              value: "HHV8阳性弥漫性大B细胞淋巴瘤，非特指型",
              label: "HHV8阳性弥漫性大B细胞淋巴瘤，非特指型"
            },
            {
              value: "HHV8阳性亲生发中心淋巴组织增殖性疾病",
              label: "HHV8阳性亲生发中心淋巴组织增殖性疾病"
            },
            {
              value: "Burkitt淋巴瘤",
              label: "Burkitt淋巴瘤"
            },
            {
              value: "伴11q异常的Burkitt样淋巴瘤",
              label: "伴11q异常的Burkitt样淋巴瘤"
            },
            {
              value: "高级别B细胞淋巴瘤，伴MYC和BCL2和（或）BCL6重排",
              label: "高级别B细胞淋巴瘤，伴MYC和BCL2和（或）BCL6重排"
            },
            {
              value: "高级别B细胞淋巴瘤，非特指型",
              label: "高级别B细胞淋巴瘤，非特指型"
            },
            {
              value: "介于DLBCL和经典霍奇金淋巴瘤之间的不能分类的B细胞淋巴瘤",
              label: "介于DLBCL和经典霍奇金淋巴瘤之间的不能分类的B细胞淋巴瘤"
            },
            {
              value: "其他B细胞淋巴瘤",
              label: "其他B细胞淋巴瘤"
            }
          ]
        },
        {
          value: "霍奇金淋巴瘤",
          label: "霍奇金淋巴瘤",
          children: [
            {
              value: "霍奇金淋巴瘤（亚型无法确定）",
              label: "霍奇金淋巴瘤（亚型无法确定）"
            },
            {
              value: "结节性淋巴细胞为主型霍奇金淋巴瘤",
              label: "结节性淋巴细胞为主型霍奇金淋巴瘤"
            },
            {
              value: "经典型霍奇金淋巴瘤",
              label: "经典型霍奇金淋巴瘤",
              children: [
                {
                  value: "结节硬化型（NS）",
                  label: "结节硬化型（NS）"
                },
                {
                  value: "富于淋巴细胞型（LP）",
                  label: "富于淋巴细胞型（LP）"
                },
                {
                  value: "混合细胞型（MC）",
                  label: "混合细胞型（MC）"
                },
                {
                  value: "淋巴细胞消减型（LD）",
                  label: "淋巴细胞消减型（LD）"
                }
              ]
            }
          ]
        }
      ]
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

<style scoped lang="stylus" rel="stylesheet/stylus" >
.outest {
  .sContainer {
    height: 58px;
    line-height: 58px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
    border-radius: 4px;
    padding-left: 30px;

    .el-select {
      margin-left: 10px;
    }
  }

  .entry {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
    border-radius: 4px;
    margin-top: 20px;

    .search {
      margin: 20px 30px 0;
      padding-top: 20px;
      padding-bottom: 60px;

      .up {
        background-color: #E6E6E6;
        height: 50px;

        .left {
          float: left;
          width: 300px;

          span {
            line-height: 50px;
            padding-left: 10px;
          }
        }

        .right {
          border-left: 1px solid rgba(199, 199, 199, 1);
          float: left;

          span {
            line-height: 50px;
            padding-left: 10px;
          }

          .el-input {
            margin: 0 5px;
          }

          .el-button {
            background: rgba(41, 184, 252, 1);
            border-radius: 4px;
          }

          .pass {
            margin: 10px;
          }
 
          }
        }
      }

      .el-pagination {
        float: right;
        margin: 10px 10px 0 0;
      }
    }
  }

  .icontubiaozhizuo-:before {
    color: #1CA5FF;
  }

  .YCon {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(245, 247, 251, 0.7);
    z-index: 9;

    .out {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      margin: auto;
      width: 1122px;
      height: 860px;
      background: rgba(250, 250, 250, 1);
      box-shadow: 0px 4px 20px 0px rgba(121, 121, 121, 0.75);
      border-radius: 0px 0px 4px 4px;

      .header {
        height: 40px;
        background: rgba(28, 177, 255, 1);
        border-radius: 6px 6px 0px 0px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        span {
          margin: 10px;
          color: white;
        }
      }

      // 原医疗机构信息内容
      .origin {
        margin: 20px auto;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(232, 232, 232, 1);
        border-radius: 4px;
        margin: 10px 20px;

        .origindown {
          .buju {
            margin-left: 50px;
          }

          .sickIH {
            .title {
              background-color: #EFEEF1;
              margin: 10px 20px;
              height: 35px;
              line-height: 35px;
              border-left: 5px #3190E8 solid;
              padding-left: 10px;
            }

            .sickItem {
              display: inline-block;
              margin: 10px;
              margin-left: 50px;

              span {
                display: inline-block;
                width: 112px;
              }
            }

            .kuai {
              display: flex;
              flex-wrap: wrap;
              flex-flow: row;
              width: 1122px;
              height: 200px;
              margin-top: 28px;

              // 报告质量下的块
              .p-one {
                border: 1px solid rgba(224, 224, 224, 1);
                width: 440px;
                margin-left: 30px;
                height: 190px;

                .titles {
                  display: block;
                  padding-left: 20px;
                  border-bottom: 1px solid rgba(224, 224, 224, 1);
                  height: 30px;
                  line-height: 30px;
                  background-color: rgba(232, 232, 232, 1);
                }

                .sickItems {
                  display: flex;
                  flex-flow: row;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  margin-left: 20px;
                  float: left;
                  height: 50px;
                  line-height: 50px;

                  .one {
                    display: inline-block;
                    width: 100px;
                  }

                  .three {
                    display: inline-block;
                    width: 100px;
                  }

                  .two {
                    display: inline-block;
                    width: 50px;
                  }

                  .four {
                    display: inline-block;
                    width: 50px;
                  }

                  .five {
                    display: inline-block;
                    width: 295px;
                  }
                }
              }

              .p-two {
                border: 1px solid rgba(224, 224, 224, 1);
                width: 276px;
                margin-left: 20px;
                height: 190px;

                .titles {
                  display: block;
                  padding-left: 20px;
                  border-bottom: 1px solid rgba(224, 224, 224, 1);
                  height: 30px;
                  line-height: 30px;
                  background-color: rgba(232, 232, 232, 1);
                }

                .sickItems {
                  display: flex;
                  flex-flow: row;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  margin-left: 20px;
                  float: left;
                  height: 50px;
                  line-height: 50px;

                  span {
                    width: 150px;
                  }
                }
              }

              .p-three {
                border: 1px solid rgba(224, 224, 224, 1);
                width: 250px;
                margin-left: 20px;
                height: 190px;

                .titles {
                  display: block;
                  padding-left: 20px;
                  border-bottom: 1px solid rgba(224, 224, 224, 1);
                  height: 30px;
                  line-height: 30px;
                  background-color: rgba(232, 232, 232, 1);
                }

                .sickItems {
                  display: flex;
                  flex-flow: row;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  margin-left: 20px;
                  float: left;
                  height: 50px;
                  line-height: 50px;

                  span {
                    width: 120px;
                  }
                }
              }
            }
          }
        }

        .update {
          width: 70px;
          height: 70px;
          background: rgba(250, 250, 250, 1);
          border: 1px solid rgba(210, 210, 210, 1);
          border-radius: 4px;
          margin: 20px;

          .iconic_join_dialing_norm {
            line-height: 70px;
            margin-left: 28px;
          }
        }
      }

      .foot {
        float: right;
        margin-right: 20px;
      }
    }
  }

</style>
