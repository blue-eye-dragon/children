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
    <!-- 打印证件组件 -->
    <printCertificateregister ref="printCertificateregister"></printCertificateregister>
    <printCertificateRelive ref="printCertificateRelive"></printCertificateRelive>
  </div>
</template>
<script>
import printCertificateregister from '@/scopes/project/common/components/printCertificateregister'
import printCertificateRelive from '@/scopes/project/common/components/printCertificateRelive'
export default {
  components: {
    printCertificateregister,
    printCertificateRelive
  },
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
    async prients (item) {
      const params = {
        id: this.printId
      }
      if (this.bizId) {
        params.bizId = this.bizId
      }
      if (item.name == '收养登记证') {
        const res = await this.post('/adoption/printRegistrationData', params)
        this.$refs.printCertificateregister.printCertificateInfo = res.data.data
        this.$refs.printCertificateregister.printCertificate()
      } else if (item.name == '解除收养关系证明') {
        const res = await this.post('/adoption/printRelieveAdoptRelationProveData', params)
        this.$refs.printCertificateRelive.printCertificateInfo = res.data.data
        this.$refs.printCertificateRelive.printCertificate()
      } else {
        let titile = ''
        for (const k in this.printlist) {
          if (this.printlist[k].url == item.url) {
            titile = this.printlist[k].name
          }
        }
        let url = `${window.faceConfig.basePath}${item.url}?id=${this.printId}`
        if (this.bizId) {
          url += `&&bizId=${this.bizId}`
        }
        const Aaa = 'static/print.html?src=' + url + '&&titile=' + titile
        window.open(encodeURI(Aaa))
      }
    }

    // prients (item) {
    //   let url = `${window.faceConfig.basePath}${item.url}?id=${this.printId}`
    //   if (this.bizId) {
    //     url += `&&bizId=${this.bizId}`
    //   }
    //   window.open(url)
    //   window.open('../../../../../../../static/print.html?src=' + url)
    //   // setTimeout(function () { wen.document.title = '文件信息' }, 1000)
    // }
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
  width: 100%;
  position: absolute;
  bottom: 70px;
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
