import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col">
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/species" className="link-hover text-xl font-bold">
            テムテム一覧
          </Link>
        </li>
        <li>
          <Link href="/traits" className="link-hover text-xl font-bold">
            個性一覧
          </Link>
        </li>
        <li>
          <Link href="/techniques" className="link-hover text-xl font-bold">
            技一覧
          </Link>
        </li>
        <li>
          <Link href="/gears" className="link-hover text-xl font-bold">
            ギア一覧
          </Link>
        </li>
      </ul>
    </div>
  )
}
