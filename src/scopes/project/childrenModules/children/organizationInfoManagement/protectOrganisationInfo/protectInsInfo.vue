<template>
  <div>
    <ta-row>
      <div class="mars">
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text base">基本信息</p>
          <hr />
        </div>
        <ta-col :span="8">
          <ta-form-item hidden
                        label="taorgId"
                        fieldDecoratorId="taorgId">
            <ta-input :disabled="true" />
          </ta-form-item>
          <ta-form-item label="机构名称"
                        v-if="userInfo.areaLevel=='4'||!isCanEdit"
                        fieldDecoratorId="orgName"
                        :fieldDecoratorOptions="verificationRules('机构名称',100)">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入机构名称" />
          </ta-form-item>
          <ta-form-item label="机构名称"
                        v-if="userInfo.areaLevel!='4'&&isCanEdit"
                        fieldDecoratorId="orgName"
                        :require="{message:'请选择机构名称'}">
            <ta-select placeholder="请选择机构名称"
                       @change="changeAri"
                       :disabled="basedisabled">
              <ta-select-option :value="item.orgName"
                                v-for="(item,index) in orgNameList"
                                :key="index">{{item.orgName}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <!-- <AddressComponent :addressmodel="addressmodel"
                            :msg="'区域'"
                            :labelwidth="{label: 6,wrapper: 18}"
                            arealevel="4"
                            :disabled="basedisabled"
                            @setaddress="setaddress"></AddressComponent> -->
          <ta-form-item label="区域"
                        fieldDecoratorId="areaNamePath"
                        :initValue="userInfo.areaNamePath">
            <ta-input :disabled="true" />
          </ta-form-item>
          <ta-form-item hidden
                        label="上级组织机构Id"
                        fieldDecoratorId="parentId">
            <ta-input :disabled="true" />
          </ta-form-item>
          <ta-form-item hidden
                        label="上级组织机构"
                        fieldDecoratorId="parentOrgName"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}">
            <ta-input :disabled="true" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item hidden
                        label="区域codeStr"
                        fieldDecoratorId="areaPath">
            <ta-input :disabled="true" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="机构地址"
                        fieldDecoratorId="address"
                        :fieldDecoratorOptions="verificationRules('院址，精确到门牌号',100)">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入院址" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="统一社会信用代码"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="unifiedSocialCreditCode">
            <ta-input :disabled="basedisabled"
                      @blur="chenkCode"
                      placeholder="请输入统一社会信用代码" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="机构类型"
                        fieldDecoratorId="orgType"
                        :require="{message:'请选择机构类型'}"
                        :initValue="userInfo.areaLevel=='4'?Enum.TYPEOFPROTECTION.XZJDWBZ:Enum.TYPEOFPROTECTION.WCNJZBHJG">
            <ta-select placeholder="请选择机构类型"
                       v-model="orgTypeValue"
                       :disabled="true">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in inTypeList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="机构性质"
                        fieldDecoratorId="orgNature"
                        :require="{message:'请选择机构性质'}">
            <ta-select placeholder="请选择机构性质"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in institutionPropertyList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否经编办批准"
                        fieldDecoratorId="isApproval"
                        :initValue="'2'"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择是否经编办批准'}">
            <ta-select placeholder="请选择是否经编办批准"
                       @change="handleChange"
                       :disabled="basedisabled">
              <ta-select-option value="1">是</ta-select-option>
              <ta-select-option value="2">否</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                v-if="istrue">
          <ta-form-item label="未保机构编制文号"
                        fieldDecoratorId="codedNumber"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        :fieldDecoratorOptions="verificationRulesNotMustFill('未保机构编制文号', 30)">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入未保机构编制文号" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                v-if="istrue">
          <ta-form-item label="批准日期"
                        fieldDecoratorId="approvalDate"
                        :require="{message:'请选择批准日期'}">
            <ta-date-picker style="width: 100%"
                            :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                v-if="istrue">
          <ta-form-item label="编办批复机构编制人员数量"
                        :labelCol="{span:11}"
                        :wrapperCol="{span:13}"
                        fieldDecoratorId="approvalOrgPeopleNum"
                        :require="{message:'请输入编办批复机构编制人员数量'}">
            <ta-input-number :min="0"
                             :max="999999"
                             :precision="0"
                             style="width:100%"
                             placeholder="请输入编办批复机构编制人员数量 "
                             :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                v-if="istrue">
          <ta-form-item label="实际在编人员数量"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        fieldDecoratorId="actualRegularPeopleNum"
                        :require="{message:'请输入实际在编人员数量'}">
            <ta-input-number :min="0"
                             :max="999999"
                             :precision="0"
                             style="width:100%"
                             placeholder="请输入实际在编人员数量"
                             :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                key="1">
          <ta-form-item label="机构是否独立"
                        :labelCol="{ span: 6 }"
                        :wrapperCol="{span:18}"
                        :require="{enable: hasIsOnlyOffice,message:'请选择机构是否独立'}"
                        fieldDecoratorId="isOnlyOffice"
                        :initValue="Enum.YESNO.FOU">
            <ta-select placeholder="请选择机构是否独立"
                       v-model="isOnlyOfficeValue"
                       :disabled="isOnlyOfficeDisabled||basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                key="3"
                v-if="isOnlyOfficeValue==Enum.YESNO.FOU">
          <ta-form-item label="独立方式"
                        :labelCol="{ span: 6 }"
                        :wrapperCol="{span:18}"
                        :require="{message:'请选择独立方式'}"
                        fieldDecoratorId="peopleOrWork">
            <ta-radio-group :disabled="basedisabled"
                            @change="changePeopleOrWork"
                            :options="isOnlyOfficeDisabled?[{label:'自行挂牌',value:'9'}]:[{label:'相对独立',value:'1'},{label:'挂牌成立',value:'2'}]">
            </ta-radio-group>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                key="2">
          <ta-form-item label="机构设置方式"
                        fieldDecoratorId="orgSettingWay"
                        :require="{message:'请选择机构设置方式'}">
            <ta-select :collection-type="basedisabled?'ORGSETTINGMODE':userInfo.areaLevel!='4'?'ORGSETTINGMODEWCN':'ORGSETTINGMODEXZ'"
                       :collection-filter="collectionFilter"
                       v-model="orgSettingWayValue"
                       :mode="isOnlyOfficeValue==Enum.YESNO.FOU&&userInfo.areaLevel=='4'||!isCanEdit?'multiple':'default'"
                       :reverseFilter="true"
                       :disabled="basedisabled"
                       placeholder="请选择机构设置方式" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                v-if="orgSettingWayValue.includes(Enum.ORGSETTINGMODE.YTQTJGSLWBJG)||orgSettingWayValue.includes(Enum.ORGSETTINGMODE.YTQTJGSL)">
          <ta-form-item label="其他机构"
                        fieldDecoratorId="orgSettingWayOther"
                        :fieldDecoratorOptions="verificationRules('其他机构',72)">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入其他机构" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="邮政编码"
                        fieldDecoratorId="postCode"
                        :fieldDecoratorOptions="{validateTrigger: ['change', 'blur'],rules: [{ required: false,message:'' },{validator: fnValidatePostCode}]}">

            <ta-input :disabled="basedisabled"
                      placeholder="请输入邮政编码" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="负责人"
                        fieldDecoratorId="legalRepresentative"
                        :fieldDecoratorOptions="verificationRules('负责人',72)">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入负责人" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="负责人电话"
                        fieldDecoratorId="telForLegalRepresentative"
                        :fieldDecoratorOptions="verificationRules('负责人电话', { type: 'phone' })">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入负责人电话" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="传真"
                        fieldDecoratorId="fax"
                        :fieldDecoratorOptions="{rules: [{ required: false},
                       { pattern: /^\d{0,11}$/, message: '请正确填写传真' } ]}">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入传真" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="占地面积(m²)"
                        :labelCol="{ span: 6 }"
                        :wrapperCol="{span:18}"
                        :require="{message:'请输入占地面积(m²)'}"
                        fieldDecoratorId="areaCovered">
            <ta-input-number :min="1"
                             :max="99999"
                             :precision="2"
                             style="width:100%"
                             placeholder="请输入占地面积(m²)"
                             :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                v-if="orgTypeValue!=Enum.TYPEOFPROTECTION.XZJDWBZ">
          <ta-form-item label="未成年人区域面积(m²)"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        :require="{message:'请输入未成年人区域面积(m²)'}"
                        fieldDecoratorId="areaOfUse">
            <ta-input-number :min="1"
                             :max="9999999999"
                             :precision="2"
                             style="width:100%"
                             placeholder="请输入成年人区域面积"
                             :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                v-if="orgTypeValue!=Enum.TYPEOFPROTECTION.XZJDWBZ">
          <ta-form-item label="核定未成年人床位数"
                        :labelCol="{ span: 8 }"
                        :wrapperCol="{span:16}"
                        :require="{message:'请输入核定未成年人床位数'}"
                        fieldDecoratorId="approvedBedNumber">
            <ta-input-number :min="0"
                             :max="999999"
                             :precision="0"
                             style="width:100%"
                             placeholder="请输入床位数 "
                             :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="建筑面积(m²)"
                        :labelCol="{ span: 6 }"
                        :wrapperCol="{span:18}"
                        fieldDecoratorId="floorage">
            <ta-input-number :min="1"
                             :max="99999"
                             :precision="2"
                             style="width:100%"
                             placeholder="请输入建筑面积(m²)"
                             :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="单位电话"
                        fieldDecoratorId="tel"
                        :fieldDecoratorOptions="verificationRulesNotMustFill('单位电话', { type: 'phone' })">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入单位电话" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否开通未成年人保护专线"
                        :labelCol="{ span: 10}"
                        :wrapperCol="{span:14}"
                        fieldDecoratorId="isKaiProjectPhone">
            <ta-select placeholder="请选择"
                       :disabled="basedisabled"
                       v-model="isKaiProjectPhoneValue">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                v-if="isKaiProjectPhoneValue==Enum.YESNO.SHI">
          <ta-form-item label="未成年人保护专线"
                        :labelCol="{ span: 8 }"
                        :wrapperCol="{span:16}"
                        fieldDecoratorId="projectPhone"
                        :fieldDecoratorOptions="verificationRules('未成年人保护专线',{type: 'phone'})">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入未成年人保护专线" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8"
                v-show="false">
          <ta-form-item label="行政区划代码"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="areaCode"
                        :fieldDecoratorOptions="{rules: [{ max: 12, message: '字段最大长度为12' }]}">
            <ta-input :disabled="true"
                      placeholder="根据当前区域自动填充" />
          </ta-form-item>
        </ta-col>
        <ta-col :span='24'>
          <ta-form-item label="管辖范围"
                        fieldDecoratorId="areaScope"
                        :fieldDecoratorOptions="verificationRulesNotMustFill('管辖范围',200,true)"
                        :labelCol="{ span:2 }"
                        :wrapperCol="{span:22}">
            <ta-textarea placeholder="请输入管辖范围"
                         :disabled="basedisabled"
                         :rows="2" />
          </ta-form-item>
        </ta-col>
        <ta-col :span='24'>
          <ta-form-item label="培训能力建设情况"
                        fieldDecoratorId="trainSituation"
                        :fieldDecoratorOptions="verificationRulesNotMustFill('培训能力建设情况',66,true)"
                        :labelCol="{ span:2 }"
                        class="alonerow">
            <ta-textarea placeholder="请输入培训能力建设情况"
                         :disabled="basedisabled"
                         :rows="2" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8"
                  v-if="istrue">
            <ta-form-item label="上传编办批复文件"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="upLoadPathIds"
                          :require="{message:'请上传编办批复文件'}">
              <ta-upload :withCredentials="true"
                         name="file"
                         :data="{busiType: '1'}"
                         :multiple="true"
                         :action="action"
                         :fileList="fileList"
                         @change="filechange"
                         :beforeUpload="beforeUpload"
                         @preview="preview">
                <ta-button :disabled="basedisabled">
                  <ta-icon type="upload" />上传文件
                </ta-button>
              </ta-upload>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8"
                  v-if="nowtype!=1">
            <ta-form-item label="个案救助未成年人次"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="minorHelpNum">
              <ta-input-number :min="0"
                               :max="9999"
                               :precision="0"
                               style="width:100%"
                               :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8"
                  v-if="nowtype!=1">
            <ta-form-item label="未成年人临时监护人次"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="minorGuardianshipNum">
              <ta-input-number :min="0"
                               :max="9999"
                               :precision="0"
                               style="width:100%"
                               :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <div class="warntextNew">
            <p>
              <ta-icon type="info-circle-o"
                       class="icons" />机构是否独立中，独立是指经编办批准单独成立的未保机构，批文中明确了机构编制等；相对独立是指经编办批准依托相关机构成立未保机构，批文中明文规定了从事未保工作的编制数量。同时，机构有专门从事未保工作的人员和场地；挂牌成立是指经编办批准在其他机构设立未保机构，但批文中未明确从事未保工作的人员编制数量；自行挂牌是指无编办批文，由民政部门自行挂牌的机构。
            </p>
          </div>
        </ta-col>
      </div>
      <div class="mars">
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text other">工作经费来源（单位：万元）</p>
          <hr />
        </div>
        <ta-table :columns="[
      {
        title: '本级财政经费',
        dataIndex: 'bjczMoney',
        align: 'center',
        scopedSlots: { customRender: basedisabled ? () => { } : 'bjczMoney' }
      },
      {
        title: '困难群众救助补助资金',
        dataIndex: 'knqzjzbzMoney',
        align: 'center',
        scopedSlots: { customRender: basedisabled ? () => { } : 'bjczMoney' }
      },
      {
        title: '福彩公益金',
        dataIndex: 'fcgyMoney',
        align: 'center',
        scopedSlots: { customRender: basedisabled ? () => { } : 'bjczMoney' }
      },
       {
        title: '慈善总会资金',
        dataIndex: 'cszhMoney',
        align: 'center',
        scopedSlots: { customRender: basedisabled ? () => { } : 'bjczMoney' }
      },
      {
        title: '其他资金',
        dataIndex: 'otherMoney',
        align: 'center',
        scopedSlots: { customRender: basedisabled ? () => { } : 'bjczMoney' }
      },
      {
        title: '未保工作总费用金额',
        align: 'center',
        dataIndex: 'uninsuredMoneySum'
      }
    ]"
                  :dataSource="dataSource"
                  bordered
                  class="tableMargin">
          <ta-table-edit slot="bjczMoney"
                         type="inputNumber"
                         @change="changeDataJf"
                         edit-style="border"></ta-table-edit>
        </ta-table>
        <ta-col :span="24">
          <ta-col :span="8"
                  v-if="fundingSourceOther">
            <ta-form-item label="其他资金来源"
                          fieldDecoratorId="fundingSourceOther"
                          :fieldDecoratorOptions="verificationRules('其他资金来源',72)">
              <ta-input :disabled="basedisabled"
                        placeholder="请注明其他资金经费来源" />
            </ta-form-item>
          </ta-col>
        </ta-col>
      </div>
      <div class="mars">
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text other">引进未保类社会组织和孵育未保类社会组织信息</p>
          <hr />
        </div>
        <ta-col :span='24'>
          <ta-col :span="11">
            <ta-form-item label="引进未保类社会组织数"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:15}"
                          initValue="0"
                          fieldDecoratorId="introduceSocialOrgNum"
                          :require="{message:'请输入引进未保类社会组织数'}">
              <ta-input-number :min="0"
                               :max="9999"
                               @change="changeOrgNum($event,'Yj')"
                               :precision="0"
                               placeholder="请输入引进未保类社会组织数"
                               :disabled="basedisabled" />
            </ta-form-item>
            <div class="marginC">
              <ta-table :columns="[{ title: '社会组织名称', dataIndex: 'socialOrganizationName',scopedSlots: { customRender: basedisabled?()=>{}:'socialOrganizationName' },},{ title: '工作人员数量', dataIndex: 'workPeopleNum',scopedSlots: { customRender: basedisabled?()=>{}:'workPeopleNum' },}]"
                        :dataSource="dataSourceYj"
                        :haveSn="true"
                        bordered>
                <ta-table-edit slot="socialOrganizationName"
                               type="input"
                               :beforeChange="fnBeforeChange"
                               edit-style="border"></ta-table-edit>
                <ta-table-edit slot="workPeopleNum"
                               type="inputNumber"
                               @change="changeData"
                               edit-style="border"></ta-table-edit>
              </ta-table>
            </div>
          </ta-col>
          <ta-col :span="1">
          </ta-col>
          <ta-col :span="11">
            <ta-form-item label="孵育未保类社会组织数"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:15}"
                          initValue="0"
                          fieldDecoratorId="incubationSocialOrgNum"
                          :require="{message:'请输入孵育未保类社会组织数'}">
              <ta-input-number :min="0"
                               :max="9999"
                               @change="changeOrgNum($event,'Fy')"
                               :precision="0"
                               placeholder="请输入孵育未保类社会组织数"
                               :disabled="basedisabled" />
            </ta-form-item>
            <div class="marginC">
              <ta-table :columns="[{ title: '社会组织名称', dataIndex: 'socialOrganizationName',scopedSlots: { customRender: basedisabled?()=>{}:'socialOrganizationName' },},{ title: '工作人员数量', dataIndex: 'workPeopleNum',scopedSlots: { customRender: basedisabled?()=>{}:'workPeopleNum' },}]"
                        :dataSource="dataSourceFy"
                        :haveSn="true"
                        bordered>
                <ta-table-edit slot="socialOrganizationName"
                               type="input"
                               :beforeChange="fnBeforeChange"
                               edit-style="border"></ta-table-edit>
                <ta-table-edit slot="workPeopleNum"
                               type="inputNumber"
                               @change="changeData"
                               edit-style="border"></ta-table-edit>
              </ta-table>
            </div>
          </ta-col>
        </ta-col>
      </div>
    </ta-row>
  </div>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
