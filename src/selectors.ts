import { StoreState } from "reducers";
import * as moment from 'moment';
import { IForecast } from "weather.interface";

export interface IForecastData {
    date: string;
    temp: number;
    tempMin: number;
    tempMax: number;
}

export const getForecasts = (state: StoreState): IForecastData[] => {
    const today = moment().startOf('day');
    const data: {[key: string]: IForecast[]} = {};

    if (!state.forecast.data.length) {
        return [];
    }

    for (const f of state.forecast.data) {
        const time = moment(f.dt_txt, 'YYYY-MM-DD HH:mm:ss');
        if (time.isSameOrAfter(today)) {
            const key = time.format('DD MMM');
            data[key] = data[key] ? data[key].concat(f) : [f];
        }
    }

    return Object.keys(data).map(key => {
        let temp = 0, tempMin = 0, tempMax = 0;

        for (const d of data[key]) {
            temp += d.main.temp;
            tempMin += d.main.temp_min;
            tempMax += d.main.temp_max;
        }

        return {
            date: key,
            temp: temp / data[key].length,
            tempMin: tempMin / data[key].length,
            tempMax: tempMax / data[key].length,
        };
    });
};
