<template>
  <!-- 业务配置 -->
  <div class="modelcont">
    <div>
      <ta-form layout="inline"
               :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

        <ta-form-item label="标题"
                      class="spilwid"
                      fieldDecoratorId="title"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}">
          <ta-input />
        </ta-form-item>

        <ta-form-item>
          <div class="visitbtnR">
            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>

          </div>
        </ta-form-item>
        <ta-button type="primary"
                   class="boms"
                   @click="comit">确定</ta-button>
      </ta-form>
      <ta-table :columns="mixColumns"
                :dataSource="mixDataList"
                :pagination="false"
                @change="handleTableChange"
                class="tables"
                bordered>
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <span slot="delState"
              slot-scope="a,b,c">
          <span :class="b.delState==1?'com_adopt':'com_reject'">{{status(a,b,c)}}</span>
        </span>
        <span slot="titleType"
              slot-scope="a,b,c">
          <span>{{titleType(a,b,c)}}</span>
        </span>
        <!-- <span slot="businessType" slot-scope="a,b,c">
            <span>{{whatType(a,b,c)}}</span>
          </span>-->
        <span slot="statisticalType"
              slot-scope="a,b,c">
          <span>{{b.statisticalType|dostatisticalType}}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span v-if="idList.indexOf(obj.id)==-1"
                @click="dataDack(val,obj,index,true)">选择</span>
          <span v-else
                @click="dataDack(val,obj,index,false)"
                style="color:#5f5f5f73;">取消选择</span>
        </div>
      </ta-table>
      <ta-pagination  :defaultCurrent="page"

                     class="pagination"
                     showSizeChanger
                     showQuickJumper
                     :dataSource.sync="mixDataList"

                     :params="userPageParams"
                     @change="pagechange"
                     :url="mixListOptions.mixGetDataListURL"
                     ref="gridPager" />
    </div>

  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  // {
  //   title: '配置类别',
  //   width: '5%',
  //   dataIndex: 'type',
  //   scopedSlots: { customRender: 'titleType' },
  //   overflowTooltip: true
  // },
  {
    title: '标题',
    width: '15%',
    dataIndex: 'title',
    overflowTooltip: true
  },
  {
    title: '地址',
    width: '25%',
    dataIndex: 'adress',
    overflowTooltip: true
  },
  {
    title: '状态',
    width: '4%',
    dataIndex: 'delState',
    scopedSlots: { customRender: 'delState' },
    overflowTooltip: true
  },

  {
    title: '操作',
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
var that = ''
export default {

  mixins: [listMixin],
  props: {
    types: {
      type: Number,
      required: false
    },
    contactTabelDate: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      backDataAll: [],
      data_: {
        functionalType: 1,
        busiType: 6666
      },
      chooseType: '',
      moveIdList: [],
      fileIds: [],
      fileList: [],
      number: '',
      namename: '',
      showOn: false,
      page: 1,
      size: 10,
      sexList: [],
      businessList: [],
      dutyList: [],
      administrativeOfficeList: [],
      age: '',
      visible: false,
      width: '500px',
      disabled: false,
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/WorkbenchApi/queryBusinessConfigInfoManage' // 数据列表接口，API地址

      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      userId: '',
      orgId: '',
      orgName: [],
      mixDataList: [],
      cultureList: [],
      startValue: null,
      nowDate: '',
      ksList: [],
      statisticalList: [],
      wholist: [],
      noEdit: false,
      idList: [],
      ty: ''
    }
  },
  created () {
    that = this
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    console.log('contactTabelDate--->', this.contactTabelDate)

    // if (this.contactTabelDate.length > 0) {
    //   this.contactTabelDate.map((e) => {
    //     this.idList.push(e.configInfoId)// 后台未确定参数infoId 2020年2月14日23点26分
    //   })
    // }
    if (this.contactTabelDate.length > 0) {
      this.contactTabelDate.map((e) => {
        this.idList.push(e.configInfoId)// 后台未确定参数infoId 2020年2月14日23点26分
      })
    }

    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getDic()
    this.handleSubmit()
  },

  methods: {

    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.type = this.types
      formData.idList = this.idList
      formData.delState = 1// 后台报错.2020年2月14日23点12分
      return formData
    },
    dataDack (a, b, c, d) {
      this.ty = b.type
      if (d) {
        this.idList.push(b.id)
        this.backDataAll.push(b)
        // alert(b.title)
      } else {
        this.idList.splice(this.idList.indexOf(b.id), 1)
        this.backDataAll.splice(this.backDataAll.indexOf(b), 1)
      }
    },
    comit () {
      // alert(this.backDataAll.length)
      // console.log(' this.backDataAll-->', this.backDataAll)
      this.$emit('propsChange', this.backDataAll)
    },

    status (a, b, c) {
      if (a == 1) {
        return '正常'
      } else {
        return '停用'
      }
    },
    // titleType (a, b, c) {
    //   if (a == 1) {
    //     return '业务类型'
    //   } else {
    //     return '统计类型'
    //   }
    // },

    handleSubmit (e) {
      if (e) {
        this.page = 1
        this.size = 10
      }

      // 分页条提供方法，可查询第一页，一般用于查询按钮中调用 data为返回数据 这个方法已经配置page==1 返回数据自动绑定到table 有其他操作在里面添加。
      const ref = this.mixPageRef
      this.$nextTick(() => {
        this.$refs[ref].loadData(data => {
          // console.log(' this.mixDataList-----==--->', this.mixDataList)
          // this.mixDataList.forEach(e => {
          //   if (this.idList.indexOf(e.id) != -1) {
          //     this.mixDataList.splice(this.mixDataList.indexOf(e), 1)
          //   }
          // })
          // return this.mixDataList
          // this.mixDataList = this.mixDataList
        }, err => { })
      })
    },
    // 字典
    async getDic () {
      this.businessList = await this.getDictionaries('WORKBENCH_BUSINESS_TYPE')
      this.statisticalList = await this.getDictionaries(
        'WORKBENCH_STATISTICAL_TYPE'
      )
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }

}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
.newt {
  background-color: #7cc16b;
  color: #fff;
}
.visitbtnR {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.modelcont {
  margin-bottom: 40px;
}
.boms {
  right: 5%;
  position: absolute;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #eff1f4;
}
</style>
