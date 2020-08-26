<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
           <tab-control :titles="['流行','新款','精选']" 
                         @tabClick="tabclick"
                         ref="tabcontrol1"
                         class="tab-control"
                         v-show='isTabFixed'
                         >
            </tab-control>
         <scroll class="contents" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
            <home-swiper :banners='banners' @imgswipperload="imgswipperload"></home-swiper>    
            <recommend-view :recommends='recommends'></recommend-view>
            <feature-view/>
            <!-- 子组件传过来tabClick这个点击事件，在父组件进行接收，所以要用 @tabClick="tabclick"，
            前边那个tabClick是子传父传过来的那个点击事件，后边那个tabclick是要使用的方法，定义在methods中，子传父-->
            <tab-control :titles="['流行','新款','精选']" 
                         @tabClick="tabclick"
                         ref="tabcontrol2"
                         >
            </tab-control>
            <goods-list :goods="showgoods"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isshow"></back-top> <!--在我们需要监听一个组件的原生事
            //  v-show表示是否显示，true就显示，false就不显示              件时，必须给对应的事件加上.native修饰符才能进行监听 -->
    </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultidata,getHomeGoodsdata} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {
   name:'Home',
   components:{
       HomeSwiper,
       RecommendView,
       NavBar,
       TabControl,
       GoodsList,
       FeatureView,
       Scroll,
       BackTop
   },
   mixins:[itemListenerMixin],
   data(){
       return{
           //将下面请求的数据存放在这两个数组中，等待调用
           banners:[], //存储轮播图那个模块请求的数据
           recommends:[],//存储本周流行请求的数据
           goods:{
               'pop':{page: 0, list: []},  //流行
               'new':{page: 0, list: []},  //新款 
               'sell':{page: 0, list: []}  //精选
           },
           currentType:'pop',//默认当前请求流行模块数据
           isshow:false ,    //返回首页的小按钮默认false，不显示
           topoffsetTop:0,
           isTabFixed:false,
           saveY: 0,
           itemImgListener:null,
       }      
   },
   //回到页面调用    
   activated(){
      this.$refs.scroll.refresh() 
      this.$refs.scroll.scrollTo(0, this.saveY, 0)//第一个参数是x轴坐标，第二个参数是y轴坐标，
   //第三个参数是时间，就是经过多长时间滚动到那个位置
       
   },
   //离开页面调用
   deactivated(){
     this.saveY = this.$refs.scroll.scroll.y
     //离开页面就销毁
     this.$bus.$off('itemImgLoad',this.itemImgListener)
    //  console.log(this.saveY);
     },
   created(){
       //请求多个数据
        this.getHomeMultidatas()
         //请求商品数据
        this.getHomeGoodsdatas('pop')
        this.getHomeGoodsdatas('new')
        this.getHomeGoodsdatas('sell')


   },
   mounted(){
      // 利用防抖函数减少betterscroll刷新次数   
      const refresh = debounce(this.$refs.scroll.refresh,100)
      this.$bus.$on('itemImgLoad',()=>{
         refresh() 
      })
   },
    computed:{
       showgoods(){
         return this.goods[this.currentType].list
       }
    },  
    methods:{
     /**
      * 事件监听相关的代码
      */
     
    

     tabclick(index){
         switch(index){
            case 0:
                this.currentType = 'pop'
                 break
            case 1:
                this.currentType = 'new'
                 break
            case 2:
                this.currentType = 'sell'
                break
         }
         //tabcontrol点击后再滑动后，还是原来的模块
         this.$refs.tabcontrol2.currentIndex = index
         this.$refs.tabcontrol1.currentIndex = index
     },
     backClick(){
         //第一种方法，直接使用法
        //  this.$refs.scroll.scroll.scrollTo(0,0,1000) //第一个scroll是设置的ref，要拿到ref=scroll所在的组件，
         //1000表示1秒内返回顶部                      //第二个是scroll组件内的方法，return内保存的scroll
         
        //  第二种方法，组件法，就是写在组建中，最后再调用
         this.$refs.scroll.scrollTo(0,0,200)   //scroll组建中，methods方法中定义的
     },
     contentScroll(position){
         //判断backtop是否显示
        this.isshow = (-position.y)>1000

        //判断tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.topoffsetTop
     },
     loadMore(){
        this.getHomeGoodsdatas(this.currentType)
        // this.$refs.scroll.scroll.refresh()
     },
     imgswipperload(){
        //所有组件都有一个$el属性，要想获取“组件”中的元素，必须加$el这个属性，要不获取不到
       this.topoffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
     },
    /**
     * 网络请求相关代码
     */
       getHomeMultidatas(){
          getHomeMultidata().then(res=>{
            //    console.log(res);
             this.banners=res.data.banner.list
             this.recommends=res.data.recommend.list
          }) 
       },
       getHomeGoodsdatas(type){
           const page=this.goods[type].page+1
           getHomeGoodsdata(type,page).then(res=>{
            //    console.log(res);
               this.goods[type].list.push(...res.data.list)//三个点表示把list中所有数据都push存贮到传过来的模块的数组中
               this.goods[type].page+=1

               this.$refs.scroll.finishPullUp() //连续加载，完成上拉加载更多
           })
        }
   }
}
</script>

<style scoped>
    #home{
          /* padding-top: 44px;  */
          height: 100vh;  /* 100vh表示100%视口  */
           
    } 
   
    .home-nav{
       background-color: var(--color-tint);
       color: #fff;
     
    } 
    .tab-control{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
  
     .contents {
     /* height: calc(100% - 93px);
     overflow: hidden;
     margin-top: 44px; */
     overflow: hidden;
     position: absolute;
     top: 44px;
     bottom:49px;
     left: 0;
     right: 0;
  }
  
</style> 