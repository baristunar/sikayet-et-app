
import { appAxios } from "@/utils/securedAxios";
import router from "@/router"




export default ({
    namespaced: true,
    state: {

        loginReject: false,
        activeUser: null,
        newUser: [],
        newCompany: []
    },
    mutations: {
        newUser(state, pUserDatas) {
            state.newUser = pUserDatas;
            console.log("state.new user", state.newUser);
        },
        newCompany(state, pCompanyDatas) {
            state.newCompany = pCompanyDatas;
            console.log("state new comp", state.newCompany);
        },
        
        setUser(state, pUser) {
            state.activeUser = pUser;
            localStorage.user = JSON.stringify(pUser);
        },
        loginReject(state, value) {
            state.loginReject = value;
        },
        logout(state) {
            state.activeUser = null;
            localStorage.clear();
            router.push("/giris");
        }
    },
    actions: {
        newUser({ commit }, pUserDatas) {
            appAxios.post("/users", pUserDatas).then(newUser_response => {
                console.log(pUserDatas);
                console.log('newUser :>> ', newUser_response.data);
                console.log(newUser_response.status)
                if (newUser_response.status === 201) {
                    commit("newUser", newUser_response.data);
                    commit("setUser", pUserDatas);
                    console.log(newUser_response.status)
                    router.push("/");
                }

            }).catch(e => console.log("error", e))
        },
        newCompany({ commit }, pCompanyDatas) {
            appAxios.post("/trademarks", pCompanyDatas).then(newCompany_response => {
                console.log(pCompanyDatas);
                console.log("newcompany => ", newCompany_response.data);
                console.log(newCompany_response.status)
                if (newCompany_response.status === 201) {
                    commit("newCompany", newCompany_response.data);
                    commit("setUser", pCompanyDatas);

                    router.push("/");

                }
            }).catch(e => console.log("newcompany error ", e));
        },
        login({ commit }, pUser) {

            if (pUser.registerType) {
                appAxios.get(`/users?email=${pUser.email}&password=${pUser.password}`).then(login_response => {
                    console.log(login_response.status);
                    if (login_response.status === 200 && login_response.data.length > 0) {
                        commit("setUser", login_response.data[0])
                       

                        router.push("/");
                    }
                    else {
                        // Creates Login Error
                        commit("loginReject", true);

                        setTimeout(() => {
                            commit("loginReject", false)
                        }, 3000)
                    }
                })
            }

            else if (!pUser.registerType) {
                appAxios.get(`/trademarks?email=${pUser.email}&password=${pUser.password}`).then(login_response => {
                    console.log(login_response.status);
                    if (login_response.status === 200 && login_response.data.length > 0) {
                        commit("setUser", login_response.data[0])
                        router.push("/");
                    }
                    else {
                        // Creates Login Error
                        commit("loginReject", true);

                        setTimeout(() => {
                            commit("loginReject", false)
                        }, 3000)
                    }
                })
            }
        },
        updateProfile({ commit }, pUserData) {
            appAxios.patch(`/users/${pUserData?.id}`, pUserData).then(upateProfile_response => {
                console.log("upateProfile_response   => ", upateProfile_response);
                commit("setUser", upateProfile_response?.data);

            }).catch(e => console.log("upateProfile_response err => ", e));
        },
        changePassword({ commit }, pUser) {
            appAxios.patch(`/users/${pUser?.id}`, pUser).then(changePassword_response => {
                console.log("change password resp => ", changePassword_response);
                commit("setUser", changePassword_response?.data);

            }).catch(e => console.log("chnge pw err => ", e));

        }
    },
    getters: {
        _loginReject: state => state.loginReject,
        _currentUser: state => state.activeUser,
        _isAuthenticated: state => state.activeUser !== null,
       
    }

})