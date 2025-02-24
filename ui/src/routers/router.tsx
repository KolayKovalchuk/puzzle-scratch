import { CandyMaze } from '@pages/CandyMaze/CandyMaze';
import { IceBox } from '@pages/IceBox/IceBox';
import { InviteFriendList } from '@pages/InviteFriendList/InviteFriendList';
import { LanguageSelect } from '@pages/LanguageSelect';
import { MainView } from '@pages/MainView';
import { Profile } from '@pages/Profile/Profile';
import { SantaSac } from '@pages/SantaSac';
import { Wallet } from '@pages/Wallet/Wallet';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routerConfig';
import { VegasLoot } from '@pages/Vegas/VegasLoot';
import { LuckyClover } from '@pages/LuckyClover/LuckyClover';

// import { IceBox } from '@pages/IceBox';

export interface IAppRouterProps {
}

export const AppRouter = ({}: IAppRouterProps) => {
    return (
        <Routes>
            <Route path={ROUTES.Home} element={<MainView />} />
            <Route path={ROUTES.LanguageSelect} element={<LanguageSelect />} />

            <Route path={`${ROUTES.CandyMaze}/:batchId`} element={<CandyMaze />} />
            <Route path={`${ROUTES.VegasLoot}/:batchId`} element={<VegasLoot />} />
            <Route path={`${ROUTES.SantaSac}/:batchId`} element={<SantaSac />} />
            <Route path={`${ROUTES.IceBox}/:batchId`} element={<IceBox />} />
            <Route path={`${ROUTES.LuckyClover}/:batchId`} element={<LuckyClover />} />

            <Route path={ROUTES.Wallet} element={<Wallet />} />
            <Route path={ROUTES.InviteFriends} element={<InviteFriendList />} />

            <Route path={ROUTES.Profile} element={<Profile />} />

            <Route path="*" element={<Navigate to={ROUTES.Home} />} />
        </Routes>
    );
};
