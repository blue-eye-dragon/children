<template>
  <!-- 申请 -->
  <div class="conts">
    <!-- <ta-anchor class="md" :offsetTop="100" @click.native="chans">
      <ta-anchor-link href="#anchorpoint_a" title="变更申请信息" />
      <ta-anchor-link href="#anchorpoint_b" title="区县审核信息" />
        <ta-anchor-link href="#anchorpoint_b" title="市级审核信息" />
        <ta-anchor-link href="#anchorpoint_b" title="升级审核信息" />
    </ta-anchor> -->
    <div ref="oneout" class="mars">
      <Title id="anchorpoint_a" title="救助申请信息" :show.sync="showone"></Title>
      <ta-form
        layout="horizontal"
        ref="one"
        :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}"
      >
        <ta-row class="fromcom">
          <ta-col :span="12">
              <p>变更后</p>
            <ta-form-item label="救治病种类型" fieldDecoratorId="name" :require="{message:'请输入儿童姓名!'}">

               <ta-input style="width: 100%;" placeholder="救治病种类型" />
            </ta-form-item>
            <ta-form-item label="救治病种名称" fieldDecoratorId="name" :require="{message:'请输入儿童姓名!'}">

               <ta-input style="width: 100%;" placeholder="救治病种名称" />
            </ta-form-item>
            <ta-form-item label="儿童身份类型" fieldDecoratorId="name" :require="{message:'请输入儿童姓名!'}">

               <ta-input style="width: 100%;" placeholder="儿童身份类型" />
            </ta-form-item>
            <ta-form-item label="所属福利机构" fieldDecoratorId="birthday" :require="{message:'请选择所属福利机构!'}">
              <ta-input style="width: 100%;" placeholder="所属福利机构" />
            </ta-form-item>
            <ta-form-item label="所属民政部门" fieldDecoratorId="birthday" :require="{message:'请选择所属民政部门!'}">
              <ta-input style="width: 100%;" placeholder="所属民政部门" />
            </ta-form-item>
             <ta-form-item label="联系人" fieldDecoratorId="birthday" :require="{message:'请输入联系人!'}">
              <ta-input style="width: 100%;" placeholder="联系人" />
            </ta-form-item>
              <ta-form-item label="联系电话" fieldDecoratorId="birthday" :require="{message:'请输入联系电话!'}">
              <ta-input style="width: 100%;" placeholder="联系电话" />
            </ta-form-item>
          </ta-col>

        <ta-col :span="12">
            <p>变更后</p>
           <ta-form-item label="救治病种类型" fieldDecoratorId="name" :require="{message:'请输入儿童姓名!'}">

               <ta-input style="width: 100%;" placeholder="救治病种类型" />
            </ta-form-item>
            <ta-form-item label="救治病种名称" fieldDecoratorId="name" :require="{message:'请输入儿童姓名!'}">

               <ta-input style="width: 100%;" placeholder="救治病种名称" />
            </ta-form-item>
            <ta-form-item label="儿童身份类型" fieldDecoratorId="name" :require="{message:'请输入儿童姓名!'}">

               <ta-input style="width: 100%;" placeholder="儿童身份类型" />
            </ta-form-item>
            <ta-form-item label="所属福利机构" fieldDecoratorId="birthday" :require="{message:'请选择所属福利机构!'}">
              <ta-input style="width: 100%;" placeholder="所属福利机构" />
            </ta-form-item>
            <ta-form-item label="所属民政部门" fieldDecoratorId="birthday" :require="{message:'请选择所属民政部门!'}">
              <ta-input style="width: 100%;" placeholder="所属民政部门" />
            </ta-form-item>
             <ta-form-item label="联系人" fieldDecoratorId="birthday" :require="{message:'请输入联系人!'}">
              <ta-input style="width: 100%;" placeholder="联系人" />
            </ta-form-item>
              <ta-form-item label="联系电话" fieldDecoratorId="birthday" :require="{message:'请输入联系电话!'}">
              <ta-input style="width: 100%;" placeholder="联系电话" />
            </ta-form-item>
          </ta-col>
            <ta-col :span="24">
            <ta-form-item
              label="变更原因"
              fieldDecoratorId="nation"
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              :require="{message:'请输入审核意见!'}"
            >
              <ta-textarea placeholder="请输入审核意见" :rows="2" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>

    <div ref="twoout" class="mars">
      <Title id="anchorpoint_b" title="医疗申请信息" :show.sync="showtwo"></Title>
      <ta-form
        layout="horizontal"
        ref="two"
        :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}"
      >
        <ta-row class="fromcom">
          <ta-col :span="12">
            <ta-form-item label="审核类型" fieldDecoratorId="name" :require="{message:'审核类型!'}">
              <p>变更申请</p>
            </ta-form-item>

            <ta-form-item label="审核单位" fieldDecoratorId="birthday" :require="{message:'审核单位!'}">
              <ta-input aria-placeholder="审核单位" />
            </ta-form-item>
            <ta-form-item label="审核状态" fieldDecoratorId="birthday" :require="{message:'审核状态!'}">
              <ta-select>
                <ta-select-option
                  v-for="(item,index) in auditstatusList"
                  :key="index"
                >{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label="审核日期" fieldDecoratorId="nation">
              <ta-date-picker style="width: 100%;" placeholder="请选择审核日期" />
            </ta-form-item>
            <ta-form-item label="审核人" fieldDecoratorId="nation" :require="{message:'请输入审核人!'}">
              <ta-input aria-placeholder="请输入审核人" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item
              label="审核意见"
              fieldDecoratorId="nation"
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              :require="{message:'请输入审核意见!'}"
            >
              <ta-textarea placeholder="请输入审核意见" :rows="2" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>

    <div class="bom">
      <ta-button  @click="back">返回</ta-button>
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
      auditstatusList: [],
      showtwo: true,
      nowkey: '1',
      childName: '',
      state: ''

    }
  },
  created () {},
  activated () {
    this.childName = this.$route.params.childName
    this.state = this.$route.params.state

    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })

    // alert(this.goType)
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
  },
  mounted () {
    this.getsupportTypesList()
    this.getauditstatusList()
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
    // 审核状态
    async getauditstatusList () {
      let data = await this.getDictionaries('AUDITSTATUS')
      this.auditstatusList = data
    },
    // 帮扶类型
    async getsupportTypesList () {
      let data = await this.getDictionaries('SUPPORTTYPES')
      this.supportTypesList = data
    },

    chans () {
      console.log(111)
      // console.log(this.$route)
      // this.$router.go(-1)
    },

    back () {
      this.$router.go(-1)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[refout] != undefined) {
          if (!istrue) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          } else {
            node.style.height = '50px'
          }
          node.style.transition = 'all 1s'
        }
      })
    }

    // this.$route.params
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
