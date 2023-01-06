<template>
  <div class="searchdata">
    <!--信息上报审核  -->

    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div class="item_title">
        <div class="lines"></div>
        <p class="item_text"
           style="width:120px">申请信息</p>
        <div class="horizontalline"></div>
      </div>
      <div class="margins">
        <ta-form layout="horizontal"
                 :autoFormCreate="(topForm)=>{this.topForm = topForm}">
          <ta-row class="fromcom">

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
                <ta-form-item label="数据来源"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="currentStatus">
                  <span class="lineHeight"
                        v-if="isAnotherPlaceApply=='0'">本地申请</span>
                  <span class="lineHeight"
                        v-if="isAnotherPlaceApply=='1'">异地申请</span>
                  <span class="lineHeight"
                        v-if="isAnotherPlaceApply=='2'">公众服务平台申请</span>
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item :label="isAnotherPlaceApply=='0'?'上报日期':'申请日期'"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="reportDate">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6"
                      v-if="isAnotherPlaceApply=='0'">
                <ta-form-item label="上报单位"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="reportUnit">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6"
                      v-if="isAnotherPlaceApply=='2'">
                <ta-form-item label="申请人"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="applyPerson">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6"
                      v-if="isAnotherPlaceApply=='2'">
                <ta-form-item label="申请人手机号"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="applyPhone">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6"
                      v-if="isAnotherPlaceApply=='1'">
                <ta-form-item label="申请单位"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="applyUnit">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
            </ta-col>

          </ta-row>
        </ta-form>
      </div>
      <div class="item_title">
        <div class="lines"></div>
        <p class="item_text"
           style="width:120px">审核信息</p>
        <div class="horizontalline"></div>
      </div>
      <ta-table :columns="tableColumns"
                :dataSource="mixDataList"
                class="table-min-width"
                :showOverflowTooltip="true"
                bordered>
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>

        <!-- <div slot="auditStatus"
             slot-scope="a,b,c">
          <span v-if="b.auditStatus==1 "
                class="com_tobesubmitted">待审核</span>
          <span v-if="b.auditStatus==2"
                class="com_tobeaudited">待审核</span>
          <span v-if="b.auditStatus==3"
                class="com_adopt">通过</span>
          <span v-if="b.auditStatus==4"
                class="com_reject">驳回</span>
        </div> -->

      </ta-table>
      <!-- <ta-pagination class='pagination'
                     showSizeChanger
                     showQuickJumper
                     :dataSource.sync="mixDataList"
                     :params="userPageParams"
                     @change="pagechange"
                     :url="mixListOptions.mixGetDataListURL"
                     :ref="mixPageRef" /> -->
      <div slot="footer">

        <ta-button class="preservation"
                   @click="()=>{this.$router.go(-1)}">返回</ta-button>

      </div>
    </ta-border-layout>
  </div>

</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { format } from 'path'
import moment from 'moment'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '审核日期',
    dataIndex: 'auditDate',
    width: '25%'
  },
  {
    title: '审核人',
    dataIndex: 'auditor',
    width: '25%'
  },
  {
    title: '审核状态',
    width: '25%',
    dataIndex: 'auditStatus'
    // scopedSlots: { customRender: 'auditStatus' }

    // collectionType: 'DEGREEEDUCATION'

  },
  {
    title: '备注',
    width: '25%',
    dataIndex: 'remark'

  }
]

export default {
  moment,
  // mixins: [listMixin],
  data () {
    return {
      tableColumns,

      mixDataList: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/AddUnattendedChildApi/auditLog', // 数据列表接口，API地址
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: false // 是否需要筛选
      },
      mixPageRef: 'gridPager',
      isAnotherPlaceApply: '',
      name: '',
      educationalBackgroundList: []
    }
  },
  watch: {
    mixDataList (i, o) {
      if (i && i.length > 0) {
        this.topForm.setFieldsValue(i[0])
      }
    }
  },
  activated () {
    this.getData()
  },
  mounted () {
    this.geteducationalBackgroundList()
  },
  methods: {
    // 学历
    async geteducationalBackgroundList () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.educationalBackgroundList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    async getData () {
      this.obj = JSON.parse(this.$route.query.obj)
      this.isAnotherPlaceApply = this.obj.isAnotherPlaceApply
      this.name = this.obj.name
      const paramss = {
        id: this.obj.addUnattendedId
      }
      let url = '/AddUnattendedChildApi/auditLog'
      if (this.obj.isAnotherPlaceApply != '0') {
        url = '/AddUnattendedChildApi/auditLogAnother'
      }
      const res = await this.post(url, paramss)
      if (this.isAnotherPlaceApply == '0') {
        this.mixDataList = res.data.data
      } else {
        this.mixDataList = res.data.data.unattendedAuditVoList
      }

      this.$nextTick(() => {
        if (this.isAnotherPlaceApply == '0') {
          this.topForm.setFieldsValue({
            reportUnit: window.parent.indexTool.getUserInfo().orgName
          })
        }
        this.topForm.setFieldsValue({
          reportDate: this.obj.reportTime
        })
        this.topForm.setFieldsValue(res.data.data)
      })
    },
    userPageParams () {
      const paramss = {
        id: this.$route.query.id
      }
      return paramss
    },
    // 查看儿童详情
    childDetail () {
      const _self = this
      _self.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 6,
          childtypedisabled: 1,
          id: this.obj.addUnattendedId,
          isdisabled: 1
        }
      })
    },

    onSelectTime (date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>
<style scoped lang="less">
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.item_text {
  width: 60px;
  font-size: 14px;
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
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
.searchdata {
  background: white;
  height: 100%;
}
.spilwid {
  width: 400px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
.preservation {
  float: right;
  top: 8px;
}
.margins {
  margin: 30px;
  margin-left: 40px;
}
</style>
