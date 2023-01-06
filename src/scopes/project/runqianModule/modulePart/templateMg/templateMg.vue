<template>
  <div class="fit">
    <ta-border-layout :layout="{header:'70px',footer:'70px'}"
                      :centerCfg="{showBar: true, toolBarStyle: {height: '50px', lineHeight: '48px'}}"
                      :footer-cfg="{showBorder: false}">
      <div slot="header"
           class="center-box">
        <ta-input-search v-model="param"
                         placeholder="根据报表标志模糊查询"
                         class="search-box"
                         @search="searchQuery"
                         enterButton="搜索" />
      </div>
      <div slot="centerExtraContent">
        <ta-tag-select title="报表类型"
                       :data="CollectionData('RAQTYPE')"
                       :is-multi="true"
                       v-model="tags"
                       @change="searchQuery"></ta-tag-select>
        <div style="float: right;">
          <ta-button key="delete"
                     @click="fnDelTem">删除</ta-button>
          <ta-button key="add"
                     @click="openAddWin">新增</ta-button>
          <ta-button key="test"
                     @click="testpdf">测试</ta-button>
        </div>
      </div>
      <ta-table bordered
                :columns="columns"
                style="width:100%;"
                :pagination='false'
                :data-source="gridData"
                :rowSelection="{selectedRowKeys: selectedRowKeys,onChange: onSelectChange}">
        <span slot="action"
              slot-scope="text, record">
          <a class="operate"
             @click="openAddClidWin(record)">添加子表</a>
          <a class="operate"
             @click="openEditWin(record)">编辑</a>
          <!--<a class="operate" onclick="fnDownTemplate" >下载</a>-->
          <ta-popconfirm title=""
                         @confirm="confirmDownload(record)"
                         okText="是"
                         cancelText="否">
            <a href="#">下载</a>
          </ta-popconfirm>
        </span>
      </ta-table>
      <div slot="footer">
        <ta-pagination style="float: right; margin-top: 10px;"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="gridData"
                       :params="templatePageParams"
                       url="tarunqianresource/taRunqianResourceRestService/queryRunqianResource"
                       ref="gridPager" />
      </div>
      <add-template :visible="editVisible"
                    :raqType="raqType"
                    :editType="editType"
                    :record="record"
                    @close="closeWin"></add-template>
    </ta-border-layout>
    <div id="downForm"
         style="display: none;"></div>
  </div>
</template>
<script>
import addTemplate from './part/addTemplate'
import faceConfig from 'faceConfig'
import $ from 'jquery'
import $api from './api/index'

const columns = [
  { title: '报表标志', dataIndex: 'raqfilename', width: '15%' },
  { title: '报表名称', dataIndex: 'raqname', width: '15%' },
  { title: '父报表标志', dataIndex: 'parentraqfilename', width: '15%' },
  { title: '报表类型', dataIndex: 'raqtype', width: '15%' },
  { title: '上传人', dataIndex: 'uploador', width: '10%' },
  { title: '上传时间', dataIndex: 'uploadtime', width: '30%', overflowTooltip: true },
  {    title: '操作',
    overflowTooltip: false,
    align: 'center',
    width: '240px',
    scopedSlots: { customRender: 'action' }  }
]
export default {
  components: { addTemplate },
  name: 'templateMg',
  data () {
    return {
      param: '',
      tags: [],
      columns,
      gridData: [],
      editVisible: false,
      editType: '',
      raqType: '',
      record: {},
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  mounted () {
    this.searchQuery()
  },
  methods: {
    // 获取token方法
    getToken () {
      let strCookie = document.cookie// 获取cookie字符串
      let arrCookie = strCookie.split('; ')// 分割
      // 遍历匹配
      let token = ''
      arrCookie.map((value) => {
        if (value.indexOf('XSRF-TOKEN') !== -1) {
          token = value.slice('XSRF-TOKEN'.length + 1)
        }
      })
      return token
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    fnDelTem () {
      if (this.selectedRows.length == 0) {
        this.$message.warning('需要至少选中一条数据')
        return
      }
      let raqfilenames = []
      this.selectedRows.map((item) => { raqfilenames.push(item.raqfilename) })
      $api.delRunqianResource({ raqfilenames: raqfilenames.join(',') }, (result) => {
        this.$message.success('成功删除' + result.data.rows + '条数据')
        this.searchQuery()
        this.selectedRows = []
      })
    },
    closeWin () {
      this.editVisible = false
      this.searchQuery()
    },
    templatePageParams () {
      let pageParam = {}
      pageParam.raqfilename = this.param
      pageParam.raqtype = this.tags
      return pageParam
    },
    searchQuery () {
      this.$refs.gridPager.loadData()
    },
    openAddWin () {
      this.editVisible = true
      this.editType = '1'
      this.raqType = '1'
      this.record = {}
    },
    openEditWin (record) {
      this.editVisible = true
      this.editType = '2'
      this.record = record
      this.raqType = record.raqtype
    },
    openAddClidWin (record) {
      this.editVisible = true
      this.editType = '1'
      this.record = {}
      this.record.parentraqfilename = record.raqfilename
      this.record.parentraqname = record.raqname
      this.raqType = '2'
    },
    confirmDownload (record) {
      let basePath = faceConfig.basePath
      location.href = basePath + '/tarunqianresource/taRunqianResourceRestService/downloadRunqianResource?raqfilename=' + record.raqfilename +
        '&_modulePartId_=' + Base.getNowPageParam()._modulePartId_ +
        '&X-XSRF-TOKEN=' + this.getToken()
    },
    testpdf () {
      let basePath = faceConfig.basePath
      let url = basePath + '/testrunqian/exportaspdf'

      var param = {}
      param['_modulePartId_'] = Base.getNowPageParam()._modulePartId_
      param['X-XSRF-TOKEN'] = this.getToken()
      var paramstr = ''
      for (var p in param) {
        paramstr += "<input type='hidden' name='" + p + "' value='" + param[p] + "'/>"
      }

      var formStr = ''
      formStr = '<form style="visibility:hidden;" method="POST" action="' + url + '" accept-charset="UTF-8">' + paramstr + '</form>'
      var newWin = window.open()
      if (undefined != newWin) {
        newWin.document.body.innerHTML = formStr
        newWin.document.forms[0].submit()
      } else {
        alert('浏览器拦截了弹出窗口，请在右上角选择始终允许弹出窗口后重试', 'error')
        return
      }
      return newWin
    }
  }
}
</script>
<style lang="less" scoped type="text/less">
.search-box {
  width: 340px;
  line-height: 42px;
}
.center-box {
  text-align: center;
}
.disable-color {
  color: $text-l3-color;
  &:hover {
    color: $text-l3-color;
  }
}
</style>
