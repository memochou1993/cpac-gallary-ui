<template>
  <div>
    <v-card>
      <v-list>
        <v-list-tile
          v-for="(album, index) in albums"
          :key="index"
          :to="{ name: 'gallery', query: { album: album.title } }"
          exact
        >
          <v-list-tile-content>
            <v-list-tile-title
              class="px-3"
              v-text="album.title"
            />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albums: [
        {
          title: '社團辦公室',
        },
        {
          title: '社員名單',
        },
        {
          title: '社團日常',
        },
      ],
    };
  },
};
</script>
