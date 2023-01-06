<template>
  <ta-row class="fromcom">
    <div style="height: 50px;">
      <ta-button type="primary"
                 style="left: 12.5%;"
                 @click='choseChild'>选择儿童</ta-button>
      <ta-button type="primary"
                 style="left: 12.5%;"
                 @click='deleteall'>清除所有儿童</ta-button>
    </div>
    <ta-col :span="24">
      <ta-form-item label="已选择儿童"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }">
        <div class="chosechild">
          <div v-for="(item,index) in childList"
               :key="index"
               :value="item.childNumber"
               class="children">
            {{item.name}}
            <ta-popconfirm title="确定删除吗?"
                           @confirm="del(index)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消">
              <ta-icon class="dels"
                       type="close" />
            </ta-popconfirm>
          </div>
        </div>
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: {
    childList: {
      type: Array
    }
  },
  data () {
    return {
      name: ''
    }
  },
  activated () {
    this.name = ''
  },
  methods: {
    choseChild () {
      this.$emit('choseChild')
    },
    // 清除所有儿童
    deleteall () {
      this.$emit('deleteall')
    },
    del (e) {
      this.childList.splice(e, 1)
      this.$emit('update:childList', this.childList)
    }
  }
}
</script>
<style lang="less" scoped>
.chosechild {
  padding: 11px 15px 0 15px;
  //   border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
  border: 1px solid #636363;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 100px;
  cursor: pointer;
  border-radius: 5px;
}
.children {
  height: 25px;
  padding: 0 10px;
  background: rgba(218, 238, 255, 1);
  color: rgba(0, 0, 0, 0.85);
  margin-right: 10px;
  margin-bottom: 11px;
}
.preservation {
  margin-left: 20px;
}
</style>
