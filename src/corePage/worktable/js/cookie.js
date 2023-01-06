var cookies = {
  setCookie: function (name, value) { // 设置截止到当天23：59:59
    var curDate = new Date()
    // 当前时间戳
    var curTamp = curDate.getTime()
    // 当前日期
    var curDay = curDate.toLocaleDateString()
    var curWeeHours = 0
    curWeeHours = new Date(curDay).getTime() - 1
    // 当日已经过去的时间（毫秒）
    var passedTamp = curTamp - curWeeHours
    // 当日剩余时间
    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp
    var leftTime = new Date()
    leftTime.setTime(leftTamp + curTamp)
    // 创建cookie
    document.cookie = name + '=' + value + ';expires=' + leftTime.toGMTString() + ';path=/'
  },
  getCookie: function (name) {
    // name 为想要取到的键值的键名
    var reg = /\s/g
    var result = document.cookie.replace(reg, '')
    var resultArr = result.split(';')
    for (var i = 0; i < resultArr.length; i++) {
      var nameArr = resultArr[i].split('=')
      if (nameArr[0] == name) {
        return nameArr[1]
      }
    }
  },
  removeCookie: function (name) {
    // name为想要删除的Cookie的键名
    var oDate = new Date() // 时间对象
    oDate.setDate(new Date().getDate() - 1)
    document.cookie = name + '=123;expires=' + oDate + ';path=/'
  }
}
export default cookies
