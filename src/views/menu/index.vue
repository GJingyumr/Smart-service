<template>
  <div class="menu-list">
    <div class="breadcrumb-scss">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="search">
        <div class="search-from">
          <el-form label-width="80px">
            <el-form-item label="菜单">
              <el-input placeholder="请输入菜单"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-button">
          <el-button type="success" size="medium" icon="el-icon-search"
            >查询</el-button
          >
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-edit"
            >新增</el-button
          >
        </div>
      </div>
    </div>
    <el-table border :data="menuList" style="width: 97%">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="label" label="展示名称" width="120">
      </el-table-column>
      <el-table-column prop="name" label="文件名称" width="120">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="120"> </el-table-column>
      <el-table-column prop="component" label="前端component" width="120">
      </el-table-column>
      <el-table-column prop="perms" label="唯一标识" width="120">
      </el-table-column>
      <el-table-column prop="icon" label="图标" width="120"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="updateTime" label="注册时间"> </el-table-column>
      <el-table-column prop="type" label="状态"> </el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination> -->
  </div>
</template>

<script>
import UserApi from '../../api/user'
export default {
  data() {
    return {
      menuList: [],
      dialogFormVisible: false
    }
  },
  created() {
    this.getmenulist()
  },
  methods: {
    async getmenulist() {
      const response = await UserApi.getmenulist()
      this.menuList = response
      console.log(response)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.menu-list {
  width: 100%;
  height: 100%;
  .breadcrumb-scss {
    height: 50px;
    border-bottom: 1px solid #cccc;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
}
.search {
  width: 100%;
  height: 70px;
  display: flex;
  margin: 20px 20px 20px 10px;
  .search-button {
    margin-left: 10px;
  }
}
.el-table {
  margin-left: 20px;
  text-align: center;
}
</style>
