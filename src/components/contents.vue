<template>
  <div class="contents flex">
    <div class="contentsBox">
      <h1 class="colBlack8">COMTENTS</h1>
      <h3 class="colBlack8">目录</h3>
      <div class="contentsList" v-for="(item, index) in titles" :key="index" :class="item.first ? 'firstTitle':''">
        <div class="titleBox flex">
          <p v-if="item.first">{{item.firstTitle}}</p>
          <p v-else>{{item.title}}</p>
          <p class="">{{item.num}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components:{
  },
  name: 'contents',
  props: ['titles'],
  data(){
    return{
      
    }
  },
  mounted(){
    console.log(this.titles)
  },
  computed:{
    
  },
  methods:{
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.contents{
  width: 40%;
}
.contentsBox{
  width: 100%;
  text-align: left;
  h1,h3{
    font-weight: bold;
  }
  h3{
    margin: 15px 0;
  }
}
  .contentsList{
    height: 40px;
    font-size: 14px;
    position: relative;
    &::after{
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      border-top: 1px dashed rgba(0,0,0,.8); 
      left: 0;
      top: 50%;
      z-index: 1;
    }
    .titleBox{
      position: absolute;
      width: 100%;
      line-height: 40px;
      z-index: 2;
      left: 0;
      justify-content: space-between;
      p{
        background-color: #ffffff;
      }
      p:first-child{
        padding-left: 15px;
        padding-right: 15px;
      }
      p:last-child{
        padding: 0 0 0 15px;
      }
    }
  }
  .firstTitle{
    // margin-top: 20px;
    p:first-child{
      font-weight: bold;
      font-size: 16px;
      padding-left: 0 !important;
    }
  }
</style>
