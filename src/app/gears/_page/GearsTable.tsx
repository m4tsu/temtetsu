'use client'

import Image from 'next/image'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { gearIconImage } from '@/models/Temtem/Gear'
import type { Gear } from '@/models/Temtem/Gear'
import { jaStrMatch } from '@/utils/kana'

import styles from './styles.module.css'

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
  <td className={twMerge('border border-primary p-1', className)} {...props} />
)

const filterGears = (gears: Gear[], searchText: string) => {
  if (searchText === '') return gears

  return gears.filter((gear) => {
    return jaStrMatch(gear.nameJa, searchText)
  })
}

type Props = {
  gears: Gear[]
}
export const GearsTable: FC<Props> = ({ gears }) => {
  // TODO: hook に出す
  const [searchText, setSearchText] = useState('')
  const filteredGears = filterGears(gears, searchText)

  return (
    <div className="flex flex-col gap-2">
      <input
        className="input-bordered input-primary input input-sm max-w-sm"
        placeholder="検索"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        name="search"
      />

      <table className="w-full border-collapse overflow-x-scroll border border-primary">
        <thead className="sticky top-0 z-10">
          <tr>
            <Th>名前</Th>
            <Th>効果</Th>
          </tr>
        </thead>
        <tbody>
          {filteredGears.map((gear) => (
            <tr key={gear.key}>
              <Td className="whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-zinc-700">
                    <Image
                      src={gearIconImage(gear)}
                      alt={gear.nameJa}
                      width={50}
                      height={38}
                      // style で指定しないとレンダリング後にサイズが変更され表示が崩れる
                      style={{ minWidth: 50 }}
                      className={styles.gearImg}
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <p>{gear.nameJa}</p>
                    <a
                      href={gear.wikiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link text-sm"
                    >
                      (公式wiki)
                    </a>
                  </div>
                </div>
              </Td>
              <Td>{gear.descriptionJa}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
