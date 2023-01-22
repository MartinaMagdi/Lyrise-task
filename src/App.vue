<template>
  <v-app>
    <v-main>
      <MenuView />
      <GlassesView />
    </v-main>
  </v-app>
</template>

<script>
import MenuView from "@/components/MenuView.vue";
import GlassesView from "@/components/GlassesView.vue";

export default {
  name: "App",

  components: {
    MenuView,
    GlassesView,
  },

  data: () => ({
    //
  }),
};
</script>
