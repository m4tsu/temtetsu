import { HeaderNav } from './__components/HeaderNav'
import { RootProviders } from './_providers'
import './globals.css'

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
      <head />
      <RootProviders>
        <body className="relative bg-base-100">
          <div className="flex min-h-screen flex-col">
            <HeaderNav />
            <div className="container grid max-w-[1024px] py-8 ">
              <main className="container max-w-[1024px] ">{children}</main>
              {/* <aside className="container max-w-[1024px] px-4">
              <div className="grid-cols1 grid h-full w-full border border-primary">
                サイドバー
              </div>
            </aside> */}
            </div>
            {/* <footer className="container border-t border-base-content"> */}
          </div>
        </body>
      </RootProviders>
    </html>
  )
}
