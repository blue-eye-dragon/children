/**
 * @method post
 * @param {url} string 接口地址
 * @param {data} Object 接口接收参数
 */
import axios from 'axios'
// 接口调取方法
export async function post (url, data, isheader = false, isload = false) {
  return new Promise((resolve, reject) => {
    const submitParameter = {
      url: url,
      data: data,
      method: 'POST',
      showPageLoading: !isload
    }
    if (isheader) {
      submitParameter.autoQs = false
      submitParameter.headers = {
        'Content-Type': 'application/json'
      }
    }
    this.Base.submit(null, submitParameter, {
      serviceCallback: (type, data) => {
        if (data.errors == null || data.errors.length == 0) {
          data.errors = null
          resolve(data)
        } else {
          resolve(data)
          const errlist = ['E0001', 'E0002', 'E0003', 'E0004']
          if (data.errors && data.errors.length > 0) {
            if (!errlist.includes(data.errors[0].errorCode)) {
              this.$message.error(data.errors[0].msg)
            }
          }
          // for (let i = 0; i < data.errors.length; i++) {
          //   this.$message.error(data.errors[i].msg)
          // }
        }
      },
      errorCallBack: error => {
        // error 无回调，只有console
        switch (error.response.status) {
          case 400:
            this.$message.error('输入条件错误')
            break
          case 401:
            this.$message.error('没有登陆')
            break
          case 404:
            this.$message.error('未知错误')
            break
          case 500:
            this.$message.error('服务器错误')
            break
        }
        reject(error)
      },
      validFailCallback: error => {
        console.log('验证失败')
      }
    })
  })
}
export async function getarealabel (val) {
  const data = await this.post('/areaManagement/queryAreaByAreaCode', {
    areaCode: val
  })
  return data.data.data
}
// 表单失去焦点验证调取接口方法
export async function postRules (url, data, isload = false) {
  return new Promise((resolve, reject) => {
    const submitParameter = {
      url: url,
      data: data,
      method: 'POST',
      showPageLoading: !isload
    }
    this.Base.submit(null, submitParameter, {
      serviceCallback: (type, data) => {
        resolve(data)
      },
      errorCallBack: error => {
        // error 无回调，只有console
        switch (error.response.status) {
          case 400:
            this.$message.error('输入条件错误')
            break
          case 401:
            this.$message.error('没有登陆')
            break
          case 404:
            this.$message.error('未知错误')
            break
          case 500:
            this.$message.error('服务器错误')
            break
        }
        reject(error)
      },
      validFailCallback: error => {
        console.log('验证失败')
      }
    })
  })
}
// 时间处理
export function changetime (data) {
  for (var k in data) {
    if (!(data[k] instanceof Array) && data[k] instanceof Object) {
      data[k] = data[k].format('YYYY-MM-DD')
    }
  }
}
// 字典方法
export async function getDictionaries (name) {
  // let data = await this.post('codetable/getCode', { codeType: name })
  // return data.data.codeList
  let code_list = {}
  if (sessionStorage.getItem('code_list')) {
    code_list = JSON.parse(sessionStorage.getItem('code_list'))
  }
  if (code_list[name]) {
    const data = code_list[name]
    return data
  } else {
    const data = await this.post('codetable/getCode', {
      codeType: name
    })
    if (sessionStorage.getItem('code_list')) {
      code_list = JSON.parse(sessionStorage.getItem('code_list'))
    }
    // 根据字典排序字段进行排序
    data.data.codeList.sort((a, b) => {
      return parseInt(a.sort) - parseInt(b.sort)
    })
    code_list[name] = data.data.codeList
    sessionStorage.setItem('code_list', JSON.stringify(code_list))
    return data.data.codeList
  }
}
/**
 * @method get
 * @param {url} string 接口地址
 * @param {data} Object 接口接收参数
 */
