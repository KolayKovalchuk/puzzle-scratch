import { AppSounds } from '@config/sounds';
import { selectShouldStopAllSounds, selectSoundDuration, selectSoundPlayerCounter, selectSoundToPlay } from '@store/selectors/appState.selectors';
import { Howl } from 'howler';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

export const NO_TAP_SOUND_CLASS = 'no-tap-sound';


const tapSound = new Howl({ src: AppSounds.Tap })
const cancelSound = new Howl({ src: AppSounds.Cancel })
const backSound = new Howl({ src: AppSounds.Back })
const coinsCountSound = new Howl({ src: AppSounds.CoinsCount })
const openDialogSound = new Howl({ src: AppSounds.OpenDialog })
const scratchSound = new Howl({ src: AppSounds.Scratch })
const bigWinSound = new Howl({ src: AppSounds.BigWin })
const medWinSound = new Howl({ src: AppSounds.MedWin })
const smallWinSound = new Howl({ src: AppSounds.SmallWin })


export function useGetSounds(soundName: AppSounds | null = null) {
    const soundDict: Record<AppSounds, Howl | undefined> = useMemo(() => ({
        [AppSounds.Tap]: tapSound,
        [AppSounds.Cancel]: cancelSound,
        [AppSounds.Back]: backSound,
        [AppSounds.CoinsCount]: coinsCountSound,
        [AppSounds.OpenDialog]: openDialogSound,
        [AppSounds.Scratch]: scratchSound,
        [AppSounds.BigWin]: bigWinSound,
        [AppSounds.MedWin]: medWinSound,
        [AppSounds.SmallWin]: smallWinSound,
    }), [
        tapSound,
        cancelSound,
        backSound,
        coinsCountSound,
        openDialogSound,
        scratchSound,
        bigWinSound,
        medWinSound,
        smallWinSound,
    ]);

    const getSound = useCallback((soundName: AppSounds | null) => {
        if (!soundName) {
            return null;
        }

        return soundDict[soundName];
    }, [soundDict]);

    const stopAllSounds = useCallback(() => {
        Object.values(soundDict).forEach(sound => {
            sound?.stop();
        });
    }, [soundDict]);

    const stopSound = useCallback((soundName: AppSounds) => {
        soundDict[soundName]?.stop();
    }, [soundDict]);
    
    return {
        getSound,
        stopAllSounds,
        stopSound,
        sound: soundName ? soundDict[soundName] : soundName,
        soundDict,
    };
}

Howler.ctx.onstatechange = function() {
    console.log('Howler.ctx.state:', Howler.ctx.state);

    if (Howler.ctx.state === 'suspended') {
        Howler.ctx.resume();
    }
};


export function usePlaySound() {
    const soundPlayCounter = useSelector(selectSoundPlayerCounter);
    const shouldStopAllSounds = useSelector(selectShouldStopAllSounds);
    const soundDuration = useSelector(selectSoundDuration);

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

    const soundName = useSelector(selectSoundToPlay);
    const { sound, stopAllSounds } = useGetSounds(soundName);

    useEffect(() => {
        document.addEventListener('click', playTapSound, true); // Use capture phase

        return () => {
            document.removeEventListener('click', playTapSound, true);
        };
    }, [playTapSound, sound, shouldStopAllSounds]);

    useEffect(() => {
        if (!sound) return;

        if (shouldStopAllSounds) {
            stopAllSounds(); // Stop the previous sound
        }

        sound.play();

        if (soundDuration) {
            setTimeout(() => {
                sound.stop();
            }, soundDuration);
        }
    }, [soundPlayCounter]);
}