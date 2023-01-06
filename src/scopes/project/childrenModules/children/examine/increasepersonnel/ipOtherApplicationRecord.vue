<template>
  <div class="searchdata tadrawer">
    <ta-border-layout v-if="isOpening"
                      :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="儿童姓名"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="name">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <ta-form-item label="儿童类别"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="childType"
                              v-if="notCounty">
                  <ta-select class="selectwid"
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in childrenTypeList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="身份证号"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid4"
                              fieldDecoratorId="idCard">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <ta-form-item label="性别"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="sex">
                  <ta-select allowClear
                             placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value"
                                      :require="{message:'请选择性别!'}">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="起领年月"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid">
                  <ta-range-picker :placeholder="['开始年月', '结束年月']"
                                   format="YYYY-MM"
                                   :value="value"
                                   :mode="mode2"
                                   @panelChange="handlePanelChange2" />
                </ta-form-item>
                <ta-form-item label="增员申请日期"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid3"
                              fieldDecoratorId="applyDay">
                  <ta-range-picker />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <ta-button class="btnleft"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button>
              </div>
            </div>
          </ta-form>
        </div>
        <div>
          <div class="visitbtntop radioClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">待提交</ta-radio-button>
              <ta-radio-button value="1">已提交</ta-radio-button>
              <!-- <ta-radio-button value="2">已退回</ta-radio-button> -->
            </ta-radio-group>
            <div style="float: right;">
              <ta-button type="primary"
                         icon="plus"
                         @click="add">新增</ta-button>
              <!-- <ta-button class='btnleft exportbtn'
                       icon='upload'
                       @click="exportFileList">导出</ta-button> -->
            </div>
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns.sync="tableColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  :showOverflowTooltip="true"
                  ref="hideOrShowTable">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="name"
                    slot-scope="a, b">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
          <template slot="birthday"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):'--'}}</span>
          </template>
          <template slot="registerDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):'--'}}</span>
          </template>
          <template slot="startTime"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,7):'--'}}</span>
          </template>
          <div slot="action"
               class='btnlist'
               slot-scope="a, b">
            <span @click="edit(b,'5')"
                  class="com_continue"
                  v-if="nowkey=='0'||b.anotherPlaceProcessStatus=='5'">{{nowkey=='0'?'编辑':'继续办理'}}</span>
            <span @click="see(b)"
                  class="com_textsee"
                  v-if="nowkey!='0'">查看</span>
            <ta-popconfirm title="确定要删除这条数据吗?"
                           @confirm="dels(b)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消"
                           v-if="nowkey=='0'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
          <div slot="status"
               slot-scope="val, obj">
            <span class="no_submit">待提交</span>
          </div>
          <div slot="anotherPlaceProcessStatus"
               slot-scope="val, obj">
            <span :class="statusClass(obj).classValue">{{statusClass(obj).stateName}}</span>
          </div>
          <div slot="isAnotherPlaceApply"
               slot-scope="val, obj">
            <span v-if="val == '1'">{{val == '1'?'是':'否'}}</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>

    <div v-if="!isOpening"
         class="container-not-support">
      系统尚未联通
    </div>

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
    title: '儿童姓名',
    dataIndex: 'name',
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '18%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '20%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '22%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '申请日期',
    align: 'center',
    dataIndex: 'registerDate',
    width: '23%',
    scopedSlots: { customRender: 'registerDate' }
  },
  {
    title: '起领年月',
    width: '20%',
    align: 'center',
    dataIndex: 'startTime',
    scopedSlots: { customRender: 'startTime' }
  },
  {
    title: '当前状态',
    align: 'center',
    width: '18%',
    dataIndex: 'anotherPlaceProcessStatus',
    scopedSlots: { customRender: 'anotherPlaceProcessStatus' }
  },
  {
    title: '当前状态',
    align: 'center',
    width: '18%',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
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
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      visible: false,
      idedit: false,
      nowkey: '0',
      childrenTypeList: [], // 儿童类别字典数据
      sexList: [], // 性别字典数据
      value: [], // 查询条件起领年月
      mode2: ['month', 'month'],
      walfareType: {
        authority: '0',
        createDate: '2019-08-28',
        createUser: '1',
        label: '福利机构养育孤弃儿童',
        name: '儿童类别-福利院',
        newType: '0',
        sort: 10,
        status: '1',
        system: '1',
        type: 'CHILDCATEGORYF',
        value: '1',
        version: 1
      },
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childApplyAnotherPlaceApi/queryOrphanAnotherPlaceApplyList'
      },
      // 默认属性
      mixDataList: [], // 数据列表
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值
      issearch: false,
      childTypeCode: (window.parent.indexTool.getUserInfo().orgType == '99'
        ? 'CHILDCATEGORYF' // 儿童类别-福利院
        : (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99'
          ? 'CHILDCATEGORYM' // 儿童类别-民政局
          : 'CHILDCATEGORYA')), // 儿童类别-全
      notCounty: window.parent.indexTool.getUserInfo().areaLevel != 4, // 不是乡镇用户

      isOpening: true, // 当前用户地是否已联通
      notSupportAreaIdArr: ['650000000000', '659900000000'], // 暂未联通跨省通办的省级地 - 新疆、新疆兵团
    }
  },
  activated () {
    // 判断联通情况
    let { provinceId } = window.parent.indexTool.getUserInfo()
    if (this.notSupportAreaIdArr.includes(provinceId)) {
      this.isOpening = false
      return;
    }
    this.isOpening = true
    this.issearch = false
    this.$refs.hideOrShowTable[this.nowkey == '1' ? 'showColumns' : 'hideColumns'](['anotherPlaceProcessStatus'])
    this.$refs.hideOrShowTable[this.nowkey == '1' ? 'hideColumns' : 'showColumns'](['status'])
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('sex')
      this.childrenTypeList = await this.getDictionaries(this.childTypeCode)
      // 去除其他和福利机构供养困境儿童字典
      this.$nextTick(() => {
        const index = this.childrenTypeList.findIndex(item => item.value == this.Enum.CHILDCATEGORYA.QT)
        if (index != -1) {
          this.childrenTypeList.splice(index, 1)
          this.childrenTypeList.push(this.walfareType)
        }
      })
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    async getMenu (code, name) {
      const _self = this
      const res = await _self.post('codetable/getCode', { codeType: code })
      if (res.serviceSuccess) {
        res.data.codeList.sort(function (a, b) {
          return parseInt(a.value) - parseInt(b.value)
        })
        _self[name] = res.data.codeList
      }
    },
    // 高级查询
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 状态颜色处理
    statusClass (e) {
      const obj = {}
      const stateData = e.anotherPlaceProcessStatus
      switch (+stateData) {
        case 1:// 待审核
          obj.classValue = 'com_tobeaudited'
          obj.stateName = '待审核'
          break
        case 3:// 审核中
          obj.classValue = 'com_inaudit'
          obj.stateName = '审核中'
          break
        case 4:// 通过
          obj.classValue = 'com_adopt'
          obj.stateName = '通过'
          break
        case 5:// 待补充材料
          obj.classValue = 'com_reject'
          obj.stateName = '待补充材料'
          break
        case 6:// 不通过
          obj.classValue = 'com_reject'
          obj.stateName = '不通过'
          break
      }
      return obj
    },
    // 新增
    async add () {
      // 判断机构信息是否已经完善
      const userInfo = window.parent.indexTool.getUserInfo()
      if (userInfo.orgType == '99') { // 福利院用户
        await this.post('addChildApi/checkWelfareOrgInfo', { welfareOrgId: userInfo.orgId }).then((res) => {
          if (res.serviceSuccess) {
            if (res.data.data) {
              this.$router.push({
                name: 'orphansHandicapped',
                query: { operateFlag: 'add', childType: this.Enum.CHILDCATEGORYA.FLJGYYGQET, isOtherAdd: '12' }
              })
            } else {
              this.$message.error('请在机构管理中完善机构信息后再进行申请')
            }
          }
        })
      } else {
        this.$router.push({
          name: 'orphansHandicapped',
          query: { operateFlag: 'add', childType: this.Enum.CHILDCATEGORYA.SHSJET, isOtherAdd: '12' }
        })
      }
    },
    // 导出
    exportFileList () {
      var data = this.userPageParams()
      this.exportFile('/addChild/exportAddChildApply', data)
    },
    see (e) {
      const flag = 'look'
      this.$router.push({
        name: 'otherInformation',
        query: {
          obj: JSON.stringify(e),
          nowkey: this.nowkey,
          childType: '2'
        }
      })
    },
    // 编辑和继续办理
    edit (e, type) { // type为5时是继续办理
      console.log('->', this.nowkey)
      const userInfo = window.parent.indexTool.getUserInfo()
      const _self = this
      let { nowkey } = this
      if (userInfo.orgType == '99') { // 福利院用户
        _self.$router.push({
          name: 'orphansHandicapped',
          query: {
            url: '/childInfoApi/getOrphansDisabledChildrenById',
            params: JSON.stringify({ id: e.id }),
            operateFlag: type == '5' ? 'edit_bh' : 'edit_zy',
            childType: this.Enum.CHILDCATEGORYA.FLJGYYGQET,
            isOtherEdit: '12',
            clickSourceType: nowkey == '1' ? 'continue' : '' // 点击的按钮类别：continue继续办理
          }
        })
      } else {
        _self.$router.push({
          name: 'orphansHandicapped',
          query: {
            url: '/childInfoApi/getOrphansDisabledChildrenById',
            params: JSON.stringify({ id: e.id }),
            operateFlag: type == '5' ? 'edit_bh' : 'edit_zy',
            childType: this.Enum.CHILDCATEGORYA.SHSJET,
            isOtherEdit: '12',
            clickSourceType: nowkey == '1' ? 'continue' : '' // 点击的按钮类别：continue继续办理
          }
        })
      }
    },
    dels (e) {
      const _self = this
      const url = 'childApplyAnotherPlaceApi/delOrphanAnotherPlaceApply'
      _self.post(url, {
        childEnterId: e.id
      }).then(res => {
        if (!res.errors) {
          _self.$message.success('删除成功!')
          _self.handleSubmit()
        }
      })
    },
    otherRemove (e) {
      const _self = this
      _self.post('orphansDisabledChildrenApi/giveBackOrphanAnotherPlaceApply', {
        childEnterId: e.id
      }).then(res => {
        if (!res.errors) {
          _self.$message.success('退回成功!')
          _self.handleSubmit()
        }
      })
    },
    typechange (val) {
      this.mixDataList = []
      this.nowkey = val.target.value
      // 已提交列表显示异地办理状态/待提交显示状态
      this.$refs.hideOrShowTable[this.nowkey == '1' ? 'showColumns' : 'hideColumns'](['anotherPlaceProcessStatus'])
      this.$refs.hideOrShowTable[this.nowkey == '1' ? 'hideColumns' : 'showColumns'](['status'])
      this.handleSubmit()
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    resetFrom () {
      this.value = []
      this.searchForm.resetFields()
      this.handleSubmit('search')
    },
    handlePanelChange2 (value, mode) {
      this.value = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    // 查询参数
    userPageParams () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      formData.dataStatus = this.nowkey

      _self.changetime(formData)
      if (this.value.length > 0) {
        formData.approveDayStart = this.value[0].format('YYYY-MM')
        formData.approveDayEnd = this.value[1].format('YYYY-MM')
      }
      return formData
    },
    // 查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.id }), operateFlag: 'look_now' }
      })
    }
  }
}
</script>

<style scoped lang="less">
.action {
  display: flex;
  justify-content: space-around;
}
.spilwid3 {
  width: 450px;
}
.spilwid4 {
  width: 350px;
}

.container-not-support {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}
</style>
