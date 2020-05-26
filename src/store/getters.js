export default {
    cartLength(state){ //默认参数就是state  对state里面的状态进行处理
        return state.cartList.length
    },
    cartList(state){
        return state.cartList
    }
}