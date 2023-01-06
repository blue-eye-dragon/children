import routesContainer from '@/common/components/routesContainer'

//模块part 声明导入
import modulePart1 from "../rePageDemo/modulePart1/routes"
import modulePart2 from "../rePageDemo/modulePart2/routes"

const innerRoutes = [
  ...modulePart1,
  ...modulePart2
];


//导入路由声明
export default [
  { path: '/',
    component: routesContainer,
    children: innerRoutes.map((item) => ({
      ...item,
    })),
  },
]
