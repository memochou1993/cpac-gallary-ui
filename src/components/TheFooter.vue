<template>
  <div>
    <v-footer
      height="auto"
    >
      <v-card
        class="flex primary lighten-1 white--text text-xs-center"
      >
        <v-card-text>
          <v-btn
            v-for="(icon, index) in icons"
            :key="index"
            class="white--text mx-3"
            icon
          >
            <v-icon>
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text
          class="pt-0"
        >
          國立竹北高級中學動畫社成立於 2009 年，是一實施終身社員制的高中社團。
        </v-card-text>

        <v-divider />

        <v-card-text>
          &copy; 2019 National Chu-Pei Senior High School Animation Club
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'fab fa-facebook',
      'fab fa-youtube',
      'fab fa-github',
    ],
  }),
};
</script>
