import request from './request'

// 查询 可打印列表
export const getPrintHtml = (data) => {
  return request({
    url: '/toHtml',
    method: 'post',
    params: { data }
  })
}
