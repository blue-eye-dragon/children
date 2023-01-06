<template>
  <div class="uploadimg">
    <div class="add_contract">
      <div style="height: 100%" class="img_content">
        <img v-if="imageUrl"
             @click="handlePreview"
             :src="imageUrl"
             style="height: 100%" />
        <span @click="del"
              v-if="!disabled && delVisible"
              title="点击可删除">删除</span>
      </div>
    </div>
    <ta-upload :withCredentials="true"
               name="file"
               :action="action"
               :showUploadList="false"
               :data="uploadPar"
               :fileList="imglist"
               :limit="1"
               @change="fileChange"
               :beforeUpload="beforeUpload">
      <ta-button :disabled="disabled ?disabled:delVisible"
                 :ghost="true"
                 type="primary">上传照片</ta-button>
    </ta-upload>
  </div>

</template>

<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  props: {
    // 父页面为组件时，
    // thisP为父页面的父页面this，
    // thisP2为父页面this；
    // 父页面非组件时，
    // thisP等于thisP2等于父组件this。
    thisP: {
      required: true
    },
    thisP2: {
      required: true
    },
    imglist: {
      type: Array
    },
    disabled: {
      type: Boolean
    },
    delVisible: {
      type: Boolean
    },
    imageUrl: {
      type: String,
      required: false
    },
    uploadPar: {
      type: Object
    }
  },
  data: function () {
    return {}
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {
    handlePreview () {
      const file = this.imglist[0]
      if (file) {
        this.downloadFile(file)
      }
    },
    beforeUpload (file) {
      if (this.imglist.length > 0) {
        this.$message.error('请删除原有头像再进行上传！')
        return false
      }
      const typelist = ['image/jpeg', 'image/png']
      const isaccord = typelist.includes(file.type)
      if (!isaccord) {
        this.$message.error('请上传图片(jpg、jpeg、png)格式的文件')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('单个文件不能超过10M')
      }
      return isaccord && isLt10M
    },
    // 文件点击删除
    async del () {
      const ar = this.imageUrl.split('/')
      const air = ar[ar.length - 1]
      if (this.disabled) {
        return false
      }
      this.thisP.imglist = []
      this.thisP.imageUrl = 'static/img/defalimg.png'
      // 关闭禁用标志
      this.thisP.delVisible = false
      // this.$confirm({
      //   title: '确认删除头像吗？',
      //   content: '删除后不可恢复，请谨慎操作。',
      //   okText: '确认',
      //   // okType: 'danger',
      //   cancelText: '取消',
      //   onOk: async () => {
      //     const res = await this.post('file/deleteBatchFileByReturnFileIds', {
      //       returnFileIds: air
      //     })
      //     if (res.serviceSuccess) {
      //       this.$message.success('头像删除成功!')
      //       this.thisP.imglist = []
      //       this.thisP.delVisible = false
      //       this.thisP.imageUrl = 'static/img/defalimg.png'
      //     } else {
      //       this.$message.error('头像删除失败!')
      //     }
      //   },
      //   onCancel: () => {
      //     console.log('Cancel')
      //   }
      // })
    },
    fileChange (info) {
      // 当且仅当父页面不是组件时，采用父页面方法fileControl。
      if (this.thisP == this.thisP2) {
        this.$nextTick(() => {
          this.$emit('fileControl', info)
        })
      } else {
        const arr = []
        if (info && info.fileList) {
          arr.push(info.fileList[info.fileList.length - 1])
        }

        if (info.file.status === 'uploading') {
          this.thisP2.$emit('update:imglist', arr)
        }
        if (info.file.status === 'removed') {
          if (this.disabled) {
            return false
          }
          this.thisP2.$emit('update:imglist', arr)
        }
        if (info.file.status === 'done') {
          if (
            info.file.response.errors &&
            info.file.response.errors.length != 0
          ) {
            this.$message.error('上传失败')
            const arrlist = [...this.imglist]
            arrlist.splice(-1, 1)
            this.thisP2.$emit('update:imglist', arrlist)
            return false
          }
          // 上传成功
          this.headImgId = info.file.response.data.data.fileid
          getBase64(info.file.originFileObj, imageUrl => {
            this.thisP2.$emit(
              'update:imageUrl',
              imageUrl
            )
            this.thisP.delVisible = true
          })
          this.thisP2.$emit('update:imglist', arr)
          // const returnFileIds = info.fileList[0].response.data.data.fileid
          this.$message.success('文件上传成功!')
          // this.thisP.delVisible = true
          
          // this.$message.success('文件上传成功!')
          // this.thisP2.$emit(
          //   'update:imageUrl',
          //   window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds
          // )
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.uploadimg {
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 32px;
}
.uploadimg img {
  max-width: 160px;
  max-height: 136px;
}

.add_contract {
  width: 80%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 30px;
}
.img_content {
  position: relative;
}
.img_content span {
  width: 100%;
  z-index: 1111;
  position: absolute;
  bottom: 0;
  padding: 6px;
  background: #000;
  opacity: 0.7;
  color: #fff;
  display: none;
}
.add_contract:hover span {
  display: block;
}
</style>
