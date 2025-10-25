import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

export function DateRowScrollButton({ right = false, onClick }: {
  right?: boolean,
  onClick: MouseEventHandler,
}) {
  return (
    <button
      className={`
        absolute cursor-pointer bg-slate-950 border border-gray-800 h-3/4 top-1/8 hover:bg-gray-900 active:bg-gray-800
        ${right ? 'right-0 border-r-0 rounded-l-md' : 'left-0 border-l-0 rounded-r-md'}
      `}
      onClick={onClick}>
      <FontAwesomeIcon icon={right ? faChevronRight : faChevronLeft} />
    </button>
  )
}
