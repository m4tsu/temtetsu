'use client'
import Image from 'next/image'
import { useId, useState } from 'react'
import { Input, Label, TextField } from 'react-aria-components'

import type { Species, Stats } from '@/models/Temtem/Species'
import { iconImage } from '@/models/Temtem/Species'
import {
  calculateMostDurableTv,
  calculateHP,
  calculateOthers,
  MAX_TOTAL_TV,
} from '@/models/Temtem/Stats'

import type { FC, PropsWithChildren } from 'react'

const Th: FC<PropsWithChildren> = ({ children }) => (
  <th className="border border-zinc-700 p-2">{children}</th>
)

const Td: FC<PropsWithChildren> = ({ children }) => (
  <td className="border border-zinc-700 p-2 text-center">{children}</td>
)

type Props = {
  species: Species
}
export const TvCalculatorTable: FC<Props> = ({ species }) => {
  const [totalTv, setTotalTv] = useState(1000)
  const { stats: baseStats } = species
  const mostDurableTvResult = calculateMostDurableTv(baseStats, totalTv)
  const tvInputId = useId()

  const tv = mostDurableTvResult.tvDistribution

  const stats: Pick<Stats, 'hp' | 'def' | 'spdef'> = {
    hp: calculateHP(baseStats.hp, { tv: tv.hp }),
    def: calculateOthers(baseStats.def, { tv: tv.def }),
    spdef: calculateOthers(baseStats.spdef, {
      tv: tv.spdef,
    }),
  }

  return (
    <div className="flex flex-col gap-4">
      <table className="w-full table-auto border-collapse border border-zinc-700">
        <thead>
          <tr>
            <Th>
              <div className="flex flex-col items-center gap-1 text-lg font-bold">
                <Image
                  height={48}
                  width={48}
                  src={iconImage(species)}
                  alt={species.name}
                  className="rounded-md bg-zinc-700"
                />
                {species.nameJa}
              </div>
            </Th>
            <Th>Base</Th>
            <Th>
              <div className="flex justify-center">
                <TextField
                  className="flex flex-col items-center gap-1"
                  type="number"
                  minLength={0}
                  maxLength={MAX_TOTAL_TV}
                  value={String(totalTv)}
                  onChange={(v) => setTotalTv(Number(v))}
                >
                  <Label htmlFor={tvInputId}>TV</Label>
                  <div>
                    合計:{' '}
                    <Input
                      id={tvInputId}
                      className="input-primary input input-sm rounded bg-white px-2 py-1"
                    />
                  </div>
                </TextField>
              </div>
            </Th>
            <Th>Stats</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Th>HP</Th>
            <Td>{species.stats.hp}</Td>
            <Td>{tv.hp}</Td>
            <Td>{stats.hp}</Td>
          </tr>
          <tr>
            <Th>DEF</Th>
            <Td>{species.stats.def}</Td>
            <Td>{tv.def}</Td>
            <Td>{stats.def}</Td>
          </tr>
          <tr>
            <Th>SPDEF</Th>
            <Td>{species.stats.spdef}</Td>
            <Td>{tv.spdef}</Td>
            <Td>{stats.spdef}</Td>
          </tr>
          <tr>
            <Th>余り</Th>
            <Td>-</Td>
            <Td>{mostDurableTvResult.tvDistribution.remainder}</Td>
            <Td>-</Td>
          </tr>
        </tbody>
      </table>
      <p className="text-center text-xl font-bold">
        総合耐久指数: {Math.floor(mostDurableTvResult.durabilityIndex)}
      </p>
    </div>
  )
}
