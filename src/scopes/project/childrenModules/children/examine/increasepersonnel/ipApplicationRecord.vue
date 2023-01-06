<template>
  <!-- 社会散居》基本生活费申请（本地）页面 由于本地孤儿和超龄补录页面基本一致，故使用此外壳页面 -->
  <div class="searchdata">
    <LocalRecordsList />
  </div>
</template>

<script>
import LocalRecordsList from './localRecordsList'
export default {
  components: {
    LocalRecordsList
  }

}
</script>

<style>
</style>
