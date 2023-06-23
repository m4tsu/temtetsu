import {
  Button,
  Dialog,
  DialogTrigger,
  Popover as RAPopover,
} from 'react-aria-components'

import type { FC, ReactNode } from 'react'
import type { PopoverProps, DialogProps } from 'react-aria-components'

type Props = {
  trigger: ReactNode
} & Omit<PopoverProps, 'children'> &
  Pick<DialogProps, 'children'>

export const Popover: FC<Props> = ({ trigger, children, ...popoverProps }) => {
  return (
    <DialogTrigger>
      {trigger}
      <RAPopover
        className="rounded-md border border-zinc-500 bg-white shadow-lg"
        isNonModal
        offset={12}
        {...popoverProps}
      >
        <Dialog>{children}</Dialog>
      </RAPopover>
    </DialogTrigger>
  )
}

export const TriggerButton = Button
