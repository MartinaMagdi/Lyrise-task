import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    glassesType: "spectacles",
    genderType: "women",
    glasses: {},
    filteredGlasses: {},
    loader: false,
  },
  getters: {},
  mutations: {
    setGlassesType(state, type) {
      state.glassesType = type;
    },
    setGenderType(state, type) {
      state.genderType = type;
    },
    setGlasses(state, glasses) {
      state.glasses = glasses;
    },
    setFilteredGlasses(state, newGlasses) {
      state.filteredGlasses = newGlasses;
    },
    setLoader(state, isloading) {
      state.loader = isloading;
    },
  },
  actions: {
    loadGlasses({ commit, state }) {
      commit("setLoader", true);

      axios
        .get(
          `https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/${state.glassesType}-${state.genderType}/glasses`
        )
        .then((response) => {
          let glasses = response.data.glasses;
          commit("setGlasses", glasses);
          commit("setFilteredGlasses", glasses);
          commit("setLoader", false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
