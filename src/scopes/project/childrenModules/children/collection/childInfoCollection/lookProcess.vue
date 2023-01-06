<template>
  <div style="padding: 1%">
    <!-- <ta-anchor class="md"
               :offsetTop="100">
      <ta-anchor-link href="#anchorpoint_a"
                      state="replace"
                      title="增员申请信息" />
      <ta-anchor-link href="#anchorpoint_b"
                      v-if="countyAuditShow!='0'"
                      state="replace"
                      title="区县审核信息" />
      <ta-anchor-link href="#anchorpoint_c"
                      v-if="cityAuditShow!='0'"
                      state="replace"
                      title="市级审核信息" />
      <ta-anchor-link href="#anchorpoint_d"
                      v-if="proAuditShow!='0'"
                      state="replace"
                      title="省级审核信息" />
    </ta-anchor> -->

    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="增员申请信息"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               ref="one"
               :autoFormCreate="(addPeopleForm)=>{this.addPeopleForm = addPeopleForm}">
        <ta-row class="fromcom">
          <ta-col :span="12">
            <ta-form-item label="儿童姓名"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="name">
              <a @click="childDetail">{{name}}</a>
            </ta-form-item>
            <ta-form-item label="申请日期"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="applyDate">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label="当前状态"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="currentStatus">
              <span>{{currentStatus}}</span>
            </ta-form-item>
            <ta-form-item label="申请单位"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="applyOrg">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label="申请人"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="applicant">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>

    <div ref="twoout"
         v-if="countyAuditShow!='0'"
         class="mars">
      <Title id="anchorpoint_b"
             title="区县审核信息"
             :show.sync="showtwo"></Title>
      <ta-form layout="horizontal"
               ref="two"
               :autoFormCreate="(areaForm)=>{this.areaForm = areaForm}">
        <ta-row class="fromcom">
          <ta-col :span="24">
            <ta-form-item label="审核类型"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="auditType">
              <span>{{auditType}}</span>
            </ta-form-item>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label="审核单位"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="countyAuditUnit">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="审核状态"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="countyAuditStatus">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12"
                  v-if="countyAuditShow=='2'">
            <ta-form-item label="审核日期"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="countyAuditDate">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="审核人"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="countyAuditUser">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="审核意见"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:19}"
                          fieldDecoratorId="countyAuditOpinion">
              <ta-textarea :disabled="true"
                           :rows="4" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>

    <div ref="threeout"
         v-if="cityAuditShow!='0'"
         class="mars">
      <Title id="anchorpoint_c"
             title="市级审核信息"
             :show.sync="showthree"></Title>
      <ta-form layout="horizontal"
               ref="three"
               :autoFormCreate="(cityForm)=>{this.cityForm = cityForm}">
        <ta-row class="fromcom">
          <ta-col :span="24">
            <ta-form-item label="审核类型"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="auditType">
              <span>{{auditType}}</span>
            </ta-form-item>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label="审核单位"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="cityAuditUnit">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="审核状态"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="cityAuditStatus">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12"
                  v-if="cityAuditShow=='2'">
            <ta-form-item label="审核日期"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="cityAuditDate">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="审核人"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="cityAuditUser">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="审核意见"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:19}"
                          fieldDecoratorId="cityAuditOpinion">
              <ta-textarea :disabled="true"
                           :rows="4" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div ref="fourout"
         v-if="proAuditShow!='0'"
         class="mars">
      <Title id="anchorpoint_d"
             title="省级审核信息"
             :show.sync="showfour"></Title>
      <ta-form layout="horizontal"
               ref="four"
               :autoFormCreate="(provinceForm)=>{this.provinceForm = provinceForm}">
        <ta-row class="fromcom">
          <ta-col :span="24">
            <ta-form-item label="审核类型"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="auditType">
              <span>{{auditType}}</span>
            </ta-form-item>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label="审核单位"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="proAuditUnit">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="审核状态"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="proAuditStatus">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12"
                  v-if="proAuditShow=='2'">
            <ta-form-item label="审核日期"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="proAuditDate">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="审核人"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="proAuditUser">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="审核意见"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:19}"
                          fieldDecoratorId="proAuditOpinion">
              <ta-textarea :disabled="true"
                           :rows="4" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div class="bom">
      <ta-button @click="backs">返回</ta-button>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import EvidenceInformation from '../components/evidenceInformation'
import Printing from '@component/childrenModules/children/adoption/components/printing'
import MultiMedia from '../components/multiMedia'
export default {
  name: 'register',
  components: {
    Title,
    EvidenceInformation,
    MultiMedia,
    Printing
  },
  data () {
    return {
      current: ['1'],
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      showfour: true,

      activeKey: ['1', '2', '3', '4'],
      name: '',
      currentStatus: '',
      auditType: '',
      judegObj: {}, // 重复性信息页面的数据对象
      //   id: '', // 儿童基本信息的id（不在院用）
      //   childEnterId: '', // 基本信息入院id（在院用）

      proAuditShow: 2, // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      cityAuditShow: 2, // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      countyAuditShow: 2 // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）

    }
  },
  activated () {
    // 初始化数据
    this.initDatas()
  },
  created () { },
  mounted () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
      this.setHeight('three', 'threeout')
      this.setHeight('four', 'fourout')
    })
  },
  methods: {
    async initDatas () {
      const _self = this
      let record = null
      await _self.post(_self.$route.query.url, JSON.parse(_self.$route.query.params)).then(res => {
        if (res.serviceSuccess) {
          record = res.data.data
        }
      })
      _self.proAuditShow = record.proAuditShow
      _self.cityAuditShow = record.cityAuditShow
      _self.countyAuditShow = record.countyAuditShow

      _self.judegObj = JSON.parse(_self.$route.query.judegObj)

      _self.name = record.name
      _self.currentStatus = record.currentStatus
      _self.auditType = record.auditType
      _self.addPeopleForm.setFieldsValue(record)
      if (_self.areaForm != undefined) {
        _self.areaForm.setFieldsValue(record)
      }
      if (_self.cityForm != undefined) {
        _self.cityForm.setFieldsValue(record)
      }
      if (_self.provinceForm != undefined) {
        _self.provinceForm.setFieldsValue(record)
      }
    },
    backs () {
      this.$router.go(-1)
    },
    // 查看儿童详情
    childDetail () {
      const _self = this

      if (['0', '1', '2', '3', '4', '5'].indexOf(_self.judegObj.workflowStatus) != -1) { // 审批中、待审核、待提交、通过、驳回的查看（实时的）
        _self.$router.push({
          name: 'orphansHandicapped',
          query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: _self.judegObj.childEnterId }), operateFlag: 'look_now' }
        })
      }
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (this.$refs[ref].$el != undefined) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    },
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin-left: 32px;
}

.hei {
  height: 500px;
  background: pink;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
</style>
