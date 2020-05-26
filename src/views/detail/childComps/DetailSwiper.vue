<template>
    <swiper class="swipers">
        <swiper-item v-for="item in topImages" :key="item.id">
              <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:'DetailSwiper',
    components:{
       Swiper,
       SwiperItem 
    },
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }
} 
</script>

<style scoped>
.swipers{
    height: 300px;
}
</style>