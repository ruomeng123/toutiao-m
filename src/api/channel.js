import request from "@/utils/request";

// 获得所有频道数据
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 获得用户的频道数据
export const addUserChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除用户的指定频道数据
export const deleteUserChannels = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`,
  })
}