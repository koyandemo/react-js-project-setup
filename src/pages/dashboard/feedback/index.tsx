import ButtonCustom from '@/button/ButtonCustom';
import { DateRangePicker } from '@/components/date/DateRangePicker';
import DropDownDefault from '@/components/dropDown/DropDownDefault';
import Input from '@/components/input/Input';
import MainContainer from '@/components/MainContainer';
import Text from '@/components/typography/Text';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, generateSizeForInput } from '@/utils';
import { EyeIcon, RemoveIcon, StartFullIcon } from '@/utils/appIcon';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const tHeadCn = 'text-[#202224] text-[14px] font-bold';

const FeedBackListPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const renderTableData = (idx: number) => {
    return (
      <TableRow
        className={cn(
          `rounded-full overflow-hidden cursor-pointer`,
          `${idx % 2 ? 'bg-[#F3F4F7]' : 'bg-[#FFFFFF80]'}`
        )}
      >
        <TableCell className="font-medium">
          <div className="flex flex-col gap-[1px]">
            <Text
              label={'Chandler Bing'}
              size="sm"
              weight="bold"
              className="text-[#202224]"
            />
            <Text
              title={''}
              label={'chandler@gmail.com'}
              size="xs"
              weight="medium"
              className="text-[#747279]"
            />
          </div>
        </TableCell>
        <TableCell className="font-medium">{'SHRE Pro'}</TableCell>
        <TableCell className="font-medium">
          <div className="flex items-center gap-[1.6px]">
            <StartFullIcon />
            <StartFullIcon />
            <StartFullIcon />
            <StartFullIcon />
            <StartFullIcon />
          </div>
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={'What a nice app'}
            size="xs"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={'2024-07-24'}
            size="xs"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex items-center gap-[8px]">
            <EyeIcon />
            <RemoveIcon />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <MainContainer background="#FFFFFF">
      <div className="w-full flex flex-col gap-[24px]">
        <div className="w-full flex items-center gap-[24px]">
          <Input
            name="search"
            type="string"
            sizer="full"
            placeholder="Search Name,Email,etc..."
            value=""
            className="pl-[35px]"
            onClick={(e) => {
              console.log(e);
            }}
          />
          <DropDownDefault label="Rating" size="full" callBack={() => {}} />
          <DateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
            className={`${generateSizeForInput('full')}`}
          />
          <DropDownDefault label="User Type" size="full" callBack={() => {}} />
          <ButtonCustom
            isOutline={true}
            type="button"
            className="!rounded-[8px]"
            size="full"
            callBack={() => {}}
          >
            Reset Filter
          </ButtonCustom>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-white h-[17px] rounded-full">
                <TableHead className={`${tHeadCn} `}>Name</TableHead>
                <TableHead className={`${tHeadCn}`}>User Type</TableHead>
                <TableHead className={`${tHeadCn}`}>Rating</TableHead>
                <TableHead className={`${tHeadCn}`}>Reviews</TableHead>
                <TableHead className={`${tHeadCn}`}>Feedback Date</TableHead>
                <TableHead className={`${tHeadCn}`}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-[inherit]">
              {renderTableData(0)}
              {renderTableData(1)}
              {renderTableData(2)}
              {renderTableData(3)}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainContainer>
  );
};

export default FeedBackListPage;
