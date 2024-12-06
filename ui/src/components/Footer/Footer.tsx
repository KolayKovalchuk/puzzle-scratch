import { useSelector } from 'react-redux';
import { selectLocalValue, selectLocalValueWithLinkConfig } from '@store/selectors/localization.selectors';
import styles from './Footer.module.scss';

export function Footer() {
    const { linkText: tosLinkText, linkUrl: tosLinkUrl } = useSelector(selectLocalValueWithLinkConfig('txt.footer.tos'));
    const { linkText: privacyPolicyLinkText, linkUrl: privacyPolicyLinkUrl } = useSelector(selectLocalValueWithLinkConfig('txt.footer.privacyPolicy'));
    const { linkText: ourGamesLinkText, linkUrl: ourGamesLinkUrl } = useSelector(selectLocalValueWithLinkConfig('txt.footer.ourGames'));
    const { linkText: websiteLinkText, linkUrl: websiteLinkUrl } = useSelector(selectLocalValueWithLinkConfig('txt.footer.website'));
    
    const allRightReservedTxt = useSelector(selectLocalValue('txt.footer.allRightReserved'));
    return (
        <div className={styles.container}>
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
