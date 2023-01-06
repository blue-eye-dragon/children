<template>
  <!-- 儿童寻亲信息发布 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="儿童姓名"
                          class="spilwid"
                          fieldDecoratorId="name"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>
            <ta-form-item label="性别"
                          class="spilwid"
                          fieldDecoratorId="sex"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择性别">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in sexList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="收养类别"
                          class="spilwid"
                          fieldDecoratorId="adoptionType"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择收养类别">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in adoptList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>

          </ta-form>
        </div>

        <div class="operateBtn">
          <div class="radioClass leftClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">{{zerostate}}</ta-radio-button>
              <!-- <ta-radio-button value="1">待确认</ta-radio-button> -->
              <ta-radio-button value="2">已发布</ta-radio-button>
              <ta-radio-button value="3">已撤销</ta-radio-button>
              <ta-radio-button value="10">全部</ta-radio-button>
            </ta-radio-group>
          </div>
          <div class="rightClass">
            <ta-button type="primary"
                       icon='plus'
                       @click="add">新增</ta-button>
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="birthday"
                slot-scope="text">{{ text != null ? text.substring(0, 10) : ''}}</span>
          <div slot="releaseState"
               slot-scope="val, obj">
            <span v-if="obj.replyState == 0"
                  class="no_submit">{{zerostate}}</span>
            <span v-if="obj.replyState == 1"
                  class="com_adopt">待确认</span>
            <span v-if="obj.replyState == 2"
                  class="com_adopt">已发布</span>
            <span v-if="obj.replyState == 3"
                  class="com_reject">已撤销</span>
          </div>

          <div slot="action"
               slot-scope="val,obj"
               class="btnlist">
            <span class="com_textsee"
                  @click="look(obj)">查看</span>
            <!--<span class="com_textedit"
                  v-if="obj.replyState ==0 "
                  @click="edit(obj)">编辑</span>-->
            <span class="com_publish"
                  v-if="obj.replyState == 0 && isMZJ"
                  @click="publish(obj)">发布</span>

            <span class="com_revocation"
                  v-if="obj.replyState == 2&&isMZJ"
                  @click="revoke(obj)">撤销</span>

          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
      <ta-modal title="提示"
                v-model="removevisible"
                @ok="removeSure"
                okText="确认"
                cancelText="取消">
        <ta-form :autoFormCreate="(removeResion)=>{this.removeResion = removeResion}">
          <ta-form-item label='撤销原因'
                        fieldDecoratorId="removeResion"
                        :require="{message:'请输入撤销原因!'}">
            <ta-textarea placeholder='请输入撤销原因' />
          </ta-form-item>
        </ta-form>
      </ta-modal>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
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
    title: '儿童姓名',
    width: '17%',
    dataIndex: 'name'
  },
  {
    title: '出生日期',
    width: '17%',
    dataIndex: 'birthday',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '性别',
    width: '15%',
    align: 'center',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  // {
  //   title: '身份证号',
  //   width: '18%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '收养类别',
    width: '24%',
    dataIndex: 'adoptionType',
    collectionType: 'ADOPTIONCATEGORY'
  },
  {
    title: '发布状态',
    width: '12%',
    align: 'center',
    dataIndex: 'releaseState',
    // collectionType: 'RELAESESTATE',
    scopedSlots: { customRender: 'releaseState' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
var that = ''
export default {
  mixins: [listMixin],
  data () {
    return {
      zerostate: window.parent.indexTool.getUserInfo().orgType == '99' ? '已提交' : '待发布',
      tableColumns,
      tableData: [],
      page: 1,
      removevisible: false,
      size: 10,
      isMZJ: window.parent.indexTool.getUserInfo().orgType != '99', // 民政局用户
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/readyAdoptionChildren/list', // 数据列表接口，API地址
        isMIxin: true
      },
      mixPageRef: 'gridPager',
      nowkey: '10',
      disabled: false,
      sexList: [], // 性别字典数据
      adoptList: [], // 收养类别字典数据
      adoptionTypeList: [],
      userInfo: window.parent.indexTool.getUserInfo() // 用户信息
    }
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 字典数据获取
    getMenuDatas () {
      this.getMenu('ADOPTIONCATEGORY', 'adoptList') // 获取收养类别字典数据
      this.getMenu('sex', 'sexList') // 获取性别字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          const newData = res.data.codeList || []
          newData.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          if (name == 'adoptList') {
            const newValue = []
            newData.map((item, index) => {
              if (item.value == 4 || item.value == 6) {
                // newData.splice(index, 1)
              } else {
                newValue.push(item)
              }
            })
            if (!_self.isMZJ) {
              _self[name] = newValue.filter((item) => {
                return item.value == 1 || item.value == 2
              })
            } else {
              _self[name] = newValue
            }
          } else {
            _self[name] = newData
          }
        }
      })
    },
    // 编辑
    edit (e) {
      this.$router.push({
        name: 'adoptAdd',
        query: { flag: 'edit', id: e.id, isp: this.zerostate }
      })
    },
    // 删除
    deletes (e) {
      this.post('/childrenToBeAdoptedAdd/updateDelStateById', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('该数据已删除')
          this.handleSubmit()
        }
      })
    },
    // 删除取消
    cancel () {

    },
    // 撤销
    revoke (e) {
      const vm = this
      vm.removevisible = true
      vm.id = e.id
      vm.$nextTick(() => {
        vm.removeResion.resetFields()
      })
    },
    async removeSure () {
      const vm = this
      if (!vm.removeResion.getFieldsValue().removeResion) {
        return false
      }
      const val = vm.removeResion.getFieldsValue().removeResion
      const finData = {
        id: vm.id,
        revokeReason: val
      }
      const res = await this.post('/readyAdoptionChildren/revokeById', finData, true)
      if (res.data && res.data.data) {
        vm.removevisible = false
        vm.removeResion.resetFields()
        vm.$message.success('撤销成功')
        vm.handleSubmit('search')
      }
    },
    // 查看
    look (e) {
      if (e.releaseState == this.Enum.RELAESESTATE.CX) { // 撤销查看
        this.$router.push({
          name: 'adoptRevokeLook',
          query: { flag: 'look', id: e.id }
        })
      } else { // 新增、发布的查看
        this.$router.push({
          name: 'adoptAdd',
          query: { flag: 'look', id: e.id }
        })
      }
    },
    // 新增
    add () {
      const vm = this
      vm.$router.push({
        name: 'adoptAdd',
        query: {
          flag: 'add',
          isp: '新增',
          listData: JSON.stringify(this.tableData)
        }
      })
    },
    // 发布
    publish (e) {
      const vm = this
      vm.$router.push({
        name: 'adoptAdd',
        query: { flag: 'publish', id: e.id, isp: vm.zerostate }
      })
    },
    typechange (val) {
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams (arr) {
      const formData = this.searchForm.getFieldsValue()
      formData.adoptionTypeList = this.isMZJ ? [1, 2, 3, 5, 7, 8] : [1, 2]
      if (this.nowkey == '10') { // 全部
        formData.replyStateList = [0, 2, 3, 5]
      } else {
        formData.replyState = this.nowkey
      }
      formData.dataSource = 2
      return formData
    }
  }
}
</script>
