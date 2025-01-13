import { ITextStyle } from 'pixi.js-legacy'
import { ReactNode, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Icon } from '@components/shared/Icon'
import { SecondaryStyledText } from '@components/shared/StyledText'
import { ITableCellData, ITRowData, Table, TableCell } from '@components/shared/Table'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { formatLargeNumber, formatNumber } from '@utils/formatters/formatNumber'
import { DepositWithDialogMode } from '@pages/Wallet/Wallet.models'
import { useDWHistory } from '@services/api/depositWithdrawal.service'

import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg'

import styles from './WalletHistoryTable.module.scss'

const historyLabelStyles: Partial<ITextStyle> = {
    fontSize: 30,
    fontWeight: 'bold',
}

export interface IWalletHistoryTableProps {
    mode: DepositWithDialogMode;
}

export function WalletHistoryTable({ mode }: IWalletHistoryTableProps) {
    const historyLabel = useSelector(selectLocalValue('txt.wallet.history'))
    const dateLabel = useSelector(selectLocalValue('txt.wallet.history.date'))
    const actionLabel = useSelector(selectLocalValue('txt.wallet.history.action'))
    const amountLabel = useSelector(selectLocalValue('txt.wallet.history.amount'))
    const noTransactionsLabel = useSelector(selectLocalValue('txt.wallet.history.noTransactions'))
    const depositLabel = useSelector(selectLocalValue('txt.button.deposit'))
    const withdrawLabel = useSelector(selectLocalValue('txt.button.withdraw'))

    const tHeadData: ITableCellData[] = useMemo(() => [
        { key: 'date', data: dateLabel },
        { key: 'action', data: actionLabel },
        { key: 'amount', data: amountLabel },
    ], [dateLabel, actionLabel, amountLabel]);
    
    const shouldReload = DepositWithDialogMode.Select === mode;
    const { historyData } = useDWHistory(shouldReload);

    const tBodyData: ITRowData[] = useMemo(() => {
        if (!historyData) return [];

        return historyData.map((data, index) => ({
            key: `row-${index}`,
            cellData: [
                {
                    key: `cell-${index}-1`, data: new Date(data.date).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: '2-digit',
                    })
                },
                { key: `cell-${index}-2`, data: data.type ? withdrawLabel : depositLabel },
                { key: `cell-${index}-3`, data: formatLargeNumber(data.amount) },
            ],
        }));
    }, [historyData]);

    const renderCell = useCallback((data: ITableCellData, index: number, cellWidth: string): ReactNode => {
        if (tHeadData.length - 1 === index) {
            const cellContent = (<div className={styles.amountCellContianer}>
                <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                <span>{formatNumber(data.data as number)}</span>
            </div>)

            return <TableCell key={index} data={cellContent} width={cellWidth} />
        }

        return <TableCell key={index} data={data.data} width={cellWidth} />
    }, [tHeadData])


    return (
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
                emptyText={noTransactionsLabel}
            />
        </div>
    )
}