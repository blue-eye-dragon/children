<template>
  <!-- 通知list   -->
  <div class="padbottom conts  tadrawer">
    <div class="contin">
      <ta-form layout="horizontal"
               :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
        <ta-row>
          <ta-col :span="24">
            <ta-form-item label="机构"
                          :labelCol="{span:2}"
                          :wrapperCol="{span:22}">
              <ta-button icon="search"
                         :disabled='disabled'
                         @click="visible = true">选择</ta-button>
            </ta-form-item>
          </ta-col>
          <ta-col :hidden="reading"
                  :span="24">
            <ta-form-item label="发送至"
                          :labelCol="{span:2}"
                          :wrapperCol="{span:12}"
                          fieldDecoratorId="namePath"
                          :fieldDecoratorOptions="bj?this.verificationRulesNotMustFill('机构',500,true):this.verificationRules('机构',500,true)">
              <ta-textarea :disabled='true'
                           :rows="4" />
            </ta-form-item>

          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="标题"
                          :labelCol="{span:2}"
                          :wrapperCol="{span:12}"
                          fieldDecoratorId="title"
                          :fieldDecoratorOptions="this.verificationRules('标题', 200)">
              <ta-input :disabled="disabled" />

            </ta-form-item>

          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="附件"
                          :labelCol="{span:2}"
                          :wrapperCol="{span:22}">
              <ta-upload :withCredentials="true"
                         name="file"
                         :data="data_"
                         :multiple="true"
                         :action="action"
                         :fileList="fileList"
                         @change="handleChange"
                         @preview="confirmDownload"
                         :beforeUpload="beforeUpload">
                <ta-button :disabled='disabled'>
                  <ta-icon type="upload" />上传文件
                </ta-button>
              </ta-upload>

              <ta-tag color="orange">
                <ta-icon type="info-circle-o" /> 附件上传格式：图片（jpg，jpeg，png）、doc、docx、pdf;单个文件不能超过10M
              </ta-tag>

            </ta-form-item>
          </ta-col>
          <ta-col :span="24">

            <ta-form-item label="内容"
                          v-show="!visible"
                          fieldDecoratorId="content"
                          :labelCol="{span:2}"
                          :wrapperCol="{span:22}"
                          :fieldDecoratorOptions="this.verificationRules('内容', 1000)">
              <ta-rich-editor :config="config"
                              ref="richEditor"
                              style="height:140px;max-height:500px;"
                              :disabled='disabledfuwenben' />
            </ta-form-item>

          </ta-col>
        </ta-row>
      </ta-form>
      <ta-modal title="机构选择"
                v-model="visible"
                width="90%"
                :centered="false"
                style="top: 20px;   overflow: overlay;"
                :footer="null">

        <orgSelect :thisP='this'
                   :downListGo='orgData'
                   v-if="visible"></orgSelect>
      </ta-modal>
    </div>
    <div class="bom ">
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
      <ta-button v-if="!disabled"
                 class="fsbt"
                 @click="goMessage(true)">发送</ta-button>
      <ta-button v-if="!disabled"
                 class="btnleft temporarystorage"
                 type='primary'
                 @click="goMessage(false)">保存</ta-button>
    </div>

  </div>
</template>
<script>

