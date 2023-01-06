<template>
  <div class="__containerbox__">
    <div class="__cb1__">
      <i :class="['__cb-icon__', `__cb-icon-${icon}__`]"></i>
      {{ title }}
    </div>
    <div class="__cb2__">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="less">
.__containerbox__ {
  font-weight: normal;
  position: relative;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 2px;
  .__cb1__ {
    color: #297eff;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid rgba(112, 112, 112, 0.15);
    padding-left: 36px;
    font-size: 18px;
    font-weight: bold;
    position: relative;
  }
  .__cb-icon__ {
    width: 17px;
    display: inline-block;
    position: absolute;
    height: 17px;
    left: 12px;
    top: 14px;
  }
  .__cb-icon-default__ {
    background-image: url('../icon/icon-cb-default.png');
  }
  .__cb-icon-book__ {
    background-image: url('../icon/icon-cb-book.png');
  }
  .__cb-icon-booktime__ {
    background-image: url('../icon/icon-cb-booktime.png');
  }
  .__cb-icon-camera__ {
    background-image: url('../icon/icon-cb-camera.png');
  }
  .__cb-icon-echarts__ {
    background-image: url('../icon/icon-cb-echarts.png');
  }
  .__cb-icon-message__ {
    background-image: url('../icon/icon-cb-message.png');
  }
    .__cb-icon-yewu__ {
    background-image: url('../icon/icon-cb-yewu.png');
  }
  .__cb2__ {
    position: relative;
    height: calc(100% - 40px);
    min-height: 60px;
    box-sizing: border-box;
    padding: 8px;
  }
}
</style>
