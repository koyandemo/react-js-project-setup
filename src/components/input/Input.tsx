import { cn, generateSizeForInput } from '@/utils';
import React, { useState } from 'react';
import Text from '../typography/Text';
import { EyeCloseIcon, EyeOpenIcon, SearchIcon } from '@/utils/appIcon';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
  name: string;
  error?: string;
  showError?:boolean;
  sizer?: 'sm' | 'lg' | 'full';
  className?: string;
  register?: UseFormRegisterReturn;
  disabled?:boolean;
  placeholder:string;
  refObj?: React.RefObject<HTMLInputElement> | null;
  onChange?:() => void;
}

const Input = ({label,type,name,error,sizer="sm",showError=true,className,register,disabled=false,placeholder,refObj,onChange}:InputProps) => {
    const [iType, setIType] = useState(type);
    return (
      <div className="relative flex flex-col gap-[0.5em] w-full">
        {label && (
            <Text
              label={label}
              size="sm"
              weight="medium"
              isPrimary={false}
              transform="capitalize"
            />
        )}
        <input
        
          className={cn(
            'text-lead text-[14px] py-4 rounded-[8px] px-4 block w-full outline-none bg-white border border-[#B3B3B3] placeholder:text-[13px] disabled:bg-gray-200',
            generateSizeForInput(sizer),
            className
          )}
          ref={refObj}
          disabled={disabled}
          type={iType}
          placeholder={placeholder}
          onChange={onChange}
          {...register}
        />
        {name === 'search' && (
          <div className="absolute top-[20px] left-[15px] cursor-pointer">
            <SearchIcon />
          </div>
        )}
        {type === 'password' && (
          <div
            className="absolute top-[40px] right-[15px] cursor-pointer"
            onClick={() => {
              setIType((prev) => (prev === 'text' ? 'password' : 'text'));
            }}
          >
            {iType === 'password' && <EyeOpenIcon />}
            {iType === 'text' && <EyeCloseIcon />}
          </div>
        )}
        {showError &&
        <span className={`text-red-500  text-xs ${error ? "inline-block":"invisible"}`}>
        {error ? error : "h"}
      </span>
        }
      </div>
    );
  }

export default Input;

// type InputProps = {
//   id:string;
//   name: string;
//   type: string;
//   value: string;
//   size: 'sm' | 'lg' | 'full';
//   placeholder: string;
//   callBack: (e: ChangeEvent<HTMLInputElement>) => void;

//   label?: string;
//   error?: string;
//   limitLength?: number;
//   disabled?: boolean;
//   className?: string;
//   isRequired?: boolean;
//   readonly?: boolean;
//   register?: UseFormRegisterReturn;
// };

// const Input = ({
//   label = '',
//   error = '',
//   sizer,
//   disabled = false,
//   placeholder,
//   className = '',
//   callBack,
//   isRequired = true,
//   readonly = false,
// }: InputProps) => {
//   const [iType, setIType] = useState(type);
//   return (
//     <div className="relative  w-[inherit]">
//       {label && (
//         <label className="block mb-2">
//           <Text
//             label={label}
//             size="sm"
//             weight="medium"
//             isPrimary={true}
//             transform="capitalize"
//           />
//         </label>
//       )}
//       <input
//         className={cn(
//           'text-lead text-[14px] py-4 rounded-[8px] px-4 block w-full outline-none bg-white border border-[#B3B3B3] placeholder:text-[13px] disabled:bg-gray-200',
//           generateSizeForInput(sizer),
//           className
//         )}
//         disabled={disabled}
//         id={id}
//         name={name}
//         type={type}
//         value={value}
//         placeholder={placeholder}
//         onChange={callBack}
//         required={isRequired}
//         readOnly={readonly}
//       />
//       {name === 'search' && (
//         <div className="absolute top-[20px] left-[15px] cursor-pointer">
//           <SearchIcon />
//         </div>
//       )}
//       {type === 'password' && (
//         <div
//           className="absolute top-[20px] right-[15px] cursor-pointer"
//           onClick={() => {
//             setIType((prev) => (prev === 'text' ? 'password' : 'text'));
//           }}
//         >
//           {iType === 'password' && <EyeOpenIcon />}
//           {iType === 'text' && <EyeCloseIcon />}
//         </div>
//       )}
//       {error && (
//         <span className="inline-block text-error text-xs">{error}</span>
//       )}
//     </div>
//   );
// };

// export default Input;
