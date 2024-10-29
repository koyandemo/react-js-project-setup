import ButtonCustom from '@/button/ButtonCustom';
import { DateRangePicker } from '@/components/date/DateRangePicker';
import DropDownDefault from '@/components/dropDown/DropDownDefault';
import Input from '@/components/input/Input';
import MainContainer from '@/components/MainContainer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { generateSizeForInput } from '@/utils';
import { AddIcon} from '@/utils/appIcon';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const tHeadCn = 'text-[#202224] text-[14px] font-bold';

const SubscriptionListPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <MainContainer background="#FFFFFF">
      <div className="w-full flex flex-col gap-[24px]">
        <div className="self-end">
          <ButtonCustom
            isOutline={true}
            type="button"
            className="!rounded-[8px] px-[32px]"
            size="full"
            callBack={() => {}}
          >
            <AddIcon />
            Add New Subscription
          </ButtonCustom>
        </div>
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
            label="Joined Date"
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
              <TableRow className="bg-[#FFFFFF80] rounded-full overflow-hidden cursor-pointer">
                <TableCell className="font-medium">{'Hello'}</TableCell>
                <TableCell className="font-medium">{'Hello'}</TableCell>
                <TableCell className="font-medium">{'Hello'}</TableCell>
                <TableCell className="font-medium">{'Hello'}</TableCell>
                <TableCell className="font-medium">{'Hello'}</TableCell>
                <TableCell className="font-medium">{'Hello'}</TableCell>
              </TableRow>
            </TableBody>
            <TableBody className="w-[inherit]">
              <TableRow className="bg-[#F3F4F7] rounded-full overflow-hidden cursor-pointer">
                <TableCell className="font-medium">{'Hello'}</TableCell>
                <TableCell className="font-medium">{'Hello'}</TableCell>
                <TableCell className="font-medium">{'Hello'}</TableCell>
                <TableCell className="font-medium">{'Hello'}</TableCell>
                <TableCell className="font-medium">{'Hello'}</TableCell>
                <TableCell className="font-medium">{'Hello'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </MainContainer>
  );
};

export default SubscriptionListPage;
