export type TemperatureUnit = 'celsius' | 'fahrenheit'
export type WindUnit = 'kmh' | 'mph'
export type PrecipitationUnit = 'mm' | 'in'

export type WeatherUnits = {
  temperature: TemperatureUnit
  wind: WindUnit
  precipitation: PrecipitationUnit
}

export type GeoLocation = {
  id: number
  name: string
  country: string
  admin1?: string
  latitude: number
  longitude: number
  timezone: string
}

export type CurrentWeather = {
  time: string
  temperature: number
  apparentTemperature: number
  humidity: number
  windSpeed: number
  precipitation: number
  weatherCode: number
}

export type DailyWeather = {
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
}

export type HourlyWeather = {
  time: string
  temperature: number
  weatherCode: number
}

export type Forecast = {
  timezone: string
  current: CurrentWeather
  daily: DailyWeather[]
  hourly: HourlyWeather[]
  units: {
    temperature: string
    wind: string
    precipitation: string
  }
}
