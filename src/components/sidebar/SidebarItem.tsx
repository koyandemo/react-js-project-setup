import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { classNames } from '../../utils';
import Text from '../typography/Text';

type itemType = {
  icon: ReactNode;
  label: string;
  route: string;
  group:string;
};

interface SidebarItemProps {
  item: itemType;
  pageName: string;
  setPageName: (_: string) => void;
}

const SidebarItem = ({ item, pageName, setPageName }: SidebarItemProps) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : '';
    setPageName(updatedPageName);
   navigate(item.route)
  };

 

  const isActive = (item: itemType) => {
    if (pathname === '/' && item.group === "dashboard") return true;
    if (pathname.includes(item.group)) return true;
    return false;
  };

  const isItemActive = isActive(item);

  return (
      <li>
        <div
          onClick={handleClick}
          className={classNames(
            'group relative flex items-center gap-[20px] rounded-[15px] min-w-[145px] h-[54px] pl-[22px] py-[12.5px] font-medium duration-300 ease-in-out  cursor-pointer',
            `${isItemActive ? 'bg-[#6D3DF5]  text-white' : ' text-[#4F4F4F]'}`
          )}
        >
          {item.icon}
          <Text
            label={item.label}
            size="sm"
            weight="medium"
            cursor="pointer"
            className={`${isItemActive ? 'text-white' : 'text-[#475569]'}`}
          />
        </div>
      </li>
  );
};

export default SidebarItem;
