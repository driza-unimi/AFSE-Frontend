import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
// import '@mdi/font/css/materialdesignicons.css';

const customTheme = {
  dark: false,
  colors: {
    primary: '#4CAF50',
    secondary: '#FF9800',
    accent: '#9C27B0',
    error: '#F44336',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
};

const customDarkTheme = {
  dark: true,
  colors: {
    primary: '#1E88E5',
    secondary: '#FF5722',
    accent: '#9C27B0',
    error: '#E53935',
    info: '#00ACC1',
    success: '#43A047',
    warning: '#FB8C00',
  },
};

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'customDarkTheme',
    themes: {
      customTheme,
      customDarkTheme,
    },
  },
  defaults: {

  },
});
