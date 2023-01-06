<!--
 * @Date: 2021-06-21 16:29:06
 * @information: 设备信息详情
-->
<template>
  <div id="device-detail-info">
    <div class="wrap-info">
      <div class="title">入库信息</div>
      <ta-row>
        <ta-col :span="24">
          <!-- <ta-col :span="4">设备ID：入库信息</ta-col> -->
          <ta-col :span="8"> <span class="span-label">SN编号：</span> {{detailInfo.equipmentNumber || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">设备型号：</span> {{detailInfo.equipmentModel || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">MEID：</span> {{detailInfo.equipmentModel || '-'}}</ta-col>
        </ta-col>
        <ta-col :span="24"
                class="mt--15">
          <ta-col :span="8"> <span class="span-label">IMEI：</span> {{detailInfo.equipmentImei || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">MAC地址：</span> {{detailInfo.equipmentMacAddress || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">备注：</span> {{detailInfo.remark || '-'}}</ta-col>
        </ta-col>
      </ta-row>
    </div>

    <div class="wrap-info">
      <div class="title">关联SIM信息</div>
      <ta-row>
        <ta-col :span="24">
          <ta-col :span="8"> <span class="span-label">SIM卡运营商：</span> {{detailInfo.simOperator || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">SIM归属地：</span> {{detailInfo.simAttributionRegion || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">SIM卡号：</span> {{detailInfo.simCardNumber || '-'}}</ta-col>
        </ta-col>
        <ta-col :span="24"
                class="mt--15">
          <ta-col :span="8"> <span class="span-label">套餐：</span> {{detailInfo.simPackage || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">SIM录入日期：</span> {{detailInfo.entryDate || '-'}}</ta-col>
        </ta-col>
      </ta-row>
    </div>

    <div class="wrap-info">
      <div class="title">出库信息</div>
      <ta-row>
        <ta-col :span="24">
          <ta-col :span="8"> <span class="span-label">合同编号：</span> {{detailInfo.contractNumber || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">配送区域：</span> {{detailInfo.useAreaAddress || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">运维有效期：</span> {{detailInfo.maintainValidityTimeStart}} ~ {{detailInfo.maintainValidityTimeEnd}}</ta-col>
        </ta-col>
        <ta-col :span="24"
                class="mt--15">
          <ta-col :span="8"> <span class="span-label">出库人：</span> {{detailInfo.outBoundPeople || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">出库时间：</span> {{detailInfo.outBoundTime || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">发货日期：</span> {{detailInfo.sendGoodsTime || '-'}}</ta-col>
        </ta-col>
        <ta-col :span="24"
                class="mt--15">
          <ta-col :span="8"> <span class="span-label">收货人：</span> {{detailInfo.consignee || '-'}}</ta-col>
          <ta-col :span="8"> <span class="span-label">收货地点：</span> {{detailInfo.takeGoodsAddress || '-'}}</ta-col>
        </ta-col>

      </ta-row>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    // 详情对象
    obj: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    detailInfo () {
      return (this.obj && this.obj.informationList) || {}
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
}
</script>

<style lang="less">
#device-detail-info {
  font-size: 16px;

  .span-label {
    font-weight: 600;
  }

  .wrap-info {
    margin: 30px 0;
    padding: 25px;
    box-sizing: border-box;
    border: 1px dashed #a8a8a8;

    .title {
      margin-bottom: 15px;
      padding-left: 15px;
      border-left: 5px solid #0808ff;
      font-size: 18px;
    }
  }

  .mt--15 {
    margin-top: 15px;
  }
}
</style>


