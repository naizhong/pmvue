<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <v-toolbar-title>Portfolios
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <FileUpload/>
    </v-app-bar>

    <v-main>
      <Dashboard/>
    </v-main>
    
  </v-app>
</template>

<script>
import Dashboard from './views/Dashboard';
import FileUpload from '@/components/FileUpload.vue'

export default {
  name: 'App',

  components: {
    Dashboard,
    FileUpload,
  },

  data: () => ({
    //
  }),
};
</script>
