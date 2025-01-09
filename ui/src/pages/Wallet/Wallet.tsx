import { Footer } from '@components/Footer/Footer'
import { Button, ButtonType } from '@components/shared/Button/Button'
import { Icon } from '@components/shared/Icon'
import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon'
import { SecondaryStyledText } from '@components/shared/StyledText'
import back_arrow from '@icons/back_arrow.svg'
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg'
import { useGetUserBalance } from '@services/api/balance.service'
import { useGetUserStats } from '@services/api/user.service'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { selectUserBalanceTotal, selectUserBalanceWithdrawable } from '@store/selectors/user.selectors'
import { formatNumber } from '@utils/formatters/formatNumber'
import { ITextStyle } from 'pixi.js'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DepositWithDialog } from './components/DepositWithDialog/DepositWithDialog'
import { WalletHistoryTable } from './components/WalletHistoryTable/WalletHistoryTable'
import { useDepositWithDialog } from './hooks/useDepositWithDialog'
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

    const navigate = useNavigate();

    const onBackBtnClick = useCallback(() => {
        navigate(-1)
    }, [navigate])

    const { onDepositBtnClick, closeDialog, isDepositDialogOpen } = useDepositWithDialog();

    const onModeChanged = useCallback((mode: DepositWithDialogMode) => {
        setMode(mode);
    }, [closeDialog]);

    const onWithdrawBtnClick = useCallback(() => {
        console.log('Withdraw button clicked');
    }, [])

    const { userStats } = useGetUserStats();

    return (
        <div className={styles.container}>
            {isLoading ? <SpinnerIcon name={robo_token_gold_no_shining} className={styles.spinnerIcon} />
                : <>
                    <div className={styles.headerContianer}>
                        <Button
                            className={styles.backBtn || ''}
                            mode={ButtonType.Default}
                            onClick={onBackBtnClick}
                            iconName={back_arrow}
                        >
                        </Button>

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
                                mode={ButtonType.Confirm}
                                onClick={onDepositBtnClick}
                                text={depositLabel}
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
                                mode={ButtonType.Confirm}
                                onClick={onWithdrawBtnClick}
                                text={withdrawLabel}
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

                    <WalletHistoryTable mode={mode}/>
                    <DepositWithDialog
                        onModeChanged={onModeChanged}
                        isOpen={isDepositDialogOpen}
                        onCancel={closeDialog}
                        onConfirm={closeDialog}
                    />
                    <Footer />
                </>
            }

        </div>
    )
}