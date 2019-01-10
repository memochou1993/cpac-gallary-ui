<template>
  <div>
    <v-layout
      justify-center
      class="my-5"
    >
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="progress"
        color="primary lighten-1"
      >
        {{ progress }}
      </v-progress-circular>
    </v-layout>
  </div>
</template>

<script>
export default {
  computed: {
    progress() {
      return this.$store.state.gallery.progress;
    },
  },
  watch: {
    progress(value) {
      if (value === 100) {
        setTimeout(() => {
          this.$store.dispatch('handleProgress', 'increase');
        }, 1000);
      }
    },
  },
  created() {
    const intervals = [500, 750, 1000];
    intervals.forEach((interval) => {
      setInterval(() => {
        if (this.progress < 99) {
          this.$store.dispatch('handleProgress', 'increase');
        }
      }, interval);
    });
  },
};
</script>
