import { appAxios } from "@/utils/securedAxios";


export default ({
    namespaced: true,
    state: {
        complaints: []
    },
    mutations: {
        setNewComplaint(state, pComplaintData) {
            state.complaints.push(pComplaintData);
        }
    },
    actions: {
        newComplaint({ commit }, pComplaintData) {
            appAxios.post("/complaints", pComplaintData).then(newComplaint_response => {
                console.log(newComplaint_response.data);
                commit("setNewComplaint", newComplaint_response.data);
            }).catch(e => console.log("newComplaint error => ", e))
        }

    },
    getters: {
        _getComplaints: state => state.complaints,
    }

})