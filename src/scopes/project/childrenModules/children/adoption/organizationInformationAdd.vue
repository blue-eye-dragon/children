<template>
  <div class="padbottom conts tadrawer">
    <div ref="oneout"
         class="contin">
      <ta-form :autoFormCreate="orgFrom => { this.orgFrom = orgFrom;  } "
               :disabled="disabled"
               ref="one">
        <ta-row>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="所属行政区">
                <ta-input :placeholder="formData.areaName"
                          :disabled="true" />
              </ta-form-item>
              <!-- <AddressComponent msg="所属行政区"
                          :addressmodel="addressmodel"
                          @setaddress="setaddress"
                          :disabled="true"></AddressComponent> -->
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="登记机关编码"
                            fieldDecoratorId="organCode">
                <ta-input style="width:250px"
                          placeholder="登记机关编码"
                          :disabled="true" />
                <span class="fred">（系统自动生成）</span>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <!-- <ta-form-item label="机构类型" fieldDecoratorId="orgType" :require="{ message: '请选择机构类型' }"> -->
              <ta-form-item label="机构类型"
                            :require="{ message: '请选择机构类型' }"
                            fieldDecoratorId="orgType">
                <ta-select placeholder="请选择机构类型"
                           @change="v => orgFrom.setFieldsValue({ orgType: v })"
                           :disabled="disabled">
                  <ta-select-option :value="item.value"
                                    v-for="(item, index) in orgType"
                                    :key="index">{{ item.label }}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="上级组织机构"
                            fieldDecoratorId="superiorOrg">
                <ta-input :disabled="true" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="全宗号"
                            fieldDecoratorId="casesNo"
                            :fieldDecoratorOptions="verificationRules('全宗号', 100)">
                <ta-input placeholder="请输入全宗号"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="办公面积"
                            fieldDecoratorId="officeSpace">
                <ta-select placeholder="请选择办公面积"
                           @change="v => orgFrom.setFieldsValue({ officeSpace: v })"
                           :disabled="disabled">
                  <ta-select-option :value="item"
                                    v-for="(item, index) in officeSpace"
                                    :key="index">{{ item }}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="机构名称"
                            fieldDecoratorId="agencyName"
                            :fieldDecoratorOptions="verificationRules('机构名称', 100)">
                <ta-input placeholder="请输入机构名称"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <!-- // v-if="orgFrom.agencyNature" -->
              <ta-form-item label="登记机构性质"
                            fieldDecoratorId="agencyNature"
                            :require="{message:'请选择登记机构性质'}">
                <ta-select placeholder="请选择登记机构性质"
                           @change="v => orgFrom.setFieldsValue({ agencyNature: v })"
                           :disabled="disabled">
                  <ta-select-option :value="item.value"
                                    v-for="(item, index) in agencyNature"
                                    :key="index">{{ item.label }}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="咨询电话"
                            fieldDecoratorId="consultPhone"
                            :fieldDecoratorOptions="verificationRules('咨询电话',{ type:'phone'})">
                <ta-input placeholder="请输入咨询电话"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="投诉电话"
                            fieldDecoratorId="complainPhone"
                            :fieldDecoratorOptions="verificationRules('投诉电话',{ type:'phone'})">
                <ta-input placeholder="请输入投诉电话"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="邮政编码"
                            fieldDecoratorId="postalCode"
                            :fieldDecoratorOptions="verificationRules('邮政编码',{ type:'zipCode'})">
                <ta-input :disabled="disabled"
                          placeholder="请输入邮政编码" />
              </ta-form-item>
            </ta-col>

            <ta-col :span="8">
              <ta-form-item label="是否统一着装"
                            fieldDecoratorId="unifieddressYesOrNo"
                            :fieldDecoratorOptions="{ initialValue: 0 }">
                <ta-switch style="margin-top:10px"
                           checkedChildren="是"
                           unCheckedChildren="否"
                           :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="办公地点"
                          :wrapperCol="{span:22}"
                          :labelCol="{span:2}"
                          fieldDecoratorId="officeLocation"
                          :fieldDecoratorOptions="verificationRules('办公地点', 300)">
              <ta-input :disabled="disabled"
                        :placeholder="disabled ? '' : '请输入办公地点'" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="12">
              <ta-form-item label="批准编制数"
                            :wrapperCol="{span:20}"
                            :labelCol="{span:4}">
                <ta-input style="width:100px"
                          :value="apprCompileNum"
                          :disabled="true" />（人）
                <section class="num-box">
                  其中
                  <div>
                    <span>行政编制：</span>
                    <ta-input-number v-model="formData.apprAdministrativeCompile"
                                     :min="0"
                                     :max="99999"
                                     :precision="0"
                                     :disabled="disabled" />（人）
                  </div>
                  <div style="margin-top:6px">
                    <span>参照公务员管理事业编制：</span>
                    <ta-input-number v-model="formData.apprReferServantManageCompile"
                                     :min="0"
                                     :max="99999"
                                     :precision="0"
                                     :disabled="disabled" />（人）
                  </div>
                  <div style="margin-top:6px">
                    <span>财政补助事业编制：</span>
                    <ta-input-number v-model="formData.apprFinancialCareerCompile"
                                     :min="0"
                                     :max="99999"
                                     :precision="0"
                                     :disabled="disabled" />（人）
                  </div>
                  <div style="margin-top:6px">
                    <span>自收自支编制：</span>
                    <ta-input-number v-model="formData.apprRaiseCareerCompile"
                                     :min="0"
                                     :max="99999"
                                     :precision="0"
                                     :disabled="disabled" />（人）
                  </div>
                </section>
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="实际人数"
                            :wrapperCol="{span:20}"
                            :labelCol="{span:4}">
                <ta-input style="width:100px"
                          :value="actualNum"
                          :disabled="true" />（人）
                <section class="num-box">
                  其中
                  <div>
                    <span>行政编制：</span>
                    <ta-input-number v-model="formData.actualAdminCompile"
                                     :min="0"
                                     :max="99999"
                                     :precision="0"
                                     :disabled="disabled" />（人）
                  </div>
                  <div style="margin-top:6px">
                    <span>参照公务员管理事业编制：</span>
                    <ta-input-number v-model="formData.actualReferServantManageCompile"
                                     :min="0"
                                     :max="99999"
                                     :precision="0"
                                     :disabled="disabled" />（人）
                  </div>
                  <div style="margin-top:6px">
                    <span>财政补助事业编制：</span>
                    <ta-input-number v-model="formData.actualFinancialCareerCompile"
                                     :min="0"
                                     :max="99999"
                                     :precision="0"
                                     :disabled="disabled" />（人）
                  </div>
                  <div style="margin-top:6px">
                    <span>自收自支编制：</span>
                    <ta-input-number v-model="formData.actualRaiseCareerCompile"
                                     :min="0"
                                     :max="99999"
                                     :precision="0"
                                     :disabled="disabled" />（人）
                  </div>
                </section>
              </ta-form-item>
            </ta-col>
          </ta-col>

          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="收养登记档案目录每页条数"
                            fieldDecoratorId="adoptionRegisArchivesDicNum"
                            :wrapperCol="{span:8}"
                            :labelCol="{span:16}">
                <ta-input-number style="width:80%"
                                 :min="0"
                                 :max="99999"
                                 :precision="0"
                                 :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="解除收养登记档案目录每页条数"
                            fieldDecoratorId="relieveAdoptionRegisArchivesDicNum"
                            :wrapperCol="{span:8}"
                            :labelCol="{span:16}">
                <ta-input-number style="width:80%"
                                 :min="0"
                                 :max="99999"
                                 :precision="0"
                                 :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="补发登记档案目录每页条数"
                            fieldDecoratorId="reissueAdoptionRegisArchivesDicNum"
                            :wrapperCol="{span:8}"
                            :labelCol="{span:16}">
                <ta-input-number style="width:80%"
                                 :min="0"
                                 :max="99999"
                                 :precision="0"
                                 :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="撤销收养登记档案目录每页条数"
                            fieldDecoratorId="revokeAdoptionArchivesDicNum"
                            :wrapperCol="{span:8}"
                            :labelCol="{span:16}">
                <ta-input-number style="width:80%"
                                 :min="0"
                                 :max="99999"
                                 :precision="0"
                                 :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="成立时间"
                            fieldDecoratorId="setupTime"
                            :require="{message:'请选择成立时间'}">
                <ta-date-picker format="YYYY-MM-DD"
                                style="width:100%"
                                :disabledDate="disabledDate"
                                :placeholder="disabled ? '' : '请选择成立时间'"
                                :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="撤销时间"
                            fieldDecoratorId="cancelTime">
                <ta-date-picker format="YYYY-MM-DD"
                                style="width:100%"
                                :placeholder="disabled ? '' : '请选择撤销时间'"
                                :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="排序号"
                            :require="{message:'请输入排序号'}"
                            fieldDecoratorId="sortNum">
                <ta-input-number :min="0"
                                 style="width: 100%;"
                                 :max="99999"
                                 :precision="0"
                                 :placeholder="disabled ? '' : '请输入排序号'"
                                 :disabled="disabled" />
              </ta-form-item>
            </ta-col>

          </ta-col>

          <ta-col :span="24">
            <ta-col :span="16">
              <ta-form-item label="台账部门编码"
                            :wrapperCol="{span:21}"
                            :labelCol="{span:3}"
                            fieldDecoratorId="accountDepartmentCode"
                            :fieldDecoratorOptions="verificationRules('台账部门编码', 32)">
                <ta-input :placeholder="disabled ? '' : '请输入台账部门编码'"
                          :disabled="disabled"
                          style="width:250px" />
                <span class="fred">（计财处台账系统专用部门编码）</span>
              </ta-form-item>

            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="办公时间"
                          :wrapperCol="{span:22}"
                          :labelCol="{span:2}"
                          fieldDecoratorId="officeHours"
                          :fieldDecoratorOptions="verificationRules('办公时间', 200)">
              <ta-textarea :rows="4"
                           :placeholder="disabled ? '' : '请输入办公时间，例如：上午8:30-11:30，下午1:30-6:30'"
                           :disabled="disabled" />
            </ta-form-item>
          </ta-col>
        </ta-row>

      </ta-form>
    </div>
    <div class="bom">
      <ta-button class="but"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 v-if="!disabled"
                 class="but"
                 @click="submit"
                 :disabled="disabled">提交</ta-button>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-irregular-whitespace
