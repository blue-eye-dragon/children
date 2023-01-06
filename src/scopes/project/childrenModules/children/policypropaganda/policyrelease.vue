<template>
  <div class="searchdata ">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-col :span="24">
                  <ta-form-item label="省份"
                                v-if="al=='1'"
                                fieldDecoratorId="arearId"
                                class="spilwid"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}">
                    <ta-select placeholder="请选择所在省份">
                      <ta-select-option v-for="(item,index) in sfList"
                                        :value="item.areaid"
                                        :key="index">{{item.areaname}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>

                  <ta-form-item label="公文名称"
                                class="spilwid"
                                fieldDecoratorId="documentName"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}">
                    <ta-input placeholder="请输入公文名称" />
                  </ta-form-item>
                  <ta-form-item label="文号"
                                class="spilwid"
                                fieldDecoratorId="referenceNumber"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}">
                    <ta-input placeholder="请输入文号" />
                  </ta-form-item>
                  <ta-form-item label="信息来源"
                                class="spilwid"
                                fieldDecoratorId="informationSource"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}">
                    <ta-input placeholder="请输入信息来源" />
                  </ta-form-item>
                </ta-col>
                <ta-form-item label="关键字"
                              class="spilwid"
                              fieldDecoratorId="subjectHeadings"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入关键字" />
                </ta-form-item>
                <ta-form-item label="公文状态"
                              class="spilwid"
                              fieldDecoratorId="publishState"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择公文状态">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in fosterList"
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="主题分类"
                              class="spilwid"
                              fieldDecoratorId="subjectClassification"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择主题分类">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in subjectClassificationList"
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <!-- <ta-form-item label="发文日期"
                              class="spilwid1"
                              fieldDecoratorId="dispatchDate"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
                </ta-form-item> -->
              </div>
              <div class="searchbtn searchButton">
                <div class="searchButton">
                  <ta-button class="search "
                             icon="search"
                             @click="handleSubmit('search')">查询</ta-button>
                  <ta-button class="btnleft reset"
                             icon="reload"
                             @click="resetFrom">重置</ta-button>
                  <ta-button class="btnleft"
                             @click="advancedquery">
                    高级查询
                    <ta-icon :type="issearch?'up':'down'" />
                  </ta-button>
                </div>
              </div>
            </div>
          </ta-form>
        </div>
        <div class="operateBtn">
          <ta-button type="primary"
                     @click="add()">政策发布</ta-button>
        </div>
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="fb"
                slot-scope="a, b, c">
            <span :class="a==1?'com_adopt':'com_tobesubmitted'">{{ a==1?'已发布':a==0?'待发布':null}}</span>
          </span>
          <div slot="action"
               slot-scope="e,obj,index"
               class="btnlist">
            <!--<span>{{obj}}</span>-->
            <span @click="see(e,obj)"
                  v-if="obj.publishState==1"
                  class="com_textsee">查看</span>
            <span @click="printGo(e,obj)"
                  v-if="obj.publishState==1"
                  class="com_textsee">打印</span>
            <span @click="edit(obj)"
                  v-if="obj.publishState==0"
                  class="com_textedit">编辑</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(e,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.publishState ==0">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
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
    <!--抽屉-->
    <div class="teatareas">
      <ta-drawer title="政策发布"
                 placement="right"
                 width="1000"
                 :getContainer="setContainer()"
                 @close="onClose"
                 :visible="visible">
        <ta-form class="drawerFrom"
                 :autoFormCreate="(form)=>{this.addform = form}"
                 layout="horizontal">
          <ta-form-item label="文号"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="referenceNumber"
                        :fieldDecoratorOptions="rules.referenceNumber">
            <ta-input placeholder="请输入文号"
                      :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="公文名称"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="documentName"
                        :fieldDecoratorOptions="rules.documentName">
            <ta-input placeholder="请输入公文名称"
                      :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="主题分类"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="subjectClassification"
                        :require="{message:'请选择主题分类'}">
            <ta-select placeholder="请选择主题分类"
                       :disabled="idedit">
              <!-- <ta-select-option value>全部</ta-select-option> -->
              <ta-select-option v-for="(item,index) in subjectClassificationList"
                                :key="index"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="关键字"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="subjectHeadings"
                        :fieldDecoratorOptions="rules.subjectHeadings">
            <ta-input placeholder="请输入关键字"
                      :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="公文内容"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="publishContent"
                        :required="true">
            <ta-rich-editor :custom-config="customConfig"
                            ref="richEditor"
                            :disabled="disabledEd"
                            style="width: 90%" />
          </ta-form-item>
          <ta-form-item label="信息来源"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="informationSource"
                        :fieldDecoratorOptions="rules.informationSource">
            <ta-input placeholder="请输入信息来源"
                      :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="发布日期"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="dispatchDate"
                        :require="{message:'请选择发布日期'}">
            <ta-date-picker :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            style="width: 100%;"
                            format="YYYY-MM-DD"
                            :disabled="idedit"
                            :valid-now-time="'right'"
                            placeholder="请选择发布日期" />
          </ta-form-item>
          <ta-form-item label="发布位置"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="releasePosition"
                        :require="{message:'请选择发布位置!'}">
            <ta-select :placeholder="!disabled?'请选择发布位置':''"
                       style="width : 100%"
                       :disabled="idedit||isshow">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in releasePositionList "
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        label="发布机构"
                        fieldDecoratorId="orgname"
                        :fieldDecoratorOptions="rules.publisher">
            <ta-input placeholder="请输入发布机构"
                      :disabled="true" />
          </ta-form-item>
          <ta-form-item :labelCol="{span:3}"
                        :hidden='true'
                        :wrapperCol="{span:21}"
                        label="颁布机构id"
                        fieldDecoratorId="publisher">
            <ta-input placeholder="请输入颁布机构"
                      :disabled="true" />
          </ta-form-item>

          <ta-form-item label="证明材料"
                        fieldDecoratorId="uploadFileT"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}">

            <ta-upload :withCredentials="true"
                       name="file"
                       :data="data_"
                       :multiple="true"
                       :action="action"
                       :fileList="parentlist"
                       @change="handleChange"
                       @preview="confirmDownload"
                       :beforeUpload="beforeUpload">

              <ta-button :disabled="idedit">

                <ta-icon type="upload" />上传文件

              </ta-button>

            </ta-upload>
            <p class="warntext">
              <ta-icon type="info-circle-o"
                       class="icons" />附件上传格式：pdf；单个文件不能超过10M。
            </p>
          </ta-form-item>
        </ta-form>
        <!--<div style="height: 800px;">-->
        <!--我将撑出滚动条-->
        <!--</div>-->
        <!--<div slot="footer">-->
        <!--<ta-button type="primary">保存</ta-button>-->
        <!--<ta-button type="primary">发布</ta-button>-->
        <!--</div>-->
        <div slot="footer"
             style="z-index:9999999 !important;">
          <ta-button v-if="disabledEd==false"
                     @click="publish()"
                     type="primary">发布</ta-button>
          <ta-button :style="{
            marginRight: 8,
          }"
                     @click="submit()"
                     class="btnleft temporarystorage"
                     v-if="disabledEd==false">保存</ta-button>
          <ta-button @click="onClose()"
                     class="btnleft">取消</ta-button>
        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import richEditorMixin from '@component/common/js/mixins/richEditorMixin'
