import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    iconfont: 'md',
    theme: {
        themes: {
            light: {
                primary: '#E53935',
                secondary: '#FFFF00',
                neutral: '#000000',
                error: '#FF5252',
            },
        },
    },
});
