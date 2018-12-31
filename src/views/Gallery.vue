<template>
  <div>
    <v-layout
      row
      wrap
    >
      <v-flex
        md3
        xs12
      >
        <GalleryCategories />
        <GalleryAlbums />
      </v-flex>

      <v-flex
        md9
        xs12
      >
        <GalleryPhotos />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import GalleryAlbums from '../components/GalleryAlbums.vue';
import GalleryPhotos from '../components/GalleryPhotos.vue';
import GalleryCategories from '../components/GalleryCategories.vue';

export default {
  components: {
    GalleryAlbums,
    GalleryPhotos,
    GalleryCategories,
  },
};
</script>
