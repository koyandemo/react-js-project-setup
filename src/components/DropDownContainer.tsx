import React from 'react'
import Text from './typography/Text'

type Props = {
    label:string;
    children:React.ReactNode,
    error?:string;
}

const DropDownContainer = ({label,children,error = ""}:Props) => {
  return (
    <div className='w-full flex flex-col gap-[0.5em]'>
    <Text
      label={label}
      size="sm"
      weight="medium"
      isPrimary={false}
      transform="capitalize"
    />
    {children}
    <span className={`text-red-500  text-xs ${error ? "inline-block": "invisible"}`}>
          {error ? error : "h"}
        </span>
    </div>
  )
}

export default DropDownContainer
