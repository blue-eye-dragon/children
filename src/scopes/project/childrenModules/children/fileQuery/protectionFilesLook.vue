<template>
  <div style="padding: 1%;">

    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="调查评估信息"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.invesForm = form}">
        <ta-row ref="one"
                class="fromcom">
          <ta-col :span="8">
            <ta-form-item label="调查方式"
                          fieldDecoratorId="investigationMethod">
              <ta-select allowClear
                         :disabled="disabled">
                <ta-select-option v-for="item in investigationMethodList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="调查日期"
                          fieldDecoratorId="investigationDate">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="调查人员"
                          fieldDecoratorId="investigator">
              <ta-input :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label="调查地点"
                          fieldDecoratorId="investigationAddr">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="16">
            <ta-form-item label="是否需要临时监护"
                          fieldDecoratorId="isTempCustody"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 9 }">
              <ta-select allowClear
                         :disabled="disabled">
                <ta-select-option v-for="item in yesList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>

          <ta-col :span="8">
            <ta-form-item label="临时监护类型"
                          fieldDecoratorId="tempCustodyType"
                          :labelCol="{ span: 6}"
                          :wrapperCol="{ span: 18 }"
                          :require="{message:'请选择临时监护类型'}">
              <ta-select allowClear
                         :dropdownMatchSelectWidth="false"
                         :placeholder="!disabled?'请选择临时监护类型':''"
                         :disabled="disabled">
                <ta-select-option v-for="item in tempCustodyTypeList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>

          <ta-col :span="16">
            <ta-form-item label='生活情况'
                          fieldDecoratorId="livingCondition"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }">
              <ta-textarea :rows="4"
                           :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label='就学情况'
                          fieldDecoratorId="learningCondition"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }">
              <ta-textarea :rows="4"
                           :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label='家庭情况'
                          fieldDecoratorId="familySituation"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }">
              <ta-textarea :rows="4"
                           :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label='监护情况'
                          fieldDecoratorId="guardianshipSituation"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }">
              <ta-textarea :rows="4"
                           :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label='备注'
                          fieldDecoratorId="remarks"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }">
              <ta-textarea :rows="4"
                           :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label='未成年人保护中心意见'
                          fieldDecoratorId="minorProtectionCenterOpinion"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }">
              <ta-textarea :rows="4"
                           :disabled="disabled" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>

    <div ref="twoout"
         class="mars">
      <Title id="anchorpoint_b"
             title="临时监护信息"
             :show.sync="showtwo"></Title>
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.tempForm = form}">
        <ta-row ref="two"
                class="fromcom">
          <ta-col :span="8">
            <ta-form-item label="监护方式"
                          fieldDecoratorId="custodyType">
              <ta-select allowClear
                         :disabled="disabled">
                <ta-select-option v-for="item in custodyTypeList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="监护时间"
                          fieldDecoratorId="custodyDate">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="经办人"
                          fieldDecoratorId="transactor">
              <ta-input :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label="监护时长（天）"
                          fieldDecoratorId="duration">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8"
                  v-if="type==Enum.GUARDIANSHIP.JTJY">
            <ta-form-item label="家庭寄养主照料人姓名"
                          fieldDecoratorId="name">
              <ta-input :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label="家庭寄养主照料人身份证号"
                          fieldDecoratorId="idCard">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8"
                  v-if="type==Enum.GUARDIANSHIP.JTJY">
            <ta-form-item label="家庭寄养主照料人性别"
                          fieldDecoratorId="sex">
              <ta-select allowClear
                         :disabled="disabled">
                <ta-select-option v-for="item in sexList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="家庭寄养主照料人联系电话"
                          fieldDecoratorId="phone">
              <ta-input :disabled='disabled' />
            </ta-form-item>
          </ta-col>

          <ta-col :span="16"
                  v-if="type==Enum.GUARDIANSHIP.JTJY">
            <ta-col :span="12">
              <AddressComponent :addressmodel="addressmodel1"
                                :msg="'寄养家庭地址'"
                                :isRequire="false"
                                :disabled="disabled"
                                fileldName='fosterFamilyDatas'
                                @setaddress="setaddress1"></AddressComponent>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label
                            fieldDecoratorId="fosterFamilyAddr"
                            :labelCol="{ span: 0 }"
                            :wrapperCol="{ span: 23,offset:1 }">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="8"
                  v-if="type==Enum.GUARDIANSHIP.JGFY">
            <ta-form-item label="儿童福利机构名称"
                          fieldDecoratorId="name">
              <ta-input :disabled='disabled' />
            </ta-form-item>
            <ta-form-item label="儿童福利机构负责人身份证号"
                          fieldDecoratorId="idCard">
              <ta-input :disabled='disabled' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8"
                  v-if="type==Enum.GUARDIANSHIP.JGFY">
            <ta-form-item label="儿童福利机构负责人"
                          fieldDecoratorId="director">
              <ta-input :disabled='disabled' />
            </ta-form-item>
            <ta-form-item label="儿童福利机构联系电话"
                          fieldDecoratorId="phone">
              <ta-input :disabled='disabled' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="16"
                  v-if="type==Enum.GUARDIANSHIP.JGFY">
            <ta-col :span="12">
              <AddressComponent :addressmodel="addressmodel2"
                                :msg="'儿童福利机构地址'"
                                :isRequire="false"
                                :disabled="disabled"
                                fileldName='mechanismDatas'
                                @setaddress="setaddress2"></AddressComponent>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label
                            fieldDecoratorId="mechanismAddr"
                            :labelCol="{ span: 0 }"
                            :wrapperCol="{ span: 23,offset:1 }">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="8"
                  v-if="type==Enum.GUARDIANSHIP.JSXX">
            <ta-form-item label="寄宿学校名称"
                          fieldDecoratorId="name">
              <ta-input :disabled='disabled' />
            </ta-form-item>
            <ta-form-item label="寄宿学校负责人身份证号"
                          fieldDecoratorId="idCard">
              <ta-input :disabled='disabled' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8"
                  v-if="type==Enum.GUARDIANSHIP.JSXX">
            <ta-form-item label="寄宿学校负责人"
                          fieldDecoratorId="director">
              <ta-input :disabled='disabled' />
            </ta-form-item>
            <ta-form-item label="寄宿学校联系电话"
                          fieldDecoratorId="phone">
              <ta-input :disabled='disabled' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="16"
                  v-if="type==Enum.GUARDIANSHIP.JSXX">
            <ta-col :span="12">
              <AddressComponent :addressmodel="addressmodel3"
                                :msg="'寄宿学校地址'"
                                :isRequire="false"
                                :disabled="disabled"
                                fileldName='boardingSchoolDatas'
                                @setaddress="setaddress3"></AddressComponent>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label
                            fieldDecoratorId="boardingSchoolAddr"
                            :labelCol="{ span: 0 }"
                            :wrapperCol="{ span: 23,offset:1 }">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>

    <div ref="threeout"
         class="mars">
      <Title id="anchorpoint_c"
             title="转介帮扶信息"
             :show.sync="showthree"></Title>
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.referForm = form}">
        <ta-row ref="three"
                class="fromcom">
          <ta-col :span="16">
            <ta-form-item label="帮扶牵头单位"
                          fieldDecoratorId="leadCompany"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <AddressComponent :addressmodel="addressmodel4"
                                :msg="'帮扶落实单位'"
                                :isRequire="false"
                                :disabled="disabled"
                                fileldName='implementCompanyDatas'
                                @setaddress="setaddress4"></AddressComponent>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label
                            fieldDecoratorId="implementCompanyAddr"
                            :labelCol="{ span: 0 }"
                            :wrapperCol="{ span: 23,offset:1 }">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="帮扶类型"
                          fieldDecoratorId="helpType">
              <ta-select allowClear
                         :disabled="disabled">
                <ta-select-option v-for="item in helpTypeList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="帮扶负责人"
                          fieldDecoratorId="header">
              <ta-input :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label="帮扶时间"
                          fieldDecoratorId="helpDate">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>

          <ta-col :span="8">
            <ta-form-item label="帮扶措施"
                          fieldDecoratorId="helpMeasure">
              <ta-input :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label="帮扶负责人职务"
                          fieldDecoratorId="headerPost">
              <ta-input :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label="帮扶时长（天）"
                          fieldDecoratorId="duration">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div class="btnclass">
      <ta-button @click="returns"
                 style="left: 20px; top: 7px;">返回</ta-button>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
