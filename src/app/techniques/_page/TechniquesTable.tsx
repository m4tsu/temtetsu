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
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { type ComponentProps, type FC, useCallback, useMemo } from 'react'
import { Button } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Popover, TriggerButton } from '@/components/Popover'
import {
  CATEGORIES,
  categoryIcon,
  priorityIcon,
  targetsJaMap,
} from '@/models/Temtem/Technique'
import type { Category, Technique } from '@/models/Temtem/Technique'
import type { TemType } from '@/models/Temtem/Type'
import { TemTypes, temTypeImage } from '@/models/Temtem/Type'

const imageFitClassName = 'object-contain !relative !w-auto mx-auto max-h-8'

const Th: FC<ComponentProps<'th'>> = ({ className, ...props }) => (
  <th
    className={twMerge(
      'text-bold text-md whitespace-nowrap border border-primary bg-sky-300 p-1 text-center',
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

type TechniqueListItem = Technique

type Props = {
  techniques: TechniqueListItem[]
}

type TypeFilter = TemType | null
type CategoryFilter = Category | null
export type SortBy = 'damage'
type SortOrder = 'asc' | 'desc'
type SortCondition = {
  sortBy: SortBy
  order: SortOrder
} | null

const sortTequniqueList = (
  speciesList: Technique[],
  sortCondition: SortCondition
) => {
  if (sortCondition === null) {
    return speciesList
  }
  const { order } = sortCondition

  return speciesList.sort((a, b) => {
    const reuslt = Number(a.damage) - Number(b.damage)
    return order === 'asc' ? reuslt : -reuslt
  })
}

export const TechniquesTable: FC<Props> = ({ techniques }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  if (searchParams === null) throw new Error('searchParams is null')

  const typeFilter = searchParams.get('typeFilter') as TypeFilter
  const filterByType = useCallback(
    (typeFilter: TypeFilter) => {
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams
      )
      if (typeFilter !== null) {
        params.set('typeFilter', typeFilter)
      } else {
        params.delete('typeFilter')
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname]
  )

  const categoryFilter = searchParams.get('categoryFilter') as CategoryFilter
  const filterByCategory = useCallback(
    (categoryFilter: CategoryFilter) => {
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams
      )
      if (categoryFilter !== null) {
        params.set('categoryFilter', categoryFilter)
      } else {
        params.delete('categoryFilter')
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname]
  )

  const filteredTechniquesByType = useMemo(() => {
    if (typeFilter === null) return techniques
    return techniques.filter((technique) => technique.type === typeFilter)
  }, [typeFilter, techniques])

  const filteredTechniques = useMemo(() => {
    if (categoryFilter === null) return filteredTechniquesByType
    return filteredTechniquesByType.filter(
      (technique) => technique.class === categoryFilter
    )
  }, [categoryFilter, filteredTechniquesByType])

  const sortCondition: SortCondition = useMemo(() => {
    const paramsSortBy = searchParams.get('sortBy')
    if (paramsSortBy === null) {
      return null
    }
    return {
      sortBy: paramsSortBy as SortBy,
      order: (searchParams.get('order') as SortOrder) || 'desc',
    }
  }, [searchParams])

  const setSortCondition = useCallback(
    (sortCondition: SortCondition) => {
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams
      )
      if (sortCondition === null) {
        params.delete('sortBy')
        params.delete('order')
      } else {
        params.set('sortBy', sortCondition.sortBy)
        params.set('order', sortCondition.order)
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname]
  )

  const toggleSortOrder = useCallback(
    (sortBy: SortBy) => {
      if (sortCondition === null || sortCondition.sortBy !== sortBy) {
        setSortCondition({ sortBy, order: 'desc' })
        return
      }
      const newOrder = sortCondition.order === 'asc' ? 'desc' : 'asc'
      setSortCondition({ ...sortCondition, order: newOrder })
    },
    [setSortCondition, sortCondition]
  )

  const sorted = useMemo(() => {
    return sortTequniqueList(filteredTechniques, sortCondition)
  }, [filteredTechniques, sortCondition])

  const resetFilterAndSort = useCallback(() => {
    const params = new URLSearchParams(
      searchParams as unknown as URLSearchParams
    )
    params.delete('typeFilter')
    params.delete('categoryFilter')
    params.delete('sortBy')
    params.delete('order')
    router.push(`${pathname}?${params.toString()}`)
  }, [pathname, router, searchParams])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button className="btn-primary btn-sm btn" onPress={resetFilterAndSort}>
          絞り込みと並び替えをリセット
        </Button>
      </div>
      <table className="relative w-full border-collapse overflow-x-scroll border border-primary">
        <thead className="sticky top-0 z-10">
          <tr>
            <Th>名前</Th>
            <Th>
              <div className="flex items-center justify-center gap-1">
                タイプ
                <Popover
                  placement="top"
                  trigger={
                    <TriggerButton aria-label="タイプを選択">
                      {typeFilter === null ? (
                        <FunnelIcon className="h-4 w-4" />
                      ) : (
                        <Image
                          src={temTypeImage(typeFilter)}
                          width={24}
                          height={24}
                          alt={typeFilter}
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
                              filterByType(type)
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
                          filterByType(null)
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
            <Th>
              <div className="flex items-center justify-center gap-1">
                分類
                <Popover
                  placement="top"
                  trigger={
                    <TriggerButton aria-label="分類を選択">
                      {categoryFilter === null ? (
                        <FunnelIcon className="h-4 w-4" />
                      ) : (
                        <Image
                          src={categoryIcon(categoryFilter)}
                          width={24}
                          height={24}
                          alt={categoryFilter}
                        />
                      )}
                    </TriggerButton>
                  }
                >
                  {({ close }) => (
                    <>
                      <div className="grid grid-cols-3 justify-center gap-2 p-2">
                        {CATEGORIES.map((category) => (
                          <button
                            key={category}
                            className="rounded-md hover:bg-zinc-300"
                            onClick={() => {
                              filterByCategory(category)
                              close()
                            }}
                            aria-label={`${category}で絞り込む`}
                          >
                            <Image
                              src={categoryIcon(category)}
                              width={32}
                              height={32}
                              alt={category}
                            />
                          </button>
                        ))}
                      </div>
                      <button
                        className="flex w-full cursor-pointer justify-center rounded-md text-center hover:bg-zinc-300"
                        onClick={() => {
                          filterByCategory(null)
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
            <Th>
              <button
                className="flex h-full items-center gap-1"
                aria-label="並び替え"
                onClick={() => toggleSortOrder('damage')}
              >
                {sortCondition?.sortBy === 'damage' ? (
                  sortCondition.order === 'desc' ? (
                    <ArrowDownIcon className="h-4 w-4" />
                  ) : (
                    <ArrowUpIcon className="h-4 w-4" />
                  )
                ) : (
                  <ArrowsUpDownIcon className="h-4 w-4" />
                )}
                ダメージ
              </button>
            </Th>
            <Th>スタミナコスト</Th>
            <Th>ホールド</Th>
            <Th>優先度</Th>
            <Th>ターゲット</Th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((technique) => {
            const {
              nameJa,
              class: category,
              type,
              damage,
              staminaCost,
              hold,
              priority,
              targets,
              key,
            } = technique
            return (
              <tr key={key}>
                <Td>
                  <Link href={`/techniques/${key}`} className="link">
                    {nameJa}
                  </Link>
                </Td>
                <Td>
                  <Image
                    alt={type}
                    src={temTypeImage(type)}
                    className={imageFitClassName}
                    fill
                  />
                </Td>
                <Td>
                  <Image
                    alt={category}
                    src={categoryIcon(category)}
                    className={imageFitClassName}
                    fill
                  />
                </Td>
                <Td>{damage}</Td>
                <Td>{staminaCost}</Td>
                <Td>{hold}</Td>
                <Td>
                  <Image
                    alt={priority}
                    src={priorityIcon(priority)}
                    className={imageFitClassName}
                    fill
                  />
                </Td>
                <Td> {targetsJaMap[targets]}</Td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
