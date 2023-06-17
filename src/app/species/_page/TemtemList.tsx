'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type FC } from 'react'

import { iconImage, type Species } from '@/models/Temtem/Species'
import { katakanaToHiragana } from '@/utils/kana'

type SpeciesItem = Pick<Species, 'number' | 'nameJa' | 'name' | 'icon'>

const speciesNamefilter = (
  { nameJa, name }: SpeciesItem,
  searchText: string
) => {
  if (nameJa.includes(searchText)) return true
  if (katakanaToHiragana(nameJa).includes(searchText)) return true
  if (name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
    return true
  return false
}

type Props = {
  speciesList: SpeciesItem[]
}
export const TemtemList: FC<Props> = ({ speciesList }) => {
  const [searchText, setSearchText] = useState('')
  const filteredList =
    searchText === ''
      ? speciesList
      : speciesList.filter((species) => speciesNamefilter(species, searchText))

  return (
    <div className="flex flex-col gap-8">
      <input
        className="bg-base input-bordered input-primary input w-full"
        placeholder="検索"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
        {filteredList.map((species) => (
          <li
            key={species.number}
            className="card rounded-lg  bg-white shadow hover:shadow-md"
          >
            <Link
              href={`/species/${species.number}`}
              className="flex items-center gap-2 p-2"
            >
              <Image
                src={iconImage(species)}
                alt={species.nameJa}
                width={36}
                height={36}
              />
              <span>{species.nameJa}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
