import Link from 'next/link'

import { gears } from '@/data/temtem/gears'

import { PageLayout } from '../__components/PageLayout'

const GearsPage = () => {
  return (
    <PageLayout header={'ギア一覧'}>
      <ul className="flex flex-wrap gap-4">
        {gears.map((gear) => (
          <li key={gear.key}>
            <Link href={`/gears/${gear.key}`} className="link">
              {gear.nameJa}
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  )
}

export default GearsPage
