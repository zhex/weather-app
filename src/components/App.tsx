import * as React from 'react';
import { TodayDetail } from './TodayDetail';

export class App extends React.Component {
    render() {
        return (
            <div>
                <TodayDetail city="auckland,nz" />
            </div>
        );
    }
}
