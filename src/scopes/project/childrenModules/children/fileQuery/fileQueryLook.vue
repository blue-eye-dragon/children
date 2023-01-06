<template>
  <div style="height:100%">
    <ta-border-layout :layout="{left:'210px'}"
                      :showPadding="false">
      <div slot="left">
        <ta-button type="primary"
                   @click="returns"
                   style="margin-bottom: 16px">
          <ta-icon type="rollback" />返回儿童档案
        </ta-button>
        <ta-menu :defaultSelectedKeys="['1']"
                 v-model="selectKeys"
                 mode="inline"
                 theme="light">
          <ta-menu-item key="1"
                        @click="callback">
            <ta-icon type="pie-chart" />
            <span>身份档案</span>
          </ta-menu-item>
          <ta-menu-item key="2"
                        @click="callback">
            <ta-icon type="desktop" />
            <span>福利档案</span>
          </ta-menu-item>
          <ta-menu-item key="3"
                        @click="callback">
            <ta-icon type="inbox" />
            <span>保护档案</span>
          </ta-menu-item>
          <ta-menu-item key="4"
                        @click="callback">
            <ta-icon type="inbox" />
            <span>收养档案</span>
          </ta-menu-item>
          <ta-menu-item key="5"
                        @click="callback">
            <ta-icon type="inbox" />
            <span>信息变更记录</span>
          </ta-menu-item>
        </ta-menu>
      </div>
      <ta-border-layout :showBorder='false'
                        :layout="{header:'0px'}">
        <div>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </ta-border-layout>
    </ta-border-layout>
  </div>

</template>
<script>
export default {
  data () {
    return {
      nowkey: '1',
      childBaseId: '', // 儿童基本信息id
      childFosterId: '', // 寄养id
      selectKeys: ['1']
    }
  },
  activated () {
    // 初始化数据
    this.initDatas()
    console.log('childBaseId是：', this.childBaseId)
  },
  mounted () {
  },
  methods: {
    initDatas () {
      this.childBaseId = this.$route.query.childBaseId
      this.childFosterId = this.$route.query.childFosterId
      this.nowkey = '1'
      this.selectKeys = ['1']
      this.callback({ key: 1 })
    },
    callback (val) {
      this.nowkey = val.key + ''
      if (val.key == 1) { // 身份档案
        let url = '/childArchives/queryChildFileByChildBaseId'
        this.$router.push({
          name: 'fileQueryLook_orphansHandicapped',
          query: {
            url: url, params: JSON.stringify({ childBaseId: this.childBaseId }), isChildFiles: true, operateFlag: 'look_now'
          }
        })
      }
      if (val.key == 2) { // 福利档案
        this.$router.push({
          name: 'welfareArchives',
          query: { childBaseId: this.childBaseId, childFosterId: this.childFosterId }
        })
      }
      if (val.key == 3) { // 保护档案
        this.$router.push({
          name: 'protectionFiles',
          query: { childBaseId: this.childBaseId }
        })
      }
      if (val.key == 4) { // 收养档案
        this.$router.push({
          name: 'adoptionArchives',
          query: { childBaseId: this.childBaseId }
        })
      }
      if (val.key == 5) { // 信息变更记录
        this.$router.push({
          name: 'informationChangeRecordInfo',
          query: { childBaseId: this.childBaseId }
        })
      }
    },
    // 返回儿童档案列表页面
    returns () {
      this.$router.push({
        name: 'fileQuery'
      })
    }
  }
}
</script>
<style scoped>
.fixreturn {
  position: fixed;
  left: 0;
  padding: 10px 25px;
  width: 100%;
  background-color: white;
  z-index: 982;
}
.fixtab {
  padding: 3% 0;
}
</style>
