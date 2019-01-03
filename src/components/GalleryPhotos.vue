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
            aspect-ratio="1.6"
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
      <v-dialog
        v-if="photo !== ''"
        v-model="dialog"
        max-width="700"
      >
        <v-card
          v-show="showPhoto"
        >
          <v-img
            :src="photo.path.raw"
            @load="letPhotoShow()"
          />
        </v-card>
      </v-dialog>
      <v-flex
        v-show="showLoading"
      >
        <Loading />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Loading from './Loading.vue';
import Cache from '../helpers/Cache';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      photos: [],
      dialog: false,
      showPhoto: false,
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
    dialog(value) {
      if (value === false) {
        this.showPhoto = false;
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
      this.dialog = true;
    },
    letPhotoShow() {
      this.showPhoto = true;
    },
  },
};
</script>

<style scoped lang="stylus">
.pointer
  cursor pointer
</style>
