<template>
  <!-- <div class="padbottom conts  tadrawer"> -->
  <div :class="show?'conts tadrawer':'tadrawer'">
    <div class="contin">
      <div :hidden="look"
           ref="oneout"
           class="mars">
        <Title id="anchorpoint_a"
               title="儿童信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 style=" height: 246px;"
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
           :class=" look?null:'mars'"
           style="    margin-bottom: 66px;">
        <!-- <Title id="anchorpoint_b"
               title="调查评估信息"
               :show.sync="showtwo"></Title> -->
        <Divider title="调查评估信息"
                 :show="true"></Divider>
        <ta-form style="  height: 325px; "
                 layout="horizontal"
                 :autoFormCreate="(form)=>{this.form = form}"
                 :hideRequiredMark="disabled">
          <ta-row ref="two"
                  class="fromcom">
            <ta-col :span="8">
              <ta-form-item label="调查方式"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 18 }"
                            fieldDecoratorId="investigationMethod"
                            :require="{message:'请选择调查方式'}">
                <ta-select allowClear
                           :placeholder="!disabled?'请选择调查方式':''"
                           :disabled="disabled">
                  <ta-select-option v-for="item in investigationMethodList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="调查日期"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 18 }"
                            fieldDecoratorId="investigationDate"
                            :require="{message:'请选择调查日期'}">
                <ta-date-picker style="width: 100%;"
                                :placeholder="!disabled?'请选择调查日期':''"
                                :disabled="disabled"
                                :disabledDate="disabledDate" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="调查人员"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 18 }"
                            fieldDecoratorId="investigator"
                            :fieldDecoratorOptions="verificationRules('调查人员',72)">
                <ta-input :placeholder="!disabled?'请输入调查人员':''"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="调查地点"
                            fieldDecoratorId="investigationAddr"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 18 }"
                            :fieldDecoratorOptions="verificationRules('调查地点',200)">
                <ta-input placeholder="请输入调查地点"
                          :disabled="disabled" />
              </ta-form-item>

            </ta-col>

            <ta-col :span="isShowTempItem ? 8 : 16">
              <ta-form-item label="是否需要临时监护"
                            fieldDecoratorId="isTempCustody"
                            :labelCol="{ span: isShowTempItem ? 8 : 4}"
                            :wrapperCol="{ span: isShowTempItem ? 16 : 8 }"
                            :require="{message:'请选择是否需要临时监护'}">
                <ta-select allowClear
                           :placeholder="!disabled?'请选择是否需要临时监护':''"
                           :disabled="disabled"
                           @change="onChangeIsTempCustody">
                  <ta-select-option v-for="item in yesList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>

            <ta-col :span="8"
                    v-if="isShowTempItem">
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

            <ta-col :span="8">
              <ta-form-item label="生活情况"
                            fieldDecoratorId="livingCondition"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 18 }"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('生活情况',200,true)">
                <ta-textarea :placeholder="!disabled?'请输入生活情况':''"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="就学情况"
                            fieldDecoratorId="learningCondition"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 18 }"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('就学情况',200,true)">
                <ta-textarea :placeholder="!disabled?'请输入就学情况':''"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="家庭情况"
                            fieldDecoratorId="familySituation"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 18 }"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('家庭情况',200,true)">
                <ta-textarea :placeholder="!disabled?'请输入家庭情况':''"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="监护情况"
                            fieldDecoratorId="guardianshipSituation"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 18 }"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('监护情况',200,true)">
                <ta-textarea :placeholder="!disabled?'请输入监护情况':''"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="备注"
                            fieldDecoratorId="remarks"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{ span: 18 }"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('备注',200,true)">
                <ta-textarea :placeholder="!disabled?'请输入备注':''"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="未成年人保护中心意见"
                            fieldDecoratorId="minorProtectionCenterOpinion"
                            :labelCol="{ span: 7 }"
                            :wrapperCol="{ span: 17 }"
                            :fieldDecoratorOptions="verificationRules('未成年人保护中心意见',200,false)">
                <ta-textarea :placeholder="!disabled?'请输入未成年人保护中心意见':''"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>

    </div>
    <div v-if="!look"
         class="bom">
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
      heathModel: [],

      showone: true,
      showtwo: true,

      investigationMethodList: [], // 获取调查方式字典数据
      yesList: [], // 获取是否需要临时监护字典数据

      id: '', // 调查评估列表选择的数据id

      childBaseId: '', // 儿童信息表主键
      flag: '', // 区分调查评估（investigate）和查看（look）的标识符

      tempCustodyTypeList: [], // 临时监护类型字典
      isShowTempItem: false, // 是否显示临时监护类型项
    }
  },
  activated () {
    if (this.dcpgId != '' || this.$route.query.id || this.$route.query.childBaseId) {
      this.initDatas()
    }
    this.showone = true
    this.showtwo = true
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
  },
  mounted () {
    if (this.dcpgId != '' || this.$route.query.id || this.$route.query.childBaseId) {
      this.initDatas()
    }
    this.getMenuDatas()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-07-02 16:47:29
     * @information: 是否需要临时监护 change时
     */
    onChangeIsTempCustody (val) {
      this.isShowTempItem = val == '1'
    },

    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('INVESTIGATION', 'investigationMethodList') // 获取调查方式字典数据
      this.getMenu('YESNO', 'yesList') // 获取是否需要临时监护字典数据
      this.getMenu('TEMPORARYCUSTODYTYPE', 'tempCustodyTypeList') // 临时监护类型字典

      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
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
      let param = {}
      let url = ''
      if (this.dcpgId != '' || this.look) {
        param = { id: this.dcpgId }
        url = '/investigationAndEvaluation/queryById'
        this.disabled = true
      } else {
        this.id = this.$route.query.id
        this.childBaseId = this.$route.query.childBaseId
        this.troubleId = this.$route.query.troubleId

        this.flag = this.$route.query.flag
        this.disabled = false
        param = {
          troubleId: this.troubleId
        }
        url = '/investigationAndEvaluation/goSave'
        if (this.flag == 'look') {
          this.disabled = true
          url = '/investigationAndEvaluation/queryById'
          param = {
            id: this.id
          }
        }
        // 超时催办的查看
        if (this.flag == 'look_imp') {
          this.disabled = true
          url = '/implementUrge/getInvestigationAndEvaluation'
          param = {
            cid: this.childBaseId
          }
        }
      }
      this.post(url, param).then(res => {
        if (res.serviceSuccess) {
          let { data } = res.data
          data['birth'] = data.birth ? moment(data.birth) : null
          data['registrationDate'] = data.registrationDate
            ? moment(data.registrationDate)
            : null
          data['investigationDate'] = data.investigationDate
            ? moment(data.investigationDate)
            : null
          // 健康状况
          this.heathModel = data.healthCondition
            ? data.healthCondition.split(',')
            : []
          // 是否需要临时监护 为 是
          this.isShowTempItem = data.isTempCustody == '1'
          this.$nextTick(() => {
            this.childform.setFieldsValue(data)
            this.form.setFieldsValue(data)

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
                // this.post('/file/getFileUrls', {
                //   returnFileIds: this.$refs['one'].fileList[0].uid
                // }).then(res => {
                //   if (res.serviceSuccess) {
                //     this.$refs['one'].imageUrl = window.faceConfig.basePath + res.data.fileUrlList[0]// bug window.faceConfig.basePath +
                //   }
                // })
              } else {
                this.$refs['one'].imageUrl = 'static/img/defalimg.png'
              }
            }
          })
        }
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
    disabledDate (current) {
      return current > (moment().endOf('day'))
    },
    // 注册
    submit () {
      let _self = this

      _self.form.validateFields((err, values) => {
        if (!err) {
          let formData = _self.form.getFieldsValue()
          formData['investigationDate'] = formData.investigationDate
            ? moment(formData.investigationDate).format('YYYY-MM-DD')
            : null
          formData['childBaseId'] = _self.childBaseId
          formData['dilemmaChildId'] = this.troubleId
          _self.post('/investigationAndEvaluation/save', formData).then(res => {
            if (res.serviceSuccess) {
              _self.$message.success('数据注册成功！')
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
    // 设置出生日期
    setBirthAndAgeByIdCard (sex, age, birth) {
      this.form.setFieldsValue({
        birthday: birth
      })
    },
    // 儿童地址传值
    setaddress () {
      this.childform.setFieldsValue({
        censusRegisterDatas: this.addressmodel,
        currentAddressDatas: this.addressmodelNow
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
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
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
