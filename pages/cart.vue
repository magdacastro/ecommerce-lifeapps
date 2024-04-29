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
                        <div class="row mt-3 mb-3">
                            <div class="col-lg-3 col-md-4">
                                <img :src="product.image" class="list-img-cart" alt="">
                            </div>
                            <div class="col-lg-9 col-md-8 info-card d-flex flex-column justify-content-between">
                                <div class="d-flex align-items-center justify-content-between">
                                    <h1 class="title-name">{{ product.name }}</h1>
                                    <span @click="removeProduct()" style="cursor: pointer;">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </span>
                                </div>

                                <div>
                                    <p>{{ product.description }}</p>
                                </div>

                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="form-group">
                                        <select @change="($e) => logSelectedOption($e, product.id)" class="form-control"
                                            id="quantity-option">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div>
                                        <div v-if="product.promotional_price">
                                            <p class="discount"><b>{{ $format().money(product.price) }}</b></p>
                                            <p><b> {{ $format().money(product.promotional_price) }}</b></p>
                                        </div>

                                        <div v-else>
                                            <p><b>{{ $format().money(product.price) }}</b></p>
                                        </div>
                                    </div>
                                </div>

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
        },
        removeProduct() {
            console.log("go to trash")
        },
        logSelectedOption($e: Event, id: string) {
            if ($e.target) {
                const quantity: number = parseInt(($e.target as HTMLSelectElement).value);

                this.cart = this.cart.map((cartItem: CartItemFromStorage) => {
                    if (cartItem.id === id) {
                        cartItem.quantity = quantity;
                    }

                    return cartItem;
                })
            }
        },
    }
}
</script>