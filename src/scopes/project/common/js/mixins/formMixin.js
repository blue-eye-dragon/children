import moment from 'moment'
import Vue from 'vue'
import { resolve } from 'path'
import { rejects } from 'assert'

export default {
  data () {
    /* eslint-disable */
    return {
      // 设置属性
      /**
       * @method 级联
       */
      mixCascaderUrl: '',         //级联接口地址
      mixCascadingSub: '',        //级联下级标识
      mixIsLeaf: '',              //是否有子元素标识
      /**
       * @method 下拉树（省、市、区）
       */
      mixTreeActivatedIsNeed: true,//是否进入页面执行加载树接口
      mixGetTreeURL: '',           //树接口
      mixTreeData: [],             //下拉树节点（数组）
      mixTreePid: null,            //下拉树初始pid
      mixDefaultTreeProps: {       //定义下拉树字段
        label: 'label',
        key: 'key',
        value: 'value',
        pid: 'pid',
        isLeaf: 'isLeaf'
      }                            

    }
  },

  created() {
    if (this.mixTreeActivatedIsNeed&&this.mixGetTreeURL!='') this.onSelectTree().then(res => {
      this.mixTreeData = res
    })
  },
  mounted() {

  },
  methods: {
    /**
     * @method 级联方法:getPlaceOptions,loadData
     */
    getPlaceOptions(targetOption) {
      let that = this;
      let formdata = {};
      console.log(targetOption);
      if (targetOption) {
        formdata[this.mixCascadingSub] = targetOption[this.mixCascadingSub];
      }
      return new Promise((resolve, reject) => {
        this.post(this.mixCascaderUrl, formdata).then(res => {
          res.data.eac01PoList.map((item, index) => {
            if (item[this.mixIsLeaf] == 1) {
              item.isLeaf = false;
            } else {
              item.isLeaf = true;
            }
          });
          let goalData = res.data.eac01PoList;
          resolve(goalData);
        });
      });
    },

    async loadData(selectedOptions) {
      console.log(selectedOptions);
      if (selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const data = await this.getPlaceOptions(targetOption);
        targetOption.loading = false;
        targetOption.children = data;
        this.options = [...this.options];
        console.log(this.options);
      } else {
        const data = await this.getPlaceOptions();
        this.options = data;
        console.log(this.options);
      }
    },


    /**
     * @method 下拉树方法:onSelectTree,fnLoadData，getNewTreeData
     */
    onSelectTree(pid = this.mixTreePid) {
      return new Promise((resolve, reject) => {
        this.post(this.mixGetTreeURL, { pid: pid }).then(res => {
          let data = []
          res.data.list.forEach(item => {
            data.push({
              label: item[this.mixDefaultTreeProps.label],
              key: item[this.mixDefaultTreeProps.key],
              value: item[this.mixDefaultTreeProps.value],
              pid: item[this.mixDefaultTreeProps.pid],
              isLeaf: !parseFloat(item[this.mixDefaultTreeProps.isLeaf])
            })
          })
          console.log(res)
          resolve(data)
        })
      })
    },
    //  selectTree树选择懒加载
    lazySelectTreeLoadData(treeNode) {
      return new Promise(resolve => {
        this.onSelectTree(treeNode.eventKey)
          .then(res => {
            const mixTreeData = [...this.mixTreeData]
            this.getNewTreeData(mixTreeData, treeNode.eventKey, res)
            this.mixTreeData = mixTreeData
            resolve()
          })
          .catch(res => {
            console.log(res)
          })
      })
    },
    getNewTreeData(mixTreeData, curKey, child) {
      const loop = data => {
        data.forEach(item => {
          if (item.key == curKey) {
            item.children = child
          } else {
            if (item.children) {
              loop(item.children, curKey, child)
            }
          }
        })
      }
      loop(mixTreeData)
    }
  }
}
