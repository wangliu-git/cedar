<template>
  <div>
<div class="zhezhao" v-if="!zhezhao" >
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
  export default {
     data() {
    return {
      zhezhao:false,

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

    }
  },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >

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
