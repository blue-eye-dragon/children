<template>
  <div :class="evaluate=='yes'?'':'conts tadrawer'"
       @click="allvalidator">
    <!-- <ta-spin :spinning="spinning"
    class="spinning"></ta-spin>-->
    <div :class="evaluate=='yes'?'':'contin'">
      <ta-tabs :activeKey="nowkey"
               @change="callback">
        <!-- :type="evaluate=='yes'?'card':'line'" -->
        <ta-tab-pane tab="基本信息"
                     :forceRender="true"
                     key="1">
          <ta-form :autoFormCreate="(form)=>{this.form = form}"
                   layout="horizontal">
            <ta-form-item label="收养类别:"
                          class="fromwid"
                          :require="{message:'请选择!'}">
              <ta-select v-model="childtype"
                         class="selectwid"
                         @change="selectchange"
                         :disabled="typedisabled">
                <ta-select-option v-for="(item,index) in adoptionlist"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-form>

          <div ref="oneout"
               class="mars">
            <Title id="anchorpoint_a"
                   title="被收养人信息"
                   :show.sync="showone"></Title>
            <ta-form layout="horizontal"
                     ref="one"
                     :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
              <div v-if="additionalYesOrNo!='1'">
                <CptAdopted :additionalYesOrNo="additionalYesOrNo"
                            :mechanismList.sync="mechanismList"
                            @mechanismchange="mechanismchange"
                            :id="id"
                            :basedisabled="basedisabled"
                            :istenyear.sync="istenyear"
                            @setaddress="setaddress"
                            :addressmodel="addressmodel"
                            @setheath="setheath"
                            :heathmodel="heathmodel"
                            :childtype="childtype"
                            :sexList="sexList"
                            :nationList="nationList"
                            :healthList="healthList"
                            :cultureList="cultureList"
                            :adoptionlist="adoptionlist"
                            :nationalityList="nationalityList"
                            :marriageyList="marriageyList"
                            :occupattioList="occupattioList"
                            :typesadopteestatusList="typesadopteestatusList"
                            :heathlist="heathlist"
                            :heathval="heathval"
                            :disabiliytypelist="disabiliytypelist"
                            :serioushval="serioushval"
                            :canjileave="canjileave"
                            :isSix="isSix"
                            @onChange="onChange"
                            @seriousillnesschange="seriousillnesschange"
                            @setFrom="setFrom"
                            @setDataByName="setDataByName"
                            @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                            :isAdoptAdd="isAdoptAdd"
                            @clearIdCard="clearIdCard"
                            @clearAdoptedFrom="clearAdoptedFrom"
                            @setHeiOne="setHeiOne"
                            ref="adoptedFrom"></CptAdopted>
              </div>
              <div v-else>
                <CptAdoptedBl :additionalYesOrNo="additionalYesOrNo"
                              :mechanismList.sync="mechanismList"
                              @mechanismchange="mechanismchange"
                              :id="id"
                              :basedisabled="basedisabled"
                              :istenyear.sync="istenyear"
                              @setaddress="setaddress"
                              :addressmodel="addressmodel"
                              @setheath="setheath"
                              :heathmodel="heathmodel"
                              :childtype="childtype"
                              :sexList="sexList"
                              :nationList="nationList"
                              :healthList="healthList"
                              :cultureList="cultureList"
                              :adoptionlist="adoptionlist"
                              :nationalityList="nationalityList"
                              :marriageyList="marriageyList"
                              :occupattioList="occupattioList"
                              :typesadopteestatusList="typesadopteestatusList"
                              :heathlist="heathlist"
                              :heathval="heathval"
                              :disabiliytypelist="disabiliytypelist"
                              :serioushval="serioushval"
                              :canjileave="canjileave"
                              :isSix="isSix"
                              @onChange="onChange"
                              @setHeiOne="setHeiOne"
                              @seriousillnesschange="seriousillnesschange"
                              @setFrom="setFrom"
                              @setDataByName="setDataByName"
                              @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                              :isAdoptAdd="isAdoptAdd"
                              @clearIdCard="clearIdCard"
                              ref="adoptedFrom"></CptAdoptedBl>
              </div>
            </ta-form>
          </div>

          <div ref="twoout"
               class="mars">
            <Title id="anchorpoint_b"
                   title="收养人信息"
                   :show.sync="showtwo"></Title>
            <ta-form layout="horizontal"
                     :autoFormCreate="(form)=>{this.maritalForm = form}">
              <ta-form-item label="收养人婚姻状况"
                            fieldDecoratorId="maritalType"
                            :labelCol="{span:6}"
                            style="width:700px"
                            :wrapperCol="{span:18}"
                            :require="{message:'请选择收养人婚姻状况'}">
                <!-- :initValue="this.Enum.IDCARD_TYPE.NDJMSFZ" -->
                <ta-radio-group @change="onChangeMarital"
                                :disabled="basedisabled"
                                v-model="maritalType">
                  <ta-radio :value="item.value"
                            :disabled="item.value == '90'"
                            v-for="(item,index) in maritallist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
            </ta-form>
            <ta-tabs class="fromcom"
                     @change="chs"
                     :activeKey="adoptionTabKey"
                     type="card"
                     ref="two">
              <ta-tab-pane tab="男方单独收养"
                           :forceRender="true"
                           :disabled="maritalType == '20' && childtype != 4"
                           key="1">
                <ta-form layout="horizontal"
                         :autoFormCreate="(cptAdoptorFrom1)=>{this.cptAdoptorFrom1 = cptAdoptorFrom1}">
                  <AdoptionAlone :isCounty="isCounty"
                                 :additionalYesOrNo="additionalYesOrNo"
                                 @setdate="setdate"
                                 :isshow="true"
                                 :basedisabled="basedisabled"
                                 @setaddress="setaddress2"
                                 @setheath="setheath2"
                                 @setIdCard="setIdCard"
                                 :formdata="adoptionformdata"
                                 :heathmodel="heathmodel2"
                                 :addressmodel="addressmodel2"
                                 :sexList="sexList"
                                 :nationList="nationList"
                                 :healthList="healthList"
                                 :cultureList="cultureList"
                                 :identityList="identityList"
                                 :marriageyList="marriageyList"
                                 :nationalityList="nationalityList"
                                 :occupattioList="occupattioList"
                                 :idcardTypeList="idcardTypeList"
                                 :familyincomeList="familyincomeList"></AdoptionAlone>
                </ta-form>
              </ta-tab-pane>
              <ta-tab-pane tab="女方单独收养"
                           :forceRender="true"
                           :disabled="maritalType == '20' && childtype != 4"
                           key="2">
                <ta-form layout="horizontal"
                         :autoFormCreate="(cptAdoptorFrom2)=>{this.cptAdoptorFrom2 = cptAdoptorFrom2}">
                  <AdoptionAlone :isCounty="isCounty"
                                 :additionalYesOrNo="additionalYesOrNo"
                                 @setheath="setheath2"
                                 :isshow="true"
                                 :heathmodel="heathmodel2"
                                 @setdate="setdate"
                                 :formdata="adoptionformdata"
                                 :basedisabled="basedisabled"
                                 @setaddress="setaddress2"
                                 @setIdCard="setIdCard"
                                 :addressmodel="addressmodel2"
                                 :sexList="sexList"
                                 :nationList="nationList"
                                 :healthList="healthList"
                                 :cultureList="cultureList"
                                 :identityList="identityList"
                                 :marriageyList="marriageyList"
                                 :nationalityList="nationalityList"
                                 :occupattioList="occupattioList"
                                 :idcardTypeList="idcardTypeList"
                                 :familyincomeList="familyincomeList"></AdoptionAlone>
                </ta-form>
              </ta-tab-pane>
              <ta-tab-pane tab="夫妻双方共同收养"
                           :forceRender="true"
                           :disabled="maritalType != '20'"
                           key="3">
                <ta-form layout="horizontal"
                         :autoFormCreate="(cptAdoptorFrom3)=>{this.cptAdoptorFrom3 = cptAdoptorFrom3}">
                  <JointAdoption ref="JointAdoptionref"
                                 :additionalYesOrNo="additionalYesOrNo"
                                 :isCounty="isCounty"
                                 :isshow="true"
                                 @mensetheath="mensetheath"
                                 @womensetheath="womensetheath"
                                 :menheathmodel="menheathmodel"
                                 :womenheathmodel="womenheathmodel"
                                 :idAdopttype="idAdopttype"
                                 @setIdvalue="setIdvalue"
                                 @setmendate="setmendate"
                                 @setIdCard="setIdCard2"
                                 :basedisabled="basedisabled"
                                 @mensetaddress="mensetaddress"
                                 @womensetaddress="womensetaddress"
                                 :menaddressmodel="menaddressmodel"
                                 :womenaddressmodel.sync="womenaddressmodel"
                                 :applytype.sync="applytype"
                                 :sexList="sexList"
                                 :nationList="nationList"
                                 :healthList="healthList"
                                 :cultureList="cultureList"
                                 :identityList="identityList"
                                 :marriageyList="marriageyList"
                                 :nationalityList="nationalityList"
                                 :occupattioList="occupattioList"
                                 :idcardTypeList="idcardTypeList"
                                 :familyincomeList="familyincomeList"
                                 :issameaddress.sync="issameaddress1"></JointAdoption>
                </ta-form>
              </ta-tab-pane>
            </ta-tabs>
            <!-- </ta-form> -->
          </div>

          <div ref="threeout"
               class="mars"
               v-if="childtype!=8">
            <Title id="anchorpoint_c"
                   title="送养人信息"
                   :show.sync="showthree"></Title>
            <template v-if="childtype<=2">
              <ta-form layout="horizontal"
                       ref="three"
                       :autoFormCreate="(fiveRaiseFrom)=>{this.fiveRaiseFrom = fiveRaiseFrom}">
                <FiveRaise :sexList="sexList"
                           :additionalYesOrNo="additionalYesOrNo"
                           :mechanismList="mechanismList"
                           :basedisabled="basedisabled"
                           :relationsadopteesList="relationsadopteesList"></FiveRaise>
                <!-- @mechanismchange="mechanismchange" -->
              </ta-form>
            </template>
            <template v-else>
              <ta-tabs class="fromcom"
                       @change="maintancechange"
                       :activeKey="sendTabKey"
                       type="card"
                       ref="three">
                <ta-tab-pane tab="男方单独送养"
                             :forceRender="true"
                             key="1">
                  <ta-form layout="horizontal"
                           :autoFormCreate="(maintenanceFrom1)=>{this.maintenanceFrom1 = maintenanceFrom1}">
                    <AdoptionAlone @setdate="setsenddate"
                                   :additionalYesOrNo="additionalYesOrNo"
                                   :basedisabled="basedisabled"
                                   :isshow1="isshow1"
                                   :isrequire="isrequire"
                                   :isshyang="true"
                                   @changeMan="changeMan"
                                   @setaddress="setaddress3"
                                   :addressmodel="addressmodel3"
                                   @setheath="setheath3"
                                   @setIdCard="setIdCard3"
                                   @changeDeath="changeDeath"
                                   @changeRelationShip="changeRelationShip"
                                   :formdata="formdata"
                                   :heathmodel="heathmodel3"
                                   :ishide="true"
                                   :relationsadopteesList="relationsadopteesList"
                                   :sexList="sexList"
                                   :nationList="nationList"
                                   :healthList="healthList"
                                   :cultureList="cultureList"
                                   :identityList="identityList"
                                   :marriageyList="marriageyList"
                                   :nationalityList="nationalityList"
                                   :occupattioList="occupattioList"
                                   :idcardTypeList="idcardTypeList"
                                   :familyincomeList="familyincomeList"></AdoptionAlone>
                  </ta-form>
                </ta-tab-pane>
                <ta-tab-pane tab="女方单独送养"
                             :forceRender="true"
                             key="2">
                  <ta-form layout="horizontal"
                           :autoFormCreate="(maintenanceFrom2)=>{this.maintenanceFrom2 = maintenanceFrom2}">
                    <AdoptionAlone @setheath="setheath3"
                                   :additionalYesOrNo="additionalYesOrNo"
                                   :heathmodel="heathmodel3"
                                   @setdate="setsenddate"
                                   :isshow1="isshow1"
                                   :isrequire="isrequire"
                                   :isshyang="true"
                                   @changeMan="changeWomen"
                                   :basedisabled="basedisabled"
                                   @setaddress="setaddress3"
                                   @setIdCard="setIdCard3"
                                   @changeDeath="changeDeath"
                                   @changeRelationShip="changeRelationShip"
                                   :addressmodel="addressmodel3"
                                   :ishide="true"
                                   :formdata="formdata"
                                   :sexList="sexList"
                                   :relationsadopteesList="relationsadopteesList"
                                   :nationList="nationList"
                                   :healthList="healthList"
                                   :cultureList="cultureList"
                                   :identityList="identityList"
                                   :marriageyList="marriageyList"
                                   :nationalityList="nationalityList"
                                   :occupattioList="occupattioList"
                                   :idcardTypeList="idcardTypeList"
                                   :familyincomeList="familyincomeList"></AdoptionAlone>
                  </ta-form>
                </ta-tab-pane>
                <ta-tab-pane tab="夫妻双方共同送养"
                             :forceRender="true"
                             :disabled="childtype == '4'"
                             key="3">
                  <ta-form layout="horizontal"
                           :autoFormCreate="(maintenanceFrom3)=>{this.maintenanceFrom3 = maintenanceFrom3}">
                    <JointAdoption :issameaddress.sync="issameaddress2"
                                   :additionalYesOrNo="additionalYesOrNo"
                                   @mensetheath="mensetheath2"
                                   :isshow1="isshow1"
                                   @changeMan="changeOther"
                                   @womensetheath="womensetheath2"
                                   :menheathmodel="menheathmodel2"
                                   :womenheathmodel="womenheathmodel2"
                                   :idAdopttype="placingOutidAdopttype"
                                   @setmendate="setsendmendate"
                                   @setIdCard="setIdCard2"
                                   :basedisabled="basedisabled"
                                   @mensetaddress="mensetaddress2"
                                   @womensetaddress="womensetaddress2"
                                   @changeRelationShip="changeRelationShip"
                                   :menaddressmodel="menaddressmodel2"
                                   :womenaddressmodel="womenaddressmodel2"
                                   :ishide="true"
                                   :sexList="sexList"
                                   :relationsadopteesList="relationsadopteesList"
                                   :nationList="nationList"
                                   :healthList="healthList"
                                   :cultureList="cultureList"
                                   :identityList="identityList"
                                   :marriageyList="marriageyList"
                                   :nationalityList="nationalityList"
                                   :occupattioList="occupattioList"
                                   :idcardTypeList="idcardTypeList"
                                   :familyincomeList="familyincomeList"></JointAdoption>
                  </ta-form>
                </ta-tab-pane>
              </ta-tabs>
            </template>
          </div>
          <div ref="fiveout"
               class="mars"
               v-if="childtype==Enum.ADOPTIONCATEGORY.SFMBJBWQMSXWNL">
            <Title id="anchorpoint_e"
                   title="生父母信息"
                   :show.sync="showfive"></Title>
            <ta-form layout="horizontal"
                     ref="five"
                     :autoFormCreate="(parentFrom)=>{this.parentFrom = parentFrom}">
              <NotcptAdoptor :issameaddress.sync="issameaddress3"
                             @parentmensetheath="parentmensetheath"
                             @parentwomensetheath="parentwomensetheath"
                             :parentmenheathmodel="parentmenheathmodel"
                             :parentwomenheathmodel="parentwomenheathmodel"
                             @setmendate="setparentdate"
                             @setIdCard="setIdCard4"
                             :basedisabled="basedisabled"
                             @parentmensetaddress="parentmensetaddress"
                             @parentwomensetaddress="parentwomensetaddress"
                             :parentmenmodel="parentmenmodel"
                             :parentwomenmodel="parentwomenmodel"
                             :sexList="sexList"
                             :nationList="nationList"
                             :healthList="healthList"
                             :cultureList="cultureList"
                             :identityList="identityList"
                             :marriageyList="marriageyList"
                             :nationalityList="nationalityList"
                             :occupattioList="occupattioList"
                             :idcardTypeList="idcardTypeList"
                             @clearErrorInfo="clearErrorInfo"
                             ref="parentFrom"></NotcptAdoptor>
            </ta-form>
          </div>
          <div ref="fourout"
               class="mars">
            <Title id="anchorpoint_d"
                   title="情况说明"
                   :show.sync="showfour"></Title>
            <ta-form layout="horizontal"
                     ref="four"
                     :autoFormCreate="(adInformationnoteFrom)=>{this.adInformationnoteFrom = adInformationnoteFrom}">
              <AdInformationnote :basedisabled="basedisabled"
                                 :isZY="isZY"
                                 :infomationType="infomationType"
                                 :isPrint="isPrint"
                                 :imgfilelist.sync="imgfilelist"
                                 :additionalYesOrNo="additionalYesOrNo"></AdInformationnote>
            </ta-form>
          </div>
          <div class="mars"
               style="padding-top:20px">
            <Divider title="经办人信息"></Divider>
            <ta-form layout="horizontal"
                     :autoFormCreate="(handleFrom)=>{this.handleFrom = handleFrom}">
              <processingInformation></processingInformation>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="家庭子女信息"
                     :forceRender="true"
                     key="2">
          <Family :basedisabled="basedisabled"
                  :adoptorChildrenVos="adoptorChildrenVos"
                  @chaadoptorChildrenVos="chaadoptorChildrenVos"
                  :eelationsApplicantsList="eelationsApplicantsList"
                  :adoptionTabKey="adoptionTabKey"
                  :childrensParentSituationList="childrensParentSituationList"
                  :sexList="sexList"
                  :cultureList="cultureList"
                  :nationList="nationList"
                  :nationalityList="nationalityList"
                  :healthList="healthList"
                  :occupattioList="occupattioList"></Family>
        </ta-tab-pane>
        <ta-tab-pane tab="笔录信息"
                     :forceRender="true"
                     key="3">
          <Record :basedisabled="basedisabled"
                  :notesRecordVos="notesRecordVos"
                  @chaadoptorChildrenVos="chaadoptorChildrenVos"></Record>
        </ta-tab-pane>
        <ta-tab-pane tab="调查信息"
                     :forceRender="true"
                     key="4">
          <Investigation :basedisabled="basedisabled"
                         :surveyRecordVos="surveyRecordVos"
                         @chaadoptorChildrenVos="chaadoptorChildrenVos"></Investigation>
        </ta-tab-pane>
        <ta-tab-pane tab="文件上传"
                     :forceRender="true"
                     key="5">
          <FileUpload :fileList.sync="fileList"
                      :additionalYesOrNo="additionalYesOrNo"
                      :isshowFile="isshowFile"
                      :syCardFileList.sync="syCardFileList"
                      :filedisabled="filedisabled"
                      :adoptionfileList.sync="adoptionfileList"
                      :adopterfileList.sync="adopterfileList"></FileUpload>
        </ta-tab-pane>
        <ta-tab-pane tab="打印"
                     key="6"
                     v-if="isprint">
          <Printing :printlist="this.dulprintList?printlist:printlist2"
                    :printId="printId"></Printing>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div v-if="evaluate!='yes'"
         class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <template v-if="handleType==2  ">
        <ta-button type="primary"
                   :hidden="DY"
                   class="preservation"
                   @click="completionsubmit">提交</ta-button>
      </template>
      <template v-else>
        <ta-button type="primary"
                   :disabled="isPass"
                   class="preservation temporarystorage"
                   @click.stop="submit('0')"
                   :hidden="DY"
                   v-if="handleType !=0   && infomationType">暂存</ta-button>
        <ta-button type="primary"
                   class="preservation"
                   :hidden="DY"
                   :disabled="isPass"
                   @click.stop="submit('1')"
                   v-if="handleType !=0    ">提交</ta-button>
      </template>
    </div>
    <ta-modal title="操作成功"
              :visible="printshow"
              @ok="printOk"
              okText="打印"
              @cancel="printno">
      <p>
        <b>操作成功！是否需要打印相关材料？</b>
      </p>
      <p>后续打印请到收养业务查询页面打印。</p>
    </ta-modal>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import CptAdopted from './components/cptAdopted'
