<template>
  <div style="width: 100%;height: 100%; "
       class="__fix-style__">
    <div id="cots"
         v-if="isshow == 3 || areaLevel == '4'">
      <div class="contss">
        <div class="datadatastatistics">
          <div class="datadatastatisticcont">
            <!-- <div class='datadatastatisticstop msgrighttop1'>
            <div>
              <img src="./img/tj2.png" alt="">
              <span>数据统计</span>
            </div>
          <img src="./images/icon_setup.png" alt="" class="fr">
        </div> -->
            <div class="datastatistics_box"
                 v-if="headArrMinisterial.length > 0">
              <ta-icon @click="sekuaiLeft()"
                       class="datastatistics_left"
                       type="caret-left" />
              <div id="datastatisticslist_box"
                   class="datastatisticslist">
                <div v-for="(item, index) in headArrMinisterial"
                     :class="'list' + index"
                     :key="index"
                     class="listone">
                  <div class="imgkk">
                    <!-- @click="clickStatistics(item)" :class="items.configTitle == item.configTitle?'listone ywselected '+'list'+index:'listone '+'list'+index"-->
                    <p class="title">{{ item.configTitle }}</p>

                    <p class="total">
                      <span style="    margin-left: 0px;">总计</span>
                      {{ item.childTotalNum || 0 }}
                      <span>人</span>
                    </p>
                    <p class="addnum"
                       v-if="item.count > 0">
                      本月新增
                      <span class="addnumspan">{{ item.thisMonthChildNUm || 0 }}</span>
                    </p>
                    <p class="addnum"
                       v-else>
                      本月新增
                      <span class="addnumspan">{{ item.thisMonthChildNUm || 0 }}</span>
                    </p>
                  </div>
                </div>
                <div style="clear:both;"></div>
              </div>
              <ta-icon @click="sekuaiRight()"
                       class="datastatistics_right"
                       type="caret-right" />
            </div>
            <div class="datastatisticslist nomore"
                 v-else>
              暂无数据
            </div>
          </div>
          <div class="msg">
            <div class="msgleft">
              <div class="datadatastatisticstop msglefttop">
                <div>
                  <img src="./img/db_blue.png"
                       alt=""
                       style="width:25px;height:25px;" />
                  <span>待办事项</span>
                </div>
              </div>
              <div style="  height: 200px;  overflow: auto; ">
                <div class="msgleftlist">
                  <div class="msgleftlistone"
                       v-for="(item, index) in copyagencylist"
                       @click="gopage(item, index)"
                       :key="index">
                    <div class="imgs">
                      <img :src="item.src"
                           alt="" />
                      <p class="imgnums">{{ item.noDoCount }}</p>
                    </div>
                    <p>{{ item.name }}</p>
                  </div>

                  <div v-if="copyagencylist.length == 0"
                       style="text-align: center;font-weight: bold; padding-top:30px;
                font-size:18px; margin:20px auto;">
                    <span>暂无事项</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="msgright">
              <div class="datadatastatisticstop msgrighttop ">
                <div>
                  <img src="./img/msg1.png"
                       alt=""
                       style="width:25px;height:25px;" />
                  <span>消息/通知</span>
                </div>
                <span class="fr"
                      style="color:rgba(0, 0, 0, 0.45); cursor:pointer;"
                      @click="goLookAll">
                  更多
                </span>
              </div>
              <div class="msglist"
                   style="    overflow-y: scroll; height: 202px;">
                <ul class="msglistone">
                  <li>
                    <p class="">
                      [系统消息]
                      <span class="textsname">
                        <a href="static/管理员创建业务账号.wmv">操作手册下载</a>
                      </span>
                    </p>
                  </li>
                  <li v-for="(item, index) in messgeLsit"
                      :key="index">
                    <p class=""
                       @click="jumpPage(item)">
                      [{{ item.msgType == '1' ? '通知公告' : '系统消息' }}]
                      <span class="textsname">{{ item.name }}</span>
                      <span class="texnumPass texnum">{{ item.messageContent }}</span>
                      <span style="float: right;margin-right:10px;">{{ item.msgTime }}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isshow != 3 && isshow != 4 && isshow"
         style="width: 100%;height: auto;overflow: hidden">
      <div style="width: 100%;height: 170px; margin-bottom:16px">
        <div style="width: 50%;height: 100%;float: left">
          <p style="height: 40px;line-height: 40px;margin: 0;background-color: #ECF3FE;color:#34618B">
            <span>
              <img src="./imgChildren/dbsx.png"
                   alt=""
                   width="24px"
                   style="margin: 0 10px 0 20px;" />
            </span>

            <span><strong>待办事项</strong></span>
          </p>
          <div style="width: 100%;height: calc(100% - 40px);background-color: white ;overflow: auto;">
            <ta-carousel autoplay
                         v-if="copyagencylist">
              <div>
                <div style="width: calc(100% / 6);height:120px;float: left;text-align:center;display: flex;align-items: center;justify-content: center"
                     v-for="(item, index) in copyagencylist.slice(0, 6)"
                     @click="gopage(item, index)"
                     :key="index">
                  <div style="text-align: center;">
                    <img :src="item.src"
                         style="width: 64%;display: inline-block;padding-left: 20%"
                         alt="" />
                    <span style="position: relative;left: -15%;top: -16px;border-radius: 50%;background-color:#FC983D;color:white;display:inline-block;width:30px;height: 30px;line-height: 30px;">
                      {{ item.noDoCount }}
                    </span>
                    <p>{{ item.name }}</p>
                  </div>
                </div>
              </div>
              <div v-if="copyagencylist.length > 6">
                <div style="width: calc(100% / 6);height:120px;float: left;text-align:center;display: flex;align-items: center;justify-content: center"
                     v-for="(item, index) in copyagencylist.slice(7, 13)"
                     @click="gopage(item, index)"
                     :key="index">
                  <div style="text-align: center;">
                    <img :src="item.src"
                         style="width: 64%;display: inline-block;padding-left: 20%"
                         alt="" />
                    <span style="position: relative;left: -15%;top: -16px;border-radius: 50%;background-color:#FC983D;color:white;display:inline-block;width:30px;height: 30px;line-height: 30px;">
                      {{ item.noDoCount }}
                    </span>
                    <p>{{ item.name }}</p>
                  </div>
                </div>
              </div>
              <div v-if="copyagencylist.length > 12">
                <div style="width: calc(100% / 6);height:120px;float: left;text-align:center;display: flex;align-items: center;justify-content: center"
                     v-for="(item, index) in copyagencylist.slice(13, 19)"
                     @click="gopage(item, index)"
                     :key="index">
                  <div style="text-align: center;">
                    <img :src="item.src"
                         style="width: 64%;display: inline-block;padding-left: 20%"
                         alt="" />
                    <span style="position: relative;left: -15%;top: -16px;border-radius: 50%;background-color:#FC983D;color:white;display:inline-block;width:30px;height: 30px;line-height: 30px;">
                      {{ item.noDoCount }}
                    </span>
                    <p>{{ item.name }}</p>
                  </div>
                </div>
              </div>
            </ta-carousel>
            <div v-else>
              暂无待办事项
            </div>
            <div v-if="copyagencylist.length == 0"
                 style="text-align: center;font-weight: bold;
                 padding-top:30px;font-size:18px;">
              <span>暂无事项</span>
            </div>
          </div>
        </div>
        <div style="width: 50%;height: 100%;float: left;border-left: 5px solid #EEECEC">
          <p style="height: 40px;line-height: 40px;margin: 0;background-color: #DEF8F4;color:#119B97">
            <span>
              <img src="./imgChildren/xxzx.png"
                   alt=""
                   width="24px"
                   style="margin: 0 10px 0 20px;" />
            </span>

            <span><strong>消息中心</strong></span>
            <span class="fr"
                  style="margin-right:10px;"
                  @click="goLookAll">更多</span>
          </p>
          <div style="width: 100%;height: calc(100% - 40px);background-color: white;overflow-y: auto;padding:8px 0">
            <p class="">
              <span style="padding-left:16px;padding-right:10px">[系统消息]</span>
              <span class="textsname">
                <a href="static/管理员创建业务账号.wmv">操作手册下载</a>
              </span>
            </p>
            <p style="margin: 0 16px 0 8px;height: 30px;line-height: 30px"
               v-for="(item, index) in messgeLsit"
               :key="index">
              <span style="">「{{ item.msgType == '1' ? '通知公告' : '系统消息' }}」</span>
              <span>{{ item.messageContent }}</span>
              <span style="color: green">{{ item.readState }}</span>
              <span style="float: right;">{{ item.msgTime }}</span>
            </p>
          </div>
        </div>
      </div>

      <div style="width: 100%;height: 26%;"
           v-if="!areaLevel == '3' || !areaLevel == '4' || areaLevel == '1' || areaLevel == '2'">
        <div class="datadatastatisticcont">
          <div class="datastatistics_box"
               v-if="headArrMinisterial.length > 0">
            <ta-icon @click="sekuaiLeft()"
                     class="datastatistics_left"
                     type="caret-left" />
            <div id="datastatisticslist_box"
                 class="datastatisticslist">
              <div v-for="(item, index) in headArrMinisterial"
                   :class="
                  items.configTitle == item.configTitle
                    ? 'listone ywselected ' + 'list' + index
                    : 'listone ' + 'list' + index
                "
                   @click="clickStatistics(item)"
                   :key="index"
                   class="listone">
                <div class="imgkk">
                  <p class="title">{{ item.configTitle }}</p>
                  <p class="total">
                    <span style="    margin-left: 0px;">总计</span>
                    {{ item.childTotalNum || 0 }}
                    <span>人</span>
                  </p>
                  <p class="addnum"
                     v-if="item.count > 0">
                    本月新增
                    <span class="addnumspan">{{ item.thisMonthChildNUm || 0 }}</span>
                  </p>
                  <p class="addnum"
                     v-else>
                    本月新增
                    <span class="addnumspan">{{ item.thisMonthChildNUm || 0 }}</span>
                  </p>
                </div>
              </div>
              <div style="clear:both;"></div>
            </div>
            <ta-icon @click="sekuaiRight()"
                     class="datastatistics_right"
                     type="caret-right" />
          </div>
          <div class="datastatisticslist nomore"
               v-else>
            暂无数据
          </div>
        </div>
      </div>

      <div class="box_body"
           style="margin-top:10px;"
           v-if="!areaLevel == '3' || !areaLevel == '4' || areaLevel == '1' || areaLevel == '2'">
        <div class="box_body_left">
          <div class="__bbl1__">
            <h3 style="color: #1D61A1;height: 15%;line-height: 15%">
              <span><img :src="ministerialList['jiankang']"
                     alt="" /></span>
              <span style="padding-left: 5px;font-weight: bolder">健康分析</span>
            </h3>
            <div style="width: 100%;height:220px;">
              <ta-e-charts chartsType="pie"
                           :data="ringdata"
                           :extend="piechartExtend"
                           :settings="piechartSettings"
                           width="100%"
                           height="220px" />
            </div>
          </div>
          <div v-if="dataAll.degreeeducationCounts"
               class="__bbl2__">
            <h3 style="color: #1D61A1;">
              <img :src="ministerialList['jiaoyu']"
                   alt="" />
              <span style="padding-left: 5px;font-weight: bolder;display:inline-block;height: 30px;line-height:30px">
                教育分析
              </span>
            </h3>
            <div class="__f-jyfx__">
              <div v-for="(item, index) in dataAll.degreeeducationCounts"
                   :key="index"
                   class="__jyfx__">
                <div>
                  <p style="font-size: 22px;text-align: center;">{{ item.childRatio }}</p>
                  <p style="text-align: center">{{ item.typeName }}</p>
                </div>
              </div>
              <div class="__jyfx__ __jyfx-n__"></div>
            </div>
          </div>
        </div>
        <div class="box_body_middle">
          <div style="width: 100%;height: 100%; background: white">
            <div style="width: 100%;height: 30px;padding-top: 0px">
              <ta-button type="primary"
                         @click="china"
                         style="font-size: 20px;margin-left: 10px">
                {{ curCityName || '中国' }}
              </ta-button>
              <span>
                当前地图位置：
                <strong style="font-size: 20px">{{ cityName || '中国' }}</strong>
              </span>
              <span style="margin-left: 0;font-size: 20px;padding-left: 5px;font-weight: 500;display: inline-block;height: 30px;line-height: 30px;color: rgb(29, 97, 161);">
                {{ cTitle + '   数量分布图' }}
              </span>
            </div>
            <div v-show="false"
                 style="width: 100%;height: calc(100% - 30px);margin: 0 auto;padding-left: 0%">
              <ta-e-charts :chartsType="'map'"
                           :data="chartData"
                           :settings="chartSettings"
                           :events="chartEvents"
                           :extend="chartExtendMinisterial"
                           height="100%"
                           width="100%"></ta-e-charts>
            </div>
            <div style="width: 100%;height: calc(100% - 30px);margin: 0 auto;padding-left: 0%">
              <div class="maprange"
                   v-show="false">
                <div class="input-card">
                  <h4>下属行政区查询</h4>
                  <div class="input-item">
                    <div class="input-item-prepend">
                      <span class="input-item-text">省市区</span>
                    </div>
                    <select id="province"
                            style="width:100px"
                            @change="search('province')"></select>
                  </div>
                  <div class="input-item">
                    <div class="input-item-prepend">
                      <span class="input-item-text">地级市</span>
                    </div>
                    <select id="city"
                            style="width:100px"
                            @change="search('city')"></select>
                  </div>
                  <div class="input-item">
                    <div class="input-item-prepend"><span class="input-item-text">区县</span></div>
                    <select id="district"
                            style="width:100px"
                            @change="search('district')"></select>
                  </div>
                </div>
              </div>
              <div class="echarts">
                <div id="map"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="box_body_right">
          <div>
            <h3 style="color: #1D61A1;padding-bottom:5px;margin:0;">
              <img :src="ministerialList['xingbie']"
                   alt="" />
              <span style="padding-left: 5px;font-weight: bolder;display:inline-block;height: 30px;line-height:30px">
                性别占比
              </span>
            </h3>
            <div v-if="dataAll.sexCounts"
                 style="margin-top: 0%;width: 100%;height:40px;margin:0 auto;color:white;overflow: hidden">
              <div :title="'男:' + sexBoy"
                   :style="{
                  position: 'relative',
                  left: '0px',
                  top: '5px',
                  'background-color': '#2D8CFE',
                  width: sexBoy,
                  height: '30px',
                  'line-height': '30px',
                  'background-image': 'linear-gradient(to right, #58B8F1 , #60A2F0)'
                }">
                <span style="margin-right:10px;margin-left:10px">男</span>
                <span style="z-index: 99">{{ sexBoy }}</span>
              </div>
              <div :title="'女:' + sexGirl"
                   :style="{
                  position: 'relative',
                  left: 'calc(' + sexBoy + ' - 4%)',
                  top: '-25px',
                  'background-color': '#F56662',
                  width: sexGirl,
                  height: '30px',
                  'line-height': '30px',
                  'text-align': 'right',
                  'background-image': 'linear-gradient(to left, #EA352D , #FB7E7C)',
                  transform: 'skew(-40deg,0deg)',
                  'padding-right': '17%'
                }">
                <span style="margin-right:10px;transform:skew(40deg,0deg);display:inline-block;">
                  {{ sexGirl }}
                </span>
                <span style="margin-right:10px;transform:skew(40deg,0deg);display:inline-block;">
                  女
                </span>
              </div>
              <div :title="'其他:' + sexOther"
                   v-if="sexOther != 0"
                   :style="{
                  position: 'relative',
                  left: 'calc(' + sexBoy + ' - 5% + ' + sexGirl + ')',
                  top: '-55px',
                  'background-color': '#ccc',
                  width:
                    'calc(' + (sexBoy == '0%' && sexGirl == '0%') ? '70%' : sexOther + ' + 30%)',
                  height: '30px',
                  'line-height': '30px',
                  'text-align': 'right',
                  'background-image': 'linear-gradient(to left, #666 , #aaa)',
                  transform: 'skew(-40deg,0deg)',
                  'padding-right': '17%'
                }">
                <span style="margin-right:10px;transform:skew(40deg,0deg);display:inline-block;">
                  {{ sexOther }}
                </span>
                <span style="margin-right:10px;transform:skew(40deg,0deg);display:inline-block;">
                  其他
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 style="color: #1D61A1;">
              <img :src="ministerialList['qushi']"
                   alt="" />
              <span style="padding-left: 5px;font-weight: bolder;display:inline-block;">
                趋势分析
              </span>
            </h3>
            <div style="width: 100%;height:calc(100% - 40px)">
              <ta-e-charts :tooltip="qstooltip"
                           :yAxis="qsyAxis"
                           :chartsType="'line'"
                           :legend-visible="false"
                           :data="qushi.chartDataqushi"
                           :settings="qushi.chartSettingsqushi"
                           :grid="qushi.gridqushi"
                           height="100%"></ta-e-charts>
            </div>
          </div>
          <div>
            <h3 style="color: #1D61A1;padding-bottom:5px;">
              <img :src="ministerialList['diqu']"
                   alt="" />
              <span style="padding-left: 5px;font-weight: bolder;display:inline-block;height: 30px;line-height:30px">
                地区人数排名
              </span>
            </h3>
            <div style="width: 100%;height:calc(100% - 40px);overflow-y:auto">
              <table style="width: 100%;height:100%"
                     class="table">
                <tr style="width:100%;height: 40px;line-height:40px;float:left;font-size: 18px"
                    v-for="(item, index) in dataAll.areaCounts"
                    :key="index">
                  <td style="width:10%;height: 100%;display: inline-block;float: left;text-align: center;"
                      v-if="index === 0">
                    <span style="display: inline-block;width: 25px;height: 25px;line-height:25px;margin-top: 10%;border-radius: 50%;background-color: #F78162;color:white">
                      {{ index + 1 }}
                    </span>
                  </td>
                  <td style="width:10%;height: 100%;display: inline-block;float: left;text-align: center;"
                      v-if="index === 1">
                    <span style="display: inline-block;width: 25px;height: 25px;line-height:25px;margin-top: 10%;border-radius: 50%;background-color: #1C90FD;color:white">
                      {{ index + 1 }}
                    </span>
                  </td>
                  <td style="width:10%;height: 100%;display: inline-block;float: left;text-align: center;"
                      v-if="index === 2">
                    <span style="display: inline-block;width: 25px;height: 25px;line-height:25px;margin-top: 10%;border-radius: 50%;background-color: #BED6E9;color:white">
                      {{ index + 1 }}
                    </span>
                  </td>
                  <td style="width:10%;height: 100%;display: inline-block;float: left;text-align: center;"
                      v-if="index !== 0 && index !== 1 && index !== 2">
                    <span style="width:25px;height: 25px;line-height:25px;margin-top: 10%;border-radius: 50%;background-color: #BED6E9;display: inline-block;">
                      {{ index + 1 }}
                    </span>
                  </td>
                  <td style="width:40%;height: 100%;display: inline-block;float: left;text-align: center;">
                    {{ item.typeName }}
                  </td>
                  <td style="width:25%;height: 100%;display: inline-block;float: left;text-align: center;">
                    {{ item.childNum }}
                  </td>
                  <td style="width:25%;height: 100%;display: inline-block;float: left;text-align: center;">
                    {{ item.childRatio }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 部级st -->
    <!-- userInfo.loginId == "dangaiguo" || userInfo.loginId == "wangyi" || userInfo.loginId=="developer" -->
    <div v-if="!isshow"
         style="width: 100%;height: 100%;">
      <div class="datadatastatisticcont">
        <div class="datastatistics_box"
             v-if="headArrMinisterial.length > 0">
          <ta-icon @click="sekuaiLeft()"
                   class="datastatistics_left"
                   type="caret-left" />
          <div id="datastatisticslist_box"
               class="datastatisticslist">
            <div v-for="(item, index) in headArrMinisterial"
                 :class="
                items.configTitle == item.configTitle
                  ? 'listone ywselected ' + 'list' + index
                  : 'listone ' + 'list' + index
              "
                 @click="clickStatistics(item)"
                 :key="index"
                 class="listone">
              <div class="imgkk">
                <p class="title">{{ item.configTitle }}</p>
                <p class="total">
                  <span style="    margin-left: 0px;">总计</span>
                  {{ item.childTotalNum || 0 }}
                  <span>人</span>
                </p>
                <p class="addnum"
                   v-if="item.count > 0">
                  本月新增
                  <span class="addnumspan">{{ item.thisMonthChildNUm || 0 }}</span>
                </p>
                <p class="addnum"
                   v-else>
                  本月新增
                  <span class="addnumspan">{{ item.thisMonthChildNUm || 0 }}</span>
                </p>
              </div>
            </div>
            <div style="clear:both;"></div>
          </div>
          <ta-icon @click="sekuaiRight()"
                   class="datastatistics_right"
                   type="caret-right" />
        </div>
        <div class="datastatisticslist nomore"
             v-else>
          暂无数据
        </div>
      </div>
      <div class="box_body">
        <div class="box_body_left">
          <div class="__bbl1__">
            <h3 style="color: #1D61A1;height: 15%;line-height: 15%">
              <span><img :src="ministerialList['jiankang']"
                     alt="" /></span>
              <span style="padding-left: 5px;font-weight: bolder">健康分析</span>
            </h3>
            <div style="width: 100%;height: 220px;">
              <ta-e-charts chartsType="pie"
                           :data="ringdata"
                           :extend="piechartExtend"
                           :settings="piechartSettings"
                           width="100%"
                           height="220px" />
            </div>
          </div>
          <div v-if="dataAll.degreeeducationCounts"
               class="__bbl2__">
            <h3 style="color: #1D61A1;">
              <img :src="ministerialList['jiaoyu']"
                   alt="" />
              <span style="padding-left: 5px;font-weight: bolder;display:inline-block;height: 30px;line-height:30px">
                教育分析
              </span>
            </h3>
            <div class="__f-jyfx__">
              <div v-for="(item, index) in dataAll.degreeeducationCounts"
                   :key="index"
                   class="__jyfx__">
                <div>
                  <p style="font-size: 22px;text-align: center;">{{ item.childRatio }}</p>
                  <p style="text-align: center">{{ item.typeName }}</p>
                </div>
              </div>
              <div class="__jyfx__ __jyfx-n__ "></div>
            </div>
          </div>
        </div>
        <div class="box_body_middle">
          <div style="width: 100%;height: 75%;">
            <div style="width: 100%;height: 30px;padding-top: 0px">
              <ta-button type="primary"
                         @click="china"
                         style="font-size: 20px;margin-left: 10px">
                中国
              </ta-button>
              <span>
                当前地图位置：
                <strong style="font-size: 20px">{{ cityName || '中国' }}</strong>
              </span>
              <span style="margin-left: 0;font-size: 20px;padding-left: 5px;font-weight: 500;display: inline-block;height: 30px;line-height: 30px;color: rgb(29, 97, 161);">
                {{ cTitle + '   数量分布图' }}
              </span>
            </div>
            <div v-show="false"
                 style="width: 100%;height: calc(100% - 30px);margin: 0 auto;padding-left: 0%">
              <ta-e-charts :chartsType="'map'"
                           :data="chartData"
                           :settings="chartSettings"
                           :events="chartEvents"
                           :extend="chartExtendMinisterial"
                           height="100%"
                           width="100%"></ta-e-charts>
            </div>
            <div style="width: 100%;height: calc(100% - 30px);
            margin: 0 auto;padding-left: 0%">
              <div class="maprange"
                   v-show="false">
                <div class="input-card">
                  <h4>下属行政区查询</h4>
                  <div class="input-item">
                    <div class="input-item-prepend">
                      <span class="input-item-text">省市区</span>
                    </div>
                    <select id="province"
                            style="width:100px"
                            @change="search('province')"></select>
                  </div>
                  <div class="input-item">
                    <div class="input-item-prepend">
                      <span class="input-item-text">地级市</span>
                    </div>
                    <select id="city"
                            style="width:100px"
                            @change="search('city')"></select>
                  </div>
                  <div class="input-item">
                    <div class="input-item-prepend"><span class="input-item-text">区县</span></div>
                    <select id="district"
                            style="width:100px"
                            @change="search('district')"></select>
                  </div>
                </div>
              </div>
              <div class="echarts">
                <div id="map"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="box_body_right">
          <div>
            <h3 style="color: #1D61A1;padding-bottom:5px;margin:0;">
              <img :src="ministerialList['xingbie']"
                   alt="" />
              <span style="padding-left: 5px;font-weight: bolder;display:inline-block;height: 30px;line-height:30px">
                性别占比
              </span>
            </h3>
            <div v-if="dataAll.sexCounts"
                 style="margin-top: 0%;width: 100%;height: 40px;margin:0 auto;color:white;overflow: hidden">
              <div :title="'男:' + sexBoy"
                   :style="{
                  position: 'relative',
                  left: '0px',
                  top: '5px',
                  'background-color': '#2D8CFE',
                  width: sexBoy,
                  height: '30px',
                  'line-height': '30px',
                  'background-image': 'linear-gradient(to right, #58B8F1 , #60A2F0)'
                }">
                <span style="margin-right:10px;margin-left:10px">男</span>
                <span style="z-index: 99">{{ sexBoy }}</span>
              </div>
              <div :title="'女:' + sexGirl"
                   :style="{
                  position: 'relative',
                  left: 'calc(' + sexBoy + ' - 4%)',
                  top: '-25px',
                  'background-color': '#F56662',
                  width: sexGirl,
                  height: '30px',
                  'line-height': '30px',
                  'text-align': 'right',
                  'background-image': 'linear-gradient(to left, #EA352D , #FB7E7C)',
                  transform: 'skew(-40deg,0deg)',
                  'padding-right': '17%'
                }">
                <span style="margin-right:10px;transform:skew(40deg,0deg);display:inline-block;">
                  {{ sexGirl }}
                </span>
                <span style="margin-right:10px;transform:skew(40deg,0deg);display:inline-block;">
                  女
                </span>
              </div>
              <div :title="'其他:' + sexOther"
                   v-if="sexOther != 0"
                   :style="{
                  position: 'relative',
                  left: 'calc(' + sexBoy + ' - 5% + ' + sexGirl + ')',
                  top: '-55px',
                  'background-color': '#ccc',
                  width:
                    'calc(' + (sexBoy == '0%' && sexGirl == '0%') ? '70%' : sexOther + ' + 30%)',
                  height: '30px',
                  'line-height': '30px',
                  'text-align': 'right',
                  'background-image': 'linear-gradient(to left, #666 , #aaa)',
                  transform: 'skew(-40deg,0deg)',
                  'padding-right': '17%'
                }">
                <span style="margin-right:10px;transform:skew(40deg,0deg);display:inline-block;">
                  {{ sexOther }}
                </span>
                <span style="margin-right:10px;transform:skew(40deg,0deg);display:inline-block;">
                  其他
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 style="color: #1D61A1;">
              <img :src="ministerialList['qushi']"
                   alt="" />
              <span style="padding-left: 5px;font-weight: bolder;display:inline-block;">
                趋势分析
              </span>
            </h3>
            <div style="width: 100%;height:calc(100% - 40px)">
              <ta-e-charts :tooltip="qstooltip"
                           :yAxis="qsyAxis"
                           :chartsType="'line'"
                           :legend-visible="false"
                           :data="qushi.chartDataqushi"
                           :settings="qushi.chartSettingsqushi"
                           :grid="qushi.gridqushi"
                           height="100%"></ta-e-charts>
            </div>
          </div>
          <div>
            <h3 style="color: #1D61A1;padding-bottom:5px;">
              <img :src="ministerialList['diqu']"
                   alt="" />
              <span style="padding-left: 5px;font-weight: bolder;display:inline-block;height: 30px;line-height:30px">
                地区人数排名
              </span>
            </h3>
            <div style="width: 100%;height:calc(100% - 40px);overflow-y:auto">
              <table style="width: 100%;height:100%"
                     class="table">
                <tr style="width:100%;height: 40px;line-height:40px;float:left;font-size: 18px"
                    v-for="(item, index) in dataAll.areaCounts"
                    :key="index">
                  <td style="width:10%;height: 100%;display: inline-block;float: left;text-align: center;"
                      v-if="index === 0">
                    <span style="display: inline-block;width: 25px;height: 25px;line-height:25px;margin-top: 10%;border-radius: 50%;background-color: #F78162;color:white">
                      {{ index + 1 }}
                    </span>
                  </td>
                  <td style="width:10%;height: 100%;display: inline-block;float: left;text-align: center;"
                      v-if="index === 1">
                    <span style="display: inline-block;width: 25px;height: 25px;line-height:25px;margin-top: 10%;border-radius: 50%;background-color: #1C90FD;color:white">
                      {{ index + 1 }}
                    </span>
                  </td>
                  <td style="width:10%;height: 100%;display: inline-block;float: left;text-align: center;"
                      v-if="index === 2">
                    <span style="display: inline-block;width: 25px;height: 25px;line-height:25px;margin-top: 10%;border-radius: 50%;background-color: #BED6E9;color:white">
                      {{ index + 1 }}
                    </span>
                  </td>
                  <td style="width:10%;height: 100%;display: inline-block;float: left;text-align: center;"
                      v-if="index !== 0 && index !== 1 && index !== 2">
                    <span style="width:25px;height: 25px;line-height:25px;margin-top: 10%;border-radius: 50%;background-color: #BED6E9;display: inline-block;">
                      {{ index + 1 }}
                    </span>
                  </td>
                  <td style="width:40%;height: 100%;display: inline-block;float: left;text-align: center;">
                    {{ item.typeName }}
                  </td>
                  <td style="width:25%;height: 100%;display: inline-block;float: left;text-align: center;">
                    {{ item.childNum }}
                  </td>
                  <td style="width:25%;height: 100%;display: inline-block;float: left;text-align: center;">
                    {{ item.childRatio }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Vue from 'vue'
import '@yh/ta404-ui'
import TaECharts from '@yh/ta404-ui/es/echarts/src/Echarts'
import person from './imgChildren/dqfb.png'
import state from './imgChildren/mrdt.png'
import business from './imgChildren/ywzb.png'
import trend from './imgChildren/ywbl.png'
import one from './imgChildren/aa.png'
import two from './imgChildren/icn_dbsx02.png'
import three from './imgChildren/icn_dbsx03.png'
import four from './imgChildren/icn_dbsx04.png'
import five from './imgChildren/icn_dbsx05.png'
import six from './imgChildren/icn_dbsx06.png'
import saveAs from './saveAs'
import './demo-center.css'
import mapjs from './js/map.json'

var app0
var chinaArray = [
  {
    site: '北京',
    spell: 'beijing'
  },
  {
    site: '上海',
    spell: 'shanghai'
  },
  {
    site: '天津',
    spell: 'tianjin'
  },
  {
    site: '重庆',
    spell: 'chongqing'
  },
  {
    site: '河北',
    spell: 'hebei'
  },
  {
    site: '山西',
    spell: 'shanxi'
  },
  {
    site: '内蒙古',
    spell: 'neimenggu'
  },
  {
    site: '辽宁',
    spell: 'liaoning'
  },
  {
    site: '吉林',
    spell: 'jilin'
  },
  {
    site: '黑龙江',
    spell: 'heilongjiang'
  },
  {
    site: '江苏',
    spell: 'jiangsu'
  },
  {
    site: '浙江',
    spell: 'zhejiang'
  },
  {
    site: '安徽',
    spell: 'anhui'
  },
  {
    site: '福建',
    spell: 'fujian'
  },
  {
    site: '江西',
    spell: 'jiangxi'
  },
  {
    site: '山东',
    spell: 'shandong'
  },
  {
    site: '河南',
    spell: 'henan'
  },
  {
    site: '湖北',
    spell: 'hubei'
  },
  {
    site: '湖南',
    spell: 'hunan'
  },
  {
    site: '广东',
    spell: 'guangdong'
  },
  {
    site: '广西',
    spell: 'guangxi'
  },
  {
    site: '海南',
    spell: 'hainan'
  },
  {
    site: '四川',
    spell: 'sichuan'
  },
  {
    site: '贵州',
    spell: 'guizhou'
  },
  {
    site: '云南',
    spell: 'yunnan'
  },
  {
    site: '西藏',
    spell: 'xizang'
  },
  {
    site: '陕西',
    spell: 'shanxi'
  },
  {
    site: '甘肃',
    spell: 'gansu'
  },
  {
    site: '宁夏',
    spell: 'ningxia'
  },
  {
    site: '青海',
    spell: 'qinghai'
  },
  {
    site: '新疆',
    spell: 'xinjiang'
  },
  {
    site: '香港',
    spell: 'xianggang'
  },
  {
    site: '澳门',
    spell: 'aomen'
  },
  {
    site: '台湾',
    spell: 'taiwan'
  }
]
var colorAll = ['#F2637B', '#3BA0FF', '#36CBCB', '#4DCB73', '#FAD337', '#C0A0F3']
export default {
  name: 'index',
  components: {
    TaECharts
  },
  data () {
    this.chartEvents = {
      click: (v) => {
        this.cityName = v.name
        this.chinaArray.forEach((item, index) => {
          if (item.site == v.name) {
            this.chartSettings.position = `province/` + item.spell
          }
        })
        this.dataAll.areaCounts.map((item) => {
          if (item.areaName == v.name) {
            this.clickStatistics(this.items, item.areaId)
          }
        })
        this.stateArr.forEach((item, index) => {
          item.new = Math.ceil(Math.random() * 100)
          item.old = Math.ceil(Math.random() * 100)
        })
        this.setRightData2()
        // zhu
        this.getChartData()
        // 部级页面
        this.ministerial()
      }
    }
    this.chartExtend = {
      // showLegendSymbol: false,
      // 取消地图上小圆点的方法
      series: {
        type: 'map',
        itemStyle: {
          color: 'transparent',
          areaColor: '#C4EDFA'
        }
      },
      visualMap: {
        show: false,
        type: 'continuous',
        // orient: 'horizontal',
        itemWidth: 10,
        itemHeight: 80,
        text: ['高', '低'],
        showLabel: true,
        seriesIndex: [0],
        min: 0,
        max: 100000,
        inRange: {
          color: [
            '#D9FAFF',
            '#B8E5F8',
            '#9BD3F4',
            '#7FC0EF',
            '#62ACEC',
            '#4198E8',
            '#2588E3',
            '#0975DE'
          ]
        },
        textStyle: {
          color: '#7B93A7'
        },
        bottom: 30,
        left: 'left'
      },
      legend: {
        show: false
      }
    }
    this.chartExtendMinisterial = {
      series: {
        type: 'map',
        itemStyle: {
          color: 'transparent',
          areaColor: '#C4EDFA'
        }
      },
      visualMap: {
        show: true,
        type: 'continuous',
        // orient: 'horizontal',
        itemWidth: 10,
        itemHeight: 80,
        text: ['高', '低(数量)'],
        showLabel: true,
        seriesIndex: [0],
        min: 0,
        max: 100000,
        inRange: {
          color: [
            '#D9FAFF',
            '#B8E5F8',
            '#9BD3F4',
            '#7FC0EF',
            '#62ACEC',
            '#4198E8',
            '#2588E3',
            '#0975DE'
          ]
        },
        textStyle: {
          color: '#7B93A7'
        },
        bottom: 30,
        left: 'left'
      },
      legend: {
        show: false
      }
    }
    return {
      indexP: 0,
      cTitle: '',
      numberTip: 10,
      items: {},
      sexGirl: '0',
      sexBoy: '0',
      sexOther: '0',
      seriesyibiao: [],
      // 数据
      dataAll: {
        degreeeducationCounts: [
          {
            typeName: '学龄前',
            childRatio: 0
          },
          {
            typeName: '小学',
            childRatio: 0
          },
          {
            typeName: '其他',
            childRatio: 0
          }
        ]
      },
      url: '',
      item: {},
      areaId: '',
      serversPassdata: {},
      // 饼图
      ringdata: {
        // columns: ['lessOne', 'oneToThree', 'fourToFix', 'sevenToTen', 'elevenToEighteen', 'greaterEighteen'],
        columns: ['typeName', 'childNum'],
        rows: [
          {
            areaId: null,
            areaName: null,
            typeName: '健康',
            childNum: 0,
            childRatio: 0
          },
          {
            areaId: null,
            areaName: null,
            typeName: '非健康',
            childNum: 0,
            childRatio: 0
          }
        ]
      },
      piechartExtend: {
        series: [
          {
            radius: '50%',
            center: ['30%', '55%']
          }
        ]
      },
      piechartSettings: {
        radius: 50,
        offsetY: 140
      },
      isShowBox: 'true',
      floatLeft: '100px',
      floatTop: '100px',
      chartDataqushi: {
        columns: ['日期', 'value'],
        rows: [
          { 日期: '1月', value: 0 },
          { 日期: '2月', value: 0 },
          { 日期: '4月', value: 0 },
          { 日期: '6月', value: 0 }
        ]
      },
      chartSettingsqushi: {
        area: true
      },
      seriesqushi: {},
      yibiao: {},
      qstooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: function (parse) {
          return '日期：' + (parse[0].data[0] || '') + '<br>' + '人数：' + (parse[0].data[1] || '')
        }
      },
      qsyAxis: {
        name: '人数',
        nameLocation: 'end',
        nameTextStyle: {
          color: '#333'
        },
        axisLabel: {
          show: true,
          color: '#333'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      qushi: {
        chartDataqushi: {
          row: [
            {
              areaId: null,
              areaName: null,
              typeName: '2020-01',
              childNum: 0,
              childRatio: null
            },
            {
              areaId: null,
              areaName: null,
              typeName: '2020-02',
              childNum: 0,
              childRatio: null
            },
            {
              areaId: null,
              areaName: null,
              typeName: '2020-03',
              childNum: 0,
              childRatio: null
            }
          ]
        }
      },
      jiankang: [],
      jiaoyu: [],
      xingbie: [],
      diqu: [],
      diquone: [],
      diqutwo: [],
      ministerialList: {
        jiankang: require('./imgMinistry/组 2074.png'),
        jiaoyu: require('./imgMinistry/组 2075.png'),
        qushi: require('./imgMinistry/路径 596.png'),
        xingbie: require('./imgMinistry/组 2077.png'),
        diqu: require('./imgMinistry/组 2076.png'),
        nianling: require('./imgMinistry/路径 711.png')
      },
      messgeLsit: [],
      visibleM: false,
      userInfo: {},
      //
      see5: false,
      show01: false,
      show02: false,
      show03: false,
      show04: false,
      show0201: false,
      show6: false,
      show: false,
      showTwo: false,
      showDaiban: false,
      childCount: 0,
      childAddCount: 0,
      childCount01: 0,
      // 'childCount01-01': 0,
      // 'childCount01-02': 0,
      agencylist: [
        // { name: '待审核事项-儿童信息上报', num: '0' },
        // { name: '待审核事项-儿童信息变更', num: '0' },
        // { name: '待审核事项-儿童身份状态变更', num: '0' },
        // { name: 111, num: 2 }
      ],
      imgwurenList: {
        '1': require('./imgs/img1.png'),
        '2': require('./imgs/img2.png'),
        '3': require('./imgs/img3.png'),
        '4': require('./imgs/img4.png'),
        '5': require('./imgs/img5.png'),
        '6': require('./imgs/img6.png'),
        '7': require('./imgs/img7.png'),
        '8': require('./imgs/img8.png'),
        '9': require('./imgs/img9.png'),
        '10': require('./imgs/img10.png'),
        '11': require('./imgs/img11.png'),
        '12': require('./imgs/img12.png'),
        '13': require('./imgs/img13.png'),
        '14': require('./imgs/img14.png'),
        '15': require('./imgs/img15.png'),
        '0': require('./imgs/img0.png')
      },

      statisticsList: {
        '02-01': require('./imgs/zanwu.png'),
        '02-02': require('./imgs/zanwu.png'),
        '02-03': require('./imgs/sswrfyet.png'),
        '02-04': require('./imgs/zanwu.png'),
        '01-01': require('./imgs/zanwu.png'),
        '01-02': require('./imgs/zanwu.png'),
        '01-03': require('./imgs/sswrfyet.png'),
        '01-04': require('./imgs/zanwu.png')
      },
      msgList: [],
      businessType: '',
      businessTypeList: [],
      statisticalTypeList: [],
      sum: 0,
      copyagencylist: [],
      isshow: false,
      marryAgeOption: {},
      chinaArray,
      cityName: '',
      areaIdForMap: '',
      chartData: {
        columns: ['areaName', 'childNum'],
        rows: []
      },
      chartSettings: {
        position: 'china', // 请求数据时url后面的字段
        selectedMode: 'single',
        beforeRegisterMap (citys) {
          return citys
        }
      },
      // 导航条中图标
      person: person,
      state: state,
      business: business,
      trend: trend,
      // 业务
      headArrMinisterial: [],
      // [
      //   {
      //     configType: 2,
      //     configTitle: '困境儿童',
      //     configAdress: 'ministryStatisticsApi/difficultiesChildrenStatistics',
      //     configQueryAdress: 2,
      //     configIcon: null,
      //     sortNum: 2,
      //     childTotalNum: 9,
      //     thisMonthChildNUm: 0
      //   },
      //   {
      //     configType: 2,
      //     configTitle: '困境儿童-监护不当',
      //     configAdress: null,
      //     configQueryAdress: null,
      //     configIcon: null,
      //     sortNum: 2,
      //     childTotalNum: 9,
      //     thisMonthChildNUm: 0
      //   },
      //   {
      //     configType: 2,
      //     configTitle: '困境儿童-家庭贫困',
      //     configAdress: null,
      //     configQueryAdress: null,
      //     configIcon: null,
      //     sortNum: 3,
      //     childTotalNum: 9,
      //     thisMonthChildNUm: 0
      //   },
      //   {
      //     configType: 2,
      //     configTitle: '困境儿童-残疾',
      //     configAdress: null,
      //     configQueryAdress: null,
      //     configIcon: null,
      //     sortNum: 4,
      //     childTotalNum: 9,
      //     thisMonthChildNUm: 0
      //   },
      //   {
      //     configType: 2,
      //     configTitle: '留守儿童',
      //     configAdress: 'ministryStatisticsApi/LeftBehindChildrenStatistics',
      //     configQueryAdress: 1,
      //     configIcon: null,
      //     sortNum: 5,
      //     childTotalNum: 4,
      //     thisMonthChildNUm: 0
      //   },
      //   {
      //     configType: 2,
      //     configTitle: '福利机构抚养孤儿',
      //     configAdress: 'ministryStatisticsApi/queryAbandonedChildInfo',
      //     configQueryAdress: 4,
      //     configIcon: null,
      //     sortNum: 6,
      //     childTotalNum: 43,
      //     thisMonthChildNUm: 4
      //   },
      //   {
      //     configType: 2,
      //     configTitle: '留守妇女',
      //     configAdress: 'ministryStatisticsApi/leftBehindWomenStatistics',
      //     configQueryAdress: 3,
      //     configIcon: null,
      //     sortNum: 6,
      //     childTotalNum: 4,
      //     thisMonthChildNUm: 0
      //   },
      //   {
      //     configType: 2,
      //     configTitle: '福利机构代养儿童',
      //     configAdress: 'ministryStatisticsApi/queryFosterInNeedChildInfo',
      //     configQueryAdress: 5,
      //     configIcon: null,
      //     sortNum: 7,
      //     childTotalNum: 7,
      //     thisMonthChildNUm: 0
      //   },
      //   {
      //     configType: 2,
      //     configTitle: '散居孤儿',
      //     configAdress: 'ministryStatisticsApi/queryInSocialDiasporaChildInfo',
      //     configQueryAdress: 7,
      //     configIcon: null,
      //     sortNum: 7,
      //     childTotalNum: 8,
      //     thisMonthChildNUm: 0
      //   },
      //   {
      //     configType: 2,
      //     configTitle: '事实无人抚养',
      //     configAdress: 'ministryStatisticsApi/querUnattendedChildInfo',
      //     configQueryAdress: 6,
      //     configIcon: 'b55b73f43a9741c79af0a7ac72aff288',
      //     sortNum: 8,
      //     childTotalNum: 39,
      //     thisMonthChildNUm: 0
      //   },
      //   {
      //     configType: 2,
      //     configTitle: '收养登记儿童',
      //     configAdress: 'ministryStatisticsApi/queryAdoptionStatistics',
      //     configQueryAdress: 8,
      //     configIcon: null,
      //     sortNum: 8,
      //     childTotalNum: 15,
      //     thisMonthChildNUm: 0
      //   }
      // ],
      stateArr: [
        {
          type: '困境儿童',
          new: '456',
          old: '456'
        },
        {
          type: '留守儿童',
          new: '32',
          old: '32'
        },
        {
          type: '留守妇女',
          new: '988',
          old: '988'
        },
        {
          type: '事实无人抚养儿童',
          new: '233',
          old: '233'
        },
        {
          type: '散居孤儿',
          new: '411',
          old: '411'
        },
        {
          type: '福利机构抚养孤儿',
          new: '43',
          old: '43'
        },
        {
          type: '福利机构代养孤儿',
          new: '673',
          old: '72'
        }
      ],
      stateArrMinisterial: [],
      // zhu
      colorAll: colorAll,
      tooltip: {},
      series: [],
      marriageAndAppointInfo: {},
      appointAndHandleData: [],
      timeRange: [],
      xAxis: [],
      yAxis: [
        {
          type: 'value',
          min: 0,
          minInterval: 1,
          axisLine: {
            lineStyle: {
              color: colorAll
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      legend: {
        icon: 'circle',
        left: 'right',
        itemWidth: 10,
        itemHeight: 10,
        data: [
          '收养登记',
          '明天计划',
          '孤儿助学',
          '事实无人抚养儿童',
          '孤儿生活保障',
          '未成年人保护'
        ]
      },
      polygons: [],
      cityCode: 100000,
      citySelect: null,
      districtSelect: null,
      geoJsonData: '',
      echartsMap: null,
      uimap: null,
      opts: {},
      areaData: {},
      mapData: [],
      codeList: [],
      isCodeListLoadComplete: false, // codeList是否全部获取完毕
      cityNamemap: '中国',
      mapset: null,
      district: null,
      areaLevel: '',
      curCityName: '' // window.parent.indexTool.getUserInfo().areaName
    }
  },
  beforeCreate: function () {
    app0 = this
  },
  activated () {
    this.loadData()
    this.qushi.chartDataqushi.rows = []
    this.chartData.rows = []
    this.clickStatistics()
  },
  mounted () {
    // 实例化zip对象
    // this.zip = new JSZip()

    this.getMessage()
    this.getCurrentUser()

    this.setRightData2()
    this.ministerial()

    this.getChartData()

    this.userInfo = window.parent.indexTool.getUserInfo()
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel

    this.isshow = this.areaLevel
    if (this.areaLevel == 0) {
      this.isshow = ''
    }
    // alert(this.isshow)
    this.getCode()

    if (window.parent.indexTool.getUserInfo().isManager) {
      this.showDaiban = true
    } else {
      this.getAreaLevel()
      this.showDaiban = false
    }
    this.serversPass()
    this.mapInit()
  },
  methods: {
    mapInit () {
      //* ************* */
      this.echartsMap = this.$echarts.init(document.getElementById('map'))
      this.echartsMap.on('click', this.echartsMapClick)
      this.$echarts.registerMap('china', mapjs)
      let option = {
        visualMap: {
          show: false,
          align: 'left',
          bottom: '20%',
          text: ['高', '低'],
          min: 0,
          max: 0,
          inRange: { color: ['#B0E0F7', '#90CBF2', 'rgba(23, 134, 238, 0.73)'] },
          pieces: [
            { max: 1, color: 'rgb(197, 227, 255)' },
            { min: 1, max: 2 },
            { min: 2, max: 10 },
            { min: 10, max: 15 },
            { min: 15, max: 20 },
            { min: 20, max: 30 },
            { min: 30, max: 40 },
            { min: 40, max: 50 },
            { min: 50, max: 200 },
            { min: 200 }
          ],
          calculable: true
        },
        tooltip: {
          trigger: 'item',
          formatter: function (item) {
            if (item.name == '南海诸岛') {
              return ''
            } else {
              return item.name + '<br>地区人数：' + item.value + ' 个'
            }
          }
        },
        grid: {
          top: '5px',
          left: '5px',
          right: '5px',
          bottom: '5px'
        },
        series: [
          {
            name: '地区人数',
            type: 'map',
            aspectScale: 0.75,
            zoom: 1.2,
            geoIndex: 0,
            roam: false,
            mapType: 'china',
            selectedMode: 'single',
            showLegendSymbol: false,
            visibility: 'off',
            itemStyle: {
              normal: {
                color: '#ccc',
                borderColor: '#4382F6',
                areaColor: '#b0d5e6',
                borderWidth: 0.5,
                label: {
                  show: true,
                  textStyle: {
                    color: '#003767'
                  }
                }
              },
              emphasis: {
                areaColor: '#4382F6',
                borderColor: '#fff',
                areaStyle: {
                  color: '#fff'
                },
                label: {
                  show: true,
                  textStyle: {
                    color: '#003767'
                  }
                }
              }
            },
            data: []
          }
        ]
      }
      this.echartsMap.setOption(option)
    },
    async echartsMapClick (params) {
      // 地图点击事件
      if (params.data.level != 'district') {
        this.cityName = params.name
        this.$ba.trackEvent('echartsMap', '点击地图', `${params.data.name}-${params.data.cityCode}`)
        if (params.data.level == 'street') return
        this.cityNamemap = params.data.name
        this.cityCode = params.data.cityCode
        this.district.setExtensions('all')
        let code = params.data.cityCode + '000000'

        await this.clickStatistics(this.items, code, params)
      }
    },
    loadMapData (areaCode) {
      if (areaCode.length > 6) {
        areaCode = areaCode.substring(0, 6)
      }
      AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
        var districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: true, // 打开事件支持
          map: this.mapset
        }))
        districtExplorer.loadAreaNode(areaCode, (error, areaNode) => {
          if (error) {
            console.error(error)
            return
          }
          let mapJson = {}
          mapJson.features = areaNode.getSubFeatures() || []
          // mapJson.features.map((item, index) => {
          //   if (item.properties.name == '海南省') {
          //     item.properties.cp = [109.83119, 19.131971]
          //   }
          //   if (item.properties.name == '广东省') {
          //     item.properties.cp = [114.380637, 23.525178]
          //   }
          //   if (item.properties.name == '澳门特别行政区') {
          //     item.properties.cp = [113.54909, 21.198951]
          //   }
          //   if (item.properties.name == '内蒙古自治区') {
          //     item.properties.cp = [111.670801, 42.318311]
          //   }
          //   if (item.properties.name == '河北省') {
          //     item.properties.cp = [114.502461, 38.645474]
          //   }
          //   if (item.properties.name == '甘肃省') {
          //     item.properties.cp = [103.823557, 35.558039]
          //   }
          //   if (item.properties.name == '陕西省') {
          //     item.properties.cp = [108.948024, 34.963161]
          //   }
          // })
          this.loadMap(this.cityNamemap, mapJson)

          this.chartData = mapJson
        })
      })
    },
    loadMap (mapName, data = { features: [] }, isTure) {
      !data.features && (data.features = [])
      if (data) {
        // mapName = 'china'
        if (mapName == '中国' || mapName == '') {
          mapName = 'china'
        }
        if (this.indexP < 1) {
          this.china()
          this.indexP++
        }
        if (mapName == 'china') {
          data = mapjs
        }
        this.$echarts.registerMap(mapName, data)
        var option = {
          visualMap: {
            show: false,
            align: 'left',
            bottom: '20%',
            text: ['高', '低'],
            min: 0,
            max: parseInt(this.numberTip),
            inRange: { color: ['#B0E0F7', '#90CBF2', 'rgba(23, 134, 238, 0.73)'] },
            pieces: [
              { max: 1, color: 'rgb(197, 227, 255)' },
              { min: 1, max: 2 },
              { min: 2, max: 10 },
              { min: 10, max: 15 },
              { min: 15, max: 20 },
              { min: 20, max: 30 },
              { min: 30, max: 40 },
              { min: 40, max: 50 },
              { min: 50, max: 200 },
              { min: 200 }
            ],
            calculable: true
          },
          tooltip: {
            trigger: 'item',
            formatter: function (item) {
              if (item.name == '南海诸岛') {
                return ''
              } else {
                return item.name + '<br>地区人数：' + item.value + ' 个'
              }
            }
          },
          grid: {
            top: '5px',
            left: '5px',
            right: '5px',
            bottom: '5px'
          },
          series: [
            {
              name: '地区人数',
              type: 'map',
              aspectScale: 0.75,
              zoom: 1.2,
              geoIndex: 0,
              roam: false,
              mapType: mapName,
              selectedMode: 'single',
              showLegendSymbol: false,
              visibility: 'off',
              itemStyle: {
                normal: {
                  color: '#ccc',
                  borderColor: '#4382F6',
                  areaColor: '#b0d5e6',
                  borderWidth: 0.5,
                  label: {
                    show: true,
                    textStyle: {
                      color: '#003767'
                    }
                  }
                },
                emphasis: {
                  areaColor: '#4382F6',
                  borderColor: '#fff',
                  areaStyle: {
                    color: '#fff'
                  },
                  label: {
                    show: true,
                    textStyle: {
                      color: '#003767'
                    }
                  }
                }
              },
              data: this.mapData
            }
          ]
        }
        if (mapName == '海南省') {
          option.series[0].center = [109.844902, 19.0392]
          option.series[0].layoutCenter = ['50%', '50%']
          option.series[0].layoutSize = '600%'
        } else {
          option.series[0].center = undefined
          option.series[0].layoutCenter = undefined
          option.series[0].layoutSize = undefined
        }
        if (this.echartsMap) {
          this.echartsMap.setOption(option)
        }
      }
    },
    async getData (data, level, adcode) {
      // 清空下一级别的下拉列表
      if (level === 'province') {
        this.citySelect.innerHTML = ''
        this.districtSelect.innerHTML = ''
      } else if (level === 'city') {
        this.districtSelect.innerHTML = ''
      }
      var subList = data.districtList
      if (subList) {
        var contentSub = new Option('--请选择--')
        var curlevel = subList[0].level

        if (curlevel === 'street') {
          let mapJsonList = this.geoJsonData.features

          let mapJson = {}
          for (let i in mapJsonList) {
            if (mapJsonList[i].properties.name == this.cityNamemap) {
              mapJson.features = [].concat(mapJsonList[i])
            }
          }
          this.mapData = []
          this.mapData.push({
            name: this.cityNamemap,
            value: parseInt(Math.random() * 100),
            level: curlevel
          })
          this.loadMap(this.cityNamemap, mapJson)
          this.geoJsonData = mapJson
          return
        }
        var curList = document.querySelector('#' + curlevel)
        curList.add(contentSub)
        this.mapData = []
        const areaCounts = (this.dataAll && this.dataAll.areaCounts) || []
        this.numberTip = parseInt(areaCounts.length > 0 ? areaCounts[0].childNum : 10)
        for (var i = 0, l = subList.length; i < l; i++) {
          var name = subList[i].name
          var cityCode = subList[i].adcode
          await this.$nextTick(() => {
            this.mapData.push({
              name: name,
              value: (areaCounts.filter((v) => v.typeName === name)[0] || { childNum: 0 }).childNum,
              cityCode: cityCode,
              level: curlevel
            })
          })
          var levelSub = subList[i].level
          contentSub = new Option(name)
          contentSub.setAttribute('value', levelSub)
          contentSub.center = subList[i].center
          contentSub.adcode = subList[i].adcode
          curList.add(contentSub)
        }
        this.loadMapData(adcode)
        this.areaData[curlevel] = curList
      }
    },
    search (area) {
      let obj = this.areaData[area]
      var option = obj[obj.options.selectedIndex]
      var keyword = option.text // 关键字
      var adcode = option.adcode
      this.cityNamemap = keyword
      this.cityCode = adcode
      this.$ba.trackEvent('echartsMap', '筛选地图', `${this.cityNamemap}-${this.cityCode}`)
      this.district.setLevel(option.value) // 行政区级别
      this.district.setExtensions('all')
      // 行政区查询
      // 按照adcode进行查询可以保证数据返回的唯一性
      this.district.search(adcode, (status, result) => {
        if (status === 'complete') {
          this.getData(result.districtList[0], obj.id, adcode)
        }
      })
    },
    // 业务入口接口
    async serversPass () {
      let data = await this.post('/WorkbenchApi/queryCurrentUserBusinessConfig')
      this.serversPassdata = data.data.data
      this.headArrMinisterial = data.data.data.statisticalType
      this.clickStatistics(data.data.data.statisticalType[0])
      if (this.serversPassdata.areaNameForMap && this.serversPassdata.areaIdForMap) {
        this.cityName =
          this.serversPassdata.areaNameForMap == '全国合计'
            ? '中国'
            : this.serversPassdata.areaNameForMap
        this.curCityName =
          this.serversPassdata.areaNameForMap == '全国合计'
            ? '中国'
            : this.serversPassdata.areaNameForMap
      }

      // 实例化zip对象
      this.citySelect = document.getElementById('city')
      this.districtSelect = document.getElementById('district')
      if (document.getElementById('map')) {
        this.echartsMap = this.$echarts.init(document.getElementById('map'))
        this.echartsMap.on('click', this.echartsMapClick)
      }

      this.opts = {
        subdistrict: 1, // 返回下一级行政区
        showbiz: true // 最后一级返回街道信息
      }
      this.district = new AMap.DistrictSearch(this.opts) // 注意：需要使用插件同步下发功能才能这样直接使用

      this.district.search(this.cityName, (status, result) => {
        if (status == 'complete') {
          this.areaIdForMap = this.areaIdForMap ? this.areaIdForMap.substring(0, 6) : ''

          this.getData(result.districtList[0], '', result.districtList[0].adcode)
          // this.getData(result.districtList[0], '', result.districtList[0].adcode)
        }
      })
    },
    // 业务点击事件
    async clickStatistics (item, areaId, par) {
      this.cTitle = item.configTitle
      this.qushi.chartDataqushi.rows = []
      this.chartData.rows = []
      let param = {}

      this.items = item
      if (areaId != '') {
        param = {
          areaId: areaId
        }
      }

      if (item) {
        this.url = item.configAdress
        if (this.url) {
          let data = await this.post(this.url, param)
          this.dataAll = data.data.data
          this.dataAll.degreeeducationCounts =
            this.dataAll.degreeeducationCounts.length > 0
              ? this.dataAll.degreeeducationCounts
              : [{ typeName: '暂无数据', childRatio: '' }]
          this.dataAll.areaCounts =
            this.dataAll.areaCounts.length > 0
              ? this.dataAll.areaCounts
              : [{ typeName: '暂无数据', childNum: '', childRatio: '' }]
          this.$nextTick(() => {
            this.dataAll = data.data.data
          })
          this.numberTip = parseInt(
            this.dataAll.areaCounts.length > 0 ? this.dataAll.areaCounts[0].childNum : 10
          )

          // await this.loadMapData(window.parent.indexTool.getUserInfo().areaCode)
          this.citySelect = document.getElementById('city')
          this.districtSelect = document.getElementById('district')
          if (document.getElementById('map')) {
            this.echartsMap = this.$echarts.init(document.getElementById('map'))
            this.echartsMap.on('click', this.echartsMapClick)
          }
          this.opts = {
            subdistrict: 1, // 返回下一级行政区
            showbiz: false // 最后一级返回街道信息
          }

          this.district = new AMap.DistrictSearch(this.opts) // 注意：需要使用插件同步下发功能才能这样直接使用
          this.district.search(this.curCityName, (status, result) => {
            if (status == 'complete') {
              this.areaIdForMap = this.areaIdForMap ? this.areaIdForMap.substring(0, 6) : ''
              this.getData(result.districtList[0], '', result.districtList[0].adcode)
            }

            if (par) {
              this.district.search(this.cityCode, (status, result) => {
                if (status === 'complete') {
                  this.getData(result.districtList[0], par.data.level, this.cityCode)
                }
              })
            }
          })

          // this.serversPass()
          // 健康分析
          if (this.dataAll.healthCounts) {
            // 请求回数据后执行加载图表的方法
            // this.health()
            this.ringdata.rows =
              this.dataAll.healthCounts.length > 0
                ? this.dataAll.healthCounts
                : [
                  {
                    areaId: null,
                    areaName: null,
                    typeName: '健康',
                    childNum: 0,
                    childRatio: 0
                  },
                  {
                    areaId: null,
                    areaName: null,
                    typeName: '非健康',
                    childNum: 0,
                    childRatio: 0
                  }
                ]
          }
          // 趋势分析
          if (this.dataAll.trendAnalysis) {
            this.qushi.chartDataqushi.rows = this.dataAll.trendAnalysis
          }
          // 性别占比
          if (this.dataAll.sexCounts) {
            this.dataAll.sexCounts.map((item) => {
              if (item.typeName == '男') {
                this.sexBoy = item.childRatio
              }
              if (item.typeName == '女') {
                this.sexGirl = item.childRatio
              }
              if (item.typeName == '其他') {
                this.sexOther = item.childRatio
              }
            })
          }
          // 地区人数排名
          if (this.dataAll.areaCounts) {
            this.chartData.rows = this.dataAll.areaCounts
          }
        }
      }
    },
    ministerial (tmp) {
      if (tmp == 'header') {
        this.china()
      }
      this.jiaoyu = []
      this.qushi = {
        chartDataqushi: {
          columns: ['typeName', 'childNum'],
          rows: [
            {
              areaId: null,
              areaName: null,
              typeName: '2020-01',
              childNum: 0,
              childRatio: null
            },
            {
              areaId: null,
              areaName: null,
              typeName: '2020-02',
              childNum: 0,
              childRatio: null
            },
            {
              areaId: null,
              areaName: null,
              typeName: '2020-03',
              childNum: 0,
              childRatio: null
            }
          ]
        },
        gridqushi: {
          top: '15%',
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        chartSettingsqushi: {
          area: true
        }
      }
      this.jiankang = [
        Math.ceil(Math.random() * 1000),
        Math.ceil(Math.random() * 1000),
        Math.ceil(Math.random() * 1000),
        Math.ceil(Math.random() * 1000)
      ]
      for (let i = 0; i < 10; i++) {
        this.jiaoyu.push(Math.ceil(Math.random() * 100))
      }
      this.xingbie = [(Math.random() * 100).toFixed(1), (Math.random() * 100).toFixed(1)]
      for (let i = 0; i < 10; i++) {
        this.diquone.push(Math.ceil(Math.random() * 1000))
        this.diqutwo.push(Math.ceil(Math.random() * 100))
      }
      this.stateArrMinisterial = [
        {
          type: '四川',
          new: 10000 + Math.ceil(Math.random() * 1000),
          old: 90 + Math.ceil(Math.random() * 10) + '%'
        },
        {
          type: '安徽',
          new: 9000 + Math.ceil(Math.random() * 1000),
          old: 80 + Math.ceil(Math.random() * 10) + '%'
        },
        {
          type: '湖南',
          new: 8000 + Math.ceil(Math.random() * 1000),
          old: 70 + Math.ceil(Math.random() * 10) + '%'
        },
        {
          type: '广西',
          new: 7000 + Math.ceil(Math.random() * 1000),
          old: 60 + Math.ceil(Math.random() * 10) + '%'
        },
        {
          type: '广东',
          new: 6000 + Math.ceil(Math.random() * 1000),
          old: 50 + Math.ceil(Math.random() * 10) + '%'
        },
        {
          type: '浙江',
          new: 5000 + Math.ceil(Math.random() * 1000),
          old: 40 + Math.ceil(Math.random() * 10) + '%'
        },
        {
          type: '河南',
          new: 4000 + Math.ceil(Math.random() * 1000),
          old: 30 + Math.ceil(Math.random() * 10) + '%'
        },
        {
          type: '黑龙江',
          new: 3000 + Math.ceil(Math.random() * 1000),
          old: 20 + Math.ceil(Math.random() * 10) + '%'
        },
        {
          type: '武汉',
          new: 2000 + Math.ceil(Math.random() * 1000),
          old: 10 + Math.ceil(Math.random() * 10) + '%'
        },
        {
          type: '内蒙古',
          new: 1000 + Math.ceil(Math.random() * 1000),
          old: Math.ceil(Math.random() * 10) + '%'
        }
      ]
      // if (this.dataAll.healthCounts) {
      //   this.health()
      // }
    },
    health () {
      this.seriesyibiao = [
        {
          type: 'gauge',
          center: ['30%', '40%'],
          title: {
            show: true,
            offsetCenter: [0, -30], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
            // 文字的颜色,默认 #333。
            color: '#666',
            fontSize: 15
          },
          axisLabel: {
            // 刻度标签。
            show: false // 是否显示标签,默认 true。
          },
          axisTick: {
            // 刻度(线)样式。
            show: false // 是否显示刻度(线),默认 true。
          },
          splitLine: {
            show: true,
            length: 7,
            lineStyle: {
              color: '#3A9FFF'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 5,
              shadowBlur: 0,
              color: [[0.7, '#379FFF'], [1, '#F2F2F4']]
            }
          },
          pointer: {
            // 指针粗细
            width: 0
          },
          detail: {
            show: true,
            offsetCenter: [0, 40],
            color: 'blue',
            formatter: function (params) {
              return Math.ceil(Math.random() * 100) + '%'
              // return Math.ceil(Math.random() * 1000) + '人\n\n' + Math.ceil(Math.random() * 100) + '%'
            },
            textStyle: {
              fontSize: 14,
              color: 'black',
              fontFamily: 'PingFangSC',
              fontWeight: 10
            }
          },
          data: [
            {
              name: this.dataAll.healthCounts[0].typeName,
              value: this.dataAll.healthCounts[0].childNum
            }
          ]
        }
      ]
      for (var i = 0; i < this.dataAll.healthCounts.length - 1; i++) {
        this.seriesyibiao.push({
          type: 'gauge',
          radius: '40%',
          center: ['75%', '20%'],
          title: {
            show: true,
            // name文字位置的移动
            offsetCenter: [0, 0], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
            // 文字的颜色,默认 #333。
            color: '#666',
            fontSize: 15
          },
          // 仪表的指针
          pointer: {
            show: true,
            length: '75%',
            width: 0 // 指针粗细
          },
          tooltip: {
            show: true,
            //  formatter: "{a} <br/>{b} {c}",
            backgroundColor: '#F7F9FB',
            borderColor: '#92DAFF',
            borderWidth: '1px',
            textStyle: {
              color: 'black'
            },
            formatter: function (param) {
              return '<em style="color:' + param.color + ';">残疾人数：' + param.value + '</em> '
            }
          },
          axisLabel: {
            // 刻度标签。
            show: false // 是否显示标签,默认 true。
          },
          axisTick: {
            // 刻度(线)样式。
            show: false // 是否显示刻度(线),默认 true。
          },
          // 小头
          splitLine: {
            show: false,
            length: 7,
            lineStyle: {
              color: '#3A9FFF'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 5,
              shadowBlur: 0,
              color: [[0.3, '#F3F3F7'], [0.7, '#51CA76'], [1, '#F3F3F7']]
            }
          },
          detail: {
            show: true,
            offsetCenter: [0, 30],
            color: '#ccc',
            formatter: function (params) {
              return Math.ceil(Math.random() * 100) + '%'
            },
            textStyle: {
              fontSize: 14,
              color: 'black',
              fontFamily: 'PingFangSC',
              fontWeight: 10
            }
          },
          data: [
            {
              name: this.dataAll.healthCounts[i + 1].typeName,
              value: this.dataAll.healthCounts[i + 1].childNum
            }
          ]
        })
      }
      this.yibiao = {
        datayibiao: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [{ 日期: '2018-01-01', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 }]
        },
        seriesyibiao: this.seriesyibiao,
        tooltip: {
          show: true,
          //  formatter: "{a} <br/>{b} {c}",
          backgroundColor: '#F7F9FB',
          borderColor: '#92DAFF',
          borderWidth: '1px',
          textStyle: {
            color: 'black'
          },
          formatter: function (param) {
            return '<em style="color:' + param.color + ';">健康人数：' + param.value + '</em> '
          }
        }
      }
    },
    async getMessage () {
      // 获取消息 2020年3月8日18点28分
      let res = await this.post('/WorkbenchApi/getMsgListCommon') // 无数据
      this.messgeLsit = res.data.data
    },
    async jumpPage (item) {
      if (item.msgType != '1') {
        // 2系统消息
        let param = {
          receivePersonId: item.receivePersonId,
          id: item.businessId
        }
        let res = await this.post('/MsgRemindApi/updateNoReadStatusByMsgPerson', param)

        this.getMessage()
        item.url = item.jumpTypeUrl + '&approveStatus=' + item.approveStatus
        Base.openTabMenu(item)
      } else {
        item.id = '1000000000000161797'
        item.url = 'children.html#/contactsMessageList'
        item.name = '通知公告'
        Base.openTabMenu(item)
      }
    },

    goLookAll () {
      // 更多-->消息历史
      let item = {}
      item.id = '1000000000000164733'
      item.name = '消息历史'
      item.url = 'children.html#/LookAllMessage'
      Base.openTabMenu(item)
    },
    loadData () {
      this.agencylist = []
      this.show = false
      this.showTwo = false
    },
    // 下载操作手册文件
    // downloadFile () {
    //   // window.location.href="http://192.168.5.121:8080/static/操作手册.doc"
    // },
    getImgUrl (obj, index) {
      let i = index % 16
      let srcL = this.imgwurenList[i]
      return srcL
    },
    getImgUrlList (obj) {
      let srcL = this.statisticsList[obj.configValue]
      return srcL
    },
    getAreaLevel () {
      // 区县\
      if (window.parent.indexTool.getUserInfo().areaLevel == '3') {
        this.show = true
        this.showTwo = true
        this.getNoDoCountList()
      } else if (window.parent.indexTool.getUserInfo().areaLevel == '4') {
        // 乡镇
        // this.getMsgList()
        this.show = false
        this.showTwo = false
      }
    },
    async getCode () {
      Base.submit(null, {
        url: 'codetable/getCode', // url
        data: { codeType: 'WORKTABLEJUMP' }
      }).then((data) => { })
    },
    // 获取图片
    async getimgsrc (item) {
      let imgsrc = ''
      //   let res = await this.post('/file/getFileUrls', {
      //     returnFileIds: item.configIcon
      //   })
      imgsrc = window.faceConfig.basePath + '/file/getFileFromDfs/' + item.configIcon
      Vue.set(item, 'imgsrc', imgsrc)
      return imgsrc
    },
    async getNum (e) {
      let url = '/' + e.configQueryAdress
      let res = null
      if (e) {
        res = await this.post(url)
      }
      return res ? res.data.data : {}
    },
    // 业务配置，当前登录人
    async getCurrentUser () {
      var that = this
      this.post('/WorkbenchApi/queryCurrentUserBusinessConfig', {}).then((data) => {
        let todoType = data.data.data.todoType
        let todoTypeTemp = []
        let temp = {}
        let imgsrc = require('./imgs/img8.png')
        todoType.forEach(async (e) => {
          let temp = []
          temp.name = e.configTitle
          temp.id = e.configAdress.split('?')[1]
            ? e.configAdress.split('?')[1].substring(15, e.configAdress.split('?')[1].length)
            : ''
          temp.url = e.configAdress.split('?')[0]
          if (e.configIcon) {
            imgsrc = await this.getimgsrc(e)
          }
          Vue.set(temp, 'src', imgsrc)
          if (e.configQueryAdress) {
            temp.noDoCount = await this.getNum(e)
          }
          todoTypeTemp.push(temp)
        })

        this.copyagencylist = todoTypeTemp
        this.statisticalTypeList = []
        this.businessTypeList = []
        this.businessTypeList = data.data.data.businessType
        this.statisticalTypeList = data.data.data.statisticalType
      })
    },
    // 数据展示----获取事实无人抚养
    async getQueryCurFact (url) {
      let data = {}
      if (url) {
        data = await this.post(url, {})
      }
      return data
    },
    async getChildAddCount () {
      Base.submit(null, {
        url: '/factNoOneRaisedWholeApi/queryMonthNewAddFactNoOneRaisedChildCount', // url
        data: {}
      }).then((data) => {
        this.childAddCount = data.data.data
      })
    },
    // 待办事项--区县
    async getNoDoCountList () {
      Base.submit(null, {
        url: '/WorkbenchApi/getNoDoCountList', // url
        data: { areaCode: window.parent.indexTool.getUserInfo().areaCode }
      }).then((data) => {
        this.agencylist = []
        data.data.data.map((item, index) => {
          if (item.noDoCount == 0 || item.noDoCount == null) {
            // this.msgList.splice(index, 1)
          } else {
            this.agencylist.push(item)
          }
        })
        if (this.agencylist.length == 0) {
          this.show = false
          this.showTwo = true
        }
      })
    },
    // 消息提醒--乡镇 /WorkbenchApi/getMsgList
    async getMsgList () {
      Base.submit(null, {
        url: '/WorkbenchApi/getMsgList', // url
        data: { receivePersonId: window.parent.indexTool.getUserInfo().userId }
      }).then((data) => {
        // this.msgList = data.data.data
        this.msgList = []
        data.data.data.map((item, index) => {
          if (
            (item.passCount == 0 || item.passCount == null) &&
            (item.rejectCount == 0 || item.rejectCount == null)
          ) {
            // this.msgList.splice(index, 1)
          } else {
            this.msgList.push(item)
          }
        })
        if (this.msgList.length == 0) {
          this.show = true
          this.showTwo = false
        }
      })
    },
    informationCollectionFun (obj) {
      let item = {}
      let strs = obj.configAdress.split('?')[1]
      item.id = strs.substring(15, strs.length)
      item.name = obj.configTitle
      item.url = obj.configAdress
      Base.openTabMenu(item)
    },

    // 最新消息（驳回、通过）点击事件
    rejectClick (obj, e) {
      let item = {}
      if (e == '0') {
        item.id = '3'
      } else if (e == '1') {
        item.id = '4'
      }
      item.name = obj.tabName
      item.url = obj.jumpTypeUrl
      this.returnPage(item)
    },
    appClick (obj, index) {
      let item = {}
      item.id = index + 1
      item.name = obj.tabName
      item.url = obj.jumpTypeUrl
      this.returnPage(item)
    },
    gopage (obj, index) {
      // copyagencylist
      let item = {}
      item.id = obj.id
      item.name = obj.name
      item.url = obj.url
      this.returnPage(item)
    },
    returnPage (obj) {
      Base.openTabMenu(obj)
    },
    setRightData2 () {
      this.marryAgeOption = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (a) {
            let str =
              '<div style="background-color:#fff;color:#000;padding:10px;margin:-5px;box-shadow: 5px 5px 15px rgba(0,0,0,0.2)"><div><i style="display: inline-block;width: 10px;height: 10px;background: ' +
              a.color +
              ';margin-right: 5px;border-radius: 50%;}"></i><span style="display:inline-block;">' +
              a.name +
              '</div><p style="padding-left:15px;">' +
              a.value +
              '</p></div>'
            return str
          }
        },
        legend: {
          padding: [0, 15, 0, 0],
          icon: 'circle',
          orient: 'vertical',
          right: 'left',
          y: 'center',
          data: [
            '收养登记',
            '明天计划',
            '孤儿助学',
            '事实无人抚养儿童',
            '孤儿生活保障',
            '未成年人保护'
          ]
        },
        series: [
          {
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            roseType: 'radius',
            type: 'pie',
            radius: '85%',
            center: ['30%', '55%'],
            data: [
              {
                value: Math.ceil(Math.random() * 10),
                name: '收养登记'
              },
              {
                value: Math.ceil(Math.random() * 10),
                name: '明天计划'
              },
              {
                value: Math.ceil(Math.random() * 10),
                name: '孤儿助学'
              },
              {
                value: Math.ceil(Math.random() * 10),
                name: '事实无人抚养儿童'
              },
              {
                value: Math.ceil(Math.random() * 10),
                name: '孤儿生活保障'
              },
              {
                value: Math.ceil(Math.random() * 10),
                name: '未成年人保护'
              }
            ],
            color: ['#F2637B', '#54A5D8', '#63C8BD', '#4DCB73', '#E7A94A', '#C0A0F3'],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.marryAgeOptionMinisterial = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (a) {
            let str =
              '<div style="background-color:#fff;color:#000;padding:10px;margin:-5px;box-shadow: 5px 5px 15px rgba(0,0,0,0.2)"><div><i style="display: inline-block;width: 10px;height: 10px;background: ' +
              a.color +
              ';margin-right: 5px;border-radius: 50%;}"></i><span style="display:inline-block;">' +
              a.name +
              '</div><p style="padding-left:15px;">' +
              a.value +
              '</p></div>'
            return str
          }
        },
        legend: {
          padding: [0, 15, 0, 0],
          icon: 'circle',
          orient: 'vertical',
          right: 'left',
          y: 'center',
          data: ['0-5岁', '6-13岁', '14-16岁']
        },
        series: [
          {
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            roseType: 'radius',
            type: 'pie',
            radius: '85%',
            center: ['30%', '55%'],
            data: [
              {
                value: Math.ceil(Math.random() * 10),
                name: '0-5岁'
              },
              {
                value: Math.ceil(Math.random() * 10),
                name: '6-13岁'
              },
              {
                value: Math.ceil(Math.random() * 10),
                name: '14-16岁'
              }
            ],
            color: ['#F2637A', '#56A4D7', '#65C9BE'],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    getChartData () {
      this.appointAndHandleData = [
        [
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10)
        ],
        [
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10)
        ],
        [
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10)
        ],
        [
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10)
        ],
        [
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10)
        ],
        [
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10),
          Math.ceil(Math.random() * 10)
        ]
      ]
      this.timeRange = [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ]
      this.xAxis = [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: this.timeRange
        }
      ]
      this.series = []
      this.appointAndHandleData.map((item, index) => {
        this.series.push({
          name: this.legend.data[index],
          type: 'bar',
          color: this.colorAll[index],
          data: this.appointAndHandleData[index]
        })
      })
      let that = this
      this.tooltip = {
        trigger: 'axis',
        formatter: function (a) {
          let list = []
          let listItem = ''
          for (var i = 0; i < a.length; i++) {
            let str =
              '<div style="line-height:24px;"><i style="display: inline-block;width: 8px;height: 8px;background: ' +
              a[i].color +
              ';margin-right: 5px;border-radius: 50%;}"></i><span style="display:inline-block;">' +
              a[i].seriesName +
              '</span>&nbsp;&nbsp;' +
              '<span style="font-weight:1000;">' +
              that.appointAndHandleData[i][a[0].dataIndex] +
              '</span></div>'
            listItem += str
          }
          return (
            '<div style="background-color:#fff;color:#000;padding:10px;margin:-5px;box-shadow: 5px 5px 15px rgba(0,0,0,0.2)"><div class="showBox">' +
            listItem +
            '</div></div>'
          )
        }
      }
    },
    async china (e) {
      this.indexP = 0
      this.chartSettings.position = 'china'
      this.cityName = this.curCityName // '中国'// this.curCityName//
      this.cityNamemap = this.curCityName
      this.citySelect = document.getElementById('city')
      this.districtSelect = document.getElementById('district')
      if (document.getElementById('map')) {
        this.echartsMap = this.$echarts.init(document.getElementById('map'))
        this.echartsMap.on('click', this.echartsMapClick)
      }
      this.opts = {
        subdistrict: 1, // 返回下一级行政区
        showbiz: false // 最后一级返回街道信息
      }
      this.district = new AMap.DistrictSearch(this.opts) // 注意：需要使用插件同步下发功能才能这样直接使用

      if (this.url) {
        //* **************************************** */
        let data = await this.post(this.url) //, param)
        this.dataAll = data.data.data
        await this.$nextTick(() => {
          this.dataAll = data.data.data
        })
        this.dataAll.degreeeducationCounts =
          this.dataAll.degreeeducationCounts.length > 0
            ? this.dataAll.degreeeducationCounts
            : [{ typeName: '暂无数据', childRatio: '' }]
        this.dataAll.areaCounts =
          this.dataAll.areaCounts.length > 0
            ? this.dataAll.areaCounts
            : [{ typeName: '暂无数据', childNum: '', childRatio: '' }]
        this.numberTip = parseInt(
          this.dataAll.areaCounts.length > 0 ? this.dataAll.areaCounts[0].childNum : 10
        )

        // await this.loadMapData(window.parent.indexTool.getUserInfo().areaCode)
        this.citySelect = document.getElementById('city')
        this.districtSelect = document.getElementById('district')
        if (document.getElementById('map')) {
          this.echartsMap = this.$echarts.init(document.getElementById('map'))
          this.echartsMap.on('click', this.echartsMapClick)
        }
        this.opts = {
          subdistrict: 1, // 返回下一级行政区
          showbiz: false // 最后一级返回街道信息
        }

        this.district = new AMap.DistrictSearch(this.opts) // 注意：需要使用插件同步下发功能才能这样直接使用

        await this.district.search(this.curCityName, (status, result) => {
          if (status == 'complete') {
            this.areaIdForMap = this.areaIdForMap.substring(0, 6)

            this.getData(result.districtList[0], '', result.districtList[0].adcode)
          }
        })

        // this.serversPass()
        // 健康分析
        if (this.dataAll.healthCounts) {
          // 请求回数据后执行加载图表的方法
          // this.health()
          this.ringdata.rows =
            this.dataAll.healthCounts.length > 0
              ? this.dataAll.healthCounts
              : [
                {
                  areaId: null,
                  areaName: null,
                  typeName: '健康',
                  childNum: 0,
                  childRatio: 0
                },
                {
                  areaId: null,
                  areaName: null,
                  typeName: '非健康',
                  childNum: 0,
                  childRatio: 0
                }
              ]
        }
        // 趋势分析
        if (this.dataAll.trendAnalysis) {
          this.qushi.chartDataqushi.rows = this.dataAll.trendAnalysis
        }
        // 性别占比
        if (this.dataAll.sexCounts) {
          await this.dataAll.sexCounts.map((item) => {
            if (item.typeName == '男') {
              this.sexBoy = item.childRatio
            }
            if (item.typeName == '女') {
              this.sexGirl = item.childRatio
            }
            if (item.typeName == '其他') {
              this.sexOther = item.childRatio
            }
          })
        }
        // 地区人数排名
        if (this.dataAll.areaCounts) {
          this.chartData.rows = this.dataAll.areaCounts
        }
        //* ******************************************** */
      }
    },
    sekuaiLeft () {
      let datastatisticslist_box = document.getElementById('datastatisticslist_box')
      let leftVal = parseInt(datastatisticslist_box.style.marginLeft || 0)
      let listone = document.getElementsByClassName('listone')
      if (leftVal < 0) {
        datastatisticslist_box.style.marginLeft = leftVal + 180 + 'px'
      }
    },
    sekuaiRight () {
      let datastatisticslist_box = document.getElementById('datastatisticslist_box')
      let rightVal = parseInt(datastatisticslist_box.style.marginLeft || 0)
      datastatisticslist_box.style.marginLeft = rightVal - 180 + 'px'
    }
  }
}
</script>
<style scoped>
body,
html {
  height: 100%;
}
li {
  list-style: none;
}
.logionout {
  display: flex;
  align-items: center;
  padding: 0 18px;
}
.logo {
  margin-top: 2px;
  width: 40px;
}
.logo1 {
  margin-left: 14px;
  margin-right: 100px;
}
#cots {
  width: 100%;
  height: 100%;
  background: #eff1f4;
}
.contss {
  width: 100%;
  height: 100%;
  /* background: #fff; */
}
.leftMenu {
  width: 60%;
  height: 100%;
  float: left;
}
.leftTop {
  width: 100%;
  height: 40%;
  background: #fff;
}
.leftBtm {
  margin-top: 20px;
  width: 100%;
  height: calc(60% - 20px);
  background: #fff;
}
.content {
  width: calc(40% - 20px);
  float: right;
  height: 100%;
}
.contins {
  padding: 0;
  background: transparent;
  width: 100%;
  height: 99%;
}
.worktitle {
  width: 100%;
  height: 52px;
  border-bottom: 1px solid rgba(226, 227, 228, 1);
  font-size: 16px;
  font-weight: bold;
  line-height: 52px;
  color: rgba(8, 121, 217, 1);
  padding: 0 18px 0 26px;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #0879d9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.contleft {
  width: 100%;
  height: calc(100% - 52px);
  margin: auto;
  display: flex;
  align-items: center;
  padding-left: 60px;
}
.contleft ul {
  display: flex;
  width: 100%;
  height: 80%;
  padding: 0;
  /* white-space: nowrap;
  overflow: hidden;
  align-items: center; */
}
.contleft ul li {
  height: 100%;
  width: 18%;
}
.contleft3 ul li:hover {
  width: 20%;
  height: 98%;
  transition: 1s;
}
.contleft3 ul li:hover .classEnter {
  height: 110%;
  transition: 1s;
}

