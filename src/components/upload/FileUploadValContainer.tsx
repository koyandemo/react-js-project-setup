import Text from '../typography/Text';

type Props = {
  label?: string;
  children: React.ReactNode;
  error: string;
};

const FileUploadValContainer = ({ label = '', children, error }: Props) => {
  return (
    <div className="flex flex-col gap-[0.5em] w-full">
      {label && (
        <Text
          label={label}
          size="sm"
          weight="medium"
          isPrimary={false}
          transform="capitalize"
        />
      )}
      {children}

      <span
        className={`text-red-500  text-xs ${
          error ? 'inline-block' : 'invisible'
        }`}
      >
        {error ? error : 'h'}
      </span>
    </div>
  );
};

export default FileUploadValContainer;


{/* <div className="flex flex-col gap-[0.5em] w-full">
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
          </div> */}