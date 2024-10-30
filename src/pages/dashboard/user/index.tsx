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
import { EditIcon, ExportIcon } from '@/utils/appIcon';
import { EyeIcon } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const tHeadCn = 'text-[#202224] text-[14px] font-bold';

const UserListPage = () => {
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
          <Text
            label={'000001351'}
            size="sm"
            weight="bold"
            className="text-[#6D3DF5]"
          />
        </TableCell>
        <TableCell className='font-medium'>
        <Text
            label={'Chandler Bing'}
            size="sm"
            weight="bold"
            className="text-[#6D3DF5]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={'chandler@gmail.com'}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={'SHRE Pro'}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <div className="w-[75px] h-[33px] flex justify-center items-center  p-[8px] rounded-[8px] bg-[#CCF0EB]">
            <Text
              label="Active"
              size="sm"
              weight="medium"
              className="text-[#00B69B]"
            />
          </div>
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={'2024-07-24'}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex items-center gap-[8px]">
            <EditIcon />
            <EyeIcon />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <MainContainer background="#FFFFFF">
      <div className="w-full flex flex-col gap-[24px]">
        <div className="self-end">
          <ButtonCustom
            isOutline={true}
            type="button"
            className="!rounded-[8px]"
            size="lg"
            callBack={() => {}}
          >
            <ExportIcon />
            Export CSV
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
                <TableHead className={`${tHeadCn} `}>Id Number</TableHead>
                <TableHead className={`${tHeadCn}`}>Name</TableHead>
                <TableHead className={`${tHeadCn}`}>Email Address</TableHead>
                <TableHead className={`${tHeadCn}`}>User Type</TableHead>
                <TableHead className={`${tHeadCn}`}>Status</TableHead>
                <TableHead className={`${tHeadCn}`}>Joined Date</TableHead>
                <TableHead className={`${tHeadCn}`}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-[inherit]">
              {renderTableData(0)}
              {renderTableData(1)}
              {renderTableData(2)}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainContainer>
  );
};

export default UserListPage;
