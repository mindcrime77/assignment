<template>
  <div>
    <div class="currencies" v-if="toggle">
      <select
        v-model="selectedCurrencies"
        multiple="true"
        @change="handleChange"
      >
        <option v-for="(item, key, index) in currencies" :key="index">
          <span>
            <p>{{ key }}</p>
            -
            <p>
              {{
                item.toLocaleString("eu-EU", {
                  style: "currency",
                  currency: "EUR",
                })
              }}
            </p>
          </span>
        </option>
      </select>
      <p v-if="selectedCurrencies.length === 0">
        Please select at least one currency...
      </p>
      <div>
        <button
          class="button-6"
          @click="submitSelection"
          :disabled="selectedCurrencies.length === 0"
        >
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const toggle = ref(true);
    const store = useStore();
    const selectedCurrencies = ref([]);
    onMounted(store.dispatch("setCurrencies"));
    const currencies = computed(() => store.state.currencies);
    const selection = computed(() => store.getters.getSelection);
    const handleChange = () => {
      console.log(selectedCurrencies.value);
    };
    const submitSelection = () => {
      store.commit("setSelection", selectedCurrencies.value);
      toggle.value = !toggle.value;
      console.log("SELECTED CURR:", selection.value);
    };

    return {
      store,
      toggle,
      currencies,
      selection,
      selectedCurrencies,
      handleChange,
      submitSelection,
    };
  },
};
</script>

<style scoped>
.currencies {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.currencies > * {
  padding: 1em;
}
.currencies select {
  min-height: 300px;
  max-width: 150px;
  border-radius: 5px;
}
</style>