<template>
  <div class="__month-change-list__">
    <MonthChangeCard
      v-for="(item, index) in dataList"
      :key="index"
      :data="item"
      :class="`__moncl-${index}__`"
      :lineCount="lineCount"
      :height="height"
    ></MonthChangeCard>
  </div>
</template>

<script>
import MonthChangeCard from './MonthChangeCard'
export default {
  components: {
    MonthChangeCard
  },
  props: {
    dataList: {
      type: Array,
      required: true,
      default: () => []
    },
    lineCount: {
      type: Number,
      default: 8
    },
    height: {
      type: Number,
      default: 196
    }
  }
}
</script>

<style lang="less">
.__month-change-list__ {
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 8px 0 ;
  .__moncl-0__,.__moncl-5__ {
    color: #30c72b;
  }
  .__moncl-1__,.__moncl-6__ {
    color: #FF6F00;
  }
  .__moncl-2__,.__moncl-7__ {
    color: #013584;
  }
  .__moncl-3__,.__moncl-8__ {
    color: #297EFF;
  }
  .__moncl-4__,.__moncl-9__ {
    color: #7029FF;
  }
}
</style>
