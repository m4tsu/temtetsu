import { generateEnv } from './generateEnv'

type PublicEnvKey = `NEXT_PUBLIC_${string}`

// クライアント側に公開してもよい環境変数を定義する
const publicEnvKeys = [
  'NEXT_PUBLIC_HOGE_KEY',
] as const satisfies readonly PublicEnvKey[]

export const publicEnv = generateEnv(publicEnvKeys)
