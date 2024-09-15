<template>
  <v-card :height="small ? '350px' : '440px'" :class="card.rarity" @click.stop="showCardDialog = true">
    <v-card-title class="d-flex justify-center pr-2">
      {{ card.name }}
      <v-spacer/>
      <v-badge
          v-if="card.count > 1"
          :content="card.count"
          location="top right"
          value="true"
          color="primary"
      />
    </v-card-title>
    <v-card-text height="100%">
      <v-img :src="card.image" cover/>
    </v-card-text>
  </v-card>

  <v-dialog v-model="showCardDialog" max-width="70%" max-height="50%">
    <v-card>
      <v-card-title class="text-h5 font-weight-bold d-flex align-center pb-0">
        {{ card.name }}
        <v-spacer />
        <v-btn
            icon="mdi-close"
            variant="text"
            @click="showCardDialog = false"
        />
      </v-card-title>

      <v-card-text class="overflow-auto pt-1">
        <h4>Description:</h4>
        {{ card.description }}
        <h4 class="pt-1">Rarity:</h4>
        {{ card.rarity }}
        <h4 class="pt-1">Total:</h4>
        {{ card.count }}
      <v-expansion-panels variant="accordion" class="pt-1">
        <v-expansion-panel>
          <v-expansion-panel-title>Series</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list>
              <v-list-item v-for="series in card.series" :key="series.resourceURI">
                {{ series.name }}
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>Comics</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list>
              <v-list-item v-for="comic in card.comics" :key="comic.resourceURI">
                {{ comic.name }}
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>Events</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list>
              <v-list-item v-for="event in card.events" :key="event.resourceURI">
                {{ event.name }}
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "HeroCard",
  props: {
    card: {
      type: Object,
      default: {},
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showCardDialog: false,
    }
  },
  methods: {}
}
</script>

<style scoped>
.common {
  background: #fff;
}

.rare {
  background: #fd5607;
}

.epic {
  background: #7607fd;
}

.legendary {
  position: relative;
  border: 0;
  overflow: hidden;
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.legendary::after,
.legendary::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  width: 100%;
  background-image: conic-gradient(
      from var(--angle),
      #ff4545,
      #00ff99,
      #006aff,
      #ff0095,
      #ff4545
  );
  translate: -50% -50%;
  z-index: -1;
  animation: spin 3s linear infinite;
}

.legendary::before {
  filter: blur(1.5rem);
  opacity: 0.5;
}

@keyframes spin {
  from {
    --angle: 0deg;
  }
  to {
    --angle: 360deg;
  }
}
</style>