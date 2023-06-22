import Link from 'next/link'

import { techniques } from '@/data/temtem/techniques'

import { PageLayout } from '../__components/PageLayout'

const TechniquesPage = () => {
  return (
    <PageLayout header={'技一覧'}>
      <ul className="flex flex-wrap gap-4">
        {techniques.map((technique) => (
          <li key={technique.key}>
            <Link href={`/techniques/${technique.key}`} className="link">
              {technique.nameJa}
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  )
}

export default TechniquesPage
