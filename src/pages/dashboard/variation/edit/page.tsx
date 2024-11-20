import { editVariation, getVariation} from '@/@api/variationApi';
import ButtonCustom from '@/button/ButtonCustom';
import Input from '@/components/input/Input';
import MainContainer from '@/components/MainContainer';
import MainContainerHeader from '@/components/MainContainerHeader';
import { VariationSchema } from '@/types/schema/variationSchema';
import getErrorMessage, { toastMessage } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const VariationEditPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof VariationSchema>>({
    resolver: zodResolver(VariationSchema),
  });

  useEffect(() => {
    if(id){
      fetchVariation(id);
    }
  },[id])

  const fetchVariation = async (id:string) => {
    try{
      const formData = new FormData();
      formData.append("id",id);
      const res = await getVariation(formData);
      const data = res?.data?.data?.detail;
      if(data){
      setValue("name",data.name)
      }
    }catch(err){
      console.error(err)
    }
  }

  const handleVariationEdit = async (value: z.infer<typeof VariationSchema>) => {
    try{
      setLoading(true);
      const formData = new FormData();
      formData.append("id",id || "");
      formData.append("name",value.name);
      await editVariation(formData);
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
        <MainContainerHeader title="Variation Edit" />
        <form className="flex flex-col gap-[24px] mt-[50px]" noValidate onSubmit={handleSubmit(handleVariationEdit)}>
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
              Update
            </ButtonCustom>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};

export default VariationEditPage;
