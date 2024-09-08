<template>
  <v-app :class="{ background: !showAppBar}">
    <VSonner position="top-right" />
    <AppBar
        v-if="showAppBar"
        :user="userStore.user ?? {}"
    />

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {useUserStore} from '@/stores/userStore';
import AppBar from "@components/AppBar.vue";
import {VSonner} from "vuetify-sonner";
import 'vuetify-sonner/style.css'

export default {
  components: {VSonner, AppBar},
  data() {
    return {
      userStore: useUserStore(),

      showAppBar: true,
    };
  },
  created() {
    this.updateAppBarVisibility(this.$route.path);
  },
  watch: {
    '$route.path'(newPath) {
      this.updateAppBarVisibility(newPath);
    }
  },
  methods: {
    updateAppBarVisibility(path) {
      this.showAppBar = !['/auth'].includes(path);

      if (this.user?.role === 'admin' && path !== '/admin') {
        this.$router.push('/admin');
      }
    },
  },

};
</script>

<style scoped>
.background {
  background-image: url("@/assets/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: auto;
}

</style>
