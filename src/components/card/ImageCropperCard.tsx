import 'cropperjs/dist/cropper.css';
import {
  createRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Text from '../typography/Text';
import ButtonCustom from '@/button/ButtonCustom';

export type CropObj = {
  dataUrl: string;
  open: boolean;
  cropDataUrl: string;
  dataFile: null | File;
  aspectRatio: 'profile' | 'cover' | 'logo' | 'review' | 'account' | 'reset';
  cropDataFile: null | File;
  errorMessage: '';
};

const cropAspectRatio = {
  reset: 1 / 1,
  profile: 0.5 / 0.5,
  cover: 16 / 7,
  logo: 1 / 1,
  review: 2 / 2,
  account: 1 / 1,
};

interface ImageCropperCardProps {
  cropData: CropObj;
  setCropData: Dispatch<SetStateAction<CropObj>>;
}

export const ImageCropperCard = ({
  cropData,
  setCropData,
}: ImageCropperCardProps) => {
  const [loading, setLoading] = useState(true);
  const cropperRef = createRef<ReactCropperElement | any>();
  const [aspectRatio, setAspectRation] = useState<number>(1 / 1);

  useEffect(() => {
    setLoading(true);
    setAspectRation(cropAspectRatio[cropData.aspectRatio]);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [cropData]);

  const onSubmit = async () => {
    const cropDataUrl = cropperRef.current?.cropper
      .getCroppedCanvas()
      .toDataURL();

    const blob = await (await fetch(cropDataUrl)).blob();
    if (cropData.dataFile) {
      const cropDataFile = new File([blob], cropData.dataFile.name, {
        type: cropData.dataFile.type,
        lastModified: cropData.dataFile.lastModified,
      });

      setCropData({
        ...cropData,
        aspectRatio: 'reset',
        open: false,
        cropDataUrl: cropDataUrl,
        cropDataFile: cropDataFile,
      });
    }
  };

  const handleClose = () => {
    setCropData({
      ...cropData,
      open: false,
    });
  };

  return (
    <div>
      <div className="flex justify-center py-[20px]">
        <Text
          label={`Use your two finger with zoom (in/out) for your image.`}
          size={'sm'}
          weight="medium"
        />
      </div>
      <div className="h-[400px] flex justify-center items-center w-[100%]">
        {!loading ? (
          <Cropper
            ref={cropperRef}
            style={{ height: 400, width: '100%' }}
            zoomTo={0.1}
            initialAspectRatio={aspectRatio}
            src={cropData.dataUrl}
            viewMode={2}
            background={false}
            responsive={true}
            restore={false}
            autoCropArea={1}
            checkOrientation={false}
            guides={false}
          />
        ) : (
          <Text label="Loading..." />
        )}
      </div>
      <div className="flex justify-center gap-5 m-3">
        <ButtonCustom type="button" size="lg" isOutline={true} callBack={handleClose}>
          Cancel
        </ButtonCustom>
        <ButtonCustom type="button" size="lg" callBack={onSubmit}>
          Save
        </ButtonCustom>
      </div>
    </div>
  );
};

export default ImageCropperCard;
