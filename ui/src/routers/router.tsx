import { CandyMaze } from '@pages/CandyMaze/CandyMaze';
import { IceBox } from '@pages/IceBox/IceBox';
import { InviteFriendList } from '@pages/InviteFriendList/InviteFriendList';
import { LanguageSelect } from '@pages/LanguageSelect';
import { MainView } from '@pages/MainView';
import { SantaSac } from '@pages/SantaSac';
import { Wallet } from '@pages/Wallet/Wallet';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routerConfig';
import { MVSTMG } from '@pages/MVSTMG/MVSTMG';
import { App } from '../App.tsx'

// import { IceBox } from '@pages/IceBox';

export interface IAppRouterProps {
}

export const AppRouter = ({}: IAppRouterProps) => {
    return (
        <Routes>
            <Route path={ROUTES.Home} element={<MainView />} />
            <Route path={ROUTES.LanguageSelect} element={<LanguageSelect />} />

            <Route path={`${ROUTES.CandyMaze}/:batchId`} element={<CandyMaze />} />
            <Route path={`${ROUTES.SantaSac}/:batchId`} element={<SantaSac />} />
            <Route path={`${ROUTES.IceBox}/:batchId`} element={<IceBox />} />

            <Route path={ROUTES.Wallet} element={<Wallet />} />
            <Route path={ROUTES.InviteFriends} element={<InviteFriendList />} />

            <Route path="*" element={<Navigate to={ROUTES.Home} />} />
        </Routes>
    );
};

export const CLICK_ID_PARAM = 'clickId';

export const MVSTMGRouter = ({}: IAppRouterProps) => {
    return (
        <Routes>
            <Route path={`${ROUTES.MVSTMG}/:${CLICK_ID_PARAM}`} element={<MVSTMG />} />

            <Route path="*" element={<App />} />
        </Routes>
    );
};