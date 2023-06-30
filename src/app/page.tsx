import Link from 'next/link'

import { Divider } from '@/components/Divider'

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">データベース</h2>
        <Divider className="border-primary" />
        <ul className="flex flex-col">
          <li className="p-1">
            <Link href="/species" className="link text-xl font-bold">
              テムテム
            </Link>
          </li>
          <li className="p-1">
            <Link href="/traits" className="link text-xl font-bold ">
              個性
            </Link>
          </li>
          <li className="p-1">
            <Link href="/techniques" className="link text-xl font-bold">
              ワザ
            </Link>
          </li>
          <li className="p-1">
            <Link href="/gears" className="link text-xl font-bold ">
              ギア
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">ツール</h2>
        <Divider className="border-primary" />
        <ul className="flex flex-col">
          <li className="p-1">
            <Link href="/stats_tools/hbsd" className="link text-xl font-bold">
              耐久TV配分計算機
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
