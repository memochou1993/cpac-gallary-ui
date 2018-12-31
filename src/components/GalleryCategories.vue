<template>
  <div>
    <v-list
      class="primary lighten-5"
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
      label: '選擇屆別',
      category: '',
      categories: [],
      noDataText: '',
    };
  },
  watch: {
    category() {
      this.$store.commit('setCategory', this.category);
    },
  },
  created() {
    const resource = '/gallery/categories';
    this.categories = Cache.get(resource) || this.fetchCategories(resource);
  },
  methods: {
    fetchCategories(resource) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_CATEGORIES, 10);
      this.$store.dispatch('fetchCategories', { resource, minutes })
        .then(() => {
          this.categories = this.$store.state.gallery.categories;
        });
    },
  },
};
</script>
