<template>
  <div class="conts">
    <div class="contin">
      <ta-form :autoFormCreate="(orgFrom)=>{this.orgFrom = orgFrom}">
        <insInfo :yesNoList="yesNoList"
                 :basedisabled="basedisabled"
                 :orgNameList="orgNameList"
                 @setadrr="setadrr"
                 :parentId="parentId"
                 :istrue="istrue"
                 @setFrom="setFrom"
                 :thisP='this'
                 :hasIsOnlyOffice="hasIsOnlyOffice"
                 :parentOrgName="parentOrgName"
                 @updatePersonnel="updatePersonnel"
                 @setaddress="setaddress"
                 @clearOrgSettingWay="clearOrgSettingWay"
                 :nowtype="nowtype"
                 @setIsOnlyOfficeNo="setIsOnlyOfficeNo"
                 @clearPeopleOrWork="clearPeopleOrWork"
                 :isCanEdit="isCanEdit"
                 ref='ins'></insInfo>
      </ta-form>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="but"
                 v-if="!basedisabled"
                 @click="submit">提交机构信息</ta-button>
    </div>
  </div>
</template>
<script>
import InsInfo from './protectInsInfo'
import moment from 'moment'
const mixColumns = [
  {
    title: '行政区划编码',
    width: '150px',
    dataIndex: 'areaCode'
  },
  {
    title: '组织单位编码',
    width: '150px',
    dataIndex: 'orgCode'
  },
  {
    title: '机构名称',
    width: '100px',
    dataIndex: 'orgName'
  },
  {
    title: '机构类型',
    width: '200px',
    dataIndex: 'orgType',
    collectionType: 'INSTITUTIONALTYPE'
  },
  {
    title: '电话',
    width: '100px',
    dataIndex: 'tel'
  },
  {
    title: '负责人',
    width: '200px',
    dataIndex: 'legalRepresentative'
  },
  {
    title: '创建时间',
    width: '200px',
    dataIndex: 'postCode'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    InsInfo
  },
  data () {
    return {
      index: 0,
      orgNameList: [], // 机构名称下拉数据
      page: 1,
      size: 10,
      mixDataList: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      parentId: '',
      parentOrgName: '',
      nowtype: '',
      orgType: '',
      basedisabled: false, // 机构信息编辑false
      yesNoList: [],
      allDate: [], // 编辑时获取初始数据,
      addressmodel: [],
      id: '',
      otherFlag: false, // 是否是其他（机构数量查询）页面跳转过来
      istrue: false,
      isFromSearch: false,
      formDataSearch: {},
      userInfo: window.parent.indexTool.getUserInfo(), // 当前用户信息
      hasIsOnlyOffice: false, // 机构是否独立是否有值（有值编辑时为必填，无值则为非必填）
      isCanEdit: false // 是否可编辑
    }
  },
  activated () {
    this.hasIsOnlyOffice = true
    this.$refs.ins.isKaiProjectPhoneValue = this.Enum.YESNO.FOU
    this.$refs.ins.orgSettingWayValue = ''
    this.$refs.ins.orgTypeValue = this.userInfo.areaLevel == '4' ? this.Enum.TYPEOFPROTECTION.XZJDWBZ : this.Enum.TYPEOFPROTECTION.WCNJZBHJG
    this.$refs.ins.fileList = []
    this.$refs.ins.fundingSourceOther = false
    this.$refs.ins.dataSourceYj = []
    this.$refs.ins.dataSourceFy = []
    this.isshow = false
    this.isFromSearch = false
    this.formDataSearch = {}
    this.istrue = false
    this.$refs.ins.isOnlyOfficeDisabled = true
    this.$refs.ins.isOnlyOfficeValue = this.Enum.YESNO.FOU // 机构是否独立赋值
    this.$refs.ins.dataSource = [{ bjczMoney: 0, cszhMoney: 0, knqzjzbzMoney: 0, fcgyMoney: 0, otherMoney: 0, uninsuredMoneySum: 0 }] // 经费明细
    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
      this.isFromSearch = this.$route.query.isFromSearch
    }
    const that = this
    const param = that.$route.query
    that.isCanEdit = (typeof param.isCanEdit) == 'string' ? JSON.parse(param.isCanEdit) : param.isCanEdit
    that.parentOrgName = param.parentOrgName
    that.parentId = param.parentId
    that.nowtype = param.nowtype
    that.orgType = param.orgType
    that.otherFlag = param.otherFlag == 'other'
    that.id = param.id
    if (that.nowtype == 1) {
      that.basedisabled = false
      that.orgFrom.setFieldsValue({
        parentOrgId: that.parentId,
        parentOrgName: that.parentOrgName ? that.parentOrgName : that.parentId
      })
    } else {
      this.getallData(that.id)
    }
    this.gainAri()
  },

  mounted () {
    this.getyesNoList() // 是否字典
    this.getfunctionalAreaList()
  },
  methods: {
    // 清空独立方式
    clearPeopleOrWork () {
      this.orgFrom.setFieldsValue({
        peopleOrWork: undefined
      })
    },
    // 机构是否独立选择否
    setIsOnlyOfficeNo () {
      this.orgFrom.setFieldsValue({
        isOnlyOffice: this.Enum.YESNO.FOU
      })
      this.$refs.ins.isOnlyOfficeValue = this.Enum.YESNO.FOU
    },
    // 清空机构设置方式
    clearOrgSettingWay () {
      this.orgFrom.setFieldsValue({
        orgSettingWay: undefined
      })
    },
    // 地址传值
    setaddress () {
      this.orgFrom.setFieldsValue({
        address_Linkage: this.$refs.ins.addressmodel
      })
    },
    // 同步机构信息（人员信息）负责人数据  orgFrom personFrom
    updatePersonnel (val, formName) {
      const name = formName == 'orgFrom' ? 'legalRepresentative' : 'chairmanName'
      this[formName].setFieldsValue({
        [name]: val
      })
    },
    async gainAri () {
      if (this.userInfo.areaLevel != '4' && this.isCanEdit) {
        const data = await this.post('childProtectOrgManagement/listOfWelfareToBefund')
        this.orgNameList = data.data.data
      }
    },
    setFrom (obj) {
      this.registId = obj.id
      // 需求变动2019年12月3日14:27:29
      this.$nextTick(() => {
        obj.parentOrgName = obj.parentName ? obj.parentName : '无数据'
        this.orgFrom.setFieldsValue(obj)
      })
    },
    async getfunctionalAreaList () {
      const data = await this.getDictionaries('FUNCTIONALAREA')
      this.functionalAreaList = data
    },
    async getallData (ids) {
      // 数据加载获取
      const that = this
      that.allDateEdit = null
      const paramEdit = {
        id: ids
      }
      const allData = await that.post(
        '/childProtectOrgManagement/queryInfoForEdit',
        paramEdit
      )

      that.allDateEdit = allData.data.data || {}
      that.$refs.ins.orgNameList.forEach(item => {
        if (item.orgName == that.allDateEdit.orgName) {
          that.setFrom(item)
        }
      })
      // 区域赋值
      that.$refs.ins.addressmodel = [
        that.allDateEdit.province || '',
        that.allDateEdit.city || '',
        that.allDateEdit.county || '',
        that.allDateEdit.town || ''
      ]

      // 机构是否独立赋值
      that.$refs.ins.isOnlyOfficeValue = that.allDateEdit.isOnlyOffice || ''
      that.hasIsOnlyOffice = !!that.allDateEdit.isOnlyOffice
      that.basedisabled = that.nowtype == 3
      if (that.nowtype == 2 || that.nowtype == 3) {
        that.$refs.ins.isKaiProjectPhoneValue = that.allDateEdit.isKaiProjectPhone
        that.$refs.ins.isOnlyOfficeValue = that.allDateEdit.isOnlyOffice // 机构是否独立赋值
        that.allDateEdit.orgSettingWay = that.allDateEdit.isOnlyOffice == that.Enum.YESNO.FOU && that.userInfo.areaLevel == '4' || !that.isCanEdit ? that.allDateEdit.orgSettingWay?.split(',') : that.allDateEdit.orgSettingWay
        that.$refs.ins.orgSettingWayValue = that.allDateEdit.orgSettingWay || '' // 机构设置方式选的值
        that.$refs.ins.orgTypeValue = that.allDateEdit.orgType // 机构类型选的值

        that.istrue = that.allDateEdit.isApproval == '1'
        that.$refs.ins.isOnlyOfficeDisabled = !that.istrue

        that.allDateEdit.foundDate = that.allDateEdit.foundDate ? moment(that.allDateEdit.foundDate) : null
        that.allDateEdit.approvalDate = that.allDateEdit.approvalDate ? moment(that.allDateEdit.approvalDate) : null
        that.allDateEdit.welfOrgId = that.id
        that.allDateEdit.birthday = that.allDateEdit.birthday ? moment(that.allDateEdit.birthday) : null
        // 引进社会组织和孵育社会组织信息表格赋值
        const { introduceList } = that.allDateEdit
        that.$refs.ins.dataSourceYj = [] // 引进社会组织数列表
        that.$refs.ins.dataSourceFy = [] // 孵育社会组织数列表
        if (introduceList && introduceList.length > 0) {
          introduceList.forEach(item => {
            that.$refs.ins['dataSource' + (item.introduceType == '1' ? 'Yj' : 'Fy')].push(item)
          })
        }
        // 附件回显
        that.$refs.ins.fileList = that.allDateEdit.fileList || []
        // 经费明细回显
        that.$refs.ins.dataSource = [{ bjczMoney: that.allDateEdit.bjczMoney || 0, cszhMoney: that.allDateEdit.cszhMoney || 0, knqzjzbzMoney: that.allDateEdit.knqzjzbzMoney || 0, fcgyMoney: that.allDateEdit.fcgyMoney || 0, otherMoney: that.allDateEdit.otherMoney || 0, uninsuredMoneySum: that.allDateEdit.uninsuredMoneySum || 0 }]
        that.$refs.ins.fundingSourceOther = !!that.allDateEdit.otherMoney
        // 显示机构信息数据
        that.$nextTick(() => {
          that.orgFrom.setFieldsValue(that.allDateEdit)
        })
      }
    },
    setadrr () {
      this.orgFrom.setFieldsValue({
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
    backs () {
      if (!this.isFromSearch) {
        this.orgFrom.resetFields()
        if (this.otherFlag) {
          this.$router.go(-1)
        } else {
          this.$router.push({
            path: 'protectOrganisationInfo'
          })
        }
      } else {
        this.$router.push({
          path: this.formDataSearch.pathUrl,
          query: {
            isFromSearch: true,
            formDataSearch: this.formDataSearch
          }
        })
      }
    },
    // 基本信息提交
    async submit () {
      let isok = true
      // 社会组织名称及工作人员数量必填校验
      const { dataSourceYj } = this.$refs.ins
      for (let i = 0; i < dataSourceYj.length; i++) { // 引进社会组织数组
        if (!dataSourceYj[i].socialOrganizationName || !dataSourceYj[i].socialOrganizationName.trim() || !dataSourceYj[i].workPeopleNum) {
          isok = false
          this.$message.error('请完善引进社会组织表格内容')
          break
        }
      }
      if (!isok) {
        return false
      }
      const { dataSourceFy } = this.$refs.ins
      for (let i = 0; i < dataSourceFy.length; i++) { // 孵育社会组织数组
        if (!dataSourceFy[i].socialOrganizationName || !dataSourceFy[i].socialOrganizationName.trim() || !dataSourceFy[i].workPeopleNum) {
          isok = false
          this.$message.error('请完善孵育社会组织表格内容')
          break
        }
      }
      if (!isok) {
        return false
      }
      // 附件的必填校验
      this.orgFrom.setFieldsValue({
        upLoadPathIds: this.$refs.ins.fileList.length == 0 ? undefined : 1
      })
      this.orgFrom.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          const params = this.orgFrom.getFieldsValue()
          params.introduceList = [...dataSourceYj, ...dataSourceFy]
          params.spell = this.Base.pinyin.getCamelChars(params.orgName)
          params.province = this.userInfo.provinceId || ''
          params.city = this.userInfo.cityId || ''
          params.county = this.userInfo.countyId || ''
          params.town = this.userInfo.areaLevel == '4' ? this.userInfo.areaId : ''
          this.changetime(params)
          // 附件处理
          const upLoadPathIds = []
          const { fileList } = this.$refs.ins
          fileList.map(item => {
            upLoadPathIds.push(item.response.data.data.fileid)
          })
          params.upLoadPathIds = upLoadPathIds
          // 经费明细处理
          Object.assign(params, this.$refs.ins.dataSource[0])

          if (this.nowtype == 1) {
            // 新增
            url = '/childProtectOrgManagement/save'

            text = '增加成功'
          } else {
            // 编辑
            text = '修改成功'
            url = '/childProtectOrgManagement/update'
            params.id = this.id
          }

          const data = await this.post(url, params, true)
          if (data.errors === null) {
            this.$message.success(text)
            this.backs()
          }
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 数据处理
    changetime (data) {
      for (var k in data) {
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
.tabout {
  background: #fff;
  padding: 20px 20px 0;
}
</style>
