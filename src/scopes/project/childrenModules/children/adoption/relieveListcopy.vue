<template>
  <div class="conts tadrawer"
       style=" background: #eff1f400;">

    <ta-form layout="inline"
             :autoFormCreate="(searchDataForm)=>{this.searchDataForm = searchDataForm}">
      <ta-form-item label="登记机关"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    fieldDecoratorId="orgId"
                    :require="{message:'请输入登记机关!'}">
        <ta-select allowClear
                   showSearch
                   :filterOption="filterOption"
                   :placeholder=" '请选择登记机关'">
          <ta-select-option v-for="item in orgList"
                            :key="item.orgId"
                            :value="item.orgId">{{item.orgName}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="儿童姓名"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    :require="{message:'请输入儿童姓名!'}"
                    fieldDecoratorId="childName">
        <ta-input :placeholder=" '请输入儿童姓名'" />
      </ta-form-item>
      <ta-form-item label="儿童身份证号"
                    class="spilwid"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    :require="{message:'请输入儿童身份证号!'}"
                    fieldDecoratorId="idCard">
        <ta-input :placeholder=" '请输入儿童身份证号'" />
      </ta-form-item>
      <ta-form-item label="收养人姓名"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    :require="{message:'请输入收养人姓名!'}"
                    fieldDecoratorId="adopterName">
        <ta-input :placeholder=" '请输入收养人姓名'" />
      </ta-form-item>
      <ta-form-item label="收养人身份证号"
                    class="spilwid"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    :require="{message:'请输入收养人身份证号!'}"
                    fieldDecoratorId="adopterIdCard">
        <ta-input :placeholder=" '请输入收养人身份证号'" />
      </ta-form-item>

      <ta-form-item label="收养登记字号"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    :require="{message:'请输入收养登记字号!'}"
                    fieldDecoratorId="registionNumber">
        <ta-input :placeholder=" '请输入收养登记字号'" />
      </ta-form-item>

      <ta-form-item>

        <ta-button type="primary"
                   @click="searchData">查询</ta-button>
        <!-- <ta-button
                     @click="resetFrom">重置</ta-button> -->

      </ta-form-item>

    </ta-form>
    <ta-divider />

    <div :hidden="!hiddens"
         style="position: absolute;  left: 43%;">
      <p style="text-align: center;  font-size: 24px;  opacity: 0.3;">暂无收养信息哦！</p>
    </div>
    <!-- @click="allvalidator" -->
    <ta-tabs class="contin"
             :hidden="hiddens"
             :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="基本信息"
                   key="1">
        <!-- <ta-anchor class="md" :offsetTop="100">
          <ta-anchor-link href="#anchorpoint_a" title="被收养人信息" />
          <ta-anchor-link href="#anchorpoint_b" title="收养人信息" />
          <ta-anchor-link v-if="childtype!=8" href="#anchorpoint_c" title="送养人信息" />
          <ta-anchor-link v-if="childtype==3" href="#anchorpoint_e" title="生父母信息" />
          <ta-anchor-link href="#anchorpoint_d" title="情况说明" />
        </ta-anchor> -->

        <ta-form :hidden="hiddens"
                 :autoFormCreate="(form)=>{this.form = form}"
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

        <div :hidden='hiddens'
             ref="oneout"
             class="mars">
          <Title id="anchorpoint_a"
                 title="被收养人信息"
                 :show.sync="showone"></Title>
          <ta-form layout="horizontal"
                   ref="one"
                   :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
            <CptAdopted :additionalYesOrNo="additionalYesOrNo"
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
                        @setFrom="setFrom"></CptAdopted>
          </ta-form>
        </div>

        <div :hidden='hiddens'
             ref="twoout"
             class="mars">
          <Title id="anchorpoint_b"
                 title="收养人信息"
                 :show.sync="showtwo"></Title>
          <ta-tabs class="fromcom"
                   @change="chs"
                   :activeKey="adoptionTabKey"
                   type="card"
                   ref="two">
            <ta-tab-pane tab="男方单独收养"
                         key="1">
              <ta-form layout="horizontal"
                       :autoFormCreate="(cptAdoptorFrom1)=>{this.cptAdoptorFrom1 = cptAdoptorFrom1}">
                <AdoptionAlone @setdate="setdate"
                               :basedisabled="basedisabled"
                               @setaddress="setaddress2"
                               @setheath="setheath2"
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
                         key="2">
              <ta-form layout="horizontal"
                       :autoFormCreate="(cptAdoptorFrom2)=>{this.cptAdoptorFrom2 = cptAdoptorFrom2}">
                <AdoptionAlone @setheath="setheath2"
                               :heathmodel="heathmodel2"
                               @setdate="setdate"
                               :basedisabled="basedisabled"
                               @setaddress="setaddress2"
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
                         key="3">
              <ta-form layout="horizontal"
                       :autoFormCreate="(cptAdoptorFrom3)=>{this.cptAdoptorFrom3 = cptAdoptorFrom3}">
                <JointAdoption @mensetheath="mensetheath"
                               @womensetheath="womensetheath"
                               :menheathmodel="menheathmodel"
                               :womenheathmodel="womenheathmodel"
                               @setmendate="setmendate"
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
                               :issameaddress.sync='issameaddress1'></JointAdoption>
              </ta-form>
            </ta-tab-pane>
          </ta-tabs>
          <!-- </ta-form> -->
        </div>

        <div :hidden='hiddens'
             ref="threeout"
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
                         :mechanismList="mechanismList"
                         @mechanismchange="mechanismchange"
                         :basedisabled="basedisabled"
                         :relationsadopteesList="relationsadopteesList"
                         :disabled="disabled"></FiveRaise>
            </ta-form>
          </template>
          <template v-else>
            <ta-tabs class="fromcom"
                     @change="maintancechange"
                     :activeKey="sendTabKey"
                     type="card"
                     ref="three">
              <ta-tab-pane tab="男方单独送养"
                           key="1">
                <ta-form layout="horizontal"
                         :autoFormCreate="(maintenanceFrom1)=>{this.maintenanceFrom1 = maintenanceFrom1}">
                  <AdoptionAlone @setdate="setsenddate"
                                 :basedisabled="basedisabled"
                                 @setaddress="setaddress3"
                                 :addressmodel="addressmodel3"
                                 @setheath="setheath3"
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
                           key="2">
                <ta-form layout="horizontal"
                         :autoFormCreate="(maintenanceFrom2)=>{this.maintenanceFrom2 = maintenanceFrom2}">
                  <AdoptionAlone @setheath="setheath3"
                                 :heathmodel="heathmodel3"
                                 @setdate="setsenddate"
                                 :basedisabled="basedisabled"
                                 @setaddress="setaddress3"
                                 :addressmodel="addressmodel3"
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
                                 :familyincomeList="familyincomeList"></AdoptionAlone>
                </ta-form>
              </ta-tab-pane>
              <ta-tab-pane tab="夫妻双方共同送养"
                           key="3">
                <ta-form layout="horizontal"
                         :autoFormCreate="(maintenanceFrom3)=>{this.maintenanceFrom3 = maintenanceFrom3}">
                  <JointAdoption :issameaddress.sync='issameaddress2'
                                 @mensetheath="mensetheath2"
                                 @womensetheath="womensetheath2"
                                 :menheathmodel="menheathmodel2"
                                 :womenheathmodel="womenheathmodel2"
                                 @setmendate="setsendmendate"
                                 :basedisabled="basedisabled"
                                 @mensetaddress="mensetaddress2"
                                 @womensetaddress="womensetaddress2"
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
        <!-- <div ref="fiveout"
             class="mars"
             v-if="childtype==3">
          <Title id="anchorpoint_e"
                 title="生父母信息"
                 :show.sync="showfive"></Title>
          <ta-form layout="horizontal"
                   ref="five"
                   :autoFormCreate="(parentFrom)=>{this.parentFrom = parentFrom}">
            <NotcptAdoptor :issameaddress.sync='issameaddress3'
                           @parentmensetheath="parentmensetheath"
                           @parentwomensetheath="parentwomensetheath"
                           :parentmenheathmodel="parentmenheathmodel"
                           :parentwomenheathmodel="parentwomenheathmodel"
                           @setmendate="setparentdate"
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
                           :idcardTypeList="idcardTypeList"></NotcptAdoptor>
          </ta-form>
        </div> -->

      </ta-tab-pane>
      <!-- <ta-tab-pane tab="家庭子女信息" key="2">
        <Family
          :basedisabled="basedisabled"
          :adoptorChildrenVos="adoptorChildrenVos"
          @chaadoptorChildrenVos="chaadoptorChildrenVos"
          :eelationsApplicantsList="eelationsApplicantsList"
          :sexList="sexList"
          :cultureList="cultureList"
          :nationList="nationList"
          :nationalityList="nationalityList"
          :healthList="healthList"
          :occupattioList="occupattioList"
        ></Family>
      </ta-tab-pane> -->
      <ta-tab-pane tab="笔录信息"
                   key="2">
        <Record :basedisabled="basedisabled"
                :notesRecordVos="notesRecordVos"
                @chaadoptorChildrenVos="chaadoptorChildrenVos"></Record>
      </ta-tab-pane>

      <ta-tab-pane tab="文件上传"
                   key="5">
        <FileUpload :fileList.sync="fileList"
                    :filedisabled="filedisabled"
                    :adoptionfileList.sync="adoptionfileList"
                    :adopterfileList.sync="adopterfileList"></FileUpload>
      </ta-tab-pane>

      <!-- v-if='isprint' -->
      <ta-tab-pane tab="打印"
                   key="6"
                   v-if="isprint">
        <!-- //******************** */ -->
        <Printing :printlist="printlist"
                  :printId="printId"></Printing>
      </ta-tab-pane>
    </ta-tabs>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <ta-button v-if="outDo"
                 type="primary"
                 class="preservation"
                 @click="okSubmit">提交</ta-button>
      <!-- <ta-button type="primary" class="preservation" @click="backs">返回</ta-button> -->
      <template hidden
                v-if="handleType==2">
        <!-- <ta-button type="primary" class="preservation" @click="submit('0')" v-if="handleType!=0">暂存</ta-button> -->
        <ta-button hidden
                   type="primary"
                   class="preservation"
                   @click="completionsubmit">提交</ta-button>
      </template>
      <template hidden
                v-else>
        <ta-button hidden
                   type="primary"
                   class="preservation temporarystorage"
                   @click.stop="submit('0')"
                   v-if="handleType!=0">暂存</ta-button>
        <ta-button hidden
                   type="primary"
                   class="preservation"
                   @click.stop="submit('1')"
                   v-if="handleType!=0">提交</ta-button>
      </template>
    </div>
    <ta-modal title="提交成功"
              :visible="printshow"
              @ok="printOk"
              okText="打印"
              @cancel="printno">
      <p><b>收养登记提交成功！是否需要打印相关材料？</b></p>
      <p>后续打印请到收养业务查询页面打印。</p>
    </ta-modal>
    <ta-modal title="查询结果"
              :visible="searchTip"
              @ok="searchOk"
              @cancel="searchno">
      <p>若无打印需求，之后请到收养业务查询页面打印相关表单</p>
      <ta-table :columns="tableColumns"
                :dataSource="tableData"
                :haveSn="true">
      </ta-table>
    </ta-modal>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import CptAdopted from './components/cptAdopted'
import CptAdoptor from './components/cptAdoptor'
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
import { setTimeout } from 'timers'
import moment from 'moment'
const tableColumns = [
  {
    title: '姓名',
    dataIndex: 'name'
  }, {
    title: '年龄',
    dataIndex: 'age'
  }, {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex'
  }, {
    title: '地址',
    dataIndex: 'address'
  }]

const tableData = [{
  key: '1',
  sex: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park'
}, {
  key: '2',
  sex: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park'
}, {
  key: '3',
  sex: '0',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park'
}]

export default {
  name: 'register',
  components: {
    Title,
    CptAdopted,
    CptAdoptor,
    FiveRaise,
    AdInformationnote,
    Family,
    Record,
    Investigation,
    FileUpload,
    Printing,
    NotcptAdoptor,
    AdoptionAlone,
    JointAdoption
  },
  data () {
    return {
      outDo: true, // 按钮
      orgList: [],
      tableColumns,
      tableData,
      hiddens: true,
      searchTip: false,
      //
      current: ['1'],
      menulist: [
        { title: '基本信息', key: '1' },
        { title: '家庭子女信息', key: '2' },
        { title: '笔录信息', key: '3' },
        { title: '调查信息', key: '4' },
        { title: '文件上传', key: '5' },
        { title: '打印', key: '6' }
      ],
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
      childtype: '1',
      // 家庭信息数据
      adoptorChildrenVos: [],
      // 笔录信息
      notesRecordVos: [],
      // 調查信息
      surveyRecordVos: [],
      fileList: [],
      // 文件上传
      adoptionfileList: [],
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
      addressmodel: [],
      addressmodel2: [],
      addressmodel3: [],
      parentmenmodel: [],
      parentwomenmodel: [],
      mechanismList: [],
      typesadopteestatusList: [],
      // 是否补录
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
      disabled: false,
      welfareInstitutionId: '',
      basedisabled: false,
      filedisabled: false,
      handleType: 1,
      istenyear: false,
      typedisabled: false,
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
        }
      ],
      printId: '',
      imgfilelist: [
        // {
        //   name: 'aa.png',
        //   response: {
        //     code: 200,
        //     data: {
        //       data: {
        //         fileid: 'fbeeb6dc74ed438ea45421e6ac4647c4',
        //         filename: 'tongji.png'
        //       }
        //     }
        //   },
        //   status: 'done',
        //   uid: '1111'
        //   // thumbUrl:
        //   //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAABoklEQVQ4T+2UMWgUURCGv39jiogiwSR7hciJWIiIBPuA2ARtLGJhe4hgt3s2Gnsrza4WKQJCCkvBwi6ViI2VAUFQm0ObXQ/MnRwkGG5/2TNCXDVHiFg5zSvmzfdm5n8zqqU28CyLdI49mnaCHbzrif37OJ5Hell9Z+K+z46YKH9DgyVtlv4/wiYTzwViEXMYeJCbeZpaL4MmFzwbiMeC0b4434704rewQTYBiwq4bPiC+ShxyvC+gAYFJwKxBKzbzH1qauVH1j9ntuCxWsA74IjNymbB1c9vyaZOMi9xGzOCEJAXfS60b+jV9vJ/KTNMHAG9POYhqBRnYFP3fEYBy4IxYDaL1QoTX8H08qae7tiz0hkmbiBO58VWv6559NAxDnRvaW3gT12erTzS9HBY6ieCSxtmvBOrU1X038HCxHcQ1ymYyZt6HVYyqyV+DhzNYtWHlhmmTgRR30y3Y61WYWHqUr16Hmn8P+z71vi7PauqmfgR4uLXDeprN9WtqllL3AI+ZLFmhn7a3a63wWwaOoLV3QZvv2/oaWsk9sIZxMp0vwHE23QCU2J2vQAAAABJRU5ErkJggg=='
        // }
      ],
      isupload: true,
      issameaddress1: '0',
      issameaddress2: '0',
      issameaddress3: '0',
      validatesRegisters: []

    }
  },
  created () { },
  activated () {
    // 初始化数据
    // this.loaddata()

    // this.additionalYesOrNo = this.$route.params.additionalYesOrNo
    if (this.$route.params.id) {
      this.typedisabled = true
      this.id = this.$route.params.id
      this.handleType = this.$route.params.handleType
      if (this.$route.params.handleType == 0) {
        this.basedisabled = true
        this.filedisabled = true
        this.disabled = true
      } else if (this.$route.params.handleType == 1) {
        this.basedisabled = false
        this.filedisabled = false
      } else {
        this.basedisabled = true
        this.filedisabled = false
        this.nowkey = '5'
      }
      // this.getDetails()
      this.getimglist()
    } else {
      this.typedisabled = false
    }
    // this.$nextTick(() => {//**************************************** */
    //   this.setHeight('one', 'oneout')
    //   this.setHeight('two', 'twoout')
    //   this.setHeight('four', 'fourout')
    //   if (this.childtype == 3) {
    //     this.setHeight('five', 'fiveout')
    //   }
    //   if (this.childtype != 8) {
    //     this.setHeight('three', 'threeout')
    //   }
    //   // this.setHeight('five', 'fiveout')
    // })
  },
  mounted () {
    this.getchildtype()
    this.adoptedFrom.setFieldsValue({
      identityCategory: '1'
    })
    this.getsex()
    this.getnation()
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
    this.orginfo()
  },
  methods: {
    async okSubmit () {
      // validatesRegisters
      this.isvalidator = false
      // this.$nextTick(async () => {
      let isok = true
      this.submitYesOrNo = val
      if (this.childtype == 3) {
        // this.parentFrom.validateFields((err, values) => {
        //   if (err) {
        //     if (val == 0) {
        //       for (let k in err) {
        //         if (!this.parentFrom.getFieldsValue()[k]) {
        //           this.parentFrom.resetFields(k)
        //         } else {
        //           isok = false
        //         }
        //       }
        //     } else {
        //       isok = false
        //     }
        //   }
        // })
      }
      // 情况说明
      if (val == 1) {
        this.isupload = this.imgfilelist.length != 0
      } else {
        this.isupload = true
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
        }
      })
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
        }
      })
      // 被收养人信息 isupload
      // if(this.imgfilelist.length==0)
      this.adoptedFrom.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (
                !this.adoptedFrom.getFieldsValue()[k] &&
                (k != 'idCard' && k != 'name')
              ) {
                this.adoptedFrom.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            isok = false
          }
        }
      })
      if (isok) {
        const data = this.processingData()
        // 新添加字段
        data.validatesRegisters = this.validatesRegisters
        let url = ''
        let text = ''
        if (this.id) {
          // 编辑
          url = val == 0 ? '/adoption/tempupdate' : '/adoption/update'
          data.bizKey = this.id
          text = '编辑成功'
        } else {
          // 新增
          url = val == 0 ? '/adoption/tempregister' : '/adoption/register'
          text = '新增成功'
        }
        const res = await this.post(url, data, true)
        if (res.errors == null) {
          this.$message.success(text)
          if (val == 1 && this.additionalYesOrNo == 0) {
            this.printshow = true
            this.printId = res.data.data
          } else {
            this.backs()
          }
        } else {
          const errlist = ['E0001', 'E0002', 'E0003', 'E0004']
          if (res.errors.length > 0) {
            if (errlist.includes(res.errors[0].errorCode)) {
              this.validatesRegisters.push(res.errors[0].errorCode)
              this.$confirm({
                title: res.errors[0].msg,
                onOk: () => {
                  this.submit(val)
                },
                onCancel: () => {
                }
              })
            }
          }
        }
      } else {
        // 导航切换
        // this.nowkey = '1'
        this.$message.error(
          '校验不通过，无法提交，请再次检查!'
        )
      }
      // })
    },
    async orginfo () { // 登记机构列表
      const orgdata = await this.post('/org/queryOrg')
      this.orgList = orgdata.data.orgList
    },
    // 根据输入项进行筛选
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    async searchData () {
      const childName = this.searchDataForm.getFieldValue('childName')
      const orgId = this.searchDataForm.getFieldValue('orgId')
      const idCard = this.searchDataForm.getFieldValue('idCard')
      const adopterName = this.searchDataForm.getFieldValue('adopterName')
      const registionNumber = this.searchDataForm.getFieldValue('registionNumber')
      const adopterIdCard = this.searchDataForm.getFieldValue('adopterIdCard')
      const fromData = { childName, orgId, idCard, adopterName, registionNumber, adopterIdCard }
      const fromDatas = [childName, orgId, idCard, adopterName, registionNumber, adopterIdCard]
      // this.hiddens = false
      this.searchDataForm.validateFields(async (err, values) => {
        if (!err) {
          const res = await this.post('/adoption/queryRelieveReal', fromData)
          if (!res.errors) {
            this.hiddens = false
            this.loaddata()

            // this.getimglist()
            this.getDetails(res.data.data)
          }
        } else {
          this.$message.error('请完整填写信息后查询！')
        }
      })
    },
    searchOk () {
      this.searchTip = false
      const dataThrees = this.tableData
    },
    searchno () {
      this.searchTip = false
    },
    loaddata () {
      this.validatesRegisters = []
      this.issameaddress1 = '0'
      this.issameaddress2 = '0'
      this.issameaddress3 = '0'
      this.isupload = true
      this.imgfilelist = []
      // this.typeadoption = '1'
      // this.maintenanceType = '1'
      this.childtype = '1'
      this.basedisabled = false
      this.filedisabled = false
      this.handleType = 1
      this.nowkey = '1'
      this.id = ''
      this.applytype = '1'
      this.ishide = true
      this.welfareInstitutionId = ''
      this.adoptorChildrenVos = []
      this.notesRecordVos = []
      this.surveyRecordVos = []
      this.fileList = []
      this.adoptionfileList = []
      this.adopterfileList = []
      this.heathmodel = []
      this.heathmodel2 = []
      this.childtype = '1'
      this.adoptionTabKey = '1'
      this.sendTabKey = '1'
      this.printId = ''
      this.nowformname = 'cptAdoptorFrom1'
      this.nowmaintenanceFrom = 'maintenanceFrom1'
      this.isprint = false
      this.isvalidator = false
      this.printshow = false
      this.fiveRaiseFrom.resetFields()
      this[this.nowformname].resetFields()
      this.adoptedFrom.resetFields()
      this.adoptedFrom.setFieldsValue({
        identityCategory: this.childtype
      })
    },
    setdate (val) {
      if (!this.isvalidator) {
        return false
      }
      this[this.nowformname].setFieldsValue({
        birthday: moment(val.birth)
      })
    },
    setsenddate (val) {
      if (!this.isvalidator) {
        return false
      }
      this[this.nowmaintenanceFrom].setFieldsValue({
        birthday: moment(val.birth)
      })
    },
    setsendmendate (val) {
      if (!this.isvalidator) {
        return false
      }
      const key = val.key
      if (key.includes('copy')) {
        this[this.nowmaintenanceFrom].setFieldsValue({
          copy_birthday: moment(val.birth)
        })
      } else {
        this[this.nowmaintenanceFrom].setFieldsValue({
          birthday: moment(val.birth)
        })
      }
    },
    setmendate (val) {
      if (!this.isvalidator) {
        return false
      }
      const key = val.key
      if (key.includes('copy')) {
        this[this.nowformname].setFieldsValue({
          copy_birthday: moment(val.birth)
        })
      } else {
        this[this.nowformname].setFieldsValue({
          birthday: moment(val.birth)
        })
      }
    },
    setheath () {
      this.adoptedFrom.setFieldsValue({
        healthCondition: this.heathmodel
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
          this[tablename].splice(e, 1, val)
        } else {
          this[tablename].splice(e, 1)
          // tablename 组件对应数据名字
        }
      } else {
        this[tablename] = val
      }
    },
    async mechanismchange (val) {
      const Fromdata = await this.getsearchmechanismList(val)
      const data = Fromdata.data.data[0]
      for (var key in data) {
        if (key == 'address') {
          this.fiveRaiseFrom.setFieldsValue({
            welfareInstitutionAddress: data[key]
          })
        }
        this.fiveRaiseFrom.setFieldsValue({
          [key]: data[key]
        })
      }
    },
    // 身份证变化引发的赋值
    setFrom (val, dates) {
      if (!this.isvalidator) {
        return false
      }
      if (val.name) {
        const value = val.idCard
        for (var k in val) {
          if (val[k]) {
            if (k == 'adoptionAgencyVo') {
              if (this.childtype <= 2) {
                if (val.inputEnabled == 1) {
                  this.disabled = false
                } else {
                  this.disabled = true
                }

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
                  [k]: this.moment(val[k], 'YYYY-MM-DD')
                })
              } else if (k == 'censusRegisterPro') {
                this.addressmodel = [
                  val.censusRegisterPro,
                  val.censusRegisterCity,
                  val.censusRegisterCounty
                ]
              } else {
                this.adoptedFrom.setFieldsValue({
                  [k]: val[k]
                })
              }
            }
          }
        }
      } else {
        this.disabled = false
        const data = this.adoptedFrom.getFieldsValue()
        const keylist = Object.keys(data)
        const arrlist = []
        keylist.map(item => {
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
      const dateobj = this.go(dates, dates.length, this, null)
      this.adoptedFrom.setFieldsValue({
        birthday: moment(dateobj.birth),
        sex: dateobj.sex
      })
      if (dateobj.age >= 10) {
        this.istenyear = true
      } else {
        this.istenyear = false
      }
      // if() istenyear
      this.setHeight('one', 'oneout')
    },
    // 机构类表 welfareOrgManagement/queryListByOrgId
    async getmechanismList () {
      const data = await this.post('welfareOrgManagement/queryListByOrgId')
      this.mechanismList = data.data.data
    },
    // 查询机构类表 welfareOrgManagement/queryListByOrgId
    async getsearchmechanismList (val) {
      const params = {
        id: val
      }
      const data = await this.post(
        'welfareOrgManagement/queryListByOrgId',
        params
      )
      return data
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
    // 送样tabb切换
    maintancechange (val) {
      // this.maintenanceType = val
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
      // this.typeadoption = val
      this.adoptionTabKey = val
      this.nowformname = 'cptAdoptorFrom' + val
      if (!this.typedisabled) {
        this.$nextTick(() => {
          this[this.nowformname].resetFields()
        })
      }
    },
    moment,
    // 获取收养类别 ADOPTIONCATEGORY
    async getchildtype () {
      const data = await this.getDictionaries('ADOPTIONCATEGORY')
      this.adoptionlist = data
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
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
    // 收养类别change
    selectchange (val) {
      this.istenyear = false
      this.adoptionTabKey = '1'
      this.sendTabKey = '1'
      this.$nextTick(() => {
        if (this.childtype != 8) {
          if (this.childtype <= 2) {
            this.fiveRaiseFrom.resetFields()
          } else {
            this.nowmaintenanceFrom = 'maintenanceFrom1'
            this[this.nowmaintenanceFrom].resetFields()
          }
          this.setHeight('three', 'threeout', !this.showthree)
        }
        this.setHeight('one', 'oneout', !this.showone)
        if (this.childtype == 3) {
          // this.parentFrom.resetFields()
          // this.$nextTick(() => {
          //   this.setHeight('five', 'fiveout')
          // })
        }

        this.adoptedFrom.resetFields()
        if (this.childtype == 6) {
          this.adoptedFrom.setFieldsValue({
            identityCategory: null
          })
        } else {
          this.adoptedFrom.setFieldsValue({
            identityCategory: this.childtype
          })
        }

        this.nowformname = 'cptAdoptorFrom1'
        this[this.nowformname].resetFields()

        this.nowmaintenanceFrom = 'maintenanceFrom1'
        this.adInformationnoteFrom.resetFields()
      })
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
        mendata.censusRegisterPro = mendata.address_Linkage[0]
        mendata.censusRegisterCity = mendata.address_Linkage[1]
        mendata.censusRegisterCounty = mendata.address_Linkage[2]
        delete mendata.address_Linkage
      }
      if (womandata.address_Linkage) {
        womandata.censusRegisterPro = womandata.address_Linkage[0]
        womandata.censusRegisterCity = womandata.address_Linkage[1]
        womandata.censusRegisterCounty = womandata.address_Linkage[2]
        delete womandata.address_Linkage
      } else {
        womandata.censusRegisterPro = mendata.censusRegisterPro
        womandata.censusRegisterCity = mendata.censusRegisterCity
        womandata.censusRegisterCounty = mendata.censusRegisterCounty
        womandata.censusRegisterDetail = mendata.censusRegisterDetail
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
        const registrationAdoptionVo = data.data.data
        if (registrationAdoptionVo.imagefileList) {
          const imgobj = JSON.parse(registrationAdoptionVo.imagefileList)
          imgobj[0].thumbUrl = 'data:image/png;base64,' + imgobj[0].thumbUrl
          this.imgfilelist = imgobj
        }
      }
    },
    // 获取详情
    async getDetails (values) {
      let obj = []
      if (!values && this.id) {
        const params = {
          id: this.id
        }
        obj = data.data.data
      } else {
        obj = values
      }

      // 情况说明赋值
      const registrationAdoptionVo = obj.registrationAdoptionVo
      // 儿童类别
      this.childtype = registrationAdoptionVo.adoptionCategory
      // 被收养人赋值
      const adopteeVo = obj.adopteeVo
      adopteeVo.birthday = moment(adopteeVo.birthday)
      if (adopteeVo.enterDate) {
        adopteeVo.enterDate = moment(adopteeVo.enterDate)
      }
      if (adopteeVo.publishDate) {
        adopteeVo.publishDate = moment(adopteeVo.publishDate)
      }
      if (adopteeVo.pickupDate) {
        adopteeVo.pickupDate = moment(adopteeVo.pickupDate)
      }

      const dateobj = this.go(
        adopteeVo.idCard,
        adopteeVo.idCard ? adopteeVo.idCard.length : 0,
        this,
        null
      )
      if (dateobj.age > 10) {
        this.istenyear = true
      } else {
        this.istenyear = false
      }

      // 健康狀況賦值
      if (adopteeVo.healthCondition) {
        this.heathmodel = adopteeVo.healthCondition.split(',')
        adopteeVo.healthCondition = adopteeVo.healthCondition.split(',')
      }
      // 健康状况
      // registerAdoptionVo.healthCondition = registerAdoptionVo.healthCondition.join(',')
      this.addressmodel = [
        adopteeVo.censusRegisterPro,
        adopteeVo.censusRegisterCity,
        adopteeVo.censusRegisterCounty
      ]
      this.$nextTick(() => {
        this.adoptedFrom.setFieldsValue(adopteeVo)
      })

      // 收养人信息
      const adoptorVos = obj.adoptorVos
      adoptorVos.map(item => {
        if (item.birthday) {
          item.birthday = moment(item.birthday)
        }
      })
      let adoptorVo = {}
      if (adoptorVos.length > 1) {
        // 主申请人
        if (adoptorVos[0].keyMember == 1) {
          this.applytype = '1'
        } else {
        }
        this.adoptionTabKey = '3'
        this.nowformname = 'cptAdoptorFrom' + 3
        this.issameaddress1 = adoptorVos[0].sameAddress
        this.$nextTick(() => {
          adoptorVo = this.detailobj(adoptorVos)
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
            adoptorVo.censusRegisterPro,
            adoptorVo.censusRegisterCity,
            adoptorVo.censusRegisterCounty
          ]
          if (this.issameaddress1 != 1) {
            this.womenaddressmodel = [
              adoptorVo.copy_censusRegisterPro,
              adoptorVo.copy_censusRegisterCity,
              adoptorVo.copy_censusRegisterCounty
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
          // 健康狀況賦值
          if (adoptorVo.healthCondition) {
            this.heathmodel2 = adoptorVo.healthCondition.split(',')
            adoptorVo.healthCondition = adoptorVo.healthCondition.split(',')
          }
          this.addressmodel2 = [
            adoptorVo.censusRegisterPro,
            adoptorVo.censusRegisterCity,
            adoptorVo.censusRegisterCounty
          ]
        })
      }
      // 家庭年收入
      adoptorVo.familyIncome = obj.familyIncome

      this.$nextTick(() => {
        this[this.nowformname].setFieldsValue(adoptorVo)
      })
      // 送样信息处理
      if (this.childtype != 8) {
        if (this.childtype <= 2) {
          const adoptionAgencyVo = obj.adoptionAgencyVo
          this.welfareInstitutionId = obj.adoptionAgencyVo.welfareInstitutionId
          this.fiveRaiseFrom.setFieldsValue(adoptionAgencyVo)
          // 送样机构
        } else {
          // 送养人
          let placingOutPersonVo = {}
          const placingOutPersonVos = obj.placingOutPersonVos
          placingOutPersonVos.map(item => {
            if (item.birthday) {
              item.birthday = moment(item.birthday)
            }
          })
          if (placingOutPersonVos.length > 1) {
            this.sendTabKey = '3'
            this.nowmaintenanceFrom = 'maintenanceFrom3'

            this.issameaddress2 = placingOutPersonVos[0].sameAddress
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
                placingOutPersonVo.censusRegisterPro,
                placingOutPersonVo.censusRegisterCity,
                placingOutPersonVo.censusRegisterCounty
              ]
              if (this.issameaddress2 != 1) {
                this.womenaddressmodel2 = [
                  placingOutPersonVo.copy_censusRegisterPro,
                  placingOutPersonVo.copy_censusRegisterCity,
                  placingOutPersonVo.copy_censusRegisterCounty
                ]
              }
            })
          } else {
            placingOutPersonVos[0].sex == 1
              ? (this.sendTabKey = '1')
              : (this.sendTabKey = '2')
            placingOutPersonVos[0].sex == 1
              ? (this.nowmaintenanceFrom = 'maintenanceFrom' + 1)
              : (this.nowmaintenanceFrom = 'maintenanceFrom' + 2)
            placingOutPersonVo = placingOutPersonVos[0]
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
                placingOutPersonVo.censusRegisterPro,
                placingOutPersonVo.censusRegisterCity,
                placingOutPersonVo.censusRegisterCounty
              ]
            })
          }
          this.$nextTick(() => {
            this[this.nowmaintenanceFrom].setFieldsValue(placingOutPersonVo)
          })
        }
      }
      // 生父母 parentFrom
      if (this.childtype == 3) {
        const parentsVos = obj.parentsVos
        parentsVos.map(item => {
          if (item.birthday) {
            item.birthday = moment(item.birthday)
          }
        })
        let parentsVo = {}
        this.issameaddress3 = parentsVos[0].sameAddress
        this.$nextTick(() => {
          parentsVo = this.detailobj(parentsVos)
          if (parentsVo.healthCondition) {
            this.parentmenheathmodel = parentsVo.healthCondition.split(',')
            parentsVo.healthCondition = parentsVo.healthCondition.split(',')
          }
          if (parentsVo.copy_healthCondition.split) {
            this.parentwomenheathmodel = parentsVo.copy_healthCondition.split(
              ','
            )
            parentsVo.copy_healthCondition = parentsVo.copy_healthCondition.split(
              ','
            )
          }

          this.parentmenmodel = [
            parentsVo.censusRegisterPro,
            parentsVo.censusRegisterCity,
            parentsVo.censusRegisterCounty
          ]
          if (this.issameaddress3 != 1) {
            this.parentwomenmodel = [
              parentsVo.copy_censusRegisterPro,
              parentsVo.copy_censusRegisterCity,
              parentsVo.copy_censusRegisterCounty
            ]
          }
        })
        // parentFrom
        // this.$nextTick(() => {
        //   this.parentFrom.setFieldsValue(parentsVo)
        // })
      }

      // 情况说明
      registrationAdoptionVo.registerDate = moment(
        registrationAdoptionVo.registerDate
      )
      this.adInformationnoteFrom.setFieldsValue(registrationAdoptionVo)

      // 家庭子女信息
      this.adoptorChildrenVos = obj.adoptorChildrenVos || []

      // 笔录信息
      this.notesRecordVos = obj.notesRecordVos
      // 调查信息
      this.surveyRecordVos = obj.surveyRecordVos
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        // this.setHeight('three', 'threeout')
        this.setHeight('four', 'fourout')
        if (this.childtype == 3) {
          this.setHeight('five', 'fiveout')
        }
        if (this.childtype != 8) {
          this.setHeight('three', 'threeout')
        }
      })

      // 文件信息 filePathVos
      const filePathVos = JSON.parse(obj.filePathVos)
      filePathVos.map(item => {
        if (item.busiType == '1') {
          this.fileList.push(item)
        } else if (item.busiType == '2') {
          this.adoptionfileList.push(item)
        } else {
          this.adopterfileList.push(item)
        }
      })
      // // 重新设置状态
      // let Fromdata = this.adoptedFrom.getFieldValue('idCard')
      // this.getval(Fromdata)
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
        adopteeVo.censusRegisterPro = adopteeVo.address_Linkage[0]
        adopteeVo.censusRegisterCity = adopteeVo.address_Linkage[1]
        adopteeVo.censusRegisterCounty = adopteeVo.address_Linkage[2]
        delete adopteeVo.address_Linkage
      }

      // 健康状况
      if (adopteeVo.healthCondition) {
        adopteeVo.healthCondition = adopteeVo.healthCondition.join(',')
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
          AdoptorVo.censusRegisterPro = AdoptorVo.address_Linkage[0]
          AdoptorVo.censusRegisterCity = AdoptorVo.address_Linkage[1]
          AdoptorVo.censusRegisterCounty = AdoptorVo.address_Linkage[2]
        }
        delete AdoptorVo.address_Linkage
        adoptorVos.push(AdoptorVo)
      }

      registerAdoptionVo.adoptorVos = adoptorVos
      registerAdoptionVo.familyIncome = familyIncome
      if (this.childtype != 8) {
        // 送样信息处理
        if (this.childtype <= 2) {
          const fromData = Object.assign({}, this.fiveRaiseFrom.getFieldsValue())
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
                PlacingOutPersonVo.address_Linkage[0]
              PlacingOutPersonVo.censusRegisterCity =
                PlacingOutPersonVo.address_Linkage[1]
              PlacingOutPersonVo.censusRegisterCounty =
                PlacingOutPersonVo.address_Linkage[2]
            }
            delete PlacingOutPersonVo.address_Linkage
            placingOutPersonVos.push(PlacingOutPersonVo)
          }
          // 送不养数据
          registerAdoptionVo.placingOutPersonVos = placingOutPersonVos
        }
      }
      // 生父母 parentFrom
      // if (this.childtype == 3) {
      //   let parentsVos = []
      //   let parentsVo = Object.assign({}, this.parentFrom.getFieldsValue())
      //   this.changetime(parentsVo)
      //   parentsVos = this.screeningData(parentsVo)
      //   registerAdoptionVo.parentsVos = parentsVos
      // }

      // 情况说明 adInformationnoteFrom
      let registrationAdoptionVo = {}
      registrationAdoptionVo = Object.assign(
        { adoptionCategory: this.childtype },
        this.adInformationnoteFrom.getFieldsValue()
      )
      if (this.imgfilelist.length > 0) {
        const photoId = this.imgfilelist[0].response.data.data.fileid
        registrationAdoptionVo.photoId = photoId
      }
      this.changetime(registrationAdoptionVo)
      registerAdoptionVo.registrationAdoptionVo = registrationAdoptionVo
      // 文件信息
      const upLoadPathIds = []
      const fileids = [
        ...this.fileList,
        ...this.adoptionfileList,
        ...this.adopterfileList
      ]
      fileids.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      registerAdoptionVo.upLoadPathIds = upLoadPathIds

      // 家庭子女信息
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
        ...this.fileList,
        ...this.adoptionfileList,
        ...this.adopterfileList
      ]
      fileids.map(item => {
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
      // validatesRegisters
      this.isvalidator = false
      // this.$nextTick(async () => {
      let isok = true
      this.submitYesOrNo = val
      if (this.childtype == 3) {
        // this.parentFrom.validateFields((err, values) => {
        //   if (err) {
        //     if (val == 0) {
        //       for (let k in err) {
        //         if (!this.parentFrom.getFieldsValue()[k]) {
        //           this.parentFrom.resetFields(k)
        //         } else {
        //           isok = false
        //         }
        //       }
        //     } else {
        //       isok = false
        //     }
        //   }
        // })
      }
      // 情况说明
      if (val == 1) {
        this.isupload = this.imgfilelist.length != 0
      } else {
        this.isupload = true
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
        }
      })
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
        }
      })
      // 被收养人信息 isupload
      // if(this.imgfilelist.length==0)
      this.adoptedFrom.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (
                !this.adoptedFrom.getFieldsValue()[k] &&
                (k != 'idCard' && k != 'name')
              ) {
                this.adoptedFrom.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            isok = false
          }
        }
      })
      if (isok) {
        const data = this.processingData()
        // 新添加字段
        data.validatesRegisters = this.validatesRegisters
        let url = ''
        let text = ''
        if (this.id) {
          // 编辑
          url = val == 0 ? '/adoption/tempupdate' : '/adoption/update'
          data.bizKey = this.id
          text = '编辑成功'
        } else {
          // 新增
          url = val == 0 ? '/adoption/tempregister' : '/adoption/register'
          text = '新增成功'
        }
        const res = await this.post(url, data, true)
        if (res.errors == null) {
          this.$message.success(text)
          if (val == 1 && this.additionalYesOrNo == 0) {
            this.printshow = true
            this.printId = res.data.data
          } else {
            this.backs()
          }
        } else {
          const errlist = ['E0001', 'E0002', 'E0003', 'E0004']
          if (res.errors.length > 0) {
            if (errlist.includes(res.errors[0].errorCode)) {
              this.validatesRegisters.push(res.errors[0].errorCode)
              this.$confirm({
                title: res.errors[0].msg,
                onOk: () => {
                  this.submit(val)
                },
                onCancel: () => {
                }
              })
            }
          }
        }
      } else {
        // 导航切换
        // this.nowkey = '1'
        this.$message.error(
          '校验不通过，无法提交，请再次检查!'
        )
      }
      // })
    },
    printOk () {
      this.isprint = true
      this.printshow = false
      this.nowkey = '6'
    },
    printno () {
      this.printshow = false
      this.backs()
    },
    backs () {
      this.$router.go(-1)
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

<style scoped type="text/less">
.preservation {
  margin-left: 20px;
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
