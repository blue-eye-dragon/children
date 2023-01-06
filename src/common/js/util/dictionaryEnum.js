/**
 * 枚举js
 * @author administrator
 * @rule 字典code：{字典项首字母拼音大写：字典值}}
 */

// 户口分类
var HOUSEHOLDREGISTRYCLASSIFY = {
  FLYJTH: '1', // 福利院集体户
  BXQHK: '2', // 本辖区户口
  WSSHK: '3', // 外省市户口
  WHK: '4' // 无户口
}
// 患艾滋病情况
var ADISCONDITION = {
  WAZB: '1', // 无艾滋病
  XDHGRAZB: '3', // 携带或感染艾滋病
  QT: '9' // 其他
}
// 儿童情况
var CHILDSITUATION = {
  LLQT: '03', // 流浪乞讨儿童
  DGJJ: '04', // 打拐解救儿童
  YSBYQET: '05', // 疑似被遗弃儿童
  YSYSZS: '06', // 疑似遗失走失儿童
  LDET: '08', // 流动儿童
  QT: '15' // 其他
}
// 最有可能感染艾滋病途径
var TRANSMISSIONWAYOTHER = {
  QT: '6' // 其他
}
// 身份类别
var IDENTITCATEGORY = {
  NDJM: '1' // 内地居民
}
// 儿童类别-全
var CHILDCATEGORYA = {
  FLJGYYGQET: '1', // 福利机构养育孤弃儿童
  FLJGGYKJET: '2', // 福利机构供养困境儿童
  SHSJET: '3', // 社会散居儿童
  MBJGYYGQET: '4', // 民间机构养育孤弃儿童
  SSWRFYET: '5', // 事实无人抚养儿童
  AZBBDGRET: '6', // 艾滋病病毒感染儿童
  QT: '7', // 其他
  LSET: '8', // 留守儿童
  KJET: '9' // 困境儿童
}
// 养育类型-全
var REARINGTYPE = {
  FMYY: '03', // 父母养育
  ZFMYY: '04', // （外）祖父母养育
  QTQSYY: '05', // 其他亲属养育
  SY: '14' // 收养
}
// 减员原因
var REDUCTIONREASON = {
  SNSY: '01', // 省内收养
  KSSY: '02', // 跨省收养
  SWSGATSY: '03', // 涉外涉港澳台送养
  ZHSFM: '04', // 找回生父母
  DLSH: '05', // 独立生活
  //   KJGS: '06', // 困境改善
  SW: '06', // 死亡
  LRCW: '08', // 录入错误
  QT: '99', // 其它
  ETCL: '09', // 儿童超龄
  HJQC: '07' // 户籍迁出
}
// 患病类别
var ILLNESSTYPE = {
  WJB: '1', // 无疾病
  QT: '99' // 其他
}
// 特教类型
var SPECIALEDUCATIONTYPE = {
  QT: '9' // 其他
}
// 其他救助
var OTHERRESCUE = {
  QT: '8' // 其他
}
// 超龄续发原因
var OVERAGERENEWALREASON = {
  QT: '2' // 其他
}
// 监护方式
var GUARDIANSHIP = {
  JGFY: '1', // 机构抚养
  JTJY: '2', // 家庭寄养
  JSXX: '3' // 寄宿学校
}
// 更改之后的 监护方式(安置方式) 2020-07-07
var CUSTODYSHIP = {
  JTJY: '1', // 家庭寄养
  WBJGZYY: '2', // 未保机构自养育
  WTETFLJGYY: '3', // 委托儿童福利机构养育
  QT: '4' // 委托其他民政机构养育
}

// 其他安置方式
var OTHERCUSTODYSHIP = {
  YLJG: '1', // 养老机构
  SHJZZX: '2', // 社会救助中心
  KFYY: '3' // 康复医院
}

