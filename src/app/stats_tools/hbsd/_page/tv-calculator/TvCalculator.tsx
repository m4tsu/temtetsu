'use client'
import { useState } from 'react'

import { TemTemSelect } from '@/features/temtem-uitls/TemTemSelect'
import type { Species } from '@/models/Temtem/Species'

import { TvCalculatorTable } from './TvCalculatorTable'

import type { FC } from 'react'

export const TvCalculator: FC = () => {
  const [selectedTem, setSelectedTem] = useState<Species | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <TemTemSelect selectedTem={selectedTem} onSelectTem={setSelectedTem} />
      </div>

      {selectedTem && <TvCalculatorTable species={selectedTem} />}
    </div>
  )
}
