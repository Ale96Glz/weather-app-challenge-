type HourlyForecastItemProps = {
  time: string
  icon: string
  temperature: string
}

export function HourlyForecastItem({ time, icon, temperature }: HourlyForecastItemProps) {
  return (
    <li className="flex flex-1 min-h-0 justify-between items-center bg-neutral-600 rounded-xl px-3 py-2 shadow-md border border-neutral-600 md:px-4">
      <div className="flex items-center gap-2 min-w-0">
        <img src={icon} alt="" className="w-8 h-8 shrink-0 object-contain md:w-9 md:h-9" />
        <p className="text-sm font-sans text-neutral-0 truncate">{time}</p>
      </div>
      <p className="text-sm font-sans text-neutral-0 shrink-0 tabular-nums md:text-base">
        {temperature}
      </p>
    </li>
  )
}
