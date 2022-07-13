<template>
  <div class="menu-list">
    <div class="breadcrumb-scss">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="search">
        <div class="search-from">
          <el-form label-width="80px">
            <el-form-item label="用户名">
              <el-input placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-button">
          <el-button type="success" size="medium" icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="primary" size="medium" icon="el-icon-edit"
            >新增</el-button
          >
        </div>
      </div>
    </div>
    <el-table border :data="userList" style="width: 97%">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column label="头像" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="AvatAr" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="角色" width="120">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.roles" :key="index">{{
            item.name
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="120"> </el-table-column>
      <el-table-column prop="updateTime" label="注册时间" width="130">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template>
          <el-switch active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column class="El_TABLE_TAG" label="操作">
        <el-tag type="success">编辑</el-tag>
        <el-tag type="warning">分配角色</el-tag>
        <el-tag type="danger">删除</el-tag>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination> -->
  </div>
</template>

<script>
import UserApi from '../../api/user'
export default {
  data() {
    return {
      userList: []
    }
  },
  created() {
    this.loginUserList()
  },
  methods: {
    async loginUserList() {
      const response = await UserApi.getuserlist()
      console.log(response)
      this.userList = response.records
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
.AvatAr {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
</style>
