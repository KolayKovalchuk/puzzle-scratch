import { ReactNode, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { ITableCellData, Table, TableCell } from '@components/shared/Table'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { useInvitedFriendsTBodyData } from './useInvitedFriendsTBodyData'

import styles from './InvitedFriendsTable.module.scss'
import hint from '@icons/hint.svg';
import { Icon } from '@components/shared/Icon'
import { BonusInfoDialogPopup } from '../BonusInfoDialog/BonusInfoDialog'

export function InvitedFriendsTable() {
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

    const { tBodyData } = useInvitedFriendsTBodyData();


    const renderCell = useCallback((data: ITableCellData, index: number): ReactNode => {
        const cellWidth = index ? '100%' : '20%';
        const cellClassName = index ? styles.nickNameCell : styles.indexCell;

        return <TableCell className={cellClassName} key={data.key} data={data.data} width={cellWidth} />
    }, [tHeadData])

    return (<>
        <Table
            className={styles.table}
            tHeadData={tHeadData}
            tBodyData={tBodyData}
            renderCell={renderCell}
        />
        <BonusInfoDialogPopup
            isOpen={isBonusInfoDialogOpen}
            onClose={onCloseBonusInfoDialog}
        />
    </>)
}