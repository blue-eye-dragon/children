<template>
  <div>
    <ta-row>
      <div hidden
           class="mars">
        <Divider title="机构基础信息"></Divider>
        <ta-col :span="24">
          <ta-col :span="8">
            <!-- 2020年3月8日18点44分 -->
            <ta-form-item hidden
                          label="welfareOrgId"
                          fieldDecoratorId="welfareOrgId">
              <ta-input :disabled="true" />
            </ta-form-item>
            <!-- xg 2019年12月16日14:41:54   st-->
            <ta-form-item hidden
                          label="taorgId"
                          fieldDecoratorId="taorgId">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item hidden
                          label="orgId"
                          fieldDecoratorId="orgId">
              <ta-input :disabled="true" />
            </ta-form-item>
            <!-- xg 2019年12月16日14:41:54   en-->
            <ta-form-item label="机构名称"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="orgName">
              <ta-input :disabled="true" />
              <!-- <ta-select placeholder="请选择机构名称"
                       @change="changeAri"
                       :disabled="isOrg">
              <ta-select-option :value="item.orgName"
                                v-for="(item,index) in orgNameList"
                                :key="index">{{item.orgName}}</ta-select-option>
            </ta-select> -->
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item hidden
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          label="上级组织机构Id"
                          fieldDecoratorId="parentOrgId">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="上级组织机构"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="parentOrgName">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">

            <ta-form-item label="传真"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="fax">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>

        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="区域"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="namePath">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item hidden
                          label="区域codeStr"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="areaPath">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="机构类型"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="orgType">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in inTypeList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="机构性质"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="orgNature">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in institutionPropertyList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <!-- area -->
            <ta-form-item label="行政区划代码"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="areaCode">
              <ta-input :disabled="true" />
            </ta-form-item>

          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="统一社会信用代码"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="unifiedSocialCreditCode">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="组织单位编码"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="orgCode">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="登记机关"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="registerOrg">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in registrationAuthorityList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="成立日期"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="foundDate">
              <ta-date-picker placeholder
                              style="width: 100%"
                              :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="院 址"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="address">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="营业执照颁发日期"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="businessLicenseIssueDate">
              <ta-date-picker placeholder
                              style="width: 100%"
                              :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="营业执照失效日期"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="businessLicenseExpirationDate">
              <ta-date-picker placeholder
                              style="width: 100%"
                              :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="邮政编码"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="postCode">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="咨询电话"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="tel">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="咨询电话是否114可查"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="call114ForConsultationYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="负责人"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="legalRepresentative">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="负责人联系电话"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="contactNumber">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="业务范围是否包括抚养儿童"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="businessScopeIncludesChildRearingYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="财务是否民政部门接管"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="civilAdministrationDepartmentTakeOverYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="是否社会福利院"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="isSocialWelfareOrg">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
      </div>
      <div hidden
           class="mars">
        <Divider title="实地验收情况"></Divider>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="是否蓝天计划项目"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="inBlueSkyProjectYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="是否为儿童提供安宁服务"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="providingPeaceServicesForChildrenYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="使用面积（m²）"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="areaOfUse">
              <ta-input-number :min="1"
                               :max="9999999999"
                               :precision="2"
                               style="width:100%"
                               :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="占地面积（m²）"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="areaCovered">
              <ta-input-number :min="1"
                               :max="99999"
                               :precision="2"
                               style="width:100%"
                               :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="建筑面积（m²）"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="floorage">
              <ta-input-number :min="1"
                               :max="99999"
                               :precision="2"
                               style="width:100%"
                               :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="儿童室外活动场所总面积（m²）"
                          :labelCol="{ span: 13 }"
                          :wrapperCol="{span:11}"
                          fieldDecoratorId="areaOfOutdoorActivitiesForChildren">
              <ta-input-number :min="1"
                               :max="9999999999"
                               :precision="2"
                               style="width:100%"
                               :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="核定床位个数（个）"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="approvedBedNumber">
              <ta-input-number :min="1"
                               :max="99999"
                               style="width:100%"
                               :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="儿童起居室总面积（m²）"
                          :labelCol="{ span: 11 }"
                          :wrapperCol="{span:13}"
                          fieldDecoratorId="areaOfChildrenLivingRoom">
              <ta-input-number :min="1"
                               :max="9999999999"
                               :precision="2"
                               style="width:100%"
                               :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="是否有专人负责机构内感染控制"
                          :labelCol="{ span: 12 }"
                          :wrapperCol="{span:12}"
                          fieldDecoratorId="personnelspecificInfectionControlYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="是否配备安全设备"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="safetyEquipmentYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="医疗模式"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="medicalModel">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in medicalModelList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="是否有机构内感染预防和处理办法"
                          :labelCol="{ span: 12 }"
                          :wrapperCol="{span:12}"
                          fieldDecoratorId="preventionAndTreatmentOfInfectionYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="是否有消毒和隔离制度"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="disinfectionAndIsolationSystemYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="拥有功能区域"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="havingFunctionalAreas">
              <ta-select mode="multiple"
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in functionalAreaList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="无障碍环境"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="accessibilityEnvironment">
              <ta-select mode="multiple"
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in functionalAreaList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="活动室地面是否采用地板或地垫"
                          :labelCol="{ span: 12 }"
                          :wrapperCol="{span:12}"
                          fieldDecoratorId="floorOrMattress">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="机构内地面是否做防滑处理"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="groundAntiskidHandle">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="卫生间及浴室是否地面防滑"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="bathroomGroundAntiskidHandle">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="是否有微型消防站"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="miniFireStationYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="是否配备有资质的专（兼）职消防管理人员"
                          :labelCol="{ span: 15 }"
                          :wrapperCol="{span:9}"
                          fieldDecoratorId="qualifiedFireChiefYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="是否配备消防负责人"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="fireChiefYOrN">
              <ta-select :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesNoList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
      </div>
      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="是否残联定点康复中心"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="rehabilitationCenterYOrN"
                        :require="{message:'请选择是否残联定点康复中心'}">
            <ta-select :placeholder="basedisabled?'':'请选择是否残联定点康复中心'"
                       @change="newLin"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否每月消防设施至少维保一次"
                        :labelCol="{ span: 12 }"
                        :wrapperCol="{span:12}"
                        fieldDecoratorId="monthlyFireFacilitiesMaintainYOrN"
                        :require="{message:'请选择是否每月至少维保一次'}">
            <ta-select :placeholder="basedisabled?'':'请选择是否每月消防设施至少维保一次'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="每月防火检查次数"
                        ::labelCol="{ span: 7}"
                        :wrapperCol="{span:17}"
                        :require="{message:'请输入每月防火检查次数'}"
                        fieldDecoratorId="monthlyFireInspectionNumber">
            <ta-input-number :min="1"
                             :max="99999"
                             style="width:100%"
                             :placeholder="basedisabled?'':'请输入每月防火检查次数'"
                             :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="是否每半年至少开展一次消防安全教育培训活动"
                        :labelCol="{ span: 17 }"
                        :wrapperCol="{span:7}"
                        fieldDecoratorId="halfAYearFireTrainingActivitiesYOrN"
                        :require="{message:'请选择是否至少一次'}">
            <ta-select :placeholder="basedisabled?'':'请选择是否每半年至少开展一次消防安全教育培训活动'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否每半年消防演练至少一次"
                        :labelCol="{ span: 11 }"
                        :wrapperCol="{span:13}"
                        fieldDecoratorId="halfAYearFireDrillYOrN"
                        :require="{message:'请选择是否每半年消防演练至少一次'}">
            <ta-select :placeholder="basedisabled?'':'请选择是否每半年消防演练至少一次'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否制定消防演练应急疏散和灭火预案"
                        :labelCol="{ span: 14 }"
                        :wrapperCol="{span:10}"
                        fieldDecoratorId="firePreventionPlanYOrN"
                        :require="{message:'请选择是否制定预案'}">
            <ta-select :placeholder="basedisabled?'':'请选择是否制定消防演练应急疏散和灭火预案'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="年度消防安全检查是否合格"
                        :labelCol="{ span: 11 }"
                        :wrapperCol="{span:13}"
                        fieldDecoratorId="qualifiedFireInspectionYOrN"
                        :require="{message:'请选择年度消防安全检查是否合格'}">
            <ta-select :placeholder="basedisabled?'':'请选择年度消防安全检查是否合格'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否参加区域联防组织"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="jointRegionalJointDefenceOrganizationYOrN"
                        :require="{message:'请选择是否参加区域联防组织'}">
            <ta-select :placeholder="basedisabled?'':'请选择是否参加区域联防组织'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否取得《建设工程消防验收意见书》"
                        :labelCol="{ span: 14 }"
                        :wrapperCol="{span:10}"
                        fieldDecoratorId="proposalYOrN"
                        :require="{message:'请选择是否取得意见书'}">
            <ta-select :placeholder="basedisabled?'':'请选择是否取得《建设工程消防验收意见书》'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="是否有食品经营许可证"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="foodBusinessLicenseYOrN"
                        :require="{message:'请选择是否有食品经营许可证'}">
            <ta-select :placeholder="basedisabled?'':'请选择是否有食品经营许可证'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否每日防火巡查"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="dailyFireInspectionYOrN"
                        :require="{message:'请选择是否每日防火巡查'}">
            <ta-select :placeholder="basedisabled?'':'请选择是否每日防火巡查'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>

        <ta-col :span="8">
          <ta-form-item label="食品经营许可证颁发日期"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="foodBusinessLicenseIssueDate">
            <ta-date-picker style="width: 100%"
                            :disabled="basedisabled"
                            :placeholder="basedisabled?'':'请选择颁发日期'"
                            :disabledDate="disabledDate" />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="食品经营许可证失效日期"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="foodBusinessLicenseExpirationDate">
            <ta-date-picker style="width: 100%"
                            :disabled="basedisabled"
                            :placeholder="basedisabled?'':'请选择失效日期'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="餐饮服务单位食品安全等级"
                        :labelCol="{ span: 11 }"
                        :wrapperCol="{span:13}"
                        fieldDecoratorId="foodSafetyGrade"
                        :require="{message:'请选择餐饮服务单位食品安全等级'}">
            <ta-select :placeholder="basedisabled?'':'请选择餐饮服务单位食品安全等级'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in foodSafetyRatingList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="食谱每周更换频率"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="frequencyOfRecipeChange"
                        :require="{message:'请选择食谱每周更换频率'}">
            <ta-select :placeholder="basedisabled?'':'请选择食谱每周更换频率'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in frequencyOfRecipeChangeList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="正常儿童是否做好职业技能教育"
                        :labelCol="{ span: 13 }"
                        :wrapperCol="{span:11}"
                        fieldDecoratorId="vocationalSkillsEducationYOrN"
                        :require="{message:'请选择是否做好职业技能教育'}">
            <ta-select :placeholder="basedisabled?'':'请选择正常儿童是否做好职业技能教育'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="正常儿童是否做好学前教育"
                        :labelCol="{ span: 11 }"
                        :wrapperCol="{span:13}"
                        fieldDecoratorId="preschoolEducationYOrN"
                        :require="{message:'请选择是否做好学前教育'}">
            <ta-select :placeholder="basedisabled?'':'请选择正常儿童是否做好学前教育'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="正常儿童是否做好义务教育"
                        :labelCol="{ span: 11 }"
                        :wrapperCol="{span:13}"
                        fieldDecoratorId="compulsoryEducationYOrN"
                        :require="{message:'请选择是否做好义务教育'}">
            <ta-select :placeholder="basedisabled?'':'请选择正常儿童是否做好义务教育'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="12个月-36个月儿童是否每6个月体检1次"
                        :labelCol="{ span: 14 }"
                        :wrapperCol="{span:10}"
                        fieldDecoratorId="thirtysixMonthsBaby"
                        :require="{message:'请选择是否每6个月体检1次'}">
            <ta-select :placeholder="basedisabled?'':'请选择12个月-36个月儿童是否每6个月体检1次'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="残疾儿童是否开展特殊教育"
                        :labelCol="{ span: 11 }"
                        :wrapperCol="{span:13}"
                        fieldDecoratorId="specialEducationYOrN"
                        :require="{message:'请选择是否开展特殊教育'}">
            <ta-select :placeholder="basedisabled?'':'请选择残疾儿童是否开展特殊教育'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="6-12个月儿童是否每3个月体检1次"
                        :labelCol="{ span: 12 }"
                        :wrapperCol="{span:12}"
                        fieldDecoratorId="twelveMonthsBaby"
                        :require="{message:'请选择是否每3个月体检1次'}">
            <ta-select :placeholder="basedisabled?'':'请选择6-12个月儿童是否每3个月体检1次'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="6个月内婴儿是否每月体检1次"
                        :labelCol="{ span: 11 }"
                        :wrapperCol="{span:13}"
                        fieldDecoratorId="sixMonthsBaby"
                        :require="{message:'请选择是否每月体检1次'}">
            <ta-select :placeholder="basedisabled?'':'请选择6个月内婴儿是否每月体检1次'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="36个月以上儿童是否每年体检1次"
                        :labelCol="{ span: 12 }"
                        :wrapperCol="{span:12}"
                        fieldDecoratorId="thirtysixUpMonthsBaby"
                        :require="{message:'请选择是否每年体检1次'}">
            <ta-select :placeholder="basedisabled?'':'请选择36个月以上儿童是否每年体检1次'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item :hidden='!newLins'
                        label="认定机构名称"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="newLins?{message:'请输入认定机构名称'}:null"
                        fieldDecoratorId="identificationOrgName">
            <ta-input :disabled="basedisabled"
                      :placeholder="basedisabled?'':'请输入认定机构名称'" />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item :hidden='!newLins'
                        label="认定机构编码"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="newLins?{message:'请输入认定机构编码'}:null"
                        fieldDecoratorId="identificationOrgCode">
            <ta-input :disabled="basedisabled"
                      :placeholder="basedisabled?'':'请输入认定机构编码'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item :hidden='!newLins'
                        label="认定日期"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="newLins?{message:'请选择认定日期'}:null"
                        fieldDecoratorId="identificationDate">
            <ta-date-picker style="width:100%;"
                            :disabled="basedisabled"
                            :placeholder="basedisabled?'':'请选择认定日期'" />
            <!-- <ta-input :disabled="basedisabled" placeholder="请选择认定日期" /> -->
          </ta-form-item>
        </ta-col>
      </ta-col>
    </ta-row>
  </div>
