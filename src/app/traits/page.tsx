import Link from 'next/link'

import { traits } from '@/data/temtem/traits'

import { PageLayout } from '../__components/PageLayout'

import { TraitsTable } from './_page/TraitsTable'

const TraitsPage = () => {
  return (
    <PageLayout header={'個性'}>
      <TraitsTable traits={traits} />
    </PageLayout>
  )
}

export default TraitsPage
