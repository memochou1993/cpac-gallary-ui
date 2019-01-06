<template>
  <div>
    <v-list
      class="primary lighten-4"
    >
      <v-list-tile>
        <v-select
          v-model="category"
          class="mx-1"
          :label="label"
          :items="categories"
          :noDataText="noDataText"
          solo
          hide-details
        />
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import Cache from '../helpers/Cache';

export default {
  data() {
    return {
      label: '選擇分類',
      category: '',
      noDataText: '',
    };
  },
  computed: {
    categories() {
      return this.$store.state.gallery.categories;
    },
  },
  watch: {
    category(value) {
      this.setCategory(value);
    },
  },
  created() {
    const resource = {
      url: 'gallery/categories',
    };
    const cache = Cache.get(resource);
    cache ? this.setCategories(cache) : this.fetchCategories(resource);
  },
  methods: {
    setCategories(value) {
      this.$store.commit('setCategories', value);
    },
    fetchCategories(resource) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_CATEGORIES, 10);
      this.$store.dispatch('fetchCategories', { resource, minutes });
    },
    setCategory(value) {
      this.$store.commit('setCategory', value);
    },
  },
};
</script>
