<template>
  <!-- 人员 -->
  <div class="conts">
    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="负责人信息"
             :show.sync="showone"></Title>

      <ta-row ref="one">
        <ta-col :span="8">
          <ta-form-item label="姓名"
                        fieldDecoratorId="chairmanName"
                        :fieldDecoratorOptions="verificationRules('姓名',72)">
            <ta-input :disabled="personOK"
                      v-model.lazy="chairmanNameValue"
                      placeholder="请输入姓名" />
          </ta-form-item>
          <ta-form-item hidden
                        label="welfOrgId"
                        fieldDecoratorId="welfOrgId">
            <ta-input :disabled="true" />
          </ta-form-item>
          <ta-form-item label="学历"
                        fieldDecoratorId="education"
                        :require="{message:'请选择学历'}">
            <ta-select :disabled="personOK"
                       placeholder="请选择学历">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in educationalBackgroundList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="是否法定代表人"
                        :labelCol="{ span: 11 }"
                        :wrapperCol="{span:13}"
                        fieldDecoratorId="legalRepresentativeYOrN"
                        :require="{message:'请选择是否法定代表人'}">
            <ta-select :disabled="personOK"
                       placeholder="请选择是否法定代表人">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>

        <ta-col :span="8">
          <ta-form-item label="性别"
                        fieldDecoratorId="sex"
                        :require="{message:'请选择性别'}">
            <ta-select :disabled="personOK"
                       placeholder="请选择性别">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in sexList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="专业"
                        fieldDecoratorId="major"
                        :fieldDecoratorOptions="verificationRules('专业',50)">
            <ta-input :disabled="personOK"
                      placeholder="请输入专业" />
          </ta-form-item>
          <ta-form-item label="职务"
                        fieldDecoratorId="job"
                        :require="{enable:flag,message:'请选择职务'}">
            <ta-input-group compact>
              <ta-select placeholder="请选择职务"
                         @change="getDutyChange"
                         :disabled="personOK"
                         v-model="valueSelect"
                         :style="{width: valueSelect!=Enum.DUTY.QT? '100%':'35%'}">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in dutyList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
              <ta-input v-if="valueSelect==Enum.DUTY.QT"
                        v-model="valueInput"
                        style="width: 65%;"
                        placeholder="请输入其他职务" />
            </ta-input-group>
          </ta-form-item>
        </ta-col>

        <ta-col :span="8">
          <ta-form-item label="出生日期"
                        fieldDecoratorId="birthday"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        :require="{message:'请选择出生日期'}">
            <ta-date-picker :disabled="personOK"
                            style="width: 100%;"
                            placeholder="请选择出生日期" />
          </ta-form-item>
          <ta-form-item label="职称"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="title"
                        :require="{message:'请输入职称'}">
            <ta-select :disabled="personOK"
                       placeholder="请选择职称">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in titleList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="负责人联系电话"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="contactNumber"
                        :fieldDecoratorOptions="this.verificationRules('电话号码', { type: 'phone' })">
            <ta-input :disabled="personOK"
                      placeholder="请输入负责人联系电话" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </div>
    <!-- 按需求要求暂时注调 -->
    <div ref="twoout"
         class="mars"
         v-if="false">
      <Title id="anchorpoint_b"
             title="工作人员数量情况"
             :show.sync="showtwo"></Title>
      <ta-row ref="two">
        <ta-col :span='24'>
          <ta-col :span="8">
            <ta-form-item label="实际在岗人数"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="workerTotalSum"
                          :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入实际在岗人数' }]}">
              <ta-input-number :min="0"
                               :max="99999"
                               :precision="0"
                               style="width:100%"
                               :disabled="personOK" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="志愿者数量"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="volunteerNum"
                          :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入志愿者数量' }]}">
              <ta-input-number :min="0"
                               :max="99999"
                               :precision="0"
                               style="width:100%"
                               :disabled="personOK" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label='专职服务未成年人职工数'
                          :labelCol="{ span: 15 }"
                          :wrapperCol="{span:9}"
                          fieldDecoratorId="majorServiceProjectChildNum"
                          :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入专职服务未成年人职工数' }]}">
              <ta-input-number :min="0"
                               :max="99999"
                               :precision="0"
                               style="width:100%"
                               :disabled="personOK" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-divider />
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p class="pp">正式编制人员(数量)</p>
          </ta-form-item>
          <ta-form-item label="社会工作者"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="socialWorkerRegularNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入社会工作者人数' }]}">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="职工(非社会工作者)"
                        :labelCol="{ span: 12 }"
                        :wrapperCol="{span:12}"
                        fieldDecoratorId="workerRegularNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入职工(非社会工作者)人数' }]}">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p class="pp">临聘人员(数量)</p>
          </ta-form-item>
          <ta-form-item label="社会工作者"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="socialWorkerTemporaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入社会工作者人数' }]}">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="职工(非社会工作者)"
                        :labelCol="{ span: 12 }"
                        :wrapperCol="{span:12}"
                        fieldDecoratorId="workerTemporaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入职工(非社会工作者)人数' }]}">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p class="pp">公益岗位(数量)</p>
          </ta-form-item>
          <ta-form-item label="社会工作者"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="socialWorkerPublicWelfareNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入社会工作者人数' }]}">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="职工(非社会工作者)"
                        :labelCol="{ span: 12 }"
                        :wrapperCol="{span:12}"
                        fieldDecoratorId="workerPublicWelfareNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入职工(非社会工作者)人数' }]}">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </div>
    <div hidden
         ref="threeout"
         class="mars">
      <Title id="anchorpoint_c"
             title="专业技术人员"
             :show.sync="threeout"></Title>
      <ta-row ref="three">
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>初级</p>
          </ta-form-item>
          <ta-form-item label="医生"
                        fieldDecoratorId="doctorPrimaryNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护士"
                        fieldDecoratorId="nursePrimaryNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="教育"
                        fieldDecoratorId="teacherPrimaryNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="康复保健师"
                        fieldDecoratorId="healthCareProfessionalsPrimaryNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="营养配餐师"
                        fieldDecoratorId="nutritionalCatererPrimaryNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="社工人员"
                        fieldDecoratorId="socialWorkerPrimaryNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护理员"
                        fieldDecoratorId="attendantPrimaryNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="其他"
                        fieldDecoratorId="otherPrimaryNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>中级</p>
          </ta-form-item>
          <ta-form-item label="医生"
                        fieldDecoratorId="doctorIntermediateNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护士"
                        fieldDecoratorId="nurseIntermediateNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="教育"
                        fieldDecoratorId="teacherIntermediateNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="康复保健师"
                        fieldDecoratorId="healthCareProfessionalsIntermediateNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="营养配餐师"
                        fieldDecoratorId="nutritionalCatererIntermediateNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="社工人员"
                        fieldDecoratorId="socialWorkerIntermediateNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护理员"
                        fieldDecoratorId="attendantIntermediateNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="其他"
                        fieldDecoratorId="otherIntermediateNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>高级</p>
          </ta-form-item>
          <ta-form-item label="医生"
                        fieldDecoratorId="doctorSeniorNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护士"
                        fieldDecoratorId="nurseSeniorNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="教育"
                        fieldDecoratorId="teacherSeniorNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="康复保健师"
                        fieldDecoratorId="healthCareProfessionalsSeniorNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="营养配餐师"
                        fieldDecoratorId="nutritionalCatererSeniorNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="社工人员"
                        fieldDecoratorId="socialWorkerSeniorNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护理员"
                        fieldDecoratorId="attendantSeniorNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="其他"
                        fieldDecoratorId="otherSeniorNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </div>
    <div hidden
         ref="furout"
         class="mars">
      <Title id="anchorpoint_d"
             title="工勤岗位情况"
             :show.sync="furout"></Title>
      <ta-row ref="fur">
        <ta-col :span="4">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>高级护理师</p>
          </ta-form-item>
          <ta-form-item label="儿童护理员"
                        fieldDecoratorId="childCareSeniorNurseNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="4">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>护理师</p>
          </ta-form-item>
          <ta-form-item label="儿童护理员"
                        fieldDecoratorId="childCareNurseNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="4">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>初级护理员</p>
          </ta-form-item>
          <ta-form-item label="儿童护理员"
                        fieldDecoratorId="childCarePrimaryAttendantNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="4">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>中级护理员</p>
          </ta-form-item>
          <ta-form-item label="儿童护理员"
                        fieldDecoratorId="childCareIntermediateAttendantNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="4">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>高级护理员</p>
          </ta-form-item>
          <ta-form-item label="儿童护理员"
                        fieldDecoratorId="childCareSeniorAttendantNum">
            <ta-input-number :min="0"
                             :max="99999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import { setTimeout } from 'timers'
