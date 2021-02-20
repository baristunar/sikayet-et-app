export default {
  namespaced: true,

  state: {
    loadingStatus: false,
  },
  mutations: {
    setLoadingStatus(state, status) {
      state.loadingStatus = status;
    },
  },
  getters: {
    getLoadingStatus: (state) => state.loadingStatus,
  },
};
