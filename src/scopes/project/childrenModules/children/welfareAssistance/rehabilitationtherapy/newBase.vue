<template>
  <!--  基地-操作 -->
  <div class="padbottom conts ">
    <div class="contin">
      <div class="item_title">
        <div class="lines"></div>
        <p class="item_text"
           style="width:145px">康复训练基地信息</p>
        <div class="horizontalline"></div>
      </div>
      <ta-form layout="horizontal"
               :autoFormCreate="(baseInfoForm)=>{this.baseInfoForm = baseInfoForm}">
        <ta-row class="fromcom">
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="基地编号"
                            :require="{message:'请输入基地编号'}"
                            fieldDecoratorId="baseNum">
                <ta-input :disabled="noEdit"
                          placeholder="请输入基地编号" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="基地名称"
                            :require="{message:'请输入基地名称'}"
                            fieldDecoratorId="baseName">
                <ta-input :disabled="noEdit"
                          placeholder="请输入基地名称" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="所属单位"
                            :require="{message:'请输入所属单位'}"
                            fieldDecoratorId="orgName">
                <ta-input style="width:68%"
                          :disabled="true"
                          placeholder="请选择所属单位" />
                <ta-button :disabled="noEdit"
                           type="primary"
                           style="width:30%"
                           @click="showModalSelect">选择</ta-button>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="负责人"
                            fieldDecoratorId="responsiblePerson">
                <ta-input :disabled="noEdit"
                          placeholder="请输入负责人" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="邮编"
                            fieldDecoratorId="zipCode">
                <ta-input :disabled="noEdit"
                          placeholder="请输入邮编" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="传真"
                            fieldDecoratorId="fax">
                <ta-input :disabled="noEdit"
                          placeholder="请输入传真" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="邮箱"
                            fieldDecoratorId="email">
                <ta-input :disabled="noEdit"
                          placeholder="请输入邮箱" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="联系电话"
                            fieldDecoratorId="contactPhone">
                <ta-input :disabled="noEdit"
                          placeholder="请输入联系电话" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">

            <ta-col :span="6">
              <ta-form-item label="床位数"
                            :require="{message:'请输入床位数'}"
                            fieldDecoratorId="bedNum">
                <ta-input-number :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="999999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="康复场地面积（m²）"
                            :require="{message:'请输入康复场地面积（m²）'}"
                            :labelCol="{ span: 12 }"
                            :wrapperCol="{span:12}"
                            fieldDecoratorId="rehabilitationArea">
                <ta-input-number :disabled="noEdit"
                                 placeholder=" "
                                 :precision="2"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="是否获得医疗卫生许可证"
                            :require="{message:'请选择是否获得医疗卫生许可证'}"
                            :labelCol="{ span: 14 }"
                            :wrapperCol="{span:10}"
                            fieldDecoratorId="isGetMedicalAndHealthLicense">
                <ta-select :disabled="noEdit"
                           placeholder="请选择是否获得医疗卫生许可证">
                  <ta-select-option v-for="(item,index) in yesNoList"
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="医疗卫生资质等级"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{span:14}"
                            fieldDecoratorId="medicalAndHealthQualiLevel">
                <ta-input placeholder="请输入医疗卫生资质等级"
                          :disabled="noEdit" />
                <!-- <ta-select :disabled='noEdit' placeholder="请输入医疗卫生资质等级">
                  <ta-select-option
                    v-for="(item,index) in yesNoList"
                    :value="item.value"
                    :key="index"
                  >{{item.label}}</ta-select-option>
                </ta-select>-->
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="功能科室设置"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{span:22}"
                          fieldDecoratorId="functionalDepartSet">
              <ta-select mode="multiple"
                         placeholder="请选择功能科室设置"
                         :disabled="noEdit">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in featureSetList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <AddressComponent :disabled="noEdit"
                                :addressmodel="addressmodel"
                                :msg="'地址'"
                                @setaddress="setaddress"></AddressComponent>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="详细地址"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{span:21}"
                            :require="{message:'请输入详细地址'}"
                            fieldDecoratorId="detailedAddress">
                <ta-input :disabled="noEdit"
                          placeholder="请输入详细地址" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="备案日期"
                            :require="{message:'请选择备案日期'}"
                            fieldDecoratorId="recordDate">
                <ta-date-picker :disabled="noEdit"
                                style="width:100%"
                                placeholder="请选择备案日期" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label="所属单位id"
                          hidden
                          fieldDecoratorId="orgCode">
              <ta-input hidden
                        :disabled="true" />
            </ta-form-item>
            <ta-modal title="单位选择"
                      v-model="etreesModel"
                      @ok="hideModalSelect"
                      okText="确认"
                      cancelText="取消">
              <div style="border: 1px solid lightgray;margin-top: 10px;height: 300px;     overflow: overlay;">
                <div>
                  <ta-e-tree :load="loadNode"
                             highlight-current
                             :props="defaultProps"
                             node-key="orgId"
                             tree-node-id="parentId"
                             @node-click="click"
                             lazy />
                </div>
              </div>
            </ta-modal>
          </ta-col>

          <div class="item_title">
            <div class="lines"></div>
            <p class="item_text"
               style="width:266px">基地人员情况(单位:人)</p>
            <div class="horizontalline"></div>
          </div>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="康复医师"
                            fieldDecoratorId="rehabilitationPhysician">
                <ta-input-number @change="doSum1"
                                 :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="康复治疗师"
                            fieldDecoratorId="rehabilitationTherapist">
                <ta-input-number @change="doSum1"
                                 :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="矫形治疗师"
                            fieldDecoratorId="orthopedicProducer">
                <ta-input-number @change="doSum1"
                                 :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="语言治疗师"
                            fieldDecoratorId="speechTherapist">
                <ta-input-number @change="doSum1"
                                 :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="医师"
                            fieldDecoratorId="physician">
                <ta-input-number @change="doSum2"
                                 :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="社会工作者"
                            fieldDecoratorId="socialWorker">
                <ta-input-number @change="doSum3"
                                 :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>

            <ta-col :span="6">
              <ta-form-item label="护士"
                            fieldDecoratorId="nurse">
                <ta-input-number @change="doSum2"
                                 :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="其他医务"
                            fieldDecoratorId="otherMedicalMatters">
                <ta-input-number @change="doSum2"
                                 :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="心理工作者"
                            fieldDecoratorId="psychologicalWorkers">
                <ta-input-number @change="doSum3"
                                 :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="其他人员"
                            fieldDecoratorId="otherPerson">
                <ta-input-number @change="doSum3"
                                 :disabled="noEdit"
                                 placeholder=" "
                                 :precision="0"
                                 :max="99999"
                                 :min="1"
                                 style="width: 100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="医务人员（总计）"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{span:14}"
                            fieldDecoratorId="medicalMattersTotal">
                <ta-input :disabled="true" />
                <!-- <ta-input-number
                  :disabled="true"
                  placeholder=" "
                  :precision="0"
                  :max="99999"
                  :min="1"
                  style="width: 100%"
                />-->
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="康复人员（总计）"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{span:14}"
                            fieldDecoratorId="rehabilitativePersonTotal">
                <ta-input :disabled="true" />
                <!-- <ta-input-number
                  :disabled="true"
                  placeholder=" "
                  :precision="0"
                  :max="99999"
                  :min="1"
                  style="width: 100%"
                />-->
              </ta-form-item>
            </ta-col>

          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="其他专业人员（总计）"
                            :labelCol="{ span: 12 }"
                            :wrapperCol="{span:12}"
                            fieldDecoratorId="otherProfessionalsTotal">
                <ta-input :disabled="true" />
                <!-- <ta-input-number
                  :disabled="true"
                  placeholder=" "
                  :precision="0"
                  :max="99999"
                  :min="1"
                  style="width: 100%"
                />-->
              </ta-form-item>
            </ta-col>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div class="bom">
      <ta-button type="primary"
                 v-if="!noEdit"
                 class="preservation"
                 @click="submit()">提交</ta-button>
      <ta-button class="preservation btnleft"
                 @click="backs">取消</ta-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import AddressComponent from '@component/common/components/addressComponent'
