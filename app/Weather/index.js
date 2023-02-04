/* eslint-disable camelcase */
const axios = require('axios');
const set = require('./sets.json');

class Weather {
    static #api_endpoint = 'https://api.openweathermap.org/data/2.5/weather';

    static #api_endpoint_air_pollution = 'http://api.openweathermap.org/data/2.5/air_pollution';

    static #geo_coding_api_endpoint = 'http://api.openweathermap.org/geo/1.0/direct';

    constructor(obj) {
        const {
            name,
            lat,
            lon,
        } = obj;
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

    static getAQIValue(aqi) {
        switch (aqi) {
            case 1:
                return '매우좋음';
            case 2:
                return '좋음';
            case 3:
                return '보통';
            case 4:
                return '나쁨';
            case 5:
                return '매우나쁨';
            default:
                return 'Unknow AQI Value';
        }
    }

    async getAirPollutionInfo(lat = this.lat, lon = this.lon) {
        try {
            const reqParam = {
                lat,
                lon,
                appid: 'c4c8d1d6bd0625dda14016bdc1ea6627',
            };
            const res = await axios.get(`${Weather.#api_endpoint_air_pollution}?${new URLSearchParams(reqParam)}`);
            const {

                main: { aqi },
                components: {
                    co,
                    pm2_5,
                    pm10,
                },
                dt,
            } = res.data.list[0];
            return {
                co,
                pm2_5,
                pm10,
                aqi: Weather.getAQIValue(aqi),
                measuredTime_airpollution: dt,
            };
        } catch (err) {
            return false;
        }
    }

    async getWeatherInfo(lat = this.lat, lon = this.lon, name = this.name) {
        // units : this option make temperature into celcius(Default : kalvin)
        const reqParam = {
            lat,
            lon,
            appid: 'c4c8d1d6bd0625dda14016bdc1ea6627',
            units: 'metric',
        };
        const res = await axios.get(`${Weather.#api_endpoint}?${new URLSearchParams(reqParam)}`);
        const {
            weather: [
                {
                    main: weather,
                    description: weatherdescription,
                    icon: weather_icon,
                },
            ],
            main: {
                temp: temperature,
                feels_like: temperature_humanfeel,
                temp_min,
                temp_max,
                pressure,
                humidity,
            },
            wind: {
                speed: windspeed,
            },
            clouds: {
                all: cloudpercentage,
            },
            dt: measuredTime,
            sys: {
                sunrise,
                sunset,
            },
        } = res.data;
        const airStatus = await this.getAirPollutionInfo(lat, lon);
        const returnValue = {
            name,
            weather,
            weather_icon: `http://openweathermap.org/img/wn/${weather_icon.includes('n') ? weather_icon.replace('n', 'd') : weather_icon}@2x.png`,
            description: weatherdescription,
            temperature,
            temperature_humanfeel,
            temp_min,
            temp_max,
            pressure,
            humidity,
            windspeed,
            cloudpercentage,
            sunrise,
            sunset,
            measuredTime,
            pm2_5: airStatus.pm2_5,
            pm10: airStatus.pm10,
            co: airStatus.co,
            aqi: airStatus.aqi,
            measuredTime_airpollution: airStatus.measuredTime_airpollution,
        };
        if (weather === 'Rain') {
            const {
                rain: {
                    '1h': rainPerHour,
                },
            } = res.data;
            returnValue.rain_per_hour = rainPerHour;
        }

        if (weather === 'Snow') {
            const {
                snow: {
                    '1h': snowPerHour,
                },
            } = res.data;
            returnValue.snow_per_hour = snowPerHour;
        }
        return returnValue;
    }
}

module.exports = {
    Weather,
    set,
};
