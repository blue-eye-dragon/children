<template>
  <div class="searchdata"
       id="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item class="spilwid"
                          label="主要照料人"
                          fieldDecoratorId="primaryCaregiverName"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入主要照料人" />
            </ta-form-item>
            <ta-form-item class="spilwid"
                          label="寄养儿童"
                          fieldDecoratorId="childrenName"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入寄养儿童" />
            </ta-form-item>
            <ta-form-item class="spilwid"
                          label="寄养状态"
                          fieldDecoratorId="fosterStatus"
                          :fieldDecoratorOptions="{initialValue: ''}"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择寄养状态">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in fosterList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div style="margin-bottom: 10px">
          <ta-button type="primary"
                     icon="plus"
                     :disabled="!selectedRows.id"
                     @click="selectChild()">寄养儿童选择</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="relationStatus"
                slot-scope="a, b, c">
            <span v-if='a==1'
                  class="com_tobesubmitted">{{ '待寄养' }}</span>
            <span v-if='a==2'
                  class="com_inaudit">{{ '融合中' }}</span>
            <span v-if='a==3'
                  class="com_inaudit">{{ '寄养中' }}</span>
            <span v-if='a==4'
                  class="com_adopt">{{ '融合结束' }}</span>
            <span v-if='a==5'
                  class="com_reject">{{ '已解除' }}</span>

          </span>
          <span slot="action"
                slot-scope="text, record, index"
                class="btnlist">
            <span class='com_correlation'
                  @click="fuse(record)"
                  v-if="record.relationStatus == 1 && record.childrenName">寄养融合</span>
            <span class='com_correlation'
                  @click="fosterrelations(record)"
                  v-if="record.relationStatus == 1 && record.childrenName">直接确立寄养关系</span>

            <span class='com_relieve'
                  @click="cancelfusion(record)"
                  v-if="record.relationStatus == 2 ">取消融合</span>
            <span v-if="record.relationStatus == 4">
              <span class='com_polish'
                    @click="assessment(record)"
                    v-if="record.assessmentResult == '' || !record.assessmentResult">融合评估</span>
              <span class='com_continue'
                    @click="fosterrelations(record)"
                    v-if="!(record.assessmentResult == '' || !record.assessmentResult)">确立寄养关系</span>
            </span>
            <span @click="releasefostercare(record)"
                  class='com_relieve'
                  v-if="record.relationStatus == 3">解除寄养关系</span>

            <ta-popconfirm title="确认删除吗?"
                           @confirm="deletes(text, record, index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">

              <span class="com_textdel"
                    v-if="record.relationStatus == 1 && record.childrenName">删除</span>

            </ta-popconfirm>

          </span>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <!--融合评估-->
    <ta-drawer title="融合评估"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="assessmentshow"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form v-if='assessmentshow'
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name"
                      :labelCol="{ span: 6 }">
          <p style="line-height: 38px;margin-bottom: -13px;">{{selecteddata.childrenName}}</p>
        </ta-form-item>
        <ta-form-item label="融合开始日期"
                      fieldDecoratorId="fuseStartDate"
                      :fieldDecoratorOptions="rules.fuseStartDate"
                      :labelCol="{ span: 6 }">
          <ta-date-picker style="width: 100%;"
                          :disabled="true"
                          placeholder="请选择融合开始日期"
                          v-model="startValue01"
                          :disabledDate="disabledStartDate01" />
        </ta-form-item>
        <ta-form-item label="融合结束日期"
                      fieldDecoratorId="fuseEndDate"
                      :fieldDecoratorOptions="rules.fuseEndDate"
                      :labelCol="{ span: 6 }">
          <ta-date-picker style="width: 100%;"
                          :disabled="true"
                          placeholder="请选择融合结束日期"
                          v-model="endValue01"
                          :disabledDate="disabledEndDate01" />
        </ta-form-item>
        <ta-form-item label="评估日期"
                      fieldDecoratorId="assessmentDate"
                      :fieldDecoratorOptions="rules.assessmentDate">
          <ta-date-picker style="width: 100%;"
                          placeholder="请选择评估日期"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label="评估人员"
                      fieldDecoratorId="assessmentMenber"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.assessmentMenber">
          <ta-input placeholder="请输入评估人员" />
        </ta-form-item>
        <ta-form-item label="评估意见"
                      fieldDecoratorId="assessmentOpinion"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.assessmentOpinion">
          <ta-textarea placeholder="请输入评估意见"
                       :rows="4" />
        </ta-form-item>
        <ta-form-item label="评估结果"
                      fieldDecoratorId="assessmentResult"
                      :fieldDecoratorOptions="rules.assessmentResult">
          <ta-select placeholder="请选择评估结果">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in reslustList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="assessmentsub"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
    <!--寄养融合-->
    <ta-modal title="寄养融合"
              v-model="fuseshow"
              width="40%"
              @ok="fuseshowOk"
              @cancel="fuseCancel">
      <ta-form layout="horizontal"
               v-if="fuseshow"
               :autoFormCreate="(childrenForm)=>{this.childrenForm = childrenForm}">
        <div class="fromcom">
          <ta-col :span="24">
            <ta-form-item label="儿童姓名"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <p style="line-height: 38px;margin-bottom: -13px;">{{selecteddata.childrenName}}</p>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="融合开始日期"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          :fieldDecoratorId="'fuseStartDate'"
                          :require="{message:'请选择融合开始日期'}">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              placeholder="请选择融合开始日期"
                              v-model="obj['startValue']"
                              :disabledDate="disabledStartDate01" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="融合结束日期"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          :fieldDecoratorId="'fuseEndDate'"
                          :require="{message:'请选择融合结束日期'}">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              placeholder="请选择融合结束日期"
                              v-model="obj['endValue']"
                              :disabledDate="disabledEndDate01" />
            </ta-form-item>
          </ta-col>
        </div>
      </ta-form>
      <div style="clear:both"></div>
    </ta-modal>
    <!--寄养儿童选择-->
    <ta-modal title="寄养儿童选择"
              v-model="fuseshow1"
              width="90%"
              @ok="fuseshowOk1"
              @cancel="fuseCancel1">
      <ta-form layout="horizontal"
               v-if="fuseshow1"
               :autoFormCreate="(childrenForm1)=>{this.childrenForm1 = childrenForm1}">
        <Setliving types="1"
                   :isall="false"
                   @addall="addall"
                   @searchall="searchall"
                   @searchone="searchone"
                   :childList.sync="grantList"></Setliving>
      </ta-form>
      <div style="clear:both"></div>
    </ta-modal>
    <ta-modal title="查找儿童"
              v-model="visible"
              width="90%"
              :footer="null">
      <ChoiceChildren :tableColumns="chlidtableColumns"
                      v-if="visible"
                      :ishide="false"
                      @addsure="addsure"
                      :searchdata="searchdata"
                      url="/fosterFamilyAndChildRelation/queryWaitingForFosterCareList"></ChoiceChildren>
    </ta-modal>
    <!--取消融合-->
    <ta-drawer title="取消融合"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="cancelfusionhowCancel"
               :visible="cancelfusionhow"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form v-if='cancelfusionhow'
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name"
                      :labelCol="{ span: 6 }">
          <p style="line-height: 38px;margin-bottom: -10px;">{{selecteddata.childrenName}}</p>
        </ta-form-item>
        <ta-form-item label="融合开始日期"
                      fieldDecoratorId="fuseStartDate"
                      :fieldDecoratorOptions="rules.fuseStartDate"
                      :labelCol="{ span: 6 }">
          <ta-date-picker :disabled="true"
                          style="width: 100%;"
                          placeholder="请选择融合开始日期"
                          v-model="startValue03"
                          :disabledDate="disabledStartDate03" />
        </ta-form-item>
        <ta-form-item label="融合结束日期"
                      fieldDecoratorId="fuseEndDate"
                      :fieldDecoratorOptions="rules.fuseEndDate"
                      :labelCol="{ span: 6 }">
          <ta-date-picker :disabled="true"
                          style="width: 100%;"
                          placeholder="请选择融合结束日期"
                          v-model="endValue03"
                          :disabledDate="disabledEndDate03" />
        </ta-form-item>
        <ta-form-item label="取消融合原因"
                      fieldDecoratorId="cancelFuseReason"
                      :fieldDecoratorOptions="rules.cancelFuseReason">
          <ta-textarea placeholder="请输入取消融合原因"
                       :rows="4" />
        </ta-form-item>
        <ta-form-item label="取消融合日期"
                      fieldDecoratorId="cancelFuseDate"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.cancelFuseDate">
          <ta-date-picker style="width: 100%;"
                          placeholder="请选择取消融合日期"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="cancelfusionhowCancel">取消</ta-button>
        <ta-button @click="cancelfusionhowOk"
                   type="primary">确定</ta-button>
      </div>
      <div style="clear:both"></div>
    </ta-drawer>
    <!--确定寄养关系-->
    <ta-drawer title="确定寄养关系"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="fostershowCancel"
               :visible="fostershow"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <!-- <ta-modal title="确定寄养关系" v-model="fostershow" width="1200px" @ok="fostershowOk" @cancel="fostershowCancel"> -->
      <ta-form layout="horizontal"
               v-if="fostershow"
               :autoFormCreate="(childrenForm)=>{this.childrenForm = childrenForm}">
        <div>
          <!-- <ta-col
            :span="21"
            :offset="3"
            class="fromone"
          >-->
          <!-- <ta-col :span="12"> -->
          <ta-form-item label="儿童姓名">
            <span style="line-height: 38px;margin-bottom: -10px;">{{selecteddata.childrenName}}</span>
          </ta-form-item>
          <ta-form-item label="寄养开始日期"
                        fieldDecoratorId="fosterStartDate"
                        :fieldDecoratorOptions="rules.fosterStartDate">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            placeholder="请选择寄养开始日期"
                            v-model="startValue04"
                            :disabledDate="disabledStartDate04" />
          </ta-form-item>
          <!-- </ta-col> -->
          <!-- <ta-col :span="12"> -->
          <ta-form-item label="寄养关系确定日期"
                        fieldDecoratorId="fosterRelationConfirmDate"
                        :require="{message:'请选择寄养关系确定日期'}">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            placeholder="请选择寄养关系确定日期"
                            :disabledDate="disabledDate1" />
          </ta-form-item>
          <ta-form-item label="寄养结束日期"
                        fieldDecoratorId="forsterEndDate"
                        :fieldDecoratorOptions="rules.forsterEndDate">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            placeholder="请选择寄养结束日期"
                            v-model="endValue04"
                            :disabledDate="disabledEndDate04" />
          </ta-form-item>
          <!-- </ta-col> -->
          <!-- <ta-col :span="24"> -->
          <ta-form-item label="寄养协议"
                        fieldDecoratorId="filePathVoId"
                        :require="{message:'请上传寄养协议'}">
            <ta-upload :withCredentials="true"
                       name="file"
                       :action="action"
                       :multiple="true"
                       :data="adoption"
                       :fileList="fileList"
                       @preview="handlePreview"
                       :beforeUpload="beforeUpload"
                       @change="handleChangeadoption">
              <div>
                <ta-button>
                  <ta-icon type="upload" />上传
                </ta-button>
              </div>
            </ta-upload>
            <p class="warntext"
               style="font-size:14px;height: 70px;">
              <ta-icon type="info-circle-o"
                       class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
            </p>
          </ta-form-item>
          <!-- </ta-col> -->
          <!-- </ta-col> -->
        </div>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="fostershowCancel">取消</ta-button>
        <ta-button @click="fostershowOk"
                   type="primary">确定</ta-button>
      </div>
      <div style="clear:both"></div>
    </ta-drawer>
    <!-- </ta-modal> -->

    <!--解除寄养关系-->
    <ta-drawer title="解除寄养关系"
               width="500"
               placement="right"
               @close="relieveshowCancel"
               :getContainer="setContainer"
               :visible="relieveshow"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form v-if='relieveshow'
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name"
                      :labelCol="{ span: 6 }">
          <p style="line-height: 38px;margin-bottom: -10px;">{{selecteddata.childrenName}}</p>
        </ta-form-item>
        <ta-form-item label="寄养开始日期"
                      fieldDecoratorId="fosterStartDate"
                      :fieldDecoratorOptions="rules.fosterStartDate"
                      :labelCol="{ span: 6 }">
          <ta-date-picker style="width: 100%;"
                          :disabled="true"
                          placeholder="请选择寄养开始日期"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label="寄养结束日期"
                      fieldDecoratorId="forsterEndDate"
                      :fieldDecoratorOptions="rules.forsterEndDate"
                      :labelCol="{ span: 6 }">
          <ta-date-picker style="width: 100%;"
                          :disabled="true"
                          placeholder="请选择融合结束日期"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label="解除寄养关系原因"
                      fieldDecoratorId="cancelFosterRelationReason"
                      :fieldDecoratorOptions="rules.cancelFosterRelationReason">
          <ta-textarea placeholder="请输入解除寄养关系原因"
                       :rows="4" />
        </ta-form-item>
        <ta-form-item label="寄养关系解除日期"
                      fieldDecoratorId="cancelFosterRelationDate"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.cancelFosterRelationDate">
          <ta-date-picker style="width: 100%;"
                          placeholder="请选择寄养关系解除日期"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="relieveshowCancel">取消</ta-button>
        <ta-button @click="relieveshowOk"
                   type="primary">确定</ta-button>
      </div>
      <div style="clear:both"></div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import ChoiceChildren from '@component/common/components/ChoiceChildren'
