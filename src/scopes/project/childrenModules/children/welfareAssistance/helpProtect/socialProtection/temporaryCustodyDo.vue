<template>
  <!-- <div class="padbottom conts  tadrawer"> -->
  <div :class="show?'padbottom conts':'padbottom'">
    <div class="contin">
      <div :hidden="look"
           ref="oneout"
           class="mars">
        <Title id="anchorpoint_a"
               title="儿童信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 :autoFormCreate="(form)=>{this.childform = form}"
                 :hideRequiredMark="disabled">
          <ChildBaseInfo ref="one"
                         :addressmodel="addressmodel"
                         :addressmodelNow="addressmodelNow"
                         @setaddress="setaddress"
                         :heathModel="heathModel"
                         @setHeaths="setHeaths"></ChildBaseInfo>
        </ta-form>
      </div>
      <div ref="twoout"
           :class="look?null:'mars'"
           style="    margin-bottom: 66px;">
        <!-- <Title id="anchorpoint_b"
             title="临时监护信息"
             :show.sync="showtwo"></Title> -->
        <Divider title="临时监护信息"
                 :show="true"></Divider>
        <div ref="two">
          <ta-form layout="horizontal"
                   :autoFormCreate="(form)=>{this.form = form}"
                   :hideRequiredMark="disabled">
            <ta-row style="width: calc(100% - 28px);">

              <ta-col :span="8">
                <ta-form-item label="安置方式"
                              fieldDecoratorId="custodyType"
                              :labelCol="{ span:8}"
                              :wrapperCol="{ span: 16 }"
                              :require="{message:'请选择安置方式'}"
                              :initValue="Enum.CUSTODYSHIP.JTJY">
                  <ta-select allowClear
                             :placeholder="!disabled?'请选择安置方式':''"
                             :disabled="disabled"
                             @change="onChangeCustodyType">
                    <ta-select-option v-for="item in custodyTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>

              <!-- <ta-col :span="7"
                      v-if="isShowOtherTransactor && type!=Enum.CUSTODYSHIP.QT">
                <ta-form-item label="其他安置方式"
                              :labelCol="{ span:8}"
                              :wrapperCol="{ span: 16 }"
                              fieldDecoratorId="custodyTypeOther"
                              :fieldDecoratorOptions="verificationRules('其他安置方式',72)">
                  <ta-input :placeholder="!disabled?'请输入其他安置方式':''"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col> -->

              <ta-col :span="8"
                      v-if="isShowOtherTransactor && type==Enum.CUSTODYSHIP.QT">
                <ta-form-item label="其他安置方式"
                              fieldDecoratorId="custodyTypeOther"
                              :labelCol="{ span: 7}"
                              :wrapperCol="{ span: 17 }"
                              :require="{message:'请选择其他安置方式'}">
                  <ta-select allowClear
                             :placeholder="!disabled?'请选择其他安置方式':''"
                             :disabled="disabled">
                    <ta-select-option v-for="item in otherCustodyTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>

              <ta-col :span="7">
                <ta-form-item label="经办人"
                              :labelCol="{ span:8}"
                              :wrapperCol="{ span: 16 }"
                              fieldDecoratorId="transactor"
                              :fieldDecoratorOptions="verificationRules('经办人',72)">
                  <ta-input :placeholder="!disabled?'请输入经办人':''"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>

              <ta-col :span="isShowOtherTransactor ? 8 : 9">
                <ta-form-item label="照料时间"
                              :labelCol="{ span: isShowOtherTransactor ? 8 :7 }"
                              :wrapperCol="{ span: isShowOtherTransactor ? 16 : 17 }"
                              fieldDecoratorId="custodyDate"
                              :require="{message:'请选择照料时间'}">
                  <ta-range-picker :disabled="disabled"
                                   @change="setDuration" />
                </ta-form-item>
              </ta-col>

              <ta-col :span="isShowOtherTransactor ? 7 : 9">
                <ta-form-item label="照料时长(天)"
                              :labelCol="{ span: isShowOtherTransactor ? 8 : 7}"
                              :wrapperCol="{ span: isShowOtherTransactor ? 16 : 14 }"
                              fieldDecoratorId="duration"
                              :require="{message:'请选择照料时长'}">
                  <ta-input :disabled="true" />
                </ta-form-item>

              </ta-col>
            </ta-row>
            <!-- 第二行信息 -->
            <ta-row style="width: calc(100% - 28px);">
              <ta-col :span="8">
                <ta-form-item :label="type!=Enum.CUSTODYSHIP.JTJY ? '机构负责人' : '主照料人'"
                              :labelCol="{ span:8}"
                              :wrapperCol="{ span: 16 }"
                              fieldDecoratorId="director"
                              :fieldDecoratorOptions="verificationRules('主照料人',72)">
                  <ta-input :placeholder="!disabled ? `请输入${type!=Enum.CUSTODYSHIP.JTJY ? '机构负责人' : '主照料人'}` : ''"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="7"
                      v-if="type==Enum.CUSTODYSHIP.JTJY">
                <ta-form-item label="性别"
                              :labelCol="{ span:8}"
                              :wrapperCol="{ span: 16 }"
                              fieldDecoratorId="directorSex">
                  <ta-select allowClear
                             :placeholder="!disabled?'请选择性别':''"
                             :disabled="disabled">
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>

              <!-- 页面布局或表单更改时，有时会报错，加key以渲染时区分 -->
              <ta-col :span="8"
                      key="1">
                <ta-form-item label="身份证号"
                              :labelCol="{ span:7}"
                              :wrapperCol="{ span: 17 }"
                              fieldDecoratorId="mechanismIdCard"
                              :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: true, message: '请输入身份证号' },{validator:idCardValidFam}]}">
                  <ta-input :placeholder="!disabled?'请输入身份证号':''"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8"
                      v-if="type!=Enum.CUSTODYSHIP.JTJY">
                <ta-form-item label="机构名称"
                              fieldDecoratorId="mechanismName"
                              :labelCol="{ span:7 }"
                              :wrapperCol="{ span:17}"
                              :fieldDecoratorOptions="verificationRules('机构名称',72)">
                  <ta-input :disabled="disabled"
                            :placeholder="!disabled?'请输入名称':''" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label="联系电话"
                              :labelCol="{ span:8}"
                              :wrapperCol="{ span: 16 }"
                              fieldDecoratorId="phone"
                              :fieldDecoratorOptions="verificationRules('联系电话',{type: 'phone'})">
                  <ta-input :disabled="disabled"
                            :placeholder="!disabled?'请输入联系电话':''" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8">
                <AddressComponent :addressmodel="addressmodel1"
                                  :msg="type!=Enum.CUSTODYSHIP.JTJY ? '机构地址' : '家庭地址'"
                                  :isRequire="false"
                                  :labelwidth="{  label: 7,  wrapper: 17  }"
                                  :disabled="disabled"
                                  fileldName="fosterFamilyDatas"
                                  @setaddress="setaddress1"></AddressComponent>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label
                              fieldDecoratorId="mechanismAddr"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 23,offset:1 }"
                              :fieldDecoratorOptions="verificationRulesNotMustFill('详细地址',72)">
                  <ta-input :placeholder="!disabled?'请输入详细地址':''"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-row>
          </ta-form>

        </div>
      </div>

    </div>
    <div class="bom"
         v-if="!look">
      <ta-button class="btn"
                 @click="cancel">返回</ta-button>
      <ta-button type="primary"
                 @click="submit"
                 v-if="!disabled">提交</ta-button>
    </div>
  </div>
