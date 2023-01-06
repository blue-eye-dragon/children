<template>
  <!-- <div class="padbottom conts  tadrawer"> -->
  <div :class="show?'padbottom conts':'padbottom'">
    <!-- <ta-anchor class="md"
               :offsetTop="100">
      <ta-anchor-link href="#anchorpoint_a"
                      state="replace"
                      title="儿童信息" />
      <ta-anchor-link href="#anchorpoint_b"
                      state="replace"
                      title="转介帮扶信息" />
    </ta-anchor>-->
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
             title="转介帮扶信息"
             :show.sync="showtwo"></Title> -->
        <Divider title="转介帮扶信息"
                 :show="true"></Divider>
        <div ref="two">
          <ta-form layout="horizontal"
                   :autoFormCreate="(form)=>{this.form = form}"
                   :hideRequiredMark="disabled">
            <ta-row style="width: calc(100% - 28px);">
              <ta-col :span="6">
                <ta-form-item label="牵头单位"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{ span: 16 }"
                              fieldDecoratorId="leadCompany"
                              :fieldDecoratorOptions="verificationRules('帮扶牵头单位',72)">
                  <ta-input :placeholder="!disabled?'请输入帮扶牵头单位':''"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>

              <ta-col :span="6">
                <ta-form-item label="帮扶类型"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{ span: 16 }"
                              fieldDecoratorId="helpType"
                              :require="{message:'请选择帮扶类型'}">
                  <ta-select allowClear
                             :placeholder="!disabled?'请选择帮扶类型':''"
                             :disabled="disabled">
                    <ta-select-option v-for="item in helpTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="负责人"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{ span: 16 }"
                              fieldDecoratorId="header"
                              :fieldDecoratorOptions="verificationRules('帮扶负责人',72)">
                  <ta-input :placeholder="!disabled?'请输入帮扶负责人':''"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="帮扶负责人职务"
                              :labelCol="{ span: 10 }"
                              :wrapperCol="{ span: 14 }"
                              fieldDecoratorId="headerPost"
                              :fieldDecoratorOptions="verificationRules('帮扶负责人职务',100)">
                  <ta-input :placeholder="!disabled?'请输入帮扶负责人职务':''"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="帮扶措施"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{ span: 16 }"
                              fieldDecoratorId="helpMeasure"
                              :fieldDecoratorOptions="verificationRules('帮扶措施',100)">
                  <ta-input :placeholder="!disabled?'请输入帮扶措施':''"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="18">
                <ta-col :span="12">
                  <AddressComponent :addressmodel="addressmodel1"
                                    :msg="'落实单位地址'"
                                    :isRequire="true"
                                    :disabled="disabled"
                                    :labelwidth="{  label:8,  wrapper: 16 }"
                                    fileldName="implementCompanyDatas"
                                    @setaddress="setaddress1"></AddressComponent>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label
                                fieldDecoratorId="implementCompanyAddr"
                                :labelCol="{ span: 0 }"
                                :wrapperCol="{ span: 23,offset:1 }"
                                :fieldDecoratorOptions="verificationRules('详细地址',72)">
                    <ta-input :placeholder="!disabled?'请输入详细地址':''"
                              :disabled="disabled" />
                  </ta-form-item>
                </ta-col>

              </ta-col>

              <ta-col :span="24">
                <ta-col :span="8">
                  <ta-form-item label="帮扶时间"
                                :labelCol="{ span: 6}"
                                :wrapperCol="{ span: 18 }"
                                fieldDecoratorId="helpDate"
                                :require="{message:'请选择帮扶时间'}">
                    <ta-range-picker :disabled="disabled"
                                     @change="setDuration" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="帮扶时长(天)"
                                :labelCol="{ span: 8}"
                                :wrapperCol="{ span: 13}"
                                fieldDecoratorId="duration"
                                :require="{message:'请选择帮扶时长'}">
                    <ta-input :disabled="true" />
                  </ta-form-item>
                </ta-col>
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

      helpTypeList: [], // 获取帮扶类型字典数据

      id: '', // 转介帮扶列表选择的数据id
      investId: '', // 调查评估表主键id
      flag: '' // 区分转介帮扶（help）、查看（look）和落实帮扶措施（toImplement）的标识符
    }
  },
  activated () {
    this.initDatas()
    this.showone = true
    this.showtwo = true
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
  },
  mounted () {
    if (this.dcpgId != '') { this.initDatas() }
    this.getMenuDatas()
  },
  methods: {
    moment,
    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('SUPPORTTYPES', 'helpTypeList') // 获取帮扶类型字典数据

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
      if (this.dcpgId != '' || this.look) {
        params = { dcpgId: this.dcpgId }
        url = '/juvenilesHelp/queryById'
        this.disabled = true
        this.flag = 'look'
      } else {
        this.id = this.$route.query.id
        this.investId = this.$route.query.investId
        this.flag = this.$route.query.flag
        this.troubleId = this.$route.query.troubleId
        this.disabled = false
        params = { troubleId: this.troubleId }
        url = '/investigationAndEvaluation/goSave'
        if (this.flag == 'look') {
          this.disabled = true
          url = '/juvenilesHelp/queryById'
          params = { dcpgId: this.investId }
        }
        if (this.flag == 'look_imp') {
          this.disabled = true
          url = '/implementUrge/getJuvenilesHelp'
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
          data['helpDate'] = [
            data.helpDateStart ? moment(data.helpDateStart) : null,
            data.helpDateEnd ? moment(data.helpDateEnd) : null
          ]
          this.$nextTick(() => {
            this.childform.setFieldsValue(data)
            if (this.flag.indexOf('look') != -1) {
              this.form.setFieldsValue(data)
              // 地址
              this.addressmodel1 = [
                data.implementCompanyProvince || '',
                data.implementCompanyCity || '',
                data.implementCompanyCounty || ''
              ]
            }

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
            if (data.fileList) {
              for (let i = 0; i < data.fileList.length; i++) {
                if (data.fileList[i].busiType == '75') {
                  this.$refs['one'].fileList = data.fileList
                  this.$refs['one'].upLoadPathIds.push(
                    this.$refs['one'].fileList[0].response.data.data.fileid
                  )
                  this.$refs['one'].imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + this.$refs['one'].fileList[0].response.data.data.fileid
                  // this.post('/file/getFileUrls', {
                  //   returnFileIds: this.$refs['one'].fileList[0].uid
                  // }).then(res => {
                  //   if (res.serviceSuccess) {
                  //     this.$refs['one'].imageUrl = window.faceConfig.basePath + res.data.fileUrlList[0]
                  //   }
                  // })
                }
              }
            }
          })
        }
      })
    },
    // 根据帮扶时间设置帮扶时长
    setDuration (date, dateString) {
      let duration = this.dateMinus(dateString[0], dateString[1]) + 1
      this.form.setFieldsValue({
        duration: duration
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
    // 保存
    submit () {
      let _self = this
      _self.form.validateFields((err, values) => {
        if (!err) {
          let formData = _self.form.getFieldsValue()

          formData['helpDateStart'] = formData.helpDate
            ? formData.helpDate[0].format('YYYY-MM-DD')
            : null
          formData['helpDateEnd'] = formData.helpDate
            ? formData.helpDate[1].format('YYYY-MM-DD')
            : null
          delete formData.helpDate[0]
          delete formData.helpDate[1]
          formData['implementCompanyProvince'] =
            formData.implementCompanyDatas instanceof Array
              ? formData.implementCompanyDatas[0]
              : null
          formData['implementCompanyCity'] =
            formData.implementCompanyDatas instanceof Array
              ? formData.implementCompanyDatas[1]
              : null
          formData['implementCompanyCounty'] =
            formData.implementCompanyDatas instanceof Array
              ? formData.implementCompanyDatas[2]
              : null
          delete formData.implementCompanyDatas
          formData['investId'] = _self.investId

          _self.post('/juvenilesHelp/save', formData).then(res => {
            if (res.serviceSuccess) {
              _self.$message.success('数据保存成功！')
              _self.cancel()
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
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
    // 儿童地址传值
    setaddress () {
      this.childform.setFieldsValue({
        censusRegisterDatas: this.addressmodel,
        currentAddressDatas: this.addressmodelNow
      })
    },
    // 帮扶落实单位地址传值
    setaddress1 () {
      this.form.setFieldsValue({
        implementCompanyDatas: this.addressmodel1
      })
    },
    // 儿童健康状况传值
    setHeaths () {
      this.childform.setFieldsValue({
        healthConditionDatas: this.heathModel
      })
    },
    callback (key) {
      console.log(key)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (this.$refs[ref].$el) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          } else {
            node.style.height = this.$refs[ref].offsetHeight + 90 + 'px'
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