import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
import orgSelect from './orgSelect'
export default {
  components: {
    orgSelect
  },
  data () {
    return {
      disabledfuwenben: false,
      sexList: [],
      config: {
        menus: ['source',
          '|', // '|' 是菜单组的分割线
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'eraser',
          'forecolor',
          'bgcolor'],

        fontsizes: {
          1: '10px',
          2: '13px',
          3: '16px',
          4: '19px',
          5: '22px',
          6: '25px',
          7: '28px'
        }
      },
      disabled: false,

      visible: false,
      orgData: [],
      buttonList: [],

      data_: {
        functionalType: 1,
        busiType: 97
      },
      fileList: [],
      fileIds: [],
      ywId: '',
      reading: false,
      bj: false
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }

  },
  mounted () {

  },
  activated () {
    this.bj = false
    this.orgData = []
    this.disabledfuwenben = false
    setTimeout(() => { this.$refs.richEditor.clearContent() }, 10)

    this.fileList = []
    this.searchForm.resetFields()
    this.$forceUpdate()
    this.ywId = this.$route.query.id
    this.disabled = (this.$route.query.disabled == 'see')
    const conten = this.$route.query.content
    // if (this.$route.query.bj) {
    //   this.bj = true
    // } else {
    //   this.bj = false
    // }

    //  namePath: obj.createName,
    //         fasong: obj.pushName
    if (this.ywId) {
      this.getInformation()
      this.disabledfuwenben = false
      setTimeout(() => {
        this.$refs.richEditor.clearContent()
        this.$refs.richEditor.setContent(conten)
        if (this.disabled) {
          this.disabledfuwenben = true
        } else {
          this.disabledfuwenben = false
        }
      }, 500)
    } else {
      this.reading = false
    }
  },
  beforeDestroy () {
    this.$refs.richEditor.clearContent()
  },
  methods: {

    async getInformation () {
      if (this.$route.query.yd) {
        this.reading = true
        const res = await this.post('/announcements/updateReadStatusByBusinessId', { id: this.ywId })
        const namePath = res.data.data.namePath
        const pushName = res.data.data.pushName
        const title = res.data.data.title
        const fileList = res.data.data.fileList
        this.$nextTick(() => {
          this.searchForm.setFieldsValue({ title: title })
          this.searchForm.setFieldsValue({ namePath: namePath })
          this.$refs.richEditor.setContent(content)
          this.fileList = fileList// 接口返回错误 2020年3月9日14点54分
          console.log(' this.fileList-->', this.fileList)
          console.log('infogetFieldsValue2-->', this.searchForm.getFieldsValue())
        })
      } else {
        this.reading = false
        const res = await this.post('/announcements/lookById', { id: this.ywId })

        const infos = res.data.data
        this.orgData = infos.announcementsOrgList
        let nameGroup = ''
        this.orgData.map(element => {
          nameGroup += element.orgName + ','
        })

        this.$nextTick(() => {
          this.searchForm.setFieldsValue({ title: infos.title })
          this.searchForm.setFieldsValue({ namePath: nameGroup.substr(0, nameGroup.length - 1) })
          this.$refs.richEditor.setContent(infos.content)
          this.fileList = infos.fileList || []
          console.log('infogetFieldsValue2-->', this.searchForm.getFieldsValue())
        })
      }
    },

    backOrgData (v) {
      this.orgData = v
      this.buttonList = v
      let nameGroup = ''
      this.orgData.forEach((e) => {
        nameGroup += e.orgName + ','
      })

      this.searchForm.setFieldsValue({ namePath: nameGroup.substr(0, nameGroup.length - 1) })
    },
    backs () {
      this.$refs.richEditor.clearContent()
      this.$router.go(-1)
    },

    async  goMessage (type) { // 发送通知
      // if (!type) {
      //   this.bj = true
      // }
      if (this.$refs.richEditor.getHtml()) {
        this.searchForm.setFieldsValue({ content: this.$refs.richEditor.getHtml() })
      }

      this.searchForm.validateFields(async (err, values) => {
        if (!err || values.title && values.content) {
          const param = {
            title: this.searchForm.getFieldsValue().title,
            content: this.$refs.richEditor.getHtml(),
            list: this.orgData
          }
          this.fileIds = []
          if (this.fileList) {
            this.fileList.map(item => {
              this.fileIds.push(item.response.data.data.fileid)
            })

            param.upLoadPathIds = this.fileIds
          }
          let message = ''
          if (type) {
            param.pushState = '1'
            message = '发送成功!'
          } else {
            message = '保存成功!'
            param.pushState = '0'
          }
          let url = '/announcements/save'
          if (this.ywId) {
            url = '/announcements/update'
            param.id = this.ywId
          }
          const res = await this.post(url, param, true)
          if (!res.errors) {
            this.$message.success(message)
            this.backs()
          }
        } else {
          console.log(err)
          console.log(values)
        }
      })
    },
    confirmDownload (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (!this.disabled) {
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

    // 性别字典
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
    }

  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 95%;
}

.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
//*****tzgg */
.bbb .btn-close {
  position: absolute !important ;
  top: 0;
  right: 0;
  width: 56px;
  height: 56px;
  text-align: center;
  line-height: 56px;
  cursor: pointer;
}
.bbb .pd-20 {
  padding: 20px;
}
.bbb .show-user {
  border-top: 5px solid #e8e8e8;
  height: 200px;
  padding: 0 20px;
  overflow: hidden;
}
.bbb .chosed-title {
  height: 40px;
  line-height: 40px;
}
.bbb .chosed-box {
  width: 100%;
  height: 155px;
  overflow-y: auto;
}
.bbb .box {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 9px 10px;
  height: 260px;
  overflow-y: hidden;
}
.bbb .no-data {
  width: 100%;
  line-height: 180px;
  text-align: center;
  color: #999;
}
.bbb .user-select-head-content {
  height: 30px;
  line-height: 30px;
  text-align: right;
}
.bbb .user-head[data-v-2094d4d2] {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #95a5a6;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  margin-right: 4px;
  vertical-align: top;
}
.bbb .user-head.woman {
  background-color: #f39c12;
}
.bbb .user-head.man {
  background-color: #419ff4;
}
.bbb .user-info {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bbb .user-box {
  height: 40px;
  line-height: 40px;
  box-sizing: content-box;
  padding: 10px 5px;
  overflow-x: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}
.bbb .user-list[data-v-2094d4d2] {
  height: 210px;
  overflow-y: auto;
}
.bbb .user-list[data-v-2094d4d2]::-webkit-scrollbar {
  width: 6px;
  background-color: #f8f8f8;
}
.bbb .more-box[data-v-2094d4d2] {
  height: 60px;
  line-height: 60px;
}
.bbb .self-col-5[data-v-ec982e20] {
  display: block;
  box-sizing: border-box;
  width: 20%;
  float: left;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}
.bbb .user-head.woman[data-v-ec982e20] {
  background-color: #f39c12;
}
.bbb .user-head[data-v-ec982e20] {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #95a5a6;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  margin-right: 4px;
  vertical-align: top;
}
.bbb.user-head.man[data-v-ec982e20] {
  background-color: #419ff4;
}

.bbb .user-active[data-v-2094d4d2]:after,
.user-box:hover .user-head[data-v-2094d4d2]:after {
  content: "\E6ED";
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  left: 0;
  top: 0;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.5);
  font-family: anticon !important;
}

.bbb .chosed-box[data-v-ec982e20]::-webkit-scrollbar {
  width: 6px;
  background-color: #f8f8f8;
}
.bbb .chosed-box[data-v-ec982e20]::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #cfd6dd;
}
.bbb .user-list[data-v-2094d4d2]::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #cfd6dd;
}
.bbb .user-box:hover .user-head[data-v-ec982e20]:after {
  content: "\E6E0";
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  left: 0;
  top: 0;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.5);
  font-family: anticon !important;
}

.bbb .ant-modal-body {
  padding: 3px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}
.colWidth {
  width: 120px;
}
.btnleft {
  margin-left: 10px;
  margin-right: 10px;
}
.bbb /deep/ .w-e-text-container {
  border: 1px solid #ccc;
  /* border-top: none; */
  height: 169px !important;
  z-index: 10000;
}
.bbb /deep/ .ant-upload-list {
  font-family: Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI,
    PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.7);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  zoom: 1;
  width: 119px;
}
.fsbt {
  background: rgba(78, 185, 52, 1);
  border: 1px solid rgba(78, 185, 52, 1);
  color: white;
}
.select {
  width: 80px;
  top: 0px;
  left: 8%;
  position: absolute;
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
