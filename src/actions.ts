import axios, { AxiosError } from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface IAction {
    type: string;
    payload?: any;
}

export enum ActionTypes {
    FetchForecastStart = 'fetch_forecast_start',
    FetchForecastEnd = 'fetch_forecast_end',
    FetchForecastError = 'fetch_forecast_error',
    FetchWeatherStart = 'fetch_weather_start',
    FetchWeatherEnd = 'fetch_weather_end',
    FetchWeatherError = 'fetch_weather_error',
}

const urlBase = 'https://api.openweathermap.org/data/2.5';
const appid = '6dcaf78da0119cd635ef2982ddcdede5';

function createAction(type: string, payload?: any): IAction {
    return { type, payload };
}

function getForecast(city: string, units = 'metric') {
    const url = urlBase + '/forecast';
    return axios.get(url, { params: { appid, q: city, units } });
}

function getWeather(city: string, units = 'metric') {
    const url = urlBase + '/weather';
    return axios.get(url, { params: { appid, q: city, units } });
}

const startFetchForcast = () => async (dispatch: Dispatch<any>) =>
    dispatch(createAction(ActionTypes.FetchForecastStart));

const startFetchWeather = () => async (dispatch: Dispatch<any>) =>
    dispatch(createAction(ActionTypes.FetchWeatherStart));

export const fetchForecastData = (city: string) => (dispatch: Dispatch<any>) => {
    return dispatch(startFetchForcast())
        .then(() => getForecast(city))
        .then(
            (data: any) => dispatch(createAction(ActionTypes.FetchForecastEnd, data.data.list)),
            (err: AxiosError) => dispatch(createAction(ActionTypes.FetchForecastError, err.response!.data.message)),
        );
};

export const fetchWeatherData = (city: string) => (dispatch: Dispatch<any>) => {
    return dispatch(startFetchWeather())
        .then(() => getWeather(city))
        .then(
            (data: any) => dispatch(createAction(ActionTypes.FetchWeatherEnd, data.data)),
            (err: AxiosError) => dispatch(createAction(ActionTypes.FetchWeatherError, err.response!.data.message)),
        )
};