export async function get (url, data) {
  return new Promise((resolve, reject) => {
    const submitParameter = {
      url: url,
      data: data,
      method: 'GET'
    }
    this.Base.submit(this, submitParameter, {
      serviceCallback: (type, data) => {
        if (data.errors === null) {
          resolve(data)
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            this.$message.error(data.errors[i].msg)
          }
        }
      },
      errorCallBack: error => {
        switch (error.response.status) {
          case 400:
            this.$message.error('输入条件错误')
            break
          case 401:
            this.$message.error('没有登陆')
            break
          case 404:
            this.$message.error('未知错误')
            break
          case 500:
            this.$message.error('服务器错误')
            break
        }
        reject(error)
      }
    })
  })
}
// 获取儿童类型
export async function getchildtypelist () {
  const areaLevel = window.parent.indexTool.getUserInfo().areaLevel
  let codeType = ''
  if (areaLevel == 5) {
    codeType = 'INFOCOLLECTCHILDTYPE'
  } else {
    const orgType = window.parent.indexTool.getUserInfo().orgType
    if (orgType == '99') {
      codeType = 'CHILDCATEGORYF'
    } else if (orgType != '98' && orgType != '99') {
      codeType = 'CHILDCATEGORYM'
    } else {
      codeType = 'CHILDCATEGORYA'
    }
  }
  const list = await this.post('codetable/getCode', {
    codeType: codeType
  })
  return list.data.codeList
}
// 上传验证
// 2021-06-28+ type: fileWord 为非图片类型，即doc、docx、pdf、odf
export function before_Upload (file, type = null, maxsize = 10, minsize = 0) { // maxsize为最大值，minsize为最小值
  if (file.name.length > 30) {
    this.$message.error('文件名长度超过30个字符，请选择其他文件重新上传!')
    return false
  }
  let typelist = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ''
  ]
  if (type == 'image') {
    typelist = ['image/jpeg', 'image/jpg', 'image/png']
  }
  if (type == 'apk') {
    // typelist=['application/vnd.android.package-archive']
  }
  if (type == 'fileWord') {
    typelist = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ''
    ]
  }
  const isaccord = typelist.includes(file.type)
  if (!isaccord) {
    if (type == 'image') {
      this.$message.error('请上传图片(jpg、jpeg、png)格式的文件!')
    } else if (type == 'fileWord') {
      this.$message.error('请上传doc、docx、pdf、odf格式的文件!')
    } else {
      this.$message.error('请上传图片(jpg、jpeg、png)、doc、docx、pdf格式的文件!')
    }
  }
  const isLtMax = file.size / 1024 / 1024 < maxsize
  if (!isLtMax) {
    this.$message.error('单个文件不能超过' + maxsize + 'M!')
  }
  const isLtMin = file.size / 1024 / 1024 > minsize
  if (!isLtMin) {
    this.$message.error('单个文件不能小于' + minsize + 'M!')
  }
  return isaccord && isLtMax && isLtMin
}
// 视频上传验证
export function before_Upload1 (file) {
  if (file.name.length > 30) {
    this.$message.error('文件名长度超过30个字符，请选择其他文件重新上传!')
    return false
  }
  const typelist = [
    'video/mp4',
    'video/avi',
    'video/3gpp',
    'audio/x-ms-wma'
  ]
  const isaccord = typelist.includes(file.type)
  if (!isaccord) {
    this.$message.error('请上传mp4、avi、wma、3gpp格式的视频!')
  }
  const isLt50M = file.size / 1024 / 1024 < 50
  if (!isLt50M) {
    this.$message.error('单个文件不能超过50M!')
  }
  return isaccord && isLt50M
}
// 导出方法
export function exportFile (url, obj) {
  // url = `${window.faceConfig.exportUrl}/rescueMaterial/export`
  const paramsUrl = window.parent.indexTool.getUserInfo()
  url = `${window.faceConfig.exportUrl + url}?userId=${paramsUrl.userId}&areaCode=${paramsUrl.areaCode}`
  if (!obj.orgId) {
    if (paramsUrl.orgId) {
      url += `&orgId=${paramsUrl.orgId}`
    }
  }
  // let index = 0
  for (var i in obj) {
    if (obj[i] != undefined) {
      url += `&${i}=${obj[i]}`
    }
  }
  window.location.href = url
}
// success
// msg:title的值，text：content内容,okText:确认按钮文字,_self:this
// type:0失败  error(),1成功   success(),2模态框   modal()
export function success (type, msg, text, okText, _self) {
  const params = {
    title: `${msg}`,
    content: `${text}`,
    footer: true,
    okText: `${okText}`,
    onCancel: function () {
      if (_self.onCancelBack != undefined) {
        _self.onCancelBack()
      }
    },
    onOk: function () {
      // onOkCallBack确定之后调用的方法
      if (_self.onOkCallBack != undefined) {
        _self.onOkCallBack()
      }
    }
  }
  if (type == '0') {
    Modal.error(params)
  } else if (type == '1') {
    Modal.success(params)
  } else if (type == '2') {
    Modal.modal(params)
  }
}
// 联系电话验证
function phone (rule, value, callback) {
  if (!value || value == '') {
    callback()
  }
  var reg = /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$|^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$|^(\d{3,5}-)\d{4,8}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback('请输入正确的号码格式')
  }
}
// 14点38分2020年4月24日 电话/手机号相关  mes-->必填提示信息。val=true-->必填校验
export function phoneRule (val = false, mes) {
  const ruledata = {
    validateTrigger: ['change', 'blur'],
    rules: [{
      required: val,
      message: mes || '请输入联系电话'
    },
    {
      validator: phone
    }
    ]
  }
  return ruledata
}
// 邮政编码验证规则
function zipCode (rule, value, callback) {
  if (!value || value == '') {
    callback()
  }
  var reg = /^[0-8][0-7]\d{4}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback('请输入正确的编码格式')
  }
}
// 邮政编码
export function zipCodeRule (val = false, mes) {
  const ruledata = {
    validateTrigger: ['change', 'blur'],
    rules: [{
      required: val,
      message: mes || '请输入邮政编码'
    },
    {
      validator: zipCode
    }
    ]
  }
  return ruledata
}

