import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold text-neutral">テムテム日本語情報一覧</h2>
      <div>
        <ul>
          <li>
            <Link href="/species" className="link-primary link ">
              テムテム図鑑
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
