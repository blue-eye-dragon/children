<template>
  <div class="conts tableout"
       id="tmd">
    <div class="contin">
      <div class="left">
        <div class="lefttop">
          <img src="./part/tongji.png"
               alt />
          统计类别
        </div>
        <ul class="lefttype"
            v-for="(item,index) in tjlist"
            :key="index">
          <li :class="index==nowkey?'actives':''"
              @click="callback(index)">
            <ta-icon type="right"
                     class="icons" />
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="right">
        <ta-form layout="inline"
                 style="margin-bottom:20px"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="登记日期"
                        class="spilwiddate"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="date">
            <ta-range-picker />
          </ta-form-item>
          <AreaQuery v-if="ishide"
                     class="spilwid"
                     :ishide="false"
                     msg="区域"
                     :addressmodel="addressmodel"
                     @adsvalchange="adsvalchange"
                     @setaddress="setaddress"></AreaQuery>
          <ta-form-item label="业务类别"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        class="spilwid"
                        fieldDecoratorId="busCategory"
                        :fieldDecoratorOptions="{initialValue: ''}">
            <ta-select placeholder="请选择业务类别">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option :value="item.value"
                                v-for="(item,index) in adoptionbiztypelist"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item>
            <!-- <ta-button type="primary" @click="searchs">查询</ta-button> -->
            <div class="searchButton">
              <ta-button type="primary"
                         class="search"
                         icon="search"
                         @click="searchs">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
            </div>
          </ta-form-item>
        </ta-form>
        <ta-tabs :activeKey="childkey"
                 @change="callchildback">
          <ta-tab-pane v-for="(item,index) in childlist"
                       :tab="item.name"
                       :key="index+''"></ta-tab-pane>
        </ta-tabs>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table class="tables table-min-width"
                    :scroll="{ x: 1100,y: 500 }"
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :dataSource="tableData"
                    bordered></ta-table>
        </ta-spin>
      </div>
    </div>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
