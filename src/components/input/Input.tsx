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
  sizer?: 'sm' | 'lg' | 'full';
  className?: string;
  register?: UseFormRegisterReturn;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label = '',
      name,
      error = '',
      sizer = "lg",
      disabled = false,
      placeholder,
      className = '',
      type,
      register,
      ...props
    },
    ref
  ) => {
    const [iType, setIType] = useState(type);
    return (
      <div className="relative  w-[inherit]">
        {label && (
          <label className="block mb-2">
            <Text
              label={label}
              size="sm"
              weight="medium"
              isPrimary={false}
              transform="capitalize"
            />
          </label>
        )}
        <input
          className={cn(
            'text-lead text-[14px] py-4 rounded-[8px] px-4 block w-full outline-none bg-white border border-[#B3B3B3] placeholder:text-[13px] disabled:bg-gray-200',
            generateSizeForInput(sizer),
            className
          )}
          {...props}
          
          ref={ref}
          disabled={disabled}
          type={iType}
          placeholder={placeholder}
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
        {error && (
          <span className="inline-block text-red-500 text-xs">{error}</span>
        )}
      </div>
    );
  }
);

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
