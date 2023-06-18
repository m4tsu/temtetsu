/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from 'googleapis'

export const SHEET_DATA = {
  name: {
    column: ['id', 'name', 'nameJp'],
    range: 'name!A2:C',
  },
  techniques: {
    column: [
      'key',
      'name',
      'type',
      'synagy',
      'class',
      'dmg',
      'sta',
      'hold',
      'priority',
      'target',
      'nameJp',
      'descriptionJp',
    ],
    range: 'techniques!A2:L20',
  },
  traits: {
    column: ['key', 'name', 'nameJp', 'descriptionJp'],
    range: 'traits!A2:D',
  },
  gears: {
    column: ['key', 'name', 'nameJp', 'descriptionJp'],
    range: 'gears!A2:D',
  },
} as const satisfies {
  [sheetName: string]: {
    column: readonly string[]
    range: string
  }
}

type SheetData = typeof SHEET_DATA

export type Row<
  T extends readonly string[],
  Arr extends string[] = []
> = T['length'] extends 0
  ? Arr
  : T extends readonly [string, ...infer Tail]
  ? Tail extends readonly string[]
    ? Row<Tail, [...Arr, string]>
    : never
  : never

export const fetchTemtemDictionarySheet = async <
  SheetName extends keyof typeof SHEET_DATA
>(
  auth: any,
  sheetName: SheetName
) => {
  type Column = SheetData[typeof sheetName]['column']
  try {
    const sheets = google.sheets({ version: 'v4', auth })
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1_GzZzC_QaYezH5Ie8rP0zrh1oSKwP_viyyBQOV3R0oc',
      range: SHEET_DATA[sheetName].range,
    })
    const rows = res.data.values as Row<Column>[] | null | undefined

    console.log(rows)
    if (!rows || rows.length === 0) {
      throw new Error('Data not found.')
    }
    return rows as unknown as Row<Column>[]
  } catch (e) {
    console.log('The Sheet API returned an error: ' + e)
    throw e
  }
}
