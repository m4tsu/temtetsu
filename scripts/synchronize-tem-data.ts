/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'

import { parse } from '@fast-csv/parse'

import { makeDictFromArray } from '../src/utils/dict'

import { fetchTemtemDictionaryShett } from './g-sheet/fetch-temtem-dictionary-sheet'

import type { authorize } from './g-sheet/authorize'
import type { Row, SHEET_DATA } from './g-sheet/fetch-temtem-dictionary-sheet'
import type { Gear } from '../src/models/Temtem/gear'
import type { Species } from '../src/models/Temtem/species'
import type { Technique } from '../src/models/Temtem/technique'
import type { Trait } from '../src/models/Temtem/trait'

type Auth = Awaited<ReturnType<typeof authorize>>

const synchronizeSpeaciesName = async (auth: Auth) => {
  const rows = await fetchTemtemDictionaryShett(auth, 'name')
  const species: Species[] = rows.map((row) => ({
    id: row[0],
    name: row[1],
    nameJp: row[2],
  }))
  const dict = makeDictFromArray(species, 'id')
  fs.writeFileSync('src/data/species.json', JSON.stringify(dict))
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
      const techniques: Technique[] = rows.map((row) => ({
        key: row[0],
        name: row[1],
        type: row[2],
        synagy: row[3],
        class: row[4],
        dmg: row[5],
        sta: row[6],
        hold: row[7],
        priority: row[8],
        target: row[9],
        nameJp: row[10],
        descriptionJp: row[11],
      }))
      const dict = makeDictFromArray(techniques, 'key')
      fs.writeFileSync('src/data/techniques.json', JSON.stringify(dict))
    })
}

const getTechniques = async (auth: Auth) => {
  const rows = await fetchTemtemDictionaryShett(auth, 'techniques')
  const techniques: Technique[] = rows.map((row) => ({
    key: row[0],
    name: row[1],
    type: row[2],
    synagy: row[3],
    class: row[4],
    dmg: row[5],
    sta: row[6],
    hold: row[7],
    priority: row[8],
    target: row[9],
    nameJp: row[10],
    descriptionJp: row[11],
  }))
  const dict = makeDictFromArray(techniques, 'key')
  fs.writeFileSync('src/data/techniques.json', JSON.stringify(dict))
}

const getGears = async (auth: Auth) => {
  const rows = await fetchTemtemDictionaryShett(auth, 'gears')
  const gears: Gear[] = rows.map((row) => ({
    key: row[0],
    name: row[1],
    nameJp: row[2],
    descriptionJp: row[3],
  }))
  const dict = makeDictFromArray(gears, 'key')
  fs.writeFileSync('src/data/gears.json', JSON.stringify(dict))
}

const getTraits = async (auth: Auth) => {
  const rows = await fetchTemtemDictionaryShett(auth, 'traits')
  const traits: Trait[] = rows.map((row) => ({
    key: row[0],
    name: row[1],
    nameJp: row[2],
    descriptionJp: row[3],
  }))
  const dict = makeDictFromArray(traits, 'key')
  fs.writeFileSync('src/data/traits.json', JSON.stringify(dict))
}

;(async () => {
  // const auth = await authorize()
  // synchronizeSpeaciesName(auth)
  // await getTechniques(auth)
  // await getGears(auth)
  // await getTraits(auth)
  await getTechniquesFromCsv()

  console.log('done!!!!')
})()
