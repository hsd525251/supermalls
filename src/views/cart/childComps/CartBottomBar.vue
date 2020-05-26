<template>
   <div class="buttombar">
      <div class="check-content">
          <check-button :is-checked='isSlectAll' class="check-button" @click.native='checkclick'></check-button>
          <span>全选</span>
      </div>
      <div class="price">
          合计：{{totalprice}}
      </div>
      <div class="calculate" @click="calcClick">
         去计算：{{checkLength}}
      </div>
   </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
    name:'CartButtomBar',
    components:{
      CheckButton  
    },
    methods:{
      checkclick(){
          if(this.isSlectAll){ //全部选中
              this.cartList.forEach(item => item.checked=false);
          }else{
              this.cartList.forEach(item => item.checked=true);
          }
      },
      calcClick(){
          if(!this.checkLength){
              this.$toast.show('请选择商品',2000)
          }
      }
    },
    computed:{
        ...mapGetters(['cartList']),
        totalprice(){
            return '￥'+this.cartList.filter(item=>{
                return item.checked
            }).reduce((pre,item)=>{
               return pre+item.price*item.count
            },0)
        },
        checkLength(){
            return this.cartList.filter(item=>item.checked).length
        },
        isSlectAll(){
            if(this.cartList.length===0) return false
            return !(this.cartList.filter(item=>!item.checked).length)
        }  
    }
}
</script>

<style scoped>
   .buttombar{
       display:flex;
       height: 40px;
       background-color: #eee;
       position: relative;
       line-height: 40px;
   }
   .check-content{
       display:flex ;
       width: 60px;
       align-items: center;
       margin-left: 15px;
       
   }
   .check-button{
       width: 20px;
       height: 20px;
       line-height: 20px;
       margin-right: 5px;
   }
   .price{
       margin-left: 30px;
       flex: 1;
   }
   .calculate{
      width: 110px;
      background-color: var(--color-tint);
      text-align: center;
   }
</style>