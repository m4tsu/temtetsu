/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'

import { parse } from '@fast-csv/parse'

import { makeDictFromArray } from '../src/utils/dict'

import { authorize } from './g-sheet/authorize'
import { fetchTemtemDictionarySheet } from './g-sheet/fetch-temtem-dictionary-sheet'

import type { Row, SHEET_DATA } from './g-sheet/fetch-temtem-dictionary-sheet'
import type { Gear } from '../src/models/Temtem/Gear'
import type { Species } from '../src/models/Temtem/Species'
import type { Technique } from '../src/models/Temtem/Technique'
import type { Trait } from '../src/models/Temtem/Trait'
import { convertToUrlableString } from '../src/utils/convertToUrlableString'

const dataDirPath = 'src/data/ja-dict'

type Auth = Awaited<ReturnType<typeof authorize>>

const synchronizeSpeaciesName = async (auth: Auth) => {
  const rows = await fetchTemtemDictionarySheet(auth, 'name')
  const species: { number: string; nameJa: string }[] = rows.map((row) => ({
    number: row[0],
    // name: row[1],
    nameJa: row[2],
  }))
  const dict = makeDictFromArray(species, 'number')
  fs.writeFileSync(`${dataDirPath}/species.json`, JSON.stringify(dict))
}

const getTechniquesFromCsv = async () => {
  type Column = (typeof SHEET_DATA)['techniques']['column']
  type TechniqueRow = Row<Column>
  const rows: TechniqueRow[] = []
  let isHeader = true
  fs.createReadStream('scripts/g-sheet/csv/techniques.csv')
    .pipe(parse())
    .on('data', (row: TechniqueRow) => {
      if (isHeader) {
        isHeader = false
      } else {
        rows.push(row)
      }
    })
    .on('error', (error) => console.error(error))
    .on('end', () => {
      console.log(`Parsed ${rows.length} rows`)
      const techniques: {
        key: string // name の space を _ に変換したもの
        name: string
        nameJa: string
        descriptionJa: string
      }[] = rows.map((row) => ({
        key: convertToUrlableString(row[1]),
        name: row[1],
        nameJa: row[10],
        descriptionJa: row[11],
      }))
      const dict = makeDictFromArray(techniques, 'key')
      fs.writeFileSync(`${dataDirPath}/techniques.json`, JSON.stringify(dict))
    })
}

// const getTechniques = async (auth: Auth) => {
//   const rows = await fetchTemtemDictionaryShett(auth, 'techniques')
//   const techniques: Technique[] = rows.map((row) => ({
//     key: row[0],
//     name: row[1],
//     type: row[2],
//     synagy: row[3],
//     class: row[4],
//     dmg: row[5],
//     sta: row[6],
//     hold: row[7],
//     priority: row[8],
//     target: row[9],
//     nameJp: row[10],
//     descriptionJp: row[11],
//   }))
//   const dict = makeDictFromArray(techniques, 'key')
//   fs.writeFileSync('src/data/techniques.json', JSON.stringify(dict))
// }

const getGears = async (auth: Auth) => {
  const rows = await fetchTemtemDictionarySheet(auth, 'gears')
  const gears: { key: string, name: string; nameJa: string; descriptionJa: string }[] =
    rows.map((row) => ({
      key: convertToUrlableString(row[1]),
      name: row[1],
      nameJa: row[2],
      descriptionJa: row[3],
    }))
  const dict = makeDictFromArray(gears, 'key')
  fs.writeFileSync(`${dataDirPath}/gears.json`, JSON.stringify(dict))
}

const getTraits = async (auth: Auth) => {
  const rows = await fetchTemtemDictionarySheet(auth, 'traits')
  const traits: {key: string, name: string; nameJa: string; descriptionJa: string }[] =
    rows.map((row) => ({
      key: convertToUrlableString(row[1]),
      name: row[1],
      nameJa: row[2],
      descriptionJa: row[3],
    }))
  const dict = makeDictFromArray(traits, 'key')
  fs.writeFileSync(`${dataDirPath}/traits.json`, JSON.stringify(dict))
}

// スプレッドシート、CSVから日本語辞書データを作成
;(async () => {
  const auth = await authorize()
  // await synchronizeSpeaciesName(auth)
  // await getTechniques(auth)
  // await getGears(auth)
  // await getTraits(auth)
  await getTechniquesFromCsv()

  console.log('done!!!!')
})()
