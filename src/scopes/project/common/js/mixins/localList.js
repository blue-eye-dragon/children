import moment from 'moment'
export default {
  data () {
    return {
      page: 1,
      size: 10,
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      chosedata: [],
      istranslate: true, // 是否分页
      key: 1, // 区分新增还是编辑
      nowindex: 0, // 选择数据的下标
      keyid: '',
      chose_data: [],
      ishiderelationship: false
    }
  },
  computed: {
    // 总条数字段
    total () {
      return this[this.tablename].length
    },
    // 渲染列表数据
    showlist () {
      if (this.istranslate) {
        if (this[this.tablename]) {
          return this[this.tablename].filter((item, index) => {
            return (this.page - 1) * this.size <= index && ((this.page - 1) * 10) + this.size > index
          })
        }
      } else {
        return this[this.tablename]
      }
    }
  },
  mounted () {

  },
  activated () {

  },
  methods: {
    moment,
    // 数据处理
    changetime (data) {
      for (var k in data) {
        // 是对象 不是数组 日期对象 文件对象
        if (!(data[k] instanceof Array) && (data[k] instanceof Object)) {
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
        // 是数组  数组元素为对象 日期范围
        if ((data[k] instanceof Array) && (data[k][0] instanceof Object)) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
        // 是数组  数组元素不为对象 地区联动 下拉多选
        if ((data[k] instanceof Array) && !(data[k][0] instanceof Object)) {
          if (k == 'address_Linkage') {
            data.censusRegisterPro = data[k][0]
            data.censusRegisterCity = data[k][1]
            data.censusRegisterCounty = data[k][2]
            delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
      // for (var k in data) {
      //   if (!(data[k] instanceof Array) && (data[k] instanceof Object)) {
      //     data[k] = data[k].format('YYYY-MM-DD')
      //   }
      // }
    },
    // 多选
    onSelectChange (val, val2) {
      this.chosedata = val2
      this.rowSelection.selectedRowKeys = val
      val.length > 0 ? (this.isdisabled = false) : (this.isdisabled = true)
      this.chose_data = val2
    },
    // 批量删除
    Batchdeletion () {
      let index = 0
      this.rowSelection.selectedRowKeys.map(item => {
        const e = parseFloat((item - index) + ((this.page - 1) * this.size))
        this.$emit('chaadoptorChildrenVos', this.tablename, null, e)
        index++
      })
      this.pagechange(1, this.size)
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    showSizeChange (page, size) {},
    // 增加
    addAdoption () {
      this.visible = true
      this.ishiderelationship = false
      this.rowSelection.selectedRowKeys = []
      this.isdisabled = true
      this.key = 1
      this.idedit = false
      this.fileList = []
      this.idCardTypeToFamily = '01' // 证件类型默认为内地身份证号

      // this.$nextTick(() => {
      //   this.form.resetFields()
      // })
    },
    // 编辑
    edit (val, obj, index) {
      this.visible = true
      this.idedit = false
      this.nowindex = index
      // 单独处理日期
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      this.dateprocessing(data)
      this.keyid = data.id
      this.idCardTypeToFamily = data.memberIdType
      this.$nextTick(() => {
        this.form.setFieldsValue(data)
      })
      this.key = 2
    },
    // 删除
    deletes (val, obj, index) {
      const e = parseFloat(index + ((this.page - 1) * this.size))
      this.$emit('chaadoptorChildrenVos', this.tablename, null, e)
    },
    // 默认处理数据
    dateprocessing () {

    },
    // 查看
    see (val, obj, index) {
      this.nowindex = index
      this.visible = true
      this.idedit = true
      // 单独处理日期
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      this.dateprocessing(data)
      this.$nextTick(() => {
        this.form.setFieldsValue(data)
      })
    },
    // 抽屉关闭
    onClose () {
      this.form.resetFields()
      this.visible = false
    },
    // 抽屉里面的确定
    subfamily () {
      this.form.validateFields((err, values) => {
        const datas = this.form.getFieldsValue()
        if (!err) {
          const data = this.form.getFieldsValue()
          this.changetime(data)
          if (this.key == 1) {
            // 新增
            const newData = [...this[this.tablename]]
            newData.unshift(data)
            this.$emit('chaadoptorChildrenVos', this.tablename, newData)
          } else {
            // 修改
            const e = parseFloat(this.nowindex + ((this.page - 1) * this.size))
            data.id = this.keyid
            this.$emit('chaadoptorChildrenVos', this.tablename, data, e)
          }
          this.form.resetFields()
          this.visible = false
        } else {
          this.errfocus(err, this.form)
        }
      })
    }
  }

}
