<template>
  <div>
    <!-- <div> -->
        <ta-tabs class="fromcom"  @change="chs" type="card">
            <ta-tab-pane tab="男方单独收养" key="1">
               <AdoptionAlone ></AdoptionAlone>
            </ta-tab-pane>
            <ta-tab-pane tab="女方单独收养" key="2">
                 <AdoptionAlone></AdoptionAlone>
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
      address: [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake'
          }]
        }]
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }]
        }]
      }],
      isDisabled: false
    }
  },
  methods: {
    chs (val) {
      console.log(val)
      this.$emit('update:typeadoption', val)
    }
  }
}
</script>
<style scoped lang="less">

</style>
