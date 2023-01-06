<template>
  <div>
    <ta-tabs :activeKey="nowkey"
             @change="callback"
             type="line">
      <ta-tab-pane tab="就业信息"
                   key="1"
                   :forceRender="true">
        <FollowUpEmployment :childBaseId="childBaseId"></FollowUpEmployment>
      </ta-tab-pane>
      <ta-tab-pane tab="住房信息"
                   key="2"
                   :forceRender="true">
        <FollowUpHousing :childBaseId="childBaseId"></FollowUpHousing>
      </ta-tab-pane>
      <ta-tab-pane tab="回访记录"
                   key="3"
                   :forceRender="true">
        <FollowUpRecord :childBaseId="childBaseId"></FollowUpRecord>
      </ta-tab-pane>
    </ta-tabs>
  </div>
</template>
<script>
import FollowUpHousing from './followUpHousing'
import FollowUpEmployment from './followUpEmployment'
import FollowUpRecord from './followUpRecord'
export default {
  name: 'revoke',
  props: ['childEnterId', 'childBaseId'],
  components: {
    FollowUpHousing,
    FollowUpEmployment,
    FollowUpRecord
  },
  data () {
    return {
      nowkey: '1'
    }
  },
  mounted () {
    this.nowkey = '1'
  },
  methods: {
    // 查询参数
    userPageParams () {
      return {
        childBaseId: this.childBaseId
      }
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查看
    look (e, obj, index) {
      this.$emit('followUpLook', obj)
    }
  }
}
</script>

<style scoped lang="less">
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
