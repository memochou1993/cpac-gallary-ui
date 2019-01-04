<template>
  <div>
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="(item, index) in photos"
        :key="index"
        md6
        xs12
      >
        <v-card>
          <v-img
            class="pointer"
            aspect-ratio="1.618"
            :src="item.path.web"
            @click="setPhoto(item)"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn
              icon
              color="info--text"
            >
              <v-icon>share</v-icon>
            </v-btn>
            <v-btn
              icon
              color="info--text"
            >
              <v-icon>cloud_download</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex
        v-show="showLoading"
      >
        <AppLoading />
      </v-flex>
      <v-dialog
        v-if="photo !== null"
        v-model="dialog"
        max-width="700"
      >
        <v-card>
          <v-img
            :src="photo.path.raw"
            :lazy-src="photo.path.web"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-layout>
          </v-img>
        </v-card>
      </v-dialog>
    </v-layout>
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
      photos: [],
      dialog: false,
    };
  },
  computed: {
    album() {
      return this.$store.state.gallery.album;
    },
    photo() {
      return this.$store.state.gallery.photo;
    },
    showLoading() {
      return this.photos === null;
    },
  },
  watch: {
    album(value) {
      const resource = `/gallery/photos/${this.$store.state.gallery.category}/${value.date}_${value.title}${value.subtitle ? `_${value.subtitle}` : ''}`;
      const cache = Cache.get(resource);
      this.photos = cache ? this.setPhotos(cache) : this.fetchPhotos(resource);
    },
    photo(value) {
      this.dialog = value !== null;
    },
    dialog(value) {
      if (value === false) {
        this.setPhoto(null);
      }
    },
  },
  methods: {
    setPhotos(value) {
      this.$store.commit('setPhotos', value);
      return value;
    },
    fetchPhotos(resource) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_PHOTOS, 10);
      this.$store.dispatch('fetchPhotos', { resource, minutes })
        .then(() => {
          this.photos = this.$store.state.gallery.photos;
        });
      return null;
    },
    setPhoto(value) {
      this.$store.commit('setPhoto', value);
    },
  },
};
</script>

<style scoped lang="stylus">
.pointer
  cursor pointer
</style>
