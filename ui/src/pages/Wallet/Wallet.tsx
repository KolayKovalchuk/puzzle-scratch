import { Button, ButtonType } from '@components/shared/Button/Button'
import { Icon } from '@components/shared/Icon'
import { SecondaryStyledText } from '@components/shared/StyledText'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { useSelector } from 'react-redux'
import styles from './Wallet.module.scss'

import back_arrow from '@icons/back_arrow.svg'
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg'

import { selectUserBalanceRbax } from '@store/selectors/user.selectors'
import { formatNumber } from '@utils/formatters/formatNumber'
import { ITextStyle } from 'pixi.js'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DepositWithDialog } from './components/DepositWithDialog/DepositWithDialog'
import { WalletHistoryTable } from './components/WalletHistoryTable/WalletHistoryTable'
import { Footer } from '@components/Footer/Footer'

const headerStyles: Partial<ITextStyle> = {
    fontSize: 40,
    fontWeight: 'bold',
}

export function useDopositWithDialog() {
    const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);

    const onDepositBtnClick = useCallback(() => {
        console.log('Deposit button clicked');
        setIsDepositDialogOpen(true);
    }, [])

    const onCancel = useCallback(() => {
        setIsDepositDialogOpen(false);
    }, [])

    return {
        isDepositDialogOpen,
        onDepositBtnClick,
        onCancel,
    }
}

export function Wallet() {
    const headerText = useSelector(selectLocalValue('txt.wallet.wallet'))
    const balanceLabel = useSelector(selectLocalValue('txt.wallet.balance'))
    const depositLabel = useSelector(selectLocalValue('txt.button.deposit'))
    const withdrawableLabel = useSelector(selectLocalValue('txt.wallet.withdrawable'))
    const withdrawLabel = useSelector(selectLocalValue('txt.button.withdraw'))

    const amount = useSelector(selectUserBalanceRbax) || 0;

    const navigate = useNavigate();

    const onBackBtnClick = useCallback(() => {
        navigate(-1)
    }, [navigate])

    const { onDepositBtnClick, onCancel, isDepositDialogOpen } = useDopositWithDialog();

    const onWithdrawBtnClick = useCallback(() => {
        console.log('Withdraw button clicked');
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.headerContianer}>
                <Button
                    className={`${styles.backBtn}`}
                    mode={ButtonType.Default}
                    onClick={onBackBtnClick}
                >
                    <Icon name={back_arrow} className={styles.backIcon} />
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
                            <span className={styles.balanceAmount}>{formatNumber(amount)}</span>
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
                            <span className={styles.balanceAmount}>1000</span>
                        </div>
                    </div>
                    <Button
                        mode={ButtonType.Confirm}
                        onClick={onWithdrawBtnClick}
                        text={withdrawLabel}
                    ></Button>
                </div>
            </div>

            <WalletHistoryTable />
            <DepositWithDialog isOpen={isDepositDialogOpen} onCancel={onCancel} />
            <Footer />

        </div>
    )
}