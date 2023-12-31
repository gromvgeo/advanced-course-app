import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { $api } from '@/shared/api/api';
import { userReducer } from '@/entities/User';
import { UIReducer } from '@/features/UI';
import { rtkApi } from '@/shared/api/rtkApi';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        ui: UIReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducer);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                    },
                },
            }).concat(rtkApi.middleware),
    });

    // @ts-ignore TODO
    store.reducerManager = reducerManager;

    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