function name (rule, value, callback) {
  if (!value || value == '') {
    callback()
  }
  var reg = /^([\u4E00-\u9FA5]+(·[\u4E00-\u9FA5A-Za-z]+)*|[A-Za-z\s]+(.[A-Za-z]+)*)$/
  if (reg.test(value)) {
    callback()
  } else {
    callback('请输入正确的格式')
  }
}
export function nameRule (msg) {
  const ruledata = {
    validateTrigger: ['change', 'blur'],
    rules: [{
      required: true,
      message: `请输入${msg}`
    },
    {
      max: 72,
      message: '最大输入72个字符'
    },
    {
      validator: name
    }
    ]
  }
  return ruledata
}
export function maxlength (e) {
  if (e.target.value.length > 18) {
    e.target.value = e.target.value.substring(0, 18)
  }
}
// 身份证号的验证：
// 先校验格式，格式通过再进行其他前端自定义验证，再检查是否有后台验证，若有后台验证且无报错，则判断是否有其他操作（根据后端数据），其他操作返回true则继续执行go，返回false则不执行go
// childtype: 儿童类别，若传了，就进行采集大表单验重
export async function idCardValidate (rule, value, callback, _self, key = null, childtype = null) {
  // setTimeout(async () => {
  // 身份证号码为15位
  const reg_15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/
  // 身份证号码为18位
  const reg_18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/
  if (!value || value == '') {
    callback()
    // 身份证为空的时候返回的值
    const res = '1'
    return res
  }
  if (value) {
    if (value.includes('x')) {
      value.replace('x', 'X')
    }
  }
  if (reg_15.test(value) || reg_18.test(value)) {
    // 判断是否存在前端自定义验证
    if (_self.beforeBackstage != undefined) {
      const obj = await _self.beforeBackstage(value)
      if (obj) { // 返回错误信息或空
        callback(obj)
      } else {
        callback()
      }
    }
    // 判断是否存在后端验证
    if (_self.validateIdCard != undefined) {
      // 存在业务后台校验
      const resobj = await _self.validateIdCard(value)
      if (!resobj.errors) {
        // 后台正常返回数据后，根据返回的数据进行其他操作，若返回true，进行go
        if (_self.otherOperation != undefined) {
          if (_self.otherOperation(value, resobj)) {
            await go(value, value.length, _self)
          }
        } else {
          await go(value, value.length, _self)
        }
        callback()
      } else {
        callback(resobj.errors[0].msg)
      }
    }
    if (childtype) { // 进行采集大表单身份证号验重(childtype为student时为孤儿助学，调助学接口)
      let url
      if (childtype == 'student') {
        url = '/childrenInStudentAssistanceProjec/checkChildBaseInfoByIdCarrd'
      } /* else if (childtype == 'stayChild') {
        url = '/LeftOverChild/getChildByNameAndTypeAllByLeftOverChild'
      } */ else {
        url = '/orphansDisabledChildrenApi/getChildByNameAndTypeAll'
      }
      // 验重
      await this.post(url, {
        id: _self.id,
        idCard: value,
        childType: childtype
      }).then((res) => {
        if (res.serviceSuccess) {
          if (res.data && res.data.data) { // 存在重复数据，且需要带出回显
            if (_self.setValueByIdCard != undefined) { // 进行身份证号验重时，页面需定义setValueByIdCard方法进行表单赋值
              _self.setValueByIdCard(res.data.data)
            }
          }
        } else { // 处理有错误信息时下一步操作
          _self.setValueByIdCard(false)
        }
      })
      go(value, value.length, _self, key)
      callback()
    } else {
      go(value, value.length, _self, key)
      callback()
    }
  } else {
    // 验证不通过时，若定义了此方法，则调用
    if (_self.validateFailed != undefined) {
      _self.validateFailed(value)
    }
    callback(new Error('身份证号码不正确'))
  }
  // }, 300)
}
export function otherCardrules (rule, value, callback, _self, key = null) {
  if (!value || value == '') {
    callback()
  }
  if (value.length != 0 && value.length < 20) {
    callback()
  } else {
    callback('证件号码不正确')
  }
}
// 实现自动生成生日，性别，年龄
export function go (val, len, _self, key) {
  const iden = val
  let sex = null
  let birth = null
  const myDate = new Date()
  const month = myDate.getMonth() + 1
  const day = myDate.getDate()
  let age = 0

  if (len === 18) {
    age = myDate.getFullYear() - iden.substring(6, 10) - 1
    sex = iden.substring(16, 17)
    birth =
      iden.substring(6, 10) +
      '-' +
      iden.substring(10, 12) +
      '-' +
      iden.substring(12, 14)
    if (
      iden.substring(10, 12) < month ||
      (iden.substring(10, 12) == month && iden.substring(12, 14) < day)
    ) {
      age++
    }
  }
  if (len === 15) {
    age = myDate.getFullYear() - iden.substring(6, 8) - 1901
    sex = iden.substring(13, 14)
    birth =
      '19' +
      iden.substring(6, 8) +
      '-' +
      iden.substring(8, 10) +
      '-' +
      iden.substring(10, 12)
    if (
      iden.substring(8, 10) < month ||
      (iden.substring(8, 10) == month && iden.substring(10, 12) < day)
    ) {
      age++
    }
  }

  if (sex % 2 === 0) {
    sex = '2'
  } else {
    sex = '1'
  }
  if (_self.callbackByIdCard != undefined) {
    // 性别、年龄、生日需要回显时
    _self.callbackByIdCard(sex, age, birth, key)
  }
  return {
    birth,
    age,
    sex
  }
}
export function idCardrules (val = false, msg) {
  const ruledata = {
    validateTrigger: ['change', 'blur'],
    normalize: (e) => { return e && e.replace(/\x/g, 'X') },
    rules: [{
      required: val,
      message: msg || '请输入身份证号'
    },
    {
      validator: idCards
    }
    ]
  }
  return ruledata
}

