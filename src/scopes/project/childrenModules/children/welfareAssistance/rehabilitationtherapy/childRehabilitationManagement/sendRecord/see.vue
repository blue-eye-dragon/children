<template>
  <!-- 查看  intbegin -->
  <div class="conts tadrawer">
    <div class="contin">
      <ta-tabs @change="callback"
               :activeKey="intbegin"
               :defaultActiveKey="intbegin">
        <ta-tab-pane v-if="elementary"
                     tab="基本信息"
                     key="7"
                     :forceRender="true">
          <MustInfo :nowYear="nowYear"
                    :pcdata="pcdata"
                    :thisP="this"
                    :notShow="notShow"
                    :ids="helloId"
                    :intbegin.sync="intbegin"
                    @summarizeSave="summarizeSave"
                    ref="basicInfo"></MustInfo>

        </ta-tab-pane>

        <ta-tab-pane tab="体检信息"
                     key="1"
                     :forceRender="true">
          <checkBody :notShow="notShow"
                     :ids="helloId"></checkBody>
        </ta-tab-pane>

        <ta-tab-pane tab="评估信息"
                     key="2"
                     :disabled="addinfoOn"
                     :forceRender="true">
          <assess :notShow="notShow"
                  :ids="helloId"></assess>
        </ta-tab-pane>

        <ta-tab-pane tab="康复训练计划信息"
                     key="4"
                     :disabled="addinfoOn"
                     :forceRender="true">
          <plan :notShow="notShow"
                :ids="helloId"></plan>
        </ta-tab-pane>

        <ta-tab-pane tab="康复训练记录信息"
                     key="5"
                     :disabled="addinfoOn"
                     :forceRender="true">
          <drillRecord :notShow="notShow"
                       :ids="helloId"
                       ref="drillRecord"></drillRecord>
        </ta-tab-pane>

        <ta-tab-pane tab="评估与总结"
                     key="6"
                     :disabled="addinfoOn"
                     :forceRender="true">
          <summarize :notShow="notShow"
                     :ids="helloId"
                     @basicInfoSave="basicInfoSave"
                     ref="summarize"></summarize>
        </ta-tab-pane>

        <ta-tab-pane v-if="toto"
                     tab="服务评价"
                     key="8"
                     :disabled="addinfoOn"
                     :forceRender="true">
          <Servicepic :noEditt="notShow"
                      :idss="helloId"
                      ref="servicepics"></Servicepic>
        </ta-tab-pane>

      </ta-tabs>
    </div>
    <div class="bom">

      <ta-button class="preservation"
                 @click="back">返回</ta-button>
      <ta-button type="primary"
                 v-if="intbegin=='7'||(intbegin=='6'&&!notShow)||(intbegin=='8'&&!helloId)"
                 class="preservation btnleft"
                 @click="save">提交</ta-button>
    </div>
  </div>
</template>
<script>
import checkBody from './seeNeed/checkBody'
import assess from './seeNeed/assess'
import plan from './seeNeed/plan'
import drillRecord from './seeNeed/drillRecord'
import summarize from './seeNeed/summarize'
import MustInfo from './seeNeed/mustInfo'
import Servicepic from '../rehabilitationChildren/servicepic'
import moment from 'moment'

