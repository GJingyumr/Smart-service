<template>
  <div class="">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/consoles">
        <i class="el-icon-s-home"></i>
        <span slot="title">控制台</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user"> <i class="el-icon-user"></i>用户管理</el-menu-item>
          <el-menu-item index="/role"><i class="el-icon-user-solid"></i>角色管理</el-menu-item>
          <el-menu-item index="/menu"><i class="el-icon-menu"></i>菜单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {},
  components: {}
}
</script>

<style lang="scss"></style>
