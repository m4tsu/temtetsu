import { PageLayout } from '@/app/__components/PageLayout'
import { traitsByKey } from '@/data/temtem/traits'
import type { PageProps } from '@/libs/nextjs/util-types'
import { findItem } from '@/utils/dict'

const TraitPage = ({ params: { key } }: PageProps<'key'>) => {
  const trait = findItem(traitsByKey, key)
  const { name, nameJa, description, descriptionJa } = trait
  return (
    <PageLayout
      header={nameJa ?? name}
      breadcrumbItems={[
        { path: '/traits', label: '特性一覧' },
        {
          label: trait.nameJa ?? trait.name,
        },
      ]}
    >
      <div>{descriptionJa ?? description}</div>
    </PageLayout>
  )
}

export default TraitPage
