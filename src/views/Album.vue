<template>
  <v-container>
    <h2 class="pb-2">Album</h2>
    <template v-if="userStore.user.cards.length === 0">
      <h4>
        Empty Album, start your collection, now !!
      </h4>
      <v-btn color="primary" :to="{ path: '/shop' }">
        Buy cards
      </v-btn>
    </template>

    <v-row>
      <v-col
          v-for="(card, index) in userStore.user.cards"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          xxl="1"
      >
        <HeroCard :card="{...card}"/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {useUserStore} from "@/stores/userStore.js";
import HeroCard from "@components/HeroCard.vue";

export default {
  name: 'Album',
  components: {HeroCard},
  data() {
    return {
      userStore: useUserStore(),

    }
  },
  methods: {

  }
};
</script>

<style scoped>

</style>