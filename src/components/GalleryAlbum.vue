<template>
  <div>
    <v-card>
      <v-list>
        <v-list-tile
          v-for="(album, index) in albums"
          :key="index"
          :to="{ name: 'gallery', query: { album: album } }"
          exact
        >
          <v-list-tile-content>
            <v-list-tile-title
              class="px-3"
              v-text="album"
            />
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
      const resource = `/albums/${value.replace(/\s/g, '')}`;
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
