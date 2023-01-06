<template>
  <div class="padbottom conts tadrawer"
       @click='allvalidator'>
    <div class="contin">
      <ta-tabs defaultActiveKey="1"
               :activeKey="nowkey"
               @change="callback">
        <ta-tab-pane tab="家庭基本信息"
                     key="1"
                     :forceRender="true">
          <ta-row>
            <ta-col :span="11">
              <ta-form layout="horizontal"
                       :autoFormCreate="(form)=>{this.manForm = form}">
                <PersonnelInformation types="1"
                                      :disabled="disabled"
                                      :heathmodel="heathmodel"
                                      :heathmodels="heathmodels"
                                      @setHouseholder="setHouseholder"
                                      @setheath="setheath"
                                      @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                                      @judgeIdCardIsNotRepeat="judgeIdCardIsNotRepeat"
                                      ref="man"></PersonnelInformation>
              </ta-form>
            </ta-col>
            <ta-col :span="2"
                    style="width: 10px;">
              <ta-divider type="vertical"
                          style="height: 300px;" />
            </ta-col>
            <ta-col :span="11">
              <ta-form layout="horizontal"
                       :autoFormCreate="(form)=>{this.womanForm = form}">
                <PersonnelInformation types="2"
                                      :disabled="disabled"
                                      :heathmodel="heathmodel"
                                      :heathmodels="heathmodels"
                                      @setHouseholder="setHouseholder"
                                      @setheath="setheath"
                                      @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                                      @judgeIdCardIsNotRepeat="judgeIdCardIsNotRepeat"
                                      ref="woman"></PersonnelInformation>
              </ta-form>
            </ta-col>
            <ta-divider />
            <ta-form layout="horizontal"
                     :autoFormCreate="(form)=>{this.baseForm = form}">
              <FamilyBasicInformation @setErrorMessage="setErrorMessage"
                                      :addressmodel="addressmodel"
                                      :disabled="disabled"
                                      @setaddress="setaddress"
                                      ref="base"></FamilyBasicInformation>
            </ta-form>
          </ta-row>
        </ta-tab-pane>
        <ta-tab-pane tab="家庭成员信息"
                     key="2"
                     :forceRender="true">
          <FamilyMemberInformation ref="famMem"
                                   :disabled="disabled"
                                   @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                                   @updateDatas="updateDatas"></FamilyMemberInformation>
        </ta-tab-pane>
        <ta-tab-pane tab="养育儿童信息"
                     key="3"
                     :forceRender="true"
                     v-if="this.flag!='look_list'">
          <ParentingInformation ref="parent"
                                :disabled="disabled"></ParentingInformation>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="preservation btnleft"
                 @click="submit"
                 v-if="!disabled">提交</ta-button>
    </div>
  </div>
