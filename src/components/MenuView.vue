<template>
  <div class="MenuView-container">
    <v-btn class="menu-btn" @mouseover="mainMenu = true"> MENU </v-btn>
    <v-navigation-drawer
      v-model="mainMenu"
      temporary
      :scrim="false"
      @mouseleave="closeMenu()"
    >
      <ul class="menu-list">
        <li
          class="menu-item"
          @mouseover="openMenu(), setHoverType('spectacles')"
        >
          SPECTACLES
          <v-icon icon="mdi-chevron-right" />
        </li>
        <li
          class="menu-item"
          @mouseover="openMenu(), setHoverType('sunglasses')"
        >
          SUNGLASSES
          <v-icon icon="mdi-chevron-right" />
        </li>
        <li class="menu-item" @mouseover="subMenu = false">HOME TRY ON</li>
        <li class="menu-item" @mouseover="subMenu = false">PAIR FOR PAIR</li>
      </ul>
    </v-navigation-drawer>

    <v-navigation-drawer
      class="sub-menu"
      :class="{ openSubMenu: openSubMenu }"
      v-model="subMenu"
      temporary
      :scrim="false"
      @mouseleave="closeMenu()"
    >
      <ul class="menu-list">
        <li
          class="menu-item"
          @mouseover="openMenu()"
          @click="changeCategories('women')"
        >
          WOMEN
        </li>
        <li
          class="menu-item"
          @mouseover="openMenu()"
          @click="changeCategories('men')"
        >
          MEN
        </li>
      </ul>
    </v-navigation-drawer>
    <h3 class="title">bloobloom</h3>
  </div>
</template>

<script>
export default {
  name: "MenuView",

  data: () => ({
    mainMenu: false,
    subMenu: false,
    openSubMenu: false,
    glassesType: "",
  }),

  methods: {
    openMenu() {
      this.mainMenu = true;
      this.subMenu = true;
      this.openSubMenu = true;
    },

    setHoverType(type) {
      this.glassesType = type;
    },

    closeMenu() {
      this.mainMenu = false;
      this.subMenu = false;
      this.openSubMenu = false;
    },

    changeCategories(type) {
      this.$store.commit("setGlassesType", this.glassesType);
      this.$store.commit("setGenderType", type);
      this.$store.dispatch("loadGlasses");
      this.closeMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
.MenuView-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
  padding: 10px 20px;

  .title {
    margin: 0 auto;
    font-size: 22px;
  }
  .menu-btn {
    box-shadow: unset;

    &:hover {
      border-bottom: 1px solid #000;
    }
  }

  .menu-list {
    .menu-item {
      border-bottom: 1px solid #000;
      padding: 20px 15px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;

      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
}
</style>

<style lang="scss">
.MenuView-container {
  .v-btn__overlay {
    background-color: unset;
  }

  .v-navigation-drawer {
    top: 57px !important;
    box-shadow: unset;
    border-right: 1px solid #000;
  }

  .openSubMenu {
    left: 256px !important;
  }
}
</style>
