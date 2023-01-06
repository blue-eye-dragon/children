<template>
  <div style="padding: 1%;">

    <ta-form class="drawerFrom"
             :autoFormCreate="(form)=>{this.form = form}"
             layout="horizontal">
      <ta-col :span="8">
        <ta-form-item label="工学情况"
                      fieldDecoratorId="workStudySituation"
                      :labelCol="{ span: 6 }">
          <ta-select :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in worktudyList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="特教类型"
                      fieldDecoratorId="specialEducationType"
                      :labelCol="{ span: 6 }">
          <ta-select mode="multiple"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in pceialeducationtypeList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="学制年限"
                      fieldDecoratorId="lengthOfSchooling"
                      :labelCol="{ span: 6 }">
          <ta-select :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in lengthofschoolList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="教育机构"
                      fieldDecoratorId="educationOrg"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="教育起始时间"
                      fieldDecoratorId="educationTime"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="发放次数"
                      fieldDecoratorId="provideNumberOfTimes">
          <ta-input-number :min="1"
                           :max="999999"
                           style="width:100%"
                           :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="登记机构"
                      fieldDecoratorId="institution"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      v-if="false">
          <ta-input :disabled="idedit" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <AddressComponent msg="教育地点"
                          :disabled="idedit"
                          :addressmodel="addressmodel"
                          @setaddress="setaddress"></AddressComponent>
        <ta-form-item label
                      fieldDecoratorId="addressDetails"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ offset:6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="是否接受孤儿助学"
                      fieldDecoratorId="isAcceptHelpStudy"
                      :labelCol="{ span: 6 }">
          <ta-radio-group name="radioGroup"
                          :disabled="idedit">
            <ta-radio :value="item.value"
                      v-for="(item,index) in isorphansschollList"
                      :key="index">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item label="助学经费总金额(元）"
                      fieldDecoratorId="helpStudyFundsTotalAmount">
          <ta-input-number :min="1"
                           :max="999999"
                           :precision="2"
                           style="width:100%"
                           :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="发放周期"
                      fieldDecoratorId="provideCycle">
          <ta-select :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in releasecycleList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="登记人"
                      fieldDecoratorId="user"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      v-if="false">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="登记时间"
                      fieldDecoratorId="date"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      v-if="false">
          <ta-input :disabled="idedit" />
        </ta-form-item>
      </ta-col>
    </ta-form>
    <div class="btnclass">
      <ta-button @click="returns"
                 style="left: 20px; top: 7px;">返回</ta-button>
    </div>
  </div>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
export default {
  components: {
    AddressComponent
  },
  data () {
    return {
      idedit: true,
      addressmodel: [],

      releasecycleList: [], // 发放周期
      isorphansschollList: [], // 是否接受孤儿助学
      worktudyList: [], // 工学情况
      pceialeducationtypeList: [], // 特教类型
      lengthofschoolList: [] // 学制
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.getworktudy()
    this.getspceialeducationtype()
    this.getlengthofschool()
    this.getisorphansscholl()
    this.getreleasecycle()
  },
  methods: {
    // 初始化数据
    initDatas () {
      let obj = JSON.parse(this.$route.query.obj)
      if (obj.specialEducationType) {
        obj['specialEducationType'] = obj.specialEducationType.split(',')
      } else {
        obj['specialEducationType'] = []
      }
      obj['educationTime'] = obj.educationTimeStart.substring(0, 10) + '~' + obj.educationTimeEnd.substring(0, 10)
      this.form.setFieldsValue(obj)
      this.addressmodel = [
        obj.province || '',
        obj.city || '',
        obj.county || ''
      ]
    },
    // 發放周期 RELEASECYCLE
    async getreleasecycle () {
      let data = await this.getDictionaries('RELEASECYCLE')
      this.releasecycleList = data
    },
    // 是否接受孤儿助学 YESNO
    async getisorphansscholl () {
      let data = await this.getDictionaries('YESNO')
      this.isorphansschollList = data
    },
    // 工学情况 WORKSTUDY
    async getworktudy () {
      let data = await this.getDictionaries('WORKSTUDY')
      this.worktudyList = data
    },
    // 特教类型 SPECIALEDUCATIONTYPE
    async getspceialeducationtype () {
      let data = await this.getDictionaries('SPECIALEDUCATIONTYPE')
      this.pceialeducationtypeList = data
    },
    // 学制年限 LENGTHOFSCHOOLING
    async getlengthofschool () {
      let data = await this.getDictionaries('LENGTHOFSCHOOLING')
      this.lengthofschoolList = data
    },
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    returns () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.btnclass {
  position: fixed;
  bottom: 0px;
  background-color: white;
  width: 74%;
  height: 45px;
}
</style>
