<template>
  <v-container>
    <h1>
      Offers
    </h1>
    <v-data-table
        :headers="headers"
        :items="items"
        fixed-header
        item-value="_id"
        class="elevation-1"
        hide-default-footer
        disable-sort
    >
      <template v-slot:[`item.valid`]="{ item }">
        <v-checkbox
            v-model="item.valid"
            @change="onValidChange(item)"
        />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import apiService from "@/services/apiService.js";
import {toast} from "vuetify-sonner";

export default {
  name: 'AdminHome',
  data() {
    return {
      headers: [
        { key: 'name', title: 'Name' },
        { key: 'description', title: 'Description' },
        { key: 'cost', title: 'Cost' },
        { key: 'type', title: 'Type' },
        { key: 'value', title: 'Value' },
        { key: 'valid', title: 'Valid' },
      ],
      items: [],
    };
  },
  async mounted() {
    try {
      const response = await apiService.get('/admin/allOffers');
      this.items = response.data;
    } catch (error) {
      toast.error(error.message);
    }
  },
  methods: {
    async onValidChange(item) {
      try {
       await apiService.post('/admin/update/offer', {
          id: item._id,
          valid: item.valid,
        });
      } catch (error) {
        toast.error(error.message);
      }
    },
  },
};
</script>

<style scoped>

</style>
