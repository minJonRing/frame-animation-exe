import request from '@/utils/request'
// import store from '@/store'

export function ajax(option) {
  const { url, type } = option
  const _option = {
    method: type || 'get',
    responseType: 'json',
    ...option,
    url: `http://127.0.0.1:3000${url}`,
  }
  const {
    method,
    data
  } = _option
  if (['get', 'delete'].includes(method)) {
    _option.params = data
  }

  return request(_option)
}
