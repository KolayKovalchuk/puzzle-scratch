import { ILanguageSelectProps, LanguageSelect } from '@pages/LanguageSelect';
import { MainView } from '@pages/MainView';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routerConfig';
import { CandyMaze } from '@pages/CandyMaze/CandyMaze';
import { SantaSac } from '@pages/SantaSac';
import { IceBox } from '@pages/IceBox/IceBox';
import { Wallet } from '@pages/Wallet/Wallet';
import { InviteFriendList } from '@pages/InviteFriendList/InviteFriendList';
// import { IceBox } from '@pages/IceBox';

export interface IAppRouterProps {
    languageSelectProps: ILanguageSelectProps;
}

export const AppRouter = ({ languageSelectProps }: IAppRouterProps) => {
    return (
        <Routes>
            <Route path={ROUTES.Home} element={<MainView />} />
            <Route path={ROUTES.LanguageSelect} element={<LanguageSelect {...languageSelectProps}/>} />

            <Route path={`${ROUTES.CandyMaze}/:batchId`} element={<CandyMaze />} />
            <Route path={`${ROUTES.SantaSac}/:batchId`} element={<SantaSac />} />
            <Route path={`${ROUTES.IceBox}/:batchId`} element={<IceBox />} />

            <Route path={ROUTES.Wallet} element={<Wallet />} />
            <Route path={ROUTES.InviteFriends} element={<InviteFriendList />} />

            <Route path="*" element={<Navigate to={ROUTES.Home} />} />
        </Routes>
    );
};