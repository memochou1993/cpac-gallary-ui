<template>
  <div>
    <v-expansion-panel
      class="hidden-md-and-up"
    >
      <v-expansion-panel-content
        class="title blue lighten-4"
      >
        <div
          slot="header"
        >
          {{ title }}
        </div>
        <v-list>
          <v-list-tile
            v-for="(album, index) in albums"
            :key="index"
            :to="{ name: 'gallery', query: { album: album.title } }"
            exact
            class="px-4"
          >
            <v-list-tile-content>
              <v-list-tile-title
                v-text="album.title"
              />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-card
      class="hidden-sm-and-down"
    >
      <v-toolbar
        dense
        color="blue lighten-4"
      >
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-tile
          v-for="(album, index) in albums"
          :key="index"
          :to="{ name: 'gallery', query: { album: album.title } }"
          exact
        >
          <v-list-tile-content>
            <v-list-tile-title
              v-text="album.title"
            />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '相簿',
      albums: [
        {
          title: 'Travis Howard',
        },
        {
          title: 'Ali Connors',
        },
        {
          title: 'Cindy Baker',
        },
      ],
    };
  },
};
</script>
