'use client'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsUpDownIcon,
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'
import { twMerge } from 'tailwind-merge'

import { Popover, TriggerButton } from '@/components/Popover'
import { iconImage, STATS_NAMES } from '@/models/Temtem/Species'
import { TemTypes, temTypeImage } from '@/models/Temtem/Type'

import { useTemtemList } from './useTemtemList'

import type { SortBy, SpeciesListItem } from './useTemtemList'
import type { ComponentProps } from 'react'

const Th: FC<ComponentProps<'th'>> = ({ className, ...props }) => (
  <th
    className={twMerge(
      'text-md whitespace-nowrap border border-primary bg-sky-300 p-1 text-center font-bold',
      className
    )}
    {...props}
  />
)

const Td: FC<ComponentProps<'td'>> = ({ className, ...props }) => (
  <td
    className={twMerge(
      'relative border border-primary p-1 text-center',
      className
    )}
    {...props}
  />
)

type Props = {
  speciesList: SpeciesListItem[]
}
export const TemtemList: FC<Props> = ({ speciesList: allSpeciesList }) => {
  const {
    filter,
    sort,
    toggleSortOrder,
    searchByName,
    toggleIsFullyEvolvedOnly,
    isFullyEvolvedOnly,
    speciesList,
    searchText,
    sortCondition,
    filterCondition,
  } = useTemtemList(allSpeciesList)

  const handleClickStatsButton = (sortBy: SortBy) => {
    if (sortCondition.sortBy === sortBy) {
      toggleSortOrder()
    } else {
      sort({ sortBy, order: 'desc' })
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        className="input-bordered input-primary input input-sm max-w-sm"
        placeholder="検索"
        onChange={(e) => searchByName(e.target.value)}
        value={searchText}
        name="search"
      />
      <div className="flex items-center gap-2">
        <label className="flex gap-2">
          <input
            className="checkbox-primary checkbox"
            type="checkbox"
            checked={isFullyEvolvedOnly}
            onChange={toggleIsFullyEvolvedOnly}
            name="search"
          />
          <span>進化後のみ</span>
        </label>
      </div>

      <table className="w-full border-collapse overflow-x-scroll border border-primary">
        <thead className="sticky top-0 z-10">
          <tr>
            <Th rowSpan={2}>
              <button
                className="flex h-full items-center gap-1"
                aria-label="並び替え"
                onClick={() => handleClickStatsButton('number')}
              >
                {sortCondition.sortBy === 'number' ? (
                  sortCondition.order === 'desc' ? (
                    <ArrowDownIcon className="h-4 w-4" />
                  ) : (
                    <ArrowUpIcon className="h-4 w-4" />
                  )
                ) : (
                  <ArrowsUpDownIcon className="h-4 w-4" />
                )}
                No.
              </button>
            </Th>
            <Th rowSpan={2}>テムテム</Th>
            <Th colSpan={2}>
              <div className="flex items-center justify-center gap-1">
                タイプ
                <Popover
                  placement="top"
                  trigger={
                    <TriggerButton aria-label="タイプを選択">
                      {filterCondition === null ? (
                        <FunnelIcon className="h-4 w-4" />
                      ) : (
                        <Image
                          src={temTypeImage(filterCondition)}
                          width={24}
                          height={24}
                          alt={filterCondition}
                        />
                      )}
                    </TriggerButton>
                  }
                >
                  {({ close }) => (
                    <>
                      <div className="grid grid-cols-4 justify-center gap-2 p-2">
                        {TemTypes.map((type) => (
                          <button
                            key={type}
                            className="rounded-md hover:bg-zinc-300"
                            onClick={() => {
                              filter(type)
                              close()
                            }}
                            aria-label={`${type}で絞り込む`}
                          >
                            <Image
                              src={temTypeImage(type)}
                              width={32}
                              height={32}
                              alt={type}
                            />
                          </button>
                        ))}
                      </div>
                      <button
                        className="flex w-full cursor-pointer justify-center rounded-md text-center hover:bg-zinc-300"
                        onClick={() => {
                          filter(null)
                          close()
                        }}
                      >
                        <XMarkIcon
                          className="h-6 w-6"
                          aria-label="絞り込みを解除"
                        />
                      </button>
                    </>
                  )}
                </Popover>
              </div>
            </Th>
            <Th colSpan={8}>BaseStats</Th>
          </tr>
          <tr>
            <Th>1</Th>
            <Th>2</Th>
            {STATS_NAMES.map((name) => (
              <Th key={name}>
                <button
                  className="flex h-full items-center gap-1"
                  aria-label="並び替え"
                  onClick={() => handleClickStatsButton(name)}
                >
                  {sortCondition.sortBy === name ? (
                    sortCondition.order === 'desc' ? (
                      <ArrowDownIcon className="h-4 w-4" />
                    ) : (
                      <ArrowUpIcon className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowsUpDownIcon className="h-4 w-4" />
                  )}
                  {name.toUpperCase()}
                </button>
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {speciesList.map((species) => (
            <tr key={species.number}>
              <Td>{species.number}</Td>
              <Td>
                <Link
                  href={`/species/${species.number}`}
                  className="flex items-center gap-2 font-bold"
                >
                  <Image
                    src={iconImage(species)}
                    alt={species.nameJa}
                    width={36}
                    height={36}
                    className="rounded-sm bg-zinc-700"
                  />
                  <span className="hidden md:inline">{species.nameJa}</span>
                </Link>
              </Td>
              {species.types.length === 1 ? (
                <Td colSpan={2}>
                  <Image
                    src={temTypeImage(species.types[0])}
                    alt={species.types[0]}
                    width={36}
                    height={36}
                    className="mx-auto"
                  />
                </Td>
              ) : (
                species.types.map((type) => (
                  <Td key={type}>
                    <Image
                      src={temTypeImage(type)}
                      alt={type}
                      width={36}
                      height={36}
                    />
                  </Td>
                ))
              )}
              {STATS_NAMES.map((name) => (
                <Td key={name}> {species.stats[name]}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* カード表示 */}
      {/* <ul className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
        {speciesList.map((species) => (
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
      </ul> */}
    </div>
  )
}
