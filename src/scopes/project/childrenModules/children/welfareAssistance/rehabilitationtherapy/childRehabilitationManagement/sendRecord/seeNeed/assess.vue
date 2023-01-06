<template>
  <!-- 评估信息 tb2-->
  <div class="searchdata tadrawer">
    <div>
      <div v-if="!notShow"
           class="visitbtn">
        <!-- style="left: 85%;" -->

        <ta-popconfirm title="确定删除吗?"
                       @confirm="dels"
                       @cancel="cancel"
                       okText="确定"
                       cancelText="取消">
          <ta-button style="    margin-right: 15px;"
                     type="danger">删除</ta-button>
        </ta-popconfirm>
        <ta-button v-if="tree"
                   type="primary"
                   @click="adds(1,'')">新增</ta-button>
        <ta-button v-else
                   style=" color: #0202026b; ">新增</ta-button>
      </div>
      <ta-table v-if="!notShow"
                class="table-min-width"
                :columns="tableColumns"
                :dataSource="mixDataList"
                :rowSelection="mixRowSelection"
                @change="handleTableChange"
                :showOverflowTooltip="true"
                bordered>
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <span slot="evaluationDate"
              slot-scope="a, b, c">
          <span>{{a?a.toString().substr(0,10):'--'}}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span v-if="!notShow"
                class="com_textedit"
                @click="adds(2,obj)">编辑</span>
          <span @click="adds(3,obj)"
                class="com_textsee">查看</span>
        </div>
      </ta-table>
      <ta-table v-if="notShow"
                class="table-min-width"
                :showOverflowTooltip="true"
                :columns="tableColumns"
                :dataSource="mixDataList"
                @change="handleTableChange"
                bordered>
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <span slot="evaluationDate"
              slot-scope="a, b, c">
          <span>{{a?a.toString().substr(0,10):'--'}}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span v-if="!notShow"
                class="com_textedit"
                @click="adds(2,obj)">编辑</span>
          <span class="com_textsee"
                @click="adds(3,obj)">查看</span>
        </div>
      </ta-table>
      <ta-pagination  :defaultCurrent="page"
                     class='pagination'
                     showSizeChanger
                     showQuickJumper
                     :dataSource.sync="mixDataList"
                     :params="userPageParams"
                     @change="pagechange"
                     :url="mixListOptions.mixGetDataListURL"
                     :ref="mixPageRef" />
    </div>

    <ta-drawer :title="oneTitle"
               width="500px"
               :closable="false"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="评估类型"
                      fieldDecoratorId="assessType"
                      :require="{message:'请选择评估类型'}">
          <ta-select placeholder="请选择评估类型"
                     :disabled="noEdit">
            <ta-select-option v-for="(item,index) in evaluationtypeList"
                              :value="item.value"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <ta-form-item label="评估结果"
                      fieldDecoratorId="evaluateResults"
                      :fieldDecoratorOptions="verificationRules('评估结果',72)">
          <ta-input :disabled="noEdit"
                    placeholder="请输入评估结果" />
        </ta-form-item>
        <ta-form-item label="评估小结"
                      fieldDecoratorId="evaluationSummary"
                      :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
          <ta-textarea placeholder="请输入评估小结"
                       :disabled="noEdit"
                       :rows="4" />
        </ta-form-item>

        <ta-form-item label="附件"
                      fieldDecoratorId="uploadFileTow"
                      :require="{message:'请上传附件'}"
                      :labelCol="{ span: 6 }">
          <ta-upload :withCredentials="true"
                     name="file"
                     :data="goTo_"
                     :multiple="true"
                     :action="action"
                     :fileList="fileList"
                     @change="handleChange"
                     @preview="preview"
                     :beforeUpload="beforeUpload">
            <ta-button v-if="!noEdit">
              <ta-icon type="upload" />上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>

        <ta-form-item label="评估人"
                      fieldDecoratorId="evaluator"
                      :fieldDecoratorOptions="verificationRules('评估人',72)">
          <ta-input :disabled="noEdit"
                    placeholder="请输入评估人" />
        </ta-form-item>
        <ta-form-item label="评估日期"
                      fieldDecoratorId="evaluationDate"
                      :require="{message:'请选择评估日期'}">
          <ta-date-picker :disabled="noEdit"
                          style="width: 100%;"
                          placeholder="请选择评估日期"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button key="back"
                   v-if="!noEdit"
                   @click="onClose">取消</ta-button>
        <ta-button key="submit"
                   v-if="!noEdit"
                   type="primary"
                   @click="submit()">确定</ta-button>
        <ta-button key="back"
                   v-if="noEdit"
                   @click="onClose">返回</ta-button>
      </div>
    </ta-drawer>
    <!-- <div class="bom">
      <ta-button class="preservation"
                 @click="back">返回</ta-button>
    </div> -->
  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { format } from 'path'
