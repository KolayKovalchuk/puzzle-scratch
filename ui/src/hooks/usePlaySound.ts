import { CoinAnimationName } from '@components/BigWinScreen/components/CoinAnimation';
import { AppSounds, WIN_SOUND_LIST } from '@config/sounds';
import { playSound } from '@store/actions/appState.actions';
import { selectShouldStopAllSounds, selectSoundDuration, selectSoundPlayerCounter, selectSoundToPlay } from '@store/selectors/appState.selectors';
import store from '@store/store';
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


export function usePlaySound() {
    const soundPlayCounter = useSelector(selectSoundPlayerCounter);
    const shouldStopAllSounds = useSelector(selectShouldStopAllSounds);
    const soundDuration = useSelector(selectSoundDuration);

    const playSound = useCallback(async (soundToPlay: Howl) => {
        console.log('playSound 1', Howler.ctx.state);

        if (Howler.ctx.state !== 'running') {
            await Howler.ctx.resume();
        }

        console.log('playSound 2', Howler.ctx.state);
        soundToPlay.play();
    }, []);

    const playTapSound = useCallback(async (e: MouseEvent) => {
        let targetElement: HTMLElement | null = e.target as HTMLElement;
        while (targetElement) {
            if (targetElement.classList.contains(NO_TAP_SOUND_CLASS)) {
                return;
            }
            targetElement = targetElement.parentElement;
        }

        playSound(tapSound);
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

        playSound(sound)
            .then(() => {
                if (soundDuration) {
                    setTimeout(() => {
                        sound.stop();
                    }, soundDuration);
                }
            });

    }, [soundPlayCounter]);
}

export function usePlayWinSound(animationName: CoinAnimationName) {
    const { stopWinSound } = useStopWinSound();
    useEffect(() => {
        stopWinSound();
        switch (animationName) {
            case CoinAnimationName.coint_l:
                store.dispatch(playSound(AppSounds.BigWin, false));
                break;
            case CoinAnimationName.coint_m:
                store.dispatch(playSound(AppSounds.MedWin, false));
                break;
            case CoinAnimationName.coint_s:
                store.dispatch(playSound(AppSounds.SmallWin, false));
                break;
        }
    }, [animationName]);
}

export function useStopWinSound() {
    const { stopSound } = useGetSounds();
    const playingSound = useSelector(selectSoundToPlay);

    const stopWinSound = useCallback(() => {
        if (!playingSound) return;


        if (WIN_SOUND_LIST.includes(playingSound)) {
            stopSound(playingSound);
        }

    }, [stopSound, playingSound]);

    return { stopWinSound };
}