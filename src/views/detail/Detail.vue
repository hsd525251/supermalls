<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @navClick="navClick" ref="nav" />
    <scroll class="contents" ref="scroll" :probe-type="3" @scroll="contentscroll">   
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo " />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
      <back-top @click.native="backClick" v-show="isshow"></back-top> 
      <detail-bottom-bar @addCart='addToCart'/>
      <!-- <toast :message='message' :show='show'></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailBottomBar from "./childComps/DetailBottomBar"
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";
import BackTop from 'components/content/backtop/BackTop'
// import Toast from 'components/common/toast/Toast'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [],
      refresh: null,
      getThemeTopY: null,
      currentIndex: 0,
      isshow:false,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      //console.log(res);
      //拿到服务器中的数据，详情页顶部轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取商家信息的对象并存储
      this.shop = new Shop(data.shopInfo);
      //保存商品详情数据
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // //每当页面渲染完成就回调这个函数 但是值不对，由于，不包含图片的加载
      // this.$nextTick(()=>{
      //     this.themeTopys = []
      //     this.themeTopys.push(0);
      //     this.themeTopys.push(this.$refs.params.$el.offsetTop)
      //     this.themeTopys.push(this.$refs.comment.$el.offsetTop)
      //     this.themeTopys.push(this.$refs.recommend.$el.offsetTop)
      //     console.log(this.themeTopys);
      // })
      this.getThemeTopY = debounce(() => {
        //debounce进行防抖，就是防止多次刷新
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
        //Number.max.value表示js中能获取到的最大值
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
      }, 200);
    });
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  mounted() {},
  destroyed() {
    //退出后，取消刷新
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    detailImageLoad() {
      this.refresh();
      //当页面图片全部加载完成，获取每个组件在屏幕中的位置，并添加在数组中保存使用
      this.getThemeTopY();
    },
    navClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentscroll(position) {
      const positoinY = -position.y;
      let length = this.themeTopYs.length;
      //为什么是length-1，因为最后的最大值是后添加的，不需要遍历，所以判断条件需要减一，他的作用
      //只是在判断时做的辅助作用，让屏幕滑动的距离在一个范围内
      for (let i = 0; i < length-1; i++) {
          //this.currentIndex != i防止重复打印
        if (this.currentIndex != i && ( positoinY > this.themeTopYs[i] && positoinY < this.themeTopYs[i + 1])){
            this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isshow = (-position.y)>1000
    },
      backClick(){
         //第一种方法，直接使用法
        //  this.$refs.scroll.scroll.scrollTo(0,0,1000) //第一个scroll是设置的ref，要拿到ref=scroll所在的组件，
         //1000表示1秒内返回顶部                      //第二个是scroll组件内的方法，return内保存的scroll
         
        //  第二种方法，组件法，就是写在组建中，最后再调用
         this.$refs.scroll.scrollTo(0,0,200)   //scroll组建中，methods方法中定义的
     },
     addToCart(){
        //获取购物车需要展示的信息,将商品加入购物车需要用到vuex
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc  = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        
        // this.$store.commit('addCart',product)
        //如果在vuex中做了哪些操作，并且想要外面的组件知道这些操作，那么就需要action的promise异步操作
         this.$store.dispatch('addCart',product).then(res=>{
            // this.show= true;
            // this.message = res;
            // setTimeout(()=>{
            //    this.show = false
            //    this.message = ''
            // },1500)
            this.$toast.show(res,1500)
         })
     }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.contents {
  height: calc(100% - 44px - 49px);
}
</style>