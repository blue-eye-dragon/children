<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <AreaQuery class='spilwid'
                           :ishide="false"
                           :areaLevel1="'1'"
                           :labelCol="{ span: 9 }"
                           :wrapperCol="{span:15}"
                           msg="区域"></AreaQuery>
                <ta-form-item :label="'是否配置孤儿续发申请'"
                              fieldDecoratorId="geIsUse"
                              style="width:300px"
                              :labelCol="{span:14}"
                              :wrapperCol="{span:10}">
                  <ta-select placeholder="选择是否配置孤儿续发申请">
                    <ta-select-option v-for="(item,index) in yesNoList"
                                      :key="index"
                                      :value="item.value">{{item.label}}
                    </ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item :label="'是否配置事实无人抚养儿童续发申请'"
                              fieldDecoratorId="sswrfyIsUse"
                              style="width:300px"
                              :labelCol="{span:14}"
                              :wrapperCol="{span:10}">
                  <ta-select placeholder="选择是否配置事实无人抚养儿童续发申请">
                    <ta-select-option v-for="(item,index) in yesNoList"
                                      :key="index"
                                      :value="item.value">{{item.label}}
                    </ta-select-option>
                  </ta-select>
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
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
        <div class="operateBtn">
          <ta-button type="primary"
                     @click="add"
                     icon="plus">新增</ta-button>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="geIsUse"
                slot-scope="a, b, c">
            <span v-if="a == 0" style="color:red">停用</span>
            <span v-else style="color:green">启用</span>
          </span>
          <span slot="sswrfyIsUse"
                slot-scope="a, b, c">
            <span v-if="a == 0" style="color:red">停用</span>
            <span v-else style="color:green">启用</span>
          </span>
          <span slot="action"
                slot-scope="text, record"
                class="btnlist">
            <span @click="see(record)"
                  class="com_textsee">查看</span>
            <span @click="edit(record)"
                  class="com_textedit">编辑</span>
            <!-- <ta-popconfirm title="确认删除吗?"
                           @confirm="del(text,record)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消">

              <span class="com_textdel">删除</span>

            </ta-popconfirm> -->
          </span>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :params="userPageParams"
                       @change="pagechange"
                       :dataSource.sync="tableData"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <ta-drawer :title="getTitle(newFlag)"
               width="600px"
               placement="right"
               @close="visible = false"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.messageForm = form}"
               layout="horizontal">
        <ta-col :span="24">
          <AreaQuery :ishide="false"
                     class="spilwid3"
                     msg="区域"
                     :types="'2'"
                     @setaddress="setaddress"
                     :labelCol="{span:8}"
                     :wrapperCol="{span:16}"
                     :disabled="newFlag=='see'||newFlag=='edit'"
                     @adsvalchange="adsvalchange"
                     :addressmodel="addressmodel"
                     :fileldName="'address_Linkage'"></AreaQuery>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item :label="'是否配置孤儿续发申请'"
                        fieldDecoratorId="geIsUse"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}">
            <ta-select style="width: 100%"
                       :disabled="disabled"
                       placeholder="选择是否配置孤儿续发申请">
              <ta-select-option v-for="(item,index) in yesNoList"
                                :key="index"
                                :value="item.value">{{item.label}}
              </ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item :label="'是否配置事实无人抚养儿童续发申请'"
                        fieldDecoratorId="sswrfyIsUse"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}">
            <ta-select style="width: 100%"
                       :disabled="disabled"
                       placeholder="选择是否配置事实无人抚养儿童续发申请">
              <ta-select-option v-for="(item,index) in yesNoList"
                                :key="index"
                                :value="item.value">{{item.label}}
              </ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{marginRight: 8}"
                   @click="back">返回</ta-button>
        <ta-button @click="submit('1')"
                   v-if="newFlag!='see'"
                   type="primary">提交</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '区域',
    dataIndex: 'areaName',
    width: '30%'
  },
  {
    title: '孤儿续发申请状态',
    dataIndex: 'geIsUse',
    align: 'center',
    width: '30%',
    scopedSlots: { customRender: 'geIsUse' }
  },
  {
    title: '事实无人抚养儿童续发申请状态',
    align: 'center',
    dataIndex: 'sswrfyIsUse',
    width: '30%',
    scopedSlots: { customRender: 'sswrfyIsUse' }
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
  components: {
    AreaQuery
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      yesNoList: [],
      mixListOptions: {
        mixGetDataListURL: '/superventionApplyConfigApi/querySuperventionApplyConfig' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      page: 1,
      size: 10,
      visible: false, // 新增抽屉控制显隐
      disabled: false, // 新增只读控制
      // 配置可输入图片内容
      customConfig: {
        uploadImgShowBase64: true
      },
      newFlag: '',
      fileList: [],
      addressmodel: [],
      nowData: {}
    }
  },
  activated () {
    // 初始化数据
    this.initData()
  },
  methods: {
    setaddress () {
      this.messageForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 初始化数据
    async initData () {
      this.disabled = false
      this.newFlag = ''
      this.nowData = {}
      this.yesNoList = await this.getDictionaries('YESNO')
    },
    adsvalchange () { },
    // title name
    getTitle (val) {
      let title = ''
      switch (val) {
        case 'see':
          title = '查看'
          break
        case 'add':
          title = '新增'
          break
        case 'edit':
          title = '编辑'
          break
      }
      return title
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        const idx = formData.address_Linkage.length - 1
        formData.areaId = formData.address_Linkage[idx]
        delete formData.address_Linkage
      }
      return formData
    },
    // 新增
    add () {
      this.newFlag = 'add'
      this.disabled = false
      this.visible = true
      this.$nextTick(() => {
        this.messageForm.resetFields()
      })
    },
    // 查看
    see (e) {
      this.nowData = e
      this.newFlag = 'see'
      this.disabled = false
      this.visible = true
      this.addressmodel = [e.areaId]
      this.$nextTick(() => {
        this.messageForm.setFieldsValue(e)
        this.setaddress()
        this.disabled = true
      })
    },
    // 查看
    edit (e) {
      this.nowData = e
      this.newFlag = 'edit'
      this.disabled = false
      this.visible = true
      this.addressmodel = [e.areaId]
      this.$nextTick(() => {
        this.messageForm.setFieldsValue(e)
        this.setaddress()
        this.disabled = false
      })
    },
    // 新增-取消
    back () {
      this.messageForm.resetFields()
      this.visible = false
      this.handleSubmit('search')
    },
    // 推送提交
    submit (val) {
      let url = '/announcements/saveSystemUpgradeMsg'
      if (this.newFlag == 'edit') {
        url = '/superventionApplyConfigApi/update'
      }
      this.messageForm.validateFields((err, values) => {
        if (!err) {
          const formData = this.messageForm.getFieldsValue()
          if (this.newFlag == 'edit') {
            formData.id = this.nowData.id
          }
          this.post(url, formData, true).then((res) => {
            if (res.serviceSuccess) {
              this.$message.success('数据提交成功')
              this.back()
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 分页change
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
