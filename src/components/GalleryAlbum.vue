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
      this.albums = Cache.get(`/albums/${this.category}`);
      if (!this.albums) {
        this.fetchAlbums(value);
      }
    },
  },
  methods: {
    fetchAlbums(category) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_ALBUMS, 10);
      console.log({ category, minutes });
      this.$store.dispatch('fetchAlbums', { category, minutes })
        .then(() => {
          this.albums = this.$store.state.albums;
        });
    },
  },
};
</script>
