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
        <GalleryCategory />
        <GalleryAlbum />
      </v-flex>

      <v-flex
        md9
        xs12
      >
        <GalleryBody />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import GalleryAlbum from '../components/GalleryAlbum.vue';
import GalleryBody from '../components/GalleryBody.vue';
import GalleryCategory from '../components/GalleryCategory.vue';

export default {
  components: {
    GalleryAlbum,
    GalleryBody,
    GalleryCategory,
  },
};
</script>
