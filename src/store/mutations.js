import {
   ADD_COUNTER,
   ADD_TO_CART
} from './mutation-types'
export default {
     [ADD_COUNTER](state,payload){ //state是默认放置的，表示当前store
        payload.count++            //playload表示当前state属性下包含的内容
     },
     [ADD_TO_CART](state,payload){
       payload.checked = true
       state.cartList.push(payload)
     }
}