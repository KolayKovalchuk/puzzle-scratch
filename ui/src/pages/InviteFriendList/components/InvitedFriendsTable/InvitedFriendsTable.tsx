import { ReactNode, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { ITableCellData, Table, TableCell } from '@components/shared/Table'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { useInvitedFriendsTBodyData } from './useInvitedFriendsTBodyData'

import styles from './InvitedFriendsTable.module.scss'
import hint from '@icons/hint.svg';
import { Icon } from '@components/shared/Icon'
import { BonusInfoDialogPopup } from '../BonusInfoDialog/BonusInfoDialog'

export interface IInvitedFriendsTableProps {
    className?: string;
}

export function InvitedFriendsTable({ className }: IInvitedFriendsTableProps) {
    const invitedFriendsText = useSelector(selectLocalValue('txt.invite.invited'));

    const [isBonusInfoDialogOpen, setIsBonusInfoDialogOpen] = useState(false);

    const onCloseBonusInfoDialog = useCallback(() => {
        setIsBonusInfoDialogOpen(false);
    }, []);

    const onHintIconClick = useCallback(() => {
        setIsBonusInfoDialogOpen(true);
    }, []);

    const tHeadData: ITableCellData[] = useMemo(() => [
        { key: 'index', data: '' },
        { key: 'userName', data: invitedFriendsText },
        {
            key: 'nickName', data: (
                <Icon name={hint} className={styles.hintIcon} onClick={onHintIconClick}/>
            )
        },
    ], [invitedFriendsText]);

    const { tBodyData, emptyText, contianerRef } = useInvitedFriendsTBodyData();


    const renderCell = useCallback((data: ITableCellData, index: number): ReactNode => {
        const isEmptyCell = data.data === emptyText;
        const cellWidth = isEmptyCell || index ? '100%' : '20%';
        const cellClassName = index ? styles.nickNameCell : styles.indexCell;

        return <TableCell className={cellClassName} key={data.key} data={data.data} width={cellWidth} />
    }, [tHeadData])

    return (<>
        <Table
            bodyRef={contianerRef}
            className={`${styles.table} ${className || ''}`}
            tHeadData={tHeadData}
            tBodyData={tBodyData}
            renderCell={renderCell}
            emptyText={emptyText}
        />
        <BonusInfoDialogPopup
            isOpen={isBonusInfoDialogOpen}
            onClose={onCloseBonusInfoDialog}
        />
    </>)
}