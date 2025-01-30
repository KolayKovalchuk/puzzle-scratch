import { DepositWithDialog } from '@components/DepositWithDialog/DepositWithDialog'
import { useDepositWithDialog } from '@components/DepositWithDialog/hooks/useDepositWithDialog'
import { Footer } from '@components/Footer/Footer'
import { Button, ButtonType } from '@components/shared/Button'
import { BackButton } from '@components/shared/Button/BackButton'
import { Icon } from '@components/shared/Icon'
import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon'
import { SecondaryStyledText } from '@components/shared/StyledText'
import { useGetSmallestFontSize } from '@hooks/useGetSmallestFontSize'
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg'
import { useGetUserBalance } from '@services/api/balance.service'
import { useGetUserStats } from '@services/api/user.service'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { selectUserBalanceTotal, selectUserBalanceWithdrawable, selectUserPreferredLocale } from '@store/selectors/user.selectors'
import { formatNumber } from '@utils/formatters/formatNumber'
import { ITextStyle } from 'pixi.js-legacy'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { WalletHistoryTable } from './components/WalletHistoryTable/WalletHistoryTable'
import { WithdrawDialog } from './components/WithdrawDialog/WithdrawDialog'
import { useWithdrawDialog } from './hooks/useWithdrawDialog'
import { DepositWithDialogMode } from './Wallet.models'
import styles from './Wallet.module.scss'

const headerStyles: Partial<ITextStyle> = {
    fontSize: 40,
    fontWeight: 'bold',
}

export function Wallet() {
    const headerText = useSelector(selectLocalValue('txt.wallet.wallet'))
    const balanceLabel = useSelector(selectLocalValue('txt.wallet.balance'))
    const depositLabel = useSelector(selectLocalValue('txt.button.deposit'))
    const withdrawableLabel = useSelector(selectLocalValue('txt.wallet.withdrawable'))
    const withdrawLabel = useSelector(selectLocalValue('txt.button.withdraw'))
    const winnignsLabel = useSelector(selectLocalValue('txt.wallet.winnigns'))

    const totalAmount = useSelector(selectUserBalanceTotal) || 0;
    const withdrawableAmount = useSelector(selectUserBalanceWithdrawable) || 0;

    const [mode, setMode] = useState(DepositWithDialogMode.Select);

    const { isLoading } = useGetUserBalance();

    const { onDepositBtnClick, closeDialog, isDepositDialogOpen } = useDepositWithDialog();
    const { onWithdrawBtnClick, closeDialog: closeWithdrawDialog, isWithdrawDialogOpen } = useWithdrawDialog();

    const onModeChanged = useCallback((mode: DepositWithDialogMode) => {
        setMode(mode);
    }, [closeDialog]);

    const { userStats } = useGetUserStats();

    // const { btnYShift } = useFixForArabicLocale();
    const {
        textStylesWithFontSize,
        setDepositBtnFontSize,
        setWithdrawBtnFontSize,
    } = useGetSmallestFontSize();

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

            <div className={styles.walletInfoContainer}>
                <div className={styles.balanceInfoRow}>
                    <div className={styles.column}>
                        <div className={styles.balanceNameLabel}>{balanceLabel}</div>
                        <div className={styles.balanceAmountContainer}>
                            <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                            <span className={styles.balanceAmount}>{formatNumber(totalAmount)}</span>
                        </div>
                    </div>
                    <Button
                        className={`${styles.walletBtn}`}
                        mode={ButtonType.Confirm}
                        onClick={onDepositBtnClick}
                        text={depositLabel}
                        getTextSize={setDepositBtnFontSize}
                        textStyle={textStylesWithFontSize}
                        // yShift={btnYShift}
                    ></Button>
                </div>
                <div className={styles.balanceInfoRow}>
                    <div className={styles.column}>
                        <div className={styles.balanceNameLabel}>{withdrawableLabel}</div>
                        <div className={styles.balanceAmountContainer}>
                            <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                            <span className={styles.balanceAmount}>{formatNumber(withdrawableAmount)}</span>
                        </div>
                    </div>
                    <Button
                        className={`${styles.walletBtn}`}
                        mode={ButtonType.Confirm}
                        onClick={onWithdrawBtnClick}
                        text={withdrawLabel}
                        getTextSize={setWithdrawBtnFontSize}
                        textStyle={textStylesWithFontSize}
                        // yShift={btnYShift}
                    ></Button>
                </div>
                <div className={styles.balanceInfoRow}>
                    <div className={styles.column}>
                        <div className={styles.balanceNameLabel}>{winnignsLabel}</div>
                    </div>
                    <div className={`${styles.balanceAmountContainer} ${styles.infoLabel}`}>
                        <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                        <span className={styles.balanceAmount}>{formatNumber(userStats?.totalRbaxWon || 0)}</span>
                    </div>
                </div>
            </div>
            <WalletHistoryTable mode={mode} />
            <DepositWithDialog
                onModeChanged={onModeChanged}
                isOpen={isDepositDialogOpen}
                onCancel={closeDialog}
                onConfirm={closeDialog}
            />
            <WithdrawDialog
                isOpen={isWithdrawDialogOpen}
                onCancel={closeWithdrawDialog}
                onConfirm={closeWithdrawDialog}
            />
            <Footer />
        </div >
    </>)
}