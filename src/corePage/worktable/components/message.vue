<template>
  <div class="__sex-ratio__">
    <ul>
      <li v-for="(item, index) in data"
          :key="index"
          @click="itemClick(item,index)">
        <span :class="item.msgType == '3'?'t4':'t1'">
          <img width="16px"
               src="../icon/lALPDh0cOirvDZdjYw_99_99.png"
               alt=""
               v-if="item.msgType == '3'">
          [{{ item.msgType == '1' ? '通知公告' :(item.msgType == '2' ? '系统消息' :'系统升级通知')}}]
        </span>
        <span class="t2"> {{item.name}} </span>
        <span class="t3"> {{item.msgTime}} </span>
      </li>
    </ul>
  </div>
</template>

<script>
// 检查类型  明天
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    itemClick (item, index) {
      this.$emit('itemClick', item, index)
    }
  }
}
</script>

<style lang="less">
.__sex-ratio__ {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    width: 100%;
  }
  @media screen and (max-width: 1366px) {
    font-size: 12px;
  }
  li {
    margin-bottom: 5px;
    cursor: pointer;
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .t1 {
    color: #212436;
    // font-weight: bold;
  }
  .t2 {
    color: #636a86;
    width: 40%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .t3 {
    margin-top: 5px;
    font-size: 10px;
    color: #21212f;
    float: right;
  }
  .t4 {
    color: #dd2929;
  }
}
</style>
