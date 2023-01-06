<template>
  <div class="padbottom conts ">
    <div class="contin">
      <div>
        <h3>信息资源</h3>
        <ta-divider style="margin: 10px 0;" />
      </div>
      <ta-tabs defaultActiveKey="1"
               @change="callback"
               :forceRender="true">
        <ta-tab-pane tab="资源信息"
                     key="1">
          <div>
            <ta-form layout="horizontal"
                     :autoFormCreate="(form)=>{this.resourceform = form}">
              <ta-row class="fromcom">
                <ta-col :span="24">
                  <ta-col :span="16">
                    <ta-col :span="12">
                      <ta-form-item label="机构代码"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="orgCode">
                        <ta-input :disabled='true'
                                  placeholder="" />
                      </ta-form-item>

                      <ta-form-item label="机构负责人"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="orgHead">
                        <ta-input :disabled='true'
                                  placeholder="" />
                      </ta-form-item>

                      <ta-form-item label="经办人职务"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="agentOffice">
                        <ta-input :disabled='true'
                                  placeholder="" />
                      </ta-form-item>

                      <ta-form-item label="资源总量"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="resourceTotal">
                        <ta-input-number :min="0"
                                         :max="99999999"
                                         :precision="0"
                                         style="width:100%"
                                         :disabled="true"
                                         placeholder="" />
                      </ta-form-item>
                      <ta-form-item label="机构性质"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="orgNature">
                        <ta-select placeholder=""
                                   :disabled="true">
                          <ta-select-option v-for="(item ,index) in orgNatureList "
                                            :key="index"
                                            :value="item.value">{{item.label}}</ta-select-option>
                        </ta-select>
                      </ta-form-item>

                      <ta-form-item label="机构现有人数"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="orgNumber">
                        <ta-input-number :min="0"
                                         :max="99999999"
                                         :precision="0"
                                         style="width:100%"
                                         :disabled="true"
                                         placeholder="" />
                      </ta-form-item>
                      <ta-form-item label="资源类型"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="resourceType">
                        <ta-select placeholder=""
                                   :disabled="true">
                          <ta-select-option v-for="(item ,index) in resourceTypeList "
                                            :key="index"
                                            :value="item.value">{{item.label}}</ta-select-option>
                        </ta-select>
                      </ta-form-item>
                    </ta-col>
                    <ta-col :span="12">
                      <ta-form-item label="机构名称"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="orgName">
                        <ta-input :disabled='true'
                                  placeholder="" />
                      </ta-form-item>

                      <ta-form-item label="负责人身份证号"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="orgIdcard">
                        <ta-input :disabled='true'
                                  placeholder="" />
                      </ta-form-item>

                      <ta-form-item label="经办人联系电话"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="agentPhone">
                        <ta-input :disabled='true'
                                  placeholder="" />
                      </ta-form-item>

                      <ta-form-item label="资源价值（元）"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="resourceValue">
                        <ta-input-number :min="0"
                                         :max="99999999"
                                         :precision="0"
                                         style="width:100%"
                                         :disabled="true"
                                         placeholder="" />
                      </ta-form-item>
                      <ta-form-item label="机构业务类别"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="orgBusinessCategory">
                        <ta-select placeholder=""
                                   :disabled="true">
                          <ta-select-option v-for="(item ,index) in orgBusinessCategoryList "
                                            :key="index"
                                            :value="item.value">{{item.label}}</ta-select-option>
                        </ta-select>
                      </ta-form-item>
                      <ta-form-item label="经办人"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="agent">
                        <ta-input :disabled='true'
                                  placeholder="" />
                      </ta-form-item>
                      <ta-form-item label="资源名称"
                                    :labelCol="{ span:7 }"
                                    :wrapperCol="{ span: 17  }"
                                    fieldDecoratorId="resourceName">
                        <ta-input :disabled='true'
                                  placeholder="" />
                      </ta-form-item>
                    </ta-col>
                  </ta-col>
                  <ta-col :span="8"
                          v-if="flag!='query'">
                    <div class="uploadimg">
                      <div class="add_contract">
                        <div style="height:100%">
                          <img v-if="imageUrl"
                               style="height:100%"
                               :src="imageUrl" />
                        </div>
                      </div>
                      <ta-upload :withCredentials="true"
                                 name="file"
                                 class="avatar-uploader"
                                 :showUploadList="false"
                                 :fileList="fileList"
                                 :limit=1>
                        <ta-button :disabled="true">上传资源图片</ta-button>
                      </ta-upload>
                    </div>

                  </ta-col>
                </ta-col>
                <ta-col :span="24">
                  <ta-col :span="8">
                    <AddressComponent :addressmodel="addressmodel"
                                      :msg="'机构通信地址'"
                                      :disabled="true"
                                      fileldName='addressDatas'
                                      @setaddress="setaddress"
                                      :clearPlaceHolder="''"
                                      :isRequire="false"></AddressComponent>
                  </ta-col>
                  <ta-col :span="8">
                    <ta-form-item label
                                  fieldDecoratorId="detailAddress"
                                  :labelCol="{ span: 0 }"
                                  :wrapperCol="{ span: 23,offset:1 }">
                      <ta-input placeholder=""
                                :disabled="true" />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label='资源情况描述'
                                fieldDecoratorId="resourceDescribe"
                                :labelCol="{ span: 2 }"
                                :wrapperCol="{ span: 14 }">
                    <ta-textarea placeholder=""
                                 :rows="4"
                                 :disabled="true" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label='备注'
                                fieldDecoratorId="remark"
                                :labelCol="{ span: 2 }"
                                :wrapperCol="{ span: 14 }">
                    <ta-textarea placeholder=""
                                 :rows="4"
                                 :disabled="true" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="需求信息"
                     key="2"
                     forceRender>
          <div>
            <ta-form layout="horizontal"
                     :autoFormCreate="(form)=>{this.needsform = form}">
              <ta-row class="fromcom">
                <ta-col :span="8">
                  <ta-form-item label="经办人"
                                fieldDecoratorId="agent">
                    <ta-input :disabled='true'
                              placeholder="" />
                  </ta-form-item>
                  <ta-form-item label="经办人联系电话"
                                fieldDecoratorId="agentPhone">
                    <ta-input :disabled='true'
                              placeholder="" />
                  </ta-form-item>
                  <ta-form-item label="需求量"
                                fieldDecoratorId="demandTotal">
                    <ta-input-number :min="0"
                                     :max="99999999"
                                     :precision="0"
                                     style="width:100%"
                                     :disabled="true"
                                     placeholder="" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="部门名称"
                                fieldDecoratorId="departmentName">
                    <ta-input :disabled='true'
                              placeholder="" />
                  </ta-form-item>
                  <ta-form-item label="经办人职务"
                                fieldDecoratorId="agentOffice">
                    <ta-input :disabled='true'
                              placeholder="" />
                  </ta-form-item>
                  <ta-form-item label="需求类型"
                                fieldDecoratorId="demandType">
                    <ta-select placeholder=""
                               :disabled="true">
                      <ta-select-option v-for="(item ,index) in resourceTypeList "
                                        :key="index"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>

                </ta-col>
                <ta-col :span="24">
                  <ta-col :span="8">
                    <AddressComponent :addressmodel="addressmodel1"
                                      :msg="'地址'"
                                      :disabled="true"
                                      fileldName='addressDatas'
                                      @setaddress="setaddress"
                                      :clearPlaceHolder="''"
                                      :isRequire="false"></AddressComponent>
                  </ta-col>
                  <ta-col :span="8">
                    <ta-form-item label
                                  fieldDecoratorId="detailAddress"
                                  :labelCol="{ span: 0 }"
                                  :wrapperCol="{ span: 23,offset:1 }">
                      <ta-input placeholder=""
                                :disabled="true" />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label='备注'
                                fieldDecoratorId="remark"
                                :labelCol="{ span: 2 }"
                                :wrapperCol="{ span: 14 }">
                    <ta-textarea placeholder=""
                                 :rows="4"
                                 :disabled="true" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
        </ta-tab-pane>
      </ta-tabs>

    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="returns">返回</ta-button>
    </div>
  </div>

