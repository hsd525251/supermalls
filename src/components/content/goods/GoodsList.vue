<template>
    <div class="goodslist">
        <goods-list-item v-for="item in goods" :key="item.id" :goodsitem="item">
        </goods-list-item>
    </div>
</template>

<script>
 import GoodsListItem from './GoodsListItem'
export default {
    name:'GoodsList',
    components:{ 
        GoodsListItem
    },
    props:{  //接收home组建中请求的数据
        goods:{
            type:Array, //类型：数组
            default(){
                return []
            }
        }
    }
}
</script>

<style>
   .goodslist{
       display: flex;
       flex-wrap: wrap;
       justify-content: space-evenly;
   }

</style>