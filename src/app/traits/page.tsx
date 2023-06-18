import Link from 'next/link'

import { traits } from '@/data/temtem/traits'

import { PageLayout } from '../__components/PageLayout'

const TraitsPage = () => {
  return (
    <PageLayout header={'特性一覧'}>
      <ul className="flex flex-wrap gap-4">
        {traits.map((trait) => (
          <li key={trait.key}>
            <Link href={`/traits/${trait.key}`} className="link">
              {trait.nameJa ?? trait.name}
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  )
}

export default TraitsPage
