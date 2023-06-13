import { generateEnv } from './generateEnv'

const serverEnvKeys = [
  'FUGA_CLIENT_SECRET',
] as const satisfies readonly string[]

export const serverEnv = generateEnv(serverEnvKeys)
