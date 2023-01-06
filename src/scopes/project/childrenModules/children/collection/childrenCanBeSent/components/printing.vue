<template>
  <div class="list">
    <div class="onelist"
         v-for="(item,index) in printlist"
         :key="index">
      <img :src="item.src"
           alt="">
      <p>{{item.name}}</p>
      <div class="listbom">
        <div class="preview"
             @click="prients(item)">
          <ta-icon type="eye-o" />
        </div>
        <div class="lines"></div>
        <div class="print"
             @click="prients(item)">
          <ta-icon type="printer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    printlist: {
      type: Array,
      required: true
    },
    printId: {
      type: String,
      required: true
    },
    bizId: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  methods: {
    prients (item) {
      let url = `${window.faceConfig.basePath}${item.url}?id=${this.printId}`
      if (this.bizId) {
        url += `&&bizId=${this.bizId}`
      }
      window.open(url)
      window.open('static/print.html?src=' + url)
      // setTimeout(function () { wen.document.title = '文件信息' }, 1000)
    }
  }
}
</script>
<style scoped lang="less">
.list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.onelist {
  width: 18.8%;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(232, 232, 232, 1);
  margin-bottom: 24px;
  margin-left: 1%;
  position: relative;
}
.onelist img {
  width: 100%;
}
.onelist p {
  height: 20px;
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.85);
  margin-top: 22px;
  text-align: center;
}
.listbom {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50px;
  background: rgba(250, 250, 250, 1);
  border-top: 1px solid rgba(232, 232, 232, 1);
  display: flex;
  align-items: center;
}
.preview {
  width: calc((100% - 1px) / 2);
  height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.lines {
  width: 1px;
  height: 31px;
  background: rgba(106, 106, 106, 1);
  opacity: 0.1;
}
.print {
  width: calc((100% - 1px) / 2);
  height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
