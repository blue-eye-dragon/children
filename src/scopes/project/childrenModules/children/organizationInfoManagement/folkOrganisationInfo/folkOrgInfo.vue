<template>
  <div class="conts">
    <div class="contin  ">
      <ta-tabs :activeKey="nowkey"
               @change="callback"
               class="tabout"
               type="card">
        <ta-tab-pane tab="机构基本情况"
                     key="1"
                     :forceRender="true">
          <ta-form :autoFormCreate="(orgFrom)=>{this.orgFrom = orgFrom}">
            <ForkOrg :thisP="this"
                     :showUpload="showUpload"
                     :orgFileList.sync="orgFileList"
                     :disabled="childDisable"
                     ref="org"></ForkOrg>

          </ta-form>
        </ta-tab-pane>

        <ta-tab-pane tab="设施设备"
                     key="2"
                     :forceRender="true">
          <ta-form :autoFormCreate="(forkFrom)=>{this.forkFrom = forkFrom}">
            <ForkOrgFacility :thisP="this"
                             :disabled="childDisable"></ForkOrgFacility>
          </ta-form>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom">
      <ta-button class="but"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="but"
                 @click="submit"
                 v-if="!childDisable">提交</ta-button>
    </div>
  </div>
</template>
<script>
import ForkOrg from './components/forkOrg'
import ForkOrgFacility from './components/forkOrgFacility'
import moment from 'moment'
export default {
  components: {
    ForkOrg,
    ForkOrgFacility
  },
  data () {
    return {
      ids: '',
      folkFacilityId: '',
      nowkey: '1',
      childDisable: false,
      showUpload: false,
      orgFileList: []
    }
  },
  activated () {
    this.childDisable = !!this.$route.query.disabled
    this.loadPage()
  },
  mounted () {

  },
  methods: {

    loadPage () {
      this.nowkey = '1'
      this.ids = ''
      this.folkFacilityId = ''
      this.orgFileList = []
      this.showUpload = false
      this.orgFrom.resetFields()
      this.forkFrom.resetFields()
      const routerDate = this.$route.query
      this.ids = routerDate.id
      if (this.ids) {
        this.loadData()
      } else {
        // 新增
        this.orgFrom.setFieldsValue({
          areaCode: window.parent.indexTool.getUserInfo().areaCode,
          areaId: window.parent.indexTool.getUserInfo().areaId,
          orgCode: window.parent.indexTool.getUserInfo().orgCode
        })
      }
    },

    async loadData () {
      const res = await this.post('/folkOrgManagement/queryById', { id: this.ids })
      if (res.serviceSuccess) {
        const folkOrgManagementVo = res.data.data
        const folkOrgVo = folkOrgManagementVo.folkOrgVo
        const folkFacilityVo = folkOrgManagementVo.folkFacilityVo
        this.folkFacilityId = folkFacilityVo.id
        folkOrgVo.registrationTime = folkOrgVo.registrationTime ? moment(folkOrgVo.registrationTime, 'YYYY-MM-DD') : null
        folkOrgVo.validPeriodStart = folkOrgVo.validPeriodStart ? moment(folkOrgVo.validPeriodStart, 'YYYY-MM-DD') : null
        folkOrgVo.validPeriodEnd = folkOrgVo.validPeriodEnd ? moment(folkOrgVo.validPeriodEnd, 'YYYY-MM-DD') : null
        folkOrgVo.establishTime = folkOrgVo.establishTime ? moment(folkOrgVo.establishTime, 'YYYY-MM-DD') : null

        folkFacilityVo.houseTime = folkFacilityVo.houseTime ? moment(folkFacilityVo.houseTime, 'YYYY-MM-DD') : null
        folkFacilityVo.siteUseRight = folkOrgVo.siteUseRight

        folkFacilityVo.educationEquipment = folkFacilityVo.educationEquipment ? folkFacilityVo.educationEquipment.split(',') : []
        folkFacilityVo.medicalEquipment = folkFacilityVo.medicalEquipment ? folkFacilityVo.medicalEquipment.split(',') : []
        folkFacilityVo.lifeEquipment = folkFacilityVo.lifeEquipment ? folkFacilityVo.lifeEquipment.split(',') : []

        if (folkOrgVo.raisingAgreement && folkOrgVo.raisingAgreement == 1) {
          this.showUpload = true
        }
        this.orgFileList = []
        if (folkOrgManagementVo.fileList) {
          this.orgFileList = [...folkOrgManagementVo.fileList]
          folkOrgVo.uploadFileT = this.orgFileList
        }
        this.$nextTick(() => {
          this.orgFrom.setFieldsValue(folkOrgVo)
          this.forkFrom.setFieldsValue(folkFacilityVo)
        })
      }
    },
    // 返回上层
    backtrack () {
      this.$router.go(-1)
    },
    setSiteUseRight (a) {
      this.$nextTick(() => {
        this.forkFrom.setFieldsValue({
          siteUseRight: a
        })
      })
    },
    orUpload (a) {
      this.orgFileList = []
      this.showUpload = a == 1
    },
    // 提交
    submit () {
      let tip = true
      if (this.showUpload && this.orgFileList.length == 0) {
        this.orgFrom.setFieldsValue({
          uploadFileT: null
        })
      }
      this.forkFrom.validateFields(async (err, values) => {
        if (err) {
          tip = false
          this.nowkey = '2'
        }
      })

      this.orgFrom.validateFields(async (err, values) => {
        if (err) {
          tip = false
          this.nowkey = '1'
        }
      })

      if (tip) {
        const folkOrgVo = this.orgFrom.getFieldsValue()

        const folkFacilityVo = this.forkFrom.getFieldsValue()
        if (this.ids) {
          folkOrgVo.id = this.ids
          folkFacilityVo.folkOrgId = this.ids
          folkFacilityVo.id = this.folkFacilityId
        }
        this.changetime(folkOrgVo)
        this.changetime(folkFacilityVo)
        const folkOrgManagementVo = { folkOrgVo, folkFacilityVo }
        const upload = []
        if (this.orgFileList.length > 0) {
          this.orgFileList.map(item => {
            upload.push(item.response.data.data.fileid)
          })
        }
        folkOrgManagementVo.upLoadPathIds = upload
        this.post('/folkOrgManagement/saveOrUpdate', folkOrgManagementVo, true).then((res) => {
          if (res.serviceSuccess) {
            this.$message.success('操作成功！')
            this.backtrack()
          }
        })
      } else {
        this.$message.error('校验不通过，无法提交，请再次检查!')
      }
    },
    // tab切换时的change方法
    callback (e) {
      this.nowkey = e
    },
    // 数据处理
    changetime (data) {
      for (var k in data) {
        if (k == 'uploadFileT') {
          return
        }
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
    },
    // setFrom (obj) {
    //   this.registId = obj.id
    //   // 2020年3月8日18点43分
    //   obj.welfareOrgId = obj.taorgId
    //   // 2019年12月16日14:56:44
    //   obj.taorgId = obj.parentId
    //   obj.orgId = window.parent.indexTool.getUserInfo().orgId
    //   // 需求变动2019年12月3日14:27:29
    //   // this.$nextTick(() => {
    //   //   this.orgFrom.setFieldsValue(obj)
    //   //   this.orgFrom.setFieldsValue({ parentName: obj.parentName ? obj.parentName : '无数据' })
    //   // })
    // },

    // 清空
    clearData () {
      this.orgFrom.setFieldsValue({
        identificationOrgName: null,
        identificationOrgCode: null,
        identificationDate: null
      })
    },
    backs () {
      // this.nowtype = ''
      this.orgFrom.resetFields()
      this.forkFrom.resetFields()
      this.$router.go(-1)
    },
    // 基本信息提交

    // let url = '/folkOrgManagement/saveOrUpdate'
    // let text = '增加成功'
    // const params = this.orgFrom.getFieldsValue()
    // params.spell = this.Base.pinyin.getCamelChars(params.orgName)
    // this.changetime(params)
    // const areaPath = params.areaPath ? params.areaPath.split('/') : null

    // if (areaPath) {
    //   params.province = areaPath[0] ? areaPath[0] : null
    //   params.city = areaPath[1] ? areaPath[1] : null
    //   params.county = areaPath[2] ? areaPath[2] : null
    // }

    // if (this.nowtype != 1) {
    //   // 编辑
    //   text = '修改成功'
    //   url = '/welfareOrgManagement/update'
    //   params.id = this.id
    // }
    // params.registId = this.registId
    // this.post(url, params).then((res) => {
    //   if (res.serviceSuccess) {
    //     this.$message.success(text)
    //     this.onClose()
    //   }
    // })
    // this.forkFrom.validateFields(async (err, values) => {
    //   if (!err) {
    //     const url = '/welfareOrgManagement/savePeople'
    //     let text = ''
    //     const params = this.forkFrom.getFieldsValue()
    //     this.changetime(params)
    //     // 新增
    //     if (values.chairmanName) {
    //       params.id = this.id
    //       text = '修改成功'
    //     } else {
    //       text = '增加成功'
    //     }
    //     if (this.nowtype != 1) {
    //       // 编辑
    //       text = '修改成功'
    //       params.id = this.id
    //     }
    //     this.post(url, params).then((res) => {
    //       if (res.serviceSuccess) {
    //         this.$message.success(text)
    //         this.onClose()
    //       }
    //     })
    //   } else {
    //     this.$message.error('校验不通过，无法提交，请再次检查!')
    //   }
    // })

    onClose () {
      this.$router.go(-1)
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
