<template >
  <div id="dataImport">
    <el-container style="height:100vh">
      <!-- 左侧边栏 -->
      <el-aside :width="IScollapse? '60px' : '240px'" >
        <div class="fold" @click="ISfold()">...</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          :collapse-transition="false"
          :collapse="IScollapse"
          :default-openeds="openeds" 
          text-color="#FFFFFF"
          active-text-color="#1E7DFE"
          background-color="#00000000"
          :router="true"
          >
          <el-menu-item index="homepage" :class="{sr_active: $route.path === '/homepage'}">
            <i class="iconfont iconshouye"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="dataentry" :class="{sr_active: $route.path === '/dataentry'}">
            <i class="iconfont iconshujuluru"></i>
            <span slot="title">数据录入</span>
          </el-menu-item>

          <el-menu-item index="dataimport" v-show="this.role_id > 1" :class="{sr_active: $route.path === '/dataimport'}"> 
            <i class="iconfont iconshujudaoru"></i>
            <span slot="title">数据导入</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icondashujuzhenghe"></i>
              <span slot="title">数据整合</span>
            </template>
            <el-menu-item index="unit" :class="{sr_active: $route.path === '/unit'}">
              <i class="iconfont icondian"></i>  原单位报告
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont iconshujuguanli"></i>
              <span slot="title">数据管理</span>
            </template>
            <el-menu-item index="shaix" :class="{sr_active: $route.path === '/shaix'}">
              <i class="iconfont icondian"></i> 数据筛选
            </el-menu-item>
            <el-menu-item index="group" :class="{sr_active: $route.path === '/group'}">
              <i class="iconfont icondian"></i> 分组管理
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icondataAnalysis"></i>
              <span slot="title">数据分析</span>
            </template>
            <el-menu-item index="medical" :class="{sr_active: $route.path === '/medical'}">
              <i class="iconfont icondian"></i> 医学统计
            </el-menu-item>
          </el-submenu>
          <!--
              <el-menu-item index="try" :class="{sr_active: $route.path === '/try'}"><i class="iconfont icondian"></i>模拟试用</el-menu-item>         
          -->  
          <el-menu-item index="usermanagement" :class="{sr_active: $route.path === '/usermanagement'}">
            <i class="iconfont iconyonghuguanli"></i><span slot="title">用户管理</span>
          </el-menu-item>

          <el-menu-item index="ocr" v-show="this.role_id > 1" :class="{sr_active: $route.path === '/ocr'}">
            <i class="iconfont iconOCRshibieyichangjilu"></i><span slot="title">OCR识别</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
      <el-container class="mian">
        <!-- 右侧头部 -->
        <el-header>
          <div>
            <img src="./img/logo.png" alt />
          </div>

          <div class="logo">
            <img src="./img/head-portrait.png" alt />
            <span :model="username">您好，{{this.username}}</span>
            <div class="shu"></div>
            <el-button @click="loginout" class="tuichu">
              <i class="iconfont icontuichu"></i>退出
            </el-button>
          </div>
        </el-header>
        <!-- 右侧主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">

export default {

  methods: {
    // 点击折叠
    ISfold(){
      this.IScollapse = !this.IScollapse
    },
    // 退出登录
    async loginout() {
      const { data: res } = await this.axios.get("user/logout.php");
      console.log(res);
      this.$router.push("/login");
      window.sessionStorage.clear();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  data() {
    return {
      IScollapse:false,   //是否折叠
      username: "",
      role_id:'',
      openeds:['1','2','3']     //默认打开的侧边栏
    };
  },
  mounted() {
    this.username = window.sessionStorage.username;
    this.role_id = window.sessionStorage.role_id;
  }
};
</script>


<style>
.sr_active{
  background-color: #0850c1 !important;
}
.el-submenu__title:hover {
  background-color: #0850c1 !important;
}
.el-menu-item:hover {
  background-color: #0850c1 !important;
}
.el-submenu__title i {
  color: #ffffff !important;
}
</style>
<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'home.styl'
</style>
