<template>
  <div class="conts tadrawer">
    <div class="contin">
      <div ref="oneout"
           class="mars">
        <Title id="fam_a"
               title="儿童信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <ChildInformation :name="name"
                            :childEnterId='childEnterId'></ChildInformation>
        </ta-form>
      </div>
      <div ref="twoout"
           class="mars marpad">
        <Title id="fam_a"
               title="体检记录"
               :show.sync="showtwo"></Title>
        <div>
          <div class="visitbtn">
            <ta-button type="primary"
                       class="addbtn"
                       @click="add">新增</ta-button>
          </div>
          <ta-table ref="two"
                    bordered
                    class="tables table-min-width"
                    :showOverflowTooltip="true"
                    :columns="tableColumns"
                    :dataSource="tableData">
            <span slot="num"
                  slot-scope="val,obj,index">
              <span>{{ size * (page - 1) + index + 1 }}</span>
            </span>
            <div slot="action"
                 slot-scope="val,obj,index"
                 class="btnlist">
              <span class="com_textsee"
                    @click="see(val,obj)">查看</span>
              <template>

                <span class="com_textedit"
                      @click="edit(val,obj)">编辑</span>

                <ta-popconfirm title="确定删除吗?"
                               @confirm="deletes(val,obj,index)"
                               @cancel="cancel"
                               okText="确定"
                               cancelText="取消">
                  <span class="com_textdel">删除</span>
                </ta-popconfirm>
              </template>
            </div>
          </ta-table>
          <ta-pagination :defaultCurrent="page"
                         class='pagination'
                         showSizeChanger
                         showQuickJumper
                         :showOverflowTooltip="true"
                         :dataSource.sync="tableData"
                         :params="userPageParams"
                         @change="pagechange"
                         :url="mixListOptions.mixGetDataListURL"
                         ref="gridPager" />
        </div>
      </div>
    </div>
    <div class="bom">
      <ta-button @click="backs"
                 class="preservation">返回</ta-button>
    </div>
    <ta-drawer title="体检情况"
               width="500"
               placement="right"
               @close="onClose"
               :getContainer="setContainer"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="登记日期"
                      fieldDecoratorId="physicalExaminationDate"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择登记日期'}">
          <ta-date-picker :disabled="idedit"
                          style="width: 100%;"
                          :valid-now-time="'right'"
                          placeholder="请选择登记日期" />
        </ta-form-item>
        <ta-form-item label="身高(cm)"
                      fieldDecoratorId="height"
                      :labelCol="{ span: 6 }">
          <ta-input-number :disabled="idedit"
                           :min="0"
                           :max="999"
                           :precision="0"
                           placeholder="请输入身高，单位是cm"
                           style="width:100%" />
        </ta-form-item>
        <ta-form-item label="体重(kg)"
                      fieldDecoratorId="weight"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.weight">
          <ta-input-number :min="0"
                           :max="999"
                           :disabled="idedit"
                           placeholder="请输入体重，单位是kg"
                           :precision="2"
                           style="width:100%" />
        </ta-form-item>
        <ta-form-item label="体检总结"
                      fieldDecoratorId="physicalExaminationSummary"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.physicalExaminationSummary">
          <ta-textarea placeholder="请输入体检总结"
                       :disabled="idedit"
                       :rows="4" />
        </ta-form-item>
        <ta-form-item label="附件上传"
                      :required="true"
                      fieldDecoratorId="filePathVo"
                      :fieldDecoratorOptions="{rules: [{ required: true, message: '请上传附件' }]}"
                      :labelCol="{ span: 6 }">
          <ta-upload :withCredentials="true"
                     name="file"
                     :data="adoption"
                     :multiple="true"
                     :action="action"
                     :fileList="fileList"
                     @change="handleChange"
                     :beforeUpload="beforeUpload"
                     @preview="preview">
            <ta-button :disabled="idedit">
              <ta-icon type="upload" />上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="submit"
                   type="primary"
                   v-if="!idedit">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import listMinxin from '@component/common/js/mixins/listMixin'
import ChildInformation from '../components/childInformation'
import moment from 'moment'
import { setTimeout } from 'timers'

