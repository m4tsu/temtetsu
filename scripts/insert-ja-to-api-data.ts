/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'

import gearsJa from '../src/data/ja-dict/gears.json'
import speciesJa from '../src/data/ja-dict/species.json'
import techniquesJa from '../src/data/ja-dict/techniques.json'
import traitsJa from '../src/data/ja-dict/traits.json'
import gearsData from '../src/data/tem-api/gears.json'
import speciesData from '../src/data/tem-api/species.json'
import techniquesData from '../src/data/tem-api/techniques.json'
import traitsData from '../src/data/tem-api/traits.json'
import { convertToUrlableString } from '../src/utils/convertToUrlableString'

const outputDirPath = 'src/data/temtem'

// 日本語辞書データを Tem-Api データとマージする
const mergeJaDictToApiData = (
  apiDataList: any[],
  identifierName: string,
  jaDict: Record<string, any>,
  outputFileName: string
) => {
  const merged = apiDataList.map((data) => {
    const identifierValue = String(data[identifierName])
    console.log(identifierValue)
    const key = convertToUrlableString(identifierValue)
    const jaData = jaDict[key]
    if (!jaData) {
      console.log(`No ja data for ${data[identifierName]}`)
      return {...data, key}
    }
    return { ...data, ...jaData, key }
  })
  fs.writeFileSync(`${outputDirPath}/${outputFileName}`, JSON.stringify(merged))
}

;(async () => {
  console.log('start')
  mergeJaDictToApiData(gearsData, 'name', gearsJa, 'gears.json')
  mergeJaDictToApiData(traitsData, 'name', traitsJa, 'traits.json')
  mergeJaDictToApiData(speciesData, 'number', speciesJa, 'species.json')
  mergeJaDictToApiData(techniquesData, 'name', techniquesJa, 'techniques.json')
  console.log('done!!!!')
})()
