<template>
   <div class="goodsitem" @click="itemClick">
      <img :src="showImage" alt="" @load="imgLoad"><!-- 动态绑定图片  -->
      <div class="goodsinfo">
          <p>{{goodsitem.title}}</p> <!-- 商品介绍 -->
          <span class="price">{{goodsitem.price}}</span><!-- 价格  -->
          <span class="collect">{{goodsitem.cfav}}</span><!-- 收藏  -->
      </div>
   </div>
</template>

<script>
export default {
   name:'GoodsListItem',
   props:{    //接收goodlist组件中传来的数据
       goodsitem:{
           type:Object,//类型：对象类型
           default(){  //默认什么都没传的情况下返回一个空对象
               return {}
           }
       }
   },
   computed:{
       showImage(){
           return this.goodsitem.img || this.goodsitem.image || this.goodsitem.show.img
       }
   },
   methods:{
       imgLoad(){

           this.$bus.$emit('itemImgLoad')
        //    if(this.$route.path.indexOf('/home')){
        //         //非父子组件通信，用$bus事件总线
        //         this.$bus.$emit('homeitemimageLoad') //发射传递加载图片完成的事件
        //    }else if(this.$route.path.indexOf('/detail')){
        //         this.$bus.$emit('detailitemimageLoad') 
        //    }  
       },
       itemClick(){
        // 路由跳转push是可返回的跳转，replace是不可在浏览器左上角返回的跳转，动态路由跳转的方式，携带id
          this.$router.push('/detail/'+this.goodsitem.iid)
          
       }
    }
}
</script>

<style scoped>
  .goodsitem{
      padding-bottom: 40px;
      position: relative;
      width: 48%;
  }
  .goodsitem img{
      width: 100%;
      border-radius: 5px;
  }
  .goodsinfo{
      font-size: 12px;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      overflow: hidden;
      text-align: center;
  }
  .goodsinfo p{
      overflow: hidden;
      text-overflow: ellipsis;  /*将文本超出部分用省略号显示*/
      white-space: nowrap;  /* 如果文本有两行，可将文本调整为同一行 */
      margin-bottom: 3px;
  }
  .goodsinfo .price{
      color: var(--color-high-text);
      margin-right: 20px;
  }
  .goodsinfo .collect{
      position: relative;
  }
  .goodsinfo .collect::before{
      content: '';
      position: absolute;
      left: -15px;
      top: -1px;
      width: 14px;
      height: 14px;
      background: url("~assets/img/common/collect.svg")0 0/14px 14px;
  }
</style>