import {debounce} from 'common/utils'
export const itemListenerMixin = {
    data(){
        return{
           itemImgListener:null,
           refresh:null
        }
    },
    mounted(){
        //监听item中图片加载完成的事件，对home中item进行刷新,进行防抖操作
        //防抖就是让刷新字进行一次，不进行多元的刷新
        this.refresh = debounce( this.$refs.scroll.refresh,200)
      
        this.itemImgListener = ()=>{
           this.refresh()
        }
         this.$bus.$on('itemImgLoad',this.itemImgListener)
         
    }
}