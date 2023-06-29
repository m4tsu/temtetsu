'use client'
import Image from 'next/image'
import { useState } from 'react'
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

const Cell: FC<PropsWithChildren> = ({ children }) => (
  <th className="border border-zinc-700 p-2">{children}</th>
)

type Props = {
  species: Species
}
export const TvCalculatorTable: FC<Props> = ({ species }) => {
  const [totalTv, setTotalTv] = useState(1000)
  const { stats: baseStats } = species
  const mostDurableTvResult = calculateMostDurableTv(baseStats, totalTv)

  const tv = mostDurableTvResult.tvDistribution

  const stats: Pick<Stats, 'hp' | 'def' | 'spdef'> = {
    hp: calculateHP(baseStats.hp, { tv: tv.hp }),
    def: calculateOthers(baseStats.def, { tv: tv.def }),
    spdef: calculateOthers(baseStats.spdef, {
      tv: tv.spdef,
    }),
  }

  return (
    <table className="w-full table-auto border-collapse border border-zinc-700">
      <thead>
        <tr>
          <Cell>
            <div className="flex flex-col items-center gap-1 text-xl font-bold">
              <Image
                height={48}
                width={48}
                src={iconImage(species)}
                alt={species.name}
              />
              {species.nameJa}
            </div>
          </Cell>
          <Cell>Base</Cell>
          <Cell>
            <div className="flex justify-center">
              <TextField
                className="flex items-center gap-2"
                type="number"
                minLength={0}
                maxLength={MAX_TOTAL_TV}
                value={String(totalTv)}
                onChange={(v) => setTotalTv(Number(v))}
              >
                <Label>合計 TV:</Label>
                <Input className="input-primary input input-sm rounded bg-white px-2 py-1" />
              </TextField>
            </div>
          </Cell>
          <Cell>Stats</Cell>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Cell>HP</Cell>
          <Cell>{species.stats.hp}</Cell>
          <Cell>{tv.hp}</Cell>
          <Cell>{stats.hp}</Cell>
        </tr>
        <tr>
          <Cell>DEF</Cell>
          <Cell>{species.stats.def}</Cell>
          <Cell>{tv.def}</Cell>
          <Cell>{stats.def}</Cell>
        </tr>
        <tr>
          <Cell>SPDEF</Cell>
          <Cell>{species.stats.spdef}</Cell>
          <Cell>{tv.spdef}</Cell>
          <Cell>{stats.spdef}</Cell>
        </tr>
        <tr>
          <Cell>
            <span className="italic tracking-widest ">
              (HP * DEF * SPDEF) / (DEF + SPDEF)
            </span>
          </Cell>
          <Cell>-</Cell>
          <Cell>{Math.floor(mostDurableTvResult.durabilityIndex)}</Cell>
          <Cell>-</Cell>
        </tr>
      </tbody>
    </table>
  )
}
