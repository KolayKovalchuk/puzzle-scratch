import { Icon } from '@components/shared/Icon';

import styles from './LeaderBoard.module.scss';
import tableStyles from '@components/shared/Table/Table.module.scss';

import arrowIcon from '@icons/arrow.svg';
import { ReactNode, useCallback } from 'react';
import { ILeaderboardHeaderData, useLeaderboardHeaderData } from './hooks/useLeaderboardHeaderData';
import { LeaderboardTableMode } from './LeaderBoard';

interface IArrowHeaderCellProps {
    children: ReactNode,
    className?: string;
    onNextHeaderClick: () => void;
    onPrevHeaderClick: () => void;
}

function ArrowHeaderCell({ children, className, onNextHeaderClick, onPrevHeaderClick }: IArrowHeaderCellProps) {
    return (
        <div className={`${tableStyles.headCellContainer} ${styles.arrowHeaderCellContainer} ${className}`}>
            <div className={`${styles.arrowIcon} ${styles.first}`} onClick={() => onPrevHeaderClick()}>
                <Icon name={arrowIcon}></Icon>
            </div>
            {children}
            <div className={`${styles.arrowIcon} ${styles.last}`} onClick={() => onNextHeaderClick()}>
                <Icon name={arrowIcon}></Icon>
            </div>
        </div>
    );
}

interface IRenderHeaderCellProps {
    children: ReactNode,
    className?: string;
}


export function HeaderCell(
    { className, children }: IRenderHeaderCellProps
) {
    return (
        <div className={`${tableStyles.headCellContainer} ${styles.headCellContainer} ${className || ''}`}>
            {children}
        </div>
    );
}

export function useHeaderCells(
    mode: LeaderboardTableMode,
    setMode: (mode: LeaderboardTableMode) => void
): { tHeadData: ILeaderboardHeaderData[], onNextHeaderClick: () => void, onPrevHeaderClick: () => void } {
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

    return { tHeadData, onNextHeaderClick, onPrevHeaderClick }
}

export interface IHeaderRowProps {
    className?: string;
    tHeadData: ILeaderboardHeaderData[];
    onNextHeaderClick: () => void;
    onPrevHeaderClick: () => void;
}

export function HeaderRow({ tHeadData, onNextHeaderClick, onPrevHeaderClick, className = '' }: IHeaderRowProps) {
    return (<div className={`${tableStyles.headRow} ${className}`}>
        {tHeadData.map((headData, index) => {
            if (headData.data.isArrowCell) {
                return (
                    <ArrowHeaderCell
                        key={index}
                        onNextHeaderClick={onNextHeaderClick}
                        onPrevHeaderClick={onPrevHeaderClick}
                    >
                        <span>{headData.data.text}</span>
                    </ArrowHeaderCell>
                );
            }

            return (
                <HeaderCell key={index}>
                    <span>{headData.data.text}</span>
                </HeaderCell>
            );
        })}
    </div>);
}

