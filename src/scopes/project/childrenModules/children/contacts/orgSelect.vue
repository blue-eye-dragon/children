
<template>
  <div id="components-layout-demo-basic"
       class="body">
    <ta-layout>
      <ta-layout-sider>
        <div class="siderdiv">
          <div>
            <ta-e-tree :load="loadNode"
                       highlight-current
                       :props="defaultProps"
                       node-key="orgId"
                       tree-node-id="parentId"
                       @node-click="click"
                       lazy />
          </div>
        </div>
      </ta-layout-sider>
      <ta-layout>
        <ta-layout-header style="  height: 50px; ">
          <div style="float: right;position: relative;top: -15px;right: -56px;">
            <ta-checkbox :indeterminate="indeterminate"
                         @change="onCheckAllChange"
                         :checked="checkAll">
              <span style="  font-size: 17px; "> 全部选中</span>
            </ta-checkbox>
          </div>
          <span class="cj">层级</span>
          <ta-select allowClear
                     :placeholder="''"
                     class="sel"
                     @change="getOrglevel">
            <ta-select-option v-for="item in orgLevelList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
          <span class="cj">类别</span>
          <ta-select allowClear
                     :placeholder="''"
                     class="sel"
                     @change="getorgType">
            <ta-select-option v-for="item in orgTypeList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
          <span class="cj">名称</span>
          <ta-input ref="mc"
                    class="sel" />
          <ta-button class="selb"
                     @click="goQuery">查询</ta-button>
        </ta-layout-header>
        <ta-divider />
        <ta-layout-content class="layoutHeight">
          <template>
            <div>
              <ta-checkbox-group :options="plainOptions"
                                 @change="onChange"
                                 style="float:left;"
                                 :value="checkedList" />

            </div>
          </template>

        </ta-layout-content>
        <ta-divider />
        <ta-layout-footer>
          <div>
            <ul id="abc">

              <span v-for="(item,index) in downList"
                    :key="index"
                    @click="choosePay(index)"
                    :class="index%2==0?'spanItem':'spanItem2'"> {{item.orgName}} </span>
            </ul>
          </div>

        </ta-layout-footer>
        <ta-button @click="getGoBack"
                   style="float: right;width: 80px;position: relative;left: 90%;"
                   type='primary'>确定</ta-button>
      </ta-layout>

    </ta-layout>
  </div>
</template>

