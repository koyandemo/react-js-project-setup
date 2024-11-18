import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { readFile } from '@/utils';
import { FileUploadIcon, ImageRemoveIcon, ImageUploadRoundedIcon } from '@/utils/appIcon';
import { CropObj } from '../card/ImageCropperCard';
import ImageCropperDialog from '../dialog/ImgeCropperDialog';

interface FileUploadProps {
  idx: string;
  type?: 'profile' | 'banner';
  height?: number;
  blobUrl: string;
  setBlobUrl: (file: File | null, path: string) => void;
  disabled?: boolean;
  removable?: boolean;
}

const FileUpload = ({
  idx = 'banner123',
  type = 'profile',
  height = 153,
  blobUrl,
  setBlobUrl,
  disabled = false,
  removable = false
}: FileUploadProps) => {
  const [imageError, setImageError] = useState<any>(null);

  useEffect(() => {
    if (blobUrl) {
      setImageError(null);
    }
  }, [blobUrl]);

  const [cropData, setCropData] = useState<CropObj>({
    dataUrl: '',
    open: false,
    cropDataUrl: '',
    dataFile: null,
    cropDataFile: null,
    errorMessage: '',
    aspectRatio: 'profile',
  });

  useEffect(() => {
    if (cropData.cropDataUrl && cropData.cropDataFile) {
      setBlobUrl(cropData.cropDataFile, cropData.cropDataUrl);
    }
  }, [cropData.cropDataUrl, cropData.cropDataFile]);

  const onRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setBlobUrl(null, '');
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      if (typeof imageDataUrl === 'string') {
        setCropData({
          ...cropData,
          aspectRatio: type === 'profile' ? 'profile' : 'cover',
          dataUrl: imageDataUrl || '',
          dataFile: file,
          open: true,
        });
      }
    }
  };

  const cssNames = [
    'relative',
    type === 'banner'
      ? `w-[500px] h-[${height}px] border  border-[#B3B3B3] rounded-xl`
      : '',
  ].join(' ');

  return (
    <div className={cssNames}>
      <label htmlFor={idx} className="cursor-pointer">
        {type === 'banner' && blobUrl && (
          <img
            alt="bannerImg"
            src={blobUrl ? blobUrl : '/default_banner.png'}
            width={465}
            height={height}
            style={{
              borderRadius: '12px',
              width: '100%',
              background: 'cover',
              objectFit: 'cover',
              height: `${height}px`,
            }}
            className={disabled ? 'opacity-70' : ''}
          />
        )}
        {type === 'profile' && (
          <img
            alt="profile"
            src={
              imageError
                ? '/default_profile.png'
                : blobUrl
                  ? blobUrl
                  : '/default_profile.png'
            }
            width={101}
            height={101}
            style={{
              borderRadius: type === 'profile' ? '50%' : '2px',
              height: type === 'profile' ? `101px` : '153px',
              objectFit: 'cover',
              background: 'white',
            }}
            onError={() => setImageError('error')}
            className={disabled ? 'opacity-70' : ''}
          />
        )}

        <input
          id={idx}
          accept="image/png, image/jpeg"
          onChange={(e) => onFileChange(e)}
          className="hidden"
          type={'file'}
          disabled={disabled}
        />
        {type === 'banner' && !blobUrl && (
          <div
            className={`flex w-full h-[300px] flex-col items-center  justify-center pt-5 pb-6`}
          >
            <FileUploadIcon />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
          </div>
        )}
        {blobUrl && removable && !disabled && (
          <button
            className="absolute -top-1 -right-1"
            onClick={(e) => onRemove(e)}
          >
            <ImageRemoveIcon />
          </button>
        )}
        {blobUrl && !disabled && (
          <div className="absolute -bottom-1 -right-1">
            <ImageUploadRoundedIcon />
          </div>
        )}
      </label>
      <ImageCropperDialog cropData={cropData} setCropData={setCropData} />
    </div>
  );
};

export default FileUpload;