export default {
  name: 'register',
  components: {
    Title,
    AddressComponent
  },
  props: ['childEnterId'],
  data () {
    return {
      current: ['1'],
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      disabled: true,
      addressmodel1: [],
      addressmodel2: [],
      addressmodel3: [],
      addressmodel4: [],
      type: '', // 监护方式选择的数据：家庭寄养1，机构抚养2，寄宿学校3

      investigationMethodList: [], // 获取调查方式字典数据
      yesList: [], // 获取是否需要临时监护字典数据
      custodyTypeList: [], // 获取监护方式字典数据
      sexList: [], // 性别字典数据
      helpTypeList: [], // 获取帮扶类型字典数据

      activeKey: ['1', '2', '3'],
      obj: {}, // 保护档案跳转带过来的数据

      tempCustodyTypeList: [], // 临时监护类型字典

    }
  },
  activated () {
    this.initDatas()
  },
  created () { },
  mounted () {
    this.getMenuDatas()
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
      this.setHeight('three', 'threeout')
    })
  },
  methods: {
    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('INVESTIGATION', 'investigationMethodList') // 获取调查方式字典数据
      this.getMenu('YESNO', 'yesList') // 获取是否需要临时监护字典数据
      this.getMenu('GUARDIANSHIP', 'custodyTypeList') // 获取监护方式字典数据
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('SUPPORTTYPES', 'helpTypeList') // 获取帮扶类型字典数据
      this.getMenu('TEMPORARYCUSTODYTYPE', 'tempCustodyTypeList') // 获取帮扶类型字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 初始化数据
    initDatas () {
      this.obj = JSON.parse(this.$route.query.obj)
      // 调查评估赋值
      this.post('/investigationAndEvaluation/queryById', { id: this.obj.id }).then((res) => {
        if (res.serviceSuccess) {
          let { data } = res.data
          data['investigationDate'] = data.investigationDate.substring(0, 10) || ''
          this.invesForm.setFieldsValue(data)
        }
      })
      // 临时监护赋值
      this.post('/temporaryCustody/queryById', { id: this.obj.id }).then((res) => {
        if (res.serviceSuccess) {
          let { data } = res.data
          this.type = data.custodyType
          this.$nextTick(() => {
            let types = ''
            let vo = ''
            let addressmodel = 'addressmodel1'
            if (data.custodyType == this.Enum.GUARDIANSHIP.JTJY) { // 家庭寄养
              types = 'fosterFamily'
              vo = 'fosterFamilyInfoVo'
            }
            if (data.custodyType == this.Enum.GUARDIANSHIP.JGFY) { // 机构抚养
              types = 'mechanism'
              vo = 'raiseOrganizationInfoVo'
              addressmodel = 'addressmodel2'
            }
            if (data.custodyType == this.Enum.GUARDIANSHIP.JSXX) { // 寄宿学校
              types = 'boardingSchool'
              vo = 'boardingSchoolInfoVo'
              addressmodel = 'addressmodel3'
            }
            this.tempForm.setFieldsValue({
              custodyType: data.custodyType,
              custodyDate: data.custodyDateStart.substring(0, 10) + '~' + data.custodyDateEnd.substring(0, 10),
              transactor: data.transactor,
              duration: data.duration
            })
            this.tempForm.setFieldsValue(data[vo])

            // 地址
            this[addressmodel] = [
              data[vo][types + 'Province'] || '',
              data[vo][types + 'City'] || '',
              data[vo][types + 'County'] || ''
            ]
            this.setHeight('two', 'twoout')
          })
        }
      })
      // 转介帮扶赋值
      this.post('/juvenilesHelp/queryByInvestId', { investId: this.obj.id }).then((res) => {
        if (res.serviceSuccess) {
          let { data } = res.data
          this.referForm.setFieldsValue(data)
          this.referForm.setFieldsValue({
            helpDate: data.helpDateStart.substring(0, 10) + '~' + data.helpDateEnd.substring(0, 10)
          })
          // 地址
          this.addressmodel4 = [
            data.implementCompanyProvince || '',
            data.implementCompanyCity || '',
            data.implementCompanyCounty || ''
          ]
        }
      })
    },
    // 临时监护地址传值-家庭
    setaddress1 () {
      this.tempForm.setFieldsValue({
        fosterFamilyDatas: this.addressmodel1
      })
    },
    // 临时监护地址传值-机构
    setaddress2 () {
      this.tempForm.setFieldsValue({
        mechanismDatas: this.addressmodel2
      })
    },
    // 临时监护地址传值-学校
    setaddress3 () {
      this.tempForm.setFieldsValue({
        boardingSchoolDatas: this.addressmodel3
      })
    },
    // 转介帮扶地址传值-帮扶单位
    setaddress4 () {
      this.referForm.setFieldsValue({
        implementCompanyDatas: this.addressmodel4
      })
    },
    // 返回
    returns () {
      this.$router.go(-1)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[ref] && this.$refs[ref] != undefined && node) {
          if (this.$refs[ref].$el != undefined) {
            if (!istrue) {
              node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
            } else {
              node.style.height = '50px'
            }
            node.style.transition = 'all 1s'
          }
        }
      })
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin-left: 32px;
}

.hei {
  height: 500px;
  background: pink;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.btnclass {
  position: fixed;
  bottom: 0px;
  background-color: white;
  width: 74%;
  height: 45px;
}
</style>
