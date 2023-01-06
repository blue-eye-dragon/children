<template>
  <!-- 留守儿童综合查询之统计报表 -->
  <div class="searchdata tadrawer"
       id="tmd">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'  }">
      <div class=" "
           style="padding-top:15px;">
        <div class="searchdata"
             style="height: 85px;position:relative">
          <div class="searchcont"
               ref="oneout">
            <ta-form layout="inline"
                     ref="one"
                     class="searchfroms"
                     :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
              <AreaQuery msg="区域"
                         class="spilwid"
                         :ishide="true"
                         :addressmodel='addressmodel'
                         @setaddress='setaddr'
                         :labelCol="{span:7}"
                         :wrapperCol="{span:17}"
                         types="2"></AreaQuery>
            </ta-form>
            <div class="searchbtn searchButton">
              <ta-button type="primary"
                         class="search"
                         icon="search"
                         @click="searchslist('000')">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
              <!-- <ta-button class="btnleft"
                         @click="advancedquery">高级查询
                <ta-icon :type="issearch?'up':'down'" />
              </ta-button> -->
            </div>
          </div>
        </div>
        <div style="float: right;  margin-bottom: 7px; margin-top: -7px;   z-index: 99;  position: relative;">
          <ta-button style=" margin-left: 10px;"
                     class="exportbtn"
                     icon="upload"
                     @click="showModal">导出</ta-button>
          <ta-modal :centered="false"
                    style="top: 25%;"
                    :visible="showOn"
                    @ok="Excel"
                    @cancel="handleCancel">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
          <ta-button icon="rollback"
                     v-if="areaId!=oAreaId"
                     @click="goback">返回</ta-button>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">

          <ta-table class=" tables table-min-width  hight "
                    :columns="tableColumns"
                    :showOverflowTooltip="false"
                    :dataSource="tableData"
                    :scroll="{ x: 1000,}"
                    bordered>
            <template slot="areaName"
                      slot-scope="a, b, c">
              <span v-if="b.areaLevel==4 || b.areaLevel==3 || b.isIn != 1">{{a!=''?a:'合计'}}</span>
              <a @click="searchslist(b,'click')"
                 v-else>{{a}}</a>
            </template>
            <template slot="goOverAgeSupervisor"
                      slot-scope="a, b, c">
              <span v-if="b.heji">{{a}}</span>
              <a @click="toGoOverAgeSupervisor(b)"
                 v-else>{{a}}</a>
            </template>
            <template slot="goInfoOverAgeSupervisor"
                      slot-scope="a, b, c">
              <span v-if="b.heji">{{a}}</span>
              <a @click="toGoInfoOverAgeSupervisor(b)"
                 v-else>{{a}}</a>
            </template>

          </ta-table>
        </ta-spin>

      </div>

    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
export default {
  // mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      spinning: null,
      addressmodel: [],
      ishide: true,
      tableData: [],
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          width: '10%',
          scopedSlots: { customRender: 'areaName' }
        },
        {
          title: '孤儿超龄数量',
          dataIndex: 'guerNum',
          align: 'center',
          width: '10%',
          scopedSlots: { customRender: 'goOverAgeSupervisor' }
        },
        {
          title: '事实无人抚养儿童超龄数量',
          dataIndex: 'unaNum',
          align: 'center',
          width: '10%',
          scopedSlots: { customRender: 'goInfoOverAgeSupervisor' }
        }
      ],
      areaId: '',
      areaCode: '',
      oAreaId: '',
      showOn: false
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('8.7%', '91.3%', 'spilwid1') // 单独一行字段宽度控制
  },
  mounted () {
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.oAreaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.setHeight('one', 'oneout', !this.issearch)
    this.addressmodel = [this.areaId]
    this.searchslist('000')
  },
  activated () {
  },
  methods: {
    setaddr () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({ // 130000000000/130100000000/130102000000
          address_Linkage: this.addressmodel
        })
      })
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.addressmodel = [this.areaId]
      this.searchslist('000')
    },
    goback () {
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.addressmodel = [this.areaId]
      this.searchslist()
    },
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = 'auto'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },
    searchslist (value, type) {
      this.spinning = true
      const searchValue = this.searchForm.getFieldsValue()
      if (searchValue.address_Linkage && searchValue.address_Linkage.length > 0) {
        searchValue.areaId = searchValue.address_Linkage[searchValue.address_Linkage.length - 1]
        this.areaId = searchValue.areaId
      } else {
        searchValue.areaId = window.parent.indexTool.getUserInfo().areaId
        this.areaId = searchValue.areaId
      }
      this.changetime(searchValue)
      if (!value) {
      } else {
        if (value) {
          if (value.areaId) {
            searchValue.areaId = value.areaId
            this.areaId = value.areaId
          }
        }
      }
      if (type == 'click') {
        // 点击下转
        this.dealArea(value.idPath)
      }
      this.getlist(searchValue, value)
    },
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        areaIdPathS.shift()
        this.addressmodel = areaIdPathS
      }
    },
    async getlist (params, value) {
      let res = {}
      res = await this.post('overseeApi/overSeeNum', params)
      this.tableData = res.data.data
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    Excel () {
      const searchValue = this.searchForm.getFieldsValue()
      if (searchValue.address_Linkage && searchValue.address_Linkage.length > 0) {
        searchValue.areaId = searchValue.address_Linkage[searchValue.address_Linkage.length - 1]
        this.areaId = searchValue.areaId
      } else {
        searchValue.areaId = window.parent.indexTool.getUserInfo().areaId
        this.areaId = searchValue.areaId
      }
      searchValue.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      searchValue.idPath = window.parent.indexTool.getUserInfo().areaIdPath
      const url = '/overseeBusiness/exportOverSeeNum'
      this.exportFile(url, searchValue)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    // 获取单位
    getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },
    toGoOverAgeSupervisor (b) {
      this.$router.push({
        name: 'overAgeSupervisor',
        query: {
          areaId: b.areaId,
          areaIdPath: b.idPath,
          isIn: b.isIn
        }
      })
    },
    toGoInfoOverAgeSupervisor (b) {
      this.$router.push({
        name: 'infoOverAgeSupervisor',
        query: {
          areaId: b.areaId,
          areaIdPath: b.idPath,
          isIn: b.isIn
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.searchcont {
  width: 100%;
  position: relative;
  height: 100px;
  overflow: hidden;
  transition: all 0.5s;
  width: 100%;
  height: 70px;
  border-bottom: 13px solid #e4e4e4;
  margin-bottom: 10px;
}
.searchcont {
  height: 66px;
  transition: all 1s ease 0s;
  position: absolute;
  width: 100%;
  z-index: 100;
  background: rgb(255, 255, 255);
}
.searchfroms {
  width: calc(100% - 330px);
}
.searchbtn {
  width: 330px;
  position: absolute;
  right: 0;
  top: 6px;
}
.ant-tabs-extra-content {
  display: none;
}
.searchdata {
  height: 100%;
}
.spilwid1 {
  width: 900px;
}
.spilwid2 {
  width: 410px;
}
#tmd /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}
</style>
