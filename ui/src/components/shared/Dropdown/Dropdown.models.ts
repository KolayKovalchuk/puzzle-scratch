
export interface IDropdownItem {
    text: string
    icon: string | null,
    data?: any
}

export interface IDropdownItemProps {
    item: IDropdownItem,
    selected?: boolean,
    onClick?: (item: IDropdownItem) => void
}

export interface IDropdownListProps {
    items: IDropdownItem[],
    selectedItem?: IDropdownItem | null
    handleSelect: (item: IDropdownItem) => void
}

export interface IDropdownProps {
    className?: string
    placeholder?: string
    selectedItem?: IDropdownItem
    items: IDropdownItem[]
    onSelect: (item: IDropdownItem) => void
}
