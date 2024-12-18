import { Icon } from '@components/shared/Icon'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './Header.module.scss'

import { selectUserAvatar, selectUserBalanceRbax } from '@store/selectors/user.selectors'

import { WinStyledText } from '@components/shared/StyledText'
import { selectScratchCardTransitionTimeout } from '@store/selectors/config.selectors'
import { useBalanceChangeLabel } from './hooks/useBalanceChangeLabel'

import { formatNumber } from '@utils/formatters/formatNumber'
import { useCounterAnimation } from '@hooks/useCounterAnimation'
import logo from '@icons/logo.svg'
import robo_token from '@icons/robo_token.svg'
import wallet from '@icons/wallet.svg'

export function Header() {
    const amount = useSelector(selectUserBalanceRbax) || 0;
    const animatedAmount = useCounterAnimation(amount);

    const { lastWinLabel, labelRef } = useBalanceChangeLabel(styles.animate);
    const scratchCardTransitionTimeout = useSelector(selectScratchCardTransitionTimeout);

    const navigate = useNavigate();

    const openWallet = useCallback(() => {
        // TODO: Uncomment this line to enable wallet click
        // navigate(ROUTES.Wallet);
    }, [navigate]);

    const userAvatar = useSelector(selectUserAvatar);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.logo}>
                <Icon name={logo} className={styles.logoIcon}></Icon>
            </div>
            <div className={styles.currency_info_container} onClick={openWallet}>
                <Icon name={robo_token} className={styles.token_icon}></Icon>
                <span className={styles.amount_value}>
                    {formatNumber(animatedAmount)}
                </span>

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
                <Icon name={wallet} iconSize='58%' className={styles.icon} onClick={openWallet}></Icon>
                <Icon className={styles.icon}>
                    <img src={userAvatar} width='85%' height='85%' />
                </Icon>
            </div>
        </div>
    )
}