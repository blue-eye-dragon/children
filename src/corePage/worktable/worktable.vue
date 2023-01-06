<template>
  <div v-if="orShow"
       id="content"
       style="width: 100%;height: 100%; "
       class="__fix-style__">
    <!-- <div style="width:300px;height:300px">
      <MapEcharts></MapEcharts>
    </div> -->
    <div class="__ministerial-main__"
         v-if="roleConfig.type === 'ministerial'">
      <TypeCardList :dataList="headArrMinisterial"
                    @clickItem="typeCardClick"
                    :isCanClick="roleConfig.isTypeCardCanClick"
                    v-if="roleConfig.isShowTypeCardBox && headArrMinisterial.length > 0"></TypeCardList>
      <div class="__main-content__">
        <div class="__mcl__">
          <ContainerBox title="健康分析"
                        class="__healthy__"
                        icon="camera">
            <HealthEcharts :data="ringdata"></HealthEcharts>
          </ContainerBox>
          <ContainerBox title="教育分析"
                        class="__education__"
                        icon="book">
            <EduEcharts :isstyle="false"
                        :data="educationdate"></EduEcharts>
          </ContainerBox>
        </div>
        <div class="__mcc__">
          <ContainerBox :title="`${cityName} ${currentType}数量分布图`"
                        class="__chinamap__"
                        icon="echarts">
            <ta-button type="primary"
                       @click="china"
                       class="__chinabtn__">
              {{ curCityName || '中国' }}
            </ta-button>
            <div class="__mcc-map__">
              <div id="map"
                   style="height: 100%"></div>
            </div>
          </ContainerBox>
          <ContainerBox title="趋势分析"
                        class="__trend__"
                        icon="echarts">
            <div style="width: 100%; height: 170px">
              <TrendEcharts :data="chartDataqushi"></TrendEcharts>
            </div>
          </ContainerBox>
        </div>
        <div class="__mcr__">
          <ContainerBox title="性别占比"
                        class="__sex-ratio-box__"
                        icon="echarts">
            <SexRatio :data="dataAll.sexCounts"></SexRatio>
          </ContainerBox>
          <ContainerBox title="地区人数排名"
                        class="__ranklist-box__"
                        icon="yewu">
            <RankList :dataList="dataAll.areaCounts"></RankList>
          </ContainerBox>
        </div>
      </div>
    </div>
    <div class="__province-main__"
         v-if="roleConfig.type === 'province' &&orgType!='99'&&orgType!='98'">
      <TypeCardList :dataList="headArrMinisterial"
                    @clickItem="typeCardClick"
                    :isCanClick="roleConfig.isTypeCardCanClick"
                    v-if="roleConfig.isShowTypeCardBox && headArrMinisterial.length > 0"></TypeCardList>
      <div class="__main-content__"
           v-if="roleConfig.isShowMainBox">
        <div class="__mclc__">
          <div class="__w100__">
            <ContainerBox title="待办事项"
                          icon="booktime">
              <NeedDoCardList v-if="copyagencylist.length > 0"
                              :dataList="copyagencylist"
                              @itemClick="goNeedDopage"
                              :lineCount="5"></NeedDoCardList>
              <!-- <waitdo :data="copyagencylist"
                      @itemClick="goNeedDopage"></waitdo> -->
            </ContainerBox>
          </div>
          <div class="__mc2__">
            <div class="__w30__">
              <ContainerBox :title="`${currentType}健康分析`"
                            class="__healthytr__"
                            icon="yewu">
                <HealthEcharts :data="ringdata"></HealthEcharts>
              </ContainerBox>
            </div>
            <div class="__w70__">
              <ContainerBox :title="`${currentType}教育分析`"
                            class="__healthytr__"
                            icon="book">
                <EduEcharts :data="educationdate"
                            :isstyle="true"></EduEcharts>
              </ContainerBox>
            </div>
          </div>
          <div class="__w100__">
            <ContainerBox :title="`${currentType}数量统计`"
                          class="__healthy__"
                          icon="echarts">
              <sexEcharts :series='series1'
                          :data="sexEchartsData"></sexEcharts>
            </ContainerBox>
          </div>
        </div>
        <div class="__mcr__">
          <!-- <ContainerBox title="待办事项"
                        class="__sex-ratio-box__"
                        icon="booktime">
            <waitdo :data="copyagencylist"
                    @itemClick="goNeedDopage"></waitdo>
          </ContainerBox> -->
          <ContainerBox title="消息提醒"
                        class="__message-boxre__"
                        icon="message">
            <div class="__province-msg-box__">
              <Message :data="messageList"
                       v-if="messageList.length>0"
                       @itemClick="goMessagePage"></Message>
              <div v-if="messageList.length<=0"
                   class="_noData_">暂无数据</div>
            </div>
          </ContainerBox>
        </div>
      </div>
    </div>
    <div class="maprange"
         v-show="false">
      <div class="input-card">
        <h4>下属行政区查询</h4>
        <div class="input-item">
          <div class="input-item-prepend">
            <span class="input-item-text">省市区</span>
          </div>
          <select id="province"
                  style="width:100px"></select>
        </div>
        <div class="input-item">
          <div class="input-item-prepend">
            <span class="input-item-text">地级市</span>
          </div>
          <select id="city"
                  style="width:100px"></select>
        </div>
        <div class="input-item">
          <div class="input-item-prepend"><span class="input-item-text">区县</span></div>
          <select id="district"
                  style="width:100px"></select>
        </div>
      </div>
    </div>
    <!-- -->
    <div class="__county-main__"
         v-if="roleConfig.type === 'county'&& areaLevel!=4&& orgType !=99 &&orgType != 98">
      <TypeCardList :dataList="headArrMinisterial"
                    @clickItem="typeCardClick"
                    :isCanClick="roleConfig.isTypeCardCanClick"
                    v-if="roleConfig.isShowTypeCardBox && headArrMinisterial.length > 0"></TypeCardList>
      <div class="__cm-1__">
        <div class="__county-db__">

          <ContainerBox title="待办事项"
                        icon="booktime">
            <NeedDoCardList v-if="copyagencylist.length > 0"
                            :dataList="copyagencylist"
                            @itemClick="goNeedDopage"
                            :lineCount="5"></NeedDoCardList>
            <EmptyData v-else></EmptyData>
          </ContainerBox>
          <ContainerBox title="业务办理情况"
                        icon="yewu">
            <!-- v-if="roleConfig.isShowCountyMonthBox || orgType == 99 || orgType == 98" -->
            <MonthChangeCardList :dataList="headArrMinisterial"></MonthChangeCardList>
          </ContainerBox>
        </div>
        <ContainerBox title="消息提醒"
                      icon="message"
                      class="__county-msg__">
          <div class="__county-msg-box__">
            <Message :data="messageList"
                     v-if="messageList.length>0"
                     @itemClick="goMessagePage"></Message>
            <div v-if="messageList.length<=0"
                 class="_noData_">暂无数据</div>
          </div>
        </ContainerBox>
      </div>
    </div>
    <div class="__county-main-spec__"
         v-if="areaLevel==4|| orgType == 99 || orgType == 98">
      <div class="__cms-box1__">
        <ContainerBox title="数据统计"
                      icon="yewu">
          <TypeCardList2 :dataList="headArrMinisterial"
                         @clickItem="typeCardClick"
                         :isCanClick="roleConfig.isTypeCardCanClick"
                         v-if="headArrMinisterial.length > 0"
                         :lineCount="3"></TypeCardList2>
        </ContainerBox>
        <ContainerBox title="业务办理情况"
                      icon="yewu">
          <div class="__cms-box1-mr__">
            <MonthChangeCardList :dataList="headArrMinisterial"
                                 :lineCount="6"
                                 :height="228"></MonthChangeCardList>
          </div>
        </ContainerBox>
      </div>
      <div class="__cms-box2__">
        <ContainerBox title="待办提示"
                      icon="yewu">
          <NeedDoCardList v-if="copyagencylist.length > 0"
                          :dataList="copyagencylist.slice(0, 4)"
                          @itemClick="goNeedDopage"
                          :lineCount="2"
                          :height="116"></NeedDoCardList>
          <div v-if="copyagencylist.length <=0"
               class="_noData_">暂无数据</div>

        </ContainerBox>
        <ContainerBox title="消息提醒"
                      icon="message"
                      class="__cms-box2-msg__">
          <div class="__cms-box2-msg-box__">
            <Message v-if="messageList.length>0"
                     :data="messageList"
                     @itemClick="goMessagePage"></Message>
            <div v-if="messageList.length<=0"
                 class="_noData_">暂无数据</div>

          </div>

        </ContainerBox>
      </div>
    </div>
    <ta-modal :visible="visible"
              centered
              :maskClosable="false"
              @cancel="handleCancel"
              width="1000px">
      <template slot="title">
        <div style="text-align:center;height:30px;line-height:30px">督办消息提醒
        </div>
      </template>
      <template slot="footer">
        <div style="text-align:center">
          <ta-button key="submit"
                     type="primary"
                     @click="handleOk">
            关闭
          </ta-button>
        </div>
      </template>
      <div v-if="roleConfig.type === 'ministerial'">
        <div class="power">
          <p>【督办提醒】：有超七天未更新数据的区域，请到维护情况统计处理具体情况，督办其及时跟新！
            <a href="javascript:;"
               @click="lookClick('1')">查看</a>
          </p>
        </div>
      </div>
      <div v-if="roleConfig.type === 'province' &&orgType!='99'&&orgType!='98'">
        <div class="borderBox">
          <p>【审批提醒】</p>
          <p v-if="OverSeeOverAgeReturnVo.downOrgNoApprovalResult">
            {{OverSeeOverAgeReturnVo.downOrgNoApprovalResult}}超过十五天未审批的事项
            <a href="javascript:;"
               @click="showClick('1')">查看</a>
          </p>
        </div>
        <div class="borderBox">
          <p>【督办提醒】</p>
          <p v-if="OverSeeOverAgeReturnVo.overAgeReturnResult">
            {{OverSeeOverAgeReturnVo.overAgeReturnResult}}有未处理的超龄儿童，请督办其及时处理！
            <a href="javascript:;"
               @click="showClick('2')">查看</a>
          </p>
        </div>
      </div>
      <div v-if="roleConfig.type === 'county'&& areaLevel!=4&& orgType !=99 &&orgType != 98">
        <div class="borderBox">
          <p>【超龄提醒】</p>
          <p>
            <span v-if="OverSeeOverAgeReturnVo.noOverAgeReturnResult">有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('2')">{{OverSeeOverAgeReturnVo.noOverAgeFactReturnResult}}个</a>即将超龄事实无人抚养儿童</span>
            <span v-if="OverSeeOverAgeReturnVo.noOverAgeReturnResult">，有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('3')">{{OverSeeOverAgeReturnVo.noOverAgeReturnResult}}个</a>即将超龄孤儿，</span>请及时处理！
          </p>
        </div>
        <div class="borderBox">
          <p>【督办提醒】</p>
          <p v-if="OverSeeOverAgeReturnVo.overAgeReturnResult">
            {{OverSeeOverAgeReturnVo.overAgeReturnResult}}有未处理的超龄儿童，请督办其及时处理！
            <a href="javascript:;"
               @click="showClick('2')">查看</a>
          </p>
        </div>
        <div>
          <p class="infoMes">请您及时维护本辖区孤儿基本生活费申请、明天计划、孤儿助学等情况</p>
        </div>
      </div>
      <div v-if="orgType == 99">
        <div class="borderBox">
          <p>【超龄提醒】：</p>
          <p>
            <span v-if="OverSeeOverAgeReturnVo.noOverAgeReturnResult">有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('2')">{{OverSeeOverAgeReturnVo.noOverAgeFactReturnResult}}个</a>即将超龄事实无人抚养儿童</span>
            <span v-if="OverSeeOverAgeReturnVo.noOverAgeReturnResult">，有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('3')">{{OverSeeOverAgeReturnVo.noOverAgeReturnResult}}个</a>即将超龄孤儿，</span>请及时处理！
          </p>
        </div>
      </div>
      <div v-if="areaLevel==4 || orgType == 98">
        <div class="borderBox">
          <p>【超龄提醒】：</p>
          <p>
            <span>有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('2')">{{OverSeeOverAgeReturnVo.noOverAgeFactReturnResult}}个</a>即将超龄事实无人抚养儿童</span>
            <span v-if="OverSeeOverAgeReturnVo.noOverAgeReturnResult">，有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('3')">{{OverSeeOverAgeReturnVo.noOverAgeReturnResult}}个</a>即将超龄孤儿</span>
            ，请及时处理！
          </p>
        </div>
      </div>
      <div>
        <p style="text-align:center">
          <input type="checkbox"
                 width="14px"
                 @change="changeHuey"
                 height="14px"
                 id="huey">
          <label for="huey"
                 style="font-size:16px;font-weight:500">当天不再提醒</label>
        </p>
      </div>
    </ta-modal>

    <ta-modal :visible="visible1"
              centered
              :maskClosable="false"
              @cancel="handleCancel1"
              width="1000px">
      <template slot="title">
        <div style="text-align:center;height:30px;line-height:30px">儿童数量
        </div>
      </template>
      <template slot="footer">
        <div style="text-align:center">
        </div>
      </template>
      <ta-table class="tableWidth"
                :columns="tableColumns"
                :dataSource="mixDataList"
                :scroll="{ x: 900, y: 500 }">
      </ta-table>
    </ta-modal>

    <!-- 系统公告弹窗 -->
    <ta-modal :visible="isShowNoticeModal"
              centered
              :maskClosable="false"
              @cancel="onCloseNoticeModal"
              width="1000px">
      <template slot="title">
        <div style="text-align:center;height:30px;line-height:30px">{{noticeObj.title || '公告'}}
        </div>
      </template>
      <template slot="footer">
        <div style="text-align:center">
          <ta-button key="submit"
                     type="primary"
                     @click="onCloseNoticeModal">
            关闭
          </ta-button>
        </div>
      </template>
      <div id="container-notice">
        <!-- <div class="wrap-title">{{noticeObj.title || '标题'}}</div> -->
        <div class="wrap-content"
             v-html="noticeObj.content"></div>
        <div class="wrap-file">
          <div class="file-label">附件：</div>
          <ta-upload :withCredentials="true"
                     :multiple="true"
                     name="file"
                     action=""
                     :data="{}"
                     :fileList="noticeObj.fileList"
                     :disabled="true"
                     @preview="handlePreview">
            <div style="textIndent: 0;">
              {{!noticeObj.fileList || !noticeObj.fileList.length ? '暂无' : ''}}
              <!-- <ta-button :disabled="true">
              <ta-icon type="upload" />上传
            </ta-button> -->
            </div>
          </ta-upload>
        </div>
        <div class="wrap-input">
          <input type="checkbox"
                 width="14px"
                 @change="onChangeNotRemind"
                 height="14px"
                 id="huey">
          <label for="huey"
                 style="font-size:16px;font-weight:500">当天不再提醒</label>
        </div>
      </div>
    </ta-modal>

  </div>
