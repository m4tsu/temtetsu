import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

import type { TemTemTechnique } from '@/models/Temtem/Species'
import {
  categoryIcon,
  priorityIcon,
  targetsJaMap,
  type Technique,
} from '@/models/Temtem/Technique'
import { temTypeImage } from '@/models/Temtem/Type'

import type { ComponentProps, FC } from 'react'

const imageFitClassName = 'object-contain !relative !w-auto mx-auto max-h-8'

const Th: FC<ComponentProps<'th'>> = ({ className, ...props }) => (
  <th
    className={twMerge(
      'text-bold w-fit  bg-primary px-2 py-1 text-center text-white',
      className
    )}
    {...props}
  />
)

const Td: FC<ComponentProps<'td'>> = ({ className, ...props }) => (
  <td
    className={twMerge(
      'relative max-h-10 border border-primary px-2 py-1 text-center',
      className
    )}
    {...props}
  />
)

const TechniqueSource: FC<{ technique: TechniqueItem }> = ({ technique }) => {
  switch (technique.source) {
    case 'Levelling': {
      return `レベル: ${technique.levels}`
    }
    case 'Breeding': {
      return '遺伝'
    }
    case 'TechniqueCourses': {
      return 'コース'
    }
  }
}

type TechniqueItem = Technique & TemTemTechnique

type Props = {
  techniques: TechniqueItem[]
}
export const TechniqueList: FC<Props> = ({ techniques }) => {
  return (
    <div className="relative h-full ">
      <table className="relative h-full w-full border-collapse  border border-primary">
        <thead className="sticky top-0 z-10">
          <tr>
            {/* 8 col */}
            <Th className="w-[1px] whitespace-nowrap">習得</Th>
            <Th className="w-[1px] whitespace-nowrap">名前</Th>
            <Th>タイプ</Th>
            <Th>クラス</Th>
            <Th>ダメージ</Th>
            <Th>スタミナコスト</Th>
            <Th>ホールド</Th>
            <Th>優先度</Th>
            <Th>ターゲット</Th>
          </tr>
        </thead>
        <tbody>
          {techniques.map((technique) => {
            const {
              name,
              nameJa,
              class: category,
              descriptionJa,
              type,
              damage,
              staminaCost,
              hold,
              priority,
              targets,
              synergy,
              synergyEffects,
              key,
            } = technique
            return (
              <Fragment key={name}>
                <tr>
                  <Td rowSpan={2} className="w-[1px] whitespace-nowrap">
                    <TechniqueSource technique={technique} />
                  </Td>
                  <Td rowSpan={2} className="w-[1px] whitespace-nowrap">
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
                  <Td className="w-[1px] whitespace-nowrap">
                    {targetsJaMap[targets]}
                  </Td>
                </tr>
                <tr>
                  <Td colSpan={6} className="text-left">
                    {descriptionJa}。{' '}
                    {synergy !== 'None' ? (
                      <span className="inline-flex">
                        シナジー:{' '}
                        {
                          <Image
                            alt={synergy}
                            src={temTypeImage(synergy)}
                            width={20}
                            height={20}
                          />
                        }
                        。
                        {synergyEffects
                          .filter((effect) => effect.type === 'damage')
                          .map((effect, i) => (
                            <span key={i}>+{effect.damage}。</span>
                          ))}
                      </span>
                    ) : (
                      ''
                    )}
                  </Td>
                </tr>
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
