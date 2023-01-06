<template>
  <div class="separate">
    <div class="line"></div>
    <p style='width: 170px;'>{{title}}</p>
    <div v-if="show" style="width:100%;height:1px;background-color:#98a3b9"></div>
  </div>  
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default:false
    }
  },
  data () {
    return {}
  },
}
</script>
<style scoped type="text/less">
.separate {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 22px 0;
  height: 22px;
}
.separate p {
  font-size: 16px;
  font-weight: 400;
}
.line {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  margin-right: 3px;
}
</style>
