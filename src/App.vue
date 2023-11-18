<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InfoBlock from '@/components/InfoBlock.vue'
import InfoBlockItem from '@/components/InfoBlockItem.vue'
import { createArrayOfKeyValuePairsForProvidedPaths } from '@/helpers'
import { fetchMeterDataForMeterId, fetchFootprintDataForMeterId } from '@/services'
import type { InfoItem } from '@/types'
import {
  METER_ID,
  FOOTER_INFO_PATH_TO_NAME_MAPPING,
  METER_INFO_PATH_TO_NAME_MAPPING
} from '@/constants'

const meterData = ref()
const footprintData = ref()

const meterInfoItems = ref<InfoItem[]>([])
const footprintInfoItems = ref<InfoItem[]>([])

onMounted(async () => {
  meterData.value = await fetchMeterDataForMeterId(METER_ID)
  meterInfoItems.value = createArrayOfKeyValuePairsForProvidedPaths(
    meterData.value,
    METER_INFO_PATH_TO_NAME_MAPPING
  )

  footprintData.value = await fetchFootprintDataForMeterId(METER_ID)
  footprintInfoItems.value = createArrayOfKeyValuePairsForProvidedPaths(
    footprintData.value,
    FOOTER_INFO_PATH_TO_NAME_MAPPING
  )
})
</script>

<template>
  <div class="app-container">
    <header>
      <h2>Footprint dashboard</h2>
    </header>
    <main>
      <div v-if="!(meterData || footprintData)">Fetching data...</div>
      <div v-else>
        <InfoBlock title="Customer information">
          <div v-if="!meterData">Fetching data...</div>
          <div v-else>
            <InfoBlockItem
              v-for="item in meterInfoItems"
              :key="item.key"
              :dataKey="item.key"
              :dataValue="item.value"
            />
          </div>
        </InfoBlock>
        <InfoBlock
          title="Energy consumption footprint"
          note="Please note: the share values are fixed to 2 decimal places, so 0.00% is returned for a
        value of 0.0001%
     "
        >
          <div v-if="!footprintData">Fetching data...</div>
          <div v-else>
            <InfoBlockItem
              v-for="item in footprintInfoItems"
              :key="item.key"
              :dataKey="item.key"
              :dataValue="item.value"
            />
          </div>
        </InfoBlock>
      </div>
    </main>
  </div>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 1rem;
}

main {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  gap: 1rem;
}

.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.app-logo {
  height: 48px;
  width: 48px;
}

@media (max-width: 768px) {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
