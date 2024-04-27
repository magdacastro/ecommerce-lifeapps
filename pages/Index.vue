<template>
<div>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <div class="row" style="width: 100vw">
        <a class="navbar-brand col-lg-4 m-0" href="#">
          <img src="/ecommerce.svg" class="w-size" alt="Logo" />
        </a>
        <div class="d-flex align-items-center col-lg-8" role="search">
          <div class="input-group rounded me-4">
            <input type="search" class="form-control border-end-0" placeholder="Quero comprar algo específico..."
              aria-label="Search" />
            <span class="input-group-text border-end-1" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </div>
          <a class="me-4"><img src="/profile_img.svg" alt="Profile" /></a>
          <a class="me-4"><img src="/shopping_img.svg" alt="Shopping" /></a>
        </div>
      </div>
    </div>
  </nav>

  <section class="header">
    <div class="banner"></div>
  </section>

  <section class="filters">
    <div class="btn-group">
      <button type="button" class="btn btn-selected">Todos os produtos</button>
      <button type="button" class="btn btn-option">Tênis</button>
      <button type="button" class="btn btn-option">Camisetas</button>
      <button type="button" class="btn btn-option">Calças</button>
    </div>

    <div class="items">
      <p>10 Produtos</p>

      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Ordernar por
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Menor preço</a></li>
          <li><a class="dropdown-item" href="#">Maior preço</a></li>
        </ul>
      </div>
    </div>
  </section>

  <footer class="bg-body-tertiary">
    <div class="container-fluid align-footer">
      <div>
        <a class="navbar-brand" href="#">
          <img src="/ecommerce.svg" class="w-size" alt="Logo" />
        </a>
      </div>
      <div class="d-flex footer-link justify-content-end">
        <a href="#">Home</a>
        <a href="#">Tênis</a>
        <a href="#">Camisetas</a>
        <a href="#">Calças</a>
      </div>
    </div>
  </footer>
</div>

</template>