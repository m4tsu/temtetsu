import Image from 'next/image'
import Link from 'next/link'

import { PageLayout } from '@/app/__components/PageLayout'
import { species as speciesListData } from '@/data/temtem/species'
import { traitsByKey, traits } from '@/data/temtem/traits'
import type { PageProps } from '@/libs/nextjs/util-types'
import { iconImage } from '@/models/Temtem/Species'
import { findItem } from '@/utils/dict'

import styles from './page.module.css'

export function generateStaticParams() {
  return traits.map((trait) => ({ key: decodeURIComponent(trait.key) }))
}

const TraitPage = ({ params: { key } }: PageProps<'key'>) => {
  const trait = findItem(traitsByKey, key)
  const { nameJa, descriptionJa, wikiUrl, name } = trait

  const speciesList = speciesListData.filter((species) => {
    return species.traits.some((t) => t === name)
  })

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
      <div className="flex flex-col gap-4">
        <h3 className="border-b border-primary text-2xl font-bold">説明</h3>
        <div>
          <p>{descriptionJa} </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="border-b border-primary text-2xl font-bold">
          この個性を持つテムテム
        </h3>
        <ul className={styles.speciesList}>
          {speciesList.map((species) => (
            <li key={species.name} className="flex items-center gap-4">
              <Image
                src={iconImage(species)}
                width={48}
                height={48}
                alt={species.nameJa}
                className="rounded-sm bg-zinc-700"
              />
              <Link href={`/species/${species.number}`} className="link">
                {species.nameJa}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  )
}

export default TraitPage