<script>
import { get } from 'http'
import { updateLocale } from 'moment'
import $ from 'jquery'
export default {
  props: {
    thisP: {
      required: true
    },
    downListGo: {
      required: true,
      default: []
    }

  },
  data () {
    return {
      showUpdate: -1,
      defaultProps: {
        label: 'orgName', // 指定json数组中，当前节点在页面上显示的文本的key，默认：label
        id: 'orgId', // 指定json数组中节点的唯一标识，默认：id，必须与node-key属性指定的值一致
        isLeaf: 'isLeaf' // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
      },
      visible: false,
      sexList: [],
      cultureList: [],
      ksList: [],
      disabled: true,
      userOrgId: '',
      orgIdNow: '',

      indeterminate: false, // 半选初始状态
      checkAll: false, // 全选初始状态
      plainOptions: [], // checkboxgroup数据
      checkedList: [], // 选中的数组
      resultCheckedList: [],
      AllOrg: [],
      downList: [],
      asyncData: [],
      orgLevelList: [],
      orgTypeList: [],
      orgLevel: '',
      orgType: '',
      idPath: ''

    }
  },
  mounted () {
    if (this.downListGo) {
      this.downList = this.downListGo
      this.downList.forEach(e => {
        this.checkedList.push(e.orgId)
      })
    }
    this.getDic()
  },
  methods: {

    getGoBack () {
      this.thisP.backOrgData(this.downList)
      this.thisP.visible = false
    },
    async goQuery () {
      let param = {
        orgLevel: this.orgLevel,
        idPath: this.idPath,
        orgType: this.orgType,
        orgName: this.$refs.mc.stateValue
      }

      let res = await this.post('/announcements/queryOrgByOrgVo', param)
      this.AllOrg = res.data.data
      this.$nextTick(() => {
        this.plainOptions = []
        res.data.data.forEach((e, i) => {
          var obj = {}
          obj.value = e.orgId
          obj.label = e.orgName
          this.plainOptions.push(obj)
        })
      })
    },
    getOrglevel (v) {
      this.orgLevel = v
    },
    getorgType (v) {
      this.orgType = v
    },
    async getDic () {
      this.orgLevelList = await this.getDictionaries('ORGLEVEL')// 层级c
      this.orgTypeList = await this.getDictionaries('ORGSORT')// 分类
    },
    choosePay (index) {
      this.downList.splice(index, 1)
      this.checkedList.splice(index, 1)
    },

    onChange (checkedList) {
      // alert(1)
      // console.log(this.checkedList)
      // console.log(checkedList)
      this.checkedList = checkedList

      let cont = 0
      this.plainOptions.forEach(v => {
        this.checkedList.forEach(d => {
          if (v.value == d) {
            cont += 1
          }
        })
      })
      if (cont == this.plainOptions.length) {
        this.checkAll = true
        this.indeterminate = false
      } else if (cont > 0) {
        this.checkAll = false
        this.indeterminate = true
      } else {
        this.checkAll = false
        this.indeterminate = false
      }

      let downList = []

      // console.log('this.AllOrg is ' + this.AllOrg)
      // console.log('checkedList is ' + checkedList)
      checkedList.forEach(e => {
        this.AllOrg.forEach(b => {
          if (e == b.orgId) {
            downList.push(b)
          }
        })
      })
      this.downList = downList
    },

    onCheckAllChange (e) {
      let isChecked = e.target.checked
      if (isChecked) { // 全选
        this.checkAll = true
        this.plainOptions.forEach(e => {
          if (this.checkedList.indexOf(e.value) == -1) {
            this.checkedList.push(e.value)
          }
        })
      } else { // 反选
        this.checkAll = false
        this.plainOptions.forEach(e => {
          if (this.checkedList.indexOf(e.value) != -1) {
            this.checkedList = this.checkedList.filter(item => item != e.value)
          }
        })
      }
      let downList = []
      this.checkedList.forEach(e => {
        this.AllOrg.forEach(b => {
          if (e == b.orgId) {
            downList.push(b)
          }
        })
      })
      this.downList = downList
      console.log('全选:', this.checkedList)
      this.indeterminate = false
    },

    async click (data, node, self) {
      this.orgIdNow = data.orgId
      let param = { parentId: node.data.orgId }
      this.idPath = node.data.idPath
      this.post('/announcements/queryOrgByOrgVo', param).then(result => {
        this.AllOrg = result.data.data
        const treeData = result.data.data
        this.asyncData = treeData
        this.$nextTick(() => {
          this.plainOptions = []
          treeData.forEach((e, i) => {
            var obj = {}
            obj.value = e.orgId
            obj.label = e.orgName
            this.plainOptions.push(obj)
          })
          let cont = 0
          this.plainOptions.forEach(v => {
            this.checkedList.forEach(d => {
              if (v.value == d) {
                cont += 1
              }
            })
          })
          if (cont == this.plainOptions.length) {
            this.checkAll = true
            this.indeterminate = false
          } else if (cont > 0) {
            this.checkAll = false
            this.indeterminate = true
          } else {
            this.checkAll = false
            this.indeterminate = false
          }
        })
      })
    },
    // 加载子节点方法
    loadNode (node, resolve) {
      let param = {}
      console.log(node)
      if (node.data) {
        param = { parentId: node.data.orgId }
      } else {
        param = { orgId: window.parent.indexTool.getUserInfo().orgId }
      }
      this.post('/announcements/queryOrgByOrgVo', param).then(result => {
        const treeData = result.data.data
        this.AllOrg = result.data.data
        resolve(treeData)
        this.$nextTick(() => {
          this.plainOptions = []
          treeData.forEach((e, i) => {
            var obj = {}
            obj.value = e.orgId
            obj.label = e.orgName
            this.plainOptions.push(obj)
          })
        })
      })
    }

  }
}
</script>
<style>
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(24, 144, 255, 0.2);
}
#components-layout-demo-basic .ant-layout-sider-children {
  height: 100%;
  padding-top: 20px;
}
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic > .ant-layout:last-child {
  background: #ffffff;
  /* height: auto; */
  height: 100%;
  margin-top: 10px;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #ffffff;
  color: #fff;
  height: 88px;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
  height: 80px;
  overflow: auto;
  scrollbar-color: #899893 #d6d6d612;
  scrollbar-width: thin;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #ffffff;
  color: #fff;
  line-height: 100%;
  margin-right: 2px;
  flex: 0 0 auto !important;
  max-width: 600px !important;
  min-width: 300px !important;
  width: auto !important;
  overflow: auto !important;
  padding-right: 1%;
  border: 1px solid lightgray;
  scrollbar-color: #899893 #d6d6d612;
  scrollbar-width: thin;
}
#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
  color: #fff;
  /* min-height: 120px; */
  line-height: 100%;
  height: 100px;
  overflow: auto;
  scrollbar-color: #899893 #d6d6d612;
  scrollbar-width: thin;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.body {
  width: 100%;
  height: 100%;
}
.visitright {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.searchbtn {
  width: 282px;
  position: absolute;
  right: 0;
  transform: translate(0, 23%);
}
.el-tree-node__label {
  font-size: 16px;
}
.formright {
  float: left;
  position: absolute;
  transform: translate(0, 60%);
}
.siderdiv {
  margin-top: 0px;
  height: 100%;
}

.ant-modal-content {
  position: relative;
  height: 70%;
}
.modal {
  width: 800px !important;
  height: 630px;
}
.cj {
  color: black;
  top: -13px;
  margin: 6px;
  font-size: 17px;
  position: relative;
}
.sel {
  top: -15px;
  width: 137px;
}
.selb {
  top: -16px;
  width: 63px;
  right: -3%;
}
.ant-modal-body {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  height: 430px;
}

.ant-checkbox-group-item {
  display: inline-block;
  margin: 8px;
  float: left;
  font-size: 16px;
}
.ant-checkbox-group-item + .ant-checkbox-group-item,
.ant-row {
  margin-left: 8px;
}
.ant-layout-footer {
  background: #e4e4e4;
  padding: 0;
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  overflow: auto;
  scrollbar-color: #899893 #d6d6d612;
  scrollbar-width: thin;
}
.ant-divider-horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 16px 0;
  clear: both;
  background-color: #9bbcc8;
}
.spanItem {
  float: left;
  font-size: 17px;
  margin: 2px;
  background: rgba(101, 152, 229, 0.9);
  color: white;
  border: #4c5e72 0px solid;
  border-radius: 5px;
}
.spanItem:hover {
  float: left;
  font-size: 17px;
  margin: 2px;
  cursor: pointer;
  background: rgb(175, 18, 26);
  color: white;
  border: #4c5e72 0px solid;
  border-radius: 5px;
}
.spanItem2:hover {
  float: left;
  font-size: 17px;
  margin: 2px;
  cursor: pointer;
  background: rgb(175, 18, 26);
  list-style-type: disc;
  color: white;
  border: #4c5e72 0px solid;
  border-radius: 5px;
}
.spanItem2 {
  float: left;
  font-size: 17px;
  margin: 2px;
  background-color: #a8be51;
  color: white;
  border: #4c5e72 0px solid;
  border-radius: 5px;
}
</style>
