import { SecondaryStyledText } from '@components/shared/StyledText'
import styles from './Wallet.module.scss'
import { useSelector } from 'react-redux'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { Button, ButtonType } from '@components/shared/Button/Button'
import { Icon } from '@components/shared/Icon'

import back_arrow from '@icons/back_arrow.svg';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';

import { useNavigate } from 'react-router-dom'
import { ReactNode, useCallback, useMemo } from 'react'
import { ITextStyle } from 'pixi.js'
import { Table } from '@components/shared/Table'
import { ITableCellData, ITRowData } from '@components/shared/Table/Table.models'
import { selectUserBalanceRbax } from '@store/selectors/user.selectors'
import { formatNumber } from '@utils/formatters/formatNumber'

const headerStyles: Partial<ITextStyle> = {
    fontSize: 40,
    fontWeight: 'bold',
}

const historyLabelStyles: Partial<ITextStyle> = {
    fontSize: 30,
    fontWeight: 'bold',
}

export function Wallet() {
    const headerText = useSelector(selectLocalValue('txt.wallet.wallet'))
    const balanceLabel = useSelector(selectLocalValue('txt.wallet.balance'))
    const depositLabel = useSelector(selectLocalValue('txt.button.deposit'))
    const withdrawableLabel = useSelector(selectLocalValue('txt.wallet.withdrawable'))
    const withdrawLabel = useSelector(selectLocalValue('txt.button.withdraw'))

    const historyLabel = useSelector(selectLocalValue('txt.wallet.history'))
    const dateLabel = useSelector(selectLocalValue('txt.wallet.history.date'))
    const actionLabel = useSelector(selectLocalValue('txt.wallet.history.action'))
    const amountLabel = useSelector(selectLocalValue('txt.wallet.history.amount'))

    const amount = useSelector(selectUserBalanceRbax) || 0;

    const navigate = useNavigate();

    const onBackBtnClick = useCallback(() => {
        navigate(-1)
    }, [navigate])

    const onDepositBtnClick = useCallback(() => {
        console.log('Deposit button clicked');
    }, [])

    const onWithdrawBtnClick = useCallback(() => {
        console.log('Withdraw button clicked');
    }, [])

    const tHeadData: ITableCellData[] = useMemo(() => [
        { key: 'header-1', data: dateLabel },
        { key: 'header-2', data: actionLabel },
        { key: 'header-3', data: amountLabel },
    ], [dateLabel, actionLabel, amountLabel]);

    const tBodyData: ITRowData[] = useMemo(() => Array.from({ length: 20 }, (_, index) => ({
        key: `row-${index}`,
        cellData: [
            { key: `cell-${index}-1`, data: `${index + 1}. ${new Date().toLocaleDateString('en-US', {
                dateStyle: 'short',
            })}` },
            { key: `cell-${index}-2`, data: index % 2 ? 'Deposit' : 'Withdraw' },
            { key: `cell-${index}-3`, data: 1000 },
        ],
    })), []);

    const renderCell = useCallback((data: ITableCellData, index: number): ReactNode => {
        if (tHeadData.length - 1 === index) {
            return (<div className={styles.amountCellContianer}>
                <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                <span>{formatNumber(data.data as number)}</span>
            </div>)
        }

        return data.data
    }, [tHeadData])


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
                    <Button mode={ButtonType.Confirm} onClick={onDepositBtnClick} text={depositLabel}></Button>
                </div>
                <div className={styles.balanceInfoRow}>
                    <div className={styles.column}>
                        <div className={styles.balanceNameLabel}>{withdrawableLabel}</div>
                        <div className={styles.balanceAmountContainer}>
                            <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                            <span className={styles.balanceAmount}>1000</span>
                        </div>
                    </div>
                    <Button mode={ButtonType.Confirm} onClick={onWithdrawBtnClick} text={withdrawLabel}></Button>
                </div>
            </div>

            <div className={styles.historyTableContainer}>
                <SecondaryStyledText
                    text={historyLabel}
                    className={styles.headerText}
                    textStyles={historyLabelStyles}
                ></SecondaryStyledText>

                <Table
                    className={styles.historyTable}
                    tHeadData={tHeadData}
                    tBodyData={tBodyData}
                    renderCell={renderCell}
                    noRowBg={true}
                />
            </div>
        </div>
    )
}