const orgInfo = () => {
  return {
    getOrgIdAndName () {
    //  获取单位
      let userId = window.parent.indexTool.getUserInfo().userId

      let param = {
        userId: userId
      }

      var xhr = new XMLHttpRequest()

      xhr.onreadystatechange = function () {}

      xhr.open('post', `${window.faceConfig.basePath}/org/orguser/userManagementRestService/getOrgUserByUserId`, true)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

      xhr.send(`userId=${userId}`)
      console.log('console.log(xhr):::', xhr)
      return xhr
      // let orgInfo = post(
      //   'org/orguser/userManagementRestService/getOrgUserByUserId',
      //   param
      // )
      // let orgId = orgInfo.data.direct.orgId
      // // let orgName = orgInfo.data.direct.orgName
      // return {orgId, orgName}
    }

  }
}
export default orgInfo
