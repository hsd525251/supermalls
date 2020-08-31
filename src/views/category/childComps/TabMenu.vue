<template>
  <BScroll class="contentleft" ref="scroll">
    <div class="tabmenu">
      <div class="tabmenu-item"
        v-for="(item,id) in categoryList"
        :key="id" 
        :class="{tabmenuclick: id===currentindex}"
        @click="tabmenuclick(id)">
           {{item.title}}
      </div>
    </div>
  </BScroll>
</template>

<script>
import BScroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    BScroll,
  },
  props: {
    categoryList: {
      type: Array
    }
  },
  data(){
      return{
         currentindex:0
      }
  },
  methods:{
      // 点击切换内容，更改背景，将菜单索引传到父组件
      tabmenuclick(index){
          this.currentindex =index
          this.$emit('tabmenu',index)
      }
  }
};
</script>

<style scoped>
.contentleft {
  width: 25%;
  height: calc(100vh - 92px);
  background-color: #f6f6f6;
  overflow: hidden;
}
.tabmenu{
   display: flex;
   flex-direction: column;
   font-size: 15px;
}
.tabmenu-item{
  display: flex;
  justify-content: center;
  padding: 18px 8px;
}
.tabmenuclick{
    background-color: #fffafa;
    border-left: 5px solid var(--color-tint);
}
</style>