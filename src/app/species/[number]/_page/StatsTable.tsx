import { twMerge } from 'tailwind-merge'

import type { BaseStats } from '@/models/Temtem/Species'
import {
  calculateHP,
  calculateOthers,
  calculateStamina,
} from '@/models/Temtem/Stats'

import { StatsTooptip } from './StatsTooltip'

import type { ComponentProps, FC } from 'react'

const StatsBar: FC<{ stat: number; denominator?: number }> = ({
  stat,
  denominator = 150,
}) => {
  return (
    <div className="flex h-4 items-center gap-1 py-0.5">
      <div
        className="h-full bg-secondary"
        style={{ width: `${(stat / denominator) * 100}%` }}
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
  const { hp, spatk, spd, spdef, sta, atk, def } = baseStats
  return (
    <table className="w-full border-collapse border border-primary">
      <thead>
        <tr>
          <Th colSpan={2}>種族値</Th>
          <Th>
            <div className="flex items-center justify-center gap-1">
              実数値
              <StatsTooptip />
            </div>
          </Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Th className="w-[1px] whitespace-nowrap">HP</Th>
          <Td>
            <StatsBar stat={hp} />
          </Td>
          <Td className="w-[1px] whitespace-nowrap">
            <div className="flex gap-1 justify-center">
              {calculateHP(hp, { sv: 0, tv: 0 })} <span>-</span>
              {calculateHP(hp, { sv: 50, tv: 0 })} <span>-</span>
              {calculateHP(hp, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>STA</Th>
          <Td>
            <StatsBar stat={sta} />
          </Td>
          <Td>
          <div className="flex gap-1 justify-center">
            {calculateStamina(sta, { sv: 0, tv: 0 })} <span>-</span>
            {calculateStamina(sta, { sv: 50, tv: 0 })} <span>-</span>
            {calculateStamina(sta, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>SPD</Th>
          <Td>
            <StatsBar stat={spd} />
          </Td>
          <Td>
            <div className="flex gap-1 justify-center">
              {calculateOthers(spd, { sv: 0, tv: 0 })} <span>-</span>
              {calculateOthers(spd, { sv: 50, tv: 0 })} <span>-</span>
              {calculateOthers(spd, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>ATK</Th>
          <Td>
            <StatsBar stat={atk} />
          </Td>
          <Td>
            <div className="flex gap-1 justify-center">
              {calculateOthers(atk, { sv: 0, tv: 0 })} <span>-</span>
              {calculateOthers(atk, { sv: 50, tv: 0 })} <span>-</span>
              {calculateOthers(atk, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>DEF</Th>
          <Td>
            <StatsBar stat={def} />
          </Td>
          <Td>
            <div className="flex gap-1 justify-center">
              {calculateOthers(def, { sv: 0, tv: 0 })}
              <span>-</span>
              {calculateOthers(def, { sv: 50, tv: 0 })} <span>-</span>
              {calculateOthers(def, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>SPATK</Th>
          <Td>
            <StatsBar stat={spatk} />
          </Td>
          <Td>
            <div className="flex gap-1 justify-center">
              {calculateOthers(spatk, { sv: 0, tv: 0 })} <span>-</span>
              {calculateOthers(spatk, { sv: 50, tv: 0 })} <span>-</span>
              {calculateOthers(spatk, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>SPDEF</Th>
          <Td>
            <StatsBar stat={spdef} />
          </Td>
          <Td>
            <div className="flex gap-1 justify-center">
              {calculateOthers(spdef, { sv: 0, tv: 0 })} <span>-</span>
              {calculateOthers(spdef, { sv: 50, tv: 0 })} <span>-</span>
              {calculateOthers(spdef, { sv: 50, tv: 500 })}
            </div>
          </Td>
        </tr>
        <tr>
          <Th>合計</Th>
          <Td>
            <StatsBar
              stat={hp + sta + spd + atk + def + spatk + spdef}
              denominator={150 * 7}
            />
          </Td>
          <Td></Td>
        </tr>
      </tbody>
    </table>
  )
}
