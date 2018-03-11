import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions';
import { StoreState, WeatherState } from 'reducers';
import { IWeather } from 'weather.interface';
import * as moment from 'moment';

export interface TodayDetailProps {
    weather?: WeatherState;
    fetchData?: (city: string) => any;
    city: string;
}
const mapStates = (state: StoreState) => ({ weather: state.weather });
const mapActions = (dispatch: Dispatch<any>) => bindActionCreators({ fetchData: actions.fetchWeatherData }, dispatch);

@(connect(mapStates, mapActions) as any)
export class TodayDetail extends React.Component<TodayDetailProps> {
    componentDidMount() {
        this.props.fetchData!(this.props.city);
    }

    componentWillReceiveProps(nextProps: TodayDetailProps) {
        if (nextProps.city !== this.props.city) {
            this.props.fetchData!(nextProps.city);
        }
    }

    render() {
        const { weather } = this.props;
        const data = weather!.data!;

        if (weather!.loading) {
            return 'loading....';
        }
        return this.renderDetail(data);
    }

    private renderDetail(data: IWeather) {
        return (
            <div className="weather-detail">
                <h1>{data.name}</h1>
                <h3>
                    <img src={`//openweathermap.org/img/w/${data.weather[0].icon}.png`} />
                    {data.main.temp} °C
                </h3>

                <p>{data.weather[0].description}</p>

                <table className="table table-sm table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th>Wind</th>
                            <td>
                                Light breeze, {data.wind.speed} m/s, South-southwest ( {data.wind.deg} )
                            </td>
                        </tr>
                        <tr>
                            <th>Cloudiness</th>
                            <td>{data.weather[0].description}</td>
                        </tr>
                        <tr>
                            <th>Pressure</th>
                            <td>{data.main.pressure} hpa</td>
                        </tr>
                        <tr>
                            <th>Humidity</th>
                            <td>{data.main.humidity}%</td>
                        </tr>
                        <tr>
                            <th>Sunrise</th>
                            <td>{moment(data.sys.sunrise).format('HH:mm')}</td>
                        </tr>
                        <tr>
                            <th>Sunset</th>
                            <td>{moment(data.sys.sunset).format('HH:mm')}</td>
                        </tr>
                        <tr>
                            <th>Geo coords</th>
                            <td>
                                [{data.coord.lat}, {data.coord.lon}]
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
