<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="所在省份"
                          fieldDecoratorId="province"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择所在省份">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in sfList"
                                  :value="item.areacode"
                                  :key="index">{{item.areaname}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="基地名称"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="baseName">
              <ta-input placeholder="请输入基地名称" />
            </ta-form-item>
            <ta-form-item label="所属福利机构"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="orgName">
              <ta-input placeholder="请输入所属福利机构" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           style="margin-left: 15px;"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>

          </ta-form>
        </div>
        <div class="operateBtn"
             v-if="areaLevel<=1">
          <ta-button type="primary"
                     style="z-index: 1;"
                     icon="plus"
                     @click="newOne">新增</ta-button>
          <!-- <ta-button style="background: #428108; color: #fff; z-index: 1;"
                     class="btnleft"
                     icon="check"
                     @click="doState(0)">启用</ta-button>
          <ta-button style="    color: white; background: #f5222d; z-index: 1;"
                     class="btnleft"
                     icon="close"
                     @click="doState(1)">废止</ta-button> -->

        </div>
        <div v-else
             style="margin-bottom: 16px;"></div>
        <!-- <div v-if="areaLevel==1"
             style="float:right">
          <ta-button class="exportbtn btnleft"
                     style="z-index: 1;"
                     icon='upload'
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
        </div> -->
        <ta-table v-if="areaLevel==1"
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :rowSelection="mixRowSelection"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="baseState"
                slot-scope="a, b, c">
            <span :class="a=='0'?'com_adopt':'com_reject'">{{ a=='0'?'启用':'废止'}}</span>

          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="ctrSome(val,obj,'1')"
                  class="com_textsee">查看</span>

            <span v-if="obj.baseState==0&&areaLevel<=1"
                  @click="ctrSome(val,obj,'2')"
                  class="com_textedit">编辑</span>
          </div>
        </ta-table>
        <ta-table v-else
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="baseState"
                slot-scope="a, b, c">
            <span :class="a==0?'com_adopt':'com_reject'">{{ a=='0'?'正常':'废止'}}</span>

          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="ctrSome(val,obj,'1')"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
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
import AddressComponent from '@component/common/components/addressComponent'
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
    title: '所在省份',
    width: '12%',
    dataIndex: 'province'
  },
  {
    title: '基地编号',
    width: '15%',
    dataIndex: 'baseNum'
  },
  {
    title: '基地名称',
    width: '17%',
    dataIndex: 'baseName'
  },
  {
    title: '所属福利机构',
    width: '15%',
    dataIndex: 'orgName'
  },
  {
    title: '基地地址',
    width: '18%',
    dataIndex: 'baseAdress'
  },
  {
    title: '备案日期',
    width: '13%',
    dataIndex: 'recordDate'
  },
  // {
  //   title: '基地状态',
  //   width: '13%',
  //   align: 'center',
  //   dataIndex: 'baseState',
  //   // collectionType: 'BASESTATE'
  //   scopedSlots: { customRender: 'baseState' }
  // },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  components: {
    AddressComponent
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      showOn: false,
      page: 1,
      size: 10,
      idedit: false,
      baseTypeList: [],
      sexList: [],
      worktudyList: [],
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/rehabilitationBase/list', // 数据列表接口，API地址
        mixEditURL: '/rehabilitationBase/update', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      visible: false,
      orgLevel: 10,
      ed: false,
      addressmodel: [],
      sfList: [],
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      alotId: '',
      areaLevel: '0'
    }
  },
  mounted () {
    this.getsex()
    this.getbaseType()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
    this.getUserOrg()
    this.getsfList()
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.alotId = []
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      for (let item in selectedRows) {
        this.alotId.push(selectedRows[item].id)
      }
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    async getsfList () {
      let param = {
        parentId: null
      }
      let until = await this.post('/zoning/queryStatistics', param)

      this.sfList = until.data.data
    },

    async getUserOrg () {
      this.orgLevel = window.parent.indexTool.getUserInfo().areaLevel // 当前机构级别
      if (this.orgLevel == 0) {
        // 部级权限
        this.ed = true
      }
    },

    Excel () {
      var data = this.userPageParams()
      this.exportFile('/rehabilitManage/rehabilitBase', data)
      this.showOn = false
    },
    showModal () {
      let ss = this.searchForm.getFieldsValue()

      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },

    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 基地类别列表
    async getbaseType () {
      let data = await this.getDictionaries('BASESTATE')
      this.baseTypeList = data
    },
    other (val) {
      let str = JSON.stringify(val)
      let data = JSON.parse(str)
      data.recordDate = moment(data.recordDate)
      let arr = []
      arr.push(data.province)
      this.addressmodel = [...arr]

      return data
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },

    async doState (e) {
      // 改变状态
      let params = { ids: this.alotId.toString(), isNormalOrAbolish: e }
      let res = await this.post(
        '/rehabilitationBase/updateBaseStateStateById',
        params
      )
      if (!res.data.data) {
        this.$message.error('操作失败')
      } else {
        this.$message.success('操作成功')
        this.handleSubmit()
      }
    },
    newOne () {
      this.$router.push({
        name: 'newBase'
      })
    },
    ctrSome (e, obj, ty) {
      // 1 look;2.edit;
      let tp = true
      if (ty == '1') {
        tp = true
      } else {
        tp = false
      }
      this.$router.push({
        name: 'newBase',
        query: {
          id: obj.id,
          tp: tp
        }
      })
    },
    addAdoption (e, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'educationDetail',
        params: {
          obj: str
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
