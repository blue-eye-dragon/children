<template>
  <div class="searchdata tadrawer">

    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="operateBtn">
          <div class="rightClass">
            <ta-button type="primary"
                       icon='rollback'
                       style="    float: right;"
                       @click="()=>{ this.mixDataList=[],this.$router.go(-1)}">返回</ta-button>
          </div>
        </div>
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  bordered>

          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="status"
                :class="val==1?'com_adopt':'com_reject'"
                slot-scope="val">
            {{val==1?'已发布':'已下架'}}
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="infoMax(val,obj,index)"
                  class="com_textsee">查看</span>
          </div>

        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />

      </div>

    </ta-border-layout>

    <div>
      <ta-drawer title="应用信息"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="应用名称"
                        fieldDecoratorId="appName"
                        :fieldDecoratorOptions="this.verificationRules('应用名称', 200,false)">
            <ta-input :placeholder="!disabled?'请输入应用名称':''"
                      :disabled="disabled" />
          </ta-form-item>
          <ta-form-item label="版本号"
                        fieldDecoratorId="versionNumber"
                        :fieldDecoratorOptions="this.verificationRules('版本号', 200,false)">
            <ta-input :placeholder="!disabled?'请输入版本号':''"
                      :disabled="disabled" />
          </ta-form-item>

          <ta-form-item label="应用图标"
                        fieldDecoratorId="uploadFileIco"
                        :require="{message:'请上传应用图标'}">

            <ta-upload :withCredentials="true"
                       name="file"
                       :data="data_Ico"
                       :multiple="false"
                       :action="action"
                       :fileList="icoList"
                       @change="handleChangeIco"
                       @preview=" (file)=>this.downloadFile(file)"
                       :beforeUpload="(file)=>this.onlyTip(file,this.icoList,'1')">

              <ta-button v-if="!disabled">
                <ta-icon type="upload" />上传文件
              </ta-button>
            </ta-upload>

          </ta-form-item>

          <ta-form-item label="发布应用包名称"
                        fieldDecoratorId="rpkName"
                        :fieldDecoratorOptions="this.verificationRules('发布应用包名称', 200,false)">
            <ta-input :placeholder="!disabled?'请输入发布应用包名称':''"
                      :disabled="disabled" />
          </ta-form-item>

          <ta-form-item label="发布应用包"
                        fieldDecoratorId="uploadFileRpk"
                        :require="{message:'请上传发布应用包'}">

            <ta-upload :withCredentials="true"
                       name="file"
                       :data="data_Rpk"
                       :multiple="false"
                       :action="action"
                       :fileList="rpkList"
                       @change="handleChangeRpk"
                       @preview="(file)=> this.downloadFile(file)"
                       :beforeUpload="(file)=>this.onlyTip(file,this.rpkList,'2')">

              <ta-button v-if="!disabled">
                <ta-icon type="upload" />上传文件
              </ta-button>
            </ta-upload>

          </ta-form-item>
          <ta-form-item label="启动页面名称"
                        fieldDecoratorId="homePageName"
                        :fieldDecoratorOptions="this.verificationRules('启动页面名称', 200,false)">
            <ta-input :placeholder="!disabled?'请输入启动页面名称':''"
                      :disabled="disabled" />
          </ta-form-item>

          <ta-form-item label="发布区域"
                        fieldDecoratorId="areaIdGather"
                        :initValue='"1"'
                        :require="{message:'请选择发布区域'}">
            <ta-select :disabled="disabled"
                       :placeholder="!disabled?'请选择发布区域':''">
              <ta-select-option value="1">全国</ta-select-option>
              <ta-select-option v-for="(item,index) in provinceList"
                                :value="item.areaid"
                                :key="index">{{item.areaname}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="版本说明"
                        fieldDecoratorId="imprint"
                        :fieldDecoratorOptions="this.verificationRules('版本说明', 200,false)">
            <ta-textarea :placeholder="!disabled?'请输入版本说明':''"
                         :disabled='disabled'
                         style="height: 150px;"> </ta-textarea>
          </ta-form-item>
          <ta-form-item label="发布日期"
                        fieldDecoratorId="releaseDate"
                        :require="{message:'请选择发布日期'}">
            <ta-date-picker :placeholder="!disabled?'请选择发布日期':''"
                            :disabled='disabled'
                            :disabledDate="disabledDate" />
          </ta-form-item>
          <ta-form-item label="apptableId"
                        hidden
                        fieldDecoratorId="apptableId">
            <ta-input />
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button @click="onClose">返回</ta-button>

        </div>
      </ta-drawer>
    </div>

  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import moment from 'moment'

const mixColumns = [{
  title: '序号',
  dataIndex: 'num',
  align: 'center',
  width: '80px',
  scopedSlots: { customRender: 'num' }
},
{
  title: '应用名称',
  width: '22%',
  dataIndex: 'appName',
  overflowTooltip: true
},
{
  title: '版本号',
  width: '18%',
  dataIndex: 'versionNumber',
  overflowTooltip: true
},
{
  title: '最新发布时间',
  width: '20%',
  align: 'center',
  dataIndex: 'releaseDate',
  // collectionType: 'SEX',
  overflowTooltip: true
},
{
  title: '版本说明',
  width: '29%',
  dataIndex: 'imprint'

},
{
  title: '状态',
  width: '15%',
  dataIndex: 'status',
  align: 'center',
  scopedSlots: { customRender: 'status' }

},
{
  title: '操作',
  width: '100px',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}
]

export default {
  mixins: [listMixin],
  data () {
    return {
      visible: false,
      width: '620px',
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/applicationManagement/detailsForQuery',
        mixActivatedIsNeed: true
      },
      mixDataList: [],
      rpkList: [],
      icoList: [],
      provinceList: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      userId: '',
      nowDate: '',
      data_Ico: { functionalType: '1', busiType: '77' },
      data_Rpk: { functionalType: '2', busiType: '77' },
      page: 1,
      size: 10,
      mixLimit: 10,
      queryId: ''
    }
  },
  activated () {
    this.queryId = this.$route.query.ids
    this.getProvinceList()
  },
  mounted () {
    const nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.userId = window.parent.indexTool.getUserInfo().userId
  },
  methods: {
    moment,
    async infoMax (val, obj, index) {
      this.icoList = []
      this.rpkList = []
      const res = await this.post('/applicationManagement/singleForQuery', { id: obj.applicationId })
      if (!res.errors) {
        this.disabled = true
        this.visible = true
        const result = res.data.data
        const file = JSON.parse(result.fileVoList)
        if (result.areaIdGather == '') {
          result.areaIdGather = '1'
        }
        result.releaseDate = result.releaseDate ? moment(result.releaseDate, 'YYYY-MM-DD') : null
        file.forEach((o) => {
          if (o.functionType == 1) {
            this.icoList.push(o)
          } else {
            this.rpkList.push(o)
          }
        })
        this.$nextTick(() => {
          this.form.setFieldsValue(result)
        })
      }
    },

    userPageParams () {
      const formData = []
      formData.id = this.queryId
      return formData
    },

    disabledDate (current) {
      return current > (moment().endOf('day'))
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    async getProvinceList () {
      const until = await this.post('/zoning/queryStatistics', { parentId: null })
      this.provinceList = [...until.data.data]
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
      this.icoList = []
      this.rpkList = []
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    handleChangeIco (info) {
      if (this.disabled) {
        return false
      }
      if (info.file.status === 'uploading') {
        this.icoList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.icoList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          const arrlist = [...this.icoList]
          arrlist.splice(-1, 1)
          this.icoList = arrlist
          return false
        }
        this.icoList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    handleChangeRpk (info) {
      if (this.disabled) {
        return false
      }
      if (info.file.status === 'uploading') {
        this.rpkList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.rpkList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          const arrlist = [...this.rpkList]
          arrlist.splice(-1, 1)
          this.rpkList = arrlist
          return false
        }
        // 上传成功
        this.rpkList = info.fileList
        this.$message.success('文件上传成功!')
      }
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  }
}
</script>

<style scoped lang='less'>
</style>
