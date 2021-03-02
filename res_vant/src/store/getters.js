const getters = {
 
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userid: state => state.user.userid,
  globalLoading: state => state.app.globalLoading,
  yuzhong: state => state.app.yuzhong,
  global_fanyi_object: state => state.app.global_fanyi_object
}
export default getters
