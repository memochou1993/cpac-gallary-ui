<template>
  <div>
    <v-list
      class="primary lighten-5"
    >
      <v-list-tile>
        <v-select
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
import Cache from '../helpers/cache';

export default {
  data() {
    return {
      label: '選擇屆別',
      categories: [
        '社團旅遊',
      ],
      groups: [],
      noDataText: '',
    };
  },
  created() {
    this.groups = Cache.get('groups');

    if (this.groups) {
      this.concat(this.groups);
    } else {
      this.fetch();
    }
  },
  methods: {
    fetch() {
      this.$store.dispatch('fetchGroups')
        .then(() => {
          this.concat(this.$store.state.groups);
        });
    },
    concat(value) {
      this.categories = this.categories.concat(value);
    },
  },
};
</script>
