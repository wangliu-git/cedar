<template>
  <div class="container">
    <div class="login">
      <div class="left"></div>
      <div class="right">    
        <!-- :model="Form"表单数据绑定对象  (data)-->
        <!-- :rules="rules"表单验证规则 (data)-->
        <el-form :model="Form" :rules="rules" ref="LoginFormRef">
            <div class="title">病理标准化报告与数据智能管理平台</div>
            <!-- 用户名-->
            <el-form-item prop="username">
                <el-input  v-model="Form.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <!-- 密码-->
            <el-form-item prop="password">
                <el-input  type="password" v-model="Form.pass" prefix-icon="iconfont iconmima"  placeholder="请输入密码"></el-input>
            </el-form-item>
            <!-- 操作-->
            <el-form-item class="opearation">
               <el-checkbox v-model="checked">记住账号</el-checkbox>
               <el-button type="text" @click="forget">忘记密码？</el-button>
            </el-form-item>
            <!-- 按钮-->
            <el-form-item >
                <el-button class="btn" @click="onLogin" type="primary" round size="medium">登录</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="sign"><img src="" alt=""></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
      return {
        checked: false,  //默认不选中
        // 登录表单的数据绑定对象
        Form:{
          username:'',
          pass:'',
        },
        rules: {
          username: [
            // 必填项   错误信息   失去焦点验证
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {  max: 9, message: '长度最大 9 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { max: 13, message: '长度最大 13 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods:{
      //  表单登录验证
      onLogin() {
        this.$refs['LoginFormRef'].validate(async (valid) => {
          // 验证成功
          if (valid) {
            // 结构赋值
            const {data:res} = await this.axios.post('user/login.php',{params:{username:this.Form.username,pass:this.Form.pass}})
            console.log(res)
            // 判断登录成功失败
            if (res.uid = res.uid){
              this.$message({
                message:'登录成功',
                type:'success'
              })
              // 登录成功跳转到首页
              window.sessionStorage.setItem('token',res.token)
              window.sessionStorage.setItem('uid',res.uid)
              window.sessionStorage.setItem('username',res.post.username)
      
              this.$router.push('/homepage')
            }else{
              this.$message({
                message:res.msg,
                type:'error'
              })
            }
          } else {
            return false
          }
        })
      },
      // 忘记密码
      forget() {
          this.$alert('请联系平台管理员重置密码！', '忘记密码？', {
              confirmButtonText: '确定',
              // 点击确认后显示信息框
              // callback: action => {
              //     this.$message({
              //     type: 'info',
              //     // message: `action: ${ action }`
              //     });
              // }
          });
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
.container {
  background-color: skyblue
  height: 100%
  position: relative
  background-image url(./img/bg.png)
  
  .login {
    width: 1400px
    height: 700px
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    margin: auto
    background-image url(./img/sign.png)
    background-repeat no-repeat

    .left {
      width: 700px
      height: 100%
      float: left
      img{
          width 100%
          height 100%
      }
    }

    .right {
      width: 700px
      margin-top 50px
     
      float: right
      
      .opearation{
          display flex
          flex-flow row
      }
      .title {
        font-size: 25px
        color: #38A7FE
        margin 30px
      }
      .el-form{
        display flex
        flex-flow column
        justify-content center
        align-items center
        margin 80px auto 0
        .el-input {
            width 400px
            margin-top  20px 
        }
        .btn{
            width 400px
        }
        .el-checkbox{
            margin-right 250px
        }
      }
    }
  }
}
</style>
