'use client'

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { Button, Tooltip, TooltipTrigger } from 'react-aria-components'

import type { FC } from 'react'

export const StatsTooptip: FC = () => {
  return (
    <TooltipTrigger delay={300}>
      <Button className="">
        <QuestionMarkCircleIcon className="text-gray h-5 w-5" />
      </Button>
      <Tooltip className="rounded-md border border-black bg-white p-2 text-sm">
        Lv. 100 かつ
        <ul>
          <li>SV:0 / TV:0</li>
          <li>SV:50 / TV:0</li>
          <li>SV:50 / TV:500</li>
        </ul>
        の場合のステータス実数値
      </Tooltip>
    </TooltipTrigger>
  )
}