function idCards (rule, value, callback) {
  if (!value || value == '') {
    callback()
  }
  if (value) {
    if (value.includes('x')) {
      value.replace('x', 'X')
    }
  }
  const reg_15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/
  // 身份证号码为18位
  const reg_18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/
  if (reg_15.test(value) || reg_18.test(value)) {
    callback()
  } else {
    callback('请输入正确的证件号码')
  }
}
// 必填的验证
export function verificationRules (msg, num, isTextarea = false) {
  let text = '请选择'
  let ruledata = {
    validateTrigger: 'change',
    rules: []
  }
  if (num) {
    text = '请输入'
    ruledata = {
      validateTrigger: ['change', 'blur'],
      rules: []
    }
    if (typeof num == 'number') {
      // 輸入框
      if (num == 0) {
        ruledata.rules = [{
          required: true,
          message: `${text}${msg}`
        }]
      } else {
        ruledata.rules = [{
          required: true,
          message: `${text}${msg}`
        },
        {
          max: num,
          message: `最大输入${num}个字符`
        }
        ]
        ruledata.normalize = function (value) {
          if (typeof value == 'string' && !isTextarea) {
            value = value.trim()
          }
          return value
        }
      }
    } else if (typeof num == 'boolean') {
      // 时间选择
      text = '请选择'
      ruledata = {
        validateTrigger: 'change',
        rules: [{
          required: true,
          message: `${text}${msg}`
        }]
      }
    } else if (typeof num == 'string') {
      ruledata.rules = [{
        required: true,
        message: `${text}${msg}`
      }]
    } else {
      // 特殊格式輸入框
      if (num.type == 'phone') { // 电话验证
        ruledata = this.phoneRule(true, `请输入正确的${msg}`)
      } else if (num.type == 'zipCode') { // 邮政编码验证
        ruledata = this.zipCodeRule(true, `请输入正确的${msg}`)
      } else if (num.type == 'idCard') { // 身份证验证
        ruledata = this.idCardrules(true, `请输入正确的${msg}`)
      } else {
        ruledata.rules = [{
          required: true,
          message: `${text}${msg}`
        },
        {
          type: num.type,
          message: `请输入正确的${msg}`
        }
        ]
      }
    }
  } else {
    ruledata.rules = [{
      required: true,
      message: `${text}${msg}`
    }]
  }

  return ruledata
}

