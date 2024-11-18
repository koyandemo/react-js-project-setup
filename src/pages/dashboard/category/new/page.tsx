import { postCategory } from '@/@api/categoryApi';
import ButtonCustom from '@/button/ButtonCustom';
import Input from '@/components/input/Input';
import MainContainer from '@/components/MainContainer';
import MainContainerHeader from '@/components/MainContainerHeader';
import Text from '@/components/typography/Text';
import FileUpload from '@/components/upload/FileUpload';
import { CategorySchema } from '@/types/schema/categorySchema';
import getErrorMessage, { toastMessage } from '@/utils';
import { imageBannerT } from '@/utils/initData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const CategoryCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bannerBlobUrl, setBannerBlobUrl] = useState<imageBannerT>({
    value: null,
    path: '',
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
  });

  const handleCategoryCreate = async (value: z.infer<typeof CategorySchema>) => {
    try{
      setLoading(true);
      const formData = new FormData();
      formData.append("name",value.name);
      formData.append("image",value.image || "")
      await postCategory(formData);
      setLoading(false);
      toastMessage("success","Successfully Created !")
      navigate("/category");
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
        <MainContainerHeader title="Category Create" />
        <form className="flex flex-col gap-[24px] mt-[50px]" noValidate onSubmit={handleSubmit(handleCategoryCreate)}>
          <div className="flex flex-col gap-[0.5em] w-full">
            <Text
              label={'Category Image'}
              size="sm"
              weight="medium"
              isPrimary={false}
              transform="capitalize"
            />
             <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  idx="_category_banner"
                  type="banner"
                  height={300}
                  blobUrl={bannerBlobUrl.path}
                  setBlobUrl={(file, path) => {
                    if (file) {
                      onChange(file);
                      setBannerBlobUrl({ value: file, path });
                    }
                  }}
                />
              )}
            />
             <span
              className={`text-red-500  text-xs ${
                errors['image']?.message ? 'inline-block' : 'invisible'
              }`}
            >
              {errors['image']?.message
                ? errors['image']?.message
                : 'h'}
            </span>
          </div>
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

export default CategoryCreatePage;
