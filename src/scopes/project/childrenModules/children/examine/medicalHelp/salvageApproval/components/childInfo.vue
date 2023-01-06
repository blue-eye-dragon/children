<template>
  <ta-row class="fromcom">
    <ta-col :span="12">
      <ta-form-item label="姓名"
                    fieldDecoratorId="name"
                    :require="{message:'请输入儿童姓名!'}">
        <ta-input placeholder="请输入儿童姓名" />
      </ta-form-item>
      <ta-form-item label="出生日期"
                    fieldDecoratorId="birthday"
                    :require="{message:'请选择性别!'}">
        <ta-date-picker style="width: 100%;"
                        placeholder="请选择出生日期" />
      </ta-form-item>
      <ta-form-item label="民族"
                    fieldDecoratorId="nation"
                    :require="{message:'请选择民族!'}">
        <ta-select placeholder="请选择民族"
                   style="width : 100%">
          <ta-select-option v-for="(item,index) in nationList "
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="工学情况"
                    fieldDecoratorId="nation"
                    :require="{message:'请选择工学情况!'}">
        <ta-select placeholder="请选择工学情况">
          <ta-select-option v-for="(item , index) in workstuList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item label="性别"
                    :labelCol="{ span: 9 }"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="childSituation"
                    :require="{message:'请输选择性别!'}">
        <ta-select placeholder="请选择性别">
          <ta-select-option v-for="(item,index) in sexList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="身份证号"
                    fieldDecoratorId="idCard"
                    :labelCol="{ span: 9 }"
                    :wrapperCol="{span:15}"
                    :require="{message:'请输入身份证号!'}">
        <ta-input placeholder="请输入身份证号" />
      </ta-form-item>
      <ta-form-item label="健康状况"
                    fieldDecoratorId="birthday"
                    :labelCol="{ span: 9 }"
                    :wrapperCol="{span:15}"
                    :require="{message:'请选择健康状况!'}">
        <ta-select placeholder="请选择健康情况 ">
          <ta-select-option v-for="(item ,index) in healthList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="登记日期"
                    fieldDecoratorId="nation"
                    :labelCol="{ span: 9 }"
                    :wrapperCol="{span:15}"
                    :require="{message:'请选择登记日期!'}">
        <ta-date-picker style="width: 100%;"
                        placeholder="请选择登记日期" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="4">
      <div class="uploadimg">
        <img v-if="imageUrl"
             :src="imageUrl" />
        <ta-upload :withCredentials="true"
                   name="file"
                   :showUploadList="false"
                   action
                   :beforeUpload="beforeUpload"
                   @change="handleChange"
                   @preview="preview">
          <ta-button>上传照片</ta-button>
        </ta-upload>
      </div>
    </ta-col>

    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="户籍所在地"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span: 18 }"
                      fieldDecoratorId="cascader">
          <ta-cascader :options="address"
                       placeholder="请选择地址" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 24 }"
                      fieldDecoratorId="cascader">
          <ta-input placeholder="请输入详细户籍所在地" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="常居住地址"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span: 18 }"
                      fieldDecoratorId="cascader">
          <ta-cascader :options="address"
                       placeholder="请选择地址" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 24 }"
                      fieldDecoratorId="cascader">
          <ta-input placeholder="请输入详细常居住地址" />
        </ta-form-item>
      </ta-col>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  components: [],
  workstuList: [],
  data () {
    return {
      nationList: [],
      sexList: [],
      components: [],
      workstuList: [],
      healthList: [],

      address: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ],

      imageUrl: 'static/img/defalimg.png',
      loading: false,

      name: ''
    }
  },
  mounted () {
    this.getnation()
    this.getworkstu()
    this.getsexList()
    this.getHealthList()
  },
  methods: {
    // 健康状况
    async getHealthList () {
      let data = await this.getDictionaries('HEALTH')
      this.healthList = data
    },

    // 性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },

    // 工学情况
    async getworkstu () {
      let data = await this.getDictionaries('WORKSTUDY')
      this.workstuList = data
    },
    // 民族
    async getnation () {
      let data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    preview (file) { this.downloadFile(file) },
    handleChange (info) {
      // this.fileList = fileList
      if (info.file.status === 'uploading') {
        this.loading = true
        return null
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },

    getBirthdayFromIdCard (idCard) {
      var birthday = null
      if (idCard != null && idCard != '') {
        if (idCard.length == 15) {
          birthday = '19' + idCard.substr(6, 6)
        } else if (idCard.length == 18) {
          birthday = idCard.substr(6, 8)
        }

        birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
      }

      return birthday
    }
  }
}
</script>
<style scoped lang="less">
.uploadimg {
  width: 100%;
  height: 252px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.uploadimg img {
  width: 70%;
  margin-bottom: 20px;
}
.radios /deep/ .ant-radio-wrapper {
  margin-right: 9%;
}
.radios /deep/ .ant-radio-wrapper:nth-child(4) {
  margin-right: 0;
}
</style>
