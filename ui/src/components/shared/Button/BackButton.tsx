import { AppSounds } from '@config/sounds';
import { useFixNavigateForTelegramWebApp } from '@hooks/useFixNavigateForTelegramWebApp';
import { NO_TAP_SOUND_CLASS } from '@hooks/usePlaySound';
import back_arrow from '@icons/back_arrow.svg';
import { playSound } from '@store/actions/appState.actions';
import store from '@store/store';
import { useCallback } from 'react';
import { Button, ButtonType, IButtonProps } from './Button';
import styles from './Button.module.scss';

export function BackButton(props: IButtonProps) {
    const backCb = useFixNavigateForTelegramWebApp();

     const onClickCb = useCallback(() => {
        store.dispatch(playSound(AppSounds.Back));

        if (props.onClick) props.onClick();

        backCb();
    }, [backCb, props.onClick])
    

    return (
        <Button
            {...props}
            className={`${styles.backBtn} ${props.className} ${NO_TAP_SOUND_CLASS}`}
            mode={props.mode || ButtonType.Default}
            iconName={back_arrow}
            onClick={onClickCb}
        />);
}