<template>
  <div class="container">
      <div class="group">
          <div class="nei">
              <div class="title">
                <span>请选择分组</span>
                <span>x</span>
              </div>
              <div class="mian">
                <div class="sousuo">
                  <el-input placeholder="请输入分组关键词..." style="width:500px">
                    <el-button slot="append"> 搜索</el-button>
                  </el-input>
                </div>
                <div class="groupList">
                  <li>肝癌多中心项目-复旦肿瘤项目</li>
                  <li>肝癌多中心项目</li>
                  <li>淋巴瘤的流行病学研究</li>
                  <li>左半肝胆管腺癌病理分析</li>
                  <li>未分组</li>
                </div>
                <div class="name">
                  <span>新建分组名称 ： </span>
                  <el-input placeholder="请输入分组名称..." style="width:380px">
                    <el-button slot="append"> 保存</el-button>
                  </el-input>
                </div>
                <div class="button">
                    <el-button plain size="small">取消</el-button>
                    <el-button plain size="small">确定</el-button>
                </div>
              </div>
          
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >

// 外层盒子
.container{
  // 分组弹窗
  .group{
    width 600px
    height 600px
    position relative
    .nei{
      border-radius 5px
      width 550px
      height 550px
      position absolute
      left 0
      bottom 0
      right 0
      top 0
      margin auto
      background-color #FAFAFA
      // 头
      .title{
        display flex 
        justify-content  space-between
        padding 10px
        color white
        background-color rgba(41, 184, 252, 1)
      }
      // 主体
      .mian{
        background-color #FAFAFA
        // 搜索
        .sousuo{
          margin 20px 20px 10px 20px
        }
        .groupList{
          width 500px
          height 300px
          border 1px solid #DCDFE6
          margin 20px 20px
          li{
            list-style none
            margin-left 20px
            margin-top 30px
            font-size 16px
          }
        }
        .name{
          margin-left 20px
        }
        .button{
          float right 
          margin-top 10px
          margin-right 30px
         
        }
      }
    }
  }


}
 
</style>
