import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
import { setCookie, getCookie } from '@yh/ta404-ui/es/utils/js/cookie.util'
import { getNowPageParam } from '@yh/ta404-ui/es/utils/js/url.util'
import { deepMerge } from '@yh/ta404-ui/es/utils/async-validator/util'
import isPlainObject from 'lodash/isPlainObject'
import faceConfig from 'faceConfig'
Vue.prototype.$axios = axios
const reqList = []
const whiteListResult = []
faceConfig.whiteList.forEach((e) => {
  whiteListResult.push(faceConfig.basePath + e)
})
const allowRequest = function (reqList, url) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i].url === url) {
      reqList.splice(i, 1)
      break
    }
  }
}
const stopRepeatRequest = function (reqList, url, data, cancel, errorMessage) {
  const errorMsg = errorMessage || ''
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i].url === url && reqList[i].data === data) {
      cancel(errorMsg)
      return
    }
  }
  if (!whiteListResult.includes(url)) {
    reqList.push({ url: url, data: data })
  }
}
axios.interceptors.request.use(
  config => {
    let cancel
    let url = config.url
    // 设置cancelToken对象
    config.cancelToken = new axios.CancelToken(function (c) {
      cancel = c
    })
    if (url.indexOf('/') != 0) {
      url = faceConfig.basePath + '/' + url
    } else {
      url = faceConfig.basePath + url
    }
    stopRepeatRequest(reqList, url, config.data, cancel, `${config.url} 请求被中断`)
    return config
  },
  err => Promise.reject(err)
)
axios.interceptors.response.use(
  response => {
    // setTimeout(() => {
    // console.log('clear-->', response)
    allowRequest(reqList, response.config.url)
    // }, 1000)
    return response
  },
  error => {
    if (axios.isCancel(error)) {
    } else {
      allowRequest(reqList, error.config.url)
    }
    return Promise.reject(error)
  }
)

const resDataConfig = {
  serviceSuccess: 'serviceSuccess', // 服务是否成功回调
  serviceSuccessRule: true, // 服务调用成功规则，设置serviceSuccess为成功时的标志，默认为boolean类型true，也可以设置数字或者字符串类型
  errors: 'errors', // 错误信息 包含错误消息
  message: 'message', // 简单错误信息,如果也有error,那么也会执行error的处理
  redirectUrl: 'redirectUrl' // 从定向地址
}

/**
 * @method submit
 * @param {Object} formObj 表单对象
 * @param {Object} submitParameter 提交参数
 * submitParameter:{
 *  url:XXX,//地址
 *  data:{},//提交参数
 *  method:'POST/GET',//提交方式   默认 'POST'
 *  responseType:'json/jsonp等'  默认 'json'
 *  autoValid:true/false        默认 false 提交前是否自动验证(有这个属性必须要填写formObj)
 *  showPageLoading:false/true/obj   默认true,是否显示加载中这个状态{text:'',icon:vnode,isTop:true}
 *  autoQs:true/false          默认true,是否自动序列化处理，关闭自动序列化后，HTTP请求头中的Content-Type将会被设置成'application/json; charset=utf-8'，借此可以传递JSON复杂对象，后台在参数中添加注解后自动解析
 *  isFormData:/true/false    默认false 是否使用formData方式传递参数，适用于带文件上传的提交
 *  autoSubmit:/true/false    默认false 是否自动提交,要求必须传入formObj
 * }
 *@param {object} callBack 回调函数
 * callBack:{
 *   successCallback:function(data){},//成功回调
 *   failCallback:function(data){},//失败回调
 *   serviceCallback :function(bool,data){},//业务成功/失败回调传入参数 true/false
 *   errorCallback:function(err){}//请求出错回调
 *   validFailCallback:function({validState:false}){}//验证失败回调
 * }
 * **/
