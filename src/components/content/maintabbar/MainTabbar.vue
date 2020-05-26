<template>
    <tab-bar>
        <!-- path:''表示传入所在路径，如当点击首页时，路径就是/home,就将这个
        路径传入给子组件，与props配合使用，activeColor表示动态添加颜色，当发
        生点击时，将添加的颜色由props父传子的形式传给子组件，然后在子组件进行接收 -->
           <tab-bar-item path='/home' >
               <img slot="item-icon" src="~assets/img/tabbar/home.svg">
               <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg">
               <div slot="item-text">首页</div>
           </tab-bar-item>
           <tab-bar-item path='/category' >
               <img slot="item-icon" src="~assets/img/tabbar/category.svg">
               <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
               <div slot="item-text">分类</div>
           </tab-bar-item>
           <tab-bar-item path='/cart' activeColor="#d81e06">
                <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg">
                <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg">
               <div slot="item-text">购物车</div>
           </tab-bar-item>
           <tab-bar-item path='/profile' activeColor="#d81e06">
                <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
                <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg">
               <div slot="item-text">我的</div>
           </tab-bar-item>
      
      </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'


export default {
    name:'MainTabbar',
    components:{
        TabBar ,
        TabBarItem
    }
}
</script>

<style>

</style>