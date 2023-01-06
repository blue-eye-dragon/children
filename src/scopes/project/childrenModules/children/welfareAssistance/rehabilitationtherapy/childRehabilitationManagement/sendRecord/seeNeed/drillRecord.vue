<template>
  <div class="tadrawer aaa">
    <!-- <ta-alert
      :message="`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`"
    />mode='year'    :class="value.date()=='12'?'colorc':'colors'"-->
    <div>
      <ta-calendar @select="onSelect"
                   @panelChange="onPanelChange">
        <!-- @select="onSelect" -->
        <div slot="dateCellRender"
             slot-scope="value">
          <div v-if="getListDataOne(value).text=='ses'">
            <div v-if="getListDataOne(value).text2=='ses'"
                 class="colors">
              <div v-for="item in getListDataOne (value)"
                   :key="item.content">
                <ta-badge :status="item.type"
                          :text="item.content"
                          @click="good(item)" />
              </div>
            </div>

            <div v-else
                 class="colors">
              <div style="height: 88px;"></div>
            </div>
          </div>
          <!-- <div  v-else>
          <div class="colorc" v-for="item in getListDataOne (value)" :key="item.content">
            <ta-badge :status="item.type" :text="item.content" @click="good(item)" />
          </div>
          </div>-->

          <!-- <ul class="events"   > -->
          <!-- <li v-for="item in getListDataOne (value)" :key="item.content">

            <ta-badge :status="item.type" :text="item.content" @click="good(item)" />

          </li>-->
          <!-- </ul> -->
        </div>
        <!-- 年数据
          <template slot="monthCellRender" slot-scope="value">
          <div v-if="getMonthData(value)" class="notes-month">
            <section>{{getMonthData(value)}}</section>
            <span>Backlog number</span>
          </div>
        </template>-->
      </ta-calendar>
    </div>

    <ta-drawer title="训练记录"
               width="500px"
               :closable="false"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <!-- :getContainer="setContainer" -->
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item hidden
                      label="所选日期"
                      fieldDecoratorId="trainingDate">
          <ta-input :disabled="true"
                    placeholder="请输入计划制定人" />
        </ta-form-item>
        <ta-form-item hidden
                      label="XXXX"
                      fieldDecoratorId="content">
          <ta-input :disabled="true"
                    placeholder="请输入计划制定人" />
        </ta-form-item>
        <ta-form-item hidden
                      label="id"
                      fieldDecoratorId="id">
          <ta-input />
        </ta-form-item>
        <ta-form-item hidden
                      label="rehabiliteId"
                      fieldDecoratorId="rehabiliteId">
          <ta-input />
        </ta-form-item>
        <ta-form-item label="康复训练计划"
                      fieldDecoratorId="rehabilitTrainingProgramme"
                      :require="{message:'请选择康复训练计划'}">
          <ta-select :disabled="notShow"
                     @change="getWay"
                     placeholder="请选择康复训练计划">
            <ta-select-option v-for="(item,index) in planList"
                              :value="item.id"
                              :key="index">{{item.trainingProgramName}}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <ta-form-item label="康复训练方式"
                      fieldDecoratorId="rehabilitPrainingProgram"
                      :require="{message:'请选择康复训练方式'}">
          <ta-select :disabled="notShow"
                     placeholder="请选择康复训练方式">
            <ta-select-option v-for="(item,index) in wayList"
                              :value="item.trainingMode"
                              :key="index"
                              @click="getNumber(item)">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-col :span="20">
          <ta-col :span="8">
            <ta-form-item :labelCol="{span:22}"
                          :wrapperCol="{span:1}"
                          fieldDecoratorId="XXX"
                          label="项目训练次数:"></ta-form-item>
          </ta-col>

          <ta-col :span="8">
            <ta-form-item :labelCol="{span:16}"
                          :wrapperCol="{span:8}"
                          label="计划次数"
                          fieldDecoratorId="trainingNumber">
              <ta-input style=" border: 0px;"
                        :disabled="notShow" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item :labelCol="{span:16}"
                          :wrapperCol="{span:8}"
                          label="目前次数"
                          fieldDecoratorId="projectTrainingFrequency">
              <ta-input style=" border: 0px;"
                        :disabled="notShow" />
            </ta-form-item>
          </ta-col>
        </ta-col>

        <ta-form-item label="训练人员"
                      fieldDecoratorId="trainingPersonnel"
                      :fieldDecoratorOptions="verificationRules('训练人员',72)">
          <ta-input :disabled="notShow"
                    placeholder="请输入训练人员" />
        </ta-form-item>
        <ta-form-item label="训练时间"
                      fieldDecoratorId="trainTime"
                      :require="{message:'请选择训练时间'}">
          <ta-time-picker :disabled="notShow"
                          @change="onChange"
                          :defaultOpenValue="moment('00:00:00', 'HH:mm:ss')" />
        </ta-form-item>
        <ta-form-item label="训练时长（分钟）"
                      fieldDecoratorId="trainingTime"
                      :require="{message:'请输入训练时长（分钟）'}">
          <ta-input-number :min="1"
                           :max="999"
                           :precision="0"
                           style="width:100%"
                           placeholder="请输入训练时长（分钟）"
                           :disabled="notShow" />
        </ta-form-item>
        <ta-form-item label="训练情况"
                      fieldDecoratorId="trainingSituation"
                      :fieldDecoratorOptions="{rules: [{ required: true, message: '' },{validator: fnmustKeep }]}">
          <ta-textarea :disabled="notShow"
                       :rows="4"
                       placeholder="请输入训练情况" />
        </ta-form-item>
      </ta-form>

      <div slot="footer">
        <ta-button v-if="!notShow&&newOne"
                   type="danger"
                   @click="del">删除</ta-button>
        <ta-button v-if="!notShow"
                   type="primary"
                   @click="save">保存</ta-button>
        <ta-button @click="onClose">取消</ta-button>
      </div>
    </ta-drawer>
    <!-- <div class="bom">
      <ta-button class="preservation"
                 @click="back">返回</ta-button>
    </div> -->
  </div>
