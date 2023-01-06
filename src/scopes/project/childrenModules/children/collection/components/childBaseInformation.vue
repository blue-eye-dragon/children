<template>
  <ta-row class="divClass">
    <ta-col :span="8">
      <ta-form-item label="儿童姓名"
                    fieldDecoratorId="name">
        <ta-input :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="民族"
                    fieldDecoratorId="nation">
        <ta-select allowClear
                   :disabled="disabled">
          <ta-select-option v-for="item in nationList"
                            :key="item.value"
                            :value="item.value">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="身份证号"
                    fieldDecoratorId="idCard">
        <ta-input :disabled="disabled" />
      </ta-form-item>
      <Health fileldName='healthConditionDatas'
              :disabled="disabled"
              :clearPlaceHolder="true"
              :heathmodel="heathChildModel"
              @setheath="setChildHeaths"></Health>

    </ta-col>
    <ta-col :span="8">
      <ta-form-item label="户籍性质"
                    fieldDecoratorId="censusRegister">
        <ta-select allowClear
                   :disabled="disabled">
          <ta-select-option v-for="item in censusRegisterList"
                            :key="item.value"
                            :value="item.value">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="性别"
                    fieldDecoratorId="sex">
        <ta-select allowClear
                   :disabled="disabled">
          <ta-select-option v-for="item in sexList"
                            :key="item.value"
                            :value="item.value">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="出生日期"
                    fieldDecoratorId="birthday">
        <ta-date-picker style="width: 100%;"
                        :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <div class="uploadimg">
        <div class="add_contract">
          <span @click="del"
                v-if="delVisible"
                title="点击可删除">删除</span>
          <div class="adreementImg">
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
                   @preview="preview"
                   :fileList="fileList"
                   :limit=1>
          <ta-button :disabled="disabled">上传照片</ta-button>
        </ta-upload>
      </div>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <AddressComponent :addressmodel="addressChildModel"
                          :msg="'户籍所在地'"
                          :disabled="disabled"
                          arealevel="5"
                          :clearPlaceHolder="true"
                          fileldName='censusRegisterDatas'
                          @setaddress="setChildAddress"></AddressComponent>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }">
          <ta-input placeholder="请输入详细地址"
                    :disabled="disabled" />
        </ta-form-item>

      </ta-col>
      <ta-col :span="8">

        <ta-form-item label="上报类型"
                      fieldDecoratorId="reportType">
          <ta-radio-group style="float:left;">
            <ta-radio v-for="item in registTypeList"
                      :key="item.value"
                      :value="item.value"
                      :disabled="disabled">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <AddressComponent :addressmodel="addressChildModelNow"
                          :msg="'现住址'"
                          fileldName='currentAddressDatas'
                          :clearPlaceHolder="true"
                          @setaddress="setChildAddress"
                          arealevel="5"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label
                      fieldDecoratorId="currentAddressDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }">
          <ta-input placeholder="请输入详细地址"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="是否学校寄宿"
                      fieldDecoratorId="boardSchool">
          <ta-radio-group style="float:left;">
            <ta-radio v-for="item in boardSchoolList"
                      :key="item.value"
                      :value="item.value"
                      :disabled="disabled">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="就学情况"
                    fieldDecoratorId="schooling"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{ span: 22 }">
        <ta-radio-group style="float:left;">
          <ta-radio v-for="item in schoolingList"
                    :key="item.value"
                    :value="item.value"
                    :disabled="disabled">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="监护类型"
                    fieldDecoratorId="guardianship"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{ span: 22 }">
        <ta-radio-group style="float:left;">
          <ta-radio v-for="item in guardianshipList"
                    :key="item.value"
                    :value="item.value"
                    :disabled="disabled">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="其他特殊情况"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{ span: 22 }"
                    fieldDecoratorId="specialSituate">
        <ta-checkbox v-for="item in specialSituateList"
                     :key="item.value"
                     :value="item.value"
                     :disabled="disabled"
                     style="float:left;">{{item.label}}</ta-checkbox>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="社会福利、救助、扶贫落实情况"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{ span: 22 }"
                    fieldDecoratorId="WelfareAssistAssistanc">
        <ta-checkbox v-for="item in WelfareAssistAssistancList"
                     :key="item.value"
                     :value="item.value"
                     :disabled="disabled"
                     style="float:left;">{{item.label}}</ta-checkbox>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="有无发生遭受监护人侵害的情形"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{ span: 22 }"
                    fieldDecoratorId="victimizatByguardians">
        <ta-checkbox v-for="item in victimizatByguardiansList"
                     :key="item.value"
                     :value="item.value"
                     :disabled="disabled"
                     style="float:left;">{{item.label}}</ta-checkbox>
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import Health from '@/scopes/project/common/components/health'
import moment from 'moment'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: {
    AddressComponent,
    Health
  },
  props: ['addressChildModel', 'addressChildModelNow', 'heathChildModel'],
  data () {
    return {
      imageUrl: 'static/img/defalimg.png',
      loading: false,
      filed: '',
      disabled: true,

      sexList: [], // 性别字典数据
      nationList: [], // 民族字典数据
      censusRegisterList: [], // 户籍性质字典数据
      registTypeList: [], // 上报类型字典数据
      boardSchoolList: [], // 是否学校寄宿字典数据
      schoolingList: [], // 就学情况字典数据
      guardianshipList: [], // 监护类型字典数据
      specialSituateList: [], // 其他特殊情况
      WelfareAssistAssistancList: [], // 社会福利、救助、扶贫落实情况字典数据
      victimizatByguardiansList: [], // 有无发生遭受监护人侵害的情形

      delVisible: false, // 文件上传的删除按钮显示
      adoption: { // 头像上传的参数
        busiType: '13', // 头像
        functionalType: '2'
      },
      headImgId: '', // 上传的头像id
      fileList: [] // 文件列表

    }
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    preview (file) { this.downloadFile(file) },
    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('NATION', 'nationList') // 获取民族字典数据
      this.getMenu('CENSUSREGISTER', 'censusRegisterList') // 获取户籍性质字典数据
      this.getMenu('PRINCIPAL', 'principalList') // 获取委托方字典数据
      this.getMenu('REPORTTYPE', 'registTypeList') // 获取上报类型字典数据
      this.getMenu('YESNO', 'boardSchoolList') // 获取是否学校寄宿字典数据
      this.getMenu('SCHOOLSITUATION', 'schoolingList') // 获取就学情况字典数据
      this.getMenu('GUARDIANSHIPTYPE', 'guardianshipList') // 获取监护类型字典数据
      this.getMenu('OTHERSPECIALCASES', 'specialSituateList') // 获取其他特殊情况字典数据
      this.getMenu('SOCIALWELFAREIMPLEMENTATION', 'WelfareAssistAssistancList') // 获取社会福利、救助、扶贫落实情况字典数据
      this.getMenu('GUARDIANVIOLATION', 'victimizatByguardiansList') // 获取有无发生遭受监护人侵害的情形字典数据
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
    // 地址传值
    setChildAddress () {
      this.$emit('setChildAddress')
    },
    // 健康状况传值
    setChildHeaths () {
      this.$emit('setChildHeaths')
    }
  },
  computed: {
    actionUrl () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  }
}

</script>
<style scoped lang="less">
.uploadimg {
  width: 100%;
  height: 252px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.uploadimg img {
  width: 100%;
}
.radios /deep/ .ant-radio-wrapper {
  margin-right: 9%;
}
.radios /deep/ .ant-radio-wrapper:nth-child(4) {
  margin-right: 0;
}

.add_contract {
  width: 80%;
  cursor: pointer;
  display: flex;
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
.divClass {
  padding: 0 5%;
}
</style>
