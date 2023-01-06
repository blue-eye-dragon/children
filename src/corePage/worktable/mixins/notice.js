/*
 * @Date: 2021-07-05 10:41:53
 * @information: 工作台的公告业务
 */
import cookies from '../js/cookie.js'

export default {
  data () {
    return {
      isShowNoticeModal: false, // 公告弹窗开关
      isDayNotRemind: false, // 当天不再提醒开关
      noticeRemindId: 'notice_' + window.parent.indexTool.getUserInfo().loginId, // 放cookie里的标志字段
      loginUserId: window.parent.indexTool.getUserInfo().userId, // 用户信息账号
      noticeObj: {}, // 请求到的公告信息

    }
  },
  async mounted () {
    await this.fetchNoticeData()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-07-02 13:47:07
     * @information: 加载系统公告
     */
    async fetchNoticeData () {
      // 判断cookie里标志字段
      const cookieRemindId = cookies.getCookie(this.noticeRemindId)
      if (cookieRemindId == this.loginUserId) { // 存在，当天不再提醒
        this.isShowNoticeModal = false
      } else { // 不存在，当天继续提醒
        let res = await this.post('/announcements/querySystemNoticeByLogin')
        let { serviceSuccess, data } = res
        if (!serviceSuccess) return
        if (!data.data || !Object.keys(data.data).length) { // 无数据
          this.noticeObj = {}
          this.isShowNoticeModal = false
          return
        }
        this.noticeObj = data.data || {}
        this.isShowNoticeModal = true
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-02 11:52:44
     * @information: 附件预览
     */
    handlePreview (file) {
      this.downloadFile(file)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 13:12:32
     * @information: 公告 - 当天不再提醒改变时
     */
    onChangeNotRemind (e) {
      this.isDayNotRemind = e.target.checked
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 13:19:33
     * @information: 公告弹窗关闭时
     */
    onCloseNoticeModal () {
      // 判断是否当天不再提醒
      if (this.isDayNotRemind) {
        cookies.setCookie(this.noticeRemindId, this.loginUserId)
      } else {
        cookies.removeCookie(this.noticeRemindId)
      }
      this.isShowNoticeModal = false
    },

  }

}
