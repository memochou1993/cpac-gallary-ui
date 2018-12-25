<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
    >
      <v-list>
        <v-list-tile
          v-for="(list, index) in lists"
          :key="index"
          :to="list.to"
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ list.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ list.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      clipped-left
      color="indigo"
      dark
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        class="headline"
      >
        {{ toolbar.title }}
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-btn
          v-for="(item, index) in toolbar.items"
          :key="index"
          :href="item.href"
          flat
          class="title font-weight-light"
        >
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolbar: {
        title: '竹北高中動畫社典藏庫',
        items: [
          {
            title: '回到首頁',
            href: 'http://cpac.epoch.tw',
          },
        ],
      },
      lists: [
        {
          title: 'Home',
          to: { name: 'home' },
          icon: 'dashboard',
        },
        {
          title: 'Gallery',
          to: { name: 'gallery' },
          icon: 'photo_library',
        },
      ],
      drawer: false,
    };
  },
};
</script>
