<template>
  <div id="dataImport">
    <div class="shaixu">
      <div class="title">
        <span><i class="iconfont icontubiaozhizuo-"></i>全文检索</span>
        <el-input placeholder="搜索"  size="small" class="input-with-select" >
          <el-button slot="append" class=" iconfont iconsousuo" size="small"></el-button>
        </el-input> 
      </div>

      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
              <i class="iconfont icontubiaozhizuo-"></i>
              <span>基本信息</span>
          </template>
          <div class="jiben">
                
            <div class="ji">
              <span>病人ID ：</span>
              <el-input  placeholder="请输入内容" size="mini" style="width:200px"></el-input>
            </div> 

            <div class="ji">
              <span>姓名 ：</span>
              <el-input  placeholder="请输入姓名" size="mini" style="width:200px"></el-input>
            </div> 

            <div class="ji">
              <span>性别 ：</span>
                <el-select  placeholder="请选择性别" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="ji">
              <span>籍贯 ：</span>
              <el-select  placeholder="请选择籍贯" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="ji">
              <span>民族 ：</span>
              <el-select  placeholder="请选择民族" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 


            <div class="ji">
              <span>年龄 ：</span>
              <el-input size="mini" style="width:100px"></el-input>-<el-input size="mini" style="width:100px"></el-input>
            </div> 
          </div>
        </el-collapse-item>

        <el-collapse-item  name="2">
          <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
              <i class="iconfont icontubiaozhizuo-"></i>
              <span>报告信息</span>
          </template>    
          <div class="baogao">
            <div class="bao">
              <span>病理号 ：</span>
              <el-input  placeholder="请输入姓名" size="mini" style="width:200px"></el-input>
            </div> 

            <div class="bao">
              <span>送检时间 ：</span>
              <el-date-picker  v-model="value" type="daterange" align="right" unlink-panels range-separator="至"
                start-placeholder="开始日期"  end-placeholder="结束日期" :picker-options="pickerOptions" size="mini" style="width:200px">
              </el-date-picker>
            </div> 

            <div class="bao">
              <span>送检科室 ：</span>
              <el-input  placeholder="请输入姓名" size="mini" style="width:200px"></el-input>
            </div>

            <div class="bao">
              <span>初诊医生 ：</span>
                <el-select placeholder="请选择初诊医生" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="bao">
              <span>主诊医生 ：</span>
                <el-select  placeholder="请选择主诊医生" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="bao">
              <span>审核医生 ：</span>
                <el-select  placeholder="请选择审核医生" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="bao">
              <span>术前辅助治疗 ：</span>
                <el-select  placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

          </div>
        </el-collapse-item>

        <el-collapse-item name="3">
          <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
              <i class="iconfont icontubiaozhizuo-"></i>
              <span>诊断信息</span>
          </template>    
          <div class="zhenduan">
            <div class="zhen">
              <span>标本类型 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>手术方式 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>肿瘤数量 ：</span>
              <el-input  placeholder="请填写肿瘤数量" size="mini" style="width:200px"></el-input>
            </div> 

            <div class="zhen">
              <span>肿瘤大体类型 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>延气道散播 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>切缘 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>周围肺组织伴随病变 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>蜡块号 ：</span>
              <el-input  placeholder="请填写" size="mini" style="width:200px"></el-input>
            </div> 

            <div class="zhen">
              <span>部位 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div>

            <div class="zhen">
              <span>肿瘤最大径 ：</span>
              <el-input  size="mini" style="width:100px"></el-input>-
              <el-input  size="mini" style="width:100px"></el-input>cm
            </div> 

            <div class="zhen">
              <span>治疗反应 ：</span>
              <el-input  placeholder="请填写" size="mini" style="width:200px"></el-input>
            </div> 

            <div class="zhen">
              <span>残存百分比 ：</span>
              <el-input  placeholder="请填写" size="mini" style="width:200px"></el-input>%
            </div> 

            <div class="zhen">
              <span>组织学分型 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>诊断编码 ：</span>
              ICD：<el-input   size="mini" style="width:100px"></el-input>
              O：<el-input  size="mini" style="width:100px"></el-input>
            </div> 

            <div class="zhen">
              <span>诊断意向 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>分化程度 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>肺管癌栓 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>神经侵犯 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>周围组织侵犯 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 


            <div class="zhen">
              <span>病灶类型 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>脏层胸膜侵犯 ：</span>
              <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>TNM分期:</span>
                <el-select size="mini" style="width:45px">
                <el-option></el-option>
              </el-select>
              <span>T:</span>
                <el-select size="mini" style="width:45px">
                <el-option></el-option>
              </el-select>
              <span>N:</span>
                <el-select size="mini" style="width:45px">
                <el-option></el-option>
              </el-select>
              <span>M:</span>
                <el-select size="mini" style="width:45px">
                <el-option></el-option>
              </el-select>
            </div> 

            <div class="zhen">
              <span>数据来源 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div>

            <div class="zhen">
              <span>整合信息 ：</span>
                <el-select placeholder="请选择" size="mini" style="width:200px">
                <el-option></el-option>
              </el-select>
            </div>


          </div>  
        </el-collapse-item>
      </el-collapse>

      <div class="footer">
          
          <el-button>加入分组</el-button>
          
          <el-button>重置</el-button>
          <el-button>筛选</el-button>
      </div>
    </div>

    <!--  列表-->
    <div class="list">
        <div class="down">
          <el-table :data="tablelist" tooltip-effect="dark" style="width: 100%"   border   stripe>
            <el-table-column type="selection" width="40"></el-table-column>           
            <el-table-column prop="test_id" label="病理号" width="190"  sortable></el-table-column>
            <el-table-column prop="name" label="姓名" width="190"  sortable></el-table-column>
            <el-table-column prop="cancer," label="病种类型" width="190"  sortable></el-table-column>
            <el-table-column prop="histologic_type" label="组织学类型" width="190"  sortable></el-table-column>
            <el-table-column prop="sex" label="性别" width="190"  sortable></el-table-column>
            <el-table-column prop="age" label="年龄" width="190"  sortable></el-table-column>
            <el-table-column prop="report_date" label="报告时间" show-overflow-tooltip width="190"  sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">             
              <template  slot-scope="scope">                 
                <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="bianji(scope.row)">编辑</el-button>                  
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
    
     <!-- 查看列表单个信息-->
    <div class="zhezhao" v-if="zhezhao">
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
                <div><span>病理号：</span>{{editForm.patient_id}}</div>           
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
                <!--               
                <el-button-group>
                  <el-button v-for="(item,index) in editForm.helper_diagnosis.ihc" :key="index" :value="item">{{item.mark}}</el-button>
                  <el-button v-for="(item,index) in editForm.helper_diagnosis.ihc" :key="index" :value="item">{{item.value}}</el-button>                  
                </el-button-group> 
                {{editForm.helper_diagnosis.ihc.mark}} {{editForm.helper_diagnosis.ihc.value}}
                -->                       
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
  </div>