</template>
<script>
import PersonnelInformation from './components/personnelInformation'
import FamilyBasicInformation from './components/familyBasicInformation'
import FamilyMemberInformation from './components/familyMemberInformation'
import ParentingInformation from './components/parentingInformation'
import moment from 'moment'
export default {
  components: {
    PersonnelInformation,
    FamilyBasicInformation,
    FamilyMemberInformation,
    ParentingInformation
  },
  data () {
    return {
      disabled: false,
      addressmodel: [],
      heathmodel: [],
      heathmodels: [],

      isvalidator: false, // 提交时不验证
      nowkey: '1',
      householder: '1', // 户主的最终结果,1男方，2女方
      flag: '', // 区分新增、编辑、查看的标识符
      id: '', // 编辑的id
      familyId: '' // 编辑、查看时的家庭id
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.isvalidator = false
    this.$refs.man.isvalidator = false
    this.$refs.woman.isvalidator = false
  },
  methods: {
    // 初始化数据
    initDatas () {
      this.$refs.base.fileList = []
      this.manForm.resetFields()
      this.manForm.setFieldsValue({
        sex: this.Enum.SEX.NAN
      })
      this.womanForm.resetFields()
      this.womanForm.setFieldsValue({
        sex: this.Enum.SEX.NV
      })
      this.baseForm.resetFields()
      this.flag = this.$route.query.flag

      this.disabled = false
      this.nowkey = '1'

      // 编辑或查看数据回显
      if (this.flag != 'add') {
        this.familyId = this.$route.query.familyId
        if (this.flag.includes('look')) {
          this.disabled = true
        }
        this.post('/familyLikeRear/queryById', { id: this.familyId, isEdit: this.flag == 'edit' ? '1' : '0' }).then(async (res) => {
          if (res.serviceSuccess) {
            let { data } = res.data
            this.id = data.id
            // 男女方模块赋值
            // 户主的位置
            let index = data.familyLikeMemberVos.findIndex((e, index) => (
              e.householderRelationship == this.Enum.FAMILYRELATIONS.BRHZ
            ))

            // 配偶的位置
            let index1 = data.familyLikeMemberVos.findIndex((e, index) => (
              e.householderRelationship == this.Enum.FAMILYRELATIONS.PO
            ))
            if (index != -1) {
              let indexObj = data.familyLikeMemberVos[index]
              let index1Obj = data.familyLikeMemberVos[index1]
              indexObj.birth = indexObj.birth ? moment(indexObj.birth) : null
              this.heathmodel = indexObj.healthCondition ? indexObj.healthCondition.split(',') : []
              index1Obj.birth = index1Obj.birth ? moment(index1Obj.birth) : null
              this.heathmodels = index1Obj.healthCondition ? index1Obj.healthCondition.split(',') : []
              if (indexObj.sex == this.Enum.SEX.NAN) { // 男方是户主
                this.manForm.setFieldsValue(indexObj)
                this.womanForm.setFieldsValue(index1Obj)
              }
              if (indexObj.sex == this.Enum.SEX.NV) { // 女方是户主
                this.manForm.setFieldsValue(index1Obj)
                this.womanForm.setFieldsValue(indexObj)
              }
            }
            // 家庭基本信息模块赋值
            this.baseForm.setFieldsValue(data)
            // 附件赋值
            this.$refs['base'].fileList = []
            if (data.fileList) { // 附件为空时影响下面复制问题。
              for (let i = 0; i < data.fileList.length; i++) {
                let fileObj = data.fileList[i]
                fileObj['thumbUrl'] = 'data:image/png;base64,' + fileObj.thumbUrl
                this.$refs['base'].fileList.push(fileObj)
              }
            }

            // 地址
            this.addressmodel = [
              data.province || '',
              data.city || '',
              data.county || ''
            ]
            // 有无精神病
            this.$refs['base'].valueSelect = data.isMentalDisease
            this.$refs['base'].valueInput = data.mentalDiseaseName
            // 有无传染病
            this.$refs['base'].valueSelect1 = data.isInfectiousDiseases
            this.$refs['base'].valueInput1 = data.infectiousDiseasesName
            // 家庭成员信息模块赋值
            this.$refs['famMem'].tableDatas = data.familyLikeMemberVos
            // 养育儿童信息模块赋值
            if (this.flag != 'look_list') {
              this.$refs['parent'].tableDatas = data.familyLikeRearVos
              this.$refs['parent'].parentingForm.setFieldsValue({ remarks: data.remarks })
            }

          }
        })
      }
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
      this.$refs.man.isvalidator = true
      this.$refs.woman.isvalidator = true
    },
    // 设置户主 家庭成员户主与配偶关系调换
    setHouseholder (val) {
      this.householder = val
      // 户主的位置
      let index = this.$refs['famMem'].tableDatas.findIndex((e, index) => (
        e.householderRelationship == this.Enum.FAMILYRELATIONS.BRHZ
      ))
      // 非户主的位置
      let index1 = this.$refs['famMem'].tableDatas.findIndex((e, index) => (
        e.householderRelationship == this.Enum.FAMILYRELATIONS.PO
      ))
      if (index != -1) {
        this.$refs['famMem'].tableDatas[index].householderRelationship = this.Enum.FAMILYRELATIONS.PO
      }
      if (index1 != -1) {
        this.$refs['famMem'].tableDatas[index1].householderRelationship = this.Enum.FAMILYRELATIONS.BRHZ
      }

      if (val == '1') { // 男方是户主,则设置女方为非户主
        this.$refs['woman'].householder = null
      } else if (val == '2') { // 女方是户主,则设置男方为非户主
        this.$refs['man'].householder = null
      }
    },
    // 家庭基本信息-家庭成员有无精神病/传染病 设置验证提示
    setErrorMessage (newval, fieldName) {
      let errmsg = null
      if (newval && newval.length > 20) {
        errmsg = '最大输入20个字符'
      } else if (!newval) {
        errmsg = '请输入' + (fieldName == 'isMentalDisease' ? '精神病名称' : '传染病名称')
      }
      this.baseForm.setFields({
        [fieldName]: errmsg ? {
          'errors': [{ 'message': errmsg }]
        } : null
      })
      return errmsg
    },
    // 设置一组输入控件的值、Error与是否只读
    setFieldsByForm (formName, fieldName, errors, value) {
      if (fieldName) {
        this[formName].setFields({
          [fieldName]: {
            value: value,
            errors: errors ? [{ 'message': errors }] : null
          }
        })
      }
    },
    // 家庭成员编辑时，更新男女方数据
    updateDatas (flag) {
      let _self = this
      let formName = _self.householder == '1' ? 'manForm' : 'womanForm'
      let data = {}

      if (flag) { // 户主
        let index = _self.$refs['famMem'].tableDatas.findIndex((e, index) => (
          e.householderRelationship == _self.Enum.FAMILYRELATIONS.BRHZ
        ))
        data = JSON.parse(JSON.stringify(_self.$refs['famMem'].tableDatas[index]))
        data['birth'] = data.birth ? moment(data.birth) : null
        data['health'] = data.healthCondition.split(',')
        _self[formName].setFieldsValue(data)
        // 赋值后验证身份证号重复
        _self.judgeIdCardIsNotRepeat(data.idCard, formName == 'manForm' ? 'womanForm' : 'manForm', function (callback) {
          if (callback != '') { // 存在重复
            _self.setFieldsByForm(formName, 'idCard', callback, data.idCard)
          }
        })
        if (formName == 'manForm') {
          _self.heathmodel = data.healthCondition.split(',')
        } else {
          _self.heathmodels = data.healthCondition.split(',')
        }
      } else { // 非户主
        let index1 = _self.$refs['famMem'].tableDatas.findIndex((e, index) => (
          e.householderRelationship == _self.Enum.FAMILYRELATIONS.PO
        ))
        data = JSON.parse(JSON.stringify(_self.$refs['famMem'].tableDatas[index1]))
        data['birth'] = data.birth ? moment(data.birth) : null
        data['health'] = data.healthCondition.split(',')
        formName = formName == 'manForm' ? 'womanForm' : 'manForm'
        _self[formName].setFieldsValue(data)
        // 赋值后验证身份证号重复
        _self.judgeIdCardIsNotRepeat(data.idCard, formName == 'manForm' ? 'womanForm' : 'manForm', function (callback) {
          if (callback != '') { // 存在重复
            _self.setFieldsByForm(formName, 'idCard', callback, data.idCard)
          }
        })
        if (formName == 'manForm') {
          _self.heathmodel = data.healthCondition.split(',')
        } else {
          _self.heathmodels = data.healthCondition.split(',')
        }
      }
    },
    // 返回
    backs () {
      // 重置数据
      this.manForm.resetFields() // 家庭基本信息-男方信息
      this.womanForm.resetFields() // 家庭基本信息-女方信息
      this.baseForm.resetFields() // 家庭基本信息-基本信息
      this.$refs['famMem'].tableDatas = [] // 家庭成员信息
      if (this.flag != 'look_list') {
        this.$refs['parent'].tableDatas = [] // 养育儿童信息
        // this.$refs['parent'].parentingForm.resetFields() // 养育儿童tab的备注
      }
      this.$router.go(-1)
    },
    // 设置健康状况
    setheath (e, type) {
      let formName = type == '1' ? 'manForm' : 'womanForm'
      this[formName].setFieldsValue({
        health: e
      })
    },
    // 设置地址
    setaddress (e) {
      this.baseForm.setFieldsValue({
        address_Linkage: e
      })
    },
    // 提交
    async submit () {
      let isok = true
      let _self = this
      _self.isvalidator = false
      this.$refs.man.isvalidator = false
      this.$refs.woman.isvalidator = false
      _self.$refs.man.errMsg = _self.manForm.getFieldError('idCard')
      _self.$refs.woman.errMsg = _self.womanForm.getFieldError('idCard')
      //   // 养育儿童信息列表不能为空
      //   if (this.$refs['parent'].tableDatas.length == 0) {
      //     isok = false
      //     this.nowkey = '3'
      //   }
      // 家庭基本信息-男方信息
      await _self.manForm.validateFieldsAndScroll((err, values) => {
        if (err) {
          isok = false
          this.nowkey = '1'
        }
      })
      // 家庭基本信息-女方信息
      await _self.womanForm.validateFieldsAndScroll((err, values) => {
        if (err) {
          isok = false
          this.nowkey = '1'
        }
      })

      // 精神病验证处理
      _self.baseForm.setFieldsValue({
        isMentalDisease: _self.$refs['base'].valueSelect
      })
      // 传染病验证处理
      _self.baseForm.setFieldsValue({
        isInfectiousDiseases: _self.$refs['base'].valueSelect1
      })
      // 家庭基本信息-基本信息
      _self.baseForm.validateFieldsAndScroll((err, values) => {
        if (err) {
          isok = false
          this.nowkey = '1'
        }
      })
      // 家庭成员有无精神病-是 验证
      if (_self.$refs['base'].valueSelect == _self.Enum.YESNO.SHI) {
        if (!_self.$refs['base'].valueInput) { // 提交
          _self.setErrorMessage(null, 'isMentalDisease')
          isok = false
          this.nowkey = '1'
        }
        if (_self.$refs['base'].valueInput) {
          let errmsg = _self.setErrorMessage(_self.$refs['base'].valueInput, 'mentalDiseaseName')
          if (errmsg) {
            isok = false
            this.nowkey = '1'
          }
        }
      }

      // 家庭成员有无传染病-是 验证
      if (_self.$refs['base'].valueSelect1 == _self.Enum.YESNO.SHI) {
        if (!_self.$refs['base'].valueInput1) { // 提交
          _self.setErrorMessage(null, 'isInfectiousDiseases')
          isok = false
          this.nowkey = '1'
        }
        if (_self.$refs['base'].valueInput1) {
          let errmsg = _self.setErrorMessage(_self.$refs['base'].valueInput1, 'infectiousDiseasesName')
          if (errmsg) {
            isok = false
            this.nowkey = '1'
          }
        }
      }

      if (isok) {
        // 填完家庭基本信息直接点击提交时，将男女方数据赋值到家庭成员信息表中
        this.autoSet()
        let baseObj = this.baseForm.getFieldsValue() // 家庭基本信息
        if (this.flag != 'look_list') {
          let remarks = this.$refs['parent'].parentingForm.getFieldsValue().remarks // 养育儿童信息-备注
          baseObj['remarks'] = remarks
        }

        // 若精神病选择了是
        if (_self.$refs['base'].valueSelect == _self.Enum.YESNO.SHI) {
          baseObj['mentalDiseaseName'] = _self.$refs['base'].valueInput
        }
        // 若传染病选择了是
        if (_self.$refs['base'].valueSelect1 == _self.Enum.YESNO.SHI) {
          baseObj['infectiousDiseasesName'] = _self.$refs['base'].valueInput1
        }
        baseObj['familyLikeMemberSaveVos'] = this.$refs['famMem'].tableDatas || []// 家庭成员信息-列表数据
        if (this.flag != 'look_list') {
          baseObj['familyLikeRearSaveVos'] = this.$refs['parent'].tableDatas // 养育儿童信息-列表数据
        }
        baseObj['province'] = baseObj.address_Linkage[0]
        baseObj['city'] = baseObj.address_Linkage[1]
        baseObj['county'] = baseObj.address_Linkage[2]
        delete baseObj.address_Linkage

        let url = '/familyLikeRear/save'
        if (this.flag == 'edit') {
          url = '/familyLikeRear/update'
          baseObj['id'] = this.id
          // 合并删除的家庭成员列表数据
          baseObj['familyLikeMemberSaveVos'] = baseObj['familyLikeMemberSaveVos'].concat(this.$refs['famMem'].deleteDatas)
        }
        // 附件处理
        let upLoadPathIds = []
        let fileList = this.$refs['base'].fileList || []
        for (let i = 0; i < fileList.length; i++) {
          upLoadPathIds.push(fileList[i].response.data.data.fileid)
        }
        baseObj['upLoadPathIds'] = upLoadPathIds
        _self.post(url, baseObj, true).then((res) => {
          if (res.serviceSuccess) {
            _self.$message.success('信息提交成功!')
            // 重置数据
            this.backs()
          }
        })
      } else {
        _self.$message.error('校验不通过，无法提交，请再次检查!')
      }
    },
    callback (key) {
      this.nowkey = key
      if (key == '2') {
        // 切换到家庭成员信息时，将输入的家庭基本信息作为家庭成员进行赋值-新增
        this.autoSet()
      }
    },
    // tab 切换到家庭成员时，将输入的家庭基本信息作为家庭成员进行赋值
    autoSet () {
      let famTableDatas = this.$refs['famMem'].tableDatas
      let manObj = this.manForm.getFieldsValue()
      let womanObj = this.womanForm.getFieldsValue()
      let relation = this.Enum.FAMILYRELATIONS.BRHZ // 本人/户主
      // 男方信息有填数据，则进行家庭成员赋值
      if (this.judgeObjIsNull(manObj)) {
        manObj['birth'] = manObj.birth ? moment(manObj.birth).format('YYYY-MM-DD') : null
        manObj['healthCondition'] = manObj.health && manObj.health instanceof Array ? manObj.health.join(',') : null
        manObj['isHouseholder'] = this.householder == '1' ? '1' : '0'
        manObj['delState'] = '1'
        if (this.householder != '1') { // 男方不是户主，则给关系为配偶的家庭成员赋值，否则给户主赋值
          relation = this.Enum.FAMILYRELATIONS.PO
        } else {
          relation = this.Enum.FAMILYRELATIONS.BRHZ
        }
        let index = famTableDatas.findIndex((e, index) => (
          e.householderRelationship == relation
        ))
        manObj['householderRelationship'] = relation
        if (index != -1) { // 存在户主（或配偶）数据，做更新
          manObj['tel'] = famTableDatas[index].tel
          if (famTableDatas[index].id) {
            manObj['id'] = famTableDatas[index].id
          }
          famTableDatas.splice(index, 1, manObj)
        } else {
          famTableDatas.push(manObj)
        }
      }
      // 女方信息有填数据，则进行家庭成员赋值
      if (this.judgeObjIsNull(womanObj)) {
        womanObj['birth'] = womanObj.birth ? moment(womanObj.birth).format('YYYY-MM-DD') : null
        womanObj['healthCondition'] = womanObj.health && womanObj.health instanceof Array ? womanObj.health.join(',') : null
        womanObj['isHouseholder'] = this.householder == '2' ? '1' : '0'
        womanObj['delState'] = '1'
        if (this.householder != '2') { // 女方不是户主，则给关系为配偶的家庭成员赋值，否则给户主赋值
          relation = this.Enum.FAMILYRELATIONS.PO
        } else {
          relation = this.Enum.FAMILYRELATIONS.BRHZ
        }
        // 家庭成员表中已有数据，判断是否存在户主（或配偶）数据
        let index1 = famTableDatas.findIndex((e, index) => (
          e.householderRelationship == relation
        ))
        womanObj['householderRelationship'] = relation
        if (index1 != -1) { // 存在户主（或配偶）数据，做更新
          womanObj['tel'] = famTableDatas[index1].tel
          if (famTableDatas[index1].id) {
            womanObj['id'] = famTableDatas[index1].id
          }
          famTableDatas.splice(index1, 1, womanObj)
        } else {
          famTableDatas.push(womanObj)
        }
      }
    },
    // 根据所填身份证号回显出生日期
    setBirthAndAgeByIdCard (val, formName, fieldName) {
      if (!this.isvalidator) {
        return false
      }
      if (formName != 'form') { // 非家庭成员
        this[formName].setFieldsValue({
          [fieldName]: val ? moment(val) : null
        })
      } else { // 家庭成员
        this.$refs['famMem'][formName].setFieldsValue({
          [fieldName]: val ? moment(val) : null
        })
      }
    },
    // js 判断对象属性值是否都为空
    judgeObjIsNull (obj) {
      for (var key in obj) {
        if (obj[key]) {
          return true
        }
      }
      return false
    },
    // 身份证号前端页面验重
    judgeIdCardIsNotRepeat (val, formName, callback) {
      if (val == this[formName].getFieldsValue().idCard) {
        callback('与' + (formName == 'manForm' ? '男方' : '女方') + '身份证号重复！')
      } else {
        callback('')
      }
    }
  }
}
</script>
