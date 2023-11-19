<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="info-block-container">
    <div class="info-block-title-container">
      <h3 class="info-block-title">{{ title }}</h3>
      <slot name="subTitle" />
    </div>
    <div class="info-block-note">
      <slot name="note" />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.info-block-container {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: 0.5rem;
}

.info-block-title-container {
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .info-block-title-container {
    display: flex;
    flex-direction: column;
  }
}

.info-block-title {
  display: flex;
  align-items: center;
  margin: 0 1rem 0 0;
}

.info-block-note {
  font-size: 0.8rem;
  padding-bottom: 0.5rem;
}
</style>
