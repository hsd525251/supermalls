import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/home/Home.vue'
import Category from '../views/category/Category.vue'
import Cart from '../views/cart/Cart.vue'
import Profile from '../views/profile/Profile.vue'
import Detail from '../views/detail/Detail.vue'

Vue.use(VueRouter)
const routes=[
    {
        path:'',
        redirect: '/Home'

    },
    {
        path: '/home',
        component:Home 
      
      },
      {
        path:'/category',
        component:Category
      },
      {
        path:'/cart',
        component:Cart
      },
      {
        path:'/profile',
        component:Profile
      },
      {
        path:'/detail/:iid',
        component:Detail
      }

]
const router = new VueRouter({
   routes,
   mode:'history'
})

export default router