import { ITableProps, Table } from './Table';

import styles from './Table.module.scss';

export interface IGradientBodyTableProps extends ITableProps {
}

export function GradientBodyTable (props: IGradientBodyTableProps) {
  return (
    <Table
        noRowBg={true}
        {...props}
        className={`${styles.gradientBodyTable} ${props.className || ''}`}
    />
  )
}
