<template>
  <div class="__sex-ratio__">

    <ul class="left"
        v-if="data.length>0">
      <li v-for="(item, index) in data "
          @click="gopage(item, index)"
          :key="index">
        <p><span> <i :class="['__nd-icon__', `__nd-icon-${item.configIcon.toLowerCase() || 'default'}__`]"></i>
            <div class="__nd-nums__"
                 v-show="parseInt(item.noDoCount) > 0">{{ item.noDoCount }}</div>
          </span></p>
        <p>{{item.name}}</p>
      </li>
    </ul>

  </div>
</template>

<script>
import NeedDoCard from './NeedDoCard'
export default {
  components: {
    NeedDoCard
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {},
  methods: {
    gopage (item, index) {
      this.$emit('itemClick', item, index)
    }
  }
}

</script>

<style lang="less">
.__sex-ratio__ {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    list-style: none;
    // width: 50%;
    margin: 0;
    padding: 0;
  }
  .left {
    li {
      text-align: center;
      border: 1px solid #e4e9f2;
      height: 106px;
      width: calc((100%) / 2 - 8px);
      display: inline-block;
      margin-right: 8px;
      box-sizing: border-box;
      margin-bottom: 8px;
      border-radius: 4px;
      padding-bottom: 10px;
      vertical-align: middle;
      p {
        span {
          display: inline-block;
          width: 34px;
          height: 34px;
          margin-top: 20px;
          position: relative;
          color: #21212f;
          i {
            position: absolute;
            display: inline-block;
            width: 18px;
            height: 18px;
            color: #fff;
            // background: red;
            opacity: 1;
            border-radius: 50%;
            font-style: normal;
            transform: skew(0);
            right: -4px;
            top: -6px;
            line-height: 20px;
          }
        }
        .__nd-nums__ {
          position: absolute;
          -webkit-animation: twinkling 1s infinite ease-out;
          color: rgba(255, 255, 255, 1);
          background: rgba(255, 49, 49, 1);
          border-radius: 50%;
          min-width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          top: -10px;
          right: -10px;
        }
        .__nd-icon__ {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        .__nd-icon-default__ {
          background-image: url("../icon/icon-gezy-w.png");
        }
        .__nd-icon-gradd__ {
          background-image: url("../icon/icon-gezy-w.png");
        }
        .__nd-icon-grcha__ {
          background-image: url("../icon/icon-grbg-w.png");
        }
        .__nd-icon-grsub__ {
          background-image: url("../icon/icon-grjy-w.png");
        }
        .__nd-icon-syrtqe__ {
          background-image: url("../icon/icon-kset-w.png");
        }
        .__nd-icon-mtjhtj__ {
          background-image: url("../icon/icon-mtjh-w.png");
        }
        .__nd-icon-mtjhjz__ {
          background-image: url("../icon/icon-mtjz-w.png");
        }
        .__nd-icon-sswrfycha__ {
          background-image: url("../icon/icon-ssbg-w.png");
        }
        .__nd-icon-sswrfyadd__ {
          background-image: url("../icon/icon-sssb-w.png");
        }
        .__nd-icon-sswrfysub__ {
          background-image: url("../icon/icon-sswr-w.png");
        }
        .__nd-icon-syyy__ {
          background-image: url("../icon/icon-syyy-w.png");
        }
        .__nd-icon-clgrdb__ {
          background-image: url("../icon/clgrdb.png");
        }
        .__nd-icon-clssdb__ {
          background-image: url("../icon/clssdb.png");
        }
        .__nd-icon-spshdb__ {
          background-image: url("../icon/spshdb.png");
        }
        .icon1 {
          background-image: url("../icon/icon-1.png");
        }
        .icon2 {
          background-image: url("../icon/icon-2.png");
        }
        .icon3 {
          background-image: url("../icon/icon-3.png");
        }
        .icon4 {
          background-image: url("../icon/icon-4.png");
        }
        .icon5 {
          background-image: url("../icon/icon-5.png");
        }
      }
    }
    li:nth-of-type(2n) {
      margin-right: 0;
    }
    li:hover {
      background: #297eff;
      cursor: pointer;
      p {
        color: #fff;
      }
    }
  }
  .__icon-n__ {
    background-image: url("../icon/icon-male.png");
  }
  @-webkit-keyframes twinkling {
    /*透明度由0到1*/
    0% {
      // opacity: 0; /*透明度为0*/
      transform: scale(0.8);
    }
    100% {
      // opacity: 1; /*透明度为1*/
      transform: scale(1.3);
    }
  }
}
</style>
