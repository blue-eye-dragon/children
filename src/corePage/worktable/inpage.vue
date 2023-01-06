<template>
<component v-if='!!infos2'  v-bind:is="currentTabComponent"></component>
</template>
<script>
import appGLY from './worktableGLY.vue'
import app from './worktable.vue'
export default {
  name: 'inpage',
  data () {
    return {
      currentTabComponent: app,
      infos2: false
    }
  },
  created () {
    this.infos2 = false
    this.infos = window.parent.indexTool.getUserInfo().roles
    let type = '0'
    if (!this.infos) {
      Base.submit(null, {
        url: 'user/getCurUserAccount',
        withCredentials: true
      }, {
        successCallback: (data) => {
          if (data.data.curUserAccount.roles) {
            this.infos = data.data.curUserAccount.roles
            if (this.infos && this.infos.length > 0) {
              this.infos.forEach(e => {
                if (e.roleType == '04') {
                  type = 1
                }
              })
            }
            if (type == 1) {
              this.currentTabComponent = appGLY
            } else {
              this.currentTabComponent = app
            }
            this.infos2 = true
          }
        }
      })
    } else {
      if (this.infos && this.infos.length > 0) {
        this.infos.forEach(e => {
          if (e.roleType == '04') {
            type = 1
          }
        })
      }
      if (type == 1) {
        this.currentTabComponent = appGLY
      } else {
        this.currentTabComponent = app
      }
      this.infos2 = true
    }
  }
}
</script>
