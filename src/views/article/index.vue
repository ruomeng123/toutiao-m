<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap markdown-body">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#4fc08d" vertical type="spinner"
          >加载中</van-loading
        >
      </div>
      <!-- /加载中 -->
      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>

          <!-- 关注用户功能组件 -->
          <!-- <user-follow
            :isFollow="article.is_followed"
            :userId="this.article.aut_id"
            @update-isFollow="article.is_followed = $event"
          /> -->
          <user-follow
            :userId="this.article.aut_id"
            v-model="article.is_followed"
          />
        </van-cell>
        <!-- /用户信息 -->
        <!-- 文章内容 -->
        <div
          class="article-content"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论组件 -->
        <article-comment
          :list="commentList"
          :source="this.article.art_id"
          @onload-success="totalCommentCount = $event.total_count"
          @replyClick="onReplyClick"
        />

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon
            class="btn-item"
            name="comment-o"
            :info="totalCommentCount"
            @click="is_scroll = true"
          />
          <!-- 收藏功能组件 -->
          <collect-article
            class="btn-item"
            :articleId="this.article.art_id"
            v-model="article.is_collected"
          />

          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <like-article
            class="btn-item"
            :articleId="this.article.art_id"
            v-model="article.attitude"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post
            :target="article.art_id"
            @post-success="onPostSuccess"
          />
        </van-popup>
        <!-- /发布评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->
      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 发布回复评论 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <!-- 回复评论组件 -->
      <comment-reply
        v-if="isReplyShow"
        :comment="currentComment"
        @closeReply="isReplyShow = false"
      />
    </van-popup>
    <!-- /发布回复评论 -->
  </div>
</template>

<script>
import { getArticleInfo } from "@/api/article";
import { ImagePreview } from "vant";
import UserFollow from "@/components/user-follow";
import CollectArticle from "@/components/collect-article";
import LikeArticle from "@/components/like-article";
import ArticleComment from "@/views/article/components/article-comment";
import CommentPost from "@/views/article/components/comment-post";
import CommentReply from "@/views/article/components/comment-reply";

export default {
  name: "ArticleIndex",
  components: {
    UserFollow,
    CollectArticle,
    LikeArticle,
    ArticleComment,
    CommentPost,
    CommentReply,
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  // 传给所有后代组件
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  data() {
    return {
      loading: true,
      article: {}, // 文章详情
      errStatus: 0, // 错误代码
      totalCommentCount: 0, // 文章评论数量
      isPostShow: false, // 发布评论组件显示状态
      commentList: [], //评论列表
      isReplyShow: false, // 回复评论组件显示状态
      currentComment: {}, // 当前回复的评论
      // is_scroll: false, // 控制是否下拉到评论区
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticleInfo();
  },
  mounted() {},
  methods: {
    async loadArticleInfo() {
      try {
        const { data } = await getArticleInfo(this.articleId);
        // console.log(data);
        this.article = data.data;

        setTimeout(() => {
          // console.log(this.$refs['article-content']);
          this.previewImages();
        }, 0);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
      }
      this.loading = false;
    },
    previewImages() {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const images = [];
      imgs.forEach((img, index) => {
        images.push(img.src);

        // 给每一个img注册点击事件
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
    },
    onPostSuccess(data) {
      // 关闭弹窗
      this.isPostShow = false;
      // 把评论追加到评论列表顶部
      this.commentList.unshift(data.new_obj);
      // 把评论总数更新一下
      this.totalCommentCount++;
    },
    onReplyClick(comment) {
      this.currentComment = comment;
      console.log(comment);
      this.isReplyShow = true;
    },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  body {
    height: auto;
  }
  /deep/.van-icon {
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }
  .article-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }
    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }
    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }
  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777;
    }
    // .collect-btn--collected {
    //   color: #ffa500;
    // }
    // .like-btn--liked {
    //   color: #e5645f;
    // }
  }
}
</style>