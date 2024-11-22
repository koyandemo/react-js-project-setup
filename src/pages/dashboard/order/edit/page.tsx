import { getOrder } from '@/@api/orderApi';
import OrderDetailSection from '@/components/section/OrderDetailSection';
import { OrderT } from '@/types/order';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderEditPage = () => {
  const { id } = useParams();
  const [order,setOrder] = useState<OrderT | null>(null);

  useEffect(() => {
    if(id?.toString()){
        fetchOrderDetail(id);
    }
  }, [id]);

  const fetchOrderDetail = async (id: string) => {
    try {
      const res = await getOrder({ type: 'update', id: +id });
      setOrder(res?.data?.data?.detail);
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
