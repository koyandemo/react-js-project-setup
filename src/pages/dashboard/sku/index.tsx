import { getProducts } from '@/@api/productApi';
import { deleteSku, getSkus } from '@/@api/skuApi';
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
import { ProductT } from '@/types/product';
import { SkuFilterT, SkuT } from '@/types/sku';
import getErrorMessage, { cn, toastMessage } from '@/utils';
import { AddIcon, LoadingIcon, NoMoreData, RemoveIcon } from '@/utils/appIcon';
import { orderByLists } from '@/utils/initData';
import { EditIcon } from 'lucide-react';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

const tHeadCn = 'text-[#202224] text-[14px] font-bold';

const SkuListPage = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [isFetchAgain,setIsFetchAgain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skuData, setSkuData] = useState<SkuT[]>([]);
  const [productsData, setProductsData] = useState<ProductT[]>([]);
  const [filterData, setFilterData] = useState<SkuFilterT>({
    orderBy: 'desc',
    sortKey: 'created_at',
    productId: 0,
    limit: 10,
  });

  useEffect(() => {
    fetchSkus();
  }, [filterData.productId, filterData.orderBy]);

  useEffect(() => {
    fetchSkus();
  },[isFetchAgain])

  const fetchProducts = async () => {
    try {
      const res = await getProducts(1, {
        orderBy: 'asc',
        sortKey: 'created_at',
        categoryId: '',
        name: '',
        limit: 1000,
      });
      const data = res?.data?.data?.data;
      if (data) {
        setProductsData(data);
        setFilterData({...filterData,productId : data[0].id})
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSkus = async () => {
    try {
      setLoading(true);
      const res = await getSkus(1, filterData);
      const data = res?.data?.data;
      if (data) {
        setSkuData(data?.data);
        setTotal(data.meta.total);
        fetchProducts();
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleReset = () => {
    setFilterData({
      orderBy: 'desc',
      sortKey: 'created_at',
      productId: 0,
      limit: 10,
    });
  
  };

  const handleRemove = async (id:number) => {
    const pass = confirm("Are you sure to delete !");
    
    if(pass){
      try{
      await deleteSku(id);
      toastMessage("success","Successfully Deleted !")
       setIsFetchAgain(true);
      }catch(err){
        toastMessage("error",getErrorMessage(err))
      }
    }
  }

  const renderTableData = (idx: number, data: SkuT) => {
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
            label={data.skuCode}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.variation}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.description.slice(0, 10)}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <img src={data.image1} width={40} height={40} />
        </TableCell>
        <TableCell className="font-medium">
          <img src={data.image2} width={40} height={40} />
        </TableCell>
        <TableCell className="font-medium">
          <img src={data.image3} width={40} height={40} />
        </TableCell>
        <TableCell className="font-medium">
          <img src={data.image4} width={40} height={40} />
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
            <div
              onClick={() => {
                navigate(`/sku/edit/${data.id}`);
              }}
            >
              <EditIcon />
            </div>
            <div onClick={() => {handleRemove(data.id)}}>
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
        <div className="self-end">
          <ButtonCustom
            isOutline={true}
            type="button"
            className="!rounded-[8px] px-[32px]"
            size="full"
            callBack={() => {
              navigate('/sku/create');
            }}
          >
            <AddIcon />
            Add New Sku
          </ButtonCustom>
        </div>
        <div className="w-full flex items-center gap-[24px]">
          <div className="w-[20%]">
            <Dropdown
              value={filterData.productId}
              onChange={(e) =>
                setFilterData({ ...filterData, productId: e.value })
              }
              options={productsData}
              optionLabel="name"
              optionValue="id"
              placeholder="Select Product"
              className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
            />
          </div>
          <div className="w-[20%]">
            <Dropdown
              value={filterData.orderBy}
              onChange={(e) =>
                setFilterData({ ...filterData, orderBy: e.value })
              }
              options={orderByLists}
              optionLabel="name"
              optionValue="value"
              placeholder="Select Order"
              className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
            />
          </div>
          <ButtonCustom
            isOutline={true}
            type="button"
            className="!rounded-[8px]"
            size="md"
            callBack={() => {
              handleReset();
            }}
          >
            Reset Filter
          </ButtonCustom>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-white h-[17px] rounded-full">
                <TableHead className={`${tHeadCn} `}>No.</TableHead>
                <TableHead className={`${tHeadCn} `}>Sku Code</TableHead>
                <TableHead className={`${tHeadCn}`}>Variation</TableHead>
                <TableHead className={`${tHeadCn}`}>description</TableHead>
                <TableHead className={`${tHeadCn}`}>Image 1</TableHead>
                <TableHead className={`${tHeadCn}`}>Image 2</TableHead>
                <TableHead className={`${tHeadCn}`}>Image 3</TableHead>
                <TableHead className={`${tHeadCn}`}>Image 4</TableHead>
                <TableHead className={`${tHeadCn}`}>Created Date</TableHead>
                <TableHead className={`${tHeadCn}`}>Action</TableHead>
              </TableRow>
            </TableHeader>
            {loading && (
              <TableRow className="relative h-[450px]">
                <TableCell
                  colSpan={10}
                  className="pt-[50px] font-medium w-full"
                >
                  <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-100%]">
                    <LoadingIcon />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!loading && skuData.length === 0 && (
              <TableRow className="bg-[#e8e6e646] h-[450px] border-b-[20px] border-[#f7f7f7]">
                <TableCell
                  colSpan={10}
                  className="pt-5 text-center font-medium"
                >
                  <span className="flex flex-col gap-3 justify-center items-center">
                    No More Data !
                    <NoMoreData width={30} height={30} />
                  </span>
                </TableCell>
              </TableRow>
            )}

            {!loading && skuData.length > 0 && (
              <TableBody className="w-[inherit]">
                {skuData?.map((contact, i) => renderTableData(i, contact))}
              </TableBody>
            )}
          </Table>
        </div>
        {skuData.length > 0 && (
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

export default SkuListPage;
