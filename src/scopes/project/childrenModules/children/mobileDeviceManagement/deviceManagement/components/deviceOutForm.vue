<!--
 * @Date: 2021-06-21 14:06:47
 * @information: 出库表单
-->
<template>
  <div id="device-ou-form">
    <ta-form class="drawerFrom"
             :autoFormCreate="(form)=>{this.outDeviceForm = form}"
             layout="horizontal">
      <ta-form-item label="合同编号"
                    fieldDecoratorId="contractNumber"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 12}">
        <ta-input :placeholder="!disabled?'请输入合同编号':''"
                  :disabled="disabled" />
      </ta-form-item>

      <ta-form-item label="设备编号"
                    fieldDecoratorId="equipmentNum"
                    class="form-item-equipmentNum"
                    :labelCol="{span:4}"
                    :wrapperCol="{span:20}"
                    :required="true">
        <div @click="onSelectDevice">{{selectedDeviceIdArr.length ? selectedDeviceIdArr.join('，') : `点击选择添加设备`}}</div>
      </ta-form-item>

      <ta-form-item label="设备数量"
                    fieldDecoratorId="equipmentCount"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 12}">
        <ta-input :placeholder="!disabled?'根据系统自动带出':''"
                  type="number"
                  :disabled="true" />
      </ta-form-item>

      <AddressComponent :addressmodel="addressmodel"
                        :msg="'使用区域'"
                        :changeOnSelect="true"
                        arealevel="3"
                        :labelwidth="{label: 4, wrapper: 12}"
                        :isRequire="true"
                        fileldName='useArea'
                        :drawer="containerName"
                        :disabled="disabled"
                        :loadLeafLevel="3"
                        @setaddress="setaddress('useArea', 'addressmodel')"></AddressComponent>

      <ta-form-item label="运维有效期"
                    fieldDecoratorId="operationDate"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 12}"
                    :fieldDecoratorOptions="this.verificationRules('运维有效期', true)">
        <ta-range-picker :disabled="disabled"
                         :placeholder="['开始日期', '结束日期']"
                         :getCalendarContainer="setPopupContainer" />
      </ta-form-item>

      <ta-form-item label="出库人"
                    fieldDecoratorId="outBoundPeople"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 12}"
                    :fieldDecoratorOptions="this.verificationRules('出库人', 72)">
        <ta-input :placeholder="!disabled?'请输入出库人':''"
                  :disabled="disabled" />
      </ta-form-item>

      <ta-form-item label="出库时间"
                    class="form-item-issuance-date"
                    fieldDecoratorId="outBoundTime"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 12}"
                    :fieldDecoratorOptions="this.verificationRules('出库时间', true)">
        <ta-date-picker :disabled="disabled"
                        :getCalendarContainer="setPopupContainer" />
      </ta-form-item>

      <ta-form-item label="发货日期"
                    class="form-item-issuance-date"
                    fieldDecoratorId="sendGoodsTime"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 12}"
                    :fieldDecoratorOptions="this.verificationRules('发货日期', true)">
        <ta-date-picker :disabled="disabled"
                        :getCalendarContainer="setPopupContainer" />
      </ta-form-item>

      <ta-form-item label="收货人"
                    fieldDecoratorId="consignee"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 12}"
                    :fieldDecoratorOptions="this.verificationRules('收货人', 72)">
        <ta-input :placeholder="!disabled?'请输入收货人':''"
                  :disabled="disabled" />
      </ta-form-item>

      <div class="receive-address">
        <AddressComponent :labelwidth="{ label: 8, wrapper: 16}"
                          msg="收货地点"
                          :changeOnSelect="false"
                          :addressmodel="addressmodel2"
                          @setaddress="setaddress('reveiveAddress','addressmodel2')"
                          fileldName="reveiveAddress"
                          arealevel="4"
                          :isRequire="true"
                          :drawer="containerName"
                          :disabled="disabled"></AddressComponent>
        <ta-form-item label
                      class="ml--10"
                      fieldDecoratorId="akeGoodsAddressDetail"
                      :wrapperCol="{span:24}"
                      :fieldDecoratorOptions="verificationRules('详细地点',100)">
          <ta-input :disabled="disabled"
                    :placeholder="disabled?'':'请输入详细地点'" />
        </ta-form-item>
      </div>

      <ta-form-item label="备注"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{span:20}"
                    fieldDecoratorId="remark"
                    :fieldDecoratorOptions="this.verificationRulesNotMustFill('备注', 150,true)">
        <ta-textarea :placeholder="!disabled?'请输入备注':''"
                     :rows="4"
                     :disabled="disabled" />
      </ta-form-item>
    </ta-form>

  </div>
</template>

<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'

export default {
  components: {
    AddressComponent
  },
  props: {
    // 要添加出库的设备
    selectedDeviceArr: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      containerName: 'device-ou-form', // 建立的父容器
      disabled: false, // 禁用标志
      useStatusDic: [], // 设备编号字典
      addressmodel: [], // 使用区域
      addressmodel2: [], // 发货地点
    }
  },
  computed: {
    // 选择添加对的设备编号列表
    selectedDeviceIdArr () {
      return this.selectedDeviceArr.map(el => el.equipmentNum)
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    moment,
    /**
     * @author: yinpengfei
     * @Date: 2021-06-21 16:20:59
     * @information: 设置select、picker等的父容器
     */
    setPopupContainer () {
      return document.getElementById(this.containerName)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-21 16:13:02
     * @information: 地址赋值
     */
    setaddress (filedName, fieldValue) {
      this.outDeviceForm.setFieldsValue({
        [filedName]: this[fieldValue]
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-24 18:57:29
     * @information: 选择设备编号
     */
    onSelectDevice () {
      this.$emit('onSelectDevice')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 10:42:28
     * @information: 表单赋值
     */
    assignmentForm () {
      this.outDeviceForm.setFieldsValue({
        equipmentCount: this.selectedDeviceArr.length
      })
    }
  }
}
</script>

<style lang="less">
#device-ou-form {
  .ml--10 {
    margin-left: 10px;
  }

  .receive-address {
    display: flex;
  }

  .form-item-device-number {
    .ant-form-item-label {
      width: 91px;
    }

    .ant-form-item-control {
      width: 273px;
    }
  }

  .form-item-issuance-date {
    .ant-calendar-picker {
      width: 273px;
    }
  }

  .form-item-equipmentNum {
    line-height: 32px;
    cursor: pointer;
  }
}
</style>
