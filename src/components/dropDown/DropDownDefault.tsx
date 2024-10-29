import { useState } from 'react';
import Text from '../typography/Text';
import ClickOutSide from '../ClickOutSide';
import { DownIcon, UpIcon } from '@/utils/appIcon';
import { generateSizeForInput } from '@/utils';

type dataT = {
    name:string;
    value:string;
}

type Props = {
  size: 'sm' | 'lg' | 'full';
  label:string;
  data?:dataT[] | null;
  selectedData?:dataT  | null;
  callBack: (value: string) => void;
};

const DropDownDefault = ({
  size,
  label,
  data,
  selectedData,
  callBack,
}: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <ClickOutSide onClick={() => setDropdownOpen(false)} className="w-full relative">
      <div
        onClick={() => {
          setDropdownOpen((prev) => !prev);
        }}
        className={`cursor-pointer flex gap-[10px] justify-between px-[10px] items-center rounded-[8px] bg-white border border-[#B3B3B3] ${generateSizeForInput(size)}`}
      >
            <Text
            label={selectedData?.name || label}
            size="sm"
            weight="medium"
            cursor="pointer"
            className="text-[#64748B]"
          />
        {dropdownOpen ? <UpIcon /> : <DownIcon />}
      </div>
      {dropdownOpen && (
        <div
          className={`absolute z-[2000] mt-1 flex flex-col rounded-[8px] border border-stroke bg-white shadow-default max-h-96 overflow-y-auto dark:border-strokedark dark:bg-boxdark w-full shreScrollBar`}
        >
          <ul>
            {data && data.map((data, i: number) => (
              <li
                key={i}
                onClick={() => {
                  callBack(data.value);
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-[8px] py-[16.5px] cursor-pointer hover:bg-primary hover:text-white px-[16px]"
              >
                <Text label={data.name} size="sm" cursor="pointer" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </ClickOutSide>
  );
};

export default DropDownDefault;
