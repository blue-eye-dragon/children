<template>
  <div class="__type-card-list2__">
    <div class="__tcc__">
      <div class="__tcc1__">
        <TypeCard2 v-for="(item, index) in dataList"
                   :data="item"
                   :key="index"
                   @click.native="clickItem(item, index)"
                   :class="[
            `__type-card-${findIcon(item)}__`,
            isCanClick && selectIndex === index ? '__tcs__' : '',
            isCanClick ? '__type-card-cur__' : ''
          ]"
                   :lineCount="lineCount"></TypeCard2>
      </div>
    </div>
  </div>
</template>

<script>
// 判断 返回值 是什么
import TypeCard2 from './TypeCard2'
export default {
  components: {
    TypeCard2
  },
  props: {
    isCanClick: {
      type: Boolean,
      default: true
    },
    dataList: {
      type: Array,
      required: true,
      default: () => []
    },
    currentTitle: String,
    lineCount: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      selectIndex: 0
    }
  },
  methods: {
    clickItem (item, index) {
      if (this.isCanClick) {
        this.$emit('clickItem', item)
        this.selectIndex = index
      }
    },
    findIcon (item) {
      let index = 0
      switch (item.configTitle) {
        case '留守儿童':
          index = 1
          break
        case '孤儿':
          index = 2
          break
        case '留守妇女':
          index = 3
          break
        case '事实无人抚养儿童':
          index = 4
          break
        case '跨省通办儿童':
          index = 5
          break
      }
      return index
    }
  }
}
</script>

<style lang="less">
.__type-card-list2__ {
  width: 100%;
  padding: 8px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  .__tcc__ {
    overflow: hidden;
    width: 100%;

    .__tcc1__ {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .__tcc1__ > div {
      margin: 12px;
      width: calc((100% - 96px) / 3);
    }
  }
  .__tcs__ {
    box-shadow: 8px 8px 5px rgba(0, 0, 0, 0.6);
  }
  .__type-card-0__ {
    background: linear-gradient(91deg, #2bb9d6 0%, #0088c5 100%);
    i {
      background-image: url("../icon/icon-child.png");
    }
  }
  .__type-card-1__ {
    background: linear-gradient(91deg, #f89552 0%, #edca56 100%);
    i {
      background-image: url("../icon/icon-ma.png");
    }
  }
  .__type-card-2__ {
    background: linear-gradient(91deg, #2bb9d6 0%, #0088c5 100%);
    i {
      background-image: url("../icon/icon-child.png");
    }
  }
  .__type-card-3__ {
    background: linear-gradient(91deg, #a6d266 0%, #529b29 100%);
    i {
      background-image: url("../icon/icon-women.png");
    }
  }
  .__type-card-4__ {
    background: linear-gradient(91deg, #fbb355 0%, #e65c00 100%);
    i {
      background-image: url("../icon/icon-people.png");
    }
  }
  .__type-card-5__ {
    background: linear-gradient(91deg, #5597fb 0%, #0858d2 100%);
    i {
      background-image: url("../icon/icon-house.png");
    }
  }
  .__type-card-cur__ {
    cursor: pointer;
  }
}
</style>
