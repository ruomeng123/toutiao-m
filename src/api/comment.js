import request from "@/utils/request";

// 获取评论
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 对评论点赞
export const addLikeComments = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论点赞
export const deleteLikeComments = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`,
  })
}

// 对文章或评论进行评论
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
