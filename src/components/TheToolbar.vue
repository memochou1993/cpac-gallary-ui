<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list
        dense
      >
        <v-list-tile
          :to="{ name: 'home' }"
          exact
        >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          :to="{ name: 'gallery' }"
          exact
        >
          <v-list-tile-action>
            <v-icon>photo_library</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Gallery</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      clipped-left
      fixed
      app
      color="indigo"
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        class="headline"
      >
        竹北高中動畫社典藏庫
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          flat
          href="#"
          class="title font-weight-light"
        >
          回首頁
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped lang="stylus">
.headline, .title
  font-family 'Microsoft Jhenghei' !important
</style>
