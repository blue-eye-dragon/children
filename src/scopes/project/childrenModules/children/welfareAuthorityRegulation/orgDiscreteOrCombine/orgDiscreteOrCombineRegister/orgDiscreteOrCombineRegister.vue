<template>
    <div class="conts">
      <div class="contin">
        <ta-tabs :activeKey="nowkey" @change="callback">
            <ta-tab-pane tab="机构分立" key="1" :forceRender='forceRenderBool' :disabled="isdiscreteShow">
                <ta-form
                 layout="horizontal"
                 :autoFormCreate="(discreteForm)=>{this.discreteForm = discreteForm}">
                    <Discrete
                    :disabled="disabled"
                    :othersfileList.sync="othersfileList"
                    :addreslistsmodel="addreslistsmodel"
                    @actualAddress="actualAddress"
                    :orgNameList="orgNameList"
                    @getOrgId="getOrgId"
                    @addLength="addLength"
                    :titleArry.sync="titleArry"></Discrete>
                </ta-form>
            </ta-tab-pane>
            <ta-tab-pane tab="机构合并" key="2" :forceRender='forceRenderBool' :disabled="iscombineFormShow">
                <ta-form
                 layout="horizontal"
                 :autoFormCreate="(combineForm)=>{this.combineForm = combineForm}">
                    <Combine
                    :disabled="disabled"
                    :orgNameList="orgNameList"
                    @conditionSearch="conditionSearch"
                    :others2fileList.sync="others2fileList"
                    :combinAddressmodel="combinAddressmodel"
                    :orgSelected="orgSelected"
                    :isorgSelected="isorgSelected"
                    @delSelectVal="delSelectVal"
                    ></Combine>
                </ta-form>
            </ta-tab-pane>
            <ta-tab-pane tab="机构解散" key="3" :forceRender='forceRenderBool' :disabled="isdissolveFormShow">
                <ta-form
                 layout="horizontal"
                 :autoFormCreate="(dissolveForm)=>{this.dissolveForm = dissolveForm}">
                    <Dissolve
                    :disabled="disabled"
                    :orgNameList="orgNameList"
                    :otherfileList.sync="otherfileList"
                    @getOrgId="getOrgId"></Dissolve>
                </ta-form>
            </ta-tab-pane>
        </ta-tabs>
        </div>
        <div class="bom">
            <ta-button  class="preservation" @click="backs" style="margin-left:20px">返回</ta-button>
            <ta-button type="primary" v-if="!disabled" class="preservation" @click="submit()" :disabled="disabled" style="margin-left:20px">提交</ta-button>
        </div>
    </div>
