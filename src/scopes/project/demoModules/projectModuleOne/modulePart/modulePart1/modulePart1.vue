<template>
  <div>
    <h1>modulePart1 功能</h1><br>
    {{name}}
    <ta-button id="myid">权限测试2</ta-button>
    <ta-button id="delete">权限测试0</ta-button>
    <ta-input  id="add" >权限测试1</ta-input>
    <ta-button  id="notinlist" >没有在list里面</ta-button>
    <ta-button  >没有写id</ta-button>
    <partComponent></partComponent>
  </div>

</template>

<script>
import partComponent from './part/partComponent'

let name = '张三'
export default {
  name: 'modulePart1',
  components: {partComponent},
  data () {
    return {
      name,
    }
  },
  provide(){
    return {
      test:'lalal',
    }
  },
  created(){

  },
  mounted(){
   // this.checkRole();
  }
}
</script>

<style scoped type="text/less">

</style>
