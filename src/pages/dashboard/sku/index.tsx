import { getSkus } from '@/@api/skuApi';
import ButtonCustom from '@/button/ButtonCustom';
import DropDownDefault from '@/components/dropDown/DropDownDefault';
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
import { SkuFilterT, SkuT } from '@/types/sku';
import { cn } from '@/utils';
import { AddIcon, LoadingIcon, NoMoreData, RemoveIcon } from '@/utils/appIcon';
import { EditIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const tHeadCn = 'text-[#202224] text-[14px] font-bold';

const SkuListPage = () => {
  const [loading, setLoading] = useState(false);
  const [skuData, setSkuData] = useState<SkuT[]>([]);
  const [filterData] = useState<SkuFilterT>({
    orderBy: 'desc',
    sortKey: 'created_at',
    productId:1,
    limit: 10,
  });
 
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getSkus(1, filterData);
      const data = res?.data?.data?.data;
      console.log(res)
      if (res?.data?.data?.data) {
        setSkuData(data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const renderTableData = (idx: number,data:SkuT) => {
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
            label={data.description.slice(0,10)}
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
            Add New Sku
          </ButtonCustom>
        </div>
        <div className="w-full flex items-center gap-[0px]">
          {/* <Input
            name="search"
            type="string"
            sizer="full"
            placeholder="Search Name,Email,etc..."
            value=""
            className="pl-[35px]"
            onClick={(e) => {
              console.log(e);
            }}
          /> */}
          <DropDownDefault label="Product" size="lg" callBack={() => {}} />
          <DropDownDefault label="Order By" size="lg" callBack={() => {}} />
          <ButtonCustom
            isOutline={true}
            type="button"
            className="!rounded-[8px]"
            size="md"
            callBack={() => {}}
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
                <TableCell colSpan={10} className="pt-[50px] font-medium w-full">
                  <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-100%]">
                    <LoadingIcon />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!loading && skuData.length === 0 && (
              <TableRow className="bg-[#e8e6e646] h-[450px] border-b-[20px] border-[#f7f7f7]">
                <TableCell colSpan={10} className="pt-5 text-center font-medium">
                <span className="flex flex-col gap-3 justify-center items-center">
                No More Data !
                <NoMoreData width={30} height={30} />
                </span>
                </TableCell>
              </TableRow>
            )}

            {!loading && skuData.length > 0 && (
               <TableBody className="w-[inherit]">
               {skuData?.map((contact,i) => renderTableData(i, contact))}
             </TableBody>
            )}
          </Table>
        </div>
      </div>
    </MainContainer>
  );
};

export default SkuListPage;
