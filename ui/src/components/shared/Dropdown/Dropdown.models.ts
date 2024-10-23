
export interface IDropdownItem {
    text: string
    icon: string | null,
    data?: any
}

export interface IDropdownItemProps {
    selectedItem: IDropdownItem,
    onClick?: (item: IDropdownItem) => void
}

export interface IDropdownListProps {
    items: IDropdownItem[],
    handleSelect: (item: IDropdownItem) => void
}

export interface IDropdownProps {
    className?: string
    items: IDropdownItem[]
    onSelect: (item: IDropdownItem) => void
}
