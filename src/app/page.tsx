import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col">
      <div>
        <ul>
          <li>
            <Link href="/species" className="link-hover text-xl font-bold">
              テムテム一覧
            </Link>
          </li>
          <li>
            <Link href="/traits" className="link-hover text-xl font-bold">
              特性一覧
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
