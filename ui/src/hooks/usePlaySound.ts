import { AppSounds } from '@config/sounds';
import { selectShouldStopAllSounds, selectSoundPlayerCounter, selectSoundToPlay } from '@store/selectors/appState.selectors';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHowlerSound } from './useHowlerSound';

export const NO_TAP_SOUND_CLASS = 'noTapSound';

export function usePlaySound() {
    const soundPlayCounter = useSelector(selectSoundPlayerCounter);
    const tapSound = useHowlerSound(AppSounds.Tap);
    const shouldStopAllSounds = useSelector(selectShouldStopAllSounds);

    const playTapSound = useCallback((e: MouseEvent) => {
        let targetElement: HTMLElement | null = e.target as HTMLElement;
        while (targetElement) {
            if (targetElement.classList.contains(NO_TAP_SOUND_CLASS)) {
                return;
            }
            targetElement = targetElement.parentElement;
        }

        tapSound?.play();
    }, [tapSound]);

    const soundeName = useSelector(selectSoundToPlay);
    const sound = useHowlerSound(soundeName || '');

    useEffect(() => {
        document.addEventListener('click', playTapSound, true); // Use capture phase

        return () => {
            if (shouldStopAllSounds) {
                sound?.stop();
            }
            document.removeEventListener('click', playTapSound, true);
        };
    }, [playTapSound, sound, shouldStopAllSounds]);

    useEffect(() => {
        if (!sound) return;

        if (shouldStopAllSounds) {
            sound.stop(); // Stop the previous sound
        }

        sound.play();
    
    }, [sound, soundPlayCounter, shouldStopAllSounds]);
}