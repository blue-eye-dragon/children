// 前端所有配置放这里
const faceConfig = () => {
    return {
        // 1. 前端项目部署到服务器后的访问路径123
        // 说明：
        //    1: 前端与后端同时部署时，前端静态资源放置在后端的某个目录下（此处以template为例，后端上下文为ta404）,此时，需要将context设置为  ta404/template  即可
        //    2: 前端部署到无需上下文的环境时（使用npm run build 编译的结果），例如：Tomcat的ROOT目录。此时需要将context设置为  ''
        //    3: 前端通过WAR包部署(使用npm run build:war 编译的结果)，name需要将context以及warName设置同一个名称
        context: '',
        // 2. 前端项目打war包后，war包的名称
        warName: 'jmgc-cbs-front',
        // 基础路径,打包发布的时候修改为后端发布服务地址
        basePath: 'https://etfl.mca.gov.cn/jmgc-cbs',
        // 导出服务地址
        exportUrl: 'https://etfl.mca.gov.cn/jmgc-cbs-export',
        // 开发模式mockServer服务地址
        mockServer: 'http://192.168.5.15:8081/mock/5b68f9b10b81e375f173f0ed',
        // 开发模式后端服务地址
        devServer: 'http://123.182.234.124:11601/jmgc-cbs-upgrade', // 'http://123.182.234.124:11601/jmgc-cbs-upgrade',
        // 项目文件打包寻址地址
        docModule: ['corePage/*'],
        coreModules: [
            'orgModules/authority',
            'orgModules/orguser',
            'systemModules/sysmg',
            'systemModules/resourcemg',
            'systemModules/messagemg',
            'systemModules/logmg',
            // 'functionModules',
            'auditModules/audit'
            // 'workTable/workTablePage',
            // 'onlineForm'

        ],
        projectModules: [
            'childrenModules/children'
        ],
        // 首页数据配置
        indexPageConfig: {
            // menuType 菜单样式（leftTop, left, top）
            menuType: 'leftTop',
            // 左侧菜单显示方式(sliding：侧滑, dropdown：手风琴)
            menuLeftStyle: 'dropdown',
            // 菜单是手风琴时默认是否展开2级菜单,默认不展开
            dropdownOpenMenu: false,
            // 顶部头的高度
            headerHeight: '70px',
            // 左侧菜单的宽度
            leftWidth: '260px',
            // logo框的宽度（菜单为top时有效，其余logo框宽度等于左侧菜单宽度）
            logoWidth: '230px',
            // 首页左侧菜单收起的时候的宽度（建议不小于30px）
            leftCloseWidth: '50px',
            // 顶部菜单下方条状样式（breadcrumb：面包屑, tab：显示所有tab）
            barType: 'tab',
            // logo 文字
            logoTitle: '全国儿童福利信息系统',
            // logo 图片名称，如logo.png （注意：请将图片放在 src/corePage/index/img 路径下）
            logoImage: 'gztLogo.png',
            // 不显示pageTool工具箱的页面（如：['orguser.html']）
            notPageTool: ['worktable', 'roleWorktableTemplateModify'],
            // 是否显示测试使用的接管后台日志pageTool工具箱（打包的时候改成false）
            isShowLogTools: true,
            /**
             * ======================================
             *   重要：由于新版工作台使用了一个布局组件，
             *        但该组件不支持IE9，所以如果需要支
             *        持IE9的话需要自己开发工作台，必须
             *        使用faceConfig.js文件中的自定义
             *        工作台页面进行替换，否则在IE9浏览
             *        器下登录进入后工作台打不开，IE其
             *        他版本(IE10、IE11)及其他浏览器
             *        没有影响
             * ======================================
             */
            // 自定义工作台页面，默认页面为workTablePage.html，文字为'工作台'。注：若自定义页面，需在功能资源管理中放开该页面的权限
            /* worktable: {
                  name: '工作台',
                  module: 'worktable.html', //模块
                  part: 'workbench', // 路由路径
                  prefix: '',
                }, */
            // html资源获取地址,一般情况下为本系统不需要配置
            srcPrefix: ''
        },
        // 请求白名单
        whiteList: [
            '/adoption/queryRelieveById',
            '/codetable/getCode',
            '/zoning/queryStatistics',
            '/dict/queryDictByParentValue',
            '/announcements/queryOrgByOrgVo',
            '/addChildApi/checkWelfareOrgInfo',
            '/areaManagement/queryAreaByAsync',
            '/checkChildApi/queryAreaByCurrentUser',
            '/welfareOrgManagement/queryWelfareOrg',
            '/welfareOrgManagement/getWelfareOrgMsg',
            '/welfareOrgManagement/queryListByOrgId',
            '/childProtectOrgManagement/queryProtectOrg',
            '/checkChildApi/queryAreaByCurrentUserCounty',
            '/childArchives/queryAdoptionInfoByChildBaseId',
            '/leftBehindWomenStatistics/queryLeftBehindWoman',
            '/org/orguser/userManagementRestService/queryEffectiveUser',
            '/org/sysmg/manageableFieldsRestService/queryManageableFields',
            '/orphanLivingExpensesAndChildren/pageUnattendedChildStatistics'
        ],
        // 返回参数配置
        resDataConfig: {
            serviceSuccess: 'serviceSuccess', // 服务是否成功回调
            serviceSuccessRule: true, // 服务调用成功规则，设置serviceSuccess为成功时的标志，默认为boolean类型true，也可以设置数字或者字符串类型
            errors: 'errors', // 错误信息 包含错误消息
            message: 'message', // 简单错误信息,如果也有error,那么也会执行error的处理
            redirectUrl: 'redirectUrl'
        },
        defaultTheme: 'ybblue'
    }
}
module.exports = faceConfig()
