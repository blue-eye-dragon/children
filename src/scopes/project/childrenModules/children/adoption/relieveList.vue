<template>
  <div class="searchdata tadrawer">
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
                <ta-form-item :labelCol="{span:8}"
                              class="spilwid1"
                              label="被收养人姓名"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="childName">
                  <ta-input placeholder="请输入被收养人姓名" />
                </ta-form-item>
                <ta-form-item :labelCol="{span:9}"
                              class="spilwid2"
                              label="身份证号"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="idCard">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <ta-form-item label="收养登记日期"
                              class="spilwid3"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="registerDate">
                  <ta-range-picker />
                </ta-form-item>
                <ta-form-item label="解除收养登记日期"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid3"
                              fieldDecoratorId="relieveDate">
                  <ta-range-picker />
                </ta-form-item>

              </div>

              <div class="searchbtn">
                <div class="searchButton">
                  <ta-button class="search "
                             icon="search"
                             @click="handleSubmit">查询</ta-button>
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

          </ta-form>

        </div>
        <div v-show="isdifferent"
             key="1">
          <div class="operateBtn">
            <div class="radioClass leftClass">

              <ta-radio-group v-model="nowkey"
                              buttonStyle="solid"
                              @change="typechange">
                <ta-radio-button value="0">暂存信息</ta-radio-button>
                <ta-radio-button value="1">本地解除</ta-radio-button>

                <ta-radio-button value="2">异地解除</ta-radio-button>

              </ta-radio-group>
            </div>
            <div class="rightClass">
              <ta-button type="primary"
                         icon='plus'
                         @click="goNew">新增异地解除</ta-button>
            </div>
          </div>
          <ta-table bordered
                    class="tables table-min-width"
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :customRow="fnCustomRow"
                    :dataSource="tableData">
            <span slot="num"
                  slot-scope="val, obj, index">
              <span>{{ size * (page - 1) + index + 1 }}</span>
            </span>

            <div slot="flowStatus"
                 slot-scope="val">
              <span v-if="nowkey!=0"
                    :class="flowStatusClass(val)">{{CollectionLabel('ADOPTIONSTATUS',val)}}</span>
              <span v-else
                    class="com_tobeaudited">{{'待提交'}}</span>
            </div>
            <div slot="action"
                 slot-scope="val, obj"
                 class="btnlist">
              <span v-if="obj.saveStatus == '0'"></span>
              <span v-else-if="nowkey!=0 && obj.saveStatus != '0'&&obj.handleType!=0"
                    @click="continueprocessing(obj)"
                    :class="obj.handleType==0?'com_textsee':'com_relieve'">{{obj.handleType | handleTypefilter}}</span>

              <span v-else-if="nowkey!=0 && obj.saveStatus != '0'&&obj.handleType==0"
                    @click="continueprocessing(obj,'1','see')"
                    :class="'com_textsee'">查看</span>
              <span v-else
                    @click="continueprocessing(obj,'1')"
                    class=" com_continue">继续办理</span>
              <template>
                <ta-popconfirm title="确定删除吗?"
                               v-if="nowkey==0"
                               @confirm="deletes(val,obj)"
                               okText="确定"
                               cancelText="取消">
                  <span v-if="nowkey==0"
                        class="com_textdel">删除</span>
                </ta-popconfirm>
              </template>
            </div>

          </ta-table>
        </div>

      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       style="float: right;margin-top: 10px"
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
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '被收养人姓名',
    width: '15%',
    dataIndex: 'childName'
  },

  {
    title: '性别',
    width: '10%',
    align: 'center',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '收养类别',
    width: '17%',
    dataIndex: 'adoptionCategory',
    collectionType: 'adoptionCategory'
  },
  {
    title: '收养登记日期',
    width: '15%',
    dataIndex: 'registerDate'
  },
  {
    title: '登记机构',
    width: '15%',
    dataIndex: 'orgName'
  },
  {
    title: '解除登记日期',
    width: '15%',
    dataIndex: 'relieveDate'
  },
  {
    title: '解除登记机构',
    width: '15%',
    dataIndex: 'relieveOrgName'
  },

  {
    title: '当前状态',
    width: '11%',
    align: 'center',
    dataIndex: 'flowStatus',

    scopedSlots: { customRender: 'flowStatus' }
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
  name: 'revoke',
  mixins: [listMixin],
  data () {
    return {
      issearch: false,
      nowkey: '0',
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/adoption/tempSaveRelieveAdoptionList', // 数据列表接口，API地址
        copymixGetDataListURL: '/adoption/relieveAllList',
        mixDeleteURL: '暂无删除接口'
      },
      mixPageRef: 'gridPager',
      copymixPageRef: 'copygridPager',
      isdifferent: true,
      visible: false,
      id: ''
    }
  },
  filters: {
    dishandleTypefilter (val) {
      switch (val) {
        case 0:
          return '查看'
          break
        case 1:
          return '继续办理'
          break
        case 2:
          return '补全材料'
          break
        case 3:
          return '异地解除'
          break
        case 4:
          return '撤销收养'
          break
        case 5:
          return '出具证明'
          break
        case 6:
          return '补领'
          break
      }
    },
    handleTypefilter (val) {
      switch (val) {
        case 0:
          return '查看'
          break
        case 1:
          return '继续办理'
          break
        case 2:
          return '补全材料'
          break
        case 3:
          return '解除收养'
          break
        case 4:
          return '撤销收养'
          break
        case 5:
          return '出具证明'
          break
        case 6:
          return '补领'
          break
      }
    }
  },
  activated () {
    this.isdifferent = true
    this.issearch = false

    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
  },
  methods: {
    async deletes (val, obj) {
      const res = await this.post('/adoption/delRelieveTempInfo', { id: obj.otherRelieveId })
      if (!res.errors) {
        this.$message.success('操作成功！')
        this.handleSubmit()
      }
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    flowStatusClass (e) {
      let classValue = ''
      switch (e) {
        case this.Enum.ADOPTIONSTATUS.SYZ:// 收养中
          classValue = 'com_inaudit'
          break
        case this.Enum.ADOPTIONSTATUS.YJC:// 已解除
          classValue = 'com_tobesubmitted'
          break
        case this.Enum.ADOPTIONSTATUS.YCX:// 已撤销
          classValue = 'com_reject'
          break
        case this.Enum.ADOPTIONSTATUS.BCLZ: // 补材料中
          classValue = 'com_tobeaudited'
          break
        case this.Enum.ADOPTIONSTATUS.YBQCL:// 已补全材料
          classValue = 'com_adopt'
          break
      }
      return classValue
    },

    goNew () {
      this.$router.push({
        name: 'relieveListRegistration',
        params: {
          additionalYesOrNo: '0'
        }
      })
    },
    typechange (key) {
      this.nowkey = key.target.value
      this.searchForm.resetFields()
      this.userPageParams()
      this.handleSubmit('search')
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()

      if (this.nowkey == '1') { // 本地
        this.mixListOptions.mixGetDataListURL = '/adoption/relieveList'
        // formData.additionalYesOrNo = '0'
      } else if (this.nowkey == '2') { // 外地
        this.mixListOptions.mixGetDataListURL = '/adoption/allOtherPlacesPageList'// 后台无接口 2020年3月2日12点13分
      } else {
        this.mixListOptions.mixGetDataListURL = '/adoption/tempSaveRelieveAdoptionList'
      }
      this.changetime(formData)
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },

    continueprocessing (obj, ty, type) {
      this.$router.push({
        path: 'relieve',
        query: {
          zcjcsy: ty,
          childType: obj.adoptionCategory,
          nowkey: this.nowkey,
          otherRelieveId: obj.otherRelieveId,
          id: obj.id,
          handleType: ty || obj.handleType,
          additionalYesOrNo: '0',
          type: type
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.spilwid2 {
  width: 380px;
}
.spilwid3 {
  width: 430px;
}
</style>
