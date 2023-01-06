<template>
  <!-- 申请 -->
  <div class="conts">
    <!-- <ta-anchor class="md" :offsetTop="100" @click.native="chans">
      <ta-anchor-link href="#anchorpoint_a" title="儿童基本信息" />
      <ta-anchor-link href="#anchorpoint_b" title="医疗申请信息" />
    </ta-anchor> -->
    <div ref="oneout"
         class='contfrime'>
      <Title id="anchorpoint_a"
             title="儿童基本信息"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               ref="one"
               :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
        <childInfoMed :nationList="nationList"
                      :sexList="sexList"
                      :childcategoryaList="childcategoryaList"
                      :illnesstypeList="illnesstypeList"
                      :disabilitylevelList="disabilitylevelList"
                      :censusregisterList="censusregisterList"
                      :disabilitytypeList="disabilitytypeList"
                      @setaddress="setaddress"
                      :addressmodel="addressmodel"
                      :disabled="disabled"
                      ref="additionOne"
                      @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                      :idCardDisabled="idCardDisabled"
                      @idcardchange="idcardchange"></childInfoMed>
      </ta-form>
    </div>

    <div ref="twoout"
         class='contfrime'>
      <Title id="anchorpoint_b"
             title="医疗申请信息"
             :show.sync="showtwo"></Title>
      <ta-form layout="horizontal"
               ref="two"
               :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}">
        <childInfoMedi :fileListImg.sync="fileListImg"
                       :fileListCard.sync="fileListCard"
                       :fileListFile.sync="fileListFile"
                       :incomeList.sync="incomeList"
                       :diBaoList.sync="diBaoList"
                       @setaddress="setaddress2"
                       :addressmodel="addressmodel2"
                       @clickSearch="clickSearch"
                       :disabledM="disabledM"
                       :goType="goType"
                       ref="addition"></childInfoMedi>
      </ta-form>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import childInfoMed from '../../../components/childInfoMed'
