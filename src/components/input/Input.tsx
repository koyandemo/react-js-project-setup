import { cn, generateSizeForInput } from '@/lib/utils';
import { ChangeEvent, useState } from 'react';
import Text from '../typography/Text';
import { EyeCloseIcon, EyeOpenIcon, SearchIcon } from '@/utils/appIcon';

type InputProps = {
  name: string;
  type: string;
  value: string;
  size: 'sm' | 'lg' | 'full';
  placeholder: string;
  callBack: (e: ChangeEvent<HTMLInputElement>) => void;

  label?: string;
  error?: string;
  limitLength?: number;
  disabled?: boolean;
  className?: string;
  isRequired?: boolean;
  readonly?: boolean;
};

const Input = ({
  name,
  type,
  value,
  label = '',
  error = '',
  size,
  disabled = false,
  placeholder,
  className = '',
  callBack,
  limitLength = 0,
  isRequired = true,
  readonly = false,
}: InputProps) => {
  const [iType, setIType] = useState(type);
  return (
    <div className="relative  w-[inherit]">
      {label && (
        <label className="block mb-2">
          <Text
            label={label}
            size="sm"
            weight="medium"
            isPrimary={true}
            transform="capitalize"
          />
        </label>
      )}
      <input
        className={cn(
          'text-lead text-[14px] py-4 rounded-[8px] px-4 block w-full outline-none bg-white border border-[#B3B3B3] placeholder:text-[13px] disabled:bg-gray-200',
          generateSizeForInput(size),
          className
        )}
        disabled={disabled}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={callBack}
        required={isRequired}
        readOnly={readonly}
      />
      {name === "search" && 
       <div  className="absolute top-[20px] left-[15px] cursor-pointer">
        <SearchIcon />
       </div> 
      }
      {type === 'password' && (
        <div
          className="absolute top-[20px] right-[15px] cursor-pointer"
          onClick={() => {
            setIType((prev) => (prev === 'text' ? 'password' : 'text'));
          }}
        >
          {iType === 'password' && <EyeOpenIcon />}
          {iType === 'text' && <EyeCloseIcon />}
        </div>
      )}
      {limitLength > 0 && (
        <span className="absolute top-[50%] translate-y-[-50%] right-[15px] text-[#94A3B8] text-[14px]">
          {value.length}/{limitLength}
        </span>
      )}
      {error && (
        <span className="inline-block text-error text-xs">{error}</span>
      )}
    </div>
  );
};

export default Input;
