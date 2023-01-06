<template>
  <div class="conts">
    <div class="contin">
      <div ref="oneout"
           class="mars">
        <Title id="fam_a"
               title="儿童信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <ChildInformation :name="name"
                            :childEnterId='childEnterId'></ChildInformation>
        </ta-form>
      </div>
      <div ref="twoout"
           class="mars marpad">
        <Title id="fam_a"
               title="助学经费记录"
               :show.sync="showtwo"></Title>
        <div>
          <ta-table ref="two"
                    class="tables table-min-width"
                    :showOverflowTooltip="true"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
          </ta-table>
          <ta-pagination  :defaultCurrent="page"  class='pagination'
                         showSizeChanger
                         showQuickJumper
                         :dataSource.sync="tableData"
                         
                         :params="userPageParams"
                         @change="pagechange"
                         :url="mixListOptions.mixGetDataListURL"
                         ref="gridPager" />
        </div>
      </div>
    </div>
    <div class="bom">
      <ta-button @click="backs"
                 class="preservation">返回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import listMinxin from '@component/common/js/mixins/listMixin'
import ChildInformation from '../../../basicChildren/components/childInformation'
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
    title: '工学情况',
    dataIndex: 'engineeringSituation',
    collectionType: 'WORKSTUDY',
    width: '18.5%'
  },
  {
    title: '助学经费金额',
    dataIndex: 'costOfLiving',
    width: '18.5%'
  },
  {
    title: '发放周期',
    dataIndex: 'issuingCycle',
    collectionType: 'RELEASECYCLE',
    width: '18.5%'
  },
  {
    title: '发放日期',
    dataIndex: 'issuingYears',
    width: '18.5%'
  },
  {
    title: '录入日期',
    dataIndex: 'createTime',
    width: '18.5%'
  }
]
export default {
  mixins: [listMinxin],
  components: {
    Title,
    ChildInformation
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      tableColumns,
      tableData: [],
      size: 10,
      page: 1,
      obj: {},
      name: '',
      childBaseId: '',
      childEnterId: '',
      mixPageRef: 'gridPager',
      adoptionlist: [],
      // 医疗类型
      medicalInsuranceTypeList: [],
      // 医疗周期
      medicalInsuranceCycleList: [],
      mixListOptions: {
        mixGetDataListURL:
          'orphanLivingExpensesAndChildren/queryByChildId', // 数据列表接口，API地址
        mixExportURL: '' // 导出接口，API地址
      }
    }
  },
  activated () {
    let data = JSON.parse(this.$route.params.obj)
    console.log(this.$route.params.obj)
    this.obj = data
    this.name = this.obj.name
    this.childBaseId = this.obj.childBaseId
    this.childEnterId = this.obj.childEnterId
    console.log(this.obj)
    this.adoptedFrom.setFieldsValue({
      idCard: this.obj.idCard,
      childNumber: this.obj.childNumber,
      childType: this.obj.childType,
      registerDate: moment(this.obj.registerDate)
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
    window.onresize = () => {
      this.setHeight('one', 'oneout', !this.showone)
      this.setHeight('two', 'twoout', !this.showtwo)
    }
    this.getchildtype()
    this.medicalInsuranceType()
    this.medicalInsuranceCycle()
  },
  methods: {
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (ref == 'two') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 160 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    addother (obj) {
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      data.childBaseId = this.childBaseId
      return data
    },
    other (obj) {
      console.log(obj)
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      // data.childBaseId = this.childBaseId
      data.payTime = moment(data.payTime, 'YYYY-MM-DD')
      // delete data.payTime
      return data
      // this.$set(this, 'addressmodel', arr)
    },
    // add () {},
    userPageParams () {
      return {
        childBaseId: this.childBaseId,
        supportType: '2'
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    backs () {
      this.$router.go(-1)
    },
    // 儿童类别
    async getchildtype () {
      let data = await this.getDictionaries(this.childTypeCode)
      this.adoptionlist = data
    },

    // 获取医疗保险类型
    async medicalInsuranceType () {
      let data = await this.getDictionaries('MEDICALINSURANCETYPE')
      this.medicalInsuranceTypeList = data
    },
    // // 获取医疗保险周期
    async medicalInsuranceCycle () {
      let data = await this.getDictionaries('MEDICALINSURANCECYCLE')
      console.log(data)
      this.medicalInsuranceCycleList = data
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    tableData: {
      handler () {
        this.setHeight('two', 'twoout')
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.contin {
  padding-top: 1px;
}
.mars {
  margin-top: 20px;
}
.tables {
  margin-top: 17px;
}
.marpad {
  padding-bottom: 20px;
}
.preservation {
  margin-left: 20px;
}
</style>
