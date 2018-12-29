<template>
  <div>
    <v-list
      class="primary lighten-5"
    >
      <v-list-tile>
        <v-select
          class="mx-1"
          :label="label"
          :items="category"
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
      category: [
        '社團旅遊',
      ],
      groups: [],
      noDataText: '',
    };
  },
  created() {
    this.groups = Cache.get('groups');
    if (this.groups) {
      this.concatCategory(this.groups);
    } else {
      this.fetchGroups();
    }
  },
  methods: {
    fetchGroups() {
      const lifetime = parseInt(String, process.env.VUE_APP_CACHE_GROUPS_LIFETIME);
      this.$store.dispatch('fetchGroups', lifetime)
        .then(() => {
          this.concatCategory(this.$store.state.groups);
        });
    },
    concatCategory(value) {
      this.category = this.category.concat(value);
    },
  },
};
</script>
