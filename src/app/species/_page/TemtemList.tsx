'use client'

import Link from 'next/link'

import type { Species } from '@/models/Temtem/Species'

import type { FC } from 'react'

type Props = {
  speciesList: Pick<Species, 'number' | 'nameJa'>[]
}
export const TemtemList: FC<Props> = ({ speciesList }) => {
  return (
    <ul className="container mx-auto grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
      {speciesList.map((species) => (
        <li
          key={species.number}
          className="card rounded-lg bg-white shadow hover:shadow-md"
        >
          <Link href={`/species/${species.number}`} className="p-4">
            {species.nameJa}
          </Link>
        </li>
      ))}
    </ul>
  )
}
