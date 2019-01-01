<template>
  <div>
    <v-card
      v-if="albums && albums.length !== 0"
    >
      <v-list
        dense
        two-line
      >
        <template
          v-for="(album, index) in albums"
        >
          <v-list-tile
            :key="index"
            :to="{ name: 'gallery', query: { album: album.title } }"
            exact
          >
            <v-list-tile-content>
              <v-list-tile-title
                class="subheading px-3"
                v-text="album.title"
              />
              <v-list-tile-sub-title
                class="body-2 px-4"
              >
                {{ album.date }}
                <span
                  v-show="album.subtitle"
                >
                  - {{ album.subtitle }}
                </span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider
            v-if="index + 1 < albums.length"
            :key="index + '-divider'"
          />
        </template>
      </v-list>
    </v-card>
    <v-card
      v-if="!albums"
    >
      <div
        class="text-xs-center"
      >
        <img
          class="my-3 loading"
          src="../assets/loading.svg"
        >
      </div>
    </v-card>
  </div>
</template>

<script>
import Cache from '../helpers/Cache';

export default {
  data() {
    return {
      albums: [],
    };
  },
  computed: {
    category() {
      return this.$store.state.gallery.category;
    },
  },
  watch: {
    category(value) {
      const resource = `/gallery/albums/${value}`;
      this.albums = Cache.get(resource) || this.fetchAlbums(resource);
      if (this.albums) {
        this.$store.commit('setAlbums', this.albums);
      }
    },
  },
  methods: {
    fetchAlbums(resource) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_ALBUMS, 10);
      this.$store.dispatch('fetchAlbums', { resource, minutes })
        .then(() => {
          this.albums = this.$store.state.gallery.albums;
        });
    },
  },
};
</script>
