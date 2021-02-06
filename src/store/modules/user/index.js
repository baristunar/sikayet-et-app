
import { appAxios } from "@/utils/securedAxios";
import router from "@/router"




export default ({
    namespaced: true,
    state: {
        links: [
            {
                icon: "mdi-home",
                text: "Anasayfa",
                route: "/",
            },
            {
                icon: "mdi-comment-text-multiple",
                text: "Şikayetler",
                route: "/sikayetler",
            },
            {
                icon: "mdi-domain",
                text: "Markalar",
                route: "/markalar",
            },

        ],
        loginReject: false,
        activeUser: null,
        newUser: []
    },
    mutations: {
        newUser(state, pUserDatas) {
            state.newUser = pUserDatas;
            console.log(state.newUser);
        },
        setLinks(state) {
            state.links = [{

                icon: "mdi-home",
                text: "Anasayfa",
                route: "/",
            },
            {
                icon: "mdi-account-edit",
                text: "Profil",
                route: "/profil",
            },
            {
                icon: "mdi-comment-text-multiple",
                text: "Şikayetler",
                route: "/sikayetler",
            },
            {
                icon: "mdi-domain",
                text: "Markalar",
                route: "/markalar",
            },
            ]
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

                if (newUser_response.status === 200) {
                    commit("newUser", newUser_response.data);
                    commit("setUser", pUserDatas);
                }

            }).catch(e => console.log("error", e))
        },
        login({ commit }, pUser) {
            appAxios.get(`/users?email=${pUser.email}&password=${pUser.password}`).then(login_response => {

                if (login_response.status === 200 && login_response.data.length > 0) {
                    commit("setUser", login_response.data[0])
                    commit("setLinks");
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
        },
    },
    getters: {
        _loginReject: state => state.loginReject,
        _currentUser: state => state.activeUser,
        _isAuthenticated: state => state.activeUser !== null,
        _menuLinks: state => state.links
    }

})