// import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
export default {
  //   mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      spinning: null,
      nowkey: '0',
      childkey: '0',
      tableColumns: [],
      tableData: [],
      ishide: true,
      addressmodel: [],
      adoptionbiztypelist: [],
      nowcode: '',
      tjlist: [
        { name: '被收养人情况统计' },
        { name: '收养人情况统计' },
        { name: '送养人情况统计' }
      ],
      childlist: [],
      contData: [
        [
          {
            title: '被收养人情况统计',
            name: '按被收养人身份情况',
            url: '/adoptionstatistics/statisticsAdopteeByCategory',
            tableColumns: [
              {
                title: '区域',
                dataIndex: 'areaName',
                align: 'center',
                fixed: 'left',
                width: 200
              },
              {
                title: '总数',
                fixed: 'left',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'maleTotal'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'femaleTotal'
                  }
                ]
              },
              {
                title: '福利机构抚养的孤儿',
                children: [
                  {
                    title: '男',
                    width: 120,
                    align: 'center',
                    dataIndex: 'orphanInstitutionTotalman'
                  },
                  {
                    title: '女',
                    width: 120,
                    align: 'center',
                    dataIndex: 'orphanInstitutionTotalwoman'
                  }
                ]
              },
              {
                title: '福利机构抚养的弃婴',
                children: [
                  {
                    title: '男',
                    width: 120,
                    align: 'center',
                    dataIndex: 'abandonInstitutionTotalman'
                  },
                  {
                    title: '女',
                    width: 120,
                    align: 'center',
                    dataIndex: 'abandonInstitutionTotalwoman'
                  }
                ]
              },
              {
                title: '继子女',
                children: [
                  {
                    title: '男',
                    width: 120,
                    align: 'center',
                    dataIndex: 'stepchildrenTotalman'
                  },
                  {
                    title: '女',
                    width: 120,
                    align: 'center',
                    dataIndex: 'stepchildrenTotalwoman'
                  }
                ]
              },
              {
                title: '三代以内同辈旁系血亲的子女',
                children: [
                  {
                    title: '男',
                    width: 140,
                    align: 'center',
                    dataIndex: 'certificateTotalman'
                  },
                  {
                    title: '女',
                    width: 140,
                    align: 'center',
                    dataIndex: 'certificateTotalwoman'
                  }
                ]
              },
              {
                title: '非福利机构抚养的孤儿',
                children: [
                  {
                    title: '男',
                    width: 120,
                    align: 'center',
                    dataIndex: 'orphanTotalman'
                  },
                  {
                    title: '女',
                    width: 120,
                    align: 'center',
                    dataIndex: 'orphanTotalwoman'
                  }
                ]
              },
              {
                title: '非福利机构抚养的弃婴',
                children: [
                  {
                    title: '男',
                    width: 120,
                    align: 'center',
                    dataIndex: 'abandonTotalman'
                  },
                  {
                    title: '女',
                    width: 120,
                    align: 'center',
                    dataIndex: 'abandonTotalwoman'
                  }
                ]
              },
              {
                title: '生父母有特殊困难无力抚养',
                children: [
                  {
                    title: '男',
                    width: 120,
                    align: 'center',
                    dataIndex: 'consanguinityTotalman'
                  },
                  {
                    title: '女',
                    width: 120,
                    align: 'center',
                    dataIndex: 'consanguinityTotalwoman'
                  }
                ]
              },
              {
                title: '生父母不具备完全民事行为能力',
                children: [
                  {
                    title: '男',
                    width: 140,
                    align: 'center',
                    dataIndex: 'parentaDisabilityTotalman'
                  },
                  {
                    title: '女',
                    width: 140,
                    align: 'center',
                    dataIndex: 'parentaDisabilityTotalwoman'
                  }
                ]
              }
            ]
          },
          {
            title: '被收养人情况统计',
            name: '按被收养人的健康情况',
            url: '/adoptionstatistics/statisticsAdopteeByHealth',
            tableColumns: [
              {
                title: '区域',
                dataIndex: 'areaName',
                align: 'center',
                fixed: 'left',
                width: 200
              },
              {
                title: '总数',
                fixed: 'left',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'maleTotal'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'femaleTotal'
                  }
                ]
              },
              {
                title: '健康或者良好',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'excellentTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'excellentTotalwoman'
                  }
                ]
              },
              {
                title: '一般或较弱',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'averageTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'averageTotalwoman'
                  }
                ]
              },
              {
                title: '重病',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'dangerousTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'dangerousTotalwoman'
                  }
                ]
              },
              {
                title: '有慢性病',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'chronicTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'chronicTotalwoman'
                  }
                ]
              },
              {
                title: '残疾',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'disabilityTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'disabilityTotalwoman'
                  }
                ]
              },
              {
                title: '未说明情况',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'otherTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'otherTotalwoman'
                  }
                ]
              },
              {
                title: '其他',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'otherThingTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'otherThingTotalwoman'
                  }
                ]
              }
            ]
          },
          {
            title: '被收养人情况统计',
            name: '按被收养人的年龄情况',
            url: '/adoptionstatistics/statisticsAdopteeByAge',
            tableColumns: [
              {
                title: '区域',
                dataIndex: 'areaName',
                align: 'center',
                fixed: 'left',
                width: 200
              },
              {
                title: '总数',
                fixed: 'left',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'maleTotal'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'femaleTotal'
                  }
                ]
              },
              {
                title: '0~1周岁',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'oneOldAgeTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'oneOldAgeTotalwoman'
                  }
                ]
              },
              {
                title: '1~3周岁',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'threeOldAgeTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'threeOldAgeTotalwoman'
                  }
                ]
              },
              {
                title: '3~6周岁',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'sixOldAgeTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'sixOldAgeTotalwoman'
                  }
                ]
              },
              {
                title: '6~10周岁',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'tenOldAgeTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'tenOldAgeTotalwoman'
                  }
                ]
              },
              {
                title: '10~14周岁',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'fourteenOldAgeTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'fourteenOldAgeTotalwoman'
                  }
                ]
              },
              {
                title: '14~18周岁以上',
                children: [
                  {
                    title: '男',
                    width: 100,
                    align: 'center',
                    dataIndex: 'eighteenOldAgeTotalman'
                  },
                  {
                    title: '女',
                    width: 100,
                    align: 'center',
                    dataIndex: 'eighteenOldAgeTotalwoman'
                  }
                ]
              }
            ]
          }
        ],
        [
          {
            title: '收养人情况统计',
            name: '按收养人的子女情况',
            url: '/adoptionstatistics/statisticsAdoptorByChild',
            tableColumns: [
              {
                title: '区域',
                dataIndex: 'areaName',
                align: 'center',
                width: 100
              },
              {
                title: '总数',
                dataIndex: 'total',
                align: 'center',
                width: 100
              },
              {
                title: '无子女',
                dataIndex: 'noneTotal',
                align: 'center',
                width: 100
              },
              {
                title: '1个子女',
                dataIndex: 'oneTotal',
                align: 'center',
                width: 100
              },
              {
                title: '2个子女',
                dataIndex: 'twoTotal',
                align: 'center',
                width: 100
              },
              {
                title: '3个子女',
                dataIndex: 'threeTotal',
                align: 'center',
                width: 100
              },
              {
                title: '3个以上子女',
                dataIndex: 'overTotal',
                align: 'center',
                width: 100
              }
            ]
          },
          {
            title: '收养人情况统计',
            name: '按收养人的家庭收入情况',
            url: '/adoptionstatistics/statisticsAdoptorByIncome',
            tableColumns: [
              {
                title: '区域',
                dataIndex: 'areaName',
                align: 'center',
                width: 100
              },
              {
                title: '总数',
                dataIndex: 'total',
                align: 'center',
                width: 100
              },
              {
                title: '5万以下',
                dataIndex: 'fiftyThousandTotal',
                align: 'center',
                width: 100
              },
              {
                title: '5万~10万',
                dataIndex: 'hundredThousandTotal',
                align: 'center',
                width: 100
              },
              {
                title: '10万~20万',
                dataIndex: 'twohundredThousandTotal',
                align: 'center',
                width: 100
              },
              {
                title: '20万~50万',
                dataIndex: 'fivehundredThousandTotal',
                align: 'center',
                width: 100
              },
              {
                title: '50万以上',
                dataIndex: 'overTotal',
                align: 'center',
                width: 100
              }
            ]
          },
          {
            title: '收养人情况统计',
            name: '按收养人的婚姻情况',
            url: '/adoptionstatistics/statisticsAdoptorByMarriage',
            tableColumns: [
              {
                title: '区域',
                dataIndex: 'areaName',
                align: 'center',
                width: 100
              },
              {
                title: '总数',
                dataIndex: 'total',
                align: 'center',
                width: 100
              },
              {
                title: '未婚',
                dataIndex: 'singleTotal',
                align: 'center',
                width: 100
              },
              {
                title: '已婚',
                dataIndex: 'marggiagedTotal',
                align: 'center',
                width: 100
              },
              {
                title: '初婚',
                dataIndex: 'stepchildrenTotal',
                align: 'center',
                width: 100
              },
              {
                title: '再婚',
                dataIndex: 'certificateTotal',
                align: 'center',
                width: 100
              },
              {
                title: '未说明的婚姻状况',
                dataIndex: 'notMarriageStatusTotal',
                align: 'center',
                width: 100
              },
              {
                title: '复婚',
                dataIndex: 'orphanTotal',
                align: 'center',
                width: 100
              },
              {
                title: '丧偶',
                dataIndex: 'abandonTotal',
                align: 'center',
                width: 100
              },
              {
                title: '离婚',
                dataIndex: 'divorceTotal',
                align: 'center',
                width: 100
              }
            ]
          },
          {
            title: '收养人情况统计',
            name: '按收养人的身份类别',
            url: '/adoptionstatistics/statisticsAdoptorByIdCategory',
            tableColumns: [
              {
                title: '区域',
                dataIndex: 'areaName',
                align: 'center',
                width: 100
              },
              {
                title: '总数',
                dataIndex: 'total',
                align: 'center',
                width: 100
              },
              {
                title: '内地居民',
                dataIndex: 'mainlandTotal',
                align: 'center',
                width: 100
              },
              {
                title: '香港居民',
                dataIndex: 'hongkongTotal',
                align: 'center',
                width: 100
              },
              {
                title: '澳门居民',
                dataIndex: 'macaoTotal',
                align: 'center',
                width: 100
              },
              {
                title: '台湾居民',
                dataIndex: 'taiwanTotal',
                align: 'center',
                width: 100
              },
              {
                title: '华侨或出国人员',
                dataIndex: 'overseasTotal',
                align: 'center',
                width: 100
              },
              {
                title: '外国人',
                dataIndex: 'foreignersTotal',
                align: 'center',
                width: 100
              }
            ]
          }
        ],
        [
          {
            title: '送养人情况统计',
            name: '按送养人的身份情况',
            url: '/adoptionstatistics/statisticsPlacingOutByIdCategory',
            tableColumns: [
              {
                title: '区域',
                dataIndex: 'areaName',
                align: 'center',
                width: 200
              },
              {
                title: '总数',
                dataIndex: 'total',
                align: 'center',
                width: 200
              },
              {
                title: '福利机构',
                dataIndex: 'stepchildrenTotal',
                align: 'center',
                width: 200
              },
              {
                title: '生父母',
                dataIndex: 'parentsTotal',
                align: 'center',
                width: 200
              },
              {
                title: '监护人',
                dataIndex: 'guardianTotal',
                align: 'center',
                width: 200
              }
            ]
          },
          {
            title: '送养人情况统计',
            name: '按送养人的家庭收入情况',
            url: '/adoptionstatistics/statisticsPlacingOutByIncome',
            tableColumns: [
              {
                title: '区域',
                dataIndex: 'areaName',
                align: 'center',
                width: 100
              },
              {
                title: '总数',
                dataIndex: 'total',
                align: 'center',
                width: 100
              },
              {
                title: '1000元以下',
                dataIndex: 'thousandTotal',
                align: 'center',
                width: 100
              },
              {
                title: '1000~3000元',
                dataIndex: 'threeThousandTotal',
                align: 'center',
                width: 100
              },
              {
                title: '3000~5000元',
                dataIndex: 'fiveThousandTotal',
                align: 'center',
                width: 100
              },
              {
                title: '5000~7000元',
                dataIndex: 'sevenThousandTotal',
                align: 'center',
                width: 100
              },
              {
                title: '7000~1万元',
                dataIndex: 'tenhousandTotal',
                align: 'center',
                width: 100
              },
              {
                title: '1万元以上',
                dataIndex: 'overTotal',
                align: 'center',
                width: 100
              }
            ]
          }
        ]
      ]
    }
  },
  activated () {
    this.loadData()
    this.defaultarea()
    this.$nextTick(() => {
      this.getlist()
    })
  },
  mounted () {
    this.getadoptionbiztype()
  },
  methods: {
    // 默认区划
    defaultarea () {
      this.addressmodel = []
      if (window.parent.indexTool.getUserInfo().areaLevel == 0) {
        this.nowcode = '110000000000'
        this.$nextTick(() => {
          this.addressmodel.push(
            window.parent.indexTool.getUserInfo().areaCode,
            '110000000000'
          )
        })
      } else {
        this.isbu = false
        this.$nextTick(() => {
          this.nowcode = window.parent.indexTool.getUserInfo().areaCode
          this.addressmodel.push(this.nowcode)
        })
      }
    },
    // 业务类别 ADOPTIONBIZTYPE
    async getadoptionbiztype () {
      let data = await this.getDictionaries('ADOPTIONBIZTYPE') || []
      let _self = this
      // 去除涉及补录、补领的字典项
      _self.adoptionbiztypelist = data.reduce((prev, current) => {
        current.value != _self.Enum.ADOPTIONBIZTYPE.BLSYDJ && current.value != _self.Enum.ADOPTIONBIZTYPE.BLJCSYDJ && current.value != _self.Enum.ADOPTIONBIZTYPE.BLCXSYDJ
          && current.value != _self.Enum.ADOPTIONBIZTYPE.BLINGSYDJ && current.value != _self.Enum.ADOPTIONBIZTYPE.BLINGJCSYDJ && prev.push(current)
        return prev
      }, [])
    },
    loadData () {
      this.tableColumns = this.contData[this.nowkey][this.childkey].tableColumns
      this.childlist = this.contData[this.nowkey]
      this.nowkey = '0'
      this.childkey = '0'
      this.ishide = true
      this.addressmodel = []
    },
    adsvalchange (val) {
      this.nowcode = val[val.length - 1]
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.defaultarea()
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    callback (val) {
      this.nowkey = val + ''
      this.nowcode = ''
      this.resetFrom()
      this.childlist = this.contData[this.nowkey]
      this.childkey = '0'
      this.tableColumns = this.contData[this.nowkey][this.childkey].tableColumns
      this.defaultarea()
      this.$nextTick(() => {
        this.getlist()
      })
    },
    callchildback (val) {
      this.childkey = val
      //   this.nowcode = ''
      //   this.resetFrom()
      this.tableColumns = this.contData[this.nowkey][this.childkey].tableColumns
      //   this.defaultarea()
      this.$nextTick(() => {
        this.getlist()
      })
    },
    async getlist () {
      this.spinning = true
      let params = this.searchForm.getFieldsValue()

      if (params.date && params.date.length > 0) {
        params.dateStart = params.date[0].format('YYYY-MM-DD')
        params.dateEnd = params.date[1].format('YYYY-MM-DD')
        delete params.date
      }
      delete params.address_Linkage
      params.areaCode = this.nowcode
      let res = await this.post(
        this.contData[this.nowkey][this.childkey].url,
        params
      )
      if (!res.errors) {
        if (this.nowkey == 0) {
          res.data.data.map(item => {
            for (let k in item) {
              if (typeof item[k] == 'string') {
                if (item[k].includes(',')) {
                  let arr = item[k].split(',')
                  item[`${k}man`] = arr[0]
                  item[`${k}woman`] = arr[1]
                }
              }
            }
          })
        }
        this.tableData = res.data.data
      }
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    searchs () {
      this.getlist()
    }
  }
}
</script>
<style lang="less" scoped>
#tmd /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
#tmd /deep/ .ant-table-body-inner::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
.conts {
  width: 100%;
  min-height: 600px;
  background: #eff1f4;
  padding: 14px;
}
.contin {
  display: flex;
  padding-top: 20px;
}
.left {
  width: 15%;
  padding-right: 25px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: rgba(24, 144, 255, 1);
}
.right {
  width: 85%;
  padding: 0 20px;
  border-left: 1px solid #e8e8e8;
  box-sizing: border-box;
}
.lefttop {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(24, 144, 255, 1);
}
.lefttop img {
  width: 18px;
  margin-right: 5px;
}
.lefttype {
  width: 100%;
  margin: 14px 0 0;
  padding: 0;
}
.lefttype li {
  text-indent: 24px;
  list-style: none;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
}
.icons {
  margin-right: 4px;
}
.lefttype .actives {
  background: rgba(117, 191, 255, 1);
  color: rgba(255, 255, 255, 1);
}
.spilwid {
  width: 27%;
}
.spilwiddate {
  width: 30%;
}
.tableout /deep/ .ant-table tr td div {
  display: inline-block !important;
  width: 80% !important;
}
</style>