function selectNotMust2 (rule, value, callback) {
  callback()
}
export function selectNotMust () {
  const ruledata = {
    validateTrigger: 'change',
    rules: []
  }
  ruledata.rules = [{
    required: false
  }, {
    validator: selectNotMust2
  }]
  return ruledata
}
// 非必填的验证（只验证长度与其他格式）
export function verificationRulesNotMustFill (msg, num, isTextarea = false) {
  let text = '请选择'
  let ruledata = {
    validateTrigger: 'change',
    rules: []
  }
  if (num) {
    text = '请输入'
    ruledata = {
      validateTrigger: ['change', 'blur'],
      rules: []
    }
    if (typeof num == 'number' && num != 0) {
      // 輸入框
      ruledata.rules = [{
        required: false
      },
      {
        max: num,
        message: `最大输入${num}个字符`
      }
      ]
      ruledata.normalize = function (value) {
        if (typeof value == 'string' && !isTextarea) {
          value = value.trim()
        }
        return value
      }
    } else {
      // 特殊格式輸入框
      if (num.type == 'phone') { // 电话验证
        ruledata = this.phoneRule(false, `请输入正确的${msg}`)
      } else if (num.type == 'zipCode') { // 邮政编码验证
        ruledata = this.zipCodeRule(false, `请输入正确的${msg}`)
      } else if (num.type == 'idCard') { // 身份证验证
        ruledata = this.idCardrules(false, `请输入正确的${msg}`)
      } else {
        ruledata.rules = [{
          required: false
        },
        {
          type: num.type,
          message: `请输入正确的${msg}`
        }
        ]
      }
    }
  } else {
    ruledata.rules = [{
      required: false,
      message: `${text}${msg}`
    }]
  }

  return ruledata
}

