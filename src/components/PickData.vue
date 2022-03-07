<template>
  <Currencies />
  <Users v-if="selection.length > 0" />
</template>

<script>
import Currencies from "./Currencies.vue";
import Users from "./Users.vue";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  components: { Currencies, Users },
  setup() {
    const store = useStore();
    const selection = computed(() => store.getters.getSelection);
    return {
      selection,
    };
  },
};
</script>

<style>
</style>