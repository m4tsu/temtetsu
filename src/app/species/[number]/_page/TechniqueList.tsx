import Image from 'next/image'
import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

import type { TemTemTechnique } from '@/models/Temtem/Species'
import {
  categoryIcon,
  priorityIcon,
  type Technique,
} from '@/models/Temtem/Technique'
import { temTypeImage } from '@/models/Temtem/Type'

import type { ComponentProps, FC } from 'react'

const imageFitClassName = 'object-contain !relative !w-auto mx-auto max-h-8'

const Th: FC<ComponentProps<'th'>> = (props) => (
  <th
    className="text-bold w-fit  bg-primary px-4 py-1 text-center text-white"
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
      return <div>レベル: {technique.levels}</div>
    }
    case 'Breeding': {
      return <div>Breeding</div>
    }
    case 'TechniqueCourses': {
      return <div>TechniqueCourses</div>
    }
    default: {
      return <div></div>
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
            <Th>習得</Th>
            <Th>名前</Th>
            <Th>タイプ</Th>
            <Th>クラス</Th>
            <Th>ダメージ</Th>
            <Th>スタミナコスト</Th>
            <Th>ホールド</Th>
            <Th>優先度</Th>
          </tr>
        </thead>
        <tbody>
          {techniques.map((technique) => {
            const {
              name,
              nameJa,
              class: category,
              description,
              descriptionJa,
              type,
              damage,
              staminaCost,
              hold,
              priority,
            } = technique
            return (
              <Fragment key={name}>
                <tr>
                  <Td rowSpan={2}>
                    <TechniqueSource technique={technique} />
                  </Td>
                  <Td rowSpan={2}>{nameJa ?? name}</Td>
                  <Td>
                    <Image
                      alt={type}
                      src={temTypeImage(type)}
                      className={imageFitClassName}
                      // width={24}
                      // height={24}
                      fill

                      // style={{ objectFit: 'contain' }}
                    />
                  </Td>
                  <Td>
                    <Image
                      alt={category}
                      src={categoryIcon(category)}
                      className={imageFitClassName}
                      // width={24}
                      // height={24}
                      fill
                      // style={{ objectFit: 'contain' }}
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
                      // style={{ objectFit: 'contain' }}
                      // width={40}
                      // height={40}
                    />
                  </Td>
                </tr>
                <tr>
                  <Td colSpan={6} className="text-left">
                    {descriptionJa ?? description}
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
