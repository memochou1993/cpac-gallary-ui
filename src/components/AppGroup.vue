<template>
  <div>
    <v-list
      class="primary lighten-5"
    >
      <v-list-tile>
        <v-select
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
      groups: [
        '不分屆',
        '第 1 屆',
        '第 2 屆',
        '第 3 屆',
      ],
      noDataText: '',
    };
  },
};
</script>
