<template>
  <div>
    <v-layout
      row
      wrap
    >
      <v-flex
        md3
        xs12
      >
        <v-expansion-panel
          class="hidden-md-and-up"
        >
          <v-expansion-panel-content
            class="title blue lighten-4"
          >
            <div
              slot="header"
            >
              相簿
            </div>
            <v-list>
              <v-list-tile
                v-for="(album, index) in albums"
                :key="index"
                :to="{ name: 'gallery', query: { album: album.title } }"
                class="px-4"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="album.title" />
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
            <v-toolbar-title>相簿</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-tile
              v-for="(album, index) in albums"
              :key="index"
              :to="{ name: 'gallery', query: { album: album.title } }"
            >
              <v-list-tile-content>
                <v-list-tile-title v-text="album.title" />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>

      <v-flex
        md9
        xs12
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            md6
            xs12
          >
            <v-card>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                aspect-ratio="2.75"
              />
            </v-card>
          </v-flex>
          <v-flex
            md6
            xs12
          >
            <v-card>
              <v-img
                aspect-ratio="2.75"
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
              />
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
