import { ReactNode, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Table } from '@components/shared/Table'
import { ITableCellData } from '@components/shared/Table/Table.models'
import { TableCell } from '@components/shared/Table/TableRow'

import { selectLocalValue } from '@store/selectors/localization.selectors'

import { useInvitedFriendsTBodyData } from './useInvitedFriendsTBodyData'

import styles from './InvitedFriendsTable.module.scss'

export function InvitedFriendsTable() {
    const invitedFriendsText = useSelector(selectLocalValue('txt.invite.invited'))

    const tHeadData: ITableCellData[] = useMemo(() => [
        { key: 'userName', data: invitedFriendsText },
    ], [invitedFriendsText]);

    const { tBodyData } = useInvitedFriendsTBodyData();


    const renderCell = useCallback((data: ITableCellData, index: number): ReactNode => {
        const cellWidth = index ? '100%' : '20%';
        const cellClassName = index ? styles.nickNameCell : styles.indexCell;

        return <TableCell className={cellClassName} key={data.key} data={data.data} width={cellWidth} />
    }, [tHeadData])


    return (
        <Table
            className={styles.table}
            tHeadData={tHeadData}
            tBodyData={tBodyData}
            renderCell={renderCell}
        />
    )
}