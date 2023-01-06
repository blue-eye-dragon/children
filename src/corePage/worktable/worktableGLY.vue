<template>
  <div id="app">
    <div class="contss">
      <div class="leftMenu">
        <div class="leftTop">
          <div class="worktitle">快捷入口</div>
          <div class="contleft contleft3">
            <ul>
              <!-- <img :src="getImgUrl(item,index+1)" alt /> -->
              <li>
                <div class="classEnter"
                     @click="pageJump">
                  <div class="informationCollection">

                    <img src="./imgs/img15.png"
                         alt />
                    <div class="enterText">人员组织权限管理</div>
                  </div>
                </div>
              </li>
              <li v-for="(item,index) in businessTypeList"
                  :key="index">
                <div class="classEnter"
                     @click="informationCollectionFun(item)">
                  <div class="informationCollection">
                    <!-- <img :src="getImgUrl(item,index+1)" alt /> -->
                    <img :src="item.imgsrc"
                         alt />
                    <div class="enterText">{{item.configTitle}}</div>
                  </div>
                </div>
              </li>
              <!-- <li>
                <div class="classEnter">
                  <div class="fundsToIssue"></div>
                  <div class="enterText">暂无业务</div>
                </div>
              </li>-->
            </ul>
          </div>
        </div>
        <div class="leftBtm"
             v-if='false'>
          <div class="worktitle">数据展示</div>
          <div class="contleft contleft2">
            <!-- 事实无人抚养 -->
            <ul class="image"
                v-if="!showDaiban"
                style="width:100%">
              <li v-for="(item,index) in statisticalTypeList"
                  :key="index">
                <div class='classSee'
                     :class="item.configAdress?'classSeeshow':''"
                     v-if="item.configAdress">
                  <div class="fundsToIssue1">
                    <!-- <img :src="getImgUrlList(item)" alt /> -->
                    <img :src="item.imgsrc"
                         alt />
                  </div>
                  <div class="shuText"
                       style="color:#fff">{{item.configTitle}}</div>
                  <div class="shuTextTwo"
                       style="color:#fff">
                    <p>
                      <span class="num">{{item.totalCount}}</span>
                      <span>人</span>
                    </p>
                  </div>
                  <div class="shuTextThree"
                       style="color:#fff">
                    本月新增{{item.configTitle}}
                    <span>{{item.thisMonthCount}}</span>
                    人
                  </div>
                </div>
                <div v-else
                     class='noyw classSee'>
                  <img src="./imgs/zanwu.png"
                       alt />
                  <p>暂无业务</p>
                </div>
              </li>
              <li style="width:100%"
                  v-if="statisticalTypeList.length==0">
                <div class="zanwu"
                     style="text-align:center;width:100%">
                  <p>暂无数据</p>
                </div>
              </li>
            </ul>
            <ul v-if="showDaiban"
                style="width:100%">
              <li style="width:100%">
                <div class="zanwu"
                     style="text-align:center;width:100%">
                  <p>暂无数据</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content"
           v-if='false'>
        <div class="contins">
          <div class="agency">
            <div class="agencycont">
              <div class="worktitle">待办事项</div>
              <ul v-if="show">
                <li v-for="(item,index) in agencylist"
                    :key="index">
                  <p class="texts">
                    <span class="textnum">{{index+1}}</span>
                    <span class="textsname">{{item.name}}</span>
                    <span v-if="item.noDoCount != 0"
                          @click="appClick(item,index)"
                          class="texnum">( {{item.noDoCount}} )</span>
                    <!-- v-if="item.noDoCount != 0" <span>{{item.num}}</span> -->
                  </p>
                </li>
              </ul>
              <div class="zanwu"
                   v-if="!show">
                <p>暂无数据</p>
              </div>
            </div>
          </div>
          <div class="agency"
               style="margin-top:20px">
            <div class="agencycont">
              <div class="worktitle">最新消息</div>
              <ul>
                <li>
                  <p class="texts">
                    <span class="textsnum">1</span>
                    <span class="textsname">
                      <a href="static/管理员创建业务账号.wmv">操作手册下载</a>
                    </span>
                  </p>
                </li>
                <li v-for="(item,index) in msgList"
                    :key="index">
                  <p class="texts">
                    <span class="textsnum">{{index+2}}</span>
                    <span class="textsname">{{item.name}}</span>
                    <span @click="rejectClick(item,'0')"
                          class="texnumPass texnum"
                          v-if="item.passCount != 0">通过{{item.passCount}}</span>
                    <span @click="rejectClick(item,'1')"
                          class="texnum"
                          v-if="item.rejectCount != 0">驳回{{item.rejectCount}}</span>
                    <!-- <span>{{item.num}}</span> -->
                  </p>
                </li>
              </ul>
              <!-- <ul v-if="show">
                <li>
                  <div class="zanwu" v-if="!show">
                    <p>暂无数据</p>
                  </div>
                </li>
              </ul>-->
              <!-- <div class="zanwu" > -->
              <!-- <ul v-if="showTwo">
                 <li><p class="texts">操作手册下载</p></li>
              </ul>-->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Vue from 'vue'
