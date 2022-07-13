<template>
  <div class="layout_home">
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './Aside'
import Header from './Header'
import Main from './Main'
export default {
  data() {
    return {}
  },
  created() {},
  methods: {},
  components: {
    Aside,
    Header,
    Main
  }
}
</script>

<style lang="scss">
.layout_home{
  width: 100%;
  height: 100%;
}
.el-container{
  width: 100%;
  height: 100%;
}
.el-aside{
  width: 200px;
  height: 100%;
  background-color: #222d32;
}
.el-header{
  background: #18bc9c;
}
.el-main{
  background-color: #e8edf0;
}
</style>
