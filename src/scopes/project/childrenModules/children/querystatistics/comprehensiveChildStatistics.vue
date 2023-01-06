<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div class="contin"
           style="padding-top:15px">
        <div class="searchdata"
             style="height: 85px;position:relative">
          <div class="searchcont"
               ref="oneout">
            <ta-form layout="inline"
                     ref="one"
                     class="searchfroms"
                     :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
              <div class="__form-spec-line__">
                <div>
                  <ta-col>
                    <AreaQuery msg="区域"
                               class="spilwid"
                               :ishide="true"
                               :labelCol="{span:7}"
                               @setaddress="setaddress"
                               @adsvalchange='adsvalchange'
                               :addressmodel="addressmodel"
                               :fileldName="'address_Linkage'"
                               :wrapperCol="{span:17}"
                               types="2"></AreaQuery>
                    <ta-form-item label="福利机构"
                                  fieldDecoratorId="welfareOrgId"
                                  class="spilwid3"
                                  :labelCol="{span:8}"
                                  :wrapperCol="{span:16}">
                      <!--  多选 mode="multiple" -->
                      <ta-select showSearch
                                 :disabled="disabled || nowkey1 != '1'"
                                 optionFilterProp="children"
                                 :filterOption="filterOption"
                                 :placeholder="disabled?'请先选择区域':'请选择福利机构'">
                        <ta-select-option :value="item.taorgId"
                                          v-for="(item,index) in welfareOrgNameList"
                                          :key="index">{{item.orgName}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                    <ta-form-item label="人员状态"
                                  :labelCol="{span:10}"
                                  :wrapperCol="{span:14}"
                                  fieldDecoratorId="sfStatus"
                                  style="width:250px"
                                  :initValue="'3'">
                      <ta-select :placeholder="'人员状态'">
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in sfStatus"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span="24"
                          v-if="!issearch">
                    <div class="formBtn">
                      <ta-button :type="isType == '1'?'primary':'dashed'"
                                 @click="Register">登记在册</ta-button>
                      <ta-button :type="isType == '2'?'primary':'dashed'"
                                 @click="RegisterEnjoy">本月享受</ta-button>
                      <ta-button :type="isType == '3'?'primary':'dashed'"
                                 @click="RegisterNotEnjoy">本月不享受</ta-button>
                    </div>
                  </ta-col>
                  <ta-form-item label="是否享受补贴"
                                fieldDecoratorId="isEnjoySubsidies"
                                :labelCol="{ span: 12 }"
                                :wrapperCol="{ span: 12 }"
                                style="width:250px">
                    <ta-radio-group @change="changeIsEnjoySubsidies"
                                    :disabled="disabledEnjoy || nowkey1 != '1'"
                                    :options="[{'value':'1','label':' 是'},{'value':'0','label':'否'} ]" />
                  </ta-form-item>
                  <ta-form-item label="享受状态"
                                fieldDecoratorId="issueType"
                                :labelCol="{ span: 7 }"
                                :wrapperCol="{ span: 17 }"
                                style="width:300px">
                    <ta-checkbox-group @change="changeIssueType"
                                       :disabled="disabledType1 || nowkey1 != '1'"
                                       :options="[{'value':'0','label':'正常发放'},{'value':'1','label':' 超龄续发'} ]" />
                  </ta-form-item>
                  <ta-form-item label="年月"
                                fieldDecoratorId='yearsStart'
                                style="width:300px"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}">
                    <ta-month-picker :allowClear='false'
                                     :disabled="nowkey1 != '1'"
                                     format="YYYY/MM"
                                     :placeholder="'开始年月'" />
                  </ta-form-item>
                  <ta-form-item label="姓名"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{span:16}"
                                class="spilwid"
                                fieldDecoratorId="name">
                    <ta-input placeholder="请输入姓名"
                              style="width : 100%" />
                  </ta-form-item>
                  <ta-form-item label="身份证号"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{span:16}"
                                class="spilwid"
                                fieldDecoratorId="idCard">
                    <ta-input placeholder="请输入身份证号"
                              style="width : 100%" />
                  </ta-form-item>
                  <ta-form-item class="spilwid"
                                fieldDecoratorId="thisMonthDate"
                                label="起领年月"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}">
                    <ta-month-picker :allowClear='false'
                                     :disabled="nowkey1 != '1'"
                                     :placeholder="'请选择起领年月'" />
                  </ta-form-item>
                  <ta-col>
                    <ta-form-item label="数据来源"
                                  :labelCol="{span:9}"
                                  :wrapperCol="{span:15}"
                                  class="spilwid"
                                  fieldDecoratorId="isAnotherPlaceApply">
                      <ta-select allowClear
                                 placeholder="请选择数据来源">
                        <ta-select-option :value="'0'">本地申请</ta-select-option>
                        <ta-select-option :value="'1'">异地申请</ta-select-option>
                        <!-- <ta-select-option :value="'2'">公众服务平台</ta-select-option> -->
                      </ta-select>
                    </ta-form-item>
                    <ta-form-item label="申请日期"
                                  fieldDecoratorId="applyDate"
                                  class="spilwid2"
                                  :labelCol="{span:5}"
                                  :wrapperCol="{span:17}">
                      <ta-range-picker />
                    </ta-form-item>
                  </ta-col>
                  <ta-form-item class="spilwid2"
                                fieldDecoratorId="attritionDate"
                                label="减员日期"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}">
                    <ta-range-picker :disabled="nowkey1 != '1'" />
                  </ta-form-item>
                  <ta-form-item label="出生日期"
                                fieldDecoratorId="birthday"
                                class="spilwid2"
                                :labelCol="{span:5}"
                                :wrapperCol="{span:17}">
                    <ta-range-picker />
                  </ta-form-item>
                </div>
                <div class="searchbtn searchButton">
                  <ta-button class="search"
                             icon="search"
                             @click="searchslist('search')">查询</ta-button>
                  <ta-button class="btnleft reset"
                             icon="reload"
                             @click="resetFrom">重置</ta-button>
                  <ta-button class="btnleft"
                             @click="advancedquery">高级查询
                    <ta-icon :type="issearch?'up':'down'" />
                  </ta-button>
                </div>
              </div>
              <ta-form-item label="性别"
                            fieldDecoratorId="sex"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in sexList"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="户籍性质"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="householdRegistrationStatus"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in censusregisterList"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="患艾滋病情况"
                            class="alonerow1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{span:21}"
                            fieldDecoratorId="aidsSituation">
                <ta-radio-group @change="radiochange"
                                style="width:100%">
                  <ta-radio v-for="(item,index) in adisConditionList"
                            :key="index"
                            :value="item.value">{{item.label}}</ta-radio>
                  <ta-input v-if="radiovalue==Enum.ADISCONDITION.QT"
                            placeholder="请输入原因"
                            ref="aidsSituationOther"
                            style='width:300px;' />
                </ta-radio-group>

              </ta-form-item>
              <ta-form-item label='确认艾滋病感染时间'
                            v-if="radiovalue==Enum.ADISCONDITION.XDHGRAZB"
                            fieldDecoratorId="infectionDate"
                            :labelCol="{ span: 4 }"
                            class="alonerow2"
                            :wrapperCol="{span:20}">
                <ta-range-picker />
              </ta-form-item>
              <ta-form-item label='最有可能感染艾滋病途径'
                            v-if="radiovalue==Enum.ADISCONDITION.XDHGRAZB"
                            fieldDecoratorId="probablyInfectedWay"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{span:20}"
                            class="alonerow3">
                <ta-radio-group @change="channel"
                                style="width:100%">
                  <ta-radio v-for="(item,index) in transmissionWayList"
                            :key="index"
                            :value="item.value">{{item.label}}</ta-radio>
                  <ta-input v-if="radiovalues==Enum.TRANSMISSIONWAYOTHER.QT"
                            placeholder="请输入其他途径"
                            ref="probablyInfectedWayOther"
                            style='width:300px;' />
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="就学情况"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="schoolStatus"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in schoolingList"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <!-- <ta-form-item label="人员状态"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="sfStatus"
                            class="spilwid1"
                            :initValue="'3'">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in sfStatus"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item> -->
              <ta-form-item label="保障情况"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="helpMeasure"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in helpMeasurelist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="健康状况"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            class="spilwid1"
                            fieldDecoratorId="healthStatus">
                <ta-radio-group @change="onChange">
                  <ta-radio @click="goHandle(item.value,'healthStatus',searchForm,  true)"
                            :value="item.value"
                            v-for="(item,index) in heathlist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="残疾类型"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            v-if="heathval==Enum.HEALTHSTATUS.DISABILITY"
                            fieldDecoratorId="disabledType"
                            class="spilwid1"
                            :require="{message:'请选择残疾类型!'}"
                            :initValue="[]">
                <ta-radio-group>
                  <ta-radio @click="goHandle(item.value,'disabledType',searchForm,  false)"
                            :value="item.value"
                            v-for="(item,index) in disabiliytypelist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
                <!-- <ta-checkbox-group :options="disabiliytypelist"
                                   placeholder='请选择残疾类别'
                                   @change="setMulti"
                                   :values="disabilityTypeValues" /> -->
              </ta-form-item>
              <ta-form-item label="残疾等级"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            v-if="heathval==Enum.HEALTHSTATUS.DISABILITY"
                            fieldDecoratorId="disabledLevel"
                            :require="{message:'请选择残疾等级!'}"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio @click="goHandle(item.value,'disabledLevel',searchForm,  false)"
                            :value="item.value"
                            v-for="(item,index) in canjileave"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <!--重病-->
              <ta-form-item label="重病"
                            v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS"
                            fieldDecoratorId="disabledType"
                            class="spilwid1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :initValue="[]"
                            :require="{message:'请选择重病!'}">
                <ta-checkbox-group :options="disabiliytypelist" />
              </ta-form-item>
              <!--慢性病-->
              <ta-form-item label="慢性病"
                            v-if="heathval==Enum.HEALTHSTATUS.CHRONICDISEASE"
                            class="spilwid1"
                            fieldDecoratorId="disabledType"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :initValue="[]"
                            :require="{message:'请选择慢性病!'}">
                <ta-checkbox-group :options="disabiliytypelist" />
              </ta-form-item>
              <ta-form-item label="父亲状况"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 22 }"
                            fieldDecoratorId="fatherOfCurrentSituation"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio @click="goHandle(item.value,'fatherOfCurrentSituation',searchForm,  false)"
                            :value="item.value"
                            v-for="(item,index) in presentsituationlist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="母亲状况"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 22 }"
                            fieldDecoratorId="motherOfCurrentSituation"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio @click="goHandle(item.value,'motherOfCurrentSituation',searchForm,  false)"
                            :value="item.value"
                            v-for="(item,index) in presentsituationlist"
                            :key="index">{{item.label}}</ta-radio>

                </ta-radio-group>
              </ta-form-item>
              <ta-col :span="24"
                      v-if="issearch">
                <div class="formBtn">
                  <ta-button :type="isType == '1'?'primary':'dashed'"
                             @click="Register">登记在册</ta-button>
                  <ta-button :type="isType == '2'?'primary':'dashed'"
                             @click="RegisterEnjoy">本月享受</ta-button>
                  <ta-button :type="isType == '3'?'primary':'dashed'"
                             @click="RegisterNotEnjoy">本月不享受</ta-button>
                </div>
              </ta-col>
            </ta-form>
          </div>
        </div>
        <div style="height: 50px;margin-top:60px">
          <div style="float:right;">
            <ta-button style=" margin-left: 10px;"
                       class="exportbtn"
                       icon="upload"
                       v-if="(arealevel != '0'||arealevel1 != '0') && isshow"
                       @click="showModal">导出</ta-button>
            <ta-button v-if="isgoback"
                       @click="goback">返回</ta-button>
            <ta-modal :centered="false"
                      style="top: 25%;"
                      :visible="showOn"
                      @ok="Excel"
                      @cancel="handleCancel">
              <div>
                <h3>确认导出查询条件下的全部有效数据吗？</h3>
              </div>
            </ta-modal>
          </div>
          <div class="radioClass leftClass">
            <ta-radio-group :value=" nowkey1"
                            buttonStyle="solid"
                            @change="callback1">
              <ta-radio-button :value="item.value"
                               :key="''+index"
                               v-for="(item,index) in tablist">{{item.name}}</ta-radio-button>
            </ta-radio-group>
          </div>
          <div style="clear:both"></div>
        </div>
        <!-- :rowSelection="mixRowSelection" -->
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table :columns="nowkey1 == '1'?mixColumns1:nowkey1 == '2'?mixColumns2:mixColumns3"
                    :locale="{emptyText: emptyText}"
                    :dataSource="mixDataList"
                    class="table-min-width"
                    :showOverflowTooltip="true"
                    @change="handleTableChange"
                    :customRow="fnCustomRow"
                    :pagination="false"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <span slot="currentAddressDetailAll"
                  slot-scope="a, b, c">
              <span>{{a.indexOf('民政部')==-1?a:a.substring(3,a.length)}}</span>
            </span>
            <span slot="isExit"
                  slot-scope="a, b, c">
              <span v-if="b.isExit == '0'">已减员</span>
              <span v-else>登记在册</span>
            </span>
            <span slot="issueType"
                  slot-scope="a, b, c">
              <span v-if="b.issueType == '1'">超龄续发</span>
              <span v-else-if="b.issueType == '0'">正常发放</span>
              <span v-else-if="b.issueType == '2'">已停发</span>
              <span v-else>未享受</span>
            </span>
            <span slot="isOverage"
                  slot-scope="a, b, c">
              <span v-if="b.isOverage == '0'">未超龄</span>
              <span v-else>超龄</span>
            </span>
            <span slot="isConcentratedFeed"
                  slot-scope="a, b, c">
              <span v-if="b.isConcentratedFeed == '0'">否</span>
              <span v-if="b.isConcentratedFeed == '1'">是</span>
            </span>
            <div slot="action"
                 slot-scope="val,obj,index"
                 class="btnlist">
              <span @click="see(val,obj)"
                    class="com_textsee">查看</span>
            </div>
          </ta-table>
          <div style="font-size:14px;margin: 15px;">
            <p>1.登记在册是指对应查询条件为：“人员状态”显示为 登记在册，“是否享受福利” 显示为 全部 。</p>
            <p>
              2.本月享受是指对应查询条件为：“人员状态”显示 全部 ，“是否享受福利” 显示为 是 ，“年月”显示为 当前月份 ，“享受状态”显示 正常发放、超龄续发 。</p>
            <p>
              3.本月不享受是指对应查询条件为：“人员状态”显示 登记在册 ，“是否享受福利” 显示为 否 ，“年月”显示为 当前月份 。</p>
          </div>
        </ta-spin>
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
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      spinning: null,
      disabledType1: false,
      disabledEnjoy: false,
      disabled: true,
      isshow: true,
      emptyText: '',
      value1: {},
      isgoback: false,
      value: [],
      forceRenderBool: true,
      mode2: ['month', 'month'],
      ishide: true,
      tableData: [],
      mixDataList: [],
      addressmodel: [],
      mixColumns1: [
        {
          title: '序号',
          dataIndex: 'num',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '地区',
          width: '30%',
          dataIndex: 'currentAddressDetailAll',
          scopedSlots: { customRender: 'currentAddressDetailAll' },
          overflowTooltip: true
        },
        {
          title: '儿童编号',
          width: '20%',
          dataIndex: 'childNumber',
          overflowTooltip: true
        },
        {
          title: '儿童姓名',
          width: '12%',
          dataIndex: 'name',
          overflowTooltip: true
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
          title: '申请日期',
          width: '15%',
          align: 'center',
          dataIndex: 'reportTime',
          overflowTooltip: true
        },
        {
          title: '人员状态',
          dataIndex: 'isExit',
          align: 'center',
          width: '15%',
          scopedSlots: { customRender: 'isExit' }
        },
        {
          title: '是否集中供养',
          dataIndex: 'isConcentratedFeed',
          align: 'center',
          width: '17%',
          scopedSlots: { customRender: 'isConcentratedFeed' }
        },
        // {
        //   title: '是否超龄',
        //   dataIndex: 'isOverage',
        //   align: 'center',
        //   width: '15%',
        //   scopedSlots: { customRender: 'isOverage' }

        // },
        {
          title: '末领年月',
          dataIndex: 'issuingYearsEnd',
          align: 'center',
          width: '12%'
        },
        {
          title: '退出时间',
          dataIndex: 'endGetDate',
          align: 'center',
          width: '15%'
        },
        {
          title: '操作',
          overflowTooltip: false,
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      mixColumns2: [
        {
          title: '序号',
          dataIndex: 'num',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '地区',
          width: '35%',
          dataIndex: 'currentAddressDetailAll',
          scopedSlots: { customRender: 'currentAddressDetailAll' },
          overflowTooltip: true
        },
        {
          title: '儿童编号',
          width: '20%',
          dataIndex: 'childNumber',
          overflowTooltip: true
        },
        {
          title: '儿童姓名',
          width: '12%',
          dataIndex: 'name',
          overflowTooltip: true
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
          title: '申请日期',
          width: '15%',
          align: 'center',
          dataIndex: 'reportTime',
          overflowTooltip: true
        },
        {
          title: '人员状态',
          dataIndex: 'isExit',
          align: 'center',
          width: '15%',
          scopedSlots: { customRender: 'isExit' }
        },
        // {
        //   title: '享受状态',
        //   dataIndex: 'issueType',
        //   align: 'center',
        //   width: '15%',
        //   scopedSlots: { customRender: 'issueType' }
        // },
        // {
        //   title: '是否超龄',
        //   dataIndex: 'isOverage',
        //   align: 'center',
        //   width: '15%',
        //   scopedSlots: { customRender: 'isOverage' }

        // },

        {
          title: '退出时间',
          dataIndex: 'endGetDate',
          align: 'center',
          width: '15%'
        },
        {
          title: '操作',
          overflowTooltip: false,
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      mixColumns3: [
        {
          title: '序号',
          dataIndex: 'num',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '地区',
          width: '35%',
          dataIndex: 'currentAddressDetailAll',
          scopedSlots: { customRender: 'currentAddressDetailAll' },
          overflowTooltip: true
        },
        {
          title: '儿童编号',
          width: '20%',
          dataIndex: 'childNumber',
          overflowTooltip: true
        },
        {
          title: '儿童姓名',
          width: '12%',
          dataIndex: 'name',
          overflowTooltip: true
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
          title: '儿童类别',
          width: '15%',
          align: 'center',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '申请日期',
          width: '15%',
          align: 'center',
          dataIndex: 'reportTime',
          overflowTooltip: true
        },
        {
          title: '人员状态',
          dataIndex: 'isExit',
          align: 'center',
          width: '15%',
          scopedSlots: { customRender: 'isExit' }
        },

        {
          title: '退出时间',
          dataIndex: 'endGetDate',
          align: 'center',
          width: '15%'
        },
        {
          title: '操作',
          overflowTooltip: false,
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      areaId: '',
      areaCode: '',
      arealevel: '',
      arealevel1: '',
      mixListOptions: {
        mixGetDataListURL: 'orphanLivingExpensesAndChildren/pageUnattendedChildStatistics',
        mixActivatedIsNeed: false
        // mixGetDataListIsPage: false
      },
      choes: true,
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange,
        // hideDefaultSelections: true,
        type: 'radio'
      },
      statisticTimeStart: '',
      statisticTimeEnd: '',
      params: {},
      sexList: [],
      yesNoList: [],
      nationList: [],
      censusregisterList: [],
      houseHoldList: [],
      schoolingList: [],
      employmentlist: [],
      helpMeasurelist: [], // 保障情况字典数据
      heathlist: [], // 健康状况字典数据
      disabiliytypelist: [], // 残疾类型等字典数据
      canjileave: [], // 残疾等级字典数据
      disabilityTypeValues: [], // 残疾类别选择的数据
      heathval: '', // 健康状况选择的值
      adisConditionList: [], // 患艾滋病情况字典数据
      transmissionWayList: [], // 最有可能感染艾滋病途径字典数据
      welfareOrgNameList: [], // 福利机构列表
      issearch: false,
      sfStatus: [{ label: '登记在册', value: '3' }, { label: '已减员', value: '2' }, { label: '全部', value: '1' }],
      nowkey1: '1', // 详细列表页面

      showOn: false,
      mixPageRef: 'mixPageRef',
      page: 1,
      size: 10,
      obj: {},
      isType: '',
      presentsituationlist: [],
      choesP: [],
      radiovalue: '1', // 患艾滋病情况选择的数据
      radiovalues: '1', // 最有可能感染艾滋病的途径选择的数据
      isConcentratedFeed: '', // 是否集中供养 1是0否

      tablist: (window.parent.indexTool.getUserInfo().areaLevel < 2) ? [{ name: '事实无人抚养儿童', value: '1' }, { name: '监护不当儿童', value: '2' }, { name: '家庭贫困儿童', value: '3' }, { name: '残疾儿童', value: '4' }] : [{ name: '事实无人抚养儿童', value: '1' }, { name: '监护不当儿童', value: '2' }]
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('87px', '91.3%', 'spilwid1') // 单独一行字段宽度控制
    this.setLabelAndWrapperWidth('115px', '91.3%', 'spilwid4') // 单独一行字段宽度控制
    this.setLabelAndWrapperWidth('115px', '90%', 'alonerow1') // 单独一行字段宽度控制
    this.setLabelAndWrapperWidth('160px', '86%', 'alonerow2') // 单独一行字段宽度控制
    this.setLabelAndWrapperWidth('191px', '84%', 'alonerow3') // 单独一行字段宽度控制
  },
  mounted () {
    this.getDictionarieMore()
    this.getnation() // 健康状况字典上数据
    this.getdisabiliytype() // 残疾类型字典数据
    this.getleave() // 残疾等级字典数据
    this.searchForm.resetFields()
    this.isConcentratedFeed = ''
    this.isType = ''
    this.setHeight('one', 'oneout', !this.issearch)
    this.arealevel1 = window.parent.indexTool.getUserInfo().areaLevel
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.nowkey1 = '1' // 默认事实无人抚养的tab
    this.disabledType1 = false
    this.disabledEnjoy = false
    this.isshow = true
    this.isgoback = false
    if (this.areaId != '1000000000000000000') {
      this.addressmodel = [this.areaId]
    } else {
      this.addressmodel = []
    }
    this.$nextTick(() => {
      this.searchslist()
    })
  },
  activated () {
    if (this.$route.query.areaCode) {
      this.isshow = false
      this.isgoback = true
      this.isConcentratedFeed = this.$route.query.isConcentratedFeed
      this.areaId = this.$route.query.areaCode
      this.page = 1
      const formselsct = this.$route.query.formData
      if (formselsct.applyDateStart && formselsct.applyDateEnd) {
        formselsct.applyDate = [moment(formselsct.applyDateStart), moment(formselsct.applyDateEnd)]
      }
      if (formselsct.birthdayStart && formselsct.birthdayEnd) {
        formselsct.birthday = [moment(formselsct.birthdayStart), moment(formselsct.birthdayEnd)]
      }
      if (formselsct.thisMonthDate) {
        formselsct.thisMonthDate = moment(formselsct.thisMonthDate, 'YYYY-MM')
      }
      if (formselsct.yearsStart) {
        formselsct.yearsStart = moment(formselsct.yearsStart, 'YYYY-MM')
      }

      if (formselsct.isEnjoySubsidies && formselsct.isEnjoySubsidies == '1') {
        this.disabledType1 = false
      }
      if (formselsct.issueType) {
        formselsct.issueType = formselsct.issueType.split(',')
      }
      this.searchForm.setFieldsValue(formselsct)
      let areaArray = this.$route.query.areaArray.split('/').slice(1)
      areaArray = areaArray.map(item => {
        return item.trim()
      })
      this.addressmodel = areaArray
      this.setaddress()
      // this.getWelfareOrgNameList()
      this.$nextTick(() => {
        if (this.$route.query.areaCode) {
          if (this.$route.query.welfareOrgId) {
            this.searchForm.setFieldsValue({ welfareOrgId: this.$route.query.welfareOrgId })
            this.searchslist()
          }
        }
      })
    }
    if (this.$route.query.isFromSearch) {
      if (this.$route.query.formDataSearch.address_Linkage) {
        this.addressmodel = this.$route.query.formDataSearch.address_Linkage
        this.setaddress()
        // this.getWelfareOrgNameList()
      }
      if (this.$route.query.formDataSearch.healthStatus) {
        this.heathval = this.$route.query.formDataSearch.healthStatus
      }
      this.nowkey1 = this.$route.query.formDataSearch.nowkey1
      this.$nextTick(() => {
        this.searchForm.setFieldsValue(this.$route.query.formDataSearch)
        // this.searchslist()
      })
    }
    this.obj = {}
    const url = window.location.href
    var params = url.split('?')[1].split('&')
    params.map((item) => { this.obj[item.split('=')[0]] = item.split('=')[1] })
    if (this.obj.satate) {
      if (this.obj.satate == '1') {
        this.isType = '1'
      }
      if (this.obj.satate == '2') {
        this.isType = '2'
        this.disabledType1 = false
        this.searchForm.setFieldsValue({
          sfStatus: '1',
          isEnjoySubsidies: '1',
          yearsStart: moment(new Date(), 'YYYY-MM'),
          issueType: ['0', '1']
        })
      }
      if (this.obj.satate == '4') {
        this.disabledType1 = false
        this.searchForm.setFieldsValue({
          sfStatus: '3',
          isEnjoySubsidies: '1',
          yearsStart: moment(new Date(), 'YYYY-MM'),
          issueType: ['0', '1']
        })
      }
      if (this.obj.satate == '5') {
        this.disabledType1 = false
        this.searchForm.setFieldsValue({
          sfStatus: '2',
          isEnjoySubsidies: '1',
          yearsStart: moment(new Date(), 'YYYY-MM'),
          issueType: ['0', '1']
        })
      }
      if (this.obj.satate == '3') {
        this.isType = '3'
        this.disabledType1 = true
        this.searchForm.setFieldsValue({
          sfStatus: '3',
          isEnjoySubsidies: '0',
          issueType: [],
          yearsStart: moment(new Date(), 'YYYY-MM')
        })
      }
    }
  },
  methods: {
    async getDictionarieMore () {
      this.yesNoList = await this.getDictionaries('YESNO')
      this.employmentlist = await this.getDictionaries('EMPLOYMENTSITUATION')
      this.presentsituationlist = await this.getDictionaries('PRESENTSITUATION')
      this.sexList = await this.getDictionaries('SEX')
      this.nationList = await this.getDictionaries('NATION')
      this.censusregisterList = await this.getDictionaries('CENSUSREGISTER')
      this.houseHoldList = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFY')
      this.schoolingList = await this.getDictionaries('DEGREEEDUCATION')
      this.helpMeasurelist = await this.getDictionaries('OTHERSALVATIONOFUNATTENDED') // 保障情况字典
      this.adisConditionList = await this.getDictionaries('ADISCONDITION') // 获取患艾滋病情况字典数据
      this.transmissionWayList = await this.getDictionaries('TRANSMISSIONWAYOTHER') // 获取最有可能感染艾滋病途径字典数据
    },
    setaddress () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({
          address_Linkage: this.addressmodel
        })
      })
    },
    // 患艾滋病情况
    radiochange (val) {
      this.radiovalue = val.target.value + ''
      if (val.target.value != this.Enum.ADISCONDITION.XDHGRAZB) {
        this.radiovalues = ''
      }
    },
    // 最有可能感染艾滋病途径
    channel (val) {
      this.radiovalues = val.target.value + ''
    },
    // 健康狀況字典
    async getnation () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
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
    // 残疾等级  DISABILITYLEVEL
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
    },
    // 健康状况的change事件
    onChange (e) {
      this.searchForm.setFieldsValue({
        disabledType: [],
        healthStatusOther: ''
      })
      this.heathval = e.target.value
      this.getdisabiliytype(e.target.value)
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.issearch)
      })
    },
    // 如果选了多重残疾外的超过2个残疾，则多重残疾为选中
    setMulti (e) {
      const index = e.indexOf(this.Enum.DISABILITYTYPE.DCCJ)
      // 选择超过两个（不包括多重残疾）时，勾选多重残疾
      if (index == -1 && e.length > 1) {
        e.push(this.Enum.DISABILITYTYPE.DCCJ)
        this.disabilityTypeValues = e
      }
      // 除多重残疾外，选择一个时，取消勾选多重残疾
      if (index != -1 && e.length == 2) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
      // 不能直接选择多重残疾
      if (index != -1 && e.length == 1) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
    },
    goHandle (value, id, searchForm, b) {
      this.deuRadios(value, id, searchForm, b, this)
    },
    nullThen () {
      this.heathval = ''
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.issearch)
      })
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    Register () {
      this.isType = '1'
      this.disabledType1 = true
      this.disabledType2 = true
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      if (this.areaId != '1000000000000000000') {
        this.addressmodel = [this.areaId]
      }
      this.$nextTick(() => {
        this.searchslist()
      })
    },
    RegisterEnjoy () {
      this.isType = '2'
      this.disabledType1 = false
      this.disabledType2 = true
      this.searchForm.setFieldsValue({
        sfStatus: '1',
        isEnjoySubsidies: '1',
        yearsStart: moment(new Date(), 'YYYY-MM'),
        issueType: ['0', '1']
      })
      this.$nextTick(() => {
        this.searchslist()
      })
    },
    RegisterNotEnjoy () {
      this.isType = '3'
      this.disabledType1 = true
      this.disabledType2 = false
      this.searchForm.setFieldsValue({
        sfStatus: '3',
        isEnjoySubsidies: '0',
        issueType: [],
        yearsStart: moment(new Date(), 'YYYY-MM')
      })
      this.$nextTick(() => {
        this.searchslist()
      })
    },
    searchslist () {
      this.issearch = false
      this.setHeight('one', 'oneout', !this.issearch)
      this.spinning = true
      this.handleSubmit('search')
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.type = this.nowkey1
      if (this.isConcentratedFeed != '') {
        formData.isConcentratedFeed = this.isConcentratedFeed
      }
      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      // 患艾滋病情况其他及最可能感染其他处理
      if (formData.aidsSituation == this.Enum.ADISCONDITION.QT) {
        formData.aidsSituationOther = this.$refs.aidsSituationOther.stateValue // 添加其他情况
      }
      if (formData.probablyInfectedWay == this.Enum.TRANSMISSIONWAYOTHER.QT) {
        formData.probablyInfectedWayOther = this.$refs.probablyInfectedWayOther.stateValue // 添加其他途径
      }

      this.changetime(formData)
      if (formData.yearsStart) {
        formData.yearsStart = moment(formData.yearsStart).format('YYYY-MM')
      }
      if (formData.applyDateStart) {
        formData.applyDateStartStr = formData.applyDateStart
        delete formData.applyDateStart
      }
      if (formData.applyDateEnd) {
        formData.applyDateEndStr = formData.applyDateEnd
        delete formData.applyDateEnd
      }
      this.emptyText = '暂无数据'
      return formData
    },
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = 'auto'
        } else {
          node.style.height = '115px'
        }
        node.style.transition = 'all 1s'
      })
    },
    // 导航菜单tab切换-详细列表页面
    callback1 (val) {
      this.nowkey1 = val.target.value
      this.resetFrom()
      // this.handleSubmit('search')
    },
    resetFrom () {
      this.isType = ''
      this.searchForm.resetFields()
      this.isConcentratedFeed = ''
      this.disabledType1 = false
      this.disabledType2 = false
      this.disabledEnjoy = false
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      // this.searchForm.setFieldsValue({yearsStart: moment(new Date(), 'YYYY-MM')})
      // this.searchForm.setFieldsValue({isEnjoySubsidies: '1'})
      if (this.areaId != 1000000000000000000) {
        this.addressmodel = [this.areaId]
      } else {
        this.addressmodel = []
      }
      this.setaddress()
      this.adsvalchange()
      this.heathval = '1'
      this.searchslist()
    },
    // 根据输入项进行筛选
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    // 获取福利机构数据
    getWelfareOrgNameList () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({ welfareOrgId: undefined })
        const addressAttr = this.searchForm.getFieldsValue().address_Linkage
        if (addressAttr && addressAttr.length > 0) {
          this.post('welfareOrgManagement/queryWelfareOrgsByareaId', { areaId: addressAttr[addressAttr.length - 1] }).then((res) => {
            if (res.serviceSuccess) {
              this.welfareOrgNameList = res.data.data || []
            }
          })
          this.disabled = false
        } else {
          this.welfareOrgNameList = []
          this.disabled = true
        }
      })
    },
    adsvalchange (value, areaLevel) {
      this.getWelfareOrgNameList()
      if (areaLevel) {
        this.arealevel = areaLevel[areaLevel.length - 1].areaLevel
      } else {
        this.arealevel = ''
      }
    },
    changeIssueType (e) {
      if (e.length > 0) {
        this.searchForm.setFieldsValue({ isEnjoySubsidies: '1' })
        this.searchForm.setFieldsValue({ yearsStart: moment(new Date(), 'YYYY-MM') })
      }
      // else {
      //   this.searchForm.setFieldsValue({isEnjoySubsidies: null})
      //   this.searchForm.setFieldsValue({yearsStart: null})
      // }
    },
    changeYearsStart (date, dateString) {
      this.searchForm.setFieldsValue({ isEnjoySubsidies: '1' })
    },
    changeIsEnjoySubsidies (e) {
      if (e.target.value == '0') {
        this.searchForm.resetFields('issueType')
        this.searchForm.resetFields('yearsStart')
        this.searchForm.resetFields('thisMonthDate')

        this.disabledType1 = true
        this.$nextTick(() => {
          this.searchForm.setFieldsValue({ yearsStart: moment(new Date(), 'YYYY-MM-DD') })
        })
      } else {
        this.disabledType1 = false
        this.$nextTick(() => {
          this.searchForm.setFieldsValue({ yearsStart: moment(new Date(), 'YYYY-MM-DD') })
          this.searchForm.setFieldsValue({ issueType: ['0'] })
        })
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      if (selectedRowKeys.length > 0) {
        this.choes = false
        this.choesP = selectedRows
      }
    },
    goRecord () {
      this.$router.push({
        path: 'maintenancePaymentRecord',
        query: {
          baseId: this.choesP[0].baseId
        }
      })
    },
    Excel () {
      var data = this.userPageParams()
      if (!data.areaId) {
        data.areaId = window.parent.indexTool.getUserInfo().areaId
      }

      if (this.arealevel) {
        data.arealevel = this.arealevel
      } else {
        data.arealevel = window.parent.indexTool.getUserInfo().arealevel
      }
      let url = '/orphanLivingExpenses/exportUnattendedChildren'
      if (this.nowkey1 == '1') { // 事实无人抚养
        url = '/orphanLivingExpenses/exportUnattendedChildrenOnly'
      }

      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    see (val, obj) {
      const formData = this.searchForm.getFieldsValue()
      formData.pathUrl = this.$route.path.substr(1)
      formData.nowkey1 = this.nowkey1
      if (this.nowkey1 == '1') { // 事实无人抚养儿童
        this.$router.push({
          path: 'noonesupportfact',
          query: {
            isFromSearch: true,
            formDataSearch: JSON.stringify(formData),
            tm: obj.isExit == 0,
            id: obj.addUnattendedId,
            status: 1,
            childtypedisabled: 1,
            isdisabled: 1
          }
        })
      } else if (this.nowkey1 == '2') { // 监护不当儿童
        this.$router.push({
          name: 'improperCareCollection',
          query: {
            isFromSearch: true,
            formDataSearch: JSON.stringify(formData),
            jump: 'yes',
            id: obj.addUnattendedId,
            disabled: true,
            nowkey: null
          }
        })
      } else if (this.nowkey1 == '3') { // pinkunjiating
        this.$router.push({
          name: 'poorFamiliesChildrenCollection',
          query: {
            isFromSearch: true,
            formDataSearch: JSON.stringify(formData),
            jump: 'yes',
            id: obj.addUnattendedId,
            disabled: true,
            nowkey: obj.childType,
            bigType: '1'
          }
        })
      } else if (this.nowkey1 == '4') { // pinkunjiating
        this.$router.push({
          name: 'disabledChildrenCollection',
          query: {
            isFromSearch: true,
            formDataSearch: JSON.stringify(formData),
            jump: 'yes',
            id: obj.addUnattendedId,
            disabled: true,
            nowkey: obj.childType

          }
        })
      }
    },
    fnCustomRow (record, index) {
      return {
        props: {},
        on: {
          // 事件:支持DOM的标准事件,使用箭头表达式写法
          click: e => {
            if (this.choesP) {
              this.mixRowSelection.selectedRowKeys = []
              this.choesP = []
              this.choes = true
            }
            if (event.detail == 2) {
              this.see('', record)
            }
          }
        }
      }
    },
    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },

    handleOk (e) {
      this.exports()
      this.showOn = false
    },

    async exports () {
      const ss = this.searchForm.getFieldsValue()
      ss.name = ss.name ? ss.name : ''
      ss.employeeNumber = ss.employeeNumber ? ss.employeeNumber : ''
      window.location.href = `${window.faceConfig.basePath}/employeeManagement/export?name=${ss.name}&&employeeNumber=${ss.employeeNumber}`
    },
    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    goback () {
      this.$router.go(-1)
      this.isgoback = false
    }
  }

}
</script>
<style scoped>
::-webkit-scrollbar {
  width: 16px; /*滚动条宽度*/
  height: 16px; /*滚动条高度*/
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: red; /*滚动条的背景颜色*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: green; /*滚动条的背景颜色*/
}
.searchcont {
  width: 100%;
  position: relative;
  height: 100px;
  overflow: hidden;
  transition: all 0.5s;
  width: 100%;
  height: 70px;
  border-bottom: 13px solid #e4e4e4;
  margin-bottom: 10px;
}
.searchcont {
  height: 66px;
  transition: all 1s ease 0s;
  position: absolute;
  width: 100%;
  z-index: 100;
  background: rgb(255, 255, 255);
}
.searchfroms {
  width: 100%;
}
.searchbtn {
  width: 330px;
  flex: 0 0 auto;
  margin-left: 20px;
  margin-top: 2px;
}
.ant-tabs-extra-content {
  display: none;
}
.searchdata {
  height: 100%;
}
.spilwid1,
.spilwid4,
.alonerow1,
.alonerow2,
.alonerow3 {
  width: 100%;
}
.alonerow1 {
  width: 100%;
}
.spilwid2 {
  width: 410px;
}
.__form-spec-line__ {
  display: flex;
}
.spilwid3 {
  width: 280px;
}
.formBtn {
  margin-bottom: 20px;
  margin-left: 32px;
}
</style>
