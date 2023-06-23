'use client'

import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { type ComponentProps, type FC, useCallback, useMemo } from 'react'
import { Button, Dialog, DialogTrigger, Popover } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import {
  categoryIcon,
  priorityIcon,
  targetsJaMap,
} from '@/models/Temtem/Technique'
import type { Technique } from '@/models/Temtem/Technique'
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

type FilterCondition = TemType | null

export const TechniquesTable: FC<Props> = ({ techniques }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  if (searchParams === null) throw new Error('searchParams is null')

  const filterCondition = searchParams.get('filter') as FilterCondition
  const filter = useCallback(
    (filterCondition: FilterCondition) => {
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams
      )
      if (filterCondition !== null) {
        params.set('filter', filterCondition)
      } else {
        params.delete('filter')
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname]
  )

  const filteredTechniques = useMemo(() => {
    if (filterCondition === null) return techniques
    return techniques.filter((technique) => technique.type === filterCondition)
  }, [filterCondition, techniques])

  return (
    <div className="flex ">
      <table className="relative w-full border-collapse overflow-x-scroll border border-primary">
        <thead className="sticky top-0 z-10">
          <tr>
            <Th>名前</Th>
            <Th>
              <div className="flex items-center justify-center gap-1">
                タイプ
                <DialogTrigger>
                  <Button aria-label="タイプを選択">
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
                  </Button>
                  <Popover
                    placement="top"
                    className="rounded-md border border-zinc-500 bg-white shadow-lg"
                    isNonModal
                    offset={12}
                  >
                    <Dialog className="flex flex-col gap-2 p-2">
                      {({ close }) => (
                        <>
                          <div className="grid grid-cols-4 justify-center gap-2">
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
                    </Dialog>
                  </Popover>
                </DialogTrigger>
              </div>
            </Th>
            <Th>分類</Th>
            <Th>ダメージ</Th>
            <Th>スタミナコスト</Th>
            <Th>ホールド</Th>
            <Th>優先度</Th>
            <Th>ターゲット</Th>
          </tr>
        </thead>
        <tbody>
          {filteredTechniques.map((technique) => {
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
