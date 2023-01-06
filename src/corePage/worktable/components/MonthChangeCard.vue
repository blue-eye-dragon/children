<template>
  <div class="__month-change-card__" :style="style">
    <div class="__mon-now__">
      本月
      <span>{{ data.thisMonthChildNUm || '-' }}</span>
      人
    </div>
    <div class="__mon-line__"></div>
    <div class="__mon-pre__">
      上月
      <span>{{ data.preMonthChildNUm || '-' }}</span>
      人
    </div>
    <div class="__mon-text__">{{ data.configTitle }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    lineCount: {
      type: Number,
      default: 8
    },
    height: {
      type: Number,
      default: 196
    }
  },
  computed: {
    style () {
      let width = Number(100 / this.lineCount).toFixed(0)
      return {
        width: `calc(${width}% - 16px)`,
        height: `${this.height}px`
      }
    }
  }
}
</script>

<style lang="less">
.__month-change-card__ {
  text-align: center;
  margin: 0 8px;
  font-weight: 600;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(207, 213, 223, 1);
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  padding: 8px;
  &:hover {
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
  }
  span {
    font-size: 20px;
    margin: 0 6px;
  }
  .__mon-line__ {
    width: 20px;
    height: 0px;
    border: 1px solid currentColor;
    margin: 16px auto;
  }
  .__mon-pre__ {
    color: rgba(33, 33, 47, 0.43);
    margin-bottom: 28px;
  }
  .__mon-text__ {
    color: #21212f;
  }
  .__mon-now__ {
    margin-top: 38px;
  }
}
</style>
