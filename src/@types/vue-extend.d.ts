import { RouteRecordRaw } from 'vue-router';

// import { ComponentCustomProperties } from 'vue';
// import { Store } from 'vuex';

export interface IAsyncDataContext {
  route: RouteRecordRaw;
  store: any;
}

declare module '@vue/runtime-core' {
  // declare your own store states
  // interface State {
  //   message: string;
  // }

  interface ComponentCustomOptions {
    asyncData?(context: IAsyncDataContext): Promise<any>;
  }

  // provide typings for `this.$store`
  // interface ComponentCustomProperties {
  //   $store: Store<State>;
  // }
}
