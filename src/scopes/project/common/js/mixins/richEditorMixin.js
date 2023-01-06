// 扩展富文本编辑器功能
// 1.添加上传本地图片、视频功能（imgOrVideo）-2021年4月25日13:09:47 Mr.Yan
import $ from 'jquery'
import E from 'wangeditor'
export default {
  data () {
    return {
      // 配置可输入图片内容
      customConfig: {
        uploadImgShowBase64: true,
        menus: [
          'source',
          '|',
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'eraser',
          'forecolor',
          'bgcolor',
          '|',
          'quote',
          'fontfamily',
          'fontsize',
          'head',
          'unorderlist',
          'orderlist',
          'alignleft',
          'aligncenter',
          'alignright',
          '|',
          'link',
          'unlink',
          'table',
          'emotion',
          '|',
          'img',
          'imgOrVideo',
          'video',
          'location',
          'insertcode',
          '|',
          'undo',
          'redo',
          'fullscreen'
        ]
      },
      editor: null, // editor对象
      iframeHeight: 0, // 自定义图片、视频高度
      iframeWidth: 0, // 自定义图片、视频宽度
      uploadIds: [], // 本地上传的图片及视频id
      isNotSubmit: false, // 是否是提交操作
      visible: false
    }
  },
  created () {
    // 生成用于上传的input
    this.setInput()
    // 上传本地图片、视频菜单处理
    this.menuJudge()
  },
  watch: {
    visible (val) {
      // 非提交关闭抽屉时删除总集服务器页面已删除的附件
      if (!val && !this.isNotSubmit && this.uploadIds.length > 0) {
        this.deleteEnclosure()
      } else {
        // 生成用于上传的input
        this.setInput()
      }
    }
  },
  methods: {
    // 生成用于上传的input
    setInput () {
      const _self = this
      _self.uploadIds = []
      if ($('#upload').length > 0) { // 附件dom已存在，则删除重新创建，防止绑定事件异常
        $('#upload').remove()
      }
      $('#app').append('<input type="file" style="display: none" multiple="multiple" id="upload" accept=".mp4,.png,.jpg" />')
      // 重新绑定change
      $('#upload').on('change', function (e) {
        _self.getFile(e)
      })
    },
    // 上传本地图片、视频菜单处理
    menuJudge () {
      const _self = this
      // 用 createMenu 方法创建菜单
      E.createMenu(function (check) {
        // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
        var menuId = 'imgOrVideo'
        // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
        if (!check(menuId)) {
          return
        }
        var lang = E.config.lang
        // this 指向 editor 对象自身
        var editor = this

        // 创建 menu 对象
        var menu = new E.Menu({
          editor: editor, // 编辑器对象
          id: menuId, // 菜单id
          title: '上传本地图片或视频', // 菜单标题

          // 正常状态和选中状态下的dom对象，样式需要自定义
          $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-camera"></i></a>'),
          $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-camera"></i></a>')
        })
        // 创建 panel 内容
        var $content = $('<div></div>')
        var $sizeContainer = $('<div style="margin:20px 10px;"></div>')
        var $widthInput = $('<input type="text" value="640" style="width:50px;text-align:center;"/>')
        var $heightInput = $('<input type="text" value="498" style="width:50px;text-align:center;"/>')
        $sizeContainer.append('<span> ' + lang.width + ' </span>')
          .append($widthInput)
          .append('<span> px &nbsp;&nbsp;&nbsp;</span>')
          .append('<span> ' + lang.height + ' </span>')
          .append($heightInput)
          .append('<span> px </span>')
        var $btnContainer = $('<div></div>')
        var $btnSubmit = $('<button class="right">' + lang.submit + '</button>')
        var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>')
        $btnContainer.append($btnSubmit).append($btnCancel)
        $content.append('<span style="color: #999">上传图片不需要设置宽、高，将保持原尺寸上传</span>').append($sizeContainer).append($btnContainer)

        // 取消按钮
        $btnCancel.click(function (e) {
          e.preventDefault()
          menu.dropPanel.hide()
        })

        // 确定按钮
        $btnSubmit.click(function (e) {
          e.preventDefault()
          var width = parseInt($widthInput.val())
          var height = parseInt($heightInput.val())

          if (isNaN(width) || isNaN(height)) {
            alert('宽度或高度不是数字！')
            return
          }

          // 设置高度和宽度
          _self.iframeHeight = height
          _self.iframeWidth = width

          // 执行命令
          _self.editor = editor
          $('#upload').click()
        })

        // 创建panel
        menu.dropPanel = new E.DropPanel(editor, menu, {
          $content: $content,
          width: 400
        })

        // 增加到editor对象中
        editor.menus[menuId] = menu
      })
    },
    getFile (e) {
      const _self = this
      const submitParameter = {
        url: '/file/uploadFile',
        data: { busiType: 1, file: e.target.files[0] },
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        isFormData: true,
        withCredentials: true
      }
      _self.Base.submit(null, submitParameter, {
        serviceCallback: (type, res) => {
          if (res.serviceSuccess) {
            setTimeout(() => { // 延迟加载，防止总集附件服务器反应慢导致预览失效，1500有可能小了
              // 拼接到富文本编辑器中
              const { data } = res.data
              if (data.filename.includes('jpg') || data.filename.includes('png')) {
                _self.editor.command(null, 'insertHtml', `<img id="${data.fileid}" src="${window.faceConfig.basePath}/file/getFileFromDfs/${data.fileid}" />`, () => _self.uploadIds.push(data.fileid))
              } else {
                const html = `<iframe height="${_self.iframeHeight}" width="${_self.iframeWidth}" frameborder="0" 'allowfullscreen' id="${data.fileid}" src="video.html?fileid=${data.fileid}&basePath=${window.faceConfig.basePath}" frameborder="0" \'allowfullscreen\'=""></iframe>`
                _self.editor.command(null, 'insertHtml', html, () => _self.uploadIds.push(data.fileid))
              }
              $('#upload')[0].value = ''
            }, 1500)
          }
        }
      })
    },
    // 离开页面或关闭抽屉时要删除附件（关闭抽屉时需手动触发）
    async deleteEnclosure (e) {
      this.isNotSubmit = e
      const _self = this
      let needDelete = []
      if (e) { // 提交时只删除页面上删除的附件
        _self.uploadIds.forEach(e => {
          if (document.getElementById('relief.html') && !document.getElementById('relief.html').contentWindow.document.getElementById(e) ||
            !document.getElementById(e)) { // 路由页面或抽屉中
            needDelete.push(e)
          }
        })
      } else { // 返回列表时删除全部附件
        needDelete = _self.uploadIds
      }
      if (needDelete.length > 0) {
        await _self.post('file/deleteBatchFileByReturnFileIds', {
          returnFileIds: needDelete.join(',')
        }).then((res) => {
          if (res.serviceSuccess) {
            window.console.log('文件删除成功!')
          }
        })
      }
    }
  },
  beforeRouteLeave (to, form, next) {
    if (!this.isNotSubmit && this.uploadIds.length > 0) {
      this.deleteEnclosure()
    }
    next()
  }
}
