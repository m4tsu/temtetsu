import { normalizedSpecies } from '@/data/temtem/species'
import { normalizedTechniques } from '@/data/temtem/techniques'
import type { PageProps } from '@/libs/nextjs/util-types'
import { findItem } from '@/utils/dict'

import { BaseStatsTable } from './_page/BaseStatsTable'
import { GeneralDetails } from './_page/GeneralDetails'
import { TechniqueList } from './_page/TechniqueList'
import { TypeMatchupTable } from './_page/TypeMatchup'

const TemtemPage = ({ params: { number } }: PageProps<'number'>) => {
  const species = findItem(normalizedSpecies, number)
  const techniques = species.techniques.map((technique) => {
    return {
      ...technique,
      ...findItem(normalizedTechniques, technique.name),
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-secondary">{species.nameJa}</h2>
      <hr className="border-t border-primary" />
      <p>ここに検索ボックス</p>
      <div className="grid grid-cols-[1fr_3fr] gap-4">
        <section>
          <GeneralDetails species={species} />
        </section>
        <section>
          <h3 className="bg-primary p-2 text-center text-xl font-bold text-white">
            SV
          </h3>
          <div>
            <BaseStatsTable baseStats={species.stats} />
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
          技一覧
        </h3>
        <TechniqueList techniques={techniques} />
      </section>
      <div style={{ height: '100vh' }}></div>
    </div>
  )
}

export default TemtemPage
