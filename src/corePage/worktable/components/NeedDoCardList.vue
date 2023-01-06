<template>
  <div class="__need-do-list__">
    <NeedDoCard
      v-for="(item, index) in dataList"
      :key="index"
      :data="item"
      @click.native="itemClick(item, index)"
      :lineCount="lineCount"
      :style="calcStyle(index)"
      :height="height"
    ></NeedDoCard>
  </div>
</template>

<script>
import NeedDoCard from './NeedDoCard'
export default {
  components: {
    NeedDoCard
  },
  props: {
    dataList: {
      type: Array,
      required: true,
      default: () => []
    },
    lineCount: {
      type: Number,
      default: 5
    },
    height: {
      type: Number,
      default: 138
    }
  },
  methods: {
    itemClick (item, index) {
      this.$emit('itemClick', item, index)
    },
    calcStyle (index) {
      if (index % this.lineCount === 0) {
        return {
          marginLeft: '8px'
        }
      }
      if (index % this.lineCount === this.lineCount - 1) {
        return {
          marginRight: '0'
        }
      }
      return {}
    }
  }
}
</script>

<style lang="less" scoped>
.__need-do-list__ {
  width: 100%;
  height: 100%;

  overflow: auto;
  box-sizing: border-box;

}
</style>
