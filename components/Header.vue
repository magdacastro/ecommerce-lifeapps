<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <div class="row" style="width: 100vw">
        <a class="navbar-brand col-lg-4 m-0" href="#">
          <img src="/assets/images/ecommerce.svg" class="w-size" alt="Logo" />
        </a>
        <div class="d-flex align-items-center col-lg-8" role="search">
          <div class="input-group rounded me-4">
            <input
              type="search"
              class="form-control border-end-0"
              placeholder="Quero comprar algo específico..."
              aria-label="Search"
            />
            <span class="input-group-text border-end-1" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </div>
          <a class="me-4"><img src="/assets/images/profile_img.svg" alt="Profile" /></a>
          <a class="me-4"><img src="/assets/images/shopping_img.svg" alt="Shopping" /></a>
        </div>
      </div>
    </div>
  </nav>
</template>
