<template>
  <div>
    <section>
      <div class="row btn-group d-flex mt-4 mb-4">1
        <button type="button" @click="setFilter()" class="btn col-sm-12 col-md-2 col-lg-2"
          :class="{ 'btn-selected': filter.length === 0 }">
          Todos os produtos
        </button>

        <button type="button" @click="setFilter(name)" v-for="{ name } in filters"
          class="btn btn-option col-sm-12 col-md-2 col-lg-2" :class="{ 'btn-selected': filter === name }">{{ name
          }}</button>
      </div>

      <div class="items mb-4">
        <p>{{ cards.length }} Produtos</p>

        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Ordernar por
          </button>
          <ul class="dropdown-menu">
            <li><span class="dropdown-item" @click="setOrderByPrice('ASC')">Menor preço</span></li>
            <li><span class="dropdown-item" @click="setOrderByPrice('DESC')">Maior preço</span></li>
          </ul>
        </div>
      </div>
    </section>

    <section class="row px-4 m-0">
      <NuxtLink :to="getProductUrl(card.id)" v-for="card in getProducts"
        class="col-sm-12 col-md-4 my-4 d-flex align-items-center justify-content-center">
        <div class="card ">
          <span v-if="card.discount_percentage" class="price-badge">{{ card.discount_percentage }}% OFF</span>
          <img class="card-img-top" :src="card.image">
          <div class="card-body">
            <h5 class="card-title text-center">
              <strong>{{ card.name }}</strong>
            </h5>
            <div v-if="card.promotional_price">
              <p class="card-text text-center"> <s>{{ $format().money(card.price) }}</s> <span>{{
                $format().money(card.promotional_price) }}</span></p>
            </div>
            <p v-else class="card-text text-center">{{ $format().money(card.price) }}</p>
          </div>
        </div>
      </NuxtLink>
    </section>

    <div class="d-flex align-items-center justify-content-center mt-4 mb-4">
      <button :class="{ 'btn-page-selected': i === page, 'btn-page': i !== page }" v-for="i in pagesQuantity"
        @click="setPage(i)">{{ i }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import type { Card } from "@/interfaces/Card.d.ts";

import { filters, type CatetegoryFilterElement } from "@/providers/CategoryProvider";

const PER_PAGE = 6;

export default {
  data() {
    return {
      cards: [] as Card[],
      filteredCards: [],
      filter: "",
      filters,
      page: 1,
      orderBy: ""
    }
  },
  created() {
    fetch(`${this.$config.public.API_URL}/products`)
      .then(response => response.json())
      .then((cards: Card[]) => {
        this.cards = cards;
      });
  },
  computed: {
    getProductsWithFilters() {
      let filtered = this.cards
        .filter((card) => {
          if (this.filter) {
            return card.category === this.filter
          } else if (this.getFilterFromQueryParameter()) {
            return card.category === this.getFilterFromQueryParameter()
          }

          return true;
        });

      if (this.orderBy) {
        filtered.sort(this.compare);
      }

      return filtered;
    },
    getProducts() {
      const offset = (this.page - 1) * PER_PAGE;

      const filtered = this.getProductsWithFilters;

      return filtered.slice(offset, offset + PER_PAGE);
    },
    pagesQuantity() {
      return Math.ceil(this.getProductsWithFilters.length / PER_PAGE);
    }
  },
  methods: {
    getProductUrl(id: string) {
      return `/products/${id}`;
    },
    getFilterFromQueryParameter(): string | null {
      if (this.$route.query && this.$route.query.filter && !Array.isArray(this.$route.query.filter)) {
        return this.$route.query.filter;
      }

      return null;
    },
    compare(a: Card, b: Card) {
      if (a.price < b.price) {
        return this.orderBy === 'ASC' ? -1 : 1;
      }

      if (a.price > b.price) {
        return this.orderBy === 'ASC' ? 1 : -1;
      }

      return 0;
    },
    setFilter(type?: string) {
      if (type) {
        this.filter = type;
      }
    },
    setPage(page: number) {
      this.page = page;
    },
    setOrderByPrice(order: string) {
      this.orderBy = order;
    }
  }
}
</script>