import { useEffect, useState } from 'react';
import { Howl } from 'howler';

export function useHowlerSound(
    src: string | string[] | null
) {
    const [sound, setSound] = useState<Howl | null>(null);

    useEffect(() => {
        if (!src) {
            return;
        }
        
        const newSound = new Howl({ src });
        setSound(newSound);
        return () => {
            newSound.stop()
        };
    }, [src]);

    return sound;
}