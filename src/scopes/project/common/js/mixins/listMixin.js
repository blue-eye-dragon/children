import moment from 'moment'
import Vue from 'vue'
import $ from 'jquery'
import { resolve } from 'path'
import { rejects } from 'assert'
export default {
  data () {
    /* eslint-disable */
    return {
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '', // 数据列表接口，API地址
        mixAddURL: '', // 新增接口
        mixEditURL: '', // 编辑接口
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: true, // 是否需要筛选
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      mixRowSelection: {
        //控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], //多选数组
        //行选择改变事件
        onChange: this.onSelectChange
      },
      //f分页组件属性
      mixPageRef: '', //用于获取分页ref值
      nowtype: 0,
      id: '',
      idedit: false,
      visible: false,
      idkey: 'id',
      iscanchose: false,
      chose_data: [],
      page: 1,
      size: 10
    }
  },
  filters: {
    // mydate(value) {
    //   var arr = value.split("")
    //   return arr[0]
    // },
    // time(val){
    //   return val.substring(0,10) //时间截取前10位 YY-MM-DD
    // }
  },
  activated () {
    if (this.searchForm) {
      this.searchForm.resetFields()
    }
    setTimeout(() => {
      if (this.mixListOptions.mixActivatedIsNeed && this.mixListOptions.mixGetDataListIsPage) {
        this.handleSubmit()
      } else if (this.mixListOptions.mixActivatedIsNeed && !this.mixListOptions.mixGetDataListIsPage) {
        this.getlist()
      }
    }, 500)
  },
  methods: {
    // 传入参数行信息,行索引
    fnCustomRow (record, index) {
      // 自定义一些行的样式
      let rowStyle = {
        backgroundColor: index % 2 ? '#F9F9FA' : '#fff'
      }
      return {
        class: 'myRowClass',
        style: {
          ...rowStyle
        },
        on: {
          // 这里可以添加各种事件
          click () {
            // console.log('行点击')
          }
        }
      }
    },
    //读取列表 分页形式
    handleSubmit (e) {
      $(".ant-table .no-data").removeClass('pop')

      if (e) { // 只有点查询才重置参数
        this.page = 1
        this.size = 10
      }
      this.nowtype = 0
      //分页条提供方法，可查询第一页，一般用于查询按钮中调用 data为返回数据 这个方法已经配置page==1 返回数据自动绑定到table 有其他操作在里面添加。
      let ref = this.mixPageRef
      this.$nextTick(() => {
        this.$refs[ref] && this.$refs[ref].loadData(data => {
          setTimeout(() => {
            $(".ant-table .no-data").addClass('pop')
          }, 300);
        }, err => { })

      })
    },
    // 提交
    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          let params = this.form.getFieldsValue()
          this.changetime(params)
          if (this.nowtype == 1) {
            //新增
            url = this.mixListOptions.mixAddURL
            text = '增加成功'
          } else {
            //编辑
            text = '修改成功'
            url = this.mixListOptions.mixEditURL
            params[this.idkey] = this.id
          }
          params = this.addother(params)
          let data = await this.post(url, params)
          if (data.errors === null) {
            this.$message.success(text)
            this.onClose()

            if (
              this.mixListOptions.mixActivatedIsNeed &&
              this.mixListOptions.mixGetDataListIsPage
            ) {
              this.handleSubmit()
            } else if (
              this.mixListOptions.mixActivatedIsNeed &&
              !this.mixListOptions.mixGetDataListIsPage
            ) {
              this.getlist()
            }
            this.fileList = []
          }
        } else {
          this.errfocus(err, this.form)
          this.$message.error("校验不通过，无法提交，请再次检查!")
        }
      })
    },
    // 增加按钮
    add () {
      this.fileList = []
      this.idedit = false
      // this.form.resetFields()
      this.visible = true
      this.nowtype = 1
      if (this.radioval) {
        this.radioval = null
      }
    },
    //  默认新增接口 其他参数处理
    addother (obj) {
      return obj
    },
    // 默认编辑其他参数处理
    other (obj) {
      return obj
    },
    see (val, obj) {
      this.idedit = true
      this.id = obj[this.idkey]
      this.visible = true
      this.nowtype = 2
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.$nextTick(() => {
        obj = this.other(data)
        // 其他操作
        this.form.setFieldsValue(obj)
      })
    },
    // 编辑按钮
    edit (val, obj) {
      this.idedit = false
      this.id = obj[this.idkey]
      this.visible = true
      this.nowtype = 2
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.$nextTick(() => {
        data = this.other(data)
        // 其他操作
        this.$nextTick(() => {
          this.form.setFieldsValue(data)
        })

      })
    },
    // 抽屉关闭
    onClose () {
      this.form.resetFields()
      this.visible = false
    },
    // 重置
    resetFrom () {
      this.searchForm.resetFields()
      this.handleSubmit('search');
    },
    // 数据处理
    changetime (data, e) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (data[k].file) {
            let arr = []
            data[k].fileList.map(item => {
              arr.push(item.response.data.data.fileid)
            })
            data[`${k}Id`] = arr
          } else {
            data[k] = data[k].format('YYYY-MM-DD')
          }
        }
        // 是数组  数组元素为对象
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD 23:59:59')
          delete data[k]
        }
        //是数组  数组元素不为对象
        if (data[k] instanceof Array && !(data[k][0] instanceof Object)) {
          if (k == 'address_Linkage') {
            // 后期修改下
            data.province = data[k][0]
            data.city = data[k][1]
            data.county = data[k][2]
            delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
    },

    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      return formData
    },
    // 单个删除
    async deletes (val, obj, index) {
      let params = {
        id: obj.id
      }
      let data = await this.post(this.mixListOptions.mixDeleteURL, params)
      if (data.errors === null) {
        this.$message.success('删除成功')
        if (
          this.mixListOptions.mixActivatedIsNeed &&
          this.mixListOptions.mixGetDataListIsPage
        ) {
          this.handleSubmit()
        } else if (
          this.mixListOptions.mixActivatedIsNeed &&
          !this.mixListOptions.mixGetDataListIsPage
        ) {
          this.getlist()
        }
      }
    },
    // 删除提示的取消操作
    cancel () { },
    //批量删除
    /**
     * @method batchDeletion
     * @param {ids} string 需要删除对象标记，如id，pid等
     */
    batchDeletion () {
      let arr = []
      this.chose_data.map(item => {
        arr.push(item.id)
      })
      let str = arr.join(',')
      let data = {
        id: str
      }
      this.deltrue(data)
    },
    //多选
    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      selectedRowKeys.length > 0 ? (this.iscanchose = false) : (this.iscanchose = true)
      this.chose_data = selectedRows
    },
    // 确定删除
    async deltrue (val) {
      let data = await this.post(this.mixListOptions.mixDeleteURL, val)
      if (data.errors == null) {
        this.$message.success('删除成功')
        if (
          this.mixListOptions.mixActivatedIsNeed &&
          this.mixListOptions.mixGetDataListIsPage
        ) {
          this.handleSubmit()
        } else if (
          this.mixListOptions.mixActivatedIsNeed &&
          !this.mixListOptions.mixGetDataListIsPage
        ) {
          this.getlist()
        }
      } else {
        for (let i = 0; i < data.errors.length; i++) {
          this.$message.error(data.errors[i].msg)
        }
      }
    },


    // 以下未修改
    //读取列表 无分页形式
    async getlist () {
      let formData = this.form ? this.form.getFieldsValue() : {}
      this.changetime(formData)
      let params = {
        ...formData
      }
      let res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      if (res.serviceSuccess) {
        this.mixDataList = res.data.pageBean.list
      }
    },

    handleTableChange () { },
    // 删除
    /**
     * @method deleteListItem
     * @param {val} Object 需要删除行对象
     * @param {id} string 需要删除对象标记，如id，pid等
     */
    //批量删除
    /**
     * @method batchDeletion
     * @param {ids} string 需要删除对象标记，如id，pid等
     */

  }
}
