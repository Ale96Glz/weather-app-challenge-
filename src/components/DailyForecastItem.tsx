type DailyForecastItemProps = {
  day: string
  icon: string
  high: string
  low: string
}

export function DailyForecastItem({ day, icon, high, low }: DailyForecastItemProps) {
  return (
    <li className="bg-neutral-800 rounded-xl p-4 shadow-md border border-neutral-600">
      <div className="flex flex-col items-center gap-2">
        <p>{day}</p>
        <img src={icon} alt="" className="w-20 h-20" />
      </div>
      <div className="flex justify-between gap-2">
        <p>{high}</p>
        <p>{low}</p>
      </div>
    </li>
  )
}
