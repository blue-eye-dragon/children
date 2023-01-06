<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div class="contentin">
        <div class="searchcont"
             ref="oneout">
          <ta-form layout="inline"
                   ref="one"
                   class="formWidth"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="姓名"
                          class="spilwid"
                          fieldDecoratorId="name"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>
            <ta-form-item label="儿童编号"
                          class="spilwid"
                          fieldDecoratorId="childNo"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入儿童编号" />
            </ta-form-item>
            <ta-form-item label="儿童类别"
                          class="spilwid"
                          fieldDecoratorId="childType"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择儿童类别">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in adoptionlist"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="性别"
                          class="spilwid"
                          fieldDecoratorId="sex"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择性别">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in sexList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="身份证号"
                          class="spilwid"
                          fieldDecoratorId="idCard"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入身份证号" />
            </ta-form-item>
            <ta-form-item label="出生日期"
                          class="spilwid"
                          fieldDecoratorId="birthday"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-range-picker />
            </ta-form-item>
            <ta-form-item label="登记增员日期"
                          class="spilwid"
                          fieldDecoratorId="registerDate"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-range-picker />
            </ta-form-item>

          </ta-form>

          <div class="searchbtn">
            <div class="searchButton">
              <ta-button class="search "
                         icon="search"
                         @click="handleSubmit('search')">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
              <ta-button class="btnleft"
                         style="    width: 109px;"
                         @click="advancedquery">
                高级查询
                <ta-icon :type="issearch?'up':'down'" />
              </ta-button>
            </div>

          </div>
        </div>

        <div style="height: 50px;margin-top:15px;">
          <ta-button type="primary"
                     class="import"
                     icon="cloud-upload"
                     @click="imports">导入孤儿信息</ta-button>
          <ta-button class="btnleft"
                     type="primary"
                     @click="funds">孤儿助学经费</ta-button>
        </div>
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="e,obj,index"
               class="btnlist">
            <span @click="addAdoption(e,obj,index)"
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
    <ta-modal title="导入"
              v-model="visible"
              width="90%"
              :footer="null">
      <ChoiceChildren :tableColumns="tableColumns"
                      v-if="visible"
                      :ishide="false"
                      @addsure="addsure"
                      url="/childrenInStudentAssistanceProjec/listOrphan"></ChoiceChildren>
    </ta-modal>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import ChoiceChildren from '@component/common/components/ChoiceChildren'
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
    width: '18%'
  },
  // {
  //   title: '身份证号',
  //   dataIndex: 'idCard',
  //   width: '18%'
  // },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex',
    width: '16%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '17%'
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA',
    width: '18%'
  },
  {
    title: '登记增员日期',
    dataIndex: 'registDate',
    width: '17%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  components: {
    ChoiceChildren
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      adoptionlist: [],
      sexList: [],
      worktudyList: [],
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/childrenInStudentAssistanceProjec/list', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      visible: false,
      issearch: false
    }
  },
  mounted () {
    this.getchildtype()
    this.getsex()
    this.getworktudy()
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch)
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 'px'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },
    imports () {
      this.visible = true
    },
    async addsure (val) {
      /// childrenInStudentAssistanceProjec/save
      //   console.log(val)
      //   let nowdata = this.nowkey == 1 ? this.grantList : this.replacementList
      //   let isrepeat = this.duplicateremoval(val, nowdata)
      //   if (isrepeat) {
      //     this.$message.error(`${this.repeatdata.name}已添加`)
      //     return false
      //   }
      console.log(val)
      let params = {
        childId: val[0].childId
        // buttonType:
      }
      let data = await this.post(
        'childrenInStudentAssistanceProjec/save',
        params
      )
      if (data.errors == null) {
        this.$message.success('添加成功')
        this.visible = false
        this.handleSubmit()
      }
    },
    // // 获取儿童类型
    // async getchildtype () {
    //   let data = await this.getDictionaries('ADOPTIONCATEGORY')
    //   this.adoptionlist = data
    // },
    // 儿童类别
    async getchildtype () {
      let data = await this.getchildtypelist()
      this.adoptionlist = data
    },

    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 工学情况 WORKSTUDY
    async getworktudy () {
      let data = await this.getDictionaries('WORKSTUDY')
      this.worktudyList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    addAdoption (e, obj, index) {
      console.log(obj)
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'studentassistanceDetail',
        params: {
          obj: str
        }
      })
    },
    funds () {
      this.$router.push({
        name: 'funds'
      })
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid {
  width: 300px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
.visitbtns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.searchcont {
  width: 100%;
  position: relative;
  height: 54px;
  overflow: hidden;
  transition: all 0.5s;
  width: 100%;
  height: 70px;
  border-bottom: 13px solid #e4e4e4;
}
.searchbtn {
  width: 319px;
  position: absolute;
  right: 0;
  top: 6px;
}
.formWidth {
  width: 860px;
}
</style>
