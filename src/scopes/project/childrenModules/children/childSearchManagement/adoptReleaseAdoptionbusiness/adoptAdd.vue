<template>
  <div style="height: 100%;padding-bottom: 80px;"
       @click='allvalidator'>
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <Title title="儿童基础信息"></Title>
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <PublishForm :addressmodel="addressmodel"
                     :heathModel="heathModel"
                     :disabled="disabled"
                     :isp="ispdisable"
                     :childNumberAttr="childNumberAttr"
                     @callbackByIdCard="callbackByIdCard"
                     @setheath="setheath"
                     @setaddress="setaddress"
                     @setChildForm="setChildForm"
                     :adptFlag="adptFlag"
                     ref="publish"></PublishForm>
      </ta-form>
      <div ref="twoout"
           class="mars">
        <Title title="儿童健康状况"></Title>
        <ta-form ref="two"
                 layout="horizontal"
                 :autoFormCreate="(heathForm)=>{this.heathForm = heathForm}">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-form-item label="健康状况"
                            fieldDecoratorId="health"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 20 }"
                            :fieldDecoratorOptions="rules.healthStatus">
                <ta-radio-group @change="onChange"
                                :disabled="disabled">
                  <ta-radio :value="item.value"
                            v-for="(item,index) in heathlist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item v-if="heathval==Enum.HEALTHSTATUS.OTHER"
                            label="其他"
                            fieldDecoratorId="healthOther"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 10 }"
                            :fieldDecoratorOptions="rules.healthStatusOther">
                <ta-input :disabled="disabled"
                          :placeholder="disabled?'':'请输入其他情况'" />
              </ta-form-item>
              <div class="canji"
                   v-if="heathval==Enum.HEALTHSTATUS.DISABILITY">
                <ta-form-item label="残疾类型"
                              fieldDecoratorId="healthSecondLevel"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }"
                              :initValue="[]"
                              :require="{message:'请选择残疾类型'}">
                  <ta-checkbox-group :disabled="disabled"
                                     @change="setMulti"
                                     :values="disabilityTypeValues"
                                     :options="disabiliytypelist" />
                </ta-form-item>
                <ta-form-item label="残疾等级"
                              fieldDecoratorId="disabilityLevel"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }">
                  <ta-radio-group :disabled="disabled">
                    <ta-radio :value="item.value"
                              v-for="(item,index) in canjileave"
                              :key="index">{{item.label}}</ta-radio>

                  </ta-radio-group>
                  <ta-radio-group style="float:left;"></ta-radio-group>
                </ta-form-item>
              </div>

              <div class="canji"
                   v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS">
                <ta-form-item label="重病"
                              fieldDecoratorId="healthSecondLevel"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }"
                              :initValue="[]"
                              :require="{message:'请选择重病!'}">
                  <ta-checkbox-group :options="disabiliytypelist"
                                     :disabled="disabled"
                                     @change="seriousillnesschange" />
                </ta-form-item>
                <ta-form-item v-if="serioushval"
                              label="其他"
                              fieldDecoratorId="healthSecondLevelOther"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 9 }"
                              :fieldDecoratorOptions="rules.healthStatusOther">
                  <ta-input :disabled="disabled"
                            :placeholder="disabled?'':'请输入其他情况'" />
                </ta-form-item>
              </div>
              <div class="canji"
                   v-if="heathval==Enum.HEALTHSTATUS.CHRONICDISEASE">
                <ta-form-item label="慢性病"
                              fieldDecoratorId="healthSecondLevel"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }"
                              :initValue="[]"
                              :require="{message:'请选择慢性病!'}">
                  <ta-checkbox-group :options="disabiliytypelist"
                                     :disabled="disabled"
                                     @change="seriousillnesschange" />
                </ta-form-item>
                <ta-form-item v-if="serioushval"
                              label="其他"
                              fieldDecoratorId="healthSecondLevelOther"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 9 }"
                              :fieldDecoratorOptions="rules.healthStatusOther">
                  <ta-input :disabled="disabled"
                            :placeholder="disabled?'':'请输入其他情况'" />
                </ta-form-item>
              </div>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
      <div class="bom"
           style="right: 20px;">
        <ta-button @click="returns"
                   class="btnleft">返回</ta-button>
        <div v-if="auth">
          <ta-button type="primary"
                     @click="submit('1')"
                     v-if="flag=='add'|| flag=='edit'"
                     class="btnleft">提交</ta-button>
        </div>
        <div v-else>
          <ta-button type="primary"
                     @click="submit(2)"
                     v-if="flag != 'look'"
                     class="btnleft temporarystorage">发布</ta-button>
        </div>
        <!-- <ta-button type="primary"
                   @click="submit('1')"
                   v-if="flag=='add'|| flag=='edit'"
                   class="btnleft">保存</ta-button> -->
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import PublishForm from './publishForm.vue'
import Title from '@component/common/components/Title'
import moment from 'moment'
export default {
  components: {
    PublishForm,
    Title
  },
  data () {
    return {
      adptFlag: '1', // adptFlag不为空，排除该福利机构下已送样的和做过收养登记的儿童信息
      auth: false,
      heathlist: [],
      serioushval: false,
      isp: true,
      ispdisable: true,
      disabiliytypelist: [],
      canjileave: [],
      heathval: '0',
      disabled: false,
      addressmodel: [],
      heathModel: [],
      isvalidator: false,
      id: '', // 列表跳转传过来的id
      flag: '', // 列表跳转传过来的flag
      childNumber: '', // 列表跳转传过来的childNumber
      childNumber_add: '', // 选择儿童传过来的childNumber
      childNumberAttr: '', // 新增时列表中传过来的所有儿童编号数组
      rules: {
        helpStationOther: this.verificationRulesNotMustFill('其他救助', 200),
        academicStatus: this.verificationRules('学业状况'),
        healthStatus: this.verificationRules('健康状况'),
        disabledType: this.verificationRules('残疾类型'),
        disabledType1: this.verificationRules('重病'),
        disabledType2: this.verificationRules('慢性病'),
        goSchoolStatus: this.verificationRules('就学情况'),
        statusoverview: this.verificationRules('生活状况概述', 200),
        remark: this.verificationRules('驳回原因', 200),
        healthStatusOther: this.verificationRules('其他情况', 50),
        academicStatusOther: this.verificationRules('其他情况', 50),
        boarder: this.verificationRules('是否学校寄宿')
      },
      disabilityTypeValues: []
    }
  },
  activated () {
    this.initDatas()
    this.disabilityTypeValues = []
    this.auth = window.parent.indexTool.getUserInfo().orgType == '99'
  },
  mounted () {
    this.isvalidator = false
    this.getheathlist()
    this.getleave()
    this.$refs.publish.isvalidator = false
  },
  methods: {
    setMulti (e) {
      const index = e.indexOf(this.Enum.DISABILITYTYPE.DCCJ)
      // 选择超过两个（不包括多重残疾）时，勾选多重残疾
      if (index == -1 && e.length > 1) {
        e.push(this.Enum.DISABILITYTYPE.DCCJ)
        this.disabilityTypeValues = e
      }
      // 除多重残疾外，选择一个时，取消勾选多重残疾
      if (index != -1 && e.length == 2) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
      // 不能直接选择多重残疾
      if (index != -1 && e.length == 1) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
    },
    // 非区县的福利机构的儿童赋值
    setChildForm (val) {
      this.childNumber_add = val.childNumber
      val.birthday = val.birthday ? moment(val.birthday) : null
      val.addrDetaile = val.censusRegisterDetail
      this.addressmodel = [
        val.censusRegisterPro || '',
        val.censusRegisterCity || '',
        val.censusRegisterCounty || ''
      ]
      this.form.setFieldsValue(val)
    },
    // 健康狀況
    async getheathlist () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
    },
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
    },
    // 初始化数据
    async initDatas () {
      this.heathval = '0'
      this.disabled = false
      this.childNumber_add = null
      this.flag = this.$route.query.flag
      // 非区县民政局的其他用户新增
      if (window.parent.indexTool.getUserInfo().orgType == '99' && this.$route.query.listData) {
        // 筛选出列表的儿童编号
        const listData = this.$route.query.listData ? JSON.parse(this.$route.query.listData) : []
        this.childNumberAttr = listData.reduce((prev, current) => {
          (prev.push(current.childNumber))
          return prev
        }, [])
      }

      // 附件处理
      this.$refs.publish.fileList = []

      // 编辑或查看数据回显
      if (this.flag != 'add') {
        this.id = this.$route.query.id
        this.childNumber = this.$route.query.childNumber
        let editYOrN = '1'
        if (this.flag == 'look') {
          this.disabled = true
          editYOrN = '0'
        } else if (this.flag == 'publish') {
          if (window.parent.indexTool.getUserInfo().orgType != '99') {
            this.disabled = true
          }
        }
        this.post('/readyAdoptionChildren/queryById', { id: this.id }).then((res) => {
          if (res.serviceSuccess) {
            const { data } = res.data
            data.birthday = data.birthday ? moment(data.birthday) : null
            // data['releaseDate'] = data.releaseDate ? moment(data.releaseDate) : null
            data.releaseDate = data.createTime ? moment(data.createTime) : null
            data.releasePerson = data.createUserName ? data.createUserName : null
            this.form.setFieldsValue(data)
            this.addressmodel = [
              data.province || '',
              data.city || '',
              data.country || ''
            ]
            this.heathModel = data.health ? data.health.split(',') : []
            // 附件赋值
            this.$refs.publish.fileList = []
            const fileList = data.fileList || []
            fileList.map((item) => {
              if (item.busiType == '13') {
                const imgobj = JSON.parse(JSON.stringify(item))
                imgobj.thumbUrl = 'data:image/png;base64,' + imgobj.thumbUrl
                this.$refs.publish.fileList.push(imgobj)
              }
            })
            // }
            if (data.health) {
              this.heathmodel = data.healthSecondLevel && data.healthSecondLevel.split(',') || []
              data.healthSecondLevel = data.healthSecondLevel && data.healthSecondLevel.split(',') || []
              this.heathval = data.health
              this.getdisabiliytype(data.health)
              this.seriousillnesschange(data.healthSecondLevel)
              this.getleave()
              this.setHeight('two', 'twoout')
            }
            this.$nextTick(() => {
              this.heathForm.setFieldsValue(data)
            })
          }
        })
      }
      if (this.$route.query.isp == '已提交' || !this.$route.query.isp) {
        this.isp = false
      } else {
        this.isp = true
      }
      if (this.$route.query.flag == 'publish') {
        this.ispdisable = true
      } else {
        this.ispdisable = false
      }
      const userinfo = window.parent.indexTool.getUserInfo()
      if (userinfo.orgType == '99' || userinfo.orgType == '01') {
        this.ispdisable = true
        this.form.setFieldsValue({
          adoptionHandlingUnit: userinfo.orgName
        })
      }
      const res = await this.post('/adoptionRegisterAgency/getUpLevelOrgInfo', { orgId: userinfo.orgId })
      this.orgId = res.data.data.orgId
      if (userinfo.orgType == '99') {
        this.$nextTick(() => {
          this.form.setFieldsValue({
            adoptionHandlingUnit: res.data.data.orgName
          })
        })
      }
    },
    onChange (e) {
      this.heathForm.setFieldsValue({
        disabledType: [],
        healthStatusOther: ''
      })
      this.serioushval = false
      this.heathval = e.target.value
      this.getdisabiliytype(e.target.value)
      this.setHeight('two', 'twoout')
    },
    async getdisabiliytype (val, ty) {
      const formdata = {
        parentValue: val,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      if (ty && ty == '1') {
        this.disabiliytypelistF = data.data.codeList
      } else if (ty && ty == '2') {
        this.disabiliytypelistM = data.data.codeList
      } else if (ty && ty == '3') {
        this.disabiliytypelistO = data.data.codeList
      } else {
        this.disabiliytypelist = data.data.codeList
      }
    },
    seriousillnesschange (val) {
      if (
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
      ) {
        this.serioushval = true
      } else {
        this.serioushval = false
      }
      if (val.length > 1) {
        if (
          val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = []
          arr.push(val[val.length - 1])
          this.$nextTick(() => {
            this.heathForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
        if (
          val[0] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[0] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = [...val]
          arr.shift()
          this.$nextTick(() => {
            this.heathForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
      }
      this.setHeight('two', 'twoout')
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue && node) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          if (node) {
            node.style.height = '50px'
          }
        }
        if (node) {
          node.style.transition = 'all 1s'
        }
      })
    },
    // 返回
    returns () {
      const publishObj = this.$refs.publish
      publishObj.imageUrl = 'static/img/defalimg.png'
      publishObj.delVisible = false
      publishObj.upLoadPathIds = []
      publishObj.fileList = [] // 文件列表
      // 重置表单数据
      this.form.resetFields()
      this.heathForm.resetFields()
      this.$router.go(-1)
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
      this.$refs.publish.isvalidator = true
    },
    // 提交
    submit (e) {
      const _self = this
      if (_self.flag != 'add' && _self.id && e == 2) {
        _self.publish()
        return false
      }
      _self.isvalidator = false
      this.$refs.publish.isvalidator = false
      _self.$refs.publish.errMsg = _self.form.getFieldError('idCard')
      // 附件传值
      if (this.$refs.publish.fileList.length > 0) {
        this.form.setFieldsValue({ files: 1 })
      } else {
        this.form.setFieldsValue({ files: undefined })
      }

      const form = _self.form.getFieldsValue()
      let url = '/readyAdoptionChildren/save'
      if (e == '2') { // 发布
        url = '/readyAdoptionChildren/submitAdopted'
      } else if (_self.flag == 'edit') {
        url = '/readyAdoptionChildren/save'
        form.id = _self.id
      }
      let jk = false
      _self.heathForm.validateFields((err, values) => {
        if (err) {
          _self.$message.error('校验不通过，无法提交，请再次检查!')
          jk = true
        } else {
          jk = false
        }
      })
      if (jk) {
        return false
      }
      _self.form.validateFields((err, values) => {
        if (!err) {
          form.birthday = form.birthday ? moment(form.birthday).format('YYYY-MM-DD') : null
          form.province = form.address_Linkage instanceof Array ? form.address_Linkage[0] : null
          form.city = form.address_Linkage instanceof Array ? form.address_Linkage[1] : null
          form.country = form.address_Linkage instanceof Array ? form.address_Linkage[2] : null
          delete form.address_Linkage
          // 健康状况处理
          form.health = form.healths ? form.healths.join(',') : ''
          delete form.healths
          // 附件
          const upLoadPathIds = []
          if (this.$refs.publish.fileList.length > 0) {
            this.$refs.publish.fileList.map(item => {
              upLoadPathIds.push(item.response.data.data.fileid)
            })
          }
          form.upLoadPathIds = upLoadPathIds
          // 儿童编号
          form.childNumber = this.flag == 'add' ? this.childNumber_add : this.childNumber
          Object.assign(form, this.heathForm.getFieldsValue())
          form.healthSecondLevel = form.healthSecondLevel ? form.healthSecondLevel.join(',') : ''
          form.reserve2 = 2
          form.adoptionHandlingUnitId = this.orgId
          _self.post(url, form, true).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('信息' + (e == '1' ? '保存' : '发布') + '成功！')
              _self.returns()
            }
          })
        } else {
          _self.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      if (!this.isvalidator) {
        return false
      }
      this.form.setFieldsValue({
        sex: sex,
        birthday: birth ? moment(birth) : null
      })
    },
    // 健康状况传值
    setheath () {
      this.form.setFieldsValue({
        healths: this.heathModel
      })
    },
    // 发布
    publish (e) {
      // this.$router.push({
      //   name: 'adoptAdd',
      //   query: { flag: 'publish', id: e.id, childNumber: e.childNumber }
      // })
      const vm = this
      vm.$confirm({
        title: '提示',
        content: '是否发布该条信息？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          vm.post('/readyAdoptionChildren/releaseById', { id: vm.id }).then((res) => {
            if (res) {
              vm.returns()
            }
          })
        },
        onCancel: () => { }
      })
    },
    // 地址传值
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    }
  }
}
</script>
<style scoped>
</style>
