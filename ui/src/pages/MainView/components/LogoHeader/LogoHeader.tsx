import styles from './LogoHeader.module.scss';

import puzzle_label from '@icons/puzzle_label.svg';
import scratch_label from '@icons/scratch_label.svg';
import games_label from '@icons/games_label.svg';
import stars_header_bg from '@icons/stars_header_bg.svg';
import { Icon } from '@components/shared/Icon';

export function LogoHeader() {
    return (
        <div className={styles.container}>
            <Icon name={puzzle_label} className={styles.puzzleLabel}></Icon>
            <Icon name={scratch_label} className={styles.scratchLabel}></Icon>
            <Icon name={games_label} className={styles.gamesLabel}></Icon>
            <Icon name={stars_header_bg} className={styles.starsHeaderBg}></Icon>
        </div>
    )
};
