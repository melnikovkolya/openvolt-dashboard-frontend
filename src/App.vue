<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InfoBlock from '@/components/InfoBlock.vue'
import InfoBlockItem from '@/components/InfoBlockItem.vue'
import { createArrayOfKeyValuePairsForProvidedPaths } from '@/helpers'
import { fetchMeterDataForMeterId, fetchFootprintDataForMeterId } from '@/services'
import { Granularity, type InfoItem } from '@/types'
import {
  METER_ID,
  FOOTER_INFO_PATH_TO_NAME_MAPPING,
  METER_INFO_PATH_TO_NAME_MAPPING,
  FORMATTED_DATE_OPTIONS
} from '@/constants'

const start_date = '2023-01-01T00:00'
const end_date = '2023-02-01T00:00'

const meterInfoItems = ref<InfoItem[]>([])
const footprintInfoItems = ref<InfoItem[]>([])

const formattedStartDate = new Date(start_date).toLocaleDateString('en-GB', FORMATTED_DATE_OPTIONS)
const formattedEndDate = new Date(end_date).toLocaleDateString('en-GB', FORMATTED_DATE_OPTIONS)

onMounted(async () => {
  // Not using Promise.all() here because whatever data is fetched first will be shown first.
  // This way the user will see some data sooner.
  fetchMeterDataForMeterId(METER_ID)
    .then((meterDataValue) => {
      meterInfoItems.value = createArrayOfKeyValuePairsForProvidedPaths(
        meterDataValue,
        METER_INFO_PATH_TO_NAME_MAPPING
      )
    })
    .catch((error) => {
      console.error(error)
    })

  fetchFootprintDataForMeterId({
    meter_id: METER_ID,
    granularity: Granularity.HH,
    start_date,
    end_date
  })
    .then((footprintDataValue) => {
      footprintInfoItems.value = createArrayOfKeyValuePairsForProvidedPaths(
        footprintDataValue,
        FOOTER_INFO_PATH_TO_NAME_MAPPING
      )
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <div class="app-container">
    <header>
      <h2>Footprint dashboard</h2>
    </header>
    <main>
      <div v-if="!(Boolean(meterInfoItems.length) || Boolean(footprintInfoItems.length))">
        Fetching data...
      </div>
      <div v-else>
        <InfoBlock title="Customer information">
          <div v-if="!Boolean(meterInfoItems.length)">Fetching data...</div>
          <div v-else>
            <InfoBlockItem
              v-for="item in meterInfoItems"
              :key="item.key"
              :dataKey="item.key"
              :dataValue="item.value"
            />
          </div>
        </InfoBlock>
        <InfoBlock title="Energy consumption footprint">
          <template #subTitle>
            {{ `Time period: ${formattedStartDate} - ${formattedEndDate}` }}
          </template>
          <template #note>
            Please note: the share values are fixed to 3 decimal places, so 0.000 is returned for a
            value of 0.0001, for example.
          </template>
          <div v-if="!Boolean(footprintInfoItems.length)">Fetching data...</div>
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
