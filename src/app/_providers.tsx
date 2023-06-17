'use client'

import { SSRProvider } from 'react-aria'

import type { FC, PropsWithChildren } from 'react'

export const RootProviders: FC<PropsWithChildren> = ({ children }) => (
  <SSRProvider>{children}</SSRProvider>
)
