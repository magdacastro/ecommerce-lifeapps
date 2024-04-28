<template>
    <div class="px-0">
      <div>
        <div>
          <div class="row">
            <div class="col-md-12 px-0">
              <img :src="banner" class="w-100">
            </div>
          </div>
        </div>
      </div>
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