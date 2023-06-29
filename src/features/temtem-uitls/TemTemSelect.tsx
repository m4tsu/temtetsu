import { useCallback } from 'react'

import { ComboBox, Item } from '@/components/ComboBox'
import {
  normalizedSpecies,
  species as speciesList,
} from '@/data/temtem/species'
import type { Species } from '@/models/Temtem/Species'
import { jaStrMatch } from '@/utils/kana'

import type { FC } from 'react'
import type { ComboBoxProps } from 'react-aria-components'

type Option = {
  value: string
  label: string
}

const options: Option[] = speciesList.map((species) => ({
  value: species.number,
  label: species.nameJa,
}))

type Props = ComboBoxProps<Option> & {
  selectedTem: Species | null
  onSelectTem: (species: Species | null) => void
}
export const TemTemSelect: FC<Props> = ({
  onSelectTem,
  selectedTem,
  ...props
}) => {
  const handleSelectionChange = useCallback(
    (value: string | number) => {
      const selectedTem = normalizedSpecies[String(value)]
      if (selectedTem === undefined) {
        onSelectTem(null)
      } else {
        onSelectTem(selectedTem)
      }
    },
    [onSelectTem]
  )

  const filter = useCallback((textValue: string, inputValue: string) => {
    return jaStrMatch(textValue, inputValue)
  }, [])

  return (
    <ComboBox
      aria-label="テムテムを選択"
      {...props}
      onSelectionChange={handleSelectionChange}
      selectedKey={selectedTem?.number || null}
      defaultFilter={filter}
      placeholder="テムテムを選択"
    >
      {options.map((option) => (
        <Item key={option.value} id={option.value}>
          {option.label}
        </Item>
      ))}
    </ComboBox>
  )
}
