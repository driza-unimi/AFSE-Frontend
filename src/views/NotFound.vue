<template>
    <v-container class="fill-height" fluid>
      <v-row class="justify-center">
        <v-col class="text-center">
          <h1 class="display-1">404</h1>
          <p class="subheading">Oops! The page you're looking for doesn't exist.</p>
          <v-btn color="primary" @click="$router.push('/')">Go to Home</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  .fill-height {
    height: 100vh;
  }
  </style>
  