var app0
export default {
  name: 'index',
  data () {
    return {
      //
      see5: false,
      show01: false,
      show02: false,
      show03: false,
      show04: false,
      show0201: false,
      show6: false,
      show: false,
      showTwo: false,
      showDaiban: false,
      childCount: 0,
      childAddCount: 0,
      childCount01: 0,
      agencylist: [
      ],
      msgListO: [{ name: '孤儿助学工程到期提醒', num: '22' }],
      shouyanglist: [
        { name: '新增收养登记', num: '2' },
        { name: '撤销收养登记', num: '7' },
        { name: '解除收养登记', num: '6' }
      ],
      fulilist: [
        { name: '明天计划结账申请', num: '2' },
        { name: '孤儿助学工程', num: '7' },
        { name: '减员申请', num: '6' },
        { name: '孤儿基本生活费申请', num: '16' }
      ],
      imgwurenList: {
        '1': require('./imgs/img1.png'),
        '2': require('./imgs/img2.png'),
        '3': require('./imgs/img3.png'),
        '4': require('./imgs/img4.png'),
        '5': require('./imgs/img5.png'),
        '6': require('./imgs/img6.png'),
        '7': require('./imgs/img7.png'),
        '8': require('./imgs/img8.png'),
        '9': require('./imgs/img9.png'),
        '10': require('./imgs/img10.png'),
        '11': require('./imgs/img11.png'),
        '12': require('./imgs/img12.png'),
        '13': require('./imgs/img13.png'),
        '14': require('./imgs/img14.png'),
        '15': require('./imgs/img15.png'),
        '0': require('./imgs/img0.png')
      },

      statisticsList: {
        // '02-01': require('./imgs/kjet.png'),
        // '02-02': require('./imgs/lset.png'),
        // '02-03': require('./imgs/sswrfyet.png'),
        // '02-04': require('./imgs/lsfn.png'),
        // '01-01': require('./imgs/kjet.png'),
        // '01-02': require('./imgs/lset.png'),
        // '01-03': require('./imgs/sswrfyet.png'),
        // '01-04': require('./imgs/lsfn.png')
        '02-01': require('./imgs/zanwu.png'),
        '02-02': require('./imgs/zanwu.png'),
        '02-03': require('./imgs/sswrfyet.png'),
        '02-04': require('./imgs/zanwu.png'),
        '01-01': require('./imgs/zanwu.png'),
        '01-02': require('./imgs/zanwu.png'),
        '01-03': require('./imgs/sswrfyet.png'),
        '01-04': require('./imgs/zanwu.png')
      },
      msgList: [],
      businessType: '',
      businessTypeList: [],
      statisticalTypeList: [],
      sum: 0
    }
  },
  beforeCreate: function () {
    app0 = this
  },
  filters: {
    handleTypefilter (val) {
      // return this.childCount
      switch (val) {
        case '02-01':
          return '0'
          break
        case '02-02':
          return '0'
          break
        case '02-03':
          return app0.childCount
          break
        case '02-04':
          return '0'
          break
        case '01-01':
          return '0'
          break
        case '01-02':
          return '0'
          break
        case '01-03':
          return app0.childCount
          break
        case '01-04':
          return '0'
          break
      }
    },
    handleTypefilters (val) {
      // return this.childCount
      switch (val) {
        case '02-01':
          return '0'
          break
        case '02-02':
          return '0'
          break
        case '02-03':
          return app0.childAddCount
          break
        case '02-04':
          return '0'
          break
        case '01-01':
          return '0'
          break
        case '01-02':
          return '0'
          break
        case '01-03':
          return app0.childAddCount
          break
        case '01-04':
          return '0'
          break
      }
    }
  },
  activated () {
    this.loadData()
  },
  mounted () {
    this.getCurrentUser()
    // this.getCode()
    // if (window.parent.indexTool.getUserInfo().isManager) {
    //   this.showDaiban = true
    // } else {
    //   this.getAreaLevel()
    //   this.showDaiban = false
    // }
  },
  methods: {
    // 人员组织权限管理页面跳转
    pageJump () {
      window.open('https://zwxt.mca.gov.cn/ta404/template/index.html', 'target', '')
    },
    informationCollectionFun (obj) { //
      let item = {}
      let strs = obj.configAdress.split('?')[1]
      item.id = strs.substring(15, strs.length)
      item.name = obj.configTitle
      item.url = obj.configAdress
      Base.openTabMenu(item)
    },
    async getCurrentUser () { /// ****** */
      var that = this
      this.post('/WorkbenchApi/queryCurrentUserBusinessConfig', {}).then(
        data => {
          this.statisticalTypeList = []
          this.businessTypeList = []
          this.businessTypeList = data.data.data.businessType
          this.statisticalTypeList = data.data.data.statisticalType
          this.businessTypeList.map(async (item, index) => {
            let imgsrc = require('./imgs/img8.png')
            if (item.configIcon) {
              let res = await this.getimgsrc(item)
              imgsrc = res
            }
            // item.imgsrc = imgsrc
            Vue.set(item, 'imgsrc', imgsrc)
          })
          if (this.statisticalTypeList && this.statisticalTypeList.length > 0) {
            this.statisticalTypeList.map(async (item, index) => {
              let imgsrc = require('./images/child6.png')
              if (item.configIcon) {
                let res = await this.getimgsrc(item)
                imgsrc = res
              }
              if (item.configAdress) {
                let datanum = await this.getQueryCurFact(item.configAdress)
                // thisMonthCount
                Vue.set(item, 'thisMonthCount', datanum.data.data.thisMonthCount)
                Vue.set(item, 'totalCount', datanum.data.data.totalCount)
              }
              // item.imgsrc = imgsrc
              Vue.set(item, 'imgsrc', imgsrc)
            })
          }
        }
      )
    },
    loadData () {
      this.agencylist = []
      this.show = false
      this.showTwo = false
    },
    // 下载操作手册文件
    // downloadFile () {
    //   console.log(window.faceConfig.basePath + '/static/操作手册.doc')
    //   // window.location.href="http://192.168.5.121:8080/static/操作手册.doc"
    // },
    getImgUrl (obj, index) {
      let i = index % 16
      let srcL = this.imgwurenList[i]
      return srcL
      // return require(`./imgs/img${obj.configValue}.png`)
    },
    getImgUrlList (obj) {
      let srcL = this.statisticsList[obj.configValue]
      return srcL
    },
    getAreaLevel () {
      // 区县
      if (window.parent.indexTool.getUserInfo().areaLevel == '2') {
        this.show = true
        this.showTwo = true
        this.getNoDoCountList()
      } else if (window.parent.indexTool.getUserInfo().areaLevel == '3') {
        // 乡镇
        this.getMsgList()
        this.show = false
        this.showTwo = false
      }
    },
    async getCode () {
      Base.submit(null, {
        url: 'codetable/getCode', // url
        data: { codeType: 'WORKTABLEJUMP' }
      })
        .then(data => {
          // this.agencylist.map((item,index)=>{
          // })
          // this.childCount = data.data.data
        })
        .catch(error => {
          console.log('失败')
        })
    },
    // 获取图片
    async getimgsrc (item) {
      let imgsrc = ''
      //   let res = await this.post('/file/getFileUrls', {
      //     returnFileIds: item.configIcon
      //   })
      imgsrc = window.faceConfig.basePath + '/file/getFileFromDfs/' + item.configIcon
      return imgsrc
    },
    // 业务配置，当前登录人

    // 数据展示----获取事实无人抚养
    async getQueryCurFact (url) {
      let data = await this.post(url, {})
      return data
    },
    async getChildAddCount () {
      Base.submit(null, {
        url:
          '/factNoOneRaisedWholeApi/queryMonthNewAddFactNoOneRaisedChildCount', // url
        data: {}
      })
        .then(data => {
          this.childAddCount = data.data.data
        })
        .catch(error => {
          console.log('失败')
        })
    },
    // 待办事项--区县
    async getNoDoCountList () {
      Base.submit(null, {
        url: '/WorkbenchApi/getNoDoCountList', // url
        data: { areaCode: window.parent.indexTool.getUserInfo().areaCode }
      })
        .then(data => {
          this.agencylist = []
          data.data.data.map((item, index) => {
            if (item.noDoCount == 0 || item.noDoCount == null) {
              // this.msgList.splice(index, 1)
            } else {
              this.agencylist.push(item)
            }
          })
          if (this.agencylist.length == 0) {
            this.show = false
            this.showTwo = true
          }
        })
        .catch(error => {
          console.log('失败')
        })
    },
    // 消息提醒--乡镇 /WorkbenchApi/getMsgList
    async getMsgList () {
      Base.submit(null, {
        url: '/WorkbenchApi/getMsgList', // url
        data: { receivePersonId: window.parent.indexTool.getUserInfo().userId }
      })
        .then(data => {
          // this.msgList = data.data.data
          this.msgList = []
          data.data.data.map((item, index) => {
            if (
              (item.passCount == 0 || item.passCount == null) &&
              (item.rejectCount == 0 || item.rejectCount == null)
            ) {
              // this.msgList.splice(index, 1)
            } else {
              this.msgList.push(item)
            }
          })
          if (this.msgList.length == 0) {
            this.show = true
            this.showTwo = false
          }
        })
        .catch(error => {
          console.log('失败')
        })
    },

    // // 消息提醒————驳回跳转
    // rejectClick (obj, e) {
    //   let params = {}
    //   let approveStatus = ''
    //   params.business = obj.business
    //   if (e == '0') {
    //     // 通过
    //     approveStatus = '3'
    //   } else if (e == '1') {
    //     // 驳回
    //     approveStatus = '4'
    //   }
    //   params.approveStatus = approveStatus
    //   params.childBusnissType = '03'
    //   Base.submit(null, {
    //     url: '/WorkbenchApi/getbusnissId', // url
    //     data: params
    //   })
    //     .then(data => {
    //       let workbenchVo = {}
    //       let dataList = []
    //       dataList = data.data.data
    //       workbenchVo.idsList = dataList
    //       workbenchVo.business = obj.business
    //       workbenchVo.approveStatus = approveStatus
    //       workbenchVo.childBusnissType = '03'
    //       Base.submit(null, {
    //         url: '/WorkbenchApi/insertMsgRemind', // url
    //         data: workbenchVo,
    //         autoQs: false,
    //         headers: { 'Content-Type': 'application/json' }
    //       })
    //         .then(data => {
    //           if (data.data.success == '操作成功') {
    //             let item = {}
    //             if (e == '0') {
    //               item.id = '3'
    //             } else if (e == '1') {
    //               item.id = '4'
    //             }
    //             item.name = obj.tabName
    //             item.url = obj.jumpTypeUrl
    //             this.returnPage(item)
    //           }
    //         })
    //         .catch(error => {
    //           console.log('失败')
    //         })
    //     })
    //     .catch(error => {
    //       console.log('失败')
    //     })
    // },

    // 最新消息（驳回、通过）点击事件
    rejectClick (obj, e) {
      let item = {}
      if (e == '0') {
        item.id = '3'
      } else if (e == '1') {
        item.id = '4'
      }
      item.name = obj.tabName
      item.url = obj.jumpTypeUrl
      this.returnPage(item)
    },
    appClick (obj, index) {
      let item = {}
      item.id = index + 1
      item.name = obj.tabName
      item.url = obj.jumpTypeUrl
      this.returnPage(item)
    },
    returnPage (obj) {
      Base.openTabMenu(obj)
    }
  }
}
</script>
<style scoped>
#app {
  height: 100%;
}
li {
  list-style: none;
}
.logionout {
  display: flex;
  align-items: center;
  padding: 0 18px;
}
.logo {
  margin-top: 2px;
  width: 40px;
}
.logo1 {
  margin-left: 14px;
  margin-right: 100px;
}
.contss {
  width: 100%;
  height: 100%;
  background: #eff1f4;
  padding: 14px;
}
.leftMenu {
  /* width: 60%; */
  width: 100%;
  height: 100%;
  float: left;
}
.leftTop {
  width: 100%;
  height: 40%;
  background: #fff;
}
.leftBtm {
  margin-top: 20px;
  width: 100%;
  height: calc(60% - 20px);
  background: #fff;
}
.content {
  width: calc(40% - 20px);
  float: right;
  height: 100%;
}
.contins {
  padding: 0;
  background: transparent;
  width: 100%;
  height: 99%;
}
.worktitle {
  width: 100%;
  height: 52px;
  border-bottom: 1px solid rgba(226, 227, 228, 1);
  font-size: 16px;
  font-weight: bold;
  line-height: 52px;
  color: rgba(8, 121, 217, 1);
  padding: 0 18px 0 26px;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #0879d9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.contleft {
  width: 100%;
  height: calc(100% - 52px);
  margin: auto;
  display: flex;
  align-items: center;
  padding-left: 60px;
}
.contleft ul {
  display: flex;
  width: 100%;
  height: 80%;
  padding: 0;
  /* white-space: nowrap;
  overflow: hidden;
  align-items: center; */
}
.contleft ul li {
  height: 100%;
  width: 18%;
}
.contleft3 ul li:hover {
  width: 20%;
  height: 98%;
  transition: 1s;
}
.contleft3 ul li:hover .classEnter {
  height: 110%;
  transition: 1s;
}

