import { notFound } from 'next/navigation'

import { PageLayout } from '@/app/__components/PageLayout'
import { gearsByKey, gears } from '@/data/temtem/gears'
import type { PageProps } from '@/libs/nextjs/util-types'

export function generateStaticParams() {
  return gears.map((gear) => ({ key: gear.key }))
}

const GearPage = ({ params: { key } }: PageProps<'key'>) => {
  // 何故か "/gears/Eraser%2B" の時、 key が "Eraser%252B" になってしまいエラーになるので throw しない
  const gear = gearsByKey[key]
  if (gear === undefined) {
    notFound()
  }
  const { name, nameJa, description, descriptionJa, wikiUrl } = gear
  return (
    <PageLayout
      header={
        <>
          {nameJa ?? name}{' '}
          <a
            href={wikiUrl}
            target="_blank"
            rel="noreferrer"
            className="link text-sm"
          >
            (公式wiki)
          </a>
        </>
      }
      breadcrumbItems={[
        { path: '/traits', label: 'ギア一覧' },
        {
          label: nameJa ?? name,
        },
      ]}
    >
      <div>{descriptionJa ?? description}</div>
    </PageLayout>
  )
}

export default GearPage
