<template>
  <footer class="bg-body-footer">
    <div class="container-fluid align-footer">
      <div>
        <a class="navbar-brand" href="#">
          <img src="/assets/images/ecommerce.svg" class="w-size" alt="Logo" />
        </a>
      </div>
      <div class="d-flex footer-link justify-content-end">
        <NuxtLink to="/">Home</NuxtLink>

        <RouterLink v-for="filter in filters" :to="{ name: '', query: { filter: filter.name } }">{{
          filter.name }}</RouterLink>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { filters, type CatetegoryFilterElement } from "@/providers/CategoryProvider";

export default {
  data() {
    return {
      filters
    };
  },
};
</script>
