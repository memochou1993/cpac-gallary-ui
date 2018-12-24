<template>
  <div id="app">
    <v-app>
      <Toolbar />
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'App',
  components: {
    Toolbar,
  },
  data() {
    return {
      //
    };
  },
};
</script>
