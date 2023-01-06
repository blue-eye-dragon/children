<template>
  <!-- <ta-button @click='dayin' v-if="show">dayin</ta-button>
        <canvas v-for="page in pages" ref='pdf' :id="'canvas'+page" :key="page"></canvas> -->
  <!-- <iframe src="http://192.168.5.42:8081/jmgc-cbs/adoption/printRelieve?id=614e90dc586e43c1884f77e2716e5983"
        width="100%"
        height="840px"
         frameborder="0"></iframe> -->
  <div></div>
</template>

<script>
// import PDF from 'pdfjs-dist'
PDF.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js'
export default {
  data () {
    return {
      show: true,
      name: '',
      width: 100,
      pages: 0,
      pdfDoc: ''
    }
  },
  activated () {
    console.log(123)
    // this.loadFile('http://192.168.5.42:8081/jmgc-cbs/adoption/printRelieve?id=614e90dc586e43c1884f77e2716e5983')
    // let wen = window.open('http://192.168.5.42:8081/jmgc-cbs/adoption/printRelieve?id=614e90dc586e43c1884f77e2716e5983')
    window.open('static/print.html?src=http://192.168.5.42:8080/jmgc-cbs/adoption/printNotes?id=37ad7c86c9e249fb9b3984c810dc3ad5')
  },
  mounted () {

  },
  methods: {
    /* 加载PDF文件 */
    loadFile: function (url) {
      const _this = this
      PDF.getDocument(url).then(function (pdf) {
        _this.pdfDoc = pdf
        _this.pages = _this.pdfDoc.numPages
        _this.$nextTick(() => {
          _this.renderPage(1)
        })
      })
    },
    /* 渲染PDF文件 */
    renderPage: function (num) {
      const _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        const canvas = document.getElementById('canvas' + num)
        const ctx = canvas.getContext('2d')
        const dpr = window.devicePixelRatio || 1// 设备像素比
        const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1// 浏览器在渲染canvas之前会用几个像素来来存储画布信息,类似img
        const ratio = dpr / bsr
        var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width) // 用户网页的可视区域
        canvas.width = viewport.width * ratio// 画布大小,默认值是width:300px,height:150px
        canvas.height = viewport.height * ratio
        canvas.style.width = viewport.width + 'px'// 画布的框架大小
        canvas.style.height = viewport.height + 'px'
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
        if (_this.pages > num) {
          _this.renderPage(num + 1)
        }
      })
    },
    dayin () {
      window.print()
      // 1.新窗口打印
      //   let str = JSON.stringify(this.columns)
      //   let nowcolumns = JSON.parse(str)
      //   nowcolumns.splice(nowcolumns.length - 1, 1)
      //   this.$router.push({
      //     name: 'modulePart9',
      //     params: {
      //       columns: nowcolumns,
      //       data: this.nowdata
      //     }
      //   })
      // 弹出打印后将选择的清空
      //   this.onSelectChange([], [])
      // 2.直接打印
      // this.show = false
      // this.$nextTick(() => {
      //   window.print()
      //   this.show = true
      // })

      //   window.print()
      // 3.局部打印
      // var bdhtml = document.getElementsByClassName('ant-table')[0].innerHTML;
      // var bdhtml = ''
      // this.nowdata.map(item => {
      //   bdhtml += item.email + '<span class="astyle">' + item.gender + '</span>'
      // })
      // var oldContent = document.body.innerHTML
      // document.body.innerHTML = bdhtml
      // // 重新加载页面，以刷新数据。以防打印完之后，页面不能操作的问题
      // window.print()
      // window.location.reload()
      // document.body.innerHTML = oldContent
      // return false
    }
  }
}
</script>

<style lang="less" scoped media="print">
// @page { size: A4 }
// // media="print"
@media print {
  @page {
    size: A4;
    margin: 10cm;
  }
  @page :left {
    margin-left: 30cm;
  }
  @page :right {
    margin-right: 30cm;
  }
  // .aa{
  //     width: 210mm;
  //     height: 297mm;
  //     overflow: hidden;
  //     color:red;
  //     margin:0 auto;
  //     box-sizing: border-box;
  //   }
  .name {
  }
}
// .aa{
//     width: 210mm;
//     height: 297mm;
//     overflow: hidden;
//     padding: 0;
//     color:red;
//     margin:0 auto;
//   }
</style>
