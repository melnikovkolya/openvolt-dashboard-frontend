export type InfoBlockItemType = {
  key: string
  value: string
}

export type InfoItem = {
  key: string
  value: string
}

export type PathToNameMapping = {
  path: string
  name: string
}

export enum Granularity {
  HH = 'hh',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year'
}

export type FootprintForMeterId = {
  meter_id: string,
  granularity: Granularity,
  start_date?: string,
  end_date?: string
}


