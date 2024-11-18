import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import ImageCropperCard, { CropObj } from '../card/ImageCropperCard';

const variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.125, animation: 'just' },
  },
  hidden: { y: 32, opacity: 0, transition: { animation: 'just' } },
};

type Props = {
  cropData: CropObj;
  setCropData: Dispatch<SetStateAction<CropObj>>;
};

const ImageCropperDialog = ({ cropData, setCropData }: Props) => {
  return (
    <div
      className={`${cropData.open ? 'fixed' : 'hidden'} z-[999] flex justify-center items-center overflow-y-scroll inset-0  bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}
    >
      <motion.div
        variants={variants}
        animate={'visible'}
        onClick={(e) => e.stopPropagation()}
        className="relative  bg-white rounded-xl w-[500px] min-h-[250px] pb-[10px]"
      >
        <ImageCropperCard setCropData={setCropData} cropData={cropData} />
      </motion.div>
    </div>
  );
};

export default ImageCropperDialog;
