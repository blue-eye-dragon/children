<template>
  <div class="padbottom conts ">
    <div class="contin">
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <ta-row>
          <ta-col :span='10'>
            <ta-form-item label="定点医院名称"
                          fieldDecoratorId="hospitalName"
                          :fieldDecoratorOptions="verificationRules('定点医院名称',50)">
              <ta-input :disabled='disabled'
                        :placeholder="disabled?'':'请输入定点医院名称'" />
            </ta-form-item>
            <ta-form-item label="医院分类"
                          fieldDecoratorId="hospitalCategory"
                          :fieldDecoratorOptions="verificationRules('医院分类')">
              <ta-select :placeholder="disabled?'':'请选择医院分类'"
                         :disabled="disabled">
                <ta-select-option v-for="(item ,index) in hospitalCategoryList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <!-- <ta-form-item label="是否部级定点医院"
                          fieldDecoratorId="isMinisterialLevelDesignatedHospital"
                          :fieldDecoratorOptions="verificationRules('是否部级定点医院')">
              <ta-select :placeholder="disabled?'':'请选择是否部级定点医院'"
                         :disabled="disabled">
                <ta-select-option v-for="(item ,index) in yesOrNoList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item> -->
            <ta-form-item label="优势科目"
                          fieldDecoratorId="advantageSubject"
                          :fieldDecoratorOptions="verificationRules('优势科目',100)">
              <ta-input :disabled='disabled'
                        :placeholder="disabled?'':'请输入优势科目'" />
            </ta-form-item>
            <ta-form-item label="床位数"
                          fieldDecoratorId="bedNum"
                          :require="{message:'请输入床位数'}">
              <ta-input-number :min="0"
                               :max="999999"
                               style="width: 100%;"
                               :precision="0"
                               :disabled='disabled'
                               :placeholder="disabled?'':'请输入床位数'" />
            </ta-form-item>
            <ta-form-item label="联系电话"
                          fieldDecoratorId="contactNumber"
                          :fieldDecoratorOptions="verificationRules('联系电话',{type: 'phone'})">
              <ta-input :disabled='disabled'
                        :placeholder="disabled?'':'请输入联系电话'" />
            </ta-form-item>
          </ta-col>
          <ta-col :span='10'>
            <ta-form-item label="定点医院编号"
                          fieldDecoratorId="hospitalNum"
                          :fieldDecoratorOptions="verificationRules('定点医院编号',50)">
              <ta-input :disabled="true"
                        :placeholder="disabled?'':'请输入定点医院编号'" />
            </ta-form-item>
            <ta-form-item label="医院等级"
                          fieldDecoratorId="hospitalGrade"
                          :fieldDecoratorOptions="verificationRules('医院等级')">
              <ta-select :placeholder="disabled?'':'请选择医院等级'"
                         :disabled="disabled">
                <ta-select-option v-for="(item ,index) in hospitalGradeList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="医院性质"
                          fieldDecoratorId="hospitalNature"
                          :fieldDecoratorOptions="verificationRules('医院性质')">
              <ta-select :placeholder="disabled?'':'请选择医院性质'"
                         :disabled="disabled">
                <ta-select-option v-for="(item ,index) in hospitalNatureList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <!-- <ta-form-item label="是否省级定点医院"
                          fieldDecoratorId="isMinisterialLevelProvincialHospital"
                          :fieldDecoratorOptions="verificationRules('是否省级定点医院')">
              <ta-select :placeholder="disabled?'':'请选择是否省级定点医院'"
                         :disabled="disabled">
                <ta-select-option v-for="(item ,index) in yesOrNoList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item> -->
            <ta-form-item label="相关联系人"
                          fieldDecoratorId="relevantContacts"
                          :fieldDecoratorOptions="verificationRules('相关联系人',72)">
              <ta-input :disabled='disabled'
                        :placeholder="disabled?'':'请输入相关联系人'" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="20">
            <ta-col :span="12">
              <!-- <AddressNew :msg="'医院地址'"
                          :disabled="disabled"
                          :placeholder="placeholder"
                          :isRequire="this.flag=='add'"
                          fileldName='hospitalAddrDatas'></AddressNew> -->

              <AddressComponent :addressmodel="addressmodel"
                                :msg="'医院地址'"
                                :changeOnSelect="true"
                                arealevel="4"
                                :isRequire="this.flag=='add'"
                                fileldName='hospitalAddrDatas'
                                :disabled="disabled"
                                :loadLeafLevel="3"
                                @setaddress="setaddress"
                                @adsvalchange="adsvalchange"></AddressComponent>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label
                            fieldDecoratorId="hospitalDetailedAddr"
                            :labelCol="{ span: 0 }"
                            :wrapperCol="{ span: 23,offset:1 }"
                            :fieldDecoratorOptions="this.flag=='add'?verificationRules('详细地址',100):verificationRulesNotMustFill('详细地址',100)">
                <ta-input :placeholder="placeholderDetailAddr"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="20">
            <ta-form-item label='医院介绍'
                          fieldDecoratorId="hospitalIntroduce"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('医院介绍',200,true)">
              <ta-textarea :placeholder="disabled?'':'请输入医院介绍'"
                           :rows="4"
                           :disabled="disabled" />
            </ta-form-item>
          </ta-col>
        </ta-row>

      </ta-form>

    </div>
    <div class="bom">
      <ta-button type="primary"
                 @click="save"
                 v-if="!disabled">保存</ta-button>
      <ta-button @click="returns"
                 class="btnleft">返回</ta-button>
    </div>
  </div>
