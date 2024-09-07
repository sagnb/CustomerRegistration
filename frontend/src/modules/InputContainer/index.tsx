import { RefObject } from 'react'

interface InputContainerProps {
  label: string,
  inputRef: RefObject<HTMLInputElement>
}

export default function InputContainer(props: InputContainerProps) {
  const { label, inputRef } = props

  return (
    <div className='grid grid-cols-1 gap-2 content-center'>
      <p className='text-slate-300 text-3xl'>{label}</p>
      <input className='h-10 w-80 rounded text-3xl' ref={inputRef} />
    </div>
  )
}
