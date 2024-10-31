import { configureStore } from '@reduxjs/toolkit';
import { configApi } from '@services/api/apiService';
import { userReducer } from './reducers/user.reducer';
import { localizationReducer } from './reducers/localization.reducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        localization: localizationReducer,
        [configApi.reducerPath]: configApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(configApi.middleware),
});

// setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;