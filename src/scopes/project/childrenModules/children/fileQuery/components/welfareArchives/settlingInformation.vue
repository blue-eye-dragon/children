<template>
  <div>
    <!-- <span v-if="!SettleFlag&&!CanceFlag&&!MoveOutFlag">暂无相关信息</span> -->
    <div v-if="!SettleFlag&&!CanceFlag&&!MoveOutFlag"
         class="textClass">暂无数据</div>
    <div v-if="SettleFlag">
      <div style="padding-right: 25%;">
        <h3 style="font-weight: 600;">落户</h3>
        <ta-divider />
      </div>
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.settleForm = form}">
        <ta-row>
          <ta-col :span="24">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 6}">
              <span>{{name}}</span>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="身份证号"
                          fieldDecoratorId="idCard">
              <ta-input :disabled='disabled' />
            </ta-form-item>
            <ta-form-item label="户籍性质"
                          fieldDecoratorId="censusRegister">
              <ta-select :disabled="disabled">
                <ta-select-option v-for="item in censusRegisterList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="落户日期"
                          fieldDecoratorId="settleTime">
              <ta-input :disabled='disabled' />
            </ta-form-item>
            <ta-form-item label="户口分类"
                          fieldDecoratorId="householdRegistryClassify">
              <ta-select :disabled="disabled">
                <ta-select-option v-for="item in householdRegistryClassifyList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="16">
            <ta-col :span="12">
              <AddressComponent :addressmodel="addressmodel"
                                :msg="'户籍所在地'"
                                :clearPlaceHolder="true"
                                :disabled="disabled"
                                fileldName='houseHoldRegisterAddrDatas'
                                @setaddress="setaddress"></AddressComponent>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label
                            fieldDecoratorId="houseHoldRegisterAddrDetail"
                            :labelCol="{ span: 0 }"
                            :wrapperCol="{ span: 23,offset:1 }">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="16">
            <ta-col :span="12">
              <AddressComponent :addressmodel="addressmodel1"
                                :msg="'落户派出所'"
                                :disabled="disabled"
                                :clearPlaceHolder="true"
                                fileldName='settlePoliceDatas'
                                @setaddress="setaddress1"></AddressComponent>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label
                            fieldDecoratorId="addressDetails"
                            :labelCol="{ span: 0 }"
                            :wrapperCol="{ span: 23,offset:1 }">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="登记日期"
                            fieldDecoratorId="createTime">
                <ta-input :disabled='disabled' />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="登记人"
                            fieldDecoratorId="createUser">
                <ta-input :disabled='disabled' />
              </ta-form-item>
            </ta-col>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div style="padding-right: 25%;"
         v-if="CanceFlag">
      <h3 style="font-weight: 600;">销户</h3>
      <ta-divider />
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.salesAccountForm = form}">
        <ta-row>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="注销原因"
                            fieldDecoratorId="cancelReason">
                <ta-select :disabled="disabled">
                  <ta-select-option v-for="item in cancelReasonList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="登记日期"
                            fieldDecoratorId="createTime">
                <ta-input :disabled='disabled' />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="登记人"
                          fieldDecoratorId="createUser"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 6}">
              <ta-input :disabled='disabled' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="证明材料"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 6 }">
              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         :action="action"
                         :disabled="disabled"
                         :fileList="fileList"
                         @preview="preview"
                         :data="fileData('29','fileList')"
                         :beforeUpload="beforeUpload"
                         @change="filechange">
                <ta-button>
                  <ta-icon type="upload" /> 上传文件
                </ta-button>
              </ta-upload>
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div style="padding-right: 25%;"
         v-if="MoveOutFlag">
      <h3 style="font-weight: 600;">迁出</h3>
      <ta-divider />
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.moveOutForm = form}">
        <ta-row>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="迁出原因"
                            fieldDecoratorId="moveOutReason">
                <ta-select :disabled="disabled">
                  <ta-select-option v-for="item in moveOutReasonList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="登记日期"
                            fieldDecoratorId="createTime">
                <ta-input :disabled='disabled' />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="登记人"
                          fieldDecoratorId="createUser"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 6}">
              <ta-input :disabled='disabled' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="证明材料"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 6 }">
              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         :action="action"
                         :disabled="disabled"
                         :fileList="fileList1"
                         @preview="preview"
                         :data="fileData('30','fileList')"
                         :beforeUpload="beforeUpload"
                         @change="filechange">
                <ta-button>
                  <ta-icon type="upload" /> 上传文件
                </ta-button>
              </ta-upload>
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
  </div>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
