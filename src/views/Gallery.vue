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
        <AppGroup />
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
import AppGroup from '../components/AppGroup.vue';
import GallerySidebar from '../components/GallerySidebar.vue';
import GalleryBody from '../components/GalleryBody.vue';

export default {
  components: {
    AppGroup,
    GallerySidebar,
    GalleryBody,
  },
};
</script>
