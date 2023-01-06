<!--
 * @Date: 2021-06-16 11:16:24
 * @information: tag
-->
<template>
<div id="across-tag">
  <div class="list-tag">
    <div  :class="['item-tag', {'item-tag--active': item.isActive}]" 
          v-for="(item, index) in tagList"
          :key="index"
          @click="onClickTag(item)">
      {{item.areaname}}
    </div>
  </div>  

</div>
</template>

<script>
export default {
  props: {
    // tag列表
    tagList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {

    }
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 11:33:58
     * @information: tag点击
     */    
    onClickTag (item) {
      // 判重
      let mark = this.tagList.some(el => el.areaid == item.areaid && el.isActive)
      if (mark) return;
      this.$emit('onClickTag', item)
    }
  }
}
</script>

<style lang="less">
#across-tag {

.list-tag {
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;

  .item-tag {
    margin: 5px 8px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 3px 12px;
    transition: all ease 0.5s;
    &:hover {
      cursor: pointer;
      background-color: #2596ff;
      border-color: #2596ff;
      color: #fff;
    }
  }

  .item-tag--active {
    background-color: #2596ff;
    border-color: #2596ff;
    color: #fff;
  }

}

}
</style>
