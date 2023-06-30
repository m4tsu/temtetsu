import type { SelectProps } from '@/components/ui'
import { Select } from '@/components/ui'
import { normalizedSpecies, species } from '@/data/temtem/species'
import type { Species } from '@/models/Temtem/Species'
import { jaStrMatch } from '@/utils/kana'

import type { FC } from 'react'

type Option = {
  value: string
  label: string
}
const options: Option[] = species.map((s) => ({
  value: s.number,
  label: s.nameJa,
}))

type Props = Omit<
  SelectProps,
  | 'data'
  | 'value'
  | 'onChange'
  | 'placeholder'
  | 'searchable'
  | 'nothingFound'
  | 'maxDropdownHeight'
  | 'filter'
> & {
  selectedTem: Species | null
  onSelectTem: (species: Species) => void
}
export const TemTemSelect: FC<Props> = ({
  onSelectTem,
  selectedTem,
  ...props
}) => {
  return (
    <Select
      {...props}
      aria-label="テムテムを選ぶ"
      data={options}
      value={String(selectedTem?.number)}
      onChange={(value) => {
        if (value == null) return
        const species = normalizedSpecies[value]
        if (species == undefined) return
        onSelectTem(species)
      }}
      placeholder="テムテムを選ぶ"
      searchable
      nothingFound="見つかりません。"
      maxDropdownHeight={300}
      filter={(value, item: Option) => {
        return jaStrMatch(item.label, value)
      }}
      styles={(theme) => ({
        item: {
          // applies styles to selected item
          '&[data-selected]': {
            '&, &:hover': {
              backgroundColor: theme.colors.indigo[7],
              color: 'white',
            },
          },

          // applies styles to hovered item (with mouse or keyboard)
          '&[data-hovered]': {
            '&, &:hover': {
              backgroundColor: theme.colors.indigo[7],
              color: 'white',
            },
          },
        },
      })}
    />
  )
}
