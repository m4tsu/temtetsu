export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> =>
  Object.fromEntries(
    keys.map((key) => [key, obj[key as unknown as keyof T]])
  ) as Pick<T, K>
