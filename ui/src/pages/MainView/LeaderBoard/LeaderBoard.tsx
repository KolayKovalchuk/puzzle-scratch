import { Table } from '@components/shared/Table';
import { useLeaderboardData } from './hooks/useLeaderboardData';
import { useLeaderboardHeaderData } from './hooks/useLeaderboardHeaderData';

import styles from './LeaderBoard.module.scss';
import { useCallback, useState, useMemo, Dispatch, SetStateAction } from 'react';

import leaderboardIcon from '@icons/leaderboard.svg';
import { Icon } from '@components/shared/Icon';

import arrowIcon from '@icons/arrow.svg'
import { ITableCellData } from '@components/shared/Table/Table.models';

interface ILeaderBoardProps {
}

export enum LeaderboardTableMode {
    Monthly = 'Monthly',
    Weekly = 'Weekly',
    Daily = 'Daily',
}

function renderArrowHeaderCell(cellData: ITableCellData, isFirst: boolean, onClick: (() => void) | undefined) {
    const className = `${styles.headCell} ${isFirst ? styles.first : styles.last}`
    return (
        <div className={className} onClick={() => onClick && onClick()}>
            <Icon name={arrowIcon} className={styles.arrowIcon}></Icon>
            {cellData.data}
        </div>
    );
}

interface IRenderHeaderCellProps {
    className?: string;
    isFirst?: boolean;
    isLast?: boolean;
    onNextHeaderClick?: () => void;
    onPrevHeaderClick?: () => void;
}

function renderHeaderCell(
    cellData: ITableCellData,
    { className, isFirst, isLast, onNextHeaderClick, onPrevHeaderClick }: IRenderHeaderCellProps
) {
    if (isFirst) {
        return renderArrowHeaderCell(cellData, true, onPrevHeaderClick);
    }

    if (isLast) {
        return renderArrowHeaderCell(cellData, false, onNextHeaderClick);
    }

    return (
        <div className={`${styles.headCell} ${className || ''}`}>
            {cellData.data}
        </div>
    );
}

function getHeaderCells(
    tHeadData: ITableCellData[],
    onNextHeaderClick: () => void,
    onPrevHeaderClick: () => void,
) {
    return tHeadData.map((headData, index) => {
        const isFirst = index === 0;
        const isLast = index === tHeadData.length - 1;

        return {
            ...headData,
            data: renderHeaderCell(headData, {
                isFirst,
                isLast,
                onNextHeaderClick,
                onPrevHeaderClick,
            }),
        }
    });
}

function useHeaderCells(mode: LeaderboardTableMode, setMode: Dispatch<SetStateAction<LeaderboardTableMode>>) {
    const tHeadData = useLeaderboardHeaderData(mode);

    const onNextHeaderClick = useCallback(() => {
        const modeList = Object.values(LeaderboardTableMode);
        const currentIndex = modeList.indexOf(mode);
        const nextIndex = (currentIndex + 1) % modeList.length;
        setMode(modeList[nextIndex]);
    }, [mode, setMode]);

    const onPrevHeaderClick = useCallback(() => {
        const modeList = Object.values(LeaderboardTableMode);
        const currentIndex = modeList.indexOf(mode);
        const nextIndex = (currentIndex - 1 + modeList.length) % modeList.length;
        setMode(modeList[nextIndex]);
    }, [mode, setMode]);

    const tHeadCells = useMemo(
        () => getHeaderCells(tHeadData, onNextHeaderClick, onPrevHeaderClick),
        [tHeadData, onNextHeaderClick, onPrevHeaderClick]
    );

    return tHeadCells;
}

export function LeaderBoard({ }: ILeaderBoardProps) {
    const [mode, setMode] = useState<LeaderboardTableMode>(LeaderboardTableMode.Monthly);
    const [tBodyData, isLoading] = useLeaderboardData(mode);
    const tHeadCells = useHeaderCells(mode, setMode);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Icon
                    name={leaderboardIcon}
                    className={styles.leaderboardIcon}
                />
            </div>
            <Table
                tBodyData={tBodyData}
                tHeadData={tHeadCells}
            />
        </div>
    );
};
