<template>
  <div>
    <v-card>
      <v-list>
        <v-list-tile
          v-for="(album, index) in albums"
          :key="index"
          :to="{ name: 'gallery', query: { album: album.title } }"
          exact
        >
          <v-list-tile-content>
            <v-list-tile-title
              class="px-3"
              v-text="album.title"
            />
            <v-list-tile-sub-title
              class="px-4"
            >
              {{ album.date }}
              <span
                v-show="album.subheading"
              >
                - {{ album.subheading }}
              </span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
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
      return this.$store.state.category;
    },
  },
  watch: {
    category(value) {
      const resource = `/albums/${value}`;
      this.albums = Cache.get(resource);
      if (!this.albums) {
        this.fetchAlbums(resource);
      }
    },
  },
  methods: {
    fetchAlbums(resource) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_ALBUMS, 10);
      this.$store.dispatch('fetchAlbums', { resource, minutes })
        .then(() => {
          this.albums = this.$store.state.albums;
        });
    },
  },
};
</script>
