<template>
  <div class="index1 flex">
    <div class="logoCodeBox">
      <div class="logoBox"></div>
      <div class="codeBox"></div>
      <div class="tel"><h1>021-50900203</h1></div>
    </div>
    <div class="swiperBox">
      <swiper :options="productsSwiperOption" class="swiperProducts">
        <swiper-slide class="swiper-item flex">
          <div class="productsBg agv4"></div>
          <p @click="toProducts('AGV4')">轻载激光导航AGV</p>
        </swiper-slide>
        <swiper-slide class="swiper-item flex">
          <div class="productsBg forklift"></div>
          <p @click="toProducts('forklift')">激光导航堆高叉车</p>
        </swiper-slide>
        <swiper-slide class="swiper-item flex">
          <div class="productsBg agv4"></div>
          <p @click="toProducts('forklift')">激光导航AGV</p>
        </swiper-slide>
        <swiper-slide class="swiper-item flex">
          <div class="productsBg agv4"></div>
          <p @click="toProducts('forklift')">激光导航AGV</p>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components:{
    swiper,
    swiperSlide
  },
  name: 'index1',
  props: {
  },
  data(){
    return{
      productsSwiperOption: {
        direction: 'horizontal',
        slidesPerView: 2,
        spaceBetween: 0,
        mousewheel: true,
        autoplay: {
          delay: 2000,//1秒切换一次
        },
      }
    }
  },
  mounted(){
    
  },
  computed:{
    
  },
  methods:{
    toProducts:function(type){
      switch(type){
        case 'AGV4':
          this.$router.push({path: '/AGV4'})
          break;
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .index1{
    width: 100%;
    flex-direction: column;
    .logoCodeBox{
      width: 240px;
      .logoBox{
        width: 100%;
        height: 70px;
        background: url("../../assets/images/logo.png") no-repeat center;
        background-size: contain;
      }
      .codeBox{
        margin: 15px 0;
         width: 100%;
        height: 226px;
        background: url("../../assets/images/qrcode.jpg") no-repeat center;
        background-size: contain;
      }
    }
  }
  .tel{
    color: #10386b
  }
  .swiperBox{
    width: 100%;
    margin-top: 50px;
  }
  .swiperProducts{
    color: #ffffff;
    height: 135px;
    .swiper-item{
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      cursor: pointer;
    }
    .swiper-item:nth-child(odd){
      background-image: url("../../assets/images/productsBg1.jpg");
    }
    .swiper-item:nth-child(even){
      background-image: url("../../assets/images/productsBg2.jpg");
    }
  }
  .productsBg{
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 80px;
    height: 80px;
    margin-right: 15px;
  }
  .agv4{
    background-image: url("../../assets/images/agv4.png");
  }
  .forklift{
    background-image: url("../../assets/images/forklift.png");
  }
</style>
