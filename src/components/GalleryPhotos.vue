<template>
  <div>
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="(item, index) in photos"
        v-show="showPhotos"
        :key="index"
        md6
        xs12
      >
        <v-card>
          <v-img
            class="pointer"
            aspect-ratio="1.6"
            :src="item.path.web"
            :lazy-src="item.path.web"
            @load="loadPhotos()"
            @click="setPhoto(item)"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-layout>
          </v-img>
          <v-card-actions
            class="my-0"
          >
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
        v-model="dialog"
        max-width="700"
      >
        <v-card
          v-if="photo"
          v-show="showPhoto"
        >
          <v-img
            transition="slide-y-transition"
            :src="photo.path.raw"
            @load="loadPhoto()"
          />
        </v-card>
        <v-card
          v-show="!showPhoto"
        >
          <div
            class="text-xs-center"
          >
            <img
              class="my-5 loading"
              src="../assets/loading.svg"
            >
          </div>
        </v-card>
      </v-dialog>
      <v-flex
        v-show="!showPhotos && album"
      >
        <div
          class="text-xs-center"
        >
          <img
            class="my-5 loading"
            src="../assets/loading.svg"
          >
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Cache from '../helpers/Cache';

export default {
  data() {
    return {
      photos: [],
      photo: '',
      dialog: false,
      photosLoaded: 0,
      showPhotos: false,
      showPhoto: false,
    };
  },
  computed: {
    album() {
      return this.$store.state.gallery.album;
    },
  },
  watch: {
    album(value) {
      const resource = `/gallery/photos/${this.$store.state.gallery.category}/${value.date}_${value.title}${value.subtitle ? `_${value.subtitle}` : ''}`;
      this.photos = Cache.get(resource) || this.fetchPhotos(resource);
      this.setPhotos(this.photos);
      this.photosLoaded = 0;
      this.showPhotos = false;
    },
    photo(value) {
      this.$store.commit('setPhoto', value);
      this.showPhoto = false;
    },
  },
  created() {
    this.photosLoaded = 0;
  },
  methods: {
    fetchPhotos(resource) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_PHOTOS, 10); //
      this.$store.dispatch('fetchPhotos', { resource, minutes })
        .then(() => {
          this.photos = this.$store.state.gallery.photos;
        });
    },
    setPhotos(photos) {
      if (photos) {
        this.$store.commit('setPhotos', photos);
      }
    },
    setPhoto(photo) {
      this.photo = photo;
      this.dialog = true;
    },
    loadPhotos() {
      this.photosLoaded += 1;
      if (this.photosLoaded === this.photos.length) {
        this.showPhotos = true;
      }
    },
    loadPhoto() {
      this.showPhoto = true;
    },
  },
};
</script>

<style lang="stylus" scoped>
.pointer
  cursor pointer
</style>