import AddressComponent from '@component/common/components/addressComponent'
/* 新增、编辑、查看 */
import moment from 'moment'
export default {
  name: 'organizationInformationAdd',
  components: { AddressComponent },
  data () {
    return {
      orgFrom: {}, // 表单
      formData: {}, // 一些不通过orgFrom获取的表单数据
      agencyNature: null, // 登记机构性质
      orgType: null, // 机构类型
      // eslint-disable-next-line standard/array-bracket-even-spacing
      officeSpace: ['30平方米以下', '30 - 50平方米', '50 - 80平方米', '80 - 100平方米', '100 - 120平方米', '1200 - 150平方米', '150 - 200平方米', '200平方米以上'], // 办公面积
      disabled: false,
      superiorOrgId: '',
      addressmodel: []
    }
  },
  computed: {
    apprCompileNum () {
      let n = 0
        ;['apprAdministrativeCompile', 'apprReferServantManageCompile', 'apprFinancialCareerCompile', 'apprRaiseCareerCompile'].forEach(item => { n += parseInt(this.formData[item] || 0) })
      return n
    },
    actualNum () {
      let n = 0
        ;['actualAdminCompile', 'actualReferServantManageCompile', 'actualFinancialCareerCompile', 'actualRaiseCareerCompile'].forEach(item => { n += parseInt(this.formData[item] || 0) })
      return n
    }
  },
  beforeUpdate () {
    this.$refs.oneout.style.height = this.$refs.one.$el.offsetHeight + 160 + 'px'
  },
  watch: {},
  methods: {
    disabledDate (current) {
      const startDates = moment(new Date())
      return current && current > startDates
    },
    // 地址数据赋值
    setaddress () {
      this.orgFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 登记机构性质
    async getAgencyNature () {
      const data = await this.getDictionaries('ADOPTIONORGNATURE')
      this.agencyNature = data
    },
    // 机构类型
    async getorgType () {
      const data = await this.getDictionaries('ADOPTIONORGTYPE')
      this.orgType = data
    },
    fnValidatePostCode (rule, value, callback) {
      if (value && !/^[0-9]{6}$/.test(value)) {
        callback('请输入正确的邮政编码')
      } else {
        callback()
      }
    },
    backs () {
      this.orgFrom.resetFields()
      this.$router.go(-1)
    },
    // 基本信息提交
    async submit () {
      const query = this.$route.query
      this.orgFrom.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          const params = this.orgFrom.getFieldsValue()
          params.setupTime = moment(params.setupTime).format('YYYY-MM-DD')
          params.cancelTime = moment(params.cancelTime).format('YYYY-MM-DD')
          params.apprCompileNum = this.apprCompileNum
          params.actualNum = this.actualNum
          params.unifieddressYesOrNo = params.unifieddressYesOrNo ? 1 : 0
          if (query.nowtype == 1) {
            // 新增
            url = '/adoptionRegisterAgency/save'
            text = '增加成功'
          } else {
            // 编辑
            text = '修改成功'
            url = '/adoptionRegisterAgency/update'
            params.id = query.id
          }
          params.registId = this.registId
          const newData = JSON.parse(JSON.stringify(this.formData))
          newData.superiorOrg = this.superiorOrgId
          const data = await this.post(url, Object.assign(params, newData))
          if (data.errors === null) {
            this.$message.success(text)
            this.backs()
          }
        }
        // this.backs()
      })
    }
  },
  async mounted () {
    await this.getAgencyNature()
    await this.getorgType()
  },
  async activated () {
    const query = this.$route.query
    this.disabled = query.disabled || false
    // 除新增外都需要读取数据
    if (query.nowtype !== 1) {
      // 获取详情
      const userInfo = window.parent.indexTool.getUserInfo()
      const res = await this.post('/adoptionRegisterAgency/queryById', { id: query.id })
      const data = res.data.data
      this.superiorOrgId = data.superiorOrg
      const newData = JSON.parse(JSON.stringify(data))
      newData.superiorOrg = newData.superiorOrgName
      // 初始化成立时间和撤销时间
      this.orgFrom.setFieldsValue(Object.assign({}, newData, {
        setupTime: moment(new Date(data.setupTime), 'YYYY/MM/DD'),
        cancelTime: moment(new Date(data.cancelTime), 'YYYY/MM/DD')
      }))

      this.formData.areaName = userInfo.areaName
      this.formData.areaCode = userInfo.areaCode
      this.addressmodel = [data.areaCode]
        // 初始化编制人数和实际编制人数
        ;['apprAdministrativeCompile', 'apprReferServantManageCompile', 'apprFinancialCareerCompile', 'apprRaiseCareerCompile'].forEach(item => {
          this.$set(this.formData, item, data[item] || 0)
        })
        ;['actualAdminCompile', 'actualReferServantManageCompile', 'actualFinancialCareerCompile', 'actualRaiseCareerCompile'].forEach(item => {
          this.$set(this.formData, item, data[item] || 0)
        })
    } else {
      // 新增
      const userInfo = window.parent.indexTool.getUserInfo()
      this.formData = {}
      this.formData.areaName = userInfo.areaName
      this.formData.areaCode = userInfo.areaCode
      // 获取登记机关编码的
      const organCodeData = await this.post('/adoptionRegisterAgency/generateAreacode')
      const orgId = await this.post('/adoptionRegisterAgency/getUpLevelOrgInfo', { orgId: userInfo.orgId })
      if (!organCodeData.data.errors) {
        this.superiorOrgId = orgId.data && orgId.data.data.parentId
        this.orgFrom.setFieldsValue(
          {
            organCode: organCodeData.data.data,
            superiorOrg: orgId.data && orgId.data.data.orgName
          }
        )
      }
    }
  }
}
</script>
<style scoped>
.form-box {
  width: 70%;
  margin: 20px;
  margin-left: 40px;
}
.but {
  margin-left: 20px;
}
.fred {
  color: brown;
}
.num-box {
  border: 1px solid #eee;
  margin-top: 10px;
  padding: 15px;
}
.num-box > div {
  width: 100%;
}
.num-box > div span {
  display: inline-block;
  width: 200px;
  text-align: right;
}
</style>
