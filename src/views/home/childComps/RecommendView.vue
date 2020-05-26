<template>
<!-- 本周流行模块 -->
    <div class="recommends">
        <div v-for='item in recommends' :key='item.id' class="recommends-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:'RecommendView',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
   .recommends{
       display: flex;
       width: 100%;
       text-align: center;
       font-size: 12px;
       padding: 10px 0 20px;
       border-bottom: 10px solid #eeeeee;
   }
   .recommends-item{
       flex: 1;
   }
   .recommends-item img{
       width: 70px;
       height: 70px;
       margin-bottom: 10px;
   }
</style>

