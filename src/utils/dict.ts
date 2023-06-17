export type Dict<
  T extends Record<string, unknown>,
  Key extends keyof T
> = T[Key] extends string ? Record<string, T> : never

export const makeDictFromArray = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  data: T[],
  key: K
): Dict<T, K> => {
  const dict: Record<string, T> = {}
  for (const item of data) {
    const k = String(item[key])
    dict[k] = item
  }
  return dict as Dict<T, K>
}

/**
 * Dict から特定のアイテムを取得する
 * id は存在している値のみ渡されるという前提で、見つからなかったらエラーを投げる
 */
export const findItem = <T>(dict: Record<string, T>, id: string): T => {
  const item = dict[id]
  if (item === undefined) {
    throw new Error(`item(id: ${id}) not found.`)
  }
  return item
}
