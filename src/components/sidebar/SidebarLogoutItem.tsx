import { classNames } from '@/utils';
import { LogOutIcon } from 'lucide-react';
import Text from '../typography/Text';
import useDialogStore from '@/store/useDialogStore';

const SidebarLogoutItem = () => {
  const { openDialog } = useDialogStore();

  return (
    <div
      className={classNames(
        'group relative flex items-center gap-[20px] rounded-[15px] min-w-[145px] h-[54px] pl-[22px] py-[12.5px] font-medium duration-300 ease-in-out  cursor-pointer text-[#4F4F4F]'
      )}
      onClick={() => {
        openDialog('logoutDialog');
      }}
    >
      <LogOutIcon width={15} height={15} />
      <Text
        label={'Log Out'}
        size="sm"
        weight="medium"
        cursor="pointer"
        className={'text-[#475569]'}
      />
    </div>
  );
};

export default SidebarLogoutItem;