import childInfoMedi from '../../../components/childInfoMedi'
import { setTimeout } from 'timers'
import moment from 'moment'
export default {
  name: 'register',
  components: {
    Title,
    childInfoMed,
    childInfoMedi
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    disabledM: {
      type: Boolean,
      default: false
    },
    idCardDisabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    },
    medicalRescueApplyId: {
      type: String
    },
    goType: {
      type: String
    }
  },
  data () {
    return {
      // goType: '0',
      showone: true,
      saveOrno: true,
      showtwo: true,
      bg: false, // 变更申请显示状态标志
      nowkey: '1',
      objTemp: [], // 上一个页面数据传入
      // id: '',
      nationList: [],
      sexList: [],
      childcategoryaList: [],
      illnesstypeList: [],
      disabilitylevelList: [],
      censusregisterList: [],
      disabilitytypeList: [],
      // 是否提交保存
      buttonType: '1',
      fileListImg: [],
      fileListCard: [],
      fileListFile: [],
      incomeList: [],
      diBaoList: [],
      addressmodel: [],
      addressmodel2: [],
      childBaseId: '',
      medicalId: '',
      orgId: '',
      // disabled: false,
      // disabledM: true,
      visible: false,
      editVisible: false
      // idCardDisabled: false
      // medicalId:'',
    }
  },
  created () { },
  activated () {
    this.$nextTick(() => {
      this.adoptedFrom.resetFields()
      this.cptAdoptorFrom.resetFields()
      // this.idCardDisabled = false
      this.fileListImg = []
      this.fileListCard = []
      this.fileListFile = []
      this.incomeList = []
      this.diBaoList = []
    })

    this.getchildcategoryaList()
    this.$nextTick(() => {
      this.$refs['addition'].handleChange()
      this.$refs['additionOne'].handleChange()
    })
    let goTypeTemp = this.$route.params.goType // 标志是在哪个页面跳转过来的，urged--->催办
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
    // 结账
    // if (goTypeTemp == 'settlementChangeFor-jiezhang') {
    //   this.goType = 1
    //   let data = JSON.parse(this.$route.params.obj)
    //   this.id = data.medicalRescueApplyId
    //   console.log(this.id)
    //   this.disabled = true
    //   this.disabledM = true
    //   this.idCardDisabled = true
    //   this.getDetails()
    // }
    window.onresize = () => {
      console.log(this.showone)
      // this.showone = true
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.showone)
        this.setHeight('two', 'twoout', !this.showtwo)
      })
    }
  },
  mounted () {
    this.getnation()
    this.getsexList()
    // this.getchildcategoryaList()
    this.getillnesstypeList()
    this.getdisabilitytypeList()
    this.getdisabilitylevelList()
    this.getcensusregisterList()
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
    // 根据身份证号设置性别、年龄、出生日期
    setBirthAndAgeByIdCard (sex, age, birth) {
      console.log(sex)
      console.log(age)
      console.log(birth)
      this.adoptedFrom.setFieldsValue({
        sex: sex,
        birthday: moment(birth)
      })
      // this.idCardDisabled = true
    },
    idcardchange () {
      if (this.goType == '1') {
        console.log(111111111111111)
        this.adoptedFrom.resetFields()
        this.idCardDisabled = false
      } else {
        this.idCardDisabled = true
      }
    },

    // 时间处理
    changetime (data) {
      console.log(data)
      for (var k in data) {
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
      }
    },

    // 获取详情
    async getDetails () {
      console.log(this.goType)
      let params = {}
      let url = ''
      let data
      let obj
      url = '/medicalRescue/queryById'
      params.id = this.medicalRescueApplyId
      data = await this.post(url, params)
      obj = data.data.data
      // 儿童基本信息赋值
      let medicalRescueApplyChildInfoVo = obj.medicalRescueApplyChildInfoVo
      medicalRescueApplyChildInfoVo.birthday = moment(
        medicalRescueApplyChildInfoVo.birthday
      )
      if (
        medicalRescueApplyChildInfoVo.addChildDate == '' ||
        medicalRescueApplyChildInfoVo.addChildDate == null
      ) {
        delete medicalRescueApplyChildInfoVo.addChildDate
      } else {
        medicalRescueApplyChildInfoVo.addChildDate = moment(
          medicalRescueApplyChildInfoVo.addChildDate
        )
      }
      let illnessArr = medicalRescueApplyChildInfoVo.illnessType
      medicalRescueApplyChildInfoVo.illnessType = illnessArr.split(',')
      let arr = []
      arr.push(
        medicalRescueApplyChildInfoVo.province,
        medicalRescueApplyChildInfoVo.city,
        medicalRescueApplyChildInfoVo.county
      )
      this.addressmodel = [...arr]
      // 医疗基本信息赋值
      let medicalRescueVo = obj.medicalRescueVo
      medicalRescueVo.intoCivilAdministrationDate = moment(
        medicalRescueVo.intoCivilAdministrationDate
      )
      // medicalRescueApplyChildInfoVo.orgName = window.parent.indexTool.getUserInfo().userName
      medicalRescueVo.applyDate = moment(medicalRescueVo.applyDate)
      medicalRescueVo.intoOrgDate = moment(medicalRescueVo.intoOrgDate)
      let arrAddress = []
      arrAddress.push(
        medicalRescueVo.province,
        medicalRescueVo.city,
        medicalRescueVo.county
      )
      this.addressmodel2 = [...arrAddress]
      this.childBaseId = medicalRescueVo.childBaseId
      this.medicalId = medicalRescueVo.id
      this.orgId = medicalRescueVo.orgId
      let filePathVos = JSON.parse(medicalRescueVo.filePathVos)
      filePathVos.map(item => {
        console.log(111111111111)
        if (item.functionType == 'f1') {
          this.fileListImg.push(item)
          console.log(this.fileListImg)
        } else if (item.functionType == 'f2') {
          this.fileListCard.push(item)
          console.log(this.fileListCard)
        } else if (item.functionType == 'f0') {
          this.fileListFile.push(item)
          console.log(this.fileListFile)
        } else if (item.functionType == 'f3') {
          this.incomeList.push(item)
        } else if (item.functionType == 'f4') {
          this.diBaoList.push(item)
        }
      })
      // this.$nextTick(() => {
      this.$refs['addition'].handleChange(medicalRescueVo.childIdentityType)
      this.$refs['additionOne'].handleChange(medicalRescueVo.childIdentityType)
      // })
      this.$nextTick(() => {
        // medicalRescueVo.orgName = window.parent.indexTool.getUserInfo().userName
        this.adoptedFrom.setFieldsValue(medicalRescueApplyChildInfoVo)
        this.cptAdoptorFrom.setFieldsValue(medicalRescueVo)
        setTimeout(() => {
          this.setHeight('one', 'oneout')
          this.setHeight('two', 'twoout')
        }, 1000)
      })
    },
    // 对应表单的地址赋值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    setaddress2 () {
      this.cptAdoptorFrom.setFieldsValue({
        address_Linkage: this.addressmodel2
      })
    },
    clickSearch () {
      console.log(111)
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
      })
    },
    // 撤回弹框打开
    // returnInfo () {
    //   this.visible = true
    //   console.log(this.$route.params.obj)
    //   this.$nextTick(() => {
    //     // this.form.resetFields()
    //   })
    // },
    // 撤回确定
    async returnInfo () {
      let params = {}
      params.id = this.medicalId
      await this.post('/medicalRescueApplyAudit/revoke', params).then(res => {
        console.log(res)
        if (res.errors == null) {
          this.$message.success(res.data.success)
          this.visible = false
          this.back()
        }
      })
    },
    onClose () {
      this.visible = false
      // this.form.resetFields()
    },
    onCloseCanle () {
      this.editVisible = false
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
    },
    back () {
      this.$router.go(-1)
      // 福利机构
      this.fljg = false
      // 民政部门
      this.mzbm = false
      // 亲属监护
      this.qtsf = false
      this.mzbmO = false
      this.canji = false
    },
    // 性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童类别
    async getchildcategoryaList () {
      let data = await this.getDictionaries(this.childTypeCode)
      this.childcategoryaList = data
    },

    // 患病类型
    async getillnesstypeList () {
      let data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },
    // 残疾类型
    async getdisabilitytypeList () {
      let data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
    },

    // 残疾等级
    async getdisabilitylevelList () {
      let data = await this.getDictionaries('DISABILITYLEVEL')
      this.disabilitylevelList = data
    },
    // 户籍性质
    async getcensusregisterList () {
      let data = await this.getDictionaries('CENSUSREGISTER')
      this.censusregisterList = data
    },
    // 民族
    async getnation () {
      let data = await this.getDictionaries('NATION')
      this.nationList = data
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
  width: 100%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0);
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
.contfrime {
  overflow: hidden;
}
</style>