import AreaQuery from '@component/common/components/areaQuery'
export default {
  components: {
    AddressComponent,
    AreaQuery
  },
  data () {
    return {
      noEdit: false,
      addressmodel: [],
      yesNoList: [],
      featureSetList: [],
      qdata: [],
      etreesModel: false,
      url: '/rehabilitationBase/queryOrgTree',
      defaultProps: {
        label: 'orgName', // 指定json数组中，当前节点在页面上显示的文本的key，默认：label
        id: 'orgId', // 指定json数组中节点的唯一标识，默认：id，必须与node-key属性指定的值一致
        isLeaf: 'isLeaf' // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
      }
    }
  },
  activated () {
    // this.releaseForm.resetFields()
    const param = this.$route.query
    this.qdata = []
    this.noEdit = false
    if (param.id) {
      this.qdata = param
      this.noEdit = param.tp
      this.getData(param.id)
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    doSum1 () {
      this.$nextTick(() => {
        const data = this.baseInfoForm.getFieldsValue()
        const sum =
          parseInt(
            data.rehabilitationPhysician ? data.rehabilitationPhysician : 0
          ) +
          parseInt(
            data.rehabilitationTherapist ? data.rehabilitationTherapist : 0
          ) +
          parseInt(data.speechTherapist ? data.speechTherapist : 0) +
          parseInt(data.orthopedicProducer ? data.orthopedicProducer : 0)
        this.baseInfoForm.setFieldsValue({
          rehabilitativePersonTotal: sum || null
        })
      })
    },
    doSum2 () {
      this.$nextTick(() => {
        const data = this.baseInfoForm.getFieldsValue()
        const sum =
          parseInt(data.physician ? data.physician : 0) +
          parseInt(data.otherMedicalMatters ? data.otherMedicalMatters : 0) +
          parseInt(data.nurse ? data.nurse : 0)
        this.baseInfoForm.setFieldsValue({ medicalMattersTotal: sum || null })
      })
    },
    doSum3 () {
      this.$nextTick(() => {
        const data = this.baseInfoForm.getFieldsValue()
        const sum =
          parseInt(data.psychologicalWorkers ? data.psychologicalWorkers : 0) +
          parseInt(data.socialWorker ? data.socialWorker : 0) +
          parseInt(data.otherPerson ? data.otherPerson : 0)
        this.baseInfoForm.setFieldsValue({
          otherProfessionalsTotal: sum || null
        })
      })
    },
    click (data, node, self) {
      this.baseInfoForm.setFieldsValue({
        orgName: data.orgName,
        orgCode: data.orgId
      })
      this.etreesModel = false
    },
    // 加载子节点方法
    loadNode (node, resolve) {
      let param = {}
      if (node.data) {
        param = { parentId: node.data.orgId }
      } else {
        param = {}
      }
      this.post('/rehabilitationBase/queryOrgTree', param).then(result => {
        const treeData = result.data.data
        resolve(treeData)
      })
    },

    showModalSelect () {
      this.etreesModel = true
    },
    hideModalSelect () {
      this.etreesModel = false
    },

    async getData (id) {
      const param = { id: id }
      const reslut = await this.post('/rehabilitationBase/queryById', param)

      if (!reslut.errors) {
        const data = reslut.data.data
        this.addressmodel = [data.province, data.city, data.county]
        data.recordDate = moment(data.recordDate)
        data.functionalDepartSet = data.functionalDepartSet
          ? data.functionalDepartSet.split(',')
          : []

        this.baseInfoForm.setFieldsValue(data)
      }
    },
    setaddress () {
      this.baseInfoForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    async submit () {
      this.baseInfoForm.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          if (this.qdata.id) {
            url = '/rehabilitationBase/update'
          } else {
            url = '/rehabilitationBase/save'
          }
          const param = this.baseInfoForm.getFieldsValue()
          this.formatting(param)
          if (this.qdata.id) {
            param.id = this.qdata.id
          }
          const res = await this.post(url, param)
          if (!res.errors) {
            this.baseInfoForm.resetFields()
            this.backs()
          }
        }
      })
    },
    formatting (data, e) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (data[k].file) {
            const arr = []
            data[k].fileList.map(item => {
              arr.push(item.response.data.data.fileid)
            })
            data[`${k}Id`] = arr
          } else {
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
    },

    fnValidateMore (a, v, callback) {
      const value = v || ''
      this.fnValidateTextarea(200, '病残状况描述', value, callback, '0')
    },
    backs () {
      this.baseInfoForm.resetFields()
      this.$router.go(-1)
    },

    async getList () {
      const data4 = await this.getDictionaries('FUNCTIONAL_DEPART_SET')
      this.featureSetList = data4 // 功能科室设置
      const data5 = await this.getDictionaries('YESNO')
      this.yesNoList = data5 // 是否
    }
  }
}
</script>
<style scoped>
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cursors {
  cursor: pointer;
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
.item_text {
  width: 60px;
  font-size: 17px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.horizontalline {
  width: calc(100% - 135px);
  margin-left: 15px;
  margin-right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
}
/deep/ #functionalDepartSet .ant-select-selection--multiple {
  min-height: 50px;
  cursor: text;
  padding-bottom: 3px;
  zoom: 1;
}
</style>
