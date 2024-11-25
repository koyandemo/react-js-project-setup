import Text from '../typography/Text';
import MainContainer from '../MainContainer';
import ButtonCustom from '@/button/ButtonCustom';
import { OrderT } from '@/types/order';
import OrderDetailInfoCard from './OrderDetailInfoCard';
import { generateEmailHint, generateOrderStatus, generateOrderStatusColor} from '@/utils';
import OrderDetailItemCard from './OrderDetailItemCard';
import MainContainerHeader from '../MainContainerHeader';
import useDialogStore from '@/store/useDialogStore';
import useOrderStore from '@/store/useOrderStore';

type Props = {
  data: OrderT;
};

const OrderDetailSection = ({ data }: Props) => {
  const { openDialog} = useDialogStore();
  const {setOrderStatus} = useOrderStore();
 
 

  return (
    <div>
    <MainContainer background="#FFFFFF">
    <MainContainerHeader title={`Order #${data.orderNo}`} />
      <div className="py-4 px-4 flex flex-col gap-[30px] mt-[50px]">
        <div className="flex flex-col gap-[15px]">
          <div className="flex flex-wrap gap-[25px] justify-between">
            <OrderDetailInfoCard label="Order Info">
              <Text
                label={`Name: ${data.name}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
              <Text
                label={`Date: ${data.orderDate}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
            </OrderDetailInfoCard>
            <OrderDetailInfoCard label="Delivery Address">
              <Text
                label={`Address1: ${data.address1}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
              <Text
                label={`Address2: ${data.address2}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
            </OrderDetailInfoCard>
            <OrderDetailInfoCard label="Billing Address">
              <Text
                label={`City: ${data.city}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
              <Text
                label={`postal Code: ${data.postal_code}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
            </OrderDetailInfoCard>
            <OrderDetailInfoCard label="Contact Info">
              <Text
                label={`Phone: ${data.phone || '----'}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
              <Text
                label={`Email: ${generateEmailHint(data.email)}`}
                title={data.email}
                size="sm"
                weight="medium"
                isGray={true}
              />
            </OrderDetailInfoCard>
            <OrderDetailInfoCard label="Price">
              <Text
                label={`Total: £${data.total_price}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
             <Text
                label={`Discount Price: £${data.total_price}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
              <Text
                label={`Delivery Price: £${data.deliveryPrice}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
              <Text
                label={`VAT: £${data.vat}`}
                size="sm"
                weight="medium"
                isGray={true}
              />
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
          <div className='flex items-center gap-[10px]'>
          <Text label="Order Status&nbsp;&nbsp;:" size="sm" weight="bold" />
           <div className={`${generateOrderStatusColor(data.status)} px-[15px] py-[5px]  rounded-full`}>
           <Text label={generateOrderStatus(data.status) || ""} size="sm" weight="bold" isWhite={true} />
           </div>
          </div>
          <div className="mt-[20px]">
            <ButtonCustom
              type="submit"
              disabled={false}
              size="lg"
              callBack={() => {
              setOrderStatus(data.status)
               openDialog("orderStatusDialog")
              }}
            >
              Status Change
            </ButtonCustom>
          </div>
        </div>
      </div>
    </MainContainer>
    </div>
  );
};

export default OrderDetailSection;
