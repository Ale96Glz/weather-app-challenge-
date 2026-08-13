function Bone({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-neutral-600/80 ${className}`} />
}

export function WeatherSkeleton() {
  return (
    <div
      className="md:grid md:grid-cols-2 md:gap-6 md:items-stretch md:grid-rows-1"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="min-w-0 min-h-0 flex flex-col gap-5">
        <section className="flex flex-col gap-5">
          <article className="bg-today rounded-2xl px-6 py-10 flex flex-col gap-6 md:grid md:grid-cols-2 md:items-center md:px-5 md:py-8">
            <div className="flex flex-col gap-3 items-center md:items-start">
              <Bone className="h-8 w-48 md:w-40" />
              <Bone className="h-4 w-36" />
            </div>
            <div className="flex justify-between items-center gap-4 px-2 md:justify-end">
              <Bone className="h-28 w-28 rounded-full md:h-20 md:w-20" />
              <Bone className="h-16 w-28 md:h-12 md:w-24" />
            </div>
          </article>

          <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-neutral-800 rounded-xl p-4 flex flex-col gap-4 border border-neutral-600 md:p-3"
              >
                <Bone className="h-4 w-20" />
                <Bone className="h-7 w-16" />
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-5">
          <Bone className="h-7 w-40" />
          <ul className="grid grid-cols-3 gap-4 md:grid-cols-7 md:gap-1.5 desktop:gap-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <li
                key={index}
                className="bg-neutral-800 rounded-xl p-3 border border-neutral-600 md:p-1.5 desktop:p-2.5"
              >
                <div className="flex flex-col items-center gap-2">
                  <Bone className="h-4 w-10" />
                  <Bone className="h-14 w-14 rounded-full md:h-8 md:w-8" />
                </div>
                <div className="mt-2 flex justify-between gap-1">
                  <Bone className="h-3 w-8" />
                  <Bone className="h-3 w-8" />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="min-w-0 min-h-0 mt-4 md:mt-0 md:h-0 md:min-h-full md:overflow-hidden flex flex-col">
        <section className="bg-neutral-800 rounded-xl p-4 border border-neutral-600 flex flex-1 flex-col min-h-0 md:p-5">
          <div className="flex justify-between items-center gap-3 shrink-0">
            <Bone className="h-7 w-40" />
            <Bone className="h-10 w-28" />
          </div>
          <ul className="mt-4 flex flex-1 flex-col gap-3 min-h-0">
            {Array.from({ length: 8 }).map((_, index) => (
              <li
                key={index}
                className="flex flex-1 min-h-10 justify-between items-center bg-neutral-600 rounded-xl px-3 py-2 border border-neutral-600"
              >
                <div className="flex items-center gap-2">
                  <Bone className="h-8 w-8 rounded-full" />
                  <Bone className="h-4 w-14" />
                </div>
                <Bone className="h-4 w-12" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
