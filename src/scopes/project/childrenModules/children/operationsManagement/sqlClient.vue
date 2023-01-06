<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'230px'}">
      <div slot="header">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="SQL（或表名）"
                        fieldDecoratorId="sqlContent"
                        style="width:900px"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{span:20}">
            <ta-textarea :placeholder="'请输入sql语句（执行）或表名（查询表及字段信息，多个表用逗号隔开）'"
                         :rows="5" />
            <div>默认查询20行，如果需要查询更多行【select first 10000000 * from table】<span>  执行时间：{{Time}}</span></div>
          </ta-form-item>
          <ta-form-item>
            <div class="searchbtn searchButton">
              <ta-button class="search "
                         @click="getList()">执行</ta-button>
              <ta-button class="btnleft reset "
                         @click="getList('tab')">查询表及字段信息</ta-button>
            </div>
          </ta-form-item>
        </ta-form>
      </div>
      <div>
        <div v-show="istable">
          <ta-table class="tables table-min-width"
                    :columns="tableColumns"
                    :scroll="{x:width,y:'500px'}"
                    :showOverflowTooltip="true"
                    :dataSource="mixDataList"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{c + 1 }}</span>
            </span>
          </ta-table>
        </div>
        <div v-show="isdiv">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(form)=>{this.form = form}">
            <ta-col :span="24">
              <ta-form-item label="SQL语句"
                            fieldDecoratorId="SQLContent"
                            style="width:100%"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{span:21}">
                <ta-textarea :placeholder="'请输入SQL语句'"
                             :rows="4" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="更新行数"
                            style="width:100%"
                            fieldDecoratorId="updateRows"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{span:5}">
                <ta-input :placeholder="'请输入更新行数'" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="完成时间"
                            style="width:100%"
                            fieldDecoratorId="finishDate"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{span:5}">
                <ta-input :placeholder="'请输入完成时间'" />
              </ta-form-item>
            </ta-col>
          </ta-form>
        </div>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
const Base64 = require('js-base64').Base64
export default {
  name: 'revoke',
  data () {
    return {
      tableColumns: [],
      mixDataList: [],
      width: 0,
      istable: false,
      isdiv: false,
      commitType: '',
      Time: ''
    }
  },
  mounted () {
  },
  activated () {
    this.tableColumns = []
    this.mixDataList = []
    this.width = 0
    this.Time = ''
    this.istable = false
    this.isdiv = false
    this.commitType = ''
  },
  methods: {
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      return formData
    },
    async getList (e) {
      this.Time = ''
      const params = this.userPageParams()
      this.tableColumns = [
        {
          title: '序号',
          dataIndex: 'num',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'num' }
        }
      ]
      this.width = 0
      if (!params.sqlContent) {
        this.$message.error('SQL不能为空')
        return false
      }
      if (e) { // 查询表字段信息
        const sqlContent = params.sqlContent.toLowerCase()
        if (sqlContent.includes('select') || sqlContent.includes('insert') || sqlContent.includes('update') || sqlContent.includes('delete')) {
          this.$message.error('请输入正确的表名')
          return false
        }
        params.sqlContent = this.judgeSql(params.sqlContent.toLowerCase())
      }
      params.sqlContent = Base64.encode(params.sqlContent)
      const res = await this.post('/sqlClientApi/handleSQL', params)
      if (res.data.data) {
        this.istable = true
        this.isdiv = false
        const data = JSON.parse(res.data.data)
        for (const key in data[0]) {
          this.width += 200
          this.tableColumns.push({
            title: key,
            align: 'left',
            dataIndex: key,
            width: 200,
            overflowTooltip: true
          })
        }
        if (data[data.length - 1].executeTime) {
          this.Time = data[data.length - 1].executeTime
          data.pop()
        }
        delete this.tableColumns[this.tableColumns.length - 1].width
        this.mixDataList = data
      } else {
        this.istable = false
        this.$confirm({
          title: '执行结果',
          content: res.errors[0].msg,
          onOk: async () => {
            if (res.errors[0].errorCode == '1') {
              this.isdiv = true
              const params1 = this.userPageParams()
              params1.sqlContent = Base64.encode(params1.sqlContent)
              params1.commitType = '1'
              const res1 = await this.post('/sqlClientApi/handleSQL', params1)
              const data1 = JSON.parse(res1.data.data)
              this.form.setFieldsValue(data1[0])
            } else {
              this.isdiv = false
            }
          },
          onCancel: () => {
            this.isdiv = false
          }
        })
      }
    },
    // 处理sql，获取查询表及字段信息语句
    judgeSql (e) {
      let sqlStr = ''
      if (e.includes(',') || e.includes('，')) { // 多个表名
        e = e.replace(/\，/g, ',').split(',')
        e.forEach(element => {
          sqlStr += ` a.tabname = '${element.trim()}' or `
        })
        sqlStr = sqlStr.substring(0, sqlStr.lastIndexOf('or'))
      } else { // 单个表
        sqlStr = ` a.tabname = '${e.trim()}' `
      }
      return `select first 1000 a.tabname as tablename,c.comments as tabcomments,b.colname,d.comments,case b.coltype 
      when '0' then 'CHAR'
      when '1' then 'SMALLINT'
      when '2' then 'INTEGER'
      when '3' then 'FLOAT'
      when '4' then 'SMALLFLOAT'
      when '5' then 'DECIMAL'
      when '6' then 'SERIAL'
      when '7' then 'DATE'
      when '8' then 'MONEY'
      when '9' then 'NULL'
      when '10' then 'DATETIME'
      when '11' then 'BYTE'
      when '12' then 'TEXT'
      when '13' then 'VARCHAR'
      when '14' then 'INTERVAL'
      when '15' then 'NCHAR'
      when '16' then 'NVARCHAR'
      when '17' then 'INT8'
      when '18' then 'SERIAL8'
      when '19' then 'SET'
      when '20' then 'MULTISET'
      when '21' then 'LIST'
      when '22' then 'Unnamed ROW'
      when '40' then 'LVARCHAR'
      when '41' then 'CLOB'
      when '43' then 'BLOB'
      when '44' then 'BOOLEAN'
      when '256' then 'CHAR'
      when '257' then 'SMALLINT'
      when '258' then 'INTEGER'
      when '259' then 'FLOAT'
      when '260' then 'REAL'
      when '261' then 'DECIMAL'
      when '262' then 'SERIAL'
      when '263' then 'DATE'
      when '264' then 'MONEY'
      when '266' then 'DATETIME'
      when '267' then 'BYTE'
      when '268' then 'TEXT'
      when '269' then 'VARCHAR'
      when '270' then 'INTERVAL'
      when '271' then 'NCHAR'
      when '272' then 'NVARCHAR'
      when '273' then 'INT8'
      when '274' then 'SERIAL8'
      when '275' then 'SET'
      when '276' then 'MULTISET'
      when '277' then 'LIST'
      when '278' then 'Unnamed ROW'
      when '296' then 'LVARCHAR'
      when '297' then 'CLOB'
      when '298' then 'BLOB'
      when '299' then 'BOOLEAN'
      when '4118' then 'Named ROW'
      end as coltype,
      b.collength from systables a
      left join syscolumns b on a.tabid = b.tabid
      left join syscomms c on a.tabid = c.tabid
      left join syscolcomms d on a.tabid = d.tabid and b.colno = d.colno
      where ${sqlStr} order by a.tabname, b.colno;`
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.getList()
    }
  }
}
</script>
<style lang="less" scoped>
.tables {
  height: 500px;
}
</style>
