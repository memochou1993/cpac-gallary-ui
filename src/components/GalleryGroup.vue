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
      noDataText: '',
    };
  },
  created() {
    const categories = JSON.parse(localStorage.getItem('categories'));

    if (categories) {
      this.categories = categories;
    } else {
      this.fetch();
    }
  },
  methods: {
    fetch() {
      this.axios.get('/groups')
        .then(({ data }) => {
          this.categories = this.categories.concat(data.data);
          localStorage.setItem('categories', JSON.stringify(this.categories));
        });
    },
  },
};
</script>
