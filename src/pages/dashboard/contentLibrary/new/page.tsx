import ButtonCustom from '@/button/ButtonCustom';
import DropDownDefault from '@/components/dropDown/DropDownDefault';
import Input from '@/components/input/Input';
import MainContainer from '@/components/MainContainer';
import MainContainerHeader from '@/components/MainContainerHeader';
import IconUpload from '@/components/upload/IconUpload';

const ContentLibraryCreatePage = () => {
  return (
    <MainContainer
      background="#FFFFFF"
      className="flex flex-col justify-between"
    >
      <div>
        <MainContainerHeader title="Content Library Create" />
        <div className="flex flex-col gap-[24px] mt-[50px]">
          <div className="w-full flex items-center gap-[16px]">
            <Input
              type="string"
              sizer={'full'}
              id="name"
              name="name"
              label="Name"
              placeholder="Youtube"
            />
            <DropDownDefault
              labelTitle="Status"
              label="Select Status"
              size="full"
              callBack={() => {}}
            />
          </div>
          <div className="w-full flex items-center gap-[16px]">
            <DropDownDefault
              labelTitle="Type"
              label="Choose Type"
              size="full"
              callBack={() => {}}
            />
            <DropDownDefault
              labelTitle="Category"
              label="Choose Category"
              size="full"
              callBack={() => {}}
            />
          </div>
          <div>
            <IconUpload />
          </div>
        </div>
      </div>
      <div className='flex justify-end items-center gap-[5px]'>
        <ButtonCustom type="button" size="lg" isOutline={true}>
          Cancel
        </ButtonCustom>
        <ButtonCustom type="button" size="lg">
          Update
        </ButtonCustom>
      </div>
    </MainContainer>
  );
};

export default ContentLibraryCreatePage;
