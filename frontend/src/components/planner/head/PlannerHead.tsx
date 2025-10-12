import { DateTimeUnit, Interval } from "luxon";
import { DateRow } from "./DateRow";

export function PlannerHead({ interval, zoomLevel }: {
  interval: Interval,
  zoomLevel: DateTimeUnit,
}) {
  return (
    <div className="w-full flex flex-col sticky top-0 z-10 bg-slate-950 rounded-lg border border-gray-800 overflow-hidden drop-shadow-lg">
      { <DateRow dateUnit="year" interval={interval} /> }
      { (zoomLevel == 'month' || zoomLevel == 'day') && <DateRow dateUnit="month" interval={interval} /> }
      { zoomLevel == 'week' && <DateRow dateUnit="week" interval={interval} /> }
      { zoomLevel == 'day' && <DateRow dateUnit="day" interval={interval} /> }
    </div>
  )
}
