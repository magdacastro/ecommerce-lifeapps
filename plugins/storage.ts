export default defineNuxtPlugin(() => {
  function addItemsToStorage(key: string, items: Array<any>) {
    const favorites = JSON.stringify(Array.from(new Set(items).values()));

    window.localStorage.setItem(key, favorites);
  }

  function getAttributeFromLocalStorage(key: string) {
    const favorites = window.localStorage.getItem(key);

    if (favorites) {
      return JSON.parse(favorites);
    }

    return [];
  }

  return {
    provide: {
      storage: function () {
        return {
          addItemsToStorage,
          getAttributeFromLocalStorage,
        };
      },
    },
  };
});