import moment from 'moment'
import { nextTick } from 'q'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '评估类型',
    dataIndex: 'assessType',
    width: '25%',
    collectionType: 'EVALUATIONTYPE'
  },

  {
    title: '评估结果',
    width: '25%',
    dataIndex: 'evaluateResults'
  },
  {
    title: '评估人',
    width: '25%',
    dataIndex: 'evaluator'
  },
  {
    title: '评估日期',
    width: '25%',
    dataIndex: 'evaluationDate',
    scopedSlots: { customRender: 'evaluationDate' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const tableData = [
  {
    name2: '9846841874561574654865000',
    name: '哈喽',
    sex: '22',

    chairmanName: '2019-12-1',
    4: '好学生',
    birthday: '1994.8',
    action: 0
  },
  {
    key: '2',
    sex: '2',
    name: '小孩',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    sex: '0',
    name: '儿童',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    action: 1
  }
]

export default {
  moment,
  mixins: [listMixin],
  props: {
    ids: {
      type: String,
      required: false
    },
    notShow: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      tableColumns,
      tableData,
      mixDataList: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/assessInformation/list', // 数据列表接口，API地址
        mixAddURL: '/assessInformation/save', // 新增接口
        mixEditURL: '/assessInformation/update', // 编辑接口
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: false // 是否需要筛选
      },
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      selectIdList: '',
      mixPageRef: 'gridPager',
      educationalBackgroundList: [],
      visible: false,
      noEdit: false,
      oneTitle: '添加',
      bton1: true,
      evaluationtypeList: [],
      // ------
      goTo_: {
        functionalType: 1,
        busiType: 32
      },
      fileList: [],
      relationIds: '',
      fileIds: [],
      tree: true,
      fileListMust: '',
      moveIdList: '',
      tempList: []
    }
  },
  watch: {
    mixDataList (e) {
      if (e.length == 3) {
        this.tree = false
      } else {
        this.tree = true
      }
    }
  },
  activated () {
    this.moveIdList = ''
    this.fileIds = []
    this.fileList = []
    this.userPageParams()
  },
  mounted () {
    this.getevaluationtypeList()
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {
    fnValidateMore (a, v, callback) {
      let value = v || ''
      this.fnValidateTextarea(200, '评估小结', value, callback, '0')
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    back () {
      this.$router.go(-1)
    },
    handleTableChange (val, val2) { },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      this.selectIdList = selectedRows
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (!this.noEdit) {
          this.fileList = info.fileList
          this.moveIdList += info.file.response.data.data.fileid + ','
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

        this.fileList = info.fileList

        this.$message.success('文件上传成功!')
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },

    async submit () {
      if (this.fileList.length == '0') {
        this.form.setFieldsValue({
          uploadFileTow: null
        })
      }
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          let params = this.form.getFieldsValue()
          this.changetime(params)
          if (this.nowtype == 1) {
            // 新增
            url = this.mixListOptions.mixAddURL
            text = '增加成功'
          } else {
            // 编辑
            text = '修改成功'
            url = this.mixListOptions.mixEditURL
            params[this.idkey] = this.id
          }
          params = this.addother(params)
          let data = await this.post(url, params)

          this.moveIdList = this.moveIdList.substring(
            0,
            this.moveIdList.length - 1
          )

          if (this.moveIdList) {
            let res2 = await this.post('file/deleteBatchFileByReturnFileIds', {
              returnFileIds: this.moveIdList
            })
          }

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
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },

    // confirmDownload () {

    //   window.location.href =
    //     window.faceConfig.basePath +
    //     '/file/downloadFilesByRelations?relationIds=' +
    //     this.relationIds
    // },
    preview (file) {
      this.downloadFile(file)
    },

    // 评估类型
    async getevaluationtypeList () {
      let data = await this.getDictionaries('EVALUATIONTYPE')
      this.evaluationtypeList = data
      this.tempList = data
    },
    async dels () {
      let idAll = ''
      this.selectIdList.forEach(item => {
        idAll += item.id + ','
      })

      idAll = idAll.substring(0, idAll.length - 1)

      let par = {
        id: idAll
      }
      let until = await this.post('/assessInformation/updateDelStateById', par)
      if (!until.error) {
        this.handleSubmit()
      }
    },
    async adds (types, obj) {
      if (types == 2) {
        // 编辑
        this.getevaluationtypeList()
        this.oneTitle = '编辑'
        this.noEdit = false
        this.id = obj.id
        this.visible = true
        this.nowtype = 2
        let str = JSON.stringify(obj)
        let data = JSON.parse(str)
        let param = { id: obj.id }
        let res = await this.post('/assessInformation/queryById', param, false)

        let ffO = JSON.parse(res.data.data.filePathVos)
        this.fileList = ffO // 文件列表赋值回显

        this.relationIds = res.data.data.id // 下载需要参数

        let listtem = []
        this.mixDataList.forEach((e, i) => {
          this.evaluationtypeList.forEach((a, o) => {
            if ((e.assessType == a.value) && (data.assessType != a.value)) {
              this.evaluationtypeList.splice(o, 1)
              listtem = this.evaluationtypeList
            }
          })
        })

        this.$nextTick(() => {
          data = this.other(data)
          // 其他操作
          data.evaluationDate = moment(data.evaluationDate)
          this.form.setFieldsValue(data)
          this.form.setFieldsValue({
            uploadFileTow: res.data.data.filePathVos
          })
        })
      }
      if (types == 3) {
        // 查看
        this.getevaluationtypeList()
        this.oneTitle = '查看'
        this.noEdit = true
        this.id = obj.id
        this.visible = true
        this.nowtype = 2
        let str = JSON.stringify(obj)
        let data = JSON.parse(str)

        let param = { id: obj.id }
        let res = await this.post('/assessInformation/queryById', param, false)
        let ffO = JSON.parse(res.data.data.filePathVos)

        this.fileList = ffO // 文件列表赋值回显
        this.relationIds = res.data.data.id // 下载需要参数

        this.$nextTick(() => {
          data = this.other(data)
          data.evaluationDate = moment(data.evaluationDate)
          this.form.setFieldsValue(data)
        })
      }
      if (types == 1) {
        this.fileList = []
        this.oneTitle = '新增'

        this.noEdit = false
        this.nowtype = 1

        let listtem = []
        this.mixDataList.forEach((e, i) => {
          this.evaluationtypeList.forEach((a, o) => {
            if (e.assessType == a.value) {
              this.evaluationtypeList.splice(o, 1)
              listtem = this.evaluationtypeList
            }
          })
        })

        this.visible = true
      }
    },
    // 评估日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    addother (obj) {
      this.fileIds = []
      let stringId = ''
      obj.rehabiliteId = this.ids // 添加相应的康复id

      let upLoadPathIds = [...this.fileList]

      upLoadPathIds.map(item => {
        this.fileIds.push(item.response.data.data.fileid)
        stringId += item.response.data.data.fileid + ','
      })

      let popo = JSON.stringify(this.fileIds)
      obj.upLoadPathId = stringId

      return obj
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
      this.getevaluationtypeList()
    },
    add () {
      this.$router.push({
        path: 'checkBodyInfo',
        query: {}
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      let paramss = {
        rehabiliteId: this.ids
      }
      return paramss
    },

    changetime (data, e) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (k != 'uploadFileTow') {
            data[k] = data[k].format('YYYY-MM-DD')
          }
        }
        // 是数组  数组元素为对象
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
        // 是数组  数组元素不为对象
        if (data[k] instanceof Array && !(data[k][0] instanceof Object)) {
          if (k == 'address_Linkage') {
            // 后期修改下
            data.province = data[k][0]
            data.city = data[k][1]
            data.county = data[k][2]
            delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid {
  width: 400px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
