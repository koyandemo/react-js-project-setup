import React from 'react';
import Text from '../typography/Text';

type Props = {
    label:string;
    children:React.ReactNode

}

const OrderDetailInfoCard = ({label,children}:Props) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <Text label={label} size="sm" weight="bold" />
      <div className="flex flex-col gap-[5px]">
        {children}
        {/* <Text label="Hello" size="sm" weight="medium" isGray={true} />
        <Text label="Manchester" size="sm" weight="medium" isGray={true} /> */}
      </div>
    </div>
  );
};

export default OrderDetailInfoCard;
