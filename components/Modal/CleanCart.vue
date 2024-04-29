<template>
    <!-- Modal -->
    <div class="modal fade" id="cleanCartModal" tabindex="-1" aria-labelledby="cleanCartModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="cleanCartModalLabel">Você tem certeza?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Ao limpar o carrinho, você perderá a oportunidade de levar pra casa ótimos produtos.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="cleanCart()">Limpar
                        carrinho</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        cleanCart() {
            this.$emit('confirm', null)
        }
    }
}
</script>