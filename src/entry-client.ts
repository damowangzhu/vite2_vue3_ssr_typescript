import App from './App.vue';
import '@/scss/common.scss';
import createStore from './store';
import { createSSRApp } from 'vue';
import { isPromise } from './utils';
import createRouter from './router';
import { sync } from 'vuex-router-sync';

const router = createRouter();
const store = createStore();
sync(store, router);

const app = createSSRApp(App);
app.use(router).use(store);

router.beforeResolve((to, from, next) => {
  let diffed = false;
  const matched = router.resolve(to).matched;
  const prevMatched = router.resolve(from).matched;

  if (from && !from.name) {
    return next();
  } else {
    window.document.title = (to.meta.title || '首页') as any;
  }
  const activated = matched.filter((c, i) => {
    return diffed || (diffed = prevMatched[i] !== c);
  });

  if (!activated.length) {
    return next();
  }

  const matchedComponents: any = [];
  matched.map((route) => {
    matchedComponents.push(...Object.values(route.components));
  });
  const asyncDataFuncs = matchedComponents.map((component: any) => {
    const asyncData = component.asyncData || null;
    if (asyncData) {
      const config = {
        store,
        route: to
      };
      if (isPromise(asyncData) === false) {
        return Promise.resolve(asyncData(config));
      }
      return asyncData(config);
    }
  });
  try {
    Promise.all(asyncDataFuncs).then(() => {
      next();
    });
  } catch (err) {
    next(err);
  }
});

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.isReady().then(() => {
  app.mount('#app', true);
});
