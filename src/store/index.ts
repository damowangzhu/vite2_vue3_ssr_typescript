import { createStore as _createStore } from 'vuex';

export default function createStore() {
  return _createStore({
    state: {
      message: 'Hello vite2 vue3'
    },
    mutations: {},
    actions: {
      fetchMessage: ({ state }) => {
        console.log('fetch message ...');
        return new Promise((resolve) => {
          setTimeout(() => {
            state.message = 'vite + store + typescript';
            resolve(0);
          }, 200);
        });
      }
    },
    modules: {}
  });
}
