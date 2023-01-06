<template>
  <!-- 未成年人保护采集 -->
  <div class="conts tadrawer">
    <div class="contin">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="儿童类别:"
                      class="fromwid">
          <ta-input defaultValue="留守儿童"
                    :disabled="true" />
          <!-- <ta-select
            class="selectwid"
            :disabled="childtypedisabled"
            v-model="childtype"
            @change="childrenTypechange"
          >
            <ta-select-option
              v-for="(item,index) in childrenType"
              :value="item.value"
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>-->
        </ta-form-item>
      </ta-form>
      <ta-tabs :activeKey="nowkey"
               @change="callback">
        <ta-tab-pane tab="儿童基本信息"
                     key="1"
                     :forceRender="true">
          <div ref="oneout"
               class="mars">
            <Title title="儿童基本信息"
                   :show.sync="showone"></Title>
            <ta-form ref="one"
                     layout="horizontal"
                     :autoFormCreate="(baseForm)=>{this.baseForm = baseForm}">
              <protectionBaseInfo :idcarddisabled="idcarddisabled"
                                  @householdRegistryClassifychange="householdRegistryClassifychange"
                                  :householdRegistryClassifyhide.sync="householdRegistryClassifyhide"
                                  :householdRegistryClassifydisabled.sync="householdRegistryClassifydisabled"
                                  :imageUrl.sync="imageUrl"
                                  :disabled="disabled"
                                  :imglist.sync="imglist"
                                  @radiochange="radiochange"
                                  @likeaddress="likeaddress"
                                  @idcardchanges="idcardchanges"
                                  :addressChildModel="addressChildModel"
                                  :addressChildModelNow="addressChildModelNow"
                                  :heathChildModel="heathChildModel"
                                  @setChildAddress="setChildAddress"
                                  @setChildAddress1="setChildAddress1"
                                  @setChildHeaths="setChildHeaths"
                                  @setHeight="setHeight('one', 'oneout')"></protectionBaseInfo>
            </ta-form>
          </div>
          <div ref="twoout"
               class="mars">
            <Title title="儿童健康状况"
                   :show.sync="showtwo"></Title>
            <ta-form ref="two"
                     layout="horizontal"
                     :autoFormCreate="(heathForm)=>{this.heathForm = heathForm}">
              <ta-row class="fromcom">
                <ta-col :span="24">
                  <ta-form-item label="健康状况"
                                fieldDecoratorId="healthStatus"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{ span: 20 }"
                                :fieldDecoratorOptions="rules.healthStatus">
                    <ta-radio-group @change="onChange"
                                    :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item,index) in heathlist"
                                :key="index">{{item.label}}</ta-radio>
                      <!-- <ta-input
                      :disabled="disabled"
                      v-model="healthStatusOther"
                      v-if="heathval==Enum.HEALTHSTATUS.OTHER"
                      placeholder="请输入其他情况"
                      type="text"
                      style="width:200px"
                      />-->
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item v-if="heathval==Enum.HEALTHSTATUS.OTHER"
                                label="其他"
                                fieldDecoratorId="healthStatusOther"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{ span: 10 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              placeholder="请输入其他情况" />
                  </ta-form-item>
                  <div class="canji"
                       v-if="heathval==Enum.HEALTHSTATUS.DISABILITY">
                    <ta-form-item label="残疾类型"
                                  fieldDecoratorId="disabledType"
                                  :labelCol="{ span: 3 }"
                                  :wrapperCol="{ span: 21 }"
                                  :initValue="[]"
                                  :require="{message:'请选择残疾类型'}">
                      <ta-checkbox-group :options="disabiliytypelist" />
                    </ta-form-item>
                    <ta-form-item label="残疾等级"
                                  fieldDecoratorId="disabledLevel"
                                  :labelCol="{ span: 3 }"
                                  :wrapperCol="{ span: 21 }">
                      <ta-radio-group :disabled="disabled">
                        <ta-radio :value="item.value"
                                  v-for="(item,index) in canjileave"
                                  :key="index">{{item.label}}</ta-radio>
                      </ta-radio-group>
                      <ta-radio-group style="float:left;"></ta-radio-group>
                    </ta-form-item>
                  </div>
                  <!--重病-->
                  <div class="canji"
                       v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS">
                    <ta-form-item label="重病"
                                  fieldDecoratorId="disabledType"
                                  :labelCol="{ span: 3 }"
                                  :wrapperCol="{ span: 21 }"
                                  :initValue="[]"
                                  :require="{message:'请选择重病!'}">
                      <ta-checkbox-group :options="disabiliytypelist"
                                         :disabled="disabled"
                                         @change="seriousillnesschange" />
                    </ta-form-item>
                    <ta-form-item v-if="serioushval"
                                  label="其他"
                                  fieldDecoratorId="healthStatusOther"
                                  :labelCol="{ span: 3 }"
                                  :wrapperCol="{ span: 9 }"
                                  :fieldDecoratorOptions="rules.healthStatusOther">
                      <ta-input :disabled="disabled"
                                placeholder="请输入其他情况" />
                    </ta-form-item>
                  </div>
                  <!--慢性病-->
                  <div class="canji"
                       v-if="heathval==Enum.HEALTHSTATUS.CHRONICDISEASE">
                    <ta-form-item label="慢性病"
                                  fieldDecoratorId="disabledType"
                                  :labelCol="{ span: 3 }"
                                  :wrapperCol="{ span: 21 }"
                                  :initValue="[]"
                                  :require="{message:'请选择慢性病!'}">
                      <ta-checkbox-group :options="disabiliytypelist"
                                         :disabled="disabled"
                                         @change="seriousillnesschange" />
                    </ta-form-item>
                    <ta-form-item v-if="serioushval"
                                  label="其他"
                                  fieldDecoratorId="healthStatusOther"
                                  :labelCol="{ span: 3 }"
                                  :wrapperCol="{ span: 9 }"
                                  :fieldDecoratorOptions="rules.healthStatusOther">
                      <ta-input :disabled="disabled"
                                placeholder="请输入其他情况" />
                    </ta-form-item>
                  </div>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
          <div ref="threeout"
               class="mars">
            <Title title="生活情况"
                   :show.sync="showthree"></Title>
            <ta-form ref="three"
                     layout="horizontal"
                     :autoFormCreate="(statusForm)=>{this.statusForm = statusForm}">
              <ta-row class="fromcom">
                <ta-col :span="24">
                  <ta-form-item label="学业状况"
                                fieldDecoratorId="academicStatus"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :fieldDecoratorOptions="rules.academicStatus">
                    <ta-radio-group @change="xyChange"
                                    :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item,index) in xystatus"
                                :key="index">{{item.label}}</ta-radio>
                      <!-- <ta-input
                      :disabled="disabled"
                      v-model="academicStatusOther"
                      v-if="xyval==Enum.SCHOOLWORK.OTHER"
                      placeholder="请选择学业状况"
                      type="text"
                      style="width:200px"
                      />-->
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item label="其他"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 9 }"
                                v-if="xyval==Enum.SCHOOLWORK.OTHER"
                                fieldDecoratorId="academicStatusOther"
                                :fieldDecoratorOptions="rules.academicStatusOther">
                    <ta-input :disabled="disabled"
                              placeholder="请输入其他"
                              type="text" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="就学情况"
                                fieldDecoratorId="schooling"
                                :fieldDecoratorOptions="rules.goSchoolStatus">
                    <ta-select allowClear
                               :disabled="disabled"
                               placeholder="请选择就学情况">
                      <ta-select-option v-for="item in schoolingList"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12"
                        v-if="disabledE">
                  <ta-form-item label="是否学校寄宿"
                                :fieldDecoratorOptions="rules.boarder"
                                fieldDecoratorId="isBoardingSchool">
                    <ta-select allowClear
                               :disabled="disabled"
                               :placeholder="disabled?'':'请选择是否学校寄宿'">
                      <ta-select-option v-for="item in yesNoList"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label="监护类型"
                                fieldDecoratorId="guardianship"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }">
                    <ta-radio-group :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item,index) in jhList"
                                :key="index">{{item.label}}</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item label="其他特殊情况"
                                fieldDecoratorId="otherSpecialCircumstances"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :initValue="[]">
                    <ta-checkbox-group :options="othersituationList"
                                       :disabled="disabled"
                                       @change="othersituationChange" />
                  </ta-form-item>
                  <ta-form-item v-if="othersituation"
                                label="其他"
                                fieldDecoratorId="otherSpecialCircumstancesOther"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 9 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              placeholder="请输入其他情况" />
                  </ta-form-item>
                  <ta-form-item label="社会福利、救助、帮扶落实情况"
                                fieldDecoratorId="helpSituation"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :initValue="[]">
                    <ta-checkbox-group :options="rescueSituationList"
                                       :disabled="disabled"
                                       @change="rescueSituations" />
                  </ta-form-item>
                  <ta-form-item v-if="rescueSituation"
                                label="其他"
                                fieldDecoratorId="helpSituationOther"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 9 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              placeholder="请输入其他情况" />
                  </ta-form-item>
                  <ta-form-item label="有无发生遭受监护人侵害的情况"
                                fieldDecoratorId="isStricken"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }">
                    <ta-radio-group @change="haveEncroach"
                                    :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item,index) in haveEncroachList"
                                :key="index">{{item.label}}</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item label="其他"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 9 }"
                                v-if="haveEncroachs"
                                fieldDecoratorId="isStrickenOther"
                                :fieldDecoratorOptions="rules.academicStatusOther">
                    <ta-input :disabled="disabled"
                              placeholder="请输入其他"
                              type="text" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="父母及其他监护人信息"
                     key="2"
                     :forceRender="true">
          <div ref="ktoneout"
               class="mars">
            <Title title="儿童父母情况"
                   :show.sync="showktone"></Title>
            <ta-row ref="ktone">
              <ta-col :span="11">
                <ta-form layout="horizontal"
                         :autoFormCreate="(fatherForm)=>{this.fatherForm = fatherForm}">
                  <Parentsituation types="1"
                                   @zkChange="zkChange"
                                   :disabled="disabled"
                                   :zkval="zkval"
                                   :isman.sync="isman"
                                   :isrequired.sync="isrequired"
                                   :thisP="thisP"
                                   :heathval="heathvalF"
                                   :serioushval="serioushvalF"
                                   :disabiliytypelist="disabiliytypelistF"></Parentsituation>
                  <!-- :currentSituationOther.sync='currentSituationOther' -->
                </ta-form>
              </ta-col>
              <ta-col :span="11"
                      :offset="1">
                <ta-form layout="horizontal"
                         :autoFormCreate="(motherForm)=>{this.motherForm = motherForm}">
                  <Parentsituation :isrequired.sync="isrequired1"
                                   :isman.sync="isman"
                                   types="2"
                                   :disabled="disabled"
                                   @zkChange="zkChange"
                                   :zkval="zkval1"
                                   :thisP="thisP"
                                   :heathval="heathvalM"
                                   :serioushval="serioushvalM"
                                   :disabiliytypelist="disabiliytypelistM"></Parentsituation>
                </ta-form>
              </ta-col>
            </ta-row>
          </div>
          <div ref="kttwoout"
               class="mars">
            <Title title="其他监护人信息"
                   :show.sync="showkttwo"></Title>
            <ta-row ref="kttwo">
              <!-- <ta-col :span="11"> -->
              <ta-form layout="horizontal"
                       :autoFormCreate="(otherManForm)=>{this.otherManForm = otherManForm}">
                <protectionOtherPeope :isrequired.sync="isrequired1"
                                      :isman.sync="isman"
                                      types="2"
                                      :disabled="disabled"
                                      @zkChange="zkChange"
                                      :zkval="zkval1"
                                      :thisP="thisP"
                                      :disabiliytypelist="disabiliytypelistO"></protectionOtherPeope>
                <!--
                     :heathval="heathval"
                  :serioushval="serioushvalM"
                   <protectionOtherPeope
                    types="1"
                    @idCardBlur="idCardBlur"
                    :disabled="disabled"
                    :relationshiphide.sync="relationshiphide"
                  ></Guardian>
                </ta-form>
              </ta-col>
              <ta-col :span="11" :offset="1">
                <ta-form
                  layout="horizontal"
                  :autoFormCreate="(womanForm)=>{this.womanForm = womanForm}"
                >
                  <Guardian
                    types="2"
                    @idCardBlur="idCardBlur"
                    :disabled="disabled"
                    :relationshiphide.sync="relationshiphide1"
                ></Guardian>-->
              </ta-form>
              <!-- </ta-col> -->
            </ta-row>
          </div>
          <div ref="ktthreeout"
               class="mars">
            <Title title="机构信息"
                   :show.sync="showktthree"></Title>
            <ta-row ref="ktthree">
              <!-- <ta-col :span="11"> -->
              <ta-form layout="horizontal"
                       :autoFormCreate="(OrgForm)=>{this.OrgForm = OrgForm}">
                <ta-col :span="6">
                  <ta-form-item label="机构名称"
                                fieldDecoratorId="academicStatusOth2e22r"
                                :fieldDecoratorOptions="rules.academicStatusOther"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}">
                    <ta-input :disabled="disabled"
                              placeholder="请输入机构名称"
                              type="text" />
                  </ta-form-item>

                  <ta-form-item label="单位性质"
                                fieldDecoratorId="academicStatusOth2e22r"
                                :fieldDecoratorOptions="rules.academicStatusOther"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}">
                    <ta-input :disabled="disabled"
                              placeholder="请输入固定电话"
                              type="text" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="固定电话"
                                fieldDecoratorId="academicStatusOth2e22r"
                                :fieldDecoratorOptions="rules.academicStatusOther"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}">
                    <ta-input :disabled="disabled"
                              placeholder="请输入机构名称"
                              type="text" />
                  </ta-form-item>

                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="负责人"
                                fieldDecoratorId="academicStatusOth2e22r"
                                :fieldDecoratorOptions="rules.academicStatusOther"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}">
                    <ta-input :disabled="disabled"
                              placeholder="请输入固定电话"
                              type="text" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="联系电话"
                                fieldDecoratorId="academicStatusOth2e22r"
                                :fieldDecoratorOptions="rules.academicStatusOther"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}">
                    <ta-input :disabled="disabled"
                              placeholder="请输入固定电话"
                              type="text" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="18">
                  <AddressComponent :labelwidth="labelwidth"
                                    :msg="'机构地址'"></AddressComponent>
                </ta-col>
              </ta-form>
            </ta-row>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="帮扶建议"
                     key="3"
                     :forceRender="true">
          <ta-col :span="24">
            <ta-form-item label="帮扶建议"
                          fieldDecoratorId="academicStatus12"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          :fieldDecoratorOptions="rules.academicStatus">
              <ta-radio-group @change="supportTypes"
                              :disabled="disabled">
                <ta-radio :value="item.value"
                          v-for="(item,index) in supportTypeList"
                          :key="index">{{item.label}}</ta-radio>
              </ta-radio-group>
            </ta-form-item>
            <ta-form-item label="其他"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 9 }"
                          v-if="supportType"
                          fieldDecoratorId="academicStatusOthe22r"
                          :fieldDecoratorOptions="rules.academicStatusOther">
              <ta-input :disabled="disabled"
                        placeholder="请输入其他"
                        type="text" />
            </ta-form-item>
          </ta-col>
          <!-- <div ref="khoneout" class="mars">
            <Title title="基本生活补贴发放情况" :show.sync="showkhone"></Title>
            <ta-form
              ref="khone"
              layout="horizontal"
              :autoFormCreate="(baselifeForm)=>{this.baselifeForm = baselifeForm}"
            >
              <Paymentexpenses
                :disabled="disabled"
                :ishide.sync="ishide"
                @relevechange="relevechange"
                :receiverToChildRelationhide.sync="receiverToChildRelationhide"
              ></Paymentexpenses>
            </ta-form>
          </div>-->
          <!-- <div ref="khtwoout" class="mars">
            <Title title="其他救助" :show.sync="showkhtwo"></Title>
            <ta-form
              ref="khtwo"
              layout="horizontal"
              :autoFormCreate="(otherhelpForm)=>{this.otherhelpForm = otherhelpForm}"
            >
              <ta-form-item
                label="其他救助"
                :labelCol="{ span: 2 }"
                :wrapperCol="{ span: 22}"
                fieldDecoratorId="helpStationOther"
                :fieldDecoratorOptions="rules.helpStationOther"
              >
                <ta-textarea :placeholder="disabled?'':'请输入其他救助'" :rows="4" :disabled="disabled" />
              </ta-form-item>
            </ta-form>
          </div>
          <div ref="khthreeout" class="mars">
            <Title title="相关证明" :show.sync="showkhthree"></Title>
            <ta-form ref="khthree" layout="horizontal">
              <ta-form-item label="上传" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22}">
                <ta-upload  :withCredentials = "true"
                  name="file"
                  :multiple="true"
                  :action="action"
                  :data="updata"
                  :fileList="fileList"
                  @preview="handlePreview"
                  :beforeUpload="beforeUpload"
                  @change="handleChange"
                >
                  <div>
                    <ta-button :disabled="disabled">
                      <ta-icon type="upload" />上传
                    </ta-button>
                  </div>
                </ta-upload>
              </ta-form-item>
              <ta-form-item label :labelCol="{ span: 0 }" :wrapperCol="{ span: 22,offset:2}">
                <p class="warntext">
                  <ta-icon type="info-circle-o" class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M
                </p>
              </ta-form-item>
            </ta-form>
          </div>-->
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
      <!-- </template>
      <template v-if="status==1&&!disabled">
        <ta-button class="btnleft temporarystorage" type="primary" @click="submit('0')">暂存</ta-button>
        <ta-button class="btnleft" type="primary" @click="submit('1')">提交</ta-button>
      </template>
      <template v-if="status==2&&(currentStatus==1||currentStatus==0)">
        <ta-button class="btnleft" @click="reject" type="danger">驳回</ta-button>
        <ta-button class="btnleft successbtn" @click="adopt">通过</ta-button>
      </template>
      <template v-if="status==3">
        <ta-button class="btnleft" @click="withdraw" type="danger">撤回</ta-button>
      </template>-->
      <ta-button class="btnleft"
                 v-if="status==4"
                 type="primary"
                 @click="submit('2')">提交</ta-button>
    </div>
    <!-- <ta-drawer
      title="驳回原因"
      width="500"
      placement="right"
      :getContainer="setContainer"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px"
    >
      <ta-form
        class="drawerFrom"
        :autoFormCreate="(rejectform)=>{this.rejectform = rejectform}"
        layout="horizontal"
      >
        <ta-form-item
          label="驳回原因"
          fieldDecoratorId="remark"
          :labelCol="{ span: 6 }"
          :fieldDecoratorOptions="rules.remark"
        >
          <ta-textarea placeholder="请输入驳回原因" :rows="4" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }" @click="onClose">取消</ta-button>
        <ta-button @click="rejectbtn" type="primary">确定</ta-button>
      </div>
    </ta-drawer>-->
  </div>
