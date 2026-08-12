import './App.css'
import logo from './assets/images/logo.svg'
import iconSunny from './assets/images/icon-sunny.webp'

function App() {
  return (
    <>
     <div className="min-h-screen">
     <header>
        <img src={logo} alt="Weather App" />

        <div>
          <button
            type="button"
            id="units-button"
            aria-expanded="false"
            aria-controls="units-panel"
            aria-haspopup="true"
          >
            Units
          </button>

          <div id="units-panel" hidden>
            <button type="button">Switch to Imperial</button>

            <fieldset>
              <legend>Temperature</legend>
              <label>
                <input type="radio" name="temperature" value="celsius" defaultChecked />
                Celsius (°C)
              </label>
              <label>
                <input type="radio" name="temperature" value="fahrenheit" />
                Fahrenheit (°F)
              </label>
            </fieldset>

            <fieldset>
              <legend>Wind Speed</legend>
              <label>
                <input type="radio" name="wind" value="kmh" defaultChecked />
                km/h
              </label>
              <label>
                <input type="radio" name="wind" value="mph" />
                mph
              </label>
            </fieldset>

            <fieldset>
              <legend>Precipitation</legend>
              <label>
                <input type="radio" name="precipitation" value="mm" defaultChecked />
                Millimeters (mm)
              </label>
              <label>
                <input type="radio" name="precipitation" value="in" />
                Inches (in)
              </label>
            </fieldset>
          </div>
        </div>
      </header>

      <main>
        <section aria-labelledby="search-heading">
          <h1 id="search-heading">How's the sky looking today?</h1>

          <form role="search">
            <label htmlFor="city">Search for a city</label>
            <input
              id="city"
              type="search"
              name="city"
              placeholder="Search for a city, e.g., New York"
              autoComplete="off"
            />
            <button type="submit">Search</button>
          </form>
        </section>

        <section aria-labelledby="current-heading">
          <article>
            <h2 id="current-heading">Berlin, Germany</h2>
            <p>
              <time dateTime="2026-08-05">Tuesday, Aug 5, 2026</time>
            </p>
            <img src={iconSunny} alt="Sunny" />
            <p>20°C</p>
          </article>

          <dl>
            <div>
              <dt>Feels like</dt>
              <dd>20°C</dd>
            </div>
            <div>
              <dt>Humidity</dt>
              <dd>40%</dd>
            </div>
            <div>
              <dt>Wind</dt>
              <dd>10 km/h</dd>
            </div>
            <div>
              <dt>Precipitation</dt>
              <dd>0 mm</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="daily-heading">
          <h2 id="daily-heading">Daily forecast</h2>
          <ul>
            <li>
              <p>Tuesday</p>
              <img src={iconSunny} alt="" />
              <p>20°C</p>
            </li>
            <li>
              <p>Wednesday</p>
              <img src={iconSunny} alt="" />
              <p>20°C</p>
            </li>
            <li>
              <p>Thursday</p>
              <img src={iconSunny} alt="" />
              <p>20°C</p>
            </li>
            <li>
              <p>Friday</p>
              <img src={iconSunny} alt="" />
              <p>20°C</p>
            </li>
            <li>
              <p>Saturday</p>
              <img src={iconSunny} alt="" />
              <p>20°C</p>
            </li>
            <li>
              <p>Sunday</p>
              <img src={iconSunny} alt="" />
              <p>20°C</p>
            </li>
            <li>
              <p>Monday</p>
              <img src={iconSunny} alt="" />
              <p>20°C</p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="hourly-heading">
          <h2 id="hourly-heading">Hourly forecast</h2>
          <ul>
            <li>
              <p>
                <time dateTime="12:00">12:00</time>
              </p>
              <img src={iconSunny} alt="" />
              <p>20°C</p>
            </li>
          </ul>
        </section>
      </main>

      <footer className="attribution">
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
        Coded by <a href="#">Your Name Here</a>.
      </footer>
     </div>
    </>
  )
}

export default App
