import { FileUploadIcon } from '@/utils/appIcon';
import Text from '../typography/Text';

const IconUpload = () => {
  return (
    <div className="flex flex-col gap-[5px] w-full">
      <Text
        label={'Icon Photo'}
        size="sm"
        weight="medium"
        isPrimary={false}
        transform="capitalize"
      />
      <div className='w-full h-[114px] flex flex-col gap-[12px] rounded-[8px] justify-center items-center border-[2px] border-dashed border-[#1849D6]'>
            <div>

            </div>
            <label
              htmlFor="dropzone-file"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUploadIcon />
                <p className="mb-2 text-sm font-[600] text-[#1849D6] cursor-pointer">
                  <span className="text-[#0B0B0B]">Drag your photo  or </span>
                  browse
                </p>
                <p className="text-sm text-[#6D6D6D]">
                  Max 5 MB Files are allowed
                
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                //onChange={(e) => handleFileChange(e)}
              />
            </label>
      </div>
    </div>
  );
};

export default IconUpload;
