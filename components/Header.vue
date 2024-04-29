<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <div class="row" style="width: 100vw">
        <NuxtLink class="navbar-brand col-lg-7 m-0" to="/">
          <img src="/assets/images/ecommerce.svg" class="w-size" alt="Logo" />
        </NuxtLink>
        <div class="d-flex align-items-center col-lg-5" role="search">
          <div class="input-group rounded me-4">
            <input type="search" class="form-control border-end-0" placeholder="Quero comprar algo específico..."
              aria-label="Search" />
            <span class="input-group-text border-end-1" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </div>

          <ClientOnly>
            <NuxtLink to="/profile" class="me-4">
              <img v-if="verifyIfThereAreFavoriteItems()" src="/assets/images/profile_item.svg" alt="Profile"
                title="Você possui itens favoritados" />
              <img v-else src="/assets/images/profile_img.svg" alt="Profile" />
            </NuxtLink>
          </ClientOnly>

          <ClientOnly>
            <NuxtLink to="/cart" class="me-4">
              <img v-if="verifyIfThereAreItemsOnCart()" src="/assets/images/shopping_item.svg" alt="Shopping"
                title="Você possui itens no carrinho" />
              <img v-else src="/assets/images/shopping_img.svg" alt="Shopping" />
            </NuxtLink>
          </ClientOnly>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">

export default {
  methods: {
    verifyIfThereAreItemsOnCart() {
      return this.checkStorageProperty("cart");
    },
    verifyIfThereAreFavoriteItems() {
      return this.checkStorageProperty("favorites");
    },
    checkStorageProperty(key: string) {
      if (process.server) {
        return false;
      }

      const products = this.$storage().getAttributeFromLocalStorage(key);

      return products.length > 0;
    }
  }
}
</script>
