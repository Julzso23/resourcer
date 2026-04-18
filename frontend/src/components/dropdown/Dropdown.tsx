import { faChevronDown, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useState } from 'react'
import { DropdownOption } from './DropdownOption'

export interface DropdownItem {
  label: string
}

export function Dropdown({
  items,
}: {
  items: DropdownItem[],
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<DropdownItem | undefined>(undefined)

  const onSelectOption = useCallback((item: DropdownItem) => {
    setValue(item)
    setIsOpen(false)
  }, [])

  return <>
    <div className='relative'>
      <div className='text-sm border-1 border-gray-700 rounded-md px-4 py-2 cursor-pointer flex flex-row' onClick={() => setIsOpen(!isOpen)}>
        { value != null ?
          <div className='flex flex-row grow'>
            {value.label}
            <button className='ml-auto cursor-pointer text-red-800' onClick={() => setValue(undefined)}><FontAwesomeIcon icon={faClose} /></button>
          </div> :
          <div className='text-gray-500'>Select an option</div>
        }
        <button className='ml-auto cursor-pointer'><FontAwesomeIcon icon={faChevronDown} /></button>
      </div>
      { isOpen && (
        <div className='border-1 border-gray-700 rounded-md py-2 absolute w-full z-10'>
          { items.map((item, i) => <DropdownOption key={i} label={item.label} onClick={() => onSelectOption(item)} />) }
        </div>
      ) }
    </div>
  </>
}
