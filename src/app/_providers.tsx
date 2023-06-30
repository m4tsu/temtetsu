'use client'

import { MantineProvider } from '@mantine/core'
import { SSRProvider } from 'react-aria'

import type { FC, PropsWithChildren } from 'react'

export const RootProviders: FC<PropsWithChildren> = ({ children }) => (
  <SSRProvider>
    <MantineProvider
      theme={{ colorScheme: 'light' }}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </MantineProvider>
  </SSRProvider>
)