</template>
<script>
import Discrete from './components/discrete.vue'
import Combine from './components/combine.vue'
import Dissolve from './components/dissolve.vue'
import moment from 'moment'
export default {
  components: {
    Discrete,
    Combine,
    Dissolve
  },
  data () {
    return {
      disabled: false,
      nowkey: '1',
      id: '',
      othersfileList: [],
      otherfileList: [],
      ishide: true,
      addreslistsmodel: [],
      orgNameList: [],
      orgId: '',
      combinAddressmodel: [],
      others2fileList: [],
      titleArry: [1],
      orgSelected: [],
      editData: {},
      forceRenderBool: true,
      isorgSelected: true,
      isdiscreteShow: false,
      iscombineFormShow: false,
      isdissolveFormShow: false
    }
  },
  activated () {
    this.discreteForm.resetFields()
    this.combineForm.resetFields()
    this.dissolveForm.resetFields()
    this.orgSelected = []
    this.othersfileList = []
    this.others2fileList = []
    this.otherfileList = []
    this.id = this.$route.query.id
    this.disabled = this.$route.query.disabled
    this.isdiscreteShow = this.$route.query.isdiscreteShow
    this.iscombineFormShow = this.$route.query.iscombineFormShow
    this.isdissolveFormShow = this.$route.query.isdissolveFormShow
    // this.ifdisabled = this.$route.query.ifdisabled
    if (this.id) {
      this.nowkey = this.$route.query.nowkey
      this.getDetails()
      this.orgSelected = []
    }
  },
  mounted () {
    this.getOrgNameList()
  },
  methods: {
    actualAddress (values) {
      this.discreteForm.setFieldsValue({
        [`address_Linkage${values}`]: this.addreslistsmodel[values]
      })
    },
    async getOrgNameList () {
      let data = await this.post('/welfareInstitutionChanges/queryOrgNameList')
      this.orgNameList = data.data.data
      console.log(this.orgNameList)
    },
    getOrgId (val) {
      console.log(val)
      this.orgName = val
      this.orgNameList.map(item => {
        if (item.orgId == val) {
          this.orgId = item.orgId
        }
      })
    },
    addLength (val) {
      console.log(val)
      this.titleArry = val
    },
    // 获取合并机构的内容
    conditionSearch () {
      let valueOrg = this.combineForm.getFieldsValue().orgName
      console.log(valueOrg)
      if (valueOrg) {
        this.orgNameList.map(item => {
          valueOrg.map(itemId => {
            if (item.orgName == itemId) {
              console.log(item)
              this.orgSelected.map(itemof => {
                if (itemof.orgName == itemId) {
                  this.orgSelected.splice(itemof, 1)
                }
              })
              this.orgSelected.push(item)
            }
          })
        })
      }
      this.combineForm.resetFields('orgName')
    },
    delSelectVal (val) {
      // val值为this.orgSelected
      console.log(val)
      let orgIds = []
      this.orgSelected = val
      this.orgSelected.map(item => {
        orgIds.push(item.id)
      })
      console.log(orgIds)
      // this.combineForm.setFieldsValue({orgId: orgIds})
    },
    backs () {
      this.$router.go(-1)
    },
    callback (key) {
      this.nowkey = key
    },
    // 文件上传
    fileUpload1 () {
      let upLoadPathIds = []
      let fileidsGather = [
        ...this.othersfileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    fileUpload2 () {
      let upLoadPathIds = []
      let fileidsGather = [
        ...this.others2fileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    fileUpload3 () {
      let upLoadPathIds = []
      let fileidsGather = [
        ...this.otherfileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    async submit () {
      let isok = true
      let mergeisok = true
      let dissolveisok = true
      let text = ''
      let url = ''
      let data = {}
      // 分立
      let WelfareOrgBranch = {}
      // 合并
      let welfareOrgMergeVo = {}
      // 解散
      let welfaredissolveVo = {}
      if (this.nowkey == '1') {
        this.discreteForm.validateFields((err, values) => {
          console.log(values)
          WelfareOrgBranch = values
          if (err) {
            isok = false
          }
        })
      }
      if (this.nowkey == '2') {
        this.combineForm.validateFields((err, values) => {
          console.log('errs')
          console.log(err)
          console.log(values)
          if (this.orgSelected.length == 0) {
            this.isorgSelected = false
          } else {
            this.isorgSelected = true
          }
          welfareOrgMergeVo = values
          if (err) {
            mergeisok = false
          }
        })
      }
      if (this.nowkey == '3') {
        this.dissolveForm.validateFields((err, values) => {
          console.log(values)
          welfaredissolveVo = values
          if (err) {
            dissolveisok = false
          }
        })
      }
      if (this.nowkey == '1' && isok) {
        console.log('分立')
        let fileContent1 = this.fileUpload1()
        let welfareOrgBranchVos = []
        WelfareOrgBranch.orgId = this.orgId
        // WelfareOrgBranch.upLoadPathId = fileContent1
        console.log(WelfareOrgBranch)
        this.titleArry.map((item, index) => {
          console.log(item)
          let orgContent = {
            orgName: WelfareOrgBranch.orgName,
            applicant: WelfareOrgBranch.applicant,
            orgId: this.orgId,
            upLoadPathId: fileContent1,
            address: WelfareOrgBranch[`address${index}`],
            areaCovered: WelfareOrgBranch[`areaCovered${index}`],
            branchDate: WelfareOrgBranch[`branchDate${index}`].format('YYYY-MM-DD'),
            branchName: WelfareOrgBranch[`branchName${index}`],
            sourceOfFunds: WelfareOrgBranch[`sourceOfFunds${index}`]
          }
          if (WelfareOrgBranch[`address_Linkage${index}`].length == 1) {
            orgContent.county = WelfareOrgBranch[`address_Linkage${index}`][0]
          }
          if (WelfareOrgBranch[`address_Linkage${index}`].length == 2) {
            orgContent.city = WelfareOrgBranch[`address_Linkage${index}`][0]
            orgContent.county = WelfareOrgBranch[`address_Linkage${index}`][1]
          }
          if (WelfareOrgBranch[`address_Linkage${index}`].length == 3) {
            orgContent.province = WelfareOrgBranch[`address_Linkage${index}`][0]
            orgContent.city = WelfareOrgBranch[`address_Linkage${index}`][1]
            orgContent.county = WelfareOrgBranch[`address_Linkage${index}`][2]
          }
          welfareOrgBranchVos.push(orgContent)
        })
        WelfareOrgBranch.welfareOrgBranchVos = welfareOrgBranchVos
        if (this.id) {
          console.log('分立编辑')
          text = '分立编辑成功'
          url = '/welfareOrgBranch/update'
          this.editData.map((item, index) => {
            WelfareOrgBranch.welfareOrgBranchVos[index].baseId = item.baseId
            WelfareOrgBranch.welfareOrgBranchVos[index].id = item.id
          })
          data = {
            ...WelfareOrgBranch
          }
        } else {
          console.log('分立添加')
          text = '分立新增成功'
          url = '/welfareOrgBranch/save'
          data = {
            ...WelfareOrgBranch
          }
        }
      }
      if (this.nowkey == '2' && mergeisok && this.orgSelected) {
        console.log('合并')
        let fileContent2 = this.fileUpload2()
        welfareOrgMergeVo.orgId = []
        welfareOrgMergeVo.orgName = []
        welfareOrgMergeVo.upLoadPathId = fileContent2
        welfareOrgMergeVo.mergeDate = welfareOrgMergeVo.mergeDate.format('YYYY-MM-DD')
        if (welfareOrgMergeVo[`address_Linkage`].length == 1) {
          welfareOrgMergeVo.county = welfareOrgMergeVo[`address_Linkage`][0]
        }
        if (welfareOrgMergeVo[`address_Linkage`].length == 2) {
          welfareOrgMergeVo.city = welfareOrgMergeVo[`address_Linkage`][0]
          welfareOrgMergeVo.county = welfareOrgMergeVo[`address_Linkage`][1]
        }
        if (welfareOrgMergeVo[`address_Linkage`].length == 3) {
          welfareOrgMergeVo.province = welfareOrgMergeVo[`address_Linkage`][0]
          welfareOrgMergeVo.city = welfareOrgMergeVo[`address_Linkage`][1]
          welfareOrgMergeVo.county = welfareOrgMergeVo[`address_Linkage`][2]
        }
        console.log(this.orgSelected)
        if (this.orgSelected.length == 0) {
          return false
        }
        if (this.orgSelected.length == 1) {
          this.$message.error('请选择两个或两个以上机构')
          return false
        }
        this.orgSelected.map(item => {
          welfareOrgMergeVo.orgId.push(item.id)
          welfareOrgMergeVo.orgName.push(item.orgName)
        })
        welfareOrgMergeVo.orgId = welfareOrgMergeVo.orgId.join(',')
        welfareOrgMergeVo.orgName = welfareOrgMergeVo.orgName.join(',')
        if (this.id) {
          console.log('合并编辑')
          text = '合并编辑成功'
          url = '/welfareOrgMerge/update'
          welfareOrgMergeVo.id = this.id
          welfareOrgMergeVo.baseId = this.editData.baseId
          data = {
            ...welfareOrgMergeVo
          }
        } else {
          console.log('合并添加')
          text = '合并新增成功'
          url = '/welfareOrgMerge/save'
          data = {
            ...welfareOrgMergeVo
          }
        }
      }
      if (this.nowkey == '3' && dissolveisok) {
        console.log('解散')
        let fileContent3 = this.fileUpload3()
        welfaredissolveVo.upLoadPathId = fileContent3
        this.orgNameList.map(item => {
          if (item.orgName == welfaredissolveVo.orgName) {
            welfaredissolveVo.orgId = item.id
          }
        })
        welfaredissolveVo.dissolutionDate = welfaredissolveVo.dissolutionDate.format('YYYY-MM-DD')
        if (this.id) {
          console.log('解散编辑')
          text = '解散编辑成功'
          url = '/welfareOrgDissolution/update'
          welfaredissolveVo.id = this.id
          welfaredissolveVo.baseId = this.editData.baseId
          data = {
            ...welfaredissolveVo
          }
        } else {
          console.log('解散添加')
          text = '解散新增成功'
          url = '/welfareOrgDissolution/save'
          data = {
            ...welfaredissolveVo
          }
        }
      }
      console.log(data)
      let res = await this.post(url, data, true)
      if (res.errors == null) {
        this.$router.push({
          name: 'orgDiscreteOrCombineRecord'
        })
        this.$message.success(text)
        if (this.nowkey == '1') {
          this.discreteForm.resetFields()
        }
        if (this.nowkey == '2') {
          this.combineForm.resetFields()
        }
        if (this.nowkey == '3') {
          this.dissolveForm.resetFields()
        }
      }
    },
    async getDetails () {
      console.log(this.id)
      let params = {
        id: this.id
      }
      console.log(this.nowkey)
      if (this.nowkey == '1') {
        let data = await this.post('/welfareOrgBranch/queryByBaseId', params)
        console.log(data)
        this.editData = data.data.data
        if (this.editData[0].filePathVos) {
          // console.log(JSON.parse(this.editData.filePathVos))
          JSON.parse(this.editData[0].filePathVos).map(item => {
            this.othersfileList.push(item)
          })
        }
        console.log(data.data.data.length)
        this.titleArry = []
        this.editData.map((item, index) => {
          this.titleArry.push(index + 1)
          // this.editData[`address_Linkage${index}`] = []
          this.$nextTick(() => {
            this.addreslistsmodel[index] = []
            if (item.county && !item.province && !item.city) {
            // this.editData[`address_Linkage${index}`].push(item.county)
              this.addreslistsmodel[index].push(item.county)
            }
            if (item.county && !item.province && item.city) {
            // this.editData[`address_Linkage${index}`].push(item.city, item.county)
              this.addreslistsmodel[index].push(item.city, item.county)
            }
            if (item.county && item.province && item.city) {
            // this.editData[`address_Linkage${index}`].push(item.province, item.city, item.county)
              this.addreslistsmodel[index].push(item.province, item.city, item.county)
            }
            // this.actualAddress(index)
            this.discreteForm.setFieldsValue({
              [`address${index}`]: item.address,
              [`areaCovered${index}`]: item.areaCovered,
              [`branchDate${index}`]: moment(item.branchDate),
              [`branchName${index}`]: item.branchName,
              [`sourceOfFunds${index}`]: item.sourceOfFunds,
              orgName: this.editData[0].orgName,
              applicant: this.editData[0].applicant
            })
          })
        })
      }
      if (this.nowkey == '2') {
        let data = await this.post('/welfareOrgMerge/queryByBaseId', params)
        console.log(data)
        this.editData = data.data.data
        if (this.editData.filePathVos) {
          // console.log(JSON.parse(this.editData.filePathVos))
          JSON.parse(this.editData.filePathVos).map(item => {
            this.others2fileList.push(item)
          })
        }
        this.editData.address_Linkage = []
        this.editData.mergeDate = moment(this.editData.mergeDate)
        if (this.editData.county && !this.editData.province && !this.editData.city) {
          this.editData.address_Linkage.push(this.editData.county)
        }
        if (this.editData.county && !this.editData.province && this.editData.city) {
          this.editData.address_Linkage.push(this.editData.city, this.editData.county)
        }
        if (this.editData.county && this.editData.province && this.editData.city) {
          this.editData.address_Linkage.push(this.editData.province, this.editData.city, this.editData.county)
        }
        console.log(this.editData.orgId.split(','))
        this.editData.orgId.split(',').map(item => {
          this.orgNameList.map(itemof => {
            if (itemof.id == item) {
              this.orgSelected.push(itemof)
            }
          })
        })
        console.log(this.editData)
        this.$nextTick(() => {
          this.combineForm.setFieldsValue(this.editData)
          this.combineForm.setFieldsValue({orgName: null})
        })
      }
      if (this.nowkey == '3') {
        let data = await this.post('/welfareOrgDissolution/queryByBaseId', params)
        console.log(data)
        this.editData = data.data.data
        if (this.editData.filePathVos) {
          // console.log(JSON.parse(this.editData.filePathVos))
          JSON.parse(this.editData.filePathVos).map(item => {
            this.otherfileList.push(item)
          })
        }
        this.$nextTick(() => {
          this.editData.dissolutionDate = moment(this.editData.dissolutionDate)
          this.dissolveForm.setFieldsValue(this.editData)
        })
      }
    }
  }
}
</script>
