import { useMemo, useState, type FormEvent } from 'react'
import './App.css'
import logo from './assets/images/logo.svg'
import iconSearch from './assets/images/icon-search.svg'
import iconUnits from './assets/images/icon-units.svg'
import iconDropdown from './assets/images/icon-dropdown.svg'
import iconLoading from './assets/images/icon-loading.svg'
import { WeatherStat } from './components/WeatherStat'
import { DailyForecastItem } from './components/DailyForecastItem'
import { HourlyForecastItem } from './components/HourlyForecastItem'
import { Error404 } from './components/Error404'
import { useWeather } from './hooks/useWeather'
import { getWeatherIcon, getWeatherLabel } from './utils/getWeatherIcon'
import {
  formatDayLong,
  formatDayShort,
  formatFullDate,
  formatHour,
  formatHumidity,
  formatPrecipitation,
  formatTemperature,
  formatTemperatureShort,
  formatWind,
  getDateKey,
  locationLabel,
} from './utils/formatWeather'
import type {
  PrecipitationUnit,
  TemperatureUnit,
  WindUnit,
} from './types/weather'

function App() {
  const [unitsOpen, setUnitsOpen] = useState(false)
  const [temperature, setTemperature] = useState<TemperatureUnit>('celsius')
  const [wind, setWind] = useState<WindUnit>('kmh')
  const [precipitation, setPrecipitation] = useState<PrecipitationUnit>('mm')
  const [query, setQuery] = useState('')

  const units = useMemo(
    () => ({ temperature, wind, precipitation }),
    [temperature, wind, precipitation],
  )

  const {
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
  } = useWeather(units)

  const isMetric =
    temperature === 'celsius' && wind === 'kmh' && precipitation === 'mm'

  function toggleUnitsPanel() {
    setUnitsOpen((open) => !open)
  }

  function switchUnitSystem() {
    if (isMetric) {
      setTemperature('fahrenheit')
      setWind('mph')
      setPrecipitation('in')
    } else {
      setTemperature('celsius')
      setWind('kmh')
      setPrecipitation('mm')
    }
  }

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearSearchResults()
    await search(query)
  }

  const weatherStats = forecast
    ? [
        {
          label: 'Feels like',
          value: formatTemperature(
            forecast.current.apparentTemperature,
            forecast.units.temperature,
          ),
        },
        {
          label: 'Humidity',
          value: formatHumidity(forecast.current.humidity),
        },
        {
          label: 'Wind',
          value: formatWind(forecast.current.windSpeed, forecast.units.wind),
        },
        {
          label: 'Precipitation',
          value: formatPrecipitation(
            forecast.current.precipitation,
            forecast.units.precipitation,
          ),
        },
      ]
    : []

  const hourlyForDay = useMemo(() => {
    if (!forecast || !selectedDay) return []

    return forecast.hourly
      .filter((hour) => getDateKey(hour.time) === selectedDay)
      .slice(0, 8)
  }, [forecast, selectedDay])

  const placeName = location
    ? locationLabel(location.name, location.country, location.admin1)
    : '—'

  return (
    <>
      <div className="min-h-screen w-full p-4 desktop:px-12 desktop:py-6 flex flex-col">
        <header className="flex justify-between items-center gap-3">
          <img src={logo} alt="Weather App" className="h-7 w-auto" />

          <div className="relative">
            <button
              type="button"
              id="units-button"
              aria-expanded={unitsOpen}
              aria-controls="units-panel"
              aria-haspopup="true"
              onClick={toggleUnitsPanel}
              className="flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-2 text-sm text-neutral-0"
            >
              <img src={iconUnits} alt="" aria-hidden="true" className="h-4 w-4" />
              Units
              <img
                src={iconDropdown}
                alt=""
                aria-hidden="true"
                className={`h-3 w-3 transition-transform ${unitsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {unitsOpen && (
              <div
                id="units-panel"
                className="absolute right-0 z-10 mt-2 w-56 rounded-xl bg-neutral-800 p-2 shadow-lg border border-neutral-600"
              >
                <button
                  type="button"
                  onClick={switchUnitSystem}
                  className="mb-2 w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-0 hover:bg-neutral-700"
                >
                  {isMetric ? 'Switch to Imperial' : 'Switch to Metric'}
                </button>

                <fieldset className="mb-2">
                  <legend className="px-3 py-1 text-xs text-neutral-300">Temperature</legend>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-0 hover:bg-neutral-700">
                    <input
                      type="radio"
                      name="temperature"
                      value="celsius"
                      checked={temperature === 'celsius'}
                      onChange={() => setTemperature('celsius')}
                    />
                    Celsius (°C)
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-0 hover:bg-neutral-700">
                    <input
                      type="radio"
                      name="temperature"
                      value="fahrenheit"
                      checked={temperature === 'fahrenheit'}
                      onChange={() => setTemperature('fahrenheit')}
                    />
                    Fahrenheit (°F)
                  </label>
                </fieldset>

                <fieldset className="mb-2">
                  <legend className="px-3 py-1 text-xs text-neutral-300">Wind Speed</legend>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-0 hover:bg-neutral-700">
                    <input
                      type="radio"
                      name="wind"
                      value="kmh"
                      checked={wind === 'kmh'}
                      onChange={() => setWind('kmh')}
                    />
                    km/h
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-0 hover:bg-neutral-700">
                    <input
                      type="radio"
                      name="wind"
                      value="mph"
                      checked={wind === 'mph'}
                      onChange={() => setWind('mph')}
                    />
                    mph
                  </label>
                </fieldset>

                <fieldset>
                  <legend className="px-3 py-1 text-xs text-neutral-300">Precipitation</legend>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-0 hover:bg-neutral-700">
                    <input
                      type="radio"
                      name="precipitation"
                      value="mm"
                      checked={precipitation === 'mm'}
                      onChange={() => setPrecipitation('mm')}
                    />
                    Millimeters (mm)
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-0 hover:bg-neutral-700">
                    <input
                      type="radio"
                      name="precipitation"
                      value="in"
                      checked={precipitation === 'in'}
                      onChange={() => setPrecipitation('in')}
                    />
                    Inches (in)
                  </label>
                </fieldset>
              </div>
            )}
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-8 mt-12">
          {error && !forecast && !isLoading ? (
            <Error404 onRetry={retry} />
          ) : (
            <>
              <section
                aria-labelledby="search-heading"
                className="flex flex-col gap-6 items-center text-center"
              >
                <h1 id="search-heading" className="text-[3.25rem] leading-none font-display px-2">
                  How's the sky looking today?
                </h1>

                <form
                  role="search"
                  onSubmit={handleSearch}
                  className="relative flex flex-col gap-3 w-full max-w-md mx-auto tablet:max-w-xl tablet:flex-row tablet:items-stretch tablet:gap-4 desktop:max-w-2xl"
                >
                  <label
                    htmlFor="city"
                    className="flex items-center gap-2 rounded-xl bg-neutral-800 px-5 py-4 cursor-text w-full"
                  >
                    <img src={iconSearch} alt="" aria-hidden="true" className="h-5 w-5 shrink-0" />
                    <input
                      id="city"
                      type="search"
                      name="city"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search for a place..."
                      autoComplete="off"
                      className="min-w-0 flex-1 bg-transparent border-0 outline-none text-base text-neutral-0 placeholder:text-neutral-200"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="bg-blue-500 px-6 py-4 rounded-xl text-base font-medium hover:bg-blue-700 transition-colors tablet:shrink-0 disabled:opacity-70"
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </button>

                  {searchResults.length > 0 && (
                    <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-neutral-600 bg-neutral-800 text-left shadow-lg tablet:right-auto tablet:w-[calc(100%-8rem)]">
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setQuery(
                                locationLabel(result.name, result.country, result.admin1),
                              )
                              selectLocation(result)
                            }}
                            className="w-full px-5 py-3 text-left text-sm text-neutral-0 hover:bg-neutral-700"
                          >
                            {locationLabel(result.name, result.country, result.admin1)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </form>

                {error && forecast && (
                  <p className="text-sm text-orange-500" role="alert">
                    {error}
                  </p>
                )}
              </section>

              {isLoading && (
                <div className="flex flex-col items-center gap-3 py-16 text-neutral-200">
                  <img src={iconLoading} alt="" className="h-8 w-8 animate-spin" />
                  <p>Loading weather...</p>
                </div>
              )}

              {!isLoading && forecast && location && (
                <div className="md:grid md:grid-cols-2 md:gap-6 md:items-stretch md:grid-rows-1">
                  <div className="min-w-0 min-h-0 flex flex-col gap-5">
                    <section aria-labelledby="current-heading" className="flex flex-col gap-5">
                      <article className="bg-today rounded-2xl px-6 py-10 flex flex-col gap-4 md:grid md:grid-cols-2 md:items-center md:px-5 md:py-8">
                        <div className="flex flex-col gap-1 text-center md:text-left md:gap-2 min-w-0">
                          <h2
                            id="current-heading"
                            className="text-[1.75rem] leading-tight font-sans font-bold md:text-xl desktop:text-2xl wrap-break-word"
                          >
                            {placeName}
                          </h2>
                          <p className="text-sm text-neutral-200 font-medium md:text-sm desktop:text-base">
                            <time dateTime={forecast.current.time}>
                              {formatFullDate(forecast.current.time, forecast.timezone)}
                            </time>
                          </p>
                        </div>
                        <div className="flex justify-between items-center gap-4 px-2 md:justify-end md:gap-3 md:px-0 min-w-0">
                          <img
                            src={getWeatherIcon(forecast.current.weatherCode)}
                            alt={getWeatherLabel(forecast.current.weatherCode)}
                            className="w-28 h-28 object-contain shrink-0 md:w-20 md:h-20 desktop:w-28 desktop:h-28"
                          />
                          <p className="text-7xl font-sans italic font-semibold text-neutral-0 tracking-tight md:text-5xl desktop:text-7xl">
                            {formatTemperatureShort(forecast.current.temperature)}
                          </p>
                        </div>
                      </article>

                      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {weatherStats.map((stat) => (
                          <WeatherStat key={stat.label} label={stat.label} value={stat.value} />
                        ))}
                      </dl>
                    </section>

                    <section aria-labelledby="daily-heading" className="flex flex-col gap-5">
                      <h2 id="daily-heading" className="text-xl font-semibold">
                        Daily forecast
                      </h2>
                      <ul className="grid grid-cols-3 gap-4 md:grid-cols-7 md:gap-1.5 desktop:gap-3">
                        {forecast.daily.map((day) => (
                          <DailyForecastItem
                            key={day.date}
                            day={formatDayShort(day.date, forecast.timezone)}
                            icon={getWeatherIcon(day.weatherCode)}
                            high={formatTemperature(
                              day.temperatureMax,
                              forecast.units.temperature,
                            )}
                            low={formatTemperature(
                              day.temperatureMin,
                              forecast.units.temperature,
                            )}
                          />
                        ))}
                      </ul>
                    </section>
                  </div>

                  <div className="min-w-0 min-h-0 mt-4 md:mt-0 md:h-0 md:min-h-full md:overflow-hidden flex flex-col">
                    <section
                      aria-labelledby="hourly-heading"
                      className="bg-neutral-800 rounded-xl p-4 shadow-md border border-neutral-600 flex flex-1 flex-col min-h-0 md:p-5"
                    >
                      <div className="flex justify-between items-center gap-3 min-w-0 shrink-0">
                        <h2 id="hourly-heading" className="text-xl font-semibold min-w-0">
                          Hourly forecast
                        </h2>
                        <div className="relative shrink-0">
                          <select
                            name="day"
                            id="day"
                            value={selectedDay}
                            onChange={(event) => setSelectedDay(event.target.value)}
                            className="appearance-none max-w-38 rounded-lg bg-neutral-600 border border-neutral-600 px-3 py-2 pr-9 text-sm font-sans text-neutral-0 outline-none cursor-pointer hover:bg-neutral-700 focus:border-neutral-300"
                          >
                            {forecast.daily.map((day) => (
                              <option key={day.date} value={day.date}>
                                {formatDayLong(day.date, forecast.timezone)}
                              </option>
                            ))}
                          </select>
                          <img
                            src={iconDropdown}
                            alt=""
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2"
                          />
                        </div>
                      </div>
                      <ul className="mt-4 flex flex-1 flex-col gap-3 min-h-0 overflow-hidden">
                        {hourlyForDay.map((hour) => (
                          <HourlyForecastItem
                            key={hour.time}
                            time={formatHour(hour.time, forecast.timezone)}
                            icon={getWeatherIcon(hour.weatherCode)}
                            temperature={formatTemperature(
                              hour.temperature,
                              forecast.units.temperature,
                            )}
                          />
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        <footer className="mt-auto border-t border-neutral-600 pt-6 pb-2 text-center text-sm text-neutral-300">
          <p>
            Challenge by{' '}
            <a
              href="https://www.frontendmentor.io?ref=challenge"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-neutral-0 underline-offset-2 transition-colors hover:text-orange-500 hover:underline"
            >
              Frontend Mentor
            </a>
            . Coded by{' '}
            <a
              href="https://github.com/Ale96Glz"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-neutral-0 underline-offset-2 transition-colors hover:text-orange-500 hover:underline"
            >
              Alejandro González Osorio
            </a>
          </p>
        </footer>
      </div>
    </>
  )
}

export default App
