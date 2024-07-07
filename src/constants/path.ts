const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  login: '/login',
  register: '/register',
  logout: '/logout',
  cart: '/cart',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  productDetail: ':nameId'
} as const

export default path