export default {
  components: {
    AddressComponent
  },
  props: {
    nowtype: {
      required: true
    },
    isCanEdit: {
      type: Boolean
    },
    hasIsOnlyOffice: {
      type: Boolean,
      default: false
    },
    orgNameList: {
      type: Array,
      required: true
    },
    parentId: {
      type: String,
      required: false
    },
    parentOrgName: {
      type: String,
      required: false
    },
    basedisabled: {
      type: Boolean,
      required: true
    },
    yesNoList: {
      type: Array,
      required: true
    },
    thisP: {
      required: true
    },
    actualAreaAddressVal: {
      type: Array
    },
    istrue: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      dataSource: [{ bjczMoney: 0, cszhMoney: 0, knqzjzbzMoney: 0, fcgyMoney: 0, otherMoney: 0, uninsuredMoneySum: 0 }], // 经费来源数据
      addressmodel: [],
      disabled: false,
      inTypeList: [],
      institutionPropertyList: [],
      legalRepresentativeValue: '', // 负责人输入的值
      userInfo: window.parent.indexTool.getUserInfo(), // 当前用户信息
      dataSourceYj: [], // 引进社会组织数列表
      dataSourceFy: [], // 孵育社会组织数列表
      fileList: [], // 附件
      isOnlyOfficeValue: '1', // 机构是否独立选择的值
      isKaiProjectPhoneValue: '', // 是否开通未成年人保护专线选择的值
      orgSettingWayValue: '', // 机构设置方式选的值
      orgTypeValue: '', // 机构类型选择的值
      isOnlyOfficeDisabled: false, // 机构是否独立的只读控制
      fundingSourceOther: false // 其他经费来源
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('10%', '90%', 'alonerow') // 单独一行字段宽度控制
  },
  mounted () {
    this.getinType() // 机构类型
    this.getinstitutionPropertyList()
  },
  methods: {
    // 社会组织名称 单元格编辑校验
    fnBeforeChange ({ newData, record, columnKey }, callback) {
      // 单元格数据保存前数据处理（newData：返回改变的值、record：该行的行数据、columnKey：该列的key、callback：回调函数，可判断数据是否正确）
      // 注意，callback 必须被调用
      if (!newData || newData.length == 0) {
        callback('社会组织名称不能为空')
      } else if (newData && newData.length > 30) {
        callback('社会组织名称不能超过30个字符')
      } else {
        callback()
        // 可在此处对表格数据进行处理
        record[columnKey] = newData
      }
    },
    // 工作人员数量change
    changeData ({ newData, record, columnKey }) {
      if (!newData || newData.length == 0) {
        this.$message.error('工作人员数量不能为空')
      } else {
        // 将单元格数据修改为新值（newData：返回改变的值、record：该行的行数据、columnKey：该列的key）
        // 也可当表格编辑状态关闭后，在此处对表格数据进行处理
        record[columnKey] = newData
      }
    },
    // 经费来源change
    changeDataJf ({ newData, record, columnKey }) {
      // 将单元格数据修改为新值（newData：返回改变的值、record：该行的行数据、columnKey：该列的key）
      // 也可当表格编辑状态关闭后，在此处对表格数据进行处理
      record[columnKey] = newData || 0
      // 计算小计
      record.uninsuredMoneySum = this.add(this.add(this.add(this.add(record.bjczMoney, record.cszhMoney), record.knqzjzbzMoney), record.fcgyMoney), record.otherMoney)
      this.fundingSourceOther = record.otherMoney != 0
    },
    // 地址赋值
    setaddress () {
      this.$emit('setaddress')
    },
    changePeopleOrWork (e) {
      if (e.length > 0) {
        if (e[e.length - 1] == '9') {
          e.splice(0, e.length - 1)
        } else {
          if (e.indexOf('9') != -1) {
            const index = e.indexOf('9')
            e.splice(index, 1)// 存在就删除
          }
        }
      }
    },
    async chenkCode () {
      const v = this.thisP.orgFrom.getFieldsValue().unifiedSocialCreditCode
      if (v && v.length < 19) {
        const res = await this.post('childProtectOrgManagement/checkXYDM', { uniformCode: v })
        if (!res.errors) {
          if (res.data.data != 0) {
            this.thisP.orgFrom.setFieldsValue({ unifiedSocialCreditCode: null })
            this.$message.error('统一社会信用代码已被占用,不能录入重复的统一社会信用代码')
          }
        } else {
          this.$message.error(res.errors)
        }
      }
    },
    fnValidateMore (rule, value, callback) {
      if (value > 30) {
        callback('引进或孵育社会组织数量最大为30个')
      } else {
        // 注意，callback 必须被调用
        callback()
      }
    },
    // 引进社会组织数和孵育社会组织数的change
    changeOrgNum (e, type) {
      this['dataSource' + type] = []
      for (let i = 0; i < Number(e); i++) {
        this['dataSource' + type].push({ introduceType: type == 'Yj' ? 1 : 2 })
      }
    },
    changeAri (val) {
      this.orgNameList.forEach(item => {
        if (item.orgName == val) {
          this.$emit('setFrom', item)
        }
      })
    },
    fnValidatePostCode (rule, value, callback) {
      if (value) {
        if (!/^[0-9]{6}$/.test(value)) {
          callback('请输入正确的邮政编码')
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    fnValidate (rule, value, callback) {
      if (
        !/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value) ||
        value.length > 20
      ) {
        callback('最多含2位小数的数字,且最长为20')
      } else {
        callback()
      }
    },
    async getinstitutionPropertyList () {
      const data = await this.getDictionaries('ORGNATURE')
      this.institutionPropertyList = data
    },
    async getinType () {
      const data = await this.getDictionaries('TYPEOFPROTECTION')
      this.inTypeList = data
    },
    setadrr () {
      this.$emit('setadrr')
    },
    handleChange (e) {
      this.thisP.istrue = e == '1'
      this.isOnlyOfficeDisabled = e == '2'
      if (e == '2') { // 是经编办批准机构是否独立选否只读
        this.$emit('setIsOnlyOfficeNo')
      }
      // 清空独立方式
      this.$emit('clearPeopleOrWork')
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.basedisabled) {
          return false
        }
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    preview (file) { this.downloadFile(file) }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    },
    // 根据机构是否独立设置机构设置方式
    collectionFilter () {
      let filterData = ''
      const { ORGSETTINGMODE } = this.Enum
      if (this.userInfo.areaLevel != '4') { // 未保机构
        filterData = this.isOnlyOfficeValue == this.Enum.YESNO.SHI ? ORGSETTINGMODE.DLWCNBHZX : ORGSETTINGMODE.YTJZZSLDWBKSHZGPSLJG + ',' + ORGSETTINGMODE.YTFLYSLWBJG + ',' + ORGSETTINGMODE.YTYLJGSLWBJG + ',' + ORGSETTINGMODE.YTSHJZZXSLWBJG + ',' + ORGSETTINGMODE.YTKFYYSLWBJG + ',' + ORGSETTINGMODE.YTQTJGSLWBJG
      } else { // 乡镇未保站
        filterData = this.isOnlyOfficeValue == this.Enum.YESNO.SHI ? ORGSETTINGMODE.DDSL : ORGSETTINGMODE.YTSHSWFWZX + ',' + ORGSETTINGMODE.MZB + ',' + ORGSETTINGMODE.SGZ + ',' + ORGSETTINGMODE.JZFW + ',' + ORGSETTINGMODE.BMFWZXSL + ',' + ORGSETTINGMODE.YTQTJGSL
      }
      return filterData
    }
  },
  watch: {
    // 当负责人数据改变时，同步到人员信息负责人
    legalRepresentativeValue (val) {
      this.$emit('updatePersonnel', val, 'personFrom')
    },
    // 机构是否独立改变时清空机构设置方式
    isOnlyOfficeValue () {
      // 清空机构设置方式
      this.$emit('clearOrgSettingWay')
    }
  }
}
</script>
<style lang="less" scoped>
.mars {
  padding: 20px;
  .marginC {
    margin: 20px 0;
    clear: both;
  }
}
.item_title {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  hr {
    width: 100%;
    height: 1px;
    border-top: 1px solid #bfbfbf;
    border-right: none;
    border-bottom: none;
    border-left: none;
    border-image: initial;
  }
  .lines {
    width: 5px;
    height: 15px;
    background: rgba(24, 144, 255, 1);
    opacity: 1;
  }
  .item_text {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    margin-left: 5px;
  }
  .base {
    width: 85px;
  }
  .other {
    width: 465px;
  }
}
.warntextNew {
  width: 100%;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  align-items: center;
  p {
    margin: 20px;
  }
  .icons {
    margin: 0 7px 0 24px;
  }
}
.tableMargin {
  margin-bottom: 20px;
}
</style>
