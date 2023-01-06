<template>
  <!-- 申请 -->
  <!-- <div class="searchdata"> -->
  <div class="conts">
    <div class="contin">
      <!-- <ta-border-layout :header-cfg="{showBorder:false}" :layout="{header:'0px'}"> -->
      <!-- <ta-anchor class="md" :offsetTop="10" @click.native="chans">
        <ta-anchor-link href="#anchorpoint_a" state="replace" title="儿童基本信息" />
        <ta-anchor-link href="#anchorpoint_b" state="replace" title="医疗申请信息" />
      </ta-anchor> -->
      <div>
        <div ref="oneout"
             class="mars"
             style="margin-top:20px">
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
                          @idcardchange="idcardchange"
                          @clickSearch="clickSearch"></childInfoMed>
          </ta-form>
        </div>

        <div ref="twoout"
             class="mars"
             style="display:none">
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
                           :disabledM="disabledM"
                           :guardianArray.sync="guardianArray"
                           @actualAddress="actualAddress"
                           :idcardList="idcardList"
                           :relationList="relationList"
                           :addreslistsmodel="addreslistsmodel"
                           :goType="goType"
                           :qtsf="qtsf"
                           ref="addition"></childInfoMedi>
          </ta-form>
        </div>
      </div>
    </div>
    <div class="bom">
      <ta-button type="primary"
                 v-if="this.goType=='1' || this.goType=='2' ||this.goType=='3'"
                 class="preservation"
                 @click="submit('2')">提交</ta-button>
      <ta-button type="primary"
                 v-if="this.goType=='1' || this.goType=='2' ||this.goType=='3'"
                 v-show="saveOrno"
                 class="preservation"
                 @click="submit('1')">保存</ta-button>
      <ta-button type="danger"
                 v-if="this.goType=='4'"
                 class="preservation"
                 @click="returnInfo()">撤回</ta-button>
      <ta-button @click="back">返回</ta-button>
    </div>
    <!-- </ta-border-layout> -->
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
  data () {
    return {
      goType: '0',
      showone: true,
      saveOrno: true,
      showtwo: true,
      bg: false, // 变更申请显示状态标志
      nowkey: '1',
      objTemp: [], // 上一个页面数据传入
      id: '',
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
      ishide: true,
      addressmodel: [],
      addressmodel2: [],
      addreslistsmodel: [],
      // 添加监护人
      guardianArray: [1],
      childBaseId: '',
      medicalId: '',
      orgId: '',
      disabled: false,
      disabledM: true,
      visible: false,
      editVisible: false,
      idCardDisabled: false,
      qtsf: false,
      idcardList: [],
      relationList: []
    }
  },
  created () { },
  activated () {
    this.areaCode()
    this.loadData()

    this.getchildcategoryaList()
    let goTypeTemp = this.$route.query.goType // 标志是在哪个页面跳转过来的，urged--->催办
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
    if (goTypeTemp == 'applicationRecord-details') {
      // 申请记录--查看
      this.bg = false // 隐藏变更说明弹框
      this.goType = '5'
      let data = this.$route.query
      console.log(data)
      this.id = data.obj.childId
      console.log(this.id)
      this.disabled = true
      this.disabledM = true
      this.guardianArray = []
      this.idCardDisabled = true
      this.getDetails()
    }
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
    this.getIdcardList()
    this.getRelationList()
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
    loadData () {
      this.adoptedFrom.resetFields()
      this.cptAdoptorFrom.resetFields()
      // this.idCardDisabled = false
      this.fileListImg = []
      this.fileListCard = []
      this.fileListFile = []
      this.incomeList = []
      this.diBaoList = []

      // if (this.goType == '2') {
      //   this.guardianArray = [1]
      // }else {
      //   this.guardianArray = []
      // }
    },
    // 获取行政区划
    async areaCode () {
      this.post('/areaManagement/getAreaByCurrentUser').then(res => {
        console.log(res)
      })
    },
    // 根据身份证号设置性别、年龄、出生日期
    setBirthAndAgeByIdCard (sex, age, birth) {
      console.log(sex)
      console.log(age)
      console.log(birth)
      this.adoptedFrom.setFieldsValue({
        sex: sex,
        birthday: moment(birth)
      })
      this.idCardDisabled = true
    },
    idcardchange () {
      if (this.goType == '1') {
        console.log(111111111111111)
        // this.adoptedFrom.resetFields()
        this.adoptedFrom.setFieldsValue({
          sex: '',
          birthday: ''
        })
        this.idCardDisabled = false
      } else {
        this.idCardDisabled = true
      }
    },
    chans () {
      // this.$router.go(-1)
      // console.log(111)
    },
    // 处理数据
    processingData () {
      let MedicalApplyVo = {}
      // 是否保存提交
      MedicalApplyVo.buttonType = this.buttonType
      // 儿童基本信数据
      let medicalRescueApplyChildInfoVo = {}
      medicalRescueApplyChildInfoVo = Object.assign(
        {},
        this.adoptedFrom.getFieldsValue()
      )
      this.changetime(medicalRescueApplyChildInfoVo)
      if (medicalRescueApplyChildInfoVo.address_Linkage) {
        medicalRescueApplyChildInfoVo.province =
          medicalRescueApplyChildInfoVo.address_Linkage[0]
        medicalRescueApplyChildInfoVo.city =
          medicalRescueApplyChildInfoVo.address_Linkage[1]
        medicalRescueApplyChildInfoVo.county =
          medicalRescueApplyChildInfoVo.address_Linkage[2]
        delete medicalRescueApplyChildInfoVo.address_Linkage
      }
      medicalRescueApplyChildInfoVo.id = this.id
      MedicalApplyVo.medicalRescueApplyChildInfoVo = medicalRescueApplyChildInfoVo

      // 医疗申请信息
      let medicalRescueVo = {}
      medicalRescueVo = Object.assign({}, this.cptAdoptorFrom.getFieldsValue())
      this.changetime(medicalRescueVo)
      // 文件信息
      let upLoadPathIds = []
      if (medicalRescueVo.address_Linkage) {
        medicalRescueVo.province = medicalRescueVo.address_Linkage[0]
        medicalRescueVo.city = medicalRescueVo.address_Linkage[1]
        medicalRescueVo.county = medicalRescueVo.address_Linkage[2]
        delete medicalRescueVo.address_Linkage
      }
      let fileids = [
        ...this.fileListImg,
        ...this.fileListCard,
        ...this.fileListFile,
        ...this.incomeList,
        ...this.diBaoList
      ]
      console.log(fileids)
      fileids.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      medicalRescueVo.upLoadPathId = upLoadPathIds
      // for (let i in medicalRescueVo) {
      //   console.log(i)
      // }
      if (this.qtsf == true) {
        let MedicalRescueGuardian = []
        this.guardianArray.map((item, index) => {
          console.log(item)
          let guardianContent = {
            childId: this.id,
            birthday: medicalRescueVo[`birthday${index}`],
            contactNumber: medicalRescueVo[`contactNumber${index}`],
            guardian: medicalRescueVo[`guardian${index}`],
            idCard: medicalRescueVo[`idCard${index}`],
            idcardType: medicalRescueVo[`idcardType${index}`],
            relationship: medicalRescueVo[`relationship${index}`],
            sex: medicalRescueVo[`sex${index}`],
            detail: medicalRescueVo[`detail${index}`]
          }
          if (this.goType == '3') {
            guardianContent.id = this.id
            guardianContent.medicalRescueId = this.medicalId
            guardianContent.childId = this.childBaseId
          }
          delete medicalRescueVo[`birthday${index}`]
          delete medicalRescueVo[`contactNumber${index}`]
          delete medicalRescueVo[`guardian${index}`]
          delete medicalRescueVo[`idCard${index}`]
          delete medicalRescueVo[`idcardType${index}`]
          delete medicalRescueVo[`relationship${index}`]
          delete medicalRescueVo[`sex${index}`]
          delete medicalRescueVo[`detail${index}`]

          this.changetime(guardianContent)
          console.log(guardianContent)
          if (medicalRescueVo[`address_Linkage${index}`].length == 1) {
            guardianContent.county =
              medicalRescueVo[`address_Linkage${index}`].length[0]
          }
          if (medicalRescueVo[`address_Linkage${index}`].length == 2) {
            guardianContent.city =
              medicalRescueVo[`address_Linkage${index}`][0]
            guardianContent.county =
              medicalRescueVo[`address_Linkage${index}`][1]
          }
          if (medicalRescueVo[`address_Linkage${index}`].length == 3) {
            guardianContent.province =
              medicalRescueVo[`address_Linkage${index}`][0]
            guardianContent.city =
              medicalRescueVo[`address_Linkage${index}`][1]
            guardianContent.county =
              medicalRescueVo[`address_Linkage${index}`][2]
          }
          delete medicalRescueVo[`address_Linkage${index}`]
          MedicalRescueGuardian.push(guardianContent)
        })
        MedicalApplyVo.medicalRescueGuardianVos = MedicalRescueGuardian
      }

      MedicalApplyVo.medicalRescueVo = medicalRescueVo

      return MedicalApplyVo
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
    // 提交---确定
    async submit (val) {
      this.buttonType = val
      let isok = true
      if (this.goType == '1') {
        this.adoptedFrom.validateFields((err, values) => {
          if (err) {
            isok = false
            console.log('yanzheng1' + isok)
          }
        })
      }
      this.cptAdoptorFrom.validateFields((err, values) => {
        if (err) {
          isok = false
          console.log(values)
          console.log(this.cptAdoptorFrom.getFieldsValue())
          console.log('yanzheng22' + isok)
        }
      })
      // if (this.goType == 2 || this.goType == 1) {
      if (isok) {
        let data = this.processingData()
        let url = ''
        let text = ''
        console.log(data)
        console.log(data)
        if (this.goType == '2' || this.goType == '1') {
          if (this.goType == '1') {
            data.functionType = '1'
          } else if (this.goType == '2') {
            data.functionType = '2'
          }
          url = '/medicalRescue/save'
          text = '申请成功'
          if (data.medicalRescueApplyChildInfoVo.illnessType) {
            let illnessArr = data.medicalRescueApplyChildInfoVo.illnessType
            data.medicalRescueApplyChildInfoVo.illnessType = illnessArr.join(
              ','
            )
          }
        } else if (this.goType == '3') {
          url = '/medicalRescue/update'
          text = '修改成功'
          if (data.medicalRescueApplyChildInfoVo.illnessType) {
            let illnessArr = data.medicalRescueApplyChildInfoVo.illnessType
            data.medicalRescueApplyChildInfoVo.illnessType = illnessArr.join(
              ','
            )
          }
          data.medicalRescueVo.childBaseId = this.childBaseId
          data.medicalRescueVo.id = this.medicalId
          data.medicalRescueVo.orgId = this.orgId
        }
        let res = await this.post(url, data, true)
        if (res.errors == null) {
          this.$message.success(text)
          this.back()
        }
      } else {
        this.$message.error(
          '校验不通过，无法提交，请再次检查!'
        )
      }
      // } else if (this.goType == 3) {
      // }
    },
    // 获取详情
    async getDetails () {
      // this.cptAdoptorFrom.setFieldsValue({
      //   orgName: window.parent.indexTool.getUserInfo().userName
      // })
      console.log(this.goType)
      let params = {}
      let url = ''
      let data
      let obj
      if (this.goType == '1') {
        let res = await this.post('/serialApi/getChildNumber')
        let medicalRescueApplyChildInfoVo = {}
        // medicalRescueApplyChildInfoVo.orgName = window.parent.indexTool.getUserInfo().userName
        if (res.errors == null) {
          medicalRescueApplyChildInfoVo.childNumber = res.data.code
          console.log(medicalRescueApplyChildInfoVo)
          this.adoptedFrom.setFieldsValue(medicalRescueApplyChildInfoVo)
          // console.log(this.adoptedFrom.getFieldsValue().orgName)
        }
      } else if (this.goType == '2') {
        // 医疗申请--儿童反显
        params.id = this.id
        url = '/medicalRescue/queryMedicalRescueApplyById'
        data = await this.post(url, params)
        if (data.errors == null) {
          obj = data.data.data.medicalRescueApplyChildInfoVo
          let medicalRescueApplyChildInfoVo = obj
          if (medicalRescueApplyChildInfoVo.birthday) {
            medicalRescueApplyChildInfoVo.birthday = moment(
              medicalRescueApplyChildInfoVo.birthday
            )
          }

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
          // medicalRescueApplyChildInfoVo.orgName = window.parent.indexTool.getUserInfo().userName
          if (medicalRescueApplyChildInfoVo.illnessType) {
            let illnessArr = medicalRescueApplyChildInfoVo.illnessType
            medicalRescueApplyChildInfoVo.illnessType = illnessArr.split(',')
          }

          let arr = []
          arr.push(
            medicalRescueApplyChildInfoVo.province,
            medicalRescueApplyChildInfoVo.city,
            medicalRescueApplyChildInfoVo.county
          )
          this.addressmodel = [...arr]
          // medicalRescueApplyChildInfoVo.orgName = window.parent.indexTool.getUserInfo().userName
          this.adoptedFrom.setFieldsValue(medicalRescueApplyChildInfoVo)
          // this.cptAdoptorFrom.setFieldsValue({
          //   orgName: window.parent.indexTool.getUserInfo().userName
          // })
          this.disabled = true
        }
      } else if (
        this.goType == '3' ||
        this.goType == '4' ||
        this.goType == '5' ||
        this.goType == '6'
      ) {
        // 申请记录--编辑
        if (this.goType == '3' || this.goType == '5') {
          url = '/medicalRescue/childDetail'
          params.childId = this.id
        }

        data = await this.post(url, params)
        if (data.errors == null) {
          obj = data.data.data
          // 儿童基本信息赋值
          let medicalRescueApplyChildInfoVo = data.data.data
          if (medicalRescueApplyChildInfoVo.birthday) {
            medicalRescueApplyChildInfoVo.birthday = moment(
              medicalRescueApplyChildInfoVo.birthday
            )
          }

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
          if (medicalRescueApplyChildInfoVo.illnessType) {
            let illnessArr = medicalRescueApplyChildInfoVo.illnessType
            medicalRescueApplyChildInfoVo.illnessType = illnessArr.split(',')
          }
          let arr = []
          arr.push(
            medicalRescueApplyChildInfoVo.province,
            medicalRescueApplyChildInfoVo.city,
            medicalRescueApplyChildInfoVo.county
          )
          this.addressmodel = [...arr]
          // 医疗基本信息赋值
          this.$nextTick(() => {
            this.adoptedFrom.setFieldsValue(medicalRescueApplyChildInfoVo)
            setTimeout(() => {
              //   this.cptAdoptorFrom.setFieldsValue(medicalRescueVo)
              this.setHeight('one', 'oneout')
              this.setHeight('two', 'twoout')
            }, 1000)
          })
        }
      }

      console.log(obj)
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
    actualAddress (values) {
      console.log('addresssss')
      console.log(this.addreslistsmodel[values])
      this.cptAdoptorFrom.setFieldsValue({
        [`address_Linkage${values}`]: this.addreslistsmodel[values]
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
    },
    // 性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 与儿童关系
    async getRelationList () {
      let data = await this.getDictionaries('RELATION')
      this.relationList = data
    },
    //  证件类型
    async getIdcardList () {
      let data = await this.getDictionaries('IDCARD_TYPE')
      this.idcardList = data
    },
    // 儿童类别
    async getchildcategoryaList () {
      let orgType = window.parent.indexTool.getUserInfo().orgType
      let codeType = ''
      if (orgType == '99') {
        codeType = 'CHILDCATEGORYF'
        this.qtsf = false
        this.guardianArray = []
        setTimeout(() => {
          this.setHeight('one', 'oneout')
          this.setHeight('two', 'twoout')
        }, 1000)
      } else if (orgType != '98' && orgType != '99') {
        codeType = 'CHILDCATEGORYM'
        this.qtsf = true
        setTimeout(() => {
          this.setHeight('one', 'oneout')
          this.setHeight('two', 'twoout')
        }, 1000)
      }
      this.post('codetable/getCode', { codeType: codeType }).then(res => {
        if (res.serviceSuccess) {
          this.childcategoryaList = res.data.codeList
        }
      })
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
.preservation {
  margin: 0 20px 0 32px;
}
.searchdata {
  height: 100%;
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
  margin-bottom: 50px;
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