export default {
  components: {
    AddressComponent
  },
  props: ['childBaseId'],
  data () {
    return {
      disabled: true,
      addressmodel: [],
      addressmodel1: [],
      name: '', // 儿童姓名
      sexList: [], // 性别字典数据
      householdRegistryClassifyList: [], // 户口分类字典数据
      childTypeList: [], // 儿童类别字典数据
      censusRegisterList: [], // 户籍性质字典数据

      cancelReasonList: [], // 销户原因字典数据
      moveOutReasonList: [], // 迁出原因字典数据
      SettleFlag: false, // 是否已落户
      CanceFlag: false, // 是否已销户
      MoveOutFlag: false, // 是否已迁出

      fileList: [], // 销户的附件
      fileList1: [], // 迁出的附件
      upLoadPathchildEnterId: [] // 附件上传存放的id数组
    }
  },
  created () {

  },
  activated () {
  },
  mounted () {
    // 获取全部菜单数据
    this.getAllMenus()
  },
  methods: {
    // 获取全部菜单数据
    getAllMenus () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu(this.childTypeCode, 'childTypeList') // 获取儿童类别字典数据
      this.getMenu('CENSUSREGISTER', 'censusRegisterList') // 获取户籍性质字典数据
      this.getMenu('HOUSEHOLDREGISTRYCLASSIFY', 'householdRegistryClassifyList') // 获取户口分类字典数据
      this.getMenu('MOVEOUTREASON', 'moveOutReasonList') // 获取迁出原因字典数据
      this.getMenu('CANCELREASON', 'cancelReasonList') // 获取销户原因字典数据
      this.getMenu(this.childTypeCode, 'childTypeList') // 获取儿童类别字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 初始化数据
    initDatas () {
      // 落户
      this.post('/childArchives/queryChildArchivesSettleInfo', { childBaseId: this.childBaseId }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          if (data && Object.keys(data).length > 0) {
            data.createTime = data.createTime ? data.createTime.substring(0, 10) : null
            this.SettleFlag = true
            this.$nextTick(() => {
              this.settleForm.setFieldsValue(data)
              this.name = data.name
              this.addressmodel = [ // 户籍所在地
                data.houseHoldRegisterAddrProv ? data.houseHoldRegisterAddrProv : '',
                data.houseHoldRegisterAddrCity ? data.houseHoldRegisterAddrCity : '',
                data.houseHoldRegisterAddrCounty ? data.houseHoldRegisterAddrCounty : ''
              ]
              this.addressmodel1 = [ // 落户派出所
                data.province ? data.province : '',
                data.city ? data.city : '',
                data.county ? data.county : ''
              ]
            })
          }
        }
      })
      // 销户
      this.post('/childArchives/queryChildArchivesCancelInfo', { childBaseId: this.childBaseId }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          if (data && Object.keys(data).length > 0) {
            data.createTime = data.createTime ? data.createTime.substring(0, 10) : null
            this.CanceFlag = true
            this.$nextTick(() => {
              this.salesAccountForm.setFieldsValue(data)
              this.fileList = data.filePathVos ? JSON.parse(data.filePathVos) : []
            })
          }
        }
      })
      // 迁户
      this.post('/childArchives/queryChildArchivesMoveOutInfo', { childBaseId: this.childBaseId }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          if (data && Object.keys(data).length > 0) {
            data.createTime = data.createTime ? data.createTime.substring(0, 10) : null
            this.MoveOutFlag = true
            this.$nextTick(() => {
              this.moveOutForm.setFieldsValue(data)
              this.fileList1 = data.filePathVos ? JSON.parse(data.filePathVos) : []
            })
          }
        }
      })
    },
    // 设置地址-户口所在地
    setaddress () {
      this.settleForm.setFieldsValue({
        houseHoldRegisterAddrDatas: this.addressmodel
      })
    },
    // 设置地址-落户派出所
    setaddress1 () {
      this.settleForm.setFieldsValue({
        settlePoliceDatas: this.addressmodel1
      })
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.upLoadPathchildEnterId.push(info.file.response.data.data.fileid)
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 上传需要的参数
    fileData (e, flag) {
      return {
        busiType: e,
        functionalType: '2'
      }
    },
    preview (file) { this.downloadFile(file) }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  watch: {
    childBaseId: function (newval, oldval) {
      // 初始化数据
      this.initDatas()
    }
  }
}
</script>
<style scoped>
.textClass {
  padding: 16px;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  z-index: 1;
}
</style>