const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '体检日期',
    dataIndex: 'physicalExaminationDate',
    width: '16%'
  },
  {
    title: '身高(cm)',
    dataIndex: 'height',
    width: '15%'
  },
  {
    title: '体重(kg)',
    dataIndex: 'weight',
    width: '15%'
  },
  {
    title: '体检总结',
    dataIndex: 'physicalExaminationSummary',
    width: '19%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    width: '16%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMinxin],
  components: {
    Title,
    ChildInformation
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      tableColumns,
      tableData: [],
      size: 10,
      page: 1,
      visible: false,
      obj: {},
      isotherdata: true,
      otherdata: {},
      name: '',
      adoptionlist: [],
      mixPageRef: 'gridPager',
      fileList: [],
      mixListOptions: {
        mixGetDataListURL:
          '/childPhysicalExamination/queryChildPhysicalExaminationRecords', // 数据列表接口，API地址
        mixAddURL: '/childPhysicalExamination/save', // 新增接口
        mixEditURL: '/childPhysicalExamination/update', // 编辑接口
        mixDeleteURL: '/childPhysicalExamination/updateDelStateById' // 删除接口，API地址
      },
      adoption: {
        functionalType: 'f2'
      },
      childBaseId: '',
      childEnterId: '',
      fileIds: [],
      iscanshow: false,
      // 业务id
      relationId: '',
      rules: {
        height: {
          validateTrigger: 'blur',
          rules: [
            { required: false, message: '请输入身高' },
            { max: 3, message: '最大输入3个字符' }
          ]
        },
        weight: {
          validateTrigger: 'blur',
          rules: [{ required: false, message: '请输入体重' }]
        },
        physicalExaminationSummary: {
          validateTrigger: 'change',
          rules: [
            { required: true, message: '请输入体检总结' },
            { max: 200, message: '最大输入200个字符' }
          ]
        }
      }
    }
  },
  activated () {
    this.loadData()
    const data = JSON.parse(this.$route.params.obj)
    this.obj = data
    this.name = this.obj.name
    this.iscanshow = this.$route.params.type == 1
    this.childBaseId = this.obj.childBaseId
    this.childEnterId = this.obj.childEnterId
    this.otherdata.childBaseId = this.obj.childBaseId
    this.adoptedFrom.setFieldsValue({
      idCard: this.obj.idCard,
      childNumber: this.obj.childNumber,
      childType: this.obj.childType,
      registerDate: moment(this.obj.registerDate)
    })
    this.showone = true
    this.showtwo = true
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    this.fileList = []
    this.getchildtype()
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
    window.onresize = () => {
      this.setHeight('one', 'oneout', !this.showone)
      this.setHeight('two', 'twoout', !this.showtwo)
    }
  },
  methods: {
    loadData () {
      this.fileList = []
    },
    setContainer () {
      return this.$el.parentNode
    },
    preview (file) {
      this.downloadFile(file)
    },
    // 下载附件
    confirmDownload (val) {
      const relationIds = val.id
      window.location.href =
        window.faceConfig.basePath +
        '/file/downloadFilesByRelations?relationIds=' +
        relationIds
    },
    filechange () { },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        this.fileList = info.fileList
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

    addother (params) {
      let upLoadPathIds = []
      this.fileIds = []
      upLoadPathIds = this.fileList
      upLoadPathIds.map(item => {
        this.fileIds.push(item.response.data.data.fileid)
      })
      // this.fileids = this.fileids.split(',')
      params.fileIds = this.fileIds
      params.childBaseId = this.childBaseId
      params.childEnterId = this.childEnterId
      delete params.filePathVo
      delete params.filePathVoId
      return params
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (ref == 'two') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 180 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    other (obj) {
      this.relationId = obj.id
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      let filePathVos = []
      if (data.filePathVos) {
        // 接口返回数据
        filePathVos = JSON.parse(data.filePathVos)
      } else {
        // 本地编辑数据
        filePathVos = data.filePathVo.fileList
      }
      // 字段名字 赋值
      data.filePathVo = {
        file: {},
        fileList: filePathVos
      }
      data.physicalExaminationDate = moment(
        data.physicalExaminationDate,
        'YYYY-MM-DD'
      )
      this.fileList = filePathVos
      return data
    },
    userPageParams () {
      const params = {}
      params.childEnterId = this.childEnterId
      return params
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    backs () {
      this.$router.go(-1)
    },
    // 儿童类别
    async getchildtype () {
      const data = await this.getDictionaries(this.childTypeCode)
      this.adoptionlist = data
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    tableData: {
      handler () {
        this.setHeight('two', 'twoout')
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.contin {
  padding-top: 1px;
}
.mars {
  margin-top: 20px;
}
.tables {
  margin-top: 17px;
}
.marpad {
  padding-bottom: 20px;
}
.preservation {
  margin-left: 20px;
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
