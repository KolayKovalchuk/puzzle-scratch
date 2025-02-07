import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg'
import styles from './GamesHistoryTable.module.scss'

import { Icon } from '@components/shared/Icon'
import { SecondaryStyledText } from '@components/shared/StyledText'
import { GradientBodyTable, ITableCellData, ITRowData, TableCell } from '@components/shared/Table'
import { IRecentGame } from '@models/UserStats.model'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { formatLargeNumber, formatNumber } from '@utils/formatters/formatNumber'
import { ReactNode, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ITextStyle } from 'pixi.js-legacy'
import { formatDate } from '@utils/formatDate'

export interface IGamesHistoryTableProps {
    recentGames: IRecentGame[];
}

const titlelStyles: Partial<ITextStyle> = {
    fontSize: 30,
    fontWeight: 'bold',
}

export function GamesHistoryTable ({ recentGames }: IGamesHistoryTableProps) {
    const title = useSelector(selectLocalValue('profile.gameHistory'))
    const gameNameLabel = useSelector(selectLocalValue('profile.gameHistory.gameName'))
    const dateLabel = useSelector(selectLocalValue('profile.gameHistory.date'))
    const prizeWonLabel = useSelector(selectLocalValue('profile.gameHistory.prizeWon'))
    const noGamesYetLabel = useSelector(selectLocalValue('profile.gameHistory.noGamesYet'))

    const tHeadData: ITableCellData[] = useMemo(() => [
        { key: 'gameName', data: gameNameLabel },
        { key: 'date', data: dateLabel },
        { key: 'prizeWon', data: prizeWonLabel },
    ], [gameNameLabel, dateLabel, prizeWonLabel]);
    
    const tBodyData: ITRowData[] = useMemo(() => {
        return recentGames.map((data, index) => ({
            key: `row-${index}`,
            cellData: [
                { key: `cell-${index}-2`, data: data.batchName || data.cardType },
                { key: `cell-${index}-1`, data: formatDate(data.datePlayed) },
                { key: `cell-${index}-3`, data: formatLargeNumber(data.prizeWon) },
            ],
        }));
    }, [recentGames]);

    const renderCell = useCallback((data: ITableCellData, index: number, cellWidth: string): ReactNode => {
        if (tHeadData.length - 1 === index) {
            const cellContent = (<div className={styles.prizeWonCellContianer}>
                <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                <span>{formatNumber(data.data as number)}</span>
            </div>)

            return <TableCell  className={styles.tableCell} key={index} data={cellContent} width={cellWidth} />
        }

        return <TableCell className={styles.tableCell} key={index} data={data.data} width={cellWidth} />
    }, [tHeadData])


    return (
        <div className={styles.container}>
            <SecondaryStyledText
                text={title}
                className={styles.headerText}
                textStyles={titlelStyles}
                cacheKey='profile-game-history'
            ></SecondaryStyledText>

            <GradientBodyTable
                className={styles.historyTable}
                tHeadData={tHeadData}
                tBodyData={tBodyData}
                renderCell={renderCell}
                emptyText={noGamesYetLabel}
            />
        </div>
    )
}
