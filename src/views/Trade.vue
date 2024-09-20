<template>
  <v-container>
    <v-tabs v-model="activeTab" grow color="primary">
      <v-tab>My Offers</v-tab>
      <v-tab>Marketplace</v-tab>
    </v-tabs>

    <v-tabs-window v-model="activeTab">

      <!--      MyOffers -->
      <v-tabs-window-item>
        <div class="d-flex">
          <v-spacer/>
          <v-btn class="mr-4" @click="sellAllDuplicates">Sell All Duplicates</v-btn>
          <v-btn color="primary" @click="openNewTradeDialog">
            Add
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <v-row class="pt-4">
          <v-col
              v-for="trade in myTrades"
              :key="trade._id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
              xxl="1"
          >
            <v-card>
              <div @click.capture.stop="openTradeDialog(trade)">
                <HeroCard :card="trade.card"/>
              </div>
              <v-card-text class="d-flex">
                Number of offers: {{ trade.offers.length }}
                <v-spacer/>
                <v-icon @click.stop="removeTrade(trade)">mdi-trash-can-outline</v-icon>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog v-model="tradeDialog" max-width="600">
          <v-card>
            <v-card-title>{{ selectedTrade.card.name }} - Offers</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item style="background-color: dimgray" v-for="offer in selectedTrade.offers" :key="offer._id"
                             @click="viewOfferDetails(offer)">
                  <v-list-item-title>
                    {{ offer.buyer.username }} offers {{ offer.cards.length }} cards
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="tradeDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="offerDetailDialog">
          <v-card>
            <v-card-title>{{ currentOfferDetail.buyer.username }} - Offer</v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                    v-for="(card, index) in currentOfferDetail.cards"
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
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="confirmTrade(currentOfferDetail)">Confirm Trade</v-btn>
              <v-btn @click="offerDetailDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-dialog v-model="newTradeDialog" max-width="90%">
          <v-card>
            <v-card-title>Select duplicate card to trade</v-card-title>
            <v-card-text>
              <span v-if="duplicates.length === 0">No duplicate card is available to trade</span>
              <v-row>
                <v-col
                    v-for="(item, index) in duplicates"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    xl="2"
                    xxl="1"
                    @click.capture.stop="createTrade(item.card)"
                >
                  <HeroCard :card="{...item.card}"/>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn @click="newTradeDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-tabs-window-item>


      <!--      Market-->
      <v-tabs-window-item>
        <v-row class="pt-4">
          <v-col
              v-for="offer in marketTrades"
              :key="offer._id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
              xxl="1"
              @click.capture.stop="openMarketTrade(offer)"
          >
            <v-card>
              <HeroCard :card="offer.card"/>
              <v-card-text class="d-flex">
                Offered by: {{ offer.seller.username }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog v-model="marketDialog" max-width="90%">
          <v-card>
            <v-card-title>Select duplicate card to offer</v-card-title>
            <v-card-text>
              <span v-if="duplicates.length === 0">No duplicate card is available to offer</span>
              <span v-else>Card offered: {{ currentCardOffered.length }}</span>
              <v-row>
                <v-col
                    v-for="(item, index) in duplicates"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    xl="2"
                    xxl="1"
                    @click.capture.stop="addToOffer(item.card)"
                >
                  <HeroCard :card="{...item.card}"/>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="submitOffer(selectedMarketTrade)">Submit Offer</v-btn>
              <v-btn @click="marketDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script>
import apiService from "@/services/apiService.js";
import {toast} from "vuetify-sonner";
import HeroCard from "@components/HeroCard.vue";

export default {
  components: {HeroCard},
  data() {
    return {
      activeTab: 0,
      duplicates: [],
      myTrades: [],
      marketTrades: [],
      userCards: [],
      newTradeDialog: false,
      tradeDialog: false,
      offerDetailDialog: false,
      marketDialog: false,
      selectedTrade: null,
      currentOfferDetail: null,
      selectedMarketTrade: null,
      currentCardOffered: [],
    };
  },
  async mounted() {
    await this.fetchInformations();
  },
  methods: {
    async fetchInformations() {
      await this.fetchMyTrades();
      await this.fetchMarketTrades();
      await this.fetchDuplicates();
    },
    openNewTradeDialog() {
      this.newTradeDialog = true;
    },
    openTradeDialog(trade) {
      if (trade.offers.length < 1) return;

      this.selectedTrade = trade;
      this.tradeDialog = true;
    },
    async createTrade(card) {
      try {
        this.newTradeDialog = false;
        await apiService.put('/trade/', {
          cardId: card._id,
        });
        await this.fetchInformations();
        toast.success("Success");
      } catch (error) {
        toast.error(error.message);
      }
    },
    async removeTrade(trade) {
      try {
        await apiService.delete('/trade/' + trade._id);
        await this.fetchInformations();
        toast.success("Success");
      } catch (error) {
        toast.error(error.message);
      }
    },
    viewOfferDetails(offer) {
      this.offerDetailDialog = true;
      this.currentOfferDetail = offer;
    },
    async confirmTrade(trade) {
      try {
        await apiService.post('/trade/accept', {
          offerId: this.selectedTrade._id,
          selectedOfferId: trade._id,
        });
        this.tradeDialog = false;
        this.offerDetailDialog = false;
        await this.fetchInformations();
        toast.success("Trade offer confirmed");
      } catch (error) {
        toast.error(error.message);
      }
    },
    async sellAllDuplicates() {
      try {
        const response = await apiService.post('/trade/sellAll');
        await this.fetchInformations();
        toast.success(`You gained: ${response.data} credits!`);
      } catch (error) {
        toast.error(error.message);
      }
    },
    openMarketTrade(trade) {
      this.selectedMarketTrade = trade;
      this.marketDialog = true;
    },
    addToOffer(card) {
      if (this.currentCardOffered.includes(card._id)) {
        toast.warning('Card already selected');
        return;
      }
      this.currentCardOffered.push(card._id)
      console.log('Selected card:', card);
    },
    async submitOffer(trade) {
      try {
        await apiService.post('/trade/offer', {
          offerId: trade._id,
          offeredCardIds: this.currentCardOffered
        });

        await this.fetchInformations();
        toast.success('Card/s offered!');
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.marketDialog = false;
        this.currentCardOffered = [];
      }
    },
    async fetchDuplicates() {
      try {
        const response = await apiService.get('/user/duplicates');
        this.duplicates = response.data ?? [];
      } catch (error) {
        console.error(error);
      }
    },
    async fetchMyTrades() {
      try {
        const response = await apiService.get('/user/trades');
        this.myTrades = response.data ?? [];
      } catch (error) {
        console.error(error);
      }
    },
    async fetchMarketTrades() {
      try {
        const response = await apiService.get('/trade/');
        this.marketTrades = response.data ?? [];
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.v-tabs-window-item {
  height: calc(100vh - 150px);
  padding: 1rem;
  overflow: auto;
}
</style>