.contleft2 ul li {
  height: 100%;
  width: 22%;
  margin-right: 18px;
}
.agency {
  width: 100%;
  height: 49%;
  /* min-height: 280px; */
  display: flex;
  background: #fff;
  justify-content: space-between;
}
.agencycont {
  width: 100%;
  background: rgba(255, 255, 255, 1);
}
.agency ul {
  padding: 0 10px;
  box-sizing: border-box;
}
.zanwu {
  width: 100%;
  height: calc(100% - 52px);
  font-size: 16px;
  display: flex;
  align-items: center;
}
.zanwu p {
  width: 100%;
  text-align: center;
}
.agency ul li {
  list-style: none;
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}
.texts {
  margin-left: 13px;
  display: flex;
  /* cursor: pointer; */
}
.classEnter {
  /* width: 130px; */
  height: 100%;
  margin: 8px 8px;
  border: 1px solid #cfcfdf;
  border-radius: 8px;
  cursor: pointer;
}
/* .classEnter:hover,
.classEnterClick {
  border: 1px solid #cfcfdf;
  box-shadow: 0px 0px 8px 0px #d8e0fc;
  width: 140px;
  height: 180px;
  transition: 1s;
}
.classEnter:hover .informationCollection img {
  margin: 30px 45px 30px 45px;
  transition: 1s;
} */
.enterText {
  width: 90%;
  margin: 0 auto;
  white-space: normal;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  /* line-height: 22px; */
  /* color: rgba(106, 143, 245, 1); */
  color: rgba(0, 0, 0, 0.8);
  opacity: 1;
  /* margin-top: 38px; */
}
.zanwuyewu {
  width: 100%;
  text-align: center;
  height: 25px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 25px;
  color: #c4c4cc;
  opacity: 1;
}
.informationCollection,
.informationChange,
.informationChangeStatus,
.fundsToIssue,
.shangbao,
.biangeng,
.zhuangtai,
.shouyang11,
.shouyang12,
.shouyang13,
.shouyang14,
.zonghechaxun,
.zijin,
.zhuangtaiStatus,
.shouyang15,
.fuli11,
.fuli12,
.fuli13,
.fuli14,
.fuli15,
.fuli16,
.fuli17,
.fuli18,
.fuli19 {
  width: 100%;
  height: 100%;
  /* position: relative;
  margin-left: 50%;
  left: -30px;
  margin-top: 20px;
  margin-bottom: 20px; */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  /* float: left; */
}
.informationCollection img {
  width: 50px;
}
/* .informationCollection {
  background: url("./imgs/wurencaiji.png") no-repeat center center;
} */

