<template>
  <!-- 消息list   -->

  <div class="searchdata tadrawer">

    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
                      <ta-user-select id="asynchronous"
                    :props="defaultProps"
                    :user-list-data="userListData"
                    :is-show="isShow" @close="isShow = false" @queryUserList="fnQueryUserList" @getUserListResult="fnGetUserListResult"
                    :load="loadNode" :pagination="true"
    ></ta-user-select>

      <div>

        <ta-form layout="inline"
                 :forceRender="true"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

   <ta-button @click="isShow = true">点击打开用户选择组件</ta-button>
<!--
          <ta-form-item label=""
                        fieldDecoratorId="name"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">

            <ta-button class="btnleft"
                       @click="goMessage">选择人员</ta-button>

          </ta-form-item> -->

          <ta-form-item label=""
                        fieldDecoratorId="name"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">

            <ta-input placeholder="请输入姓名" />

          </ta-form-item>

          <!-- <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">

            <ta-input placeholder="请输入姓名" />

          </ta-form-item>

          <ta-form-item label="日期"
                        fieldDecoratorId="time"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">

            <ta-range-picker />

          </ta-form-item> -->

          <!-- <ta-form-item label=""
                        fieldDecoratorId="conten"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <div style="width: 700px">
              <ta-rich-editor :config="config"
                              ref="richEditor"
                              :disabled="disabled"
                              style="height:400px;max-height:500px;" />
            </div>
          </ta-form-item> -->

          <!-- <ta-form-item label="证件号码"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">

            <ta-input placeholder="请输入证件号码" />

          </ta-form-item> -->

          <!-- <ta-form-item label="儿童类型"
                        fieldDecoratorId="childType"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
 <ta-select allowClear

                     :placeholder=" '请选择儿童类型'">

            <ta-select-option v-for="item in childTypeList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>

          </ta-form-item> -->

          <ta-form-item>

            <ta-button class="btnleft"
                       @click="goMessage">发送消息</ta-button>

          </ta-form-item>

        </ta-form>

      </div>

    </ta-border-layout>

  </div>
</template>
<script>

import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'

export default {

  data () {
    return {
      sexList: [],
      config: {
        fontsizes: {
          1: '10px',
          2: '13px',
          3: '16px',
          4: '19px',
          5: '22px',
          6: '25px',
          7: '28px'
        }
      },
      disabled: false,

      isShow: false,
      defaultProps: {
        treeNodeKey: 'value',
        treeLabel: 'label',
        // treeChildren: 'children',
        treeIsLeaf: 'leaf',
        listKey: 'user',
        listTitle: 'name'
        // listSubTitle: 'mobile',
        // listDescription: 'namePath'
      },
      userListData: []

    }
  },
  mounted () {
    // let nowDates = new Date()
    // this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    // this.getsexList()
    // this.userId = window.parent.indexTool.getUserInfo().userId
  },
  activated () {

  },
  methods: {
    goMessage () { // 发送消息

    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ label: '久远银海', value: 1 }])
      }
      if (node.level > 1) return resolve([])

      setTimeout(() => {
        const data = [{
          label: '研发中心',
          value: 2,
          leaf: true
        }, {
          label: '创新中心',
          value: 3
        }]
        resolve(data)
      }, 500)
    },
    fnQueryUserList (nodeKey, includeChild, pageNum) {
      const arr = []
      for (let i = 0; i < 10; i++) {
        arr.push({ user: nodeKey + '-' + pageNum + '-' + i, name: '张' + nodeKey + '-' + pageNum + '-' + i, sex: i % 3, namePath: '顶级组织/研发中心', mobile: '13111223344' })
      }
      this.userListData = arr
    },
    fnGetUserListResult (val) {
      console.log(val)
    },

    // 性别字典
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
    }

  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}

.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
