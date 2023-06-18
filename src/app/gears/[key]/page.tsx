import { PageLayout } from '@/app/__components/PageLayout'
import { gearsByKey } from '@/data/temtem/gears'
import type { PageProps } from '@/libs/nextjs/util-types'
import { findItem } from '@/utils/dict'

const GearPage = ({ params: { key } }: PageProps<'key'>) => {
  const gear = findItem(gearsByKey, key)
  const { name, nameJa, description, descriptionJa } = gear
  return (
    <PageLayout
      header={nameJa ?? name}
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
