# Temtem's data used throughout the application

JSON created by merging "data/tem-api" and "data/ja-dict".

## データの手動補正

- tem-api/traits.json `Attack T` を `Attack<T>` に置換
- 全体から `Quetza-leño` を `Quetza-leno` に置換

これを行ってから `npm run insert-ja-to-api-data` する
