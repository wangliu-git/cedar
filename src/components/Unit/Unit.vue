<template>
  <div class="outest">
    <div class="sContainer">
      <span>选择分组 :</span>
      <el-select  size="mini" style="width:250px"  placeholder="请选择分组">
        <el-option>
          <span></span>
        </el-option>
      </el-select> 
    </div> 

    <!--搜索 -->
    <div class="entry">
      <div class="search">
        <div class="up">
          <div class="left">
            <span>原单位诊断信息 : </span>
            <el-select  size="mini" style="width:150px"  placeholder="全部">
              <el-option>
                <span></span>
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
            <el-button type="primary"  size="mini" @click="getTable">确定</el-button>
            <el-button type="primary" size="mini" class="pass">
              <i class="iconfont iconpiliangtongguo"></i> 批量通过
            </el-button>
          </div>
        </div>
        <div class="down">
          <el-table ref="multipleTable" :data="tablelist" tooltip-effect="dark" style="width: 100%" border stripe >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="pa_id" label="病人ID" width="200" sortable></el-table-column>
            <el-table-column prop="test_id" label="病理号" width="200" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" width="180" sortable></el-table-column>
            <el-table-column prop="histologic_type" label="报告类型" width="200" sortable></el-table-column>
            <el-table-column prop="sex" label="性别" width="160" sortable></el-table-column>
            <el-table-column prop="age" label="年龄" width="160" sortable></el-table-column>
            <el-table-column prop="entry_status" label="原单位诊断" show-overflow-tooltip width="200" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
              <template  slot-scope="scope">                 
                <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="bianji(scope.row)">编辑</el-button>                  
                <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>            
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
    <div class="YCon" v-if="zhezhao">
      <div class="out">
        <div class="header">
          <span>编辑</span>
          <span><i class="iconfont iconx" @click="zhezhao =!zhezhao"></i></span>
        </div>
        
        <!-- 原医疗机构-->
        <el-collapse   class="origin">
          <el-collapse-item >
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
                    size="mini" style="width:180px"
                  ></el-input>
                </div>
                <div class="sickItem">
                  <span>{{fMInstitution.test_id.field_title}}:</span>
                  <el-input type="text" v-model="editForm.test_id" placeholder="请输入病理号" size="mini" style="width:180px"></el-input>
                </div>
                <div class="sickItem">
                  <span>{{fMInstitution.application_date.field_title}}:</span>
                  <el-date-picker
                    name="application_date"
                    v-model="editForm.application_date"
                    type="date"
                    size="mini"
                    placeholder="选择日期" style="width:180px"
                  ></el-date-picker>
                </div>
                <div class="sickItem">
                  <span>{{fMInstitution.report_date.field_title}}:</span>
                  <el-date-picker
                    name="report_date"
                    v-model="editForm.report_date"
                    type="date"
                    size="mini"
                    placeholder="选择日期" style="width:180px"
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
                      <el-select name="he_quality" v-model="editForm.he_quality" size="mini" style="width:90px">
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
                      <el-select name="ihc_quality" v-model="editForm.ihc_quality" size="mini" style="width:90px">
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
                      <el-select name="problem_slice" v-model="editForm.problem_slice" size="mini" style="width:90px">
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
                      <el-select name="patient_info" v-model="editForm.patient_info" size="mini" style="width:90px">
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
                      <el-select name="history_info" v-model="editForm.history_info" size="mini" style="width:90px">
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
                      <el-select name="sample_info" v-model="editForm.sample_info" size="mini" style="width:90px">
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
                      <el-select name="record" v-model="editForm.record" size="mini" style="width:90px">
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
                      <el-select name="helper_report" v-model="editForm.helper_report" size="mini" style="width:90px">
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
          action="http://192.168.75.58/cedar/api/diagnosis_origin/add.php"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        </el-collapse>       
        <div class="foot">
          <el-button @click="qingkong()">清空</el-button>
          <el-button @click="baocun()">保存</el-button>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script type="text/ecmascript-6">