// 下载单个文件
export function downloadFile (file) {
  const vm = this
  const returnFileIds = file.response.data.data.fileid
  const typeList = '.jpg.bmp.jpeg.png.gif.JPG.BMP.JPEG.PNG.GIF'
  if (file.type.substr(0, 5).indexOf('image') != -1 || file.type.substr(0, 5).indexOf('IMAGE') != -1 || typeList.includes(file.name.substring(file.name.lastIndexOf('.'), file.name.length))) {
    // _self.post('/file/getFileUrls', {
    //   returnFileIds: file.response.data.data.fileid
    // }).then(res => {
    //   if (res.serviceSuccess) {
    // let imgurl = window.faceConfig.basePath + res.data.fileUrlList[0]
    // vm.IMgPreview(imgurl) // 原图片预览
    const imgurl = window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds
    var items = [{
      src: imgurl,
      title: file.name
    }]
    var options = {
      index: 0,
      // Toolbar options in header
      headToolbar: ['maximize', 'close'],
      // Toolbar options in footer
      footToolbar: [
        'zoomIn',
        'zoomOut',
        // 'prev',
        'fullscreen',
        // 'next',
        'actualSize',
        'rotateLeft',
        'rotateRight'
      ],
      // Customize language of button title
      i18n: {
        maximize: '最大化/最小化',
        close: '关闭',
        zoomIn: '放大(+)',
        zoomOut: '缩小(-)',
        fullscreen: '全屏',
        actualSize: '实际尺寸(Ctrl+Alt+0)',
        rotateLeft: '左旋转(Ctrl+,)',
        rotateRight: '右旋转(Ctrl+.)'
      }
    }
    var viewer = new PhotoViewer(items, options)
    //   } else {
    //     _self.$message.error('服务器错误')
    //   }
    // })
  } else {
    vm.$confirm({
      title: '是否下载附件?',
      okText: '确定',
      width: 250,
      onOk: () => {
        window.location.href = window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds
        // vm.post('/file/getFileUrls', {
        //   returnFileIds: returnFileIds
        // }).then(res => {
        //   if (res.data) {
        //     window.location.href = window.faceConfig.basePath + res.data.fileUrlList[0]
        //   }
        //   // file.url = res.data.fileUrlList[0];
        // })
      }
    })
  }
  // this.post('/file/getFileUrls', {
  //   returnFileIds: file.response.data.data.fileid
  // }).then(res => {
  //   console.log(res)
  //   if (res.data) {
  //     window.location.href = res.data.fileUrlList[0]
  //   }
  //   // file.url = res.data.fileUrlList[0];
  // })
}
// 下载多个文件
// relationIds   业务id
export function downloadFileList (relationIds) {
  window.location.href =
    window.faceConfig.basePath +
    '/file/downloadFilesByRelations?relationIds=' +
    relationIds
}
export function set_Container (dom) {
  return document.getElementsByClassName(dom)[0]
}
// 设置弹窗容器-时间(页面需在form外包一个id为content的div)
export function setCalendarContainer (trigger) {
  // 设置他的弹出框容器为content,如果不设置默认为body
  // 设置弹出框容器主要是为了解决页面滚动时可能会出现的弹出框脱离输入框的情况
  return document.getElementById('content')
}
// 文本域校验 num: 校验长度；name：字段名称；type：0 -非必填；value：输入值；callback：回调。
export function fnValidateTextarea (num, name, value, callback, type) {
  if ((!value && type != 0) || (!value.trim() && type != 0)) {
    callback(`请输入${name}`)
  } else if (value.trim().length > num) {
    callback(`最大输入${num}个字符`)
  } else {
    callback()
  }
}

// 处理number型数字运算精度丢失的问题（加减乘除） start
// 加减乘除的四个接口
export function add (a, b) {
  return operation(a, b, 'add')
}
export function subtract (a, b) {
  return operation(a, b, 'subtract')
}
export function multiply (a, b) {
  return operation(a, b, 'multiply')
}
export function divide (a, b) {
  return operation(a, b, 'divide')
}

/*
 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * @param floatNum {number} 小数
 * @return {object}
 *   {times:100, num: 314}
 */
function toInteger (floatNum) {
  var ret = {
    times: 1,
    num: 0
  }
  var isNegative = floatNum < 0
  if (Math.floor(floatNum) == floatNum) {
    ret.num = floatNum
    return ret
  }
  var strfi = floatNum + ''
  var dotPos = strfi.indexOf('.')
  var len = strfi.substr(dotPos + 1).length
  var times = Math.pow(10, len)
  var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
  ret.times = times
  if (isNegative) {
    intNum = -intNum
  }
  ret.num = intNum
  return ret
}

/*
 * 核心方法，实现加减乘除运算，确保不丢失精度
 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
 *
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
 *
 */
function operation (a, b, op) {
  var o1 = toInteger(a)
  var o2 = toInteger(b)
  var n1 = o1.num
  var n2 = o2.num
  var t1 = o1.times
  var t2 = o2.times
  var max = t1 > t2 ? t1 : t2
  var result = null
  switch (op) {
    case 'add':
      if (t1 === t2) { // 两个小数位数相同
        result = n1 + n2
      } else if (t1 > t2) { // o1 小数位 大于 o2
        result = n1 + n2 * (t1 / t2)
      } else { // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2
      }
      return result / max
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2)
      } else {
        result = n1 * (t2 / t1) - n2
      }
      return result / max
    case 'multiply':
      result = (n1 * n2) / (t1 * t2)
      return result
    case 'divide':
      result = (n1 / n2) * (t2 / t1)
      return result
  }
}
// 处理number型数字运算精度丢失的问题（加减乘除） end

/**
 * 控制页面的标签（ant-form-item-label）和输入控件（ant-form-item-control-wrapper）的宽度
 * @param {*} labelWidth label宽度
 * @param {*} wrapperWidth wrapper宽度
 * @param {*} rootElement 根节点class
 * @param {*} excludeTypeObjs 要排除的类型数组（select，radio等）
 * @param {*} excludeIdObjs 要排除的id数组（fieldDecoratorId）
 */
