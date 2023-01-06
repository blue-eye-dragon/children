<!--
 * @Date: 2021-06-15 17:20:59
 * @information: 跨省通办材料说明查询
-->
<template>
  <div id="across-province-file-explain-query"
       class="conts">
    <div class="container file-explain-top">
      <acrossTag :tagList="tagListProvince"
                 @onClickTag="onClickTagProvince"></acrossTag>

      <ta-divider dashed />

      <acrossTag :tagList="tagListCity"
                 @onClickTag="onClickTagCity"></acrossTag>
    </div>

    <div class="container file-explain-bottom"
         v-show="Object.keys(explainDataObj).length">
      <div class="title-box">
        <div class="left-con">
          <div :class="['title', {'title--active': activeTab==1}]"
               @click="onChangeTab(1)">孤儿相关证明材料</div>
          <div :class="['title', {'title--active': activeTab==2}]"
               @click="onChangeTab(2)">事实无人抚养儿童相关证明材料</div>
        </div>
        <div class="right-con">
          <ta-button type="primary"
                     :disabled="!isShowPrintBtn"
                     @click="onPrint">打印</ta-button>
        </div>
      </div>

      <div class="content-box">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <div v-show="activeTab==1">
            <ta-form-item label="孤儿相关证明材料"
                          fieldDecoratorId="orphanMaterial"
                          :disabled="true"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }">
              <ta-textarea placeholder=""
                           :rows="12" />
            </ta-form-item>

            <!-- 附件 -->
            <ta-form-item label="附件"
                          fieldDecoratorId="file"
                          class=""
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }">
              <div class="form-item-file">
                <div class="files">
                  <ta-upload :withCredentials="true"
                             :multiple="true"
                             name="file"
                             :action="action"
                             :data="{}"
                             :fileList="syCardFileList"
                             :disabled="true"
                             @preview="handlePreview">
                    <div style="position: relative;top: 8px;">
                      {{!syCardFileList || !syCardFileList.length ? '暂无' : ''}}
                      <!-- <ta-button :disabled="true">
                      <ta-icon type="upload" />上传
                    </ta-button> -->
                    </div>
                  </ta-upload>
                </div>
                <!-- <p class="warntext">
                <ta-icon type="info-circle-o"
                         class="icons" />上传附件说明：上传附件支持doc、docx、ofd、pdf格式，单个文件大小不能超过10M.
              </p> -->
              </div>
            </ta-form-item>
          </div>

          <div v-show="activeTab==2">
            <ta-form-item label="事实无人抚养儿童相关证明材料"
                          fieldDecoratorId="factMaterial"
                          :disabled="true"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 20 }">
              <ta-textarea placeholder=""
                           :rows="12" />
            </ta-form-item>

            <!-- 附件 -->
            <ta-form-item label="附件"
                          fieldDecoratorId="file2"
                          class=""
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }">
              <div class="form-item-file">
                <div class="files">
                  <ta-upload :withCredentials="true"
                             :multiple="true"
                             name="file2"
                             :action="action"
                             :data="{}"
                             :fileList="syCardFileList2"
                             :disabled="true"
                             @preview="handlePreview">
                    <div style="position: relative;top: 8px;">
                      {{!syCardFileList2 || !syCardFileList2.length ? '暂无' : ''}}
                      <!-- <ta-button :disabled="true">
                      <ta-icon type="upload" />上传
                    </ta-button> -->
                    </div>
                  </ta-upload>
                </div>
                <!-- <p class="warntext">
                <ta-icon type="info-circle-o"
                         class="icons" />上传附件说明：上传附件支持doc、docx、ofd、pdf格式，单个文件大小不能超过10M.
              </p> -->
              </div>
            </ta-form-item>
          </div>

        </ta-form>
      </div>

    </div>

    <div v-show="!Object.keys(explainDataObj).length"
         class="container file-explain-bottom--empty">{{emptyText || tipTextArr[0]}}</div>
  </div>
</template>

<script>
import acrossTag from './components/acrossTag.vue'

