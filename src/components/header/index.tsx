import { Link, useLocation } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";
import { HeaderSearch } from "./HeaderSearch";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const {pathname} = useLocation();

  const generateTitle = () => {
    if (pathname === '/') {
      return 'Dashboard';
    } else if (pathname.includes('feedbacks')) {
      return 'Feed Back';
    
    }else if(pathname.includes("users")){
      return 'User';
    }
    else {
      return '';
    }
  };

  return (
    <header className="top-0 flex w-full h-[60px] drop-shadow-1 pt-1">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 xl:px-[20px]">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-[999] block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img width={50} height={50} src={'/logo-shre.svg'} alt="Logo" />
          </Link>
        </div>
        <div className="hidden sm:block">
          {/* <Text
            label={`Dashboard  ${pathname !== "/" ? pathname.split('-').join(" ").split("/").join(' / ') : ""}`}
            size="sm"
            weight="medium"
            className="!capitalize text-[#94A3B8]"
          /> */}
          <HeaderTitle title={generateTitle()} />
        </div>
        <div className="flex items-center gap-3">
          <HeaderSearch />
        </div>
      </div>
    </header>
  );
};

export default Header;
