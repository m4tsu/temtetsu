import Link from 'next/link'

import type { FC } from 'react'

export const HeaderNav: FC = () => {
  return (
    <header className="border-b border-base-content">
      <nav className="container flex max-w-[1024px]  items-center justify-between py-2 md:mx-auto">
        <Link
          href="/"
          className="btn-ghost btn-primary btn text-3xl text-primary"
        >
          テムテム対戦データベース
        </Link>
        <a
          href="https://crema.gg/temtem/patch-1-3/"
          target="_blank"
          rel="noreferrer"
          className="btn-primary btn-outline btn-sm btn"
        >
          PATCH 1.3
        </a>
      </nav>
    </header>
  )
}
