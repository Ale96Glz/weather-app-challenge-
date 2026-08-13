import iconError from '../assets/images/icon-error.svg'
import iconRetry from '../assets/images/icon-retry.svg'

type Error404Props = {
  onRetry?: () => void
}

export function Error404({ onRetry }: Error404Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={iconError} alt="" className="w-16 h-16" />
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-lg text-center">
        We couldn't connect to the server (API Error). Please try again in a few
        moments.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 bg-neutral-800 border border-neutral-600 px-6 py-3 rounded-xl text-base font-medium text-neutral-0 shadow-md hover:bg-neutral-700 transition-colors"
      >
        <img src={iconRetry} alt="" className="h-4 w-4" />
        Retry
      </button>
    </div>
  )
}
