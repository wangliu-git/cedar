<template>
  <div id="dataImport">
    <!--折叠面板1--选择分组-->
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item name="1">
        <template
          slot="title"
          style="background-color:rgba(232, 232, 232, 1) ,border:1px solid,margin-left:10px"
        >
          <i class="iconfont icontubiaozhizuo-"></i> 选择分组
        </template>
        <!--项目编号 -->
        <div class="search">
          <div class="left">
            <span>创建人 ：</span>
            <el-select placeholder="请选择" size="small">
              <el-option></el-option>
            </el-select>
          </div>

          <div class="right">
            <el-input placeholder="搜索" size="small" class="input-with-select">
              <el-button slot="append" class="iconfont iconsousuo" size="small"></el-button>
            </el-input>
          </div>

          <div class="storageList">
            <div class="list" style="width:96%">
              <el-table :data="datalist" highlight-current-row style="width: 100%" border stripe>
                <el-table-column prop="id" label="项目编号" width="250"></el-table-column>
                <el-table-column prop="group_name" label="项目名称" width="250"></el-table-column>
                <el-table-column prop="group_logic" label="筛选逻辑" width="300"></el-table-column>
                <el-table-column prop="group_time" label="创建时间" width="250"></el-table-column>
                <el-table-column prop="group_username" label="创建人" width="250"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                  <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="daochu =! daochu">脱敏导出</el-button>
                    <el-button type="text" size="small" @click="jieshi = !jieshi"><i class="iconfont iconwenhao"></i></el-button>
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>        
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>      
      </el-collapse-item>
    </el-collapse>

    <!--折叠面板2--创建者-->
    <el-collapse v-model="activeNames" style="margin-top:20px">
      <el-collapse-item name="2">
        <template
          slot="title"
          style="background-color:rgba(232, 232, 232, 1) ,border:1px solid,margin-left:10px"
        >
          <i class="iconfont icontubiaozhizuo-"></i>全部创建者的全部数据
          <el-button
            class="iconfont iconshujufenxi"
            style="background:rgba(38,188,153,1);"
            size="mini"
          >
            <span style="color:white">数据分析</span>
          </el-button>
        </template>

        <!--全部创建者的数据 -->
        <div class="down">
          <el-table :data="tablelist" tooltip-effect="dark" style="width: 100%" border stripe>
            <el-table-column type="selection" width="40"></el-table-column>

            <el-table-column prop="test_id" label="病理号" width="170" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" width="170" sortable></el-table-column>
            <el-table-column prop="histologic_type" label="组织学类型" width="170" sortable></el-table-column>
            <el-table-column prop="sex" label="性别" width="170" sortable></el-table-column>
            <el-table-column prop="age" label="年龄" width="170" sortable></el-table-column>
            <el-table-column prop="report_time" label="报告时间" show-overflow-tooltip width="170" sortable></el-table-column>
            <el-table-column prop="entry_status" label="录入状态" show-overflow-tooltip width="170" sortable></el-table-column>
            <el-table-column prop="complete_degree" label="完整度" show-overflow-tooltip width="170" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="170">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>

                <el-button type="text" size="small" @click="dele(scope.row)">删除</el-button>
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
      </el-collapse-item>
    </el-collapse>

    <!--脱敏导出解释-->
    <div class="TUO" v-if="jieshi">
      <div class="tuoD">
        <div class="DTitle">
          <span>脱敏导出</span>
        </div>
        <div class="DMain">
            <span>原始值（待脱敏数据）：13312341234</span>
            <span> 脱敏结果（脱敏后的数据显示）：as2nh6hji1hui4hasd0w</span>
            <span style="color:rgba(153,153,153,1);">使用Hash函数对敏感数据进行脱敏，不支持逆运算。</span>
        </div>
        <div class="DFoot">
          <span @click="jieshi = !jieshi">我知道了</span>
        </div>
      </div>
    </div>
    <!--脱敏导出-->
    <div class="DAO" v-if="daochu">
      <div class="DC">
          <div class="DCTitle">
              <span>脱敏导出</span>
              <span @click="daochu =! daochu"><i class="iconfont iconx"></i></span>
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
                  <el-button @click="daochu =! daochu">取消</el-button>
                  <el-button  @click="daochu =! daochu"> 确认导出</el-button>
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
      // 脱敏导出解释
      jieshi:false,
      // 脱敏导出
      daochu:false,
      // 分页器
      queryInfo:{
        page:1,         //页数
        pagerows:10,    //每页显示的条数
        count:0,        //数据总数
      }, 
      activeNames: ["1", "2"],
      datalist: [], //数据集数组
      tablelist: [], //病理号数组

    };
  },
  created() {
    this.getDataList();
    this.getTableList();
  },
  methods: {

    // 分组删除
    async del(row) {
       const { data: res } = await this.$http.get(
      "http://192.168.75.58/cedar/api/group/del.php " , {params:{id:row.id}});
      console.log(res)
      // this.$confirm("确定删除该数据？, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      //   center: true
      // })
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "删除成功!"
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除"
      //     });
      //   });
    },    
    // 获取数据集列表
    async getDataList() {
      const { data: res } = await this.$http.get(
        "http://192.168.75.58/cedar/api/group/list.php"
      );
      this.datalist = res.data;
      console.log(this.datalist)
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
      const { data: res } = await this.$http.get(
        "http://192.168.75.58/cedar/api/group_report/list.php",
        {params:{page:this.queryInfo.page}}
      );
      console.log("getTableList",res);
      this.tablelist = res.data;
      console.log(res.data);
      this.queryInfo.page = parseInt(res.page);     
      this.queryInfo.count = parseInt(res.count)  //总条数
      this.queryInfo.pagerows = res.pagerows  //每页显示多少条 
    },
    // 病理号删除
    async dele(row) {
      const { data: res } = await this.$http.get(
        "http://192.168.75.58/cedar/api/report/del.php",
        {params:{id:row.id}}
      );
      console.log("getTableList",res);
      this.tablelist = res.data;
      console.log(res.data);
      // this.queryInfo.page = parseInt(res.page);     
      // this.queryInfo.count = parseInt(res.count)  //总条数
      // this.queryInfo.pagerows = res.pagerows  //每页显示多少条 
    },
  }
};

