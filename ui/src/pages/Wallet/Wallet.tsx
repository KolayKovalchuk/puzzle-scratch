import { Footer } from '@components/Footer/Footer'
import { BackButton } from '@components/shared/Button/BackButton'
import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon'
import { SecondaryStyledText } from '@components/shared/StyledText'
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg'
import { useGetUserBalance } from '@services/api/balance.service'
import { useGetUserStats } from '@services/api/user.service'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { ITextStyle } from 'pixi.js-legacy'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { WalletHistoryTable } from './components/WalletHistoryTable/WalletHistoryTable'
import { WalletInfo } from './components/WalletInfo/WalletInfo'
import { DepositWithDialogMode } from './Wallet.models'
import styles from './Wallet.module.scss'

const headerStyles: Partial<ITextStyle> = {
    fontSize: 40,
    fontWeight: 'bold',
}

export function Wallet() {
    const headerText = useSelector(selectLocalValue('txt.wallet.wallet'))

    const { isLoading: isBalanceLoading } = useGetUserBalance();

    const [mode, setMode] = useState(DepositWithDialogMode.Select);
    const onModeChanged = useCallback((mode: DepositWithDialogMode) => {
        setMode(mode);
    }, []);

    const { userStats, isLoading: isUserStastLoading } = useGetUserStats();

    const isLoading = isBalanceLoading || isUserStastLoading;
    const containerClass = `${styles.container} ${isLoading ? styles.hidden : ''}`;

    return (<>
        {isLoading && <div className={styles.spinnerContainer}><SpinnerIcon name={robo_token_gold_no_shining} className={styles.spinnerIcon} /></div>}
        <div className={containerClass}>
            <div className={styles.headerContainer}>
                <BackButton className={styles.backButton}/>

                <SecondaryStyledText
                    text={headerText}
                    className={styles.headerText}
                    textStyles={headerStyles}
                ></SecondaryStyledText>
            </div>

            <WalletInfo userStats={userStats} onModeChanged={onModeChanged} />
            <WalletHistoryTable mode={mode} />
            <Footer />
        </div >
    </>)
}