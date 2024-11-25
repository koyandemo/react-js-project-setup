import { deleteCategory} from '@/@api/categoryApi';
import { getIcons } from '@/@api/iconApi';
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
import { CategoryFilterT} from '@/types/category';
import { IconT } from '@/types/icon';
import getErrorMessage, { cn, toastMessage } from '@/utils';
import { AddIcon, LoadingIcon, NoMoreData, RemoveIcon } from '@/utils/appIcon';
import { orderByLists } from '@/utils/initData';
import { EditIcon } from 'lucide-react';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

const tHeadCn = 'text-[#202224] text-[14px] font-bold';

const IconListPage = () => {
  const navigate = useNavigate();
  const [isFetchAgain,setIsFetchAgain] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [iconsData,setIconsData] = useState<IconT[]>([]);
  const [filterData, setFilterData] = useState<CategoryFilterT>({
    orderBy: 'desc',
    sortKey: 'created_at',
    limit: 10,
  });
 
  useEffect(() => {
    fetchIcons();
  }, [page,filterData.orderBy]);

  useEffect(() => {
    if(isFetchAgain){
      fetchIcons();
    }
  },[isFetchAgain])

  const fetchIcons = async () => {
    try{
      setLoading(true);
      const res = await getIcons(page,filterData);
      const data = res?.data?.data;
      if(data){
        setTotal(data.meta.total);
        setIconsData(data?.data)
        setTimeout(() => {
          setLoading(false);
          setIsFetchAgain(false);
        }, 1000);
      }
      
    }catch(err){
      setLoading(false);
      console.error(err)
    }
  }


  const handleRemove = async (id:number) => {
    const pass = confirm("Are you sure to delete !");
    
    if(pass){
      try{
      await deleteCategory(id);
      toastMessage("success","Successfully Deleted !")
       setIsFetchAgain(true);
      }catch(err){
        toastMessage("error",getErrorMessage(err))
      }
    }
  }

  const renderTableData = (idx: number, data: IconT) => {
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
            <div onClick={() => {navigate(`/icon/edit/${data.id}`)}}>
            <EditIcon />
            </div>
            <div onClick={() =>  {handleRemove(data.id)}}>
            <RemoveIcon />
            </div>
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
            className="!rounded-[8px] px-[32px] !whitespace-nowrap"
            size="full"
            callBack={() => {
              navigate("/icon/create")
            }}
          >
            <AddIcon />
            Add Icon
          </ButtonCustom>
        </div>
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
            {!loading && iconsData.length === 0 && (
              <TableRow className="bg-[#e8e6e646] h-[450px] border-b-[20px] border-[#f7f7f7]">
                <TableCell colSpan={9} className="pt-5 text-center font-medium">
                  <span className="flex flex-col gap-3 justify-center items-center">
                    No More Data !
                    <NoMoreData width={30} height={30} />
                  </span>
                </TableCell>
              </TableRow>
            )}

            {!loading && iconsData.length > 0 && (
              <TableBody className="w-[inherit]">
                {iconsData?.map((contact, i) =>
                  renderTableData(i, contact)
                )}
              </TableBody>
            )}
          </Table>
        </div>
        {iconsData.length > 0 && (
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

export default IconListPage;
