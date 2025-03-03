import { useSelector } from 'react-redux';
import styles from './WalletInfo.module.scss';

import { DepositWithDialog } from '@components/DepositWithDialog/DepositWithDialog';
import { useDepositWithDialog } from '@components/DepositWithDialog/hooks/useDepositWithDialog';
import { Button, ButtonType, ButtonWithRibbon } from '@components/shared/Button';
import { Icon } from '@components/shared/Icon';
import { useGetSmallestFontSize } from '@hooks/useGetSmallestFontSize';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import { UserStats } from '@models/UserStats.model';
import { useWithdrawDialog } from '@pages/Wallet/hooks/useWithdrawDialog';
import { DepositWithDialogMode } from '@pages/Wallet/Wallet.models';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { selectIsQaUser, selectUserBalanceTotal, selectUserBalanceWithdrawable } from '@store/selectors/user.selectors';
import { formatNumber } from '@utils/formatters/formatNumber';
import { WithdrawDialog } from '../WithdrawDialog/WithdrawDialog';

export interface IWalletInfoProps {
    userStats: UserStats;
    onModeChanged: (mode: DepositWithDialogMode) => void
}

export function WalletInfo({ userStats, onModeChanged }: IWalletInfoProps) {
    const balanceLabel = useSelector(selectLocalValue('txt.wallet.balance'))
    const depositLabel = useSelector(selectLocalValue('txt.button.deposit'))
    const withdrawableLabel = useSelector(selectLocalValue('txt.wallet.withdrawable'))
    const withdrawLabel = useSelector(selectLocalValue('txt.button.withdraw'))
    const winnignsLabel = useSelector(selectLocalValue('txt.wallet.winnigns'))

    const totalAmount = useSelector(selectUserBalanceTotal) || 0;
    const withdrawableAmount = useSelector(selectUserBalanceWithdrawable) || 0;

    const {
        textStylesWithFontSize,
        setDepositBtnFontSize,
        setWithdrawBtnFontSize,
    } = useGetSmallestFontSize();


    const { onDepositBtnClick, closeDialog, isDepositDialogOpen } = useDepositWithDialog();
    const { onWithdrawBtnClick, closeDialog: closeWithdrawDialog, isWithdrawDialogOpen } = useWithdrawDialog();
    const isQaUser = useSelector(selectIsQaUser);

    return (<>
        <div className={styles.walletInfoContainer}>
            <div className={styles.column}>
                <div className={styles.balanceInfoCell}>
                    <div className={styles.balanceNameLabel}>{balanceLabel}</div>
                    <div className={styles.balanceAmountContainer}>
                        <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                        <span className={styles.balanceAmount}>{formatNumber(totalAmount)}</span>
                    </div>
                </div>
                <div className={styles.balanceInfoCell}>
                    <div className={styles.balanceNameLabel}>{withdrawableLabel}</div>
                    <div className={styles.balanceAmountContainer}>
                        <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                        <span className={styles.balanceAmount}>{formatNumber(withdrawableAmount)}</span>
                    </div>
                </div>
                <div className={styles.balanceInfoCell}>
                    <div className={styles.balanceNameLabel}>{winnignsLabel}</div>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.balanceInfoCell}>
                    <Button
                        className={`${styles.walletBtn}`}
                        mode={ButtonType.Confirm}
                        onClick={onDepositBtnClick}
                        text={depositLabel}
                        getTextSize={setDepositBtnFontSize}
                        textStyle={textStylesWithFontSize}
                    ></Button>
                </div>
                <div className={styles.balanceInfoCell}>

                    <ButtonWithRibbon
                        className={`${styles.walletBtn}`}
                        mode={ButtonType.Confirm}
                        onClick={onWithdrawBtnClick}
                        text={withdrawLabel}
                        getTextSize={setWithdrawBtnFontSize}
                        textStyle={textStylesWithFontSize}
                        isDisabled={!isQaUser}
                    ></ButtonWithRibbon>
                </div>
                <div className={styles.balanceInfoCell}>
                    <div className={`${styles.balanceAmountContainer} ${styles.infoLabel}`}>
                        <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                        <span className={styles.balanceAmount}>{formatNumber(userStats?.totalRbaxWon || 0)}</span>
                    </div>
                </div>
            </div>
        </div>
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
    </>);
}
