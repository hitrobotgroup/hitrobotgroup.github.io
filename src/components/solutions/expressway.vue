<template>
  <swiper :options="swiperOptionAGV4" class="swiper-box">
    <swiper-slide class="swiper-item flex">
      <div class="coverBox">
        <div class="logoBox"></div>
				<div class="indexTitle flex">
					<p class="ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="1s">黄埔捷普AGV高速公路运输</p>
					<p class="ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="1s">流程方案</p>
				</div>
      </div>  
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <contents :titles="contentsBoj"></contents>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[0]"></headerTitle>
        <div class="centerBox flex">
          <div class="demandBox flex">
            <div class="demandItem">
              1、在车间主路径上方3~4米搭建一圈环形的钢架构平台，覆盖全车间及仓库。平台宽度约3米，平台边缘留有多个取料缺口供AGV停靠、取放料。
            </div>
            <div class="demandItem">
              2、数台AGV运行于钢平台上，通过统一的中控调度系统，合理、高效、安全地对仓库原料、MI物料和夹治具进行配送运输。AGV具备通讯交互、
              协同作业、安全避障的功能，车体配备升降取料机构，完全实现空中无人的自动化作业。
            </div>
            <div class="demandItem">
              3、二层平台AGV与地面作业的AGV、AGF联合形成密集而错落有致的运输系统，使用同一AGV+AGF中控系统可以有效构建一套统一指令、集中调度、
              各司其职的智能物流网络。通过中控的监控平台可以记录及分析每一时刻的物流状态信息、仓库帐流信息及生产供货数据。
            </div>
            <div class="demandItem">
              4、二层平台主要实现原辅料和工具的多点运输，各站点不需配备固定的提升机设备。应对产线搬迁、设备
              移位等情况，只需调整站点投放位置即可。一楼地面主要实现产线内短途物料的传递（AGV）和成品栈板的搬运（AGF）；AGF高效到达产线拉尾
              进行成品搬运入仓，完全依据环境轮廓导航，站点变更无需进行轨道铺设。
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[1]"></headerTitle>
        <div class="centerBox overallBox flex">
          <div class="wenAnLeft flex">
            <div class="wenAnTextBox">
              <p class="flex"><span></span>生产线</p>
              <p class="flex"><span></span>传送带</p>
              <p class="flex"><span></span>高速公路</p>
              <p class="flex"><span></span>XXX</p>
            </div>
          </div>

          <div class="wenAnRight flex">
            <div class="planAgvB"></div>
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[2]"></headerTitle>
        <div class="centerBox flex">
          <div class="centerBgBox materialFlowLineBg">
            
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[3]"></headerTitle>
        <div class="centerBox flex">
          <div class="centerBgBox materialFlowBg">
            
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[4]"></headerTitle>
        <div class="centerBox flex">
          <div class="centerBgBox routeBg">
            
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[5]"></headerTitle>
        <div class="centerBox animateBox flex">
          <div class="animateShowBox flex">
            <div class="wenAnRight flex ">
              <div class="videoBox">
                <video id="myVideo" class="video-js">
                <source src="@/assets/video/plan3.mp4" type="video/mp4">
                </video>
              </div>
            </div>

            <div class="wenAnLeft flex ">
              <div class="flex wenAnTextBox">
                <h2>针对平移升降装置解决方案</h2>
                <div class="detailDisplayBox">
                  <p>1、可以有效解决最大尺度平移距离。</p>
                  <p>2、有效解决平移过程中产生晃动因素。</p>
                  <p>3、保证产品安全，平稳运输。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[6]"></headerTitle>
        <div class="centerBox flex">
          <div class="centerBgBox">
            
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[7]"></headerTitle>
        <div class="centerBox flex">
          <div class="centerBgBox">
            
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[8]"></headerTitle>
        <div class="centerBox flex">
          <div class="centerBgBox">
            
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[9]"></headerTitle>
        <div class="centerBox flex">
          <div class="centerBgBox">
            
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[10]"></headerTitle>
        <div class="centerBox flex">
          <div class="centerBgBox">
            
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[11]"></headerTitle>
        <div class="centerBox flex">
          <div class="centerBgBox">
            
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-item">
      <div class="swiperSlide">
        <headerTitle :titleData="contentsBoj[12]"></headerTitle>
        <div class="centerBox flex">
          <div class="centerBgBox">
            
          </div>
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
        first: true,
        firstTitle: "空中飞车",
        title: "",
        num: 3
      },{
        first: false,
        firstTitle: "",
        title: "设计方案",
        num: 3
      },{
        first: false,
        firstTitle: "",
        title: "尺寸与自重",
        num: 3
      },{
        first: false,
        firstTitle: "",
        title: "云轨提升机",
        num: 3
      },{
        first: false,
        firstTitle: "",
        title: "载重与速度",
        num: 3
      },{
        first: false,
        firstTitle: "",
        title: "信号与定位",
        num: 3
      },{
        first: false,
        firstTitle: "",
        title: "车轮与安全",
        num: 3
      },{
        first: false,
        firstTitle: "TITLE",
        title: "物料清单",
        num: 3
      },{
        first: false,
        firstTitle: "TITLE",
        title: "安全说明",
        num: 3
      },{
        first: true,
        firstTitle: "中控系统",
        title: "",
        num: 3
      },{
        first: true,
        firstTitle: "项目规划",
        title: "",
        num: 4
      },{
        first: true,
        firstTitle: "高速公路规划说明",
        title: "",
        num: 5
      },{
        first: true,
        firstTitle: "高速公路实施方案",
        title: "",
        num: 6
      },{
        first: true,
        firstTitle: "高速公路物料配置",
        title: "",
        num: 7
      },{
        first: true,
        firstTitle: "升降装置",
        title: "",
        num: 8
      },{
        first: true,
        firstTitle: "升降装置对接说明",
        title: "",
        num: 9
      },{
        first: true,
        firstTitle: "高速公路AGV行驶路线",
        title: "",
        num: 10
      },{
        first: true,
        firstTitle: "高速公路管理说明",
        title: "",
        num: 10
      },{
        first: true,
        firstTitle: "节拍分析",
        title: "",
        num: 10
      },{
        first: true,
        firstTitle: "高速公路运转说明",
        title: "",
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
      }
    }
  },
  mounted(){
    this.initVideo();
  },
  computed:{
    
  },
  methods:{
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video('myVideo', {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: false,
          //自动播放属性,muted:静音播放
          autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "800px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "400px",
          loop: true
      });
      myPlayer
    }
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
  position: relative;
  background-image: url("../../assets/images/earth.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .logoBox{
    position: absolute;
    top: 15px;
    left: 15px;
    width: 200px;
    height: 100px;
    background: url("../../assets/images/hrglogo.png") no-repeat right;
    background-size: contain;
  }
  .indexTitle{
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 15px;
    p{
      text-align: left;
      padding: 10px 0 15px 0;
      font-size: 40px;
      color: #ffffff; 
      &:first-child{
        border-bottom: 1px dashed #ffffff;
      }
    }
  }
}

