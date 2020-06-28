<template>
  <div class="container">
    <div class="login">
      <div class="left"></div>
      <div class="right">
        <el-form :model="Form" :rules="rules" ref="LoginFormRef">
          <div class="title">肿瘤病理数据智能系统</div>
          <!-- 用户名-->
          <el-form-item prop="username">
            <el-input v-model.trim="Form.username" @keyup.enter.native="onLogin()" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!-- 密码-->
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model.trim="Form.pass" @keyup.enter.native="onLogin()"
              prefix-icon="iconfont iconmima"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <!-- 操作-->
          <el-form-item class="opearation">
            <el-checkbox  v-model="checked">记住账号</el-checkbox>
            <el-button type="text" @click="forget"><u >忘记密码？</u></el-button>
          </el-form-item>
          <!-- 按钮-->
          <el-form-item>
            <el-button class="btn" @click="onLogin" type="primary"   round size="medium">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="sign">
      <div class="logo">
        © Copyright -志诺维思（北京）基因科技有限公司. 京ICP备16044233号-8
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      checked: false, //默认不选中
      // 登录表单的数据绑定对象
      Form: {
        username: "",
        pass: "",
        role_id:''
      },
      rules: {
        username: [
          // 必填项   错误信息   失去焦点验证
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 9, message: "长度最大 9 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 13, message: "长度最大 13 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //  表单登录验证
    onLogin() {
      this.$refs["LoginFormRef"].validate(async valid => {
        // 验证成功
        if (valid) {
          // 结构赋值
          const { data: res } = await this.axios.post("user/login.php", {
            params: { username: this.Form.username, pass: this.Form.pass }
          });
          console.log(res);
          // 判断登录成功失败
          if ((res.uid != 0)) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
  
            // 登录成功跳转到首页
            window.sessionStorage.setItem("token", res.token);
            window.sessionStorage.setItem("uid", res.uid);
            window.sessionStorage.setItem("username", res.post.username);
            window.sessionStorage.setItem("role_id", res.role_id);
            this.$router.push("/homepage");
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        } else {
          return false;
        }
      });
    },
    // 忘记密码
    forget() {
      this.$alert("请联系平台管理员重置密码！", "忘记密码？", {
        confirmButtonText: "知道了",
        type: "warning",
      });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'login.styl'
</style>
