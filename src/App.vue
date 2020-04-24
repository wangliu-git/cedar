<template>
  <div id="app">
      <div id="nav">
    
        <keep-alive>
          <router-link to="/login"></router-link>   
          <router-link to="/home"></router-link>    
     
        </keep-alive>  
    </div>
    <router-view />       
  </div>
</template>

<script>


export default {
  name: 'app',

}
</script>

<style lang="stylus">
@import './style/common';

</style>
