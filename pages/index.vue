<template>
  <div>
    <Header></Header>

    <div class="px-0">
      <div>
        <div>
          <div class="row">
            <div class="col-md-12 px-0">
              <img :src="banner" class="w-100" style="max-height: 20rem;">
            </div>
          </div>
        </div>
      </div>
    </div>

    <section>
      <div class="row btn-group py-5">
        <button type="button" class="btn btn-selected col-sm-12 col-md-3">Todos os produtos</button>
        <button type="button" class="btn btn-option   col-sm-12 col-md-3">Tênis</button>
        <button type="button" class="btn btn-option   col-sm-12 col-md-3">Camisetas</button>
        <button type="button" class="btn btn-option   col-sm-12 col-md-3">Calças</button>
      </div>

      <div class="items">
        <p>10 Produtos</p>

        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Ordernar por
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Menor preço</a></li>
            <li><a class="dropdown-item" href="#">Maior preço</a></li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="bg-body-tertiary">
      <div class="container-fluid align-footer">
        <div>
          <a class="navbar-brand" href="#">
            <img src="/assets/images/ecommerce.svg" class="w-size" alt="Logo" />
          </a>
        </div>
        <div class="d-flex footer-link justify-content-end">
          <a href="#">Home</a>
          <a href="#">Tênis</a>
          <a href="#">Camisetas</a>
          <a href="#">Calças</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import banner from "@/assets/images/banner.png";

export default {
  data() {
    return {
      banner
    }
  }
}
</script>

<style scoped>
.banner {
  background-image: url('/_nuxt/assets/images/banner.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: auto;
  width: 100vw;
}
</style>