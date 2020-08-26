<template>
  <div id="app">
    <!-- 
      当从home也点击到其他页时，如：分类页，再点击返回home时要让home也保持点击前的页面位置
      不要让位置重新刷新置顶
     -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
    </div>
</template>

<script>

import MainTabBar from 'components/content/maintabbar/MainTabbar'
export default {

  name: 'App',
  components: {
     MainTabBar
  }
}
</script>

<style>
   @import 'assets/css/base.css';
</style>
