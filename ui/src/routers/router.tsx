import { MainView } from '@components/MainView';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routerConfig';
import { ILanguageSelectProps, LanguageSelect } from '@components/LanguageSelect/LanguageSelect';

export interface IAppRouterProps {
    languageSelectProps: ILanguageSelectProps;
}

export const AppRouter = ({ languageSelectProps }: IAppRouterProps) => {
    return (
        <Routes>
            <Route path={ROUTES.Home} element={<MainView />} />
            <Route path={ROUTES.LanguageSelect} element={<LanguageSelect {...languageSelectProps}/>} />
            <Route path="*" element={<Navigate to={ROUTES.Home} />} />
        </Routes>
    );
};