import Link from 'next/link'

import { traits } from '@/data/temtem/traits'

const TraitsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold">特性一覧</h2>
      <ul>
        {traits.map((trait) => (
          <li key={trait.key}>
            <Link href={`/traits/${trait.key}`}>
              {trait.nameJa ?? trait.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TraitsPage
