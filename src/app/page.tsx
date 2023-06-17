import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col">
      <div>
        <ul>
          <li>
            <Link href="/species" className="link-hover link-primary">
              テムテム一覧
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
