<template>
  <div class="all">
    <div class="user">
      <div style="background: #4b91f7">
        <h1>Details</h1>
      </div>
      <div>
        <label>Name</label>
        <p>{{ user.name }}</p>
      </div>

      <div>
        <label>Price</label>
        <p><span>&#8364;</span>{{ user.priceInEur }}</p>
      </div>

      <div>
        <label>Avliable</label>
        <p>{{ user.avaliable }}</p>
      </div>

      <div>
        <label>Address</label>
        <p>{{ user.address }}</p>
      </div>

      <div>
        <label>Country</label>
        <p>{{ user.country }}</p>
      </div>

      <div>
        <label>Created</label>
        <p>{{ formatData(user.createdAt) }}</p>
      </div>
    </div>

    <div class="currency">
      <div style="background: #4b91f7; width: 100%">
        <h1>Currency</h1>
      </div>
      <p v-for="(curr, index) in selection" :key="index">
        {{
          curr.toLocaleString("eu-EU", {
            style: "currency",
            currency: "EUR",
          })
        }}
      </p>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, ref, onUnmounted } from "vue";
export default {
  setup() {
    let user = ref(null);
    const route = useRoute();
    const store = useStore();
    const users = computed(() => store.getters.getUsers);
    const selection = computed(() => store.getters.getSelection);
    user.value = users.value.find((item) => item.id === route.params.id);
    const formatData = (item) => {
      const newDate = item.replaceAll("-", "/").split("T");
      return newDate[0];
    };
    onUnmounted(() => {
      console.log("destroy...");
      store.commit("resetSelection");
    });

    console.log(selection.value);
    return {
      store,
      route,
      user,
      selection,
      formatData,
    };
  },
};
</script>

<style scoped>
.all {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 70%;
  margin: 0 auto;
}
.all {
  display: flex;

  justify-content: center;
  align-items: center;
}
.all div {
  width: 33%;
}

.user {
  margin: 1em;
}
.user div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}
.user label {
  font-weight: bold;
}
.user p,
.currency p {
  margin: 0;
}
.currency {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.currency,
.currency p {
  width: 100%;
  border: 1px solid lightgray;
  text-align: center;
}
</style>