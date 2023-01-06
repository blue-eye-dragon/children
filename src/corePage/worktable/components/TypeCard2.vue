<template>
  <div class="__type-card__">
    <div class="__tc1__">
      <div class="__tc11__">{{ data.configTitle }}</div>
      <div class="__tc12__"
           v-if="data.configQueryAdress!='1'&&data.configQueryAdress!='3'">
        登记在册
        <span class="__num__"
              @click="cilckCard(data.configQueryAdress,'1')">{{this.deuData(data.childRegisterTotalNum)}}</span>
        {{ unit }}
      </div>
      <div class="__tc13__"
           v-if="data.configQueryAdress!='1'&&data.configQueryAdress!='3'">
        本月享受
        <span class="__num__"
              @click="cilckCard(data.configQueryAdress,'2')">{{this.deuData(data.childTotalNum)}}</span>
        {{ unit }}
      </div>
      <div class="__tc14__"
           v-if="data.configQueryAdress=='1'||data.configQueryAdress=='3'">
        登记在册
        <span class="__num__"
              @click.stop="jumpToQuery(data)">{{this.deuData(data.childTotalNum)}}</span>
        {{ unit }}
      </div>
    </div>
    <div class="__tc2__">
      <i class="__icon__"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data () {
    return {
      unit: '人'
    }
  },
  methods: {
    // 留守儿童、留守妇女点击数字跳转至综合查询
    jumpToQuery (e) {
      if (e.configQueryAdress == '1') { // 留守儿童
        Base.openTabMenu({
          id: '1000000000000176682',
          url: 'children.html#/stayBehindChildSearch',
          name: '留守儿童查询'
        })
      }
      if (e.configQueryAdress == '3') { // 留守妇女
        Base.openTabMenu({
          id: '1000000000000176684',
          url: 'children.html#/stayBehindWomenSearch',
          name: '留守妇女查询'
        })
      }
    },
    deuData (n) { // 分段。
      let nStr = n + '', x, x1, x2
      if (n) {
        x = nStr.split('.')
        x1 = x[0]
        x2 = x.length > 1 ? '.' + x[1] : ''
        var rgx = /(\d+)(\d{3})/
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2')
        }
        return x1 + x2
      } else { return '-' }
    },
    cilckCard (type, satate) {
      const orgType = window.parent.indexTool.getUserInfo().orgType
      console.log(type, satate)
      const obj1 = {
        id: '1000000000000250843',
        url: `children.html#/orphanedDisChildStatistics?type=${type}&satate=${satate}`,
        name: '孤残儿童查询'
      }
      const obj2 = {
        id: '1000000000000278732',
        url: `children.html#/comprehensiveChildStatistics1?type=${type}&satate=${satate}`,
        name: '事实无人抚养儿童查询'
      }
      const obj3 = {
        id: '1000000000000253363',
        url: `children.html#/comprehensiveChildStatistics?type=${type}&satate=${satate}`,
        name: '困境儿童查询'
      }
      if (type == '7' || type == '4') {
        Base.openTabMenu(obj1)
      }
      if (type == '6') {
        if (orgType == '99' || orgType == '98') {
          Base.openTabMenu(obj2)
        } else {
          Base.openTabMenu(obj3)
        }
      }
    }
  }
}
</script>

<style lang="less">
.__type-card__ {
  width: 100%;
  min-width: 190px;
  height: 100px;
  flex: 0 0 auto;
  color: #ffffff;
  overflow: hidden;
  border-radius: 8px;
  background: linear-gradient(
    91deg,
    rgba(85, 151, 251, 1) 0%,
    rgba(8, 88, 210, 1) 100%
  );
  position: relative;
  padding: 13px;
  display: flex;
  justify-content: space-between;
  .__tc11__ {
    font-size: 16px;
    font-weight: 600;
    line-height: 21px;
    color: rgba(255, 255, 255, 1);
    position: relative;
    padding-left: 12px;
  }
  .__tc11__::before {
    width: 5px;
    height: 13px;
    background: rgba(255, 255, 255, 1);
    content: "";
    position: absolute;
    top: 4px;
    left: 0;
  }
  .__tc12__ {
    color: rgba(239, 239, 239, 1);
    font-size: 14px;
    margin-top: 10px;
    font-weight: bold;
    .__num__ {
      cursor: pointer;
    }
  }
  .__tc13__ {
    color: rgba(239, 239, 239, 1);
    font-size: 14px;
    font-weight: bold;
    .__num__ {
      cursor: pointer;
    }
  }
  .__tc14__ {
    color: rgba(239, 239, 239, 1);
    font-size: 14px;
    margin-top: 22px;
    padding-left: 8px;
    font-weight: bold;
  }
  .__num__ {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    margin: 0 4px;
    cursor: pointer;
  }
  .__tc2__ {
    right: 11px;
    top: 20px;
    position: absolute;
    z-index: 0;
  }
  .__icon__ {
    width: 54px;
    height: 54px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
}
</style>
