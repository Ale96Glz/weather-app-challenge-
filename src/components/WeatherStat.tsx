type WeatherStatProps = {
  label: string
  value: string
}

export function WeatherStat({ label, value }: WeatherStatProps) {
  return (
    <div className="bg-neutral-800 rounded-xl p-6 flex flex-col gap-5 shadow-md border border-neutral-600">
      <dt className="text-sm font-sans text-neutral-200">{label}</dt>
      <dd className="text-xl font-sans font-bold text-neutral-0">{value}</dd>
    </div>
  )
}
