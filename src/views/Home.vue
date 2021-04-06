<template>
  <p>{{ message }}</p>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import request from '@/utils/request';
export default defineComponent({
  setup() {
    const store = useStore();
    const message = computed(() => store.state.message);

    onMounted(async () => {
      await request.get('/bookmarks');
    });

    return { message };
  }
});
</script>
