<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      clipped
      disable-resize-watcher
    >
      <v-list>
        <v-list-tile
          v-for="(link, index) in links"
          :key="index"
          :to="link.to"
        >
          <v-list-tile-action>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content
            class="title"
          >
            <v-list-tile-title>
              {{ link.title }}
            </v-list-tile-title>
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
        {{ title }}
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
      title: '竹北高中動畫社典藏庫',
      drawer: false,
      links: [
        {
          title: '首頁',
          to: { name: 'home' },
          icon: 'dashboard',
        },
        {
          title: '活動剪影',
          to: { name: 'gallery' },
          icon: 'photo_library',
        },
      ],
    };
  },
};
</script>
