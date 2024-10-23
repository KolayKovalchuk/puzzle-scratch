import { FC } from 'react'

interface IDropdownProps {
    className?: string
}

export const Dropdown: FC<IDropdownProps> = ({ className }: IDropdownProps) => {
  return (
    <div className={className}>Dropdown</div>
  )
}