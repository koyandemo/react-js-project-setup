import { getCategories } from '@/@api/categoryApi';
import ButtonCustom from '@/button/ButtonCustom';
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
import { CategoryFilterT, CategoryT } from '@/types/category';
import { cn } from '@/utils';
import { AddIcon, LoadingIcon, NoMoreData, RemoveIcon } from '@/utils/appIcon';
import { orderByLists } from '@/utils/initData';
import { EditIcon } from 'lucide-react';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const tHeadCn = 'text-[#202224] text-[14px] font-bold';

const CategoryListPage = () => {
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState<CategoryT[]>([]);
  const [filterData, setFilterData] = useState<CategoryFilterT>({
    orderBy: 'desc',
    sortKey: 'created_at',
    limit: 10,
  });
  // const [dateRange, setDateRange] = useState<DateRange | undefined>();

  useEffect(() => {
    fetchCategoires();
  }, [page,filterData.orderBy]);

  const fetchCategoires = async () => {
    try {
      setLoading(true);
      const res = await getCategories(page, filterData);
      const data = res?.data?.data;
      if (data) {
        setCategoriesData(data.data);
        setTotal(data.meta.total);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const renderTableData = (idx: number, data: CategoryT) => {
    return (
      <TableRow
        className={cn(
          `rounded-full overflow-hidden cursor-pointer`,
          `${idx % 2 ? 'bg-[#F3F4F7]' : 'bg-[#FFFFFF80]'}`
        )}
      >
        <TableCell className="font-medium">
          <Text
            label={data.id.toString()}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.name}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <img src={data.image} width={40} height={40} />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.date}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex items-center gap-[8px]">
            <EditIcon />
            <RemoveIcon />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <MainContainer background="#FFFFFF">
      <div className="w-full flex flex-col gap-[24px]">
        <div className="flex justify-between gap-[10px] self-end">
        <Dropdown
            value={filterData.orderBy}
            onChange={(e) => setFilterData({ ...filterData, orderBy: e.value })}
            options={orderByLists}
            optionLabel="name"
            optionValue="value"
            placeholder="Select Order"
            className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
          />
          <ButtonCustom
            isOutline={true}
            type="button"
            className="!rounded-[8px] px-[32px]"
            size="full"
            callBack={() => {}}
          >
            <AddIcon />
            Add New Category
          </ButtonCustom>
        </div>
        {/* <div className="w-full flex items-center gap-[24px]">
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
        </div> */}
        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-white h-[17px] rounded-full">
                <TableHead className={`${tHeadCn} `}>No.</TableHead>
                <TableHead className={`${tHeadCn} `}>Name</TableHead>
                <TableHead className={`${tHeadCn}`}>Image</TableHead>
                <TableHead className={`${tHeadCn}`}>Create Date</TableHead>
                <TableHead className={`${tHeadCn}`}>Action</TableHead>
              </TableRow>
            </TableHeader>
            {loading && (
              <TableRow className="relative h-[450px]">
                <TableCell colSpan={8} className="pt-[50px] font-medium w-full">
                  <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-100%]">
                    <LoadingIcon />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!loading && categoriesData.length === 0 && (
              <TableRow className="bg-[#e8e6e646] h-[450px] border-b-[20px] border-[#f7f7f7]">
                <TableCell colSpan={9} className="pt-5 text-center font-medium">
                  <span className="flex flex-col gap-3 justify-center items-center">
                    No More Data !
                    <NoMoreData width={30} height={30} />
                  </span>
                </TableCell>
              </TableRow>
            )}

            {!loading && categoriesData.length > 0 && (
              <TableBody className="w-[inherit]">
                {categoriesData?.map((contact, i) =>
                  renderTableData(i, contact)
                )}
              </TableBody>
            )}
          </Table>
        </div>
        {categoriesData.length > 0 && (
          <div className="w-full flex justify-center my-3">
            <ReactPaginate
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              activeClassName={'active'}
              forcePage={page - 1}
              onPageChange={(event) => {
                setPage(event.selected + 1);
              }}
              pageCount={total / 10}
              breakLabel="..."
              previousLabel={'<'}
              nextLabel={'>'}
            />
          </div>
        )}
      </div>
    </MainContainer>
  );
};

export default CategoryListPage;
