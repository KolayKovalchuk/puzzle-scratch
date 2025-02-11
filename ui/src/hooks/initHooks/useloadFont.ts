
import { useState, useEffect } from "react"

import FontFaceObserver from "fontfaceobserver"

export function useFontFaceObserver(fontName: string): boolean {
    const [isResolved, setIsResolved] = useState(false)

    useEffect(() => {
        const result = new FontFaceObserver(fontName).load(null, 5000)

        result.then(() => {
            console.log('Font loaded:', fontName);
            setIsResolved(true)
        }).catch(() => {
            console.error('Font failed to load:', fontName);
            setIsResolved(true)
        })
    }, [])

    return isResolved
}
