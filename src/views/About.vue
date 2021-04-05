<template>
  <p>{{ store.state.message }}</p>
  <Foo></Foo>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    Foo: defineAsyncComponent(() => import('@/components/foo/Foo').then((mod) => mod.Foo))
  },
  setup() {
    const store = useStore();
    return { store };
  },
  asyncData({ store }) {
    return store.dispatch('fetchMessage');
  }
});
</script>
