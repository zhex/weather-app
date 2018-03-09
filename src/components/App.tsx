import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

export interface AppProps {
    store: Store<any>;
}

export const App: React.SFC<AppProps> = ({ store, children }) => (
    <Provider store={store}>{children}</Provider>
);
