<template>
  <div class="padbottom conts ">
    <div class="contin">
      <div>
        <h3>信息资源</h3>
        <ta-divider style="margin: 10px 0;" />
      </div>
      <div>
        <ta-form layout="horizontal"
                 :autoFormCreate="(form)=>{this.form = form}">
          <ta-row class="fromcom">
            <ta-col :span="8">
              <ta-form-item label="机构代码"
                            fieldDecoratorId="orgCode"
                            :fieldDecoratorOptions="verificationRules('机构代码',18)">
                <ta-input :disabled='disabled'
                          onKeyUp="this.value=this.value.replace(/[^\w_]/g,'');"
                          :placeholder="disabled?'':'请输入机构代码'" />
              </ta-form-item>
              <ta-form-item label="机构业务类别"
                            fieldDecoratorId="orgBusinessCategory"
                            :fieldDecoratorOptions="verificationRules('机构业务类别')">
                <ta-select :placeholder="disabled?'':'请选择机构业务类别'"
                           :disabled="disabled">
                  <ta-select-option v-for="(item ,index) in orgBusinessCategoryList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>

              <ta-form-item label="机构现有人数"
                            fieldDecoratorId="orgNumber">
                <ta-input-number :min="0"
                                 :max="99999"
                                 :precision="0"
                                 style="width:100%"
                                 :disabled="disabled"
                                 :placeholder="disabled?'':'请输入机构现有人数'" />
              </ta-form-item>
              <ta-form-item label="经办人联系电话"
                            fieldDecoratorId="agentPhone"
                            :labelCol="{ span: 7 }"
                            :wrapperCol="{span:17}"
                            :fieldDecoratorOptions="verificationRules('经办人联系电话',{type: 'phone'})">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入经办人联系电话'" />
              </ta-form-item>
              <ta-form-item label="资源类型"
                            fieldDecoratorId="resourceType"
                            :fieldDecoratorOptions="verificationRules('资源类型')">
                <ta-select :placeholder="disabled?'':'请选择资源类型'"
                           :disabled="disabled">
                  <ta-select-option v-for="(item ,index) in resourceTypeList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="资源总量"
                            fieldDecoratorId="resourceTotal">
                <ta-input-number :min="0"
                                 :max="9999999"
                                 :precision="0"
                                 style="width:100%"
                                 :disabled="disabled"
                                 :placeholder="disabled?'':'请输入资源总量'" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="机构名称"
                            fieldDecoratorId="orgName"
                            :fieldDecoratorOptions="verificationRules('机构名称',30)">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入机构名称'" />
              </ta-form-item>

              <ta-form-item label="机构负责人"
                            fieldDecoratorId="orgHead"
                            :fieldDecoratorOptions="verificationRules('机构负责人',20)">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入机构负责人'" />
              </ta-form-item>

              <ta-form-item label="经办人"
                            fieldDecoratorId="agent"
                            :fieldDecoratorOptions="verificationRules('经办人',20)">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入经办人'" />
              </ta-form-item>
              <ta-form-item label="经办人职务"
                            fieldDecoratorId="agentOffice"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('经办人职务',15)">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入经办人职务'" />
              </ta-form-item>
              <ta-form-item label="资源名称"
                            fieldDecoratorId="resourceName"
                            :fieldDecoratorOptions="verificationRules('资源名称',30)">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入资源名称'" />
              </ta-form-item>
              <ta-form-item label="资源价值(元)"
                            fieldDecoratorId="resourceValue">
                <ta-input-number :min="0"
                                 :max="9999999"
                                 :precision="0"
                                 style="width:100%"
                                 :disabled="disabled"
                                 :placeholder="disabled?'':'请输入资源价值'" />
              </ta-form-item>

            </ta-col>
            <ta-col :span="8">

              <ta-form-item label="机构性质"
                            fieldDecoratorId="orgNature"
                            :fieldDecoratorOptions="verificationRules('机构性质')">
                <ta-select :placeholder="disabled?'':'请选择机构性质'"
                           :disabled="disabled">
                  <ta-select-option v-for="(item ,index) in orgNatureList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>

              <ta-form-item label="负责人身份证号"
                            fieldDecoratorId="orgIdcard"
                            :labelCol="{ span: 7 }"
                            :wrapperCol="{span:17}"
                            :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: true, message: '请输入身份证号' },{validator:idCardValid}]}">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入身份证号'" />
              </ta-form-item>

            </ta-col>
            <ta-col :span="8"
                    v-if="flag!='query'">
              <div class="ant-col-6 ant-form-item-label"><label for="name"
                       title="资源图片"
                       class="ant-form-item-required">资源图片</label></div>
              <div class="uploadimg"
                   v-if="flag!='query'">
                <div class="add_contract">
                  <span @click="handleRemove"
                        v-if="delVisible"
                        title="点击可删除">删除</span>
                  <div style="height:100%">
                    <img v-if="imageUrl"
                         style="height:100%"
                         :src="imageUrl" />
                  </div>
                </div>
                <ta-upload :withCredentials="true"
                           name="file"
                           class="avatar-uploader"
                           :action="actionUrl"
                           :showUploadList="false"
                           :data="adoption"
                           :fileList="fileList"
                           :limit=1
                           :beforeUpload="beforeUploadImg"
                           @change="handleChange">
                  <ta-button :disabled="disabled">上传资源图片</ta-button>
                </ta-upload>
              </div>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="8">
                <AddressComponent :addressmodel="addressmodel"
                                  :msg="'机构通信地址'"
                                  :disabled="disabled"
                                  fileldName='addressDatas'
                                  :labelwidth="{   label: 6, wrapper: 18}"
                                  @setaddress="setaddress"></AddressComponent>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label
                              fieldDecoratorId="detailAddress"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 23,offset:1 }"
                              :fieldDecoratorOptions="verificationRules('详细地址',30)">
                  <ta-input :placeholder="disabled?'':'请输入详细地址'"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label='资源情况描述'
                            fieldDecoratorId="resourceDescribe"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 20 }"
                            :fieldDecoratorOptions="verificationRules('资源情况描述',65,true)">
                <ta-textarea :placeholder="disabled?'':'请输入资源情况描述'"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
            </ta-col>

            <ta-col :span="12">
              <ta-form-item label='备注'
                            fieldDecoratorId="remark"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('备注',65,true)">
                <ta-textarea :placeholder="disabled?'':'请输入备注'"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="returns">返回</ta-button>
      <!-- <ta-button class="btnleft temporarystorage"
                     @click="publishOrSave('1')"
                     v-if="flag!='query'">发布</ta-button> -->
      <ta-button type="primary"
                 @click="publishOrSave('1')"
                 v-if="flag!='query'"
                 class="btnleft">保存</ta-button>

    </div>
  </div>

