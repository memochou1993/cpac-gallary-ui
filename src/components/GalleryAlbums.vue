<template>
  <div>
    <v-card
      v-show="!!albums && albums.length !== 0"
    >
      <v-list
        dense
        two-line
      >
        <template
          v-for="(item, index) in albums"
        >
          <v-list-tile
            :key="index"
            :class="[item === album ? 'grey lighten-3' : '']"
            @click="setAlbum(item)"
          >
            <v-list-tile-content>
              <v-list-tile-title
                class="subheading px-3"
                v-text="item.title"
              />
              <v-list-tile-sub-title
                class="body-2 px-4"
              >
                {{ item.date }}
                <span
                  v-show="item.subtitle"
                >
                  - {{ item.subtitle }}
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
      v-show="albums === null"
    >
      <AppProgress />
    </v-card>
  </div>
</template>

<script>
import Cache from '../helpers/Cache';
import AppProgress from './AppProgress.vue';

export default {
  components: {
    AppProgress,
  },
  data() {
    return {
      albums: [],
    };
  },
  computed: {
    category() {
      return this.$store.state.gallery.category;
    },
    album() {
      return this.$store.state.gallery.album;
    },
  },
  watch: {
    category(value) {
      const resource = {
        url: 'gallery/albums',
        params: {
          category: value,
        },
      };
      const cache = Cache.get(resource);
      this.albums = cache ? this.setAlbums(cache) : this.fetchAlbums(resource);
    },
  },
  methods: {
    setAlbums(value) {
      this.$store.commit('setAlbums', value);
      return value;
    },
    fetchAlbums(resource) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_ALBUMS, 10);
      this.$store.dispatch('fetchAlbums', { resource, minutes })
        .then(() => {
          this.albums = this.$store.state.gallery.albums;
        });
      return null;
    },
    setAlbum(value) {
      this.$store.commit('setAlbum', value);
    },
  },
};
</script>
