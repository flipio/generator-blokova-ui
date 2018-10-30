<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Generator</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <Generator/>
    </v-content>
  </v-app>
</template>

<script>
import Generator from "./components/Generator";

export default {
  name: 'App',
  components: {
    Generator,
  },
}
</script>
