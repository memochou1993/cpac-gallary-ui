<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      clipped
      temporary
      disable-resize-watcher
    >
      <v-list>
        <v-list-tile
          v-for="(link, index) in links"
          :key="index"
          :to="link.to"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      dark
      clipped-right
      color="indigo"
    >
      <v-toolbar-title
        class="headline"
      >
        {{ toolbar.title }}
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-items
        class="hidden-sm-and-down"
      >
        <v-btn
          v-for="(link, index) in links"
          :key="index"
          :to="link.to"
          class="title font-weight-light"
          flat
        >
          {{ link.title }}
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
        links: [
          {
            title: '回到首頁',
            href: 'http://cpac.epoch.tw',
          },
        ],
      },
      drawer: false,
      links: [
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
    };
  },
};
</script>
