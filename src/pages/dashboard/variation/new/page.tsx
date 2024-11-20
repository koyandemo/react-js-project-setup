import { postVariation } from '@/@api/variationApi';
import ButtonCustom from '@/button/ButtonCustom';
import Input from '@/components/input/Input';
import MainContainer from '@/components/MainContainer';
import MainContainerHeader from '@/components/MainContainerHeader';
import { VariationSchema } from '@/types/schema/variationSchema';
import getErrorMessage, { toastMessage } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const VariationCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof VariationSchema>>({
    resolver: zodResolver(VariationSchema),
  });

  const handleVariationCreate = async (value: z.infer<typeof VariationSchema>) => {
    try{
      setLoading(true);
      const formData = new FormData();
      formData.append("name",value.name);
      await postVariation(formData);
      setLoading(false);
      toastMessage("success","Successfully Created !")
      navigate("/variation");
    }catch(err){
      setLoading(false);
      console.error(err)
      toastMessage("error",getErrorMessage(err))
    }
  };

  return (
    <MainContainer
      background="#FFFFFF"
      className="flex flex-col justify-between"
    >
      <div>
        <MainContainerHeader title="Variation Create" />
        <form className="flex flex-col gap-[24px] mt-[50px]" noValidate onSubmit={handleSubmit(handleVariationCreate)}>
          <div className="w-[50%] flex items-center gap-[16px]">
            <Input
              type="string"
              sizer={'full'}
              id="name"
              name="name"
              label="Name"
              placeholder="Enter your name"
              register={register('name', { required: true })}
              error={errors['name']?.message}
            />
          </div>
          <div className="flex justify-start items-center gap-[5px]">
            <ButtonCustom type="button" disabled={loading} size="lg" isOutline={true} callBack={() => {navigate("/category")}}>
              Cancel
            </ButtonCustom>
            <ButtonCustom type="submit" disabled={loading} size="lg">
              Create
            </ButtonCustom>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};

export default VariationCreatePage;
