<template>
  <div>
    <div class="account-outer">
      <div class="account-left">我是左边</div>
      <div class="account-middle">
        <!-- 我的表单 -->
        <div class="myform">
          <el-form
            :model="myform"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="头像" prop="avatar">
              <el-upload
                class="upload-demo"
                action="/avatar/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture"
                with-credentials:true
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>

            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="myform.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="myform.email"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio v-model="myform.radio" label="0">男</el-radio>
              <el-radio v-model="myform.radio" label="1">女</el-radio>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="myform.phone"></el-input>
            </el-form-item>
            <el-form-item label="住址" prop="address">
              <el-input type="textarea" v-model="myform.address"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('myform')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 表单右侧信息 -->
        <div class="tips"></div>
      </div>
      <div class="account-right">我是右边</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // 手机号验证
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback()
      }
      // 手机正则
      const reg = /^1[3|4|5|7|8]\d{9}$/
      // 如果验证成功
      if (reg.test(this.myform.phone)) {
        callback()
      } else {
        callback(new Error('请输入正确格式的手机号'))
      }
    }
    // 邮箱验证
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback()
      }
      // 邮箱正则
      const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
      // 如果验证成功
      if (reg.test(this.myform.email)) {
        callback()
      } else {
        callback(new Error('请输入正确格式的邮箱地址'))
      }
    }
    return {
      // 我的账户表单
      myform: {
        nickname: '',
        email: '',
        phone: '',
        address: '',
        radio: '0',
        imageUrl: ''
      },
      // 表单验证规则
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        address: [
          {
            min: 3,
            max: 100,
            message: '长度在 3 到 100 个字符',
            trigger: 'blur'
          }
        ],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }]
      },
      fileList: []
    }
  },
  methods: {
    handlePreview (file, fileList) {
      console.log(file, fileList)
    },
    handleRemove () {},
    async submitForm () {
      const { nickname, email, gender, phone, address, radio } = this.myform
      const { data: res } = await this.$axios.post('/account/alter', {
        nickname, gender, address, email_num: email, phone_num: phone, radio
      })
      if (res.meta.status === 200) {
        this.$message.success('提交成功')
        this.$router.replace('/')
      }
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.account-outer {
  width: 100%;
  height: 100%;
  display: flex;
  .account-left {
    flex: 1;
  }
  .account-middle {
    flex: 2;
    // background-color: antiquewhite;
    display: flex;
    .myform{
      flex: 1;
      margin-top: 100px;
    }
    .tips{
      flex: 1;
    }
  }
  .account-right {
    flex: 1;
  }
}
</style>
