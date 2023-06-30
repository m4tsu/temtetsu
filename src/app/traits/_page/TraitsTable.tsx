'use client'

import Link from 'next/link'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import type { Trait } from '@/models/Temtem/Trait'
import { jaStrMatch } from '@/utils/kana'

import type { ComponentProps, FC } from 'react'

const Th: FC<ComponentProps<'th'>> = ({ className, ...props }) => (
  <th
    className={twMerge(
      'border border-primary bg-sky-300 p-1 text-center font-bold',
      className
    )}
    {...props}
  />
)

const Td: FC<ComponentProps<'td'>> = ({ className, ...props }) => (
  <td
    className={twMerge(
      'relative border border-primary p-1 text-center ',
      className
    )}
    {...props}
  />
)

const filterTraits = (traits: Trait[], searchText: string) => {
  if (searchText === '') return traits

  return traits.filter((trait) => {
    return jaStrMatch(trait.nameJa, searchText)
  })
}

type Props = {
  traits: Trait[]
}
export const TraitsTable: FC<Props> = ({ traits }) => {
  // TODO: hook に出す
  const [searchText, setSearchText] = useState('')
  const filteredTraits = filterTraits(traits, searchText)

  return (
    <div className="flex flex-col gap-2">
      <input
        className="input-bordered input-primary input input-sm max-w-sm"
        placeholder="検索"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        name="search"
      />

      <table className="relative border-collapse overflow-x-scroll border border-primary">
        <thead className="sticky top-0 z-10">
          <tr>
            <Th>名前</Th>
            <Th>説明</Th>
          </tr>
        </thead>
        <tbody>
          {filteredTraits.map((trait) => (
            <tr key={trait.key}>
              <Td className="whitespace-nowrap">
                <Link href={`/traits/${trait.key}`} className="link">
                  {trait.nameJa}
                </Link>
              </Td>
              <Td>{trait.descriptionJa}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
