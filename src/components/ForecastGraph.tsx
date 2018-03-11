import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions';
import { StoreState, ForecastState } from 'reducers';
import ReactEcharts from 'echarts-for-react';
import * as moment from 'moment';
import { IForecast } from 'weather.interface';

export interface ForcastGraphProps {
    forecast?: ForecastState;
    today?: IForecast[],
    fetchData?: (city: string) => any;
    city: string;
}

const mapStates = (state: StoreState) => ({
    forecast: state.forecast,
    today: state.forecast.data.filter(f => f.dt_txt.split(' ')[0] === moment().format('YYYY-MM-DD')),
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
        const { forecast, today } = this.props;

        if (forecast!.loading) {
            return 'loading ....';
        }

        const option = {
            title: {
                text: 'Today',
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
                    data: today!.map(f => moment(f.dt_txt, 'YYYY-MM-DD HH:mm:ss').format('HH:SS')),
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
                    data: today!.map(f => f.main.temp),
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
