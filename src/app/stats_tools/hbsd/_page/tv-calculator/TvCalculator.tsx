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
      <div className="flex flex-col gap-2">
        <p>
          このツールは
          <span className="px-1 font-bold">
            「物理攻撃と特殊攻撃を全く同じ比率で受ける場合に最も耐久力が高くなるようなTVの配分」
          </span>
          を算出することができます。 ATK, SPATK, SPD, STA
          等にTVを配分した後、残りのTVで最も効率よく耐久力を高めたいという場合に効果的です。
        </p>
        <p className="text-sm">
          この計算機では
          <span className="px-1 font-bold text-primary">
            総合耐久指数 (HP * DEF * SPDEF) / (DEF + SPDEF)
          </span>
          が最大になるような配分を算出しています。
          <span className="px-1 font-bold text-primary">総合耐久指数</span>
          については
          <a
            href="http://firefly1987.blog.fc2.com/blog-entry-5.html"
            target="_blank"
            rel="noreferrer"
            className="link-primary link px-1"
          >
            こちら
          </a>
          を参照してください。
        </p>
      </div>
      <div className="flex">
        <TemTemSelect selectedTem={selectedTem} onSelectTem={setSelectedTem} />
      </div>
      {selectedTem && <TvCalculatorTable species={selectedTem} />}
    </div>
  )
}
