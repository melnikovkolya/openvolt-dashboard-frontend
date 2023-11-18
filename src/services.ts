import type { FootprintForMeterId } from '@/types'

export const fetchMeterDataForMeterId = async (meter_id: string) => {
  const meterDataRaw = await fetch(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_ENDPOINT_METERS}/${meter_id}`
  )
  return await meterDataRaw.json()
}

export const fetchFootprintDataForMeterId = async ({
  meter_id,
  granularity,
  start_date,
  end_date
}: FootprintForMeterId) => {
  const footprintDataRaw = await fetch(
    `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_ENDPOINT_FOOTPRINT
    }?meter_id=${meter_id}&granularity=${granularity}&start_date=${start_date}&end_date=${end_date}`
  )
  return await footprintDataRaw.json()
}
