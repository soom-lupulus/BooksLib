<template>
  <div>
    <div class="navbar-outer">
      <div class="nav-left"></div>
      <div class="nav-right">
        <span
          @click="centerDialogVisible = true"
          ref="loginspan"
          v-show="!isshow"
          >登录/注册</span
        >
        <el-dropdown  v-show="isshow">
          <span class="el-dropdown-link">
            我的账号<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人主页</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/borrowsetting')">我的借阅</el-dropdown-item>
            <el-dropdown-item>账号设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="quit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>测试一下</span>
        <span>测试一下</span>
        <span>测试一下</span>
      </div>
    </div>
    <!-- 弹出层 -->
    <el-dialog
      title="登录/注册"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      @close="
        $refs['loginform'].resetFields();
        $refs['registerform'].resetFields();
      "
    >
      <!-- 登录表单 -->
      <el-form
        :model="login_form"
        :rules="login_form_rules"
        ref="loginform"
        label-width="100px"
        class="demo-ruleForm"
        v-show="form_show"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="login_form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pazzword">
          <el-input v-model="login_form.pazzword" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="form_show = !form_show"
            >没有账号？现在注册一个~</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('loginform')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 注册表单 -->
      <el-form
        :model="register_form"
        :rules="register_form_rules"
        ref="registerform"
        label-width="100px"
        class="demo-ruleForm"
        v-show="!form_show"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="register_form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pazzword">
          <el-input v-model="register_form.pazzword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_pazzword">
          <el-input
            v-model="register_form.confirm_pazzword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="form_show = !form_show"
            >返回登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('registerform')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.register_form.confirm_pazzword !== '') {
          this.$refs.registerform.validateField('confirm_pazzword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.register_form.pazzword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 弹出框的显示
      centerDialogVisible: false,
      // 表单的切换
      form_show: true,
      // 登录表单
      login_form: {
        username: '',
        pazzword: ''
      },
      // 登录表单规则
      login_form_rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '长度在 5 到 10 个字符',
            trigger: 'blur'
          }
        ],
        pazzword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 8,
            max: 16,
            message: '长度在 8 到 16 个字符',
            trigger: 'blur'
          }
        ]
      },
      // 注册表单
      register_form: {
        username: '',
        pazzword: '',
        confirm_pazzword: ''
      },
      // 注册表单规则
      register_form_rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '长度在 5 到 10 个字符',
            trigger: 'blur'
          }
        ],
        pazzword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          {
            min: 8,
            max: 16,
            message: '长度在 8 到 16 个字符',
            trigger: 'blur'
          }
        ],
        confirm_pazzword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      // 登录后的span显示
      isshow: false
    }
  },
  methods: {
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        // 如果表单合法
        if (valid) {
          // 如果是登录表单
          if (formName === 'loginform') {
            const { data: res } = await axios.get('/login', {
              params: {
                user: this.login_form.username,
                password: this.login_form.pazzword
              }
            })
            // 登陆成功
            if (res.meta.status === 201) {
              this.isshow = !this.isshow
              // 将token保存在sessionStorage中
              sessionStorage.setItem('token', res.data.token)
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              this.centerDialogVisible = false
            } else if (res.meta.status === 302) {
              this.$message({
                message: res.meta.msg,
                type: 'error'
              })
            }
          }
          // 如果是注册表单
          if (formName === 'registerform') {
            const { data: res } = await this.$http.post('/register', {
              user: this.register_form.username,
              password: this.register_form.pazzword
            })
            if (res.meta.status === 200) {
              this.$message({
                message: '注册成功~',
                type: 'success'
              })
              this.centerDialogVisible = false
            } else if (res.meta.status === 302) {
              this.$message({
                message: res.meta.msg,
                type: 'error'
              })
            }
          }
        } else {
          // 表单不合法
          this.$message({
            message: '表单不合法，请修改后重试',
            type: 'warn'
          })
          return false
        }
      })
    },
    // 退出
    quit () {
      this.isshow = !this.isshow
      // 清除sessionStorage
      sessionStorage.removeItem('token')
      this.$message({
        type: 'success',
        message: '退出成功~'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.navbar-outer {
  width: 100%;
  height: 28px;
  background-color: #545652;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: #d5d5d5;
    font: 12px Helvetica, Arial, sans-serif;
    cursor: pointer;
    margin-right: 15px;
    &:hover {
      color: #ffffff;
    }
  }
  .nav-right {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row-reverse;
  }
}
</style>
