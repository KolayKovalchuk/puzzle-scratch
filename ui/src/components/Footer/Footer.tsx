import { useSelector } from 'react-redux';
import { selectLocalValue, selectLocalValueWithLink } from '@store/selectors/localization.selectors';
import styles from './Footer.module.scss';

export interface IFooterProps {
    className?: string;
    locale?: string
}

export function Footer({ className, locale }: IFooterProps) {
    const { linkText: tosLinkText, linkUrl: tosLinkUrl } = useSelector(selectLocalValueWithLink('txt.footer.tos', locale));
    const { linkText: privacyPolicyLinkText, linkUrl: privacyPolicyLinkUrl } = useSelector(selectLocalValueWithLink('txt.footer.privacyPolicy', locale));
    const { linkText: ourGamesLinkText, linkUrl: ourGamesLinkUrl } = useSelector(selectLocalValueWithLink('txt.footer.ourGames', locale));
    const { linkText: websiteLinkText, linkUrl: websiteLinkUrl } = useSelector(selectLocalValueWithLink('txt.footer.website', locale));
    
    const allRightReservedTxt = useSelector(selectLocalValue('txt.footer.allRightReserved', locale));
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
