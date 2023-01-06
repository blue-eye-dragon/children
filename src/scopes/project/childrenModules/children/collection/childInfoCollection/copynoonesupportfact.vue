<template>
  <div class="tadrawer">
    <!-- 多余信息查看 -->
    <div class="rejectcont"
         v-if='status==6'>
      <ta-form class="drawerFrom"
               :autoFormCreate="(detailform)=>{this.detailform = detailform}"
               layout="horizontal">
        <ta-row>
          <ta-col :span='16'
                  v-if='currentStatus==4'>
            <ta-form-item label="驳回原因"
                          fieldDecoratorId="remark"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 20 }">
              <ta-textarea placeholder="请输入驳回原因"
                           :rows="4"
                           :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span='8'>
            <ta-form-item label="上报日期"
                          fieldDecoratorId="createTime"
                          v-if='currentStatus==3||currentStatus==1'>
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :disabled="true"
                              placeholder="请选择上报日期" />
            </ta-form-item>
            <ta-form-item label="审核日期"
                          fieldDecoratorId="updateTime"
                          v-if='currentStatus==3'>
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :disabled="true"
                              placeholder="请选择审核日期" />
            </ta-form-item>
          </ta-col>
          <ta-col :span='8'>
            <ta-form-item label="上报单位"
                          fieldDecoratorId="reportUnit"
                          v-if='currentStatus==3||currentStatus==1'>
              <ta-input placeholder="请输入上报单位"
                        :disabled="true" />
            </ta-form-item>
            <ta-form-item label="审核单位"
                          fieldDecoratorId="approvalUnit"
                          v-if='currentStatus==3'>
              <ta-input placeholder="请输入审核单位"
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <ta-tabs :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="儿童基本信息"
                   key="1"
                   :forceRender="true">
        <!-- <ta-form :autoFormCreate="(form)=>{this.form = form}" layout="horizontal">
          <ta-form-item
            label="儿童类别:"
            class="fromwid"
            :fieldDecoratorOptions="{initialValue: Enum.CHILDCATEGORYA.SSWRFYET}"
            fieldDecoratorId="childType"
          >
            <ta-select class="selectwid" :disabled="true">
              <ta-select-option
                v-for="(item,index) in childrenType"
                :value="item.value"
                :key="index"
              >{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-form> -->
        <div ref="oneout"
             class="mars">
          <Title title="儿童基本信息"
                 :show.sync="showone"></Title>
          <ta-form ref="one"
                   layout="horizontal"
                   :autoFormCreate="(baseForm)=>{this.baseForm = baseForm}">
            <Nochildbasic :idcarddisabled='idcarddisabled'
                          @householdRegistryClassifychange='householdRegistryClassifychange'
                          :householdRegistryClassifyhide.sync='householdRegistryClassifyhide'
                          :householdRegistryClassifydisabled.sync='householdRegistryClassifydisabled'
                          :imageUrl.sync='imageUrl'
                          :disabled="disabled"
                          :imglist.sync='imglist'
                          @radiochange="radiochange"
                          @likeaddress='likeaddress'
                          :issameaddress.sync="issameaddress"
                          @idcardchanges="idcardchanges"
                          :addressChildModel="addressChildModel"
                          :addressChildModelNow="addressChildModelNow"
                          :heathChildModel="heathChildModel"
                          @setChildAddress="setChildAddress"
                          @setChildAddress1="setChildAddress1"
                          @setChildHeaths="setChildHeaths"></Nochildbasic>
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
                    /> -->
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
                                fieldDecoratorId='disabledLevel'
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
          <Title title="生活状况"
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
                    /> -->
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
                              fieldDecoratorId="goSchoolStatus"
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
              <ta-col :span="12">
                <ta-form-item label="就业情况"
                              fieldDecoratorId='employmentStatus'>
                  <ta-select allowClear
                             :disabled="disabled"
                             placeholder="请选择就业情况">
                    <ta-select-option v-for="item in employmentlist"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label="生活状况概述"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }"
                              fieldDecoratorId='statusoverview'
                              :fieldDecoratorOptions="rules.statusoverview">
                  <ta-textarea placeholder="请输入生活状况概述"
                               :rows="4"
                               :disabled='disabled' />
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
                                 @zkChange='zkChange'
                                 :disabled="disabled"
                                 :zkval='zkval'
                                 :isman.sync='isman'
                                 :isrequired.sync='isrequired'></Parentsituation>
                <!-- :currentSituationOther.sync='currentSituationOther' -->
              </ta-form>
            </ta-col>
            <ta-col :span="11"
                    :offset="1">
              <ta-form layout="horizontal"
                       :autoFormCreate="(motherForm)=>{this.motherForm = motherForm}">
                <Parentsituation :isrequired.sync='isrequired1'
                                 :isman.sync='isman'
                                 types="2"
                                 :disabled="disabled"
                                 @zkChange='zkChange'
                                 :zkval='zkval1'></Parentsituation>
              </ta-form>
            </ta-col>
          </ta-row>
        </div>
        <div ref="kttwoout"
             class="mars">
          <Title title="履行监护责任人员情况"
                 :show.sync="showkttwo"></Title>
          <ta-row ref="kttwo">
            <ta-col :span="11">
              <ta-form layout="horizontal"
                       :autoFormCreate="(manForm)=>{this.manForm = manForm}">
                <Guardian types="1"
                          @idCardBlur='idCardBlur'
                          :disabled='disabled'
                          :relationshiphide.sync='relationshiphide'></Guardian>
              </ta-form>
            </ta-col>
            <ta-col :span="11"
                    :offset="1">
              <ta-form layout="horizontal"
                       :autoFormCreate="(womanForm)=>{this.womanForm = womanForm}">
                <Guardian types="2"
                          @idCardBlur='idCardBlur'
                          :disabled="disabled"
                          :relationshiphide.sync='relationshiphide1'></Guardian>
              </ta-form>
            </ta-col>
          </ta-row>
        </div>
        <div ref="ktthreeout"
             class="mars">
          <Title title="其他主要社会关系"
                 :show.sync="showktthree"></Title>
          <Othersocialrelations ref="ktthree"
                                :disabled='disabled'
                                @chaadoptorChildrenVos="chaadoptorChildrenVos"
                                :adoptorChildrenVos.sync="adoptorChildrenVos"></Othersocialrelations>
        </div>
      </ta-tab-pane>
      <ta-tab-pane tab="帮扶建议"
                   key="3"
                   :forceRender="true">
        <div ref="khoneout"
             class="mars">
          <Title title="基本生活补贴发放情况"
                 :show.sync="showkhone"></Title>
          <ta-form ref="khone"
                   layout="horizontal"
                   :autoFormCreate="(baselifeForm)=>{this.baselifeForm = baselifeForm}">
            <Paymentexpenses :disabled='disabled'
                             :ishide.sync='ishide'
                             @relevechange='relevechange'
                             :receiverToChildRelationhide.sync='receiverToChildRelationhide'></Paymentexpenses>
          </ta-form>
        </div>
        <div ref="khtwoout"
             class="mars">
          <Title title="其他救助"
                 :show.sync="showkhtwo"></Title>
          <ta-form ref="khtwo"
                   layout="horizontal"
                   :autoFormCreate="(otherhelpForm)=>{this.otherhelpForm = otherhelpForm}">
            <ta-form-item label="其他救助"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22}"
                          fieldDecoratorId='helpStationOther'
                          :fieldDecoratorOptions="rules.helpStationOther">
              <ta-textarea placeholder="请输入其他救助"
                           :rows="4"
                           :disabled='disabled' />
            </ta-form-item>
          </ta-form>
        </div>
        <div ref="khthreeout"
             class="mars">
          <Title title="相关证明"
                 :show.sync="showkhthree"></Title>
          <ta-form ref="khthree"
                   layout="horizontal">
            <ta-form-item label="上传"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22}">
              <ta-upload :withCredentials="true"
                         :multiple="true"
                         name="file"
                         :action="action"
                         :data="updata"
                         :fileList="fileList"
                         @preview="handlePreview"
                         :beforeUpload="beforeUpload"
                         @change="handleChange">
                <div>
                  <ta-button :disabled='disabled'>
                    <ta-icon type="upload" />上传
                  </ta-button>
                </div>
              </ta-upload>
            </ta-form-item>
            <ta-form-item label=""
                          :labelCol="{ span: 0 }"
                          :wrapperCol="{ span: 22,offset:2}">
              <p class="warntext">
                <ta-icon type="info-circle-o"
                         class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
              </p>
            </ta-form-item>
          </ta-form>
        </div>
      </ta-tab-pane>
    </ta-tabs>
    <div class="bom">
      <template v-if="status==1&&!disabled">
        <ta-button class="btnleft"
                   type="primary"
                   @click="submit('0')">暂存</ta-button>
        <ta-button class="btnleft"
                   type="primary"
                   @click="submit('1')">提交</ta-button>
      </template>
      <template v-if="status==2&&(currentStatus==1||currentStatus==0)">
        <ta-button class="btnleft"
                   type="primary"
                   @click='adopt'>通过</ta-button>
        <ta-button class="btnleft"
                   @click='reject'
                   type="danger">驳回</ta-button>
      </template>
      <template v-if="status==3">
        <ta-button class="btnleft"
                   @click='withdraw'
                   type="danger">撤回</ta-button>
      </template>
      <ta-button class="btnleft"
                 v-if="status==4"
                 type="primary"
                 @click="submit('2')">提交</ta-button>
      <!-- <ta-button class="btnleft" @click="backs">返回</ta-button> -->
    </div>
    <ta-drawer title="驳回原因"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(rejectform)=>{this.rejectform = rejectform}"
               layout="horizontal">
        <ta-form-item label="驳回原因"
                      fieldDecoratorId="remark"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.remark">
          <ta-textarea placeholder="请输入驳回原因"
                       :rows="4" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="rejectbtn"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import Nochildbasic from '../components/nochildbasic'
