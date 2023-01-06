import './util/ieCompatibility'
import faceConfig from 'faceConfig'
import Vue from 'vue'
// 引入打包好Ta404UI
import Ta404UI from '@yh/ta404-ui/dist/ta404-ui'
import '@yh/ta404-ui/es/style/components.less'

import store from '@/common/store'
import taMixins from './mixins/mixins.js'
import VueBus from 'vue-bus'
import './util/authority'
import '@/common/less/reset.less'
// 添加框架组件样式覆盖样式文件
import '@projectCommon/styleCover/styleCover.less'

import html2canvas from 'html2canvas'
import { richEditor } from '@yh/ta404-ui'
import { userSelect } from '@yh/ta404-ui'
// import formUtil from '@yh/ta404-ui/es/utils/js/form.util'
// 覆盖form.util.js
import formUtil from './util/form.util.js'
import 'photoviewer/dist/photoviewer.css'
import PhotoViewer from 'photoviewer'
import { pageTool } from '@yh/ta404-ui'
import {
  post,
  getDictionaries,
  postRules,
  changetime,
  exportFile,
  idCardValidate,
  go,
  verificationRules,
  verificationRulesNotMustFill,
  selectNotMust,
  success,
  before_Upload,
  before_Upload1,
  downloadFile,
  downloadFileList, // 下载多个文件
  phoneRule,
  zipCodeRule, // 邮政编码验证
  nameRule,
  set_Container,
  setCalendarContainer, // 抽屉中的时间设置弹窗容器
  fnValidateTextarea,
  idCardrules,
  getarealabel,
  getchildtypelist,
  add, // 加法运算
  subtract, // 减法运算
  multiply, // 乘法运算
  divide, // 除法运算
  setLabelAndWrapperWidth, // 控制页面的标签（ant-form-item-label）和输入控件（ant-form-item-control-wrapper）的宽度
  setHeathData, // 列表健康状况处理
  setHeight, // 高级查询布局调整
  otherCardrules,
  maxlength,
  errfocus,
  deuRadios,

} from './util/request'
import Enum from './util/dictionaryEnum'

require('@/common/less/index-project.less')
// themeChange(localStorage.theme)
window.faceConfig = faceConfig
Vue.prototype.errfocus = errfocus
Vue.prototype.deuRadios = deuRadios
Vue.prototype.maxlength = maxlength
Vue.prototype.setHeight = setHeight
Vue.prototype.otherCardrules = otherCardrules
Vue.prototype.getchildtypelist = getchildtypelist
Vue.prototype.getarealabel = getarealabel
Vue.prototype.set_Container = set_Container
Vue.prototype.setCalendarContainer = setCalendarContainer
Vue.prototype.idCardrules = idCardrules
Vue.prototype.postRules = postRules
Vue.prototype.phoneRule = phoneRule
Vue.prototype.zipCodeRule = zipCodeRule // 邮政编码验证
Vue.prototype.nameRule = nameRule
Vue.prototype.post = post
Vue.prototype.changetime = changetime
Vue.prototype.exportFile = exportFile
Vue.prototype.getDictionaries = getDictionaries
Vue.prototype.idCardValidate = idCardValidate
Vue.prototype.go = go
Vue.prototype.verificationRules = verificationRules
Vue.prototype.selectNotMust = selectNotMust
Vue.prototype.verificationRulesNotMustFill = verificationRulesNotMustFill
Vue.prototype.success = success
Vue.prototype.before_Upload = before_Upload
Vue.prototype.before_Upload1 = before_Upload1
Vue.prototype.Enum = Enum
Vue.prototype.downloadFile = downloadFile
Vue.prototype.downloadFileList = downloadFileList
Vue.prototype.fnValidateTextarea = fnValidateTextarea
Vue.prototype.html2canvas = html2canvas
Vue.prototype.add = add
Vue.prototype.subtract = subtract
Vue.prototype.multiply = multiply
Vue.prototype.divide = divide
Vue.prototype.setLabelAndWrapperWidth = setLabelAndWrapperWidth
Vue.prototype.setHeathData = setHeathData
Vue.prototype.childTypeCode = window.parent.indexTool.getUserInfo().areaLevel == '4'
  ? 'INFOCOLLECTCHILDTYPE' // 信息采集儿童类别
  : (window.parent.indexTool.getUserInfo().orgType == '99'
    ? 'CHILDCATEGORYF' // 儿童类别-福利院
    : (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99'
      ? 'CHILDCATEGORYM' // 儿童类别-民政局
      : 'CHILDCATEGORYA')) // 儿童类别-全

window.faceConfig = faceConfig
Vue.use(Ta404UI)
Vue.use(VueBus)
Vue.use(richEditor)
Vue.use(userSelect)
Vue.use(formUtil)
Vue.use(pageTool)
Vue.prototype.PhotoViewer = PhotoViewer
// 数据字典初始化
const dict = require('@yh/ta404-ui/es/_dict')
dict.default.init(Vue, store)
window.Base.submit = Vue.prototype.Base.submit = formUtil.submit
export {
  Vue,
  store,
  taMixins
}
