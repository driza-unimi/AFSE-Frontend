import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const customDarkTheme = {
  dark: true,
  colors: {
    primary: '#1E88E5',
    secondary: '#FF5722',
    accent: '#9d3b39',

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
  },
  theme: {
    defaultTheme: 'customDarkTheme',
    themes: {
      customDarkTheme,
    },
  },
  defaults: {

  },
});