</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
.iconshujufenxi {
  color: white;
  margin: 10px;
}

.icontubiaozhizuo- {
  color: #1CADFF;
}

.search {
  .left {
    width: 280px;
    margin: 10px 30px 10px;
  }

  .right {
    .el-input {
      width: 280px;
      margin: 10px 30px 10px;
    }

    .el-button {
      background: rgba(28, 178, 255, 1);
      border-radius: 0px 4px 3px 0px;
    }

    .iconsousuo {
      color: white;
      background: rgba(28, 173, 255, 1);
    }
  }

  .storageList {
    margin-top: 20px;
    padding-bottom: 20px;

    .list {
      padding-top: 10px;
      margin-left: 30px;

      .el-table {
        border-top: 1px solid rgba(0, 160, 233, 1);
        margin: 10px 0;
      }
    }
  }
}

.down {
  border-top: 2px solid #1CA5FF;
  margin-top: 20px;
  padding-bottom: 60px;
  margin: 20px 20px;

  .el-pagination {
    float: right;
    margin: 10px 10px 0 0;
  }
}


.TUO{
  position:fixed;
	left:0px;
	top:0px;
  width 100%
  height 100%  
	background-color :rgba(245,247,251,0.7);
  z-index 9
  .tuoD{
    width:430px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 20%;
    margin: auto;
    .DTitle{    
      height:40px;
      background:rgba(28,177,255,1);
      border-radius:6px 6px 0px 0px;
      color white 
      line-height 40px
      span{
        margin-left 20px
      }
    }
    .DMain{
      display flex
      flex-flow column
      justify-content center     
      background white
      span{
        margin-top 10px
        font-size:14px;
        margin 10px 30px
      }
    }
    .DFoot{
      width:430px;
      height:38px;
      line-height 38px
      background:rgba(245,245,245,1);
      box-shadow:0px -1px 0px 0px rgba(184,183,183,0.45);
      border-radius:0px 0px 6px 6px;
      text-align center
      span{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(41,184,252,1);
      }
    }

  }
}

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
