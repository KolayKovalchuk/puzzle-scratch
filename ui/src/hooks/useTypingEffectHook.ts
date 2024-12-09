import { useState, useEffect } from 'react';

export function useTypingEffectHook(text: string, duration: number) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const interval = duration / text.length;
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;

            if (currentIndex === text.length) {
                currentIndex = 0;
                setDisplayedText('');
            }
        }, interval);

        return () => clearInterval(intervalId);
    }, [text, duration]);

    return displayedText;
}