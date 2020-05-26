<template>
   <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
   </div>
</template>

<script>
export default {
   name:'TabBarItem',
   // props可以理解为接收父组件传来的数据
   //设置路径类型为string型
   //default表示如果没有数据传过来时默认的颜色为red
   props:{
      path:String,
      activeColor:{
         type:String,
         default:'#d81e06'
      }
   },
  data(){
    return{
       //asa
    }
  },
  computed:{
      isActive(){
         //返回当前活跃状态下的路径是否与传过来的路径是否一样，如果不等于-1，就返回true
        return this.$route.path.indexOf(this.path)!== -1
      },
     activeStyle(){
        //如果当前isActive是true就返回前边那个对象，前边那个对象就是传过来的颜色，如果没传
        //就是默认的颜色，如果isActive是false就返回空对象，就什么都不改变
        return this.isActive ? {color:this.activeColor}:{}
     }
   },
  methods:{
      itemClick(){
         //发生点击时，将路径跳转到当前从父组件传过来的路径地址，并捕获异常，防止连续
         // 点击时产生异常错误
         this.$router.replace(this.path).catch(()=>{})
         
      }
   }
}
</script>

<style>
 .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;

  }
  .tab-bar-item img{
     width: 24px;
     height: 24px;
     margin-top: 3px;
     vertical-align: middle;
  }
 
</style>