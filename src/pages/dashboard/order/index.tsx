import { deleteProduct} from '@/@api/productApi';
import ButtonCustom from '@/button/ButtonCustom';
import { Dropdown } from 'primereact/dropdown';
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
import getErrorMessage, { cn, debounce, toastMessage } from '@/utils';
import { AddIcon, LoadingIcon, NoMoreData, RemoveIcon } from '@/utils/appIcon';
import { EditIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { orderByLists } from '@/utils/initData';
import { useNavigate } from 'react-router-dom';
import { OrderFilterT, OrderT } from '@/types/order';
import { getOrders } from '@/@api/orderApi';

const tHeadCn = 'text-[#202224] text-[14px] font-bold';

const OrderListPage = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [isFetchAgain, setIsFetchAgain] = useState(false);
  const searchNameRef = useRef<HTMLInputElement | null>(null);
  const [ordersData, setOrdersData] = useState<OrderT[]>([]);
  const [filterData, setFilterData] = useState<OrderFilterT>({
    orderBy: 'desc',
    sortKey: 'created_at',
    limit: 10,
    name: '',
    email: '',
    phone: '',
    fromDate: '',
    toDate: '',
    orderStatus: '',
    status: '',
    userId: '',
    orderNo: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [page, filterData.name, filterData.orderBy]);

  useEffect(() => {
    if (isFetchAgain) {
      fetchProducts();
    }
  }, [isFetchAgain]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getOrders(page, filterData);

      const data = res?.data?.data;
      if (data) {
        setTotal(data.meta.total);
        setOrdersData(data?.data);
        setTimeout(() => {
          setLoading(false);
          setIsFetchAgain(false);
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleSearchName = () => {
    setPage(1);
    if (searchNameRef?.current?.value !== null) {
      setFilterData({
        ...filterData,
        name: searchNameRef?.current?.value || '',
      });
    }
  };

  const handleReset = () => {
    setFilterData({
      orderBy: 'desc',
      sortKey: 'created_at',
      limit: 10,
      name: '',
      email: '',
      phone: '',
      fromDate: '',
      toDate: '',
      orderStatus: '',
      status: '',
      userId: '',
      orderNo: '',
    });
    if (searchNameRef?.current?.value) {
      searchNameRef.current.value = '';
    }
  };

  const handleRemove = async (id: number) => {
    const pass = confirm('Are you sure to delete !');

    if (pass) {
      try {
        await deleteProduct(id);
        toastMessage('success', 'Successfully Deleted !');
        setIsFetchAgain(true);
      } catch (err) {
        toastMessage('error', getErrorMessage(err));
      }
    }
  };

  const debounceSearch = debounce(handleSearchName, 1000);

  const renderTableData = (idx: number, data: OrderT) => {
    return (
      <TableRow
        className={cn(
          `rounded-full overflow-hidden cursor-pointer`,
          `${idx % 2 ? 'bg-[#F3F4F7]' : 'bg-[#FFFFFF80]'}`
        )}
      >
        <TableCell className="font-medium">
          <Text
            label={data.orderNo}
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
          <Text
            label={data.email}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.phone}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.address1}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.city}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.status.toString()}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.quantity.toString()}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.total_price.toString()}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.orderDate}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex items-center gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate(`/product/edit/${data.id}`);
              }}
            >
              <EditIcon />
            </div>
            <div
              onClick={() => {
                handleRemove(data.id);
              }}
            >
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
              navigate('/product/create');
            }}
          >
            <AddIcon />
            Add New Product
          </ButtonCustom>
        </div>
        <div className="w-full flex items-center gap-[24px]">
          <div className="w-[20%]">
            <Input
              name="search"
              type="string"
              sizer="full"
              refObj={searchNameRef}
              placeholder="Search Name,Email,etc..."
              value=""
              className="pl-[35px] w-full"
              onChange={debounceSearch}
              showError={false}
            />
          </div>
          <div className="w-[20%]">
            <Dropdown
              value={filterData.orderBy}
              onChange={(e) => {
                setFilterData({ ...filterData, orderBy: e.value })
                setPage(1)
              }}
              options={orderByLists}
              optionLabel="name"
              optionValue="value"
              placeholder="Select Order"
              className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
            />
          </div>
          <div className="w-[20%]">
            <ButtonCustom
              isOutline={true}
              type="button"
              className="!rounded-[8px]"
              size="full"
              callBack={() => {
                handleReset();
              }}
            >
              Reset Filter
            </ButtonCustom>
          </div>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-white h-[17px] rounded-full">
                <TableHead className={`${tHeadCn} `}>No.</TableHead>
                <TableHead className={`${tHeadCn} `}>Name</TableHead>
                <TableHead className={`${tHeadCn}`}>Email</TableHead>
                <TableHead className={`${tHeadCn}`}>Phone</TableHead>
                <TableHead className={`${tHeadCn}`}>Address</TableHead>
                <TableHead className={`${tHeadCn}`}>City</TableHead>
                <TableHead className={`${tHeadCn}`}>Status</TableHead>
                <TableHead className={`${tHeadCn}`}>Quantity</TableHead>
                <TableHead className={`${tHeadCn}`}>Total Price</TableHead>
                <TableHead className={`${tHeadCn}`}>Order Date</TableHead>
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
            {!loading && ordersData.length === 0 && (
              <TableRow className="bg-[#e8e6e646] h-[450px] border-b-[20px] border-[#f7f7f7]">
                <TableCell colSpan={9} className="pt-5 text-center font-medium">
                  <span className="flex flex-col gap-3 justify-center items-center">
                    No More Data !
                    <NoMoreData width={30} height={30} />
                  </span>
                </TableCell>
              </TableRow>
            )}

            {!loading && ordersData.length > 0 && (
              <TableBody className="w-[inherit]">
                {ordersData?.map((contact, i) => renderTableData(i, contact))}
              </TableBody>
            )}
          </Table>
        </div>
        {ordersData.length > 0 && (
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

export default OrderListPage;
