import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    products: [
      {
        id: '1',
        title: 'Apple iPhone 8'
      },
      {
        id: '2',
        title: 'Apple iPhone 8 Plus'
      },
      {
        id: '3',
        title: 'Apple iPhone X'
      }
    ]
  },
  getters: {
    products({ state }) {
      return state.products;
    }
  },
  actions: {
    addProduct({ state }, product) {
      state.products = [...state.products, product];
    }
  }
});
export default store;