import CptAdoptedBl from './components/cptAdoptedBl'
import FiveRaise from './components/fiveRaise'
import Family from './components/family'
import Record from './components/record'
import Investigation from './components/investigation'
import FileUpload from './components/fileUpload'
import Printing from './components/printing'
import NotcptAdoptor from './components/notcptAdoptor'
import AdInformationnote from './components/adInformationnote'
import AdoptionAlone from './components/adoptionAlone'
import JointAdoption from './components/jointAdoption'
import processingInformation from './components/processingInformation'
import { setTimeout } from 'timers'
import moment from 'moment'
import Divider from '@component/common/components/divider'
export default {
  name: 'register',
  props: {
    evaluate: { type: String, require: false },
    goId: { type: String, require: false },
    additionalYesOrNo1: { type: String, require: false }
  },
  components: {
    CptAdoptedBl,
    Title,
    CptAdopted,
    FiveRaise,
    AdInformationnote,
    Family,
    Record,
    Investigation,
    FileUpload,
    Printing,
    NotcptAdoptor,
    AdoptionAlone,
    JointAdoption,
    processingInformation,
    Divider
  },
  data () {
    return {
      dulprintList: false,
      DY: false,
      isshowFile: false,
      isshow1: false,
      isrequire: false,
      //   spinning: false,
      formdata: '01',
      adoptionformdata: '01',
      idAdopttype: [],
      placingOutidAdopttype: [],
      isZY: true, // 是否展示收养登记字号。
      infomationType: true,
      heathlist: [],
      heathval: '0',
      disabiliytypelist: [],
      canjileave: [],
      serioushval: false,
      isSix: '',
      isPass: false,
      current: ['1'],
      menulist: [
        { title: '基本信息', key: '1' },
        { title: '家庭子女信息', key: '2' },
        { title: '笔录信息', key: '3' },
        { title: '调查信息', key: '4' },
        { title: '文件上传', key: '5' },
        { title: '打印', key: '6' }
      ],
      maritallist: [
        { label: '未婚', value: '10' },
        { label: '已婚', value: '20' },
        { label: '丧偶', value: '30' },
        { label: '离婚', value: '40' },
        { label: '未说明的婚姻情况', value: '90' }
      ],
      maritalType: '10',
      adoptionlist: [],
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      showfour: true,
      showfive: true,
      // 男 女 收养
      // typeadoption: '1',
      // maintenanceType: '1',
      childtype: '',
      // 家庭信息数据
      adoptorChildrenVos: [],
      // 笔录信息
      notesRecordVos: [],
      // 調查信息
      surveyRecordVos: [],
      fileList: [],
      // 文件上传
      adoptionfileList: [],
      syCardFileList: [],
      adopterfileList: [],
      nowkey: '1',
      nowformname: 'cptAdoptorFrom1',
      nowmaintenanceFrom: 'maintenanceFrom1',
      sexList: [],
      nationList: [],
      healthList: [],
      cultureList: [],
      identityList: [],
      nationalityList: [],
      marriageyList: [],
      occupattioList: [],
      idcardTypeList: [],
      relationsadopteesList: [],
      eelationsApplicantsList: [],
      childrensParentSituationList: [],
      addressmodel: [],
      addressmodel2: [],
      addressmodel3: [],
      parentmenmodel: [],
      parentwomenmodel: [],
      mechanismList: [],
      typesadopteestatusList: [],
      // 是否补录 1为补录0为其他
      additionalYesOrNo: '0',
      submitYesOrNo: '1',
      id: '',
      applytype: '1',
      menaddressmodel: [],
      womenaddressmodel: [],
      menaddressmodel2: [],
      womenaddressmodel2: [],
      familyincomeList: [],
      adoptionTabKey: '1',
      sendTabKey: '1',
      welfareInstitutionId: '',
      basedisabled: false,
      filedisabled: false,
      handleType: 1,
      istenyear: false,
      typedisabled: false,
      isPrint: true,
      isprint: false,
      printshow: false,
      heathmodel: [],
      heathmodel2: [],
      menheathmodel: [],
      womenheathmodel: [],
      heathmodel3: [],
      womenheathmodel2: [],
      menheathmodel2: [],
      parentwomenheathmodel: [],
      parentmenheathmodel: [],
      isvalidator: false,
      registrationAdoptionVo: {},
      printlist2: [
        {
          name: '收养登记申请书',
          url: '/adoption/printAdoption',
          src: 'static/img/register1.jpg'
        },
        {
          name: '收养登记调查记录',
          url: '/adoption/printSurvey',
          src: 'static/img/register2.jpg'
        },
        {
          name: '收养登记询问笔录',
          url: '/adoption/printNotes',
          src: 'static/img/register3.jpg'
        },
        {
          name: '收养登记审查处理表',
          url: '/adoption/printApproverecord',
          src: 'static/img/register4.jpg'
        }
      ],
      printlist: [
        {
          name: '收养登记申请书',
          url: '/adoption/printAdoption',
          src: 'static/img/register1.jpg'
        },
        {
          name: '收养登记调查记录',
          url: '/adoption/printSurvey',
          src: 'static/img/register2.jpg'
        },
        {
          name: '收养登记询问笔录',
          url: '/adoption/printNotes',
          src: 'static/img/register3.jpg'
        },
        {
          name: '收养登记审查处理表',
          url: '/adoption/printApproverecord',
          src: 'static/img/register4.jpg'
        },
        {
          name: '收养登记证',
          url: '/adoption/printRegistration',
          src: 'static/img/register5.jpg'
        }
      ],
      printId: '',
      imgfilelist: [],
      issameaddress1: '0',
      issameaddress2: '0',
      issameaddress3: '0',
      validatesRegisters: [],
      isCounty: window.parent.indexTool.getUserInfo().areaLevel == '3',
      loading: false,
      isAdoptAdd: true, // 区分儿童基本信息数据是不是收养登记模块录入的
      childrenId: '', // 儿童id
      childBaseId: '', // 儿童基本信息id
      recordStatus: '', // 点击修改后提交时要传
      relationship: '',
      isSImIdCard: false // 判断身份证是否重复
    }
  },
  created () { },
  activated () {
    this.DY = false
    this.childtype = ''
    // 初始化数据
    this.loaddata()
  },
  mounted () {
    this.getchildtype()
    this.getParentsInfo()
    this.getsex()
    this.getheathio()
    this.getHealth()
    this.getCulture()
    this.getIdentity()
    this.getnationality()
    this.getmarriage()
    this.getOccupattion()
    this.getIdcardtype()
    this.getRelationsadoptees()
    this.getRelationsApplicants()
    this.getmechanismList()
    this.gettypesadopteestatus()
    this.getfamilyincome()
    this.getnation()
    this.getleave()
  },
  methods: {
    changeMan (e, type) {
      if (this.relationship == '2') {
        if (type == 'health') {
          this.parentmenheathmodel = e
        } else if (type == 'address') {
          this.parentmenmodel = e
        } else {
          this.parentFrom.setFieldsValue({ [type]: e })
        }
      }
    },
    changeWomen (e, type) {
      if (this.relationship == '2') {
        if (type == 'health') {
          this.parentwomenheathmodel = e
        } else if (type == 'address') {
          this.parentwomenmodel = e
        } else {
          this.parentFrom.setFieldsValue({ ['copy_' + [type]]: e })
        }
      }
    },
    changeOther (e, type) {
      if (this.relationship == '2') {
        if (type == 'health') {
          this.parentmenheathmodel = e
        } else if (type == 'copy_health') {
          this.parentwomenheathmodel = e
        } else if (type == 'address') {
          this.parentmenmodel = e
        } else if (type == 'copy_address') {
          this.parentwomenmodel = e
        } else {
          this.parentFrom.setFieldsValue({ [type]: e })
        }
        if (type == 'sameAddress') {
          this.issameaddress3 = e
        }
      }
    },
    changeRelationShip (e) {
      this.relationship = e
      if (this.relationship == '2') {
        if (this.sendTabKey == '1') {
          const manDataSY = this.maintenanceFrom1.getFieldsValue()
          if (manDataSY.address_Linkage) {
            this.parentmenmodel = manDataSY.address_Linkage
            delete manDataSY.address_Linkage
          }
          if (manDataSY.healthCondition) {
            this.parentmenheathmodel = manDataSY.healthCondition
            delete manDataSY.healthCondition
          }

          this.parentFrom.setFieldsValue(manDataSY)
        }
        if (this.sendTabKey == '2') {
          const womenDataSY = this.maintenanceFrom2.getFieldsValue()
          if (womenDataSY.address_Linkage) {
            this.parentwomenmodel = womenDataSY.address_Linkage
            delete womenDataSY.address_Linkage
          }
          if (womenDataSY.healthCondition) {
            this.parentwomenheathmodel = womenDataSY.healthCondition
            delete womenDataSY.healthCondition
          }
          for (var key in womenDataSY) {
            this.parentFrom.setFieldsValue({
              ['copy_' + [key]]: womenDataSY[key]
            })
          }
        }
        if (this.sendTabKey == '3') {
          const otherDataSY = this.maintenanceFrom3.getFieldsValue()

          if (otherDataSY.address_Linkage) {
            this.parentmenmodel = otherDataSY.address_Linkage
            delete otherDataSY.address_Linkage
          }
          if (otherDataSY.copy_address_Linkage) {
            this.parentwomenmodel = otherDataSY.copy_address_Linkage
            delete otherDataSY.copy_address_Linkage
          }
          if (otherDataSY.healthCondition) {
            this.parentmenheathmodel = otherDataSY.healthCondition
            delete otherDataSY.healthCondition
          }
          if (otherDataSY.copy_healthCondition) {
            this.parentwomenheathmodel = otherDataSY.copy_healthCondition
            delete otherDataSY.copy_healthCondition
          }
          if (otherDataSY.sameAddress) {
            this.issameaddress3 = otherDataSY.sameAddress
          }
          this.parentFrom.setFieldsValue(otherDataSY)
        }
      } else {
        this.parentFrom.resetFields()
        this.parentmenmodel = []
        this.parentwomenmodel = []
        this.parentmenheathmodel = []
        this.parentwomenheathmodel = []
        this.issameaddress3 = ''
      }
    },
    setDataByName (val) {
      this.childBaseId = val.id
      if (val.name) {
        if (val.birthday) {
          this.doIsshowYJ(val)
        }
        if (!val.pickupDate) {
          this.adoptedFrom.setFieldsValue({
            pickupDate: null
          })
        }
        if (!val.idCard) {
          this.adoptedFrom.setFieldsValue({
            idCard: null
          })
        }
        const nowDate = moment(new Date()).format('YYYY-MM-DD').split('-').join('')
        for (var k in val) {
          if (k == 'adoptionAgencyVo') {
            if (this.childtype <= 2) {
              this.welfareInstitutionId = val[k].welfareInstitutionId
              // this.fiveRaiseFrom.setFieldsValue()
              for (var key in val[k]) {
                this.fiveRaiseFrom.setFieldsValue({
                  [key]: val[k][key]
                })
              }
            }
          } else {
            // 根据身份证号控制年满10周岁字段的显隐情况
            const { idCard } = val
            if (idCard) {
              const { age } = this.go(idCard, idCard.length, this)
              this.istenyear = age >= 8
            }
            const { birthday } = val
            if (birthday) {
              const oldBirth = birthday.split('-').join('')

              this.istenyear = nowDate - oldBirth >= 80000
            }
            if (k == 'birthday' || k == 'pickupDate' || k == 'enterDate') {
              this.adoptedFrom.setFieldsValue({
                [k]: val[k] ? this.moment(val[k], 'YYYY-MM-DD') : null
              })
            } else if (k == 'censusRegisterPro') {
              this.addressmodel = [
                val.censusRegisterPro || '',
                val.censusRegisterCity || '',
                val.censusRegisterCounty || '',
                val.censusRegisterTown || ''
              ]
            } else {
              this.adoptedFrom.setFieldsValue({
                [k]: val[k] || null
              })
            }
          }
        }
      } else {
        const data = this.adoptedFrom.getFieldsValue()
        const keylist = Object.keys(data)
        const arrlist = []
        keylist.map((item) => {
          if (item == 'idCard' || item == 'identityCategory') {
          } else {
            arrlist.push(item)
          }
        })
        this.adoptedFrom.resetFields(arrlist)
        //  送样机构
        if (this.childtype <= 2) {
          this.fiveRaiseFrom.resetFields()
        }
      }
      this.setHeight('one', 'oneout')
    },
    loaddata () {
      if (this.evaluate == 'yes') {
        this.additionalYesOrNo = this.additionalYesOrNo1 ? this.additionalYesOrNo1 : '0'
      } else {
        this.additionalYesOrNo = this.$route.query.additionalYesOrNo
      }

      this.maritalType = '10'
      this.mechanismList = []
      this.isAdoptAdd = true
      this.isshow1 = false
      this.isshowFile = false
      this.isrequire = false
      this.validatesRegisters = []
      this.issameaddress1 = '0'
      this.issameaddress2 = '0'
      this.issameaddress3 = '0'
      this.imgfilelist = []
      this.registrationAdoptionVo = {}
      this.infomationType = true
      this.basedisabled = false
      this.filedisabled = false
      this.isSImIdCard = false
      this.handleType = 1
      this.nowkey = '1'
      this.relationship = ''
      this.id = ''
      let info = ''

      this.childBaseId = ''
      this.applytype = '1'
      this.istenyear = false
      this.ishide = true
      this.isPass = false
      this.welfareInstitutionId = ''
      this.adoptorChildrenVos = []
      this.notesRecordVos = []
      this.surveyRecordVos = []
      this.fileList = []
      this.adoptionfileList = []
      this.syCardFileList = []
      this.adopterfileList = []
      this.heathmodel = []
      this.heathmodel2 = []
      this.adoptionTabKey = '1'
      this.sendTabKey = '1'
      this.printId = ''
      this.dulprintList = false
      this.nowformname = 'cptAdoptorFrom1'
      this.nowmaintenanceFrom = 'maintenanceFrom1'
      this.isPrint = true
      this.isprint = false
      this.isvalidator = false
      this.printshow = false
      this.adInformationnoteFrom.resetFields()
      this.fiveRaiseFrom.resetFields()
      this[this.nowformname].resetFields()
      this.cptAdoptorFrom3.resetFields()
      this.maritalForm.setFieldsValue({ maritalType: '10' })
      this.adoptedFrom.resetFields()
      this.$nextTick(() => {
        this.adoptedFrom.setFieldsValue({
          identityCategory: '1'
        })
      })
      this.handleFrom.setFieldsValue({
        handlePersonName: window.parent.indexTool.getUserInfo().userName,
        handleOrgName: window.parent.indexTool.getUserInfo().orgName,
        handleTime: moment()
      })
      this.idAdopttype = [
        this.Enum.IDCARD_TYPE.NDJMSFZ,
        this.Enum.IDCARD_TYPE.NDJMSFZ
      ]
      this.$refs.adoptedFrom.selectvalue = 1
      if (this.evaluate == 'yes') {
        info = '0'
        this.id = this.goId
      } else {
        info = this.$route.query.info
        this.id = this.$route.query.id
      }
      if (this.id) { // 有id是 非新增
        this.typedisabled = true
        // this.id = ifId
        this.printId = this.id
        if (this.evaluate == 'yes') {
          this.handleType = '0'
        } else {
          this.handleType = this.$route.query.handleType
        }
        if (this.handleType == 0) { // 详情查看
          this.filedisabled = true
          this.basedisabled = true
        } else if (this.handleType == 1) { // 继续办理
          this.basedisabled = false
          this.filedisabled = false
          if (info == '1') {
            this.infomationType = false
          } else {
            this.infomationType = true
          }
        } else {
          this.filedisabled = false
          this.nowkey = '5'
        }
        this.getimglist()
        this.getDetails()
      } else { // 无id是 新增
        this.childtype = '1'
        this.typedisabled = false
      }
      this.adoptedFrom.setFieldsValue({
        identityCategory: this.childtype
      })

      if (this.$route.query.zcjxbl) {
        this.isprint = true
      } else {
        this.isprint = false
      }

      this.isZY = false // 登记字号不显示
      if (this.additionalYesOrNo == '1') {
        // 补录和维护进来时。
        this.isZY = true
      }
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        this.setHeight('four', 'fourout')
        if (this.childtype == 3) {
          this.setHeight('five', 'fiveout')
        }
        if (this.childtype != 8) {
          this.setHeight('three', 'threeout')
        }
      })
    },
    // 改变被收养人信息高度
    setHeiOne () {
      this.setHeight('one', 'oneout')
    },
    onChangeMarital (e) {
      this.maritalType = e.target.value
      if (this.maritalType == '20') {
        this.adoptionTabKey = '3'
        this.nowformname = 'cptAdoptorFrom' + 3
        this.cptAdoptorFrom3.resetFields()
        this.cptAdoptorFrom3.setFieldsValue({ maritalStatus: e.target.value })
        this.cptAdoptorFrom3.setFieldsValue({ copy_maritalStatus: e.target.value })
      } else {
        this.adoptionTabKey = '1'
        this.nowformname = 'cptAdoptorFrom' + 1
        this.cptAdoptorFrom1.resetFields()
        this.cptAdoptorFrom1.setFieldsValue({ maritalStatus: e.target.value })
        this.cptAdoptorFrom2.setFieldsValue({ maritalStatus: e.target.value })
      }
    },
    setdate (val) {
      // if (val.age < 30 && !(this.maritalType == '30' && this.childtype == 4)) {
      if (val.age < 30 && this.childtype != 4 && this.additionalYesOrNo != '1') {
        this.$message.error('收养人年龄不满三十周岁，不符合收养条件')
      }
      if (!this.isvalidator) {
        return false
      }
      this[this.nowformname].setFieldsValue({
        birthday: val.birth ? moment(val.birth) : null
      })
      const birthday1 = this.adoptedFrom.getFieldsValue().birthday.format('YYYY-MM-DD')
      const sex1 = this.adoptedFrom.getFieldsValue().sex
      const ageNum = birthday1.split('-').join('') - val.birth.split('-').join('')
      // if (ageNum < 400000 && this.childtype != 6 && sex1 != val.sex && !(this.maritalType == '30' && this.childtype == 4)) {
      if (ageNum < 400000 && this.childtype != 6 && sex1 != val.sex && this.childtype != 4 && this.additionalYesOrNo != '1') {
        this.$message.error('收养人与被收养人的年龄应当相差40周岁以上')
      }
    },
    setsenddate (val) {
      if (!this.isvalidator) {
        return false
      }
      this[this.nowmaintenanceFrom].setFieldsValue({
        birthday: val.birth ? moment(val.birth) : null
      })
      if (this.sendTabKey == '1') {
        this.parentFrom.setFieldsValue({ birthday: val.birth ? moment(val.birth) : null })
      }
      if (this.sendTabKey == '2') {
        this.parentFrom.setFieldsValue({ copy_birthday: val.birth ? moment(val.birth) : null })
      }
    },
    setsendmendate (val) {
      if (!this.isvalidator) {
        return false
      }
      const key = val.key
      if (key.includes('copy')) {
        this[this.nowmaintenanceFrom].setFieldsValue({
          copy_birthday: val.birth ? moment(val.birth) : null
        })
        this.parentFrom.setFieldsValue({ copy_birthday: val.birth ? moment(val.birth) : null })
      } else {
        this[this.nowmaintenanceFrom].setFieldsValue({
          birthday: val.birth ? moment(val.birth) : null
        })
        this.parentFrom.setFieldsValue({ birthday: val.birth ? moment(val.birth) : null })
      }
    },
    setparentdate (val) {
      if (!this.isvalidator) {
        return false
      }
      const key = val.key
      if (key.includes('copy')) {
        this.parentFrom.setFieldsValue({
          copy_birthday: val.birth ? moment(val.birth) : null
        })
      } else {
        this.parentFrom.setFieldsValue({
          birthday: val.birth ? moment(val.birth) : null
        })
      }
    },
    setIdCard4 (val) {
      if (val == '1') {
        this.parentFrom.setFieldsValue({
          idCard: '',
          birthday: null
        })
      } else {
        this.parentFrom.setFieldsValue({
          copy_idCard: '',
          copy_birthday: null
        })
      }
    },
    setmendate (val) {
      if (val.age < 30 && this.childtype != 4 && this.additionalYesOrNo != '1') {
        this.$message.error('收养人年龄不满三十周岁，不符合收养条件')
      }
      if (!this.isvalidator) {
        return false
      }
      const key = val.key
      if (key.includes('copy')) {
        this[this.nowformname].setFieldsValue({
          copy_birthday: val.birth ? moment(val.birth) : null
        })
      } else {
        this[this.nowformname].setFieldsValue({
          birthday: val.birth ? moment(val.birth) : null
        })
      }
    },
    setIdvalue (val) {
      this.idAdopttype = val
    },
    setIdCard2 (val) {
      if (val == '1') {
        this[this.nowformname].setFieldsValue({
          idCard: '',
          birthday: null
        })
      } else {
        this[this.nowformname].setFieldsValue({
          copy_idCard: '',
          copy_birthday: null
        })
      }
    },
    parentmensetaddress () {
      this.parentFrom.setFieldsValue({
        address_Linkage: this.parentmenmodel
      })
    },
    parentwomensetaddress () {
      this.parentFrom.setFieldsValue({
        copy_address_Linkage: this.parentwomenmodel
      })
    },
    parentmensetheath () {
      this.parentFrom.setFieldsValue({
        healthCondition: this.parentmenheathmodel
      })
    },
    parentwomensetheath () {
      this.parentFrom.setFieldsValue({
        copy_healthCondition: this.parentwomenheathmodel
      })
    },
    setheath () {
      this.adoptedFrom.setFieldsValue({
        healthCondition: this.heathmodel
      })
    },
    setIdCard () {
      this[this.nowformname].setFieldsValue({
        idCard: ''
      })
    },
    setheath2 () {
      this[this.nowformname].setFieldsValue({
        healthCondition: this.heathmodel2
      })
    },
    // 对应表单的地址赋值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    setaddress2 () {
      this[this.nowformname].setFieldsValue({
        address_Linkage: this.addressmodel2
      })
    },
    setIdCard3 () {
      this[this.nowmaintenanceFrom].setFieldsValue({
        idCard: ''
      })
    },
    setaddress3 () {
      this[this.nowmaintenanceFrom].setFieldsValue({
        address_Linkage: this.addressmodel3
      })
    },
    setheath3 () {
      this[this.nowmaintenanceFrom].setFieldsValue({
        healthCondition: this.heathmodel3
      })
    },
    mensetaddress () {
      this.cptAdoptorFrom3.setFieldsValue({
        address_Linkage: this.menaddressmodel
      })
    },
    womensetaddress () {
      this.cptAdoptorFrom3.setFieldsValue({
        copy_address_Linkage: this.womenaddressmodel
      })
    },
    mensetheath () {
      this.cptAdoptorFrom3.setFieldsValue({
        healthCondition: this.menheathmodel
      })
    },
    womensetheath () {
      this.cptAdoptorFrom3.setFieldsValue({
        copy_healthCondition: this.womenheathmodel
      })
    },
    mensetaddress2 () {
      this.maintenanceFrom3.setFieldsValue({
        address_Linkage: this.menaddressmodel2
      })
    },
    womensetaddress2 () {
      this.maintenanceFrom3.setFieldsValue({
        copy_address_Linkage: this.womenaddressmodel2
      })
    },
    womensetheath2 () {
      this.maintenanceFrom3.setFieldsValue({
        copy_healthCondition: this.womenheathmodel2
      })
    },
    mensetheath2 () {
      this.maintenanceFrom3.setFieldsValue({
        healthCondition: this.menheathmodel2
      })
    },
    // 家庭子女 笔录信息 调查信息 对应的数据变化
    chaadoptorChildrenVos (tablename, val, e) {
      if (e || e == 0) {
        if (val) {
          // 编辑
          this[tablename].splice(e, 1, val)
        } else {
          // 删除
          this[tablename].splice(e, 1)
          // tablename 组件对应数据名字
        }
      } else {
        // 新增赋值
        this[tablename] = val
      }
    },
    async mechanismchange (val) {
      // this.adoptedFrom.setFieldsValue({
      //   name: null
      // })
      this.post('welfareOrgManagement/queryListByOrgId', { id: val }).then(
        (res) => {
          if (res.serviceSuccess) {
            const data = res.data.data[0]
            for (var key in data) {
              if (key == 'address') {
                this.fiveRaiseFrom.setFieldsValue({
                  welfareInstitutionAddress: data[key]
                })
              }
              if (key == 'orgName') {
                this.fiveRaiseFrom.setFieldsValue({
                  welfareInstitutionName: data[key]
                })
              }
              if (key == 'id') {
                this.welfareInstitutionId = data[key]
              }
              this.fiveRaiseFrom.setFieldsValue({
                [key]: data[key]
              })
            }
          }
        }
      )
    },
    // 根据身份证号设置性别、年龄、出生日期
    setBirthAndAgeByIdCard (sex, age, birth) {
      this.istenyear = age >= 8
      this.setHeight('one', 'oneout')
      if (!this.isvalidator) {
        return false
      }
      this.adoptedFrom.setFieldsValue({
        sex: sex,
        birthday: moment(birth)
      })
    },
    // 重置被收养人表单
    clearAdoptedFrom () {
      this.$nextTick(() => {
        this.$forceUpdate()
        const { identityCategory } = this.adoptedFrom.getFieldsValue()
        this.adoptedFrom.resetFields()
        this.adoptedFrom.setFieldsValue({ identityCategory })
      })
    },
    // 清空身份证号
    clearIdCard () {
      this.isSImIdCard = true
      this.adoptedFrom.setFieldsValue({
        idCard: null
      })
    },
    // 身份证变化引发的赋值
    setFrom (val) {
      this.isSImIdCard = false
      if (!this.isvalidator) {
        return false
      }
      if (val.name) {
        const value = val.idCard
        for (var k in val) {
          if (val[k]) {
            if (k == 'adoptionAgencyVo') {
              if (this.childtype <= 2) {
                this.welfareInstitutionId = val[k].welfareInstitutionId
                // this.fiveRaiseFrom.setFieldsValue()
                for (var key in val[k]) {
                  this.fiveRaiseFrom.setFieldsValue({
                    [key]: val[k][key]
                  })
                }
              }
            } else {
              if (k == 'birthday' || k == 'pickupDate' || k == 'enterDate') {
                this.adoptedFrom.setFieldsValue({
                  [k]: val[k] ? this.moment(val[k], 'YYYY-MM-DD') : null
                })
              } else if (k == 'censusRegisterPro') {
                this.addressmodel = [
                  val.censusRegisterPro || '',
                  val.censusRegisterCity || '',
                  val.censusRegisterCounty || '',
                  val.censusRegisterTown || ''
                ]
              } else {
                this.adoptedFrom.setFieldsValue({
                  [k]: val[k]
                })
              }
            }
          }
        }
      }
      this.setHeight('one', 'oneout')
    },
    // 机构类表 welfareOrgManagement/queryListByOrgId
    async getmechanismList () {
      const data = await this.post('welfareOrgManagement/queryListByOrgId')
      this.mechanismList = data.data.data
    },
    // 性别列表
    async getsex () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // TYPESOFADOPTEESTATUS 三代以内被收养人身份类别 TYPESOFADOPTEESTATUS
    async gettypesadopteestatus () {
      const data = await this.getDictionaries('TYPESOFADOPTEESTATUS')
      this.typesadopteestatusList = data
    },
    // 民族
    async getnation () {
      const data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    // HEALTH 健康状况
    async getHealth () {
      const data = await this.getDictionaries('HEALTH')
      this.healthList = data
    },
    // FAMILYINCOME 家庭收入
    async getfamilyincome () {
      const data = await this.getDictionaries('FAMILYINCOME')
      this.familyincomeList = data
    },
    // DEGREEEDUCATION 文化程度
    async getCulture () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.cultureList = data
    },
    // IDENTITCATEGORY 身份类别
    async getIdentity () {
      const data = await this.getDictionaries('IDENTITCATEGORY')
      this.identityList = data
    },
    // NATIONALITY 國籍
    async getnationality () {
      const data = await this.getDictionaries('NATIONALITY')
      this.nationalityList = data
    },
    // MARRIAGE 婚姻
    async getmarriage () {
      const data = await this.getDictionaries('MARRIAGE')
      this.marriageyList = data
    },
    // 职业 OCCUPATION
    async getOccupattion () {
      const data = await this.getDictionaries('OCCUPATION')
      this.occupattioList = data
    },
    // 证件类型 IDCARD_TYPE
    async getIdcardtype () {
      const data = await this.getDictionaries('IDCARD_TYPE')
      this.idcardTypeList = data
    },
    // RELATIONSADOPTEES 与被收养人的关系
    async getRelationsadoptees () {
      const data = await this.getDictionaries('RELATIONSADOPTEES')
      this.relationsadopteesList = data
    },
    // RELATIONSAPPLICANTS 与申请人关系 FAMILYRELATIONS
    async getRelationsApplicants () {
      const data = await this.getDictionaries('FAMILYCHIDRELATIONSHIP')
      this.eelationsApplicantsList = data
    },
    // CHILDREN_PARENT_STITUATION 子女所属父母情况
    async getParentsInfo () {
      const data = await this.getDictionaries('CHILDREN_PARENT_STITUATION')
      this.childrensParentSituationList = data
    },
    changeDeath (val) {
      if (val == '1') {
        this.isshowFile = true
        this.isrequire = true
      } else {
        this.isshowFile = false
        this.isrequire = false
      }
    },
    // 送样tabb切换
    maintancechange (val) {
      if (this.basedisabled) {
        return false
      }
      this.sendTabKey = val
      this.nowmaintenanceFrom = 'maintenanceFrom' + val
      if (!this.typedisabled) {
        this.$nextTick(() => {
          this[this.nowmaintenanceFrom].resetFields()
        })
      }
    },
    // 收养tab切换
    chs (val) {
      if (this.basedisabled) {
        return false
      }
      const val1 = this.maritalForm.getFieldsValue().maritalType
      this.adoptionTabKey = val
      this.nowformname = 'cptAdoptorFrom' + val
      if (!this.typedisabled) {
        this.$nextTick(() => {
          this[this.nowformname].resetFields()
          this[this.nowformname].setFieldsValue({ maritalStatus: val1 })
        })
      }
    },
    moment,
    // 获取收养类别ADOPTIONCATEGORY
    async getchildtype () {
      const data = await this.getDictionaries('ADOPTIONCATEGORY')
      this.adoptionlist = data
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
    },
    doTipChange (v) {
      let songyr = ''
      let souyr = ''
      switch (v) {
        case '1':
          songyr =
            '法定代表人户口簿、居民身份证，经办人户口簿、居民身份证，弃婴入院证明，收养协议，被收养人户口簿，捡拾报案证明，生父母死亡证明，身体检查证明'
          souyr =
            '户口簿，居民身份证，子女情况证明，婚姻状况及有抚养教育被收养人能力的证明，身体健康检查证明'
          break
        case '2':
          songyr =
            '法定代表人户口簿、居民身份证，经办人户口簿、居民身份证，入院证明，收养协议，抚养义务人同意送养的证明，被收养人户口簿，捡拾报案证明，生父母死亡证明，身体检查证明'
          souyr =
            '户口簿，居民身份证，子女情况证明，婚姻状况及有抚养教育被收养人能力的证明，身体健康检查证明'
          break
        case '3':
          songyr =
            '户口簿，居民身份证，无民事行为能力的证明，承担监护责任证明，抚养义务人同意送养的证明，被收养人户口簿，居民身份证，身体健康检查证明'
          souyr =
            '户口簿，居民身份证，子女情况证明，婚姻状况及有抚养教育被收养人能力的证明，身体健康检查证明'
          break
        case '4':
          songyr =
            '户口簿，居民身份证，同意送养书面意见，被收养人户口簿，居民身份证'
          souyr = '户口簿，居民身份证，结婚证明'
          break
        case '5':
          songyr =
            '户口簿，居民身份证，有特殊困难无力抚养子女的证明，不违反计划生育协议，被收养人户口簿，居民身份证，身体健康检查证明'
          souyr =
            '户口簿，居民身份证，子女情况证明，婚姻状况及有抚养教育被收养人能力的证明，身体健康检查证明'
          break
        case '6':
          songyr =
            '户口簿，居民身份证，亲属关系证明，不违反计划生育协议，公安机关出具的或经过公正的三代以内同辈旁系血亲关系的证明，被收养人户口簿，居民身份证，身体健康检查证明'
          souyr =
            '户口簿，居民身份证，子女情况证明，婚姻状况及有抚养教育被收养人能力的证明，身体健康检查证明'
          break
        case '7':
          songyr =
            '户口簿，居民身份证，承担监护责任证明，抚养义务人同意送养的证明，被收养人户口簿，生父母死亡证明'
          souyr =
            '户口簿，居民身份证，子女情况证明，婚姻状况及有抚养教育被收养人能力的证明，身体健康检查证明'
          break
        case '8':
          songyr = '被收养人捡拾报案证明，寻亲公告，身体检查证明'
          souyr =
            '户口簿，居民身份证，子女情况证明，婚姻状况及有抚养教育被收养人能力的证明，身体健康检查证明'
          break
      }

      this.$nextTick(() => {
        this.adInformationnoteFrom.setFieldsValue({
          adoptorCredentials: souyr,
          placingOutCredentials: songyr
        })
      })
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 110 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    // 收养类别change
    selectchange (val) {
      // 清空姓名下拉框数据
      this.$refs.adoptedFrom.childrenNameList = []
      this.istenyear = false
      this.isrequire = false
      this.adoptionTabKey = '1'
      this.maritalType = '10'
      this.nowformname = 'cptAdoptorFrom' + 1
      this.maritalForm.setFieldsValue({ maritalType: '10' })
      this.cptAdoptorFrom1.setFieldsValue({ maritalStatus: '10' })
      this.sendTabKey = '1'
      this.heathval = '0'

      if (this.isSix == 3 && val != 3) {
        this.parentFrom.resetFields()
      }
      this.isSix = val
      if (this.childtype == 4) {
        this.isshow1 = true
      } else {
        this.isshow1 = false
      }
      this.$nextTick(() => {
        this.$forceUpdate()
        this.adoptedFrom.resetFields()
        let identityCategory = this.childtype
        if (this.childtype != 8) { // 非福利机构弃婴之外
          if (this.childtype <= 2) { // 非福利
            this.fiveRaiseFrom.resetFields()
          } else if (this.childtype == 6) { // 三代以内
            this.nowmaintenanceFrom = 'maintenanceFrom1'
            this[this.nowmaintenanceFrom].resetFields()
            identityCategory = null
          } else {
            this.nowmaintenanceFrom = 'maintenanceFrom1'
            this[this.nowmaintenanceFrom].resetFields()
            if (this.childtype == 3) {
              this.parentFrom.resetFields()
              this.$nextTick(() => {
                this.setHeight('five', 'fiveout')
              })
            }
            setTimeout(() => {
              this.adoptedFrom.setFieldsValue({
                identityCategory: this.childtype
              })
            }, 300)
          }
          this.setHeight('three', 'threeout', !this.showthree)
        }
        setTimeout(() => {
          this.adoptedFrom.setFieldsValue({ identityCategory })
        }, 300)
        this.setHeight('one', 'oneout', !this.showone)
        this.nowformname = 'cptAdoptorFrom1'
        this[this.nowformname].resetFields()
        this.nowmaintenanceFrom = 'maintenanceFrom1'
        this.adInformationnoteFrom.resetFields()
      })
      this.doTipChange(val)
    },
    // 筛选数据
    screeningData (data) {
      const arrdata = []
      const mendata = {}
      const womandata = {}
      for (var k in data) {
        if (k.includes('copy')) {
          if (k == 'copy_address_Linkage') {
            womandata.address_Linkage = data[k]
          } else {
            const keys = k.split('_')[1]
            womandata[keys] = data[k]
          }
        } else {
          mendata[k] = data[k]
        }
      }
      womandata.sameAddress = mendata.sameAddress
      // 健康状况
      if (mendata.healthCondition) {
        mendata.healthCondition = mendata.healthCondition.join(',')
      }
      if (womandata.healthCondition) {
        womandata.healthCondition = womandata.healthCondition.join(',')
      }
      mendata.sex = '1'
      womandata.sex = '2'
      if (mendata.address_Linkage) {
        mendata.censusRegisterPro = mendata.address_Linkage[0] || ''
        mendata.censusRegisterCity = mendata.address_Linkage[1] || ''
        mendata.censusRegisterCounty = mendata.address_Linkage[2] || ''
        mendata.censusRegisterTown = mendata.address_Linkage[3] || ''
        delete mendata.address_Linkage
      }
      if (womandata.address_Linkage) {
        womandata.censusRegisterPro = womandata.address_Linkage[0] || ''
        womandata.censusRegisterCity = womandata.address_Linkage[1] || ''
        womandata.censusRegisterCounty = womandata.address_Linkage[2] || ''
        womandata.censusRegisterTown = womandata.address_Linkage[3] || ''
        delete womandata.address_Linkage
      } else {
        womandata.censusRegisterPro = mendata.censusRegisterPro || ''
        womandata.censusRegisterCity = mendata.censusRegisterCity || ''
        womandata.censusRegisterCounty = mendata.censusRegisterCounty || ''
        womandata.censusRegisterDetail = mendata.censusRegisterDetail || ''
      }
      if (mendata.familyIncome) {
        womandata.familyIncome = mendata.familyIncome
        womandata.relationship = mendata.relationship
        womandata.opinion = mendata.opinion
      }
      arrdata.push(mendata, womandata)
      return arrdata
    },
    // 时间处理
    changetime (data) {
      for (var k in data) {
        if (data[k]) {
          if (!(data[k] instanceof Array) && data[k] instanceof Object) {
            data[k] = data[k].format('YYYY-MM-DD')
          }
        }
      }
    },
    // 詳情数组处理
    detailobj (val) {
      for (var k in val[1]) {
        val[1][`copy_${k}`] = val[1][k]
        delete val[1][k]
      }
      const obj = { ...val[0], ...val[1] }
      return obj
    },
    async getimglist () {
      const params = {
        id: this.id
      }
      const data = await this.post('/adoption/getAdoptioPhoto', params)
      if (data.data) {
        const registrationAdoptionVo1 = data.data.data
        if (registrationAdoptionVo1 && registrationAdoptionVo1.imagefileList) {
          const imgobj = JSON.parse(registrationAdoptionVo1.imagefileList)
          imgobj[0].thumbUrl = 'data:image/png;base64,' + imgobj[0].thumbUrl
          this.imgfilelist = imgobj
        }
      }
    },
    // 获取详情
    async getDetails () {
      const params = {
        id: this.id
      }
      this.loading = true
      const data = await this.post('/adoption/queryRegisterById', params)
      const obj = data.data.data
      this.recordStatus = obj.registrationAdoptionVo
        ? obj.registrationAdoptionVo.recordStatus
        : null
      this.loading = false
      // 情况说明赋值
      this.registrationAdoptionVo = obj.registrationAdoptionVo
      // 儿童类别
      this.childtype = this.registrationAdoptionVo.adoptionCategory
      if (this.childtype == 4) {
        this.isshow1 = true
      } else {
        this.isshow1 = false
      }
      this.isSix = this.childtype
      // 被收养人赋值
      const adopteeVo = obj.adopteeVo
      this.childrenId = adopteeVo.childrenId
      const nowBirth = moment(new Date()).format('YYYY-MM-DD').split('-').join('')
      if (adopteeVo.birthday) {
        const oldBirth = adopteeVo.birthday.split('-').join('')
        const AgeNum = nowBirth - oldBirth
        this.istenyear = AgeNum >= 80000
      }

      adopteeVo.birthday = adopteeVo.birthday
        ? moment(adopteeVo.birthday)
        : null
      if (adopteeVo.enterDate) {
        adopteeVo.enterDate = moment(adopteeVo.enterDate)
      }
      if (adopteeVo.publishDate) {
        adopteeVo.publishDate = moment(adopteeVo.publishDate)
      }
      if (adopteeVo.pickupDate) {
        adopteeVo.pickupDate = moment(adopteeVo.pickupDate)
      }
      if (adopteeVo.idCard) {
        const dateobj = this.go(
          adopteeVo.idCard,
          adopteeVo.idCard ? adopteeVo.idCard.length : 0,
          this,
          null
        )
        this.istenyear = dateobj.age >= 8
      }
      if (adopteeVo.identityCategory) {
        adopteeVo.identityCategory = adopteeVo.identityCategory.trim()
      }
      // 健康狀況賦值
      if (adopteeVo.healthCondition) {
        this.heathmodel = adopteeVo.healthCondition.split(',')
        this.heathval = adopteeVo.healthCondition
        this.getdisabiliytype(adopteeVo.healthCondition)
      }
      // 健康状况
      if (adopteeVo.healthSecondLevel) {
        adopteeVo.healthSecondLevel = adopteeVo.healthSecondLevel.split(',')
        if (
          adopteeVo.healthSecondLevel[adopteeVo.healthSecondLevel.length - 1] ==
          this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          adopteeVo.healthSecondLevel[adopteeVo.healthSecondLevel.length - 1] ==
          this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          this.serioushval = true
        } else {
          this.serioushval = false
        }
        this.heathval = adopteeVo.healthCondition
      }
      // 健康状况
      // registerAdoptionVo.healthCondition = registerAdoptionVo.healthCondition.join(',')
      this.$nextTick(() => {
        this.addressmodel = [
          adopteeVo.censusRegisterPro || '',
          adopteeVo.censusRegisterCity || '',
          adopteeVo.censusRegisterCounty || '',
          adopteeVo.censusRegisterTown || ''
        ]
        this.adoptedFrom.setFieldsValue(adopteeVo)
        if (this.childtype == 1 || this.childtype == 2) {
          this.post('adoption/queryChildBaseInfoByOrgIdAndName', { orgId: obj.adoptionAgencyVo.welfareInstitutionId.trim() }).then((res) => {
            if (res.serviceSuccess) {
              this.$refs.adoptedFrom.childrenNameList = res.data.data
              this.adoptedFrom.setFieldsValue({ name: adopteeVo.name })
            }
          })
        }
      })

      // 收养人信息
      const adoptorVos = obj.adoptorVos
      if (adoptorVos.length == 2) {
        this.maritalForm.setFieldsValue({ maritalType: '20' })
        this.maritalType = '20'
      } else {
        if (adoptorVos[0].maritalStatus == '22' || adoptorVos[0].maritalStatus == '21' || adoptorVos[0].maritalStatus == '20' || adoptorVos[0].maritalStatus == '23') {
          this.maritalForm.setFieldsValue({ maritalType: '20' })
          // this.maritalType = '20'
        }
        if (adoptorVos[0].maritalStatus == '30') {
          this.maritalForm.setFieldsValue({ maritalType: '30' })
        }
        if (adoptorVos[0].maritalStatus == '10') {
          this.maritalForm.setFieldsValue({ maritalType: '10' })
        }
        if (adoptorVos[0].maritalStatus == '90') {
          this.maritalForm.setFieldsValue({ maritalType: '90' })
        }
        if (adoptorVos[0].maritalStatus == '40') {
          this.maritalForm.setFieldsValue({ maritalType: '40' })
        }
      }
      adoptorVos.map((item) => {
        if (item.birthday) {
          item.birthday = item.birthday ? moment(item.birthday) : null
        }
      })
      let adoptorVo = {}
      if (adoptorVos.length > 1) {
        // 主申请人
        if (adoptorVos[0].keyMember == 1) {
          this.applytype = '1'
        } else {
          this.applytype = '0'
        }
        this.adoptionTabKey = '3'
        this.nowformname = 'cptAdoptorFrom' + 3
        this.issameaddress1 = adoptorVos[0].sameAddress
        this.idAdopttype = [
          adoptorVos[0].memberIdType || '',
          adoptorVos[1].copy_memberIdType || ''
        ]
        this.$nextTick(() => {
          this.cptAdoptorFrom1.resetFields()
          this.cptAdoptorFrom2.resetFields()
          adoptorVo = this.detailobj(adoptorVos)
          adoptorVo.familyIncome = obj.familyIncome
          if (adoptorVo.healthCondition) {
            this.menheathmodel = adoptorVo.healthCondition.split(',')
            adoptorVo.healthCondition = adoptorVo.healthCondition.split(',')
          }
          if (adoptorVo.copy_healthCondition) {
            this.womenheathmodel = adoptorVo.copy_healthCondition.split(',')
            adoptorVo.copy_healthCondition = adoptorVo.copy_healthCondition.split(
              ','
            )
          }

          this.menaddressmodel = [
            adoptorVo.censusRegisterPro || '',
            adoptorVo.censusRegisterCity || '',
            adoptorVo.censusRegisterCounty || '',
            adoptorVo.censusRegisterTown || ''
          ]
          if (this.issameaddress1 != 1) {
            this.womenaddressmodel = [
              adoptorVo.copy_censusRegisterPro || '',
              adoptorVo.copy_censusRegisterCity || '',
              adoptorVo.copy_censusRegisterCounty || '',
              adoptorVo.copy_censusRegisterTown || ''
            ]
          }
        })
      } else {
        adoptorVos[0].sex == 1
          ? (this.adoptionTabKey = '1')
          : (this.adoptionTabKey = '2')
        adoptorVos[0].sex == 1
          ? (this.nowformname = 'cptAdoptorFrom' + 1)
          : (this.nowformname = 'cptAdoptorFrom' + 2)
        adoptorVo = adoptorVos[0]
        this.$nextTick(() => {
          this.adoptionformdata = adoptorVo.memberIdType
          this.cptAdoptorFrom3.resetFields()
          // 健康狀況賦值
          if (adoptorVo.healthCondition) {
            this.heathmodel2 = adoptorVo.healthCondition.split(',')
            adoptorVo.healthCondition = adoptorVo.healthCondition.split(',')
          }
          this.addressmodel2 = [
            adoptorVo.censusRegisterPro || '',
            adoptorVo.censusRegisterCity || '',
            adoptorVo.censusRegisterCounty || '',
            adoptorVo.censusRegisterTown || ''
          ]
        })
      }

      this.$nextTick(() => {
        adoptorVo.familyIncome = obj.familyIncome
        this[this.nowformname].setFieldsValue(adoptorVo)
      })
      // 送养信息处理
      if (this.childtype != 8) {
        if (this.childtype <= 2) {
          const { adoptionAgencyVo } = obj
          if (adoptionAgencyVo) {
            this.$nextTick(() => {
              this.adoptedFrom.setFieldsValue({
                welfareInstitutionName: obj.adoptionAgencyVo.welfareInstitutionName// .welfareInstitutionId.trim()// welfareInstitutionName
              })
            })
            this.welfareInstitutionId = obj.adoptionAgencyVo.welfareInstitutionId
            adoptionAgencyVo.welfareInstitutionName = obj.adoptionAgencyVo.welfareInstitutionName
            this.fiveRaiseFrom.setFieldsValue(adoptionAgencyVo)
          }
        } else {
          // 送养人
          let placingOutPersonVo = {}
          const placingOutPersonVos = obj.placingOutPersonVos

          if (placingOutPersonVos && placingOutPersonVos.length == 1) {
            if (placingOutPersonVos[0].isDeath == '1') {
              this.isshowFile = true
              this.isrequire = true
            } else {
              this.isshowFile = false
              this.isrequire = false
            }
          }
          if (placingOutPersonVos && placingOutPersonVos.length > 0) {
            placingOutPersonVos.map((item) => {
              if (item.birthday) {
                item.birthday = item.birthday ? moment(item.birthday) : null
              }
            })
            if (placingOutPersonVos.length > 1) {
              // 这是双方送养。
              this.sendTabKey = '3'
              this.nowmaintenanceFrom = 'maintenanceFrom3'
              this.issameaddress2 = placingOutPersonVos[0].sameAddress
              this.placingOutidAdopttype = [
                placingOutPersonVos[0].memberIdType || '',
                placingOutPersonVos[1].memberIdType || ''
              ]
              this.$nextTick(() => {
                placingOutPersonVo = this.detailobj(placingOutPersonVos)
                if (placingOutPersonVo.healthCondition) {
                  this.menheathmodel2 = placingOutPersonVo.healthCondition.split(
                    ','
                  )
                  placingOutPersonVo.healthCondition = placingOutPersonVo.healthCondition.split(
                    ','
                  )
                }
                if (placingOutPersonVo.copy_healthCondition) {
                  this.womenheathmodel2 = placingOutPersonVo.copy_healthCondition.split(
                    ','
                  )
                  placingOutPersonVo.copy_healthCondition = placingOutPersonVo.copy_healthCondition.split(
                    ','
                  )
                }

                this.menaddressmodel2 = [
                  placingOutPersonVo.censusRegisterPro || '',
                  placingOutPersonVo.censusRegisterCity || '',
                  placingOutPersonVo.censusRegisterCounty || '',
                  placingOutPersonVo.censusRegisterTown || ''
                ]
                if (this.issameaddress2 != 1) {
                  this.womenaddressmodel2 = [
                    placingOutPersonVo.copy_censusRegisterPro || '',
                    placingOutPersonVo.copy_censusRegisterCity || '',
                    placingOutPersonVo.copy_censusRegisterCounty || '',
                    placingOutPersonVo.copy_censusRegisterTown || ''
                  ]
                }
              })
            } else {
              // 单独收养。
              placingOutPersonVos[0].sex == 1
                ? (this.sendTabKey = '1')
                : (this.sendTabKey = '2')
              placingOutPersonVos[0].sex == 1
                ? (this.nowmaintenanceFrom = 'maintenanceFrom' + 1)
                : (this.nowmaintenanceFrom = 'maintenanceFrom' + 2)
              placingOutPersonVo = placingOutPersonVos[0]
              this.formdata = placingOutPersonVo.memberIdType // 证件号码验证的判断条件。
              this.$nextTick(() => {
                if (placingOutPersonVo.healthCondition) {
                  this.heathmodel3 = placingOutPersonVo.healthCondition.split(
                    ','
                  )
                  placingOutPersonVo.healthCondition = placingOutPersonVo.healthCondition.split(
                    ','
                  )
                }
                this.addressmodel3 = [
                  placingOutPersonVo.censusRegisterPro || '',
                  placingOutPersonVo.censusRegisterCity || '',
                  placingOutPersonVo.censusRegisterCounty || '',
                  placingOutPersonVo.censusRegisterTown || ''
                ]
              })
            }
            this.$nextTick(() => {
              this[this.nowmaintenanceFrom].setFieldsValue(placingOutPersonVo)
            })
          }
        }
      }
      // 生父母 parentFrom
      if (this.childtype == 3) {
        const parentsVos = obj.parentsVos
        if (parentsVos && parentsVos.length > 0) {
          parentsVos.map((item) => {
            if (item.birthday) {
              item.birthday = item.birthday ? moment(item.birthday) : null
            }
          })
          let parentsVo = {}
          this.issameaddress3 = parentsVos[0].sameAddress
          this.$nextTick(() => {
            // 单亲
            if (parentsVos[0].isOneParent == '0') {
              // 非单亲
              this.$refs.parentFrom.isman = []
              this.$refs.parentFrom.iswoman = []
            } else if (parentsVos[0].isOneParent == '1') {
              // 男方单亲
              this.$refs.parentFrom.isman = ['1']
              this.$refs.parentFrom.iswoman = []
            } else if (parentsVos[0].isOneParent == '2') {
              // 女方单亲
              this.$refs.parentFrom.isman = []
              this.$refs.parentFrom.iswoman = ['2']
            }
            parentsVo = this.detailobj(parentsVos)
            if (parentsVo.healthCondition) {
              this.parentmenheathmodel = parentsVo.healthCondition.split(',')
              parentsVo.healthCondition = parentsVo.healthCondition.split(',')
            }
            if (parentsVo.copy_healthCondition) {
              this.parentwomenheathmodel = parentsVo.copy_healthCondition.split(
                ','
              )
              parentsVo.copy_healthCondition = parentsVo.copy_healthCondition.split(
                ','
              )
            }

            this.parentmenmodel = [
              parentsVo.censusRegisterPro || '',
              parentsVo.censusRegisterCity || '',
              parentsVo.censusRegisterCounty || ''
            ]
            if (this.issameaddress3 != 1) {
              this.parentwomenmodel = [
                parentsVo.copy_censusRegisterPro || '',
                parentsVo.copy_censusRegisterCity || '',
                parentsVo.copy_censusRegisterCounty || ''
              ]
            }
          })
          // parentFrom
          this.$nextTick(() => {
            this.parentFrom.setFieldsValue(parentsVo)
          })
        }
      }

      // 情况说明
      this.registrationAdoptionVo.registerDate = this.registrationAdoptionVo.registerDate
        ? moment(this.registrationAdoptionVo.registerDate)
        : null
      this.registrationAdoptionVo.handleTime = this.registrationAdoptionVo.handleTime
        ? moment(this.registrationAdoptionVo.handleTime)
        : null
      this.adInformationnoteFrom.setFieldsValue(this.registrationAdoptionVo)
      setTimeout(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        this.setHeight('four', 'fourout')
        if (this.childtype == 3) {
          this.setHeight('five', 'fiveout')
        }
        if (this.childtype != 8) {
          this.setHeight('three', 'threeout')
        }
      }, 400)
      // 办理信息回显
      this.handleFrom.setFieldsValue(this.registrationAdoptionVo)
      // 家庭子女信息------------------------------------------------获取
      // 证件类型为null时默认设为内地居民身份证
      const familyMemberList = obj.adoptorChildrenVos || []
      familyMemberList.forEach(element => {
        if (!element.memberIdType) element.memberIdType = this.Enum.IDCARD_TYPE.NDJMSFZ
      })
      this.adoptorChildrenVos = familyMemberList

      // 笔录信息
      this.notesRecordVos = obj.notesRecordVos
      // 调查信息
      this.surveyRecordVos = obj.surveyRecordVos

      // 文件信息 filePathVos
      const filePathVos = JSON.parse(obj.filePathVos)
      this.fileList = []
      this.adoptionfileList = []
      this.syCardFileList = []
      this.adopterfileList = []
      filePathVos.map((item) => {
        if (item.busiType == '1') {
          this.fileList.push(item)
        } else if (item.busiType == '2') {
          this.adoptionfileList.push(item)
        } else if (item.busiType == '22') {
          this.syCardFileList.push(item)
        } else {
          this.adopterfileList.push(item)
        }
      })
    },
    // 获取的数据处理

    // 处理数据
    processingData () {
      // 总数据对象
      const registerAdoptionVo = {}

      // 家庭年收入
      let familyIncome = ''

      // 被收养人数据
      let adopteeVo = {}

      adopteeVo = Object.assign({}, this.adoptedFrom.getFieldsValue())
      this.changetime(adopteeVo)
      if (adopteeVo.address_Linkage) {
        adopteeVo.censusRegisterPro = adopteeVo.address_Linkage[0] || ''
        adopteeVo.censusRegisterCity = adopteeVo.address_Linkage[1] || ''
        adopteeVo.censusRegisterCounty = adopteeVo.address_Linkage[2] || ''
        adopteeVo.censusRegisterTown = adopteeVo.address_Linkage[3] || ''
        delete adopteeVo.address_Linkage
      }

      // 健康状况
      // if (adopteeVo.healthCondition) {
      //   adopteeVo.healthCondition = adopteeVo.healthCondition.join(',')
      // }
      if (
        adopteeVo.healthSecondLevel &&
        adopteeVo.healthSecondLevel.length > 0
      ) {
        adopteeVo.healthSecondLevel = adopteeVo.healthSecondLevel.join(',')
      }
      adopteeVo.childrenId = this.childrenId
      if (this.childtype <= 2) {
        adopteeVo.childBaseId = this.childBaseId
      }
      registerAdoptionVo.adopteeVo = adopteeVo

      // 收养人数据
      let adoptorVos = []

      const AdoptorVo = Object.assign(this[this.nowformname].getFieldsValue())
      this.changetime(AdoptorVo)
      // 取出家庭年收入
      familyIncome = AdoptorVo.familyIncome

      if (this.adoptionTabKey == 3) {
        adoptorVos = this.screeningData(AdoptorVo)
        if (this.applytype == 1) {
          adoptorVos[0].keyMember = 1
          adoptorVos[1].keyMember = 0
        } else {
          adoptorVos[0].keyMember = 0
          adoptorVos[1].keyMember = 1
        }
      } else {
        // 1男 2 女
        AdoptorVo.sex = this.adoptionTabKey
        AdoptorVo.keyMember = 1
        // 健康状况
        if (AdoptorVo.healthCondition) {
          AdoptorVo.healthCondition = AdoptorVo.healthCondition.join(',')
        }
        if (AdoptorVo.address_Linkage) {
          AdoptorVo.censusRegisterPro = AdoptorVo.address_Linkage[0] || ''
          AdoptorVo.censusRegisterCity = AdoptorVo.address_Linkage[1] || ''
          AdoptorVo.censusRegisterCounty = AdoptorVo.address_Linkage[2] || ''
          AdoptorVo.censusRegisterTown = AdoptorVo.address_Linkage[3] || ''
        }
        delete AdoptorVo.address_Linkage
        adoptorVos.push(AdoptorVo)
      }

      registerAdoptionVo.adoptorVos = adoptorVos
      registerAdoptionVo.familyIncome = familyIncome
      if (this.childtype != 8) {
        // 送样信息处理
        if (this.childtype <= 2) {
          const fromData = Object.assign(
            {},
            this.fiveRaiseFrom.getFieldsValue()
          )
          this.changetime(fromData)
          // 送样机构
          let adoptionAgencyVo = {}
          adoptionAgencyVo = Object.assign(
            { welfareInstitutionId: this.welfareInstitutionId },
            fromData
          )
          registerAdoptionVo.adoptionAgencyVo = adoptionAgencyVo
        } else {
          // 送养人
          let placingOutPersonVos = []
          // nowmaintenanceFrom
          const PlacingOutPersonVo = Object.assign(
            {},
            this[this.nowmaintenanceFrom].getFieldsValue()
          )
          this.changetime(PlacingOutPersonVo)
          if (this.sendTabKey == 3) {
            placingOutPersonVos = this.screeningData(PlacingOutPersonVo)
          } else {
            // 1男 2 女
            PlacingOutPersonVo.sex = this.sendTabKey
            PlacingOutPersonVo.keyMember = 1
            // 健康状况
            if (PlacingOutPersonVo.healthCondition) {
              PlacingOutPersonVo.healthCondition = PlacingOutPersonVo.healthCondition.join(
                ','
              )
            }
            if (PlacingOutPersonVo.address_Linkage) {
              PlacingOutPersonVo.censusRegisterPro =
                PlacingOutPersonVo.address_Linkage[0] || ''
              PlacingOutPersonVo.censusRegisterCity =
                PlacingOutPersonVo.address_Linkage[1] || ''
              PlacingOutPersonVo.censusRegisterCounty =
                PlacingOutPersonVo.address_Linkage[2] || ''
              PlacingOutPersonVo.censusRegisterTown =
                PlacingOutPersonVo.address_Linkage[3] || ''
            }
            delete PlacingOutPersonVo.address_Linkage
            placingOutPersonVos.push(PlacingOutPersonVo)
          }
          // 送不养数据
          registerAdoptionVo.placingOutPersonVos = placingOutPersonVos
        }
      }
      // 生父母 parentFrom
      if (this.childtype == 3) {
        let parentsVos = []
        const parentsVo = Object.assign({}, this.parentFrom.getFieldsValue())
        // 单亲
        const parentFromObj = this.$refs.parentFrom
        parentsVo.isOneParent =
          parentFromObj.manrequire && parentFromObj.womanrequire
            ? '0'
            : parentFromObj.manrequire && !parentFromObj.womanrequire
              ? '1'
              : '2'
        this.changetime(parentsVo)
        parentsVos = this.screeningData(parentsVo)
        registerAdoptionVo.parentsVos = parentsVos
      }

      // 情况说明 adInformationnoteFrom
      this.registrationAdoptionVo = Object.assign(
        this.registrationAdoptionVo,
        { adoptionCategory: this.childtype },
        this.adInformationnoteFrom.getFieldsValue()
      )
      if (
        this.imgfilelist.length > 0 &&
        this.imgfilelist[0].response.data.data
      ) {
        const photoId = this.imgfilelist[0].response.data.data.fileid
        this.registrationAdoptionVo.photoId = photoId
        // registrationAdoptionVo.photoId = undefined
        // registrationAdoptionVo.upLoadPathIds = [photoId]
      }
      // this.changetime(registrationAdoptionVo)
      this.registrationAdoptionVo.registerDate =
        this.registrationAdoptionVo.registerDate &&
        this.registrationAdoptionVo.registerDate.format('YYYY-MM-DD')
      this.registrationAdoptionVo.recordStatus = this.recordStatus
      registerAdoptionVo.registrationAdoptionVo = this.registrationAdoptionVo
      // 文件信息
      const upLoadPathIds = []
      const fileids = [
        ...this.syCardFileList,
        ...this.fileList,
        ...this.adoptionfileList,
        ...this.adopterfileList
      ]
      fileids.map((item) => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      registerAdoptionVo.upLoadPathIds = upLoadPathIds

      // 家庭子女信息--------------------------------------------------------------------数据处理
      registerAdoptionVo.adoptorChildrenVos = this.adoptorChildrenVos

      // 笔录信息
      registerAdoptionVo.notesRecordVos = this.notesRecordVos
      // 调查信息
      registerAdoptionVo.surveyRecordVos = this.surveyRecordVos

      // 提交暂存状态
      registerAdoptionVo.submitYesOrNo = this.submitYesOrNo

      // 是否补录
      registerAdoptionVo.additionalYesOrNo = this.additionalYesOrNo
      // 收养类别
      registerAdoptionVo.adoptionCategory = this.childtype
      return registerAdoptionVo
    },
    // 补全材料
    async completionsubmit () {
      const params = {
        bizKey: this.id
      }
      const upLoadPathIds = []
      const fileids = [
        ...this.syCardFileList,
        ...this.fileList,
        ...this.adoptionfileList,
        ...this.adopterfileList
      ]
      fileids.map((item) => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      if (upLoadPathIds.length == 0) {
        this.$message.error('请上传文件')
        return false
      }
      params.upLoadPathIds = upLoadPathIds
      const res = await this.post('/adoption/annex', params, true)
      if (res.errors == null) {
        this.$message.success('提交成功')

        this.backs()
      }
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
    },
    // 提交按钮
    async submit (val) {
      this.isvalidator = false
      this.isPass = true
      let isok = true
      this.submitYesOrNo = val
      if (this.childtype == 3) {
        this.parentFrom.validateFields((err, values) => {
          if (err) {
            if (val == 0) {
              for (const k in err) {
                if (!this.parentFrom.getFieldsValue()[k]) {
                  this.parentFrom.resetFields(k)
                } else {
                  isok = false
                }
              }
            } else {
              isok = false
            }
            this.nowkey = '1'
          }
        })
      }
      if (this.childtype != 8) {
        // 送养人信息
        if (this.childtype > 2) {
          this[this.nowmaintenanceFrom].validateFields((err, values) => {
            if (err) {
              if (val == 0) {
                for (const k in err) {
                  if (!this[this.nowmaintenanceFrom].getFieldsValue()[k]) {
                    this[this.nowmaintenanceFrom].resetFields(k)
                  } else {
                    isok = false
                  }
                }
              } else {
                isok = false
              }
              this.nowkey = '1'
            }
          })
        } else {
          this.fiveRaiseFrom.validateFields((err, values) => {
            if (err) {
              if (val == 0) {
                for (const k in err) {
                  if (!this.fiveRaiseFrom.getFieldsValue()[k]) {
                    this.fiveRaiseFrom.resetFields(k)
                  } else {
                    isok = false
                  }
                }
              } else {
                isok = false
              }
              this.nowkey = '1'
            }
          })
        }
      }
      this[this.nowformname].validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this[this.nowformname].getFieldsValue()[k]) {
                this[this.nowformname].resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            isok = false
          }
          this.nowkey = '1'
        }
      })
      // 被收养人信息
      // if(this.imgfilelist.length==0)
      this.adoptedFrom.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (
                this.childtype <= 2
                  ? !this.adoptedFrom.getFieldsValue()[k] &&
                  k != 'name' &&
                  k != 'welfareInstitutionName'
                  : !this.adoptedFrom.getFieldsValue()[k] && k != 'name'
              ) {
                this.adoptedFrom.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            isok = false
          }
          this.nowkey = '1'
        }
      })
      // 情况说明
      // 附件传值
      if (this.imgfilelist.length > 0) {
        this.adInformationnoteFrom.setFieldsValue({ photoId: 1 })
      } else {
        this.adInformationnoteFrom.setFieldsValue({ photoId: undefined })
      }
      this.adInformationnoteFrom.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.adInformationnoteFrom.getFieldsValue()[k]) {
                this.adInformationnoteFrom.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            isok = false
          }
          this.nowkey = '1'
        }
      })
      this.$nextTick(() => {
        setTimeout(() => {
          if (isok) {
            this.dulprintList = val == '1'
            const data = this.processingData()
            if (this.isSImIdCard) {
              return false
            }
            if (data) {
            }
            // 新添加字段
            data.validatesRegisters = this.validatesRegisters
            let url = ''
            let text = ''
            if (this.id) {
              // 编辑
              url = val == 0 ? '/adoption/tempupdate' : '/adoption/update'
              if (this.additionalYesOrNo == '1') {
                url =
                  val == 0 ? '/adoption/tempupdate' : '/adoption/supplementUpdate'
              }
              data.bizKey = this.id
              text = '编辑成功'
            } else {
              // 新增
              url = val == 0 ? '/adoption/tempregister' : '/adoption/register'
              if (this.additionalYesOrNo == '1') {
                url =
                  val == 0
                    ? '/adoption/tempregister'
                    : '/adoption/supplementRegister'
              }
              text = '新增成功'
            }
            // this.spinning = true
            let age = 0
            const myDate = new Date()
            const idCardVal = data.adopteeVo.idCard
            if (idCardVal) {
              if (idCardVal.length === 18) {
                age = myDate.getFullYear() - idCardVal.substring(6, 10) - 1
              } else {
                age = myDate.getFullYear() - idCardVal.substring(6, 8) - 1901
              }
            }
            if (this.additionalYesOrNo != '1' && this.submitYesOrNo == '1') {
              const adoptorVos = data.adoptorVos
              const birthday = data.adopteeVo.birthday.split('-').join('')
              const sex = data.adopteeVo.sex
              let isAgeOver = true
              let ageNumOver = true
              adoptorVos.forEach(item => {
                if (item.idCard) {
                  if (idCardVal) {
                    if (item.idCard.length === 18) {
                      if (myDate.getFullYear() - item.idCard.substring(6, 10) < 30 && this.childtype != 4) {
                        isAgeOver = false
                      }
                      if (idCardVal.substring(6, 14) - item.idCard.substring(6, 14) < 400000 && (idCardVal.substring(16, 17) - item.idCard.substring(16, 17)) % 2 != 0 && this.childtype != 4 && this.childtype != 6 && this.maritalType != '20') {
                        ageNumOver = false
                      }
                    } else {
                      if (myDate.getFullYear() - item.idCard.substring(6, 8) - 1900 < 30 && this.childtype != 4) {
                        isAgeOver = false
                      }
                      if (idCardVal.substring(6, 10) - item.idCard.substring(6, 8) - 1900 < 40 && (idCardVal.substring(16, 17) - item.idCard.substring(14, 15)) % 2 != 0 && this.childtype != 4 && this.childtype != 6 && this.maritalType != '20') {
                        ageNumOver = false
                      }
                    }
                  } else {
                    if (item.idCard.length === 18) {
                      if (myDate.getFullYear() - item.idCard.substring(6, 10) < 30 && this.childtype != 4) {
                        isAgeOver = false
                      }
                      if (birthday - item.idCard.substring(6, 14) < 400000 && (sex - item.idCard.substring(16, 17)) % 2 != 0 && this.childtype != 4 && this.childtype != 6 && this.maritalType != '20') {
                        ageNumOver = false
                      }
                    } else {
                      if (myDate.getFullYear() - item.idCard.substring(6, 8) - 1900 < 30 && this.childtype != 4) {
                        isAgeOver = false
                      }
                      if (birthday - item.idCard.substring(6, 12) - 19000000 < 400000 && (sex - item.idCard.substring(14, 15)) % 2 != 0 && this.childtype != 4 && this.childtype != 6 && this.maritalType != '20') {
                        ageNumOver = false
                      }
                    }
                  }
                }
              })
              if (!isAgeOver) {
                this.$message.error('收养人年龄不满三十周岁，不符合收养条件')
                this.isPass = false
                return false
              }
              if (!ageNumOver) {
                this.$message.error('收养人与被收养人的年龄应当相差40周岁以上')
                this.isPass = false
                return false
              }
            }

            if (age > 14) {
              this.$confirm({
                title: '年龄大于14周岁，是否继续？',
                onOk: () => {
                  this.submitData(url, data, val, text)
                },
                onCancel: () => { }
              })
            } else {
              this.submitData(url, data, val, text)
            }
          } else {
            // 导航切换
            this.isPass = false
            this.$message.error('校验不通过，无法提交，请再次检查！')
          }
        }, 300)
      })

      // })
    },
    // 表单接口提交
    submitData (url, data, val, text) {
      let abc = true
      if (this.additionalYesOrNo == '1' && val == '1') {
        if (this.syCardFileList.length == 0) {
          this.nowkey = '5'
          abc = false
          this.$message.error('收养登记证必填，请上传收养登记证照片。')
        }
      }
      if (this.childtype == '4' && val == '1' && this.isshowFile) {
        if (this.fileList.length == 0) {
          this.nowkey = '5'
          abc = false
          this.$message.error('送样人相关证件必填，请上传送样人相关证件。')
        }
      }
      if (abc) {
        this.post(url, data, true).then((res) => {
          this.isPass = false
          if (res.errors == null) {
            this.$message.success(text)
            if (val && this.additionalYesOrNo == 0) {
              this.printshow = true
              this.printId = res.data.data
              this.basedisabled = true
              this.filedisabled = true
              this.isZY = false
            } else {
              this.backs()
            }
          } else {
            const errlist = ['E0002', 'E0003', 'E0004']
            if (res.errors.length > 0) {
              if (errlist.includes(res.errors[0].errorCode)) {
                this.$confirm({
                  title: res.errors[0].msg,
                  onOk: () => { }
                })
              }
            }
          }
        })
      } else {
        this.isPass = false
      }
    },
    printOk () {
      this.isprint = true
      this.printshow = false
      this.isPrint = false
      this.nowkey = '6'
      this.typedisabled = true
      this.getQz()
      this.DY = true
    },
    async getQz () {
      // 打印时处理登记字号收否显示
      if (!this.id) {
        this.isZY = false
        return false
      } else {
        this.isZY = true
      }
      const params = {
        id: this.id
      }
      const data = await this.post('/adoption/getAdoptioPhoto', params)
      this.adInformationnoteFrom.setFieldsValue({
        adoptionRegistionCertificateNumber:
          data.data.data.adoptionRegistionCertificateNumber
      })
    },
    printno () {
      this.printshow = false
      this.backs()
    },
    backs () {
      this.adoptedFrom.resetFields()
      this.heathval = '0'
      this.$router.go(-1)
    },
    // DISABILITYLEVEL
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
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
    // 健康狀況
    async getheathio () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
    },
    onChange (e) {
      this.adoptedFrom.setFieldsValue({
        healthSecondLevel: [],
        healthSecondLevelOther: ''
      })
      this.serioushval = false
      this.heathval = e.target.value
      this.getdisabiliytype(e.target.value)
      this.setHeight('one', 'oneout')
    },
    seriousillnesschange (val) {
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
            this.adoptedFrom.setFieldsValue({
              healthSecondLevel: arr
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
            this.adoptedFrom.setFieldsValue({
              healthSecondLevel: arr
            })
          })
        }
      }
      this.setHeight('one', 'oneout')
    },
    // 清空错误信息
    clearErrorInfo (formName, flag) {
      // formName为form名字，flag为区分男方（true）、女方（false）标识
      const errorObj = this[formName].getFieldsError()
      for (const j in errorObj) {
        if (flag ? !j.includes('copy') : j.includes('copy')) {
          this[formName].setFields({
            [j]: {
              value: this[formName].getFieldsValue()[j],
              errors: null
            }
          })
        }
      }
    },
    doIsshowYJ (val) {
      const myDate = new Date()
      const age = myDate.getFullYear() - val.birthday.split('-')[0]
      this.istenyear = age > 8
    }
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
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    },
    showfive (val) {
      this.setHeight('five', 'fiveout', !val)
    },
    adoptionTabKey () {
      this.setHeight('two', 'twoout', !this.showtwo)
      // this.cptAdoptorFrom.resetFields()
    },
    sendTabKey () {
      this.setHeight('three', 'threeout', !this.showthree)
    }
  }
}
</script>

<style scoped lang="less">
.preservation {
  margin-left: 20px;
}
.spinning {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
}

/deep/.ant-spin-dot {
  position: absolute;
  top: 28%;
}
.fromwid {
  width: 424px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.selectwid {
  width: 324px;
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
</style>
