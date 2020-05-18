<template>
  <div class="TMCon">
    <div class="TM">
        <div class="title">
          <span>脱敏导出</span>
          <span><i class="iconfont iconx"></i></span>
        </div>

        <div class="table">
           <el-table  tooltip-effect="dark" style="width: 100%"  border stripe>    
            <el-table-column prop="histologic_type" label="住院号" width="100"></el-table-column>
            <el-table-column prop="test_id" label="病理号" width="120"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="report_time" label="身份证号" show-overflow-tooltip width="100"></el-table-column>
            <el-table-column prop="sex" label="性别" width="100"></el-table-column>
            <el-table-column prop="age" label="年龄" width="100"></el-table-column>
          </el-table>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        tablelist: [], //病理号数组
      }
    },
    created() {
        
        this.getTableList();  
    },
    methods:{
      // 获取病理号
      async getTableList() {
          const { data: res } = await this.axios.get(
              "http://192.168.75.58/cedar/api/excel_data/list.php",
              this.tableinfo
          );
          console.log("getTableList",res);
          this.tablelist = res.data;
          this.count = res.count 
          console.log(res.data);
          // res.data.map( (item,index) =>{
          //     this.id = item.id
          //     // console.log(this.id)
          // })
      },
    }

  }


  // <div class="zhen">
  //             <span>检测结果 ：</span>
  //             <el-select
  //               v-model="edit.value"
  //               placeholder="请选择"
  //               size="mini"
  //               style="width:200px"
  //               multiple @change="shaixuan()"
  //             >
  //               <el-option v-for="(item,index) in this.value" :key="index"  :value="item">{{item}}</el-option>
  //             </el-select>
  //             <button size="mini">
  //               <i class="iconfont iconic_join_dialing_norm"></i>
  //             </button>
  //             <button size="mini">
  //               <i class="iconfont iconjianhao1"></i>
  //             </button>
  //           </div>
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
.TMCon{
  .TM{
    width:642px;
    height 600px
    margin auto
    .title{
        height:40px;
        line-height 40px
        color white
        display flex
        justify-content space-between
        background:rgba(28,177,255,1);
        border-radius:6px 6px 0px 0px;
        span{
          margin auto 10px
        }
    }
    .table{
        width:642px;
        height:400px;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 20px 0px rgba(121,121,121,0.75);
        border-radius:0px 0px 4px 4px;
        padding-bottom  10px
        .el-table{
          
        }
    }
  }
}
</style>
