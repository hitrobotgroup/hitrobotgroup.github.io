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
              <h1>上位机操作使用说明书</h1>
              <h5>Instructions for the operation of the upper machine</h5>
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
        <div class="centerBgBox authorizationBg"></div>
        <div class="detailBox">
          <p>输入授权密码，提交确认之后即可对地图、站点、轨迹、网络设置等进行修改操作</p>
          <p>注：授权密码向售后或管理员获取</p>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[1]"></headerTitle>
        <div class="centerBgBox agvBootBg"></div>
        <div class="detailBox txtLeft">
          <p>1、AGV急停按钮（遇到紧急情况按下急停按钮，AGV会停止当前一切动作，紧急情况解除后，按图标上指示旋转按钮即可恢复正常）;</p>
          <p>2、AGV开机按钮（按一下指示灯亮起表示正在开机）;</p>
          <p>3、将手机或平板连接上机器人发出的Wifi热点</p>
          <p>4、打开手机或平板的浏览器，在地址栏输入机器人地址：10.42.0.1</p>
          <p>注：机器人Wifi热点的名称为：hitrobot-AGV-***</p>
          <p>***为机器人编号，例如hitrobot-AGV-001；Wifi密码为：hitrobot</p>
          <p>推荐谷歌（Chrome）、火狐（Firefox）或IOS系统自带的浏览器（Safari）</p>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[2]"></headerTitle>
        <div class="centerBgBox newMapBg"></div>
        <div class="detailBox txtLeft">
          <p>1、点击中间导航栏弹出下拉框，选择点击“建图”;</p>
          <p>2、可移动机器人进行建图操作;</p>
          <p>3、建图完成，可对地图进行命名，并确认提交</p>
          <p>注：建图完成之后请重启机器人</p>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[3]"></headerTitle>
        <div class="centerBgBox addWaypointBg"></div>
        <div class="detailBox txtLeft">
          <p>1、点击站点按钮，显示站点列表，再选择点击“添加站点”按钮;</p>
          <p>2、输入站点名称，选择站点类型，其他默认可不填;</p>
          <p>3、点击提交，当前地图会新增当前站点，可在站点列表中查看；</p>
          <p>注：站点名称建议由英文，数字，下划线拼接，如：test_1</p>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[4]"></headerTitle>
        <div class="centerBgBox trajectoryBg"></div>
        <div class="detailBox txtLeft">
          <p>1、点击轨迹按钮，显示轨迹列表，再选择点击“添加轨迹”按钮;</p>
          <p>2、输入轨迹名称，选择站点，并点击提交;</p>
          <p>3、新建完成之后的轨迹可在轨迹列表中查看；</p>
          <p>注：轨迹名称建议由英文，数字，下划线拼接，如：test_1</p>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[4]"></headerTitle>
        <div class="centerBgBox manualPositionBg"></div>
        <div class="detailBox txtLeft">
          <p>1、点击手动定位按钮，提示“请点击地图并拖动圆点对机器人进行手动定位”;</p>
          <p>2、点击开始圆点可对角度进行调整，点击结束圆点可对坐标进行定位;</p>
          <p>注：5秒之内不对其进行定位操作则自动关闭</p>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[5]"></headerTitle>
        <div class="centerBgBox trajectoryBg"></div>
        <div class="detailBox txtLeft">
          <p>1、点击轨迹按钮，显示轨迹列表，再选择点击“添加轨迹”按钮;</p>
          <p>2、输入轨迹名称，选择站点，并点击提交;</p>
          <p>3、新建完成之后的轨迹可在轨迹列表中查看；</p>
          <p>注：轨迹名称建议由英文，数字，下划线拼接，如：test_1</p>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[6]"></headerTitle>
        <div class="centerBgBox wifiSettingBg"></div>
        <div class="detailBox txtLeft">
          <p>1、点击“WIFI设置”弹出设置表单;</p>
          <p>2、输入WIFI名称；</p>
          <p>3、输入WIFI密码；</p>
          <p>4、选择IP类型，默认Wie手动IP;</p>
          <p>5、IP地址为自定义，如：192.168.43.233</p>
          <p>6、子掩码、网关、保存设置选填</p>
          <p>注：安卓系统IP最有一位2-15之间取值，如：172.20.10.15；IOS系统IP最后一位1-233之间取值，如：192.168.43.233；</p>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[6]"></headerTitle>
        <div class="centerBgBox systemUpdateBg"></div>
        <div class="detailBox txtLeft">
          <p>1、点击“系统更新按钮”弹出更新单选框，并选择更新方式之后确定提交按钮;</p>
          <p>注：确保机器人连接外网状态，否则更新失败</p>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[7]"></headerTitle>
        <div class="centerBgBox systemUpdateBg"></div>
        <div class="detailBox txtLeft">
          <p>1、点击轨迹按钮，显示轨迹列表，再选择点击“添加轨迹”按钮;</p>
          <p>2、输入轨迹名称，选择站点，并点击提交;</p>
          <p>3、新建完成之后的轨迹可在轨迹列表中查看；</p>
          <p>注：轨迹名称建议由英文，数字，下划线拼接，如：test_1</p>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[8]"></headerTitle>
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
  name: 'upperMachine',
  props: {
  },
  data(){
    return{
      contentsBoj:[{
        first: false,
        firstTitle: "TITLE",
        title: "授权码",
        num: 3
      },{
        first: false,
        firstTitle: "TITLE",
        title: "开机",
        num: 1
      },{
        first: false,
        firstTitle: "TITLE",
        title: "创建新地图",
        num: 1
      },{
        first: false,
        firstTitle: "TITLE",
        title: "添加站点",
        num: 1
      },{
        first: false,
        firstTitle: "TITLE",
        title: "添加轨迹",
        num: 1
      },{
        first: false,
        firstTitle: "TITLE",
        title: "手动定位",
        num: 1
      },{
        first: false,
        firstTitle: "TITLE",
        title: "网络设置",
        num: 1
      },{
        first: false,
        firstTitle: "TITLE",
        title: "系统更新",
        num: 1
      },{
        first: false,
        firstTitle: "TITLE",
        title: "联系我们",
        num: 1
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
      }
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
      background-image: url("../../assets/images/agv4.png");
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
    width: 100%;
    height: 60vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-top: 40px;
  }
  .authorizationBg{
    background-image: url("../../assets/images/authorizationBg.png");
  }
  .agvBootBg{
    background-image: url("../../assets/images/agv4Boot.png");
  }
  .newMapBg{
    background-image: url("../../assets/images/newMapBg.png");
  }
  .addWaypointBg{
    background-image: url("../../assets/images/addWaypoint.png");
  }
  .trajectoryBg{
    background-image: url("../../assets/images/trajectoryBg.png");
  }
  .manualPositionBg{
    background-image: url("../../assets/images/manualPositionBg.png");
  }
  .wifiSettingBg{
    background-image: url("../../assets/images/wifiSettingBg.png");
  }
  .systemUpdateBg{
    background-image: url("../../assets/images/systemUpdateBg.png");
  }
  .qrcodeBg{
    background-image: url("../../assets/images/qrcode.jpg");
    background-size: 30%;
    height: 40vh;
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
