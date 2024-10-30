import { RefObject, useEffect } from 'react'

export function useHandleClickOutside(dropdownRef: RefObject<HTMLElement>, callback: () => void) {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
}