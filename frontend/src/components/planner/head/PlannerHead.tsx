import { DateTime, DateTimeUnit, Interval } from "luxon";
import { DateRow } from "./DateRow";
import { Button } from "../../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faGear } from "@fortawesome/free-solid-svg-icons";

export function PlannerHead({ interval, zoomLevel, onScroll }: {
  interval: Interval,
  zoomLevel: DateTimeUnit,
  onScroll: (dateUnit: DateTimeUnit, amount: number) => void,
}) {
  const days: (DateTime | null)[] = interval.splitBy({ day: 1 }).map(day => day.start)
  const getDateCells = (dateUnit: DateTimeUnit) => Array.from(days.map(day => day?.startOf(dateUnit).toMillis()).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1 / days.length), new Map()))

  return (
    <div className="flex flex-row gap-1">
      <div className="xl:w-80 lg:w-60 w-40 flex flex-row gap-1 items-start flex-wrap p-2">
        <Button><FontAwesomeIcon icon={faGear} /></Button>
        <Button><FontAwesomeIcon icon={faFilter} /></Button>
      </div>
      <div className="flex flex-col flex-auto sticky top-0 z-10 bg-gray-950 rounded-lg border border-gray-800 overflow-hidden shadow-lg">
        <DateRow dateUnit="year" dateCells={getDateCells('year')} onScroll={(dateUnit, amount) => onScroll(dateUnit, amount)} />
        { (zoomLevel == 'month' || zoomLevel == 'day') && <DateRow dateUnit="month" dateCells={getDateCells('month')} onScroll={(dateUnit, amount) => onScroll(dateUnit, amount)} /> }
        { zoomLevel == 'week' && <DateRow dateUnit="week" dateCells={getDateCells('week')} onScroll={(dateUnit, amount) => onScroll(dateUnit, amount)} /> }
        { zoomLevel == 'day' && <DateRow dateUnit="day" dateCells={getDateCells('day')} onScroll={(dateUnit, amount) => onScroll(dateUnit, amount)} /> }
      </div>
    </div>
  )
}
