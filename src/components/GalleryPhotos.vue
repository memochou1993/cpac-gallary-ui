<template>
  <div>
    <v-layout
      v-show="album != null"
      row
      wrap
    >
      <v-flex
        v-show="process <= 100"
      >
        <v-layout
          class="my-5"
          justify-center
        >
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="process"
            color="primary lighten-1"
          >
            {{ process }}
          </v-progress-circular>
        </v-layout>
      </v-flex>
      <v-flex
        v-for="(item, index) in photos"
        v-show="process > 100"
        :key="index"
        md6
        xs12
      >
        <v-card>
          <v-img
            class="pointer"
            aspect-ratio="1.6"
            :src="item.path.web"
            @click="openPhotoDialog(item)"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn
              icon
              color="info--text"
              @click="openShareDialog(item)"
            >
              <v-icon>share</v-icon>
            </v-btn>
            <v-btn
              icon
              color="info--text"
              @click="downloadPhoto(item.path.download)"
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
            @error="handlePhotoLoadFailed()"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
            >
              <v-progress-circular
                v-show="!photoLoadFailed"
                :size="50"
                indeterminate
                color="info lighten-5"
              />
              <v-alert
                v-show="photoLoadFailed"
                :value="true"
                type="error"
              >
                圖片載入失敗！
              </v-alert>
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
            class="title grey lighten-2 py-3"
            primary-title
          >
            複製連結
          </v-card-title>
          <v-card-text>
            <v-text-field
              ref="share"
              :value="photo.path.share"
              append-icon="content_copy"
              readonly
              @focus="$event.target.select()"
              @click:append="copyPhotoLink(photo.path.share)"
            />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              flat
              @click="shareDialog = false"
            >
              關閉
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import Cache from '../helpers/Cache';

export default {
  data() {
    return {
      process: 0,
      photoDialog: false,
      shareDialog: false,
      photoLoadFailed: false,
    };
  },
  computed: {
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
    process(value) {
      if (value === 100) {
        setTimeout(() => {
          this.process += 1;
        }, 1000);
      }
    },
    album(value) {
      this.process = 0;
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
        this.photoLoadFailed = false;
      }
    },
  },
  created() {
    setInterval(() => {
      if (this.process < 99) {
        this.process += 1;
      }
    }, 200);
  },
  methods: {
    setPhotos(value) {
      if (value) {
        this.$store.commit('setPhotos', value);
        this.process = 101;
      }
      return !!value;
    },
    fetchPhotos(resource) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_PHOTOS, 10);
      this.$store.dispatch('fetchPhotos', { resource, minutes })
        .then(() => {
          this.process = 100;
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
    handlePhotoLoadFailed() {
      this.photoLoadFailed = true;
    },
  },
};
</script>

<style scoped lang="stylus">
.pointer
  cursor pointer
</style>
