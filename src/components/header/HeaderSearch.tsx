import { useRef} from "react";
import { debounce } from "../../utils";
import InputRef from "../input/InputRef";
import { NotificationIcon } from "../../utils/appIcon";

export const HeaderSearch = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const debounceSearch = debounce(() => {}, 1000);

  return (
    <div className="relative w-[339px] h-[61px] bg-[#FFFFFF80] backdrop-blur-[8px] rounded-[30px] px-[15px] flex justify-between items-center gap-4 z-[999]">
      <InputRef
        icon="search"
        refObj={searchRef}
        classes="w-[214px] h-[41px] rounded-[49px]"
        callBack={debounceSearch}
        placeHolder={'Search'}
      />
      <NotificationIcon />
    </div>
  );
};

