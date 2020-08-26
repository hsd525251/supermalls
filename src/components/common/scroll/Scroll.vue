<template>
   <div class="wrapper" ref="wrapper"><!-- ref属性表示明确拿到某一元素 -->
      <div class="content">
          <slot></slot>
      </div>
   </div>
</template>

<script>
import BS from 'better-scroll'
export default {
   name:'Scroll',
   props:{
      //当probeType=0或1时，不派发滚动事件，等于2或3时派发
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
          type:Boolean,
          default:false
      }
   },
   data(){
      return{
         scroll: null
      }
   },
   mounted(){
       //创建better-scroll对象
      this.scroll = new BS(this.$refs.wrapper,{
         click:true,   //在进行滚动的区域内，出button按钮外，其他属性必须设置click：true来实现点击，不设置这个不能进行点击操作
         probeType:this.probeType, //页面滚动时，实时派发scroll事件
         pullUpLoad:this.pullUpLoad  //上拉加载事件
      })
      //监听滚动的位置
     if(this.probeType === 2 || this.probeType === 3){
         this.scroll.on('scroll',(position)=>{ //括号中的scroll表示发生滚动事件
        //   console.log(position);
        this.$emit('scroll',position)  //把当前滚动的事件和滚动的位置传出去，哪个组件要用，就直接接收就行
      })
     }
     
     //上拉加载事件
      if(this.pullUpLoad){
         this.scroll.on('pullingUp',()=>{
             this.$emit('pullingUp')
           })
      }
   },
   methods:{
        scrollTo(x,y,time=1000) { //返回到页面（x,y）的位置
           this.scroll && this.scroll.scrollTo(x ,y ,time)
       },
        finishPullUp(){  //完成加载，上拉加载更多
            this.scroll && this.scroll.finishPullUp()
       },
        refresh(){
         this.scroll && this.scroll.refresh()
       },
      
   }
}
</script>

<style scoped>

</style>