export default {
  components: {
    checkBody,
    assess,
    plan,
    summarize,
    drillRecord,
    MustInfo,
    Servicepic
  },
  data () {
    return {
      intbegin: this.intbegins, // 默认显示第几个
      intbegins: '',
      elementary: false, // 是否显示基本信息卡片 2019年9月24日11:00:25
      page: 1,
      size: 10,
      mixDataList: [],
      mixPageRef: 'gridPager',
      parentId: '',
      parentOrgName: '',
      nowtype: '',
      personOK: true, // 人员编辑false
      basedisabled: false, // 机构信息编辑false
      submitOn: true,
      submitPo: true,
      addinfoOn: false,
      yesNoList: [],
      allDate: [], // 编辑时获取初始数据,
      strr: [],
      addressmodel: [],
      id: '',
      helloId: '',
      notShow: true,
      thatObj: [],
      childType: '', // 名称
      childNumber: '', // 儿童编号
      sex: '', // 性别
      name: '', // 名称
      birthday: '', // 生日
      disabilityType: '', // 残疾类型
      illnessType: '', // 患病类型
      pcdata: [],
      nowYear: '',
      sourceName: '',
      toto: false
    }
  },
  watch: {},
  created () {
    const param = this.$route.query
    if (param.elementary) {
      this.intbegins = '7'
    } else {
      this.intbegins = '1'
      this.elementary = false
      if (param.toto == '1') {
        this.toto = true// 已删除，显示
      } else {
        this.toto = false// 未删除，不显示
      }
    }
    this.intbegin = this.intbegins
  },
  activated () {
    this.room()
    this.getpcdata()
    this.initData() // 初始化数据
    const nowDate = new Date()
    this.nowYear = moment(nowDate).format('YYYY') // + '000'
  },
  mounted () {
    this.intbegin = this.intbegins
    this.getyesNoList() // 是否字典
    this.getfunctionalAreaList()
  },
  methods: {
    // 初始化数据
    initData () {
      this.$refs.summarize.inAllFrom.resetFields()
    },
    // 公共提交
    save () {
      if (this.intbegin == '6') { // 评估与总结
        this.$refs.summarize.checkForm() // 去验证评估与总结表单
      } else if (this.intbegin == '7') { // 基本信息
        this.$refs.basicInfo.save()
      } else if (this.intbegin == '8') { // 服务与评价
        this.$refs.servicepics.save()
      }
    },
    // 评估与总结的提交
    summarizeSave () {
      this.$refs.summarize.save()
    },
    // 基本信息的提交(评估总结过来)
    basicInfoSave () {
      this.$refs.basicInfo.save('summarize')
    },
    // 公共返回
    back () {
      this.$router.go(-1)
    },
    room () {
      const param = this.$route.query
      this.helloId = param.rehabiliteId
      if (param.elementary) {
        // 当前点击数据的康复id
        this.elementary = param.elementary // 是否显示基本信息卡片
        this.notShow = false // 不仅是查看
        this.intbegin = '7' // this.$set()
        this.toto = !this.elementary
      } else {
        this.elementary = false
        this.notShow = true
        this.intbegin = '1'
        if (param.toto == '1') {
          this.toto = true// 已删除，显示
        } else {
          this.toto = false// 未删除，不显示
        }
      }
    },
    async getpcdata () {
      const { data } = await this.post('/pitchManager/getTreeJson')
      this.pcdata = JSON.parse(data.resultData)
    },
    async getfunctionalAreaList () {
      const data = await this.getDictionaries('FUNCTIONALAREA')
      this.functionalAreaList = data
    },
    setadrr () {
      this.checkFrom.setFieldsValue({
        address_Linkage: this.strr
      })
    },

    async getyesNoList () {
      const data = await this.getDictionaries('YESNO')
      this.yesNoList = data
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    callback (key) {
      this.intbegin = key

      if (key == '5') {
        const pa = {
          rehabiliteId: this.helloId
        }
        this.$refs.drillRecord.getDateList()
        this.$refs.drillRecord.getPlan(pa)
        this.$refs.drillRecord.getwayList()
      }
      if (key == '8') {
        const pa = {
          rehabiliteId: this.helloId
        }
        this.$refs.servicepics.getSource(pa)
      }
      if (key == '6') {
        const pa = {
          rehabiliteId: this.helloId
        }
        this.$refs.summarize.getData(pa)
      }
    },

    // 基本信息提交
    async submit () {
      this.checkFrom.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          const params = this.checkFrom.getFieldsValue()
          params.spell = this.Base.pinyin.getCamelChars(params.orgName)
          this.changetime(params)

          if (this.nowtype == 1) {
            // 新增
            url = '/welfareOrgManagement/save'

            text = '增加成功'
          } else {
            // 编辑
            text = '修改成功'
            url = '/welfareOrgManagement/update'
            params.id = this.id
          }
          const data = await this.post(url, params)

          if (data.errors === null) {
            this.$message.success(text)
            this.onClose()
          }
        }
      })
    },

    onClose () {
      this.$router.go(-1)
    },
    // 数据处理
    changetime (data) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
        // 是数组  数组元素为对象
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
        // 是数组  数组元素不为对象
        if (data[k] instanceof Array && !(data[k][0] instanceof Object)) {
          if (k == 'address_Linkage') {
            data.province = data[k][0]
            data.city = data[k][1]
            data.county = data[k][2]
            delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.but {
  margin: 10px;
}
</style>
