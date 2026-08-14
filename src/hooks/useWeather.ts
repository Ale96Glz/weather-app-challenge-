import { useCallback, useEffect, useState } from 'react'
import { detectUserLocation } from '../services/geolocation'
import { getForecast, searchCities } from '../services/weatherApi'
import type { Forecast, GeoLocation, WeatherUnits } from '../types/weather'

const DEFAULT_LOCATION: GeoLocation = {
  id: 2950159,
  name: 'Berlin',
  country: 'Germany',
  admin1: 'Berlin',
  latitude: 52.52,
  longitude: 13.41,
  timezone: 'Europe/Berlin',
}

type UseWeatherResult = {
  location: GeoLocation | null
  forecast: Forecast | null
  selectedDay: string
  setSelectedDay: (day: string) => void
  isLoading: boolean
  isSearching: boolean
  error: string | null
  searchResults: GeoLocation[]
  search: (query: string) => Promise<void>
  selectLocation: (location: GeoLocation) => void
  clearSearchResults: () => void
  retry: () => void
}

export function useWeather(units: WeatherUnits): UseWeatherResult {
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [forecast, setForecast] = useState<Forecast | null>(null)
  const [selectedDay, setSelectedDay] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<GeoLocation[]>([])
  const [reloadToken, setReloadToken] = useState(0)
  const [hasResolvedInitialLocation, setHasResolvedInitialLocation] =
    useState(false)

  const loadForecast = useCallback(
    async (target: GeoLocation) => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getForecast(target.latitude, target.longitude, units)
        setForecast(data)
        setSelectedDay((current) => {
          if (current && data.daily.some((day) => day.date === current)) {
            return current
          }
          return data.daily[0]?.date ?? ''
        })
      } catch (err) {
        setForecast(null)
        setError(err instanceof Error ? err.message : 'Failed to load weather')
      } finally {
        setIsLoading(false)
      }
    },
    [units],
  )

  // Detect user location once on mount (fallback: Berlin)
  useEffect(() => {
    let cancelled = false

    async function initLocation() {
      setIsLoading(true)
      const detected = await detectUserLocation(DEFAULT_LOCATION)
      if (cancelled) return
      setLocation(detected)
      setHasResolvedInitialLocation(true)
    }

    void initLocation()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!hasResolvedInitialLocation || !location) return
    void loadForecast(location)
  }, [location, loadForecast, reloadToken, hasResolvedInitialLocation])

  async function search(query: string) {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setError('Please enter at least 2 characters')
      return
    }

    setIsSearching(true)
    setError(null)

    try {
      const results = await searchCities(trimmed)
      if (results.length === 0) {
        setSearchResults([])
        setError('No cities found. Try another search.')
        return
      }

      if (results.length === 1) {
        setSearchResults([])
        setLocation(results[0])
        return
      }

      setSearchResults(results)
    } catch (err) {
      setSearchResults([])
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setIsSearching(false)
    }
  }

  function selectLocation(next: GeoLocation) {
    setSearchResults([])
    setLocation(next)
  }

  function clearSearchResults() {
    setSearchResults([])
  }

  function retry() {
    if (!location) {
      setHasResolvedInitialLocation(false)
      setIsLoading(true)
      void detectUserLocation(DEFAULT_LOCATION).then((detected) => {
        setLocation(detected)
        setHasResolvedInitialLocation(true)
      })
      return
    }
    setReloadToken((token) => token + 1)
  }

  return {
    location,
    forecast,
    selectedDay,
    setSelectedDay,
    isLoading,
    isSearching,
    error,
    searchResults,
    search,
    selectLocation,
    clearSearchResults,
    retry,
  }
}
