<script setup lang="ts">
defineProps<{
  dataKey?: string
  dataValue?: string
}>()
</script>

<template>
  <div v-if="dataValue" class="info-block-item-container">
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
  width: 360px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 1rem 0 0;
}

.info-block-item-value {
}
</style>