</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
export default {
  components: {
    AddressComponent
  },
  data () {
    return {
      addressmodel: [],
      addressmodel1: [],
      addressDatas: [], // 地址存放的数据

      orgNatureList: [], // 机构性质字典数据
      resourceTypeList: [], // 资源类型字典数据
      orgBusinessCategoryList: [], // 机构业务类别

      imageUrl: 'static/img/defalimg.png',
      fileList: [],

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
      _self.resourceform.resetFields()
      _self.needsform.resetFields()
      _self.fileList = []
      _self.imageUrl = 'static/img/defalimg.png'

      _self.flag = _self.$route.query.flag
      _self.id = _self.$route.query.id
      _self.post('/socialCareService/matchDetail', { id: _self.id }).then((res) => {
        if (res.serviceSuccess) {
          let { data } = res.data
          _self.resourceform.setFieldsValue(data.socialCareResourceVo)
          _self.needsform.setFieldsValue(data.socialCareDemandVo)
          //   _self.form.setFieldsValue(data)
          _self.addressmodel = [
            data.socialCareResourceVo.province ? data.socialCareResourceVo.province : '',
            data.socialCareResourceVo.city ? data.socialCareResourceVo.city : '',
            data.socialCareResourceVo.county ? data.socialCareResourceVo.county : ''
          ]
          _self.addressmodel1 = [
            data.socialCareDemandVo.province ? data.socialCareDemandVo.province : '',
            data.socialCareDemandVo.city ? data.socialCareDemandVo.city : '',
            data.socialCareDemandVo.county ? data.socialCareDemandVo.county : ''
          ]
          _self.fileList = JSON.parse(data.socialCareResourceVo.filePathVos)
          if (_self.fileList) {
            _self.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + _self.fileList[0].response.data.data.fileid
            // _self.post('/file/getFileUrls', { returnFileIds: _self.fileList[0].uid }).then(res => {
            //   if (res.serviceSuccess) {
            //     _self.imageUrl = window.faceConfig.basePath + res.data.fileUrlList[0]
            //   }
            // })
          }
        }
      })
    },
    callback (key) {
      console.log(key)
    },
    // 返回
    returns () {
      // 重置表单数据
      this.resourceform.resetFields()
      this.needsform.resetFields()
      this.fileList = []
      this.imageUrl = 'static/img/defalimg.png'

      this.$router.go(-1)
    },
    // 地址传值
    setaddress () {
      this.resourceform.setFieldsValue({
        addressDatas: this.addressmodel
      })
      this.needsform.setFieldsValue({
        addressDatas: this.addressmodel1
      })
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
