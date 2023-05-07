<template>
  <v-layout wrap justify-center>
    <v-flex shrink class="pr-0">
      <v-icon class="ml-2" color="grey">mdi-sync</v-icon>
    </v-flex>
    <v-flex class="pl-1">
      <span class="grey--text">{{ $tools.deltaDTWN(lastUpdate) }}</span>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deltaW: "",
      lastUpdate: new Date()
    };
  },
  mounted() {
    this.calcTime();
    setInterval(() => {
      this.calcTime();
    }, 60000);
  },
  methods: {
    calcTime() {
      this.deltaW = this.$tools.deltaDTWN(this.lastUpdate);
    }
  },
  watch: {
    loading(n) {
      if (!n) {
          this.lastUpdate = new Date();
          this.calcTime()
      }
    }
  }
};
</script>

<style>
</style>
