import ButtonCustom from '@/button/ButtonCustom';
import { DateRangePicker } from '@/components/date/DateRangePicker';
import DropDownDefault from '@/components/dropDown/DropDownDefault';
import Input from '@/components/input/Input';
import ToggleChecked from '@/components/input/ToggleChecked';
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
import { AddIcon, EyeIcon, RemoveIcon} from '@/utils/appIcon';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';

const tHeadCn = 'text-[#202224] text-[14px] font-bold';

const ContentLibraryListPage = () => {
    const navigate = useNavigate();
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
            label={'Youtube'}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={'Social'}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <ToggleChecked checked={false} callBack={() => {}} />
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
          <img  src='/youtube-icon.png' width={40} height={40} />
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
      <div className="self-end">
          <ButtonCustom
            isOutline={true}
            type="button"
            className="!rounded-[8px]"
            size="lg"
            callBack={() => {
                navigate("/content-library/new")
            }}
          >
            <AddIcon />
            Add New Icon
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
          <DateRangePicker
            label="Created Date"
            dateRange={dateRange}
            setDateRange={setDateRange}
            className={`${generateSizeForInput('full')}`}
          />
          <DropDownDefault label="Category" size="full" callBack={() => {}} />
          <DropDownDefault label="Type" size="full" callBack={() => {}} />
          <DropDownDefault label="Status" size="full" callBack={() => {}} />
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
                <TableHead className={`${tHeadCn}`}>Category</TableHead>
                <TableHead className={`${tHeadCn}`}>Recommended</TableHead>
                <TableHead className={`${tHeadCn}`}>Type</TableHead>
                <TableHead className={`${tHeadCn}`}>Image</TableHead>
                <TableHead className={`${tHeadCn}`}>Status</TableHead>
                <TableHead className={`${tHeadCn}`}>Created Date</TableHead>
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

export default ContentLibraryListPage;
