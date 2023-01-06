<template>
  <!-- 撤销 -->
  <div style="height:100%">
    <ta-border-layout>
      <div>
        <ta-form layout="horizontal"
                 :autoFormCreate="(otherInfoForm)=>{this.otherInfoForm = otherInfoForm}">
          <ta-row style=" margin-bottom: 0px;"
                  class="fromcom">
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="撤销原因"
                              :require="{message:'请选择撤销原因'}"
                              fieldDecoratorId="revokeReason"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-select :disabled="NoEdit"
                             placeholder="撤销原因"
                             @change="showOne">
                    <ta-select-option v-for="(item,index) in backoutResionList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
            </ta-col>
            <div class="item_title">
              <!-- <div class="lines"></div> -->
              <!-- <p  class="item_text" style="width:150px">父/母信息</p> -->
              <div class="horizontalline"></div>
            </div>
            <div v-if="selects==1">
              <!-- <div class="item_title">
                <div class="lines"></div>
                <p  class="item_text" style="width:150px">父/母信息</p>
                <div class="horizontalline"></div>
              </div>-->
              <ta-col :span="24">
                <ta-form-item label="至少填写父母一方信息"
                              :disabled="NoEdit"
                              :fieldDecoratorOptions="{rules: [{validator: customValidate}]}"
                              fieldDecoratorId="mF"
                              :labelCol="{span:4}"
                              :wrapperCol="{span:20}"
                              :require="{message:'请勾选至少填写父母一方信息'}">
                  <ta-checkbox-group :disabled="NoEdit"
                                     :options="plainOptions"
                                     :value="checkList"
                                     :defaultValue="checkList"
                                     @change="onChange" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="24">
                <ta-col :span="6">
                  <ta-form-item v-if="father"
                                label="父亲姓名"
                                :fieldDecoratorOptions="verificationRules('姓名',72)"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="name">
                    <ta-input :disabled="NoEdit"
                              placeholder="请输入姓名" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="身份证号"
                                :require="{message:'请输入身份证号'}"
                                fieldDecoratorId="idCard"
                                v-if="father"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                :fieldDecoratorOptions="{rules: [{ idCard: '2', message: '输入的身份证号码不合法' }]}">
                    <ta-input :disabled="NoEdit"
                              placeholder="请输入身份证号" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="联系电话"
                                fieldDecoratorId="contactNumber"
                                v-if="father"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                :fieldDecoratorOptions="verificationRules('联系电话',{type: 'phone'})">
                    <ta-input :disabled="NoEdit"
                              placeholder="请输入联系电话" />
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-col :span="6">
                  <AddressComponent v-if="father"
                                    :disabled="NoEdit"
                                    :addressmodel="addressmodel"
                                    :msg="'联系地址'"
                                    :labelwidth="labelwidth"
                                    @setaddress="setaddress"></AddressComponent>
                  <!-- <ta-form-item
                    label="联系地址"
                    :require="{message:'请选择患病类型'}"
                    fieldDecoratorId="XXXXXXX"
                       v-if="father"
                  >
                    <ta-select :disabled="NoEdit" mode="multiple" placeholder="请选择患病类型">
                      <ta-select-option
                        v-for="(item,index) in illnessList"
                        :value="item.value"
                        :key="index"
                      >{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>-->
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="详细地址"
                                fieldDecoratorId="currentAddressDetail"
                                v-if="father"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                :fieldDecoratorOptions="verificationRules('详细地址',100)">
                    <ta-input :disabled="NoEdit"
                              placeholder="请输入详细地址" />
                  </ta-form-item>
                </ta-col>
              </ta-col>
            </div>
          </ta-row>
        </ta-form>

        <!-- <Main></Main> -->
        <div>
          <div v-if="mather&&father"
               class="item_title">
            <div class="horizontalline"></div>
          </div>
          <ta-form layout="horizontal"
                   :autoFormCreate="(motherInfoForm)=>{this.motherInfoForm = motherInfoForm}">
            <ta-row style="    margin-bottom: 0px;"
                    class="fromcom">
              <ta-col :span="24">
                <ta-col :span="6">
                  <ta-form-item label="母亲姓名"
                                :fieldDecoratorOptions="verificationRules('母亲姓名',72)"
                                fieldDecoratorId="name"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                v-if="mather">
                    <ta-input :disabled="NoEdit"
                              placeholder="请输入母亲姓名" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item v-if="mather"
                                label="身份证号"
                                :require="{message:'请输入身份证号'}"
                                fieldDecoratorId="idCard"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                :fieldDecoratorOptions="{rules: [{ idCard: '2', message: '输入的身份证号码不合法' }]}">
                    <ta-input :disabled="NoEdit"
                              placeholder="请输入身份证号" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item v-if="mather"
                                label="联系电话"
                                fieldDecoratorId="contactNumber"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                :fieldDecoratorOptions="verificationRules('联系电话',{type: 'phone'})">
                    <ta-input :disabled="NoEdit"
                              placeholder="请输入联系电话" />
                  </ta-form-item>
                </ta-col>

                <!-- <ta-form-item
                    label="联系地址"
                    :require="{message:'请选择患病类型'}"
                    fieldDecoratorId="XXXXXXXX"
                    v-if="mather"
                  >
                    <ta-select :disabled="NoEdit" mode="multiple" placeholder="请选择患病类型">
                      <ta-select-option
                        v-for="(item,index) in illnessList"
                        :value="item.value"
                        :key="index"
                      >{{item.label}}</ta-select-option>
                    </ta-select>
              </ta-form-item>-->
              </ta-col>
              <ta-col :span="24">
                <ta-col :span="6">
                  <AddressComponent v-if="mather"
                                    :disabled="NoEdit"
                                    :addressmodel="addressmodel2"
                                    :msg="'联系地址'"
                                    :labelwidth="labelwidth"
                                    @setaddress="setaddress2"></AddressComponent>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="详细地址"
                                v-if="mather"
                                fieldDecoratorId="currentAddressDetail"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                :fieldDecoratorOptions="verificationRules('详细地址',100)">
                    <ta-input :disabled="NoEdit"
                              placeholder="请输入详细地址" />
                  </ta-form-item>
                </ta-col>
              </ta-col>
            </ta-row>
          </ta-form>
        </div>
        <!-- <Main></Main> -->
        <div v-if="selects!=1">
          <!-- <div class="item_title">
            <div class="horizontalline"></div>
          </div>-->
          <ta-form layout="horizontal"
                   :autoFormCreate="(revokeInfoForm)=>{this.revokeInfoForm = revokeInfoForm}">
            <ta-row style="    margin-bottom: 0px;"
                    class="fromcom">
              <ta-col :span="24"
                      v-if="selects==2">
                <ta-form-item label="错误描述"
                              fieldDecoratorId="errorInfo"
                              :labelCol="{span:2}"
                              :wrapperCol="{span:22}"
                              :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入错误描述' },{validator: fnmustKeep }]}">
                  <ta-textarea :disabled="NoEdit" />
                </ta-form-item>
              </ta-col>
              <!-- <div class="item_title">
                <div class="horizontalline"></div>
              </div>-->
              <ta-col :span="24">
                <ta-col :span="6"
                        v-if="selects==3">
                  <ta-form-item label="死亡日期"
                                :require="{message:'请选择死亡日期'}"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="deathDate">
                    <ta-date-picker style="width:100%;"
                                    :disabledDate="disabledStartDate"
                                    placeholder="请选择死亡日期"
                                    :disabled="NoEdit" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6"
                        v-if="selects==3">
                  <ta-form-item label="死亡原因"
                                :require="{message:'请选择死亡原因'}"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="deathReason">
                    <ta-select :disabled="NoEdit">
                      <ta-select-option v-for="(item,index) in deathList"
                                        :value="item.value"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <!-- <div class="item_title">
                <div class="horizontalline"></div>
              </div>-->
                <ta-col :span="6"
                        v-if="selects==4">
                  <ta-form-item label="离院日期"
                                :require="{message:'请选择离院日期'}"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="departureDate">
                    <ta-date-picker style="width:100%;"
                                    :disabledDate="disabledStartDate"
                                    placeholder="请选择离院日期"
                                    :disabled="NoEdit" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6"
                        v-if="selects==4">
                  <ta-form-item label="离院原因"
                                :require="{message:'请选择离院原因'}"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="departureReason">
                    <ta-select :disabled="NoEdit">
                      <ta-select-option v-for="(item,index) in postureList"
                                        :value="item.value"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
              </ta-col>
            </ta-row>
          </ta-form>
        </div>

        <ta-form layout="horizontal"
                 :autoFormCreate="(timeForm)=>{this.timeForm = timeForm}">
          <ta-row style="    margin-bottom: 100px;"
                  class="fromcom">
            <div class="item_title"
                 v-if="NoEdit">
              <div class="horizontalline"></div>
            </div>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="撤销时间"
                              fieldDecoratorId="createTime"
                              :require="{message:''}"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              v-if="NoEdit">
                  <ta-date-picker style="width:100%;"
                                  placeholder="请选择撤销时间"
                                  :disabled="true" />
                </ta-form-item>
              </ta-col>
            </ta-col>
          </ta-row>
        </ta-form>

        <div class="bom">
          <ta-button class="preservation"
                     @click="backs"
                     style="margin-left:20px">返回</ta-button>
          <ta-button type="primary"
                     class="preservation"
                     @click="submit()"
                     style="margin-left:20px"
                     v-if="!NoEdit">提交</ta-button>
        </div>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import moment from 'moment'

import AddressComponent from '@component/common/components/addressComponent'
const plainOptions = [
  { label: '父亲', value: '0' },
  { label: '母亲', value: '1' }
]
export default {
  components: {
    AddressComponent
  },
  data () {
    return {
      plainOptions,
      NoEdit: false,
      // Fstandby: false,
      // Mstandby: false,
      Rstandby: false,
      selects: '0',
      father: false,
      mather: false,

      childBaseId: '',
      ListUrl: '',
      ListId: '',
      where: '',
      childSeekingRevokeVo: [], // 撤销
      childSeekingVo: [], // 寻亲发布
      seekingChindInfoVo: [], // 儿童基本
      toBeAdoptedChildVo: [], // 待收养
      // z//
      childTypeList: [],
      childSituationTypeList: [],
      sexList: [],
      illnessList: [],
      yesNoList: [],
      dLevelList: [],
      dTypeList: [],
      postureList: [],
      hairList: [],
      hairColorList: [],
      checkList: [],
      backoutResionList: [],
      deathList: [],
      //
      addressmodel: [],
      addressmodel2: [],
      labelwidth: {
        label: 8,
        wrapper: 16
      }
    }
  },
  activated () {
    this.checkList = []
    this.motherInfoForm.resetFields()
    this.otherInfoForm.resetFields()
    this.mather = false
    this.childBaseId = this.$route.query.childId
    this.NoEdit = this.$route.query.NoEdit ? this.$route.query.NoEdit : false
    this.ListId = this.$route.query.ListId ? this.$route.query.ListId : ''
    this.where = this.$route.query.where ? this.$route.query.where : '' // 0是非待收养
    if (this.NoEdit) {
      this.ListUrl = this.$route.query.url ? this.$route.query.url : ''
      this.getData()
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('12.33%', '87.67%', 'alonerow') // 单独一行字段宽度控制
    this.setLabelAndWrapperWidth('8.33%', '91.67%', 'alonerow1') // 单独一行字段宽度控制
  },
  mounted () {
    this.getList()
  },
  methods: {
    disabledStartDate (current) {
      return current && current > moment().endOf('day')
    },
    // 地址传值
    setaddress () {
      // 父
      this.otherInfoForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    setaddress2 () {
      // 母
      this.motherInfoForm.setFieldsValue({
        address_Linkage: this.addressmodel2
      })
    },
    customValidate (rule, value, callback) {
      if (this.checkList.length < 1) {
        this.mather = false
        this.father = false
        callback('请至少选择一个选项')
      } else {
        if (value.length == 2) {
          this.mather = true
          this.father = true
        } else {
          if (value == 0) {
            this.mather = false
            this.father = true
          } else {
            this.mather = true
            this.father = false
          }
        }
        callback()
      }
    },
    onChange (checkedList) {
      this.checkList = checkedList
    },
    async getData () {
      // 查看-----
      let param = { id: this.ListId, childBaseId: this.childBaseId }
      let result = await this.post(this.ListUrl, param)
      if (!result.errors) {
        console.log('撤回查看数据：：', result)
        // childSeekingRevokeVo
        let revokes = result.data.data.childSeekingRevokeVo
        this.otherInfoForm.setFieldsValue(revokes)
        let resion = revokes.revokeReason
        if (resion == 1) {
          if (
            result.data.data.motherFamilyMemberInfoVo &&
            result.data.data.fatherFamilyMemberInfoVo
          ) {
            this.checkList = ['0', '1']
          }
          if (
            result.data.data.motherFamilyMemberInfoVo &&
            !result.data.data.fatherFamilyMemberInfoVo
          ) {
            this.checkList = ['1']
          }
          if (
            !result.data.data.motherFamilyMemberInfoVo &&
            result.data.data.fatherFamilyMemberInfoVo
          ) {
            this.checkList = ['0']
          }
          if (result.data.data.fatherFamilyMemberInfoVo) {
            // 父
            this.selects = 1
            this.father = true
            let data = result.data.data.fatherFamilyMemberInfoVo
            this.$nextTick(() => {
              this.otherInfoForm.setFieldsValue(data)

              this.addressmodel.push(data.currentAddressPro,
                data.currentAddressCity,
                data.currentAddressCounty)

              this.setaddress()
            })
            // this.otherInfoForm.setFieldsValue()
          }
          if (result.data.data.motherFamilyMemberInfoVo) {
            // 母
            this.selects = 1
            // this.father = false
            this.mather = true
            let data = result.data.data.motherFamilyMemberInfoVo

            this.$nextTick(() => {
              this.motherInfoForm.setFieldsValue(data)
              this.addressmodel2.push(
                data.currentAddressPro,
                data.currentAddressCity,
                data.currentAddressCounty)
              this.setaddress2()
            })
          }
        }
        if (resion && resion != 1 && resion != 0) {
          this.selects = resion
          // alert(this.selects)
          this.$nextTick(() => {
            this.revokeInfoForm.setFieldsValue(revokes)
            if (this.selects == 4) {
              this.revokeInfoForm.setFieldsValue({
                departureDate: revokes.departureDate
                  ? moment(revokes.departureDate)
                  : null
              })
            }
            if (this.selects == 3) {
              this.revokeInfoForm.setFieldsValue({
                deathDate: revokes.deathDate ? moment(revokes.deathDate) : null
              })
            }
          })
        }
        this.timeForm.setFieldsValue({
          createTime: revokes.createTime ? moment(revokes.createTime) : null
        })
        //  let revokes = result.data.data.childSeekingRevokeVo
      }
    },

    async submit () {
      // otherInfoForm:父亲；motherInfoForm：母亲；revokeInfoForm：其他;1:找到父母；  2：错误信息 ； 3：儿童死亡；4：儿童离院

      let revokeReason = this.otherInfoForm.getFieldsValue().revokeReason

      let params = {}
      if (revokeReason == 1) {
        let mf = this.otherInfoForm.getFieldsValue().mF
        if (mf == 0) {
          // 父
          this.otherInfoForm.validateFields(async (err, values) => {
            if (!err) {
              let childSeekingRevokeSubVo = {}
              childSeekingRevokeSubVo.childBaseId = this.childBaseId
              let someOne = this.otherInfoForm.getFieldsValue()
              this.changeParam(someOne)

              childSeekingRevokeSubVo.fatherFamilyMemberInfoVo = someOne
              childSeekingRevokeSubVo.childSeekingRevokeVo = someOne
              if (this.where == '0') {
                childSeekingRevokeSubVo.childSeekingRevokeVo.childSeekingId = this.ListId
              } else {
                childSeekingRevokeSubVo.childSeekingRevokeVo.tobeAdoptedId = this.ListId
              }

              params = { ...childSeekingRevokeSubVo }

              let res = await this.post('/childSeeking/revoke', params, true)
              if (!res.errors) {
                this.backs()
              }
            }
          })
        } else if (mf == 1) {
          // 母
          this.motherInfoForm.validateFields(async (err, values) => {
            if (!err) {
              let childSeekingRevokeSubVo = {}
              childSeekingRevokeSubVo.childBaseId = this.childBaseId
              let someOne = this.otherInfoForm.getFieldsValue()
              this.changeParam(someOne)
              let someTwo = this.motherInfoForm.getFieldsValue()
              this.changeParam(someTwo)
              childSeekingRevokeSubVo.motherFamilyMemberInfoVo = someTwo
              childSeekingRevokeSubVo.childSeekingRevokeVo = someOne
              if (this.where == '0') {
                childSeekingRevokeSubVo.childSeekingRevokeVo.childSeekingId = this.ListId
              } else {
                childSeekingRevokeSubVo.childSeekingRevokeVo.tobeAdoptedId = this.ListId
              }
              params = { ...childSeekingRevokeSubVo }
              let res = await this.post('/childSeeking/revoke', params, true)
              if (!res.errors) {
                this.backs()
              }
            }
          })
        } else if (mf && mf.length == 2) {
          // 父母
          this.otherInfoForm.validateFields(async (err, values) => {
            if (!err) {
              this.motherInfoForm.validateFields(async (err, values) => {
                if (!err) {
                  let childSeekingRevokeSubVo = {}
                  childSeekingRevokeSubVo.childBaseId = this.childBaseId
                  let someOne = this.otherInfoForm.getFieldsValue()
                  this.changeParam(someOne)
                  let someTwo = this.motherInfoForm.getFieldsValue()
                  this.changeParam(someTwo)
                  childSeekingRevokeSubVo.motherFamilyMemberInfoVo = someTwo
                  childSeekingRevokeSubVo.childSeekingRevokeVo = someOne
                  childSeekingRevokeSubVo.fatherFamilyMemberInfoVo = someOne

                  if (this.where == '0') {
                    childSeekingRevokeSubVo.childSeekingRevokeVo.childSeekingId = this.ListId
                  } else {
                    childSeekingRevokeSubVo.childSeekingRevokeVo.tobeAdoptedId = this.ListId
                  }

                  params = { ...childSeekingRevokeSubVo }
                  let res = await this.post(
                    '/childSeeking/revoke',
                    params,
                    true
                  )
                  if (!res.errors) {
                    this.backs()
                  }
                }
              })
            }
          })
        } else {
          // 其他
          this.otherInfoForm.validateFields(async (err, values) => {
            if (!err) {
            }
          })
        }
      }
      if (revokeReason && revokeReason != 1 && revokeReason != 0) {
        this.revokeInfoForm.validateFields(async (err, values) => {
          if (!err) {
            let childSeekingRevokeSubVo = {}
            childSeekingRevokeSubVo.childBaseId = this.childBaseId
            let someOne = this.otherInfoForm.getFieldsValue()

            let someTwo = this.revokeInfoForm.getFieldsValue()
            this.changeParam(someTwo)
            childSeekingRevokeSubVo.childSeekingRevokeVo = {
              ...someOne,
              ...someTwo
            }
            if (this.where == '0') {
              childSeekingRevokeSubVo.childSeekingRevokeVo.childSeekingId = this.ListId
            } else {
              childSeekingRevokeSubVo.childSeekingRevokeVo.tobeAdoptedId = this.ListId
            }
            params = { ...childSeekingRevokeSubVo }
            let res = await this.post('/childSeeking/revoke', params, true)
            if (!res.errors) {
              this.backs()
            }
          }
        })
      }
      if (!revokeReason) {
        this.otherInfoForm.validateFields(async (err, values) => {
          if (!err) {
          }
        })
      }
    },
    changeParam (data, e) {
      for (var k in data) {
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
        if (data[k] instanceof Array && !(data[k][0] instanceof Object)) {
          if (k == 'address_Linkage') {
            data.currentAddressPro = data[k][0]
            data.currentAddressCity = data[k][1]
            data.currentAddressCounty = data[k][2]
            delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
    },

    fnValidateMore (a, v, callback) {
      let value = v || ''
      this.fnValidateTextarea(200, '病残状况描述', value, callback, '0')
    },
    backs () {
      this.motherInfoForm.resetFields()
      this.otherInfoForm.resetFields()
      this.revokeInfoForm.resetFields()
      this.selects = '0'
      this.$router.go(-1)
    },
    showOne (val) {
      //  1:找到父母；  2：错误信息 ； 3：儿童死亡；4：儿童离院
      // 按钮
      this.mather = false
      this.mather = false
      this.selects = val
    },
    async getList () {
      let data8 = await this.getDictionaries('REDUCTIONREASON')
      this.postureList = data8 // 离院原因
      let data9 = await this.getDictionaries('DEATHREASON  ')
      this.deathList = data9 // 死亡原因
      let data10 = await this.getDictionaries('BACKOUTREASON')
      this.backoutResionList = data10 // 撤销原因
    },
    fnmustKeep (a, v, callback) {
      let value = v || ''
      this.fnValidateTextarea(200, '错误信息描述', value, callback)
    }
  }
}
</script>
<style scoped>
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cursors {
  cursor: pointer;
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
.item_text {
  width: 60px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.horizontalline {
  width: calc(100% - 135px);
  margin-left: 15px;
  margin-right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
}
</style>
