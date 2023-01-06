<template>
  <!-- 评估信息--操作 -->
  <div class="conts">
    <ta-form layout="horizontal"
             ref="two"
             :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}">
      <ta-row class="fromcom">
        <ta-col :span="12">
          <ta-form-item label="评估类型"
                        fieldDecoratorId="way"
                        :require="{message:'请选择评估类型!'}">
            <ta-select>
              <ta-select-option v-for="(item,index) in [{a:'a'}]"
                                :value="item.value"
                                :key="index">
                {{item.label}}
              </ta-select-option>
            </ta-select>
          </ta-form-item>

        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="评估结果"
                        fieldDecoratorId="need">
            <ta-input placeholder="请输入评估结果" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="评估小姐"
                        fieldDecoratorId="day">
            <ta-textarea :disabled="noEdit"
                         :rows="4" />
          </ta-form-item>
          <ta-form-item label="附件"
                        fieldDecoratorId="need">
            <ta-textarea :disabled="noEdit"
                         :rows="4"
                         placeholder="请输入儿童情况描述" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="评估人"
                        fieldDecoratorId="need">
            <ta-input placeholder="请输入评估人" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="评估日期"
                        fieldDecoratorId="need">
            <ta-date-picker :disabled="noEdit"
                            style="width: 100%;"
                            placeholder="请选择评估日期"
                            :disabledDate="disabledDate" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </ta-form>

    <div class="bom">
      <ta-button class="preservation"
                 @click="save()">返回</ta-button>
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
      showone: true,
      investigationList: [],
      yesOrNo: [],
      showtwo: true,
      nowkey: '1',
      guardianshipList: [],
      sexList: [],
      noEdit: true
    }
  },
  created () { },
  activated () {
    const params = this.$route.query
    const ids = params.ids // 当前操作数据id
    const types = params.types // 当前操作类型
    this.dataInt(types, ids)// 是否初始化数据
  },
  mounted () {
    this.getGuardianshipList()
    this.getinvestigationList()
    this.getyesOrNo()
    this.getsexList()
    const params = this.$route.params

    window.onresize = () => {
      console.log(this.showone)
    }
  },
  methods: {
    dataInt (types, ids) {
      // 初始化数据？
      switch (types) {
        case 1:
          this.noEdit = false
          break
        case 2:
          this.noEdit = false
          this.datas(ids)
          break
        case 3:
          this.noEdit = true
          this.datas(ids)
          break
        default:
          alert('操作出现意外中断，请重试哦')
          break
      }
    },
    // 评估日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    async datas (ids) { // 获取数据
      const p = { id: ids }
      const data = await this.post('', p)
      console.log('根据id获取到的数据:::', data)
      this.$nextTick(() => {
        this.form.setFieldsValue(data) // data未处理2019年9月24日09:22:02
      })
    },

    // .............
    // 调查类型
    async getinvestigationList () {
      const data = await this.getDictionaries('INVESTIGATION')
      this.investigationList = data
    }, // 性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },

    // 监护类型
    async getGuardianshipList () {
      const data = await this.getDictionaries('GUARDIANSHIP')
      this.guardianshipList = data
    },
    // 获取是否
    async getyesOrNo () {
      const data = await this.getDictionaries('YESNO')
      this.yesOrNo = data
    },
    chans () {
      // console.log(111)
      // console.log(this.$route)
      // this.$router.go(-1)
    },

    // 设置高度

    menuClick (val) {
      console.log(val)
    },
    selectchange (val) {
      this.setHeight('three', 'threeout')
    },
    back () {
      // 取消。提交
      this.$router.go(-1)
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
        // alert('ok')
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
