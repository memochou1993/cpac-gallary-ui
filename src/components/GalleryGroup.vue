<template>
  <div>
    <v-list
      class="primary lighten-5"
    >
      <v-list-tile>
        <v-select
          v-model="group"
          class="mx-1"
          :label="label"
          :items="groups"
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
      group: '第 10 屆',
      groups: [
        '社團旅遊',
        '第 1 屆',
        '第 2 屆',
        '第 3 屆',
        '第 4 屆',
        '第 5 屆',
        '第 6 屆',
        '第 7 屆',
        '第 8 屆',
        '第 9 屆',
        '第 10 屆',
      ],
      noDataText: '',
    };
  },
};
</script>
