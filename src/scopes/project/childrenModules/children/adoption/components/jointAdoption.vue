<template>
  <div>
    <ta-row class="fromintop">
      <ta-radio-group @change="ismanChange"
                      v-model="isman"
                      class="radio_grops"
                      :disabled="basedisabled">
        <ta-col :span="12"
                type="flex"
                justify="center"
                align="center">
          <ta-col :span="6"
                  :offset="10">
            <img src="static/img/man.png" />
            <div class="texts">男方信息</div>
          </ta-col>
          <ta-col :span="4"
                  type="flex"
                  justify="center"
                  align="center">
            <ta-radio v-if="applytype||applytype==0"
                      value="1"
                      class="apply">主申请人</ta-radio>
          </ta-col>
        </ta-col>
        <ta-col :span="12"
                type="flex"
                justify="center"
                align="middle">
          <ta-col :span="6"
                  :offset="10">
            <img src="static/img/woman.png" />
            <div class="texts">女方信息</div>
          </ta-col>
          <ta-col :span="4"
                  type="flex"
                  justify="center"
                  align="center">
            <ta-radio v-if="applytype||applytype==0"
                      value="0"
                      class="apply">主申请人</ta-radio>
          </ta-col>
        </ta-col>
      </ta-radio-group>
    </ta-row>
    <ta-row class="frominadd">
      <ta-col :span="11">
        <!-- <ta-col :span="0">
          <ta-form-item label="国籍"
                        fieldDecoratorId="nationality"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :require="{message:'请选择国籍'}"
                        :initValue="this.Enum.NATIONALITY.ZG">
            <ta-select :placeholder="basedisabled?'':'请选择国籍'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationalityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col> -->
        <ta-col :span="12">
          <ta-form-item label="男方姓名"
                        fieldDecoratorId="name"
                        :fieldDecoratorOptions="(isrequire && isshyang)?verificationRulesNotMustFill('男方姓名'):rules.name"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入男方姓名'"
                      @change="changeName"
                      :disabled="basedisabled || adoptive" />
          </ta-form-item>

          <ta-form-item label="证件类型"
                        fieldDecoratorId="memberIdType"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorOptions="(isrequire && isshyang)?verificationRulesNotMustFill('证件类型'):verificationRules('证件类型')"
                        :initValue="this.Enum.IDCARD_TYPE.NDJMSFZ">
            <ta-select :placeholder="basedisabled?'':'请选择证件类型'"
                       :disabled="basedisabled || adoptive"
                       @change="changeIdCardTypeValue1">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in idcardTypeList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="出生日期"
                        fieldDecoratorId="birthday"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorOptions="(isrequire && isshyang)?verificationRulesNotMustFill('出生日期'):verificationRules('出生日期')">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            @change="changeBirthday"
                            :placeholder="basedisabled?'':'请选择出生日期'"
                            :disabled="basedisabled || adoptive"
                            :disabledDate="disabledDate" />
          </ta-form-item>

          <ta-form-item label="工作单位"
                        fieldDecoratorId="workUnit"
                        :fieldDecoratorOptions="(isrequire && isshyang)?verificationRulesNotMustFill('工作单位'):rules.workUnit"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入工作单位'"
                      @change="changeWorkUnit"
                      :disabled="basedisabled" />
          </ta-form-item>

          <!-- <ta-form-item
          label="健康状况"
          fieldDecoratorId="healthCondition"
          :require="{message:'请选择健康状况!'}"
        >
          <ta-select placeholder="请选择健康状况" :disabled="basedisabled">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in healthList"
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>
          </ta-form-item>-->
          <Health :labelwidth="labelwidth"
                  :disabled="basedisabled"
                  :heathmodel="menheathmodel"
                  @healthchange="healthchange"
                  :isRequire="additionalYesOrNo!='1'&&!(isrequire && isshyang)"
                  @setheath="mensetheath"></Health>

          <ta-form-item label="联系电话"
                        fieldDecoratorId="contactNumber"
                        :fieldDecoratorOptions=" additionalYesOrNo=='1'|| (isrequire && isshyang)?rules.contactNumber1:rules.contactNumber"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入联系电话'"
                      @change="changeContactNumber"
                      :disabled="basedisabled" />
          </ta-form-item>
          <!-- <ta-form-item label="国籍"
                        v-if="adoptive"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_nationality"
                        :require="{message:'请选择国籍'}"
                        :initValue="this.Enum.NATIONALITY.ZG">
            <ta-select :placeholder="basedisabled?'':'请选择国籍'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationalityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item> -->
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="身份类别"
                        fieldDecoratorId="identityCategory"
                        :fieldDecoratorOptions="(isrequire && isshyang)?verificationRulesNotMustFill('身份类别'):verificationRules('身份类别')"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :initValue="this.isCounty?this.Enum.IDENTITCATEGORY.NDJM:''">
            <ta-select :placeholder="basedisabled?'':'请选择身份类别'"
                       @change="changeIdentityCategory"
                       :disabled="basedisabled || adoptive">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in identityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="证件号码"
                        v-if="IdCardTypeValue1 == '01'"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorOptions="(isrequire && isshyang)?this.selectNotMust():adoptive?verificationRules('证件号码'):rules.idCard">
            <ta-input :placeholder="basedisabled?'':'请输入证件号码'"
                      @change="changeIdCard"
                      :disabled="basedisabled || adoptive" />
            <!-- @blur="idcardBuler" -->
          </ta-form-item>
          <ta-form-item label="证件号码"
                        v-else
                        fieldDecoratorId="idCard"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorOptions="(isrequire && isshyang)?this.selectNotMust():rules.idCard2">
            <ta-input :placeholder="basedisabled?'':'请输入证件号码'"
                      @change="changeIdCard"
                      :disabled="basedisabled || adoptive" />
          </ta-form-item>
          <ta-form-item label="民族"
                        fieldDecoratorId="nation"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :initValue="this.Enum.NATION.HZ">
            <ta-select :placeholder="basedisabled?'':'请选择民族'"
                       @change="changeNation"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="职业"
                        fieldDecoratorId="profession"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择职业'"
                       @change="changeProfession"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                :title='item.label.length>9?item.label:null'
                                v-for="(item,index) in occupattioList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="文化程度"
                        fieldDecoratorId="educationLevel"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择文化程度'"
                       @change="changeEducationLevel"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in cultureList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="婚姻状况"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="maritalStatus"
                        :initValue="this.Enum.MARRIAGE.YH"
                        :fieldDecoratorOptions="additionalYesOrNo=='1'||(isrequire && isshyang)?this.selectNotMust():rules.maritalStatus">
            <ta-select :placeholder="basedisabled?'':'请选择婚姻状况'"
                       @change="changeMaritalStatus"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in (isshow?marriageyList1:marriageyList)"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="2"></ta-col>
      <ta-col :span="11">
        <ta-col :span="0">
          <ta-form-item label="国籍"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_nationality"
                        :require="{message:'请选择国籍'}"
                        :initValue="this.Enum.NATIONALITY.ZG">
            <ta-select :placeholder="basedisabled?'':'请选择国籍'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationalityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="女方姓名"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_name"
                        :fieldDecoratorOptions="(isrequire && isshyang)?verificationRulesNotMustFill('女方姓名'):rules.name">
            <ta-input :placeholder="basedisabled?'':'请输入女方姓名'"
                      @change="changeCopyName"
                      :disabled="basedisabled || adoptive" />
          </ta-form-item>

          <ta-form-item label="证件类型"
                        fieldDecoratorId="copy_memberIdType"
                        :fieldDecoratorOptions="(isrequire && isshyang)?verificationRulesNotMustFill('证件类型'):verificationRules('证件类型')"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :initValue="this.Enum.IDCARD_TYPE.NDJMSFZ">
            <ta-select :placeholder="basedisabled?'':'请选择证件类型'"
                       :disabled="basedisabled || adoptive"
                       @change="changeIdCardTypeValue2">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in idcardTypeList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="出生日期"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_birthday"
                        :fieldDecoratorOptions="(isrequire && isshyang)?verificationRulesNotMustFill('出生日期'):verificationRules('出生日期')">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            @change="changeCopyBirthday"
                            :disabled="basedisabled || adoptive"
                            :placeholder="basedisabled?'':'请选择出生日期'"
                            :disabledDate="disabledDate" />
          </ta-form-item>

          <ta-form-item label="工作单位"
                        fieldDecoratorId="copy_workUnit"
                        :fieldDecoratorOptions="(isrequire && isshyang)?verificationRulesNotMustFill('工作单位'):rules.workUnit"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入工作单位'"
                      @change="changeCopyWorkUnit"
                      :disabled="basedisabled" />
          </ta-form-item>

          <Health :labelwidth="labelwidth"
                  :disabled="basedisabled"
                  :fileldName="fileldHeathName"
                  :heathmodel="womenheathmodel"
                  @healthchange="copyHealthchange"
                  :isRequire="additionalYesOrNo!='1'&&!(isrequire && isshyang)"
                  @setheath="womensetheath"></Health>

          <ta-form-item label="联系电话"
                        fieldDecoratorId="copy_contactNumber"
                        :fieldDecoratorOptions=" additionalYesOrNo=='1'|| (isrequire && isshyang)?rules.contactNumber1:rules.contactNumber"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入联系电话'"
                      @change="changeCopyContactNumber"
                      :disabled="basedisabled" />
          </ta-form-item>
          <!-- <ta-form-item label="国籍"
                        v-if="adoptive"
                        fieldDecoratorId="nationality"
                        :require="{message:'请选择国籍'}"
                        :initValue='this.Enum.NATIONALITY.ZG'
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择国籍'"
                       showSearch>
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationalityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item> -->
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="身份类别"
                        fieldDecoratorId="copy_identityCategory"
                        :fieldDecoratorOptions="(isrequire && isshyang)?verificationRulesNotMustFill('身份类别'):verificationRules('身份类别')"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :initValue="this.isCounty?this.Enum.IDENTITCATEGORY.NDJM:''">
            <ta-select :placeholder="basedisabled?'':'请选择身份类别'"
                       @change="changeCopyIdentityCategory"
                       :disabled="basedisabled || adoptive">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in identityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="证件号码"
                        v-if="IdCardTypeValue2 == '01'"
                        fieldDecoratorId="copy_idCard"
                        :fieldDecoratorOptions="(isrequire && isshyang)?this.selectNotMust():adoptive?verificationRules('证件号码'):rules.copy_idCard"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入证件号码'"
                      @change="changeCopyIdCard"
                      :disabled="basedisabled || adoptive" />
            <!-- @blur="idcardBuler" -->
          </ta-form-item>
          <ta-form-item label="证件号码"
                        v-else
                        fieldDecoratorId="copy_idCard"
                        :fieldDecoratorOptions="(isrequire && isshyang)?this.selectNotMust():rules.idCard2"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入证件号码'"
                      @change="changeCopyIdCard"
                      :disabled="basedisabled || adoptive" />
          </ta-form-item>
          <ta-form-item label="民族"
                        fieldDecoratorId="copy_nation"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :initValue="this.Enum.NATION.HZ">
            <ta-select :placeholder="basedisabled?'':'请选择民族'"
                       @change="changeCopyNation"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="职业"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_profession">
            <ta-select :placeholder="basedisabled?'':'请选择职业'"
                       @change="changeCopyProfession"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                :title='item.label.length>9?item.label:null'
                                v-for="(item,index) in occupattioList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="文化程度"
                        fieldDecoratorId="copy_educationLevel"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择文化程度'"
                       @change="changeCopyEducationLevel"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in cultureList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="婚姻状况"
                        fieldDecoratorId="copy_maritalStatus"
                        :fieldDecoratorOptions="additionalYesOrNo=='1'||(isrequire && isshyang)?this.selectNotMust():rules.maritalStatus"
                        :initValue="this.Enum.MARRIAGE.YH"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择婚姻状况'"
                       @change="changeCopyMaritalStatus"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in (isshow?marriageyList1:marriageyList)"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>
    </ta-row>

    <ta-row class="frominadd">
      <ta-col :span="11"
              key="1">
        <AddressComponent msg="地址"
                          :addressmodel="menaddressmodel"
                          @setaddress="mensetaddress"
                          :disabled="basedisabled"
                          arealevel="4"
                          :isRequire="!(isrequire && isshyang)"
                          @adsvalchange="adsvalchange"
                          :labelwidth="labelwidth2"></AddressComponent>
        <ta-form-item label
                      :fieldDecoratorOptions="(isrequire && isshyang)?this.selectNotMust():rules.censusRegisterDetail"
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 20 ,offset:4}">
          <ta-input :placeholder="basedisabled?'':'请输入详细地址'"
                    @change="changeCensusRegisterDetail"
                    :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="2"></ta-col>
      <ta-col :span="11"
              v-show="issameaddress!=1"
              key="2">
        <template v-if="issameaddress!=1">
          <AddressComponent msg="地址"
                            :fileldName="fileldName"
                            :addressmodel="womenaddressmodel"
                            @setaddress="womensetaddress"
                            arealevel="4"
                            @adsvalchange="copyadsvalchange"
                            :disabled="basedisabled"
                            :isRequire="!(isrequire && isshyang)"
                            :labelwidth="labelwidth2"></AddressComponent>
          <ta-form-item label
                        :fieldDecoratorOptions="(isrequire && isshyang)?this.selectNotMust():rules.censusRegisterDetail"
                        fieldDecoratorId="copy_censusRegisterDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 20 ,offset:4}">
            <ta-input :placeholder="basedisabled?'':'请输入详细地址'"
                      @change="changeCopyCensusRegisterDetail"
                      :disabled="basedisabled" />
          </ta-form-item>
        </template>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="是否地址一致"
                      fieldDecoratorId="sameAddress"
                      :fieldDecoratorOptions="{initialValue: '0'}"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 9 }">
          <ta-radio-group :options="sameaddress"
                          @change="radiochange"
                          :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24"
              v-if="!adoptive">
        <ta-form-item label="家庭年收入(元)"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 9 }"
                      fieldDecoratorId="familyIncome"
                      :require="{enable:additionalYesOrNo!='1',message:'请输入家庭年收入'}">
          <!-- :fieldDecoratorOptions="additionalYesOrNo=='1'?this.verificationRulesNotMustFill('家庭年收入(元)', 20):rules.familyIncome"> -->
          <!-- <ta-input-number :min="0" :max="999999999" :precision="2" placeholder="请输入家庭年收入" style="width:100%" :disabled="basedisabled" /> -->
          <!-- <ta-select placeholder="请选择家庭年收入" :disabled="basedisabled">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in familyincomeList"
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>-->
          <ta-input-number :min="1"
                           :max="999999999"
                           :precision="2"
                           style="width:100%"
                           :placeholder="basedisabled?'':'请输入家庭年收入(元)'"
                           :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24"
              v-if="ishide">
        <ta-form-item label="与被收养人关系"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 9 }"
                      fieldDecoratorId="relationship"
                      :fieldDecoratorOptions="additionalYesOrNo=='1'||(isrequire && isshyang)?this.selectNotMust():this.verificationRules('与被收养人关系')">
          <ta-select :placeholder="basedisabled?'':'请选择与被收养人关系'"
                     @change="changeRelationShip"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in relationsadopteesList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="24"
              v-if="ishide">
        <ta-form-item label="送养人意见"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 21 }"
                      fieldDecoratorId="opinion"
                      :fieldDecoratorOptions="additionalYesOrNo=='1'||(isrequire && isshyang)?this.verificationRulesNotMustFill('送养人意见',200):rules.opinion">
          <ta-textarea :placeholder="basedisabled?'':'请输入送养人意见'"
                       :disabled="basedisabled"
                       :rows="1" />
        </ta-form-item>
      </ta-col>
    </ta-row>
  </div>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
