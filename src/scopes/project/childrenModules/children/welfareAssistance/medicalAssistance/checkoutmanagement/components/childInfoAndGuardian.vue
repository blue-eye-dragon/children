<template>
  <div ref="oneout"
       class="mars">
    <Title title="儿童和监护人基本信息"
           :show.sync="showone"></Title>
    <ta-form layout="horizontal"
             ref="one"
             :autoFormCreate="(form)=>{this.childBaseForm = form}">
      <ta-row class="fromcom">
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">儿童基本信息:</p>
        </div>
        <ta-col :span="24">
          <ta-col :span="6">
            <ta-form-item label="儿童编号"
                          fieldDecoratorId="childNumber">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="儿童类别"
                          fieldDecoratorId="childType">
              <ta-select placeholder
                         style="width : 100%"
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in childcategoryaList "
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="性别"
                          fieldDecoratorId="sex">
              <ta-select placeholder
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in sexList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="6">
            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday">
              <ta-date-picker style="width: 100%;"
                              placeholder
                              :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="身份证号"
                          fieldDecoratorId="idCard">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="申请日期"
                          fieldDecoratorId="addChildDate">
              <ta-date-picker style="width: 100%;"
                              :disabled="true"
                              placeholder />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="民族"
                          fieldDecoratorId="nation">
              <ta-select placeholder
                         style="width : 100%"
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in nationList "
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="6">
            <AddressComponent :addressmodel="addressmodel"
                              :disabled="true"
                              :isRequire="false"
                              arealevel="4"
                              :labelwidth="{label: 7, wrapper: 17}"
                              @setaddress="setaddress"
                              :msg="'户籍所在地'"></AddressComponent>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="所属机构"
                          fieldDecoratorId="orgName">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="残疾级别"
                          fieldDecoratorId="disabilityLevel">
              <ta-select placeholder
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in disabilitylevelList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="户籍性质"
                          fieldDecoratorId="censusRegister">
              <ta-select placeholder
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in censusregisterList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="患病类型"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="illnessType">
            <ta-select placeholder
                       mode="multiple"
                       :disabled="true">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in illnesstypeList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="残疾类别"
                        class='alonerow'
                        fieldDecoratorId="disabilityType"
                        :initValue="[]">
            <ta-checkbox-group class="grant-checkbox"
                               placeholder
                               :disabled="true"
                               :options="disabilitytypeList">
            </ta-checkbox-group>
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="6">
            <ta-form-item label="儿童本人身份证（户口本）"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{ span: 10}">
              <ta-upload :withCredentials="true"
                         :multiple="true"
                         name="file"
                         :disabled="true"
                         :fileList="fileList1"
                         @preview="preview"
                         :data="{busiType: '5'}">
                <p v-if="fileList1.length == 0"
                   class="noFile">无附件</p>
              </ta-upload>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="父母死亡或失踪证明"
                          :labelCol="{ span: 11 }"
                          :wrapperCol="{ span: 13}">
              <ta-upload :withCredentials="true"
                         :multiple="true"
                         name="file"
                         :disabled="true"
                         :fileList="fileList2"
                         @preview="preview"
                         :data="{busiType: '43'}">
                <p v-if="fileList2.length == 0"
                   class="noFile">无附件</p>
              </ta-upload>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="监护人身份证、户口本"
                          :labelCol="{ span: 12 }"
                          :wrapperCol="{ span: 12}">
              <ta-upload :withCredentials="true"
                         :multiple="true"
                         name="file"
                         :disabled="true"
                         :fileList="fileList3"
                         @preview="preview"
                         :data="{busiType: '44'}">
                <p v-if="fileList3.length == 0"
                   class="noFile">无附件</p>
              </ta-upload>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="续留证明"
                          :labelCol="{ span: 6 }"
                          :wrapperCol="{ span: 18}">
              <ta-upload :withCredentials="true"
                         :multiple="true"
                         name="file"
                         :disabled="true"
                         :fileList="fileList4"
                         @preview="preview"
                         :data="{busiType: '7'}">
                <p v-if="fileList4.length == 0"
                   class="noFile">无附件</p>
              </ta-upload>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="6">
            <ta-form-item label="其他材料"
                          :labelCol="{ span: 6 }"
                          :wrapperCol="{ span: 18}">
              <ta-upload :withCredentials="true"
                         :multiple="true"
                         name="file"
                         :disabled="true"
                         :fileList="fileList5"
                         @preview="preview"
                         :data="{busiType: '53'}">
                <p v-if="fileList5.length == 0"
                   class="noFile">无附件</p>
              </ta-upload>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <p class="warntext">
            <ta-icon type="info-circle-o"
                     class="icons" />如缺少相关证明材料，请到福利业务-基础信息-孤儿信息变更申请页面，选择儿童点击"直接修改"，在基本信息下的“相关证明信息”栏上传“身份证明复印件”
          </p>
        </ta-col>
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">监护人1基本信息</p>
        </div>
        <ta-col :span="24">
          <ta-col :span="6">
            <ta-form-item label="姓名"
                          fieldDecoratorId="guardianName">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="关系"
                          fieldDecoratorId="relationship">
              <ta-select placeholder
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in relationList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="身份证号"
                          fieldDecoratorId="idNum">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">监护人2基本信息</p>
        </div>
        <ta-col :span="24">
          <ta-col :span="6">
            <ta-form-item label="姓名"
                          fieldDecoratorId="guardianName2">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="关系"
                          fieldDecoratorId="relationship2">
              <ta-select placeholder
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in relationList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="身份证号"
                          fieldDecoratorId="idNum2">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>
      </ta-row>
    </ta-form>
  </div>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
