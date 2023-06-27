import { PageLayout } from '@/app/__components/PageLayout'
import { gearsByKey, gears } from '@/data/temtem/gears'
import type { PageProps } from '@/libs/nextjs/util-types'
import { findItem } from '@/utils/dict'

export function generateStaticParams() {
  const params = gears.map((gear) => ({ key: decodeURIComponent(gear.key) }))
  return params
}

const GearPage = ({ params: { key } }: PageProps<'key'>) => {
  // generateStaticParams で Mom%27s_Lunch => Mom%2527s_Lunch に encode されてしまうので、 decode して Mom%27s_Lunch に戻す
  const gear = findItem(gearsByKey, key)

  const { nameJa, descriptionJa, wikiUrl } = gear
  return (
    <PageLayout
      header={
        <>
          {nameJa}{' '}
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
        { path: '/traits', label: 'ギア' },
        {
          label: nameJa,
        },
      ]}
    >
      <div>{descriptionJa}</div>
    </PageLayout>
  )
}

export default GearPage
