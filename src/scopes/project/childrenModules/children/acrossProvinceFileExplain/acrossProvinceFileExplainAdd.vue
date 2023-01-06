<!--
 * @Date: 2021-06-15 17:20:52
 * @information: 跨省通办材料说明新增
-->
<template>
  <div id="across-province-file-explain-add"
       class="conts"
       v-show="isLoaded">

    <!-- 编辑时 -->
    <div class="container"
         v-show="isHadData && !isShowList">
      <div class="contin">

        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">

          <AddressComponent :addressmodel="addressmodel"
                            :msg="'所属区域'"
                            :changeOnSelect="true"
                            arealevel="4"
                            :labelwidth="{label: 3, wrapper: 12}"
                            :isRequire="false"
                            fileldName='belongArea'
                            :disabled="isDisabledArea"
                            :loadLeafLevel="2"
                            @setaddress="setaddress"
                            @adsvalchange="adsvalchange"></AddressComponent>

          <!-- tab -->
          <div class="title-box">
            <div class="left-con">
              <div :class="['title', {'title--active': activeTab==1}]"
                   @click="onChangeTab(1)">孤儿相关证明材料</div>
              <div :class="['title', {'title--active': activeTab==2}]"
                   @click="onChangeTab(2)">事实无人抚养儿童相关证明材料</div>
            </div>
          </div>

          <div v-show="activeTab==1">
            <ta-form-item label="孤儿相关证明材料"
                          fieldDecoratorId="orphanMaterial"
                          class="form-item-orphanMaterial"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          :disabled="isDiabledForm"
                          :fieldDecoratorOptions="verificationRules('孤儿相关证明材料',3000,true)">
              <ta-textarea placeholder="请输入“跨省通办”孤儿救助资格认定所需证明材料说明，为便于受理地识别查看，输入格式如右侧示例。"
                           :rows="20"
                           key="input1" />
              <div class="tiptext">
                示例如下： <br />
                一、孤儿身份证明材料： <br />
                1.孤儿本人户口本。 <br />
                2.孤儿本人身份证。 <br />
                二、父母相关证明材料： <br />
                1.父母双方户口本或身份证、结婚证或离婚证。 <br />
                2.公安机关出具的孤儿父母死亡证明。 <br />
                ......
              </div>
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
                             :data="syCardData"
                             :fileList="syCardFileList"
                             @preview="handlePreview"
                             :beforeUpload="beforeUpload"
                             key="file1"
                             @change="syCardHandleChange">
                    <div>
                      <ta-button :disabled="isDiabledForm">
                        <ta-icon type="upload" />上传
                      </ta-button>
                    </div>
                  </ta-upload>
                </div>
                <p class="warntext">
                  <ta-icon type="info-circle-o"
                           class="icons" />上传附件说明：上传附件支持doc、docx、ofd、pdf格式，单个文件大小不能超过10M.
                </p>
              </div>
            </ta-form-item>
          </div>

          <div v-show="activeTab==2">
            <ta-form-item label="事实无人抚养儿童相关证明材料"
                          fieldDecoratorId="factMaterial"
                          class="form-item-factMaterial"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          :disabled="isDiabledForm"
                          :fieldDecoratorOptions="verificationRules('事实无人抚养儿童相关证明材料',3000,true)">
              <ta-textarea placeholder="请输入“跨省通办”事实无人抚养儿童认定所需证明材料说明，为便于受理地识别查看，输入格式如右侧示例。"
                           :rows="20"
                           key="input2" />
              <div class="tiptext">
                示例如下：<br />
                一、事实无人抚养儿童身份证明材料：<br />
                1.事实无人抚养儿童本人户口本。<br />
                2.事实无人抚养儿童本人身份证。<br />
                二、父母相关证明材料：<br />
                1.父母双方户口本或身份证、结婚证或离婚证。<br />
                2.公安、法院出具的事实无人抚养儿童父母死亡、服刑在押（六个月以上）、强制隔离戒毒、被撤销监护资格、被（驱逐）出镜、被执行其他限制人身自由措施的证明和判书。<br />
                ......
              </div>
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
                             name="file"
                             :action="action"
                             :data="syCardData2"
                             :fileList="syCardFileList2"
                             @preview="handlePreview"
                             :beforeUpload="beforeUpload"
                             key="file2"
                             @change="syCardHandleChange2">
                    <div>
                      <ta-button :disabled="isDiabledForm">
                        <ta-icon type="upload" />上传
                      </ta-button>
                    </div>
                  </ta-upload>
                </div>
                <p class="warntext">
                  <ta-icon type="info-circle-o"
                           class="icons" />上传附件说明：上传附件支持doc、docx、ofd、pdf格式，单个文件大小不能超过10M.
                </p>
              </div>
            </ta-form-item>
          </div>

        </ta-form>
      </div>

      <div class="bom">
        <ta-button v-show="!isDiabledForm"
                   type="primary"
                   @click="onSubmit">提交</ta-button>
        <ta-button v-show="isDiabledForm || (isHadData && !isShowList && isEdit)"
                   type="primary"
                   @click="onCancel">返回</ta-button>
      </div>
    </div>
    <!-- 无数据时 -->
    <div class="container-empty contin"
         v-show="!isHadData && !isShowList">
      <div class="wrap-btn">
        <ta-button type="primary"
                   size="large"
                   @click="onAdd">新增</ta-button>
      </div>
    </div>
    <!-- 列表 -->
    <div class="container-list contin"
         v-show="isHadData && isShowList">
      <ta-table :columns="tableColumns"
                :dataSource="tableData"
                :haveSn="false">

        <div slot="attributionProvince"
             slot-scope="val, obj">
          <span>{{userInfo.areaNamePath}}</span>
        </div>

        <div slot="updateTime"
             slot-scope="val, obj">
          <span>{{val || obj.createTime}}</span>
        </div>

        <div slot="action"
             slot-scope="val,obj"
             class="btnlist">
          <span @click="onLook(val, obj)"
                class="com_textsee">查看</span>
          <span @click="onEdit(val, obj)"
                class="com_textedit">编辑</span>
        </div>

      </ta-table>
    </div>

  </div>
