export function formatTemperature(value: number, unitLabel: string): string {
  const rounded = Math.round(value)
  // unitLabel from API is like "°C" or "°F"
  if (unitLabel.includes('°')) {
    return `${rounded}${unitLabel}`
  }
  return `${rounded}°`
}

export function formatTemperatureShort(value: number): string {
  return `${Math.round(value)}°`
}

export function formatWind(value: number, unitLabel: string): string {
  return `${Math.round(value)} ${unitLabel}`
}

export function formatPrecipitation(value: number, unitLabel: string): string {
  const rounded = Number.isInteger(value) ? value : Number(value.toFixed(1))
  return `${rounded} ${unitLabel}`
}

export function formatHumidity(value: number): string {
  return `${Math.round(value)}%`
}

export function formatFullDate(isoDateTime: string, timeZone?: string): string {
  const date = new Date(isoDateTime)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone,
  }).format(date)
}

export function formatDayShort(isoDate: string, timeZone?: string): string {
  const date = new Date(`${isoDate}T12:00:00`)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone,
  }).format(date)
}

export function formatDayLong(isoDate: string, timeZone?: string): string {
  const date = new Date(`${isoDate}T12:00:00`)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    timeZone,
  }).format(date)
}

export function formatHour(isoDateTime: string, timeZone?: string): string {
  const date = new Date(isoDateTime)
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone,
  }).format(date)
}

export function getDateKey(isoDateTime: string): string {
  return isoDateTime.slice(0, 10)
}

export function locationLabel(name: string, country: string, admin1?: string): string {
  if (admin1 && admin1 !== name) {
    return `${name}, ${admin1}`
  }
  return country ? `${name}, ${country}` : name
}