/* .classEnter:hover .informationCollection {
  background: url("./imgs/wurencaiji_hover.png") no-repeat center center;
} */
/* .informationChange {
  width: 60px;
  height: 60px;
   position: relative;

  margin: 18px 34px 18px 35px;
  float: left;
} */
/* 数据展示 */
.classSee02-01,
.classSee02-02,
.classSee02-03,
.classSee02-04,
.classSee01-01,
.classSee01-02,
.classSee01-03,
.classSee01-04 {
  width: 100%;
  height: 252px;
  /* border: 1px solid #668ff5ff; */
  border-radius: 8px;
  padding-top: 1px;
}
.classSee02-01,
.classSee01-01,
.classSee02-02,
.classSee01-02,
.classSee02-04,
.classSee01-04 {
  background-color: #f3f3f5;
}
.classSee02-03,
.classSee01-03 {
  background: url("./images/bg3.png") no-repeat center center;
  background-size: cover;
}
.classSee {
  width: 100%;
  height: 252px;
  /* border: 1px solid #668ff5ff; */
  border-radius: 8px;
  padding-top: 1px;
  background-color: #f3f3f5;
  color: #333;
}
.classSeeshow {
  background: url("./images/bg3.png") no-repeat center center;
  background-size: cover;
}

.fundsToIssue1,
.fundsToIssue2,
.fundsToIssue3,
.fundsToIssue4,
.shouyang1,
.shouyang2,
.shouyang3,
.shouyang4,
.fuli1,
.fuli2,
.fuli3,
.fuli4 {
  width: 80px;
  height: 80px;
  text-align: center;
  /* position: relative;
  margin-left: 50%;
  left: -40px;
  margin-top: 29px;
  margin-bottom: 29px; */
  margin: 29px auto;
}
.fundsToIssue1 img {
}
.shuText,
.shuTextThree {
  width: 100%;
  padding: 0 10px;
  margin: auto;
  height: 19px;
  white-space: normal;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 18px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.shuTextTwo {
  width: 100%;
  height: 50px;
  text-align: center;
  font-family: DIN Next LT Pro;
  font-weight: bold;
  line-height: 50px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.num {
  font-size: 30px;
}
.texnum {
  color: rgba(255, 19, 19, 1);
  display: inline-block;
  cursor: pointer;
  margin-left: 5px;
}
.texnumPass {
  color: #428108;
  display: inline-block;
  /* margin-right: 10px; */
  cursor: pointer;
}
.agencycont ul li p {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.textsname {
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 5px;
}
.textsnum {
  margin-right: 5px;
}
.noyw {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(205, 205, 213, 1);
}
.noyw img {
  margin: 48px 0 20px;
}
.datadatastatistics {
  height: 100%;
}

.datadatastatisticstop {
  width: 100%;
  height: 40px;
  /* background:rgba(98,191,202,1); */
  box-shadow: 0px 3px 43px 0px rgba(55, 52, 54, 0.14);
  border-radius: 4px;
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  /* color: rgba(98,191,202,1); */
  /* border-bottom: 3px solid rgba(98,191,202,1); */
}
.datadatastatisticstop img {
  width: 32px;
  margin: 0 5px 0 15px;
}
.ywselected {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
}
.datastatisticslist {
  min-width: 100%;
  width: 5000px;
  /* height: calc(100% - 48px); */
  /* display: flex;
  align-items: center;
  justify-content: flex-start; */
  padding: 17px 10px 30px;
  height: 160px;
}

.nomore {
  font-size: 16px;
}
.listone {
  /* width: 22%;
  color: rgba(255, 255, 255, 1);

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 0 10px 30px;

  margin-right: 3%;
  border-radius: 10px; */

  /* width: 22%; */
  min-width: 210px;
  height: 128px !important;
  color: rgba(255, 255, 255, 1);
  /* padding-left: 30px; */
  height: 100%;
  /* display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: distribute;
  justify-content: space-around; */
  padding: 12px;
  /* margin-right: 2%; */
  margin-right: 20px;
  border-radius: 10px;
  float: left;
}
.listone:last-child {
  margin-right: 0;
}
.title {
  font-size: 18px;
  font-weight: 400;
  /* margin-top:15px; */
  white-space: nowrap;
}
.addnum {
  font-size: 14px;
  /* margin:12px 0 14px 0; */
}
.addnumspan {
  font-size: 16px;
  font-weight: bold;
  margin-left: 16px;
  margin-right: 10px;
}
.total {
  font-size: 30px;
  font-family: Adobe Heiti Std;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.total span {
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  margin-left: 8px;
}
.list0 {
  /* background:rgba(97,131,246,1); */
  background: linear-gradient(
    180deg,
    rgba(82, 138, 195, 1) 0%,
    rgba(120, 173, 226, 1) 100%
  );
  /* background-image:url(imgs/gztfk2101.png)
    */
  /* background-image:url(imgs/img2.png) no-repeat 5px 5px; */
}
.imgkk {
  /* background: url(imgs/gztfk2101.png) no-repeat 49px 11px; */
  height: 111%;
  width: 108%;
}
.list1 {
  /* background:rgba(83,137,194,1); */
  background: linear-gradient(
    180deg,
    rgba(234, 162, 96, 1) 0%,
    rgba(245, 211, 135, 1) 100%
  );
}
.list2 {
  /* background:rgba(242,182,128,1); */
  background: linear-gradient(
    180deg,
    rgba(99, 180, 240, 1) 0%,
    rgba(100, 199, 244, 1) 100%
  );
}
.list3 {
  /* background:rgba(83,137,194,1); */
  background: linear-gradient(
    180deg,
    rgba(82, 138, 195, 1) 0%,
    rgba(120, 173, 226, 1) 100%
  );
}
.list4 {
  /* background:rgba(126,197,250,1); */
  background: linear-gradient(
    180deg,
    rgba(97, 132, 246, 1) 0%,
    rgba(118, 175, 232, 1) 100%
  );
}
.list5 {
  /* background:rgba(82,174,154,1); */
  background: linear-gradient(
    180deg,
    rgba(81, 175, 155, 1) 0%,
    rgba(88, 206, 161, 1) 100%
  );
}
.list6 {
  /* background:rgba(97,131,246,1); */
  background: linear-gradient(
    180deg,
    rgba(82, 138, 195, 1) 0%,
    rgba(120, 173, 226, 1) 100%
  );
}
.list7 {
  /* background:rgba(83,137,194,1); */
  background: linear-gradient(
    180deg,
    rgba(234, 162, 96, 1) 0%,
    rgba(245, 211, 135, 1) 100%
  );
}
.list8 {
  /* background:rgba(83,137,194,1); */
  background: linear-gradient(
    180deg,
    rgba(82, 138, 195, 1) 0%,
    rgba(120, 173, 226, 1) 100%
  );
}
.list9 {
  /* background:rgba(126,197,250,1); */
  background: linear-gradient(
    180deg,
    rgba(81, 175, 155, 1) 0%,
    rgba(88, 206, 161, 1) 100%
  );
}
.datadatastatisticcont {
  height: calc(36%-40px);
  padding: 8px;
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 16px;
}
/* .datadatastatisticcont {
  height: 20%;
  width: 100%;
  overflow-x: scroll;
  border: 1px solid red;
  box-sizing: border-box;
  div {
    width: 300%;
    height: 90%;
    border: 1px solid black;

    div {
      width: 25%;
      height: 90%;
      border: 1px solid blue;
      float: left;
      box-sizing: border-box;
    }
  }
} */
.msg {
  width: 100%;
  /* height:calc(100% - 272px); */
  margin-top: 14px;
  /* height: calc(82% - 54px); */
  height: 250px;
  display: flex;
}
.msglefttop {
  /* background:rgba(130,154,238,1); */
  background: linear-gradient(
    90deg,
    rgba(141, 166, 250, 0.15) 0%,
    rgba(126, 194, 252, 0.15) 100%
  );
  display: flex;
  justify-content: space-between;
}
.msglefttop span {
  margin-right: 15px;
  font-size: 16px;
  color: rgba(0, 79, 153, 1);
  opacity: 1;
}
.msgleft {
  width: 56%;
  margin-right: 15px;
  height: 100%;
  background: #fff;
  border-radius: 4px;
}
.msgrighttop {
  /* background:rgba(151,192,173,1); */
  background: linear-gradient(
    90deg,
    rgba(21, 216, 186, 0.15) 0%,
    rgba(69, 208, 202, 0.15) 100%
  );
  display: flex;
  justify-content: space-between;
}
.msgrighttop span {
  margin-right: 15px;
  font-size: 16px;
  color: rgba(16, 144, 119, 1);
}
.msgrighttop1 {
  display: flex;
  justify-content: space-between;
}
.msgrighttop1 span {
  margin-right: 15px;
  font-size: 16px;
}
.msgright {
  width: calc(44% - 15px);
  background: #fff;
}
.msgleftlist {
  width: 100%;
  height: calc(100% +100px);
  padding-right: 20px;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30px;
}
.msgleftlistone {
  height: 25%;
  width: 25%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 40px;
  cursor: pointer;
}
.msglist {
  width: 100%;
}
.imgs {
  width: 60px;
  position: relative;
  margin-bottom: 15px;
}
.imgs img {
  width: 100%;
}
.imgnums {
  position: absolute;
  right: -40px;
  top: -6px;
  width: 40px;
  height: 26px;
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(240, 157, 61, 1);
  border-radius: 10px;
  text-align: center;
}
.msglistone li {
  margin-top: 20px;
  font-size: 14px;
  color: rgba(51, 51, 51, 1);
}
table > tr:nth-of-type(even) {
}

table > tr:nth-of-type(odd) {
  background-color: #ecebec;
}
.table {
  /*color: #000c17;*/
}
.table > tr:nth-of-type(even) {
  background-color: #f2f8ff;
}

.table > tr:nth-of-type(odd) {
  background-color: white;
}
/*  //饼图*/

.con-right-chart2 {
  padding: 0 15px;
  box-sizing: border-box;
}
/*  柱图*/

.chart1 {
  width: 99.5%;
  padding: 24px 24px 0;
}
.redcol {
  color: #fff;
  font-weight: bold;
}
.grecol {
  color: #fff;
  font-weight: bold;
}
.fr {
  float: right;
}
/*//部级样式*/
.box_topItem {
  width: 14%;
  height: 100%;
  background-color: #e6ecff;
  padding-left: 1%;
  padding-top: 0.5%;
  color: black;
}
.box_topItem:hover {
  cursor: pointer;
  background-color: #4a84fb;
  color: white;
}
.box_body {
  width: 100%;
  overflow: auto;
  height: 895px;
  display: flex;
  justify-content: space-between;
  /* //calc(100% - 100px); */
}
.box_body_left {
  width: 20%;
  height: 100%;
}
.box_body_middle {
  width: 55%;
  height: 100%;
  background: #fff;
  margin: 0 16px;
  padding: 16px;
}
.box_body_right {
  width: 25%;
  height: 100%;
}
.box_body_right > div {
  background: white;
  padding: 16px;
  overflow: auto;
}

.box_body_right > div:nth-child(1) {
  overflow: hidden;
  height: 100px;
}
.box_body_right > div:nth-child(2) {
  background: white;
  padding: 16px;
  overflow: auto;
  margin: 16px 0;
  height: 167px;
}
.box_body_right > div:nth-child(3) {
  height: calc(100% - 300px);
  overflow: hidden;
}

.floatDiv {
  position: fixed;
}
/* @import "./demo-center.css"; */
.input-card {
  position: fixed;
  top: 10px;
  left: 10px;
  height: 300px;
  background: rgba(0, 0, 0, 0.1);
}
.maprange {
  position: absolute;
  z-index: 1000;
}
#map {
  width: 100%;
  height: 100vh;
}
.tips {
  position: fixed;
  bottom: 30%;
  left: 40%;
  padding: 10px 15px;
  border-radius: 5px;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
}
.datastatistics_box {
  overflow: hidden;
  padding: 0 20px;
}
.datastatistics_box {
  position: relative;
  background: #fff;
}
.datastatistics_left {
  position: absolute;
  left: 0;
  top: 0;
  padding-top: 70px;
  height: 100%;
  font-size: 24px;
  background: #fff;
}
.datastatistics_right {
  position: absolute;
  right: 0;
  padding-top: 70px;
  top: 0;
  height: 100%;
  font-size: 24px;
  background: #fff;
}
.ta-loading {
  display: none;
}
.__fix-style__ {
  background-color: #eff1f5;
  box-sizing: border-box;
  padding: 16px;
}
.__bbl1__ {
  background: #fff;
  padding: 16px;
  margin-bottom: 16px;
  height: 284px;
}
.__bbl2__ {
  background: #fff;
  padding: 16px;
  overflow: auto;
  height: calc(100% - 300px);
  overflow: hidden;
}
.__f-jyfx__ {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.__jyfx__ {
  width: 47%;
  height: 23%;
  background: linear-gradient(
    180deg,
    rgba(0, 199, 216, 1) 0%,
    rgba(0, 119, 221, 1) 100%
  );
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  color: white;
  margin-right: 2px;
  display: flex;
  padding: 20px 0;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
}
.__jyfx-n__ {
  background: none;
  box-shadow: none;
}
</style>
