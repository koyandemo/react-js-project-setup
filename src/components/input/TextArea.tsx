import { ChangeEvent, RefObject } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Text from '../typography/Text';
import { cn } from '@/utils';

type TextAreaProps = {
  name?: string;
  value?: string;
  label?: string;
  rows?: number;
  error?: string;
  placeholder: string;
  classes?: string;
  callBack?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  editCallBack?: () => void;
  isOptional?: boolean;
  register?: UseFormRegisterReturn;
  editableMode?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  ref?: RefObject<HTMLTextAreaElement>;
};

const TextArea = ({
  name,
  value,
  label = '',
  rows = 5,
  error = "",
  placeholder,
  classes = '',
  callBack,
  isOptional = false,
  register,
  disabled = false,
  readonly = false,
  ref,
}: TextAreaProps) => {
  return (
    <div className="relative flex flex-col gap-[0.5em] w-full">
      {label && (
            <Text
              label={label}
              size="sm"
              weight="medium"
              transform="capitalize"
            />
      )}
      <textarea
        className={cn(
          'text-gray-700 rounded-md py-3 px-4 block w-full outline-none  bg-white border border-[#B3B3B3] placeholder:text-[13px] disabled:opacity-70 transition-opacity',
          classes
        )}
        rows={rows}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={callBack}
        required={!isOptional}
        disabled={disabled}
        readOnly={readonly}
        ref={ref}
        {...register}
      />
     <span className={`text-red-500  text-xs ${error ? "inline-block":"invisible"}`}>
          {error ? error : "h"}
        </span>
    </div>
  );
};

export default TextArea;