</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: {
    AddressComponent
  },
  data () {
    return {
      addressmodel: [],
      disabled: false,
      addressDatas: [], // 地址存放的数据

      orgNatureList: [], // 机构性质字典数据
      resourceTypeList: [], // 资源类型字典数据
      orgBusinessCategoryList: [], // 机构业务类别

      imageUrl: 'static/img/defaultNoImg.jpg',
      delVisible: false, // 文件上传的删除按钮显示
      adoption: {// 资源图片上传的参数
        busiType: '13', // 资源图片
        functionalType: '2'
      },
      fileList: [],
      upLoadPathIds: [], // 附件上传存放的id数组

      flag: '', // 页面跳转带过来的标识（发布资源：publish，继续办理：handle，信息查询：query）
      id: '' // 页面跳转带过来的id
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  methods: {
    // 字典数据获取
    getMenuDatas () {
      this.getMenu('UNIT_PORPERTY', 'orgNatureList') // 获取机构性质字典数据
      this.getMenu('RESOURCE_TYPE', 'resourceTypeList') // 获取资源类型字典数据
      this.getMenu('UNIT_INDUSTY', 'orgBusinessCategoryList') // 获取机构业务类别字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
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
      let _self = this
      // 初始化数据
      _self.form.resetFields()
      _self.fileList = []
      _self.upLoadPathIds = []
      _self.imageUrl = 'static/img/defaultNoImg.jpg'
      _self.delVisible = false
      _self.disabled = false

      _self.flag = _self.$route.query.flag
      _self.id = _self.$route.query.id
      _self.disabled = false
      if (_self.flag == 'handle' || _self.flag == 'query') {
        if (_self.flag == 'query') {
          _self.disabled = true
        }
        _self.post('/socialCareService/queryResourceById', { id: _self.id }).then((res) => {
          if (res.serviceSuccess) {
            let { data } = res.data
            _self.form.setFieldsValue(data)
            _self.addressmodel = [
              data.province ? data.province : '',
              data.city ? data.city : '',
              data.county ? data.county : ''
            ]
            _self.fileList = JSON.parse(data.filePathVos)
            _self.upLoadPathIds.push(_self.fileList[0].response.data.data.fileid)
            _self.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + _self.fileList[0].response.data.data.fileid
            // _self.post('/file/getFileUrls', { returnFileIds: _self.fileList[0].uid }).then(res => {
            //   if (res.serviceSuccess) {
            //     _self.imageUrl = window.faceConfig.basePath + res.data.fileUrlList[0]
            _self.delVisible = true
            //   }
            // })
          }
        })
      }
    },
    // 身份证号验证
    idCardValid (rule, value, callback) {
      let _self = this
      this.idCardValidate(rule, value, callback, _self)
    },
    // 发布(1)/保存(0)
    publishOrSave (e) {
      let _self = this
      let url = '/socialCareService/resourceSave'

      if (_self.upLoadPathIds.length == 0) {
        _self.$message.error('请上传资源图片！')
        return false
      }
      _self.form.validateFields((err, values) => {
        if (!err) {
          let form = _self.form.getFieldsValue()
          form['status'] = e
          form['province'] = form.addressDatas instanceof Array ? form.addressDatas[0] : null
          form['city'] = form.addressDatas instanceof Array ? form.addressDatas[1] : null
          form['county'] = form.addressDatas instanceof Array ? form.addressDatas[2] : null
          form['upLoadPathId'] = _self.upLoadPathIds
          if (_self.flag == 'handle') {
            url = '/socialCareService/resourceUpdate'
            form['id'] = _self.id
          }

          _self.post(url, form).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('信息发布/保存成功！')
              _self.returns()
            }
          })
        } else {
          _self.$message.error('请填写必填信息！')
        }
      })
    },
    // 返回
    returns () {
      // 重置表单数据
      this.form.resetFields()
      this.fileList = []
      this.upLoadPathIds = []
      this.imageUrl = 'static/img/defaultNoImg.jpg'
      this.delVisible = false
      this.disabled = false

      this.$router.go(-1)
    },
    // 地址传值
    setaddress () {
      this.form.setFieldsValue({
        addressDatas: this.addressmodel
      })
    },
    // 上传
    handleChange (info) {
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
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl
            this.loading = false
            this.delVisible = true
          })
          this.fileList = info.fileList
          this.upLoadPathIds.push(info.file.response.data.data.fileid)
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUploadImg (file) {
      if (this.upLoadPathIds.length > 0) {
        this.$message.error('请删除原有资源图片再进行上传！')
        return false
      }
      let typelist = [
        'image/jpeg',
        'image/png'
      ]
      let isaccord = typelist.includes(file.type)
      if (!isaccord) {
        this.$message.error('请上传jpg、jpeg、png图片格式')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('文件大小大于10M!')
      }
      return isaccord && isLt10M
    },
    // 上传需要的参数
    fileData (e, flag) {
      return {
        busiType: e,
        functionalType: '2'
      }
    },
    handleRemove (e) {
      if (this.disabled) {
        return false
      }
      let _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: this.fileList[0].response.data.data.fileid
      })
        .then((response) => {
          _self.$message.success('资源图片删除成功!')
          _self.upLoadPathIds.splice(_self.upLoadPathIds.indexOf(this.fileList[0].response.data.data.fileid), 1)

          _self.upLoadPathIds = []
        })
        .catch(() => {
          _self.$message.error('资源图片删除失败!')
        })

      _self.imageUrl = 'static/img/defaultNoImg.jpg'
      _self.delVisible = false
    }
  },
  computed: {
    actionUrl () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  }
}
</script>
<style scoped>
.uploadimg {
  width: 200px;
  margin: 0 auto;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.uploadimg img {
  width: 100%;
}
.add_contract {
  width: 80%;
  height: 65%;
  cursor: pointer;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}
.add_contract span {
  width: 100%;
  z-index: 1111;
  position: absolute;
  bottom: 0;
  padding: 6px;
  background: #000;
  opacity: 0.7;
  color: #fff;
  display: none;
}
.add_contract:hover span {
  display: block;
}
.avatar-uploader {
  margin-top: 10%;
}
</style>
