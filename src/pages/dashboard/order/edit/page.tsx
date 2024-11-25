import { getOrder } from '@/@api/orderApi';
import OrderDetailSection from '@/components/section/OrderDetailSection';
import useOrderStore from '@/store/useOrderStore';
import { OrderT } from '@/types/order';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderEditPage = () => {
  const { id } = useParams();
  const {isFetchAgain, setIsFetchAgain} = useOrderStore();
  const [order,setOrder] = useState<OrderT | null>(null);

  useEffect(() => {
    if(id?.toString()){
        fetchOrderDetail(id);
    }
  }, [id,isFetchAgain]);

  const fetchOrderDetail = async (id: string) => {
    try {
      const res = await getOrder({ type: 'update', id: +id });
      console.log(res);
      setOrder(res?.data?.data?.detail);
      setIsFetchAgain(false);
    } catch (err) {
      console.error(err);
    }
  };

  return <div>
    {order && 
    <OrderDetailSection data={order} />
    }
  </div>;
};

export default OrderEditPage;
