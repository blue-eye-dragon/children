<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' }">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <AddressComponent :fileldName="'area'"
                                  :msg="'通讯地址'"
                                  :isRequire="false"
                                  :labelwidth="{label: 9,wrapper: 15}"
                                  class="spilwid"
                                  :addressmodel="addressmodel"
                                  @setaddress="setaddress"></AddressComponent>
                <ta-form-item label="资源类型"
                              fieldDecoratorId="resourceType"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid">
                  <ta-select placeholder="请选择资源类型"
                             style="width: 100%;">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item ,index) in resourceTypeList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="资源名称"
                              fieldDecoratorId="resourceName"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid">
                  <ta-input placeholder="请输入资源名称" />
                </ta-form-item>
                <ta-form-item label="资源总量"
                              fieldDecoratorId="resourceTotal"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid1">
                  <ta-input-group compact>
                    <ta-input-number style=" width: 90px; text-align: center"
                                     placeholder=""
                                     :min=0
                                     v-model="minVal"
                                     @blur="compareData('minVal')" />
                    <ta-input style=" width: 31px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                              placeholder="~"
                              disabled />
                    <ta-input-number style="width: 90px; text-align: center; border-left: 0"
                                     placeholder=""
                                     :min=0
                                     v-model="maxVal"
                                     @blur="compareData('maxVal')" />
                  </ta-input-group>
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="getlist">查询</ta-button>
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
      </div>
      <div style="margin-top: 16px;"></div>
      <ta-list :grid="{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4}"
               :dataSource="mixDataList">
        <ta-list-item slot="renderItem"
                      slot-scope="item, index">
          <ta-card hoverable
                   style="width: 240px;">
            <img alt="example"
                 v-bind:src="item.filePathVos"
                 slot="cover"
                 style="height: 200px;" />
            <ta-card-meta title="">
              <template slot="description">
                <span :title="item.area"
                      class="title">通讯地址：{{item.area}}</span><br />
                <span :title="item.resourceName"
                      class="title">资源名称：{{item.resourceName}}</span><br />
                <span :title="item.resourceType"
                      class="title">资源类型：{{item.resourceType}}</span><br />
                <span :title="item.resourceTotal">资源总量：{{item.resourceTotal}}</span><br />
                <span :title="item.releaseTime">发布时间：{{item.releaseTime}}</span><br />
                <a @click="lookDetail(item)">查看详情</a>
                <ta-popconfirm title="你确定删除本条数据吗?"
                               @confirm="deleteDatas(item)"
                               okText="确定"
                               cancelText="取消"
                               v-if="item.mark=='true'">
                  <a style="margin-left: 5%;">删除</a>
                </ta-popconfirm>

              </template>
            </ta-card-meta>
          </ta-card>
        </ta-list-item>
      </ta-list>

    </ta-border-layout>
  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'

export default {
  components: {
    AddressComponent
  },
  mixins: [listMixin],
  data () {
    return {
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/socialCareService/releaseResourceList', // 数据列表接口，API地址
        mixGetDataListIsPage: false // 数据列表接口，是否需要分页？
      },
      ishide: true,
      addressmodel: [],

      minVal: null,
      maxVal: null,
      issearch: false,

      resourceTypeList: [] // 资源类型字典数据

    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  filters: {
    filterA: function (value, type) {
      let len = 0
      if (type == 'string' && typeof value == 'string') {
        len = value.replace(/[\u0391-\uFFE5]/g, 'aa').length // 先把中文替换成两个字节的英文，在计算长度
        if (len > 7) {
          return value.substring(0, 7) + '...'
        }
      } else if (type == 'num') {
        len = value.length
        if (len > 7) {
          return value.substring(0, 7) + '...'
        }
      } else if (type == 'date') {
        if (len > 10) {
          return value.substring(0, 10)
        }
      }

      return value
    }
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 字典数据获取
    getMenuDatas () {
      this.getMenu('RESOURCE_TYPE', 'resourceTypeList') // 获取资源类型字典数据
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
    // 比较数据大小
    compareData (e) {
      let minVal = this.minVal
      let maxVal = this.maxVal
      if (typeof minVal == 'number' && typeof maxVal == 'number' && minVal > maxVal) {
        this.$message.warn('初始值不能大于结束值！')
        this[e] = null
      }
    },
    // 重置
    resetFrom () {
      this.searchForm.resetFields()
      this.maxVal = null
      this.minVal = null
      this.getlist()
    },
    // 读取列表 无分页形式
    async getlist () {
      let formData = this.searchForm.getFieldsValue()
      delete formData.resourceTotal
      if (this.minVal) {
        formData['resourceTotalStart'] = this.minVal
      }
      if (this.maxVal) {
        formData['resourceTotalEnd'] = this.maxVal
      }
      if (formData.area && formData.area.length > 0) {
        formData['areaCode'] = formData.area.slice(-1).toString()
        delete formData.area
      }

      let res = await this.post(this.mixListOptions.mixGetDataListURL, formData)
      if (res.serviceSuccess) {
        let { list } = res.data.pageBean
        for (var i = 0; i < list.length; i++) {
          list[i].filePathVos = window.faceConfig.basePath + '/file/getFileFromDfs/' + list[i].filePathVos
          //   await this.post('/file/getFileUrls', { returnFileIds: list[i].filePathVos }).then(res => {
          //     if (res.serviceSuccess) {
          //       if (res.data.fileUrlList[0]) {
          //         list[i].filePathVos = window.faceConfig.basePath + res.data.fileUrlList[0]
          //       } else {
          //         list[i].filePathVos = '../../../../../../../static/img/defaultNoImg.jpg'
          //       }
          //     }
          //   })
        }
        this.mixDataList = list
      }
    },
    // 设置地址
    setaddress () {
      this.searchForm.setFieldsValue({
        area: this.addressmodel
      })
    },
    // 查看详情
    lookDetail (e) {
      this.$router.push({
        name: 'publishResources',
        query: { flag: 'query', id: e.id }
      })
    },
    // 删除
    deleteDatas (e) {
      this.post('/socialCareService/resourceDelete', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('数据删除成功！')
          this.getlist()
        }
      })
    }

  }

}
</script>
<style scoped lang="less">
.title {
  width: 180px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.title :hover {
  text-overflow: inherit;
  overflow: visible;
}
</style>
