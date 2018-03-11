import { combineReducers } from 'redux';
import { IAction, ActionTypes } from './actions';
import { IForecast, IWeather } from 'weather.interface';

export interface BaseState {
    loading: boolean;
    error: string | null;
}

export interface ForecastState extends BaseState {
    data: IForecast[];
}

export interface WeatherState extends BaseState {
    data: IWeather | null;
}

export interface StoreState {
    forecast: ForecastState;
    weather: WeatherState;
}

const initForecastState: ForecastState = {
    data: [],
    loading: true,
    error: null,
};

const initWeatherState: WeatherState = {
    data: null,
    loading: true,
    error: null,
};

function weather(state = initWeatherState, action: IAction) {
    switch (action.type) {
        case ActionTypes.FetchWeatherStart:
            return { ...state, loading: true };
        case ActionTypes.FetchWeatherEnd:
            return { ...state, loading: false, error: false, data: action.payload };
        case ActionTypes.FetchWeatherError:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function forecast(state = initForecastState, action: IAction) {
    switch (action.type) {
        case ActionTypes.FetchForecastStart:
            return { ...state, loading: true };
        case ActionTypes.FetchForecastEnd:
            return { ...state, loading: false, error: false, data: action.payload };
        case ActionTypes.FetchForecastError:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const reducers = combineReducers({ weather, forecast });
