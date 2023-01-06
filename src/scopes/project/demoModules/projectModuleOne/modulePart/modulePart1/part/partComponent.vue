<template>
  <ta-button>{{buttonKey}} {{demo}}</ta-button>
</template>

<script>
  export default {
    name: "partComponent",
    props: {
      buttonKey: {
        type: String
      }
    },
    inject:['test'],
    data(){
      return {
        demo:this.test
      }
    }
  }
</script>

<style scoped type="text/less">

</style>
