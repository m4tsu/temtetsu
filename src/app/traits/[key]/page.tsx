import { traitsByKey } from '@/data/temtem/traits'
import type { PageProps } from '@/libs/nextjs/util-types'
import { findItem } from '@/utils/dict'

const TraitPage = ({ params: { key } }: PageProps<'key'>) => {
  const trait = findItem(traitsByKey, key)
  const { name, nameJa, description, descriptionJa } = trait
  return (
    <div>
      <div>{nameJa ?? name}</div>
      <div>{descriptionJa ?? description}</div>
    </div>
  )
}

export default TraitPage
