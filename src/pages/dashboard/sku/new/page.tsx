import { getProducts} from '@/@api/productApi';
import { postSku } from '@/@api/skuApi';
import ButtonCustom from '@/button/ButtonCustom';
import DropDownContainer from '@/components/DropDownContainer';
import Input from '@/components/input/Input';
import TextArea from '@/components/input/TextArea';
import MainContainer from '@/components/MainContainer';
import MainContainerHeader from '@/components/MainContainerHeader';
import FileUpload from '@/components/upload/FileUpload';
import FileUploadValContainer from '@/components/upload/FileUploadValContainer';
import { ProductT } from '@/types/product';
import { SkuSchema } from '@/types/schema/skuSchema';
import getErrorMessage, { toastMessage } from '@/utils';
import { imageBannerData, imageBannerT} from '@/utils/initData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const SkuCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<ProductT[]>([]);
  const [image1BlobUrl, setImage1BlobUrl] =
    useState<imageBannerT>(imageBannerData);
  const [image2BlobUrl, setImage2BlobUrl] =
    useState<imageBannerT>(imageBannerData);
  const [image3BlobUrl, setImage3BlobUrl] =
    useState<imageBannerT>(imageBannerData);
  const [image4BlobUrl, setImage4BlobUrl] =
    useState<imageBannerT>(imageBannerData);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SkuSchema>>({
    resolver: zodResolver(SkuSchema),
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const fetchProducts = async () => {
    try {
      const res = await getProducts(1, {
        orderBy: 'asc',
        sortKey: 'created_at',
        categoryId: '',
        name: '',
        limit: 10,
      });
      const data = res?.data?.data;
      if (data) {
        setProductsData(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkuCreate = async (value: z.infer<typeof SkuSchema>) => {
    console.log(value);
    try{
        setLoading(true);
        const formData = new FormData();
        formData.append("skuCode",value.skuCode);
        formData.append("productId",value.productId.toString());
        formData.append("variationId",'1');
        formData.append("description",value.description);
        formData.append("image1",value.image1); 
        formData.append("image2",value.image2);
        formData.append("image3",value.image3);
        formData.append("image4",value.image4);  
        
        await postSku(formData);
       setLoading(false);
       toastMessage('success', 'Successfully Created !');
       navigate('/sku');
        
    }catch(err){
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
        <MainContainerHeader title="Product Create" />
        <form
          className="flex flex-col gap-[24px] mt-[50px]"
          noValidate
          onSubmit={handleSubmit(handleSkuCreate)}
        >
          <FileUploadValContainer
            label="Image 1"
            error={errors['image1']?.message!}
          >
            <Controller
              name="image1"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  idx="_image1"
                  type="banner"
                  height={300}
                  blobUrl={image1BlobUrl.path}
                  setBlobUrl={(file, path) => {
                    if (file) {
                      onChange(file);
                      setImage1BlobUrl({ value: file, path });
                    }
                  }}
                />
              )}
            />
          </FileUploadValContainer>
          <FileUploadValContainer
            label="Image 2"
            error={errors['image2']?.message!}
          >
            <Controller
              name="image2"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  idx="_image2"
                  type="banner"
                  height={300}
                  blobUrl={image2BlobUrl.path}
                  setBlobUrl={(file, path) => {
                    if (file) {
                      onChange(file);
                      setImage2BlobUrl({ value: file, path });
                    }
                  }}
                />
              )}
            />
          </FileUploadValContainer>
          <FileUploadValContainer
            label="Image 3"
            error={errors['image3']?.message!}
          >
            <Controller
              name="image3"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  idx="_image3"
                  type="banner"
                  height={300}
                  blobUrl={image3BlobUrl.path}
                  setBlobUrl={(file, path) => {
                    if (file) {
                      onChange(file);
                      setImage3BlobUrl({ value: file, path });
                    }
                  }}
                />
              )}
            />
          </FileUploadValContainer>
          <FileUploadValContainer
            label="Image 4"
            error={errors['image4']?.message!}
          >
            <Controller
              name="image4"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  idx="_product_full"
                  type="banner"
                  height={300}
                  blobUrl={image4BlobUrl.path}
                  setBlobUrl={(file, path) => {
                    if (file) {
                      onChange(file);
                      setImage4BlobUrl({ value: file, path });
                    }
                  }}
                />
              )}
            />
          </FileUploadValContainer>
          <div className='w-[50%]'>
            <Input
              type="string"
              sizer={'full'}
              id="skuCode"
              name="skuCode"
              label="Sku Code"
              placeholder="Enter your sku code"
              register={register('skuCode', { required: true })}
              error={errors['skuCode']?.message}
            />
          </div>
          <div className="w-full flex items-center gap-[16px]">
          <DropDownContainer
              label="Variation"
              error={errors['variationId']?.message}
            >
              <Controller
                name="variationId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    value={value}
                    onChange={(e) => onChange(e.value)}
                    options={productsData}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Select Variation"
                    className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
                  />
                )}
              />
            </DropDownContainer>  
            <DropDownContainer
              label="Product"
              error={errors['productId']?.message}
            >
              <Controller
                name="productId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    value={value}
                    onChange={(e) => onChange(e.value)}
                    options={productsData}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Select Product"
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
              Create
            </ButtonCustom>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};

export default SkuCreatePage;
