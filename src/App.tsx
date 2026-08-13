import { useState } from 'react'
import './App.css'
import logo from './assets/images/logo.svg'
import iconSearch from './assets/images/icon-search.svg'
import iconSunny from './assets/images/icon-sunny.webp'
import iconUnits from './assets/images/icon-units.svg'
import iconDropdown from './assets/images/icon-dropdown.svg'
import { WeatherStat } from './components/WeatherStat'
import { DailyForecastItem } from './components/DailyForecastItem'
import { HourlyForecastItem } from './components/HourlyForecastItem'

type TemperatureUnit = 'celsius' | 'fahrenheit'
type WindUnit = 'kmh' | 'mph'
type PrecipitationUnit = 'mm' | 'in'

const weatherStats = [
  { label: 'Feels like', value: '20°C' },
  { label: 'Humidity', value: '40%' },
  { label: 'Wind', value: '10 km/h' },
  { label: 'Precipitation', value: '0 mm' },
]

const dailyForecast = [
  { day: 'Tue', high: '20°C', low: '14°C' },
  { day: 'Wed', high: '20°C', low: '14°C' },
  { day: 'Thu', high: '20°C', low: '14°C' },
  { day: 'Fri', high: '20°C', low: '14°C' },
  { day: 'Sat', high: '20°C', low: '14°C' },
  { day: 'Sun', high: '20°C', low: '14°C' },
  { day: 'Mon', high: '20°C', low: '14°C' },
]

const hourlyForecast = [
  { time: '3 PM', temperature: '20°C' },
  { time: '4 PM', temperature: '20°C' },
  { time: '5 PM', temperature: '20°C' },
  { time: '6 PM', temperature: '20°C' },
  { time: '7 PM', temperature: '20°C' },
  { time: '8 PM', temperature: '20°C' },
  { time: '9 PM', temperature: '20°C' },
  { time: '10 PM', temperature: '20°C' },
]

function App() {
  const [unitsOpen, setUnitsOpen] = useState(false)
  const [temperature, setTemperature] = useState<TemperatureUnit>('celsius')
  const [wind, setWind] = useState<WindUnit>('kmh')
  const [precipitation, setPrecipitation] = useState<PrecipitationUnit>('mm')

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

  return (
    <>
      <div className="min-h-screen p-4">
        <header className="flex justify-between items-center">
          <img src={logo} alt="Weather App" />

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

        <main className="flex flex-col gap-4 mt-4">
          <section
            aria-labelledby="search-heading"
            className="flex flex-col gap-2 items-center text-center"
          >
            <h1 id="search-heading" className="text-5xl font-display">
              How's the sky looking today?
            </h1>

            <form role="search" className="flex flex-col gap-2 mt-4 p-1 w-full max-w-md mx-auto">
              <label
                htmlFor="city"
                className="flex items-center gap-2 rounded-xl bg-neutral-800 px-4 py-3 cursor-text"
              >
                <img src={iconSearch} alt="" aria-hidden="true" />
                <input
                  id="city"
                  type="search"
                  name="city"
                  placeholder="Search for a place..."
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent border-0 outline-none text-neutral-0 placeholder:text-neutral-200"
                />
              </label>
              <button
                type="submit"
                className="bg-blue-500 px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </section>

          <section aria-labelledby="current-heading">
            <article className="bg-today rounded-2xl p-8">
              <div className="flex flex-col justify-between items-center">
              <h2 id="current-heading" className="text-4xl font-sans font-bold">Berlin, Germany</h2>
              <p className="text-sm text-neutral-200">
                <time dateTime="2026-08-05">Tuesday, Aug 5, 2026</time>
              </p>
              </div>
              <div className="flex justify-between items-center mt-4">
              <img src={iconSunny} alt="Sunny" className="w-30 h-30" />
              <p className="text-8xl font-sans text-neutral-0">20°</p>
              </div>
            </article>

            <dl className="grid grid-cols-2 gap-4 mt-8">
              {weatherStats.map((stat) => (
                <WeatherStat key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </dl>
          </section>

          <section aria-labelledby="daily-heading">
            <h2 id="daily-heading">Daily forecast</h2>
            <ul className="grid grid-cols-3 gap-4 mt-8">
              {dailyForecast.map((day) => (
                <DailyForecastItem
                  key={day.day}
                  day={day.day}
                  icon={iconSunny}
                  high={day.high}
                  low={day.low}
                />
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="hourly-heading"
            className="mt-4 bg-neutral-800 rounded-xl p-4 shadow-md border border-neutral-600"
          >
            <div className="flex justify-between items-center">
              <h2 id="hourly-heading">Hourly forecast</h2>
              <div className="relative">
                <select
                  name="day"
                  id="day"
                  className="appearance-none rounded-lg bg-neutral-600 border border-neutral-600 px-3 py-2 pr-9 text-sm font-sans text-neutral-0 outline-none cursor-pointer hover:bg-neutral-700 focus:border-neutral-300"
                >
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
                <img
                  src={iconDropdown}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2"
                />
              </div>
            </div>
            <ul className="mt-4 grid gap-3">
              {hourlyForecast.map((hour) => (
                <HourlyForecastItem
                  key={hour.time}
                  time={hour.time}
                  icon={iconSunny}
                  temperature={hour.temperature}
                />
              ))}
            </ul>
          </section>
        </main>

        <footer className="mt-10 border-t border-neutral-600 pt-6 pb-2 text-center text-sm text-neutral-300">
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
            .
          </p>
        </footer>
      </div>
    </>
  )
}

export default App
