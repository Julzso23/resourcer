export function TextInput({
  type,
  name,
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  type: string
  name?: string
  placeholder?: string
  autoComplete?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="relative bg-slate-800 rounded-md">
      <input
        type={type}
        id={name}
        name={name}
        autoComplete={autoComplete}
        placeholder=" "
        className={`block px-4 pb-2.5
        pt-4 w-full text-sm text-heading bg-transparent border-1 border-gray-700 appearance-none focus:outline-none
        focus:ring-0 focus:border-gray-500 peer rounded-md`}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className={`absolute text-sm text-white/50 duration-100 transform -translate-y-4
        scale-75 top-2 z-10 origin-[0] px-2 pointer-events-none peer-focus:text-fg-brand
        peer-focus:bg-gray-500 peer-focus:text-white peer-placeholder-shown:scale-100
        peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
        not-peer-placeholder-shown:bg-gray-500 not-peer-placeholder-shown:text-white
        peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4
        rtl:peer-focus:left-auto start-1 left-2 rounded-md`}
      >
        {placeholder}
      </label>
    </div>
  )
}
