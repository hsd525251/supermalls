<template>
  <div class="tabcontent">
    <div class="detail">
      <div class="detail-item" v-for="(item,id) in detailgoods" :key="id" @click="tabitem(id)">
          <div class="detailtop">
              <img :src="item.img">
          </div>
          <div class="detailbom">
              <div class="title">{{item.title}}</div>
              <div class="price-and-collect">
                  <div class="price">￥{{item.price}}</div>
                  <div class="collect">{{item.cfav}}</div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContentDetail",
  props: {
    detailgoods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods:{
      tabitem(id){
         console.log(id);
         this.$router.push("/detail/"+this.detailgoods[id].iid)
      }
  }
};
</script>

<style scoped>
.detail {
  display: flex;
  flex-wrap: wrap;
}
.detail-item {
  margin-left: 11px;
  margin-top: 15px;
  text-align: center;
}
.detailtop img {
  width: 125px;
  height: 175px;
}
.title {
  width: 120px;
  font-size: 12px;
  color: #333;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.price-and-collect {
  display: flex;
  margin-top: 5px;
}
.price {
  color: var(--color-tint);
}
.collect {
  position: relative;
  margin-left: 20px;
}
.collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>