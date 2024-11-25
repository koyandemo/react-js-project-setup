import { editIcon, getIcon, getIconCategorys} from '@/@api/iconApi';
import ButtonCustom from '@/button/ButtonCustom';
import DropDownContainer from '@/components/DropDownContainer';
import Input from '@/components/input/Input';
import MainContainer from '@/components/MainContainer';
import MainContainerHeader from '@/components/MainContainerHeader';
import FileUpload from '@/components/upload/FileUpload';
import FileUploadValContainer from '@/components/upload/FileUploadValContainer';
import { IconSchema } from '@/types/schema/iconSchema';
import getErrorMessage, { toastMessage } from '@/utils';
import { imageBannerData, imageBannerT, statusList } from '@/utils/initData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const IconEditPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [iconCategories, setIconCategores] = useState<IconCategoryT[]>([]);
  const [imageBlobUrl, setImageBlobUrl] =
    useState<imageBannerT>(imageBannerData);
  const [layout1BlobUrl, setLayout1BlobUrl] =
    useState<imageBannerT>(imageBannerData);
  const [layout2BlobUrl, setLayout2BlobUrl] =
    useState<imageBannerT>(imageBannerData);
  const [layout3BlobUrl, setLayout3BlobUrl] =
    useState<imageBannerT>(imageBannerData);

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof IconSchema>>({
    resolver: zodResolver(IconSchema),
  });
  

  

  useEffect(() => {
    if (id) {
      fetchIcon(id);
    }
  }, [id]);

  const fetchIcon = async (id:string) => {
    try {
        const dataFilter = {
            id: id,
            type: 'update',
          };
      const res = await getIcon(dataFilter);
      const data = res?.data?.data?.detail;
      if(data){
        setValue("name",data.name);
        setValue("iconCategoryId",data.iconCategoryId);
        setValue("image",data.image);
        setImageBlobUrl({ ...imageBlobUrl, path: data.image });
        setValue("layout1Image",data.layout1Image);
        setLayout1BlobUrl({ ...layout1BlobUrl, path: data.layout1Image });
        setValue("layout2Image",data.layout2Image);
        setLayout2BlobUrl({ ...layout2BlobUrl, path: data.layout2Image });
        setValue("layout3Image",data.layout3Image);
        setLayout3BlobUrl({ ...layout3BlobUrl, path: data.layout3Image });
      }
      fetchIconCategores();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchIconCategores = async () => {
    try {
      const data = {
        orderBy: 'desc',
        sortKey: '',
        limit: 100,
      };
      const res = await getIconCategorys(1, data);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIconUpdate = async (value: z.infer<typeof IconSchema>) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("id",id?.toString() || "");
      formData.append('name', value.name);
      formData.append('iconCategoryId', value.iconCategoryId.toString());
      if(imageBlobUrl.value){
        formData.append('image', value.image);
        }
      formData.append('image', value.image || '');
      formData.append('layout1Image', value.layout1Image || '');
      formData.append('layout2Image', value.layout2Image || '');
      formData.append('layout3Image', value.layout3Image || '');
      await editIcon(formData);
      setLoading(false);
      toastMessage('success', 'Successfully Created !');
      navigate('/category');
    } catch (err) {
      setLoading(false);
      console.error(err);
      toastMessage('error', getErrorMessage(err));
    }
  };

  return (
    <MainContainer
      background="#FFFFFF"
      className="flex flex-col justify-between"
    >
      <div>
        <MainContainerHeader title="Category Update" />
        <form
          className="flex flex-col gap-[24px] mt-[50px]"
          noValidate
          onSubmit={handleSubmit(handleIconUpdate)}
        >
          <FileUploadValContainer
            label="Image"
            error={errors['image']?.message!}
          >
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  idx="_image_banner"
                  type="banner"
                  height={300}
                  blobUrl={imageBlobUrl.path}
                  setBlobUrl={(file, path) => {
                    if (file) {
                      onChange(file);
                      setImageBlobUrl({ value: file, path });
                    }
                  }}
                />
              )}
            />
          </FileUploadValContainer>
          <FileUploadValContainer
            label="Layout 1"
            error={errors['layout1Image']?.message!}
          >
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  idx="_layout1_banner"
                  type="banner"
                  height={300}
                  blobUrl={layout1BlobUrl.path}
                  setBlobUrl={(file, path) => {
                    if (file) {
                      onChange(file);
                      setLayout1BlobUrl({ value: file, path });
                    }
                  }}
                />
              )}
            />
          </FileUploadValContainer>
          <FileUploadValContainer
            label="Layout 2"
            error={errors['layout2Image']?.message!}
          >
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  idx="_layout2_banner"
                  type="banner"
                  height={300}
                  blobUrl={layout2BlobUrl.path}
                  setBlobUrl={(file, path) => {
                    if (file) {
                      onChange(file);
                      setLayout2BlobUrl({ value: file, path });
                    }
                  }}
                />
              )}
            />
          </FileUploadValContainer>
          <FileUploadValContainer
            label="Layout 3"
            error={errors['layout3Image']?.message!}
          >
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <FileUpload
                  idx="_layout3_banner"
                  type="banner"
                  height={300}
                  blobUrl={layout3BlobUrl.path}
                  setBlobUrl={(file, path) => {
                    if (file) {
                      onChange(file);
                      setLayout3BlobUrl({ value: file, path });
                    }
                  }}
                />
              )}
            />
          </FileUploadValContainer>
          <div className="w-[500px] flex items-center gap-[16px]">
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
          <div className="w-[500px] flex items-center gap-[16px]">
            <DropDownContainer
              label="Category"
              error={errors['iconCategoryId']?.message}
            >
              <Controller
                name="iconCategoryId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    value={value}
                    onChange={(e) => onChange(e.value)}
                    options={statusList}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Select a Category"
                    className="!h-[50px] flex justify-center items-center px-[15px] w-full rounded-[8px] border border-[#B3B3B3] !outline-none"
                  />
                )}
              />
            </DropDownContainer>
          </div>
          <div className="flex justify-start items-center gap-[5px]">
            <ButtonCustom
              type="button"
              disabled={loading}
              size="lg"
              isOutline={true}
              callBack={() => {
                navigate('/category');
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

export default IconEditPage;
