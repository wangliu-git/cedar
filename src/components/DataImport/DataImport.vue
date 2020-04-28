<template>
  <div style="width=100%" >
    <!--数据存储 -->
    <div class="storage">
      
      <div class="storageR" >
        <div class="eContainer">
          <div>
            <el-input placeholder="请选择文件上传" size="mini" style="width:250px"></el-input>   
            <el-button type="primary" size="mini" @click="uploadFile">导入</el-button>
            <!--上传-->
            <el-dialog title="上传" width="40%" :visible.sync="uploadTemplateDialog">
                <el-row>
                    <el-col :span="22">
                        <el-upload class="upload-demo"
                                ref="upload"
                                action=""
                                :accept="acceptFileType"
                                :limit="1"
                                :on-exceed="handleExceed"
                                :before-upload="beforeUpload"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取csv格式文件</el-button>
                            <div slot="tip" class="el-upload_tip">只能上传.csv文件,且不超过1M</div>
                        </el-upload>

                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="submitUpload" type="primary" size="mini" :loading="uploadLoading" > 确定上传</el-button>
                    <el-button @click="uploadTemplateDialog=false" size="mini">取消</el-button>
                </span>
            </el-dialog>
          </div>         
        </div>
      </div>
    </div>

    <!--数据集列表  slot-scope="scope"  @click="jiexi"-->
    <div class="storageList">
      <div class="list" style="width:96%">
        <el-table :data="datalist" highlight-current-row style="width: 100%" border stripe>
          <el-table-column prop="file_name" label="数据集名称" width="300"></el-table-column>
          <el-table-column prop="upload_time" label="上传时间" width="300"></el-table-column>
          <el-table-column prop="percent" label="已校验：未检验" width="300"></el-table-column>
          <el-table-column prop="location" label="存储位置" width="300"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="bianji(scope.row)">编辑</el-button>
              <el-button type="text" size="small">
                <a href="javascript:;">删除</a>
              </el-button>
              <el-button class="jiexi" size="small">
                <span class="iconfont iconxiazai" @click="jiexi(scope.row)">开始解析</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--搜索 -->
    <div class="s"  v-if="chakan">   
      <div class="search" >     
        <div class="up">
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
            placeholder="请输入姓名"
            prefix-icon="el-icon-search"
            style="width:180px"
            v-model="name"
          ></el-input>
          <el-button type="primary" size="mini" @click="getTable">确定</el-button>
          <el-button type="primary" size="mini" class="pass">
            <i class="iconfont iconpiliangtongguo"></i> 批量通过
          </el-button>
        </div>
        <div class="down">
          <el-table          
            :data="tablelist"
            tooltip-effect="dark"
            style="width: 100%"           
            border           
            stripe          
          >
            <el-table-column type="selection" width="40"></el-table-column>
            
            <el-table-column prop="test_id" label="病理号" width="170"></el-table-column>
            <el-table-column prop="name" label="姓名" width="170" sortable></el-table-column>
            <el-table-column prop="histologic_type" label="组织学类型" width="170" sortable></el-table-column>
            <el-table-column prop="sex" label="性别" width="170" sortable></el-table-column>
            <el-table-column prop="age" label="年龄" width="170" sortable></el-table-column>
            <el-table-column prop="report_time" label="报告时间" show-overflow-tooltip width="170" sortable></el-table-column>
            <el-table-column prop="entry_status" label="校验状态" show-overflow-tooltip width="170" sortable></el-table-column>
            <el-table-column prop="complete_degree" label="完整度" show-overflow-tooltip width="170" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="170">             
                <template  slot-scope="scope">                 
                   <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
                   <el-button type="text" size="small" @click="jiaoyan(scope.row)">校验</el-button>                   
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>            
                </template>            
            </el-table-column>
          </el-table>
          <!--    :current-page="count"                      当前显示的页数
                :page-sizes="[10]"                        切换每页显示的条数
                :page-size="pagerows"                    当前每页显示的条数
                @size-change="handleSizeChange"           点击切换每页显示多少条
                @current-change="handleCurrentChange"     页码值发生了切换
                :total="count"                            共多少条           
                layout="total, sizes, prev, pager, next, jumper"
                <el-table-column prop="name" label="姓名" width="170"></el-table-column>
          :total="tableinfo.count"
          :current-page="tableinfo.pagenum"
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

    <!-- 查看列表单个信息-->
    <div class="zhezhao" v-if="zhezhao" >
      <div class="look">
        <div class="header">
            <span>查看病理信息</span>
            <span @click="zhezhao = !zhezhao"><i class="iconfont iconx"></i></span>
        </div>

        <div class="content">
            <div class="HZ">
                <button>患者及报告信息</button>
                <div><span>病人ID(住院号/门诊号) ：</span>{{editForm.patient_id}}</div>    
                <div><span>姓名：</span>{{editForm.name}}</div>           
                <div><span>性别：</span>{{editForm.sex}}</div>           
                <div><span>出生日期：</span>{{editForm.birthday}}</div>           
                <div><span>联系电话：</span>{{editForm.phone}}</div>           
                <div><span>民族：</span>{{editForm.nation}}</div>           
                <div><span>籍贯：</span>{{editForm.birthplace}}</div>           
                <div><span>居住地：</span>{{editForm.address_prov}}</div>           
                <div><span>病理号：</span>{{editForm.test_id}}</div>           
                <div><span>送检科室：</span>{{editForm.department}}</div>           
                <div><span>申请日期：</span>{{editForm.application_date}}</div>  
                <div><span>报告日期：</span>{{editForm.report_date}}</div>        
                <div><span>就诊类型：</span>{{editForm.diagnosis_type}}</div>                        
            </div>
            <div class="BDW">
                <button>本单位原文</button>
                <span>{{editForm.diagnosis_txt}}</span>                
            </div>
            <div class="ZD">
                <button>本单位诊断信息</button>
                <div>诊断结论<span> 病理类型：</span>{{editForm.diagnosis}}</div>
                <div><span>淋巴细胞来源：</span>{{editForm.type}}</div>
                <div style="float:left">辅助诊断<span> 免疫组化：</span>
                  <th  v-for="(item,index) in editForm.helper_diagnosis.ihc" :key="index" :value="item">
                    <td>{{item.mark}}</td>
                    <td>{{item.value}}</td>
                  </th>                
                </div>

            </div>
        </div>

        <div class="footer">
            <div class="btn">
                <el-button plain @click="zhezhao = !zhezhao">返回</el-button>
                <el-button plain @click="addFormList(editForm)">确认校验通过</el-button> 
            </div>  
        </div>
      </div>
    </div>
    <!--分组 -->
    <div class="out" v-if="!group" :data="data">
      <div class="nei" >
        <div class="title">
          <span>请选择分组</span>
          <span  @click="group =! group">
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
            <el-input style="width:400px" size="small" v-model="data.location"></el-input>
          </div>
          <div class="sousuo">
            <el-input placeholder="请输入分组关键词..." style="width:500px">
              <el-button slot="append">搜索</el-button>
            </el-input>
          </div>
          <div class="groupList">
            <li>肝癌多中心项目-复旦肿瘤项目</li>
            <li>肝癌多中心项目</li>
            <li>淋巴瘤的流行病学研究</li>
            <li>左半肝胆管腺癌病理分析</li>
            <li>未分组</li>
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
import axios from 'axios'
export default {
  created() {
    this.getDataList();       
  },
  methods:{
    // 点击确定
    async sure(id){    
      const { data : res } = await this.axios.post(
        "dataset/edit.php",{params:{id:this.id,file_name:this.data.file_name,location:this.data.location}}
      );    
      console.log(this.data.file_name)
      console.log(res)
      console.log(this.id)
      this.group = !this.group
    },
    // 点击数据集编辑
    async bianji(row){
      this.group = !this.group
      this.id = row.id    
      const { data : res } = await this.axios.get(
        "dataset/one.php?id=" + row.id
      );
      console.log(res)
      this.data = res
    },
    //点击数据集解析
    jiexi(row){
      
      // 插入数据  excel_data/readjson.php
       this.axios.get("excel_data/readjson.php", {params:{id :row.id}}).then(res => {
        console.log(res)
        console.log(res.data)
         var result = res.data;//JSON.parse(res.body);
        if(result.result == 1){
            this.$alert("解析成功", '提交结果', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.chakan =! this.chakan
                this.axios.get("dataset/list.php?id=", + row.id)
              },
            });
            
        }else{
            this.$alert("解析失败", '提交结果', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
              },
            });
          }
      })
      console.log(row.id)
      this.id = row.id 
      console.log(this.id)
      this.getTableList(row);        
    },
    // 点击数据集删除
    async dele(row){
      console.log(row.id)
      const { data :res} = await this.axios.get(
        "dataset/del.php" ,{params:{id:row.id}}
      );
      console.log(res)
    },
    // 点击病理号查看
    async look(row){         
      this.zhezhao = !this.zhezhao 
      const { data :res} = await this.axios.get(
        "excel_data/onedata.php" ,{params:{id:row.id}}
      );
      console.log("getTableList",res);
      this.editForm = res.data;
      // console.log(this.editForm);   
    },
    // 获取数据集列表
    async getDataList() {
        const { data : res } = await this.axios.get(
            "dataset/list.php"
        );
        this.datalist = res.data;   
    },
    // 获取病理号
    async getTableList(row) {  
      // console.log(row.id)
      console.log(this.queryInfo.page)
      const { data: res } = await this.axios.get(     
      "excel_data/list.php?id=" + row.id, {params:{page:this.queryInfo.page}});
      //console.log(row.id)
      this.tablelist = res.data
      //console.log(res.data)
      console.log("getTableList",res);   
      this.queryInfo.page = parseInt(res.page);     
      this.queryInfo.count = parseInt(res.count)  //总条数
      this.queryInfo.pagerows = res.pagerows  //每页显示多少条 
      this.id = row.id  
      console.log(this.queryInfo.page);console.log(this.queryInfo.count);console.log(this.queryInfo.pagerows);             
    },
    async getTableList() {  
      // console.log(row.id)
      console.log(this.queryInfo.page)
      const { data: res } = await this.axios.get(     
      "excel_data/list.php?id=" + this.id, {params:{page:this.queryInfo.page}});
      //console.log(row.id)
      this.tablelist = res.data
      //console.log(res.data)
      console.log("getTableList",res);   
      this.queryInfo.page = parseInt(res.page);     
      this.queryInfo.count = parseInt(res.count)  //总条数
      this.queryInfo.pagerows = res.pagerows  //每页显示多少条 
    
      console.log(this.queryInfo.page);console.log(this.queryInfo.count);console.log(this.queryInfo.pagerows);             
    },
    // 病理号删除
    async del(row) {     
      const { data: res } = await this.axios.get(
      "excel_data/del.php" , {params:{id:row.id}});
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },   

    // 搜索
    async getTable() {      
      // console.log(row.id)
      const { data: res } = await this.axios.get(
      "excel_data/list.php?id=" + this.id, {params:{name:this.name,test_id:this.test_id}});
      console.log(this.test_id)
      console.log(this.id)
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
      console.log(this.queryInfo.page)
      this.getTableList();
    },
    // 新增患者信息
    async addFormList(editForm){
        this.zhezhao = !this.zhezhao
        this.editForm.help_diagnosis = this.help_diagnosis;
        // const sicksList = JSON.stringify(sicksArr)      
        let data={
          "id":"",
          "data":editForm
        }
        // 判断提交
        if(editForm){
            await this.axios.post('report/add.php',data).then(res =>{
            console.log('res:',res);
            var result = res.data;//JSON.parse(res.body);
            if(result.result=="done"){
              
                this.$alert("提交成功", '提交结果', {
                  confirmButtonText: '确定',
                  type: 'success',
                  callback: action => {
                  },
                });
            }
            else{
                this.$alert("提交失败", '提交结果', {
                  confirmButtonText: '确定',
                  type: 'warning',
                  callback: action => {
                  },
                });
            }
            })
        }else {
            console.log('error submit!!');
            return false;
            }    
    },
    // 点击折叠面板
    handleChange(val) {
      console.log(val);
    },
    // 选择分组
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
    
    //上传文件方法
    uploadFile(){
      this.uploadLoading=false;
      var that=this;
      this.fileList=[];
      this.uploadTemplateDialog=true;
      setTimeout(function(){
          that.$refs.upload.clearFiles();
      },100);
    },
    handleExceed(files,fileList){
        this.$message.warning('只能选择1个文件!');
    },
    submitUpload(){
        this.uploadLoading=true;
        var that=this;
        setTimeout(function () {
            if(that.$refs.upload.$children[0].fileList.length==1){
                that.$refs.upload.submit();
            }else{
                that.uploadLoading=false;
                that.$message({
                    type:'error',
                    showClose:true,
                    duration:3000,
                    message:'请选择文件!'
                });
            };
        },100);
    },
    handleRemove(file,fileList){
        console.log(file,fileList);
    },
    handlePreview(file){
        console.log(file);
    },
    beforeUpload(file){
      var that=this;
      //文件类型
      var fileName=file.name.substring(file.name.lastIndexOf('.')+1);
      if(fileName!='xls'){
          that.uploadTemplateDialog=false;
          that.$message({
              type:'error',
              showClose:true,
              duration:3000,
              message:'文件类型不是.csv文件!'
          });
          return false;
      }
      //读取文件大小
      var fileSize=file.size;
      console.log(fileSize);
      if(fileSize>1048576){
          that.uploadTemplateDialog=false;
          that.$message({
              type:'error',
              showClose:true,
              duration:3000,
              message:'文件大于1M!'
          });
          return false;
      }
      that.downloadLoading=that.$loading({
          lock:true,
          text:'数据导入中...',
          spinner:'el-icon-loading',
          background:'rgba(0,0,0,0.7)'
      });
      let fd=new FormData();
      fd.append('pic',file);
      fd.append('_t1',new Date());
      axios({
          method:'post',
          url:"upload_file/add.php",
          data:fd,
          headers:{"Content-Type":"multipart/form-data;boundary="+new Date().getTime()}
      }).then(rsp=>{
          that.downloadLoading.close();
          that.uploadLoading=false;
          let resp=rsp.data
          // console.log(this.resp)
          if(resp.resultCode==200){
              that.uploadTemplateDialog=false;
              that.$message.success(resp.resultMsg);
              console.log(resp.resultMsg)
              //that.queryData();//更新数据
          }else{
              that.uploadTemplateDialog=false;
              that.$message({
                  type:'error',
                  showClose:true,
                  duration:60,
                  message:resp.resultMsg
              });
          }
      }).catch(error=> {
          that.downloadLoading.close();
          that.uploadLoading=false;
          that.uploadTemplateDialog=false;
          that.$message({
              type:'error',
              showClose:true,
              duration:60,
              message:'请求失败! error:'+error
          });
      })
      return false;
    } 
  },
  data() { 
    return {    
      // 数据集列表
      data:[ ],
      // 上传
      uploadTemplateDialog:false,
      fileList:[],
      uploadLoading:false,
      acceptFileType:'.csv',
      downLoadLoading:'', 
      tablelist: [], //病理号数组
      datalist: [], //数据集数组
      id:'',     //列表参数
      group: true,      //分组弹框
      chakan: false,    //数据集列表信息
      zhezhao: false,  //单个患者信息
      // 搜索参数
      test_id:'',
      name:'',
      // 分页器
      queryInfo:{
        page:1,         //页数
        pagerows:10,    //每页显示的条数
        count:0,        //数据总数
      },   
      // 查询到的用户信息对象
      editForm:{},  
      help_diagnosis:{},       
      //测试数据
      help_diagnosis: {
          ihc: [
          {
              mark: "", //标志物
              value: "" //检测结果
          }
          ], //免疫组化的数组
          fish: [
          {
              mark: "",
              value: ""
          }
          ], //荧光数组
          rearrangement: [
          {
              mark: "",
              value: ""
          }
          ], //基因数组
          ish: [
          {
              mark: "",
              value: ""
          }
          ], //原位杂交数组
          fcm: [
          {
              mark: "",
              value: ""
          }
          ], //流式细胞数组
          ngs: [
          {
              mark: "",
              value: ""
          }
          ] //ngs数组
      },

    };
      
  },

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >

