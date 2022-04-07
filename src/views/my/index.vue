<template>
  <div class="my-container">
    <!-- 已登录页面头部 -->
    <div v-if="user" class="header user-info">
      <!-- 基础信息部分 -->
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            fit="cover"
            src="userInfo.photo"
          />
          <div class="txt">{{userInfo.name}}</div>
        </div>
        <div class="right">编辑资料</div>
      </div>
      <!-- 数据统计部分 -->
      <div class="data-stats">
        <div class="van-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="item">头条</span>
        </div>
        <div class="van-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="item">关注</span>
        </div>
        <div class="van-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="item">粉丝</span>
        </div>
        <div class="van-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="item">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录页面头部 -->
    <div v-else class="header not-login">
      <img
        class="img-mobile"
        src="~@/assets/mobile.png"
        alt=""
        @click="$router.push('/login')"
      />
      <span class="text">登录 / 注册</span>
    </div>

    <!-- 导航 -->
    <van-grid :column-num="2">
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text">收 藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text">历 史</span>
      </van-grid-item>
    </van-grid>

    <van-cell-group>
      <!-- 消息通知、小智同学 -->
      <van-cell title="消息通知" is-link />
      <van-cell class="xaiozhi" title="小智同学" is-link />

      <!-- 退出登录 -->
      <van-cell
        class="logout-cell"
        title="退出登录"
        center
        @click="onLogout"
        v-if="user"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user";
export default {
  name: "MyIndex",

  components: {},

  props: {},

  data() {
    return {
      userInfo: {}, // 用户信息
    };
  },

  computed: {
    ...mapState(["user"]),
  },

  watch: {},

  created() {
    // 请求加载用户数据
    if (this.user && this.user.token) {
      this.lodeUser();
    }
  },

  mounted() {},

  methods: {
    // 登录退出事件
    onLogout() {
      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          // console.log("确认了");
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          console.log("取消了");
        });
    },
    // 加载用户数据
    async lodeUser() {
      try {
        const { data } = await getUserInfo();
        console.log(data);
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败！')
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.my-container {
  box-sizing: border-box;
  .header {
    height: 360px;
    width: 100%;
    background-color: #4fc08d;
    // background: url("~@/assets/banner.png") no-repeat;
    // background-size: cover;
  }
  .not-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img-mobile {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
  .user-info {
    // padding-top: 20px;
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 230px;
      // background-color: aquamarine;
      padding: 0 32px 0;
      .left {
        display: flex;
        align-items: center;
        // padding: 80px 32px 0;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
          margin-right: 22px;
        }
        .txt {
          color: #fff;
          font-size: 30px;
        }
      }
      .right {
        width: 116px;
        height: 33px;
        font-size: 20px;
        text-align: center;
        line-height: 33px;
        color: #666;
        background-color: #fff;
        border-radius: 16px;
      }
    }
    .data-stats {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 130px;
      // background-color: antiquewhite;
      .van-item {
        display: flex;
        // flex: 1;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .item {
          font-size: 23px;
        }
      }
    }
  }
  .van-grid {
    .van-grid-item {
      .toutiao {
        font-size: 45px;
        // color: antiquewhite;
      }
      span {
        font-size: 28px;
        color: #333;
      }
    }
  }
  .van-cell-group {
    .van-cell__title {
      span {
        font-size: 30px;
        color: #333;
      }
    }
    .logout-cell {
      // margin-top: 10px;
      .van-cell__title {
        text-align: center;
        span {
          color: #d86262;
        }
      }
    }
  }
}
</style>