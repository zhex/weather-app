import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import { reducers } from 'reducers';

export function configureStore(initState = {}): Store<any> {
    const composeKey = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' && typeof window === 'object' && (window as any)[composeKey]
            ? (window as any)[composeKey]({})
            : compose;

    const store = createStore(reducers, initState, composeEnhancers());
    return store;
}
