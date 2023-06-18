import type { Gear } from '@/models/Temtem/Gear'
import { makeDictFromArray } from '@/utils/dict'

import gearsJson from './gears.json'

export const gears: Gear[] = gearsJson

export const normalizedGears = makeDictFromArray(gears, 'key')
