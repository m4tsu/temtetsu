import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { PageLayout } from '@/app/__components/PageLayout'
import { species } from '@/data/temtem/species'
import { techniques, techniquesByKey } from '@/data/temtem/techniques'
import type { PageProps } from '@/libs/nextjs/util-types'
import { iconImage } from '@/models/Temtem/Species'
import {
  categoryIcon,
  priorityIcon,
  targetsJaMap,
} from '@/models/Temtem/Technique'
import { temTypeImage } from '@/models/Temtem/Type'
import { findItem } from '@/utils/dict'

import styles from './page.module.css'

import type { FC, ComponentProps } from 'react'

export function generateStaticParams() {
  return techniques.map((technique) => ({
    key: decodeURIComponent(technique.key),
  }))
}

const imageFitClassName = 'object-contain !relative !w-auto mx-auto max-h-8'

const Th: FC<ComponentProps<'th'>> = ({ className, ...props }) => (
  <th
    className={twMerge(
      'bg-primary p-2 text-center font-bold text-white',
      className
    )}
    {...props}
  />
)

const Td: FC<ComponentProps<'td'>> = ({ className, ...props }) => (
  <td
    className={twMerge(
      'relative  border border-primary p-2 text-center',
      className
    )}
    {...props}
  />
)

const TechniquePage = ({ params: { key } }: PageProps<'key'>) => {
  const technique = findItem(techniquesByKey, key)
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
    wikiUrl,
  } = technique

  const speciesList = species.filter((species) => {
    return species.techniques.some((technique) => technique.name === name)
  })

  return (
    <PageLayout
      header={
        <>
          {nameJa}
          <a
            href={wikiUrl}
            target="_blank"
            rel="noreferrer"
            className="link text-sm"
          >
            (公式wiki)
          </a>
        </>
      }
      breadcrumbItems={[
        { path: '/techniques', label: '技' },
        {
          label: technique.nameJa,
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <table className="relative h-full w-full border-collapse border border-primary">
          <thead>
            <tr>
              {/* 6 col */}
              <Th>タイプ</Th>
              <Th>分類</Th>
              <Th>ダメージ</Th>
              <Th>スタミナコスト</Th>
              <Th>ホールド</Th>
              <Th>優先度</Th>
              <Th>ターゲット</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
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
          </tbody>
        </table>
        <div className="flex flex-col gap-4">
          <h3 className="border-b border-primary text-2xl font-bold">説明</h3>
          <div>
            <p>{descriptionJa} </p>

            {synergy !== 'None' && (
              <p className="inline-flex">
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
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="border-b border-primary text-2xl font-bold">
            この技を使えるテムテム
          </h3>
          <ul className={styles.speciesList}>
            {speciesList.map((species) => (
              <li key={species.name} className="flex items-center gap-4">
                <Image
                  src={iconImage(species)}
                  width={48}
                  height={48}
                  alt={species.nameJa}
                  className="rounded-sm bg-zinc-700"
                />
                <Link href={`/species/${species.number}`} className="link">
                  {species.nameJa}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}

export default TechniquePage
