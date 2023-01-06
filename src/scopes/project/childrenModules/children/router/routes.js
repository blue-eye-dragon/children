import routesContainer from '@/common/components/routesContainer'
import adoption from '../adoption/routes'
import examine from '../examine/routes'
import collection from '../collection/routes'
import basicChildren from '../basicChildren/routes'
import downsizing from '../downsizing/routes'
import overageChildren from '../overageChildren/routes'
import welfareInstitutionsInternal from '../welfareInstitutionsInternal/routes'
import welfareAssistance from '../welfareAssistance/routes'
import withinSalvageInstitution from '../withinSalvageInstitution/routes'
import organizationInfoManagement from '../organizationInfoManagement/routes'
import welfareFunds from '../welfareFunds/routes'
import welfareAuthorityRegulation from '../welfareAuthorityRegulation/routes'
import policypropaganda from '../policypropaganda/routes'
import specialWork from '../specialWork/routes'
import childSearchManagement from '../childSearchManagement/routes'
import fileQuery from '../fileQuery/routes'
import querystatistics from '../querystatistics/routes'
import adoptionReleaseManagement from '../adoptionReleaseManagement/routes'
import adoptionassessment from '../adoptionassessment/routes'
import systemSetUp from '../systemSetUp/routes'
import contacts from '../contacts/routes'
import businessConfiguration from '../businessConfiguration/routes'
import childFamilyParentingManage from '../childFamilyParentingManage/routes'
import mobileDeviceManagement from '../mobileDeviceManagement/routes'
import superintendent from '../superintendent/routes'
import operationsManagement from '../operationsManagement/routes'
import acrossProvinceFileExplain from '../acrossProvinceFileExplain/routes'

const innerRoutes = [
  ...adoption,
  ...examine,
  ...collection,
  ...basicChildren,
  ...downsizing,
  ...overageChildren,
  ...welfareInstitutionsInternal,
  ...welfareAssistance,
  ...withinSalvageInstitution,
  ...organizationInfoManagement,
  ...welfareFunds,
  ...welfareAuthorityRegulation,
  ...policypropaganda,
  ...specialWork,
  ...childSearchManagement,
  ...fileQuery,
  ...policypropaganda,
  ...querystatistics,
  ...childSearchManagement,
  ...adoptionReleaseManagement,
  ...adoptionassessment,
  ...systemSetUp,
  ...contacts,
  ...businessConfiguration,
  ...childFamilyParentingManage,
  ...mobileDeviceManagement,
  ...superintendent,
  ...operationsManagement,
  ...acrossProvinceFileExplain
]
// 导入路由声明
export default [
  {
    path: '/',
    component: routesContainer,
    children: innerRoutes.map(item => ({
      ...item
    }))
  }
]
