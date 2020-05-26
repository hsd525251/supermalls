<template>
    <div class="detailnavbar">
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div class="title" slot="center">
                <div v-for="(item,index) in title"  
                     :key="item.id" 
                     class="title-item" 
                     :class="{isactive:currentIndex==index}"
                     @click="navClick(index)">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
   name:'DetailNavBar',
   components:{
       NavBar
   },
   data(){
       return{
           title:['商品','参数','评论','推荐'],
           currentIndex:0
       }
   },
   methods:{
       navClick(index){
           this.currentIndex=index
           this.$emit('navClick',index)
       },
       backClick(){
           this.$router.go(-1)
       }
   }
}
</script>

<style scoped>
     .title{
         display: flex;
     }
     .title-item{
         flex: 1;
         font-size: 14px;
     }
     .isactive{
         color: var(--color-high-text);
     }
     .back img{
         margin-top: 12px;
     }
</style>