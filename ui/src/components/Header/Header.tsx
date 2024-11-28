import { Icon } from '@components/shared/Icon'
import { useMemo } from 'react'
import styles from './Header.module.scss'

import avatar_placeholder from '@icons/avatar_placeholder.svg'
import logo from '@icons/logo.svg'
import robo_token from '@icons/robo_token.svg'
import wallet from '@icons/wallet.svg'
import { selectUserBalanceRbax } from '@store/selectors/user.selectors'
import { useSelector } from 'react-redux'

import { WinStyledText } from '@components/shared/StyledText'
import { selectScratchCardTransitionTimeout } from '@store/selectors/config.selectors'
import AnimatedNumbers from "react-animated-numbers"
import { useBalanceChangeLabel } from './hooks/useBalanceChangeLabel'

function renderAnimatedNumbers(amount: number) {
    return <AnimatedNumbers
        includeComma
        className={styles.amount_value}
        animateToNumber={amount}
        fontStyle={{
            fontSize: 18,
            color: "#fff",
        }}
    />
}

export function Header() {
    const amount = useSelector(selectUserBalanceRbax) || 0;

    const { lastWinLabel, labelRef } = useBalanceChangeLabel(styles.animate);
    const scratchCardTransitionTimeout = useSelector(selectScratchCardTransitionTimeout);

    const animatedNumbers = useMemo(() => renderAnimatedNumbers(amount), [amount]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.logo}>
                <Icon name={logo} className={styles.logoIcon}></Icon>
            </div>
            <div className={styles.currency_info_container}>
                <Icon name={robo_token} className={styles.token_icon}></Icon>
                {animatedNumbers}

                <div
                    ref={labelRef}
                    className={`${styles.balanceChangeLabel}`}
                    style={{ animationDuration: `${scratchCardTransitionTimeout}ms` }}
                >
                    <WinStyledText
                        text={lastWinLabel}
                        textStyles={{ fontSize: 20 }}
                    />
                </div>

            </div>
            <div className={styles.profileContainer}>
                <Icon name={wallet} iconSize='58%' className={styles.icon}></Icon>
                <Icon name={avatar_placeholder} iconSize='85%' className={styles.icon}></Icon>
            </div>
        </div>
    )
}