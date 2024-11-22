import { OrderInfoT } from "@/types/order";
import Text from "../typography/Text";

type Props = {
    data:OrderInfoT
}

const OrderDetailItemCard = ({data}:Props) => {
    console.log(data)
  return (
    <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
      <div className="pb-4 md:pb-8 w-full md:w-40">
        <img
          className="w-full"
          src={data.image}
          alt="dress"
        />
        {/* "https://i.ibb.co/84qQR4p/Rectangle-10.png" */}
        {/* <img
          className="w-full md:hidden"
          src="https://i.ibb.co/L039qbN/Rectangle-10.png"
          alt="dress"
        /> */}
      </div>
      <div className="border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
        <div className="w-full flex flex-col justify-between items-start space-y-8">
          <Text label={data.product} size="lg" weight="bold" />
          <div className="flex justify-start items-start flex-col space-y-2">
            <p className="text-sm leading-none text-gray-800">
              <span className="text-gray-300">Variation: </span> {data.variation}
              
            </p>
            <p className="text-sm leading-none text-gray-800">
              <span className="text-gray-300">Quantity: </span> {data.quantity}
            </p>
            <p className="text-sm leading-none text-gray-800">
              <span className="text-gray-300">SkuCode: </span> {data.skuCode}
            </p>
          </div>
        </div>
           <div className="w-[100px]">
           <Text label={`$ ${data.price.toString()}`} size="lg" weight="bold" />
           </div>
      </div>
    </div>
  );
};

export default OrderDetailItemCard;
