import { species } from '@/data/temtem/species'
import { pick } from '@/utils/pick'

import { TemtemList } from './_page/TemtemList'

const speciesList = species.map((s) =>
  pick(s, ['number', 'name', 'nameJa', 'icon'])
)

const TempediaPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold">テムテム一覧</h2>
      <TemtemList speciesList={speciesList} />
    </div>
  )
}

export default TempediaPage
