<template>
  <p>{{ message }}</p>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const message = computed(() => store.state.message);

    return { message };
  }
});
</script>
