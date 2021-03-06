const getters = {
 
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  userid: state => state.user.userid,
  globalLoading: state => state.app.globalLoading,
  yuzhong: state => state.app.yuzhong,
  global_fanyi_object: state => state.app.global_fanyi_object
}
export default getters
