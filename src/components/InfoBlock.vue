<script setup lang="ts">
defineProps<{
  title?: string
  note?: string
}>()
</script>

<template>
  <div class="info-block-container">
    <h3 class="info-block-header">{{ title }}</h3>
    <div v-if="note" class="info-block-header-note">{{ note }}</div>
    <slot />
  </div>
</template>

<style scoped>
.info-block-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 0.5rem;
}

.info-block-header-note {
  width: 100%;
  padding-bottom: 0.5rem;
  font-size: 0.8rem;
}

.info-block-container {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: 0.5rem;
}
</style>
