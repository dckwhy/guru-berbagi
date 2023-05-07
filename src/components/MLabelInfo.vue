<template>
  <div class="mt-2">
    <div class="v-list__tile__sub-title">{{title}}</div>
    <span class="subtitle-1 font-weight-normal">
      <slot>
        {{ content }}
      </slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    }
  }
};
</script>

<style>
</style>
