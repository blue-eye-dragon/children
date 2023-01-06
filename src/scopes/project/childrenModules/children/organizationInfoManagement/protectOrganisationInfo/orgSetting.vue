<template>
  <div class="padbottom conts">
    <div class="contin">
      <ta-form :autoFormCreate="(form)=>{this.form = form}">
        <ta-col :span="24">
          <ta-col :span="12">
            <ta-form-item :label="label"
                          :labelCol="{span:10}"
                          :wrapperCol="{span:14}"
                          :require="{message:'请选择'+label}"
                          fieldDecoratorId="isHaveProtectOrg">
              <ta-select :placeholder="'请选择'+label"
                         v-model="isHaveProtectOrgValue">
                <ta-select-option value="1">是</ta-select-option>
                <ta-select-option value="2">否</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="12">
            <ta-form-item label="机构数量（个）"
                          v-if="isHaveProtectOrgValue=='1'"
                          :require="{message:'请输入机构数量'}"
                          :labelCol="{span:10}"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="protectOrgNum">
              <ta-input-number :min="1"
                               :max="99999"
                               :precision="0"
                               style="width:100%"
                               placeholder="请输入机构数量 " />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <div class="warntextNew">
            <p>
              <ta-icon type="info-circle-o"
                       class="icons" />
              {{userInfo.areaLevel=='4'
              ?'注：若本级有乡镇（街道）未保工作站，请到机构信息维护、工作人员信息管理、社工人员信息管理、参加未保工作培训情况、举办未保工作培训情况菜单下完善相关信息。'
              :'注：若本级有未成年救助保护机构，请告知本级未保机构用户登录系统，添加维护机构信息维护、工作人员信息管理、社工人员信息管理、参加未保工作培训情况、举办未保工作培训情况下相关信息。'}}
            </p>
          </div>
        </ta-col>
      </ta-form>
    </div>
    <div class="bom">
      <ta-button type="primary"
                 class="btnleft"
                 @click="submit">提交</ta-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isHaveProtectOrgValue: '', // 是否有未成年救助保护机构/乡镇（街道）未保工作站选择的值
      userInfo: window.parent.indexTool.getUserInfo() // 登录用户信息
    }
  },
  computed: {
    label () {
      return this.userInfo.areaLevel == '4' ? '本级是否有乡镇（街道）未保工作站' : '本级是否有未成年救助保护机构'
    }
  },
  activated () {
    this.loadData() // 加载数据
  },
  methods: {
    // 加载数据
    loadData () {
      this.post('childProtectOrgManagement/queryProjectOrgSetting', { orgId: this.userInfo.orgId }).then(res => {
        if (res.serviceSuccess) {
          const { data } = res.data
          this.isHaveProtectOrgValue = data ? data.isHaveProtectOrg : ''
          this.$nextTick(() => {
            this.form.setFieldsValue(data)
          })
        }
      })
    },
    // 提交
    submit () {
      this.form.validateFields((err) => {
        if (!err) {
          this.post('childProtectOrgManagement/insertProjectOrgSetting', this.form.getFieldsValue()).then(res => {
            if (res.serviceSuccess) {
              this.$message.success('数据新增/编辑成功！')
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.contin {
  padding: 50px 24px;
}
.warntextNew {
  width: 100%;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  align-items: center;
  p {
    margin: 20px;
  }
  .icons {
    margin: 0 7px 0 24px;
  }
}
</style>
