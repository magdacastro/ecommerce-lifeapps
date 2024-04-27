<template>
  <div>
    <Header></Header>

    <div class="px-0">
      <div>
        <div>
          <div class="row">
            <div class="col-md-12 px-0">
              <img :src="banner" class="w-100" style="max-height: 25rem;">
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

    <section class="row px-4">
      <NuxtLink to="/" v-for="card in cards" class="col-sm-12 col-md-4 my-4">
        <div class="card">
          <img class="card-img-top" style="height: 16rem;" :src="card.image" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title text-center">
              <strong>{{ card.name }}</strong>
            </h5>
            <p class="card-text text-center">{{ formatMoneyValue(card.price) }}</p>
          </div>
        </div>
      </NuxtLink>
    </section>

    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import banner from "@/assets/images/banner.png";

type Card = {
  id: string;
  name: string;
  category: string;
  price: number;
  discount_percentage: number;
  promotional_price: number;
  image: string;
  description: string;
}

export default {
  data() {
    return {
      banner,
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
        console.log(cards[0].price.toLocaleString())
        this.cards = cards;
      });
  },
  methods: {
    formatMoneyValue(moneyValue: number): string {
      return moneyValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
  }
}
</script>
