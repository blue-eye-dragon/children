<template>
  <!-- 补发 -->
  <div class="conts">
    <!-- <ta-anchor class="md" :offsetTop="100" @click.native="chans">
      <ta-anchor-link href="#anchorpoint_a" title="生活费发放标准" />
      <ta-anchor-link href="#anchorpoint_b" title="发放儿童" />
    </ta-anchor> -->
    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="生活费发放标准"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               ref="one"
               :autoFormCreate="(lifeFrom)=>{this.lifeFrom = lifeFrom}">
        <ta-row class="fromcom">
          <ta-col :span="12">
            <ta-form-item label="发放周期"
                          fieldDecoratorId="way"
                          :require="{message:'请选择发放周期!'}">
              <ta-select placeholder="请选择发放周期"
                         style="width : 100%">
                <ta-select-option v-for="(item,index) in investigationList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="机构养育儿童"
                          fieldDecoratorId="way"
                          :require="{message:'请输入本次发放金额!'}">
              <ta-input placeholder="请输入本次发放金额" />
            </ta-form-item>
            <ta-form-item label="社会散居儿童"
                          fieldDecoratorId="way"
                          :require="{message:'请输入本次发放金额!'}">
              <ta-input placeholder="请输入本次发放金额" />
            </ta-form-item>
            <ta-form-item label="民间养育儿童"
                          fieldDecoratorId="way"
                          :require="{message:'请输入本次发放金额!'}">
              <ta-input placeholder="请输入本次发放金额" />
            </ta-form-item>
          </ta-col>

          <ta-col :span="12">
            <ta-form-item label="发放年度"
                          fieldDecoratorId="way"
                          :require="{message:'请选择发放年度!'}">
              <ta-select placeholder="请选择发放年度"
                         style="width : 100%">
                <ta-select-option v-for="(item,index) in investigationList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="机构代养儿童"
                          fieldDecoratorId="way"
                          :require="{message:'请输入本次发放金额!'}">
              <ta-input placeholder="请输入本次发放金额" />
            </ta-form-item>
            <ta-form-item label="事实无人抚养儿童"
                          fieldDecoratorId="way"
                          :require="{message:'请输入本次发放金额!'}">
              <ta-input placeholder="请输入本次发放金额" />
            </ta-form-item>
            <ta-form-item label="艾滋病病毒感染儿童"
                          fieldDecoratorId="way"
                          :require="{message:'请输入本次发放金额!'}">
              <ta-input placeholder="请输入本次发放金额" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>

    <div ref="twoout"
         class="mars">
      <Title id="anchorpoint_b"
             title="发放儿童"
             :show.sync="showtwo"></Title>
      <ta-form layout="horizontal"
               ref="two"
               :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}">
        <ta-row class="fromcom">
          <ta-col :span="12">
            <ta-form-item label="选择儿童"
                          fieldDecoratorId="way"
                          :require="{message:'请选择选择儿童!'}">
              <ta-input placeholder="快捷查找儿童姓名" />
            </ta-form-item>
          </ta-col>
          <div>
            <ta-button type="primary"
                       class="preservation"
                       @click="back">全部添加</ta-button>

            <ta-button type="primary"
                       class="preservation"
                       @click="back">查找全部儿童</ta-button>

            <ta-button type="primary"
                       class="preservation"
                       @click="reissue()">补发设置</ta-button>
          </div>
          <ta-col :span="24">
            <ta-form-item label="已选择儿童"
                          :labelCol="{ span: 3 }">
              <!-- :fieldDecoratorOptions="{rules: [{ required: false, message: '11' }]}" -->
              <div class="chosechild">
                <div v-for="(item,index) in childList"
                     :key="index"
                     :value="item"
                     class="children">
                  {{item.childName}}
                  <ta-icon class="dels"
                           type="close"
                           @click="del(index)" />
                </div>
              </div>
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>

    <div class="bom">
      <ta-button type="primary"
                 class="preservation"
                 @click="back">确定</ta-button>
      <ta-button @click="back">取消</ta-button>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'

export default {
  name: 'register',
  components: {
    Title
  },
  data () {
    return {
      childList: [{ id: '123', opop: '张三' }], // 已选择的儿童列表
      showone: true,
      investigationList: [],
      yesOrNo: [],
      showtwo: true,
      nowkey: '1'
    }
  },
  created () { },
  activated () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
  },
  mounted () {
    this.getyesOrNo()
    window.onresize = () => {
      console.log(this.showone)
      // this.showone = true
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.showone)
        this.setHeight('two', 'twoout', !this.showtwo)
      })
    }
  },
  methods: {

    reissue () {
      this.$router.push({
        path: 'paymentOfLivingExpensesInfo',
        query: {

          id: obj.id
        }
      })
    },

    // 获取是否
    async getyesOrNo () {
      let data = await this.getDictionaries('YESNO')
      this.yesOrNo = data
    },
    chans () {
    },

    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },

    back () {
      // 详情跳转
      //   this.$router.push({
      //     name: 'investigationEvaluation'
      //   })
      // this.$route.params
      this.$router.go(-1)
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
        // alert('ok')
      } else {
        this.nowkey = '1'
        this.$message.error('校验不通过，无法提交，请再次检查!')
      }
    }
  },
  watch: {
    showone (val) {
      console.log(val)
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
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
.chosechild {
  padding: 0 0 17px 0;
  /* border: 1px solid rgba(0, 0, 0, 0.14901960784313725); */
  border: 1px solid #636363;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 40px;
}
.item_text[data-v-f8064454] {
  width: 98px;
}
</style>
