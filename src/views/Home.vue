<template>
  <swiper :options="swiperOption" class="swiper-box">
    <swiper-slide class="swiper-item"><Index1></Index1></swiper-slide>
    <swiper-slide class="swiper-item" v-for="(item, index) in products" :key="index">
      <div class="agvBox" :class="item.name">
        <div class="maskBox">
          <div class="animated bounce" :class="$store.state.pageIndex === index ? 'slideInRight': ''">
            <h1>{{item.titleCn}}</h1>
            <p>{{item.titleEn}}</p>
            <ul class="teseList clear">
              <li v-for="(listItem, num) in item.list" :key="num">{{listItem}}</li>
            </ul>
          </div>
          
          <div class="aniBtn flex animated bounce" >
						<button class="moreBtn" @click="toProduct(item.name)">了解更多</button>
						<div class="anim" @click="toProduct(item.name)"></div>
					</div>
        </div>
      </div>
    </swiper-slide>
    
    <swiper-slide class="swiper-item">
      <div class="agvBox swj">
        <div class="maskBox" >
          <div class="animated bounce" >
            <h1>上位机操作使用说明书</h1>
            <p>Instructions for the operation of the upper machine</p>
            <ul class="teseList clear">
              <li>无需下载</li>
              <li>操作便捷</li>
              <li>多终端</li>
              <li>状态查看</li>
              <li>手动定位</li>
              <li>更直观</li>
            </ul>
          </div>
          <div class="aniBtn flex animated bounce" :class="$store.state.pageIndex === 2 ? 'slideInRight': ''">
						<button class="moreBtn" @click="toProduct('upperMachine')">了解更多</button>
						<div class="anim" @click="toProduct('upperMachine')"></div>
					</div>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { store } from '@/main.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Index1 from "@/components/index/index1"
import {toProducts} from '../assets/js/methods.js'
export default {
  components:{
    swiper,
    swiperSlide,
    Index1
  },
  name: 'index',
  props: {
  },
  data(){
    return{
      products:[{
        titleCn: "轻载室内激光导航AGV",
        titleEn: "LIGHT LOAD INDOOR LIDAR NAVIGATION AGV",
        list: ["高精度","续航久","负载重","自动充电","低成本","激光导航"],
        name: "AGV4",
        image: "../../assets/images/agv4.png"
      },{
        titleCn: "轻载室内激光导航AGV-蓝精灵",
        titleEn: "LIGHT LOAD INDOOR LIDAR NAVIGATION AGV",
        list: ["高精度","续航久","负载重","自动充电","低成本","激光导航"],
        name: "agvLanJingLing",
        image: "../../assets/images/agvLanJingLing.png"
      },{
        titleCn: "L型激光导航堆高叉车",
        titleEn: "L LIFT LIDAR SLAM NAVIGATION FORKLIFT",
        list: ["高精度","续航久","可定制","自动作业","低成本","激光导航"],
        name: "forklift",
        image: "../../assets/images/forklift.png"
      }],
      swiperOption: {
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
            store.commit("pageIndex",this.activeIndex)
          }
        }
      }
    }
  },
  mounted(){
    
  },
  watch:{
    
  },
  computed:{
    
  },
  methods:{
    toProduct:function(type){
      toProducts(type)
    },
    indexFun:function(num){
      this.index = num;
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
  .agvBox{
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
  }
  .AGV4{
    background-image: url("../assets/images/agv4.png");
  }
  .forklift{
    background-image: url("../assets/images/forklift.png");
  }
  .agvLanJingLing{
    background-image: url("../assets/images/agvLanJingLing.png");
    background-size: 50%;
  }
  .swj{
    background-image: url("../assets/images/SWJBg.png");
    background-size: cover;
  }
  .maskBox{
    background-color: rgba(0,0,0,.3);
    width: 100%;
    height: 100%;
    color: #ffffff;
    padding-top: 80px;
    h1{
      font-size: 43px;
    }
    p{
      font-size: 20px;
      margin: 15px 0;
    }
  }
  .teseList{
    width: 480px;
    margin: auto;
    li{
      position: relative;
      float: left;
      width: 80px;
      font-size: 14px;
    }
    li::after{
      width: 2px;
      height: 2px;
      content: "";
      position: absolute;
      background-color: #ffffff;
      border-radius: 50%;
      right: 0;
      top: 10px;
    }
    li:last-child{
      &::after{
        display: none;
      }
    }
  }
  .moreBtn{
    width: 120px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #ffffff;
    cursor: pointer;
    color: #ffffff;
  }
</style>
