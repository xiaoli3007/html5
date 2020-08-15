const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  uerid: state => state.user.userid,
  roles: state => state.user.roles,
	globalLoading: state => state.app.globalLoading
}
export default getters
