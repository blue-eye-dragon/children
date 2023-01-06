<template>
  <div class="conts">
    <div class="contin">
      <!-- <ta-anchor class="md" :offsetTop="10" @click.native="chans">
        <ta-anchor-link href="#anchorpoint_a" title="增员申请信息" />
        <ta-anchor-link href="#anchorpoint_b" title="区县审核信息" />
        <ta-anchor-link href="#anchorpoint_c" title="市级审核信息" />
        <ta-anchor-link href="#anchorpoint_d" title="省级审核信息" />
      </ta-anchor> -->
      <div ref="oneout" class="mars">
        <Title id="anchorpoint_a" title="增员申请信息" :show.sync="showone"></Title>
        <ta-form
          layout="horizontal"
          ref="one"
          :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}"
        >
          <Additionainformation></Additionainformation>
        </ta-form>
      </div>
      <div ref="twoout" class="mars">
        <Title id="anchorpoint_b" title=" 区县审核信息" :show.sync="showtwo"></Title>
        <ta-form
          layout="horizontal"
          ref="two"
          :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}"
        >
         <Countyexamine types="2"></Countyexamine>
        </ta-form>
      </div>
      <div ref="threeout" class="mars">
        <Title id="anchorpoint_c" title=" 市级审核信息" :show.sync="showthree"></Title>
        <ta-form
          layout="horizontal"
          ref="three"
          :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}"
        >
         <Countyexamine types="1"></Countyexamine>
        </ta-form>
      </div>
      <div ref="fourout" class="mars">
        <Title id="anchorpoint_d" title=" 省级审核信息" :show.sync="showfour"></Title>
        <ta-form
          layout="horizontal"
          ref="four"
          :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}"
        >
         <Countyexamine types="3"></Countyexamine>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button type="danger" class="preservation" @click="submit">驳回</ta-button>
      <ta-button class="preservation" @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import Additionainformation from '../components/additionainformation'
import Countyexamine from '../components/countyexamine'
import CityExamine from '../components/cityExamine'
export default {
  components: {
    Title,
    Additionainformation,
    Countyexamine,
    CityExamine
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,
      showfour: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
      this.setHeight('three', 'threeout')
      this.setHeight('four', 'fourout')
    })
    window.onresize = () => {
      console.log(this.showone)
      // this.showone = true
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.showone)
        this.setHeight('two', 'twoout', !this.showtwo)
        this.setHeight('three', 'threeout', !this.showthree)
        this.setHeight('four', 'fourout')
      })
    }
  },
  methods: {
    chans () {
      // this.$router.go(-1)
      // console.log(111)
    },
    submit () {},
    backs () {
      console.log(111)
      this.$router.go(-1)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    }
  },
  watch: {
    showone (val) {
      console.log(111)
      console.log(val)
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    },
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    }
  }
}
</script>
<style scoped lang="less">
.conts {
  width: 100%;
  min-height: 600px;
  background: #eff1f4;
  padding: 14px 14px 98px 14px;
}
.contin {
  width: 100%;
  min-height: 720px;
  background: #fff;
  padding: 1px 25px;
  box-sizing: border-box;
}
.mars {
  width: 83%;
  margin-top: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
}
.mars:last-child {
  margin-bottom: 30px;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.bom {
  width: calc(100% - 28px);
  height: 80px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  left: 14px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eff1f4;
}
.preservation {
  margin-left: 32px;
}
</style>
