export default function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="flex gap-2 pt-1">
          <div className="h-8 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 flex-1 rounded-lg bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  )
}
