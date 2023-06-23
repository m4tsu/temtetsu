import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

import type { StatsName, Species } from '@/models/Temtem/Species'
import type { TemType } from '@/models/Temtem/Type'
import { katakanaToHiragana } from '@/utils/kana'

type FilterCondition = TemType | null
export type SortBy = StatsName | 'number'
type SortOrder = 'asc' | 'desc'
type SortCondition = {
  sortBy: SortBy
  order: SortOrder
}

const sortSpeciesList = (
  speciesList: SpeciesListItem[],
  sortCondition: SortCondition
) => {
  const { sortBy, order } = sortCondition
  if (sortBy === 'number') {
    return speciesList.sort((a, b) => {
      const reuslt = Number(a.number) - Number(b.number)
      return order === 'asc' ? reuslt : -reuslt
    })
  }
  return speciesList.sort((a, b) => {
    const result = a.stats[sortBy] - b.stats[sortBy]
    return order === 'asc' ? result : -result
  })
}

const speciesNamefilter = (
  { nameJa, name }: SpeciesListItem,
  searchText: string
) => {
  if (nameJa.includes(searchText)) return true
  if (katakanaToHiragana(nameJa).includes(searchText)) return true
  if (name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
    return true
  return false
}

const filterEvolved = (speciesList: SpeciesListItem[]) => {
  return speciesList.filter(
    (species) => species.evolution.evolves === false || !species.evolution.to
  )
}

export type SpeciesListItem = Pick<
  Species,
  'number' | 'nameJa' | 'name' | 'icon' | 'types' | 'stats' | 'evolution'
>
export const useTemtemList = (allSpeciesList: SpeciesListItem[]) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  if (searchParams === null) throw new Error('searchParams is null')

  const filterCondition = searchParams.get('filter') as FilterCondition
  const setFilterCondition = useCallback(
    (filterCondition: FilterCondition) => {
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams
      )
      if (filterCondition !== null) {
        params.set('filter', filterCondition)
      } else {
        params.delete('filter')
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname]
  )

  const sortCondition: SortCondition = useMemo(() => {
    const paramsSortBy = searchParams.get('sortBy')
    if (paramsSortBy === null) {
      return {
        sortBy: 'number',
        order: 'asc',
      }
    }
    return {
      sortBy: paramsSortBy as SortBy,
      order: (searchParams.get('order') as SortOrder) || 'desc',
    }
  }, [searchParams])

  const setSortCondition = useCallback(
    (sortCondition: SortCondition) => {
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams
      )
      params.set('sortBy', sortCondition.sortBy)
      params.set('order', sortCondition.order)
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname]
  )

  const isFullyEvolvedOnly = searchParams.get('fullyEvolvedOnly') === 'true'
  const toggleIsFullyEvolvedOnly = useCallback(() => {
    const params = new URLSearchParams(
      searchParams as unknown as URLSearchParams
    )
    params.set('fullyEvolvedOnly', String(!isFullyEvolvedOnly))
    router.push(`${pathname}?${params.toString()}`)
  }, [searchParams, isFullyEvolvedOnly, router, pathname])

  const [searchText, setSearchText] = useState('')

  const filter = useCallback(
    (filterCondition: FilterCondition) => {
      setFilterCondition(filterCondition)
    },
    [setFilterCondition]
  )

  const sort = useCallback(
    (condition: SortCondition) => {
      setSortCondition(condition)
    },
    [setSortCondition]
  )

  const toggleSortOrder = useCallback(() => {
    const newOrder = sortCondition.order === 'asc' ? 'desc' : 'asc'
    setSortCondition({ ...sortCondition, order: newOrder })
  }, [setSortCondition, sortCondition])

  const filteredByEvolved = useMemo(() => {
    return isFullyEvolvedOnly ? filterEvolved(allSpeciesList) : allSpeciesList
  }, [isFullyEvolvedOnly, allSpeciesList])

  const filtered = useMemo(() => {
    return filteredByEvolved.filter((species) => {
      const nameFilterResult =
        searchText === '' || speciesNamefilter(species, searchText)
      const typeFilterResult =
        filterCondition === null || species.types.includes(filterCondition)
      return nameFilterResult && typeFilterResult
    })
  }, [filteredByEvolved, filterCondition, searchText])

  const sorted = useMemo(() => {
    return sortSpeciesList(filtered, sortCondition)
  }, [filtered, sortCondition])

  return {
    speciesList: sorted,
    searchText: searchText,
    filterCondition,
    sortCondition,
    isFullyEvolvedOnly,
    filter,
    sort,
    toggleSortOrder,
    toggleIsFullyEvolvedOnly,
    searchByName: setSearchText,
  }
}
