<template>
  <div class="__sex-ratio__">
    <div class="__sex1__">
      <div class="__textdiv__">男 {{ male.childRatio }}</div>
      <i class="__icon-n__"></i>
    </div>
    <div class="__sex2__">
      <div class="__textdiv__">女 {{ female.childRatio }}</div>
      <i class="__icon-f__"></i>
    </div>
    <div class="__sex3__">
      <div class="__textdiv__">未统计<br />{{ w.childRatio }}</div>
      <i class="__icon-w__"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    male () {
      return (
        this.data.find((item) => {
          return item.typeName === '男'
        }) || {}
      )
    },
    female () {
      return (
        this.data.find((item) => {
          return item.typeName === '女'
        }) || {}
      )
    },
    w () {
      return (
        this.data.find((item) => {
          return item.typeName === '未统计'
        }) || {}
      )
    }
  }
}
</script>

<style lang="less">
.__sex-ratio__ {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .__sex1__ {
    width: calc(33.3% + 15px);
    height: 51px;
    background: linear-gradient(90deg, rgba(97, 187, 255, 1) 0%, rgba(12, 126, 213, 1) 100%);
    transform: skew(-20deg);
    margin-left: -15px;
    border-radius: 0 8px 8px 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 27px;
    overflow: hidden;
    padding-right: 12px;
    position: relative;
  }
  .__textdiv__ {
    transform: skew(20deg);
    white-space: pre-wrap;
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
  }
  i {
    display: block;
    position: absolute;
    width: 39px;
    height: 39px;
    background-position: center center;
    background-repeat: no-repeat;
    transform: skew(20deg);
    right: 10px;
    opacity: 0.3;
  }
  .__icon-n__ {
    background-image: url('../icon/icon-male.png');
  }
    .__icon-f__ {
    background-image: url('../icon/icon-female.png');
  }
  .__icon-w__ {
    background-image: url('../icon/icon-unknow.png');
    right: 20px;
  }
  .__sex2__ {
    width: calc(33.3%);
    height: 51px;
    background: linear-gradient(270deg, rgba(241, 126, 134, 1) 0%, rgba(251, 57, 141, 1) 100%);
    transform: skew(-20deg);
    border-radius: 8px;
    margin: 0 8px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 16px;
    overflow: hidden;
    padding-right: 12px;
    position: relative;
  }
  .__sex3__ {
    width: calc(33.3% + 15px);
    height: 51px;
    background: linear-gradient(90deg, rgba(210, 211, 213, 1) 0%, rgba(162, 169, 177, 1) 100%);
    transform: skew(-20deg);
    margin-right: -15px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 12px;
    overflow: hidden;
    padding-right: 12px;
    position: relative;
  }
}
</style>
