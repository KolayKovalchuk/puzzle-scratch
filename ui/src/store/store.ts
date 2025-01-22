import { configureStore } from '@reduxjs/toolkit';
import { configApi } from '@services/api/apiLogin.service';
import { userReducer } from './reducers/user.reducer';
import { localizationReducer } from './reducers/localization.reducer';
import { appStateReducer } from './reducers/appState.reducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        localization: localizationReducer,
        appState: appStateReducer,
        [configApi.reducerPath]: configApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(configApi.middleware),
});

// setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;