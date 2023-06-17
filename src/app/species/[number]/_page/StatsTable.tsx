import { twMerge } from 'tailwind-merge'

import type { BaseStats } from '@/models/Temtem/Species'
import {
  calculateHP,
  calculateOthers,
  calculateStamina,
} from '@/models/Temtem/Stats'

import type { ComponentProps, FC, PropsWithChildren } from 'react'

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

const Th: FC<ComponentProps<'th'>> = ({ className, ...props }) => (
  <th
    className={twMerge('w-fit border border-primary px-4 py-1', className)}
    {...props}
  />
)

const Td: FC<ComponentProps<'td'>> = ({ className, ...props }) => (
  <td
    className={twMerge('border border-primary px-4 py-1', className)}
    {...props}
  />
)

export const StatsTable: FC<{ baseStats: BaseStats }> = ({ baseStats }) => {
  return (
    <table className="w-full border-collapse border border-primary">
      <thead>
        <tr>
          <Th colSpan={2}>種族値</Th>
          <Th>実数値</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Th className="w-[1px] whitespace-nowrap">HP</Th>
          <Td>
            <StatsBar stat={baseStats.hp} />
          </Td>
          <Td className="w-[1px] whitespace-nowrap">
            <div className="flex gap-1">
              {calculateHP(baseStats.hp, { sv: 0, tv: 0 })} <span>-</span>
              {calculateHP(baseStats.hp, { sv: 50, tv: 0 })} <span>-</span>
              {calculateHP(baseStats.hp, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>STA</Th>
          <Td>
            <StatsBar stat={baseStats.sta} />
          </Td>
          <Td>
            {calculateStamina(baseStats.sta, { sv: 0, tv: 0 })} -
            {calculateOthers(baseStats.sta, { sv: 50, tv: 0 })} -
            {calculateOthers(baseStats.sta, { sv: 50, tv: 500 })}
          </Td>
        </tr>
        <tr>
          <Th>SPD</Th>
          <Td>
            <StatsBar stat={baseStats.spd} />
          </Td>
          <Td>
            <div className="flex gap-1">
              {calculateOthers(baseStats.spd, { sv: 0, tv: 0 })} <span>-</span>
              {calculateOthers(baseStats.spd, { sv: 50, tv: 0 })} <span>-</span>
              {calculateOthers(baseStats.spd, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>ATK</Th>
          <Td>
            <StatsBar stat={baseStats.atk} />
          </Td>
          <Td>
            <div className="flex gap-1">
              {calculateOthers(baseStats.atk, { sv: 0, tv: 0 })} <span>-</span>
              {calculateOthers(baseStats.atk, { sv: 50, tv: 0 })} <span>-</span>
              {calculateOthers(baseStats.atk, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>DEF</Th>
          <Td>
            <StatsBar stat={baseStats.def} />
          </Td>
          <Td>
            <div className="flex gap-1">
              {calculateOthers(baseStats.def, { sv: 0, tv: 0 })}
              <span>-</span>
              {calculateOthers(baseStats.def, { sv: 50, tv: 0 })} <span>-</span>
              {calculateOthers(baseStats.def, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>SPATK</Th>
          <Td>
            <StatsBar stat={baseStats.spatk} />
          </Td>
          <Td>
            <div className="flex gap-1">
              {calculateOthers(baseStats.spatk, { sv: 0, tv: 0 })}{' '}
              <span>-</span>
              {calculateOthers(baseStats.spatk, { sv: 50, tv: 0 })}{' '}
              <span>-</span>
              {calculateOthers(baseStats.spatk, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>SPDEF</Th>
          <Td>
            <StatsBar stat={baseStats.spdef} />
          </Td>
          <Td>
            <div className="flex gap-1">
              {calculateOthers(baseStats.spdef, { sv: 0, tv: 0 })}{' '}
              <span>-</span>
              {calculateOthers(baseStats.spdef, { sv: 50, tv: 0 })}{' '}
              <span>-</span>
              {calculateOthers(baseStats.spdef, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
      </tbody>
    </table>
  )
}
