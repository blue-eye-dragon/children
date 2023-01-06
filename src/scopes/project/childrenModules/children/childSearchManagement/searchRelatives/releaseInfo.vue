<template>
  <div class="conts">
    <!-- <ta-border-layout> -->
    <div class="contin">
      <ta-form layout="horizontal"
               :autoFormCreate="(childInfoForm)=>{this.childInfoForm = childInfoForm}">
        <ta-row class="fromcom">
          <ta-col :span="6">
            <ta-form-item label="儿童姓名"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :fieldDecoratorOptions="verificationRules('儿童姓名',72)"
                          fieldDecoratorId="name">
              <ta-input :disabled="true"
                        placeholder="请输入儿童姓名" />
            </ta-form-item>
            <ta-form-item label="儿童类别"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :require="{message:'请选择儿童类别'}"
                          fieldDecoratorId="childType">
              <ta-select :disabled="true"
                         placeholder="请选择儿童类别">
                <ta-select-option v-for="(item,index) in childTypeList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="儿童编号"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="childNumber"
                          :require="{message:'请输入儿童编号'}">
              <ta-input :disabled="true" />
            </ta-form-item>

            <ta-form-item label="出生日期"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :require="{message:'请选择出生日期'}"
                          fieldDecoratorId="birthday">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="性别"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :require="{message:'请选择性别'}"
                          fieldDecoratorId="sex">
              <ta-select :disabled="true"
                         placeholder="请选择性别">
                <ta-select-option v-for="(item,index) in sexList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="所属机构"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :require="{message:'请输入所属机构'}"
                          fieldDecoratorId="orgName">
              <ta-input :disabled="true" />
            </ta-form-item>

          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="是否重病"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="seriousIllnessYOrN">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item,index) in yesNoList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="残疾等级"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="disabilityLevel">
              <ta-select :disabled="true"
                         placeholder>
                <ta-select-option v-for="(item,index) in dLevelList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="12">
              <ta-form-item label="儿童情况"
                            :labelCol="{span:4}"
                            :wrapperCol="{span:20}"
                            :require="{message:'请选择残疾类型'}"
                            fieldDecoratorId="childSituation">
                <ta-select mode="multiple"
                           :disabled="true"
                           placeholder="请选择残疾类型">
                  <ta-select-option v-for="(item,index) in childSituationTypeList"
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="患病类型"
                            :labelCol="{span:4}"
                            :wrapperCol="{span:20}"
                            :require="{message:'请选择患病类型'}"
                            fieldDecoratorId="illnessType">
                <ta-select :disabled="true"
                           mode="multiple"
                           placeholder="请选择患病类型">
                  <ta-select-option v-for="(item,index) in illnessList"
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="12">
              <ta-form-item label="残疾类型"
                            :labelCol="{span:4}"
                            :wrapperCol="{span:20}"
                            fieldDecoratorId="disabilityType">
                <ta-select :disabled="true"
                           mode="multiple"
                           placeholder>
                  <ta-select-option v-for="(item,index) in dTypeList"
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
        </ta-row>
      </ta-form>
      <!-- ------ -->
      <div v-if="isAdoptedShow">
        <ta-form layout="horizontal"
                 :autoFormCreate="(releaseForm)=>{this.releaseForm = releaseForm}">
          <ta-row style=" margin-bottom: 50px;"
                  class="fromcom">
            <div class="item_title">
              <div class="lines"></div>
              <p class="item_text"
                 style="width:140px">寻亲信息发布</p>
              <div class="horizontalline"></div>
            </div>
            <!-- 是否发布待收养信息隐藏，但是还会传默认值到后台 -->
            <ta-col :span="19"
                    v-show="false">
              <ta-form-item label="是否发布待收养信息"
                            :require="{message:'请选择是否发布待收养信息'}"
                            fieldDecoratorId="whetherReleaseToBeAdopted"
                            :labelCol="{span:5}"
                            :wrapperCol="{span:19}"
                            v-if="look">
                <ta-radio-group :disabled="NoEdit"
                                @change="showLot"
                                :options="yesNoList"
                                defaultValue="0">
                  <!-- :options="yesNoList" -->
                  <ta-radio :value="0">否</ta-radio>
                  <ta-radio :value="1">是</ta-radio>
                </ta-radio-group>

              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="体态"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="posture"
                              :require="{message:'请选择体态'}">
                  <ta-select :disabled="NoEdit"
                             placeholder="请选择体态">
                    <ta-select-option v-for="(item,index) in postureList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="头发"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="hair"
                              :require="{message:'请选择头发'}">
                  <ta-select :disabled="NoEdit"
                             placeholder="请选择头发">
                    <ta-select-option v-for="(item,index) in hairList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="发色"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="hairColor"
                              :require="{message:'请选择发色'}">
                  <ta-select :disabled="NoEdit"
                             placeholder="请选择发色">
                    <ta-select-option v-for="(item,index) in hairColorList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="身高(cm)"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              :require="{message:'请输入身高(cm)'}"
                              fieldDecoratorId="admissionHeight">
                  <ta-input-number :min="0"
                                   :max="999"
                                   :disabled="NoEdit"
                                   style="width:100%"
                                   placeholder="请输入身高(cm)" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="体重(kg)"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              :require="{message:'请输入体重(kg)'}"
                              fieldDecoratorId="weight">
                  <ta-input-number :min="0"
                                   :max="999"
                                   :disabled="NoEdit"
                                   placeholder="请输入体重(kg)"
                                   style="width:100%" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="12">
                <ta-form-item label="发现/解救时地点"
                              fieldDecoratorId="findAddress"
                              :fieldDecoratorOptions="verificationRules('发现/解救时地点',100)">
                  <ta-input :disabled="NoEdit"
                            placeholder="请输入发现/解救时地点" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="发现/解救时间"
                              :labelCol="{ span: 11 }"
                              :wrapperCol="{span:13}"
                              :require="{message:'请选择发现/解救时间'}"
                              fieldDecoratorId="findTime">
                  <ta-date-picker style="width:100%;"
                                  placeholder="请选择发现/解救时间"
                                  :disabled="NoEdit" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="健康状况"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              :require="{message:'请选择健康状况'}"
                              fieldDecoratorId="healthStatus">
                  <ta-select :disabled="NoEdit"
                             placeholder="请选择健康状况">
                    <ta-select-option v-for="(item,index) in healthList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="是否采集DNA"
                              :labelCol="{ span: 10 }"
                              :wrapperCol="{span:14}"
                              :require="{message:'请选择是否采集DNA'}"
                              fieldDecoratorId="isCollectDNA">
                  <ta-select :disabled="NoEdit"
                             placeholder="请选择是否采集DNA">
                    <ta-select-option v-for="(item,index) in yesNoList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="救助单位"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="rescueUnit">
                  <ta-input :disabled="true"
                            placeholder="请输入救助单位" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="所在区域"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="rescueUnitDetails">
                  <ta-input :disabled="true"
                            placeholder="请输入所在区域" />
                </ta-form-item>
              </ta-col>
            </ta-col>

            <ta-col :span="24">
              <ta-col :span="7">
                <ta-form-item label="公告发布时间"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="notice"
                              :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择公告发布时间' },{validator: noticeVali }]}">
                  <ta-range-picker :disabled="NoEdit" />
                </ta-form-item>
              </ta-col>

              <!-- <ta-col :span="6">
                <ta-form-item label="邮箱"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="email"
                              :fieldDecoratorOptions="{ rules: [{ type: 'email', message: '请输入正确的邮箱地址' }]}">
                  <ta-input :disabled="NoEdit"
                            placeholder="请输入邮箱" />
                </ta-form-item>
              </ta-col> -->
              <ta-col :span="6">
                <ta-form-item label="联系电话"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="telPhone1"
                              :fieldDecoratorOptions="verificationRules('联系电话',{type: 'phone'})">
                  <ta-input :disabled="NoEdit"
                            placeholder="请输入联系电话" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6"
                      v-if="false">
                <ta-form-item label="联系电话2"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="telPhone2"
                              :fieldDecoratorOptions="verificationRules('联系电话2',{type: 'phone'})">
                  <ta-input :disabled="NoEdit"
                            placeholder="请输入联系电话2" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6"
                      v-if="false">
                <ta-form-item label="其他联系方式"
                              :labelCol="{ span: 10 }"
                              :wrapperCol="{span:14}"
                              fieldDecoratorId="otherPhone"
                              :fieldDecoratorOptions="verificationRules('其他联系方式',20)">
                  <ta-input :disabled="NoEdit"
                            placeholder="请输入其他联系方式" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="发布日期"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="createTime"
                              :require="{message:''}"
                              v-if="NoEdit">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="发布人"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="createUserName"
                              :require="{message:''}"
                              v-if="NoEdit">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="发现/解救时衣着特征"
                            class="alonerow"
                            fieldDecoratorId="dressCharacteristics"
                            :fieldDecoratorOptions="{rules: [{ required: true, message: '' },{validator: fnmustKeep }]}">
                <ta-textarea :disabled="NoEdit"
                             placeholder="请输入发现/解救时衣着特征" />
              </ta-form-item>
            </ta-col>
            <!-- ------ -->

            <ta-col :span="24">
              <ta-form-item label="病残状况描述"
                            class="alonerow"
                            fieldDecoratorId="disabilityDescription"
                            :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
                <ta-textarea :disabled="NoEdit" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="儿童照片"
                            class="alonerow"
                            fieldDecoratorId="files"
                            :require="{message:'请上传儿童照片'}">
                <div class="clearfix">
                  <ta-upload :withCredentials="true"
                             name="file"
                             :action="actionUrl"
                             listType="picture-card"
                             :disabled="NoEdit"
                             :fileList="fileList"
                             @remove="handleRemove"
                             @preview="preview"
                             @change="handleChange"
                             :data="datas"
                             :beforeUpload="beforeUploadImg">
                    <div v-if="fileList.length < 3">
                      <ta-icon type="plus" />
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </ta-upload>
                </div>
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
      <div :hidden="standby">
        <div class="item_title">
          <div class="lines"></div>
          <p :v-if="standby"
             class="item_text"
             style="width:170px">待收养儿童信息发布</p>
          <div class="horizontalline"></div>
        </div>
        <ta-form layout="horizontal"
                 :autoFormCreate="(adoptedForm)=>{this.adoptedForm = adoptedForm}">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="联系电话"
                              fieldDecoratorId="telephone"
                              :fieldDecoratorOptions="verificationRules('联系电话',{type: 'phone'})">
                  <ta-input :disabled="NoEdit"
                            placeholder="请输入联系电话" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="18">
                <ta-form-item label="收养办理单位"
                              :labelCol="{span:3}"
                              :wrapperCol="{span:21}"
                              fieldDecoratorId="adoptedUnit"
                              :fieldDecoratorOptions="verificationRules('收养办理单位',72)">
                  <ta-input :disabled="NoEdit"
                            placeholder="请输入收养办理单位" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="说明"
                            fieldDecoratorId="explain"
                            class="explain"
                            :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
                <ta-textarea :disabled="NoEdit" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
      <div v-show="!isAdoptedShow">
        <div class="item_title">
          <div class="lines"></div>
          <p :v-if="standby"
             class="item_text"
             style="width:75px">儿童照片</p>
          <div class="horizontalline"></div>
        </div>
        <ta-form layout="horizontal"
                 :autoFormCreate="(form)=>{this.imgForm = form}">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-form-item label="儿童照片"
                            class="alonerow"
                            fieldDecoratorId="files"
                            :require="{message:'请上传儿童照片'}">
                <div class="clearfix">
                  <ta-upload :withCredentials="true"
                             name="file"
                             :action="actionUrl"
                             listType="picture-card"
                             :disabled="NoEdit"
                             :fileList="fileList"
                             @remove="handleRemove"
                             @preview="preview"
                             @change="handleChange"
                             :data="datas"
                             :beforeUpload="beforeUploadImg">
                    <div v-if="fileList.length < 3">
                      <ta-icon type="plus" />
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </ta-upload>
                </div>
                <ta-modal :visible="previewVisible"
                          :footer="null"
                          @cancel="handleCancel">
                  <img alt="example"
                       style="width: 100%"
                       :src="previewImage" />
                </ta-modal>

              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <ta-button v-if="!NoEdit"
                 type="primary"
                 class="preservation"
                 @click="submit()">发布</ta-button>
    </div>
    <!-- </ta-border-layout> -->
  </div>