</template>
<script>
import protectionBaseInfo from '../components/protectionBaseInfo'
import Parentsituation from '../components/protectionParentInfo'
import protectionOtherPeope from '../components/protectionOtherPeope'
import Othersocialrelations from '../components/othersocialrelations'
import Paymentexpenses from '../components/paymentexpenses'
import moment from 'moment'
import Title from '@component/common/components/Title'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    dataIndex: '',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: '',
    collectionType: 'YESNO',
    width: '10%'
  },
  {
    title: '关系',
    dataIndex: '',
    width: '10%'
  },
  {
    title: '身份证号',
    dataIndex: '',
    width: '11%'
  },
  {
    title: '工作单位或家庭住址',
    dataIndex: '',
    width: '11.5%'
  },
  {
    title: '联系电话',
    dataIndex: '',
    width: '10%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    protectionBaseInfo,
    Title,
    Parentsituation,
    protectionOtherPeope,
    Othersocialrelations,
    Paymentexpenses,
    AddressComponent
  },
  data () {
    return {
      labelwidth: {
        label: 3,
        wrapper: 21
      },
      thisP: this,
      // 儿童地址与健康状况
      addressChildModel: [],
      addressChildModelNow: [],
      heathChildModel: [],
      // 其他监护人地址与健康状况
      addressOtherModel: [],
      heathOtherModel: [],
      disabled: false,
      nowkey: '1',
      showone: true,
      showtwo: true,
      showthree: true,
      showktthree: true,
      // healthStatusOther: '',
      heathlist: [],
      disabiliytypelist: [],
      disabiliytypelistF: [],
      disabiliytypelistM: [],
      disabiliytypelistO: [],
      canjileave: [],
      schoolingList: [],
      employmentlist: [],
      yesNoList: [],
      jhList: [],
      othersituationList: [],
      rescueSituationList: [],
      haveEncroachList: [],
      heathval: '0',
      heathvalF: '0',
      heathvalM: '0',

      xystatus: [],
      // academicStatusOther: '',
      xyval: '0',
      childrenType: [],
      showktone: true,
      showkttwo: true,
      iscanshow: true,
      showkhtwo: true,
      showkhthree: true,
      showkhone: true,
      adoptorChildrenVos: [],
      rules: {
        helpStationOther: this.verificationRulesNotMustFill('其他救助', 200),
        academicStatus: this.verificationRules('学业状况'),
        healthStatus: this.verificationRules('健康状况'),
        disabledType: this.verificationRules('残疾类型'),
        disabledType1: this.verificationRules('重病'),
        disabledType2: this.verificationRules('慢性病'),
        goSchoolStatus: this.verificationRules('就学情况'),
        statusoverview: this.verificationRules('生活状况概述', 200),
        remark: this.verificationRules('驳回原因', 200),
        healthStatusOther: this.verificationRules('其他情况', 50),
        academicStatusOther: this.verificationRules('其他情况', 50),
        boarder: this.verificationRules('是否学校寄宿')
      },
      issameaddress: '0',
      status: '',
      imglist: [],
      zkval: '',
      // currentSituationOther: '',
      zkval1: '',
      // currentSituationOther1: '',
      id: '',
      visible: false,
      exportid: '',
      ishide: true,
      updata: {
        functionalType: '1',
        busiType: '48'
      },
      fileList: [],
      imageUrl: '',
      // relationshiphide: false,
      // relationshiphide1: false,
      householdRegistryClassifydisabled: false,
      receiverToChildRelationhide: false,
      resData: {},
      householdRegistryClassifyhide: true,
      serioushval: false,
      serioushvalM: false,
      serioushvalF: false,
      isman: [],
      isrequired: true,
      isrequired1: true,
      codelist: [],
      idcarddisabled: false,
      childtype: '5',
      isbackhide: false,
      childtypedisabled: false,
      disabledE: true,
      othersituation: false,
      rescueSituation: false,
      haveEncroachs: false,
      supportTypeList: [],
      supportType: false
    }
  },
  activated () {
    // console.log('activated')
    // console.log(this.$route.query)
    // this.getdefaultads()//默认地址？
    this.getchildType()
    this.loadData()
    this.status = this.$route.query.status

    // 查看详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getDetails()
    }
    // 导入查看详情
    if (this.$route.query.exportid) {
      this.id = this.$route.query.exportid
      this.getexportDetails()
    }
    // exportid
    this.disabled = !!this.$route.query.isdisabled
    this.childtypedisabled = !!this.$route.query.childtypedisabled
    this.idcarddisabled = !!this.$route.query.isdisabled
    this.householdRegistryClassifydisabled = !!this.$route.query.isdisabled
    if (this.$route.query.isadd) {
      this.getChildNum()
      this.isbackhide = false
    } else {
      this.isbackhide = true
    }
    if (this.$route.query.childrenFrom) {
      // let baseForm = JSON.parse(this.$route.query.childrenFrom)
      // this.idcarddisabled = !!baseForm.idCard
      // this.getChildNum()
      // if (baseForm.idCard) {
      //   let sexData = this.go(baseForm.idCard, baseForm.idCard.length, this, null)
      //   this.baseForm.setFieldsValue({
      //     idCard: baseForm.idCard,
      //     sex: sexData.sex
      //   })
      // }
      // this.baseForm.setFieldsValue({
      //   name: baseForm.name,
      //   birthday: moment(baseForm.birthday)
      // })
      const childrenFrom = JSON.parse(this.$route.query.childrenFrom)
      this.getDetails(childrenFrom)
    }
    setTimeout(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
      this.setHeight('three', 'threeout')
      this.setHeight('ktone', 'ktoneout')
      this.setHeight('kttwo', 'kttwoout')
      this.setHeight('ktthree', 'ktthreeout')
      //   this.setHeight('khone', 'khoneout')
      //   this.setHeight('khtwo', 'khtwoout')
      //   this.setHeight('khthree', 'khthreeout')
    }, 800)
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
    },
    showktone (val) {
      this.setHeight('ktone', 'ktoneout', !val)
    },
    showkttwo (val) {
      this.setHeight('kttwo', 'kttwoout', !val)
    },
    showktthree (val) {
      this.setHeight('ktthree', 'ktthreeout', !val)
    }
    // showkhone (val) {
    //   this.setHeight('khone', 'khoneout', !val)
    // },
    // showkhtwo (val) {
    //   this.setHeight('khtwo', 'khtwoout', !val)
    // },
    // showkhthree (val) {
    //   this.setHeight('khthree', 'khthreeout', !val)
    // }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    this.getnation()
    this.getleave()
    this.getxystatus()
    this.getschooling()
    this.getemployment()
    this.getyesNoType()
    this.statusForm.setFieldsValue({ academicStatus2: '1' })
  },
  methods: {
    // texts () { alert(6) },
    supportTypes (v) {
      if (v.target.value == 7) {
        this.supportType = true
      } else {
        this.supportType = false
      }
    },
    othersituationChange (v) {
      console.log('其他特殊--》', v)
      if (v[v.length - 1] == 5) {
        this.othersituation = true
      } else {
        this.othersituation = false
      }
      this.setHeight('three', 'threeout')
    },
    rescueSituations (v) {
      console.log('其他特殊2--》', v)
      if (v[v.length - 1] == 10) {
        this.rescueSituation = true
      } else {
        this.rescueSituation = false
      }
      this.setHeight('three', 'threeout')
    },
    haveEncroach (v) {
      console.log('其他特殊2--》', v)
      if (v.target.value == 6) {
        this.haveEncroachs = true
      } else {
        this.haveEncroachs = false
      }
      this.setHeight('three', 'threeout')
    },
    godetail (val) {
      console.log(val)
      if (val == 5) {
        // 无人扶养
        this.$router.push({
          name: 'noonesupportfact',
          query: {
            status: 1,
            childtype: this.childtype,
            isadd: 1
          }
        })
      } else if (val == 8) {
        // 留守
        this.$message.error('正在开发中，请稍后')
      } else if (val == 9) {
        // 困境
        this.$message.error('正在开发中，请稍后')
      } else {
        this.$router.push({
          name: 'orphansHandicapped'
        })
      }
    },
    childrenTypechange (val) {
      this.godetail(val)
    },
    // idCardBlur (val, type) {
    //   // fatherForm motherForm
    //   let froms = type == 1 ? 'manForm' : 'womanForm'
    //   let dateobj = this.go(val, val.length, this, null)
    //   console.log(dateobj)
    //   let sexs = dateobj.birth ? dateobj.sex : undefined
    //   this[froms].setFieldsValue({
    //     sex: sexs
    //   })
    // },
    likeaddress () {
      this.$nextTick(() => {
        const data = this.baseForm.getFieldsValue()
        console.log('shuju------')
        console.log(data)
        if (data.sameAddress.length > 0) {
          const ads = data.censusRegister
          const deads = data.censusRegisterDetail
          this.baseForm.setFieldsValue({
            currentAddressDetail: deads
          })
          this.$nextTick(() => {
            console.log(ads)
            this.addressChildModelNow = ads || []
            if (ads.length == 0) {
              this.baseForm.setFieldsValue({
                currentAddress: []
              })
            }
          })
        }
      })
    },
    householdRegistryClassifychange (val) {
      if (val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
        this.baseForm.setFieldsValue({
          censusRegister: [],
          censusRegister: undefined,
          censusRegisterDetail: undefined
        })
      }
      if (
        val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.FLYJTH ||
        val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.BXQHK
      ) {
        // this.getdefaultads()
        const data = this.baseForm.getFieldsValue()
        console.log(1111)
        console.log(data)
        if (!data.censusRegister || data.censusRegister.length == 0) {
          console.log('chufa')
          // 户口分类联动获取默认地址
          // this.addressChildModel = [...this.codelist];
        }
      }
    },
    // // 获取默认地址
    // async getdefaultads () {
    //   console.log(window.parent.indexTool.getUserInfo())
    //   let params = {
    //     areaCode: window.parent.indexTool.getUserInfo().areaCode
    //   }
    //   let data = await this.post(
    //     '/UnattendedChildrenApi/getNamePathByAreaCode',
    //     params
    //   )
    //   if (data.data.data) {
    //     this.codelist = data.data.data.split('/')
    //   }
    // },
    // handlePreview (file) {
    //   this.downloadFile(file)
    // },
    // beforeUpload (file) {
    //   return this.before_Upload(file)
    // },
    // handleChange (info) {
    //   if (info.file.status === 'uploading') {
    //     this.fileList = info.fileList
    //   }
    //   if (info.file.status === 'removed') {
    //     if (this.disabled) {
    //       return false
    //     }
    //     this.fileList = info.fileList
    //   }
    //   if (info.file.status === 'done') {
    //     if (info.file.response.errors && info.file.response.errors.length != 0) {
    //       this.$message.error('上传失败')
    //       this.fileList.splice(-1, 1)
    //       return false
    //     }
    //     this.fileList = info.fileList
    //     this.$message.success('文件上传成功!')
    //     this.setHeight('khthree', 'khthreeout')
    //   }
    // },
    async getexportDetails () {
      const params = {
        id: this.id
      }
      const resdata = await this.post(
        '/UnattendedChildrenApi/getUnattendedChildBaseInformationById',
        params
      )
      console.log('shuju')
      console.log(resdata)
      if (!resdata.errors) {
        const data = resdata.data.data
        if (data.birthday) {
          data.birthday = moment(data.birthday)
        }
        if (
          data.householdRegistryClassify &&
          data.householdRegistryClassify ==
          this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
        ) {
          this.householdRegistryClassifyhide = false
          this.householdRegistryClassifydisabled = true
        }
        this.$nextTick(() => {
          if (data.censusRegisterPro) {
            this.addressChildModel.push(
              data.censusRegisterPro,
              data.censusRegisterCity,
              data.censusRegisterCounty,
              data.censusRegisterTown
            )
            if (data.censusRegisterVillage) {
              this.addressChildModel.push(data.censusRegisterVillage)
            }
          }
          if (data.currentAddressPro) {
            this.addressChildModelNow.push(
              data.currentAddressPro,
              data.currentAddressCity,
              data.currentAddressCounty,
              data.currentAddressTown
            )
            if (data.currentAddressVillage) {
              this.addressChildModelNow.push(data.currentAddressVillage)
            }
          }
          this.baseForm.setFieldsValue(data)
        })
      }
    },
    zkChange (val, e) {
      if (e == 1) {
        this.zkval = val
      } else {
        this.zkval1 = val
      }
      this.setHeight('ktone', 'ktoneout')
    },

    backs () {
      console.log(11)
      this.$router.go(-1)
    },
    radiochange () {
      this.setHeight('one', 'oneout')
    },
    // // 驳回
    // reject () {
    //   this.visible = true
    //   this.$nextTick(() => {
    //     this.rejectform.resetFields()
    //   })
    // },
    // 撤回
    // async withdraw () {
    //   this.$confirm({
    //     title: '确认撤回吗?',
    //     onOk: async () => {
    //       let params = {
    //         addUnattendedId: this.id
    //       }
    //       let data = this.post(
    //         '/AddUnattendedChildApi/withdrawUnattendedChild',
    //         params
    //       )
    //       if (!data.errors) {
    //         this.$message.success('撤回成功')
    //         this.backs()
    //       }
    //     },
    //     onCancel: () => {
    //       console.log('Cancel')
    //     }
    //   })
    // },
    // 通过
    // async adopt () {
    //   // this.$confirm({
    //   //   title: '确认通过吗?',
    //   //   onOk: async () => {
    //   //     console.log('OK')
    //   //     let params = {
    //   //       addUnattendedId: this.id
    //   //     }
    //   //     let data = await this.post(
    //   //       '/AddUnattendedChildApi/agreeAuditUnattendedChild',
    //   //       params
    //   //     )
    //   //     if (!data.errors) {
    //   //       this.$message.success('审批通过')
    //   //       this.backs()
    //   //     }
    //   //   },
    //   //   onCancel: () => {
    //   //     console.log('Cancel')
    //   //   }
    //   // })
    //   let params = {
    //     addUnattendedId: this.id
    //   }
    //   let data = await this.post(
    //     '/AddUnattendedChildApi/agreeAuditUnattendedChild',
    //     params
    //   )
    //   if (!data.errors) {
    //     this.$message.success('审批通过')
    //     this.backs()
    //   }
    // },
    // async rejectbtn () {
    //   this.rejectform.validateFields(async (err, values) => {
    //     console.log(1111)
    //     if (!err) {
    //       console.log(err)
    //       // let /AddUnattendedChildApi/rejectAuditUnattendedChild
    //       let params = {
    //         addUnattendedId: this.id,
    //         remark: this.rejectform.getFieldsValue().remark
    //       }
    //       let data = await this.post(
    //         '/AddUnattendedChildApi/rejectAuditUnattendedChild',
    //         params
    //       )
    //       if (!data.errors) {
    //         this.$message.success('驳回成功')
    //         this.backs()
    //       }
    //     }
    //   })
    // },
    onClose () {
      this.visible = false
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    loadData () {
      this.idcarddisabled = false
      this.codelist = []
      this.isrequired = true
      this.isrequired1 = true
      this.isman = []
      this.serioushval = false
      this.householdRegistryClassifydisabled = false
      this.householdRegistryClassifyhide = true
      this.resData = {}
      this.receiverToChildRelationhide = false
      // this.relationshiphide = false
      // this.relationshiphide1 = false
      this.imageUrl = 'static/img/defalimg.png'
      this.fileList = []
      this.adoptorChildrenVos = []
      this.addressChildModel = []
      this.addressChildModelNow = []
      this.ishide = true
      this.exportid = ''
      this.visible = false
      this.id = ''
      // this.currentSituationOther = ''
      this.zkval = ''
      // this.currentSituationOther1 = ''
      this.zkval1 = ''
      this.imglist = []
      // this.academicStatusOther = ''
      this.xyval = '0'
      this.nowkey = '1'
      this.heathval = '0'
      // this.healthStatusOther = ''
      this.issameaddress = '0'
      this.showone = true
      this.showtwo = true
      this.showthree = true
      this.baseForm.resetFields()
      this.heathForm.resetFields()
      this.statusForm.resetFields()
      this.showktone = true
      this.fatherForm.resetFields()
      this.motherForm.resetFields()
      this.showkttwo = true
      // this.manForm.resetFields()
      // this.womanForm.resetFields()
      this.iscanshow = true
      this.showktthree = true
      this.showkhone = true
      //   this.baselifeForm.resetFields()
      this.showkhtwo = true
      //   this.otherhelpForm.resetFields()
      this.showkhthree = true
      this.heathForm.setFieldsValue({
        healthStatus: '10'
      })
      this.statusForm.setFieldsValue({ academicStatus2: '1' })
      this.statusForm.setFieldsValue({
        academicStatus: '1'
      })
      const date = new Date()
      const year = date.getFullYear()
      const month =
        date.getMonth() + 1 < 10
          ? '0' + date.getMonth() + 1
          : date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const dates = year + '-' + month + '-' + day
      this.baseForm.setFieldsValue({
        nation: '01',
        applicationTime: moment(dates, 'YYYY-MM-DD')
      })
    },
    // 身份账号回调
    async idcardchanges (val) {
      const data = this.go(val, val.length, this, null)
      console.log(data)
      if (data.birth) {
        this.baseForm.setFieldsValue({
          birthday: moment(data.birth),
          sex: data.sex
        })
      }
      const params = {
        idCard: val,
        childType: this.childtype
      }
      // 验重
      const res = await this.post(
        '/orphansDisabledChildrenApi/getChildByNameAndType',
        params
      )
      console.log(res)
      if (res.data && res.data.data.length > 0) {
        const form = await this.processingData()
        // let arr = [...this.imglist, ...this.fileList]
        // let str = JSON.stringify(arr)
        console.log(form)
        this.fileList.map(item => {
          item.busiType = '48'
        })
        this.imglist.map(item => {
          item.busiType = '47'
        })
        form.unattendedChildBaseInfoVo.fileList = [
          ...this.imglist,
          ...this.fileList
        ]
        form.childType = this.childtype
        this.$confirm({
          title: '儿童档案重复',
          content: '系统档案中已存在该儿童信息，是否前往查看',
          onOk: () => {
            this.$router.push({
              name: 'copyjudgeRepetition',
              query: {
                repetitionList: JSON.stringify(res.data.data),
                collectionDatas: JSON.stringify(form)
              } //
            })
          },
          onCancel: () => {
            console.log('Cancel')
          }
        })
      }
    },
    // 家庭子女 笔录信息 调查信息 对应的数据变化
    chaadoptorChildrenVos (tablename, val, e) {
      if (e || e == 0) {
        if (val) {
          this[tablename].splice(e, 1, val)
        } else {
          this[tablename].splice(e, 1)
          // tablename 组件对应数据名字
        }
      } else {
        this[tablename] = val
      }
      this.setHeight('ktthree', 'ktthreeout')
    },
    // 儿童类型
    async getchildType () {
      const data = await this.getchildtypelist()
      this.childrenType = data
    },
    // 是否、监护类型
    async getyesNoType () {
      this.yesNoList = await this.getDictionaries('YESNO')
      this.jhList = await this.getDictionaries('GUARDIANSHIPTYPE')
      this.othersituationList = await this.getDictionaries('OTHERSPECIALCASES')
      this.rescueSituationList = await this.getDictionaries(
        'SOCIALWELFAREIMPLEMENTATION'
      )
      this.rescueSituationList.sort((a, b) => {
        return a.value - b.value
      })
      this.haveEncroachList = await this.getDictionaries('GUARDIANVIOLATION')
      this.supportTypeList = await this.getDictionaries('SUPPORTTYPES')
    },
    // EMPLOYMENTSITUATION 就业
    async getemployment () {
      const data = await this.getDictionaries('EMPLOYMENTSITUATION')
      this.employmentlist = data
    },
    // ACADEMICSTATUS 学业
    async getxystatus () {
      const data = await this.getDictionaries('ACADEMICSTATUS')
      this.xystatus = data
    },
    // SCHOOLSITUATION 就学情况
    async getschooling () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.schoolingList = data
    },
    // DISABILITYLEVEL
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
    },
    // 健康狀況
    async getnation () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
    },
    xyChange (e) {
      // this.academicStatusOther = ''
      this.xyval = e.target.value
      console.log(this.xyval)
      if (this.xyval == '1') {
        this.disabledE = true
      } else {
        this.disabledE = false
      }
      this.setHeight('three', 'threeout')
    },
    // 残疾类型 DISABILITYTYPE
    async getdisabiliytype (val, ty) {
      const formdata = {
        parentValue: val,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      if (ty && ty == '1') {
        this.disabiliytypelistF = data.data.codeList
      } else if (ty && ty == '2') {
        this.disabiliytypelistM = data.data.codeList
      } else {
        this.disabiliytypelist = data.data.codeList
        this.disabiliytypelistO = data.data.codeList
      }
    },
    heathvals (e, t) {
      // alert(t)
      if (t === '1') {
        this.heathvalF = e.target.value
      } else {
        this.heathvalM = e.target.value
      }
    },
    serioushvals (a, type) {
      if (type === '1') {
        this.serioushvalF = a
      } else {
        this.serioushvalM = a
      }
    },
    seriousillnesschange (val) {
      console.log(val)
      // disabledType heathForm
      // this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS

      if (
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
      ) {
        this.serioushval = true
      } else {
        this.serioushval = false
      }
      if (val.length > 1) {
        if (
          val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = []
          arr.push(val[val.length - 1])
          this.$nextTick(() => {
            this.heathForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
        if (
          val[0] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[0] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = [...val]
          arr.shift()
          this.$nextTick(() => {
            this.heathForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
      }
      this.setHeight('two', 'twoout')
    },
    onChange (e) {
      this.heathForm.setFieldsValue({
        disabledType: [],
        healthStatusOther: ''
      })
      // this.healthStatusOther = ''
      this.serioushval = false
      this.heathval = e.target.value
      this.getdisabiliytype(e.target.value)
      this.setHeight('two', 'twoout')
    },

    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (refout == 'ktthreeout') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 140 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    // 儿童编号接口获取数据
    async getChildNum () {
      const data = await this.post('/serialApi/getChildNumber', {})
      // this.childNumber=data.data.code
      this.baseForm.setFieldsValue({
        childNumber: data.data.code
      })
      // return data.data.code
    },
    // relevechange (val) {
    //   this.ishide = val
    //   this.setHeight('khone', 'khoneout')
    // },
    async getDetails (val) {
      let data = {}
      if (val) {
        data = { ...val }
      } else {
        const params = {
          id: this.id
        }
        const resobj = await this.post(
          '/UnattendedChildrenApi/getUnattendedChildren',
          params
        )
        data = resobj.data.data
      }
      console.log('shuju')
      console.log(data)
      if (!data.errors) {
        const resData = data
        this.resData = data
        console.log(this.resData.academicStatus)
        if (this.resData.unattendedChildBaseInfoVo.academicStatus == '1') {
          this.disabledE = true
        } else {
          this.disabledE = false
        }
        const childBaseInformationVo = resData.childBaseInformationVo || {}
        const unattendedChildBaseInfoVo = resData.unattendedChildBaseInfoVo || {}
        const unattendedParentInfoVoList =
          resData.unattendedParentInfoVoList || []
        const unattendedBaseLivingCostVo =
          resData.unattendedBaseLivingCostVo || {}
        const unattendedPrecessStatusVo = resData.unattendedPrecessStatusVo || {}
        // unattendedChildBaseInfoVo
        // 附件
        if (unattendedChildBaseInfoVo.fileList) {
          const filePathVos = unattendedChildBaseInfoVo.fileList
          filePathVos.map(item => {
            if (item.busiType == '48') {
              this.fileList.push(item)
            } else {
              this.imglist.push(item)
              const returnFileIds = item.response.data.data.fileid
              this.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds
              //   this.post('/file/getFileUrls', {
              //     returnFileIds: returnFileIds
              //   }).then(res => {
              //     if (res.data) {
              //       this.imageUrl = window.faceConfig.basePath + res.data.fileUrlList[0]
              //     }
              //   })
            }
          })
        }
        setTimeout(() => {
          this.setHeight('khthree', 'khthreeout')
        }, 500)
        // 上面數據查看
        if (this.status == 6) {
          if (unattendedPrecessStatusVo.createTime) {
            unattendedPrecessStatusVo.createTime = moment(
              unattendedPrecessStatusVo.createTime
            )
          }
          if (unattendedPrecessStatusVo.updateTime) {
            unattendedPrecessStatusVo.updateTime = moment(
              unattendedPrecessStatusVo.updateTime
            )
          }
          this.detailform.setFieldsValue(unattendedPrecessStatusVo)
        }
        if (childBaseInformationVo.birthday) {
          childBaseInformationVo.birthday = moment(
            childBaseInformationVo.birthday
          )
        }
        // 特殊处理申请时间
        if (unattendedChildBaseInfoVo.applicationTime) {
          childBaseInformationVo.applicationTime = moment(
            unattendedChildBaseInfoVo.applicationTime
          )
        }
        if (
          childBaseInformationVo.householdRegistryClassify &&
          childBaseInformationVo.householdRegistryClassify ==
          this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
        ) {
          this.householdRegistryClassifyhide = false
          this.householdRegistryClassifydisabled = true
        }
        if (unattendedChildBaseInfoVo.sameAddress == '1') {
          childBaseInformationVo.sameAddress = ['1']
        } else {
          childBaseInformationVo.sameAddress = []
        }
        this.$nextTick(() => {
          if (childBaseInformationVo.censusRegisterPro) {
            this.addressChildModel.push(
              childBaseInformationVo.censusRegisterPro,
              childBaseInformationVo.censusRegisterCity,
              childBaseInformationVo.censusRegisterCounty,
              childBaseInformationVo.censusRegisterTown
            )
            if (childBaseInformationVo.censusRegisterVillage) {
              this.addressChildModel.push(
                childBaseInformationVo.censusRegisterVillage
              )
            }
          }
          if (childBaseInformationVo.currentAddressPro) {
            this.addressChildModelNow.push(
              childBaseInformationVo.currentAddressPro,
              childBaseInformationVo.currentAddressCity,
              childBaseInformationVo.currentAddressCounty,
              childBaseInformationVo.currentAddressTown
            )
            if (childBaseInformationVo.currentAddressVillage) {
              this.addressChildModelNow.push(
                childBaseInformationVo.currentAddressVillage
              )
            }
          }
          this.baseForm.setFieldsValue(childBaseInformationVo)
        })
        // 健康状况
        if (unattendedChildBaseInfoVo.disabledType) {
          unattendedChildBaseInfoVo.disabledType = unattendedChildBaseInfoVo.disabledType.split(
            ','
          )
          if (
            unattendedChildBaseInfoVo.disabledType[
              unattendedChildBaseInfoVo.disabledType.length - 1
            ] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
            unattendedChildBaseInfoVo.disabledType[
              unattendedChildBaseInfoVo.disabledType.length - 1
            ] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
          ) {
            this.serioushval = true
          } else {
            this.serioushval = false
          }
        }
        this.getdisabiliytype(unattendedChildBaseInfoVo.healthStatus)
        if (!unattendedChildBaseInfoVo.disabledType) {
          unattendedChildBaseInfoVo.disabledType = []
        }
        this.heathval = unattendedChildBaseInfoVo.healthStatus
        // serioushval disabledType
        // if (this.heathval == this.Enum.HEALTHSTATUS.OTHER) {
        //   this.healthStatusOther = unattendedChildBaseInfoVo.healthStatusOther
        // }
        this.xyval = unattendedChildBaseInfoVo.academicStatus
        // if (this.xyval == this.Enum.SCHOOLWORK.OTHER) {
        //   this.academicStatusOther = unattendedChildBaseInfoVo.academicStatusOther
        // }
        this.$nextTick(() => {
          this.heathForm.setFieldsValue(unattendedChildBaseInfoVo)
          this.statusForm.setFieldsValue(unattendedChildBaseInfoVo)
        })
        // 父母及监护人信息 this.isman[0] uniparental
        const otherlist = []
        unattendedParentInfoVoList.map(item => {
          if (item.typeRelation == 1) {
            if (item.currentSituation) {
              this.zkval = item.currentSituation
            }
            const arr = []
            if (item.uniparental && item.uniparental != '0') {
              arr.push(item.uniparental)
              this.isman = arr
            }
            this.$nextTick(() => {
              this.fatherForm.setFieldsValue(item)
            })
            // if (item.currentSituationOther) {
            //   this.currentSituationOther = item.currentSituationOther
            // }
          } else if (item.typeRelation == 2) {
            if (item.currentSituation) {
              this.zkval1 = item.currentSituation
            }
            const arr = []
            if (item.uniparental && item.uniparental != '0') {
              arr.push(item.uniparental)
              this.isman = arr
            }
            this.$nextTick(() => {
              this.motherForm.setFieldsValue(item)
            })
            // if (item.currentSituationOther) {
            //   this.currentSituationOther1 = item.currentSituationOther
            // }
          }
          // else if (item.typeRelation == 3) {
          //   // this.relationshiphide = item.relationship == 99
          //   this.$nextTick(() => {
          //     this.manForm.setFieldsValue(item)
          //   })
          // } else if (item.typeRelation == 4) {
          //   // this.relationshiphide1 = item.relationship == 99
          //   this.$nextTick(() => {
          //     this.womanForm.setFieldsValue(item)
          //   })
          // }
          else {
            otherlist.push(item)
          }
        })
        this.adoptorChildrenVos = [...otherlist]
        // // 帮扶建议 unattendedBaseLivingCostVo
        // if (unattendedBaseLivingCostVo) {
        //   this.ishide = unattendedBaseLivingCostVo.receiveWay != 1
        //   this.receiverToChildRelationhide =
        //     unattendedBaseLivingCostVo.receiverToChildRelation == 99
        //   if (unattendedBaseLivingCostVo.startReceiveDate) {
        //     unattendedBaseLivingCostVo.startReceiveDate = moment(
        //       unattendedBaseLivingCostVo.startReceiveDate,
        //       'YYYY-MM'
        //     )
        //   }
        // }
        // this.$nextTick(() => {
        //   this.baselifeForm.setFieldsValue(unattendedBaseLivingCostVo)
        //   this.otherhelpForm.setFieldsValue(unattendedBaseLivingCostVo)
        // })
      }
      /// UnattendedChildrenApi/getUnattendedChildren
    },
    getnum (val) {
      let num = 0
      for (const k in val) {
        if (val[k]) {
          num++
        }
      }
      return num
    },
    async processingData () {
      // 儿童基本信息
      const childBaseInformationVo = this.baseForm.getFieldsValue()
      console.log(childBaseInformationVo)
      // let childNumber = await this.getChildNum()
      if (childBaseInformationVo.birthday) {
        childBaseInformationVo.birthday = childBaseInformationVo.birthday.format(
          'YYYY-MM-DD'
        )
      }
      if (childBaseInformationVo.censusRegister) {
        childBaseInformationVo.censusRegisterPro =
          childBaseInformationVo.censusRegister[0]
        childBaseInformationVo.censusRegisterCity =
          childBaseInformationVo.censusRegister[1]
        childBaseInformationVo.censusRegisterCounty =
          childBaseInformationVo.censusRegister[2]
        childBaseInformationVo.censusRegisterTown =
          childBaseInformationVo.censusRegister[3]
        childBaseInformationVo.censusRegisterVillage =
          childBaseInformationVo.censusRegister[4]
        delete childBaseInformationVo.censusRegister
      }
      // if (childBaseInformationVo.sameAddress == 1 && childBaseInformationVo.censusRegisterPro) {
      //   childBaseInformationVo.currentAddressPro = childBaseInformationVo.censusRegisterPro
      //   childBaseInformationVo.currentAddressCity = childBaseInformationVo.censusRegisterCity
      //   childBaseInformationVo.currentAddressCounty = childBaseInformationVo.censusRegisterCounty
      //   childBaseInformationVo.currentAddressTown = childBaseInformationVo.censusRegisterTown
      //   childBaseInformationVo.currentAddressVillage = childBaseInformationVo.censusRegisterVillage
      //   childBaseInformationVo.currentAddressDetail = childBaseInformationVo.censusRegisterDetail
      // }
      if (childBaseInformationVo.currentAddress) {
        childBaseInformationVo.currentAddressPro =
          childBaseInformationVo.currentAddress[0]
        childBaseInformationVo.currentAddressCity =
          childBaseInformationVo.currentAddress[1]
        childBaseInformationVo.currentAddressCounty =
          childBaseInformationVo.currentAddress[2]
        childBaseInformationVo.currentAddressTown =
          childBaseInformationVo.currentAddress[3]
        childBaseInformationVo.currentAddressVillage =
          childBaseInformationVo.currentAddress[4]
        delete childBaseInformationVo.currentAddress
      }
      // 健康状况 生活状况
      const heathForm = this.heathForm.getFieldsValue()
      const statusForm = this.statusForm.getFieldsValue()
      const unattendedChildBaseInfoVo = { ...heathForm, ...statusForm }
      if (unattendedChildBaseInfoVo.disabledType) {
        unattendedChildBaseInfoVo.disabledType = unattendedChildBaseInfoVo.disabledType.join(
          ','
        )
      }
      const arr = []
      const filelist = [...this.imglist, ...this.fileList]
      filelist.map(item => {
        arr.push(item.response.data.data.fileid)
      })
      unattendedChildBaseInfoVo.upLoadPathIds = arr
      // if (this.imglist.length > 0) {
      //   unattendedChildBaseInfoVo.upLoadPathIds = this.imglist[0].response.data.data.fileid
      // }
      // if (this.academicStatusOther != '') {
      //   unattendedChildBaseInfoVo.academicStatusOther = this.academicStatusOther
      // }
      // if (this.healthStatusOther != '') {
      //   unattendedChildBaseInfoVo.healthStatusOther = this.healthStatusOther
      // }
      // 特殊处理申请时间
      if (childBaseInformationVo.applicationTime) {
        unattendedChildBaseInfoVo.applicationTime = childBaseInformationVo.applicationTime.format(
          'YYYY-MM-DD'
        )
      }
      // 地址一致 sameAddress
      if (childBaseInformationVo.sameAddress.length > 0) {
        unattendedChildBaseInfoVo.sameAddress = '1'
      } else {
        unattendedChildBaseInfoVo.sameAddress = '0'
      }
      // 父母及监护人信息
      let unattendedParentInfoVoList = []
      let uniparental = '0'
      console.log('xiabiao----')
      console.log(this.isman)
      // if (this.isman.lengtn > 0 && this.isman[0]) {
      uniparental = this.isman[0] || '0'
      // }
      const fatherForm = this.fatherForm.getFieldsValue()
      fatherForm.typeRelation = 1
      fatherForm.uniparental = uniparental
      // if (this.currentSituationOther) {
      //   fatherForm.currentSituationOther = this.currentSituationOther
      // }
      const motherForm = this.motherForm.getFieldsValue()
      motherForm.typeRelation = 2
      motherForm.uniparental = uniparental
      // if (this.currentSituationOther1) {
      //   motherForm.currentSituationOther = this.currentSituationOther1
      // }
      // let manForm = this.manForm.getFieldsValue()
      // manForm.typeRelation = 3
      // let womanForm = this.womanForm.getFieldsValue()
      // womanForm.typeRelation = 4
      // this.adoptorChildrenVos 其他社会关系
      unattendedParentInfoVoList = [...this.adoptorChildrenVos]
      console.log(Object.keys(fatherForm).length)
      if (this.getnum(fatherForm) > 2) {
        unattendedParentInfoVoList.push(fatherForm)
      }
      if (this.getnum(motherForm) > 2) {
        unattendedParentInfoVoList.push(motherForm)
      }
      // if (this.getnum(manForm) > 1) {
      //   unattendedParentInfoVoList.push(manForm)
      // }
      // if (this.getnum(womanForm) > 1) {
      //   unattendedParentInfoVoList.push(womanForm)
      // }
      // 帮扶建议
      //   let baselifeForm = this.baselifeForm.getFieldsValue()
      //   let otherhelpForm = this.otherhelpForm.getFieldsValue()
      //   let unattendedBaseLivingCostVo = { ...baselifeForm, ...otherhelpForm }
      //   if (unattendedBaseLivingCostVo.startReceiveDate) {
      //     unattendedBaseLivingCostVo.startReceiveDate = unattendedBaseLivingCostVo.startReceiveDate.format(
      //       'YYYY-MM'
      //     )
      //   }
      const registerAdoptionVo = {
        childBaseInformationVo,
        unattendedChildBaseInfoVo,
        unattendedParentInfoVoList
        // unattendedBaseLivingCostVo
      }
      console.log(registerAdoptionVo)
      return registerAdoptionVo
    },
    async submit (val) {
      let isok = true
      //   this.baselifeForm.validateFields((err, values) => {
      //     if (err) {
      //       console.log(err)
      //       if (val == 0) {
      //         for (let k in err) {
      //           if (!this.baselifeForm.getFieldsValue()[k]) {
      //             this.baselifeForm.resetFields(k)
      //           } else {
      //             isok = false
      //           }
      //         }
      //       } else {
      //         this.nowkey = '3'
      //         isok = false
      //       }
      //     }
      //   })
      //   this.fatherForm.validateFields({ force: true }, (err, values) => {
      //     if (err) {
      //       if (val == 0) {
      //         for (let k in err) {
      //           if (!this.fatherForm.getFieldsValue()[k]) {
      //             this.fatherForm.resetFields(k)
      //           } else {
      //             isok = false
      //           }
      //         }
      //       } else {
      //         this.nowkey = '2'
      //         isok = false
      //       }
      //     }
      //   })
      this.motherForm.validateFields({ force: true }, (err, values) => {
        console.log(err)
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.motherForm.getFieldsValue()[k]) {
                this.motherForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '2'
            isok = false
          }
        }
      })
      // this.manForm.validateFields((err, values) => {
      //   if (err) {
      //     if (val == 0) {
      //       for (let k in err) {
      //         if (!this.manForm.getFieldsValue()[k]) {
      //           this.manForm.resetFields(k)
      //         } else {
      //           isok = false
      //         }
      //       }
      //     } else {
      //       this.nowkey = '2'
      //       isok = false
      //     }
      //   }
      // })
      this.statusForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.statusForm.getFieldsValue()[k]) {
                this.statusForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '1'
            isok = false
          }
        }
      })
      this.heathForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (
                !this.heathForm.getFieldsValue()[k] ||
                this.heathForm.getFieldsValue()[k].length == 0
              ) {
                this.heathForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '1'
            isok = false
          }
        }
      })
      this.baseForm.validateFields((err, values) => {
        console.log(this.baseForm.getFieldsValue())
        console.log(err)
        // if(val == 0){
        //   if(this.baseForm.getFieldsValue()[name]){
        //       isok = true
        //   }
        // }
        if (err) {
          if (val == 0) {
            console.log(err)
            // console.log(this.baseForm.getFieldsValue())
            // for (let k in err) {
            //   if (!this.baseForm.getFieldsValue()[k]) {
            //     this.baseForm.resetFields(k);
            //   } else {
            //     isok = false;
            //   }
            // }
            console.log('222')
            if (err.name) {
              console.log('meiyou')
              isok = false
              this.baseForm.resetFields()
            } else {
              console.log('you')
              // this.baseForm.resetFields();
              isok = true
            }
          } else {
            this.nowkey = '1'
            isok = false
          }
        }
      })
      if (isok) {
        const data = await this.processingData()
        data.buttonType = val
        let url = ''
        let text = ''
        if (this.id) {
          // resData
          console.log(data)
          console.log(this.resData)
          for (var k in data) {
            if (!(data[k] instanceof Array) && data[k] instanceof Object) {
              if (this.resData[k]) {
                data[k].id = this.resData[k].id
              }
            }
            if (k == 'unattendedParentInfoVoList') {
              data[k].map((item, index) => {
                this.resData[k].map(val => {
                  if (item.typeRelation == val.typeRelation) {
                    item.id = val.id
                  }
                })
              })
            }
          }
          // 编辑
          // data.bizKey = this.id
        } else {
          // 新增
        }
        val == 0 ? (text = '暂存成功') : (text = '提交成功')
        if (val == 0) {
          url = '/UnattendedChildrenApi/stagingUnattendedChildren'
        } else {
          url = '/UnattendedChildrenApi/saveUnattendedChildren'
        }
        console.log(data)
        const res = await this.post(url, data, true)
        if (res.errors == null) {
          this.$message.success(text)
          this.backs()
        }
      } else {
        if (val == 0) {
          this.$message.error('请至少输入儿童姓名')
        } else {
          this.$message.error(
            '校验不通过，无法提交，请再次检查!'
          )
        }
      }
    },
    // 儿童地址传值
    setChildAddress () {
      this.baseForm.setFieldsValue({
        censusRegister: this.addressChildModel
      })
    },
    setChildAddress1 () {
      this.baseForm.setFieldsValue({
        currentAddress: this.addressChildModelNow
      })
    },
    // 其他监护人地址传值
    setOtherAddress () {
      this.otherForm.setFieldsValue({
        unitDatas: this.addressOtherModel
      })
    },

    // 儿童健康状况传值
    setChildHeaths () {
      this.childForm.setFieldsValue({
        healthConditionDatas: this.heathChildModel
      })
    },
    // 其他监护人健康状况传值
    setOtherHeaths () {
      this.otherForm.setFieldsValue({
        healthConditionDatas: this.heathOtherModel
      })
    },

    // 父母基本信息、其他监护人信息的tab切换
    callback (key) {
      this.nowkey = key
    }
  }
}
</script>
<style scoped lang='less'>
.mars {
  width: 100%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
}
.canji {
  width: 88%;
  margin: 0 auto;
  padding: 10px 0 1px 0;
  box-sizing: border-box;
  background: rgba(230, 247, 255, 0.5);
}
.tables {
  margin-top: 17px;
}
.selectwid {
  width: 324px;
}
.fromwid {
  width: 424px;
  margin-top: 24px;
  margin-bottom: 10px;
}
.rejectcont {
  width: 100%;
  margin-bottom: 14px;
  background: #fff;
  padding: 20px 0 5px 0;
  box-sizing: border-box;
}
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  display: flex;
  align-items: center;
}
</style>
