<template>
  <div class="TUO">
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
          <span>我知道了</span>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
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
      margin 20px 30px
      span{
        margin-top 10px
        font-size:14px;
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
 
</style>
