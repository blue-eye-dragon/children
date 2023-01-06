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
              <ta-col :span="4">
                <ta-form-item label="儿童姓名"
                              :labelCol="{span:11}"
                              :wrapperCol="{span:13}"
                              fieldDecoratorId="name">
                  <a @click="childDetail"
                     class="lineHeight">{{name}}</a>
                </ta-form-item>
              </ta-col>
              <ta-col :span="2">
                <ta-button v-if="isAudit"
                           @click="editInfo">修改儿童信息</ta-button>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="数据来源"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}"
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
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="applyPhone">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="12"
                      v-if="isAnotherPlaceApply=='1'">
                <ta-form-item label="受理地"
                              :labelCol="{span:3}"
                              :wrapperCol="{span:21}"
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
      <div class="margins"
           id="content"
           style="position: relative"
           v-if="isAudit">
        <ta-form layout="horizontal"
                 :autoFormCreate="(form)=>{this.form = form}">
          <ta-row>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="审核结果"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="status"
                              :require="{message:'请选择审核结果'}">
                  <ta-select placeholder="请选择审核结果"
                             :getPopupContainer="setPopupContainer"
                             v-model="statusValue"
                             collection-type="ANOTHERPLACEPROCESSSTATUS"
                             @select="onSelectStatus" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="审核意见"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            class="alonerow"
                            fieldDecoratorId="remark"
                            :fieldDecoratorOptions="statusValue!='1'?verificationRules('审核意见', 200,false):verificationRulesNotMustFill('审核意见', 200,false)">
                <ta-textarea placeholder="请输入审核意见"
                             :rows="4" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
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
      </ta-table>
      <div slot="footer">
        <ta-button class="preservation btnleft"
                   type="primary"
                   @click="submit"
                   v-if="isAudit">提交</ta-button>
        <ta-button class="preservation"
                   @click="()=>{this.$router.go(-1)}">返回</ta-button>

      </div>
    </ta-border-layout>
    <ta-modal v-model="visible"
              width="800"
              title="提示">
      <template slot="footer">
        <ta-button key="back"
                   @click="visible=false">取消</ta-button>
        <ta-button key="submit"
                   type="primary"
                   @click="handleOk">
          确定
        </ta-button>
      </template>
      <div class="modalC">
        <p><span>{{name}}</span>申请认定事实无人抚养儿童,</p>
        <p>申请人<span>{{applyPersonName}}</span>，受理地<span>{{applyUnit}}</span>，</p>
        <p>审核单位<span>{{userInfo.orgName}}</span>，</p>
        <p>审核结果<span>{{CollectionLabel('ANOTHERPLACEPROCESSSTATUS',statusValue)}}</span>。</p>
      </div>
    </ta-modal>
  </div>
</template>
<script>
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
    title: '审核单位',
    dataIndex: 'auditUnit',
    width: '25%'
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
    title: '审核结果',
    width: '25%',
    dataIndex: 'auditStatus'
  },
  {
    title: '审核意见',
    width: '25%',
    dataIndex: 'remark'
  }
]
export default {
  moment,
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
      isAudit: false, // 是否是审核
      isAnotherPlaceApply: '',
      name: '', // 儿童姓名
      applyPersonName: '', // 申请人
      applyUnit: '', // 受理地
      educationalBackgroundList: [],
      visible: false, // 控制弹窗显隐
      statusValue: '', // 审核结果选择的值
      userInfo: window.parent.indexTool.getUserInfo() // 当前登录人的用户信息
    }
  },
  watch: {
    mixDataList (i, o) {
      if (i && i.length > 0) {
        this.topForm.setFieldsValue(i[0])
      }
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('7%', '93%', 'alonerow') // 单独一行字段宽度控制
  },
  activated () {
    this.getData()
  },
  mounted () {
    this.geteducationalBackgroundList()
  },
  methods: {
    // 编辑儿童信息
    editInfo () {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 1,
          childtypedisabled: 1,
          id: this.obj.addUnattendedId,
          type: 'edit',
          isOtherEdit: '12',
          isOtherRedit: true,
          isOffSite: 1, // 从异地页面过去
          clickSourceType: 'continue', // 点击的按钮类别：continue继续办理
          isWshEdit: true // 是从未审核的编辑跳转过去的
        }
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-26 11:51:31
     * @information: 审核结果选中时
     */
    onSelectStatus (value) {
      if (value == '1') { // 通过
        this.form.resetFields()
      }
    },
    // 提交
    submit () {
      this.form.validateFields(err => {
        if (!err) {
          this.visible = true
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 弹窗确定
    handleOk () {
      const formData = this.form.getFieldsValue()
      formData.addUnattendedId = this.obj.addUnattendedId
      formData.isAnotherPlaceApply = '1' // 暂时写死  后续从obj中取
      this.post('AddUnattendedChildApi/anotherPlacePrecess', formData).then(res => {
        if (res.serviceSuccess) {
          this.$message.success('数据审核成功')
          this.visible = false
          this.$router.go(-1)
        }
      })
    },
    // 设置下拉框弹出框容器
    setPopupContainer (trigger) {
      // 设置他的弹出框容器为content,如果不设置默认为body
      // 设置弹出框容器主要是为了解决页面滚动时可能会出现的弹出框脱离输入框的情况
      return document.getElementById('content')
    },
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
      this.isAudit = this.obj.isAudit || false
      if (this.isAudit) {
        this.$nextTick(() => {
          this.form.resetFields()
        })
      }
      this.isAnotherPlaceApply = this.obj.isAnotherPlaceApply
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
        // 赋值弹窗中内容
        let { name, applyPersonName, applyUnit } = res.data.data
        Object.assign(this, { name, applyPersonName, applyUnit })
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
.modalC {
  font-size: 16px;
  line-height: 2;
  span {
    font-weight: bold;
    margin: 0 5px;
  }
}
</style>
