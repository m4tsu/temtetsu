export const TemTypes = [
  'Neutral',
  'Wind',
  'Earth',
  'Water',
  'Fire',
  'Nature',
  'Electric',
  'Mental',
  'Digital',
  'Melee',
  'Crystal',
  'Toxic',
] as const

export type TemType = (typeof TemTypes)[number]

export type TemTypeEffectiveNess = 0.5 | 1 | 2
export type TemTypeEffectivenessAgainstMultiple = 0.25 | 0.5 | 1 | 2 | 4

export const TemTypeCompatibilitiesMap: {
  [attack in TemType]: {
    [defense in TemType]?: 0.5 | 2 // 0.5 = ineffective, 2 = effective
  }
} = {
  Neutral: {
    Mental: 0.5,
  },
  Wind: {
    Wind: 0.5,
    Electric: 0.5,
    Toxic: 2,
  },
  Earth: {
    Wind: 0.5,
    Water: 0.5,
    Fire: 2,
    Nature: 0.5,
    Electric: 2,
    Crystal: 2,
  },
  Water: {
    Earth: 2,
    Water: 0.5,
    Fire: 2,
    Nature: 0.5,
    Digital: 2,
    Toxic: 0.5,
  },
  Fire: {
    Earth: 0.5,
    Water: 0.5,
    Fire: 0.5,
    Nature: 2,
    Crystal: 2,
  },
  Nature: {
    Earth: 2,
    Water: 2,
    Fire: 0.5,
    Nature: 0.5,
    Toxic: 0.5,
  },
  Electric: {
    Wind: 2,
    Earth: 0.5,
    Water: 2,
    Nature: 0.5,
    Electric: 0.5,
    Mental: 2,
    Digital: 2,
    Crystal: 0.5,
  },
  Mental: {
    Neutral: 2,
    Melee: 2,
    Crystal: 0.5,
  },
  Digital: {
    Mental: 2,
    Digital: 2,
    Melee: 2,
  },
  Melee: {
    Earth: 2,
    Mental: 0.5,
    Melee: 0.5,
    Crystal: 2,
  },
  Crystal: {
    Earth: 0.5,
    Fire: 0.5,
    Electric: 2,
    Mental: 2,
  },
  Toxic: {
    Earth: 0.5,
    Water: 2,
    Nature: 2,
    Digital: 0.5,
    Crystal: 0.5,
    Toxic: 0.5,
  },
}