.centerBox{
  width: 100%;
  height: 100%;
}
.centerBgBox{
  margin: 40px;
  width: 100%;
  height: 60vh;
  background-repeat: no-repeat;
  background-position: top center;
}
.overallBox{
  .wenAnLeft{
    height: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    
  }
  .wenAnTextBox{
    text-align: left;
    p{
      margin-top: 10px;
      justify-content: flex-start;
      span{
        margin-right: 10px;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #333333;
      }
    }
    p:nth-child(1){
      span{
        background-color: #ffffff;
      }
    }
    p:nth-child(2){
      span{
        background-color: #a6abfc;
      }
    }
    p:nth-child(3){
      span{
        background-color: #aefdfe;
      }
    }
    p:nth-child(4){
      span{
        background-color: #86ff87;
      }
    }
  }
  .wenAnRight{
    height: 100%;
    flex: 1;
    background-image: url("../../assets/images/overallBg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    justify-content: center;
  }
}
.demandBox{
  flex-direction: column;
  width: 50vw;
  .demandItem{
    text-align: left;
    width: 100%;
    padding: 10px;
    background-color: #00a6e4;
    color: rgba(255,255,255,.9);
    margin: 10px 0;
    border-radius: 4px;
  }
}

.materialFlowLineBg{
  background-image: url("../../assets/images/expresswayFlowBg.png");
  background-size: 70%;
}
.materialFlowBg{
  background-image: url("../../assets/images/materialBg.png");
  background-size: 50%;
}
.routeBg{
  background-image: url("../../assets/images/route.png");
  background-size: contain;
}
.animateBox{
  align-items: flex-start;
}
.animateShowBox{
  width: 100%;
  height: calc(100% - 30px);
  .wenAnLeft{
    height: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    .wenAnTextBox{
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }
    .detailDisplayBox{
      margin-top: 15px;
    }
  }
  .wenAnRight{
      height: 100%;
      flex: 1;
      justify-content: center;
  }
  .videoBox{
    height: 100%;
  }
  #myVideo{
    height: 100%;
    background-image: url("../../assets/images/mohuBg.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}

</style>
