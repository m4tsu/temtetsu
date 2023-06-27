import { Species, Stats } from "./Species";

const LEVEL = 100
export const calculateHP = (
  base: number,
  { sv = 50, tv }: { sv?: number; tv: number }
) => {
  const stats =
    ((1.5 * base + sv + tv / 5) * LEVEL) / 80 +
    (sv * base * LEVEL) / 20000 +
    LEVEL +
    15
  return Math.floor(stats)
}

export const calculateStamina = (
  base: number,
  { sv = 50, tv }: { sv?: number; tv: number }
) => {
  const stats =
    base / 4 +
    LEVEL ** 0.35 * 6 +
    (sv * LEVEL * base) / 20000 +
    (tv * LEVEL * base) / 30000
  return Math.floor(stats)
}

// type OthersStatusName = 'atk' | 'def' | 'spatk' | 'spdef'
export const calculateOthers = (
  baseStats: number,
  { sv = 50, tv }: { sv?: number; tv: number }
) => {
  const stats =
    ((1.5 * baseStats + sv + tv / 5) * LEVEL) / 100 +
    (sv * baseStats * LEVEL) / 25000 +
    10
  return Math.floor(stats)
}

/**
 * 総合耐久指数を計算する
 * (hp * def * spdef) / (def * spdef)
 */
export const calculateTotalDurabilityIndex = ({
  hp,
  def,
  spdef,
}: {
  hp: number
  def: number
  spdef: number
}) => {
  return (hp * def * spdef) / (def + spdef)
}

/** TVが0の時のstatsよりstatsが大きくなる最小のTVの値(HP) */
const getHpInterceptPointTv = (baseHp: number) => {
  const initial = calculateHP(baseHp, { tv: 0 })
  for (let tv = 1; tv <= MAX_TV; tv++) {
    const stats = calculateHP(baseHp, { tv })
    if (stats > initial) {
      return tv
    }
  }
  throw new Error('not found')
}

/** TVが0の時のstatsよりstatsが大きくなる最小のTVの値(ATK, DEF, SPATK, SPDEF) */
const getOthersInterceptPointTv = (
  baseStats: number,
) => {
  const initial = calculateOthers(baseStats, { tv: 0 })
  for (let tv = 1; tv <= MAX_TV; tv++) {
    const stats = calculateOthers(baseStats, { tv })
    if (stats > initial) {
      return tv
    }
  }
  throw new Error('not found')
}

/** 割り振ることができるTVの合計の最大値 */
export const MAX_TOTAL_TV = 1000
/** 各ステータスに割り振ることができるTVの最大値 */
export const MAX_TV = 500

const HP_INCREMENT_INTERVAL = 4
const DEF_INCREMENT_INTERVAL = 5
const SPDEF_INCREMENT_INTERVAL = 5

/**
 * 総合耐久指数が最も高くなるような TV 配分を計算する
 */
export const calculateMostDurableTv = (stats: Stats, tvSum: number) => {
  type Result = {
    tvDistribution: {
      hp: number
      def: number
      spdef: number
      /** 余り */
      remainder: number
    }
    durabilityIndex: number
  }

  let result: Result = {
    tvDistribution: {
      hp: 0,
      def: 0,
      spdef: 0,
      remainder: 0,
    },
    durabilityIndex: calculateTotalDurabilityIndex({
      hp: calculateHP(stats.hp, { tv: 0 }),
      def: calculateOthers(stats.def,  { tv: 0 }),
      spdef: calculateOthers(stats.spdef,  { tv: 0 }),
    }),
  }

  const hpInterceptPointTv = getHpInterceptPointTv(stats.hp)
  const defInterceptPointTv = getOthersInterceptPointTv(stats.def)
  const spdefInterceptPointTv = getOthersInterceptPointTv(stats.spdef)

  const maxTvOfEachStats = Math.min(tvSum, MAX_TV)

  for (
    let i = 0;
    (i === 0 ? 0 : hpInterceptPointTv + HP_INCREMENT_INTERVAL * (i - 1)) <=
    maxTvOfEachStats;
    i++
  ) {
    const hp =
      i === 0 ? 0 : hpInterceptPointTv + HP_INCREMENT_INTERVAL * (i - 1)
    for (
      let j = 0;
      (j === 0 ? 0 : defInterceptPointTv + DEF_INCREMENT_INTERVAL * (j - 1)) <=
      Math.min(MAX_TV, tvSum - hp);
      j++
    ) {
      const def =
        j === 0 ? 0 : defInterceptPointTv + DEF_INCREMENT_INTERVAL * (j - 1)
      const spdef = Math.min(MAX_TV, tvSum - hp - def)

      const statsHp = calculateHP(stats.hp, { tv: hp })
      const statsDef = calculateOthers(stats.def, { tv: def })
      const statsSpdef = calculateOthers(stats.spdef, {
        tv: spdef,
      })
      const durabilityIndex = calculateTotalDurabilityIndex({
        hp: statsHp,
        def: statsDef,
        spdef: statsSpdef,
      })

      if (durabilityIndex > result.durabilityIndex) {
        result = {
          tvDistribution: {
            hp,
            def,
            spdef,
            remainder: 0,
          },
          durabilityIndex,
        }
      }
    }
  }

  // spdef は hp, def を余らないように振った後全て振るので余剰がある可能性がある。その場合はそれが分かるようにする
  const spdefRemainder =
    result.tvDistribution.spdef >= spdefInterceptPointTv
      ? (result.tvDistribution.spdef - spdefInterceptPointTv) %
        SPDEF_INCREMENT_INTERVAL
      : result.tvDistribution.spdef
  if (spdefRemainder !== 0) {
    result = {
      ...result,
      tvDistribution: {
        ...result.tvDistribution,
        spdef: result.tvDistribution.spdef - spdefRemainder,
        remainder: spdefRemainder,
      },
    }
  }

  return result
}
