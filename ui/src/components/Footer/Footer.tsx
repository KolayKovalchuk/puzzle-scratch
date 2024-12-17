import { useSelector } from 'react-redux';
import { selectLocalValue, selectLocalValueWithLink } from '@store/selectors/localization.selectors';
import styles from './Footer.module.scss';

export interface IFooterProps {
    className?: string;
}

export function Footer({ className }: IFooterProps) {
    const { linkText: tosLinkText, linkUrl: tosLinkUrl } = useSelector(selectLocalValueWithLink('txt.footer.tos'));
    const { linkText: privacyPolicyLinkText, linkUrl: privacyPolicyLinkUrl } = useSelector(selectLocalValueWithLink('txt.footer.privacyPolicy'));
    const { linkText: ourGamesLinkText, linkUrl: ourGamesLinkUrl } = useSelector(selectLocalValueWithLink('txt.footer.ourGames'));
    const { linkText: websiteLinkText, linkUrl: websiteLinkUrl } = useSelector(selectLocalValueWithLink('txt.footer.website'));
    
    const allRightReservedTxt = useSelector(selectLocalValue('txt.footer.allRightReserved'));
    return (
        <div className={`${styles.container} ${className || ''}`}>
            <div className={styles.row}>
                <a className={styles.link} onClick={() => window.open(tosLinkUrl)}>{tosLinkText}</a>
                <a className={styles.link} onClick={() => window.open(privacyPolicyLinkUrl)}>{privacyPolicyLinkText}</a>
                <a className={styles.link} onClick={() => window.open(ourGamesLinkUrl)}>{ourGamesLinkText}</a>
                <a className={styles.link} onClick={() => window.open(websiteLinkUrl)}>{websiteLinkText}</a>
            </div>
            <div className={styles.row}>
                <div className={styles.label}>{allRightReservedTxt}</div>
            </div>
        </div>
    );
}
