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
                <form onSubmit={this.search}>
                    <div className="row mb-3 mt-3">
                        <div className="input-group col-12 col-md-4">
                            <input
                                ref={(el: HTMLInputElement) => this.input = el}
                                className="form-control"
                                placeholder="Search City"
                                defaultValue={city || ''}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

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

    private search = (e: React.FormEvent<any>) => {
        e.preventDefault();
        this.setState({ city: this.input!.value });
    }
}
