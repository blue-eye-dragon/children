<template>
    <div class="conts">
        <div class="contin">
            <table class="tableStyle">
                <tr>
                    <th>主题分类</th>
                    <td>{{detailContent.subjectClassification}}</td>
                    <th>信息来源</th>
                    <td>{{detailContent.informationSource}}</td>
                </tr>
                <tr>
                    <th>文号</th>
                    <td>{{detailContent.referenceNumber}}</td>
                    <th>公文名称</th>
                    <td>{{detailContent.documentName}}</td>
                </tr>
                <tr>
                    <th>发布日期</th>
                    <td>{{detailContent.publishDate}}</td>
                    <th>主题词</th>
                    <td>{{detailContent.subjectHeadings}}</td>
                </tr>
            </table>
            <div class="contentStyle">
                <h2>{{detailContent.documentName}}</h2>
                <p>
                    <span>
                        <span>时间：{{detailContent.createTime}}</span>
                        <span style="margin-left:20px">来源：{{detailContent.informationSource}}</span>
                    </span>
                    <span style="float:right">
                        <span @click="fontSizeFun">【字体：<a>大</a> <a>中</a> <a>小</a> 】</span>
                        <ta-button @click="myPrint('detailContenPrint')" class="preservation">打印</ta-button>
                    </span>
                </p>
                <div v-html="detailContent.publishContent" :class="fontSize" id="detailContenPrint"></div>
            </div>
        </div>
        <div class="bom">
            <ta-button @click="back" class="preservation">返回</ta-button>
        </div>
    </div>
</template>
<script>
// import listMixin from '@component/common/js/mixins/listMixin'
export default {
//   mixins: [listMixin],
  name: 'policyViewDetail',
  data () {
    return {
      id: '',
      mixListOptions: {
        detailContentURL: '/policyRelease/queryById'
      },
      detailContent: {},
      fontSize: ''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getDetailConten()
  },
  activated () {
    this.id = this.$route.query.id
    this.getDetailConten()
  },
  methods: {
    async getDetailConten () {
      let data = await this.post(this.mixListOptions.detailContentURL, {id: this.id})
      this.detailContent = data.data.data
      console.log(this.detailContent)
    },
    back () {
      this.$router.push({
        name: 'policyView'
      })
    },
    fontSizeFun (event) {
      console.log(event.target.innerText)
      if (event.target.innerText == '大') {
        this.fontSize = 'bigFontSize'
      }
      if (event.target.innerText == '中') {
        this.fontSize = 'middleFontSize'
      }
      if (event.target.innerText == '小') {
        this.fontSize = 'smallFontSize'
      }
    },
    // 打印
    myPrint (tmp) {
      setTimeout(() => {
        var obj = document.getElementById(tmp)
        var newWindow = window.open()// 打印窗口要换成页面的url,默认为新页面打开当下页面
        var docStr = obj.innerHTML
        newWindow.document.write(docStr)
        newWindow.document.close()
        newWindow.print()
        newWindow.close()
      }, 500)
    }
  }
}
</script>
<style scoped>
.tableStyle{
    width: 100%;
    margin: 15px 0;
}
.tableStyle tr{
    height: 40px;
    line-height: 40px;
}
.tableStyle tr td,.tableStyle tr th{
    border: 1px solid rgba(0,0,0,.7);
    padding-left: 15px;
    font-size: 16px;
}
.contentStyle{
    margin-top: 50px;
}
.contentStyle h2{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
}
.contentStyle p{
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.5);
    margin-bottom: 30px;
}
.bigFontSize{
    font-size: 18px;
}
.middleFontSize{
    font-size: 16px;
}
.smallFontSize{
    font-size: 14px;
}
</style>
