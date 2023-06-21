/**
 * URIとして利用可能な文字列に変換する
 * @example "Hoge Fuga+piyo" => "Hoge_Fuga%2Bpiyo"
 */
export const convertToUrlableString = (str: string) => {
  return encodeURIComponent(str.replace(/ /g, '_'))
}

// encodeUriComponent だと single quote がエンコードされないので自前でやる
export const encodeSingleQuote = (str: string) => {
  return str.replace(/'/g, '%27')
}

export const decodeSingleQuote = (str: string) => {
  return str.replace(/%27/g, "'")
}
