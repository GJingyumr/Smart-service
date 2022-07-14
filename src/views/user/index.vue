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
          <el-form label-width="80px" :model="userForm">
            <el-form-item label="用户名">
              <el-input
                v-model="userForm.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-button">
          <el-button
            type="success"
            size="medium"
            icon="el-icon-search"
            @click="handleQueryForm"
            >查询</el-button
          >
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-edit"
            @click="handleOpenDialog"
            >新增</el-button
          >
        </div>
      </div>
    </div>
    <!-- 表格渲染 -->
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
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column class="El_TABLE_TAG" label="操作">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="warning" @click="handleOpenRoleDialog(scope.row)">分配角色</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[2, 5, 10]"
      :page-size="size"
      layout="jumper, prev, pager, next, sizes, total"
      :total="total"
    >
    </el-pagination>
    <!-- 新增的模态框 -->
    <el-dialog
      :title="dialogTitle"
      center
      width="400px"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-width="60px"
        :rules="rules"
        :model="dialogList"
        ref="dialogForm"
      >
        <el-form-item label="头像" prop="avatar">
          <el-avatar :size="70" :src="dialogList.avatar"></el-avatar>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="dialogList.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="dialogList.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="dialogList.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model.trim="dialogList.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleResetForm">取 消</el-button>
        <el-button type="primary" @click="adddialogAV">确 定</el-button>
      </div>
    </el-dialog>
  <!-- 分配角色的模态框 -->
    <el-dialog width="30%" center title="分配角色" :visible.sync="roleDialogFormVisible">
      <el-form :model="roleForm" :rules="roleRules" ref="roleDialogForm" label-width="60px">
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="roleForm.roleId" placeholder="请选择角色">
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitRole"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserApi from '../../api/user'
import RoleApi from '../../api/rolemanager.js'
export default {
  data() {
    return {
      userList: [],
      current: 1,
      size: 10,
      total: 0,
      dialogTitle: '新增用户',
      dialogFormVisible: false,
      roleDialogFormVisible: false,
      userForm: {
        username: ''
      },
      dialogList: {
        username: '',
        password: '',
        email: '',
        status: '1',
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
      },
      rules: {
        avatar: [{ required: true, message: '请上次头像', trigger: 'change' }],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      roleList: [],
      roleId: '',
      roleForm: {
        roleId: []
      },
      roleRules: {
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.loginUserList()
    this.handleGetRoleList()
  },
  methods: {
    async loginUserList() {
      const response = await UserApi.getuserlist({
        current: this.current,
        size: this.size,
        username: this.userForm.username
      })
      // console.log(response)
      this.userList = response.records
      this.total = response.total
    },
    handleQueryForm() {
      this.loginUserList()
    },
    handleSizeChange(size) {
      this.size = size
      this.loginUserList()
    },
    handleCurrentChange(current) {
      this.current = current
      this.loginUserList()
    },
    handleOpenDialog(id) {
      this.dialogTitle = typeof id === 'number' ? '编辑用户' : '新增用户'
      if (id && typeof id === 'number') this.handleFindUser(id)
      this.dialogFormVisible = true
    },
    // 新增弹出确定按钮提交方法
    adddialogAV() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          if (valid) {
            await this.handleUpdateUser()
          } else {
            await this.handleSubmitAddData()
          }
          this.handleResetForm()
        }
      })
    },
    // 新增用户
    async handleSubmitAddData() {
      this.dialogList.status = Number(this.dialogList.status)
      await UserApi.adduser(this.dialogList)
      this.dialogFormVisible = false
      this.$notify({ title: '提示', message: '添加成功', type: 'success' })
      this.loginUserList()
    },
    // 查询单个用户
    async handleFindUser(id) {
      const response = await UserApi.finduser(id)
      console.log('userinfo', response)
      this.dialogList = response
    },
    // 更新用户
    async handleUpdateUser() {
      const response = await UserApi.updateUser(this.dialogList)
      console.log(response)
      this.dialogFormVisible = true
      this.$notify({ title: '提示', message: '编辑成功', type: 'success' })
      this.loginUserList()
    },
    // 取消按钮
    handleResetForm() {
      this.dialogFormVisible = false
      this.$refs.dialogFormRef.resetFields()
      // console.log()
    },
    // 初始化角色列表
    async handleGetRoleList() {
      const data = { current: this.current, size: this.size }
      const response = await RoleApi.getRoleList(data)
      this.roleList = response.records
    },
    handleOpenRoleDialog(row) {
      this.roleForm.roleId = []
      this.roleDialogFormVisible = true
      row.roles.forEach(item => {
        this.roleForm.roleId.push(item.id)
      })
      this.roleId = row.id
    },
    handleSubmitRole() {
      this.$refs.roleDialogForm.validate(async (valid) => {
        if (valid) {
          const response = await RoleApi.updateRole(this.roleId, this.roleForm.roleId)
          this.roleDialogFormVisible = false
          this.$notify({ title: '提示', message: '更新成功', type: 'success' })
          this.loginUserList()
          console.log(response)
        }
      })
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