import Health from '@component/common/components/health'
import moment from 'moment'
export default {
  name: 'applicant',
  components: {
    AddressComponent,
    Health
  },
  props: {
    adoptive: {
      type: Boolean,
      default: false
    },
    isshow: {
      type: Boolean,
      default: false
    },
    isshyang: {
      type: Boolean,
      default: false
    },
    isrequire: {
      type: Boolean,
      default: false
    },
    additionalYesOrNo: { // 1---->补录
      type: String
    },
    menheathmodel: {
      type: Array,
      required: true
    },
    womenheathmodel: {
      type: Array,
      required: true
    },
    menaddressmodel: {
      type: Array,
      required: true
    },
    womenaddressmodel: {
      type: Array,
      required: true
    },
    applytype: {
      type: String,
      required: false
    },
    ishide: {
      type: Boolean,
      default: false
    },
    sexList: {
      type: Array,
      required: true
    },
    relationsadopteesList: {
      type: Array
    },
    nationList: {
      type: Array,
      required: true
    },
    healthList: {
      type: Array,
      required: true
    },
    cultureList: {
      type: Array,
      required: true
    },
    identityList: {
      type: Array,
      required: true
    },
    nationalityList: {
      type: Array,
      required: true
    },
    marriageyList: {
      type: Array,
      required: true
    },
    occupattioList: {
      type: Array,
      required: true
    },
    idcardTypeList: {
      type: Array,
      required: true
    },
    familyincomeList: {
      type: Array,
      required: true
    },
    basedisabled: {
      type: Boolean,
      required: true
    },
    issameaddress: {
      type: String,
      required: false
    },
    isCounty: {
      type: Boolean,
      required: false
    },
    idAdopttype: {
      type: Array
    }
  },
  data () {
    return {
      labelwidth: {
        label: 9,
        wrapper: 15
      },
      labelwidth2: {
        label: 4,
        wrapper: 20
      },
      rules: {
        contactNumber: {
          validateTrigger: ['change', 'blur'],
          rules: [
            { required: true, message: '请输入正确手机号' },
            { validator: this.phonerole }
          ]
        },
        contactNumber1: {
          validateTrigger: ['change', 'blur'],
          rules: [
            { required: false, message: '请输入正确手机号' },
            { validator: this.phonerole }
          ]
        },
        familyIncome: this.verificationRules('家庭年收入(元)', '0'),
        // idCard: this.idCardrules('证件号码'),
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        idCard2: this.verificationRules('证件号码', 18),
        copy_idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.copy_idcardrole }
          ]
        },
        name: this.verificationRules('姓名', 72),
        maritalStatus: this.verificationRules('婚姻状况'),
        workUnit: this.verificationRulesNotMustFill('工作单位', 50),
        censusRegisterDetail: this.verificationRules('详细地址', 100),
        opinion: this.verificationRules('送养人意见', 100, false)
      },
      marriageyList1: [
        { label: '初婚', value: '21' },
        { label: '已婚', value: '20' },
        { label: '再婚', value: '22' },
        { label: '复婚', value: '23' }
      ],
      isDisabled: false,
      fileldName: 'copy_address_Linkage',
      fileldHeathName: 'copy_healthCondition',
      sameaddress: [],
      manchecked: true,
      womenchecked: false,
      isman: '1',
      IdCardTypeValue1: '01',
      IdCardTypeValue2: '01',
      bl: false
    }
  },
  beforeUpdate () { this.isman = this.applytype },
  mounted () {
    this.getyesno()
  },
  methods: {
    changeRelationShip (e) {
      this.$emit('changeRelationShip', e)
    },
    changeName (e) {
      this.$emit('changeMan', e.target.value, 'name')
    },
    changeNation (e) {
      this.$emit('changeMan', e, 'nation')
    },
    changeProfession (e) {
      this.$emit('changeMan', e, 'profession')
    },
    changeIdentityCategory (e) {
      this.$emit('changeMan', e, 'identityCategory')
    },
    changeBirthday (e) {
      this.$emit('changeMan', e, 'birthday')
    },
    changeWorkUnit (e) {
      this.$emit('changeMan', e.target.value, 'workUnit')
    },
    changeMaritalStatus (e) {
      this.$emit('changeMan', e, 'maritalStatus')
    },
    changeEducationLevel (e) {
      this.$emit('changeMan', e, 'educationLevel')
    },
    changeIdCard (e) {
      this.$emit('changeMan', e.target.value, 'idCard')
    },
    changeContactNumber (e) {
      this.$emit('changeMan', e.target.value, 'contactNumber')
    },
    changeCensusRegisterDetail (e) {
      this.$emit('changeMan', e.target.value, 'censusRegisterDetail')
    },
    healthchange (e) {
      this.$emit('changeMan', e, 'health')
    },
    changeCopyName (e) {
      this.$emit('changeMan', e.target.value, 'copy_name')
    },
    changeCopyNation (e) {
      this.$emit('changeMan', e, 'copy_nation')
    },
    changeCopyProfession (e) {
      this.$emit('changeMan', e, 'copy_profession')
    },
    changeCopyIdentityCategory (e) {
      this.$emit('changeMan', e, 'copy_identityCategory')
    },
    changeCopyBirthday (e) {
      this.$emit('changeMan', e, 'copy_birthday')
    },
    changeCopyWorkUnit (e) {
      this.$emit('changeMan', e.target.value, 'copy_workUnit')
    },
    changeCopyMaritalStatus (e) {
      this.$emit('changeMan', e, 'copy_maritalStatus')
    },
    changeCopyEducationLevel (e) {
      this.$emit('changeMan', e, 'copy_educationLevel')
    },
    changeCopyIdCard (e) {
      this.$emit('changeMan', e.target.value, 'copy_idCard')
    },
    changeCopyContactNumber (e) {
      this.$emit('changeMan', e.target.value, 'copy_contactNumber')
    },
    changeCopyCensusRegisterDetail (e) {
      this.$emit('changeMan', e.target.value, 'copy_censusRegisterDetail')
    },
    copyHealthchange (e) {
      this.$emit('changeMan', e, 'copy_health')
    },
    adsvalchange (e) {
      this.$emit('changeMan', e, 'address')
    },
    copyadsvalchange (e) {
      this.$emit('changeMan', e, 'copy_address')
    },
    resetIdcard (bl) {
      this.$emit('setIdCard', '1')
      this.$emit('setIdCard', '2')
    },
    idcardBuler (re) {
      re.target.value = re.target.value.replace(/\s+/g, '')
    },
    changeIdCardTypeValue1 (v) {
      this.IdCardTypeValue1 = v
      this.$emit('changeMan', v, 'memberIdType')
    },
    changeIdCardTypeValue2 (v) {
      this.IdCardTypeValue2 = v
      this.$emit('setIdCard', '2')
    },
    radiochange (val) {
      this.$emit('update:womenaddressmodel', [])
      this.$emit('changeMan', val.target.value, 'sameAddress')
      // this.issameaddress = val.target.value
      this.$emit('update:issameaddress', val.target.value)
    },
    // YESNO
    async getyesno () {
      const data = await this.getDictionaries('YESNO')
      this.sameaddress = data
    },
    // 禁用时间,不能选择比当前时间小的日期
    disabledDate (current) {
      return current && current > (moment().endOf('day'))
    },
    phonerole (rule, value, callback) {
      if (!value || value == '') {
        callback()
      } else {
        if (value.length > 10 && value.length < 15) {
          callback()
        } else {
          callback('请输入正确的手机号码')
        }
      }
    },
    idcardrole (rule, value, callback) {
      if (
        this.idAdopttype[0] == '01' ||
        this.idAdopttype[0] == '' ||
        this.idAdopttype.length == 0
      ) {
        this.idCardValidate(rule, value, callback, this, 'idCard')
      } else {
        this.verificationRules('证件号码', 18)
      }
    },
    copy_idcardrole (rule, value, callback) {
      if (
        this.idAdopttype[1] == '01' ||
        this.idAdopttype[1] == '' ||
        this.idAdopttype.length == 0
      ) {
        this.idCardValidate(rule, value, callback, this, 'copy_idCard')
      } else {
        this.verificationRules('证件号码', 18)
      }
    },
    callbackByIdCard (sex, age, birth, key) {
      const obj = {
        sex,
        age,
        birth,
        key
      }
      this.$emit('setmendate', obj)
    },
    ismanChange (e) {
      const val = e.target.value + ''
      this.$emit('update:applytype', val)
    },
    womensetheath () {
      this.$emit('womensetheath')
    },
    mensetheath () {
      this.$emit('mensetheath')
    },
    womensetaddress () {
      this.$emit('womensetaddress')
    },
    mensetaddress () {
      this.$emit('mensetaddress')
    }
  }
}
</script>
<style scoped lang="less">
.fromintop {
  margin: 20px 0 0 0;
  position: relative;
}
.equally {
  position: absolute;
  position: absolute;
  right: 40px;
  top: 50%;
  margin-top: -10px;
}
.fromin {
  width: calc(100% - 60px);
  margin-left: 60px;
  margin-top: 20px;
}
.frominadd {
  margin-top: 0;
}
/deep/ .radio_grops {
  width: 100%;
}
.apply {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 74px;
}
.texts {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
}
</style>
