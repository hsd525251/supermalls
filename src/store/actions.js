import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'
export default {
    addCart(context, payload) {
        //如果在vuex中做了哪些操作，并且想要外面的组件知道这些操作，那么就需要action的promise异步操作
        return new Promise((resolve, reject) => {
            //查找之前数组中是否有该商品
            let oldproduct = context.state.cartList.find(item => {
                return item.iid === payload.iid
            })//数量加一
            if (oldproduct) {
                context.commit(ADD_COUNTER, oldproduct)
                resolve('当前商品数量+1')
            } else {//添加新的商品
                payload.count = 1
                context.commit(ADD_TO_CART, payload)
                resolve('添加新的商品')
            }
        })
    }
}