</template>
<script>
import moment from 'moment'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  data () {
    return {
      NoEdit: false,
      standby: true,
      isAdoptedShow: true, // 显示非待收养列表
      look: true, // 非待收养查看
      childBaseId: '',
      waitId: '', // 待收养id
      listUrl: '',
      ListId: '',
      // childSeekingRevokeVo: [], // 撤销
      childSeekingVo: [], // 寻亲发布
      seekingChindInfoVo: [], // 儿童基本
      toBeAdoptedChildVo: [], // 待收养
      // z//
      childTypeList: [],
      childSituationTypeList: [],
      sexList: [],
      yesNoList: [],
      illnessList: [],
      dLevelList: [],
      dTypeList: [],
      postureList: [],
      hairList: [],
      hairColorList: [],
      healthList: [],

      datas: {
        // 头像上传的参数
        busiType: '13', // 头像
        functionalType: '2'
      },
      imageUrl: 'static/img/defalimg.png',
      loading: false,
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: '示例.png',
        status: 'done',
        url: 'static/img/defalimg.png'
      }] // 文件列表
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('6.3%', '93.7%', 'explain') // 说明 字段宽度控制
    this.setLabelAndWrapperWidth('10%', '90%', 'alonerow') // 单独一行字段宽度控制
  },
  activated () {
    this.fileList = []

    this.releaseForm.resetFields()

    this.NoEdit = this.$route.query.NoEdit
    this.isAdoptedShow = true
    this.look = true
    if (this.NoEdit) {
      this.look = false // 隐藏是否字段
    }
    this.childBaseId = this.$route.query.childId
    this.ListId = this.$route.query.ListId

    this.listUrl = this.$route.query.url
    this.waitId = ''
    if (this.$route.query.waitId) {
      // 待收养跳转
      this.waitId = this.$route.query.waitId
      this.isAdoptedShow = false // 收养
      this.standby = false // 待收养Show
    }

    this.getData()
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getData () {
      let par = {}
      if (this.waitId) {
        par = { childBaseId: this.childBaseId, id: this.waitId }
      } else {
        par = { childBaseId: this.childBaseId, id: this.ListId }
      }

      const result = await this.post(this.listUrl, par)
      if (!result.error) {
        if (!this.waitId) {
          this.childSeekingVo = result.data.data.childSeekingVo
            ? result.data.data.childSeekingVo
            : '' // 寻亲发布，待收养时没有
        }

        this.seekingChindInfoVo = result.data.data.seekingChindInfoVo
          ? result.data.data.seekingChindInfoVo
          : '' // 儿童基本
        if (result.data.data.toBeAdoptedChildVo) {
          this.toBeAdoptedChildVo = result.data.data.toBeAdoptedChildVo.childSeekingTobeAdoptedVo
            ? result.data.data.toBeAdoptedChildVo.childSeekingTobeAdoptedVo
            : '' // 待收养
        }
      }
      this.childInfoForm.setFieldsValue(this.seekingChindInfoVo)
      this.childInfoForm.setFieldsValue({
        illnessType: this.seekingChindInfoVo.illnessType
          ? this.seekingChindInfoVo.illnessType.split(',')
          : '',
        disabilityType: this.seekingChindInfoVo.disabilityType
          ? this.seekingChindInfoVo.disabilityType.split(',')
          : null,
        childSituation: this.seekingChindInfoVo.childSituation
          ? this.seekingChindInfoVo.childSituation.split(',')
          : ''
      })

      if (!this.waitId) {
        // 附件赋值
        this.fileList = []
        const fileList = this.childSeekingVo.childSeekingReleaseVo ? this.childSeekingVo.childSeekingReleaseVo.fileList || [] : []
        for (let i = 0; i < fileList.length; i++) {
          const fileObj = fileList[i]
          fileObj.thumbUrl = 'data:image/png;base64,' + fileObj.thumbUrl
          this.fileList.push(fileObj)
        }

        // 收养带入 st 不是待收养跳转
        this.releaseForm.setFieldsValue(
          this.childSeekingVo.childSeekingReleaseVo
        )
        this.releaseForm.setFieldsValue({
          findTime: this.childSeekingVo.childSeekingReleaseVo.findTime
            ? moment(this.childSeekingVo.childSeekingReleaseVo.findTime)
            : null,
          whetherReleaseToBeAdopted: this.childSeekingVo
            .whetherReleaseToBeAdopted
            ? this.childSeekingVo.whetherReleaseToBeAdopted
            : '0',
          createTime: this.childSeekingVo.childSeekingReleaseVo.createTime
            ? moment(
              this.childSeekingVo.childSeekingReleaseVo.createTime
            ).format('YYYY-MM-DD')
            : null,
          notice: [
            this.childSeekingVo.childSeekingReleaseVo.noticeStartTime ? moment(this.childSeekingVo.childSeekingReleaseVo.noticeStartTime) : null,
            this.childSeekingVo.childSeekingReleaseVo.noticeEndTime ? moment(this.childSeekingVo.childSeekingReleaseVo.noticeEndTime) : null
          ]
        })
      } else {
        // 附件赋值
        this.fileList = []
        const fileList = result.data.data.toBeAdoptedChildVo ? result.data.data.toBeAdoptedChildVo.fileList || [] : []
        for (let i = 0; i < fileList.length; i++) {
          const fileObj = fileList[i]
          fileObj.thumbUrl = 'data:image/png;base64,' + fileObj.thumbUrl
          this.fileList.push(fileObj)
        }
      }
      // 待收养带入
      this.adoptedForm.setFieldsValue(this.toBeAdoptedChildVo)
    },
    handleCancel () {
      this.previewVisible = false
    },
    async submit () {
      if (!this.waitId) { // 寻亲
        const yesNotAdopted = this.releaseForm.getFieldsValue()
          .whetherReleaseToBeAdopted
        // 附件传值
        if (this.fileList.length > 0) {
          this.releaseForm.setFieldsValue({ files: 1 })
        } else {
          this.releaseForm.setFieldsValue({ files: undefined })
        }
        if (yesNotAdopted == 0) { // 寻亲
          this.releaseForm.validateFields(async (err, values) => {
            if (!err) {
              let params = {}
              const childSeekingSubVo = []
              const childSeekingVo = {}
              let childSeekingReleaseVo = {}
              const seekingChindInfoVo = {}
              const toBeAdoptedChildVo = {}

              childSeekingReleaseVo = Object.assign(
                this.childSeekingVo.childSeekingReleaseVo,
                this.releaseForm.getFieldsValue()
              )
              // 附件
              const upLoadPathIds = []
              if (this.fileList.length > 0) {
                this.fileList.map(item => {
                  upLoadPathIds.push(item.response.data.data.fileid)
                })
              }
              childSeekingReleaseVo.upLoadPathIds = upLoadPathIds

              childSeekingReleaseVo.findTime = childSeekingReleaseVo.findTime.format(
                'YYYY-MM-DD'
              )
              if (childSeekingReleaseVo.notice) {
                childSeekingReleaseVo.noticeStartTime = childSeekingReleaseVo.notice[0].format('YYYY-MM-DD')
                childSeekingReleaseVo.noticeEndTime = childSeekingReleaseVo.notice[1].format('YYYY-MM-DD')
                delete childSeekingReleaseVo.notice
              }
              childSeekingVo.childSeekingReleaseVo = childSeekingReleaseVo
              childSeekingVo.whetherReleaseToBeAdopted = this.releaseForm.getFieldsValue().whetherReleaseToBeAdopted
              childSeekingVo.childBaseId = this.childBaseId
              params = {
                childSeekingVo: { ...childSeekingVo },
                seekingChindInfoVo: this.seekingChindInfoVo
              }
              const data = await this.post(
                '/childSeeking/releaseData',
                params,
                true
              )
              if (!data.errors) {
                this.$message.success('信息提交成功!')
                this.backs()
              }
            } else {
              this.$message.error(
                '校验不通过，无法提交，请再次检查!'
              )
            }
          })
        } else {
          this.releaseForm.validateFields(async (err, values) => {
            if (!err) {
              this.adoptedForm.validateFields(async (err, values) => {
                if (!err) {
                  let params = {}
                  const childSeekingSubVo = []
                  const childSeekingVo = {}
                  let childSeekingReleaseVo = {}
                  const seekingChindInfoVo = {}
                  const toBeAdoptedChildVo = {}
                  let childSeekingTobeAdoptedVo = {}

                  childSeekingReleaseVo = this.releaseForm.getFieldsValue()
                  // 附件
                  const upLoadPathIds = []
                  if (this.fileList.length > 0) {
                    this.fileList.map(item => {
                      upLoadPathIds.push(item.response.data.data.fileid)
                    })
                  }
                  childSeekingReleaseVo.upLoadPathIds = upLoadPathIds

                  childSeekingReleaseVo.findTime = childSeekingReleaseVo.findTime.format(
                    'YYYY-MM-DD'
                  )
                  childSeekingVo.childSeekingReleaseVo = childSeekingReleaseVo
                  childSeekingVo.whetherReleaseToBeAdopted = this.releaseForm.getFieldsValue().whetherReleaseToBeAdopted
                  childSeekingVo.childBaseId = this.childBaseId

                  childSeekingTobeAdoptedVo = this.adoptedForm.getFieldsValue()
                  toBeAdoptedChildVo.childBaseId = this.childBaseId
                  toBeAdoptedChildVo.childSeekingTobeAdoptedVo = childSeekingTobeAdoptedVo

                  params = {
                    childSeekingVo: { ...childSeekingVo },
                    toBeAdoptedChildVo: { ...toBeAdoptedChildVo },
                    seekingChindInfoVo: this.seekingChindInfoVo
                  }

                  const data = await this.post(
                    '/childSeeking/releaseData',
                    params,
                    true
                  )
                  if (!data.errors) {
                    this.$message.success('信息提交成功!')
                    this.backs()
                  }
                } else {
                  this.$message.error(
                    '校验不通过，无法提交，请再次检查!'
                  )
                }
              })
            } else {
              this.$message.error(
                '校验不通过，无法提交，请再次检查!'
              )
            }
          })
        }
      } else {
        // 附件传值
        if (this.fileList.length > 0) {
          this.imgForm.setFieldsValue({ files: 1 })
        } else {
          this.imgForm.setFieldsValue({ files: undefined })
        }
        this.adoptedForm.validateFields(async (err, values) => {
          if (!err) {
            this.imgForm.validateFields(async (err, values) => {
              if (!err) {
                let params = {}
                const childSeekingSubVo = []

                const seekingChindInfoVo = {}
                const toBeAdoptedChildVo = {}
                let childSeekingTobeAdoptedVo = {}

                childSeekingTobeAdoptedVo = this.adoptedForm.getFieldsValue()
                toBeAdoptedChildVo.childBaseId = this.childBaseId
                toBeAdoptedChildVo.childSeekingTobeAdoptedVo = childSeekingTobeAdoptedVo
                const upLoadPathIds = []
                if (this.fileList.length > 0) {
                  this.fileList.map(item => {
                    upLoadPathIds.push(item.response.data.data.fileid)
                  })
                }
                toBeAdoptedChildVo.upLoadPathIds = upLoadPathIds
                params = {
                  toBeAdoptedChildVo: { ...toBeAdoptedChildVo },
                  seekingChindInfoVo: this.seekingChindInfoVo
                }

                const data = await this.post(
                  '/childSeekingToBeAdopted/releaseData',
                  params,
                  true
                )
                if (!data.errors) {
                  this.$message.success('信息提交成功!')
                  this.backs()
                }
              } else {
                this.$message.error(
                  '校验不通过，无法提交，请再次检查!'
                )
              }
            })
          } else {
            this.$message.error(
              '校验不通过，无法提交，请再次检查!'
            )
          }
        })
      }
    },
    noticeVali (a, v, callback) {
      console.log(a, v, callback)
      if (!v[0]) {
        callback('请选择公告发布时间')
      } else {
        callback()
      }
    },
    fnValidateMore (a, v, callback) {
      const value = v || ''
      this.fnValidateTextarea(34, '病残状况描述', value, callback, '0')
    },
    backs () {
      this.imageUrl = 'static/img/defalimg.png'
      this.fileList = [] // 文件列表

      this.standby = true
      this.childInfoForm.resetFields()
      this.adoptedForm.resetFields()
      this.releaseForm.resetFields()
      this.$router.go(-1)
    },
    showLot (val) {
      // 按钮
      if (this.standby) {
        if (!this.toBeAdoptedChildVo && this.toBeAdoptedChildVo == '') {
          this.standby = false
        } else {
          this.$nextTick(() => {
            this.releaseForm.setFieldsValue({
              whetherReleaseToBeAdopted: '0'
            })
          })
          this.$notification.open({
            message: '提示',
            description: '该儿童待收养信息已发布，请勿重复操作，若要修改待收养信息，请在“待收养儿童信息发布”功能中先撤销，再重新发布待收养信息。',
            icon: <ta-icon type="frown-o" style="color: #108ee9" />
          })
        }
      } else {
        this.standby = true
      }
    },
    async getList () {
      const data1 = await this.getDictionaries('CHILDCATEGORYA')
      this.childTypeList = data1 // 儿童类别
      const data2 = await this.getDictionaries('CHILDSITUATION')
      this.childSituationTypeList = data2 // 儿童情况
      const data3 = await this.getDictionaries('SEX')
      this.sexList = data3 // 性别
      const data4 = await this.getDictionaries('ILLNESSTYPE')
      this.illnessList = data4 // 患病类别
      const data5 = await this.getDictionaries('YESNO')
      this.yesNoList = data5 // 是否
      const data6 = await this.getDictionaries('DISABILITYLEVEL')
      this.dLevelList = data6 // 残疾等级
      const data7 = await this.getDictionaries('DISABILITYTYPE')
      this.dTypeList = data7 // 残疾类别
      const data8 = await this.getDictionaries('POSTURE')
      this.postureList = data8 // 体态
      const data9 = await this.getDictionaries('HAIR')
      this.hairList = data9 // 头发
      const data10 = await this.getDictionaries('HAIRCOLOR')
      this.hairColorList = data10 // 发色
      const data11 = await this.getDictionaries('HEALTH_SEEKING')
      this.healthList = data11 // 健康选项
      const data12 = await this.getDictionaries('YESNO')
      this.yesNoList = data12 // 是否选项
    },
    fnmustKeep (a, v, callback) {
      const value = v || ''
      this.fnValidateTextarea(34, '发现/解救时衣着特征', value, callback)
    },
    // 上传
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.NoEdit) {
          return false
        }
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl
            this.loading = false
          })
          this.fileList = info.fileList
          setTimeout(() => {
            this.$forceUpdate()
          }, 500)
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUploadImg (file) {
      const typelist = ['image/jpeg', 'image/png']
      const isaccord = typelist.includes(file.type)
      if (!isaccord) {
        this.$message.error('请上传jpeg、png图片格式')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('文件大小大于10M!')
      }
      return isaccord && isLt10M
    },
    // 上传需要的参数
    fileData (e, flag) {
      return {
        busiType: e,
        functionalType: '2'
      }
    },
    preview (file) {
      this.downloadFile(file)
    },
    handleRemove (e) {
      if (this.NoEdit) {
        return false
      }
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: e.response.data.data.fileid
      }).then(response => {
        _self.$message.success('删除成功!')
      }).catch(() => {
        _self.$message.error('删除失败!')
      })
    }
  },
  computed: {
    actionUrl () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  }
}
</script>
<style scoped>
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cursors {
  cursor: pointer;
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
.item_text {
  width: 60px;
  font-size: 17px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.horizontalline {
  width: calc(100% - 135px);
  margin-left: 15px;
  margin-right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
}
.preservation {
  margin-left: 20px;
}

/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
