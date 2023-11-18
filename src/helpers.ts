import type { InfoBlockItemType, PathToNameMapping } from '@/types'

export const createArrayOfKeyValuePairsForProvidedPaths = (
  obj: any,
  paths: PathToNameMapping[]
) => {
  const result: InfoBlockItemType[] = []
  paths.forEach((path: PathToNameMapping) => {
    const value = path.path.split('.').reduce((acc, key) => {
      return acc[key]
    }, obj)
    result.push({ key: path.name, value })
  })
  return result
}
