import { twMerge } from 'tailwind-merge'

import type { ComponentProps, FC } from 'react'

export const Divider: FC<ComponentProps<'hr'>> = ({ className, ...props }) => {
  return (
    <hr
      className={twMerge(
        'h-[1px] w-full border border-[thin] border-b',
        className
      )}
      {...props}
    />
  )
}