import uuid from "uuid";
import allMessage from "../../staic/allMessage.json";

 export default {
  created(){
    this.getTableList()
  },
  methods: {
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 选择分组假弹窗
    choose() {
       this.$confirm('确定选择该分组？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '选择成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消选择'
        });
      });     
    }, 
    // 解析
    jiexi(){
      this.$alert('解析错误，请校验文字格式！', '解析错误', {
        confirmButtonText: '知道了',
        type:"warning",
        center: true
      });
    },
    // 查看
    look(){
      this.zhezhao =! this.zhezhao
    },
    // 清空
    qingkong(){
      this.zhezhao =! this.zhezhao
    },
    // 保存
    baocun(){
      this.zhezhao =! this.zhezhao
      this.axios.get('diagnosis_origin/add.php')
    },
    // 删除
    del() {
      this.$confirm('确定删除该数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 获取病理号
    async getTableList(){
      const {data : res} = await this.axios.get('diagnosis_origin/list.php',{params:{page:this.queryInfo.page}})
      console.log("getTableList",res);
      this.tablelist = res.data;
      console.log(res.data);
      this.queryInfo.page = parseInt(res.page);     
      this.queryInfo.count = parseInt(res.count)  //总条数
      this.queryInfo.pagerows = res.pagerows  //每页显示多少条 
  
    } , 
    // 搜索
    async getTable() {      
      // console.log(row.id)
      const { data: res } = await this.axios.get(
      "diagnosis_origin/list.php" , {params:{name:this.name,test_id:this.test_id}});
      console.log(this.test_id)
      console.log(this.name)
      this.tablelist = res.data
       this.queryInfo.page = parseInt(res.page);     
      this.queryInfo.count = parseInt(res.count)  //总条数
      console.log(res.data)
      console.log("getTableList",res);   
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
  },

  data() {
    return {
      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      // 弹窗
      zhezhao:false,
      tablelist:[],    //病理号数组
      datalist:[],    //数据集数组
      group:true,
      // 分页器
      queryInfo:{
        page:1,         //页数
        pagerows:10,    //每页显示的条数
        count:0,        //数据总数
      }, 
      // 搜索参数
      test_id:'',
      name:'',
      patient_id:'',
      
      // 遮罩信息
      // 查询到的用户信息对象
      editForm:{},
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
  },

};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
.outest{
  .sContainer{
    
    height 58px
    line-height 58px
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 10px 0px rgba(204,204,204,0.75);
    border-radius:4px;
    padding-left 30px
    .el-select{
      margin-left 10px
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
      padding-bottom 60px
      .up {
        background-color: #E6E6E6;
        height: 50px;
        .left{ 
          float left
          width 300px        
          span {
            line-height: 50px;
            padding-left: 10px;
          }
        }
        .right{
          border-left 1px solid rgba(199,199,199,1)
          float left
          span {
            line-height: 50px;
            padding-left: 10px;
          }
          .el-input {
            margin: 0 5px;
          }
          .el-button{
            background:rgba(41,184,252,1);
            border-radius:4px;
          }
          .pass {          
            margin: 10px;
          }
        }
      }
      .el-pagination{
        float right 
        margin 10px 10px 0 0
      }
    }
  }

  .icontubiaozhizuo-:before {
    color #1CA5FF
  }
  .YCon{
    position:fixed;
    left:0px;
    top:0px;
    width 100%
    height 100%  
    background-color :rgba(245,247,251,0.7);
    z-index 9
    .out{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      margin: auto;
      width 1122px
      height:860px;
      background:rgba(250,250,250,1);
      box-shadow:0px 4px 20px 0px rgba(121,121,121,0.75);
      border-radius:0px 0px 4px 4px;
      .header{
        height:40px;
        background:rgba(28,177,255,1);
        border-radius:6px 6px 0px 0px;
        display flex
        justify-content space-between
        flex-wrap wrap
        span{
          margin 10px
          color white
        }
      }     
      // 原医疗机构信息内容
      .origin {
        margin: 20px auto;
        background:rgba(255,255,255,1);
        border:1px solid rgba(232,232,232,1);
        border-radius:4px;
        margin 10px 20px     
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
              flex-wrap wrap
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
        .update{
          width:70px;
          height:70px;
          background:rgba(250,250,250,1);
          border:1px solid rgba(210,210,210,1);
          border-radius:4px;
          margin 20px
          .iconic_join_dialing_norm{
            line-height 70px
            margin-left 28px
          }
        }
      }
      .foot{
        float right 
        margin-right 20px
      }
      
    }
  }
 
}

 
</style>
