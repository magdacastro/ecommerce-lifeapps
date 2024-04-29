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
                                    <div class="d-flex justify-content-center">
                                        <div class="d-flex flex-column">
                                            <h1 class="title-name">{{ product.name }}</h1>
                                            <p>{{ product.description }}</p>
                                        </div>

                                        <div>
                                            <span @click="removeFavorite(product.id)" style="cursor: pointer;">
                                                <i class="fa-solid fa-heart"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <button type="button" @click="addToCart(product.id)"
                                        class="btn-cart col-lg-6 col-sm-12 col-md-3">
                                        ADICIONAR AO CARRINHO
                                    </button>
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
            favorites: [] as Card[],
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
    },
    methods: {
        removeFavorite(id: string) {
            const items = this.getFavoritesProductsFromStorage();
            const index = items.indexOf(parseInt(id));
            items.splice(index, 1);

            this.$storage().addItemsToStorage("favorites", items);
            this.products = this.getFavoritesProducts;
        },
        getFavoritesProductsFromStorage() {
            return this.$storage().getAttributeFromLocalStorage("favorites");
        },
        addToCart(id: string) {
            const products = this.$storage().getAttributeFromLocalStorage("cart");

            const existsOnStorage = products.find((product: { id: string, quantity: number }) => product.id === id);

            if (!existsOnStorage) {
                products.push({
                    id: id,
                    quantity: 1
                });

                this.$storage().addItemsToStorage("cart", products);
            }

            this.$router.push("/cart");
        },
    }
}
</script>