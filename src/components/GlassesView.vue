<template>
  <v-container class="GlassesView-container">
    <v-overlay
      :model-value="loader"
      :persistent="true"
      class="align-center justify-center"
    >
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-row class="text-center">
      <v-col cols="12" md="4" class="cols none"></v-col>
      <v-col cols="12" md="4" class="cols"
        >{{ glassesType }} {{ genderType }}</v-col
      >
      <v-col cols="12" md="4" class="filters cols">
        <v-select v-model="colorsValue" :items="colors" label="COLOUR" multiple>
        </v-select>
        <v-select
          v-model="shapesValue"
          :items="shapes"
          label="SHAPE"
          multiple
        ></v-select>
      </v-col>
      <div class="glasses-container">
        <p v-if="filteredGlasses.length == 0" class="no-items">
          There is no glasses to show
        </p>
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="item"
          v-for="glass in filteredGlasses"
          :key="glass.id"
        >
          <h3 class="title">{{ glass.name }}</h3>
          <img :alt="glass.name" :src="glass.glass_variants[0].media[0].url" />
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "GlassesView",

  data: () => ({
    colors: ["Black", "Tortoise", "Coloured", "Crystal", "Dark", "Bright"],
    colorsValue: [],
    shapes: ["Square", "Rectangle", "Round", "Cat-eye"],
    shapesValue: [],
  }),

  mounted() {
    this.$store.dispatch("loadGlasses");
  },
  computed: {
    ...mapState([
      "glassesType",
      "genderType",
      "glasses",
      "filteredGlasses",
      "loader",
    ]),
  },
  watch: {
    colorsValue() {
      if (this.colorsValue.length > 0) {
        let newGlasses = this.glasses.filter((item) =>
          this.colorsValue.find((colorName) => {
            return (
              item.glass_variants[0].frame_variant.colour.name == colorName
            );
          })
        );

        this.$store.commit("setFilteredGlasses", newGlasses);
      } else {
        this.$store.commit("setFilteredGlasses", this.glasses);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.GlassesView-container {
  padding: 12px;
  margin: 0;
  max-width: unset;
  .filters {
    display: flex;
    padding: 0;
  }

  .cols {
    font-size: 23px;
    font-weight: 500;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    text-transform: uppercase;
    &:last-child {
      border-right: unset;
    }
  }

  .glasses-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .no-items {
      margin: 65px auto;
      font-size: 22px;
    }

    .item {
      width: 300px;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
      padding: 0;
      position: relative;

      &:nth-child(3n + 3) {
        border-right: unset;
      }

      .title {
        position: absolute;
        left: 0;
        top: 10px;
        text-transform: uppercase;
        text-align: center;
        width: 100%;
      }

      img {
        max-width: 100%;
        height: 100%;
      }
    }
  }

  @media screen and (max-width: 959px) {
    .cols {
      border-right: unset;
      font-size: 20px;
    }

    .none {
      display: none;
    }

    .glasses-container {
      .item {
        &:nth-child(3n + 3) {
          border-right: 1px solid #000;
        }
        &:nth-of-type(2n) {
          border-right: unset;
        }
      }
    }

    .v-input {
      max-width: unset;
      &:last-child {
        border-right: unset;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .filters {
      flex-direction: column;
      .v-input {
        border-right: unset;
        &:first-child {
          border-bottom: 1px solid #000;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .glasses-container {
      .item {
        border-right: unset !important;
      }
    }
  }
}
</style>

<style lang="scss">
.GlassesView-container {
  .v-field__field,
  .v-field__overlay {
    background: #fff;
  }

  .v-field__field {
    justify-content: center;
  }

  .v-field__append-inner,
  .v-input__details,
  .v-field__outline {
    display: none;
  }

  .v-field {
    padding: 0;
  }

  .v-input {
    margin: 0;
    border-right: 1px solid #000;
    max-width: 140px;
  }

  .v-label {
    color: #000;
  }
}
</style>
