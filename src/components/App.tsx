import * as React from 'react';
import { TodayDetail } from './TodayDetail';
import { ForcastGraph } from './ForecastGraph';

export class App extends React.Component {
    state = {
        city: 'auckland,nz',
    };

    private input?: HTMLInputElement;

    render() {
        const { city } = this.state;

        return (
            <div className="container">
                <div className="mt-4 mb-4 form-inline">
                    <div className="form-group mr-2">
                        <input
                            ref={(el: HTMLInputElement) => this.input = el}
                            className="form-control"
                            placeholder="Search City"
                            defaultValue={city || ''}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={this.search}>Search</button>
                </div>

                <div className="row">
                    <div className="col-12 col-md-4">
                        { city && <TodayDetail city={city} /> }
                    </div>

                    <div className="col-12 col-md-8">
                        { city && <ForcastGraph city={city} /> }
                    </div>
                </div>
            </div>
        );
    }

    private search = () => {
        this.setState({ city: this.input!.value });
    }
}
