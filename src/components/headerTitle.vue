<template>
  <div class="headerTitles">
    <h1 class="firstTitle colBlack8" v-show="titleData.first">{{titleData.firstTitle}}</h1>
    <div class="secondTitle colBlack8 flex"><span></span><h3>{{titleData.title}}</h3></div>
  </div>
</template>

<script>
export default {
  components:{
  },
  name: 'headerTitle',
  props: ['titleData'],
  data(){
    return{
      
    }
  },
  mounted(){
    
  },
  computed:{
    
  },
  methods:{
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.headerTitles{
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 1px dashed #333333;
  .firstTitle{
    display: inline-block;
    border-right: 10px solid #10386b;
    padding-right: 8px;
    font-weight: bold;
    margin-bottom: 15px;
    height: 34px;
    line-height: 1em
  }
  .secondTitle{
    justify-content: flex-start;
    span{
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: #10386b;
    }
    h3{
      font-weight: bold;
      margin-left: 10px;
    }
  }
}
</style>
