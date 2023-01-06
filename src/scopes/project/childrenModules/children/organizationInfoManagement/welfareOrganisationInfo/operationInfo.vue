<template>
  <div class="conts">
    <div class="contin  ">
      <!-- <registrationOfEstablishment v-if=""></registrationOfEstablishment> -->
      <ta-tabs :activeKey="nowkey"
               @change="callback"
               class="tabout"
               type="card">

        <ta-tab-pane tab="机构信息"
                     key="1"
                     :forceRender="true">
          <ta-form :autoFormCreate="(orgFrom)=>{this.orgFrom = orgFrom}">
            <insInfo :isAdr="isAdr"
                     @setFrom="setFrom"
                     :yesNoList="yesNoList"
                     :basedisabled="basedisabled"
                     @clearData="clearData"
                     :newLins.sync='newLinsss'
                     :thisP="this"></insInfo>
            <!--  -->
          </ta-form>
        </ta-tab-pane>

        <ta-tab-pane tab="人员信息"
                     key="2"
                     :disabled="addinfoOn"
                     :forceRender="true"
                     v-model="person">
          <ta-form :autoFormCreate="(personFrom)=>{this.personFrom = personFrom}">
            <personnel :personOK="personOK"
                       ref="knone"></personnel>
          </ta-form>
        </ta-tab-pane>
        <ta-tab-pane tab="人员历史记录"
                     key="3"
                     :disabled="addinfoOn"
                     :forceRender="true">
          <personLog :idd="id"></personLog>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 v-if="isFromSearch"
                 @click="backsSearch">返回</ta-button>
      <ta-button class="btnleft"
                 v-if="!isFromSearch"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="but"
                 @click="submit"
                 v-if="this.nowkey!='3'&&!basedisabled">提交</ta-button>
    </div>
  </div>
