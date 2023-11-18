<script setup lang="ts">
defineProps<{
  dataKey?: string
  dataValue?: string
}>()
</script>

<template>
  <div v-if="typeof dataValue !== 'undefined'" class="info-block-item-container">
    <div class="info-block-item-name">{{ dataKey }}</div>
    <div class="info-block-item-value">
      {{ dataValue }}
    </div>
  </div>
</template>

<style scoped>
.info-block-item-container {
  display: flex;
  justify-items: center;
  padding: 0.2rem;
  margin: 0.2rem;
}
.info-block-item-name {
  font-weight: bold;
  min-width: 360px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 1rem 0 0;
}

@media (max-width: 768px) {
  .info-block-item-value {
    font-size: 0.8rem;
  }

  .info-block-item-container {
    flex-direction: column;
  }
}
</style>
