import Text from '@/components/typography/Text';
import useDialogStore from '@/store/useDialogStore';
import { XIcon } from '@/utils/appIcon';
import { motion } from 'framer-motion';
import { InfoIcon } from 'lucide-react';

const variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.125, animation: 'just' },
  },
  hidden: { y: 32, opacity: 0, transition: { animation: 'just' } },
};

type Props = {
  width?: number;
  title: string;
  children: React.ReactNode;
  isShowInfo?: boolean;
  setIsShowInfo?: (value: boolean) => void;
  onCloseClick?: () => void;
};

export default function DialogContainer({
  width = 817,
  title,
  children,
  isShowInfo = true,
  onCloseClick,
  setIsShowInfo,
}: Props) {
  const { closeDialog } = useDialogStore();

  return (
    <div className="fixed flex justify-center items-center overflow-y-scroll inset-0 z-[9999] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      <motion.div
        variants={variants}
        animate={'visible'}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-xl w-[817px] pt-4"
        style={{
          width: `${width}px`,
        }}
      >
        <div className="flex justify-between h-[58px] items-center border-l-[4px] border-[#6D3DF5] px-6">
          <div className="flex items-center gap-3">
            <Text
              size="lg"
              weight="bold"
              label={title}
              className="text-[#475569]"
            />
            {!isShowInfo && (
              <InfoIcon
                className="cursor-pointer"
                onClick={() => {
                  if (setIsShowInfo) {
                    setIsShowInfo(true);
                  }
                }}
              />
            )}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              if(onCloseClick){
                onCloseClick();
              }
              closeDialog();
            }}
          >
            <XIcon />
          </div>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-6 pb-6 shreScrollBar">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
