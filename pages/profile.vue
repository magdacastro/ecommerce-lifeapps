<template>
    <div>
        <Header>
        </Header>

        <div class="container mt-4 mb-4">
            <p>
                <NuxtLink to="/">Home</NuxtLink>
                /
                <NuxtLink to="/profile">Perfil / Favoritos</NuxtLink>
            </p>

            <div class="row">
                <div class="col-lg-8">
                    <h1 class="title">Meus Favoritos</h1>
                    <p>Total ({{ getFavoritesProducts.length }} produtos) </p>

                    <ul>
                        <li v-for="product in getFavoritesProducts">
                            <div class="row mt-3 mb-3">
                                <div class="col-lg-3 col-md-4">
                                    <img :src="product.image" class="list-img-cart" alt="">
                                </div>
                                <div class="col-lg-9 col-md-8 info-card d-flex flex-column justify-content-between">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <h1 class="title-name">{{ product.name }}</h1>
                                    </div>

                                    <div>
                                        <p>{{ product.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <Footer>
        </Footer>
    </div>
</template>

<script lang="ts">
import type { Card } from "@/interfaces/Card.d.ts";


export default {
    data() {
        return {
            products: [] as Card[],
            favorites: [] as Card[]
        }
    },
    created() {
        fetch(`${this.$config.public.API_URL}/products`)
            .then(response => response.json())
            .then((products: Card[]) => {
                this.products = products;
            });
    },
    computed: {
        getFavoritesProducts() {
            const favorites = this.$storage().getAttributeFromLocalStorage("favorites");

            return this.products.filter((product) => {
                return favorites.includes(parseInt(product.id));
            })
        }
    }
}
</script>