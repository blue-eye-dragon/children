<template>
  <div class="modelcont"
       style="overflow:hidden;">
    <ta-tabs :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="散居孤儿保障工作、收养工作自查和检查表2"
                   key="02">
        <div>
          <ta-form layout="inline"
                   style="margin: 1.5% 0;"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="指标类型"
                          fieldDecoratorId="indexType"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select allowClear
                         placeholder="请选择指标类型">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="item in indexTypeList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="检查项目"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="checkProject"
                          class="spilwid">
              <ta-input placeholder="请输入检查项目" />
            </ta-form-item>
            <ta-form-item>
              <ta-button type="primary"
                         @click="handleSubmit('search')">查询</ta-button>
            </ta-form-item>
          </ta-form>
          <div style="float: left;width: 50%;">
            <div>
              <ta-button type="primary"
                         @click="batch"
                         :disabled="isdisabled"
                         v-if="ishide">批量添加</ta-button>
            </div>
            <ta-table bordered
                      class="tables"
                      :columns="tableColumns"
                      :dataSource="tableData"
                      :rowSelection="rowSelection">
              <span slot="num"
                    slot-scope="a, b, c">
                <span>{{ size * (page - 1) + c + 1 }}</span>
              </span>
              <div slot="action"
                   slot-scope="e,obj,index"
                   class="btnlist btnponter">
                <span @click="addsure(e,obj,index)">确认添加</span>
              </div>
            </ta-table>
            <ta-pagination  :defaultCurrent="page"
                           style="float: right;margin-top: 10px"
                           showSizeChanger
                           showQuickJumper
                           :dataSource.sync="tableData"
                           :params="userPageParams"
                           @change="pagechange"
                           :url="mixListOptions.mixGetDataListURL"
                           ref="gridPager" />
          </div>
          <div style="float: left;width: 50%;margin-top: 1.5%;">
            <h3 style="margin-left: 5%;">散居孤儿保障工作、收养工作自查和检查表:</h3>
            <div class="chosechild">
              <div v-for="(item,index) in orphanOrphansList"
                   :key="index"
                   :value="item.indexNum"
                   class="children">
                {{item.indexNum}}
                <ta-popconfirm title="确定删除吗?"
                               @confirm="del(index,'02')"
                               @cancel="cancel"
                               okText="确定"
                               cancelText="取消">
                  <ta-icon class="dels"
                           type="close" />
                </ta-popconfirm>
              </div>
            </div>
          </div>
        </div>
      </ta-tab-pane>
    </ta-tabs>

  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
export default {
  mixins: [listMixin],
  props: {
    tableColumns: {
      type: Array
    },
    url: {
      type: String,
      required: true
    },
    ishide: {
      type: Boolean,
      default: true
    },
    // 儿童福利机构、收留抚养孤弃儿童的民间机构儿童养育情况自查和检查表数据
    welfareInsList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 散居孤儿保障工作、收养工作自查和检查表数据
    orphanOrphansList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 指标库分类选择的数据
    dbClassSelect: {
      type: String
    },
    // 任务类别选择的数据
    taskTypeSelect: {
      type: String
    }
  },
  data () {
    return {
      tableData: [],
      page: 1,
      size: 10,
      mixPageRef: 'gridPager',
      mixListOptions: {
        mixActivatedIsNeed: false,
        mixGetDataListURL: '', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      isdisabled: true,
      chosedata: [],
      nowkey: '02',

      indexDbClassificList: [], // 指标库分类的字典数据
      indexTypeList: [], // 指标类型的字典数据
      indexApplyOrgList: [], // 指标适用机构的字典数据
      delStateList: [] // 指标状态的字典数据
    }
  },
  activited () {
    this.nowkey = '02'
  },
  mounted () {
    this.getMenuDatas()
    if (!this.ishide) {
      this.rowSelection = null
    }
    this.$set(this.mixListOptions, 'mixGetDataListURL', this.url)
    this.$nextTick(() => {
      this.handleSubmit()
    })
  },
  methods: {
    getMenuDatas () {
      this.getMenu('INDEXDBCLASSIFIC', 'indexDbClassificList') // 指标库分类字典数据
      this.getMenu('INDEXTYPE', 'indexTypeList') // 指标类型字典数据
      this.getMenu('INDEXAPPLYORG', 'indexApplyOrgList') // 指标适用机构字典数据
      this.getMenu('INDEXSTATE', 'delStateList') // 指标状态字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      formData['indexDbClassific'] = this.nowkey == '01' ? '01' : '02'
      this.changetime(formData)
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 多选
    onSelectChange (val, val2) {
      this.chosedata = val2
      this.rowSelection.selectedRowKeys = val
      val.length > 0 ? (this.isdisabled = false) : (this.isdisabled = true)
    },
    // 批量添加
    batch () {
      this.addsured(this.chosedata)
    },
    // 确认添加
    addsure (e, obj, index) {
      let arr = []
      arr.push(obj)
      this.addsured(arr)
    },
    // 添加
    addsured (val) {
      let nowdata = this.nowkey == '01' ? this.welfareInsList : this.orphanOrphansList
      let isrepeat = this.duplicateremoval(val, nowdata)
      if (isrepeat) {
        this.$message.error(`${this.repeatdata.indexNum}已添加`)
        return false
      }
      this.$message.success('添加成功')
      this.$emit('addData', val, this.nowkey)
    },
    // 去重
    duplicateremoval (val, data) {
      this.repeatdata = []
      let isrepeat = false
      val.map(item => {
        data.map(e => {
          if (e.id == item.id) {
            isrepeat = true
            this.repeatdata = item
            return false
          }
        })
      })
      return isrepeat
    },
    // 删除
    del (e, type) {
      this.$emit('dels', e, type)
    },
    // 取消删除
    cancel () {

    },
    callback (key) {
      this.nowkey = key
      this.handleSubmit('search')
    }
  }
}
</script>
<style lang="less" scoped>
.modelcont {
  margin-bottom: 40px;
}
.tables {
  margin-top: 20px;
}
.visitbtn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.chosechild {
  padding: 11px 15px 0 15px;
  //   border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
  border: 1px solid #636363;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 200px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 8.3%;
}
.children {
  padding: 0 10px;
  background: rgba(218, 238, 255, 1);
  color: rgba(0, 0, 0, 0.85);
  margin-right: 10px;
  margin-bottom: 11px;
  height: 25px;
}
</style>
