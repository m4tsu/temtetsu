import { PageLayout } from '@/app/__components/PageLayout'
import {
  normalizedSpecies,
  species as speciesList,
} from '@/data/temtem/species'
import { techniquesByName } from '@/data/temtem/techniques'
import type { PageProps } from '@/libs/nextjs/util-types'
import { findItem } from '@/utils/dict'

import { GeneralDetails } from './_page/GeneralDetails'
import { StatsTable } from './_page/StatsTable'
import { TechniqueList } from './_page/TechniqueList'
import { TypeMatchupTable } from './_page/TypeMatchup'

export function generateStaticParams() {
  return speciesList.map((species) => ({ number: species.number }))
}

const TemtemPage = ({ params: { number } }: PageProps<'number'>) => {
  const species = findItem(normalizedSpecies, number)
  const techniques = species.techniques.map((technique) => {
    return {
      ...technique,
      ...findItem(techniquesByName, technique.name),
    }
  })

  return (
    <PageLayout
      header={
        <>
          {species.nameJa}{' '}
          <a
            href={species.wikiUrl}
            target="_blank"
            rel="noreferrer"
            className="link text-sm"
          >
            (公式wiki)
          </a>
        </>
      }
      breadcrumbItems={[
        { path: '/species', label: 'テムテム' },
        { label: <>{species.nameJa} </> },
      ]}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[1fr_3fr] gap-4">
          <section>
            <GeneralDetails species={species} />
          </section>
          <section>
            <h3 className="bg-primary p-2 text-center text-xl font-bold text-white">
              ステータス
            </h3>
            <div>
              <StatsTable baseStats={species.stats} />
            </div>
          </section>
        </div>
        <section>
          <h3 className="bg-primary p-2 text-center text-xl font-bold text-white">
            タイプ相性
          </h3>
          <TypeMatchupTable species={species} />
        </section>
        <section className="h-full">
          <h3 className="bg-primary p-2 text-center text-xl font-bold text-white">
            技
          </h3>
          <TechniqueList techniques={techniques} />
        </section>
      </div>
    </PageLayout>
  )
}

export default TemtemPage
