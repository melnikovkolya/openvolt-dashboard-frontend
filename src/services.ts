export const fetchMeterDataForMeterId = async (meterId: string) => {
  const meterDataRaw = await fetch(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_ENDPOINT_METERS}/${meterId}`
  )
  return await meterDataRaw.json()
}

export const fetchFootprintDataForMeterId = async (meterId: string) => {
  const footprintDataRaw = await fetch(
    `${import.meta.env.VITE_API_URL}/${
      import.meta.env.VITE_API_ENDPOINT_FOOTPRINT
    }?meter_id=${meterId}&granularity=hh&start_date=2023-01-01T00:00&end_date=2023-02-01T00:00`
  )
  return await footprintDataRaw.json()
}