</template>

<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import ChildBaseInfo from './components/childBaseInfo'
import Title from '@component/common/components/Title'
import moment from 'moment'
import Divider from '@component/common/components/divider'
import { stringify } from 'querystring'
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true
    },
    look: {
      type: Boolean,
      required: false,
      default: false
    },
    dcpgId: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    ChildBaseInfo,
    AddressComponent,
    Title,
    Divider
  },

  data () {
    return {
      disabled: false,
      addressmodel: [],
      addressmodelNow: [],
      addressmodel1: [],
      heathModel: [],

      showone: true,
      showtwo: true,
      type: this.Enum.CUSTODYSHIP.JTJY, // 安置方式选择的数据

      custodyTypeList: [], // 安置方式字典
      otherCustodyTypeList: [], // 其他安置方式字典
      sexList: [], // 性别字典数据

      id: '', // 临时监护列表选择的数据id
      investId: '', // 调查评估表主键id
      flag: '', // 区分登记（register）和查看（look）的标识符

      isShowOtherTransactor: false, // 是否显示其他安置方式项
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    if (this.dcpgId != '') { this.initDatas() }
    this.getMenuDatas()
  },
  methods: {
    moment,
    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('GUARDIANSHIP', 'custodyTypeList') // 获取安置方式字典数据
      this.getMenu('OTHERGUARDIANSHIP', 'otherCustodyTypeList') // 获取其他安置方式字典数据
      this.getMenu('SEX', 'sexList') // 获取性别字典数据

      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
      })
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
      // 重置数据
      this.form.resetFields()
      this.fileList = []
      this.upLoadPathIds = []
      this.imageUrl = 'static/img/defalimg.png'
      this.disabled = false
      let params = {}
      let url = ' '
      this.isShowOtherTransactor = false
      if (this.dcpgId != '' || this.look) {
        params = { dcpgId: this.dcpgId }
        url = 'temporaryCustody/queryById'
        this.disabled = true
        this.flag = 'look'
      } else {
        this.id = this.$route.query.id
        this.investId = this.$route.query.investId
        this.troubleId = this.$route.query.troubleId
        this.flag = this.$route.query.flag
        this.disabled = false
        this.type = this.Enum.CUSTODYSHIP.JTJY
        params = { troubleId: this.troubleId }
        url = '/investigationAndEvaluation/goSave'
        if (this.flag == 'look') {
          this.disabled = true
          url = '/temporaryCustody/queryById'
          params = { dcpgId: this.investId }
        }
        if (this.flag == 'look_imp') {
          this.disabled = true
          url = '/implementUrge/getTemporaryCustody'
          params = { cid: this.id }
        }
      }
      this.post(url, params).then(res => {
        if (res.serviceSuccess) {
          let { data } = res.data

          data['birth'] = data.birth ? moment(data.birth) : null
          data['registrationDate'] = data.registrationDate
            ? moment(data.registrationDate)
            : null

          data['custodyDate'] = [
            data.custodyDateStart ? moment(data.custodyDateStart) : null,
            data.custodyDateEnd ? moment(data.custodyDateEnd) : null
          ]
          if (this.flag.indexOf('look') != -1) {
            this.type = data.custodyType
            this.isShowOtherTransactor = this.type == this.Enum.CUSTODYSHIP.QT
            this.$nextTick(() => {
              this.form.setFieldsValue(data)
              // 地址赋值
              this.addressmodel1 = [
                data.mechanismProvince || '',
                data.mechanismCity || '',
                data.mechanismCounty || '',
              ]
            })
          }

          this.childform.setFieldsValue(data)

          // 地址
          this.addressmodel = [
            data.censusRegisterProvince || '',
            data.censusRegisterCity || '',
            data.censusRegisterCounty || '',
            data.censusRegisterTown || ''
          ]
          this.addressmodelNow = [
            data.livingProvince || '',
            data.livingCity || '',
            data.livingCounty || '',
            data.livingTown || ''
          ]
          // 健康状况
          this.heathModel = data.healthCondition
            ? data.healthCondition.split(',')
            : []
          // 头像
          if (data.fileList && data.fileList.length > 0) {
            let { fileList } = data
            this.$refs['one'].fileList = fileList.map((element) => {
              if (element.busiType == '75') { // 儿童的
                return element
              }
            }).filter(s => s)
            if (this.$refs['one'].fileList.length > 0) {
              this.$refs['one'].upLoadPathIds.push(
                this.$refs['one'].fileList[0].response.data.data.fileid
              )
              this.$refs['one'].imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + this.$refs['one'].fileList[0].response.data.data.fileid
              //   this.post('/file/getFileUrls', {
              //     returnFileIds: this.$refs['one'].fileList[0].uid
              //   }).then(res => {
              //     if (res.serviceSuccess) {
              //       this.$refs['one'].imageUrl = window.faceConfig.basePath + res.data.fileUrlList[0]// bug window.faceConfig.basePath +
              //     }
              //   })
            } else {
              this.$refs['one'].imageUrl = 'static/img/defalimg.png'
            }
          }
        }
      })
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 08:57:41
     * @information: 安置方式更改时
     */
    onChangeCustodyType (e) {
      this.type = Object.values(this.Enum.CUSTODYSHIP).includes(e) && e || this.Enum.CUSTODYSHIP.JTJY
      // 其他
      this.isShowOtherTransactor = e == this.Enum.CUSTODYSHIP.QT
      // 重置表单
      this.form.resetFields()
      this.addressmodel1 = []
    },
    // 根据监护时间设置监护时长
    setDuration (date, dateString) {
      let duration = this.dateMinus(dateString[0], dateString[1]) + 1
      this.form.setFieldsValue({
        duration: duration + ''
      })
    },
    // 传入字符串时间，计算差值
    dateMinus (date1, date2) {
      // date1:小日期 date2:大日期
      var sdate = new Date(date1)
      var now = new Date(date2)
      var days = now.getTime() - sdate.getTime()
      var day = parseInt(days / (1000 * 60 * 60 * 24))
      return day
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-05 18:43:01
     * @information: 提交
     */
    submit () {
      this.form.validateFields(async (err, values) => {
        if (this.type == this.Enum.CUSTODYSHIP.JTJY) { // 若是家庭寄养类型
          err?.mechanismName && Reflect.deleteProperty(err, 'mechanismName')
        }
        if (err && Object.keys(err).length) {
          this.$message.error('校验不通过，无法提交，请再次检查')
          return
        }
        let formData = this.form.getFieldsValue()
        formData.investId = this.investId
        // 日期处理
        if (formData.custodyDate && formData.custodyDate.length) {
          formData['custodyDateStart'] = formData.custodyDate
            ? formData.custodyDate[0].format('YYYY-MM-DD')
            : null
          formData['custodyDateEnd'] = formData.custodyDate
            ? formData.custodyDate[1].format('YYYY-MM-DD')
            : null
          formData = JSON.parse(JSON.stringify(formData))
          delete formData.custodyDate
        }
        // 地址处理
        if (formData.fosterFamilyDatas && formData.fosterFamilyDatas.length) {
          formData.mechanismProvince = formData.fosterFamilyDatas[0] || null
          formData.mechanismCity = formData.fosterFamilyDatas[1] || null
          formData.mechanismCounty = formData.fosterFamilyDatas[2] || null
          Reflect.deleteProperty(formData, 'fosterFamilyDatas')
        }
        let res = await this.post('/temporaryCustody/save', formData, true)
        if (res.serviceSuccess) {
          this.$message.success('提交成功')
          this.cancel()
        }
      })
    },
    // 取消
    cancel () {
      this.form.resetFields()
      this.fileList = []
      this.upLoadPathIds = []
      this.imageUrl = 'static/img/defalimg.png'
      this.disabled = false

      this.$router.go(-1)
    },
    // 身份证号校验
    idCardValidFam (rule, value, callback) {
      let _self = this
      this.idCardValidate(rule, value, callback, _self)
    },
    // 儿童地址传值
    setaddress () {
      this.childform.setFieldsValue({
        censusRegisterDatas: this.addressmodel,
        currentAddressDatas: this.addressmodelNow
      })
    },
    // 地址传值
    setaddress1 () {
      this.form.setFieldsValue({
        fosterFamilyDatas: this.addressmodel1
      })
    },
    // 儿童健康状况传值
    setHeaths () {
      this.childform.setFieldsValue({
        healthConditionDatas: this.heathModel
      })
    },
    callback (key) { },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (this.$refs[ref].$el) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 100 + 'px'
          } else {
            node.style.height = this.$refs[ref].offsetHeight + 100 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    }
  }
}
</script>
<style scoped>
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
.btn {
  margin-right: 20px;
}
</style>
