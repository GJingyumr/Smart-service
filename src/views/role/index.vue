<template>
  <div class="menu-list">
    <div class="breadcrumb-scss">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="search">
        <div class="search-from">
          <el-form label-width="80px" :model="userForm">
            <el-form-item label="角色">
              <el-input
                v-model="userForm.name"
                placeholder="请输入角色"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-button">
          <el-button
            type="success"
            size="medium"
            icon="el-icon-search"
            @click="handleRoleForm"
            >查询</el-button
          >
          <el-button type="primary" size="medium" icon="el-icon-edit"
            >新增</el-button
          >
        </div>
      </div>
    </div>
    <el-table border :data="roleList" style="width: 97%">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="角色" width="120"> </el-table-column>
      <el-table-column prop="code" label="编码" width="120"> </el-table-column>
      <el-table-column prop="remark" label="描述" width="120">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template>
          <el-switch active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="创建时间" width="120">
      </el-table-column>
      <el-table-column label="操作">
        <el-tag type="success">编辑</el-tag>
        <el-tag type="warning">分配角色</el-tag>
        <el-tag type="danger">删除</el-tag>
      </el-table-column>
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
      roleList: [],
      current: 1,
      size: 20,
      userForm: {
        name: ''
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const response = await UserApi.getrolelist({
        current: this.current,
        size: this.size,
        name: this.userForm.name
      })
      this.roleList = response.records
      // console.log(this.roleList)
    },
    handleRoleForm() {
      this.getRoleList()
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
}
</style>
