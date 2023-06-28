import Link from 'next/link'

import { GaScript } from '@/libs/ga/Script'

import { HeaderNav } from './__components/HeaderNav'
import { RootProviders } from './_providers'

import './globals.css'

export const metadata = {
  title: 'テムテム日本語辞典',
  description: 'テムテムの対戦に役立つ情報を日本語で提供します。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" data-theme="tt">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <GaScript />
      </head>
      <RootProviders>
        <body className="relative bg-base-100">
          <div className="flex min-h-screen flex-col">
            <HeaderNav />
            <div className="container grid max-w-[1024px] grow py-8">
              <main className="container max-w-[1024px] ">{children}</main>
              {/* <aside className="container max-w-[1024px] px-4">
              <div className="grid-cols1 grid h-full w-full border border-primary">
                サイドバー
              </div>
            </aside> */}
            </div>
            <footer className="container  flex max-w-[1024px] justify-center border-t border-zinc-200 py-2 text-xs">
              <Link href="/terms" className="link-hover link-primary">
                利用規約
              </Link>
            </footer>
          </div>
        </body>
      </RootProviders>
    </html>
  )
}
