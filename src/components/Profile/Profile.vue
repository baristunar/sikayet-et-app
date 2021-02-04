<template>
  <div>
    <v-container class="mx-auto pa-15 my-auto">
      <app-profile-menu />
    </v-container>
  </div>
</template>

<script>
import appProfileMenu from "./appProfileMenu";

export default {
  components: {
    appProfileMenu,
  },
};
</script>

<style>
</style>