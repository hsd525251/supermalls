<template>
    <div class="tabcontrol">
        <div v-for="(item,index) in titles" :key="item.index"
        class="tabcontrol-item" :class="{active:index===currentIndex}" @click="tabclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
   name:'TabControl',
   props:{
      titles:{
          type:Array,
          default(){
              return []
          }
      }
   },
   data(){
       return{
           currentIndex:0
       }
   },
   methods:{
      tabclick(index){
          this.currentIndex=index
          this.$emit('tabClick',index)//子传父，把点击事件tabclick传出去，把点击了谁index传出去
      }
   }
}
</script>

<style>
   .tabcontrol{
       display: flex;
       text-align: center;
       font-size: 14px;
       z-index: 9;
   }
   .tabcontrol-item{
       flex: 1;
       height: 40px;
       line-height: 40px;
      z-index: 9;
   }
    .tabcontrol-item span{
        padding: 5px;
    }
  
   .active span{
      border-bottom: 2px solid var(--color-tint);
   }
   .active{
       color:var(--color-high-text);
   }
</style>