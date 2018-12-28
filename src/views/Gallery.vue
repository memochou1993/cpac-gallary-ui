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
        <GalleryGroup />
        <GallerySidebar />
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
import GalleryGroup from '../components/GalleryGroup.vue';
import GallerySidebar from '../components/GallerySidebar.vue';
import GalleryBody from '../components/GalleryBody.vue';

export default {
  components: {
    GalleryGroup,
    GallerySidebar,
    GalleryBody,
  },
};
</script>