</template>
<script>
import InsInfo from './insInfo'
import Personnel from './personnel'
import PersonLog from './personLog'
import moment from 'moment'
// import registrationOfEstablishment from '../../welfareAuthorityRegulation/organizationManagement/registrationOfEstablishment/registrationOfEstablishment.vue'
export default {
  components: {
    InsInfo,
    Personnel,
    PersonLog
    // registrationOfEstablishment
  },
  data () {
    return {
      page: 1,
      size: 10,
      mixDataList: [],
      // mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      person: '',
      parentId: '',
      parentOrgName: '',
      nowtype: '',
      orgType: '',
      personOK: true, // 人员编辑false
      basedisabled: false, // 机构信息编辑false
      addinfoOn: false,
      yesNoList: [],
      allDate: [], // 编辑时获取初始数据,
      addressmodel: [],
      id: '',
      isAdr: true,
      havespell: [], // 拥有功能区域
      dallspell: [], // 无障碍区域
      registId: '',
      newLinsss: false,
      nowkey: '1', // 当前tab页,
      isFromSearch: false,
      formDataSearch: {}
    }
  },
  activated () {
    const that = this
    that.nowkey = '1'
    this.isshow = false
    this.isFromSearch = false
    this.formDataSearch = {}
    const param = that.$route.query
    that.parentOrgName = param.parentOrgName
    that.parentId = param.parentId
    that.nowtype = param.nowtype
    that.orgType = param.orgType // 2019年12月3日11:00:51 福利院 99；
    that.id = param.id
    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)

      this.isFromSearch = this.$route.query.isFromSearch
    }
    if (that.nowtype == 1) {
      that.isAdr = false
      that.personOK = true
      that.basedisabled = false
      that.addinfoOn = true
      that.orgFrom.setFieldsValue({
        parentOrgId: that.parentId,
        parentOrgName: that.parentOrgName ? that.parentOrgName : '无'
      })
    } else {
      this.getallData(that.id)
    }
  },
  mounted () {
    this.getyesNoList() // 是否字典
    this.getfunctionalAreaList()
  },
  methods: {
    // tab切换时的change方法
    callback (e) {
      this.nowkey = e
      const persontabs = this.$refs.knone
      persontabs.showone = true
      persontabs.showtwo = true
      persontabs.showthree = true
      persontabs.showfour = true
      persontabs.setHeight('one', 'oneout')
      persontabs.setHeight('two', 'twoout')
      persontabs.setHeight('three', 'threeout')
      persontabs.setHeight('four', 'fourout')
    },
    zdxyContrs (v) {
      this.newLinsss = v
    },
    setFrom (obj) {
      this.registId = obj.id
      // 2020年3月8日18点43分
      obj.welfareOrgId = obj.taorgId
      // 2019年12月16日14:56:44
      obj.taorgId = obj.parentId
      obj.orgId = window.parent.indexTool.getUserInfo().orgId
      // 需求变动2019年12月3日14:27:29
      this.$nextTick(() => {
        this.orgFrom.setFieldsValue(obj)
        this.orgFrom.setFieldsValue({ parentName: obj.parentName ? obj.parentName : '无数据' })
      })
    },

    async getfunctionalAreaList () {
      const data = await this.getDictionaries('FUNCTIONALAREA')
      this.functionalAreaList = data
    },
    // 清空
    clearData () {
      this.orgFrom.setFieldsValue({
        identificationOrgName: null,
        identificationOrgCode: null,
        identificationDate: null
      })
    },
    async getallData (ids) {
      // 数据加载获取
      this.isAdr = true
      const that = this
      that.addinfoOn = false
      const paramEdit = {
        id: ids
      }
      const allData = await this.post(
        '/welfareOrgManagement/queryInfoForEdit',
        paramEdit
      )

      const { data } = allData.data
      that.allDateEdit = JSON.parse(JSON.stringify(data))
      this.newLinsss = (data.rehabilitationCenterYOrN == '1')

      const onespell = data.havingFunctionalAreas // 拥有功能区域
      this.havespell = onespell ? onespell.split(',') : []
      const twospell = data.accessibilityEnvironment // 拥有功能区域
      this.dallspell = twospell ? twospell.split(',') : []

      if (that.nowtype == 3) {
        // 查看
        that.personOK = true
        that.basedisabled = true
        // this.newLinsss = false
      }

      if (that.orgType == '99' && that.nowtype == 2) {
        // 福利院编辑
        that.personOK = false // 人员可编辑
        that.basedisabled = false // 机构信息可编辑
      }

      if (that.orgType != '99' && that.nowtype == 2) {
        // 民政局编辑
        that.personOK = true // 人员不可编辑
        that.basedisabled = true // 机构信息不可编辑
      }

      if (that.nowtype == 2 || that.nowtype == 3) {
        // 显示机构信息数据
        that.$nextTick(() => {
          data.havingFunctionalAreas = this.havespell
          data.accessibilityEnvironment = this.dallspell
          data.businessLicenseIssueDate = data.businessLicenseIssueDate ? moment(data.businessLicenseIssueDate) : null
          data.foundDate = data.foundDate ? moment(data.foundDate) : null
          data.businessLicenseExpirationDate = data.businessLicenseExpirationDate ? moment(data.businessLicenseExpirationDate) : null
          data.identificationDate = data.identificationDate ? moment(data.identificationDate) : null

          if (data.foodBusinessLicenseIssueDate) {
            data.foodBusinessLicenseIssueDate = data.foodBusinessLicenseIssueDate ? moment(data.foodBusinessLicenseIssueDate) : null
          }
          if (data.foodBusinessLicenseExpirationDate) {
            data.foodBusinessLicenseExpirationDate = data.foodBusinessLicenseExpirationDate ? moment(data.foodBusinessLicenseExpirationDate) : null
          }
          that.orgFrom.setFieldsValue(data)
          // 如果存在机构人员信息数据则显示
          data.welfOrgId = that.id
          if (data.birthday) {
            data.birthday = data.birthday ? moment(data.birthday) : null
          }
          that.personFrom.setFieldsValue(data)

          // 如果是否残联定点康复中心为否 则清空认定机构名称、认定机构编码认定日期数据
          if (!this.newLinsss) {
            this.clearData()
          }
        })
      }
    },

    async getyesNoList () {
      const data = await this.getDictionaries('YESNO')
      this.yesNoList = data
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    backs () {
      // this.nowtype = ''
      this.orgFrom.resetFields()
      this.personFrom.resetFields()
      this.$router.go(-1)
    },
    backsSearch () {
      this.$router.push({
        path: this.formDataSearch.pathUrl,
        query: {
          isFromSearch: true,
          formDataSearch: this.formDataSearch
        }
      })
    },
    // 基本信息提交
    submit () {
      if (this.nowkey == '1') { // 机构信息提交
        this.orgFrom.validateFields(async (err, values) => {
          if (!err) {
            let url = '/welfareOrgManagement/save'
            let text = '增加成功'
            const params = this.orgFrom.getFieldsValue()
            params.spell = this.Base.pinyin.getCamelChars(params.orgName)
            this.changetime(params)
            const areaPath = params.areaPath ? params.areaPath.split('/') : null

            if (areaPath) {
              params.province = areaPath[0] ? areaPath[0] : null
              params.city = areaPath[1] ? areaPath[1] : null
              params.county = areaPath[2] ? areaPath[2] : null
            }

            if (this.nowtype != 1) {
              // 编辑
              text = '修改成功'
              url = '/welfareOrgManagement/update'
              params.id = this.id
            }
            params.registId = this.registId
            this.post(url, params).then((res) => {
              if (res.serviceSuccess) {
                this.$message.success(text)
                this.onClose()
              }
            })
          } else {
            this.$message.error('校验不通过，无法提交，请再次检查!')
          }
        })
      } else if (this.nowkey == '2') { // 人员信息提交
        this.personFrom.validateFields(async (err, values) => {
          if (!err) {
            const url = '/welfareOrgManagement/savePeople'
            let text = ''
            const params = this.personFrom.getFieldsValue()
            this.changetime(params)
            // 新增
            if (values.chairmanName) {
              params.id = this.id
              text = '修改成功'
            } else {
              text = '增加成功'
            }
            if (this.nowtype != 1) {
              // 编辑
              text = '修改成功'
              params.id = this.id
            }
            this.post(url, params).then((res) => {
              if (res.serviceSuccess) {
                this.$message.success(text)
                this.onClose()
              }
            })
          } else {
            this.$message.error('校验不通过，无法提交，请再次检查!')
          }
        })
      }
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
  margin-left: 20px;
}
.tabout {
  background: #fff;
  padding: 20px 20px 0;
}
</style>
