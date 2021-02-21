import { appAxios } from "@/utils/securedAxios";
import loading from '../loading';

import router from "@/router";

export default {
  namespaced: true,
  trademark: null,
  state: {
    complaints: [],
    trademarks: [],
    trademarkData: Object,
  },
  mutations: {
    setNewComplaint(state, pComplaintData) {
      state.complaints.push(pComplaintData);
    },
    setComplaints(state, pComplaints) {
      state.complaints = pComplaints;
    },
    setTrademark(state, payload) {
      state.trademark = payload;
    },
    setTrademarkData(state, payload) {
      state.trademarkData = payload;
      console.log("state", state.trademarkData);
    },
    updateTrademarkData(state, payload) {
      console.log("test", state.trademarkData);
      state.trademarkData.complaints.push({
        complaintID: payload,
      });
    },
  },
  actions: {
    newComplaint({ commit, dispatch }, pComplaintData) {
      appAxios
        .post("/complaints", pComplaintData)
        .then((newComplaint_response) => {
          commit("loading/setLoadingStatus", true);
          const data = newComplaint_response.data;
          console.log(newComplaint_response.data);
          commit("setNewComplaint", data);
          dispatch(`fetchTrademarkData`, data.trademarkID);

          setTimeout(() => {
            commit("updateTrademarkData", data.id);
            console.log("2 saniye sonra calıstı");
            dispatch(`updateTrademark`, data.trademarkID);
            router.push("/sikayetler");
            commit("loading/setLoadingStatus", false);
          }, 2000);

        })
        .catch((e) => console.log("newComplaint error => ", e));
    },
    fetchComplaints({ commit }) {
      appAxios
        .get("/complaints")
        .then((getComplaint_response) => {
          console.log("get comp resp => ", getComplaint_response.data);
          commit("setComplaints", getComplaint_response.data);
        })
        .catch((e) => console.log("get complaints error => ", e));
    },
    fetchTrademarkData({ commit }, payloadID) {
      appAxios
        .get(`trademarks/${payloadID}`)
        .then((fetchTrademarkdata_response) => {
          console.log(
            "fetchTrademarkdata_response",
            fetchTrademarkdata_response
          );
          commit("setTrademarkData", fetchTrademarkdata_response.data);
        });
    },
    updateTrademark({ state }, payloadID) {
      appAxios
        .patch(`trademarks/${payloadID}`, state.trademarkData)
        .then((update_response) => {
          console.log("update response", update_response);
        })
        .catch((error) => console.log("update error => ", error));
    },
  },
  getters: {
    _getComplaints: (state) => state.complaints,
  },
  modules: {
    loading
  }
};
