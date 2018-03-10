export interface IForecast {
    dt: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: { all: number };
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        pod: string;
    };
    dt_txt: string;
}

export interface IWeather {
    base: string;
    clouds: {
        all: number;
    },
    cod: number;
    coord: {
        lon: number;
        lat: number;
    },
    dt: number;
    id: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    },
    name: string;
    sys: {
        type: number;
        id: number;
        message: number;
        sunrise: number;
        sunset: number;
        country: string;
    },
    visibility: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
    };
}
