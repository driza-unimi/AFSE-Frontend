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
        <v-card height="450px">
          <v-card-title>{{ card.name }}</v-card-title>
          <v-card-text height="100%">
            <v-img
                :src="card.image"
                cover
            />
          </v-card-text>
<!--          <v-card-text class="pb-0">-->
<!--          </v-card-text>-->
<!--            {{ card.description }}-->

<!--          <v-card-actions>-->
<!--            <v-spacer/>-->
<!--            <v-btn color="primary" @click.stop="buyOffer(offer)">Buy Now</v-btn>-->
<!--          </v-card-actions>-->
        </v-card>
      </v-col>
    </v-row>
  </v-container>

<!--  TODO: V-DIALOG FOR HERO Informations-->

</template>

<script>
import {useUserStore} from "@/stores/userStore.js";

export default {
  name: 'Album',
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