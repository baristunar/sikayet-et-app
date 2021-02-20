import { appAxios } from "@/utils/securedAxios";




export default ({
    namespaced: true,
    state: {
        trademarks: []
    },
    mutations: {
        setTrademarks(state, pTrademarks) {
            state.trademarks = pTrademarks;
        }
    },
    actions: {
        fetchTrademarks({ commit }) {
            appAxios.get("/trademarks").then(getTrademarks_response => {
                console.log(getTrademarks_response);
                console.log('getTrademarks_response.status :>> ', getTrademarks_response.status);
                commit("setTrademarks", getTrademarks_response.data);

            })
        }
    },
    getters: {
        _getTrademarks: (state) => state.trademarks,
    }

})
