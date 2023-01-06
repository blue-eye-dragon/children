<!--
 * @Date: 2021-06-29 17:55:48
 * @information: 收养登记信息维护 - 这个需求说不上了
-->
<template>
  <div id="adopt-info-safeguard"
       class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="收养登记证字号"
                              class="spilwid1"
                              :labelCol="{span:11}"
                              fieldDecoratorId="registionNumber"
                              :wrapperCol="{span:13}">
                  <ta-input placeholder="请输入收养登记证字号"
                            class="numwid" />
                </ta-form-item>

                <ta-form-item label="业务类别"
                              class="spilwid"
                              fieldDecoratorId="biztype"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="{initialValue: '1'}">
                  <ta-select placeholder="请选择业务类别">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionbiztypelist"
                                      :key="index">{{item.label}}</ta-select-option>
                    <ta-select-option value>全部</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <!-- <ta-button class="btnleft"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button> -->
              </div>
            </div>
          </ta-form>
        </div>

        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">

          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>

          <div slot="action"
               slot-scope="val, obj"
               class="btnlist">
            <span @click="onResetStatus(obj)"
                  class="com_textsee">恢复未办结状态</span>
          </div>

        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :defaultCurrent="page"
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>

  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'

const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '登记字号',
    width: '24%',
    dataIndex: 'certificateNumber'
  },
  {
    title: '被收养人姓名',
    width: '15%',
    dataIndex: 'childName'
  },
  {
    title: '业务类别',
    width: '15%',
    dataIndex: 'biztype',
    collectionType: 'ADOPTIONBIZTYPE'
  },
  {
    title: '登记日期',
    width: '18%',
    dataIndex: 'registerDate'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 330,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/adoption/adoptionList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      issearch: false,
      adoptionbiztypelist: [], // 收养类别字典

    }
  },
  created () {

  },
  mounted () {
    this.getadoptionbiztype()
  },
  activated () {
    this.issearch = false
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-29 18:11:42
     * @information: 恢复未办结状态 /adoptionCommon/updateAdoptionOutCardStatus
     */
    onResetStatus (obj) {

    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-29 18:13:58
     * @information: 高级查询
     */
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-30 08:49:24
     * @information: 参数
     */
    userPageParams () {
      const data = this.searchForm.getFieldsValue()
      // this.changetime(data)
      data.queryType = '1'
      return data
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-30 08:51:11
     * @information: 页码更改时
     */
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-30 08:52:56
     * @information: 业务类别字典 ADOPTIONBIZTYPE
     */
    async getadoptionbiztype () {
      const data = await this.getDictionaries('ADOPTIONBIZTYPE')
      this.adoptionbiztypelist = data
    },

  },
}
</script>

<style lang="scss">
#adopt-info-safeguard {
}
</style>


