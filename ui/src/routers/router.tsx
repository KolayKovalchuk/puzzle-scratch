import { ILanguageSelectProps, LanguageSelect } from '@pages/LanguageSelect';
import { MainView } from '@pages/MainView';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routerConfig';
import { CandyMaze } from '@pages/CandyMaze/CandyMaze';

export interface IAppRouterProps {
    languageSelectProps: ILanguageSelectProps;
}

export const AppRouter = ({ languageSelectProps }: IAppRouterProps) => {
    return (
        <Routes>
            <Route path={ROUTES.Home} element={<MainView />} />
            <Route path={ROUTES.LanguageSelect} element={<LanguageSelect {...languageSelectProps}/>} />
            <Route path={ROUTES.CandyMaze} element={<CandyMaze />} />
            <Route path="*" element={<Navigate to={ROUTES.Home} />} />
        </Routes>
    );
};