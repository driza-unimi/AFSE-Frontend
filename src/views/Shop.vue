<template>
  <v-container>
    <template class="d-flex align-center pb-2">
      <h2>Shop</h2>
      <v-spacer/>
      <span class="pr-2"> {{ userStore.user?.credit }} </span>
      <v-avatar size="24">
        <v-img
            src="/favicon.ico"
            alt="icon"
        />
      </v-avatar>
    </template>
    <v-row>
      <v-col
          v-for="(offer, index) in offers"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          xxl="1"
      >
        <v-card height="450px">
          <v-card-title>{{ offer.name }}</v-card-title>

          <v-card-text class="pb-0">
            <v-img
                :src="getImageForOffer(offer)"
                cover
                height="300px"
            />
            {{ offer.description }}
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn @click.stop="buyOffer(offer)" prepend-icon="mdi-currency-eur">
              {{ offer.cost }}

              <template v-slot:prepend v-if="offer.type === 'pack'">
                <v-avatar size="24">
                  <v-img
                      src="/favicon.ico"
                      alt="icon"
                  />
                </v-avatar>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="cardDialog" max-width="70%" max-height="50%">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold d-flex align-center pb-0">
          Check what you found !
          <v-spacer/>
          <v-btn
              icon="mdi-close"
              variant="text"
              @click="cardDialog = false"
          />
        </v-card-title>

        <v-row class="px-2">
          <v-col
              v-for="(card, index) in cards"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
              xxl="1"
          >
            <v-card>
              <v-card-title>{{ card.name }}</v-card-title>
              <v-card-text height="100%">
                <v-img
                    :src="card.image"
                    cover
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import {useUserStore} from "@/stores/userStore.js";
import apiService from "@/services/apiService.js";
import {toast} from "vuetify-sonner";

export default {
  name: "Trade",
  data() {
    return {
      offers: [],
      userStore: useUserStore(),

      cardDialog: false,
      cards: [],
    }
  },
  async created() {
    await this.fetchOffer();
  },
  methods: {
    getImageForOffer(offer) {
      if (offer.type === "credit") {
        switch (offer.name) {
          case "Starter Pack":
            return "src/assets/background.png";
          case "Booster Pack":
            return "src/assets/background.png";
          case "Hero Pack":
            return "src/assets/background.png";
            case "Champion Pack":
            return "src/assets/background.png";
          default:
            return "src/assets/background.png";
        }
      } else if (offer.type === "pack") {
        switch (offer.name) {
          case "Basic Card Pack":
          case "Premium Card Pack":
            return "src/assets/common_pack_background.jpg";
          case "Elite Card Pack":
            return "src/assets/epic_pack_background.jpg";
          case "Legendary Pack":
            return "src/assets/mythic_pack_background.jpg";
          default:
            return "src/assets/background.png";
        }
      }
    },
    async fetchOffer() {
      try {
        const response = await apiService.get('/user/offers');
        this.offers = response.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
    async buyOffer(offer) {
      try {
        const response = await apiService.post('/user/buy', {
          id: offer._id
        });

        if (offer.type === "pack") {
          this.cardDialog = true;
          this.cards = response.data;
        }

        await this.cacheUserData();
      } catch (error) {
        toast.error(error.message);
      }
    },
    async cacheUserData() {
      const response = await apiService.get('/user');
      this.userStore.setUser(response.data);
    },
  }
}
</script>

<style scoped>

</style>