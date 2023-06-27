import { PageLayout } from '@/app/__components/PageLayout'
import { traitsByKey, traits } from '@/data/temtem/traits'
import type { PageProps } from '@/libs/nextjs/util-types'
import { findItem } from '@/utils/dict'

export function generateStaticParams() {
  return traits.map((trait) => ({ key: decodeURIComponent(trait.key) }))
}

const TraitPage = ({ params: { key } }: PageProps<'key'>) => {
  const trait = findItem(traitsByKey, key)
  const { nameJa, descriptionJa, wikiUrl } = trait
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
        { path: '/traits', label: '個性' },
        {
          label: trait.nameJa,
        },
      ]}
    >
      <div>{descriptionJa}</div>
    </PageLayout>
  )
}

export default TraitPage
