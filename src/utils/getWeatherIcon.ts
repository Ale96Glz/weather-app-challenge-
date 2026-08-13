import iconSunny from '../assets/images/icon-sunny.webp'
import iconPartlyCloudy from '../assets/images/icon-partly-cloudy.webp'
import iconOvercast from '../assets/images/icon-overcast.webp'
import iconFog from '../assets/images/icon-fog.webp'
import iconDrizzle from '../assets/images/icon-drizzle.webp'
import iconRain from '../assets/images/icon-rain.webp'
import iconSnow from '../assets/images/icon-snow.webp'
import iconStorm from '../assets/images/icon-storm.webp'

export function getWeatherIcon(weatherCode: number): string {
  if (weatherCode === 0) return iconSunny
  if (weatherCode === 1 || weatherCode === 2) return iconPartlyCloudy
  if (weatherCode === 3) return iconOvercast
  if (weatherCode === 45 || weatherCode === 48) return iconFog
  if (weatherCode >= 51 && weatherCode <= 57) return iconDrizzle
  if (
    (weatherCode >= 61 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return iconRain
  }
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return iconSnow
  }
  if (weatherCode >= 95 && weatherCode <= 99) return iconStorm

  return iconSunny
}

export function getWeatherLabel(weatherCode: number): string {
  if (weatherCode === 0) return 'Clear sky'
  if (weatherCode === 1) return 'Mainly clear'
  if (weatherCode === 2) return 'Partly cloudy'
  if (weatherCode === 3) return 'Overcast'
  if (weatherCode === 45 || weatherCode === 48) return 'Fog'
  if (weatherCode >= 51 && weatherCode <= 57) return 'Drizzle'
  if (
    (weatherCode >= 61 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return 'Rain'
  }
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return 'Snow'
  }
  if (weatherCode >= 95 && weatherCode <= 99) return 'Thunderstorm'

  return 'Clear sky'
}
