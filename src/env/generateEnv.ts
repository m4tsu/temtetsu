type Env<T extends readonly string[]> = {
  [key in T[number]]: string
}
type Keys<T extends readonly string[]> = T[number]

export const generateEnv = <T extends readonly string[]>(
  envKeys: T
): Env<T> => {
  const noValueKeys: string[] = []
  const env = envKeys.reduce<{
    [key in Keys<T>]?: string | undefined
  }>((acc, key) => {
    const val = process.env[key]
    if (val === undefined) {
      noValueKeys.push(key)
    }
    return { ...acc, [key]: val }
  }, {})

  if (noValueKeys.length > 0) {
    throw new Error(
      `Following environment variables are not defined: ${noValueKeys.toString()}`
    )
  }
  return env as Env<T>
}
