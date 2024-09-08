<template>
  <v-app-bar app>
    <v-img
        src="src/assets/logo.png"
        class="mr-4 flex-grow-0"
        alt="logo.png"
        width="150"
        absolute
    />

    <v-spacer/>

    <div v-if="user?.role !== 'admin'">
      <v-btn v-for="(link, index) in navLinks" :key="index" :to="link.path" :exact="link.exact">
        {{ link.title }}
      </v-btn>
    </div>

    <v-spacer/>

    <div v-if="user?.username" class="d-flex align-center">
      <v-btn v-if="user?.role === 'admin'" class="mr-4" @click="logout">
        Logout
      </v-btn>

      <router-link v-else :to="{ path: '/profile' }" class="mr-4">
        <v-avatar size="40">
          <v-img
              :src="'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'"
              alt="Profile picture"
          />
        </v-avatar>
      </router-link>
    </div>

  </v-app-bar>
</template>

<script>
import apiService from "@/services/apiService.js";
import {useUserStore} from "@/stores/userStore.js";

export default {
  name: 'AppBar',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userStore: useUserStore(),

      navLinks: [
        { title: 'Album', path: '/album', exact: true },
        { title: 'Trade', path: '/trade' },
        { title: 'Shop', path: '/shop' }
      ]
    }
  },
  methods: {
    async logout() {
      try {
        await apiService.post('/logout');
        this.userStore.clearUser();
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  }
};
</script>

<style scoped>

</style>
