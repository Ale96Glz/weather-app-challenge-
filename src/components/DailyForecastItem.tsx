type DailyForecastItemProps = {
  day: string
  icon: string
  high: string
  low: string
}

export function DailyForecastItem({ day, icon, high, low }: DailyForecastItemProps) {
  return (
    <li className="min-w-0 overflow-hidden bg-neutral-800 rounded-xl p-3 shadow-md border border-neutral-600 md:p-1.5 desktop:p-2.5">
      <div className="flex flex-col items-center gap-1.5 md:gap-1">
        <p className="text-sm text-neutral-0 md:text-[0.65rem] desktop:text-sm">{day}</p>
        <img
          src={icon}
          alt=""
          className="w-14 h-14 object-contain md:w-8 md:h-8 desktop:w-11 desktop:h-11"
        />
      </div>
      <div className="mt-2 flex justify-between items-center gap-0.5 text-sm md:mt-1 md:text-[0.6rem] desktop:text-sm">
        <p className="tabular-nums">{high}</p>
        <p className="text-neutral-200 tabular-nums">{low}</p>
      </div>
    </li>
  )
}
