<template>
  <div class="conts">
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="上年执行情况"
                   key="1"
                   :forceRender="true">
        <!-- <ta-anchor class="md" :offsetTop="100">
          <ta-anchor-link href="#anchorpoint_a" title="福利机构孤儿" />
          <ta-anchor-link href="#anchorpoint_b" title="社会散居孤儿" />
          <ta-anchor-link href="#anchorpoint_e" title="合计" />
          <ta-anchor-link href="#anchorpoint_d" title="情况说明" />
        </ta-anchor>-->

        <!-- <div ref="oneout" class="mars">
          <Title id="anchorpoint_a" title="福利机构孤儿" :show.sync="showone"></Title> -->
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">福利机构孤儿</p>
          <div class="horizontalline"></div>
        </div>
        <p class="marsss"
           style="text-align:right;padding-right: 2%">单位：万元</p>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <div style="margin-bottom: 30px;">
            <ul class="ulData">
              <li class="ulDataLi"></li>
              <li class="ulDataLi">诊疗费用</li>
              <li class="ulDataLi">康复费用</li>
              <li class="ulDataLi">特殊药品费用</li>
              <li class="ulDataLi">康复器具费用</li>
              <li class="ulDataLi">体检费用</li>
              <li class="ulDataLi lastLi">住院服务费</li>

              <li class="ulDataLiTwo">例数</li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastObj.diagnoseCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('diagnoseCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastObj.recoveryCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('recoveryCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastObj.specialDrugfeeNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('specialDrugfeeNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastObj.rehabApparatusCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('rehabApparatusCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastObj.physicalCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('physicalCostNum')" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number disabled
                                 v-model="lastObj.hospitallCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('hospitallCostNum')" />
              </li>

              <li class="ulDataLiThree">资金合计</li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastObj.diagnoseCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('diagnoseCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastObj.recoveryCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('recoveryCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastObj.specialDrugfeeCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('specialDrugfeeCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastObj.rehabApparatusCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('rehabApparatusCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastObj.physicalCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('physicalCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree lastLi">
                <ta-input-number disabled
                                 v-model="lastObj.hospitallCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('hospitallCostCapitalTotal')" />
              </li>

              <li class="ulDataLiFour">其中:中央资金</li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="lastObj.diagnoseCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('diagnoseCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="lastObj.recoveryCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('recoveryCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="lastObj.specialDrugfeeCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('specialDrugfeeCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="lastObj.rehabApparatusCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('rehabApparatusCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="lastObj.physicalCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('physicalCostCentralFund')" />
              </li>
              <li class="ulDataLiFour lastLi">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="lastObj.hospitallCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('hospitallCostCentralFund')" />
              </li>
            </ul>
            <div style="clear:both"></div>
          </div>
        </ta-form>

        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">社会散居孤儿</p>
          <div class="horizontalline"></div>
        </div>
        <p class="marsss"
           style="text-align:right;padding-right: 2%">单位：万元</p>
        <ta-form layout="horizontal"
                 ref="five"
                 :autoFormCreate="(parentFrom)=>{this.parentFrom = parentFrom}">
          <div style="margin-bottom: 30px;">
            <ul class="ulData">
              <li class="ulDataLi"></li>
              <li class="ulDataLi">诊疗费用</li>
              <li class="ulDataLi">康复费用</li>
              <li class="ulDataLi">特殊药品费用</li>
              <li class="ulDataLi">康复器具费用</li>
              <li class="ulDataLi">体检费用</li>
              <li class="ulDataLi lastLi">住院服务费</li>

              <li class="ulDataLiTwo">例数</li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastsocial.diagnoseCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('diagnoseCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastsocial.recoveryCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('recoveryCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastsocial.specialDrugfeeNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('specialDrugfeeNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastsocial.rehabApparatusCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('rehabApparatusCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastsocial.physicalCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('physicalCostNum')" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number disabled
                                 v-model="lastsocial.hospitallCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChangeOne('hospitallCostNum')" />
              </li>

              <li class="ulDataLiThree">资金合计</li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastsocial.diagnoseCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('diagnoseCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastsocial.recoveryCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('recoveryCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastsocial.specialDrugfeeCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('specialDrugfeeCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastsocial.rehabApparatusCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('rehabApparatusCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastsocial.physicalCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('physicalCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree lastLi">
                <ta-input-number disabled
                                 v-model="lastsocial.hospitallCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('hospitallCostCapitalTotal')" />
              </li>

              <li class="ulDataLiFour">其中:中央资金</li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="lastsocial.diagnoseCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('diagnoseCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="lastsocial.recoveryCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('recoveryCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="lastsocial.specialDrugfeeCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('specialDrugfeeCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="lastsocial.rehabApparatusCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('rehabApparatusCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="lastsocial.physicalCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('physicalCostCentralFund')" />
              </li>
              <li class="ulDataLiFour lastLi">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="lastsocial.hospitallCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChangeOne('hospitallCostCentralFund')" />
              </li>
            </ul>
            <div style="clear:both"></div>
          </div>
        </ta-form>

        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">合计</p>
          <div class="horizontalline"></div>
        </div>
        <p class="marsss"
           style="text-align:right;padding-right: 2%">单位：万元</p>
        <ta-form layout="horizontal"
                 ref="four"
                 :autoFormCreate="(adInformationnoteFrom)=>{this.adInformationnoteFrom = adInformationnoteFrom}">
          <div style="margin-bottom: 30px;">
            <ul class="ulData">
              <li class="ulDataLi"></li>
              <li class="ulDataLi">诊疗费用</li>
              <li class="ulDataLi">康复费用</li>
              <li class="ulDataLi">特殊药品费用</li>
              <li class="ulDataLi">康复器具费用</li>
              <li class="ulDataLi">体检费用</li>
              <li class="ulDataLi lastLi">住院服务费</li>

              <li class="ulDataLiTwo">例数</li>
              <li class="ulDataLiTwo">
                <ta-input-number v-model="lastNum.diagnoseCostNum"
                                 :min="0"
                                 :max="max"
                                 disabled
                                 :precision="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number v-model="lastNum.recoveryCostNum"
                                 :min="0"
                                 :max="max"
                                 disabled
                                 :precision="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number v-model="lastNum.specialDrugfeeNum"
                                 disabled
                                 :min="0"
                                 :max="max"
                                 :precision="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastNum.rehabApparatusCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="lastNum.physicalCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number disabled
                                 v-model="lastNum.hospitallCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0" />
              </li>

              <li class="ulDataLiThree">资金合计</li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastNum.diagnoseCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastNum.recoveryCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastNum.specialDrugfeeCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastNum.rehabApparatusCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="lastNum.physicalCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiThree lastLi">
                <ta-input-number disabled
                                 v-model="lastNum.hospitallCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>

              <li class="ulDataLiFour">其中:中央资金</li>
              <li class="ulDataLiFour">
                <ta-input-number disabled
                                 v-model="lastNum.diagnoseCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number disabled
                                 v-model="lastNum.recoveryCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number disabled
                                 v-model="lastNum.specialDrugfeeCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number disabled
                                 v-model="lastNum.rehabApparatusCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number disabled
                                 v-model="lastNum.physicalCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiFour lastLi">
                <ta-input-number disabled
                                 v-model="lastNum.hospitallCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
            </ul>
            <div style="clear:both"></div>
          </div>
        </ta-form>

      </ta-tab-pane>
      <ta-tab-pane tab="本年计划安排"
                   key="2"
                   :forceRender="true">
        <!-- <ta-anchor class="md" :offsetTop="100">
          <ta-anchor-link href="#anchorpoint_a" title="福利机构孤儿" />
          <ta-anchor-link href="#anchorpoint_b" title="社会散居孤儿" />
          <ta-anchor-link href="#anchorpoint_e" title="合计" />
          <ta-anchor-link href="#anchorpoint_d" title="情况说明" />
        </ta-anchor>-->
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">福利机构孤儿</p>
          <div class="horizontalline"></div>
        </div>
        <p class="marsss"
           style="text-align:right;padding-right: 2%">单位：万元</p>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <div style="margin-bottom: 30px;">
            <ul class="ulData">
              <li class="ulDataLi"></li>
              <li class="ulDataLi">诊疗费用</li>
              <li class="ulDataLi">康复费用</li>
              <li class="ulDataLi">特殊药品费用</li>
              <li class="ulDataLi">康复器具费用</li>
              <li class="ulDataLi">体检费用</li>
              <li class="ulDataLi lastLi">住院服务费</li>

              <li class="ulDataLiTwo">例数</li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.diagnoseCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('diagnoseCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.recoveryCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('recoveryCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.specialDrugfeeNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('specialDrugfeeNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.rehabApparatusCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('rehabApparatusCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.physicalCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('physicalCostNum')" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.hospitallCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('hospitallCostNum')" />
              </li>

              <li class="ulDataLiThree">资金合计</li>
              <li class="ulDataLiThree">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.diagnoseCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('diagnoseCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.recoveryCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('recoveryCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.specialDrugfeeCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('specialDrugfeeCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.rehabApparatusCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('rehabApparatusCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.physicalCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('physicalCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree lastLi">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.hospitallCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('hospitallCostCapitalTotal')" />
              </li>

              <li class="ulDataLiFour">其中:中央资金</li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.diagnoseCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('diagnoseCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.recoveryCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('recoveryCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.specialDrugfeeCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('specialDrugfeeCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.rehabApparatusCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('rehabApparatusCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.physicalCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('physicalCostCentralFund')" />
              </li>
              <li class="ulDataLiFour lastLi">
                <ta-input-number :disabled="fulidisabled"
                                 v-model="yearfuliObj.hospitallCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('hospitallCostCentralFund')" />
              </li>
            </ul>
            <div style="clear:both"></div>
          </div>
        </ta-form>

        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">社会散居孤儿</p>
          <div class="horizontalline"></div>
        </div>
        <p class="marsss"
           style="text-align:right;padding-right: 2%">单位：万元</p>
        <ta-form layout="horizontal"
                 ref="five"
                 :autoFormCreate="(parentFrom)=>{this.parentFrom = parentFrom}">
          <div style="margin-bottom: 30px;">
            <ul class="ulData">
              <li class="ulDataLi"></li>
              <li class="ulDataLi">诊疗费用</li>
              <li class="ulDataLi">康复费用</li>
              <li class="ulDataLi">特殊药品费用</li>
              <li class="ulDataLi">康复器具费用</li>
              <li class="ulDataLi">体检费用</li>
              <li class="ulDataLi lastLi">住院服务费</li>

              <li class="ulDataLiTwo">例数</li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.diagnoseCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('diagnoseCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.recoveryCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('recoveryCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.specialDrugfeeNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('specialDrugfeeNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.rehabApparatusCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('rehabApparatusCostNum')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.physicalCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('physicalCostNum')" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.hospitallCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0"
                                 @blur="blurChange('hospitallCostNum')" />
              </li>

              <li class="ulDataLiThree">资金合计</li>
              <li class="ulDataLiThree">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.diagnoseCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('diagnoseCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.recoveryCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('recoveryCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.specialDrugfeeCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('specialDrugfeeCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.rehabApparatusCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('rehabApparatusCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.physicalCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('physicalCostCapitalTotal')" />
              </li>
              <li class="ulDataLiThree lastLi">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.hospitallCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('hospitallCostCapitalTotal')" />
              </li>

              <li class="ulDataLiFour">其中:中央资金</li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.diagnoseCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('diagnoseCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.recoveryCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('recoveryCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.specialDrugfeeCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('specialDrugfeeCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.rehabApparatusCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('rehabApparatusCostCentralFund')" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.physicalCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('physicalCostCentralFund')" />
              </li>
              <li class="ulDataLiFour lastLi">
                <ta-input-number :disabled="shehuidisabled"
                                 v-model="yearshehuiObj.hospitallCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step"
                                 :precision="precision"
                                 @blur="blurChange('hospitallCostCentralFund')" />
              </li>
            </ul>
            <div style="clear:both"></div>
          </div>
        </ta-form>

        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">合计</p>
          <div class="horizontalline"></div>
        </div>
        <p class="marsss"
           style="text-align:right;padding-right: 2%">单位：万元</p>
        <ta-form layout="horizontal"
                 ref="four"
                 :autoFormCreate="(adInformationnoteFrom)=>{this.adInformationnoteFrom = adInformationnoteFrom}">
          <div style="margin-bottom: 30px;">
            <ul class="ulData">
              <li class="ulDataLi"></li>
              <li class="ulDataLi">诊疗费用</li>
              <li class="ulDataLi">康复费用</li>
              <li class="ulDataLi">特殊药品费用</li>
              <li class="ulDataLi">康复器具费用</li>
              <li class="ulDataLi">体检费用</li>
              <li class="ulDataLi lastLi">住院服务费</li>

              <li class="ulDataLiTwo">例数</li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="yearhejiObj.diagnoseCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="yearhejiObj.recoveryCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="yearhejiObj.specialDrugfeeNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="yearhejiObj.rehabApparatusCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number disabled
                                 v-model="yearhejiObj.physicalCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number disabled
                                 v-model="yearhejiObj.hospitallCostNum"
                                 :min="0"
                                 :max="max"
                                 :precision="0" />
              </li>

              <li class="ulDataLiThree">资金合计</li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="yearhejiObj.diagnoseCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="yearhejiObj.recoveryCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="yearhejiObj.specialDrugfeeCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="yearhejiObj.rehabApparatusCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiThree">
                <ta-input-number disabled
                                 v-model="yearhejiObj.physicalCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiThree lastLi">
                <ta-input-number disabled
                                 v-model="yearhejiObj.hospitallCostCapitalTotal"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>

              <li class="ulDataLiFour">其中:中央资金</li>
              <li class="ulDataLiFour">
                <ta-input-number disabled
                                 v-model="yearhejiObj.diagnoseCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number disabled
                                 v-model="yearhejiObj.recoveryCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number disabled
                                 v-model="yearhejiObj.specialDrugfeeCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number disabled
                                 v-model="yearhejiObj.rehabApparatusCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiFour">
                <ta-input-number disabled
                                 v-model="yearhejiObj.physicalCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
              <li class="ulDataLiFour lastLi">
                <ta-input-number disabled
                                 v-model="yearhejiObj.hospitallCostCentralFund"
                                 :min="0"
                                 :max="max"
                                 :step="step" />
              </li>
            </ul>
            <div style="clear:both"></div>
          </div>
        </ta-form>

      </ta-tab-pane>
      <!--<ta-tab-pane tab="填报信息" key="3" :forceRender="true">
        <div ref="twoout" class="mars">
          <Title id="anchorpoint_d" title="填报信息" :show.sync="showtwo"></Title>
          <ta-form
            layout="horizontal"
            ref="two"
            :autoFormCreate="(infoFrom)=>{this.infoFrom = infoFrom}"
          >
            <ta-row>
              <ta-col :span="12">
                <ta-form-item
                  label="填报单位"
                  fieldDecoratorId="reportDepart"
                  :fieldDecoratorOptions="rules.reportDepart"
                  :labelCol="{ span: 6 }"
                  :wrapperCol="{span:18}"
                >
                  <ta-input placeholder="请输入填报单位" :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="12">
                <ta-form-item
                  label="填报人"
                  fieldDecoratorId="reportUser"
                  :fieldDecoratorOptions="rules.reportUser"
                  :labelCol="{ span: 6 }"
                  :wrapperCol="{span:18}"
                >
                  <ta-input placeholder="请输入填报人" :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-row>
          </ta-form>
        </div>
      </ta-tab-pane>-->
      <!-- <ta-tab-pane tab="调查信息" key="4"></ta-tab-pane>
      <ta-tab-pane tab="文件上传" key="5">
      </ta-tab-pane>
      <ta-tab-pane tab="打印" key="6">
      </ta-tab-pane>-->
    </ta-tabs>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <!-- <ta-button type="primary" class="preservation" @click="backs">返回</ta-button> -->

      <template>
        <ta-button type="primary"
                   class="preservation"
                   @click="submit()">提交</ta-button>
      </template>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import { setTimeout } from 'timers'
import moment from 'moment'
import { parse } from 'path'
export default {
  name: 'medicalBudgetReport',
  components: {
    Title
  },
  data () {
    return {
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      showfour: true,
      showfive: true,
      nowkey: '1',
      id: '',
      goType: '1',
      fulidisabled: false,
      shehuidisabled: false,
      // 上年执行情况
      // 福利机构孤儿
      lastObj: { isLastyearOrThisyear: '1', budgetType: '1' },
      // 社会散居儿童
      lastsocial: { isLastyearOrThisyear: '1', budgetType: '2' },
      // 合计
      lastNum: { isLastyearOrThisyear: '1', budgetType: '3' },
      // 今年计划安排
      yearfuliObj: {
        isLastyearOrThisyear: '2',
        budgetType: '1'
      },
      yearshehuiObj: { isLastyearOrThisyear: '2', budgetType: '2' },
      yearhejiObj: { isLastyearOrThisyear: '2', budgetType: '3' },
      step: 0.1,
      max: 9999999999,
      precision: 2
      /* rules: {
        reportDepart: this.verificationRules('填报单位', 72),
        reportUser: this.verificationRules('填报人', 72)
      } */
    }
  },
  created () { },
  activated () {
    this.lastObj = { isLastyearOrThisyear: '1', budgetType: '1' }
    this.lastsocial = { isLastyearOrThisyear: '1', budgetType: '2' }
    this.lastNum = { isLastyearOrThisyear: '1', budgetType: '3' }
    this.yearfuliObj = { isLastyearOrThisyear: '2', budgetType: '1' }
    this.yearshehuiObj = { isLastyearOrThisyear: '2', budgetType: '2' }
    this.yearhejiObj = { isLastyearOrThisyear: '2', budgetType: '3' }
    // this.infoFrom.resetFields()
    console.log(this.lastObj.length)
    // let goTypeTemp = this.$route.params.goType // 标志是在哪个页面跳转过来的
    if (this.$route.params.goType == 'medicalBudgetReport-detail') {
      this.goType = 2
      this.fulidisabled = true
      this.shehuidisabled = true
      this.getDetail()
    } else {
      console.log(window.parent.indexTool.getUserInfo().orgType)
      if (window.parent.indexTool.getUserInfo().orgType == '99') {
        this.fulidisabled = false
        this.shehuidisabled = true
      } else if (window.parent.indexTool.getUserInfo().orgType == '01') {
        this.fulidisabled = true
        this.shehuidisabled = false
      }
      this.goType = 1
      this.getDetails()
    }
    // this.lastNum.diagnoseCostNum = 222
  },
  mounted () {
    /* console.log(window.parent.indexTool.getUserInfo())
    this.$nextTick(() => {
      this.infoFrom.setFieldsValue({
        reportDepart: window.parent.indexTool.getUserInfo().orgName,
        reportUser: window.parent.indexTool.getUserInfo().userName
      })
    }) */
  },
  methods: {
    blurChangeOne (e) {
      let a = this.lastObj[e]
      let b = this.lastsocial[e]
      console.log(a)
      console.log(b)
      if (a == undefined) {
        a = 0
      } else {
        a = this.lastObj[e]
      }
      if (b == undefined) {
        b = 0
      } else {
        b = this.lastsocial[e]
      }
      let data
      if (
        e == 'diagnoseCostNum' ||
        e == 'recoveryCostNum' ||
        e == 'specialDrugfeeNum' ||
        e == 'rehabApparatusCostNum' ||
        e == 'physicalCostNum' ||
        e == 'hospitallCostNum'
      ) {
        console.log(11)
        data = a + b
      } else {
        data = (a + b).toFixed(2)
      }
      this.$set(this.lastNum, e, data)
    },
    blurChange (e) {
      let a = this.yearfuliObj[e]
      let b = this.yearshehuiObj[e]
      console.log(a)
      console.log(b)
      if (a == undefined) {
        a = 0
      } else {
        a = this.yearfuliObj[e]
      }
      if (b == undefined) {
        b = 0
      } else {
        b = this.yearshehuiObj[e]
      }
      let data
      if (
        e == 'diagnoseCostNum' ||
        e == 'recoveryCostNum' ||
        e == 'specialDrugfeeNum' ||
        e == 'rehabApparatusCostNum' ||
        e == 'physicalCostNum' ||
        e == 'hospitallCostNum'
      ) {
        console.log(11)
        data = a + b
      } else {
        data = (a + b).toFixed(2)
      }
      console.log(a)
      console.log(b)
      this.$set(this.yearhejiObj, e, data)
      // this.yearhejiObj[e] = a + b
      // this.yearfuliObj.recoveryCostNum = e.target.value
    },
    backs () {
      this.$router.go(-1)
    },
    async submit () {
      let isok = true
      /* this.infoFrom.validateFields((err, values) => {
        if (err) {
          isok = false
          console.log('yanzheng1' + isok)
        }
      }) */
      if (isok) {
        let _self = this
        this.success(
          '2',
          '提示',
          '预算上报后不能修改，是否要上报？',
          '确定',
          _self
        )
      } else {
        this.$message.error('校验不通过，无法提交，请再次检查!')
      }
    },
    async onOkCallBack () {
      let params = {}
      let medicalRescueBudgetReportDetailVos = []
      this.lastObj.isLastyearOrThisyear = '1'
      this.lastObj.budgetType = '1'
      medicalRescueBudgetReportDetailVos.push(this.lastObj)
      this.lastsocial.isLastyearOrThisyear = '1'
      this.lastsocial.budgetType = '2'
      medicalRescueBudgetReportDetailVos.push(this.lastsocial)
      this.lastNum.isLastyearOrThisyear = '1'
      this.lastNum.budgetType = '3'
      medicalRescueBudgetReportDetailVos.push(this.lastNum)
      this.yearfuliObj.isLastyearOrThisyear = '2'
      this.yearfuliObj.budgetType = '1'
      medicalRescueBudgetReportDetailVos.push(this.yearfuliObj)
      this.yearshehuiObj.isLastyearOrThisyear = '2'
      this.yearshehuiObj.budgetType = '2'
      medicalRescueBudgetReportDetailVos.push(this.yearshehuiObj)
      this.yearhejiObj.isLastyearOrThisyear = '2'
      this.yearhejiObj.budgetType = '3'
      medicalRescueBudgetReportDetailVos.push(this.yearhejiObj)
      let medicalRescueBudgetReportVo = {}
      if (this.goType == 1) {
        medicalRescueBudgetReportVo.dataType = '1'
      } else {
        medicalRescueBudgetReportVo.dataType = '2'
      }
      medicalRescueBudgetReportVo.areaId = window.parent.indexTool.getUserInfo().areaId
      medicalRescueBudgetReportVo.areaName = window.parent.indexTool.getUserInfo().areaName
      params.medicalRescueBudgetReportVo = medicalRescueBudgetReportVo
      params.medicalRescueBudgetReportDetailVos = medicalRescueBudgetReportDetailVos
      this.post('medicalRescueBudgetReport/save', params, true).then(res => {
        console.log(res)
        if (res.data.data == true) {
          this.$message.success('预算上报成功')
          this.lastObj = { isLastyearOrThisyear: '1', budgetType: '1' }
          this.lastsocial = { isLastyearOrThisyear: '1', budgetType: '2' }
          this.lastNum = { isLastyearOrThisyear: '1', budgetType: '3' }
          this.yearfuliObj = { isLastyearOrThisyear: '2', budgetType: '1' }
          this.yearshehuiObj = { isLastyearOrThisyear: '2', budgetType: '2' }
          this.yearhejiObj = { isLastyearOrThisyear: '2', budgetType: '3' }
          this.backs()
        } else {
          // this.$message.error(res.errors[0].msg)
        }
      })
    },
    async getDetails () {
      this.post('/medicalRescueBudgetReport/getPerformancePreviousYearByOrgId', {}).then(res => {
        if (res.data.data.budgetType == '1') {
          this.lastObj = res.data.data
          setTimeout(() => {
            this.blurChangeOne('diagnoseCostNum')
            this.blurChangeOne('recoveryCostNum')
            this.blurChangeOne('specialDrugfeeNum')
            this.blurChangeOne('rehabApparatusCostNum')
            this.blurChangeOne('physicalCostNum')
            this.blurChangeOne('hospitallCostNum')
            this.blurChangeOne('diagnoseCostCapitalTotal')
            this.blurChangeOne('recoveryCostCapitalTotal')
            this.blurChangeOne('specialDrugfeeCapitalTotal')
            this.blurChangeOne('rehabApparatusCostCapitalTotal')
            this.blurChangeOne('physicalCostCapitalTotal')
            this.blurChangeOne('hospitallCostCapitalTotal')
            this.blurChangeOne('diagnoseCostCentralFund')
            this.blurChangeOne('recoveryCostCentralFund')
            this.blurChangeOne('specialDrugfeeCentralFund')
            this.blurChangeOne('rehabApparatusCostCentralFund')
            this.blurChangeOne('physicalCostCentralFund')
            this.blurChangeOne('hospitallCostCentralFund')
          }, 500)
        }
        if (res.data.data.budgetType == '2') {
          this.lastsocial = res.data.data
          setTimeout(() => {
            this.blurChangeOne('diagnoseCostNum')
            this.blurChangeOne('recoveryCostNum')
            this.blurChangeOne('specialDrugfeeNum')
            this.blurChangeOne('rehabApparatusCostNum')
            this.blurChangeOne('physicalCostNum')
            this.blurChangeOne('hospitallCostNum')
            this.blurChangeOne('diagnoseCostCapitalTotal')
            this.blurChangeOne('recoveryCostCapitalTotal')
            this.blurChangeOne('specialDrugfeeCapitalTotal')
            this.blurChangeOne('rehabApparatusCostCapitalTotal')
            this.blurChangeOne('physicalCostCapitalTotal')
            this.blurChangeOne('hospitallCostCapitalTotal')
            this.blurChangeOne('diagnoseCostCentralFund')
            this.blurChangeOne('recoveryCostCentralFund')
            this.blurChangeOne('specialDrugfeeCentralFund')
            this.blurChangeOne('rehabApparatusCostCentralFund')
            this.blurChangeOne('physicalCostCentralFund')
            this.blurChangeOne('hospitallCostCentralFund')
          }, 500)
        }
      }
      )
    },
    async getDetail () {
      this.post('/medicalRescueBudgetReport/budgetSummaryReport', {}).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].budgetType == '1' && res.data.data[i].isLastyearOrThisyear == '1') {
            this.lastObj = res.data.data[i]
          }
          if (res.data.data[i].budgetType == '2' && res.data.data[i].isLastyearOrThisyear == '1') {
            this.lastsocial = res.data.data[i]
          }
          if (res.data.data[i].budgetType == '3' && res.data.data[i].isLastyearOrThisyear == '1') {
            this.lastNum = res.data.data[i]
          }
          if (res.data.data[i].budgetType == '1' && res.data.data[i].isLastyearOrThisyear == '2') {
            this.yearfuliObj = res.data.data[i]
          }
          if (res.data.data[i].budgetType == '2' && res.data.data[i].isLastyearOrThisyear == '2') {
            this.yearshehuiObj = res.data.data[i]
          }
          if (res.data.data[i].budgetType == '3' && res.data.data[i].isLastyearOrThisyear == '2') {
            this.yearhejiObj = res.data.data[i]
          }
        }
      }
      )
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
    },
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
  },

  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    // showtwo (val) {
    //   this.setHeight('two', 'twoout', !val)
    // },
    // showthree (val) {
    //   this.setHeight('three', 'threeout', !val)
    // },
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    },
    showfive (val) {
      this.setHeight('five', 'fiveout', !val)
    },
    /* typeadoption () {
      this.setHeight('two', 'twoout', !this.showtwo)
      // this.cptAdoptorFrom.resetFields()
    }, */
    maintenanceType () {
      this.setHeight('three', 'threeout', !this.showthree)
    }
  }
}
</script>
<style scoped type="text/less">
.ulData {
  width: 100%;
  height: 100%;
  border-radius: 4px 4px 0 0;
}
.ulData li {
  list-style: none;
  float: left;
  width: 14%;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
  text-align: center;
}
.ulData .ulDataLi {
  /* background: #d4eaff; */
  /* border: 1px solid rgba(0, 0, 0, 0.09); */
  background: rgba(240, 247, 253, 1);
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  opacity: 1;
  /* border-radius: 4px 4px 0px 0px; */
}
.ulData .lastLi {
  border-right: 1px solid rgba(0, 0, 0, 0.09);
}
.ulData .ulDataLiTwo,
.ulData .ulDataLiThree,
.ulData .ulDataLiFour {
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  opacity: 1;
}
.ulData .ulDataLiFour {
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.ant-input-number {
  border: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
/* .ant-input-number .ant-input-number-handler-wrap{
    display: none !important;
    z-index: -1;
} */
.preservation {
  margin-left: 20px;
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
.marsss {
  width: 100%;
  margin-bottom: 15px;
  /* border: 1px dashed rgba(0, 0, 0, 0.34901960784313724); */
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
}

.lines {
  width: 3px;
  height: 16px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
  margin-left: 23px;
  top: 3px;
  position: relative;
}
.item_text {
  width: 117px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 33px;
  position: relative;
  top: -17px;
}
/* .item_title {
  margin-top: 27px;
  margin-bottom: -9px;
  position: relative;
} */
.horizontalline {
  position: relative;
  margin-left: 146px;
  margin-right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
  top: -27px;
}
</style>
