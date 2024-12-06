import { Icon } from '@components/shared/Icon'
import { SecondaryStyledText } from '@components/shared/StyledText'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { useSelector } from 'react-redux'
import { ITextStyle } from 'pixi.js'
import { ReactNode, useCallback, useMemo } from 'react'

import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg'

import { Table } from '@components/shared/Table'
import { ITableCellData, ITRowData } from '@components/shared/Table/Table.models'
import { formatNumber } from '@utils/formatters/formatNumber'

import styles from './WalletHistoryTable.module.scss'
import { TableCell } from '@components/shared/Table/TableRow'

const historyLabelStyles: Partial<ITextStyle> = {
    fontSize: 30,
    fontWeight: 'bold',
}

export function WalletHistoryTable() {
    const historyLabel = useSelector(selectLocalValue('txt.wallet.history'))
    const dateLabel = useSelector(selectLocalValue('txt.wallet.history.date'))
    const actionLabel = useSelector(selectLocalValue('txt.wallet.history.action'))
    const amountLabel = useSelector(selectLocalValue('txt.wallet.history.amount'))

    const tHeadData: ITableCellData[] = useMemo(() => [
        { key: 'date', data: dateLabel },
        { key: 'action', data: actionLabel },
        { key: 'amount', data: amountLabel },
    ], [dateLabel, actionLabel, amountLabel]);

    const tBodyData: ITRowData[] = useMemo(() => Array.from({ length: 20 }, (_, index) => ({
        key: `row-${index}`,
        cellData: [
            {
                key: `cell-${index}-1`, data: `${index + 1}. ${new Date().toLocaleDateString('en-US', {
                    dateStyle: 'short',
                })}`
            },
            { key: `cell-${index}-2`, data: index % 2 ? 'Deposit' : 'Withdraw' },
            { key: `cell-${index}-3`, data: 1000 },
        ],
    })), []);

    const renderCell = useCallback((data: ITableCellData, index: number, cellWidth: string): ReactNode => {
        if (tHeadData.length - 1 === index) {
            const cellContent = (<div className={styles.amountCellContianer}>
                <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                <span>{formatNumber(data.data as number)}</span>
            </div>)

            return <TableCell data={cellContent} width={cellWidth} />
        }

        return <TableCell data={data.data} width={cellWidth} />
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
            />
        </div>
    )
}