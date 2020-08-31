<template>
  <div id="tabcontent">
      <div class="tabcontentcate">
            <div class="tabcontent-item" v-for="(item,id) in subcategorydatas" :key="id">
          <a :href="item.link">
              <img :src="item.image" @load="imgload">
              <div class="text">{{item.title}}</div>
          </a>
      </div>
      </div>
    
  </div>
</template>

<script>
export default {
   name:'TabContent',
   props:{
      subcategorydatas:{
          type:Array,
          default(){
              return []
          }
      }
   },
   methods:{
       imgload(){
           this.$emit('imgload')
       }
   }
}
</script>

<style scoped>
   .tabcontentcate{
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
   }
   .tabcontent-item{
       display: flex;
       margin-left:17px;
       margin-top:20px;
       text-align: center;
   }
   .tabcontent-item img{
      width:  70px;
      height: 70px;
   }
   .text{
    margin-top: 10px;
    font-size: 15px;
   }
</style>