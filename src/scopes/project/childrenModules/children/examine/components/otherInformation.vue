<template>
  <div class="conts">
    <div class="contin">

      <div ref="oneout"
           class="mars">
        <Title id="anchorpoint_a"
               title="增员申请信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 :autoFormCreate="(form)=>{this.form = form}">
          <ta-row ref="one"
                  class="fromcom">
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="儿童姓名"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="name">
                  <a @click="childDetail"
                     class="lineHeight">{{name}}</a>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="申请日期"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="applyDate">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
      <div class="paddingClass"
           v-if="nowkey == '1'">
        <div ref="twoout"
             class="mars">
          <Title :title="'审核信息'"
                 :show.sync="showtwo"></Title>
          <div ref="two">
            <div style="overflow: hidden;"
                 v-if="!reasonDisabled">
              <ta-form layout="horizontal"
                       :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
                <ta-col :span="24">
                  <ta-form-item label="审核意见"
                                :labelCol="{span:2}"
                                :wrapperCol="{span:22}"
                                fieldDecoratorId="reason"
                                :fieldDecoratorOptions="verificationRules('审核意见', 200,false)">
                    <ta-textarea :rows="4" />
                  </ta-form-item>
                </ta-col>
              </ta-form>
            </div>
            <div>
              <ta-table :columns="childType=='2'?tableColumns:tableColumns2"
                        :dataSource="tableData"
                        bordered>
                <span slot="num"
                      slot-scope="a, b, c">
                  <span>{{ c + 1 }}</span>
                </span>
                <div slot="auditStatusLabel"
                     slot-scope="val">
                  <span :class="statusClass(val)">{{val}}</span>
                </div>
              </ta-table>
            </div>
          </div>
        </div>
      </div>
      <div ref="threeout"
           class="mars"
           v-if="nowkey == '2'">
        <Title id="anchorpoint_a"
               title="退回信息"
               :show.sync="showthree"></Title>
        <ta-table :columns="tableColumns1"
                  :dataSource="tableData1"
                  ref="three"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ c + 1 }}</span>
          </span>
          <div slot="backOrRejectReason"
               slot-scope="val">
            <span>{{val}}</span>
          </div>
          <div slot="backTime"
               slot-scope="val">
            <span>{{val?val.substring(0,10):'--'}}</span>
          </div>
          <div slot="fileList"
               slot-scope="val">
            <a v-for="(item,index) in val"
               :key="index"
               :href="basePath + '/file/getFileFromDfs/' + item.response.data.data.fileid">{{item.name+'，'}}</a>
          </div>
        </ta-table>
      </div>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import moment from 'moment'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  // {
  //   title: '审核类型',
  //   dataIndex: 'auditType',
  //   align: 'center',
  //   collectionType: 'PLANTOMORROWAUDITTYPE',
  //   width: '13%'
  // },
 /* {
    title: '审核级别',
    align: 'center',
    dataIndex: 'pointTitle',
    width: '14%'
  },*/
  {
    title: '审核单位',
    align: 'center',
    dataIndex: 'auditUnit',
    width: '14%',
    collectionType: 'DISEASETYPE'
  },
  {
    title: '审核人',
    align: 'center',
    dataIndex: 'auditUser',
    width: '14%'
  },
  {
    title: '审核日期',
    align: 'center',
    dataIndex: 'auditDate',
    width: '17%'
  },
  {
    title: '审核结果',
    align: 'center',
    dataIndex: 'auditStatusLabel',
    width: '15%',
    scopedSlots: { customRender: 'auditStatusLabel' }
  },
  {
    title: '审核意见',
    align: 'center',
    dataIndex: 'reason',
    width: '25%'
  }
]
const tableColumns2 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '审核单位',
    align: 'center',
    dataIndex: 'auditUnit',
    width: '14%',
    collectionType: 'DISEASETYPE'
  },
  {
    title: '审核人',
    align: 'center',
    dataIndex: 'auditor',
    width: '14%'
  },
  {
    title: '审核日期',
    align: 'center',
    dataIndex: 'auditDate',
    width: '17%'
  },
  {
    title: '审核结果',
    align: 'center',
    dataIndex: 'auditStatus',
    width: '15%',
    scopedSlots: { customRender: 'auditStatusLabel' }
  },
  {
    title: '审核意见',
    align: 'center',
    dataIndex: 'remark',
    width: '25%'
  }
]
const tableColumns1 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '退回原因',
    align: 'center',
    dataIndex: 'backOrRejectReason',
    width: '30%'
  },
  {
    title: '退回日期',
    align: 'center',
    dataIndex: 'backTime',
    width: '30%',
    scopedSlots: { customRender: 'backTime' }
  },
  {
    title: '上传附件',
    align: 'center',
    dataIndex: 'fileList',
    width: '70%',
    scopedSlots: { customRender: 'fileList' }
  }
]
export default {
  name: 'otherInformation',
  components: {
    Title
  },
  data () {
    return {
      tableColumns,
      tableColumns1,
      tableColumns2,
      basePath: window.faceConfig.basePath,
      tableData: [],
      tableData1: [],
      showone: true,
      showtwo: true,
      showthree: true,
      disabled: true,
      reasonDisabled: true,
      name: '',
      obj: {},
      nowkey: '',
      childType: ''
    }
  },
  mounted () {
  },
  activated () {
    this.getShowDatas()
  },
  methods: {
    async getShowDatas () {
      this.obj = JSON.parse(this.$route.query.obj)
      this.nowkey = this.$route.query.nowkey
      this.childType = this.$route.query.childType
      let url = '/addChildApi/detailWorkflowForAnotherApply'
      let params = {
        childEnterId: this.obj.id,
        workflowId: this.obj.workflowId
      }
      if (this.childType == '1' && this.nowkey == '1') {
        url = '/AddUnattendedChildApi/auditLogAnother'
        params = {
          id: this.obj.id
        }
      }
      if (this.childType == '1' && this.nowkey == '2') {
        url = '/AddUnattendedChildApi/backToRecord'
        params = {
          anotherPlaceId: this.obj.anotherPlaceId
        }
      }
      const res = await this.post(url, params)
      this.$nextTick(() => {
        this.name = this.obj.name
        if (this.nowkey == '1' && this.childType == '2') {
          this.tableData = res.data.data.approvalPointList instanceof Array ? res.data.data.approvalPointList : []
        }
        if (this.nowkey == '2' && this.childType == '2') {
          this.tableData1 = res.data.data.rejectVoLists instanceof Array ? res.data.data.rejectVoLists : []
        }
        if (this.nowkey == '1' && this.childType == '1') {
          this.tableData = res.data.data.unattendedAuditVoList instanceof Array ? res.data.data.unattendedAuditVoList : []
        }
        if (this.nowkey == '2' && this.childType == '1') {
          this.tableData1 = res.data.data instanceof Array ? res.data.data : []
        }
        this.form.setFieldsValue({ applyDate: this.obj.registerDate || this.obj.reportTime })
        this.setHeight('two', 'twoout')
        this.setHeight('one', 'oneout')
        this.setHeight('three', 'threeout')
      })
    },
    // 查看儿童详情
    childDetail () {
      const _self = this
      if (this.childType == '2') {
        _self.$router.push({
          name: 'orphansHandicapped',
          query: {
            url: '/childInfoApi/getOrphansDisabledChildrenById',
            params: JSON.stringify({ id: _self.obj.id }),
            operateFlag: 'look_now'
          }
        })
      } else {
        this.$router.push({
          name: 'noonesupportfact',
          query: {
            status: 6,
            childtypedisabled: 1,
            id: this.obj.addUnattendedId || this.obj.id,
            isdisabled: 1
          }
        })
      }
    },

    // 布局调整
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      if (node) {
        this.$nextTick(() => {
          if (!istrue) {
            if (ref == 'two') {
              node.style.height = this.$refs[ref].offsetHeight + 90 + 'px'
            } else {
              node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
            }
          } else {
            node.style.height = '50px'
          }
          node.style.transition = 'all 1s'
        })
      }
    },
    statusClass (e) {
      let classValue = ''
      switch (e) {
        case '撤回':// 撤回
          classValue = 'com_tobesubmitted'
          break
        case '待审核':// 待审核
          classValue = 'com_tobeaudited'
          break
        case '通过':// 通过
          classValue = 'com_adopt'
          break
        case '驳回':// 驳回
          classValue = 'com_reject'
          break
      }
      return classValue
    },

    backs () {
      this.$router.go(-1)
    }
  },
  watch: {
    showone (val, oldval) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val, oldval) {
      this.setHeight('two', 'twoout', !val)
    },
    showthree (val, oldval) {
      this.setHeight('three', 'threeout', !val)
    }
  }
}
</script>
<style lang="less">
.paddingClass {
  padding: 0 10px 10px 10px;
}
</style>
