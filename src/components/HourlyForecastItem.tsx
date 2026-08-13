type HourlyForecastItemProps = {
  time: string
  icon: string
  temperature: string
}

export function HourlyForecastItem({ time, icon, temperature }: HourlyForecastItemProps) {
  return (
    <li className="flex justify-between items-center bg-neutral-600 rounded-xl px-3 py-1 shadow-md border border-neutral-600">
      <div className="flex items-center gap-2">
        <img src={icon} alt="" className="w-8 h-8" />
        <p className="text-sm font-sans text-neutral-0">{time}</p>
      </div>
      <p className="text-sm font-sans text-neutral-0">{temperature}</p>
    </li>
  )
}