function submit (formObj, submitParameter, callBack) {
  const resData = {
    ...resDataConfig,
    ...faceConfig.resDataConfig
  }
  let param = submitParameter || {}

  // 自动提交参数
  if (formObj && param.autoSubmit) {
    param.data = Object.assign(autoSubmitParam(formObj, param.autoSubmitParam || {}), param.data || {})
  }
  param = deepMerge(defaultParam(param), param)
  callBack = Object.assign(defaultCallBack(param), faceConfig?.selfSubmitCallback || {}, (callBack || {}))
  // 处理文件提交
  param = fileSubmit(param)
  const sbpro = new Promise((resolve, reject) => {
    // 验证
    if (formObj && param.autoValid) {
      let validState = false, validInfo = {}
      formObj.validateFieldsAndScroll((err, values) => {
        if (!err) {
          validState = true
        } else {
          validInfo = { error: err, values: values, validState: false }
        }
      })
      if (!validState) {
        if (typeof callBack.validFailCallback == 'function') {
          callBack.validFailCallback(validInfo)
        }
        reject(validInfo)
        return false
      }
    }
    // 提交
    if (param.showPageLoading !== false) {
      const maskCfg = {
        show: true,
        text: param.showPageLoading.text || '加载中',
        icon: param.showPageLoading.icon || false
      }
      Base.pageMask({ ...maskCfg })
    }
    axios(param).then((response) => {
      if (param.showPageLoading !== false) {
        Base.pageMask({ show: false })
      }
      // 处理responseType不是Json的问题
      if (param.responseType != 'json') {
        resolve(response)
        return
      }
      let data = null
      try {
        // IE 可能存在不能解析application/json的情况，导致response.data为undefined
        data = response.data || eval('(' + response.request.responseText + ')')
      } catch (e) {
        data = null
      }
      // 如果返回数据response.data为空,直接返回成功回调
      if (!data && response.status == 200) {
        resolve(response)
        return
      }
      const isSuccess = (data[resData.serviceSuccess] === resData.serviceSuccessRule)
      // 默认错误预处理
      callBack.defaultCallback(isSuccess, data)
      // 业务预处理(不管失败或者是成功都会调用)
      callBack.serviceCallback(isSuccess, data)
      // 成功处理
      if (callBack.successCallback && isSuccess) {
        callBack.successCallback(data)
      }
      // 失败处理
      if (callBack.failCallback && !isSuccess) {
        callBack.failCallback(data)
      }
      // 成功失败处理
      if (isSuccess) {
        resolve(data)
      } else {
        reject(data)
      }
    }).catch((error) => {
      if (param.showPageLoading !== false) {
        Base.pageMask({ show: false })
      }
      if (callBack.errorCallback) {
        callBack.errorCallback(error)
      }
      reject(error)
    })
  })
  return sbpro
}

// 默认回调处理
function defaultCallBack (param) {
  const resData = faceConfig.resDataConfig
  const cbk = {
    successCallback: null,
    failCallback: null,
    serviceCallback: function (type, data) {
      // 如果业务失败 弹出提示消息
      if (type === false) {
        // 处理报错message
        if (data[resData.message]) {
          message.error(data[resData.message], 0)
        }
        // 处理error中的报错信息
        if (data[resData.errors]?.length > 0) {
          let msg = '业务失败', errors = data[resData.errors]
          if (errors && errors instanceof Array && errors.length > 0) {
            for (let i = 0; i < errors.length; i++) {
              msg = errors[i].msg
            }
          }
          message.destroy()
          if (msg == 'session失效') {
            console.log(msg)
          } else {
            message.error(msg, 0)
          }
        }
      }
    },
    defaultCallback: function (type, data) {
      if (type === false) {
        // 处理errors信息中的报错码
        if (data[resData.errors]) {
          const errors = data[resData.errors]
          if (errors && errors instanceof Array && errors.length > 0) {
            if (errors[0].errorCode === '302' || errors[0].errorCode === '403' || errors[0].msg === 'session失效' || errors[0].msg === '未登录') {
              const str = errors[0]?.parameter
              const path = str?.substr(0, str.lastIndexOf('/'))
              setCookie('JSESSIONID', '', -1, path)
              setCookie('JSESSIONID', '', -1, param.baseURL)
              // 未登录并且有单点参数，表明走单点逻辑
              if ((errors[0].errorCode === '403' || errors[0].msg === '未登录') && data[resData.redirectUrl]) {
                try {
                  // 获取当前时间
                  const now = new Date().getTime()
                  // 如果从未跳转过（sessionStorage 中无值） 或者距离上次跳转时间大于 3 秒， 则进行单点跳转
                  if (top.window.sessionStorage.redirectTime === undefined || now - new Date(top.window.sessionStorage.redirectTime).getTime() > 3000) {
                    // 进入跳转逻辑时，重新设置跳转时间
                    top.window.sessionStorage.redirectTime = new Date()
                    // 跳转单点
                    window.location.href = data[resData.redirectUrl]
                  }
                } catch (e) {
                  window.location.href = data[resData.redirectUrl]
                }
              } else {
                // 如果未登录或者session 失效，但是又并没有满足单点得跳转逻辑，就走框架默认得登录页面
                // 如果当前页面不是登录页面，就跳转到登录页
                if (window.location.pathname !== '/login.html') {
                  // 框架默认登录页跳转
                  top.window.location.href = 'login.html'
                }
              }
              delete data[resData.message]
              data[resData.errors].shift()
            }
          }
        }
      }
    },
    errorCallBack: function (error) {
      console.log(error)
    }
  }

  return cbk
}