import Setliving from '../../../welfareFunds/fundsToIssue/components/setliving'
import moment from 'moment'
var e = null
var nowindex = null
const chlidtableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  // {
  //   title: '儿童编号',
  //   dataIndex: 'childNumber'
  // },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '120px',
    overflowTooltip: true
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: '120px'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex',
    width: '120px'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '120px'
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA',
    width: '120px'
  },
  {
    title: '登记增员日期',
    dataIndex: 'registerDate',
    width: '120px'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  components: {
    ChoiceChildren,
    Setliving
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    const tableColumns = [
      {
        title: '选择',
        dataIndex: 'radio',
        align: 'center',
        width: 80,
        // scopedSlots: { customRender: 'num' },
        customRender: (text, record, index) => {
          return this.marge(text, record, index, 'radio')
        }
      },
      {
        title: '序号',
        dataIndex: 'serialNum',
        align: 'center',
        width: 80,
        // scopedSlots: { customRender: 'num' },
        customRender: (text, record, index) => {
          return this.marge(text, record, index, 'serialNum')
        }
      },
      {
        title: '主要照料人',
        dataIndex: 'primaryCaregiverName',
        width: '20%',
        overflowTooltip: true,
        customRender: (text, record, index) => {
          return this.marge(text, record, index, 'primaryCaregiverName')
        }
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: '15%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, 'sex')
        }
      },
      // {
      //   title: '出生日期',
      //   dataIndex: 'birthday',
      //   width: 120,
      //   customRender: (text, record, index) => {
      //     return this.marge(text, record, index)
      //   }
      // },
      {
        title: '家庭评估分数',
        width: '20%',
        dataIndex: 'assessmentPersonInCharge',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, 'assessmentPersonInCharge')
        }
      },
      {
        title: '寄养儿童',
        dataIndex: 'childrenName',
        width: '18%',
        overflowTooltip: true
      },
      {
        title: '寄养关系确定日期',
        width: '22%',
        dataIndex: 'fosterRelationConfirmDate'
      },
      {
        title: '寄养状态',
        dataIndex: 'relationStatus',
        width: '18%',
        // collectionType: 'FOSTER_STATUS'
        scopedSlots: { customRender: 'relationStatus' }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 400,
        scopedSlots: { customRender: 'action' }
        // customRender: (value, record, index) => {
        //   const template = (
        //     <div class="btnlist">
        //       <span class='com_correlation' onClick={() => this.fuse(record)} style={{ display: record.relationStatus == 1 && record.childrenName ? 'inline-block' : 'none' }}>寄养融合</span>
        //       <span class='com_correlation' onClick={() => this.fosterrelations(record)} style={{ display: record.relationStatus == 1 && record.childrenName ? 'inline-block' : 'none' }}>直接确立寄养关系</span>
        //       <ta-popconfirm title="确定删除吗?" onClick={() => this.deletes(value, record, index)} onClick={() => this.cancel()} okText="确定" cancelText="取消">
        //         <span class="com_textdel">删除</span>
        //       </ta-popconfirm>

        //       <span class='com_relieve' onClick={() => this.cancelfusion(record)} style={{ display: record.relationStatus == 2 ? 'inline-block' : 'none' }}>取消融合</span>
        //       <div style={{ display: record.relationStatus == 4 ? 'inline-block' : 'none' }}>
        //         <span
        //           class='com_polish'
        //           onClick={() => this.assessment(record)}
        //           style={{ display: record.assessmentResult == ' ' || !record.assessmentResult ? 'inline-block' : 'none' }}
        //         >融合评估</span>
        //         <span class='com_continue' onClick={() => this.fosterrelations(record)} style={{ display: !(record.assessmentResult == ' ' || !record.assessmentResult) ? 'inline-block' : 'none' }}>确立寄养关系</span>
        //       </div>
        //       <span onClick={() => this.releasefostercare(record)} class='com_relieve'
        //         style={{ display: record.relationStatus == 3 ? 'inline-block' : 'none' }}
        //       >解除寄养关系</span>
        //     </div >
        //   )
        //   const obj = {
        //     children: template,
        //     attrs: {}
        //   }
        //   return obj
        // }
      }
    ]
    return {
      tableColumns,
      chlidtableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/fosterFamilyAndChildRelation/list', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixDeleteURL: '/fosterFamilyAndChildRelation/deleteChildrenForFoster', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      fosterList: [],
      reslustList: [],
      rules: {
        fuseEndDate: this.verificationRules('融合开始日期', true),
        fuseStartDate: this.verificationRules('融合结束日期', true),
        assessmentDate: this.verificationRules('评估日期', true),
        assessmentMenber: this.verificationRules('评估人员', 72),
        assessmentOpinion: this.verificationRules('评估意见', 200, false),
        assessmentResult: this.verificationRules('评估结果'),
        cancelFuseReason: this.verificationRules('取消融合原因', 200, false),
        cancelFuseDate: this.verificationRules('取消融合日期', true),
        cancelFosterRelationReason: this.verificationRules(
          '解除寄养关系原因',
          200, true
        ),
        cancelFosterRelationDate: this.verificationRules(
          '寄养关系解除日期',
          true
        ),
        fosterStartDate: this.verificationRules('寄养开始日期', true),
        forsterEndDate: this.verificationRules('寄养开始日期', true)
      },

      selectedRows: {},
      // 行选择配置
      assessmentshow: false,
      selecteddata: {},
      searchdata: {},
      fuseshow: false,
      fuseshow1: false,
      visible: false,
      cancelfusionhow: false,
      relieveshow: false,
      fostershow: false,
      grantList: [],
      adoption: {
        functionalType: '1',
        busiType: '38'
      },
      fileList: [],
      haveChildNumber: 0,
      ischecked: false,
      obj: {}, // 动态生成的寄养时间数据对象
      startValue01: null, // 开始日期1
      endValue01: null, // 结束日期1
      startValue03: null, // 开始日期3
      endValue03: null, // 结束日期3
      startValue04: null, // 开始日期4
      endValue04: null // 结束日期4
    }
  },
  activated () {
    this.loadData()
  },
  mounted () {
    this.getfoster()
    this.getreslust()
  },
  methods: {
    loadData () {
      this.haveChildNumber = 0
      this.assessmentshow = false
      this.fuseshow = false
      this.fuseshow1 = false
      this.visible = false
      this.cancelfusionhow = false
      this.relieveshow = false
      this.ischecked = false
      this.fostershow = false
      this.grantList = []
      this.startValue01 = null // 开始日期1
      this.endValue01 = null // 结束日期1
      this.startValue03 = null // 开始日期3
      this.endValue03 = null // 结束日期3
      this.startValue04 = null // 开始日期4
      this.endValue04 = null // 结束日期4
    },
    // 单个删除
    async deletes (val, obj, index) {
      const params = {
        id: obj.relationId,
        fosterFamilyId: obj.id
      }
      console.log(params)
      const data = await this.post(this.mixListOptions.mixDeleteURL, params)
      if (data.errors === null) {
        this.$message.success('删除成功')
        this.handleSubmit()
      }
    },
    marge (text, record, index, name) {
      const obj = {
        children: text,
        attrs: {}
      }
      const isdisabled = record.haveChildNumber > 1
      obj.attrs.rowSpan = record.mergeNum

      // if (name == 'serialNum') {
      //   obj.children = (<div>
      //     <span>{this.size * (this.page - 1) + index + 1}</span>
      //   </div>)
      // }
      if (name == 'radio') {
        obj.children = (<div>
          <input type="radio" name="radio" onClick={() => this.add(record)} style={{
            width: '20px', height: '20px', display: record.haveChildNumber < 2 ? 'inline-block' : 'none'
          }} />
        </div>)
      }
      return obj
    },
    add (val) {
      this.selectedRows = val
    },
    // 开始日期处理
    disabledStartDate01 (e) {
      return this.disabledStartDate(e, '01', true)
    },
    // 结束日期处理
    disabledEndDate01 (e) {
      return this.disabledEndDate(e, '01', true)
    },
    // 开始日期处理
    disabledStartDate03 (e) {
      return this.disabledStartDate(e, '03', true)
    },
    // 结束日期处理
    disabledEndDate03 (e) {
      return this.disabledEndDate(e, '03', true)
    },
    // 开始日期处理
    disabledStartDate04 (e) {
      return this.disabledStartDate(e, '04', true)
    },
    // 结束日期处理
    disabledEndDate04 (e) {
      return this.disabledEndDate(e, '04', true)
    },
    // 开始日期控制
    disabledStartDate (startValue, num, type) {
      const endValue = type ? this[`endValue${num}`] : this.obj[`endValue${num}`]
      if (!startValue || !endValue) {
        if (num == '04' && this.selecteddata.fuseEndDate) {
          return startValue.valueOf() < moment(this.selecteddata.fuseEndDate)
        } else {
          return false
        }
      } else { // 开始日期小于结束日期
        if (num == '04' && this.selecteddata.fuseEndDate) {
          return startValue.valueOf() >= endValue.valueOf() || startValue.valueOf() < moment(this.selecteddata.fuseEndDate)
        } else {
          return startValue.valueOf() >= endValue.valueOf()
        }
      }
    },
    // 结束日期控制
    disabledEndDate (endValue, num, type) {
      const startValue = type ? this[`startValue${num}`] : this.obj[`startValue${num}`]
      if (!startValue || !endValue) {
        if (num == '04' && this.selecteddata.fuseEndDate) {
          return endValue.valueOf() < moment(this.selecteddata.fuseEndDate)
        } else {
          return false
        }
      } else { // 结束日期大于开始日期
        return startValue.valueOf() >= endValue.valueOf()
      }
    },
    setContainer () {
      return this.set_Container('searchdata')
    },
    handlePreview (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleChangeadoption (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        this.fileList = info.fileList
        // this.childrenForm.setFieldsValue({
        //   filePathVoId: undefined // undefined
        // })
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.fileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    // 选择儿童
    selectChild () {
      const val = this.selectedRows
      this.haveChildNumber = val.haveChildNumber
      this.grantList = []
      const str = JSON.stringify(val)
      this.selecteddata = JSON.parse(str)

      this.fuseshow1 = true
      this.$nextTick(() => {
        this.childrenForm1.resetFields()
      })
    },
    // 融合
    fuse (val) {
      this.haveChildNumber = val.haveChildNumber
      const str = JSON.stringify(val)
      this.selecteddata = JSON.parse(str)

      this.fuseshow = true
      this.$nextTick(() => {
        this.childrenForm.resetFields()
      })
    },
    // 选择儿童
    async fuseshowOk1 () {
      if (this.grantList.length == 0) {
        this.$message.error('请选择儿童')
        return false
      }
      const arr1 = []
      this.grantList.map((item, index) => {
        const obj = {}
        obj.fosterFamilyId = this.selecteddata.id
        obj.fosterChildId = item.id
        arr1.push(obj)
      })
      const params = {
        // FosterFuseListVo: {
        list: arr1
        // }
      }
      const resObj = await this.post(
        '/fosterFamilyAndChildRelation/chooseChildrenForFoster',
        params,
        true
      )
      if (resObj.errors === null) {
        this.$message.success('寄养儿童选择成功')
        this.handleSubmit()
        this.fuseshow1 = false
        this.selectedRows = {}
      }
    },
    // 融合接口
    async fuseshowOk () {
      this.childrenForm.validateFields(async (err, values) => {
        if (!err) {
          const data = this.childrenForm.getFieldsValue()
          const arr = []
          const obj = {}
          obj.id = this.selecteddata.relationId
          obj.fosterFamilyId = this.selecteddata.id
          obj.fosterChildId = this.selecteddata.fosterChildId
          console.log(data, 111)
          obj.fuseStartDate = data.fuseStartDate.format(
            'YYYY-MM-DD'
          )
          obj.fuseEndDate = data.fuseEndDate.format('YYYY-MM-DD')
          const params = obj
          const resObj = await this.post(
            '/fosterFamilyAndChildRelation/saveFosterFuse',
            params,
            true
          )
          if (resObj.errors === null) {
            this.$message.success('融合成功')
            this.handleSubmit()
            this.startValue01 = null // 开始日期1
            this.endValue01 = null // 结束日期1
            this.fuseshow = false
          }
        }
      })
    },
    fuseCancel () {
      this.fuseshow = false
    },
    fuseCancel1 () {
      this.fuseshow1 = false
    },
    // 取消融合
    async cancelfusionhowOk () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const params = this.form.getFieldsValue()
          params.fosterFamilyId = this.selecteddata.id
          params.id = this.selecteddata.relationId
          params.fosterChildId = this.selecteddata.fosterChildId
          params.fuseEndDate = params.fuseEndDate.format('YYYY-MM-DD')
          params.fuseStartDate = params.fuseStartDate.format('YYYY-MM-DD')
          params.cancelFuseDate = params.cancelFuseDate.format('YYYY-MM-DD')
          const data = await this.post(
            '/fosterFamilyAndChildRelation/saveCancleFosterFuse',
            params,
            true
          )
          if (data.errors == null) {
            this.$message.success('取消融合成功')
            this.handleSubmit()
            this.startValue03 = null // 开始日期1
            this.endValue03 = null // 结束日期1
            this.cancelfusionhow = false
          }
        }
      })
      // this.cancelfusionhow = false
    },
    cancelfusionhowCancel () {
      this.cancelfusionhow = false
    },
    cancelfusion (val) {
      const str = JSON.stringify(val)
      this.selecteddata = JSON.parse(str)
      this.cancelfusionhow = true
      this.$nextTick(() => {
        this.form.resetFields()
        this.form.setFieldsValue({
          fuseStartDate: moment(this.selecteddata.fuseStartDate),
          fuseEndDate: moment(this.selecteddata.fuseEndDate)
        })
      })
    },
    async addall (val) {
      const data = await this.post(
        '/childrenInStudentAssistanceProjec/listAllChildren',
        {}
      )
      if (data.errors == null) {
        this.grantList = [...data.data.data]
        for (let i = 0; i < this.grantList.length; i++) {
          this.obj[`startValue${i}`] = null
          this.obj[`endValue${i}`] = null
        }

        this.$message.success('添加成功')
        this.handleSubmit()
      }
    },
    // 查找全部 回调
    searchall (val) {
      this.searchdata.name = ''
      this.visible = true
    },
    searchone (val, data) {
      this.searchdata.name = data
      this.visible = true
    },
    // 去重
    duplicateremoval (val, data) {
      let isrepeat = false
      val.map(item => {
        data.map(e => {
          if (e.id == item.id) {
            isrepeat = true
            this.repeatdata = item
            return false
          }
        })
      })
      return isrepeat
    },
    async addsure (val) {
      console.log(this.grantList.length, this.haveChildNumber)
      if (this.grantList.length == (2 - this.haveChildNumber)) {
        this.$message.error('最多寄养儿童数量为二')
        return false
      }
      const nowdata = this.grantList
      const isrepeat = this.duplicateremoval(val, nowdata)
      if (isrepeat) {
        this.$message.error(`${this.repeatdata.name}已添加`)
        return false
      }
      this.$message.success('添加成功')
      this.grantList = [...this.grantList, ...val]
      for (let i = 0; i < this.grantList.length; i++) {
        this.obj[`startValue${i}`] = null
        this.obj[`endValue${i}`] = null
      }
    },
    // 评估
    assessment (val) {
      const str = JSON.stringify(val)
      this.selecteddata = JSON.parse(str)
      this.assessmentshow = true
      this.$nextTick(() => {
        this.form.resetFields()
        this.form.setFieldsValue({
          fuseStartDate: moment(this.selecteddata.fuseStartDate),
          fuseEndDate: moment(this.selecteddata.fuseEndDate)
        })
      })
    },
    onClose () {
      this.assessmentshow = false
    },
    // 寄养评估 提交
    async assessmentsub () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const params = this.form.getFieldsValue()
          params.fosterFamilyId = this.selecteddata.id
          params.fosterChildId = this.selecteddata.fosterChildId
          params.id = this.selecteddata.relationId
          params.fuseEndDate = params.fuseEndDate.format('YYYY-MM-DD')
          params.fuseStartDate = params.fuseStartDate.format('YYYY-MM-DD')
          params.assessmentDate = params.assessmentDate.format('YYYY-MM-DD')
          const data = await this.post(
            '/fosterFamilyAndChildRelation/saveFuseAssessment',
            params,
            true
          )
          if (data.errors == null) {
            this.$message.success('评估成功')
            this.handleSubmit()
            this.assessmentshow = false
            this.startValue01 = null // 开始日期1
            this.endValue01 = null // 结束日期1
          }
        }
      })
    },
    // 解除
    releasefostercare (val) {
      const str = JSON.stringify(val)
      this.selecteddata = JSON.parse(str)
      this.relieveshow = true
      this.$nextTick(() => {
        this.form.resetFields()
        this.form.setFieldsValue({
          fosterStartDate: moment(this.selecteddata.fosterStartDate),
          forsterEndDate: moment(this.selecteddata.forsterEndDate)
        })
      })
    },
    relieveshowOk () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const params = this.form.getFieldsValue()
          params.fosterFamilyId = this.selecteddata.id
          params.fosterChildId = this.selecteddata.fosterChildId
          params.id = this.selecteddata.relationId
          params.fosterStartDate = params.fosterStartDate.format('YYYY-MM-DD')
          params.forsterEndDate = params.forsterEndDate.format('YYYY-MM-DD')
          params.cancelFosterRelationDate = params.cancelFosterRelationDate.format(
            'YYYY-MM-DD'
          )
          const data = await this.post(
            '/fosterFamilyAndChildRelation/saveCancelFosterRelation',
            params,
            true
          )
          if (data.errors == null) {
            this.$message.success('解除寄养关系成功')
            this.handleSubmit()
            this.relieveshow = false
          }
        }
      })
    },
    relieveshowCancel () {
      this.relieveshow = false
    },
    // 确定寄养关系
    fosterrelations (val) {
      const str = JSON.stringify(val)
      this.selecteddata = JSON.parse(str)
      this.fileList = []
      this.fostershow = true
      this.$nextTick(() => {
        this.childrenForm.resetFields()
      })
    },
    async fostershowOk () {
      this.childrenForm.validateFields({ force: true }, async (err, values) => {
        if (!err) {
          const params = this.childrenForm.getFieldsValue()
          const upLoadPathIds = []
          const fileids = [...params.filePathVoId.fileList]
          fileids.map(item => {
            upLoadPathIds.push(item.response.data.data.fileid)
          })
          params.filePathVoId = upLoadPathIds
          params.fosterFamilyId = this.selecteddata.id
          params.fosterChildId = this.selecteddata.fosterChildId
          params.id = this.selecteddata.relationId
          params.fosterRelationConfirmDate = params.fosterRelationConfirmDate.format(
            'YYYY-MM-DD'
          )
          params.fosterStartDate = params.fosterStartDate.format('YYYY-MM-DD')
          params.forsterEndDate = params.forsterEndDate.format('YYYY-MM-DD')
          const data = await this.post(
            '/fosterFamilyAndChildRelation/saveConfirmFosterRelation',
            params,
            true
          )
          if (data.errors == null) {
            this.$message.success('确定寄养成功')
            this.handleSubmit()
            this.fostershow = false
            this.startValue04 = null // 开始日期1
            this.endValue04 = null // 结束日期1
          }
        }
      })
    },
    fostershowCancel () {
      this.fostershow = false
      this.grantList = []
    },
    // 寄养状态 FOSTER_STATUS
    async getfoster () {
      const data = await this.getDictionaries('FOSTER_STATUS')
      this.fosterList = data
    },
    // 评估结果
    async getreslust () {
      const data = await this.getDictionaries('ASSESSMENT_RESULT')
      this.reslustList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    addAdoption (e, obj, index) {
      const str = JSON.stringify(obj)
    },
    // 日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    disabledDate1 (current) {
      if (this.selecteddata.fuseEndDate) {
        return current < moment(this.selecteddata.fuseEndDate)
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped lang="less">
.fromone {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px 20px 10px;
  margin-bottom: 20px;
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