.jiexi {
  background-color #409EFF
  &:hover{
    background #26BC99
  }
}
a {
  text-decoration: none;
  color: #29B8FC;
  :hover {
    color: #26BC9A;
  }
}
.storage {
  width: 100%;
  height: 58px;
 
  .storageR {
  
    height: 58px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
    border-radius: 4px;
   
    .eContainer {
      height: 60px;
      line-height: 60px;
      margin-left: 32px;

      span {
        color: #3333 3;
        font-size: 14px;
        margin-right: 5px;
      }
      .el-button {
        margin-left: -2px;
        background-color: rgba(41, 184, 252, 1);
        border-radius: 0px 4px 4px 0px;
        border: none;

        &:hover {
          background-color: rgba(38, 188, 153, 1);
        }
      }        
    }
  }
}

.storageList {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
  border-radius: 4px;

  .list {
    padding-top: 15px;
    margin-left: 30px;
    margin-top: 20px;
    padding-bottom: 20px;

    .el-table {
      border-top: 1px solid rgba(0, 160, 233, 1);
    }
  }
}

.iconfont {
  color: white;
  font-size: 16px;
}

.s {
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
        float: right;
        margin: 10px;
      }
    }

    .el-pagination {
      float: right;
      margin: 10px 10px 0 0;
    }
  }
}
.zhezhao{
    background #CCCBCE   
    position relative
    bottom 200px
    z-index 9999
    .look{
      width:666px;
      background:#FAFAFC
      box-shadow:0px 4px 20px 0px rgba(121,121,121,0.75);
      border-radius:0px 0px 4px 4px;
      position absolute
      bottom 20px
      left 50%
      transform translateX(-50%)
      .header{
          width:666px;
          height:40px;
          background:rgba(28,177,255,1);
          border-radius:6px 6px 0px 0px;
          display flex
          line-height 40px
          color white 
          justify-content space-between
          span{
              margin 0 10px
              i{
                  color white 
              }
          }
      }
      .content{
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(51,51,51,1);
          display flex
          flex-flow column
          .HZ{
              margin 30px 30px 10px
              height:1px;
              position relative
              border-top :1px solid rgba(185,222,255,1);
              height 250px          
              div{                
                width 280px
                height 26px
                line-height 26px
                display: inline-block;
                margin-top: 10px;
                margin-left: 20px;
                span{
                  display inline-block                 
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color:rgba(153,153,153,1);
                 
                }               
              }             
              button{
                  position absolute
                  left 50%
                  transform translateX(-50%)
                  top -15px
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color: #1CA5FF;
                  line-height:26px;
                  background #FAFAFC
                  width 130px
              }
          }
          .BDW{
              margin 5px 30px
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:26px;
              margin-top 20px
              position relative
              border-top :1px solid rgba(185,222,255,1);
              button{
                  position absolute
                  left 50%
                  transform translateX(-50%)
                  top -15px
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color: #1CA5FF;
                  line-height:26px;
                  background #FAFAFC
                  width 130px
              }
              span{                  
                  display inline-block
                  margin 20px 10px 20px
                  
              }
          }
          .ZD{            
              position relative
              border-top :1px solid rgba(185,222,255,1); 
              margin 20px 30px
              th{              
                display inline-block               
                line-height 11px
                margin-left 20px
                
              }
              div{
                display inline-block               
              }
              button{
                  position absolute
                  left 50%
                  transform translateX(-50%)
                  top -15px
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color: #1CA5FF;
                  line-height:26px;
                  background #FAFAFC
                  width 130px
              }
              span{
                  display inline-block
                  
                  margin-left 10px
                  margin-top 15px
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color:rgba(153,153,153,1);
              }
          }
      }
      .footer{
          width:666px;
          height:50px;
          border-top:1px solid rgba(229,229,229,1);
          .btn{
              margin-right 20px
              float right
              line-height 50px
          }
      }
    }
}

// 分组弹窗
.out{
  position:fixed;
	left:0px;
	top:0px;
  width 100%
  height 100%
	background-color :rgba(245,247,251,0.7);
  z-index 9
  .nei {
    border-radius: 5px;
    width: 550px;
    height: 600px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;
    background-color: #FAFAFA;

    // 头
    .title {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      color: white;
      background-color: rgba(41, 184, 252, 1);
    }

    // 主体
    .mian {
      background-color: #FAFAFA;
      .ming{
        margin-left: 20px;
        margin-top 10px
        span{
          width 100px
        }
      }
      .cun{
        margin-left: 30px;
        margin-top 10px
        span{
          width 100px
        }
      }
      // 搜索
      .sousuo {
        margin: 20px 20px 10px 20px;
      }

      .groupList {
        width: 500px;
        height: 300px;
        border: 1px solid #DCDFE6;
        margin: 20px 20px;

        li {
          list-style: none;
          margin-left: 20px;
          margin-top: 30px;
          font-size: 16px;
        }
      }

      .name {
        margin-left: 20px;
      }

      .button {
        float: right;
        margin-top: 10px;
        margin-right: 30px;
      }
    }
  }
}
</style>
