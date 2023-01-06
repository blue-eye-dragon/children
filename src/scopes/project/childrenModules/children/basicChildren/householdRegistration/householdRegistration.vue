<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="姓名"
                              class="spilwid"
                              fieldDecoratorId="name"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入姓名" />
                </ta-form-item>
                <ta-form-item label="儿童类别"
                              class="spilwid"
                              fieldDecoratorId="childType"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in childType "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="户口状态"
                              class="spilwid"
                              fieldDecoratorId="householdRegistryStatus"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择户口状态">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in hoseStatus "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="户口分类"
                              class="spilwid"
                              fieldDecoratorId="householdRegistryClassify"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择户口分类">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in hoseType "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="性别"
                              class="spilwid"
                              fieldDecoratorId="sex"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in sexList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="出生日期"
                              class="spilwid3"
                              fieldDecoratorId="birthdayTime"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}">
                  <ta-range-picker @change="onSelectTime" />
                </ta-form-item>
                <ta-form-item label="增员日期"
                              class="spilwid3"
                              fieldDecoratorId="registerTime"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}">
                  <ta-range-picker @change="onSelectTime" />
                </ta-form-item>

              </div>
              <div class="searchbtn">
                <div class="searchButton">
                  <ta-button class="search "
                             icon="search"
                             @click="handleSubmit('search')">查询</ta-button>
                  <ta-button class="btnleft reset"
                             icon="reload"
                             @click="resetFrom">重置</ta-button>
                  <ta-button class="btnleft"
                             style="    width: 109px;"
                             @click="advancedquery">
                    高级查询
                    <ta-icon :type="issearch?'up':'down'" />
                  </ta-button>
                </div>
              </div>
            </div>
          </ta-form>

        </div>
        <div style="margin-top: 16px;"></div>
        <ta-table bordered
                  class="tables"
                  :columns="tableColumns"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="householdRegistryStatus"
                slot-scope="a, b, c">
            <span v-if="a==1"
                  class="no_submit">{{'待落户'}}</span>
            <span v-if="a==2"
                  class="com_adopt">{{'已落户'}}</span>
            <span v-if="a==3"
                  class="com_reject">{{'已销户'}}</span>
            <span v-if="a==4"
                  class="com_tobesubmitted">{{'已迁出'}}</span>
          </span>
          <a slot="name"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.name}}</a>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span v-if="obj.householdRegistryStatus=='1' "
                  class="com_publish"
                  @click="add(val,obj,'1','/householdRegistration/saveSettle')">落户</span>
            <span v-if="obj.householdRegistryStatus=='2' "
                  @click="add(val,obj,'2','/householdRegistration/saveCancel')"
                  class="com_revocation">销户</span>
            <span v-if="obj.householdRegistryStatus=='2' "
                  class="com_relieve"
                  @click="add(val,obj,'3','/householdRegistration/saveMoveOut')">迁出</span>
            <span v-if="obj.householdRegistryStatus!='1' "
                  class="com_textsee"
                  @click="seedetail(val,obj,index)">查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <!--落户-->
    <ta-drawer :title="'落户'+ck"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form v-if="visible"
               class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <p style='cursor: pointer;  color: #1890ff;margin-bottom: -10px;line-height: 38px;'
             @click="childInfo()">{{childName}}</p>
        </ta-form-item>

        <ta-form-item label="儿童id"
                      fieldDecoratorId="childEnterId"
                      :labelCol="{ span: 6 }"
                      hidden
                      :wrapperCol="{span:18}">
          <ta-input />
        </ta-form-item>
        <ta-form-item label="儿童id"
                      fieldDecoratorId="childBaseId"
                      :labelCol="{ span: 6 }"
                      hidden
                      :wrapperCol="{span:18}">
          <ta-input />
        </ta-form-item>

        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: true, message: '请输入身份证号' },{validator:idCardValid}]}">
          <ta-input :disabled="idedit"
                    placeholder="请输入身份证号" />
        </ta-form-item>
        <ta-form-item label="落户日期"
                      fieldDecoratorId="settleTime"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择落户日期'}">
          <ta-date-picker :disabledDate="disabledStartDate"
                          v-if="bton1"
                          style="width: 100%;"
                          placeholder="请选择落户日期" />
          <ta-input :disabled="idedit"
                    v-if="ishide" />
        </ta-form-item>
        <ta-form-item label="户籍性质"
                      fieldDecoratorId="censusRegister"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择户籍性质'}">
          <ta-select :disabled="idedit"
                     placeholder="请选择户籍性质">
            <ta-select-option v-for="(item ,index) in censusregisterList"
                              :key="index"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="户口分类"
                      fieldDecoratorId="householdRegistryClassify"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择户口分类'}">
          <ta-select :disabled="idedit"
                     placeholder="请选择户口分类">
            <ta-select-option v-for="(item,index) in hoseTypes"
                              :key="index"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <AddressComponent v-if="!toto"
                          :disabled="idedit"
                          :addressmodel="addressmodel"
                          :msg="'户籍所在地'"
                          @setaddress="setaddress"></AddressComponent>
        <!-- <AreaQuery
          msg="户籍所在地"
          :ishide="true"
          :addressmodel="addressmodel"
          @adsvalchange="actualAreaAddressChange"
          @setaddress="setaddress"
          :disabled="idedit"
        ></AreaQuery>-->
        <ta-form-item label="户籍所在地"
                      fieldDecoratorId="registerLocation"
                      :require="{message:'请输入户籍所在地'}"
                      v-if="toto">
          <ta-input :disabled="true"
                    placeholder />
        </ta-form-item>

        <ta-form-item label
                      fieldDecoratorId="addressDetails"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ offset:6}"
                      :require="{message:'请输入详细地址'}"
                      :fieldDecoratorOptions="{rules: [{ max: 100, message: '详细地址最大长度为100个字符' }]}">
          <ta-input :disabled="idedit"
                    placeholder="请输入详细地址" />
        </ta-form-item>
        <ta-form-item label="落户派出所"
                      fieldDecoratorId="settlePolice"
                      :require="{message:'请输入落户派出所'}"
                      v-if="toto">
          <ta-input :disabled="true"
                    placeholder />
        </ta-form-item>

        <AddressComponent v-if="!toto"
                          :addressmodel="addressmodel2"
                          :msg="'落户派出所'"
                          fileldName="censusRegister_2"
                          @setaddress="setaddress"
                          :disabled="idedit"></AddressComponent>

        <!-- <AreaQuery
          msg="落户派出所"
          :ishide="false"
          :addressmodel="addressmodel2"
          fileldName="censusRegister_2"
          @setaddress="setaddress"
          :disabled="idedit"
        ></AreaQuery>-->

        <ta-form-item label
                      fieldDecoratorId="houseHoldRegisterAddrDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ offset:6 }"
                      :require="{message:'请输入详细地址'}"
                      :fieldDecoratorOptions="{rules: [{ max: 100, message: '详细地址最大长度为100个字符' }]}">
          <ta-input :disabled="idedit"
                    placeholder="请输入详细地址" />
        </ta-form-item>

        <ta-form-item v-if="ishide && isShowNullCreateUser"
                      label="登记人"
                      fieldDecoratorId="createUser"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入登记人'}">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item v-if="ishide"
                      label="登记日期"
                      fieldDecoratorId="createTime"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择登记日期'}">
          <ta-input :disabled="idedit" />
          <!-- <ta-date-picker :disabled="idedit" style="width: 100%;" placeholder="请选择登记日期" /> -->
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose"
                   v-if="bton1">取消</ta-button>
        <ta-button @click="submit"
                   v-if="bton1"
                   type="primary">确定</ta-button>
        <ta-button v-if="ishide"
                   @click="onClose">关闭</ta-button>
      </div>
    </ta-drawer>
    <!--销户-->
    <ta-drawer :title="'销户'+ck"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="destructionshow"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form v-if="destructionshow"
               class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <p style='       cursor: pointer;  color: #1890ff;line-height: 38px;margin-bottom: -10px;'
             @click="childInfo()">{{childName}}</p>
        </ta-form-item>

        <ta-form-item label="儿童id"
                      fieldDecoratorId="childBaseId"
                      :labelCol="{ span: 6 }"
                      hidden
                      :wrapperCol="{span:18}">
          <ta-input />
        </ta-form-item>
        <ta-form-item label="儿童入园id"
                      fieldDecoratorId="childEnterId"
                      :labelCol="{ span: 6 }"
                      hidden
                      :wrapperCol="{span:18}">
          <ta-input />
        </ta-form-item>

        <ta-form-item label="销户原因"
                      fieldDecoratorId="cancelReason"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择销户原因'}">
          <ta-select :disabled="idedit"
                     placeholder="请选择销户原因">
            <ta-select-option v-for="(item ,index) in cancelReasonList "
                              :key="index "
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <ta-form-item label="证明材料"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入落户地址'}">
          <!-- name="file" -->
          <ta-upload :withCredentials="true"
                     name="file"
                     :data="data_"
                     :multiple="true"
                     :action="action"
                     :fileList="fileList"
                     @change="handleChange"
                     @preview="confirmDownload"
                     :beforeUpload="beforeUpload">
            <ta-button v-if="bton1">
              <ta-icon type="upload" />上传文件
            </ta-button>
          </ta-upload>
          <p class="warntext"
             style="font-size:14px">
            <ta-icon type="info-circle-o"
                     class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
          </p>
        </ta-form-item>

        <ta-form-item v-if="ishide"
                      label="登记人"
                      fieldDecoratorId="createUser"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入登记人'}">
          <ta-input :disabled="idedit"
                    placeholder="请输入登记人" />
        </ta-form-item>
        <ta-form-item v-if="ishide"
                      label="登记日期"
                      fieldDecoratorId="createTime"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择登记日期'}">
          <ta-input :disabled="idedit" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button v-if="bton1"
                   :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button v-if="bton1"
                   @click="submit"
                   type="primary">确定</ta-button>
        <ta-button v-if="ishide"
                   @click="onClose">关闭</ta-button>
      </div>
    </ta-drawer>
    <!--迁出 moveOut-->
    <ta-drawer :title="'迁出'+ck"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="moveOutshow"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form v-if="moveOutshow"
               class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <p style='       cursor: pointer; color: #1890ff;line-height: 38px;margin-bottom: -10px;'
             @click="childInfo()">{{childName}}</p>
        </ta-form-item>

        <ta-form-item label="儿童id"
                      fieldDecoratorId="childBaseId"
                      initValue="childId"
                      :labelCol="{ span: 6 }"
                      hidden
                      :wrapperCol="{span:18}">
          <ta-input />
        </ta-form-item>

        <ta-form-item label="childEnterId"
                      fieldDecoratorId="childEnterId"
                      hidden
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <ta-input />
        </ta-form-item>

        <ta-form-item label="迁出原因"
                      fieldDecoratorId="moveOutReason"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择迁出原因'}">
          <ta-select :disabled="idedit"
                     placeholder="请选择迁出原因">
            <ta-select-option v-for="(item,index) in moveOutReasonList "
                              :key="index"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <ta-form-item label="证明材料"
                      :labelCol="{ span: 6 }">
          <ta-upload :withCredentials="true"
                     name="file"
                     :data="goTo_"
                     :multiple="true"
                     :action="action"
                     :fileList="fileList"
                     @change="handleChange"
                     @preview="confirmDownload">
            <ta-button v-if="bton1">
              <ta-icon type="upload" />上传文件
            </ta-button>
            <p class="warntext">
              <ta-icon type="info-circle-o"
                       class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
            </p>
          </ta-upload>
        </ta-form-item>

        <ta-form-item v-if="ishide"
                      label="登记人"
                      fieldDecoratorId="createUser"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入登记人'}">
          <ta-input :disabled="idedit"
                    placeholder="请输入登记人" />
        </ta-form-item>
        <ta-form-item v-if="ishide"
                      label="登记日期"
                      fieldDecoratorId="createTime"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择登记日期'}">
          <ta-input :disabled="idedit" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   v-if="bton1"
                   @click="onClose">取消</ta-button>
        <ta-button v-if="bton1"
                   @click="submit"
                   type="primary">确定</ta-button>
        <ta-button v-if="ishide"
                   @click="onClose">关闭</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import AddressComponent from '@component/common/components/addressComponent'
