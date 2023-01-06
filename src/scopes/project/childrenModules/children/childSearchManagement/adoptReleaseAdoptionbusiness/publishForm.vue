<template>
  <ta-row>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      :fieldDecoratorOptions="isCountyUser?verificationRules('儿童姓名',20):{rules: [{ required: true,message:'请输入儿童姓名'}]}">
          <ta-input :disabled='disabled'
                    :placeholder="disabled?'':'请输入儿童姓名'"
                    v-if="isCountyUser" />
          <ta-select showSearch
                     optionFilterProp="children"
                     @change="nameChange"
                     :filterOption="filterOption"
                     placeholder="请输入儿童姓名"
                     v-else>
            <ta-select-option v-for="(item,index) in childList"
                              :key="index"
                              :childItem="item"
                              :value='item.name'>{{item.name}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      :require="{message:'请选择性别'}">
          <ta-select allowClear
                     :placeholder="!isCountyUser||disabled?'':'请选择性别'"
                     :disabled="!isCountyUser||disabled">
            <ta-select-option v-for="item in sexList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="身份证号"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: false, message: '请输入身份证号' },{validator:idCardValid}]}">
          <ta-input :disabled='disabled'
                    :placeholder="disabled?'':'请输入身份证号'" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="出生日期"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="birthday"
                      :require="{message:'请选择出生日期'}">
          <ta-date-picker style="width: 100%;"
                          :disabled='!isCountyUser||disabled'
                          :disabledDate="disabledDate"
                          :placeholder="!isCountyUser||disabled?'':'请选择出生日期'" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="收养类别"
                      fieldDecoratorId="adoptionType"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      :require="{message:'请选择收养类别'}">
          <ta-select allowClear
                     :placeholder="disabled?'':'请选择收养类别'"
                     :disabled="disabled">
            <ta-select-option v-for="item in adoptedTypeList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="国籍"
                      hidden
                      fieldDecoratorId="nationality"
                      :require="{message:'请选择国籍'}"
                      :initValue='this.Enum.NATIONALITY.ZG'>
          <ta-select allowClear
                     :placeholder="disabled?'':'请选择国籍'"
                     :disabled="disabled">
            <ta-select-option v-for="item in nationalityList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="民族"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="nation"
                      :require="{message:'请选择民族'}">
          <ta-select allowClear
                     :placeholder="!isCountyUser||disabled?'':'请选择民族'"
                     :disabled="!isCountyUser||disabled">
            <ta-select-option v-for="item in nationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="文化程度"
                      fieldDecoratorId="degreeOfEducation"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      :require="{message:'请选择文化程度'}">
          <ta-select allowClear
                     :placeholder="disabled?'':'请选择文化程度'"
                     :disabled="disabled">
            <ta-select-option v-for="item in degreeOfEducationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="联系电话"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="reserve1"
                      :fieldDecoratorOptions="this.phoneRule(false,'联系电话')">
          <ta-input :disabled='disabled'
                    :placeholder="disabled?'':'请输入联系电话'" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <AddressComponent :addressmodel="addressmodel"
                          :msg="'地址'"
                          :labelwidth='{ label: 8, wrapper: 16}'
                          @setaddress="setaddress"
                          :disabled="!isCountyUser||disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      fieldDecoratorId="addrDetaile"
                      :fieldDecoratorOptions="verificationRules('详细地址',100)">
          <ta-input :disabled='!isCountyUser||disabled'
                    :placeholder="!isCountyUser||disabled?'':'请输入详细地址'" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="收养办理单位"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="adoptionHandlingUnit"
                      :fieldDecoratorOptions="verificationRules('收养办理单位',80)">
          <ta-input :disabled='disabled || isp'
                    :placeholder="disabled?'':'请输入收养办理单位'" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="说明"
                    class="alonerow"
                    fieldDecoratorId="explain"
                    :fieldDecoratorOptions="verificationRulesNotMustFill('说明',100,true)">
        <ta-textarea placeholder="请输入说明"
                     :rows="4"
                     :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="填报日期"
                      v-if='disabled'
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="releaseDate"
                      :require="{message:'请选择填报日期'}">
          <ta-date-picker style="width: 100%;"
                          :placeholder="''"
                          :disabled='true' />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="填报人"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      v-if='disabled'
                      fieldDecoratorId="releasePerson">
          <ta-input :disabled='true'
                    :placeholder="''" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="儿童图片"
                    class="alonerow"
                    fieldDecoratorId="files"
                    :require="{message:'请上传儿童图片'}">
        <div class="clearfix">
          <ta-upload :withCredentials="true"
                     name="file"
                     :action="actionUrl"
                     listType="picture-card"
                     :disabled="disabled"
                     :fileList="fileList"
                     @remove="handleRemove"
                     @preview="preview"
                     @change="handleChange"
                     :data="datas"
                     :beforeUpload="beforeUploadImg">
            <div v-if="fileList.length < 3">
              <ta-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
          </ta-upload>
        </div>
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
import Health from '@/scopes/project/common/components/health'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
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
  props: ['heathModel', 'addressmodel', 'disabled', 'isp', 'childNumberAttr', 'adptFlag'],
  data () {
    return {
      sexList: [], // 性别字典数据
      nationalityList: [], // 国籍字典数据
      nationList: [], // 民族字典数据
      degreeOfEducationList: [], // 文化程度字典数据
      adoptionTypeList: [], // 身份类别字典数据
      adoptedTypeList: [], // 收养类别字典数据

      datas: {
        // 头像上传的参数
        busiType: '13', // 头像
        functionalType: '2'
      },
      delVisible: false, // 文件上传的删除按钮显示
      loading: false,
      fileList: [], // 文件列表
      isvalidator: false,
      errMsg: null, // 身份证号错误信息
      childList: [], // 福利机构的儿童数组
      isCountyUser: window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99' // 是否是区县用户

    }
  },
  updated () {
    this.setLabelAndWrapperWidth('8%', '92%', 'alonerow') // 单独一行字段宽度控制
  },
  activated () {
    this.initData()
  },
  mounted () {
    this.getMenuDatas() // 获取字典数据
  },
  methods: {
    // 字典数据获取
    getMenuDatas () {
      this.getMenu('sex', 'sexList') // 获取性别字典数据
      this.getMenu('ADOPTIONCATEGORY', 'adoptedTypeList') // 获取性别字典数据
      this.getMenu('NATIONALITY', 'nationalityList') // 获取国籍字典数据
      this.getMenu('NATION', 'nationList') // 获取国籍字典数据
      this.getMenu('DEGREEEDUCATION', 'degreeOfEducationList') // 获取文化程度字典数据
      this.getMenu('IDENTITCATEGORY', 'adoptionTypeList') // 获取身份类别字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          const newData = res.data.codeList
          newData.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          if (name == 'adoptedTypeList') {
            const newValue = []
            newData.map((item, index) => {
              if (item.value == 4 || item.value == 6) {
                // newData.splice(index, 1)
              } else {
                newValue.push(item)
              }
            })
            const flnewValue = []
            const isFLY = window.parent.indexTool.getUserInfo() && window.parent.indexTool.getUserInfo().orgType == '99'// 判断是否为福利院
            if (isFLY) {
              newValue.map((item, index) => {
                if (item.value == 1 || item.value == 2) {
                  flnewValue.push(item)
                }
              })
            }
            _self[name] = isFLY ? flnewValue : newValue
          } else {
            _self[name] = newData
          }
        }
      })
    },
    // 初始化数据
    initData () {
      //adptFlag不为空，排除该福利机构下已送样的和做过收养登记的儿童信息
      if(this.adptFlag){
        this.post('adoption/queryChildBaseInfoByOrgIdAndNameExt', { orgId: window.parent.indexTool.getUserInfo().orgId, name: '', flag: this.adptFlag }).then((res) => {
          if (res.serviceSuccess) {
            const _self = this
            let array = res.data.data || []
            // 去除列表中的儿童
            _self.childList = []
            array.forEach(element => {
              if (_self.childNumberAttr.indexOf(element.childNumber) === -1) _self.childList.push(element)
            });
          }
        })
      }else{
        this.post('adoption/queryChildBaseInfoByOrgIdAndName', { orgId: window.parent.indexTool.getUserInfo().orgId, name: '' }).then((res) => {
          if (res.serviceSuccess) {
            const _self = this
            let array = res.data.data || []
            // 去除列表中的儿童
            _self.childList = []
            array.forEach(element => {
              if (_self.childNumberAttr.indexOf(element.childNumber) === -1) _self.childList.push(element)
            });
          }
        })
      }
    },
    // 姓名change事件
    nameChange (e, option) {
      this.$emit('setChildForm', option.data.attrs.childItem)
    },
    // 根据输入项进行筛选
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    // 身份证号验证
    idCardValid (rule, value, callback) {
      const _self = this
      if (!_self.isvalidator) {
        // _self.errMsg ? callback(_self.errMsg[0]) : callback()
        callback()
      } else {
        this.idCardValidate(rule, value, callback, _self)
      }
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.$emit('callbackByIdCard', sex, age, birth)
    },
    // 健康状况传值
    setheath () {
      this.$emit('setheath')
    },
    // 地址传值
    setaddress () {
      this.$emit('setaddress')
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
           setTimeout(() => {
          this.$forceUpdate()
        }, 500);
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUploadImg (file) {
      const typelist = ['image/jpeg', 'image/png']
      const isaccord = typelist.includes(file.type)
      if (!isaccord) {
        this.$message.error('请上传jpeg、png图片格式')
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
    preview (file) {
      this.downloadFile(file)
    },
    handleRemove (e) {
      if (this.disabled) {
        return false
      }

      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: e.response.data.data.fileid
      }).then(response => {
        _self.$message.success('删除成功!')
      }).catch(() => {
        _self.$message.error('删除失败!')
      })
    },
    // 登记日期（登记日期）不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
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
  width: 300px;
  /* margin-left: 17%; */
  height: 252px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.uploadimg img {
  width: 100%;
}
.avatar-uploader {
  margin-top: 30px;
}
.add_contract {
  width: 200px;
  height: 150px;
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
</style>
