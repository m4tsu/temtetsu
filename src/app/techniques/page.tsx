import { techniques } from '@/data/temtem/techniques'

import { PageLayout } from '../__components/PageLayout'

import { TechniquesTable } from './_page/TechniquesTable'

const TechniquesPage = () => {
  return (
    <PageLayout header={'技'}>
      <TechniquesTable techniques={techniques} />
      {/* <ul className="flex flex-wrap gap-4">
        {techniques.map((technique) => (
          <li key={technique.key}>
            <Link href={`/techniques/${technique.key}`} className="link">
              {technique.nameJa}
            </Link>
          </li>
        ))}
      </ul> */}
    </PageLayout>
  )
}

export default TechniquesPage