.contleft2 ul li {
  height: 100%;
  width: 22%;
  margin-right: 18px;
}
.agency {
  width: 100%;
  height: 49%;
  /* min-height: 280px; */
  display: flex;
  background: #fff;
  justify-content: space-between;
}
.agencycont {
  width: 100%;
  background: rgba(255, 255, 255, 1);
}
.agency ul {
  padding: 0 10px;
  box-sizing: border-box;
}
.zanwu {
  width: 100%;
  height: calc(100% - 52px);
  font-size: 16px;
  display: flex;
  align-items: center;
}
.zanwu p {
  width: 100%;
  text-align: center;
}
.agency ul li {
  list-style: none;
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}
.texts {
  margin-left: 13px;
  display: flex;
  /* cursor: pointer; */
}
.classEnter {
  /* width: 130px; */
  height: 100%;
  margin: 8px 8px;
  border: 1px solid #cfcfdf;
  border-radius: 8px;
  cursor: pointer;
}
/* .classEnter:hover,
.classEnterClick {
  border: 1px solid #cfcfdf;
  box-shadow: 0px 0px 8px 0px #d8e0fc;
  width: 140px;
  height: 180px;
  transition: 1s;
}
.classEnter:hover .informationCollection img {
  margin: 30px 45px 30px 45px;
  transition: 1s;
} */
.enterText {
  width: 90%;
  margin: 0 auto;
  white-space: normal;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  /* line-height: 22px; */
  /* color: rgba(106, 143, 245, 1); */
  color: rgba(0, 0, 0, 0.8);
  opacity: 1;
  /* margin-top: 38px; */
}
.zanwuyewu {
  width: 100%;
  text-align: center;
  height: 25px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 25px;
  color: #c4c4cc;
  opacity: 1;
}
.informationCollection,
.informationChange,
.informationChangeStatus,
.fundsToIssue,
.shangbao,
.biangeng,
.zhuangtai,
.shouyang11,
.shouyang12,
.shouyang13,
.shouyang14,
.zonghechaxun,
.zijin,
.zhuangtaiStatus,
.shouyang15,
.fuli11,
.fuli12,
.fuli13,
.fuli14,
.fuli15,
.fuli16,
.fuli17,
.fuli18,
.fuli19 {
  width: 100%;
  height: 100%;
  /* position: relative;
  margin-left: 50%;
  left: -30px;
  margin-top: 20px;
  margin-bottom: 20px; */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  /* float: left; */
}
.informationCollection img {
  width: 50px;
}
/* .informationCollection {
  background: url("./imgs/wurencaiji.png") no-repeat center center;
} */

