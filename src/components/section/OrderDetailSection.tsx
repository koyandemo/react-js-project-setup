import { Dropdown } from 'primereact/dropdown';
import Text from '../typography/Text';
import { orderStatusLists } from '@/utils/initData';
import MainContainer from '../MainContainer';
import ButtonCustom from '@/button/ButtonCustom';
import { OrderT } from '@/types/order';
import OrderDetailInfoCard from './OrderDetailInfoCard';
import { generateEmailHint, toastMessage } from '@/utils';
import OrderDetailItemCard from './OrderDetailItemCard';
import { updateOrder } from '@/@api/orderApi';
import { useEffect, useState } from 'react';

type Props = {
  data:OrderT
}

const OrderDetailSection = ({data}:Props) => {
  const [status,setStatus] = useState(0);

  useEffect(() => {
    if(data.status){
      setStatus(data.status)
    }
  },[data.status])

  const handleEditStatus = async () => {
    try{
      const res = await updateOrder({id:data.id,status:status,shippingDate:new Date()});
      console.log(res);
      toastMessage("success","Successfully Updated !")
    }catch(err){
      console.error(err);
    }
  }

  return (
    <MainContainer background="#FFFFFF">
      <div className="py-4 px-4 flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[50px]">
          <Text label={`Order #${data.orderNo}`} size="lg" weight="bold" />
          <div className="flex flex-wrap gap-[20px] justify-between">
          <OrderDetailInfoCard label='Order Info'>
            {/* <Text  label={`Price: ${data.price}`} size='xs' weight='medium' isGray={true} />
            <Text  label={`Total Price: ${data.price}`} size='xs' weight='medium' isGray={true} /> */}
            <Text  label={`Date: ${data.orderDate}`} size='xs' weight='medium' isGray={true} />
            </OrderDetailInfoCard>
            <OrderDetailInfoCard label='Delivery Address'>
              <Text label={`Address1: ${data.address1}`} size='xs' weight='medium' isGray={true} />
              <Text  label={`Address2: ${data.address2}`} size='xs' weight='medium' isGray={true} />
            </OrderDetailInfoCard>
            <OrderDetailInfoCard label='Billing Address'>
              <Text label={`City: ${data.city}`} size='xs' weight='medium' isGray={true} />
              <Text  label={`postal Code: ${data.postal_code}`} size='xs' weight='medium' isGray={true} />
            </OrderDetailInfoCard>
            <OrderDetailInfoCard label='Contact Info'>
            <Text label={`Phone: ${data.phone || "----"}`} size='xs' weight='medium' isGray={true} />
            <Text  label={`Email: ${generateEmailHint(data.email)}`} title={data.email} size='xs' weight='medium' isGray={true} />
            </OrderDetailInfoCard>
          </div>
        </div>
        <hr className="m-[10px] text-gray-900" />
        <div className="flex flex-col justify-start items-start w-full">
          <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
            Customer’s Cart
          </p>
          {data.orderInfo?.map((data) => (
            <OrderDetailItemCard data={data} />
          ))}
        </div>
        <hr className="m-[10px] text-gray-900" />
        <div className="w-[20%] flex flex-col gap-[10px]">
          <Text label="Status" size="sm" weight="bold" />
          <Dropdown
            value={status}
            onChange={(e) => {
              setStatus(e.value);
            }}
            options={orderStatusLists}
            optionLabel="name"
            optionValue="value"
            placeholder="Select Status"
            className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
          />
          <div className='mt-[20px]'>
          <ButtonCustom type="submit" disabled={false} size="lg" callBack={() => {handleEditStatus()}}>
            Update
          </ButtonCustom>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default OrderDetailSection;