// 默认参数处理
function defaultParam (param) {
  let baseURL = ''
  try {
    baseURL = faceConfig.basePath
  } catch (e) {
    baseURL = '/api'
  }
  const headers = {}
  // 添加 headers默认参数
  headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  if (getCookie(baseURL + 'TA-JTOKEN') != null) {
    headers['TA-JTOKEN'] = getCookie(baseURL + 'TA-JTOKEN')
  }
  if (param.url && param.url.substr(0, 4) == 'http') {
    baseURL = ''
  }
  const pm = {
    method: 'POST',
    responseType: 'json', // 默认的
    withCredentials: true, // 表示跨域请求时是否需要使用凭证
    baseURL: baseURL,
    headers: headers,
    data: {},
    showPageLoading: true,
    isFormData: false,
    autoSubmit: false
  }
  return pm
}

// 提交处理
function fileSubmit (param) {
  // index的参数
  const indexParam = {
    _modulePartId_: getNowPageParam()._modulePartId_ || getNowPageParam().___businessId || ''
  }
  // 可自定义_modulePartId_
  if (param._modulePartId_) {
    indexParam._modulePartId_ = param._modulePartId_
  }
  if (param.isFormData) { // 文件上传时，FormData形式提交参数
    const formData = new FormData()
    Object.keys(param.data).forEach(key => {
      const param_d = param.data[key]
      if (param_d instanceof Array && (param_d[0] instanceof File)) {
        param_d.map(function (value, index) {
          formData.append(key, value)
        })
      } else {
        formData.append(key, param_d)
      }
    })
    Object.keys(indexParam).forEach(key => {
      formData.append(key, indexParam[key])
    })
    formData.append('frontUrl', window.location.href)
    param.data = formData
    param?.method?.toUpperCase() === 'GET' && (param.params = param.data)
    param.headers['Content-Type'] = 'multipart/form-data'
  } else { // 一般情况下提交参数
    if (!isPlainObject(param.data)) param.data = {}
    Object.keys(indexParam).forEach(key => {
      param.data[key] = indexParam[key]
    })
    // 单点参数
    param.data.frontUrl = window.location.href
    param?.method?.toUpperCase() === 'GET' && (param.params = param.data)
    // 是否自动序列化
    if (param.autoQs !== false) {
      param.data = Qs.stringify(param.data)
    } else {
      param.headers['Content-Type'] = 'application/json; charset=UTF-8'
    }
  }
  return param
}

function autoSubmitParam (formObj, autoSubmitParam) {
  const vals = formObj.getFieldsMomentValue()
  return vals
}

const formUtil = () => {
  return {
    submit
  }
}

export default formUtil()
