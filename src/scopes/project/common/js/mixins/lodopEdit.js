/* eslint-disable prettier/prettier */
let CreatedOKLodop7766 = null

export function needCLodop () {
  try {
    const ua = navigator.userAgent
    if (ua.match(/Windows\sPhone/i) != null) return true
    if (ua.match(/iPhone|iPod/i) != null) return true
    if (ua.match(/Android/i) != null) return true
    if (ua.match(/Edge\D?\d+/i) != null) return true

    const verTrident = ua.match(/Trident\D?\d+/i)
    const verIE = ua.match(/MSIE\D?\d+/i)
    let verOPR = ua.match(/OPR\D?\d+/i)
    let verFF = ua.match(/Firefox\D?\d+/i)
    const x64 = ua.match(/x64/i)
    if (verTrident == null && verIE == null && x64 !== null) return true
    else if (verFF !== null) {
      verFF = verFF[0].match(/\d+/)
      if (verFF[0] >= 41 || x64 !== null) return true
    } else if (verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/)
      if (verOPR[0] >= 32) return true
    } else if (verTrident == null && verIE == null) {
      let verChrome = ua.match(/Chrome\D?\d+/i)
      if (verChrome !== null) {
        verChrome = verChrome[0].match(/\d+/)
        if (verChrome[0] >= 41) return true
      }
    }
    return false
  } catch (err) {
    return true
  }
}

//= ===页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
  const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
  let oscript = document.createElement('script')
  oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
  head.insertBefore(oscript, head.firstChild)

  // 引用双端口(8000和18000）避免其中某个被占用：
  oscript = document.createElement('script')
  oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=0'
  head.insertBefore(oscript, head.firstChild)
}

//= ===获取LODOP对象的主过程：====
export function getLodop (vm, oOBJECT, oEMBED) {
  const h = vm.$createElement
  let LODOP
  try {
    const isIE = navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Trident') >= 0
    if (needCLodop()) {
      try {
        LODOP = getCLodop()
      } catch (err) { }
      if (!LODOP && document.readyState !== 'complete') {
        vm.$message.error('C-Lodop没准备好，请稍后再试！')
        return
      }
      const is64IE = isIE && navigator.userAgent.indexOf('x64') >= 0
      let hrefUrl = 'http://www.lodop.net/demolist/CLodop_Setup_for_Win32NT.zip'
      if (is64IE) {
        hrefUrl = 'http://www.lodop.net/demolist/CLodop_Setup_for_Win64NT.zip'
      }
      if (!LODOP) {
        Modal.warning({
          title: '打印提示',
          content:
            h('div', null, [
              h('span', null, '打印软件未安装或未启动，请'),
              // h('a', { attrs: { href: 'http://localhost:8080/' + 'static/doc/CLodop_Setup_for_Win32NT.exe' }, style: { cursor: 'pointer', 'text-decoration': 'underline' } }, '点击这里下载打印软件并安装'),
              // h('a', { attrs: { href: 'http://123.182.234.124:11601/upgrade/' + 'static/doc/CLodop_Setup_for_Win32NT.exe' }, style: { cursor: 'pointer', 'text-decoration': 'underline' } }, '点击这里下载打印软件并安装'),
              h('a', { attrs: { href: 'https://etfl.mca.gov.cn/static/doc/CLodop_Setup_for_Win32NT.exe' }, style: { cursor: 'pointer', 'text-decoration': 'underline' } }, '点击这里下载打印软件并安装'),
              h('span', null, '（若此前已安装过，请先启动），安装后请先刷新浏览器，再进入该页面进行打印。')
            ]),
          okText: '关闭'
        })
        return
      } else {
        if (CLODOP.CVERSION < '3.0.9.3') {
          Modal.warning({
            title: '打印提示',
            content:
              h('div', null, [
                h('span', null, 'Web打印服务CLodop需升级，请'),
                h('a', { attrs: { href: hrefUrl }, style: { cursor: 'pointer' } }, '点击这里执行升级'),
                h('span', null, '升级后请先刷新浏览器，再进入该页面进行打印。')
              ]),
            okText: '关闭'
          })
        }
        if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED)
        if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT)
      }
    } else {
      const is64IE = isIE && navigator.userAgent.indexOf('x64') >= 0
      //= ====如果页面有Lodop就直接使用，没有则新建:==========
      if (oOBJECT != undefined || oEMBED != undefined) {
        if (isIE) LODOP = oOBJECT
        else LODOP = oEMBED
      } else if (CreatedOKLodop7766 == null) {
        LODOP = document.createElement('object')
        LODOP.setAttribute('width', 0)
        LODOP.setAttribute('height', 0)
        LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;')
        if (isIE) LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA')
        else LODOP.setAttribute('type', 'application/x-print-lodop')
        document.documentElement.appendChild(LODOP)
        CreatedOKLodop7766 = LODOP
      } else LODOP = CreatedOKLodop7766
      //= ====Lodop插件未安装时提示下载地址:==========
      let tipText = ''
      if (LODOP == null || typeof LODOP.VERSION == 'undefined') {
        if (navigator.userAgent.indexOf('Chrome') >= 0) {
          tipText += '(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行安装）<br/>'
        }
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
          tipText += '（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）<br/>'
        }
        if (is64IE) {
          tipText += 'Web打印服务CLodop未安装启动，请<a style="text-decoration:underline;" href="' + window.faceConfig.staticServer + 'static/doc/install_lodop64.exe' + '" target="_self">点击这里执行安装</a>（若此前已安装过，请先启动），安装后请刷新页面再重新进入。'
        } else if (isIE) {
          tipText += 'Web打印服务CLodop未安装启动，请<a style="text-decoration:underline;" href="' + window.faceConfig.staticServer + 'static/doc/install_lodop32.exe' + '" target="_self">点击这里执行安装</a>（若此前已安装过，请先启动），安装后请刷新页面再重新进入。'
        }
        Modal.warning({
          title: '打印提示',
          content: h('div', { domProps: { innerHTML: tipText } }),
          okText: '关闭'
        })
        return LODOP
      }
    }
    if (LODOP.VERSION < '6.2.2.6') {
      if (!needCLodop()) {
        let tipText = ''
        if (is64IE) {
          tipText += '打印控件需要升级!点击这里<a style="text-decoration:underline;" href="http://www.lodop.net/demolist/install_lodop64.zip" target="_self">执行升级</a>,升级后请重新进入。'
        } else if (isIE) {
          tipText += '打印控件需要升级!点击这里<a style="text-decoration:underline;" href="http://www.lodop.net/demolist/install_lodop32.zip" target="_self">执行升级</a>,升级后请重新进入。'
        }
      }
      return LODOP
    }
    //= ==如下空白位置适合调用统一功能(如注册语句、语言选择等):===

    //= ==========================================================
    return LODOP
  } catch (err) {
    vm.$message.error('getLodop出错:' + err)
  }
}
