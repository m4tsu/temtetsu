import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col">
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/species" className="link-hover text-xl font-bold">
            テムテム
          </Link>
        </li>
        <li>
          <Link href="/traits" className="link-hover text-xl font-bold">
            個性
          </Link>
        </li>
        <li>
          <Link href="/techniques" className="link-hover text-xl font-bold">
            技
          </Link>
        </li>
        <li>
          <Link href="/gears" className="link-hover text-xl font-bold">
            ギア
          </Link>
        </li>
      </ul>
    </div>
  )
}
