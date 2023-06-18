import Link from 'next/link'

import type { FC, ReactNode } from 'react'

export type BreadcrumbItem = {
  path?: string
  label: ReactNode
}

type Props = {
  items: BreadcrumbItem[]
}
export const Breadcrumbs: FC<Props> = ({ items }) => {
  return (
    <div className="breadcrumbs py-1 text-sm">
      <ul>
        {items.map((item, i) => (
          <li key={item.path ?? i}>
            {item.path ? (
              <Link
                key={item.path}
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                href={item.path as any}
                className="link-hover link-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-bold text-primary-focus">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
