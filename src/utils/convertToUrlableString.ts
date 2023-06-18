/**
 * URIとして利用可能な文字列に変換する
 * @example "Hoge Fuga+piyo" => "Hoge_Fuga%2Bpiyo"
 */
export const convertToUrlableString = (str: string) => {
  return encodeURIComponent(str.replace(/ /g, '_'))
}
