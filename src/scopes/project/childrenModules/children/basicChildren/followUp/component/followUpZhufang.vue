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
        ref="three"
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
          <template>

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
        ref="gridPager2"
      />
    </div>
    <ta-drawer
      title="住房信息"
      width="500"
      placement="right"
      :getContainer="setContainer"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px"
    >
      <ta-form class="drawerFrom" :autoFormCreate="(form)=>{this.form = form}" layout="horizontal">
        <ta-form-item
          label="住房性质"
          fieldDecoratorId="housingNature"
          :labelCol="{ span: 6 }"
          :wrapperCol="{span:18}"
          :require="{message:'请选择住房性质!'}"
        >
          <ta-select placeholder="请选择住房性质" :disabled="idedit">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in housList"
              :key="index"
            >{{item.label}}</ta-select-option>>
          </ta-select>
          <!-- <ta-date-picker :disabled="idedit" style="width: 100%;" placeholder="请选择询问时间" /> -->
        </ta-form-item>
        <ta-form-item
          label="住房面积(㎡)"
          fieldDecoratorId="housingArea"
          :labelCol="{ span: 6 }"
          :require="{message:'请填写住房面积!'}"
        >
          <ta-input-number
            :min="0"
            :max="99999999"
            :precision="2"
            :disabled="idedit"
            style="width:100%"
            placeholder="请输入住房面积"
          />
        </ta-form-item>
        <AddressComponent
          :disabled="idedit"
          msg="工作地址"
          :addressmodel="addressmodel"
          @setaddress="setaddress"
        ></AddressComponent>
        <ta-form-item
          label
          fieldDecoratorId="addressDetails"
          :labelCol="{ span: 0 }"
          :wrapperCol="{ offset:6 }"
          :fieldDecoratorOptions="rules.addressDetails"
        >
          <ta-input placeholder="请输入详细地址" :disabled="idedit" />
        </ta-form-item>
        <ta-form-item
          label="起始日期"
          fieldDecoratorId="startTime"
          :labelCol="{ span: 6 }"
          :require="{message:'请选择起始日期!'}"
        >
          <ta-date-picker
            style="width: 100%;"
            :disabled="idedit"
            :valid-now-time="'right'"
            placeholder="请选择起始日期"
          />
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
import AddressComponent from '@component/common/components/addressComponent'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '住房性质',
    dataIndex: 'housingNature',
    collectionType: 'HOUSINGNATURE',
    width: '20.6%'
  },
  {
    title: '住房面积(㎡)',
    dataIndex: 'housingArea',
    width: '20.6%'
  },
  {
    title: '起始日期',
    dataIndex: 'startTime',
    width: '20.6%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    width: '20.6%'
  },
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
  components: {
    AddressComponent
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
      housList: [],
      mixListOptions: {
        mixGetDataListURL: '/childFollowUp/queryHousingList', // 数据列表接口，API地址
        mixDeleteURL: '/childFollowUp/updateHousingDelStateById', // 删除接口，API地址
        mixAddURL: '/childFollowUp/saveHousing', // 新增接口
        mixEditURL: '/childFollowUp/updateHousing' // 编辑接口
        // mixExportURL: "" // 导出接口，API地址
      },
      mixPageRef: 'gridPager2',
      addressmodel: [],
      rules: {
        addressDetails: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入详细地址' },
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
    this.housingList()
  },
  methods: {
    loadData () {},
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 住房性质
    async housingList () {
      let data = await this.getDictionaries('HOUSINGNATURE')
      this.housList = data
    },
    setaddress () {
      console.log('zou')
      console.log(this.addressmodel)
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
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
      data.endTime = moment(data.endTime, 'YYYY-MM-DD')
      data.startTime = moment(data.startTime, 'YYYY-MM-DD')
      let arr = []
      arr.push(data.province, data.city, data.county)
      this.addressmodel = [...arr]
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
          // if (ref == 'two') {
          //   node.style.height = this.$refs[ref].$el.offsetHeight + 180 + 'px'
          // } else {
          //   node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          // }
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