import moment from 'moment'
export default {
  name: 'register',
  components: {
    Title
  },
  props: {
    personOK: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      goType: 0,
      showone: true,
      threeout: true,
      furout: true,
      showtwo: true,
      // isrequire: window.parent.indexTool.getUserInfo().orgType == 98,
      isrequire: true,
      sexList: [],
      dutyList: [],
      yesNoList: [],
      educationalBackgroundList: [],
      titleList: [],
      chairmanNameValue: '', // 负责人输入的值
      valueSelect: null, // 职务下拉框数据
      valueInput: '', // 职务其他输入框数据
      flag: false // 控制职务必填（由于使用组合控件，需切换必填才能排除影响（待优化））
    }
  },
  mounted () {
    this.getyesNoList()
    this.getsexList()
    this.getOccupattion()
    this.geteducationalBackgroundList()
    this.gettitleList()
  },
  methods: {
    // 选择职务change
    getDutyChange (e) {
      this.valueSelect = e
    },
    // 是否字典
    async getyesNoList () {
      const data = await this.getDictionaries('YESNO')
      this.yesNoList = data
    },
    // 性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 职业 OCCUPATION
    async getOccupattion () {
      const data = await this.getDictionaries('DUTY')
      this.dutyList = data.filter(item => {
        return item.value > 3
      })
    },
    async gettitleList () {
      const data = await this.getDictionaries('TITLE')
      this.titleList = data
    },
    // 学历
    async geteducationalBackgroundList () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.educationalBackgroundList = data
    },
    // 时间处理
    changetime (data) {
      for (var k in data) {
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
      }
    },

    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    back () {
      this.$router.go(-1)
    }
  },
  watch: {
    valueInput (val) {
      this.$emit('setErrorMessage', val)
    },
    valueSelect (val) {
      val != this.Enum.DUTY.QT ? this.$emit('setErrorMessage', '1') : this.$emit('setErrorMessage', this.valueInput)
    },
    // 当负责人数据改变时，同步到人员信息负责人
    chairmanNameValue (val) {
      this.$emit('updatePersonnel', val, 'orgFrom')
    },
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    threeout (val) {
      this.setHeight('three', 'threeout', !val)
    },
    furout (val) {
      this.setHeight('fur', 'furout', !val)
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin: 0 20px 0 32px;
}

.fromwid {
  width: 324px;
  margin-top: 24px;
  margin-bottom: 30px;
}

.selectwid {
  width: 224px;
}

.contitem {
  height: 50px;
  transition: all 1s;
  overflow: hidden;
}

.contitemshow {
  transition: all 1s;
  overflow: hidden;
}
.mars {
  width: 98%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
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
.conts {
  width: 100%;
  min-height: 600px;
  background: #ffffff;
  padding: 14px 14px 98px 14px;
}
.pp {
  left: 80%;
  font-weight: 600;
  position: relative;
  font-size: 14px;
}
</style>
