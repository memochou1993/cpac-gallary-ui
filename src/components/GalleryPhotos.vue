<template>
  <div>
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="(item, index) in photos"
        v-show="progress > 100"
        :key="index"
        md6
        xs12
      >
        <v-card>
          <v-img
            :src="item.path.web"
            aspect-ratio="2"
            class="pointer"
            @click="openPhotoDialog(item)"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn
              icon
              color="info--text"
              @click.stop="openShareDialog(item)"
            >
              <v-icon>share</v-icon>
            </v-btn>
            <v-btn
              icon
              color="info--text"
              @click.stop="downloadPhoto(item.path.download)"
            >
              <v-icon>cloud_download</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-dialog
        v-if="photo !== null"
        v-model="photoDialog"
        max-width="700"
      >
        <v-card>
          <v-img
            :src="photo.path.raw"
            :lazy-src="photo.path.web"
            @error="handleImage('error')"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
            >
              <AppProgressImage
                v-show="!imageError"
              />
              <AppAlertImage
                v-show="imageError"
              />
            </v-layout>
          </v-img>
        </v-card>
      </v-dialog>
      <v-dialog
        v-if="photo !== null"
        v-model="shareDialog"
        max-width="500"
      >
        <v-card>
          <v-card-title
            primary-title
            class="title grey lighten-2 py-3"
          >
            複製連結
          </v-card-title>
          <v-card-text>
            <v-text-field
              ref="share"
              :value="photo.path.share"
              readonly
              append-icon="content_copy"
              @focus="$event.target.select()"
              @click:append="copyPhotoLink(photo.path.share)"
            />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="shareDialog = false"
            >
              關閉
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout
      v-if="album !== null"
      v-show="progress <= 100"
    >
      <v-flex>
        <AppProgressData />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Cache from '../helpers/Cache';
import AppProgressImage from './AppProgressImage.vue';
import AppAlertImage from './AppAlertImage.vue';
import AppProgressData from './AppProgressData.vue';

export default {
  components: {
    AppProgressImage,
    AppAlertImage,
    AppProgressData,
  },
  data() {
    return {
      photoDialog: false,
      shareDialog: false,
      imageError: false,
    };
  },
  computed: {
    progress() {
      return this.$store.state.gallery.progress;
    },
    category() {
      return this.$store.state.gallery.category;
    },
    album() {
      return this.$store.state.gallery.album;
    },
    photos() {
      return this.$store.state.gallery.photos;
    },
    photo() {
      return this.$store.state.gallery.photo;
    },
  },
  watch: {
    album(value) {
      this.$store.dispatch('handleProgress', 'start');
      const resource = {
        url: 'gallery/photos',
        params: {
          category: this.category,
          album: `${value.date}_${value.title}${value.subtitle ? `_${value.subtitle}` : ''}`,
        },
      };
      const cache = Cache.get(resource);
      this.setPhotos(cache) || this.fetchPhotos(resource);
    },
    photoDialog(value) {
      if (value === false) {
        this.setPhoto(null);
        this.imageError = false;
      }
    },
    shareDialog(value) {
      if (value === false) {
        this.setPhoto(null);
        this.imageError = false;
      }
    },
  },
  methods: {
    setPhotos(value) {
      if (value) {
        this.$store.commit('setPhotos', value);
        this.$store.dispatch('handleProgress', 'none');
      }
      return !!value;
    },
    fetchPhotos(resource) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_PHOTOS, 10);
      this.$store.dispatch('fetchPhotos', { resource, minutes })
        .then(() => {
          this.$store.dispatch('handleProgress', 'finish');
        });
    },
    setPhoto(value) {
      this.$store.commit('setPhoto', value);
    },
    openPhotoDialog(value) {
      this.setPhoto(value);
      this.photoDialog = true;
    },
    openShareDialog(value) {
      this.setPhoto(value);
      this.shareDialog = true;
    },
    copyPhotoLink() {
      this.$refs.share.focus();
      if (document.execCommand('copy')) {
        setTimeout(() => {
          this.shareDialog = false;
        }, 500);
      }
    },
    downloadPhoto(value) {
      window.open(value, '_blank');
    },
    handleImage(condition) {
      switch (condition) {
        case 'error':
          this.imageError = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.pointer
  cursor pointer
</style>
