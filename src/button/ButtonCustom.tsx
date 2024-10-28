import { cn } from '@/lib/utils';
import styles from './button-custom.module.scss';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  size: 'sm' | 'md' | 'lg' | 'full';

  cursor?: 'pointer' | 'not-allowed';
  isOutline?: boolean;
  className?: string;
  disabled?: boolean;
  isPlusIcon?: boolean;
  isFill?: boolean;
  formTarget?: string | undefined;
  children:React.ReactNode;
  callBack?: () => void;
};

const ButtonCustom = ({
  type = 'button',
  size = 'sm',
  cursor = 'pointer',
  isOutline = false,
  disabled = false,
  formTarget = undefined,
  className = '',
  children,
  callBack,
}: ButtonProps) => {
  const cssNames = () => {
    return [
      styles['button-custom'],
      styles[`button-custom-${size}`],
      styles[`button-custom-${cursor}`],
      isOutline && styles['button-custom-outline'],
      disabled && styles['button-custom-disabled'],
      callBack && styles[`button-custom-bgHover`],
    ].join(' ');
  };

  return (
      <button
        form={formTarget}
        className={cn(cssNames(),'text-[#475569] text-[16px] font-[500]',className)}
        disabled={disabled}
        onClick={() => {
          if (callBack) {
            callBack();
          } else {
            return;
          }
        }}
        type={type}
      >
       {children}
      </button>
  );
};

export default ButtonCustom;

{/* <Text label={label} size="sm" weight="bold" cursor="pointer" /> */}