import Title from '@component/common/components/Title'
import moment from 'moment'
export default {
  components: {
    AddressComponent,
    Title
  },
  props: ['disabled', 'childId', 'childEnterId'],
  data () {
    return {
      sexList: [], // 性别字典数据
      childcategoryaList: [], // 儿童类别字典数据
      nationList: [], // 民族字典数据
      disabilitylevelList: [], // 残疾级别字典数据
      illnesstypeList: [], // 患病类型字典数据
      censusregisterList: [], // 户籍性质字典数据
      disabilitytypeList: [], // 残疾类别字典数据
      relationList: [], // 关系字典数据
      addressmodel: [], // 户籍地址-儿童基本信息
      showone: true, // 儿童

      fileList1: [], // 儿童本人身份证（户口本）
      fileList2: [], // 父母死亡或失踪证明
      fileList3: [], // 监护人身份证、户口本
      fileList4: [], // 续留证明
      fileList5: [] // 其他材料
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('6.3%', '93.7%', 'alonerow') // 单独一行字段宽度控制
  },
  activated () {
  },
  mounted () {
    // 获取字典数据
    this.getAllMenus()
  },
  methods: {
    loadData () {
      this.fileList1 = [] // 儿童本人身份证（户口本）
      this.fileList2 = [] // 父母死亡或失踪证明
      this.fileList3 = [] // 监护人身份证、户口本
      this.fileList4 = [] // 续留证明
      this.fileList5 = [] // 其他材料

      this.childBaseForm.resetFields()
      this.post('/medicalRescueSettlement/queryChildAndGuardianIfonByChild', { childBaseId: this.childId, childEnterId: this.childEnterId }).then((res) => {
        if (res.serviceSuccess) {
          // 儿童基本信息赋值
          const { medicalRescueApplyChildInfoVo } = res.data.data
          if (medicalRescueApplyChildInfoVo) {
            if (medicalRescueApplyChildInfoVo.childType) {
              this.childcategoryaList.forEach(item => {
                if (item.value == medicalRescueApplyChildInfoVo.childType) {
                  this.$emit('update:childTypeName', item.label)
                }
              })
            }
            if (medicalRescueApplyChildInfoVo && medicalRescueApplyChildInfoVo.fileList) {
              const filePathVos1 = medicalRescueApplyChildInfoVo.fileList instanceof Array ? medicalRescueApplyChildInfoVo.fileList : JSON.parse(medicalRescueApplyChildInfoVo.fileList)
              filePathVos1.forEach(element => {
                switch (element.busiType) {
                  case '5': // 儿童本人身份证（户口本）
                    this.fileList1.push(element)
                    break
                  case '43': // 父母死亡或失踪证明
                    this.fileList2.push(element)
                    break
                  case '44': // 监护人身份证、户口本
                    this.fileList3.push(element)
                    break
                  case '7': // 续留证明
                    this.fileList4.push(element)
                    break
                  case '53': // 其他材料
                    this.fileList5.push(element)
                    break
                }
              })
            }
            medicalRescueApplyChildInfoVo.birthday = medicalRescueApplyChildInfoVo.birthday ? moment(medicalRescueApplyChildInfoVo.birthday) : null
            medicalRescueApplyChildInfoVo.addChildDate = medicalRescueApplyChildInfoVo.addChildDate ? moment(medicalRescueApplyChildInfoVo.addChildDate) : null
            medicalRescueApplyChildInfoVo.disabilityType = medicalRescueApplyChildInfoVo.disabilityType ? medicalRescueApplyChildInfoVo.disabilityType.split(',') : []
            medicalRescueApplyChildInfoVo.illnessType = medicalRescueApplyChildInfoVo.illnessType ? medicalRescueApplyChildInfoVo.illnessType.split(',') : []
            // 监护人信息赋值
            const { childGuardianListVos } = res.data.data
            if (childGuardianListVos && childGuardianListVos.length > 0) {
              if (childGuardianListVos.length > 1) {
                childGuardianListVos[1].guardianName2 = childGuardianListVos[1] ? childGuardianListVos[1].guardianName : null
                childGuardianListVos[1].relationship2 = childGuardianListVos[1] ? childGuardianListVos[1].relationship : null
                childGuardianListVos[1].idNum2 = childGuardianListVos[1] ? childGuardianListVos[1].idNum : null
              }

              Object.assign(medicalRescueApplyChildInfoVo, childGuardianListVos[0], childGuardianListVos[1])
            }
            this.childBaseForm.setFieldsValue(medicalRescueApplyChildInfoVo)
            // 户籍地址
            this.addressmodel = [
              medicalRescueApplyChildInfoVo.province || '',
              medicalRescueApplyChildInfoVo.city || '',
              medicalRescueApplyChildInfoVo.county || '',
              medicalRescueApplyChildInfoVo.town || ''
            ]
          }

          setTimeout(() => {
            this.setHeight('one', 'oneout')
          }, 300)
        }
      })
    },
    // 户籍所在地赋值-儿童
    setaddress () {
      this.childBaseForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 获取所有字典数据
    getAllMenus () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('CHILDCATEGORYA', 'childcategoryaList') // 获取儿童类别字典数据
      this.getMenu('NATION', 'nationList') // 获取民族字典数据
      this.getMenu('DISABILITYLEVEL', 'disabilitylevelList') // 获取残疾级别字典数据
      this.getMenu('RELATION', 'relationList') // 获取关系字典数据
      this.getMenu('ILLNESSTYPE', 'illnesstypeList') // 获取患病类型字典数据
      this.getMenu('CENSUSREGISTER', 'censusregisterList') // 获取户籍性质字典数据
      this.getMenu('DISABILITYTYPE', 'disabilitytypeList') // 获取残疾类别字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 附件预览
    preview (file) { this.downloadFile(file) },
    // 布局调整
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[ref] && this.$refs[ref] != undefined && node) {
          if (!(this.$refs[ref] instanceof Array) && this.$refs[ref].$el != undefined) {
            if (!istrue) {
              node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
            } else {
              node.style.height = '50px'
            }
            node.style.transition = 'all 1s'
          }
          if (this.$refs[ref] instanceof Array && this.$refs[ref][0].$el != undefined) {
            if (!istrue) {
              node[0].style.height = this.$refs[ref][0].$el.offsetHeight + 90 + 'px'
            } else {
              node[0].style.height = '50px'
            }
            node[0].style.transition = 'all 1s'
          }
        }
      })
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    }
  }
}
</script>
<style scoped lang="less">
.warntext {
  width: 100%;
  height: 47px;
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.item_text {
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
.noFile {
  font-size: 16px;
  margin-left: 20px;
  margin-top: 10px;
  line-height: 21px;
}
</style>
