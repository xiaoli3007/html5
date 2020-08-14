const getters = {
 
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  uerid: state => state.user.userid,
  globalLoading: state => state.app.globalLoading
}
export default getters
