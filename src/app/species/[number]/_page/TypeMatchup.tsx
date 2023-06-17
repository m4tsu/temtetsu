import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import type { Species } from '@/models/Temtem/Species'
import type { TemTypeEffectivenessAgainstMultiple } from '@/models/Temtem/Type'
import {
  TemTypes,
  calculateEffectiveness,
  temTypeImage,
} from '@/models/Temtem/Type'

import type { ComponentProps, FC } from 'react'

const Th: FC<ComponentProps<'th'>> = ({ children }) => (
  <th className="w-fit border border-primary px-2 py-1">{children}</th>
)

const Td: FC<ComponentProps<'td'>> = ({ className, ...props }) => (
  <td
    className={twMerge(
      'border border-primary py-1 text-center text-lg font-bold',
      className
    )}
    {...props}
  />
)

const EffectivenessCell: FC<{
  effectiveness: TemTypeEffectivenessAgainstMultiple
}> = ({ effectiveness }) => {
  if (effectiveness === 1) {
    return <Td>-</Td>
  } else {
    const colorClassName =
      effectiveness === 0.25
        ? 'bg-red-500 text-white'
        : effectiveness === 0.5
        ? 'bg-yellow-500 text-white'
        : effectiveness === 2
        ? 'bg-green-600 text-white'
        : 'bg-green-400 text-white'
    return <Td className={colorClassName}>{effectiveness}x</Td>
  }
}

type Props = {
  species: Species
}
export const TypeMatchupTable: FC<Props> = ({ species }) => {
  return (
    <table className="w-full border-collapse border border-primary table-fixed">
      <thead>
        <tr>
          {TemTypes.map((type) => (
            <Th key={type}>
              <Image
                src={temTypeImage(type)}
                alt={type}
                width={32}
                height={32}
                className="mx-auto"
              />
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {TemTypes.map((type) => (
            <EffectivenessCell
              key={type}
              effectiveness={calculateEffectiveness(type, species.types)}
            />
          ))}
        </tr>
      </tbody>
    </table>
  )
}
