<template>
  <div>
    <table id="customers">
      <tr>
        <th>
          <div>
            <p>Name</p>
            <i
              class="material-icons"
              style="font-size: 24px"
              @click="sortArrayByName"
              >swap_vert</i
            >
            <input
              type="text"
              v-model="text"
              @input="filterText"
              @blur="text = ''"
            />
          </div>
        </th>
        <th>
          <div>
            <p>Price</p>
            <i
              v-if="view"
              class="material-icons"
              style="font-size: 24px"
              @click="view = !view"
              >fast_forward</i
            >
          </div>
        </th>
        <th :style="view && { visibility: 'hidden', border: 'none' }">
          <div>
            <p>City</p>
            <i
              class="material-icons"
              style="font-size: 24px"
              @click="sortArrayByCity"
              >swap_vert</i
            >

            <input
              type="text"
              v-model="textCity"
              @input="filterCity"
              @blur="textCity = ''"
            />
          </div>
        </th>
        <th :style="view && { visibility: 'hidden', border: 'none' }">
          <div><p>Address</p></div>
        </th>
        <th :style="view && { visibility: 'hidden', border: 'none' }">
          <div>
            <p>Country</p>
            <i
              class="material-icons"
              style="font-size: 24px"
              @click="sortArrayByCountry"
              >swap_vert</i
            >

            <input
              type="text"
              v-model="textCountry"
              @input="filterCountry"
              @blur="textCountry = ''"
            />
          </div>
        </th>
        <th :style="view && { visibility: 'hidden', border: 'none' }">
          <div>
            <p>Avaliable?</p>
            <button
              @click="store.dispatch('setAvaliable', true)"
              style="border-radius: 10px; border: none"
            >
              A
            </button>
            <button
              @click="store.dispatch('setAvaliable', false)"
              style="border-radius: 10px; border: none"
            >
              N
            </button>
            <i
              v-if="!view"
              class="material-icons"
              style="font-size: 24px"
              @click="view = !view"
              >fast_rewind</i
            >
          </div>
        </th>
      </tr>
      <tr v-for="item in users.slice(counter, counter + 11)" :key="item.id">
        <td class="tooltip" style="border: none">
          <router-link :to="`/details/${item.id}`">{{ item.name }}</router-link>
          <span class="tooltiptext" style="min-width: 300px"
            >Address: {{ item.address }}<br />City: {{ item.city
            }}<br />Country: {{ item.country }}</span
          >
        </td>

        <td><span>&#8364;</span>{{ item.priceInEur }}</td>
        <td :style="view && { visibility: 'hidden', border: 'none' }">
          {{ item.city }}
        </td>
        <td :style="view && { visibility: 'hidden', border: 'none' }">
          {{ item.address }}
        </td>
        <td :style="view && { visibility: 'hidden', border: 'none' }">
          {{ item.country }}
        </td>
        <td :style="view && { visibility: 'hidden', border: 'none' }">
          {{ item.avaliable ? "YES" : "NO" }}
        </td>
      </tr>
    </table>
    <div style="margin: 0 auto; width: 100%; text-align: center">
      <button @click="decrease" :disabled="counter === 0" style="border: none">
        <i class="material-icons" style="font-size: 36px">chevron_left</i>
      </button>
      <button
        @click="increase"
        :disabled="counter + 11 > users.length"
        style="border: none"
      >
        <i class="material-icons" style="font-size: 36px">chevron_right</i>
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";
export default {
  setup() {
    let text = ref("");
    let textCountry = ref("");
    let textCity = ref("");
    let toggleName = ref(true);
    let toggleCountry = ref(true);
    let toggleCity = ref(true);
    let view = ref(true);
    let counter = ref(0);
    const store = useStore();
    onMounted(store.dispatch("setUsers"));
    //const users = computed(() => store.state.users);
    const users = computed(() => store.getters.getTemp);
    const increase = () => {
      counter.value += 11;
    };
    const decrease = () => {
      counter.value -= 11;
    };
    const sortArrayByName = () => {
      store.dispatch("sortUsersByName", toggleName.value);
      toggleName.value = !toggleName.value;
    };
    const sortArrayByCountry = () => {
      store.dispatch("sortUsersByCountry", toggleCountry.value);
      toggleCountry.value = !toggleCountry.value;
    };
    const sortArrayByCity = () => {
      store.dispatch("sortUsersByCity", toggleCity.value);
      toggleCity.value = !toggleCity.value;
    };
    const filterText = () => {
      console.log(text.value);
      store.dispatch("setFilter", text.value);
    };
    const filterCountry = () => {
      console.log(textCountry.value);
      store.dispatch("setFilterCountry", textCountry.value);
    };
    const filterCity = () => {
      console.log(textCity.value);
      store.dispatch("setFilterCity", textCity.value);
    };

    return {
      users,
      increase,
      decrease,
      counter,
      toggleName,
      toggleCountry,
      toggleCity,
      view,
      sortArrayByName,
      sortArrayByCountry,
      sortArrayByCity,
      text,
      textCountry,
      textCity,
      filterText,
      filterCountry,
      filterCity,

      store,
    };
  },
};
</script>

<style scoped>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4b91f7;
  color: white;
}
th div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
i,
button:hover {
  cursor: pointer;
}
p {
  margin: 0;
}
input[type="text"] {
  border-radius: 8px;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;

  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>