export default {
  components: {
    acrossTag
  },
  data () {
    return {
      activeTab: 1, // 当前tab所在位置（1孤儿，2事实）
      // 省级列表
      tagListProvince: [],
      // 市级列表
      tagListCity: [],
      // 特殊省市级别区域（主要是省级，但只需一级单位）：北京，天津，上海，重庆，台湾省，香港特区，澳门特区
      specialAreaLenvalArr: ['110000000000', '120000000000', '310000000000', '500000000000', '7100000000000733500', '8100000000000733503', '8200000000000733504'],
      // 暂不支持该功能(不请求接口) 新疆，新疆兵团
      notSupportExplainArr: ['650000000000', '659900000000'],
      isShowPrintBtn: false, // 是否显示打印按钮
      explainDataObj: {}, // 说明材料对象
      // 提示文字类别
      tipTextArr: ['请选择查看的省份/市区！', '该省份/市区未上传“跨省通办”证明材料说明信息！', '系统尚未联通'],
      emptyText: '', // 空时提示文字
      syCardFileList: [], // 已经上传的文件列表 - 孤儿
      syCardFileList2: [], // 已经上传的文件列表 - 事实

    }
  },
  computed: {
    // 文件上传地址
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () { },
  async activated () {
    this.clearData()
    await this.fetchAreaDic({ dicName: 'tagListProvince' })
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 10:38:39
     * @information: 打印
     */
    onPrint () {
      if (!Object.keys(this.explainDataObj).length) {
        this.$message.warning(`当前区域暂无材料说明`)
        return;
      }
      let { id } = this.explainDataObj
      let url = `${window.faceConfig.basePath}/proveMaterialExplainManagement/printProveMaterialExplain`
      let title = '跨省通办证明材料说明'
      const openUrl = `static/print.html?src=${url}?id=${id}&type=${this.activeTab}&titile=${title}`
      window.open(encodeURI(openUrl))
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 10:53:57
     * @information: 切换tab
     */
    onChangeTab (val) {
      if (this.activeTab == val) return;
      this.activeTab = val
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 13:37:26
     * @information: 省级被点击
     */
    async onClickTagProvince (item) {
      let { areaid } = item
      // 选中与取消选
      this.tagListProvince.forEach(el => {
        el.isActive = el.areaid == areaid
      })
      this.isShowPrintBtn = false
      this.explainDataObj = {}
      // 点击的是特殊级别
      if (this.specialAreaLenvalArr.includes(areaid)) {
        this.tagListCity = []
        this.assignmentTipText(0)
        await this.fetchExplain(areaid)
      } else if (this.notSupportExplainArr.includes(areaid)) {
        this.tagListCity = []
        this.$message.warning(this.tipTextArr[2])
        this.assignmentTipText(2)
      } else {
        this.assignmentTipText(0)
        // 加载字典
        this.fetchAreaDic({ parentId: areaid, dicName: 'tagListCity' })
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 13:37:29
     * @information: 市级被点击
     */
    async onClickTagCity (item) {
      let { areaid } = item
      // 选中与取消选
      this.tagListCity.forEach(el => {
        el.isActive = el.areaid == areaid
      })
      await this.fetchExplain(areaid)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 13:43:08
     * @information: 加载区域字典
     */
    async fetchAreaDic ({ parentId, dicName }) {
      let res = await this.post('/zoning/queryStatistics', { parentId })
      let { data } = res.data
      // 过滤虚拟省节点
      const filterAreaIdArr = ['1100000000002839311', '1000000000000272394']
      data = data.filter(el => !filterAreaIdArr.includes(el.areaid))
      // 处理数据并赋值
      this[dicName] = this.handleData(data)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 13:48:14
     * @information: 处理数据
     */
    handleData (list) {
      return list.map(el => ({
        isActive: false,
        ...el
      }))
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 15:31:23
     * @information: 加载说明
     */
    async fetchExplain (areaid) {
      let res = await this.post(`/proveMaterialExplainManagement/queryProveMaterialExplain`, { areaid })
      let { data } = res.data
      if (data && Object.keys(data).length) { // 若有数据
        this.explainDataObj = data
        let { orphanMaterial, factMaterial } = data
        this.form.setFieldsValue({ orphanMaterial, factMaterial })
        // 赋值文件
        let { fileList } = data
        // 先初始化
        this.syCardFileList = []
        this.syCardFileList2 = []
        if (fileList && fileList.length) {
          fileList.forEach(el => {
            if (el.busiType == '1') {
              this.syCardFileList.push(el)
            }
            if (el.busiType == '2') {
              this.syCardFileList2.push(el)
            }
          })
        }
        this.isShowPrintBtn = true
      } else { // 无数据
        this.isShowPrintBtn = false
        this.explainDataObj = {}
        this.assignmentTipText(1)
        this.syCardFileList = []
        this.syCardFileList2 = []
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 15:21:04
     * @information: 还原数据
     */
    clearData () {
      // this.form.resetFields()
      this.assignmentTipText(0)
      this.activeTab = 1
      this.tagListCity = []
      this.isShowPrintBtn = false
      this.explainDataObj = {}
      this.emptyText = ''
      this.syCardFileList = []
      this.syCardFileList2 = []
    },
    /**
     * @author: 殷鹏飞
     * @Date: 2021-06-17 11:37:11
     * @information: 赋值提示文字
     */
    assignmentTipText (val) {
      const text = this.emptyText = this.tipTextArr[val]
      this.form.setFieldsValue({
        orphanMaterial: `(${text})`,
        factMaterial: `(${text})`
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 20:09:24
     * @information: 附件预览
     */
    handlePreview (file) {
      this.downloadFile(file)
    },
  }
}
</script>

<style lang="less">
#across-province-file-explain-query {
  min-height: 100vh;
  padding: 15px 15px 50px 15px;
  display: flex;
  flex-direction: column;

  .container {
    width: 100%;
    height: 100%;
    padding: 25px;
    background-color: #fff;
  }

  .file-explain-top {
    margin-bottom: 20px;
  }

  .file-explain-bottom {
    flex: 1 1 auto;

    .title-box {
      margin-bottom: 50px;
      border-bottom: 1px solid #1890ff;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      transition: all ease 0.5s;

      .left-con {
        display: flex;

        .title {
          padding: 10px;
          transition: all ease 0.5s;
          &:hover {
            cursor: pointer;
          }
          &:not(.title--active):hover {
            color: #1890ff;
          }
          &:first-child {
            margin-right: 10px;
          }
        }

        .title--active {
          background-color: #1890ff;
          color: #fff;
          transition: all ease 0.5s;
        }
      }

      .right-con {
        line-height: 44px;
      }
    }
  }

  .file-explain-bottom--empty {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }

  .ant-upload-list-item-info {
    position: relative;
    bottom: 22px;
  }
}
</style>

