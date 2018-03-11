import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions';
import { StoreState, ForecastState } from 'reducers';
import ReactEcharts from 'echarts-for-react';
import * as moment from 'moment';
import { IForecast } from 'weather.interface';
import { getForecasts, IForecastData } from 'selectors';

export interface ForcastGraphProps {
    forecast?: IForecastData[];
    fetchData?: (city: string) => any;
    loading?: boolean;
    error?: string | null;
    city: string;
}

const mapStates = (state: StoreState) => ({
    loading: state.forecast.loading,
    error: state.forecast.error,
    forecast: getForecasts(state),
});
const mapActions = (dispatch: Dispatch<any>) => bindActionCreators({ fetchData: actions.fetchForecastData }, dispatch);

@(connect(mapStates, mapActions) as any)
export class ForcastGraph extends React.Component<ForcastGraphProps> {
    componentDidMount() {
        this.props.fetchData!(this.props.city);
    }

    componentWillReceiveProps(nextProps: ForcastGraphProps) {
        if (nextProps.city !== this.props.city) {
            this.props.fetchData!(nextProps.city);
        }
    }

    render() {
        const { forecast, loading, error } = this.props;

        if (loading) {
            return 'loading ....';
        }

        if (error) {
            return error;
        }

        const option = {
            title: {
                text: 'Temperatures',
            },
            tooltip: {
                trigger: 'axis',
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: false
                    },
                    data: forecast!.map(f => f.date),
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C',
                    },
                },
            ],
            series: [
                {
                    name: 'Temperature',
                    type: 'line',
                    data: forecast!.map(f => f.temp.toFixed(2)),
                    markPoint: {
                        data: [{ type: 'max', name: 'Max' }],
                    },
                    color: 'blue'
                },
            ],
        };
        return <ReactEcharts option={option} />;
    }
}
