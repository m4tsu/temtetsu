'use client'

import { PageLayout } from '@/app/__components/PageLayout'

import { TvCalculator } from './_page/tv-calculator/TvCalculator'

const StatsToolsPage = () => {
  return (
    <PageLayout header="耐久TV配分計算機">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p>
            このツールは
            <span className="px-1 font-bold">
              「物理攻撃と特殊攻撃を全く同じ比率で受ける場合に最も耐久力が高くなるTVの配分」
            </span>
            を算出することができます。 ATK, SPATK, SPD, STA
            にTVを配分した後、残りのTVで最も効率よく耐久力を高めたいという場合に効果的です。
          </p>
          <p className="text-md">
            ※ この計算機では
            <span className="px-1 font-bold text-primary">
              総合耐久指数 (HP * DEF * SPDEF) / (DEF + SPDEF)
            </span>
            が最大になるような配分を算出しています。
            <span className="px-1 font-bold text-primary">総合耐久指数</span>
            という概念については
            <a
              href="http://firefly1987.blog.fc2.com/blog-entry-5.html"
              target="_blank"
              rel="noreferrer"
              className="link-primary link px-1"
            >
              こちらの記事
            </a>
            で解説されています。
          </p>
        </div>
      </div>
      <TvCalculator />
    </PageLayout>
  )
}

export default StatsToolsPage
