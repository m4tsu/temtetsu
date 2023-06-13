export type Dict<
  T extends Record<string, unknown>,
  Key extends keyof T
> = T[Key] extends string | number ? Record<string, T> : never

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