import Parentsituation from '../components/parentsituation'
import Guardian from '../components/guardian'
import Othersocialrelations from '../components/othersocialrelations'
import Paymentexpenses from '../components/paymentexpenses'
import moment from 'moment'
import Title from '@component/common/components/Title'
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
    Nochildbasic,
    Title,
    Parentsituation,
    Guardian,
    Othersocialrelations,
    Paymentexpenses
  },
  data () {
    return {
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
      canjileave: [],
      schoolingList: [],
      employmentlist: [],
      heathval: '0',
      xystatus: [],
      // academicStatusOther: '',
      xyval: '0',
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
        statusoverview: this.verificationRulesNotMustFill('生活状况概述', 200),
        remark: this.verificationRules('驳回原因', 200),
        healthStatusOther: this.verificationRules('其他情况', 50),
        academicStatusOther: this.verificationRules('其他情况', 50)
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
      currentStatus: '0',
      updata: {
        functionalType: '1',
        busiType: '48'
      },
      fileList: [],
      imageUrl: '',
      relationshiphide: false,
      relationshiphide1: false,
      householdRegistryClassifydisabled: false,
      receiverToChildRelationhide: false,
      resData: {},
      householdRegistryClassifyhide: true,
      serioushval: false,
      isman: [],
      isrequired: true,
      isrequired1: true,
      codelist: [],
      idcarddisabled: false,
      childtype: '5'
    }
  },
  activated () {
    console.log(111)
    // this.loadData()
    // this.getdefaultads()
    // this.status = this.$route.query.status
    // if (this.$route.query.currentStatus) {
    //   this.currentStatus = this.$route.query.currentStatus
    // }
    // // 查看详情
    // if (this.$route.query.id) {
    //   this.id = this.$route.query.id
    //   this.getDetails()
    // }
    // // 导入查看详情
    // if (this.$route.query.exportid) {
    //   this.id = this.$route.query.exportid
    //   this.getexportDetails()
    // }
    // // exportid
    // this.disabled = !!this.$route.query.isdisabled
    // this.idcarddisabled = !!this.$route.query.isdisabled
    // this.householdRegistryClassifydisabled = !!this.$route.query.isdisabled
    // if (this.$route.query.childrenFrom) {
    // //   let baseForm = JSON.parse(this.$route.query.childrenFrom)
    // //   this.idcarddisabled = !!baseForm.idCard
    //   this.getChildNum()
    // //   if (baseForm.idCard) {
    // //     let sexData = this.go(baseForm.idCard, baseForm.idCard.length, this, null)
    // //     this.baseForm.setFieldsValue({
    // //       idCard: baseForm.idCard,
    // //       sex: sexData.sex
    // //     })
    // //   }
    // //   this.baseForm.setFieldsValue({
    // //     name: baseForm.name,
    // //     birthday: moment(baseForm.birthday)
    // //   })
    // }
    // setTimeout(() => {
    //   this.setHeight('one', 'oneout')
    //   this.setHeight('two', 'twoout')
    //   this.setHeight('three', 'threeout')
    //   this.setHeight('ktone', 'ktoneout')
    //   this.setHeight('kttwo', 'kttwoout')
    //   this.setHeight('ktthree', 'ktthreeout')
    //   this.setHeight('khone', 'khoneout')
    //   this.setHeight('khtwo', 'khtwoout')
    //   this.setHeight('khthree', 'khthreeout')
    // }, 800)
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
    },
    showkhone (val) {
      this.setHeight('khone', 'khoneout', !val)
    },
    showkhtwo (val) {
      this.setHeight('khtwo', 'khtwoout', !val)
    },
    showkhthree (val) {
      this.setHeight('khthree', 'khthreeout', !val)
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    this.loadData()
    this.getdefaultads()
    console.log(11111)
    console.log(this.$route.query)
    this.status = this.$route.query.status
    this.childtype = this.$route.query.childtype
    if (this.$route.query.currentStatus) {
      this.currentStatus = this.$route.query.currentStatus
    }
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
    this.idcarddisabled = !!this.$route.query.isdisabled
    this.householdRegistryClassifydisabled = !!this.$route.query.isdisabled
    if (this.$route.query.isadd) {
      this.getChildNum()
    }
    if (this.$route.query.childrenFrom) {
      //   this.getChildNum()
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
      this.setHeight('khone', 'khoneout')
      this.setHeight('khtwo', 'khtwoout')
      this.setHeight('khthree', 'khthreeout')
    }, 800)
    this.getnation()
    this.getleave()
    this.getxystatus()
    this.getschooling()
    this.getemployment()
  },
  methods: {
    idCardBlur (val, type) {
      // fatherForm motherForm
      const froms = type == 1 ? 'manForm' : 'womanForm'
      const dateobj = this.go(val, val.length, this, null)
      console.log(dateobj)
      const sexs = dateobj.birth ? dateobj.sex : undefined
      this[froms].setFieldsValue({
        sex: sexs
      })
    },
    likeaddress () {
      const data = this.baseForm.getFieldsValue()
      const ads = data.censusRegisterp
      const deads = data.censusRegisterDetail
      this.baseForm.setFieldsValue({
        currentAddressDetail: deads
      })
      this.addressChildModelNow = ads || []
    },
    householdRegistryClassifychange (val) {
      if (val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
        this.baseForm.setFieldsValue({
          censusRegisterp: [],
          censusRegister: undefined,
          censusRegisterDetail: undefined
        })
      }
      if (val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.FLYJTH || val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.BXQHK) {
        // this.getdefaultads()
        const data = this.baseForm.getFieldsValue()
        console.log(1111)
        console.log(data)
        if (!data.censusRegisterp || data.censusRegisterp.length == 0) {
          console.log('chufa')
          this.addressChildModel = [...this.codelist]
        }
      }
    },
    // 获取默认地址
    async getdefaultads () {
      console.log(window.parent.indexTool.getUserInfo())
      const params = {
        areaCode: window.parent.indexTool.getUserInfo().areaId
      }
      const data = await this.post('/UnattendedChildrenApi/getNamePathByAreaCode', params)
      console.log('morenz=dizhi')
      console.log(data)
      if (data.data.data) {
        this.codelist = data.data.data.split('/')
      }
    },
    handlePreview (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.fileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        this.fileList = info.fileList
        this.$message.success('文件上传成功!')
        this.setHeight('khthree', 'khthreeout')
      }
    },
    async getexportDetails () {
      const params = {
        id: this.id
      }
      const data = await this.post('/UnattendedChildrenApi/getUnattendedChildren', params)
      console.log('shuju')
      console.log(data)
      if (data.errors) {

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
    // 驳回
    reject () {
      this.visible = true
      this.$nextTick(() => {
        this.rejectform.resetFields()
      })
    },
    // 撤回
    async withdraw () {
      this.$confirm({
        title: '确认撤回吗?',
        onOk: async () => {
          const params = {
            addUnattendedId: this.id
          }
          const data = this.post('/AddUnattendedChildApi/withdrawUnattendedChild', params)
          if (!data.errors) {
            this.$message.success('撤回成功')
            this.backs()
          }
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    // 通过
    async adopt () {
      this.$confirm({
        title: '确认通过吗?',
        onOk: async () => {
          console.log('OK')
          const params = {
            addUnattendedId: this.id
          }
          const data = this.post('/AddUnattendedChildApi/agreeAuditUnattendedChild', params)
          if (!data.errors) {
            this.$message.success('审批通过')
            this.backs()
          }
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    async rejectbtn () {
      this.rejectform.validateFields(async (err, values) => {
        console.log(1111)
        if (!err) {
          console.log(err)
          // let /AddUnattendedChildApi/rejectAuditUnattendedChild
          const params = {
            addUnattendedId: this.id,
            remark: this.rejectform.getFieldsValue().remark
          }
          const data = await this.post('/AddUnattendedChildApi/rejectAuditUnattendedChild', params)
          if (!data.errors) {
            this.$message.success('驳回成功')
            this.backs()
          }
        }
      })
    },
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
      this.relationshiphide = false
      this.relationshiphide1 = false
      this.imageUrl = 'static/img/defalimg.png'
      this.fileList = []
      this.currentStatus = '0'
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
      this.manForm.resetFields()
      this.womanForm.resetFields()
      this.iscanshow = true
      this.showktthree = true
      this.showkhone = true
      this.baselifeForm.resetFields()
      this.showkhtwo = true
      this.otherhelpForm.resetFields()
      this.showkhthree = true
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
      this.setHeight('three', 'threeout')
    },
    // 残疾类型 DISABILITYTYPE
    async getdisabiliytype (val) {
      const formdata = {
        parentValue: val,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.disabiliytypelist = data.data.codeList
    },
    seriousillnesschange (val) {
      console.log(val)
      // disabledType heathForm
      // this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS
      if (val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS || val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE) {
        this.serioushval = true
      } else {
        this.serioushval = false
      }
      if (val.length > 1) {
        if (val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS || val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE) {
          const arr = []
          arr.push(val[val.length - 1])
          this.$nextTick(() => {
            this.heathForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
        if (val[0] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS || val[0] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE) {
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
      console.log('chuaf')
      const data = await this.post('/serialApi/getChildNumber', {})
      // this.childNumber=data.data.code
      this.baseForm.setFieldsValue({
        childNumber: data.data.code
      })
      // return data.data.code
    },
    relevechange (val) {
      this.ishide = val
      this.setHeight('khone', 'khoneout')
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
      const res = await this.post('/orphansDisabledChildrenApi/getChildByNameAndType', params)
      console.log(res)
      if (res.data && res.data.data.length > 0) {
        const form = this.processingData()
        // let arr = [...this.imglist, ...this.fileList]
        // let str = JSON.stringify(arr)
        console.log(form)
        this.fileList.map(item => {
          item.busiType = '48'
        })
        this.imglist.map(item => {
          item.busiType = '47'
        })
        form.unattendedChildBaseInfoVo.fileList = [...this.imglist, ...this.fileList]
        form.childType = this.childtype
        this.$confirm({
          title: '儿童档案重复',
          content: '系统档案中已存在该儿童信息，是否前往查看',
          onOk: () => {
            this.$router.push({
              name: 'judgeRepetition',
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
    async getDetails (val) {
      let data = {}
      if (val) {
        data = { ...val }
      } else {
        const params = {
          id: this.id
        }
        const resobj = await this.post('/UnattendedChildrenApi/getUnattendedChildren', params)
        data = data.data.data
      }
      console.log('shuju')
      console.log(data)
      if (!data.errors) {
        const resData = data
        this.resData = data
        const childBaseInformationVo = resData.childBaseInformationVo || {}
        const unattendedChildBaseInfoVo = resData.unattendedChildBaseInfoVo || {}
        const unattendedParentInfoVoList = resData.unattendedParentInfoVoList || []
        const unattendedBaseLivingCostVo = resData.unattendedBaseLivingCostVo || {}
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
            unattendedPrecessStatusVo.createTime = moment(unattendedPrecessStatusVo.createTime)
          }
          if (unattendedPrecessStatusVo.updateTime) {
            unattendedPrecessStatusVo.updateTime = moment(unattendedPrecessStatusVo.updateTime)
          }
          this.detailform.setFieldsValue(unattendedPrecessStatusVo)
        }
        if (childBaseInformationVo.birthday) {
          childBaseInformationVo.birthday = moment(childBaseInformationVo.birthday)
        }
        // 特殊处理申请时间
        if (unattendedChildBaseInfoVo.applicationTime) {
          childBaseInformationVo.applicationTime = moment(unattendedChildBaseInfoVo.applicationTime)
        }
        // 地址一致 sameAddress
        // if (unattendedChildBaseInfoVo.sameAddress) {
        //   // this.issameaddress = unattendedChildBaseInfoVo.sameAddress
        //   childBaseInformationVo.sameAddress = unattendedChildBaseInfoVo.sameAddress
        // }
        if (childBaseInformationVo.householdRegistryClassify && childBaseInformationVo.householdRegistryClassify == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
          this.householdRegistryClassifyhide = false
          this.householdRegistryClassifydisabled = true
        }
        this.$nextTick(() => {
          if (childBaseInformationVo.censusRegisterPro) {
            this.addressChildModel.push(
              childBaseInformationVo.censusRegisterPro,
              childBaseInformationVo.censusRegisterCity,
              childBaseInformationVo.censusRegisterCounty,
              childBaseInformationVo.censusRegisterTown)
            if (childBaseInformationVo.censusRegisterVillage) {
              this.addressChildModel.push(childBaseInformationVo.censusRegisterVillage)
            }
          }
          // childBaseInformationVo.sameAddress == 1 &&
          if (childBaseInformationVo.currentAddressPro) {
            this.addressChildModelNow.push(
              childBaseInformationVo.currentAddressPro,
              childBaseInformationVo.currentAddressCity,
              childBaseInformationVo.currentAddressCounty,
              childBaseInformationVo.currentAddressTown)
            if (childBaseInformationVo.currentAddressVillage) {
              this.addressChildModelNow.push(childBaseInformationVo.currentAddressVillage)
            }
          }
          this.baseForm.setFieldsValue(childBaseInformationVo)
        })
        // 健康状况
        if (unattendedChildBaseInfoVo.disabledType) {
          unattendedChildBaseInfoVo.disabledType = unattendedChildBaseInfoVo.disabledType.split(',')
          if (unattendedChildBaseInfoVo.disabledType[unattendedChildBaseInfoVo.disabledType.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS || unattendedChildBaseInfoVo.disabledType[unattendedChildBaseInfoVo.disabledType.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE) {
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
          } else if (item.typeRelation == 3) {
            this.relationshiphide = item.relationship == 99
            this.$nextTick(() => {
              this.manForm.setFieldsValue(item)
            })
          } else if (item.typeRelation == 4) {
            this.relationshiphide1 = item.relationship == 99
            this.$nextTick(() => {
              this.womanForm.setFieldsValue(item)
            })
          } else {
            otherlist.push(item)
          }
        })
        this.adoptorChildrenVos = [...otherlist]
        // 帮扶建议 unattendedBaseLivingCostVo
        if (unattendedBaseLivingCostVo) {
          this.ishide = unattendedBaseLivingCostVo.receiveWay != 1
          this.receiverToChildRelationhide = unattendedBaseLivingCostVo.receiverToChildRelation == 99
          if (unattendedBaseLivingCostVo.startReceiveDate) {
            unattendedBaseLivingCostVo.startReceiveDate = moment(unattendedBaseLivingCostVo.startReceiveDate, 'YYYY-MM')
          }
        }
        this.$nextTick(() => {
          this.baselifeForm.setFieldsValue(unattendedBaseLivingCostVo)
          this.otherhelpForm.setFieldsValue(unattendedBaseLivingCostVo)
        })
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
    processingData () {
      // 儿童基本信息
      const childBaseInformationVo = this.baseForm.getFieldsValue()
      // let childNumber = await this.getChildNum()
      if (childBaseInformationVo.birthday) {
        childBaseInformationVo.birthday = childBaseInformationVo.birthday.format('YYYY-MM-DD')
      }
      if (childBaseInformationVo.censusRegisterp) {
        childBaseInformationVo.censusRegisterPro = childBaseInformationVo.censusRegisterp[0]
        childBaseInformationVo.censusRegisterCity = childBaseInformationVo.censusRegisterp[1]
        childBaseInformationVo.censusRegisterCounty = childBaseInformationVo.censusRegisterp[2]
        childBaseInformationVo.censusRegisterTown = childBaseInformationVo.censusRegisterp[3]
        childBaseInformationVo.censusRegisterVillage = childBaseInformationVo.censusRegisterp[4]
        delete childBaseInformationVo.censusRegisterp
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
        childBaseInformationVo.currentAddressPro = childBaseInformationVo.currentAddress[0]
        childBaseInformationVo.currentAddressCity = childBaseInformationVo.currentAddress[1]
        childBaseInformationVo.currentAddressCounty = childBaseInformationVo.currentAddress[2]
        childBaseInformationVo.currentAddressTown = childBaseInformationVo.currentAddress[3]
        childBaseInformationVo.currentAddressVillage = childBaseInformationVo.currentAddress[4]
        delete childBaseInformationVo.currentAddress
      }
      // 健康状况 生活状况
      const heathForm = this.heathForm.getFieldsValue()
      const statusForm = this.statusForm.getFieldsValue()
      const unattendedChildBaseInfoVo = { ...heathForm, ...statusForm }
      if (unattendedChildBaseInfoVo.disabledType) {
        unattendedChildBaseInfoVo.disabledType = unattendedChildBaseInfoVo.disabledType.join(',')
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
        unattendedChildBaseInfoVo.applicationTime = childBaseInformationVo.applicationTime.format('YYYY-MM-DD')
      }
      // 地址一致 sameAddress
      // if (childBaseInformationVo.sameAddress) {
      //   unattendedChildBaseInfoVo.sameAddress = childBaseInformationVo.sameAddress
      // }
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
      const manForm = this.manForm.getFieldsValue()
      manForm.typeRelation = 3
      const womanForm = this.womanForm.getFieldsValue()
      womanForm.typeRelation = 4
      // this.adoptorChildrenVos 其他社会关系
      unattendedParentInfoVoList = [...this.adoptorChildrenVos]
      console.log(Object.keys(fatherForm).length)
      if (this.getnum(fatherForm) > 2) {
        unattendedParentInfoVoList.push(fatherForm)
      }
      if (this.getnum(motherForm) > 2) {
        unattendedParentInfoVoList.push(motherForm)
      }
      if (this.getnum(manForm) > 1) {
        unattendedParentInfoVoList.push(manForm)
      }
      if (this.getnum(womanForm) > 1) {
        unattendedParentInfoVoList.push(womanForm)
      }
      // 帮扶建议
      const baselifeForm = this.baselifeForm.getFieldsValue()
      const otherhelpForm = this.otherhelpForm.getFieldsValue()
      const unattendedBaseLivingCostVo = { ...baselifeForm, ...otherhelpForm }
      if (unattendedBaseLivingCostVo.startReceiveDate) {
        unattendedBaseLivingCostVo.startReceiveDate = unattendedBaseLivingCostVo.startReceiveDate.format('YYYY-MM')
      }
      const registerAdoptionVo = {
        childBaseInformationVo,
        unattendedChildBaseInfoVo,
        unattendedParentInfoVoList,
        unattendedBaseLivingCostVo
      }
      console.log(registerAdoptionVo)
      return registerAdoptionVo
    },
    async submit (val) {
      let isok = true
      this.baselifeForm.validateFields((err, values) => {
        if (err) {
          console.log(err)
          if (val == 0) {
            for (const k in err) {
              if (!this.baselifeForm.getFieldsValue()[k]) {
                this.baselifeForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '3'
            isok = false
          }
        }
      })
      this.fatherForm.validateFields({ force: true }, (err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.fatherForm.getFieldsValue()[k]) {
                this.fatherForm.resetFields(k)
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
      this.manForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.manForm.getFieldsValue()[k]) {
                this.manForm.resetFields(k)
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
              if (!this.heathForm.getFieldsValue()[k] || this.heathForm.getFieldsValue()[k].length == 0) {
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
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.baseForm.getFieldsValue()[k]) {
                this.baseForm.resetFields(k)
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
      if (isok) {
        const data = this.processingData()
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
        val == 0 ? text = '暂存成功' : text = '提交成功'
        if (val == 0) {
          url = '/UnattendedChildrenApi/stagingUnattendedChildren'
        } else {
          url = '/UnattendedChildrenApi/saveUnattendedChildren'
        }
        const res = await this.post(url, data, true)
        if (res.errors == null) {
          this.$message.success(text)
          //   this.backs()
        }
      } else {
        this.$message.error(
          '校验不通过，无法提交，请再次检查!'
        )
      }
    },
    // 儿童地址传值
    setChildAddress () {
      this.baseForm.setFieldsValue({
        censusRegisterp: this.addressChildModel
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
  margin-bottom: 30px;
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
