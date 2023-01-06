<template>
  <div class="conts">
    <!-- <ta-tabs class="contin" :activeKey="nowkey" @change="callback">
      <ta-tab-pane v-bind="disabled"  tab="" key="1"> -->
        <!-- <ta-anchor class="md" :offsetTop="100" @click.native="chans">
          <ta-anchor-link href="#anchorpoint_a" title="被收养人信息" />
          <ta-anchor-link href="#anchorpoint_b" title="收养人信息" />
          <ta-anchor-link v-if="childtype!=5" href="#anchorpoint_c" title="送养人信息" />
          <ta-anchor-link href="#anchorpoint_d" title="情况说明" />
        </ta-anchor> -->
        <!-- <ta-form :autoFormCreate="(form)=>{this.form = form}" layout="horizontal">
          <ta-form-item label="收养类别:" class="fromwid" :require="{message:'请选择!'}">
            <ta-select v-model="childtype" class="selectwid" @change="selectchange">
              <ta-select-option
                v-for="(item,index) in adoptionlist"
                :value="item.val"
                :key="index"
              >{{item.name}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-form> -->

        <div ref="oneout" class="mars">
          <Title id="anchorpoint_a" title="被收养人信息" :show.sync="showone"></Title>
          <ta-form
            layout="horizontal"
            ref="one"
            :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}"
          >
            <CptAdopted></CptAdopted>
          </ta-form>
        </div>

        <div ref="twoout" class="mars">
          <Title id="anchorpoint_b" title="收养人信息" :show.sync="showtwo"></Title>
          <ta-form
            layout="horizontal"
            ref="two"
            :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}"
          >
            <CptAdoptor :typeadoption.sync="typeadoption"></CptAdoptor>
          </ta-form>
        </div>

        <div ref="threeout" class="mars" v-if="childtype!=5">
          <Title id="anchorpoint_c" title="送养人信息" :show.sync="showthree"></Title>
          <ta-form
            layout="horizontal"
            ref="three"
            :autoFormCreate="(fiveRaiseFrom)=>{this.fiveRaiseFrom = fiveRaiseFrom}"
          >
            <template v-if="childtype<2">
              <FiveRaise></FiveRaise>
            </template>
            <template v-else>
              <NotcptAdoptor></NotcptAdoptor>
            </template>
          </ta-form>
        </div>

        <div ref="fourout" class="mars">
          <Title id="anchorpoint_d" title="情况说明" :show.sync="showfour"></Title>
          <ta-form
            layout="horizontal"
            ref="four"
            :autoFormCreate="(adInformationnoteFrom)=>{this.adInformationnoteFrom = adInformationnoteFrom}"
          >
            <AdInformationnote></AdInformationnote>
          </ta-form>
        </div>
      <!-- </ta-tab-pane> -->
      <!-- <ta-tab-pane tab="家庭子女信息" key="2">
        <Family types="2" :familyobj.sync="familyobj"></Family>
      </ta-tab-pane>
      <ta-tab-pane tab="笔录信息" key="3">
        <Record types="1"></Record>
      </ta-tab-pane>
      <ta-tab-pane tab="调查信息" key="4">
        <Investigation types="1"></Investigation>
      </ta-tab-pane>
      <ta-tab-pane tab="文件上传" key="5">
        <FileUpload types="1"></FileUpload>
      </ta-tab-pane>
      <ta-tab-pane tab="打印" key="6">
        <Printing types="1"></Printing>
      </ta-tab-pane> -->
    <!-- </ta-tabs> -->
    <div class="bom">
      <ta-button  class="preservation" @click="back">返回</ta-button>
      <ta-button type="primary" @click="submit">提交</ta-button>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import CptAdopted from '../components/cptAdopted'
