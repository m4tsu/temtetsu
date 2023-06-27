import { gears } from '@/data/temtem/gears'

import { PageLayout } from '../__components/PageLayout'

import { GearsTable } from './_page/GearsTable'

const GearsPage = () => {
  return (
    <PageLayout header={'ギア'}>
      <GearsTable gears={gears} />
    </PageLayout>
  )
}

export default GearsPage
