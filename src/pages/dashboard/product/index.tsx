import { getProducts } from '@/@api/productApi';
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
import { ProductFilterT, ProductT } from '@/types/product';
import { cn, debounce } from '@/utils';
import { AddIcon, LoadingIcon, NoMoreData, RemoveIcon } from '@/utils/appIcon';
import { EditIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { orderByLists } from '@/utils/initData';
import { CategoryT } from '@/types/category';
import { getCategories } from '@/@api/categoryApi';

const tHeadCn = 'text-[#202224] text-[14px] font-bold';

const ProductListPage = () => {
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const searchNameRef = useRef<HTMLInputElement | null>(null);
  const [productsData, setProductsData] = useState<ProductT[]>([]);
  const [categoriesData, setCategoriesData] = useState<CategoryT[]>([]);
  const [filterData, setFilterData] = useState<ProductFilterT>({
    orderBy: 'asc',
    sortKey: 'created_at',
    categoryId: '',
    name: '',
    limit: 10,
  });

  useEffect(() => {
    fetchCategoires();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, filterData.name, filterData.categoryId, filterData.orderBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log(filterData.categoryId)
      const res = await getProducts(page, filterData);
      
      const data = res?.data?.data;
      if (data) {
        setTotal(data.meta.total);
        setProductsData(data?.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const fetchCategoires = async () => {
    try {
      const res = await getCategories(page, {
        orderBy: 'desc',
        sortKey: 'created_at',
        limit: 100,
      });

      const data = res?.data?.data;
      if (data) {
        setCategoriesData(data?.data);
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
      ...filterData,
      orderBy: 'asc',
      sortKey: 'created_at',
      categoryId: '',
      name: '',
    });
    if (searchNameRef?.current?.value) {
      searchNameRef.current.value = '';
    }
  };

  const debounceSearch = debounce(handleSearchName, 1000);

  const renderTableData = (idx: number, data: ProductT) => {
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
          <Text
            label={data.categoryName}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <img src={data.bannerImage} width={40} height={40} />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.weight}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.price.toString()}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
        </TableCell>
        <TableCell className="font-medium">
          <Text
            label={data.discountPrice.toString()}
            size="sm"
            weight="medium"
            className="text-[#475569]"
          />
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
        <div className="self-end">
          <ButtonCustom
            isOutline={true}
            type="button"
            className="!rounded-[8px] px-[32px]"
            size="full"
            callBack={() => {}}
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
            />
          </div>
          <div className="w-[20%]">
            <Dropdown
              value={filterData.orderBy}
              onChange={(e) =>
                setFilterData({ ...filterData, categoryId: e.value })
              }
              options={categoriesData}
              optionLabel="name"
              optionValue="id"
              placeholder="Select Category"
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
                <TableHead className={`${tHeadCn}`}>Category Name</TableHead>
                <TableHead className={`${tHeadCn}`}>Image</TableHead>
                <TableHead className={`${tHeadCn}`}>Weight</TableHead>
                <TableHead className={`${tHeadCn}`}>Price</TableHead>
                <TableHead className={`${tHeadCn}`}>Discount Price</TableHead>
                <TableHead className={`${tHeadCn}`}>Date</TableHead>
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
            {!loading && productsData.length === 0 && (
              <TableRow className="bg-[#e8e6e646] h-[450px] border-b-[20px] border-[#f7f7f7]">
                <TableCell colSpan={9} className="pt-5 text-center font-medium">
                  <span className="flex flex-col gap-3 justify-center items-center">
                    No More Data !
                    <NoMoreData width={30} height={30} />
                  </span>
                </TableCell>
              </TableRow>
            )}

            {!loading && productsData.length > 0 && (
              <TableBody className="w-[inherit]">
                {productsData?.map((contact, i) => renderTableData(i, contact))}
              </TableBody>
            )}
          </Table>
        </div>
        {productsData.length > 0 && (
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

export default ProductListPage;
