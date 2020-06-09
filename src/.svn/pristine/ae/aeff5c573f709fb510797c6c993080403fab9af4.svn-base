<template>
  <div class="DAO">
    <div class="DC">
        <div class="DCTitle">
            <span>脱敏导出</span>
            <span><i class="iconfont iconx"></i></span>
        </div>
        <div class="DCMain">
            <div class="storageList">            
                <el-table :data="datalist" highlight-current-row  border stripe>
                    <el-table-column prop="id" label="项目编号"></el-table-column>
                    <el-table-column prop="group_name" label="项目名称" width="100"></el-table-column>
                    <el-table-column prop="group_logic" label="筛选逻辑" width="100"></el-table-column>
                    <el-table-column prop="group_time" label="创建时间" width="100"></el-table-column>
                    <el-table-column prop="group_username" label="创建人" width="100"></el-table-column>
                    <el-table-column prop="group_username" label="创建人" width="100"></el-table-column>                   
                </el-table>
            </div>
            <div class="btns">
                <el-button>取消</el-button>
                <el-button>确认导出</el-button>
            </div>
        </div>        
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

     data(){
         return{
            datalist: [], //数据集数组
         }
     },
     methods:{
        // 获取数据集列表
        async getDataList() {
        const { data: res } = await this.axios.get(
            "group/list.php"
        );
        this.datalist = res.data;
        console.log(this.datalist)
        },
     },
      created() {
        this.getDataList();

    },
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
.DAO{
    position:fixed;
	left:0px;
	top:0px;
    width 100%
    height 100%  
	background-color :rgba(245,247,251,0.7);
    z-index 9
    .DC{
        width:642px;
        height 900px
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 20px 0px rgba(121,121,121,0.75);
        border-radius:0px 0px 4px 4px;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 20%;
        margin: auto;
       .DCTitle{
           width:642px;
            height:40px;
            line-height 40px
            background:rgba(28,177,255,1);
            border-radius:6px 6px 0px 0px;
           display flex
           justify-content space-between
           span{
               margin auto 10px
               color white
           }
       } 
       .DCMain{
           .storageList{
               margin 10px
           }
           .btns{
                float right
                margin 10px 10px
            }
       }
    }
}

 
</style>
