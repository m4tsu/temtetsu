'use client'

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import {
  Button,
  OverlayArrow,
  Tooltip,
  TooltipTrigger,
} from 'react-aria-components'

import type { FC } from 'react'

export const StatsTooptip: FC = () => {
  return (
    <TooltipTrigger>
      <Button className="">
        <QuestionMarkCircleIcon className="text-gray h-5 w-5" />
      </Button>
      <Tooltip className="border-primry border bg-white p-2 rounded-sm text-sm">
        {/* <OverlayArrow>
          <svg width={8} height={8}>
            <path d="M0 0,L4 4,L8 0" />
          </svg>
        </OverlayArrow> */}
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
