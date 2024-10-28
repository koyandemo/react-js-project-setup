import { SearchIcon } from "@/utils/appIcon";
import { cn } from "../../utils";

interface InputRefProps {
  refObj: React.RefObject<HTMLInputElement> | null;
  placeHolder?: string;
  icon:"search";
  classes?: string;
  callBack: () => void;
}

const InputRef = ({
  refObj = null,
  placeHolder = '',
  icon="search",
  classes = '',
  callBack,
}: InputRefProps) => {
  return (
    <div className="relative">
      {icon === "search" && 
      <span className="absolute top-[50%] transform -translate-x-1/2 -translate-y-1/2 left-[18px]">
      <SearchIcon />
    </span>
      }
      <input
        className={cn(
          'text-gray-700 rounded-md py-3 pl-[35px] pr-[8px] block w-full outline-none bg-white border border-input placeholder:text-[13px]',
          `${classes}`
        )}
        ref={refObj}
        onChange={callBack}
        placeholder={placeHolder}
      />
      
    </div>
  );
};

export default InputRef;
