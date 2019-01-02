<template>
  <div>
    <v-layout
      row
      wrap
    >
      <v-flex
        md6
        xs12
        v-for="(item, index) in photos"
        :key="index"
        v-show="showPhotos"
      >
        <v-card>
          <v-img
            aspect-ratio="2.75"
            :src="item.path"
            @load="loadPhoto()"
          />
        </v-card>
      </v-flex>
      <v-flex
        v-show="!showPhotos"
      >
        <div
          class="text-xs-center"
        >
          <img
            class="my-3 loading"
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
      photoLoaded: 0,
      showPhotos: false,
    };
  },
  computed: {
    album() {
      return this.$store.state.gallery.album;
    },
  },
  watch: {
    album(value) {
      const resource = `/gallery/photos/${this.$store.state.gallery.category}/${value.date}_${value.title}${value.subtitle ? '_' + value.subtitle : ''}`;
      this.photos = Cache.get(resource) || this.fetchPhotos(resource);
      this.setPhotos(this.photos);
      this.photoLoaded = 0;
      this.showPhotos = false;
    },
    photo(value) {
      this.$store.commit('setPhoto', value);
    },
  },
  created() {
    this.photoLoaded = 0;
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
    },
    loadPhoto() {
      this.photoLoaded++;
      if (this.photoLoaded === this.photos.length) {
        this.showPhotos = true;
      }
    },
  },
};
</script>
