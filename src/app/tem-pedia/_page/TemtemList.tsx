'use client'

import Link from 'next/link'

import type { Species } from '@/models/Temtem/species'

import type { FC } from 'react'

type Props = {
  speciesList: Species[]
}
export const TemtemList: FC<Props> = ({ speciesList }) => {
  return (
    <ul className="container mx-auto grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
      {speciesList.map((species) => (
        <li key={species.id} className="card rounded-lg bg-white  shadow hover:shadow-md">
          <Link href={`/tem-pedia/${species.id}`} className='p-4'>{species.nameJp}</Link>
        </li>
      ))}
    </ul>
  )
}
