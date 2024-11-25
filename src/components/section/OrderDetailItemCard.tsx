import { OrderInfoT } from '@/types/order';
import Text from '../typography/Text';
import DialogContainer from '../dialog/DialogContainer';
import ButtonCustom from '@/button/ButtonCustom';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { CheckIcon, LucideCopy } from 'lucide-react';

type Props = {
  data: OrderInfoT;
};

const OrderDetailItemCard = ({ data }: Props) => {
  const [isQR, setIsQR] = useState(false);
  const [isCopy,setIsCopy] = useState(false);

  const handleCopy = (value:string) => {
    setIsCopy(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopy(false);
    },2000)

  }

  return (
    <div>
      <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
        <div className="pb-4 md:pb-8 w-full md:w-50 bg-gray-200">
          <img className="w-full h-[120px]" src={data.image} alt="dress" />
        </div>
        <div className="border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
          <div className="w-full flex flex-col justify-between items-start space-y-8">
            <Text label={data.product} size="md" weight="bold" />
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-sm leading-none text-gray-800">
                <span className="text-gray-300">Variation: </span>{' '}
                {data.variation}
              </p>
              <p className="text-sm leading-none text-gray-800">
                <span className="text-gray-300">Quantity: </span>{' '}
                {data.quantity}
              </p>
              <p className="text-sm leading-none text-gray-800">
                <span className="text-gray-300">SkuCode: </span> {data.skuCode}
              </p>
            </div>
          </div>
          <div className="w-[100px]">
            <Text
              label={`$ ${data.price.toString()}`}
              size="md"
              weight="bold"
            />
          </div>
        </div>
      </div>
      <div className="mt-[30px]">
        <ButtonCustom
          type="submit"
          disabled={false}
          size="lg"
          callBack={() => {
            setIsQR(true);
          }}
        >
          Generate QR
        </ButtonCustom>
      </div>
      {isQR && (
        <DialogContainer
          width={520}
          title="QR Code"
          onCloseClick={() => {
            setIsQR(false);
          }}
        >
          <div className="relative flex flex-col gap-[20px] justify-center h-[400px] items-center">
            <QRCodeSVG
              value={`${data.url}`}
              size={180}
              height={200}
              width={200}
            />
           <div className='flex gap-[8px] cursor-pointer' onClick={() => {handleCopy(data.url)}}>
           <Text
              label={data.url}
              weight="bold"
              size="xs"
              className="text-[#475569]"
            />
            {isCopy ?
          <CheckIcon size={18} />
          :
          <LucideCopy size={18} />  
          }
           </div>
          </div>
        </DialogContainer>
      )}
    </div>
  );
};

export default OrderDetailItemCard;
