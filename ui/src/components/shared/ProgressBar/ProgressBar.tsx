import { LoaderStyledStyledText } from '../StyledText';
import styles from './ProgressBar.module.scss';

export interface IProgressBarProps {
    percentage: number;
    className?: string;
}

export function ProgressBar({ percentage, className }: IProgressBarProps) {
    return (
        <div className={`${styles.progressBarGradientContainer} ${className || ''}`}>
            <div className={styles.progressBarContainer}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${percentage}%` }}
                >
                    <LoaderStyledStyledText
                        className={styles.progressLabel}
                        text={`${percentage}%`}
                        textFitCoefficient={1}
                        valueForMeasure='100'
                    />
                </div>
            </div>
        </div>
    );
}
