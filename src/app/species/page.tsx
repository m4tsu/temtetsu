import { species } from '@/data/temtem/species'
import { pick } from '@/utils/pick'

import { PageLayout } from '../__components/PageLayout'

import { TemtemList } from './_page/TemtemList'

const speciesList = species.map((s) =>
  pick(s, ['number', 'name', 'nameJa', 'icon', 'types', 'stats', 'evolution'])
)

const TempediaPage = () => {
  return (
    <PageLayout header="テムテム">
      <TemtemList speciesList={speciesList} />
    </PageLayout>
  )
}

export default TempediaPage
