import data from '@/data/species.json'
import type { Species } from '@/models/Temtem/species'

import { TemtemList } from './_page/TemtemList'

const species: Species[] = Object.values(data)

const TempediaPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold">テムテム図鑑</h2>
      <TemtemList speciesList={species} />
    </div>
  )
}

export default TempediaPage
