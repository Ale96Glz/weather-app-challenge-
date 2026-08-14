import type { GeoLocation } from '../types/weather'

type NominatimStyleResponse = {
  city?: string
  locality?: string
  principalSubdivision?: string
  countryName?: string
  localityInfo?: {
    administrative?: Array<{ name: string; order: number }>
  }
}

/** Browser Geolocation API → coordinates */
export function getBrowserPosition(
  options: PositionOptions = {
    enableHighAccuracy: false,
    timeout: 8000,
    maximumAge: 5 * 60 * 1000,
  },
): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(error),
      options,
    )
  })
}

/**
 * Reverse geocode with BigDataCloud free client endpoint (no API key, CORS-friendly).
 * https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<GeoLocation> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    localityLanguage: 'en',
  })

  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?${params.toString()}`,
  )

  if (!response.ok) {
    throw new Error('Reverse geocoding failed')
  }

  const data = (await response.json()) as NominatimStyleResponse
  const name =
    data.city ||
    data.locality ||
    data.localityInfo?.administrative?.sort((a, b) => b.order - a.order)[0]
      ?.name ||
    'Current location'

  return {
    id: Math.round(latitude * 10000 + longitude * 10000),
    name,
    country: data.countryName ?? '',
    admin1: data.principalSubdivision,
    latitude,
    longitude,
    timezone: 'auto',
  }
}

export async function detectUserLocation(
  fallback: GeoLocation,
): Promise<GeoLocation> {
  try {
    const coords = await getBrowserPosition()
    try {
      return await reverseGeocode(coords.latitude, coords.longitude)
    } catch {
      return {
        id: Date.now(),
        name: 'Current location',
        country: '',
        latitude: coords.latitude,
        longitude: coords.longitude,
        timezone: 'auto',
      }
    }
  } catch {
    return fallback
  }
}
