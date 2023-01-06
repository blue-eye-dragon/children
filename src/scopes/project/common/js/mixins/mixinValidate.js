export default {
  data () {
    let emptyMsg = '该项不能为空'
    return {
      mixValidateType: {
        'chinese': { regex: /^[\u4e00-\u9fa5]+$/, emptyMsg, errorMsg: '请输入中文汉字' },
        'idCard': { regex: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/, emptyMsg, errorMsg: '请输入正确的身份证号' }
      }
    }
  },
  methods: {
    mixValidate (rule, value, callback) {
      if (this.mixValidateType[rule.type] === undefined) {
        callback()
        console.error(`${rule.type}还没有设置校验规则，请设置！`)
        return
      }
      let item = this.mixValidateType[rule.type]
      if (rule.required && rule.required === true) {
        if (value === '') {
          callback(rule.emptyMsg ? rule.emptyMsg : item.emptyMsg)
          return
        }
      }
      if (item.regex.test(value)) {
        callback()
      } else {
        if (value === '') {
          callback()
        } else {
          callback(rule.errorMsg ? rule.errorMsg : item.errorMsg)
        }
      }
    }
  }
}
