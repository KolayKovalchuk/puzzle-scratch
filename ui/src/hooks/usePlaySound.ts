import { useCallback, useEffect } from 'react';
import { useHowlerSound } from './useHowlerSound';
import { useSelector } from 'react-redux';
import { selectSoundPlayerCounter, selectSoundToPlay } from '@store/selectors/appState.selectors';
import store from '@store/store';
import { playSound } from '@store/actions/appState.actions';
import { AppSounds } from '@config/sounds';

export const NO_TAP_SOUND_CLASS = 'noTapSound';

export function usePlaySound() {
    const soundeName = useSelector(selectSoundToPlay);
    const soundPlayCounter = useSelector(selectSoundPlayerCounter);
    const sound = useHowlerSound(soundeName || '');

    const handleClick = useCallback((e: MouseEvent) => {
        let targetElement: HTMLElement | null = e.target as HTMLElement;
        while (targetElement) {
            if (targetElement.classList.contains(NO_TAP_SOUND_CLASS)) {
                return;
            }
            targetElement = targetElement.parentElement;
        }

        store.dispatch(playSound(AppSounds.Tap));
    }, [sound]);

    useEffect(() => {
        document.addEventListener('click', handleClick, true); // Use capture phase

        return () => {
            document.removeEventListener('click', handleClick, true);
            sound?.stop();
        };
    }, [handleClick]);

    useEffect(() => {
        if (!sound) return;

        sound.play();
    
    }, [sound, soundPlayCounter]);
}