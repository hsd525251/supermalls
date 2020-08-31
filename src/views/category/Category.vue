<template>
  <div id="category">
    <nav-bar class="navbar"><div slot="center">分类</div></nav-bar>
    <div class="content">
         <tab-menu :categoryList="categoryList" @tabmenu="tabmenu"></tab-menu>
        
      <Scroll class="contentright" ref="scroll" :probe-type="3" @scroll="contentScroll">
          <tab-control :titles="['综合','新品','销量']" 
                        class="tab-control"
                        ref="tabcontrol1"
                        @tabClick="tabClick"
                        v-show="false">
          </tab-control>
        <tab-content :subcategorydatas="subcategorydata" @imgload="imgload"></tab-content>
          <tab-control :titles="['综合','新品','销量']"
                        ref="tabcontrol2"
                        @tabClick="tabClick">
          </tab-control>
          <tab-content-detail :detailgoods="detailgoods[this.currenttype]"></tab-content-detail>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl"


import TabMenu from "./childComps/TabMenu"
import TabContent from "./childComps/TabContent"
import TabContentDetail from "./childComps/TabContentDetail"

import {getcategorydata,getsubcategorydata,getcontentdetaildata} from "network/category"
export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabMenu,
    TabContent,
    TabControl,
    TabContentDetail
  },
  data() {
    return {
      // 分类页数据
      categoryList:[],
      // 点击菜单栏保存点击的索引，用于获取数据
      tabmenuIndex:0,
      subcategorydata:[],
      detailgoods:{
        'pop':[],
        'new':[],
        'sell':[]
      },
      // 当前页时pop页
      currenttype:'pop',
      // tab栏距离顶部的高度
      topoffsetTop:0,
      //判断tabcontrol是否吸顶
      istabshow:false,
      
    };
  },
  created(){
    // 请求分类页数据
    this.getcategorydatas()
  },
  mounted() {
  },
  methods:{
    // 获取分类页数据
     getcategorydatas(){
       getcategorydata().then(res=>{
          this.categoryList = res.data.category.list
          // 在请求分类页整体数据后请求分类内容的正在流行的第一个数据
          // 保证进到分类页面，必须内容区有内容显示
          this.getsubcategorydatas(0)
          
       })
     },
    // 获取分类页内容数据
    getsubcategorydatas(index){
       this.tabmenuIndex = index
       const maitKey = this.categoryList[index].maitKey
      getsubcategorydata(maitKey).then(res=>{
        this.subcategorydata = res.data.list
      })
       this.getcontentdetaildatas('pop')
          this.getcontentdetaildatas('new')
          this.getcontentdetaildatas('sell')

    },
    // 获取分类页详情数据
      getcontentdetaildatas(type){
      const miniWallkey = this.categoryList[this.tabmenuIndex].miniWallkey
      console.log(miniWallkey);
      getcontentdetaildata(miniWallkey,type).then(res=>{
         this.detailgoods[type] = res
         console.log(this.detailgoods[type]);
      })
    },
    //  接收tabmenu组件传过来的索引
     tabmenu(index){
      
        this.getsubcategorydatas(index)
        this.$refs.scroll.scrollTo(0,0,50)
        this.$refs.scroll.refresh() 
     },
     tabClick(index){
        switch (index){
          case 0:
            this.currenttype = 'pop'
            break;
          case 1:
            this.currenttype = 'new'
            break;
          case 2:
            this.currenttype = 'sell'
            break;
        }
        // 这块有bug，我不会改
        //  this.getcontentdetaildatas(this.currenttype)
     },
    //  加载图片完成
    imgload(){
      this.taboffsetTop = this.$refs.tabcontrol2.$el.offsetTop
    },
  // better-scroll滚动函数
    contentScroll(position){
      this.istabshow = (-position.y) > this.taboffsetTop
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
   width: 100vw;
  display: flex;
}

.contentright {
  flex: 1;
  height: calc(100vh - 92px);
  background-color:#fffafa;
  overflow: hidden;
  position: relative;
}


</style>