</template>
<script>
import AddressNew from '@/scopes/project/common/components/addressNew'
import AddressComponent from '@/scopes/project/common/components/addressComponent'

export default {
  components: {
    AddressNew,
    AddressComponent
  },
  data () {
    return {
      disabled: false,

      hospitalAddrProvinceList: [], // 所在省份
      hospitalGradeList: [], // 医院等级
      hospitalCategoryList: [], // 医院分类
      hospitalNatureList: [], // 医院性质
      yesOrNoList: [], // 是否

      flag: '', // 区分新增（add）、编辑（update）、查看（detail）的标识符
      id: '', // 列表跳转传过来的id

      // 编辑时需要传给后台的数据
      createTime: null,
      createUser: null,
      delState: null,
      orgId: null,
      placeholder: '请选择', // 医院地址编辑、查看的回显
      placeholderDetailAddr: '请输入详细地址', // 详细地址编辑、查看的回显
      hospitalAddrProvince: '', // 编辑查看时的省级数据
      hospitalAddrCity: '', // 编辑查看时的市级数据
      hospitalAddrCounty: '', // 编辑查看时的县级数据

      addressmodel: [], // 回显地址列表
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  methods: {

    /**
     * @author: yinpengfei
     * @Date: 2021-06-11 10:35:01
     * @information: 医院地址选项变化时
     */
    adsvalchange (e, areaLevel) {
      if(e && e.length) {
        this.form.setFieldsValue({hospitalAddrDatas: e})
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-11 10:59:08
     * @information: 赋值地址
     */
    setaddress (fileldName, addressdata) {
      this.form.setFieldsValue({
        hospitalAddrDatas: this.addressmodel
      })
    },

    //  编辑及查看初始化数据
    initDatas () {
      this.flag = this.$route.query.flag
      this.id = this.$route.query.id
      this.placeholder = '请选择'
      this.placeholderDetailAddr = '请输入详细地址'
      this.disabled = false
      if (this.flag != 'add') { // 编辑和查看
        if (this.flag == 'detail') {
          this.disabled = true
        }
        this.post('/designatedHospital/queryById', { id: this.id }).then((res) => {
          if (res.serviceSuccess) {
            const data = res.data.data
            this.createTime = data.createTime
            this.createUser = data.createUser
            this.delState = data.delState
            this.orgId = data.orgId
            this.form.setFieldsValue(data)
            if (data.hospitalAddrView.indexOf('全国合计') != -1) {
              this.placeholder = data.hospitalAddrView.substring(5, data.hospitalAddrView.length)
            } else {
              this.placeholder = data.hospitalAddrView
            }
            this.placeholderDetailAddr = data.hospitalDetailedAddr

            this.hospitalAddrProvince = data.hospitalAddrProvince
            this.hospitalAddrCity = data.hospitalAddrCity
            this.hospitalAddrCounty = data.hospitalAddrCounty

            // 若存在地址信息
            if (this.hospitalAddrProvince) {
              this.addressmodel = [
                this.hospitalAddrProvince || '',
                this.hospitalAddrCity || '',
                this.hospitalAddrCounty || ''
              ]
            }
          
          }
        })
      } else { // 新增
        // 定点医院编号赋值
        this.post('/designatedHospital/getHospitalNum', {}).then((res) => {
          if (res.serviceSuccess) {
            this.form.setFieldsValue({
              hospitalNum: res.data.data
            })
          }
        })
      }
    },
    // 字典数据获取
    getMenuDatas () {
      this.getProvince() // 获取省份字典
      this.getMenu('HOSPITAL_GRADE', 'hospitalGradeList') // 获取医院等级字典数据
      this.getMenu('HOSPITAL_CATEGORY', 'hospitalCategoryList') // 获取医院分类数据字典
      this.getMenu('HOSPITAL_NATURE', 'hospitalNatureList') // 获取医院性质字典数据
      this.getMenu('YESNO', 'yesOrNoList') // 获取是否字典数据
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
    // 获取所在省份
    getProvince () {
      const _self = this
      _self.post('/zoning/queryStatistics', { parentId: null }).then(res => {
        if (res.serviceSuccess) {
          _self.hospitalAddrProvinceList = res.data.data
        }
      })
    },
    // 保存
    save () {
      const _self = this
      _self.form.validateFields((err, values) => {
        if (!err) {
          let url = '/designatedHospital/save'
          const formData = _self.form.getFieldsValue()
          formData.hospitalAddrProvince = this.hospitalAddrProvince
          formData.hospitalAddrCity = this.hospitalAddrCity
          formData.hospitalAddrCounty = this.hospitalAddrCounty

          if (formData.hospitalAddrDatas && formData.hospitalAddrDatas.length > 0) {
            formData.hospitalAddrProvince = formData.hospitalAddrDatas[0]
            formData.hospitalAddrCity = formData.hospitalAddrDatas[1]
            formData.hospitalAddrCounty = formData.hospitalAddrDatas[2]
            delete formData.hospitalAddrDatas
          }
          formData.hospitalDetailedAddr = formData.hospitalDetailedAddr || _self.placeholderDetailAddr
          if (_self.flag == 'update') {
            formData.id = _self.id
            formData.createTime = _self.createTime
            formData.createUser = _self.createUser
            formData.delState = _self.delState
            formData.orgId = _self.orgId

            url = '/designatedHospital/update'
          }
          _self.post(url, formData).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('数据保存/修改成功！')
              _self.returns()
            }
          })
        }
      })
    },
    // 返回
    returns () {
      this.form.resetFields()
      this.$router.go(-1)
    }
  }
}
</script>
