import { getCategories } from '@/@api/categoryApi';
import { getProduct, postProduct } from '@/@api/productApi';
import ButtonCustom from '@/button/ButtonCustom';
import DropDownContainer from '@/components/DropDownContainer';
import Input from '@/components/input/Input';
import TextArea from '@/components/input/TextArea';
import MainContainer from '@/components/MainContainer';
import MainContainerHeader from '@/components/MainContainerHeader';
import Text from '@/components/typography/Text';
import FileUpload from '@/components/upload/FileUpload';
import { CategoryT } from '@/types/category';
import { ProductSchema } from '@/types/schema/productSchema';
import getErrorMessage, { toastMessage } from '@/utils';
import { imageBannerT, statusList } from '@/utils/initData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState<CategoryT[]>([]);
  const [bannerBlobUrl, setBannerBlobUrl] = useState<imageBannerT>({
    value: null,
    path: '',
  });

  const {
    register,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
  });

  useEffect(() => {
    if(id){
    fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (id: string) => {
    try {
        const dataFilter = {
            type : "update",
            id : id
        }
      const res = await getProduct(dataFilter);
      const data = res?.data?.data?.detail;
      console.log(data);
      setValue("name",data.name);
      setValue("categoryId",data.categoryId);
      setValue("price",data.price);
      setValue("discountPrice",data.discountPrice);
      setValue("weight",data.weight);
      setValue("customizeStatus",data.customizeStatus);
      setValue("status",data.status);
      setValue("description",data.description)  
      setValue("bannerImage",data.bannerImage)
      setBannerBlobUrl({...bannerBlobUrl,path:data.bannerImage})
      fetchCategoires();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategoires = async () => {
    try {
      const res = await getCategories(1, {
        orderBy: 'desc',
        sortKey: 'created_at',
        limit: 500,
      });
      const data = res?.data?.data;
      if (data) {
        setCategoriesData(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductEdit = async (value: z.infer<typeof ProductSchema>) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('name', value.name);
      formData.append('price', value.price.toString());
      formData.append('categoryId', value.categoryId.toString());
      formData.append('discountPrice', value?.discountPrice ? value?.discountPrice?.toString() : '0');
      formData.append('weight', value.weight.toString());
      formData.append('description', value.description);
      formData.append('customizeStatus', value.customizeStatus.toString());
      formData.append('status', value.status.toString());
      formData.append('bannerImage', value.bannerImage);
      formData.append('frontImage', value.bannerImage);
      formData.append('fullImage', value.bannerImage);
      console.log(value);
      const res = await postProduct(formData);

      console.log(res);
      setLoading(false);
      toastMessage('success', 'Successfully Created !');
      navigate('/product');
    } catch (err) {
      console.error(err);
      setLoading(false);
      toastMessage('error', getErrorMessage(err));
    }
  };

  watch();

  return (
    <MainContainer
      background="#FFFFFF"
      className="flex flex-col justify-between"
    >
      <div>
        <MainContainerHeader title="Product Edit" />
        <form
          className="flex flex-col gap-[24px] mt-[50px]"
          noValidate
          onSubmit={handleSubmit(handleProductEdit)}
        >
          <div className="flex flex-col gap-[0.5em] w-full">
            <Text
              label={'Banner Image'}
              size="sm"
              weight="medium"
              isPrimary={false}
              transform="capitalize"
            />
            <Controller
              name="bannerImage"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  idx="_product_banner"
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
                errors['bannerImage']?.message ? 'inline-block' : 'invisible'
              }`}
            >
              {errors['bannerImage']?.message
                ? errors['bannerImage']?.message
                : 'h'}
            </span>
          </div>
          <div className="w-full flex items-center gap-[16px]">
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
            <DropDownContainer
              label="Category"
              error={errors['categoryId']?.message}
            >
              <Controller
                name="categoryId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    value={value}
                    onChange={(e) => onChange(e.value)}
                    options={categoriesData}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Select a Category"
                    className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
                  />
                )}
              />
            </DropDownContainer>
          </div>
          <div className="w-full flex items-center gap-[16px]">
            <Input
              type="number"
              sizer={'full'}
              id="price"
              name="price"
              label="Price"
              placeholder="Enter your Price"
              register={register('price', {
                required: true,
                valueAsNumber: true,
              })}
              error={errors['price']?.message}
            />
            <Input
              type="number"
              sizer={'full'}
              id="discountPrice"
              name="discountPrice"
              label="Discount Price"
              placeholder="Enter your Discount Price"
              register={register('discountPrice', {
                required: true,
                valueAsNumber: true,
              })}
              error={errors['discountPrice']?.message}
            />
          </div>
          <div className="w-[50%] flex items-center gap-[16px]">
            <Input
              type="number"
              sizer={'full'}
              id="weight"
              name="weight"
              label="Weight"
              placeholder="Enter your Weight"
              register={register('weight', {
                required: true,
                valueAsNumber: true,
              })}
              error={errors['weight']?.message}
            />
          </div>
          <div className="w-full flex items-center gap-[16px]">
            <DropDownContainer
              label="Customize Status"
              error={errors['customizeStatus']?.message}
            >
              <Controller
                name="customizeStatus"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    value={value}
                    onChange={(e) => onChange(+e.value)}
                    options={statusList}
                    optionLabel="name"
                    optionValue="value"
                    placeholder="Select Customize Status"
                    className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
                  />
                )}
              />
            </DropDownContainer>

            <DropDownContainer label="Status" error={errors['status']?.message}>
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    value={value}
                    onChange={(e) => onChange(e.value)}
                    options={statusList}
                    optionLabel="name"
                    optionValue="value"
                    placeholder="Select Status"
                    className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
                  />
                )}
              />
            </DropDownContainer>
          </div>
          <div>
            <TextArea
              label="Description"
              name="description"
              placeholder="Enter your description"
              register={register('description', { required: true })}
              error={errors['description']?.message}
            />
          </div>
          <div className="flex justify-start items-center gap-[5px]">
            <ButtonCustom
              type="button"
              size="lg"
              disabled={loading}
              isOutline={true}
              callBack={() => {
                navigate('/product');
              }}
            >
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

export default ProductEditPage;