</template>
<script>
// 明天 父框 加载完  登录系统得不到
import $ from 'jquery'
import Vue from 'vue'
import '@yh/ta404-ui'

import './demo-center.css'

import mapjs from './js/map.json'
import cookies from './js/cookie.js'
import TypeCardList from './components/TypeCardList'
import ContainerBox from './components/ContainerBox'
import RankList from './components/RankList'
import SexRatio from './components/SexRatio'
import waitdo from './components/waitdo'
import Message from './components/message'
import HealthEcharts from './components/HealthEcharts'
import sexEcharts from './components/sexEcharts'
import EduEcharts from './components/EduEcharts'
import NeedDoCardList from './components/NeedDoCardList'
import MonthChangeCardList from './components/MonthChangeCardList'
import EmptyData from './components/EmptyData'
import TrendEcharts from './components/TrendEcharts'
import TypeCardList2 from './components/TypeCardList2'
import appGLY from './worktableGLY.vue'

// 引入公告业务
import notice from './mixins/notice'

export default {
  name: 'index',
  mixins: [notice],
  components: {
    TypeCardList,
    ContainerBox,
    RankList,
    SexRatio,
    HealthEcharts,
    EduEcharts,
    NeedDoCardList,
    MonthChangeCardList,
    waitdo,
    Message,
    sexEcharts,
    EmptyData,
    TrendEcharts,
    TypeCardList2
  },
  data () {
    const _self = this
    window.sendMsg = function () {
      _self.getMessage()
    }
    return {
      orShow: true,
      visible: false,
      visible1: false,
      changeData: false,
      series1: [],
      sexEchartsList: [],
      mixDataList: [],
      currentType: '', // 当前显示类型
      indexP: 0,

      numberTip: 10,
      items: {},
      OverSeeOverAgeReturnVo: [],
      // 数据
      dataAll: {
        degreeeducationCounts: [
          {
            typeName: '学龄前',
            childRatio: 0
          },
          {
            typeName: '小学',
            childRatio: 0
          },
          {
            typeName: '其他',
            childRatio: 0
          }
        ]
      },
      url: '',
      item: {},
      areaId: '',
      // 教育分析
      educationdate: {
        columns: ['typeName', 'childNum'],
        rows: [
          {
            areaId: null,
            areaName: null,
            typeName: '学龄前',
            childNum: 0,
            childRatio: 0
          },
          {
            areaId: null,
            areaName: null,
            typeName: '小学',
            childNum: 0,
            childRatio: 0
          },
          {
            areaId: null,
            areaName: null,
            typeName: '初中',
            childNum: 0,
            childRatio: 0
          },
          {
            areaId: null,
            areaName: null,
            typeName: '高中',
            childNum: 0,
            childRatio: 0
          },
          {
            areaId: null,
            areaName: null,
            typeName: '大中专及以上',
            childNum: 0,
            childRatio: 0
          },
          {
            areaId: null,
            areaName: null,
            typeName: '其他',
            childNum: 0,
            childRatio: 0
          }
        ]
      },
      // 健康分析
      ringdata: {
        // columns: ['lessOne', 'oneToThree', 'fourToFix', 'sevenToTen', 'elevenToEighteen', 'greaterEighteen'],
        columns: ['typeName', 'childNum'],
        rows: [
          {
            areaId: null,
            areaName: null,
            typeName: '健康',
            childNum: 0,
            childRatio: 0
          },
          {
            areaId: null,
            areaName: null,
            typeName: '非健康',
            childNum: 0,
            childRatio: 0
          }
        ]
      },
      // 趋势分析
      chartDataqushi: {
        columns: ['typeName', 'childNum'],
        rows: [
          {
            areaId: null,
            areaName: null,
            typeName: '2020-01',
            childNum: 0,
            childRatio: null
          },
          {
            areaId: null,
            areaName: null,
            typeName: '2020-02',
            childNum: 0,
            childRatio: null
          },
          {
            areaId: null,
            areaName: null,
            typeName: '2020-03',
            childNum: 0,
            childRatio: null
          }
        ]
      },
      // 消息列表
      messageList: [],
      // 待办事项
      copyagencylist: [],

      cityName: '',
      areaIdForMap: '',
      chartData: {
        columns: ['areaName', 'childNum'],
        rows: []
      },
      // 顶级块业务
      headArrMinisterial: [
        {
          configType: 2,
          configTitle: '留守儿童',
          configAdress: '',
          configQueryAdress: 0,
          configIcon: null,
          sortNum: 1,
          childTotalNum: 0,
          thisMonthChildNUm: 0
        }

      ],
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'orgName',
          align: 'center',
          width: '30%'
        },
        {
          title: '儿童类型',
          dataIndex: 'childTypeName',
          align: 'center',
          width: '30%'
        },
        {
          title: '儿童姓名',
          dataIndex: 'name',
          align: 'center',
          width: '40%'
        }
      ],
      series: [],

      cityCode: 100000,
      citySelect: null,
      districtSelect: null,
      geoJsonData: '',
      echartsMap: null,
      uimap: null,
      opts: {},
      areaData: {},
      mapData: [],
      codeList: [],
      isCodeListLoadComplete: false, // codeList是否全部获取完毕
      cityNamemap: '中国',
      mapset: null,
      district: null,
      areaLevel: '',
      curCityName: '',
      orgType: '',
      cookieName: window.parent.indexTool.getUserInfo().loginId,
      userid: window.parent.indexTool.getUserInfo().userId
    }
  },
  computed: {
    sexEchartsData () {
      return {
        columns: ['areaName', '男', '女', '未采集'],
        rows: this.sexEchartsList
      }
    },
    roleConfig () {
      const o = {
        isShowTypeCardBox: false,
        isTypeCardCanClick: false,
        isShowMainBox: false,
        isShowMessageBox: false,
        isShowCountyMonthBox: true,
        type: 'none'
      }
      const areaLevel = parseInt(this.areaLevel)

      switch (areaLevel) {
        case 0:
          o.isShowTypeCardBox = true
          o.isTypeCardCanClick = true
          o.isShowMainBox = true
          o.isShowMessageBox = false
          o.type = 'ministerial'
          break
        case 1:
        case 2:
          o.isShowTypeCardBox = true
          o.isTypeCardCanClick = true
          o.isShowMainBox = true
          o.isShowMessageBox = false
          o.type = 'province'
          break
        case 3:
        case 4:
          o.isShowTypeCardBox = true
          o.isTypeCardCanClick = false
          o.isShowMainBox = false
          o.isShowMessageBox = true
          o.type = 'county'
          break
      }
      if (areaLevel === 3) {
        o.isShowCountyMonthBox = false
      }
      return o
    }
  },
  mounted () {
    if (this.orShow) {
      this.getMessage()
      this.tryGet()
      this.serversPass()
      this.getCode()
      // this.showOverSee()
    }
    // this.mapInit()

    this.fetchNoticeData()

  },
  methods: {
    changeHuey (e) {
      this.changeData = e.target.checked
    },
    // 弹窗取消
    handleCancel () {
      if (this.changeData) {
        cookies.setCookie(this.cookieName, this.userid)
      } else {
        cookies.removeCookie(this.cookieName)
      }
      this.visible = false
    },
    // 弹窗取消
    handleCancel1 () {
      this.visible1 = false
    },
    setContainer () {
      return document.getElementById('content')
    },
    handleOk () {
      if (this.changeData) {
        cookies.setCookie(this.cookieName, this.userid)
      } else {
        cookies.removeCookie(this.cookieName)
      }
      this.visible = false
    },
    async showOverSee () {
      if (cookies.getCookie(this.cookieName) == this.userid) {
        this.visible = false
      } else {
        const res = await this.post('/overseeApi/overSeeWorkTable')
        this.OverSeeOverAgeReturnVo = res.data.data
        if (JSON.stringify(this.OverSeeOverAgeReturnVo) == '{}') {
          this.visible = false
        } else {
          this.visible = true
        }
      }
    },
    showClick (val) {
      this.visible1 = true
      if (this.OverSeeOverAgeReturnVo.overAgeChildList && val == '2') {
        this.mixDataList = this.OverSeeOverAgeReturnVo.overAgeChildList
      }
      if (this.OverSeeOverAgeReturnVo.downOrgNoApprovalList && val == '1') {
        this.mixDataList = this.OverSeeOverAgeReturnVo.downOrgNoApprovalList
      }
    },
    lookClick (val) {
      const obj1 = {
        id: '1000000000000297830',
        url: 'children.html#/maintenanceStatistics',
        name: '维护情况统计'
      }
      const obj2 = {
        id: '1000000000000270603',
        url: 'children.html#/infoOverageTips?todoFlag=2',
        name: '超龄管理'
      }
      const obj3 = {
        id: '1000000000000253673',
        url: 'children.html#/overageTips?todoFlag=2',
        name: '超龄管理'
      }
      if (val == '1') {
        Base.openTabMenu(obj1)
      }
      if (val == '2') {
        Base.openTabMenu(obj2)
      }
      if (val == '3') {
        Base.openTabMenu(obj3)
      }
    },
    tryGet () {
      const areaLevel = parseInt(window.parent.indexTool.getUserInfo().areaLevel)
      this.orgType = window.parent.indexTool.getUserInfo().orgType
      if (isNaN(areaLevel)) {
        setTimeout(() => {
          this.tryGet()
        }, 500)
      } else {
        if (areaLevel >= 0 && areaLevel <= 4) {
          this.areaLevel = areaLevel
        }
      }
    },
    // mapInit () {
    //   this.echartsMap = this.$echarts.init(document.getElementById('map'))
    //   this.echartsMap.on('click', this.echartsMapClick)
    //   this.$echarts.registerMap('china', mapjs)
    //   var option = {
    //     visualMap: {
    //       show: true,
    //       bottom: '2%',
    //       left: '2%',
    //       text: ['高', '低'],
    //       min: 0,
    //       max: 10,
    //       inRange: { color: ['#fff', '#90CBF2', 'rgba(23, 134, 238, 0.73)'] },
    //       pieces: [
    //         { max: 1, color: 'rgb(197, 227, 255)' },
    //         { min: 1, max: 2 },
    //         { min: 2, max: 10 },
    //         { min: 10, max: 15 },
    //         { min: 15, max: 20 },
    //         { min: 20, max: 30 },
    //         { min: 30, max: 40 },
    //         { min: 40, max: 50 },
    //         { min: 50, max: 200 },
    //         { min: 200 }
    //       ],
    //       calculable: true
    //     },
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: function (item) {
    //         if (item.name == '南海诸岛') {
    //           return ''
    //         } else {
    //           const value = isNaN(item.value) ? 0 : item.value
    //           return item.name + '<br>地区人数：' + value + ' 个'
    //         }
    //       }
    //     },
    //     grid: {
    //       top: '5px',
    //       left: '5px',
    //       right: '5px',
    //       bottom: '5px'
    //     },
    //     series: [
    //       {
    //         name: '地区人数',
    //         type: 'map',
    //         aspectScale: 0.75,
    //         zoom: 1.2,
    //         geoIndex: 0,
    //         roam: false,
    //         mapType: 'china',
    //         selectedMode: 'single',
    //         showLegendSymbol: false,
    //         visibility: 'off',
    //         itemStyle: {
    //           normal: {
    //             color: '#ccc',
    //             borderColor: '#21212f',
    //             areaColor: '#ffffff',
    //             borderWidth: 0.5,
    //             label: {
    //               show: true,
    //               textStyle: {
    //                 color: '#003767'
    //               }
    //             }
    //           },
    //           emphasis: {
    //             areaColor: '#4382F6',
    //             borderColor: '#fff',
    //             areaStyle: {
    //               color: '#fff'
    //             },
    //             label: {
    //               show: true,
    //               textStyle: {
    //                 color: '#003767'
    //               }
    //             }
    //           }
    //         }
    //       }
    //     ]
    //   }
    //   this.echartsMap.setOption(option)
    // },
    async echartsMapClick (params) {
      if (params.data.value === 0) return
      // 地图点击事件
      if (params.data.level != 'district') {
        this.cityName = params.name
        this.$ba.trackEvent('echartsMap', '点击地图', `${params.data.name}-${params.data.cityCode}`)
        if (params.data.level == 'street') return
        this.cityNamemap = params.data.name
        this.cityCode = params.data.cityCode
        this.district.setExtensions('all')
        const code = params.data.cityCode + '000000'

        await this.clickStatistics(this.items, code, params)
      }
    },
    loadMapData (areaCode) {
      if (areaCode.length > 6) {
        areaCode = areaCode.substring(0, 6)
      }
      AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
        var districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: true, // 打开事件支持
          map: this.mapset
        }))
        districtExplorer.loadAreaNode(areaCode, (error, areaNode) => {
          if (error) {
            return
          }
          const mapJson = {}
          mapJson.features = areaNode.getSubFeatures() || []

          this.loadMap(this.cityNamemap, mapJson)

          this.chartData = mapJson
        })
      })
    },
    loadMap (mapName, data = { features: [] }, isTure) {
      !data.features && (data.features = [])
      if (data) {
        // mapName = 'china'
        if (mapName == '中国' || mapName == '') {
          mapName = 'china'
        }

        if (this.indexP < 1) {
          this.china()
          this.indexP++
        }
        if (mapName == 'china') {
          data = mapjs
        }
        this.$echarts.registerMap(mapName, data)
        var option = {
          visualMap: {
            show: true,
            bottom: '2%',
            left: '2%',
            text: ['高', '低'],
            min: 0,
            max: parseInt(this.numberTip) == 0 ? 100 : parseInt(this.numberTip),
            inRange: { color: ['#fff', '#90CBF2', 'rgba(23, 134, 238, 0.73)'] },
            pieces: [
              { max: 1, color: 'rgb(197, 227, 255)' },
              { min: 1, max: 2 },
              { min: 2, max: 10 },
              { min: 10, max: 15 },
              { min: 15, max: 20 },
              { min: 20, max: 30 },
              { min: 30, max: 40 },
              { min: 40, max: 50 },
              { min: 50, max: 200 },
              { min: 200 }
            ],
            calculable: true
          },
          tooltip: {
            trigger: 'item',
            formatter: function (item) {
              if (item.name == '南海诸岛') {
                return ''
              } else {
                return item.name + '<br>地区人数：' + item.value + ' 个'
              }
            }
          },
          grid: {
            top: '5px',
            left: '5px',
            right: '5px',
            bottom: '5px'
          },
          series: [
            {
              name: '地区人数',
              type: 'map',
              aspectScale: 0.75,
              zoom: 1.2,
              geoIndex: 0,
              roam: false,
              mapType: mapName,
              selectedMode: 'single',
              showLegendSymbol: false,
              visibility: 'off',
              itemStyle: {
                normal: {
                  color: '#ccc',
                  borderColor: '#21212f',
                  areaColor: '#d4f7fc',
                  borderWidth: 0.5,
                  label: {
                    show: true,
                    textStyle: {
                      color: '#003767'
                    }
                  }
                },
                emphasis: {
                  areaColor: '#4382F6',
                  borderColor: '#fff',
                  areaStyle: {
                    color: '#fff'
                  },
                  label: {
                    show: true,
                    textStyle: {
                      color: '#003767'
                    }
                  }
                }
              },
              data: this.mapData
            }
          ]
        }
        if (mapName == '海南省') {
          option.series[0].center = [109.844902, 19.0392]
          option.series[0].layoutCenter = ['50%', '50%']
          option.series[0].layoutSize = '600%'
        } else {
          option.series[0].center = undefined
          option.series[0].layoutCenter = undefined
          option.series[0].layoutSize = undefined
        }
        if (this.echartsMap) {
          this.echartsMap.setOption(option)
        }
      }
    },
    async getData (data, level, adcode) {
      // 清空下一级别的下拉列表
      if (level === 'province') {
        this.citySelect.innerHTML = ''
        this.districtSelect.innerHTML = ''
      } else if (level === 'city') {
        this.districtSelect.innerHTML = ''
      }
      var subList = data.districtList
      if (subList) {
        var contentSub = new Option('--请选择--')
        var curlevel = subList[0].level

        if (curlevel === 'street') {
          const mapJsonList = this.geoJsonData.features

          const mapJson = {}
          for (const i in mapJsonList) {
            if (mapJsonList[i].properties.name == this.cityNamemap) {
              mapJson.features = [].concat(mapJsonList[i])
            }
          }
          this.mapData = []
          this.mapData.push({
            name: this.cityNamemap,
            value: parseInt(Math.random() * 100),
            level: curlevel
          })
          this.loadMap(this.cityNamemap, mapJson)
          this.geoJsonData = mapJson
          return
        }
        var curList = document.querySelector('#' + curlevel)
        curList.add(contentSub)
        this.mapData = []
        const areaCounts = (this.dataAll && this.dataAll.areaCounts) || []
        this.numberTip = parseInt(areaCounts.length > 0 ? areaCounts[0].childNum : 10)
        for (var i = 0, l = subList.length; i < l; i++) {
          var name = subList[i].name
          var cityCode = subList[i].adcode
          await this.$nextTick(() => {
            this.mapData.push({
              name: name,
              value: (areaCounts.filter((v) => v.typeName === name)[0] || { childNum: 0 }).childNum,
              cityCode: cityCode,
              level: curlevel
            })
          })
          var levelSub = subList[i].level
          contentSub = new Option(name)
          contentSub.setAttribute('value', levelSub)
          contentSub.center = subList[i].center
          contentSub.adcode = subList[i].adcode
          curList.add(contentSub)
        }
        this.loadMapData(adcode)
        this.areaData[curlevel] = curList
      }
    },
    // 业务入口接口
    async serversPass () {
      const res = await this.post('/WorkbenchApi/queryCurrentUserBusinessConfig')
      if (!res.data || res.data.errors) return
      const data = res.data.data
      this.headArrMinisterial = data.statisticalType
      if (data.statisticalType) {
        this.clickStatistics(data.statisticalType[0])
      }

      // 设置当前角色城市 和 地图显示城市
      if (data.areaNameForMap && data.areaIdForMap) {
        this.curCityName = this.cityName =
          data.areaNameForMap == '民政部' ? '中国' : data.areaNameForMap
      }
      const todoType = data.todoType
      const todoTypeTemp = []
      todoType.forEach(async (e) => {
        const temp = {}
        temp.name = e.configTitle
        temp.sortNum = e.sortNum
        temp.id = e.configAdress.split('?')[1]
          ? e.configAdress.split('?')[1].substring(15, e.configAdress.split('?')[1].length)
          : ''
        temp.url = e.configAdress.split('?')[0]
        temp.configIcon = e.configIcon
        if (e.configQueryAdress) {
          temp.noDoCount = await this.getNum(e)
        }
        todoTypeTemp.push(temp)
        setTimeout(() => {
          todoTypeTemp.sort((a, b) => {
            return a.sortNum - b.sortNum
          })
        }, 50)
      })
      this.$nextTick(() => {
        this.copyagencylist = todoTypeTemp
      })
      if (document.getElementById('map')) {
        this.echartsMap = this.$echarts.init(document.getElementById('map'))
        this.echartsMap.on('click', this.echartsMapClick)
      }
    },
    async typeCardClick (item) {
      await this.clickStatistics(item)
      if (this.roleConfig.type === 'ministerial') {
        this.china()
      }
    },
    async getTypeEcharts (item) {
      if (!item) return
      if (this.roleConfig.type !== 'province') return
      let childType = 0
      switch (item.configTitle) {
        case '留守儿童':
          childType = 400
          break
        case '留守妇女':
          childType = 500
          break
        case '散居孤儿':
          childType = 201
          break
        case '事实无人抚养儿童':
          childType = 120
          break
        case '孤儿':
          childType = 666
          break
        case '福利机构抚养孤儿':
          childType = 202
          break
      }
      if (childType != 0) {
        const url = '/ministryStatisticsApi/queryPersonNumsBySexAndArea?childType=' + childType
        const res = await this.post(url)
        if (!res.data || res.errors) return
        const list = res.data.data.length > 0 ? res.data.data : []
        const ls = []
        const man = []
        const wman = []
        const Other = []
        list.forEach((item) => {
          const temp = {
            areaName: item.areaName,
            男: item.manCount,
            女: item.womanCount,
            未采集: item.sexOtherCount
          }
          ls.push(temp)
          man.push(item.manCount)
          wman.push(item.womanCount)
          Other.push(item.sexOtherCount)
        })
        this.series1 = [{
          name: '男',
          type: 'bar',
          barWidth: '30%',
          stack: '数量',
          data: man
        },
        {
          name: '女',
          type: 'bar',
          barWidth: '30%',
          stack: '数量',
          data: wman
        },
        {
          name: '未采集',
          type: 'bar',
          barWidth: '30%',
          stack: '数量',
          data: Other
        }

        ]
        this.sexEchartsList = ls
      }
    },
    // 业务点击事件
    async clickStatistics (item, areaId, par) {
      this.getTypeEcharts(item)
      this.currentType = item.configTitle
      this.chartDataqushi.rows = []
      this.chartData.rows = []
      let param = {}

      this.items = item
      if (areaId != '') {
        param = {
          areaId: areaId
        }
      }

      if (item) {
        this.url = item.configAdress
        if (this.url) {
          const data = await this.post(this.url, param)
          this.dataAll = data.data.data
          this.educationdate.rows =
            this.dataAll.degreeeducationCounts.length > 0
              ? this.dataAll.degreeeducationCounts
              : [{ typeName: '暂无数据', childRatio: '' }]
          this.dataAll.areaCounts =
            this.dataAll.areaCounts.length > 0
              ? this.dataAll.areaCounts
              : [{ typeName: '暂无数据', childNum: '', childRatio: '' }]
          this.$nextTick(() => {
            this.dataAll = data.data.data
          })
          this.numberTip = parseInt(
            this.dataAll.areaCounts.length > 0 ? this.dataAll.areaCounts[0].childNum : 10
          )

          this.citySelect = document.getElementById('city')
          this.districtSelect = document.getElementById('district')
          if (document.getElementById('map')) {
            this.echartsMap = this.$echarts.init(document.getElementById('map'))
            this.echartsMap.on('click', this.echartsMapClick)
          }
          this.opts = {
            subdistrict: 1, // 返回下一级行政区
            showbiz: false // 最后一级返回街道信息
          }

          this.district = new AMap.DistrictSearch(this.opts) // 注意：需要使用插件同步下发功能才能这样直接使用
          this.district.search(this.curCityName, (status, result) => {
            // if (status == 'complete') {
            //   this.areaIdForMap = this.areaIdForMap ? this.areaIdForMap.substring(0, 6) : ''
            //   this.getData(result.districtList[0], '', result.districtList[0].adcode)
            // }

            if (par) {
              this.district.search(this.cityCode, (status, result) => {
                if (status === 'complete') {
                  this.getData(result.districtList[0], par.data.level, this.cityCode)
                }
              })
            } else {
              if (status == 'complete') {
                this.areaIdForMap = this.areaIdForMap ? this.areaIdForMap.substring(0, 6) : ''
                this.getData(result.districtList[0], '', result.districtList[0].adcode)
              }
            }
          })

          // this.serversPass()
          // 健康分析
          if (this.dataAll.healthCounts) {
            // 请求回数据后执行加载图表的方法
            // this.health()
            this.ringdata.rows =
              this.dataAll.healthCounts.length > 0
                ? this.dataAll.healthCounts
                : [
                  {
                    areaId: null,
                    areaName: null,
                    typeName: '健康',
                    childNum: 0,
                    childRatio: 0
                  },
                  {
                    areaId: null,
                    areaName: null,
                    typeName: '非健康',
                    childNum: 0,
                    childRatio: 0
                  }
                ]
          }
          // 趋势分析
          if (this.dataAll.trendAnalysis) {
            this.chartDataqushi.rows = this.dataAll.trendAnalysis
          }
          // 地区人数排名
          if (this.dataAll.areaCounts) {
            this.chartData.rows = this.dataAll.areaCounts
          }
        }
      }
    },

    loadData () {
      this.agencylist = []
      this.show = false
      this.showTwo = false
    },

    async getNum (e) {
      const url = '/' + e.configQueryAdress
      let res = null
      if (e) {
        res = await this.post(url)
      }
      return res ? res.data.data : {}
    },

    async china (e) {
      this.indexP == 1 ? this.indexP = 1 : this.indexP = 0
      this.cityName = this.curCityName // '中国'// this.curCityName//
      this.cityNamemap = this.curCityName

      if (document.getElementById('map')) {
        this.echartsMap = this.$echarts.init(document.getElementById('map'))
        this.echartsMap.on('click', this.echartsMapClick)
      }
      this.citySelect = document.getElementById('city')
      this.districtSelect = document.getElementById('district')
      this.opts = {
        subdistrict: 1, // 返回下一级行政区
        showbiz: false // 最后一级返回街道信息
      }
      this.district = new AMap.DistrictSearch(this.opts) // 注意：需要使用插件同步下发功能才能这样直接使用

      if (this.url) {
        //* **************************************** */
        const data = await this.post(this.url) //, param)
        this.dataAll = data.data.data
        await this.$nextTick(() => {
          this.dataAll = data.data.data
        })
        this.educationdate.rows =
          this.dataAll.degreeeducationCounts.length > 0
            ? this.dataAll.degreeeducationCounts
            : [{ typeName: '暂无数据', childRatio: '' }]
        this.dataAll.areaCounts =
          this.dataAll.areaCounts.length > 0
            ? this.dataAll.areaCounts
            : [{ typeName: '暂无数据', childNum: '', childRatio: '' }]
        this.numberTip = parseInt(
          this.dataAll.areaCounts.length > 0 ? this.dataAll.areaCounts[0].childNum : 10
        )

        this.citySelect = document.getElementById('city')
        this.districtSelect = document.getElementById('district')
        if (document.getElementById('map')) {
          this.echartsMap = this.$echarts.init(document.getElementById('map'))
          this.echartsMap.on('click', this.echartsMapClick)
        }
        this.opts = {
          subdistrict: 1, // 返回下一级行政区
          showbiz: false // 最后一级返回街道信息
        }

        this.district = new AMap.DistrictSearch(this.opts) // 注意：需要使用插件同步下发功能才能这样直接使用

        await this.district.search(this.curCityName, (status, result) => {
          if (status == 'complete') {
            this.areaIdForMap = this.areaIdForMap.substring(0, 6)

            this.getData(result.districtList[0], '', result.districtList[0].adcode)
          }
        })
        // 地图渲染
        this.educationdate.rows =
          this.dataAll.degreeeducationCounts.length > 0
            ? this.dataAll.degreeeducationCounts
            : [{ typeName: '暂无数据', childRatio: '' }]
        this.dataAll.areaCounts =
          this.dataAll.areaCounts.length > 0
            ? this.dataAll.areaCounts
            : [{ typeName: '暂无数据', childNum: '', childRatio: '' }]
        this.numberTip = parseInt(
          this.dataAll.areaCounts.length > 0 ? this.dataAll.areaCounts[0].childNum : 10
        )
        // this.serversPass()
        // 健康分析
        if (this.dataAll.healthCounts) {
          // 请求回数据后执行加载图表的方法
          // this.health()
          this.ringdata.rows =
            this.dataAll.healthCounts.length > 0
              ? this.dataAll.healthCounts
              : [
                {
                  areaId: null,
                  areaName: null,
                  typeName: '健康',
                  childNum: 0,
                  childRatio: 0
                },
                {
                  areaId: null,
                  areaName: null,
                  typeName: '非健康',
                  childNum: 0,
                  childRatio: 0
                }
              ]
        }
        // 趋势分析
        if (this.dataAll.trendAnalysis) {
          this.chartDataqushi.rows = this.dataAll.trendAnalysis
        }
        // 地区人数排名
        if (this.dataAll.areaCounts) {
          this.chartData.rows = this.dataAll.areaCounts
        }
        //* ******************************************** */
      }
    },
    // 消息处理
    async getMessage () {
      const res = await this.post('/WorkbenchApi/getMsgListCommon') // 无数据
      this.messageList = res.data.data
      this.messageList.reverse()
    },
    async goMessagePage (item) {
      if (item.msgType == '1') { // 通知公告
        item.id = '1000000000000161797'
        item.url = 'children.html#/contactsMessageList'
        item.name = '通知公告'
        Base.openTabMenu(item)
      } else if (item.msgType == '2') { // 系统消息
        const param = {
          receivePersonId: item.receivePersonId,
          id: item.businessId
        }
        const res = await this.post('/MsgRemindApi/updateNoReadStatusByMsgPerson', param)
        this.getMessage()
        item.url = item.jumpTypeUrl + '&approveStatus=' + item.approveStatus
        Base.openTabMenu(item)
      } else { // 系统升级通知
        const res1 = await this.post('/announcements/querySystemUpgradeMsg', { id: item.id })
        window.parent.notification(res1.data.data)
      }
    },
    // 代办事项
    goNeedDopage (obj, index) {
      const item = {}
      item.id = obj.id
      item.name = obj.name
      item.url = obj.url
      if (item.name == '超龄事实无人抚养儿童') {
        item.url = item.url + '?towork=1'
        item.refresh = true
      }
      if (item.name == '超龄孤儿') {
        item.url = item.url + '?towork=1'
        item.refresh = true
      }
      if (item.name == '孤儿异地申请') {
        item.url = item.url + '?towork=1'
        item.refresh = true
      }
      if (item.name == '父/母服刑/戒毒到期提醒') {
        item.name = '减员申请'
        item.url = item.url + '?workbenchType=1'
        item.refresh = true
      }
      // 所有的url都加上工作台标识 fromWorkTable
      item.url += item.url.includes('?') ? '&fromWorkTable' : '?fromWorkTable'
      this.returnPage(item)
    },
    returnPage (obj) {
      Base.openTabMenu(obj)
    },
    // 未知方法
    async getCode () {
      Base.submit(null, {
        url: 'codetable/getCode', // url
        data: { codeType: 'WORKTABLEJUMP' }
      }).then((data) => { })
    }
  }
}
</script>

<style lang="less">
@import "./less/worktablePage.less";
</style>

<style lang="less">
@import "./less/worktablePage2.less";
</style>
