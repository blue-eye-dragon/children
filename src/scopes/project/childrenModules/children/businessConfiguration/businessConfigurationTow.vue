<template>
  <!-- 业务配置 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'80px',footer:'80px'}">
      <div slot="header">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

          <ta-form-item label="配置类别"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="type">
            <ta-select>
              <ta-select-option v-for="(item,index) in  [{'value':'1','label':'业务类型'},{'value':'2','label':'统计类型'},{'value':'3','label':'待办事项类型'}]"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="标题"
                        class="spilwid"
                        fieldDecoratorId="title"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input />
          </ta-form-item>
          <ta-form-item label="状态"
                        class="spilwid"
                        fieldDecoratorId="delState"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-select>
              <ta-select-option v-for="(item,index) in  [{'value':'1','label':'正常'},{'value':'2','label':'停用'}]"
                                :value="item.value"
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

      <div>
        <div style="margin-bottom: -10px;">
          <ta-button type="primary"
                     icon='plus'
                     style="  z-index: 2;  float: right;"
                     @click="edit('0','0','0')">新增</ta-button>
        </div>
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  class="tables table-min-width"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="delState"
                slot-scope="a,b,c">
            <span :class="b.delState==1?'com_adopt':'com_reject'">{{status(a,b,c)}}</span>
          </span>
          <span slot="titleType"
                slot-scope="a,b,c">
            <span>{{titleType(a,b,c)}}</span>
          </span>
          <!-- <span slot="businessType" slot-scope="a,b,c">
            <span>{{whatType(a,b,c)}}</span>
          </span>-->
          <span slot="statisticalType"
                slot-scope="a,b,c">
            <span>{{b.statisticalType|dostatisticalType}}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="edit(val,obj,'2')"
                  class="com_textsee">查看</span>
            <!-- <ta-divider v-if='obj.delState==1' type="vertical" /> -->
            <span v-if='obj.delState==1'
                  @click="edit(val,obj,'1')"
                  class="com_textedit">编辑</span>

            <!-- <ta-divider v-if="!!obj.id"
                        type="vertical" /> -->
            <ta-popconfirm v-if="obj.delState==1"
                           title="确定停用此项配置吗?"
                           @confirm="deletes(val,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span v-if="!!obj.id"
                    class="com_textdel">停用配置</span>
            </ta-popconfirm>
            <ta-popconfirm v-else
                           title="确定启用此项配置吗?"
                           @confirm="deletes(val,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span v-if="!!obj.id"
                    style=" color: rgba(95, 172, 76, 1);">启用配置</span>
            </ta-popconfirm>
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
                       ref="gridPager" />
      </div>
    </ta-border-layout>

    <!-- <ta-modal title="新增 "
              v-model="visible"
              width="1200px"
              :footer="null">
      <roleConfig @handleSubmit="handleSubmit()"
                                 v-if="visible"
                                 :statisticalList='statisticalList'
                                 :businessList='businessList'
                                 :ishide="disabled"></roleConfig>
    </ta-modal>-->
    <!-- 新增、编辑、详情弹窗 -->
    <div>
      <ta-drawer :title="type==0?'新增':type==1?'编辑':'详情'"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item hidden
                        label="id"
                        fieldDecoratorId="id">
            <ta-input />
          </ta-form-item>
          <ta-form-item label="配置类别"
                        fieldDecoratorId="type"
                        :require="{message:'请选择配置类别!'}">
            <ta-select @change="choose"
                       :disabled="type!=0"
                       placeholder="请选择配置类别">
              <ta-select-option v-for="(item,index) in [{'value':'1','label':'业务类型'},{'value':'2','label':'统计类型'},{'value':'3','label':'待办事项类型'}]"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <!-- <ta-form-item v-if="chooseType=='1'" label="业务类型" fieldDecoratorId="title" :require="{message:'请选择业务类型'}">
            <ta-select   :disabled="disabled" placeholder="请选择业务类型">
              <ta-select-option
                v-for="(item,index) in businessList"
                :value="item.value"
                :key="index"
              >{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item
          v-if="chooseType=='2'"
            label="统计类型"
            fieldDecoratorId="title"
            :require="{message:'请选择统计类型'}"
          >
            <ta-select   :disabled="disabled" placeholder="请选择统计类型">
              <ta-select-option
                v-for="(item,index) in statisticalList"
                :value="item.value"
                :key="index"
              >{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>-->
          <ta-form-item label="标题"
                        fieldDecoratorId="title"
                        :require="{message:'请输入标题'}">
            <ta-input placeholder="请输入标题"
                      :disabled="disabled" />
          </ta-form-item>
          <ta-form-item label="跳转地址"
                        fieldDecoratorId="adress">
            <ta-input placeholder="请输入地址"
                      :disabled="disabled" />
          </ta-form-item>
          <ta-form-item label="查询地址"
                        fieldDecoratorId="configQueryAdress">
            <ta-input placeholder="请输入地址"
                      :disabled="disabled" />
          </ta-form-item>
          <ta-form-item label="图标上传"
                        :labelCol="{ span: 6 }"
                        fieldDecoratorId="icon">
            <ta-input placeholder="请输入图标"
                      :disabled="disabled" />
            <!-- <ta-upload :withCredentials="true"
                       name="file"
                       :data="data_"
                       :multiple="true"
                       :action="action"
                       :fileList="fileList"
                       @change="handleChange"
                       @preview="confirmDownload"
                       :beforeUpload="beforeUpload">
              <ta-button :disabled=" type==2">
                <ta-icon type="upload" />上传文件
              </ta-button>
            </ta-upload> -->
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button key="back"
                     @click="onClose">取消</ta-button>
          <ta-button key="submit"
                     type="primary"
                     v-if="type!=2"
                     @click="submit()">确定</ta-button>
        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import roleConfig from './roleConfig'
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '配置类别',
    width: '8%',
    dataIndex: 'type',
    scopedSlots: { customRender: 'titleType' },
    overflowTooltip: true
  },
  {
    title: '标题',
    width: '12%',
    dataIndex: 'title',
    // collectionType: 'WORKBENCH_BUSINESS_TYPE',

    scopedSlots: { customRender: 'businessType' },
    overflowTooltip: true
  },
  {
    title: '跳转地址',
    width: '18%',
    dataIndex: 'adress',
    overflowTooltip: true
  },
  {
    title: '查询地址',
    width: '18%',
    dataIndex: 'configQueryAdress',
    overflowTooltip: true
  },
  {
    title: '状态',
    width: '6%',
    dataIndex: 'delState',
    scopedSlots: { customRender: 'delState' },
    overflowTooltip: true
  },

  {
    title: '操作',
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
var that = ''
export default {
  components: { roleConfig },
  mixins: [listMixin],
  data () {
    return {
      data_: {
        functionalType: 1,
        busiType: 6666
      },
      chooseType: '',
      moveIdList: [],
      fileIds: [],
      fileList: [],
      number: '',
      namename: '',
      showOn: false,
      page: 1,
      size: 10,
      sexList: [],
      businessList: [],
      dutyList: [],
      administrativeOfficeList: [],
      age: '',
      visible: false,
      width: '500px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/WorkbenchApi/queryBusinessConfigInfoManage', // 数据列表接口，API地址
        mixAddURL: '/WorkbenchApi/infoManageSave', // 新增接口
        mixEditURL: '/WorkbenchApi/infoManageUpdate', // 编辑接口
        mixDeleteURL: '/WorkbenchApi/updateDelStateById' // 删除接口，API地址
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      userId: '',
      orgId: '',
      orgName: [],
      mixDataList: [],
      cultureList: [],
      startValue: null,
      nowDate: '',
      ksList: [],
      statisticalList: [],
      wholist: [],
      noEdit: false
    }
  },
  created () {
    that = this
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    const nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
    this.getDic()
  },

  methods: {
    status (a, b, c) {
      if (a == 1) {
        return '正常'
      } else {
        return '停用'
      }
    },
    titleType (a, b, c) {
      if (a == 1) {
        return '业务类型'
      } else if (a == 2) {
        return '统计类型'
      } else {
        return '待办事项类型'
      }
    },
    whatType (a, b, c) {
      let title = ''
      let wholist = []
      if (b.type == '1') {
        wholist = this.businessList
      }
      if (b.type == '2') {
        wholist = this.statisticalList
      }
      wholist.forEach(e => {
        if (e.value == a) {
          title = e.label
        }
      })
      return title
    },
    choose (v) {
      this.chooseType = v
    },
    reset () {
      this.moveIdList = []
      this.fileIds = []
      this.fileList = []
    },
    addother (params) {
      const upLoadPathIds = [...this.fileList]
      let fileIdOne = ''
      this.fileIds = []
      if (upLoadPathIds.length > 0) {
        upLoadPathIds.map(item => {
          this.fileIds.push(item.response.data.data.fileid)
          fileIdOne = item.response.data.data.fileid
        })
        params.upLoadPathIds = this.fileIds
        params.icon = fileIdOne
      }

      return params
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
        if (this.fileList.length > 1) {
          this.$message.error('请删除原有图片后上传')
          this.fileList.splice(-1, 1)
          return false
        }
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

        // 上传成功

        this.fileList = info.fileList

        this.$message.success('文件上传成功!')
      }
    },
    beforeUpload (file) {
      if (file.name.length > 30) {
        this.$message.error('文件名长度超过30个字符，请选择其他文件重新上传！')
        return false
      }
      // console.log(file)
      const typelist = ['image/jpg', 'image/jpeg', 'image/png', '']

      const isaccord = typelist.includes(file.type)
      if (!isaccord) {
        this.$message.error('请上传图片(jpg、jpeg、png)格式的文件')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('单个文件不能超过10M')
      }
      return isaccord && isLt10M
    },
    confirmDownload (file) {
      this.downloadFile(file)
    },
    async deletes (v, b, i) {
      const res = await this.post('/WorkbenchApi/updateDelStateByInfoManageId', {
        id: b.id,
        delState: b.delState == 1 ? (b.delState = 2) : (b.delState = 1)
      })
      if (!res.errors) {
        this.handleSubmit()
      }
    },
    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          const params = this.form.getFieldsValue()
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
          // params = this.addother(params)
          const data = await this.post(url, params)
          if (data.errors === null) {
            if (this.moveIdList.length > 0) {
              this.moveIdList = this.moveIdList.substring(
                0,
                this.moveIdList.length - 1
              )
              if (this.moveIdList) {
                const res2 = await this.post(
                  'file/deleteBatchFileByReturnFileIds',
                  {
                    returnFileIds: this.moveIdList
                  }
                )
              }
            }

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
    // 字典
    async getDic () {
      this.businessList = await this.getDictionaries('WORKBENCH_BUSINESS_TYPE')
      this.statisticalList = await this.getDictionaries(
        'WORKBENCH_STATISTICAL_TYPE'
      )
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    disabledStartDate (startValue) {
      const endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },

    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.type = 0
      this.disabled = false
    },
    async edit (val, obj, tp) {
      // 添加
      this.noEdit = false
      this.fileList = []
      this.disabled = false
      this.chooseType = 0
      this.type = tp

      if (tp == '0') {
        this.nowtype = 1
        this.visible = true
      }

      if (tp == '1' || tp == '2') {
        // bj+ck

        tp == '1' ? (this.disabled = false) : (this.disabled = true)
        this.noEdit = this.disabled
        this.nowtype = 2
        this.visible = true
        this.chooseType = obj.type
        this.id = obj.id
        const data = await this.post(
          '/WorkbenchApi/queryByBusinessConfigInfoManageId',
          { id: obj.id }
        )
        if (!data.errors) {
          // let ffO = JSON.parse(data.data.data.fileList)
          this.fileList = data.data.data.fileList
            ? data.data.data.fileList
            : [] // 文件列表赋值回显
          this.$nextTick(() => {
            this.form.setFieldsValue(data.data.data)
          })
        }
      }
      // this.$router.push({
      //   path: 'roleConfig',
      //   query: {
      //     businessList: this.businessList,
      //     statisticalList: this.statisticalList,
      //     types: tp,
      //     ids: obj.id,
      //     roleId: obj.roleId,
      //     ty: tp
      //   }
      // })
    },

    // this.type = 1
    // if (tp == '2') { // ck
    //   this.type = 2
    //   this.disabled = true
    // }
    // let str = JSON.stringify(obj)
    // obj = JSON.parse(str)
    // let roleName = obj.roleName
    // let data = await this.post('/WorkbenchApi/queryByBusinessConfigId', {
    //   id: obj.id
    // })
    // console.log('获取查看--》', data)

    // if (data.data.data) {
    //   obj = data.data.data
    // }
    // obj.roleName = roleName
    // obj.businessType = obj.businessType ? obj.businessType.split(',') : []
    // obj.statisticalType = obj.statisticalType ? obj.statisticalType.split(',') : []
    // this.id = obj.id
    // this.visible = true
    // this.nowtype = 2
    // if (obj.birthday) {
    //   obj.birthday = moment(obj.birthday, 'YYYY-MM-DD')
    //   this.changeAge('hello', obj.birthday)
    // }

    // this.$nextTick(() => {
    //   // this.form.setFieldsValue(obj)
    // })
    // },
    changeAge (date, dateString) {
      var birthDayTime = new Date(dateString).getTime()
      var nowTime = new Date().getTime()
      this.age = Math.ceil((nowTime - birthDayTime) / 31536000000)
      this.$nextTick(() => {
        // this.form.setFieldsValue({
        //   age: this.age ? this.age : ''
        // })
      })
    },

    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  },
  filters: {
    dobusinessType (val) {
      const list = that.businessList
      let dataShow = ''
      if (val && val.length > 0) {
        const attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    },
    dostatisticalType (val) {
      const list = that.statisticalList
      let dataShow = ''
      if (val && val.length > 0) {
        const attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
.newt {
  background-color: #7cc16b;
  color: #fff;
}
.visitbtnR {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
</style>
