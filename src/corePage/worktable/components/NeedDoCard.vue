<template>
  <div :class="data.name.indexOf('督办')!=-1?'__need-do-duban__':'__need-do__'"
       :style="style">
    <div class="__nd-icon-box__"
         :style="iconStyle">
      <i :class="['__nd-icon__', `__nd-icon-${data.configIcon?data.configIcon.toLowerCase(): 'default'}__`]"></i>
      <div class="__nd-nums__"
           v-show="parseInt(data.noDoCount) > 0"
           :style="numStyle">
        {{ data.noDoCount }}
      </div>
    </div>
    <div class="__nd-text__">
      {{ data.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    lineCount: {
      type: Number,
      default: 5
    },
    height: {
      type: Number,
      default: 138
    }
  },
  computed: {
    style () {
      const width = Number(100 / this.lineCount).toFixed(0)
      return {
        width: `calc(${width}% - 16px)`,
        height: `${this.height}px`
      }
    },
    iconStyle () {
      let size = 40
      if (this.height === 138) {
        size = 60
      }
      if (this.height === 116) {
        size = 34
      }
      return {
        marginTop: '15px',
        width: `${size}px`,
        height: `${size}px`
      }
    },
    numStyle () {
      if (this.height === 138) {
        return {}
      }
      if (this.height === 106) {
        return {
          right: '-10px',
          top: '-4px'
        }
      }
    }
  }
}
</script>

