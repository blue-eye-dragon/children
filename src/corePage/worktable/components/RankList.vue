<template>
  <div class="__rank-list__">
    <div v-for="(item, index) in dataList" :key="index" class="__line__">
      <div :class="['__rank__', index < 3 ? '__ranktop__' : '']">
        <div class="__rankCircle__">{{ index + 1 }}</div>
      </div>

      <div class="__typename__">
        {{ item.typeName }}
      </div>
        <div class="__childnum__">
          {{ item.childNum }}
        </div>
        <div class="__childratio__">{{ item.childRatio }}</div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less">
.__rank-list__ {
  font-size: 16px;
  line-height: 24px;
  color: rgba(33, 33, 47, 1);
  width: 100%;
  overflow: hidden;
  min-width: 200px;
  .__line__ {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    margin: 8px 0;
    padding: 0 8px;
    width: 100%;
    overflow: hidden;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
  }
  .__line__:nth-child(even) {
    background: rgba(41, 126, 255, 0.1);
  }
  .__rank__ {
    width: 30px;
    margin-right: 8px;
  }
  .__rankCircle__ {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(41, 126, 255, 0.3);
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  .__ranktop__ {
    .__rankCircle__ {
      background: rgba(248, 128, 98, 1);
      color: #ffffff;
    }
  }
  .__typename__ {
    flex: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .__childnum__ {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
    white-space: nowrap;
  }
  .__childratio__ {
    text-align: right;
    width: 70px;
    flex: 0 0 auto;
  }
}
</style>
