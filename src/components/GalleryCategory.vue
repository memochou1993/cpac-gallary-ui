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
      this.setCategory(this.category);
    },
  },
  created() {
    this.groups = Cache.get('groups');
    if (this.groups) {
      this.items = this.items.concat(this.groups);
    } else {
      this.fetchGroups();
    }
  },
  methods: {
    fetchGroups() {
      const lifetime = parseInt(process.env.VUE_APP_CACHE_GROUPS_LIFETIME, 10);
      this.$store.dispatch('fetchGroups', lifetime)
        .then(() => {
          this.items = this.items.concat(this.$store.state.groups);
        });
    },
    setCategory(category) {
      this.$store.dispatch('setCategory', category);
    },
  },
};
</script>
