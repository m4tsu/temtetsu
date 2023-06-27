const TermsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">利用規約</h1>
      <div>
        <h2 className="py-2 text-xl font-bold">免責事項</h2>
        <p>
          本サイトは個人が運営する
          <a
            href="https://crema.gg/games/temtem/"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Temtem
          </a>
          のファンサイトであり、 開発元であるCREMA社等とは一切関係ありません。
        </p>
        <p>
          本サイトの情報は基本的に
          <a
            href="https://temtem.wiki.gg/wiki/Temtem_Wiki"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Official Temtem Wiki
          </a>
          から収集した情報を掲載していますが、必ずしもその正確性を保証するものではありません。
        </p>
        <p>
          本サイトに掲載しているデータや画像等、 Temtem
          に関する権利の全てはCREMA社に属します。
        </p>
      </div>
    </div>
  )
}

export default TermsPage
