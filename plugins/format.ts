export default defineNuxtPlugin(() => {
  function money(value: number) {
    if (value === undefined || value === null) {
      value = 0;
    }
    
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  return {
    provide: {
      format: function () {
        return {
          money,
        };
      },
    },
  };
});
