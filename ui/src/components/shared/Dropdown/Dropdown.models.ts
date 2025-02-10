
export interface IDropdownItem {
    text: string
    icon: string | null,
    data?: any
}

export interface ISelectedDropdownItemProps {
    item: IDropdownItem,
    isOpen: boolean,
    locale?: string
}

export interface IDropdownItemProps {
    item: IDropdownItem,
    selected?: boolean,
    onClick?: (item: IDropdownItem) => void
    locale?: string
}

export interface IDropdownListProps {
    items: IDropdownItem[],
    selectedItem?: IDropdownItem | null
    handleSelect: (item: IDropdownItem) => void
    locale?: string
    maxHeight?: number

    showSelectedItemInList?: boolean
}

export type TextAlign = 'left' | 'center' | 'right'

export interface IDropdownProps {
    className?: string
    placeholder?: string
    selectedItem?: IDropdownItem | null
    items: IDropdownItem[]
    onSelect: (item: IDropdownItem) => void
    onOpenClose?: (isOpen: boolean) => void
    locale?: string
    textAlign?: TextAlign

    showSelectedItemInList?: boolean
}
