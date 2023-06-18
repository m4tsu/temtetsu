import { Breadcrumbs } from './Breadcrumbs'

import type { BreadcrumbItem } from './Breadcrumbs'
import type { FC, PropsWithChildren, ReactNode } from 'react'

type Props = {
  header: ReactNode
  breadcrumbItems?: BreadcrumbItem[]
}
export const PageLayout: FC<PropsWithChildren<Props>> = ({
  header,
  children,
  breadcrumbItems,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-primary pb-1">
        <h2 className="text-3xl font-bold">{header}</h2>
        {breadcrumbItems && <Breadcrumbs items={breadcrumbItems} />}
      </div>
      {children}
    </div>
  )
}
