<template>
   <div class="profile">
       <nav-bar class="navbar"><div slot="center">仿蘑菇街商城</div></nav-bar>
       <Login></Login>

       <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item item2">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <!--3.封装成一个整体-->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
   </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Login from "./childComps/Login"
import ListView from "./childComps/ListView"
export default {
   name:'Profile',
   components:{
     NavBar,
     Login,
     ListView
   },
    data: function () {
		  return {
		    orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    },
}
</script>

<style scoped>
   .navbar{
     background-color: var(--color-tint);
     color: #fff;
   }
   .account {
    display: flex;
    border-bottom: 10px solid #ddd;
  }
   
  .item2{
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
   }
  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }
   
  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
  .order-list{
    border-bottom: 10px solid #ddd;
  }
</style>