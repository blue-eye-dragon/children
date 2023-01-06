<template>
  <div @click='chas'>
    <button @click.stop="click">test</button>
    <ta-form :autoFormCreate="(form)=>{this.form = form}">
      <ta-form-item label="身份证号" fieldDecoratorId="idCard" :fieldDecoratorOptions="rules.idCard">
          <ta-input placeholder="请输入身份证号" />
        </ta-form-item>
         <ta-form-item label="年龄" fieldDecoratorId="age" :fieldDecoratorOptions="rules.age">
          <ta-input placeholder="请输入年龄"  />
        </ta-form-item>
    </ta-form>
  </div>
</template>

<script>
export default {
  name: 'testOne',
  data () {
    return {
      rules: {
        idCard: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        age: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, message: '请输入身份证号' }
          ]
        }
      },
      show: false,
      isvalidator: false
    }
  },
  activated () {
    this.form.setFieldsValue({
      idCard: '10',
      age: 12
    })
  },
  methods: {
    chas () {
      this.isvalidator = true
    },
    idcardrole (rule, value, callback) {
      if (this.isvalidator) {
        this.form.setFieldsValue({
          age: value + 'age'
        })
      }
      callback()
    },
    click: function () {
      this.isvalidator = false
      this.form.validateFieldsAndScroll((error) => {
        if (!error) {
          alert('correct')
        } else {
          console.log(error)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
