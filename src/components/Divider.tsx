import { twMerge } from 'tailwind-merge'

import type { ComponentProps, FC } from 'react'

export const Divider: FC<ComponentProps<'hr'>> = ({ className, ...props }) => {
  return <hr className={twMerge('h-[1px] border-t', className)} {...props} />
}