</template>

<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'

const tableColumns = [
  {
    title: '区域',
    width: '30%',
    align: 'center',
    dataIndex: 'attributionProvince',
    overflowTooltip: true,
    scopedSlots: { customRender: 'attributionProvince' }
  },
  {
    title: '孤儿相关证明材料',
    width: '35%',
    align: 'center',
    dataIndex: 'orphanMaterial',
    overflowTooltip: true
  },
  {
    title: '事实无人抚养儿童相关证明材料',
    width: '35%',
    align: 'center',
    dataIndex: 'factMaterial',
    overflowTooltip: true
  },
  {
    title: '更新时间',
    width: '20%',
    align: 'center',
    dataIndex: 'updateTime',
    overflowTooltip: true,
    scopedSlots: { customRender: 'updateTime' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' },
    overflowTooltip: false
  }
]

export default {
  components: {
    AddressComponent
  },
  data () {
    return {
      isDisabledArea: true, // 禁用区域级联
      isDiabledForm: false, //禁用表单
      addressmodel: [], // 回显地址列表
      userInfo: window.parent.indexTool.getUserInfo(), // 登录用户信息
      isHadData: true, // 是否已有录的数据
      isShowList: false, // 是否显示列表
      isEdit: false, // 编辑(而不是新增)标记
      isLoaded: false, // 是否已初始加载完毕
      tableColumns, // 表头
      tableData: [], // 列表数据
      userInfo: window.parent.indexTool.getUserInfo(), // 当前登录用户信息
      activeTab: 1, // 当前tab所在位置（1孤儿，2事实）
      syCardFileList: [], // 已经上传的文件列表 - 孤儿
      syCardFileList2: [], // 已经上传的文件列表 - 事实
      // 文件上传时的入参 - 孤儿
      syCardData: {
        functionalType: '10',
        busiType: '1'
      },
      // 文件上传时的入参 - 事实
      syCardData2: {
        functionalType: '10',
        busiType: '2'
      },

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
    this.assignmentArea()
    let data = await this.fetchHadExplain()
    // 初始有数据时直接显示列表
    data && this.judgeShowWrap(data)
    this.isLoaded = true
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 16:54:44
     * @information: 切换tab
     */
    onChangeTab (val) {
      if (this.activeTab == val) return;
      this.activeTab = val
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 09:01:20
     * @information: 提交
     */
    async onSubmit () {
      this.form.validateFields(async (err, values) => {
        if (err) {
          const fieldToTabArr = [
            { tab: 1, field: 'orphanMaterial' },
            { tab: 2, field: 'factMaterial' },
          ]
          let obj = fieldToTabArr.find(el => err[el.field])
          if (!obj) return;
          this.activeTab = obj.tab
          this.$message.warning('无法提交，请填写表单')
        }
        if (!err) {
          // 当前登录区域id 机构id
          let { areaId: areaid, orgId: orgid } = this.userInfo
          let { belongArea, orphanMaterial, factMaterial } = this.form.getFieldsValue()
          // 文件
          let upLoadPathIds = []
          let fileIdArr = this.syCardFileList.map(el => el.response.data.data.fileid) || []
          let fileIdArr2 = this.syCardFileList2.map(el => el.response.data.data.fileid) || []
          upLoadPathIds.push(...fileIdArr, ...fileIdArr2)
          // 接口入参
          const model = {
            orphanMaterial,
            factMaterial,
            attributionProvince: belongArea[0],
            attributionCity: belongArea[1],
            attributionCounty: undefined,
            attributionTown: undefined,
            areaid,
            orgid,
            upLoadPathIds,
          }
          let res = await this.post(`/proveMaterialExplainManagement/save`, model, true)
          if (res.serviceSuccess) {
            this.$message.success('提交成功')
            this.isHadData = true
            // 赋值列表
            await this.assignmentList()
            this.syCardFileList = []
            this.syCardFileList2 = []
            this.isShowList = true
            this.activeTab = 1
          }
        }
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 09:28:45
     * @information: 赋值地址
     */
    setaddress (fileldName, addressdata) {
      this.form.setFieldsValue({
        belongArea: this.addressmodel
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 09:29:34
     * @information: 所属区域选项变化时
     */
    adsvalchange (e, areaLevel) {
      if (e && e.length) {
        this.form.setFieldsValue({ belongArea: e })
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 09:38:38
     * @information: 初始赋值区域
     */
    assignmentArea () {
      let { areaIdPath } = this.userInfo
      let areaIdArr = areaIdPath.split('/')
      areaIdArr.shift()
      this.addressmodel = areaIdArr
      this.setaddress()
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 14:30:31
     * @information: 加载已有的说明
     */
    async fetchHadExplain () {
      // 当前登录用户区域id
      let { areaId: areaid } = this.userInfo
      let res = await this.post(`/proveMaterialExplainManagement/queryProveMaterialExplain`, { areaid })
      let { data } = res.data
      // 无已录信息
      if (!data || !Object.keys(data).length) {
        this.isHadData = false
        this.isShowList = false
        return;
      }
      let { orphanMaterial, factMaterial } = data
      this.form.setFieldsValue({ orphanMaterial, factMaterial })
      // 赋值文件
      let { fileList } = data
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
      return data
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 19:14:39
     * @information: 初始有数据时直接显示列表
     */
    judgeShowWrap (data) {
      if (data) {
        this.assignmentList(data)
        this.isHadData = true
        this.isShowList = true
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 18:48:02
     * @information: 赋值列表
     */
    async assignmentList (obj) {
      // 加载说明
      let data = obj ? obj : await this.fetchHadExplain()
      this.tableData = [{ ...data }]
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 19:09:50
     * @information: 新增
     */
    onAdd () {
      this.isHadData = true
      this.isShowList = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 19:01:23
     * @information: 查看
     */
    async onLook (val, obj) {
      this.activeTab = 1
      this.syCardFileList = []
      this.syCardFileList2 = []
      await this.fetchHadExplain()
      this.isDiabledForm = true
      this.isHadData = true
      this.isShowList = false
      // 编辑(而不是新增)标记
      this.isEdit = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 19:01:25
     * @information: 编辑
     */
    async onEdit (val, obj) {
      this.activeTab = 1
      this.syCardFileList = []
      this.syCardFileList2 = []
      await this.fetchHadExplain()
      this.isDiabledForm = false
      this.isHadData = true
      this.isShowList = false
      // 编辑(而不是新增)标记
      this.isEdit = true
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 19:12:39
     * @information: 返回
     */
    onCancel () {
      this.isHadData = true
      this.isShowList = true
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 18:01:43
     * @information: 附件预览
     */
    handlePreview (file) {
      this.downloadFile(file)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 18:06:06
     * @information: 上传前
     */
    beforeUpload (file) {
      return this.before_Upload(file, 'fileWord')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 18:13:52
     * @information: 文件项更改时 - 孤儿
     */
    syCardHandleChange (info) {
      if (info.file.status === 'uploading') {
        this.syCardFileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.syCardFileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.syCardFileList.splice(-1, 1)
          return false
        }
        this.syCardFileList = info.fileList
        // 上传成功
        this.syCardFileList = info.fileList
        this.$message.success('文件上传成功')
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 18:13:52
     * @information: 文件项更改时 - 事实
     */
    syCardHandleChange2 (info) {
      if (info.file.status === 'uploading') {
        this.syCardFileList2 = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.syCardFileList2 = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.syCardFileList2.splice(-1, 1)
          return false
        }
        this.syCardFileList2 = info.fileList
        // 上传成功
        this.syCardFileList2 = info.fileList
        this.$message.success('文件上传成功')
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-16 15:21:04
     * @information: 还原数据
     */
    clearData () {
      this.form.resetFields()
      this.activeTab = 1
      this.isHadData = true
      this.isShowList = false
      this.isEdit = false
      this.isLoaded = false
      this.isDiabledForm = false
      this.tableData = []
      this.syCardFileList = []
      this.syCardFileList2 = []
    },
  }
}
</script>

<style lang="less">
#across-province-file-explain-add {
  .form-item-orphanMaterial {
    .ant-form-item-children {
      display: flex;

      textarea {
        width: 80%;
      }
    }
  }

  .form-item-factMaterial {
    .ant-form-item-children {
      display: flex;

      .tiptext {
        width: 20%;
      }
    }
  }

  .tiptext {
    margin-left: 20px;
    color: #ff4545;
    font-size: 14px;
  }

  .container {
    width: 100%;

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
    }
  }

  .container-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    .wrap-btn {
      .ant-btn {
        width: 130px;
        height: 50px;
      }
    }
  }

  .container-list {
    .ant-table .ant-table-row td:first-child {
      border-left: 1px solid #98a3b9;
    }
  }

  .warntext {
    width: 100%;
    height: 47px;
    background: rgba(255, 251, 230, 0.6);
    border: 1px solid rgba(255, 229, 143, 0.6);
    margin-top: 23px;
    margin-bottom: 29px;
    display: flex;
    align-items: center;
    .icons {
      margin: 0 10px;
    }
  }
}
</style>
