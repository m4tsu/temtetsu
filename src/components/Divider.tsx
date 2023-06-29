import { twMerge } from 'tailwind-merge'

import type { ComponentProps, FC } from 'react'

export const Divider: FC<ComponentProps<'hr'>> = ({ className, ...props }) => {
  return (
    <hr
      className={twMerge('h-[0px] w-full border-[thin]', className)}
      {...props}
    />
  )
}
