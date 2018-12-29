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
    this.groups = JSON.parse(localStorage.getItem('groups'));

    if (this.groups) {
      this.categories = this.categories.concat(this.groups);
    } else {
      this.fetch();
    }
  },
  methods: {
    fetch() {
      this.axios.get('/groups')
        .then(({ data }) => {
          this.groups = data.data;
          localStorage.setItem('groups', JSON.stringify(data.data));
        })
        .then(() => {
          this.categories = this.categories.concat(this.groups);
        });
    },
  },
};
</script>
