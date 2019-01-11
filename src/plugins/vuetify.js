import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors';
import zhHant from 'vuetify/es5/locale/zh-Hant';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo,
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: colors.orange,
    success: '#4CAF50',
    warning: '#FFC107',
  },
  customProperties: true,
  iconfont: 'fa',
  lang: {
    locales: { zhHant },
    current: 'zh-Hant',
  },
});
