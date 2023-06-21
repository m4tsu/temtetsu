import Link from 'next/link'

import type { FC } from 'react'

export const HeaderNav: FC = () => {
  return (
    <header className="border-b border-base-content">
      <nav className="container max-w-[1024px] py-2  md:mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="btn-ghost btn-primary btn text-3xl text-primary"
        >
          テム徹（仮）
        </Link>
        <a href='https://crema.gg/temtem/patch-1-3/' target='_blank' rel='noreferrer' className='btn btn-outline btn-sm btn-primary' >
         PATCH 1.3
        </a>
      </nav>
    </header>
  )
}