// 与儿童关系
var RELATION = {
  FQ: '01', // 父亲
  MQ: '02', // 母亲
  QT: '99', // 其他
  BR: '11' // 本人
}
// 领取人与儿童关系
var RECEIVERRELATION = {
  BR: '8', // 本人
  QT: '9' // 其他
}
// 是否
var YESNO = {
  SHI: '1', // 是
  FOU: '0' // 否
}
// 当前情况
var CURRENTSITUATION = {
  ZC: '1', // 正常
  SW: '2' // 死亡
}
// 健康状况
var HEALTHSTATUS = {
  JK: '10', // 健康
  OTHER: '80',
  DISABILITY: '60',
  SERIOUSILLNESS: '22',
  OTHERSERIOUSILLNESS: '89',
  CHRONICDISEASE: '30',
  OTHERCHRONICDISEASE: '49'
}
// 生活费领取方式
var PAYMENT = {
  XJLQ: '1', // 现金领取
  YHZZ: '2' // 银行转账
}
// 学业状况
var SCHOOLWORK = {
  OTHER: '6'
}
// 残疾类别
var DISABILITYTYPE = {
  DCCJ: '67' // 多重残疾
}
// 民族
var NATION = {
  HZ: '01' // 汉族
}
// 家庭关系
var FAMILYRELATIONS = {
  BRHZ: '0', // 本人/户主
  PO: '1' // 配偶
}
// 性别
var SEX = {
  NAN: '1', // 男
  NV: '2' // 女
}
// 指标状态
var INDEXSTATE = {
  XJ: '0', // 新建
  SX: '1', // 生效
  ZF: '9' // 作废
}
// 任务状态
var INVESTIGATE_TASK_STATE = {
  DFB: '1', // 待发布
  SX: '2', // 生效
  ZF: '9' // 作废
}
// 任务类别
var TASK_RESULT = {
  DXPC: '1', // 单项排查
  ZHPC: '2' // 综合排查
}
// 指标库分类
var INDEXDBCLASSIFIC = {
  ETFLJG: '01', // 儿童福利机构、收留抚养孤弃儿童的民间机构儿童养育情况自查和检查表
  SJGE: '02' // 散居孤儿保障工作、收养工作自查和检查表
}
// 发布状态
var RELAESESTATE = {
  WFB: '0', // 未发布
  YFB: '1', // 已发布
  CX: '2' // 撤销
}
// 收养机构撤销原因
var REVOKEREASON = {
  BSY: '0', // 被收养
  XXCW: '1', // 信息错误
  ETSW: '2', // 儿童死亡
  QT: '9' // 其他
}
// 国籍
var NATIONALITY = {
  ZG: '001', // 中国
  WG: '002' // 外国
}
// 收养流程状态
var ADOPTIONSTATUS = {
  SYZ: '1', // 收养中
  YJC: '2', // 已解除
  YCX: '3', // 已撤销
  BCLZ: '4', // 补材料中
  YBQCL: '5' // 已补全材料
}
var CURSTATUS = {
  DTJ0: '0', // 待提交
  DSP1: '1', // 待审批
  DTJ2: '2', // 待提交
  SPZ3: '3', // 审批中
  TG4: '4', // 通过
  BH5: '5'// 驳回
}
// 婚姻状况
var MARRIAGE = {
  ZH: '22', // 再婚
  FH: '23', // 复婚
  WSMDHYZK: '90', // 未说明的婚姻状况
  LH: '40', // 离婚
  SO: '30', // 丧偶
  YH: '20', // 已婚
  WH: '10', // 未婚
  CH: '21' // 初婚
}
// 证件类型(废弃)
var IDCARDTYPE = {
  NDJMSFZ: '1' // 内地居民身份证
}
// 身份证件类别
var IDCARD_TYPE = {
  NDJMSFZ: '01' // 内地居民身份证
}
// 任务状态
var TASKSTATUS = {
  DFB: '0', // 待发布
  YFB: '1' // 已发布
}
// 福利资金登记状态
var WELFAREFUNDREGISTERSTATE = {
  WTJ: '01', // 未提交
  YTJ: '02' // 已提交
}
// 寄养状态
var FOSTER_STATUS = {
  DJY: '1', // 待寄养
  RHZ: '2', // 融合中
  JYZ: '3', // 寄养中
  RHJS: '4', // 融合结束
  YJC: '5' // 已解除
}
// 医疗救助审核节点状态
var MEDICAL_RESCUE_NODE_STATUS = {
  CH: '1', // 撤回
  DSP: '2', // 待审批
  TG: '3', // 通过
  BH: '4' // 驳回
}
// 学业状况
var ACADEMICSTATUS = {
  ZD: '1', // 在读
  XLQ: '7' // 学龄前
}
// 文化程度
var DEGREEEDUCATION = {
  XLQ: '91', // 学龄前
  BSYJS: '93', // 博士研究生
  SJYJS: '92', // 硕士研究生
  DXBK: '20', // 大学本科
  DXZKHZKXX: '30', // 大学专科和专科学校
  ZDZYXXHZDJSXX: '40' // 中等专业学校和中等技术学校
}
// 其他特殊情况
var OTHERSPECIALCASES = {
  QT: '5' // 其他
}
// 家庭经济来源
var FAMILYSOURCEINCOME = {
  QT: '5' // 其他
}
// 帮扶建议
var SUPPORTTYPES = {
  JJBF: '1', // 经济帮扶
  QT: '7' // 其他
}
// 收养类别
var ADOPTIONCATEGORY = {
  SFMBJBWQMSXWNL: '3' // 生父母不具备完全民事行为能力
}
// 收养业务类别
var ADOPTIONBIZTYPE = {
  SYDJ: '1', // 收养登记
  JCSYDJ: '2', // 解除收养登记
  CXSYDJ: '3', // 撤销收养登记
  CJSYGXZM: '4', // 出具收养关系证明
  BLSYDJ: '5', // 补录收养登记
  BLJCSYDJ: '6', // 补录解除收养登记
  BLCXSYDJ: '7', // 补录撤销收养登记
  BLINGSYDJ: '8', // 补领收养登记
  BLINGJCSYDJ: '9' // 补领解除收养登记
}
// 职务
var DUTY = {
  QT: '99' // 其他
}
// 职务(儿童主任/督导员-全)
var ETZRDDYDUTY = {
  QT: '99' // 其他
}
// 机构类型
var TYPEOFPROTECTION = {
  WCNJZBHJG: '1', // 未成年救助保护机构
  XZJDWBZ: '4' // 乡镇（街道）未保站
}
// 设备状态
var EQUIPMENTSTATUS = {
  WJH: '0', // 未激活
  ZC: '1', // 正常
  GS: '2', // 挂失
  CSH: '3', // 初始化
  JB: '4', // 解绑
  ZX: '5', // 注销
  JG: '6' // 解挂
}
// 机构设置方式（全）
var ORGSETTINGMODE = {
  JZFW: '05', // 救助服务
  DDSL: '01', // 单独设立
  DLWCNBHZX: '08', // 独立未成年保护中心
  YTSHJZZXSLWBJG: '12', // 依托社会救助中心设立未保机构
  YTKFYYSLWBJG: '13', // 依托康复医院设立未保机构
  YTJZZSLDWBKSHZGPSLJG: '09', // 依托救助站设立的未保科室或者挂牌设立机构
  YTQTJGSLWBJG: '14', // 依托其他机构设立未保机构
  YTFLYSLWBJG: '10', // 依托福利院（中心）设立未保机构
  YTQTJGSL: '07', // 依托其他机构设立
  YTYLJGSLWBJG: '11', // 依托养老机构设立未保机构
  SGZ: '04', // 社工站
  BMFWZXSL: '06', // 便民服务中心设立
  YTSHSWFWZX: '02', // 依托社会事务服务中心
  MZB: '03' // 民政办
}
// 经费来源
var FUNDSOURCE = {
  BJCZJF: '01', // 本级财政经费
  CSZHJE: '02', // 慈善总会资金
  KNQZJZBZZJ: '03', // 困难群众救助补助资金
  FCGYJ: '04', // 福彩公益金
  QTZJ: '99' // 其他资金
}
export default {
  HEALTHSTATUS, // 健康状况
  SCHOOLWORK, // 学业状况
  HOUSEHOLDREGISTRYCLASSIFY, // 户口分类
  ADISCONDITION, // 患艾滋病情况
  CHILDSITUATION, // 儿童情况
  TRANSMISSIONWAYOTHER, // 最有可能感染艾滋病途径
  CHILDCATEGORYA, // 儿童类别-全
  REARINGTYPE, // 养育类型-全
  REDUCTIONREASON, // 减员原因
  ILLNESSTYPE, // 患病类型
  SPECIALEDUCATIONTYPE, // 特教类型
  OTHERRESCUE, // 其他救助
  OVERAGERENEWALREASON, // 超龄续发原因
  GUARDIANSHIP, // 监护方式
  CUSTODYSHIP, // 更改之后的 监护方式(安置方式)
  OTHERCUSTODYSHIP, // 其他安置方式
  RELATION, // 与儿童关系
  YESNO, // 是否
  CURRENTSITUATION, // 当前情况
  DISABILITYTYPE, // 残疾类别
  NATION, // 汉族
  FAMILYRELATIONS, // 家庭关系
  SEX, // 性别
  INDEXSTATE, // 指标状态
  INVESTIGATE_TASK_STATE, // 任务状态
  TASK_RESULT, // 任务类别
  INDEXDBCLASSIFIC, // 指标库分类
  RELAESESTATE, // 发布状态
  REVOKEREASON, // 收养机构撤销原因
  NATIONALITY, // 国籍
  ADOPTIONSTATUS, // 收养流程状态
  MARRIAGE, // 婚姻状况
  IDENTITCATEGORY, // 身份类型
  IDCARDTYPE, // 证件类型
  IDCARD_TYPE, // 身份证件类别
  TASKSTATUS, // 任务状态
  WELFAREFUNDREGISTERSTATE, // 福利资金登记状态
  FOSTER_STATUS, // 寄养状态
  MEDICAL_RESCUE_NODE_STATUS, // 医疗救助审核节点状态
  CURSTATUS, // 明天计划状态
  ACADEMICSTATUS, // 学业状况
  DEGREEEDUCATION, // 文化程度
  OTHERSPECIALCASES, // 其他特殊情形
  FAMILYSOURCEINCOME, // 其他经济来源
  SUPPORTTYPES, // 帮扶建议
  PAYMENT, // 生活费领取方式
  ADOPTIONCATEGORY, // 收养类别
  ADOPTIONBIZTYPE, // 收养业务类别
  DUTY, // 职务
  ETZRDDYDUTY, // 职务(儿童主任/督导员-全)
  RECEIVERRELATION, // 领取人与儿童关系
  TYPEOFPROTECTION, // 机构类型
  EQUIPMENTSTATUS, // 设备状态
  ORGSETTINGMODE, // 机构设置方式（全）
  FUNDSOURCE // 经费来源
}