</template>
<script>
import { format, parse } from 'path'
import moment from 'moment'
import { get } from 'http'
import { type } from 'os'
import { nextTick } from 'q'
import { stringify } from 'querystring'

export default {
  props: {
    ids: {
      type: String,
      required: false
    },
    notShow: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      value: '',
      selectedValue: '',
      value1: '',
      visible: false,
      planList: [],
      wayList: [],
      wayLists: [],
      allList: [],
      listData: [],
      isshow: false,
      newOne: false,
      dateSection: []
    }
  },
  created () { },
  activated () {
  },
  mounted () {
    this.getwayList()
    this.getDateList()
    this.getPlan()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    fnmustKeep (a, v, callback) {
      const value = v || ''
      this.fnValidateTextarea(200, '训练情况', value, callback)
    },

    onChange (time, timeString) { },
    async getDateList () {
      const param = {
        rehabiliteId: this.ids
      }
      const res = await this.post(
        '/rehabilitTrainingRecord/getByrehabiliteId',
        param
      )
      const resTow = await this.post(
        '/trainingPlan/queryBeginAndEndDateByRehabiliteId',
        param
      )
      // console.log('resTow-->', resTow)
      if (resTow.data.data) {
        this.dateSection = resTow.data.data
        // this.startDate = resTow.data.data.trainingStartDate
        // this.endDate = resTow.data.data.trainingEndDate
      }
      if (res.data.pageBean.pageSize > 0) {
        this.allList = res.data.pageBean.list
        // const data = await this.getDictionaries('REHABILITTRAININGMODE')
        // this.wayLists = data
        // console.log(this.wayLists)
        this.allList.map(c => {
          this.wayLists.forEach(e => {
            if (e.value == c.rehabilitPrainingProgram.trim()) {
              c.updateUser = e.label
              console.log(c.updateUser, 444)
            }
          })
        })
      } else {
        this.allList = []
      }

      // this.isshow = true
    },

    async getwayList () {
      const data = await this.getDictionaries('REHABILITTRAININGMODE')
      this.wayLists = data
    },
    async getPlan (pa) {
      let param = ''
      if (pa) {
        param = pa
      } else {
        param = {
          rehabiliteId: this.ids
        }
      }
      const res = await this.post('/trainingPlan/getByrehabiliteId', param)
      this.planList = res.data.pageBean.list
    },
    async getPlanTwo (d) {
      const res = await this.post('/trainingPlan/getByrehabiliteId', {
        rehabiliteId: this.ids,
        trainingDate: d
      })
      this.planList = res.data.pageBean.list
    },
    async getWay (val) {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          rehabilitPrainingProgram: ''
        })
      })

      const param = {
        rehabilitePlanId: val
      }
      const res = await this.post('/trainingProgram/getById', param)

      this.wayList = res.data.resultData
      this.wayList.forEach((a, index) => {
        this.wayLists.forEach(b => {
          if (a.trainingMode == b.value) {
            a.label = b.label
          }
        })
      })
    },

    async getNumber (item) {
      const param = {
        id: item.id
      }
      const params = {
        rehabiliteId: this.ids,
        rehabilitTrainingProgramme: item.rehabilitePlanId, // '训练计划主键',
        rehabilitPrainingProgram: item.trainingMode
      }
      const resTow = await this.post('/trainingProgram/queryById', param) // 计划次数？接口无数据！
      this.$nextTick(() => {
        this.form.setFieldsValue({
          trainingNumber: resTow.data.data.trainingNumber
            ? resTow.data.data.trainingNumber
            : '数据错误！'
        })
      })
      const res = await this.post(
        '/rehabilitTrainingRecord/getNumberByIds',
        params
      ) // 目前次数？接口无数据！

      this.$nextTick(() => {
        this.form.setFieldsValue({
          projectTrainingFrequency: res.data.data.projectTrainingFrequency
            ? res.data.data.projectTrainingFrequency
            : '0'
        })
      })
    },

    // ----***---

    onPanelChange (value, mode) { },
    async good (item) {
      this.getPlan()

      await this.getWay(item.other.rehabilitTrainingProgramme)

      this.newOne = true
      this.visible = true

      this.$nextTick(() => {
        this.form.setFieldsValue(item.other)
        this.form.setFieldsValue({
          trainingNumber: this.wayList[0].trainingNumber,
          content: item.content,
          trainingDate: moment(this.value).format('YYYY-MM-DD'),
          trainTime: moment(item.other.trainTime, 'HH:mm:ss'),
          rehabilitPrainingProgram: item.other.rehabilitPrainingProgram.trim()
        })
      })
    },
    back () {
      this.$router.go(-1)
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
    },
    onSelect (value) {
      const itTime = parseInt(
        moment(value)
          .format('YYYY-MM-DD')
          .replace(/\-/g, '')
      )
      let isOrno = ''
      this.dateSection.forEach(e => {
        if (e.trainingEndDate >= itTime && e.trainingStartDate <= itTime) {
          isOrno = '1'
        }
      })
      if (isOrno != '1') {
        this.$notification.open({
          message: '提示',
          description: '此日期无训练计划，请选择在训练计划时间内的日期！',
          icon: <ta-icon type="frown-o" style="color: #108ee9" />,
          duration: 2
        })
      } else {
        this.getPlanTwo(moment(value).format('YYYY-MM-DD'))
        this.wayList = []
        if (!this.notShow) {
          this.newOne = false
          this.visible = true
          this.value = value
          this.selectedValue = value
          this.$nextTick(() => {
            this.form.setFieldsValue({
              trainingDate: moment(this.value).format('YYYY-MM-DD')
            })
          })
        }
      }
    },

    getListDataOne (value, aa) {
      // console.log(value)
      const listData = []
      const date = value
      let aD = date.date()
      let aY = date.year()
      let aM = date.month() + 1
      if (aD.toString().length == 1) {
        aD = '0' + aD
      }
      if (aM > 12) {
        aM = 1
        aY = aY + 1
      }
      if (aM.toString().length == 1) {
        aM = '0' + aM
      }
      const result = aY + '-' + aM + '-' + aD
      const asd = parseInt(aY + '' + aM + '' + aD)
      this.dateSection.forEach(e => {
        if (e.trainingEndDate >= asd && e.trainingStartDate <= asd) {
          listData.text = 'ses'
        }
      })
      // // 日历数据格式化  en
      if (this.allList) {
        this.allList.forEach(n => {
          const datePiot = n.trainingDate
          if (result == datePiot) {
            console.log(n.updateUser)
            listData.push({
              type: 'success',
              content: n.trainTime + n.updateUser + n.trainingTime + '分钟',
              other: n
            })
            listData.text2 = 'ses'
          }
        })
      }
      return listData
    },
    getMonthData (value) {
      if (value.month() === 8) {
        return '需求未定！'
      }
    },
    async save () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (!this.form.getFieldsValue().rehabiliteId) {
            const param = this.form.getFieldsValue()
            this.dealData(param)
            param.trainTime = moment(param.trainTime).format('HH:mm:ss')
            param.rehabiliteId = this.ids
            const res = await this.post('/rehabilitTrainingRecord/save', param)
            if (!res.errors) {
              this.getDateList()
              this.onClose()
            }
          } else {
            const param = this.form.getFieldsValue()
            this.dealData(param)
            param.trainTime = moment(param.trainTime).format('HH:mm:ss')
            const res = await this.post('/rehabilitTrainingRecord/update', param)
            if (!res.errors) {
              this.getDateList()
              this.onClose()
            }
          }
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    async del () {
      const param = {
        id: this.form.getFieldsValue().id
      }
      const res = await this.post(
        '/rehabilitTrainingRecord/updateDelStateById',
        param
      )
      if (!res.errors) {
        this.getDateList()
        this.onClose()
      }
    },

    dealData (data, e) {
      for (var k in data) {
        if (k != 'trainTime') {
          if (!(data[k] instanceof Array) && data[k] instanceof Object) {
            if (data[k].file) {
              const arr = []
              data[k].fileList.map(item => {
                arr.push(item.response.data.data.fileid)
              })
              data[`${k}Id`] = arr
            } else {
              data[k] = data[k].format('YYYY-MM-DD')
            }
          }
          if (data[k] instanceof Array && data[k][0] instanceof Object) {
            data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
            data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
            delete data[k]
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.colors {
  /* background-color: red; */
  background-color: #087cd6c2;
}
.colorc {
  background-color: hotpink;
  /* height: 88px; */
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
.aaa /deep/ .ant-radio-button-wrapper-checked:first-child {
  display: none !important;
}
.aaa /deep/ .ant-radio-button-wrapper:last-child {
  display: none !important;
}
</style>
