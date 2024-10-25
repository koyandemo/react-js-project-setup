import { cn } from "../../utils";

interface InputRefProps {
  refObj: React.RefObject<HTMLInputElement> | null;
  placeHolder?: string;
  classes?: string;
  callBack: () => void;
}

const InputRef = ({
  refObj = null,
  placeHolder = '',
  classes = '',
  callBack,
}: InputRefProps) => {
  return (
    <div className="relative">
      <input
        className={cn(
          'text-gray-700 rounded-md py-3 pl-[35px] pr-[8px] block w-full outline-none bg-white border border-input placeholder:text-[13px]',
          `${classes}`
        )}
        ref={refObj}
        onChange={callBack}
        placeholder={placeHolder}
      />
      <span className="absolute top-[50%] transform -translate-x-1/2 -translate-y-1/2 left-[18px]">
        <svg
          width="11"
          height="12"
          viewBox="0 0 11 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="5" cy="5" r="4.3" stroke="#2B3674" strokeWidth="1.4" />
          <line
            x1="10.0101"
            y1="11"
            x2="8"
            y2="8.98995"
            stroke="#2B3674"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  );
};

export default InputRef;
