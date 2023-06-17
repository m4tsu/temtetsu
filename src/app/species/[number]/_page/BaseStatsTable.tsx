import type { BaseStats } from '@/models/Temtem/Species'

import type { FC, PropsWithChildren } from 'react'

const StatsBar: FC<{ stat: number }> = ({ stat }) => {
  return (
    <div className="flex h-4 items-center gap-1 py-0.5">
      <div
        className="h-full bg-secondary"
        style={{ width: `${(stat / 150) * 100}%` }}
      />
      <div>{stat}</div>
    </div>
  )
}

const Th: FC<PropsWithChildren> = ({ children }) => (
  <th className="w-fit border border-primary px-4 py-1">{children}</th>
)

const Td: FC<PropsWithChildren> = ({ children }) => (
  <td className="border border-primary px-4 py-1">{children}</td>
)

export const BaseStatsTable: FC<{ baseStats: BaseStats }> = ({ baseStats }) => {
  return (
    <table className="w-full border-collapse border border-primary">
      <thead>
        <tr>
          <th className="w-[1px]"></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Th>HP</Th>
          <Td>
            <StatsBar stat={baseStats.hp} />
          </Td>
        </tr>
        <tr>
          <Th>STA</Th>
          <Td>
            <StatsBar stat={baseStats.sta} />
          </Td>
        </tr>
        <tr>
          <Th>SPD</Th>
          <Td>
            <StatsBar stat={baseStats.spd} />
          </Td>
        </tr>
        <tr>
          <Th>ATK</Th>
          <Td>
            <StatsBar stat={baseStats.atk} />
          </Td>
        </tr>
        <tr>
          <Th>DEF</Th>
          <Td>
            <StatsBar stat={baseStats.def} />
          </Td>
        </tr>
        <tr>
          <Th>SPATK</Th>
          <Td>
            <StatsBar stat={baseStats.spatk} />
          </Td>
        </tr>
        <tr>
          <Th>SPDEF</Th>
          <Td>
            <StatsBar stat={baseStats.spdef} />
          </Td>
        </tr>
      </tbody>
    </table>
  )
}
