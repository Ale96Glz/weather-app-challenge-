type WeatherStatProps = {
  label: string
  value: string
}

export function WeatherStat({ label, value }: WeatherStatProps) {
  return (
    <div className="min-w-0 overflow-hidden bg-neutral-800 rounded-xl p-4 flex flex-col gap-4 shadow-md border border-neutral-600 md:p-3 md:gap-3">
      <dt className="text-sm font-sans text-neutral-200 wrap-break-word md:text-xs desktop:text-sm">
        {label}
      </dt>
      <dd className="text-xl font-sans font-bold text-neutral-0 wrap-break-word md:text-lg desktop:text-xl">
        {value}
      </dd>
    </div>
  )
}