import moment from 'moment'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '文号',
    width: '15%',
    dataIndex: 'referenceNumber'
  },
  {
    title: '公文名称',
    width: '16%',
    dataIndex: 'documentName'
  },
  {
    title: '主题分类',
    width: '16%',
    dataIndex: 'subjectClassification',
    collectionType: 'SUBJECTCLASSIFICATION'
  },
  {
    title: '信息来源',
    width: '15%',
    dataIndex: 'informationSource'
  },
  {
    title: '发布机构',
    width: '15%',
    dataIndex: 'orgname'
  },
  {
    title: '创建日期',
    width: '15%',
    dataIndex: 'createTime'
  },
  // {
  //   title: '发布日期',
  //   width: '15%',
  //   dataIndex: 'publishDate'
  // },
  {
    title: '发布状态',
    width: '15%',
    dataIndex: 'publishState',
    // collectionType: 'TASKSTATUS'
    scopedSlots: { customRender: 'fb' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin, richEditorMixin],

  data () {
    return {
      data_: { functionalType: '76', busiType: '29' },
      parentlist: [],
      addressmodel: [],
      tableColumns,
      tableData: [],
      sfList: [],
      al: window.parent.indexTool.getUserInfo().areaLevel,
      page: 1,
      size: 10,
      idedit: false,
      isshow: false,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/policyRelease/list', // 数据列表接口，API地址
        mixDeleteURL: '/policyRelease/updateDelStateById', // 删除接口，API地址
        mixAddURL: '/policyRelease/save', // 新增接口，API地址
        mixEditURL: '/policyRelease/update', // 修改接口，API地址
        mixQueryByIdURL: '/policyRelease/queryById', // 查看详情接口，API地址
        mixPublishURL: '/policyRelease/publish' // 发布接口，API地址
      },
      mixPageRef: 'gridPager',
      fosterList: [],
      subjectClassificationList: [],
      releasePositionList: [],
      visible: false,
      disabled: false,
      disabledEd: false,
      customConfig: {
        uploadImgShowBase64: true
      },
      id: '',
      obj: {},
      rules: {
        documentName: this.verificationRules('公文名称', 500),
        // subjectClassification: this.verificationRules('主题分类', 50),
        subjectHeadings: this.verificationRules('关键字', 100),
        referenceNumber: this.verificationRulesNotMustFill('文号', 50),
        informationSource: this.verificationRules('信息来源', 50),
        publisher: this.verificationRulesNotMustFill('颁布人员', 72)
        // publishContent: this.verificationRules('发布内容', 72)
      },
      issearch: false,
      orgIding: '',
      orgNameing: ''
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
    if (this.al == '1') {
      this.getsfList()
    }
    this.orgNameing = window.parent.indexTool.getUserInfo().orgName
    this.orgIding = window.parent.indexTool.getUserInfo().orgId
  },
  mounted () {
    this.getfoster()
    this.getreleasePositionList()
    this.getsubjectClassification()
    const areaLevel = window.parent.indexTool.getUserInfo().areaLevel
    if (areaLevel != '0') {
      this.isshow = true
    } else {
      this.isshow = false
    }
  },
  methods: {
    resetFrom () {
      this.searchForm.resetFields()
      if (this.al == '1') {
        this.$nextTick(() => {
          this.searchForm.setFieldsValue({
            arearId: window.parent.indexTool.getUserInfo().areaId
          })
        })
      }
      this.handleSubmit('search')
    },
    async getsfList () {
      const param = {
        parentId: null
      }
      const until = await this.post('/zoning/queryStatistics', param)
      const aa = []
      aa.push({ areaid: 'buji', areaname: '部级' })
      this.sfList = [...aa, ...until.data.data]
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({
          arearId: window.parent.indexTool.getUserInfo().areaId
        })
      })
    },
    setaddress () {
      this.addform.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    printGo (a, item) {
      item.url = '/policyRelease/printPolicyReleaseInformation'

      const titile = '政策发布'

      const url = `${window.faceConfig.basePath}${item.url}?id=${item.id}`
      // if (this.bizId) {
      //   url += `&&bizId=${this.bizId}`
      // }
      const Aaa = '../../../../../../../static/print.html?src=' + url + '&&titile=' + titile
      window.open(encodeURI(Aaa))
    },
    handleChange (info) {
      if (this.idedit) {
        return false
      }
      if (info.file.status === 'uploading') {
        this.parentlist = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.idedit) {
          return false
        }
        this.parentlist = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length) {
          this.$message.error('上传失败')
          const arrlist = [...this.parentlist]
          arrlist.splice(-1, 1)
          this.parentlist = arrlist
          return false
        } else {
          // 上传成功
          this.parentlist = info.fileList
          this.$message.success('文件上传成功!')
        }
      }
    },
    confirmDownload (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      if (file.type == 'application/pdf') {
        return this.before_Upload(file)
      } else {
        this.$message.error('请上传pdf格式的文件!')
        return false
      }
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 主题分类
    async getsubjectClassification () {
      const data = await this.getDictionaries('SUBJECTCLASSIFICATION')
      this.subjectClassificationList = data
    },
    async getreleasePositionList () {
      const data = await this.getDictionaries('POLICYRELEASEPOSITION')
      this.releasePositionList = data
      console.log(this.releasePositionList)
    },
    add () {
      this.parentlist = []
      this.idedit = false
      // this.addform.resetFields()
      this.visible = true
      this.nowtype = 1
      this.$nextTick(() => {
        this.addform.setFieldsValue({
          publisher: this.orgIding,
          orgname: this.orgNameing
        })
        if (this.al != '0') {
          this.addform.setFieldsValue({
            releasePosition: '1'
          })
        }
      })
      if (this.radioval) {
        this.radioval = null
      }
    },
    // other (val) {
    //   alert(1)
    //   console.log(val)
    //   this.parentlist = []
    //   if (this.idedit == true) {
    //     this.disabledEd = true
    //   }
    //   let aa = val.publishContent
    //   delete val.publishContent
    //   // this.$refs.richEditor.clearContent()

    //   this.$refs.richEditor.setContent(aa)
    //   val.dispatchDate = moment(val.dispatchDate, 'YYYY-MM-DD')
    //   console.log(val.fileList)
    //   this.$nextTick(() => {
    //     if (val.fileList && val.fileList.lenght > 0) {
    //       val.fileList.forEach((s) => {
    //         if (s.busiType == '29') {
    //           this.parentlist.push(s)
    //           console.log(this.parentlist)
    //         }
    //       })
    //     }
    //   })

    //   return val
    // },
    // 发布状态 PUBLISH_STATE
    async getfoster () {
      const data = await this.getDictionaries('TASKSTATUS')
      this.fosterList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    see (val, obj) {
      this.parentlist = []
      this.idedit = true
      this.id = obj[this.idkey]
      this.visible = true
      this.nowtype = 2
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      // this.$nextTick(() => {
      //   obj = this.other(data)
      //   // 其他操作
      //   this.addform.setFieldsValue(obj)
      // })
      this.$nextTick(() => {
        this.$refs.richEditor.setContent(obj.publishContent)
        this.disabledEd = true
        obj.dispatchDate = moment(obj.dispatchDate)

        if (obj.fileList && obj.fileList.length > 0) {
          obj.fileList.forEach((s) => {
            if (s.busiType == '29') {
              this.parentlist.push(s)
            }
          })
        }

        this.addform.setFieldsValue(obj)
      })
    },
    edit (obj) {
      this.parentlist = []
      this.obj = obj
      this.id = obj.id
      this.visible = true
      this.$nextTick(() => {
        // data = this.other(data)
        // 其他操作
        this.$refs.richEditor.setContent(obj.publishContent)
        obj.dispatchDate = moment(obj.dispatchDate)

        if (obj.fileList && obj.fileList.length > 0) {
          obj.fileList.forEach((s) => {
            if (s.busiType == '29') {
              this.parentlist.push(s)
            }
          })
        }

        this.addform.setFieldsValue(obj)
      })
    },

    changetime (data, e) {
      for (var k in data) {
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (data[k].file) {
            const upload = []
            const filelist = [...this.parentlist]
            if (filelist.length > 0) {
              filelist.map(item => {
                upload.push(item.response.data.data.fileid)
              })
              data.upLoadPathIds = upload // 上传
              delete data[k]
            }
            // let arr = []
            // data[k].fileList.map(item => {
            //   arr.push(item.response.data.data.fileid)
            // })
            // data[`${k}Id`] = arr
          } else {
            data[k] = data[k].format('YYYY-MM-DD')
          }
        }
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD 23:59:59')
          delete data[k]
        }
        if (data[k] instanceof Array && !(data[k][0] instanceof Object)) {
          if (k == 'address_Linkage') {
            if (data.address_Linkage) {
              data.areaId =
                data.address_Linkage[data.address_Linkage.length - 1]
              delete data.address_Linkage
            } else {
              data.areaId = ''
            }
            // // 后期修改下
            // data.province = data[k][0]
            // data.city = data[k][1]
            // data.county = data[k][2]
            // delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
    },
    // 保存
    async submit () {
      let isok = true
      const formData = this.addform.getFieldsValue()
      if (this.$refs.richEditor.getText().length > 0) {
        formData.publishContent = this.$refs.richEditor.getHtml()
      } else {
        this.$message.error('公文内容不能为空')
        return false
      }

      this.changetime(formData)
      const params = { ...formData }
      this.addform.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      if (isok) {
        const text = ''
        let url = ''
        if (this.nowtype == 1) {
          // 新增--保存
          url = this.mixListOptions.mixAddURL
        } else {
          // 编辑--保存
          params.id = this.id
          params.createTime = this.obj.createTime
          params.createUser = this.obj.createUser
          params.delState = this.obj.delState
          params.orgId = this.obj.orgId
          params.publishState = this.obj.publishState
          url = this.mixListOptions.mixEditURL
        }

        this.post(url, params).then(res => {
          if (res.errors == null) {
            // 删除富文本中已上传但又被删除的附件
            this.deleteEnclosure(true)
            this.visible = false
            this.$message.success('保存成功')
            this.addform.resetFields()
            this.$nextTick(() => {
              this.$refs.richEditor.clearContent()
            })
            this.handleSubmit()
          }
        })
      }
    },
    // 发布
    async publish () {
      this.addform.validateFields(async (err, values) => {
        if (!err) {
          const url = ''
          const text = ''
          const params = this.addform.getFieldsValue()
          this.changetime(params)
          if (this.$refs.richEditor.getText().length > 0) {
            params.publishContent = this.$refs.richEditor.getHtml()
          } else {
            this.$message.error('公文内容不能为空')
            // this.$message.success('发布成功')
            return false
          }
          if (this.nowtype == 1) {
            // 新增--保存
          } else {
            // 编辑--保存
            params.id = this.obj.id
            params.createTime = this.obj.createTime
            params.createUser = this.obj.createUser
            params.delState = this.obj.delState
            params.orgId = this.obj.orgId
            params.publishState = this.obj.publishState
          }
          this.post(this.mixListOptions.mixPublishURL, params).then(res => {
            if (res.errors == null) {
              this.visible = false
              this.$message.success('发布成功')
              this.addform.resetFields()
              this.$refs.richEditor.clearContent()
              this.handleSubmit()
            }
          })
        }
      })
    },
    // 抽屉关闭
    onClose () {
      this.addform.resetFields()
      this.$refs.richEditor.clearContent()
      this.visible = false
      this.idedit = false
      this.disabledEd = false
    },
    documentPublish () {
      this.visible = true
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    addAdoption (e, obj, index) {
      const str = JSON.stringify(obj)
    }
  }
}
</script>

<style scoped lang="less">
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
.searchbtn {
  width: 330px;
  flex: 0 0 auto;
  margin-left: 20px;
  margin-top: 2px;
}
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
</style>