import CptAdoptor from '../components/cptAdoptor'
import FiveRaise from '../components/fiveRaise'
import Family from '../components/family'
import Record from '../components/record'
import Investigation from '../components/investigation'
import FileUpload from '../components/fileUpload'
import Printing from '../components/printing'
import NotcptAdoptor from '../components/notcptAdoptor'
import AdInformationnote from '../components/adInformationnote'
import { setTimeout } from 'timers'
export default {
  name: 'register',
  components: {
    Title,
    CptAdopted,
    CptAdoptor,
    FiveRaise,
    AdInformationnote,
    Family,
    Record,
    Investigation,
    FileUpload,
    Printing,
    NotcptAdoptor
  },
  data () {
    return {
      current: ['1'],
      menulist: [
        { title: '基本信息', key: '1' },
        { title: '家庭子女信息', key: '2' },
        { title: '笔录信息', key: '3' },
        { title: '调查信息', key: '4' },
        { title: '文件上传', key: '5' },
        { title: '打印', key: '6' }
      ],
      adoptionlist: [
        { name: '福利机构抚养的孤儿', val: '0' },
        { name: '福利机构抚养的弃婴', val: '1' },
        { name: '继子女', val: '2' },
        { name: '三代以内同系旁系血亲', val: '3' },
        { name: '非福利机构抚养的孤儿', val: '4' },
        { name: '非福利机构抚养的弃婴', val: '5' },
        { name: '生父母有特殊困难无力抚养的子女', val: '6' },
        {
          name: '生父母均不具备完全民事行为能力且有严重危害可能的子女',
          val: '7'
        }
      ],
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      showfour: true,
      // 男 女 收养
      typeadoption: '1',
      childtype: '0',
      familyobj: [],
      nowkey: '1'
    }
  },
  created () {},
  activated () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
      this.setHeight('three', 'threeout')
      this.setHeight('four', 'fourout')
    })
  },
  mounted () {
    this.getchildtype()
    window.onresize = () => {
      console.log(this.showone)
      // this.showone = true
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.showone)
        this.setHeight('two', 'twoout', !this.showtwo)
        this.setHeight('three', 'threeout', !this.showthree)
        this.setHeight('four', 'fourout', !this.showfour)
      })
    }
  },
  methods: {
    // 获取儿童类型
    async getchildtype () {
      const data = await this.getDictionaries('ADOPTIONCATEGORY')
      console.log('shuju')
      console.log(data)
    },
    chans () {
      // console.log(111)
      // console.log(this.$route)
      // this.$router.go(-1)
    },
    callback (key) {
      console.log(key)
      this.nowkey = key
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
    },
    menuClick (val) {
      console.log(val)
    },
    selectchange (val) {
      console.log(val)
      console.log(this.childtype)
      this.setHeight('three', 'threeout')
    },
    back () {
      // 详情跳转
      this.$router.push({
        name: 'adoptionLog'
      })
      // this.$route.params
    },

    submit () {
      let isok = true
      console.log(this.familyobj)
      this.adInformationnoteFrom.validateFields((err, values) => {
        if (err) {
          isok = false
          if (this.nowkey == 1) {
            document.getElementById('anchorpoint_d').scrollIntoView(true)
          }
        }
      })
      this.fiveRaiseFrom.validateFields((err, values) => {
        if (err) {
          isok = false
          if (this.nowkey == 1) {
            document.getElementById('anchorpoint_c').scrollIntoView(true)
          }
        }
      })
      this.cptAdoptorFrom.validateFields((err, values) => {
        if (err) {
          isok = false
          if (this.nowkey == 1) {
            document.getElementById('anchorpoint_b').scrollIntoView(true)
          }
        }
      })
      this.adoptedFrom.validateFields((err, values) => {
        if (err) {
          isok = false
          if (this.nowkey == 1) {
            document.getElementById('anchorpoint_a').scrollIntoView(true)
          }
        }
      })

      if (isok) {
        alert('ok')
      } else {
        this.nowkey = '1'
        this.$message.error('校验不通过，无法提交，请再次检查!')
      }
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
    },
    typeadoption () {
      this.setHeight('two', 'twoout')
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin: 0 20px 0 32px;
}

.fromwid {
  width: 324px;
  margin-top: 24px;
  margin-bottom: 30px;
}

.selectwid {
  width: 224px;
}

.contitem {
  height: 50px;
  transition: all 1s;
  overflow: hidden;
}

.contitemshow {
  transition: all 1s;
  overflow: hidden;
}
.mars {
  width: 83%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
}
.hei {
  height: 500px;
  background: pink;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
</style>
