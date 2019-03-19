<template>
  <div id="app">
    <plug-in></plug-in>                            <!-- 插件展示组件 -->
  </div>
</template>

<script>
import Data from './Data.js';                             //数据总线

import pageTurn from './components/pageTurn.vue';         //翻页插件模块

export default {
  data () {
    return Data
  },
  components:{
    'plug-in':{
      render:function(fn){
        return fn(pageTurn);
      },
      data(){
        return Data
      }
    }
  }
}
</script>

<style>
#app {width:600px; height:300px; box-shadow:1px 1px 5px #999999,-1px -1px 5px #999999; border-radius:5px; position:relative; top:50px; margin:auto;}
</style>
