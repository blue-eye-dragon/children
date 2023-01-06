<template>
  <div style="padding: 1%;">

    <ta-form layout="horizontal"
             :autoFormCreate="(form)=>{this.form = form}"
             class="drawerFrom">
      <ta-row>
        <ta-col :span="16">
          <ta-col :span="8">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>
        </ta-col>

        <ta-col :span="16">
          <ta-form-item label="现住址"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{ span: 14 }"
                        fieldDecoratorId="currentAddress">
            <ta-input :disabled='true' />
          </ta-form-item>
        </ta-col>

        <ta-col :span="16">
          <ta-form-item label="减员原因"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{ span:14 }"
                        fieldDecoratorId="reductionType">
            <ta-radio-group name="radioGroup"
                            :disabled="true">
              <ta-radio :value="item.value"
                        v-for="(item,index) in reductionTypeList"
                        :key="index">{{item.label}}</ta-radio>
            </ta-radio-group>
          </ta-form-item>
        </ta-col>

        <ta-col :span="16">
          <ta-col :span="8"
                  v-if="type!=Enum.REDUCTIONREASON.LRCW&&type!=Enum.REDUCTIONREASON.HJQC&&type!=Enum.REDUCTIONREASON.QT">
            <ta-form-item :label="label"
                          fieldDecoratorId="businessDate">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8"
                  v-if="type==Enum.REDUCTIONREASON.QT">
            <ta-form-item label="其他原因"
                          fieldDecoratorId="reason">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8"
                  v-if="type==Enum.REDUCTIONREASON.KJGS">
            <ta-form-item label="困境改善原因"
                          fieldDecoratorId="reason">
              <ta-input :disabled="disabled" />
            </ta-form-item>

          </ta-col>
          <ta-col :span="8"
                  v-if="type==Enum.REDUCTIONREASON.SW">
            <ta-form-item label="死亡处理方式"
                          fieldDecoratorId="dieDeal">
              <ta-select allowClear
                         :disabled="disabled">
                <ta-select-option v-for="item in dieDealList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>

        <ta-col :span="16">

          <ta-col :span="8"
                  v-if="type==Enum.REDUCTIONREASON.SW">
            <ta-form-item label="死亡原因"
                          fieldDecoratorId="dieReason">
              <ta-select allowClear
                         :disabled="disabled">
                <ta-select-option v-for="item in dieReasonList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>

        <ta-col :span="16">
          <ta-col :span="8">
            <ta-form-item label="减员日期"
                          fieldDecoratorId="reductionDate">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="末领年月"
                          fieldDecoratorId="endTime">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="16">
          <ta-form-item label="备注"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{ span: 14 }"
                        fieldDecoratorId="remark">
            <ta-textarea :rows="2"
                         :disabled="disabled" />
          </ta-form-item>
          <ta-form-item label="上传"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{ span: 14 }">

            <ta-upload :withCredentials="true"
                       name="file"
                       :multiple="true"
                       :disabled="disabled"
                       :fileList="fileList"
                       @preview="preview">
              <ta-button>
                <ta-icon type="upload" /> 上传文件
              </ta-button>
            </ta-upload>

          </ta-form-item>
        </ta-col>
      </ta-row>
    </ta-form>
    <div class="btnclass">
      <ta-button @click="returns"
                 style="left: 20px; top: 7px;">返回</ta-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sexList: [], // 性别字典数据
      childTypeList: [], // 儿童类别字典数据
      reductionTypeList: [], // 减员原因字典数据
      dieReasonList: [], // 死亡原因
      dieDealList: [], // 死亡处理方式

      disabled: true,
      label: '收养日期', // 收养日期（儿童超龄时期、找回父母日期、独立生活日期、困境改善日期、死亡日期、其他出库日期）的label
      type: '01', // 减员原因选择的数据
      obj: {}, // 列表带过来的数据

      fileList: []
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 初始化数据
    initDatas () {
      this.obj = this.$route.query.obj ? JSON.parse(this.$route.query.obj) : {}
    },
    returns () {
      this.$router.go(-1)
    },
    preview (file) { this.downloadFile(file) },
    // 初始化数据
    getMenuDatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('DEATHREASON', 'dieReasonList') // 获取死亡原因字典数据
      this.getMenu('REDUCTIONREASON', 'reductionTypeList') // 获取减员原因字典数据
      this.getMenu('DIEDEAL', 'dieDealList') // 获取死亡处理方式字典数据
      this.getMenu(this.childTypeCode, 'childTypeList') // 获取儿童类别字典数据
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
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 根据减员原因显示不同的label值
    changeLabelByReason (e) {
      switch (e) {
        case this.Enum.REDUCTIONREASON.SNSY:
        case this.Enum.REDUCTIONREASON.KSSY:
        case this.Enum.REDUCTIONREASON.SWSGATSY:
          this.label = '收养日期'
          break
        case this.Enum.REDUCTIONREASON.ZHSFM:
          this.label = '找回父母日期'
          break
        case this.Enum.REDUCTIONREASON.DLSH:
          this.label = '独立生活日期'
          break
        case this.Enum.REDUCTIONREASON.KJGS:
          this.label = '困境改善日期'
          break
        case this.Enum.REDUCTIONREASON.SW:
          this.label = '死亡日期'
          break
        case this.Enum.REDUCTIONREASON.QTCK:
          this.label = '其他出库日期'
          break
        case this.Enum.REDUCTIONREASON.ETCL:
          this.label = '儿童超龄日期'
          break
        default:
      }
    }
  },
  watch: {
    'obj.id': function (newval, oldval) {
      this.post('/childArchives/queryReductionDetailsByReductionId', { childReductionId: this.obj.id }).then((res) => {
        if (res.serviceSuccess) {
          let { data } = res.data
          this.changeLabelByReason(data.reductionType)
          this.type = data.reductionType
          this.$nextTick(() => {
            data['name'] = this.obj.name
            data['birthday'] = this.obj.birthday
            this.form.setFieldsValue(data)
            this.fileList = data.fileList || []
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.btnclass {
  position: fixed;
  bottom: 0px;
  background-color: white;
  width: 74%;
  height: 45px;
}
</style>
