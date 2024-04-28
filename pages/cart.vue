<template>
    <div>
        <Header>
        </Header>

        <div class="container mt-4 mb-4">
            <p>Home / Carrinho </p>

            <div class="col-lg-8">
                <h1 class="title">Carrinho</h1>
                <p>Total ({{ totalProducts() }} produtos) <b> {{ totalprice() }} </b></p>

                <ul>
                    <li v-for="product in getProducts()">
                        <div class="row">
                            <div class="col-lg-4">
                                <img :src="product.image" class="img-detail" alt="">
                            </div>
                            <div class="col-lg-8">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col-lg-4"></div>
        </div>
        <Footer>
        </Footer>
    </div>
</template>

<script lang="ts">
import type { Card } from "@/interfaces/Card.d.ts";

type CartItemFromStorage = {
    id: string;
    quantity: number;
}

type CustomProductType = Card & {
    quantity: number
};

export default {
    data() {
        return {
            products: [] as Card[],
            cart: [] as CartItemFromStorage[]
        }
    },
    created() {
        fetch(`${this.$config.public.API_URL}/products`)
            .then(response => response.json())
            .then((products: Card[]) => {
                this.products = products;
                this.cart = this.getProductsFromStorage();
            });
    },
    computed: {},
    methods: {
        getProductsFromStorage() {
            return this.$storage().getAttributeFromLocalStorage("cart");
        },
        totalProducts() {
            return this.cart.length;
        },
        totalprice() {
            let sum = 0;

            const products: CustomProductType[] = this.getProducts().
                filter(function (product: CustomProductType | undefined) {
                    if (product) {
                        return product;
                    }
                });

            products.forEach(function ({ price, promotional_price, quantity }) {
                sum += (promotional_price || price) * quantity;
            })

            return this.$format().money(sum);
        },
        getProducts() {
            return this.cart.map(({ id, quantity }: CartItemFromStorage) => {
                const product = this.products.find((product: Card) => product.id === id);

                if (product) {
                    const formattedProduct: CustomProductType = {
                        ...product,
                        ... { quantity: quantity }
                    }

                    return formattedProduct;
                }

                return product;
            }) as CustomProductType[];
        }
    }
}
</script>