import AreaQuery from '@component/common/components/areaQuery'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童姓名',
    width: '12%',
    dataIndex: 'name',
    overflowTooltip: true,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    width: '8%',
    align: 'center',
    dataIndex: 'sex',
    collectionType: 'SEX',
    overflowTooltip: true
  },
  {
    title: '出生日期',
    width: '12%',
    align: 'center',
    dataIndex: 'birthday',
    overflowTooltip: true
  },
  {
    title: '儿童类别',
    width: '14%',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA',
    overflowTooltip: true
  },
  {
    title: '增员日期',
    width: '15%',
    align: 'center',
    dataIndex: 'registerDate',
    overflowTooltip: true
  },
  {
    title: '户口分类',
    width: '14%',
    dataIndex: 'householdRegistryClassify',
    collectionType: 'HOUSEHOLDREGISTRYCLASSIFY',
    overflowTooltip: true
  },
  {
    title: '户口状态',
    align: 'center',
    dataIndex: 'householdRegistryStatus',
    width: '11%',
    // collectionType: 'ACCOUNTSTATUS',
    scopedSlots: { customRender: 'householdRegistryStatus' },
    overflowTooltip: true
  },

  {
    title: '操作',
    dataIndex: 'action',

    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  components: {
    AddressComponent,
    AreaQuery
  },
  data () {
    return {
      ck: '',
      // abc: true,
      childId: [],
      bton1: true,
      childType: [],
      cancelReasonList: [],
      sexList: [],
      hoseType: [],
      hoseStatus: [],
      childName: '',
      mixDataList: [],
      censusregisterList: [],
      moveOutReasonList: [],
      mixListOptions: {
        mixGetDataListURL:
          '/householdRegistration/pageSelectHouseholdRegistration', // 数据列表接口，API地址
        mixAddURL: '/householdRegistration/saveSettle', // 新增接口
        mixEditURL: '', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      addressmodel: [],
      addressmodel2: [],
      fileList: [],
      fileIds: [],
      relationIds: '',
      tableColumns,

      page: 1,
      size: 10,
      visible: false,
      idedit: false,
      destructionshow: false,
      moveOutshow: false,
      ishide: false,
      mixPageRef: 'gridPager',
      optionType: '',

      goTo_: {
        functionalType: 1,
        busiType: 30
      },
      data_: {
        functionalType: 1,
        busiType: 29
      },
      hoseTypes: [],
      nowDate: '',
      userId: '',
      toto: false,
      isExpand: false,
      issearch: false,
      isShowNullCreateUser: true // 已有户口的落户数据登记人为空，不显示
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  activated () {
    this.issearch = false
    this.isExpand = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  // created () { this.abc = true },
  mounted () {
    this.userId = window.parent.indexTool.getUserInfo().userId
    const nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.getChildType()
    this.getsexList()
    this.gethoseType()
    this.gethoseStatus()
    this.getcancelReasonList()
    this.getcensusregisterList()
    this.getmoveOutReasonList()
    this.gethoseTypes()
  },
  methods: {
    // 身份证号验证
    idCardValid (rule, value, callback) {
      const _self = this
      setTimeout(() => {
        this.idCardValidate(rule, value, callback, _self, null)
      }, 300)
    },
    // 身份证号后台验证
    async validateIdCard (val) {
      let datas = null
      await this.post('/householdRegistration/checkIdCard', {
        idCard: val
      }).then((res) => {
        if (!res.data.data) { // 已不存在
          datas = res
          datas.errors = [{ msg: '身份证号码已存在' }]
        }
        datas = res
      })
      return datas
    },
    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          let params = this.form.getFieldsValue()
          this.changetime(params)
          if (this.nowtype == 1) {
            // 新增
            url = this.mixListOptions.mixAddURL
            text = '操作成功'
          } else {
            // 编辑
            text = '修改成功'
            url = this.mixListOptions.mixEditURL
            params[this.idkey] = this.id
          }
          params = this.addother(params)
          const data = await this.post(url, params)
          if (data.errors === null) {
            this.$message.success(text)
            this.onClose()

            if (
              this.mixListOptions.mixActivatedIsNeed &&
              this.mixListOptions.mixGetDataListIsPage
            ) {
              this.handleSubmit()
            } else if (
              this.mixListOptions.mixActivatedIsNeed &&
              !this.mixListOptions.mixGetDataListIsPage
            ) {
              this.getlist()
            }
            this.fileList = []
          }
        }
      })
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    actualAreaAddressChange (val) {
      this.$emit('update:actualAreaAddressVal', val)
    },
    childInfo (val, obj, index) {
      let param = {}
      if (obj) {
        param = {
          id: obj.childEnterId
        }
      } else {
        param = { id: this.form.getFieldsValue().childEnterId }
      }

      this.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify(param),
          operateFlag: 'look_now'
        }
      })
    },
    setaddress () {
      setTimeout(() => {
        this.form.setFieldsValue({
          address_Linkage: this.addressmodel,
          censusRegister_2: this.addressmodel2
        })
      }, 0)
    },

    disabledStartDate (startValue) {
      const endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },

    // moment,
    // 儿童类型
    async getChildType () {
      const data = await this.getDictionaries(this.childTypeCode)
      this.childType = data
    },
    // 户口分类
    async gethoseType () {
      const data = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFY')
      this.hoseType = data
    },
    // 户口分类
    async gethoseTypes () {
      const data = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFYSETTLE')
      this.hoseTypes = data
    },
    // 户口状态
    async gethoseStatus () {
      const data = await this.getDictionaries('ACCOUNTSTATUS')
      this.hoseStatus = data
    },
    // 户籍性质
    async getcensusregisterList () {
      const data = await this.getDictionaries('CENSUSREGISTER')
      this.censusregisterList = data
    },

    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 注销类型
    async getcancelReasonList () {
      const data = await this.getDictionaries('CANCELREASON')
      this.cancelReasonList = data
    },
    // 注销类型
    async getmoveOutReasonList () {
      const data = await this.getDictionaries('MOVEOUTREASON')
      this.moveOutReasonList = data
    },
    addother (params) {
      const upLoadPathIds = [...this.fileList]
      upLoadPathIds.map(item => {
        this.fileIds.push(item.response.data.data.fileid)
      })
      // this.fileids = this.fileids.split(',')
      params.fileId = this.fileIds
      // params.childBaseId = this.childBaseId
      return params
    },
    async seedetail (val, obj, index) {
      this.ck = '查看'
      this.optionType = ''
      const that = this
      that.childName = obj.name
      that.childId = obj.id
      this.ishide = true // 显示创建人时间和取消按钮
      this.idedit = true // 只读
      this.bton1 = false // 确定取消按钮隐藏
      const param = { childEnterId: obj.childEnterId }

      if (obj.householdRegistryStatus == '3') {
        // 已销户
        const res = await that.post(
          '/householdRegistration/queryCancelById',
          param,
          false
        )
        that.destructionshow = true
        const ffO = JSON.parse(res.data.data.filePathVos)
        that.fileList = ffO // 文件列表赋值回显
        that.relationIds = res.data.data.id // 下载需要参数

        this.$nextTick(() => {
          that.form.setFieldsValue(res.data.data)
          that.form.setFieldsValue({ childEnterId: obj.childEnterId })
          that.form.setFieldsValue({
            createTime: res.data.data.createTime ? moment(res.data.data.createTime).format('YYYY-MM-DD') : null
          })
        })
      }
      if (obj.householdRegistryStatus == '2') {
        // 已落户
        const arr = []
        const arr2 = []
        this.toto = true
        const res = await that.post(
          '/householdRegistration/querySettleById',
          param,
          false
        )

        that.visible = true

        if (res.data.data && !res.data.data.createUser) {
          that.isShowNullCreateUser = false
        }

        this.$nextTick(() => {
          //   res.data.data.settleTime = res.data.data.settleTime ? moment(res.data.data.settleTime) : null
          that.form.setFieldsValue(res.data.data)
          // that.form.setFieldsValue({childEnterId: obj.id})
          // that.form.setFieldsValue({ idCard: obj.idCard })
          // 落户时间
          //   that.form.setFieldsValue({ settleTime: obj.registerDate })

          that.form.setFieldsValue({ childEnterId: obj.childEnterId })
          that.form.setFieldsValue({
            createTime: res.data.data.createTime ? moment(res.data.data.createTime).format('YYYY-MM-DD') : null
          })
          arr.push(
            res.data.data.province,
            res.data.data.city,
            res.data.data.county
          )
          this.addressmodel = arr
          arr2.push(
            res.data.data.houseHoldRegisterAddrProv,
            res.data.data.houseHoldRegisterAddrCity,
            res.data.data.houseHoldRegisterAddrCounty
          )

          this.addressmodel2 = arr2
          // this.setaddress()
        })
      }
      if (obj.householdRegistryStatus == '4') {
        // 已迁出
        const res = await that.post(
          '/householdRegistration/queryMoveOutById',
          param,
          false
        )
        that.moveOutshow = true
        const ffO = JSON.parse(res.data.data.filePathVos)
        that.fileList = ffO
        that.relationIds = res.data.data.id
        this.$nextTick(() => {
          that.form.setFieldsValue(res.data.data)

          that.form.setFieldsValue({ childEnterId: obj.childEnterId })
          that.form.setFieldsValue({
            createTime: res.data.data.createTime ? moment(res.data.data.createTime).format('YYYY-MM-DD') : null
          })
        })
      }
      if (obj.householdRegistryStatus == null) {
        alert('垃圾数据（户口状态为空！）')
      }
    },
    add (val, obj, type, url) {
      this.ck = ''
      this.toto = false
      this.optionType = type
      this.nowtype = 1
      this.childName = obj.name
      this.mixListOptions.mixAddURL = url
      this.childId = obj.id
      const idCard = obj.idCard

      if (type == '1') {
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue({
            childEnterId: obj.childEnterId,
            childBaseId: obj.id
          })
        })

        this.ishide = false
      }
      if (type == '2') {
        // 销户
        this.childId = obj.id
        this.destructionshow = true
        this.$nextTick(() => {
          this.form.setFieldsValue({
            childEnterId: obj.childEnterId,
            childBaseId: obj.id
          })
        })
      }
      if (type == '3') {
        this.childId = obj.id
        this.moveOutshow = true
        this.$nextTick(() => {
          this.form.setFieldsValue({
            childEnterId: obj.childEnterId,
            childBaseId: obj.id
          })
        })
      }
    },
    changetime (data) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
        // 是数组  数组元素为对象
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
        // 是数组  数组元素不为对象
        if (data[k] instanceof Array && !(data[k][0] instanceof Object)) {
          if (k == 'censusRegister_2') {
            data.houseHoldRegisterAddrProv = data[k][0]
            data.houseHoldRegisterAddrCity = data[k][1]
            data.houseHoldRegisterAddrCounty = data[k][2]
            delete data[k]
          } else if (k == 'address_Linkage') {
            data.province = data[k][0]
            data.city = data[k][1]
            data.county = data[k][2]
            delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
        var accepttypes = ['gif', 'jpeg', 'jpg', 'png', 'doc', 'docx', 'pdf']
        var filename = info.file.originFileObj.name
        var filextension = filename.substring(filename.lastIndexOf('.') + 1)
        var filesize = info.file.originFileObj.size
        if (accepttypes.indexOf(filextension) < 0) {
          this.$message.error('请上传图片(jpg、jpeg、png)、doc、docx、pdf格式的文件!')
          this.fileList.splice(-1, 1)
          return false
        }
        if (filesize > 10 * 1024 * 1024) {
          this.$message.error('单个文件不能超过10M')
          this.fileList.splice(-1, 1)
          return false
        }
      }
      if (info.file.status === 'removed') {
        if (this.optionType == '2' || this.optionType == '3') {
          this.fileList = info.fileList
        } else {
          return false
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.fileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    confirmDownload (file) {
      if (this.optionType != '2' && this.optionType != '3') {
        // window.location.href =
        //   window.faceConfig.basePath +
        //   '/file/downloadFilesByRelations?relationIds=' +
        //   this.relationIds
        this.downloadFile(file)
      }
    },

    filechange () { },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    onClose () {
      this.fileList = [] // 清空上传列表
      this.form.resetFields()
      this.destructionshow = false
      this.visible = false
      this.moveOutshow = false
      this.ishide = false // 显示创建人时间和取消按钮
      this.idedit = false // 只读
      this.bton1 = true // 确定取消按钮隐藏
      this.addressmodel = []
      this.addressmodel2 = []
      this.fileIds = []
    },
    subfamily () {
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },

    onSelectTime (date, dateString) {
    },
    // 高级查询
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    }

  }
}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 400px;
}
</style>
