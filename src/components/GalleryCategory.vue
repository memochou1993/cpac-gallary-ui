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
          :items="items"
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
      items: [
        '社團旅遊',
      ],
      groups: [],
      noDataText: '',
    };
  },
  watch: {
    category() {
      this.$store.commit('setCategory', this.category);
    },
  },
  created() {
    const resource = '/groups';
    this.groups = Cache.get(resource);
    if (!this.groups) {
      this.fetchGroups(resource);
    } else {
      this.items = this.items.concat(this.groups);
    }
  },
  methods: {
    fetchGroups(resource) {
      const minutes = parseInt(process.env.VUE_APP_CACHE_MINUTES_GROUPS, 10);
      this.$store.dispatch('fetchGroups', { resource, minutes })
        .then(() => {
          this.items = this.items.concat(this.$store.state.groups);
        });
    },
  },
};
</script>
