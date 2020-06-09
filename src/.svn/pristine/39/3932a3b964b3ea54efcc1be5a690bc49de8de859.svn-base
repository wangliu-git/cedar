<template>
  <div class="container">
    <div class="content">
      <div class="up">
        <el-input placeholder="搜索" size="small" class="input-with-select" v-model="searchname" @keyup.enter.native="getUserList()">
          <el-button slot="append" class="iconfont iconsousuo" size="small"  @click="getUserList()"></el-button>
        </el-input>
        <el-button class="iconfont iconic_join_dialing_norm" size="small" @click="add()" v-if="roleid >1">添加</el-button>
        <el-button class="iconfont iconpiliangshanchu" size="small" @click="dels()" v-if="roleid >1">批量删除</el-button>
      </div>

      <div class="down" style="width:96%">
        <el-table
          ref="multipleTable"
          :data="userlist"
          tooltip-effect="dark"
          style="width: 100%"
          border
          stripe
          @selection-change="checkTable"
          :header-cell-style="{color:'#333333'}">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="username" label="用户名" width="280"></el-table-column>
          <el-table-column prop="role_id" label="权限" width="280"></el-table-column>
          <el-table-column prop="last_time" label="录入时间" width="280"></el-table-column>
          <el-table-column prop="memo" label="备注" width="280"></el-table-column>
          <el-table-column fixed="right" label="操作" width="280">
            <template slot-scope="scope">
            <div v-if="roleid >1">
              <el-button type="text" size="small" >
                <span @click="chakan(scope.row)">修改</span>
              </el-button>
              <el-button type="text" size="small">
                <span @click="del(scope.row)">删除</span>
              </el-button>
            </div >
              <el-button type="text" size="small"  v-else>
                <span >- - - - - </span>
              </el-button>
            
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin:10px 40%"
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

    <!-- 修改-->
    <div class="zhezhao" v-if="group">
      <div class="message">
        <div class="up">
          <span>修改</span>
          <span @click="group =false">
            <i class="iconfont iconx"></i>
          </span>
        </div>
        <div class="Down"  >
          <el-form :model="userData"  label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userData.username" style="width:300px" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="region">
              <el-select
                v-model="userData.role_id"
                placeholder="请选择权限"
                style="width:300px"
                size="mini"
              >
                <el-option
                  v-for="(item, index) in this.quanxian"
                  :key="index"
                  :value="item.value"
									:label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input
                v-model="userData.password"
                style="width:300px"
                size="mini"
                placeholder="请设置新密码"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="备注"
              maxlength="256"
              show-word-limit
              style="width:300px"
              size="mini"
              prop="memo"
            >
              <el-input
                type="textarea"
                v-model="userData.memo"
                style="width:300px"
                size="mini"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button plain @click="group =false">取消</el-button>
              <el-button plain @click="bianji('ruleForm',userData)">确定</el-button>
            </el-form-item>
          </el-form>
          
        </div>
      </div>
    </div>

    <!-- 添加-->
    <div class="zhezhao" v-if="Add">
      <div class="message">
        <div class="up">
          <span>添加</span>
          <span @click="Add =false">
            <i class="iconfont iconx"></i>
          </span>
        </div>
        <div class="Down">
          <el-form  :model="addUserList" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="addUserList.username" style="width:300px" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="region">
              <el-select
                v-model="addUserList.role_id"
                placeholder="请选择权限"
                style="width:300px"
                size="mini"
              >
                <el-option
                  v-for="(item, index) in this.quanxian"
                  :key="index"
                  :value="item.value"
									:label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input
                v-model="addUserList.password"
                style="width:300px"
                size="mini"
                placeholder="请设置新密码"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="备注"
              maxlength="256"
              show-word-limit
              style="width:300px"
              size="mini"
              prop="memo"
            >
              <el-input
                type="textarea"
                v-model="addUserList.memo"
                style="width:300px"
                size="mini"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button plain @click="Add =false ">取消</el-button>
              <el-button plain @click="tianjia('ruleForm')">确定</el-button>
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
      idss:[],
      roleid:'',
      searchname:'',    //搜索
      ruleForm: {
       role_id:'',
      },
      // rules:{
      //  role_id: [        
      //     { required: true, message: '请选择用户权限', trigger: 'change' }        
      //   ]
      // },
      Add: false,
      // 修改用户信息
      userData: {
        username: "",
        password: "",
        role_id: "",
        memo: ""
      },
      // 添加用户信息
      addUserList: {
        username: "",
        password: "",
        role_id: "",
        memo: ""
      },
      // 分页器
      queryInfo: {
        page: 1, //页数
        pagerows: 10, //每页显示的条数
        count: 0 //数据总数
      },
      quanxian: [
        {
          value: "1",
          label: "普通用户"
        },
        {
          value: "2",
          label: "管理员"
        },
        {
          value: "3",
          label: "超级管理员"
        }
      ],
      group: false,
      ruleForm: {
        name: "",
        region: "",
        desc: ""
      },
      userlist: [],
      // rules: {
      //   username: [
      //     {
      //       required: true,
      //       message: "用户名一旦修改不能更改",
      //       trigger: "blur"
      //     },
      //     { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
      //   ],
      //   region: [{ required: true, message: "请选择权限", trigger: "change" },
      //    { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }],
      //   pass: [{ required: true, message: "输入密码", trigger: "blur" }],
      //   memo: [{ required: true, message: "请填写备注", trigger: "blur" }]
      // }
    };
  },
  methods: {
    // 批量删除
    checkTable(rows){
      console.log(rows)
      rows.map( (item,index) =>{
        console.log(item.id)               
        this.idss.push(item.id)       
      })
      this.idss = [...new Set(this.idss)];       
      console.log(this.idss)   
    },
    dels(){
      let ids 
      this.$confirm("确定批量删除这（个）些用户？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
      .then(() => {
        const res =  this.axios.get('user/del.php',{params:{ids:this.idss}}).then( res=>{
          console.log(res)     
        })
         this.getUserList()
        this.idss = []
        console.log(this.idss)
        this.$message({
          type: "success",
          message: "删除成功!"
        }); 
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },
    // 搜索模糊
    // async search(){
    //   let username
    //   const res = await this.axios.get('user/list.php',{params:{username:this.searchname,page:this.queryInfo.page}}).then( res => {
    //     console.log(res)
    //     this.userlist = res.data.data;
    //     this.queryInfo.page = parseInt(res.data.page);
    //     this.queryInfo.count = parseInt(res.data.count); //总条数
    //     this.queryInfo.pagerows = res.data.pagerows; //每页显示多少条
    //     console.log(this.queryInfo.count)
    //   })
    // },
    // 获取用户列表
    async getUserList() {
      // alert(1)
      const { data: res } = await this.axios.get("user/list.php", {
        params: { page: this.queryInfo.page ,username:this.searchname}
      });
      this.userlist = res.data;
      console.log(this.userlist);
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
      this.queryInfo.pagerows = res.pagerows; //每页显示多少条
    },
    // 点击用户列表修改
    async chakan(row) {
      this.group = true;
      const { data: res } = await this.axios.get("user/one.php", {
        params: { id: row.id }
      });
      console.log(res);
      this.userData = res;
      this.id = row.id;
      this.getUserList();
    },
    // 点击添加按钮出现对话框
    add() {
      this.Add = true;
    },
    // 点击添加弹框确定
    async tianjia() { 
      console.log(this.addUserList);
       if(this.addUserList.username == ''){
        this.$alert('用户名不能为空，请填入并仔细检查其他选项', '标题名称', {
          confirmButtonText: '确定',
          type: "warning",       
        });
      }else if(this.addUserList.password == ''){
        this.$alert('密码不能为空，请填入并仔细检查其他选项', '标题名称', {
          confirmButtonText: '确定',
          type: "warning",       
        });
      }else if(this.addUserList.role_id == ''){
        this.$alert('用不权限不能为空，请填入并仔细检查其他选项', '标题名称', {
          confirmButtonText: '确定',
          type: "warning",       
        });
      }else{
        const res = await this.axios.get("user/add.php", {
          params: {
            username: this.addUserList.username,
            password: this.addUserList.password,
            role_id: this.addUserList.role_id,
            memo: this.addUserList.memo
          }
        });
        this.addUserList = {}
        console.log(res.data);
        this.getUserList();
        this.Add = false;
      }
     
    
    },
    // 点击修改弹窗的确定
    async bianji(id) {
      console.log(this.id);

      if(this.userData.username == ''){
        this.$alert('用户名不能为空，请填入并仔细检查其他选项', '标题名称', {
          confirmButtonText: '确定',
          type: "warning",       
        });
      }else if(this.userData.password == ''){
        this.$alert('密码不能为空，请填入并仔细检查其他选项', '标题名称', {
          confirmButtonText: '确定',
          type: "warning",       
        });
      }else if(this.userData.role_id == ''){
        this.$alert('用不权限不能为空，请填入并仔细检查其他选项', '标题名称', {
          confirmButtonText: '确定',
          type: "warning",       
        });
      }else{
       const res = await this.axios
        .get("user/edit.php", {
          params: {
            id: this.id,
            username: this.userData.username,
            password: this.userData.password,
            role_id: this.userData.role_id,
            memo: this.userData.memo
          }
        })
        this.group = false;
    
      this.getUserList();
      }
      
    },
    // 切换每页显示多少条
    handleSizeChange(newSize) {
      this.queryInfo.pagerows = newwSize;
      this.getUserList();
    },
    // 点击页数
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getUserList();
    },
    // 删除用户
    async del(row) {
      console.log(row.id);
      // window.sessionStorage.clear();
      const { data: res } = await this.axios.get("user/del.php", {
        params: { id: row.id }
      });
      console.log(res);
      this.$confirm("确定删除该用户？是否继续?", "提示", {
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
          if(row.id == window.sessionStorage.uid){
            window.sessionStorage.clear();
            this.$router.push("/login");
          }else{
            this.getUserList();
          }
           
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.getUserList();
    this.roleid = window.sessionStorage.role_id;
    console.log(this.roleid)
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.iconxinghao1{
  color red  !important
  font-size 8px !important
  margin-right 3px
}
.el-form-item {
  margin-left: 0;
}

a {
  color: #1CB2FF;

  &:hover {
    color: #1ca5ff;
  }
}

.container {
  height: 100%;

  .iconsousuo {
    color: white;
  }

  .content {
    width: 1630px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
    border-radius: 4px 4px 4px 4px;

    .up {
      .el-input {
        width: 280px;
        margin: 30px 30px 10px;
      }

      .el-button {
        background: rgba(28, 178, 255, 1);
        border-radius: 0px 4px 3px 0px;
      }

      .iconpiliangshanchu {
        background: rgba(246, 77, 77, 1);
        border-radius: 4px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        float: right;
        margin-top: 30px;
        margin-right: 40px;
      }

      .iconic_join_dialing_norm {
        background: rgba(28, 178, 255, 1);
        border-radius: 4px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-top: 30px;
      }
    }

    .down {
      padding-bottom: 0;
      background: rgba(255, 255, 255, 1);
      border-top: 3px solid rgba(28, 165, 255, 1);
      margin: 10px 20px;
      .el-pagination {
        height: 50px;
        margin-top: 10px;
      }

      span {
        margin-left: 10px;
      }
    }
  }

  .zhezhao {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(245, 247, 251, 0.7);
    z-index: 9;

    .message {
      width: 450px;
      height: 350px;
      background: rgba(252, 252, 252, 1);
      box-shadow: 0px 4px 20px 0px rgba(121, 121, 121, 0.75);
      position: absolute;
      border-radius: 6px;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      z-index: 99;

      .el-button {
        float: right;
        margin-right: 10px;
      }

      .up {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        background: rgba(28, 177, 255, 1);
        border-radius: 6px 6px 0px 0px;

        span {
          margin: 0 10px;
          color: white;
        }
      }
      
    }
  }
}
</style>