<style lang="less">
.__need-do__ {
  float: left;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(207, 213, 223, 1);
  border-radius: 4px;
  margin: 8px 16px 8px 0;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: rgba(33, 33, 47, 1);
  &:hover {
    background: rgba(41, 126, 255, 1);
    border: transparent;
    color: rgba(255, 255, 255, 1);
    .__nd-icon-box__ .__nd-icon-default__ {
      background-image: url("../icon/icon-gezy-w.png");
    }
    .__nd-icon-box__ .__nd-icon-gradd__ {
      background-image: url("../icon/icon-gezy-w.png");
    }
    .__nd-icon-box__ .__nd-icon-grcha__ {
      background-image: url("../icon/icon-grbg-w.png");
    }
    .__nd-icon-box__ .__nd-icon-grsub__ {
      background-image: url("../icon/icon-grjy-w.png");
    }
    .__nd-icon-box__ .__nd-icon-syrtqe__ {
      background-image: url("../icon/icon-kset-w.png");
    }
    .__nd-icon-box__ .__nd-icon-mtjhtj__ {
      background-image: url("../icon/icon-mtjh-w.png");
    }
    .__nd-icon-box__ .__nd-icon-mtjhjz__ {
      background-image: url("../icon/icon-mtjz-w.png");
    }
    .__nd-icon-box__ .__nd-icon-sswrfycha__ {
      background-image: url("../icon/icon-ssbg-w.png");
    }
    .__nd-icon-box__ .__nd-icon-sswrfyadd__ {
      background-image: url("../icon/icon-sssb-w.png");
    }
    .__nd-icon-box__ .__nd-icon-sswrfysub__ {
      background-image: url("../icon/icon-sswr-w.png");
    }
    .__nd-icon-box__ .__nd-icon-syyy__ {
      background-image: url("../icon/icon-syyy-w.png");
    }
    .__nd-icon-box__ .__nd-icon-clgrdb__ {
      background-image: url("../icon/clgrdb.png");
    }
    .__nd-icon-box__ .__nd-icon-clssdb__ {
      background-image: url("../icon/clssdb.png");
    }
    .__nd-icon-box__ .__nd-icon-spshdb__ {
      background-image: url("../icon/spshdb.png");
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
    top: 0;
    right: 0;
  }
  .__nd-text__ {
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .__nd-icon-box__ {
    margin: 0 auto 10px;
    width: 60px;
    height: 60px;
    position: relative;
    .__nd-icon__ {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .__nd-icon-box__ .__nd-icon-default__ {
    background-image: url("../icon/icon-gezy.png");
  }
  .__nd-icon-box__ .__nd-icon-gradd__ {
    background-image: url("../icon/icon-gezy.png");
  }
  .__nd-icon-box__ .__nd-icon-grcha__ {
    background-image: url("../icon/icon-grbg.png");
  }
  .__nd-icon-box__ .__nd-icon-grsub__ {
    background-image: url("../icon/icon-grjy.png");
  }
  .__nd-icon-box__ .__nd-icon-syrtqe__ {
    background-image: url("../icon/icon-kset.png");
  }
  .__nd-icon-box__ .__nd-icon-mtjhtj__ {
    background-image: url("../icon/icon-mtjh.png");
  }
  .__nd-icon-box__ .__nd-icon-mtjhjz__ {
    background-image: url("../icon/icon-mtjz.png");
  }
  .__nd-icon-box__ .__nd-icon-sswrfycha__ {
    background-image: url("../icon/icon-ssbg.png");
  }
  .__nd-icon-box__ .__nd-icon-sswrfyadd__ {
    background-image: url("../icon/icon-sssb.png");
  }
  .__nd-icon-box__ .__nd-icon-sswrfysub__ {
    background-image: url("../icon/icon-sswr.png");
  }
  .__nd-icon-box__ .__nd-icon-syyy__ {
    background-image: url("../icon/icon-syyy.png");
  }
  .__nd-icon-box__ .__nd-icon-clgrdb__ {
    background-image: url("../icon/clgrdb.png");
  }
  .__nd-icon-box__ .__nd-icon-clssdb__ {
    background-image: url("../icon/clssdb.png");
  }
  .__nd-icon-box__ .__nd-icon-spshdb__ {
    background-image: url("../icon/spshdb.png");
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
.__need-do-duban__ {
  float: left;
  background: rgba(255, 255, 255, 1);
  border: 1px solid ;
  border-radius: 4px;
  margin: 8px 16px 8px 0;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: rgba(33, 33, 47, 1);
  &:hover {
    background: rgba(41, 126, 255, 1);
    border: transparent;
    color: rgba(255, 255, 255, 1);
    .__nd-icon-box__ .__nd-icon-default__ {
      background-image: url("../icon/icon-gezy-w.png");
    }
    .__nd-icon-box__ .__nd-icon-gradd__ {
      background-image: url("../icon/icon-gezy-w.png");
    }
    .__nd-icon-box__ .__nd-icon-grcha__ {
      background-image: url("../icon/icon-grbg-w.png");
    }
    .__nd-icon-box__ .__nd-icon-grsub__ {
      background-image: url("../icon/icon-grjy-w.png");
    }
    .__nd-icon-box__ .__nd-icon-syrtqe__ {
      background-image: url("../icon/icon-kset-w.png");
    }
    .__nd-icon-box__ .__nd-icon-mtjhtj__ {
      background-image: url("../icon/icon-mtjh-w.png");
    }
    .__nd-icon-box__ .__nd-icon-mtjhjz__ {
      background-image: url("../icon/icon-mtjz-w.png");
    }
    .__nd-icon-box__ .__nd-icon-sswrfycha__ {
      background-image: url("../icon/icon-ssbg-w.png");
    }
    .__nd-icon-box__ .__nd-icon-sswrfyadd__ {
      background-image: url("../icon/icon-sssb-w.png");
    }
    .__nd-icon-box__ .__nd-icon-sswrfysub__ {
      background-image: url("../icon/icon-sswr-w.png");
    }
    .__nd-icon-box__ .__nd-icon-syyy__ {
      background-image: url("../icon/icon-syyy-w.png");
    }
    .__nd-icon-box__ .__nd-icon-clgrdb__ {
      background-image: url("../icon/clgrdb.png");
    }
    .__nd-icon-box__ .__nd-icon-clssdb__ {
      background-image: url("../icon/clssdb.png");
    }
    .__nd-icon-box__ .__nd-icon-spshdb__ {
      background-image: url("../icon/spshdb.png");
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
    top: 0;
    right: 0;
  }
  .__nd-text__ {
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .__nd-icon-box__ {
    margin: 0 auto 10px;
    width: 60px;
    height: 60px;
    position: relative;
    .__nd-icon__ {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .__nd-icon-box__ .__nd-icon-default__ {
    background-image: url("../icon/icon-gezy.png");
  }
  .__nd-icon-box__ .__nd-icon-gradd__ {
    background-image: url("../icon/icon-gezy.png");
  }
  .__nd-icon-box__ .__nd-icon-grcha__ {
    background-image: url("../icon/icon-grbg.png");
  }
  .__nd-icon-box__ .__nd-icon-grsub__ {
    background-image: url("../icon/icon-grjy.png");
  }
  .__nd-icon-box__ .__nd-icon-syrtqe__ {
    background-image: url("../icon/icon-kset.png");
  }
  .__nd-icon-box__ .__nd-icon-mtjhtj__ {
    background-image: url("../icon/icon-mtjh.png");
  }
  .__nd-icon-box__ .__nd-icon-mtjhjz__ {
    background-image: url("../icon/icon-mtjz.png");
  }
  .__nd-icon-box__ .__nd-icon-sswrfycha__ {
    background-image: url("../icon/icon-ssbg.png");
  }
  .__nd-icon-box__ .__nd-icon-sswrfyadd__ {
    background-image: url("../icon/icon-sssb.png");
  }
  .__nd-icon-box__ .__nd-icon-sswrfysub__ {
    background-image: url("../icon/icon-sswr.png");
  }
  .__nd-icon-box__ .__nd-icon-syyy__ {
    background-image: url("../icon/icon-syyy.png");
  }
  .__nd-icon-box__ .__nd-icon-clgrdb__ {
    background-image: url("../icon/clgrdb.png");
  }
  .__nd-icon-box__ .__nd-icon-clssdb__ {
    background-image: url("../icon/clssdb.png");
  }
  .__nd-icon-box__ .__nd-icon-spshdb__ {
    background-image: url("../icon/spshdb.png");
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
