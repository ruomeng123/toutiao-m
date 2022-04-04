<template>
  <div class="login-container">
    <!-- 标题栏 -->
    <van-nav-bar class="login-navbar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单区域 -->
    <van-form @submit="onLogin" ref="loginForm">
      <!-- 手机号区域 -->
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <!-- 手机字体图标 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- 验证码区域 -->
      <van-field
        class="sms-wrap"
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <!-- 验证码字体图标 -->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 获取验证码按钮 -->
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss 秒"
            @finish="isCountDownShow = false"
          />
          <!-- 重要！！！在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。在使用这些按钮时，要注意将native-type设置为button，否则会触发表单提交。 -->
          <van-button
            v-else
            @click="onSendSms"
            class="send-sms-btn"
            size="small"
            type="default"
            native-type="button"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSms } from "@/api/user";
// import "@/store"
export default {
  // 本页面组件名称
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      // 双向绑定表单数据
      user: {
        mobile: "",
        code: "",
      },
      // 表单校验规则
      userFormRules: {
        mobile: [
          // 手机号为必填项
          {
            required: true,
            message: "请填写手机号!",
          },
          // 手机号正则校验
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "手机号格式错误!",
          },
        ],
        code: [
          // 验证码为必填项
          {
            required: true,
            message: "验证码不能为空!",
          },
          // 验证码校验规则
          {
            pattern: /^\d{6}$/,
            message: "验证码错误!",
          },
        ],
      },
      // 控制发送验证码后的倒计时组件是否显示
      isCountDownShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 登录按钮点击事件
    async onLogin() {
      // 点击之后，首先弹出提示'登陆中'
      this.$toast.loading({
        message: "登录中...", // 提示文字
        forbidClick: true, // 是否禁止背景点击
        duration: 0, // 持续展示
      });
      // 请求登录
      try {
        const res = await login(this.user);
        // console.log("登录成功", res);

        // 保存登录后拿到的Token
        this.$store.commit('setUser',res.data.data)

        this.$toast.success("登录成功!");

        // 跳转页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log("登录失败", err);
          this.$toast.fail("手机号或验证码错误!");
        } else {
          console.log("未知错误!请稍后重试", err);
          this.$toast.fail("登录失败,请稍后重试!");
        }
      }
    },
    // 发送验证码点击事件
    async onSendSms() {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate("mobile");
        console.log("验证通过");
      } catch (err) {
        return console.log("验证失败", err);
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true;
      // 3. 请求发送验证码
      try {
        await getSms(this.user.mobile);
        this.$toast("发送成功!");
      } catch (err) {
        // 发送失败，停止倒计时
        this.isCountDownShow = true;
        // 失败原因
        if (err.response.status === 429) {
          this.$toast("操作太频繁了！请稍后再试！");
        } else {
          this.$toast("发送失败，请稍后再试！");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    margin: 53px 28px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      border-radius: 10px;
      font-size: 30px;
    }
  }
  .toutiao {
    font-size: 37px;
    margin-right: 15px;
  }
  .sms-wrap {
    .van-field__control {
      border-right: 2px solid #eee;
    }
    .send-sms-btn {
      width: 152px;
      height: 46px;
      top: -4px;
      border-radius: 23px;
      background-color: #ededed;
      color: #666;
      font-size: 22px;
      line-height: 46px;
    }
  }
}
</style>