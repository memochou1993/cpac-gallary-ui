<template>
  <div>
    <v-card
      v-show="showAlbums"
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
      v-show="showLoading"
    >
      <AppLoading />
    </v-card>
  </div>
</template>

<script>
import Cache from '../helpers/Cache';
import AppLoading from './AppLoading.vue';

export default {
  components: {
    AppLoading,
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
    showAlbums() {
      return !!this.albums && this.albums.length !== 0;
    },
    showLoading() {
      return this.albums === null;
    },
  },
  watch: {
    category(value) {
      const resource = `/gallery/albums/${value}`;
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
