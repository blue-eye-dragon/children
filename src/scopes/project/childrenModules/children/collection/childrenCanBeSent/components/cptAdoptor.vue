<template>
  <div>
    <!-- <div> -->
        <ta-tabs class="fromcom"  @change="chs" type="card">
            <ta-tab-pane tab="男方单独收养" key="1">
               <AdoptionAlone key="1"></AdoptionAlone>
            </ta-tab-pane>
            <ta-tab-pane tab="女方单独收养" key="2">
                 <AdoptionAlone key="2"></AdoptionAlone>
            </ta-tab-pane>
            <ta-tab-pane tab="夫妻双方共同收养" key="3">
                <JointAdoption></JointAdoption>
            </ta-tab-pane>
        </ta-tabs>
    <!-- </div> -->
  </div>
</template>
<script>
import AdoptionAlone from './adoptionAlone'
import JointAdoption from './jointAdoption'
export default {
  name: 'applicant',
  components: {
    AdoptionAlone,
    JointAdoption
  },
  props: {
    typeadoption: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    chs (val) {
      this.$emit('update:typeadoption', val)
    }
  }
}
</script>
<style scoped lang="less">

</style>
