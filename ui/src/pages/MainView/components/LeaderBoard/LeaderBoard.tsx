import { useSelector } from 'react-redux';
import { useState } from 'react';

import styles from './LeaderBoard.module.scss';

import { Table } from '@components/shared/Table';
import { SecondaryStyledText } from '@components/shared/StyledText';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useLeaderboardData } from './hooks/useLeaderboardData';
import { HeaderRow, useHeaderCells } from './HeaderRow';
import { LeaderboardCell } from './LeaderboardCell';
import { ITextStyle } from 'pixi.js';

interface ILeaderBoardProps {
}

export enum LeaderboardTableMode {
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
}

const headerStyles: Partial<ITextStyle> = {
    fontSize: 36,
}

export function LeaderBoard({ }: ILeaderBoardProps) {
    const [mode, setMode] = useState<LeaderboardTableMode>(LeaderboardTableMode.Daily);
    const { tHeadData, onNextHeaderClick, onPrevHeaderClick } = useHeaderCells(mode, setMode);
    const [tBodyData, isLoading] = useLeaderboardData(mode);
    
    const headerText = useSelector(selectLocalValue('txt.title.leaderboard'));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <SecondaryStyledText
                    text={headerText}
                    className={styles.header}
                    textStyles={headerStyles}
                />
            </div>
            <Table
                tBodyData={tBodyData}
                tHeadElement={
                    <HeaderRow
                        tHeadData={tHeadData}
                        onNextHeaderClick={onNextHeaderClick}
                        onPrevHeaderClick={onPrevHeaderClick}
                    />
                }
                renderCell={(data, index, cellWidth) => {
                    return (<LeaderboardCell
                        key={data.key}
                        cellWidth={cellWidth}
                        cellData={data.data}
                        isLargeNumber={index === tBodyData[0]?.cellData?.length - 1}
                    />)
                }}
            />
        </div>
    );
};
