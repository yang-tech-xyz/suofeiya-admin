export default {
  namespaced: true,
  state: {
    // 无操作计时时间
    lockTime: 0,
    // 当前是否为锁屏状态
    isLock: localStorage.getItem('isLock') || 'false'
  },
  mutations: {
    updatelockTime(state, lockTime) {
      state.lockTime = lockTime
    },
    updateisLock(state, isLock) {
      state.isLock = isLock
      localStorage.setItem('isLock', isLock)
    }
  }
}