</template>

<script type="text/ecmascript-6">
import uuid from "uuid";
import allMessage from "../../staic/allMessage.json";
export default {
  data() {
    return {
      tablelist: [], //病理号数组
      zhezhao:false,
      id:'',     //列表参数
      // 分页器
      queryInfo:{
        page:1,         //页数
        pagerows:10,    //每页显示的条数
        count:0,        //数据总数
      }, 
      // 查询到的用户信息对象
      editForm:{},         
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
      value: '',
      // 折叠面板默认打开
      activeNames: ["3","1","2"],
      tablelist: [], //病理号数组
    }
  },
  created() {
    this.getTableList();  
  },
  methods:{
    // 删除
    del(row) {
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
    // 获取病理号
    async getTableList() {
      const { data: res } = await this.axios.get(
        "report/list.php",
        {params:{page:this.queryInfo.page}}
      );
      console.log("getTableList",res);
      this.tablelist = res.data;
      console.log(res.data);
      this.queryInfo.page = parseInt(res.page);     
      this.queryInfo.count = parseInt(res.count)  //总条数
      this.queryInfo.pagerows = res.pagerows  //每页显示多少条 
    },
    // 点击查看
    async look(row){
      this.zhezhao =! this.zhezhao  //不能没     
      const { data :res} = await this.axios.get(
        "report/onedata.php " ,{params:{id:row.id}}
      );
      this.editForm = res.data;
      // this.editForm = Object.assign(res.data[0],res.data[1],res.data[2])
      // 表单对象
      console.log(this.editForm);   
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

  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
#dataImport .el-collapse-item__header{
  border-left: 5px #1CA5FF solid;
  margin 10px
}

.shaixu{
  width:1630px; 
  background:rgba(255,255,255,1);
  box-shadow:0px 1px 10px 0px rgba(204,204,204,0.75);
  border-radius:4px;
  .title{
    height:40px;
    line-height 40px
    background:rgba(250,250,250,1);
    box-shadow:0px 1px 0px 0px rgba(224,224,224,0.75);
    border-radius:4px 0px 0px 0px;
    .el-input{
      width 280px
      
    }
    .el-button{
      background:rgba(28,178,255,1)
      border-radius:0px 4px 3px 0px;
    }   
    .iconsousuo{
      color white
    }
    .icontubiaozhizuo-{
      color rgba(28,173,255,1);
    }
  }
  .jiben{
    display flex   
    flex-wrap wrap
    .ji{
      width: 300px;
      display: flex;
      flex-flow row
      margin-left 20px
      margin-top 10px
      justify-content: space-around;
      span {
        display: inline-block;
        width: 59px;
      }
    }
  }
  .baogao{
    display flex
    flex-wrap wrap
    .bao{
      width: 300px;
      display: flex;
      margin-left 20px
      flex-flow row
      margin-left 20px
      margin-top 10px
      justify-content: space-around;
      span {
        display: inline-block;
        width: 120px;
      }
    }
  }
  .zhenduan{
    display flex
    flex-wrap wrap
    .zhen{
      width: 300px;
      display: flex;
      margin-left 20px
      flex-flow row
      margin-left 20px
      margin-top 10px
      justify-content: space-around;
      span {
        display: inline-block;
        width: 170px;
      }
    }
  }
  .footer{
    height:42px;
    background:rgba(250,250,250,1);
    box-shadow:0px -1px 0px 0px rgba(224,224,224,0.75);
    border-radius:0px 0px 4px 4px;
    .el-button{
      float right
    }
  }
}

.list{
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
  border-radius: 4px;
  margin-top: 20px; 
  .down{
    padding-bottom: 60px;
    border-top  1px solid rgba(28,165,255,1);
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


 
</style>
