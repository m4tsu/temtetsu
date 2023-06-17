import Link from 'next/link'

import type { FC } from 'react'

export const HeaderNav: FC = () => {
  return (
    <header className="border-b border-base-content">
      <nav className="container max-w-[1024px] py-2  md:mx-auto">
        <Link
          href="/"
          className="btn-ghost btn text-3xl normal-case text-primary"
        >
          テム徹（仮）
        </Link>
      </nav>
    </header>
  )
}
