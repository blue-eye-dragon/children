<template>
  <div class="item_title"
       @click="showchange">
    <div class="lines"></div>
    <p class="item_text">{{title}}</p>
    <div class="horizontallineDown"
         v-if="!show"></div>
    <div class="horizontallineUP"
         v-if="show"></div>
    <div v-if="ishide">
      <img v-if="!show"
           src="static/img/deopdown.jpg"
           alt
           class="cursors" />
      <img v-else
           src="static/img/up.png"
           alt
           class="cursors" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    ishide: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    showchange () {
      if (!this.ishide) {
        return false
      }
      if (this.ishide) {
        this.$emit('update:show', !this.show)
      }
    }
  }
}
</script>
<style scoped type="text/less">
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cursors {
  cursor: pointer;
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
.item_text {
  width: 160px;
  /* width: 84px; */
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.horizontallineUP {
  /* width: calc(100% - 135px); */
  flex: 1;
  margin-left: 15px;
  margin-right: 10px;
  height: 8px;
  /* background: rgba(0, 0, 0, 0.09); */
  background: url("./upLine.png") no-repeat 0 0;
  background-size: 100% 100%;
}
.horizontallineDown {
  /* width: calc(100% - 135px); */
  flex: 1;
  margin-left: 15px;
  margin-right: 10px;
  height: 8px;
  /* background: rgba(0, 0, 0, 0.09); */
  background: url("./downLine.png") no-repeat 0 0;
  background-size: 100% 100%;
}
.item_title img {
  width: 18px;
  height: 18px;
}
</style>
