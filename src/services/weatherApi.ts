import type {
  Forecast,
  GeoLocation,
  WeatherUnits,
} from '../types/weather'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

type GeocodingApiResponse = {
  results?: Array<{
    id: number
    name: string
    latitude: number
    longitude: number
    timezone: string
    country?: string
    country_code?: string
    admin1?: string
  }>
}

type ForecastApiResponse = {
  timezone: string
  current_units: {
    temperature_2m: string
    wind_speed_10m: string
    precipitation: string
  }
  current: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    weather_code: number
    wind_speed_10m: number
    precipitation: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Weather API error (${response.status})`)
  }

  const data = (await response.json()) as T & { error?: boolean; reason?: string }

  if (data && typeof data === 'object' && 'error' in data && data.error) {
    throw new Error(data.reason ?? 'Weather API request failed')
  }

  return data
}

export async function searchCities(
  name: string,
  count = 5,
): Promise<GeoLocation[]> {
  const query = name.trim()
  if (query.length < 2) return []

  const params = new URLSearchParams({
    name: query,
    count: String(count),
    language: 'en',
  })

  const data = await request<GeocodingApiResponse>(
    `${GEOCODING_URL}?${params.toString()}`,
  )

  return (data.results ?? []).map((result) => ({
    id: result.id,
    name: result.name,
    country: result.country ?? result.country_code ?? '',
    admin1: result.admin1,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  }))
}

export async function getForecast(
  latitude: number,
  longitude: number,
  units: WeatherUnits,
): Promise<Forecast> {
  const precipitationUnit = units.precipitation === 'in' ? 'inch' : 'mm'

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    timezone: 'auto',
    forecast_days: '7',
    temperature_unit: units.temperature,
    wind_speed_unit: units.wind,
    precipitation_unit: precipitationUnit,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
      'precipitation',
    ].join(','),
    hourly: ['temperature_2m', 'weather_code'].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
    ].join(','),
  })

  const data = await request<ForecastApiResponse>(
    `${FORECAST_URL}?${params.toString()}`,
  )

  return {
    timezone: data.timezone,
    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
    },
    daily: data.daily.time.map((date, index) => ({
      date,
      weatherCode: data.daily.weather_code[index],
      temperatureMax: data.daily.temperature_2m_max[index],
      temperatureMin: data.daily.temperature_2m_min[index],
    })),
    hourly: data.hourly.time.map((time, index) => ({
      time,
      temperature: data.hourly.temperature_2m[index],
      weatherCode: data.hourly.weather_code[index],
    })),
    units: {
      temperature: data.current_units.temperature_2m,
      wind: data.current_units.wind_speed_10m,
      precipitation: data.current_units.precipitation,
    },
  }
}
