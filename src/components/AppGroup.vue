<template>
  <div>
    <v-select
      :label="label"
      :items="groups"
      :noDataText="noDataText"
      solo
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      noDataText: '',
      label: '屆別',
      groups: [
        '第1屆',
        '第2屆',
        '第3屆',
      ],
    };
  },
};
</script>
