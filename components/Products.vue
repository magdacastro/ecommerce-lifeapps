<template>
<section>
      <div class="row btn-group m-4">
        <button type="button" class="btn btn-selected  col-sm-12 col-md-3">Todos os produtos</button>
        <button type="button" class="btn btn-option    col-sm-12 col-md-3">Tênis</button>
        <button type="button" class="btn btn-option    col-sm-12 col-md-3">Camisetas</button>
        <button type="button" class="btn btn-option    col-sm-12 col-md-3">Calças</button>
      </div>

      <div class="items m-4">
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

    <section class="row px-4 m-0">
      <NuxtLink :to="getProductUrl(card.id)" v-for="card in cards" class="col-sm-12 col-md-4 my-4 d-flex align-items-center justify-content-center">
        <div class="card ">
          <img class="card-img-top" :src="card.image" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title text-center">
              <strong>{{ card.name }}</strong>
            </h5>
            <p class="card-text text-center">{{ formatMoneyValue(card.price) }}</p>
          </div>
        </div>
      </NuxtLink>
    </section>
</template>

<script lang="ts">
import type { Card } from "@/interfaces/Card.d.ts";

export default {
  data() {
    return {
      cards: [] as Card[],
      filteredCards: [],
      filters: []
    }
  },
  created() {
    this.$watch(
      () => { this.$filters },
      () => { console.log("changed..."); }
    );
    fetch(`${this.$config.public.API_URL}/products`)
      .then(response => response.json())
      .then((cards: Card[]) => {
        this.cards = cards;
      });
  },
  methods: {
    formatMoneyValue(moneyValue: number): string {
      return moneyValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    },
    getProductUrl(id: string){
        return `/products/${id}`;
    }
  }
}
</script>