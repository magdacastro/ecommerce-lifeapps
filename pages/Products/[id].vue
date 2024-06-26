<template>
    <div>
        <Header></Header>

        <div class="container mt-4 mb-4" v-show="canDisplayCard">
            <p>
                <NuxtLink to="/">Home</NuxtLink>
                /
                <NuxtLink to="/">Produtos</NuxtLink>
                /
                {{ card.name }}
            </p>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6">
                        <img class="img-detail" :src="card.image" alt="">
                    </div>
                    <div class="col-lg-6 col-description">
                        <div class="d-flex align-items-center justify-content-between">
                            <h1 class="title">{{ card.name }}</h1>
                            <span @click="toggleFavoriteProperty()" style="cursor: pointer;">
                                <i v-if="isFavorite()" class="fa-solid fa-heart"></i>
                                <i v-else class="fa-regular fa-heart"></i>
                            </span>
                        </div>
                        <h2 class="price">{{ $format().money(card.price) }}</h2>
                        <h3 class="title-description">Descrição</h3>
                        <p class="description">{{ card.description }}</p>
                        <button type="button" @click="addToCart()" class="btn-cart col-lg-6 col-sm-12 col-md-3">
                            ADICIONAR AO CARRINHO
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script lang="ts">
import type { Card } from "@/interfaces/Card.d.ts";

export default {
    data() {
        return {
            card: {} as Card,
            is_favorite: false
        }
    },
    computed: {
        canDisplayCard: function () {
            return this.card && Object.getOwnPropertyNames(this.card).length !== 0
        }
    },
    created() {
        fetch(`${this.$config.public.API_URL}/products/${this.$route.params.id}`)
            .then(response => response.json())
            .then((card: Card) => {
                this.card = card;

                this.setFavoriteProperty();
            });
    },
    methods: {
        addToCart() {
            const products = this.$storage().getAttributeFromLocalStorage("cart");

            const existsOnStorage = products.find((product: { id: string, quantity: number }) => product.id === this.card.id);

            if (!existsOnStorage) {
                products.push({
                    id: this.card.id,
                    quantity: 1
                });

                this.$storage().addItemsToStorage("cart", products);
            }

            this.$router.push("/cart");
        },
        getFavoritesProductsFromStorage() {
            return this.$storage().getAttributeFromLocalStorage("favorites");
        },
        setFavoriteProperty() {
            const items = this.getFavoritesProductsFromStorage();

            if (items.includes(parseInt(this.card.id))) {
                this.is_favorite = true;
            }

            return this.is_favorite;
        },
        isFavorite() {
            return this.is_favorite;
        },
        toggleFavoriteProperty() {
            this.is_favorite = !this.is_favorite;

            const items = this.getFavoritesProductsFromStorage();

            if (!this.is_favorite) {
                items.splice(items.indexOf(this.card.id), 1);
            } else {
                items.push(parseInt(this.card.id));
            }

            this.$storage().addItemsToStorage("favorites", items);
        },
        getCartUrl(id: string) {
            return `/cart/${id}`;
        }
    }
}
</script>