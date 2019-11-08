<template>
  <swiper :options="swiperOptionAGV4" class="swiper-box">
    <swiper-slide class="swiper-item flex">
      <div class="coverBox">
        <div class="productBg"></div>
        <div class="coverBottom">
          <div class="coverLinBox flex">
            <div class="circle flex">
              <span></span>
            </div>
            <div class="line"></div>
          </div>
          <div class="coverTitleBox flex">
            <div class="noneBox"></div>
            <div class="titleBox">
              <h1>激光SLAM叉车</h1>
              <h5>LIDAR SLAM NAVIGATION FORKLIFT</h5>
            </div>
          </div>
        </div>
        <div class="logoBox"></div>
      </div>  
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <contents :titles="contentsBoj"></contents>
    </swiper-slide>
    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[0]"></headerTitle>
        <div class="centerBgBox">
          <div class="formItem formHead flex">
            <div class="headItem" v-for="(headItem, index) in headList" :key="index">{{headItem.name}}</div>
          </div>
          <div class="formItem formBody flex" v-for="(accItem, index) in accessories" :key="index">
            <div class="headItem">{{index+1}}</div>
            <div class="headItem">{{accItem.name}}</div>
            <div class="headItem">{{accItem.manufacturers}}</div>
            <div class="headItem">{{accItem.specs}}</div>
            <div class="headItem">{{accItem.num}}</div>
            <div class="headItem">件</div>
          </div>
        </div>
        
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[1]"></headerTitle>
        <div class="centerBgBox">
          <div class="paramesBox flex">
            <div class="params flex" v-for="(param, index) in params" :key="index">
              <div class="paramsTitle">{{param.title}}</div>
              <div class="paramsBody">{{param.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[2]"></headerTitle>
        <div class="centerBox internalBg"></div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[3]"></headerTitle>
        <div class="centerBgBox">
          <div class="bootAndUse">
            <p>确认AGV开机是否在建图原点，开机后约等待15秒</p>
            <p>按下急停后，观察灯带闪烁红色；再次按下急停，观察等待闪烁蓝色即完成开机</p>
            <div class="useBox">
              <div class="useList flex">
                <div>灯带灯光</div>
                <div>熄灭</div>
                <div>红</div>
                <div>黄</div>
                <div>绿</div>
              </div>
              <div class="useList flex">
                <div>运行状态</div>
                <div>关机</div>
                <div>故障</div>
                <div>报警</div>
                <div>正常</div>
              </div>
            </div>
            <p>1、将手机或平板连接wifi热点。wifi名称为：hitrobot-***(***为机器人编号，如hitrobot-a23de01)  wifi密码为：hitrobot</p>
            <p>2、打开客户端（手机、平板或看板）的浏览器。推荐谷歌（Chrome） 火狐（Firefox）在地址栏输入机器人地址：10.42.0.1</p>
            <p>具体操作请<router-link :to="{path: '/upperMachine'}">点击连接</router-link></p>
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[4]"></headerTitle>
        <div class="centerBgBox">
          <div class="bootAndUse">
            <p>确认AGV回到停靠位置，先关闭电源，再按下急停按钮；灯带熄灭即完成关机</p>
            <div class="useBox">
                <div class="useList flex">
                  <div>粉尘等级(GB/T5817-2009)</div>
                  <div>0级</div>
                  <div>I级</div>
                  <div>II级</div>
                </div>
                <div class="useList flex">
                  <div>激光雷达清洁周期</div>
                  <div>30天</div>
                  <div>7天</div>
                  <div>1天</div>
                </div>
              </div>
              <p>定期用配件专用擦拭布清洁激光雷达，以达到最好的导航效果</p>
              <p>在现场环境恶劣的情况下，请酌情缩短激光雷达擦拭周期</p>
            </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[6]"></headerTitle>
        <div class="centerBgBox">
          <div class="bootAndUse">
            <p>1、AGV不能用来运送人；</p>
            <p>2、运动地面必须保持干燥；</p>
            <p>3、规划好的路线中不宜出现不必要的物体；</p>
            <p>4、地面倾斜度不能超过5°；</p>
            <p>5、AGV不能淋雨或潮湿；</p>
            <p>6、拆卸电控箱前请先关闭主电源；</p>
            <p>7、AGV部件不能拆开单独使用；</p>
            <p>8、只使用原装充电器和电池；</p>
            <p>9、环境发生变化后建议更新地图；</p>
            <p>10、不应当在AGV路径边缘区域操作或用其他方式进行不恰当的操作；</p>
            <p>11、所有搭载在AGV顶部的配件和载荷要紧固正确，符合规范要求；</p>
            <p>12、保证负载液体的密封性，防止漏入AGV中；</p>
            <p>13、不要屏蔽激光雷达和其他传感器，这样会降低安全性；</p>
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[7]"></headerTitle>
        <div class="centerBgBox">
          <div class="bootAndUse">
            <p><span class="strong">操作说明：</span>从网页上（可支持PC，手机以及平板）监控AGV状态，并为用户提供方便和直观的操作界面</p>
            <p><span class="strong">丢失复位：</span>如果车辆遇到无法到达目的地的情况，用户可以手动控制AGV按照既定路线返回</p>

            <div>
              <p>1、如果AGV遇到紧急停车的情况，将其拉至安全区域</p>
              <p>2、如果AGV显示路径错误信息，检查目的地是否遭到阻挡或者丢失位置信息</p>
              <p>3、确保AGV的目的地与地图上的位置相符</p>
              <p>4、确保在操作界面显示中AGV的状态为正常</p>
              <p>5、确保车轮没有缠绕异物</p>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[9]"></headerTitle>
        <div class="centerBgBox qrcodeBg"></div>
        <div class="detailBox txtLeft contactBox flex">
          <p>电话：021-50900203</p>
          <p>邮箱：lifl@hitrobotgroup.com</p>
          <p>地址：上海市宝山区呼兰西路智力产业园10A</p>
        </div>
      </div>
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import contents from '@/components/contents.vue'
import headerTitle from '@/components/headerTitle.vue'
export default {
  components:{
    swiper,
    swiperSlide,
    contents,
    headerTitle
  },
  name: 'AGV4',
  props: {
  },
  data(){
    return{
      contentsBoj:[{
        first: false,
        firstTitle: "TITLE",
        title: "配件清单",
        num: 3
      },{
        first: false,
        firstTitle: "TITLE",
        title: "基本参数信息",
        num: 4
      },{
        first: false,
        firstTitle: "TITLE",
        title: "内部展示",
        num: 5
      },{
        first: false,
        firstTitle: "TITLE",
        title: "开机及使用",
        num: 6
      },{
        first: false,
        firstTitle: "TITLE",
        title: "关机及充电",
        num: 7
      },{
        first: false,
        firstTitle: "TITLE",
        title: "维护保养",
        num: 7
      },{
        first: false,
        firstTitle: "TITLE",
        title: "设备安全",
        num: 8
      },{
        first: false,
        firstTitle: "TITLE",
        title: "注意事项",
        num: 9
      },{
        first: false,
        firstTitle: "TITLE",
        title: "产品性能故障表",
        num: 9
      },{
        first: false,
        firstTitle: "TITLE",
        title: "联系我们",
        num: 10
      }],
      swiperOptionAGV4: {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {
          //初始化时候
          init() {
            console.log(this.activeIndex)
          },
          
          //改变完成时
          slideChangeTransitionEnd: function(){ 
          },

          //改变时
          slideChange: function(){
            console.log(this.activeIndex)
          }
        }
      },
      headList:[{
        name: "序号"
      },{
        name: "产品名称"
      },{
        name: "生产厂家"
      },{
        name: "规格型号"
      },{
        name: "数量"
      },{
        name: "单位"
      }],
      accessories:[{
        name:"AGV本体",
        manufacturers: "HRG",
        specs:"rigel-5T",
        num: 1
      },{
        name:"顶升盘",
        manufacturers: "HRG",
        specs:"450*450mm或610*450mm",
        num: 1
      },{
        name:"激光雷达",
        manufacturers: "北阳hokuyo",
        specs:"ust20lx",
        num: 1
      },{
        name:"电池",
        manufacturers: "HRG",
        specs:"48V 14AH",
        num: 1
      },{
        name:"充电桩",
        manufacturers: "HRG",
        specs:"48V 10A",
        num: 1
      },{
        name:"遥控手柄",
        manufacturers: "罗技Logitec",
        specs:"F710",
        num: 1
      },{
        name:"工控机",
        manufacturers: "英特尔Intel",
        specs:"Nuci3",
        num: 1
      },{
        name:"万向轮",
        manufacturers: "向荣Supo",
        specs:"J05-01-75",
        num: 4
      },{
        name:"牛眼轮",
        manufacturers: "米思米Misumi",
        specs:"BCUFH120",
        num: 4
      },{
        name:"控制器",
        manufacturers: "西门子Siemens",
        specs:"Logo8.2",
        num: 1
      }],
      params:[{
        title: "自重",
        value: "60±10KG"
      },{
        title: "额定功率",
        value: "400W"
      },{
        title: "负载",
        value: "500KG"
      },{
        title: "通信方式",
        value: "WIFI，Ethernet"
      },{
        title: "顶升高度",
        value: "40mm"
      },{
        title: "导航方式",
        value: "激光SLAM 自然导航"
      },{
        title: "离地高度",
        value: "35.5mm"
      },{
        title: "避障方式",
        value: "激光避障+防撞面"
      },{
        title: "运行速度",
        value: "1m/s"
      },{
        title: "旋转半径",
        value: "305mm"
      },{
        title: "防护等级",
        value: "IP20"
      },{
        title: "通信接口",
        value: "自建基站或WIFI"
      },{
        title: "电池",
        value: "锂电池"
      },{
        title: "急停开关",
        value: "1个"
      },{
        title: "充电时长",
        value: "≤1.5h"
      },{
        title: "温度要求",
        value: "5℃～40℃"
      },{
        title: "工作时长",
        value: "≤6h"
      },{
        title: "充电方式",
        value: "自动充电坞/手动充电器"
      },{
        title: "尺寸",
        value: "610*450*245mm（不含牛眼轮）"
      },{
        title: "定位精度",
        value: "±5mm"
      },{
        title: "越障能力",
        value: "间隙：<15mm  台阶：<15mm  坡度：<5°"
      },{
        title: "使用环境",
        value: "硬质混凝土或毛毡垫构成的水平地面"
      },{
        title: "激光传感器",
        value: "进口20M，扫描范围270°，人眼安全"
      },{
        title: "湿度要求",
        value: "相对湿度5%～90% （无结露）"
      },{
        title: "驱动方式",
        value: "直流电机"
      }]
    }
  },
  mounted(){
    
  },
  computed:{
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
html,body {
    position: relative;
    height: 100%;
  }
  body {
    background: #eee;
  }
  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px ;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .swiperSlide{
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    position: relative;
  }
  .coverBox{
    width: 100%;
    height: 100%;
    background-color: #10386b;
    .productBg{
      width: 100%;
      height: 60vh;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      margin-top: 40px;
      background-image: url("../../assets/images/forklift.png");
    }
    .logoBox{
      position: absolute;
      right: 15px;
      bottom: 15px;
      width: 200px;
      height: 100px;
      background: url("../../assets/images/hrglogo.png") no-repeat right;
      background-size: contain;
    }
  }
  .coverLinBox{
    width: 100%;
    .circle{
      flex: 1;
      span{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #ffffff;
      }
    }
    .line{
      flex: 11;
      height: 4px;
      background: #ffffff;
    }
  }
  .coverTitleBox{
    width: 100%;
    text-align: left;
    .noneBox{
      flex: 1;
    }
    .titleBox{
      flex: 11;
    }
    h1{
      color: #ffffff;
      margin: 15px 0;
    }
    h5{
      color: #ffffff;
    }
  }
  .centerBgBox{
    width: 70%;
    margin: 40px auto 0 auto;
    .formItem{
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 14px;
    }
    .formHead{
      background-color: #10386b;
      color: #ffffff;
    }
    .formBody{
      color: rgba(0,0,0,.8);
      border-bottom: 1px solid #333333;
      border-left: 1px solid #333333;
    }
  }
  .centerBox{
    margin: 40px;
    width: 100%;
    height: 60vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .internalBg{
    background-image: url("../../assets/images/internalBg.png");
  }
  .paramesBox{
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    border-top: 1px solid #333333;
    .params{
      justify-content: flex-start;
      width: 50%;
      height: 41px;
      line-height: 40px;
      font-size: 16px;
      .paramsTitle{
        flex: 4;
        background-color: #10386b;
        color: #ffffff;
        border-right: 1px solid #333333;
        border-bottom: 1px solid #333333;
      }
      .paramsBody{
        border-right: 1px solid #333333;
        border-bottom: 1px solid #333333;
        flex: 6;
        color: #333333;
      }
    }
  }
  .headItem{
    border-right: 1px solid #333333;
    line-height: 40px;
  }
  .headItem:nth-child(1){
    flex: 1;
  }
  .headItem:nth-child(2){
    flex: 2;
  }
  .headItem:nth-child(3){
    flex: 2;
  }
  .headItem:nth-child(4){
    flex: 2;
  }
  .headItem:nth-child(5){
    flex: 1;
  }
  .headItem:nth-child(6){
    flex: 1;
  }
.bootAndUse{
  margin-top: 40px;
  font-size: 14px;
  text-align: left;
  p{
    margin: 10px 0;
  }
  .useBox{
    width: 100%;
    border-bottom: 1px solid #333333;
    margin: 20px 0;
    .useList{
      width: 100%;
      
      div{
        width: 25%;
        line-height: 40px;
        text-align: center;
        border-right: 1px solid #333333;
        border-top: 1px solid #333333;
        &:first-child{
          background-color: #10386b;
          color: #ffffff;
        }
      }
    }
  }
}
.strong{
  font-weight: bold;
}
  .qrcodeBg{
    background-image: url("../../assets/images/qrcode.jpg");
    background-size: 20%;
    height: 40vh;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 40px;
  }
  .detailBox{
    font-size: 14px;
    width: 50%;
    margin: 40px auto;
    p{
      margin-top: 5px;
    }
  }
  .contactBox{
    flex-direction: column
  }
</style>
