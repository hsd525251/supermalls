<template>
   <swiper>
            <swiper-item v-for='item in banners' :key='item.id'>
                  <a :href="item.link">
                      <img :src="item.image" alt="" @load="imageLoad"><!--@load="imageLoad"表示监听图片加载完成 -->
                 </a>
            </swiper-item>
        </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
   name:'HomeSwiper',
   props:{//父传子的方法属性
     banners:{
          type:Array,
          //default表示父组建中没有数据传过来时，默认使用return返回的数组
          default(){
             return []
        }
     }
   },
   data(){
     return{
        isload:false
     }
   },
   components:{
       Swiper,
       SwiperItem
   },
   methods:{
      imageLoad(){
         //进行限制，只发出一次事件，
          if(!this.isload)
          this.$emit('imgswipperload')
          this.isload=true
      }
   }
}
</script>

<style>

</style>