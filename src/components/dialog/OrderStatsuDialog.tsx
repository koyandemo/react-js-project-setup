import DialogContainer from './DialogContainer';
import { updateOrder } from '@/@api/orderApi';
import getErrorMessage, { toastMessage } from '@/utils';
import { useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { OrderStatusSchema } from '@/types/schema/orderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import Input from '../input/Input';
import DropDownContainer from '../DropDownContainer';
import { orderStatusLists } from '@/utils/initData';
import { z } from 'zod';
import ButtonCustom from '@/button/ButtonCustom';
import { useEffect, useState } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import useOrderStore from '@/store/useOrderStore';
import useDialogStore from '@/store/useDialogStore';

const OrderStatusDialog = () => {
  const { id } = useParams();
  const { orderStatus, setIsFetchAgain } = useOrderStore();
  const { closeDialog } = useDialogStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof OrderStatusSchema>>({
    resolver: zodResolver(OrderStatusSchema),
  });

  useEffect(() => {
    if (orderStatus) {
      setValue('status', orderStatus);
    }
  }, [orderStatus]);

  const handleEditStatus = async (value: z.infer<typeof OrderStatusSchema>) => {
    try {
      setLoading(true);
      await updateOrder({
        id: id,
        status: value.status,
        shippingDate: value.shippingDate,
        carrierName: value.carrierName || '',
        trackingNo: value.trackingNo || '',
      });
      closeDialog();
      setIsFetchAgain(true);
      toastMessage('success', 'Successfully Updated !');
    } catch (err) {
      setLoading(false);
      console.error(err);
      toastMessage('error', getErrorMessage(err));
    }
  };

  return (
    <DialogContainer title="Order Status" width={450}>
      <form
        className="flex flex-col justify-center gap-[15px] pt-[30px]"
        onSubmit={handleSubmit(handleEditStatus)}
      >
        <DropDownContainer label="Status" error={errors['status']?.message}>
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                value={value}
                onChange={(e) => onChange(e.value)}
                options={orderStatusLists}
                optionLabel="name"
                optionValue="value"
                placeholder="Select Status"
                className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
              />
            )}
          />
        </DropDownContainer>
        <Input
          type="date"
          sizer={'full'}
          id="name"
          name="shippingDate"
          label="Shipping Date"
          placeholder="Enter Shipping Date"
          register={register('shippingDate', { required: true })}
          error={errors['shippingDate']?.message}
        />
        <Input
          type="string"
          sizer={'full'}
          id="name"
          name="carrierName"
          label="Carrier Name"
          placeholder="Enter Carrier Name"
          register={register('carrierName')}
          error={errors['carrierName']?.message}
        />
        <Input
          type="string"
          sizer={'full'}
          id="name"
          name="trackingNo"
          label="Tracking No"
          placeholder="Enter Tracking No"
          register={register('trackingNo')}
          error={errors['trackingNo']?.message}
        />
        <ButtonCustom type="submit" disabled={loading} size="lg">
          {`${loading ? "Loading..." : "Submit"}`}
        </ButtonCustom>
      </form>
    </DialogContainer>
  );
};

export default OrderStatusDialog;
