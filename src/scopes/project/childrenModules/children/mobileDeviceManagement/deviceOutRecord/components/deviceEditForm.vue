<!--
 * @Date: 2021-06-22 10:50:03
 * @information: 出库编辑表单
-->
<template>
  <div id="device-edit-form">
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

      <!-- <ta-form-item label="设备编号"
                    fieldDecoratorId="deviceNumber"
                    class="spilwid form-item-device-number"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">
        <ta-select :allowClear="true"
                   :showSearch="false"
                   placeholder="请选择设备编号"
                   :options="useStatusDic"
                   :getPopupContainer="setPopupContainer"></ta-select>
      </ta-form-item> -->

      <ta-form-item label="设备编号"
                    fieldDecoratorId="equipmentNum"
                    class="form-item-equipmentNum"
                    :labelCol="{span:4}"
                    :wrapperCol="{span:20}"
                    :required="false">
        <div>{{selectedDeviceIdArr.length ? selectedDeviceIdArr.join('，') : `暂无设备编号`}}</div>
      </ta-form-item>

      <ta-form-item label="设备数量"
                    fieldDecoratorId="equipmentCount"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 12}">
        <ta-input placeholder=''
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
                        :loadLeafLevel="0"
                        @setaddress="setaddress('useArea', 'addressmodel')"></AddressComponent>

      <ta-form-item label="运维有效期"
                    fieldDecoratorId="termTime"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 12}"
                    :fieldDecoratorOptions="this.verificationRules('运维有效期', true)">
        <ta-range-picker :disabled="disabled"
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
                    fieldDecoratorId="outTime"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 12}"
                    :fieldDecoratorOptions="this.verificationRules('出库时间', true)">
        <ta-date-picker :disabled="disabled"
                        :getCalendarContainer="setPopupContainer" />
      </ta-form-item>

      <ta-form-item label="发货日期"
                    class="form-item-issuance-date"
                    fieldDecoratorId="sendTime"
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
                      fieldDecoratorId="takeGoodsAddressDetail"
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
    // 禁用标志
    disabled: {
      type: Boolean,
      default: false
    },
    // 当前行信息
    tableRow: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      containerName: 'device-edit-form', // 建立的父容器
      useStatusDic: [], // 设备编号字典
      addressmodel: [], // 使用区域
      addressmodel2: [], // 发货地点
      selectedDeviceIdArr: [], // 设备编号id列表
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
     * @Date: 2021-06-25 14:05:44
     * @information: 赋值表单信息
     */
    assignmentForm () {
      let { tableRow } = this
      this.outDeviceForm.setFieldsValue(tableRow)
      // 设备编号处理
      tableRow.equipmentNumLists && (this.selectedDeviceIdArr = tableRow.equipmentNumLists)
      // 地址处理
      this.addressmodel = [
        tableRow.useAreaPro,
        tableRow.useAreaCity,
        tableRow.useAreaCounty,
      ]
      this.addressmodel2 = [
        tableRow.takeGoodsAddressPro,
        tableRow.takeGoodsAddressCity,
        tableRow.takeGoodsAddressCounty,
        tableRow.takeGoodsAddressTown,
      ]
      // 日期处理
      this.outDeviceForm.setFieldsValue({
        termTime: [
          tableRow.maintainValidityTimeStart ? this.momentValue(tableRow.maintainValidityTimeStart) : null,
          tableRow.maintainValidityTimeEnd ? this.momentValue(tableRow.maintainValidityTimeEnd) : null
        ],
        outTime: this.momentValue(tableRow.outBoundTime),
        sendTime: this.momentValue(tableRow.sendGoodsTime)
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 14:47:57
     * @information: 回显时 时间字段处理
     */
    momentValue (val) {
      return val ? moment(val) : null
    },

  }
}
</script>

<style lang="less">
#device-edit-form {
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
    line-height: 39px;
  }
}
</style>