export function setLabelAndWrapperWidth (labelWidth, wrapperWidth, rootElement = '*', excludeTypeObjs, excludeIdObjs) {
  excludeTypeObjs = excludeTypeObjs || []
  excludeIdObjs = excludeIdObjs || []
  if (labelWidth) {
    setWidth('label', labelWidth, rootElement, excludeTypeObjs, excludeIdObjs)
  }
  if (wrapperWidth) {
    setWidth('wrapper', wrapperWidth, rootElement, excludeTypeObjs, excludeIdObjs)
  }
}

function setWidth (name, width, rootElement, excludeTypeObjs, excludeIdObjs) {
  const $ = require('jquery')
  rootElement = rootElement == '*' ? '*' : '.' + rootElement
  $(rootElement + ' .ant-form-item-control-wrapper').each(function () {
    let excludeName = ''
    for (var i = 0; i < excludeTypeObjs.length; i++) {
      switch (excludeTypeObjs[i]) {
        case 'select':
          excludeName += '.ant-select, '
          break
        case 'date':
          excludeName += '.ant-calendar-picker, '
          break
        case 'radio':
          excludeName += '.ant-radio-group, '
          break
        case 'checkbox':
          excludeName += '.ant-checkbox-group, '
          break
        case 'textarea':
          excludeName += 'textarea, '
          break
      }
    }
    for (var k = 0; k < excludeIdObjs.length; k++) {
      excludeName += ' #' + excludeIdObjs[k] + ', '
    }
    if (excludeName != '') {
      excludeName = excludeName.substring(0, excludeName.length - 2)
    }

    if ($(this).find(excludeName).length == 0) {
      if (name == 'label') {
        $(this).prev().css('width', width)
      } else {
        $(this).css('width', width)
      }
    }
  })
}
// 列表健康状况处理，默认显示一级（val：code值，dict：字典，level：级别）
export function setHeathData (val, dict, level = 1) {
  val = val || ''
  if (level == 1) { // 一级
    if (val.indexOf(',') != -1) { // 有两级数据
      return this.CollectionLabel(dict, val.substring(0, val.indexOf(',')))
    } else { // 只有一级数据
      return this.CollectionLabel(dict, val)
    }
  } else { // 两级
    if (val.indexOf(',') != -1) { // 有两级数据
      return this.CollectionLabel(dict, val.substring(0, val.indexOf(','))) + ',' +
        this.CollectionLabel(dict, val.substring(val.indexOf(',') + 1, val.length))
    } else { // 只有一级数据
      return this.CollectionLabel(dict, val)
    }
  }
}

export function setHeight (ref, refout, istrue, _self) {
  const node = _self.$refs[refout]
  _self.$nextTick(() => {
    if (!istrue) {
      node.style.height = _self.$refs[ref].$el.offsetHeight + 10 + 'px'
    } else {
      node.style.height = '68px'
    }
    node.style.transition = 'all 1s'
  })
}
// 单选框radio添加取消功能
// 1.值。2.id。3.form。4.是否有其他操作条件（联动字段）5.thats--this(当isQustion为true时位必须项)
export function deuRadios (v, id, formName, isQustion, thats, types) {
  const b = formName.getFieldsValue()[id]
  if (b == v) {
    this.$nextTick(() => {
      formName.setFieldsValue({
        [id]: undefined
      })
      if (isQustion) {
        // 置空时操作，thats自己页面方法
        thats.nullThen(v, id, formName, true, types)
      }
    })
  } else {
    if (isQustion) {
      // 非空时操作
      thats.nullThen(v, id, formName) // 非空时操作
    }
  }
}
/**
 *  errfocus 验证定位
 * @param {err} errList 错误集合
 * @param {from} from    操作表单
 */
export function errfocus (errList, from) {
  from.getFieldInstance(Object.getOwnPropertyNames(errList)[0]).focus()
}
// 上传验证
export function rpk_before_Upload (file) {
  if (file.name.length > 30) {
    this.$message.error('文件名长度超过30个字符，请选择其他文件重新上传!')
    return false
  }
  const typelist = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ''
  ]
  const isaccord = typelist.includes(file.type)
  if (!isaccord) {
    this.$message.error('请上传图片(jpg、jpeg、png)、doc、docx、pdf格式的文件!')
  }
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) {
    this.$message.error('单个文件不能超过10M!')
  }
  return isaccord && isLt10M
}