/* .classEnter:hover .informationCollection {
  background: url("./imgs/wurencaiji_hover.png") no-repeat center center;
} */
/* .informationChange {
  width: 60px;
  height: 60px;
   position: relative;

  margin: 18px 34px 18px 35px;
  float: left;
} */
/* 数据展示 */
.classSee02-01,
.classSee02-02,
.classSee02-03,
.classSee02-04,
.classSee01-01,
.classSee01-02,
.classSee01-03,
.classSee01-04 {
  width: 100%;
  height: 252px;
  /* border: 1px solid #668ff5ff; */
  border-radius: 8px;
  padding-top: 1px;
}
.classSee02-01,
.classSee01-01,
.classSee02-02,
.classSee01-02,
.classSee02-04,
.classSee01-04 {
  background-color: #f3f3f5;
}
.classSee02-03,
.classSee01-03 {
  background: url("./images/bg3.png") no-repeat center center;
  background-size: cover;
}
.classSee {
  width: 100%;
  height: 252px;
  /* border: 1px solid #668ff5ff; */
  border-radius: 8px;
  padding-top: 1px;
  background-color: #f3f3f5;
  color: #333;
}
.classSeeshow {
  background: url("./images/bg3.png") no-repeat center center;
  background-size: cover;
}
/* .contleft2 ul li {
  background: url("./images/bg3.png") no-repeat center center;
  background-size:cover;
} */
.fundsToIssue1,
.fundsToIssue2,
.fundsToIssue3,
.fundsToIssue4,
.shouyang1,
.shouyang2,
.shouyang3,
.shouyang4,
.fuli1,
.fuli2,
.fuli3,
.fuli4 {
  width: 80px;
  height: 80px;
  text-align: center;
  /* position: relative;
  margin-left: 50%;
  left: -40px;
  margin-top: 29px;
  margin-bottom: 29px; */
  margin: 29px auto;
}
.fundsToIssue1 img {
}
.shuText,
.shuTextThree {
  width: 100%;
  padding: 0 10px;
  margin: auto;
  height: 19px;
  white-space: normal;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 18px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.shuTextTwo {
  width: 100%;
  height: 50px;
  text-align: center;
  font-family: DIN Next LT Pro;
  font-weight: bold;
  line-height: 50px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.num {
  font-size: 30px;
}
.texnum {
  color: rgba(255, 19, 19, 1);
  display: inline-block;
  cursor: pointer;
  margin-left: 5px;
}
.texnumPass {
  color: #428108;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
.agencycont ul li p {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.textsname {
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 5px;
}
.textsnum {
  margin-right: 5px;
}
.noyw {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(205, 205, 213, 1);
}
.noyw img {
  margin: 48px 0 20px;
}
</style>
