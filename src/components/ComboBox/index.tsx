'use client'

import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { FC, useCallback, useRef, useState } from 'react'
import {
  Input,
  Item as RAItem,
  ListBox,
  Popover,
  ComboBox as RAComboBox,
  Label,
  Button,
  Text,
} from 'react-aria-components'

import styles from './styles.module.css'

import type { ReactElement, ReactNode } from 'react'
import type {
  ComboBoxProps as RAComboBoxProps,
  ItemProps as RAItemProps,
} from 'react-aria-components'

type Option = {
  value: string
  label: string
}

type ComboBoxProps<T extends Option> = Omit<RAComboBoxProps<T>, 'children'> & {
  label?: string
  placeholder?: string
  description?: string | null
  errorMessage?: string | null
  children: ReactNode | ((item: T) => ReactElement)
}

export const ComboBox = <T extends Option>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  ...props
}: ComboBoxProps<T>) => {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(
    null
  )
  const containerRefCallback = useCallback((node: HTMLElement | null) => {
    setContainerElement(node)
  }, [])

  return (
    <RAComboBox {...props} menuTrigger="focus">
      <Label>{label}</Label>
      <div ref={containerRefCallback} className="relative">
        <Input
          placeholder={placeholder}
          className=" input-primary input input-sm w-full rounded-md"
        />
        <Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Button>
      </div>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
      <Popover
        className="bg-white"
        style={{ width: containerElement?.clientWidth }}
      >
        <ListBox className="max-h-[300px] overflow-auto rounded-md border border-zinc-500 p-2 shadow-lg">
          {children}
        </ListBox>
      </Popover>
    </RAComboBox>
  )
}

export const Item = (props: RAItemProps) => {
  return (
    <RAItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `rounded-md px-2 py-1 outline-none ${
          isFocused ? 'bg-indigo-600 text-white' : ''
        } ${isSelected ? 'bg-indigo-600 text-white' : ''}`
      }
    />
  )
}
