import { Howl } from 'howler';
import { useMemo } from 'react';

export function useHowlerSound(
    src: string | string[] | null
) {
    const sound = useMemo(() => {
        if (!src) {
            return;
        }
        
        return new Howl({ src });
    }, [src]);

    return sound;
}