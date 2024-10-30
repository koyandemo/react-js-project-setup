import { useNavigate } from 'react-router-dom';
import Text from '../typography/Text';
import { cn } from '../../utils';
import { BackIcon } from '../../utils/appIcon';

type Props = {
  title: string;
  isBack?: boolean;
  className?: string;
};

const HeaderTitle = ({ title, isBack, className = '' }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={cn('flex flex-col items-start gap-[10px]')}>
      {isBack && (
        <div
          onClick={() => {
            navigate(-1)
          }}
        >
          <BackIcon width={30} height={30} />
        </div>
      )}
      <Text
        size="2xl"
        weight="bold"
        label={title}
        className={cn(className, 'text-[#1E293B]')}
      />
    </div>
  );
};

export default HeaderTitle;