</template>
<script>
import moment from 'moment'
import Divider from '@component/common/components/divider'
export default {
  name: 'applicant',
  props: {
    basedisabled: {
      type: Boolean,
      required: true
    },
    newLins: {
      type: Boolean,
      required: true
    },
    yesNoList: {
      type: Array,
      required: true
    },
    thisP: { required: true },
    orgNameLists: {
      type: Array
    }
  },
  components: {
    Divider
  },
  data () {
    return {
      // yesNoList: [],
      addressmodel: [],

      isDisabled: false,
      disabled: false,
      addressdetailval2: '',
      registrationAuthorityList: [],
      functionalAreaList: [],
      inTypeList: [],
      institutionPropertyList: [],
      medicalModelList: [],
      foodSafetyRatingList: [],
      frequencyOfRecipeChangeList: [], // 食谱每周更换频率
      orgNameList: []
    }
  },
  mounted () {
    this.getregistrationAuthorityList() // 登记机关
    this.getfunctionalAreaList() // 拥有功能区域（与无障碍环境共用）
    this.getinType() // 机构类型
    this.getinstitutionPropertyList()
    this.getmedicalModelList()
    this.getfoodSafetyRatingList()
    this.getfrequencyOfRecipeChangeList()

    if (!this.orgNameLists) {
      this.gainAri()
    } else {
      this.orgNameList = this.orgNameLists
    }
  },
  methods: {
    newLin (val) {
      if (val == 1) {
        this.thisP.zdxyContrs(true)
      } else {
        this.thisP.zdxyContrs(false)
        this.$emit('clearData')
      }
    },
    fnValidatePostCode (rule, value, callback) {
      if (value == '') {
        callback('请输入邮政编码')
      } else if (!/^[0-9]{6}$/.test(value)) {
        callback('请输入正确的邮政编码')
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

    async gainAri () {
      if (!this.basedisabled) {
        const data = await this.post(
          // 'orgEstablishRegister/queryRegistInfoListByOrgId'
          'welfareOrgManagement/listOfWelfareToBefund'
        )
        this.orgNameList = data.data.data
      }
    },
    changeAri (val) {
      this.orgNameList.forEach(item => {
        if (item.orgName == val) {
          this.$emit('setFrom', item)
        }
      })
    },
    // 日期不能选择未来日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    async getfoodSafetyRatingList () {
      const data = await this.getDictionaries('FOODSAFETYRATING')
      this.foodSafetyRatingList = data
    },
    // 食谱每周更换频率
    async getfrequencyOfRecipeChangeList () {
      const data = await this.getDictionaries('FREQUENCYOFRECIPECHANGE')
      this.frequencyOfRecipeChangeList = data
    },
    async getmedicalModelList () {
      const data = await this.getDictionaries('MEDICALMODEL')
      this.medicalModelList = data
    },
    async getinstitutionPropertyList () {
      const data = await this.getDictionaries('INSTITUTIONPROPERTY')
      this.institutionPropertyList = data
    },
    async getfunctionalAreaList () {
      const data = await this.getDictionaries('FUNCTIONALAREA')
      this.functionalAreaList = data
    },
    async getinType () {
      const data = await this.getDictionaries('INSTITUTIONALTYPE')
      this.inTypeList = data
    },
    async getregistrationAuthorityList () {
      const data = await this.getDictionaries('REGISTRATIONAUTHORITY')
      this.registrationAuthorityList = data
    }

  }
}
</script>
