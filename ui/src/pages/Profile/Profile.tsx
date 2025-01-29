import { BackButton } from '@components/shared/Button';
import { Icon } from '@components/shared/Icon';
import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon';
import { SecondaryStyledText } from '@components/shared/StyledText';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import { useGetUserStats } from '@services/api/user.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { selectUserAvatar, selectUserName } from '@store/selectors/user.selectors';
import { ITextStyle } from 'pixi.js-legacy';
import { useSelector } from 'react-redux';
import { LanguageSelectDropdown } from './components/LanguageSelectDropdown/LanguageSelectDropdown';
import { UserStatistic } from './components/UserStatistic/UserStatistic';
import styles from './Profile.module.scss';
import { Footer } from '@components/Footer/Footer';
import { GamesHistoryTable } from './components/GamesHistoryTable/GamesHistoryTable';

export interface IProfileProps {
}

const headerStyles: Partial<ITextStyle> = {
    fontSize: 40,
}

const statisticStyles: Partial<ITextStyle> = {
    fontSize: 30,
}

export function Profile({ }: IProfileProps) {
    const headerText = useSelector(selectLocalValue('profile.header'));
    const statisticText = useSelector(selectLocalValue('profile.statistic.title'));

    const userAvatar = useSelector(selectUserAvatar);
    const userName = useSelector(selectUserName);

    const { isLoading, userStats } = useGetUserStats();

    if (isLoading) {
        return <div className={styles.spinnerContainer}>
            <SpinnerIcon
                name={robo_token_gold_no_shining}
                className={styles.spinnerIcon}
            />
        </div>
    }

    return (<>
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <BackButton className={styles.backButton}/>
                
                <SecondaryStyledText
                    text={headerText}
                    className={styles.header}
                    textStyles={headerStyles}
                    />
            </div>
            <Icon className={styles.profileIcon}>
                <img src={userAvatar} width='95%' height='95%' />
            </Icon>

            <div className={styles.userNameContainer}>
                <span className={styles.userName}>{userName}</span>
            </div>

            <SecondaryStyledText
                text={statisticText}
                className={styles.header}
                textStyles={statisticStyles}
            />
            <UserStatistic userStats={userStats}/>
            <LanguageSelectDropdown />
            <GamesHistoryTable recentGames={userStats.recentGames} />
        </div>
        <Footer />
        </>
    );
}
