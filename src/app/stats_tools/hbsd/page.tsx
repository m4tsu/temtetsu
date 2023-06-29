'use client'

import { PageLayout } from '@/app/__components/PageLayout'

import { TvCalculator } from './_page/tv-calculator/TvCalculator'

const StatsToolsPage = () => {
  return (
    <PageLayout header="総合耐久計算機">
      <TvCalculator />
    </PageLayout>
  )
}

export default StatsToolsPage
