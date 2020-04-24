<template >
  <div >
    <el-container style="height:100vh"  >
      <!-- 左侧边栏 -->
      <el-aside width="240px">
        <!-- 侧边栏菜单区域 -->
        <el-menu  background-color="#3195FA" text-color="#FFFFFF" active-text-color="#FFFFFF" unique-opened :router="true">
          <el-menu-item  :class="{on: $route.path === '/homepage'}" @click="goto('/homepage')">
            <i class="iconfont iconshouye"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item  :class="{on: $route.path === '/dataentry'}" @click="goto('/dataentry')">
            <i class="iconfont iconshujuluru"></i>
            <span slot="title">数据录入</span>
          </el-menu-item>
          <el-menu-item  :class="{on: $route.path === '/dataimport'}" @click="goto('/dataimport')">
            <i class="iconfont iconshujudaoru"></i>
            <span slot="title">数据导入</span>
          </el-menu-item>
          <el-submenu  :class="{on: $route.path === '/dataintegration'}" @click="goto('/dataintegration')" index="1">
            <template slot="title">
              <i class="iconfont icondashujuzhenghe"></i>
              <span>数据整合</span>
            </template>           
              <el-menu-item index="unit"><i class="iconfont icondian"></i> 原单位报告</el-menu-item>           
          </el-submenu>
          <el-submenu :class="{on: $route.path === '/datamanage'}" @click="goto('/datamanage')" index="2">
            <template slot="title">
              <i class="iconfont iconshujuguanli"></i>
              <span>数据管理</span>
            </template>  
              <el-menu-item index="/shaix"><i class="iconfont icondian"></i>  数据筛选</el-menu-item>
              <el-menu-item index="/group"><i class="iconfont icondian"></i>  分组管理</el-menu-item>       
          </el-submenu>
          <el-submenu :class="{on: $route.path === '/dataanalysis'}" @click="goto('/dataanalysis')"  index="3">
            <template slot="title">
              <i class="iconfont icondataAnalysis"></i>
              <span >数据分析</span>
            </template>     
              <el-menu-item index="medical"><i class="iconfont icondian"></i>  医学统计</el-menu-item>         
          </el-submenu>
          
            <el-menu-item :class="{on: $route.path === '/try'}" @click="goto('/try')">
            <i class="iconfont icondashujuzhenghe"></i>
            <span slot="title">模拟试用</span>
          </el-menu-item>
          
          <el-menu-item  :class="{on: $route.path === '/usermanagement;'}" @click="goto('/usermanagement')">
            <i class="iconfont iconyonghuguanli"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="mian">
        <!-- 右侧头部 -->
        <el-header>          
          <div>
            <img src="./img/logo.png" alt="">           
          </div>

          <div class="logo">
            <img src="./img/head-portrait.png" alt="">
             <span>您好，志诺维思</span>
             <div class="shu"></div>
            
            <el-button   @click="loginout"><i class="iconfont icontuichu"></i>退出</el-button>
          </div>
          
        </el-header>
        <!-- 右侧主体 -->
        <el-main>    
          <router-view></router-view>
        </el-main>        
        <el-footer> </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">


  export default {
    methods: {
      // 退出登录
      loginout(){
        this.$router.push('/login')
      },
      goto(path){
        if (path==this.$route.path) {
        // 编程式路由跳转
        this.$router.push(path)
        } else {
        window.location = path  // 发送一般的http请求 ==> 整个界面会刷新显示
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >

el-button el-button--default{
  border none
}

.icontuichu:before {
  font-size 20px
  display inline
}
.el-container{
  width 1920px
}
  .el-aside {    
    width:240px;    
    background:linear-gradient(180deg,rgba(30,118,254,1),rgba(27,196,255,1)); 
    .el-menu{
      height: 100%
    }
  }
  .mian{
    width 1680px
  }
  
  .el-main {   
    background-color #F5F7FB
    width 100%
    height 100%

  }
  .el-footer{
    background-color #F5F7FB
  }
  .el-header {
    width 100%
   
    display: flex
    justify-content space-between
    padding-left: 20px
    align-items: center
    background-color #FFFFFF
    img{
      width:73px;
      height:46px;
    }
    .logo{
      display: flex     
      img{
        width 31px
        height 31px 
        margin-top 10px     
      }
      .shu{
        width:1px;
        height:20px;
        background:rgba(210,210,210,1);
        margin-top 15px
        margin-right 10px
      }
      span{
        margin-top 14px
        margin-left 10px
        padding-right 20px
        
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(28,165,255,1);
      }
    }
  }
  .iconfont{
    color white 
    margin-right 20px
    font-size 18px
  }
  .icontuichu{
    width:1px;
    height:20px;
    color rgba(210,210,210,1);
  }
  .el-menu{
    border-right none

    .on{
      background #bbffcc
    }
  }
 
</style>
