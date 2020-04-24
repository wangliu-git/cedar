<template>
  <div class="container">
       <div class="content">
        <div class="up">
          <el-input placeholder="搜索"  size="small" class="input-with-select" >
            <el-button slot="append" class=" iconfont iconsousuo" size="small"></el-button>
          </el-input> 
            <el-button class="iconfont iconic_join_dialing_norm" size="small">添加</el-button>
            <el-button class="iconfont iconpiliangshanchu" size="small">批量删除</el-button>
        </div>
        <div class="down" style="width:96%">
          <el-table ref="multipleTable" :data="userlist" tooltip-effect="dark" style="width: 100%" border stripe >
            <el-table-column type="selection" width="80"></el-table-column>
            <el-table-column prop="username" label="用户名" width="280"></el-table-column>
            <el-table-column prop="role_id" label="权限" width="280"></el-table-column>
            <el-table-column prop="last_time" label="录入时间" width="280"></el-table-column>
            <el-table-column prop="memo" label="备注" width="280"></el-table-column>
            <el-table-column fixed="right" label="操作" width="280">
              <template  slot-scope="scope"> 
                <el-button type="text" size="small"><span @click="xiugai(scope.row)"><a href="javascript:;">修改</a></span></el-button>
                <el-button type="text" size="small"><span  @click="del(scope.row)"><a href="javascript:;">删除</a></span></el-button>
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
      <div class="zhezhao"  v-if="!group">
        <div class="message" >
          <div class="up">
              <span>修改</span>
              <span @click="group =! group"><i class="iconfont iconx"></i></span>
          </div>
          <div class="down">
            <el-form :model="userData" :rules="rules"  label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userData.username" style="width:300px" size="mini" ></el-input>
              </el-form-item>
              <el-form-item label="权限" prop="region">
                <el-select v-model="userData.role_id" placeholder="请选择权限" style="width:300px" size="mini">
                  <el-option label="区域一" value="shanghai">管理员</el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input v-model="userData.password" style="width:300px" size="mini" placeholder="请设置新密码" ></el-input>
              </el-form-item>
              <el-form-item label="备注"  maxlength="256" show-word-limit style="width:300px" size="mini" prop="memo">
                <el-input type="textarea" v-model="userData.memo" style="width:300px" size="mini" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="group =! group">取消</el-button>
                <el-button plain @click="group =! group">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 用户信息
        userData:[],
        // 分页器
        queryInfo:{
          page:1,         //页数
          pagerows:10,    //每页显示的条数
          count:0,        //数据总数
        },  
        group:true,
        ruleForm: {
          name: '',
          region: '',
          desc: ''
        },
        userlist:[],
        rules: {
          username: [
            { required: true, message: '用户名一旦修改不能更改', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择权限', trigger: 'blur' }
          ],
          pass:[
            { required: true, message: '输入密码', trigger: 'blur'}
          ],
          memo: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
      // 获取用户列表
      async getUserList(){
        const {data :res} = await this.$http.get("http://192.168.75.58/cedar/api/user/list.php" ,{params:{page:this.queryInfo.page}})
        // console.log(res)
        this.userlist = res.data
        this.queryInfo.page = parseInt(res.page);     
        this.queryInfo.count = parseInt (res.count)  //总条数
        this.queryInfo.pagerows = res.pagerows  //每页显示多少条    
      },
      // 点击修改
      async xiugai(row){
        this.group = !this.group
        const {data : res} = await this.$http.get("http://192.168.75.58/cedar/api/user/one.php",{params:{id:row.id}})
        console.log(res)
        this.userData =res

      },
      // 切换每页显示多少条
      handleSizeChange(newSize) {
        this.queryInfo.pagerows = newSize;
        this.getUserList();
      },
      // 点击页数
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage;
        this.getUserList();
      },
      // 删除用户
      async del(row){
        console.log(row.id)
        window.sessionStorage.clear()
        const {data:res} = await this.$http.get('http://192.168.75.58/cedar/api/user/del.php',{params:{id:row.id}})
        console.log(res)      
      },
    },
    mounted(){
      this.getUserList()
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
a{
  color #1CB2FF
  &:hover{
    color #1ca5ff
  }
}
.container{
  height 100%
  .iconsousuo{
    color white
  }
  .content{
    width:1630px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 10px 0px rgba(204,204,204,0.75);
    border-radius:4px 4px 4px 4px;
    .up{
      .el-input{
        width 280px
        margin 30px 30px 10px
      }
      .el-button{
        background:rgba(28,178,255,1)
        border-radius:0px 4px 3px 0px;
      }    
      .iconpiliangshanchu{
        background:rgba(246,77,77,1);
        border-radius:4px;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,1);
        float right 
        margin-top 30px
        margin-right 40px       
      }
      .iconic_join_dialing_norm{
        background:rgba(28,178,255,1);
        border-radius:4px;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top 30px
      }
    }
    .down{
      padding-bottom: 20px;
      background:rgba(255,255,255,1);
      border-top:3px solid rgba(28,165,255,1);;
      margin  10px 20px 
      .el-pagination{
        height 50px
        margin-top 10px
      }
    }
  }
  .zhezhao{
    position:fixed;
    left:0px;
    top:0px;
    width 100%
    height 100% 
    background-color :rgba(245,247,251,0.7);
    z-index 9
    .message{
      width:450px;
      height:350px;
      background:rgba(252,252,252,1);
      box-shadow:0px 4px 20px 0px rgba(121,121,121,0.75);
      position absolute
      border-radius:6px ;
      left 0
      top 0
      bottom 0
      right 0
      margin auto
      z-index 99
      .el-button{
        float right 
        margin-right 10px
      }
      .up{
        display flex
        justify-content space-between
        height:40px;
        line-height 40px
        background:rgba(28,177,255,1);
        border-radius:6px 6px 0px 0px;
        span{
          margin  0 10px
          color white
        }

      }
    }
  }
}
 
</style>
