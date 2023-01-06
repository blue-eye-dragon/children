<template>
  <div style="height:100%" ref="twoout">
    <div class="visitbtn">
      <ta-button type="primary" class="addbtn" @click="add">新增</ta-button>
      <!-- <ta-popconfirm title="确定删除吗?" @confirm="Batchdeletion" okText="确定" cancelText="取消">
        <ta-button type="primary" :disabled="isdisabled">批量删除</ta-button>
      </ta-popconfirm>-->
    </div>
    <div>
      <ta-table
        ref="two"
        class="tables table-min-width"
        :showOverflowTooltip="true"
        :columns="tableColumns"
        :dataSource="tableData"
        bordered
      >
        <span slot="num" slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <div slot="action" slot-scope="val,obj,index" class="btnlist">
          <span class="com_textsee" @click="see(val,obj)">查看</span>
          <template >

            <span class="com_textedit" @click="edit(val,obj)">编辑</span>

            <ta-popconfirm
              title="确定删除吗?"
              @confirm="deletes(val,obj,index)"
              @cancel="cancel"
              okText="确定"
              cancelText="取消"
            >
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </template>
        </div>
      </ta-table>
      <ta-pagination
        class='pagination'
        showSizeChanger
        showQuickJumper
        :dataSource.sync="tableData"
        
        :params="userPageParams"
        @change="pagechange"
        :url="mixListOptions.mixGetDataListURL"
        ref="gridPager"
      />
    </div>
    <ta-drawer
      title="回访记录"
      width="500"
      placement="right"
      :getContainer="setContainer"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px"
    >
      <ta-form class="drawerFrom" :autoFormCreate="(form)=>{this.form = form}" layout="horizontal">
        <ta-form-item
          label="生活状况"
          fieldDecoratorId="liveCondition"
          :labelCol="{ span: 6 }"
          :wrapperCol="{span:18}"
          :fieldDecoratorOptions="rules.liveCondition"
        >
          <ta-textarea
            placeholder="请输入生活状况"
            :disabled="idedit"
            :autosize="{ minRows: 2, maxRows: 6 }"
          />
        </ta-form-item>
        <ta-form-item
          label="成长状况"
          fieldDecoratorId="growUpCondition"
          :labelCol="{ span: 6 }"
          :wrapperCol="{span:18}"
          :fieldDecoratorOptions="rules.growUpCondition"
        >
          <ta-textarea
            :disabled="idedit"
            placeholder="请输入成长状况"
            :autosize="{ minRows: 2, maxRows: 6 }"
          />
        </ta-form-item>
        <ta-form-item
          label="健康状况"
          fieldDecoratorId="healthCondition"
          :labelCol="{ span: 6 }"
          :wrapperCol="{span:18}"
          :fieldDecoratorOptions="rules.healthCondition"
        >
          <ta-textarea
            placeholder="请输入健康状况"
            :disabled="idedit"
            :autosize="{ minRows: 2, maxRows: 6 }"
          />
        </ta-form-item>
        <ta-form-item
          label="回访人员"
          fieldDecoratorId="returnPerson"
          :labelCol="{ span: 6 }"
          :fieldDecoratorOptions="rules.returnPerson"
        >
          <ta-input :disabled="idedit" placeholder="请输入回访人员" />
        </ta-form-item>
        <ta-form-item
          label="回访日期"
          fieldDecoratorId="returnTime"
          :labelCol="{ span: 6 }"
          :wrapperCol="{span:18}"
          :require="{message:'请选择回访日期!'}"
        >
          <ta-date-picker
            :disabled="idedit"
            style="width: 100%;"
            :valid-now-time="'right'"
            placeholder="请选择回访日期"
          />
        </ta-form-item>
        <ta-form-item
          label="回访小结"
          fieldDecoratorId="returnSummary"
          :labelCol="{ span: 6 }"
          :wrapperCol="{span:18}"
          :fieldDecoratorOptions="rules.returnSummary"
        >
          <ta-textarea
            placeholder="请输入回访小结"
            :disabled="idedit"
            :autosize="{ minRows: 2, maxRows: 6 }"
          />
          <!-- <ta-date-picker :disabled="idedit" style="width: 100%;" placeholder="请选择询问时间" /> -->
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }" @click="onClose">取消</ta-button>
        <ta-button @click="submit" type="primary" v-if="!idedit">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMinxin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import { setTimeout } from 'timers'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '回访小结',
    dataIndex: 'returnSummary',
    width: '13%'
  },
  {
    title: '回访人员',
    dataIndex: 'returnPerson',
    width: '16%'
  },
  {
    title: '回访日期',
    dataIndex: 'returnTime',
    width: '16%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    width: '16%'
  },
  //   {
  //     title: '记录人员',
  //     dataIndex: 'recordPerson'
  //   },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMinxin],
  props: {
    childBaseId: {
      types: String
    },
    childEnterId: {
      types: String
    },
    iscanshow: {
      types: Boolean
    }
  },
  data () {
    return {
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      tableData: [],
      page: 1,
      size: 10,
      de: false,
      ed: false,
      ne: false,
      list: [],
      obj: {},
      //   childBaseId: '',
      adoptionlist: [],
      mixListOptions: {
        mixGetDataListURL: '/childFollowUp/queryReturnList', // 数据列表接口，API地址
        mixDeleteURL: '/childFollowUp/updateReturnDelStateById', // 删除接口，API地址
        mixAddURL: '/childFollowUp/saveReturn', // 新增接口
        mixEditURL: '/childFollowUp/updateReturn' // 编辑接口
        // mixExportURL: "" // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      rules: {
        returnPerson: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入回访人员' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        returnSummary: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入回访小结' },
            { max: 200, message: '最大输入200个字符' }
          ]
        },
        growUpCondition: {
          validateTrigger: 'blur',
          rules: [
            { required: false, message: '请输入成长状况' },
            { max: 200, message: '最大输入200个字符' }
          ]
        },
        healthCondition: {
          validateTrigger: 'blur',
          rules: [
            { required: false, message: '请输入健康状况' },
            { max: 200, message: '最大输入200个字符' }
          ]
        },
        liveCondition: {
          validateTrigger: 'blur',
          rules: [
            { required: false, message: '请输入生活状况' },
            { max: 200, message: '最大输入200个字符' }
          ]
        }
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.setHeight('two', 'twoout')
      }, 500)
    })
    window.onresize = () => {
      this.setHeight('two', 'twoout', !this.showtwo)
    }
  },
  methods: {
    loadData () {},
    setContainer () {
      return this.set_Container('tadrawer')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
      // this.$nextTick(() => {
      //   // this.showtwo = true
      //   this.setHeight('two', 'twoout')
      // })
    },
    addother (obj) {
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      data.childBaseId = this.childBaseId
      data.childEnterId = this.childEnterId
      return data
    },
    other (obj) {
      console.log(obj)
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      data.returnTime = moment(data.returnTime, 'YYYY-MM-DD')
      //   data.startTime = moment(
      //     data.startTime,
      //     'YYYY-MM-DD'
      //   )
      return data
      // this.$set(this, 'addressmodel', arr)
    },
    radiochange (val) {
      console.log(val)
      this.radioval = val.target.value
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (ref == 'two') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 180 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    userPageParams () {
      // return {
      //   childBaseId: this.childBaseId
      // }
      let params = {}
      params.childEnterId = this.childEnterId
      return params
    }
  },
  watch: {
    tableData: {
      handler () {
        this.setHeight('two', 'twoout')
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.tables {
  margin-top: 17px;
}
.addbtn {
  margin-right: 15px;
}
.btnlist span {
  cursor: pointer;
}
</style>
